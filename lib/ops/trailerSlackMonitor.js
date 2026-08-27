import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "../../context/FirebaseAdmin";
import { inferTrailerMovement } from "../ai/inferTrailerMovement";
import { createSlackClient } from "../slack/client";
import {
  applyTrailerMovementCommand,
  getTrailerCommandContext,
} from "./trailers";
const {
  buildTrailerByNumber,
  dateFromSlackTs,
  extractSlackThreadLinks,
  hasTrailerMovementSignal,
  trailerNumberFromChannel,
} = require("./trailerMonitorContract.cjs");
const TRAILER_CHANNEL_REGISTRY = require("./trailerSlackChannels.cjs");

const STATE_COLLECTION = "TrailerSlackMonitorState";
const RUN_COLLECTION = "TrailerSlackMonitorRuns";
const MAX_TRACKED_THREADS = 30;

function clean(value, maxLength = 2000) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function requireDb() {
  if (!adminDb) throw new Error("Firebase Admin Firestore is not initialized.");
  return adminDb;
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function slackApi(slack, method, payload = {}, options = {}) {
  let delay = 30000;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const httpMethod = options.httpMethod === "GET" ? "GET" : "POST";
    const query =
      httpMethod === "GET"
        ? `?${new URLSearchParams(
            Object.entries(payload).reduce((values, [key, value]) => {
              if (value !== undefined && value !== null && value !== "") {
                values[key] = String(value);
              }
              return values;
            }, {})
          ).toString()}`
        : "";
    const response = await fetch(`https://slack.com/api/${method}${query}`, {
      method: httpMethod,
      headers: {
        Authorization: `Bearer ${slack.requireToken()}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      ...(httpMethod === "POST" ? { body: JSON.stringify(payload) } : {}),
    });
    if (response.status === 429) {
      if (attempt === 3) throw new Error(`Slack ${method} remained rate limited.`);
      const retryAfter = Math.max(
        delay,
        Number(response.headers.get("retry-after") || 0) * 1000
      );
      await sleep(Math.min(120000, retryAfter));
      delay = Math.min(120000, delay * 2);
      continue;
    }
    const data = await response.json();
    if (!response.ok || !data?.ok) {
      throw new Error(`Slack API ${method} failed: ${JSON.stringify(data)}`);
    }
    return data;
  }
  throw new Error(`Slack ${method} failed after retrying.`);
}

async function listVisibleChannels(slack) {
  const channels = [];
  let cursor = "";
  do {
    const data = await slackApi(slack, "conversations.list", {
      types: "public_channel,private_channel",
      exclude_archived: true,
      limit: 200,
      ...(cursor ? { cursor } : {}),
    });
    channels.push(...(data.channels || []));
    cursor = clean(data.response_metadata?.next_cursor, 500);
  } while (cursor);
  return channels;
}

async function discoverTrailerChannels(slack) {
  try {
    const discovered = await listVisibleChannels(slack);
    const byId = new Map(
      TRAILER_CHANNEL_REGISTRY.map((channel) => [channel.id, channel])
    );
    discovered.forEach((channel) => byId.set(channel.id, channel));
    return { channels: [...byId.values()], source: "slack_discovery" };
  } catch (error) {
    if (!String(error?.message || error).includes('"missing_scope"')) throw error;
    console.warn(
      "[TrailerMonitor] Slack channel discovery scope is unavailable; using the reviewed trailer channel registry."
    );
    return {
      channels: TRAILER_CHANNEL_REGISTRY.map((channel) => ({ ...channel })),
      source: "reviewed_registry",
    };
  }
}

async function loadUserNames(slack) {
  const names = new Map();
  let cursor = "";
  try {
    do {
      const data = await slackApi(slack, "users.list", {
        limit: 200,
        ...(cursor ? { cursor } : {}),
      });
      (data.members || []).forEach((member) => {
        const profile = member.profile || {};
        names.set(
          clean(member.id, 80),
          clean(
            profile.display_name ||
              profile.real_name ||
              member.real_name ||
              member.name ||
              member.id,
            120
          )
        );
      });
      cursor = clean(data.response_metadata?.next_cursor, 500);
    } while (cursor);
  } catch (error) {
    console.warn("[TrailerMonitor][Slack users]", error?.message || error);
  }
  return names;
}

function flattenStrings(value, depth = 0) {
  if (depth > 5 || value == null) return [];
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) {
    return value.flatMap((entry) => flattenStrings(entry, depth + 1));
  }
  if (typeof value !== "object") return [];
  return Object.entries(value)
    .filter(([key]) => !["blocks", "attachments"].includes(key) || depth < 2)
    .flatMap(([, entry]) => flattenStrings(entry, depth + 1));
}

function messageBody(message = {}) {
  const values = [
    message.text,
    ...flattenStrings(message.blocks),
    ...flattenStrings(message.attachments),
  ];
  if (message.subtype === "channel_name") {
    values.push(
      `Channel renamed from ${message.old_name || "unknown"} to ${
        message.name || "unknown"
      }.`
    );
  }
  return clean(values.filter(Boolean).join(" | "), 5000);
}

function formatMessage(message, userNames, context = {}) {
  const ts = clean(message.ts || message.event_ts, 80);
  const senderId = clean(message.user || message.bot_id, 80);
  const sender = userNames.get(senderId) || (message.bot_id ? "Slack app" : senderId || "Unknown");
  const date = dateFromSlackTs(ts);
  const body = messageBody(message);
  return {
    ts,
    channelId: clean(context.channelId, 80),
    channelName: clean(context.channelName, 180),
    threadTs: clean(message.thread_ts || context.threadTs || message.ts, 80),
    linkedWorkOrder: Boolean(context.linkedWorkOrder),
    text: body,
    formattedText: `[${date || "unknown date"} ${ts}] ${sender}: ${body || "Attachment or channel event"}`,
  };
}

async function readHistory(slack, channel, oldest) {
  const messages = [];
  let cursor = "";
  do {
    const data = await slackApi(slack, "conversations.history", {
      channel,
      limit: 100,
      inclusive: false,
      ...(oldest ? { oldest } : {}),
      ...(cursor ? { cursor } : {}),
    });
    messages.push(...(data.messages || []));
    cursor = clean(data.response_metadata?.next_cursor, 500);
  } while (cursor && messages.length < 500);
  return messages;
}

async function readThread(slack, channel, threadTs, oldest = "") {
  const messages = [];
  let cursor = "";
  do {
    const data = await slackApi(
      slack,
      "conversations.replies",
      {
        channel,
        ts: threadTs,
        limit: 100,
        ...(oldest ? { oldest } : {}),
        ...(cursor ? { cursor } : {}),
      },
      { httpMethod: "GET" }
    );
    messages.push(...(data.messages || []));
    cursor = clean(data.response_metadata?.next_cursor, 500);
  } while (cursor && messages.length < 300);
  return messages.filter((message) => !oldest || Number(message.ts) > Number(oldest));
}

function newestTs(messages = [], fallback = "") {
  return messages.reduce(
    (latest, message) =>
      Number(message.ts || 0) > Number(latest || 0) ? String(message.ts) : latest,
    fallback
  );
}

function stateThreads(value) {
  return (Array.isArray(value) ? value : [])
    .map((thread) => ({
      channel: clean(thread?.channel, 80),
      threadTs: clean(thread?.threadTs, 80),
      lastProcessedTs: clean(thread?.lastProcessedTs, 80),
      linkedWorkOrder: Boolean(thread?.linkedWorkOrder),
    }))
    .filter((thread) => thread.channel && thread.threadTs)
    .slice(-MAX_TRACKED_THREADS);
}

function mergeTrackedThread(threads, incoming) {
  const key = `${incoming.channel}:${incoming.threadTs}`;
  const byKey = new Map(threads.map((thread) => [`${thread.channel}:${thread.threadTs}`, thread]));
  byKey.set(key, { ...(byKey.get(key) || {}), ...incoming });
  return [...byKey.values()]
    .sort((left, right) => Number(left.threadTs) - Number(right.threadTs))
    .slice(-MAX_TRACKED_THREADS);
}

function trailerNumber(trailer) {
  const stored = Number(trailer.number);
  if (Number.isFinite(stored) && stored > 0) return stored;
  const match = `${trailer.id} ${trailer.name}`.match(/\bAIS\s*0*(\d{1,3})\b/i);
  return match ? Number(match[1]) : null;
}

function runSlot(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      hour12: false,
    })
      .formatToParts(now)
      .map((part) => [part.type, part.value])
  );
  const hour = Number(parts.hour || 0);
  return `${parts.year}-${parts.month}-${parts.day}-${hour < 12 ? "morning" : "evening"}`;
}

async function claimRun(db, id) {
  const ref = db.collection(RUN_COLLECTION).doc(id);
  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const data = snapshot.data() || {};
    const leaseUntilMs = Date.parse(data.leaseUntilIso || "") || 0;
    if (data.status === "complete") return { ref, claimed: false, completed: true };
    if (data.status === "running" && leaseUntilMs > Date.now()) {
      return { ref, claimed: false, completed: false };
    }
    transaction.set(
      ref,
      {
        runId: id,
        status: "running",
        startedAt: FieldValue.serverTimestamp(),
        startedAtIso: new Date().toISOString(),
        leaseUntilIso: new Date(Date.now() + 12 * 60 * 1000).toISOString(),
      },
      { merge: true }
    );
    return { ref, claimed: true, completed: false };
  });
}

async function scanChannel({ slack, db, channel, trailer, userNames, initialOldest }) {
  const stateRef = db.collection(STATE_COLLECTION).doc(channel.id);
  const stateSnapshot = await stateRef.get();
  const state = stateSnapshot.data() || {};
  const oldest = clean(state.lastChannelTs || initialOldest, 80);
  const rawMessages = await readHistory(slack, channel.id, oldest);
  let trackedThreads = stateThreads(state.trackedThreads);
  rawMessages.forEach((message) => {
    if (Number(message.reply_count || 0) > 0 && message.ts) {
      trackedThreads = mergeTrackedThread(trackedThreads, {
        channel: channel.id,
        threadTs: String(message.ts),
        lastProcessedTs: "",
        linkedWorkOrder: false,
      });
    }
    extractSlackThreadLinks(JSON.stringify(message)).forEach((link) => {
      trackedThreads = mergeTrackedThread(trackedThreads, {
        channel: link.channel,
        threadTs: link.threadTs,
        lastProcessedTs: "",
        linkedWorkOrder: link.channel !== channel.id,
      });
    });
  });

  const directMessages = rawMessages.map((message) =>
    formatMessage(message, userNames, {
      channelId: channel.id,
      channelName: channel.name,
    })
  );
  const linkedMessages = [];
  const updatedThreads = [];
  for (const thread of trackedThreads) {
    try {
      const replies = await readThread(
        slack,
        thread.channel,
        thread.threadTs,
        thread.lastProcessedTs
      );
      const formatted = replies.map((message) =>
        formatMessage(message, userNames, {
          channelId: thread.channel,
          channelName: thread.linkedWorkOrder ? "linked-work-order" : channel.name,
          threadTs: thread.threadTs,
          linkedWorkOrder: thread.linkedWorkOrder,
        })
      );
      if (thread.linkedWorkOrder) linkedMessages.push(...formatted);
      else directMessages.push(...formatted);
      updatedThreads.push({
        ...thread,
        lastProcessedTs: newestTs(formatted, thread.lastProcessedTs),
      });
    } catch (error) {
      console.warn("[TrailerMonitor][thread]", {
        trailerId: trailer.id,
        channel: thread.channel,
        threadTs: thread.threadTs,
        message: error?.message || String(error),
      });
      updatedThreads.push(thread);
    }
  }
  const dedupe = (messages) => [
    ...new Map(messages.map((message) => [`${message.channelId}:${message.ts}`, message])).values(),
  ].sort((left, right) => Number(left.ts) - Number(right.ts));
  return {
    channel,
    stateRef,
    trailer,
    directMessages: dedupe(directMessages),
    linkedMessages: dedupe(linkedMessages),
    nextState: {
      trailerId: trailer.id,
      trailerNumber: trailerNumber(trailer),
      channelId: channel.id,
      channelName: channel.name,
      lastChannelTs: newestTs(rawMessages, state.lastChannelTs || initialOldest),
      trackedThreads: updatedThreads.slice(-MAX_TRACKED_THREADS),
      lastCheckedAtIso: new Date().toISOString(),
    },
  };
}

function signalMessages(messages) {
  return messages.filter((message) => hasTrailerMovementSignal(message.text));
}

function noChangeCode(error) {
  return ["no_trailer_change", "already_at_destination"].includes(
    clean(error?.code, 80)
  );
}

export async function monitorTrailerSlackMovements({
  dryRun = false,
  force = false,
  requestedRunId = "",
} = {}) {
  const db = requireDb();
  const id = clean(requestedRunId, 120) || runSlot();
  let runClaim = null;
  if (!dryRun && !force) {
    runClaim = await claimRun(db, id);
    if (!runClaim.claimed) {
      return {
        ok: true,
        skipped: true,
        reason: runClaim.completed ? "run_already_complete" : "run_already_active",
        runId: id,
      };
    }
  }

  const slack = createSlackClient();
  const startedAt = new Date();
  const result = {
    ok: true,
    dryRun,
    runId: id,
    startedAtIso: startedAt.toISOString(),
    channelsChecked: 0,
    trailersReviewed: 0,
    changedCount: 0,
    changes: [],
    noChanges: [],
    errors: [],
  };

  try {
    const [{ trailers, clients }, channelDiscovery, userNames] = await Promise.all([
      getTrailerCommandContext(),
      discoverTrailerChannels(slack),
      loadUserNames(slack),
    ]);
    const channels = channelDiscovery.channels;
    result.channelDiscovery = channelDiscovery.source;
    const trailerByNumber = buildTrailerByNumber(trailers);
    const trailerChannels = channels
      .map((channel) => ({
        channel,
        number:
          Number(channel.trailerNumber) || trailerNumberFromChannel(channel),
      }))
      .filter(({ number }) => trailerByNumber.has(number));
    result.channelsChecked = trailerChannels.length;
    const initialDays = Math.max(
      1,
      Math.min(45, Number(process.env.TRAILER_MONITOR_INITIAL_LOOKBACK_DAYS || 14))
    );
    const initialOldest = String((Date.now() - initialDays * 86400000) / 1000);
    const scans = [];
    for (const { channel, number } of trailerChannels) {
      try {
        scans.push(
          await scanChannel({
            slack,
            db,
            channel,
            trailer: trailerByNumber.get(number),
            userNames,
            initialOldest,
          })
        );
      } catch (error) {
        result.errors.push({
          trailerId: trailerByNumber.get(number)?.id || "",
          channelId: channel.id,
          channelName: channel.name,
          error: clean(error?.message || error, 700),
        });
      }
    }

    const byTrailer = new Map();
    scans.forEach((scan) => {
      if (!byTrailer.has(scan.trailer.id)) {
        byTrailer.set(scan.trailer.id, {
          trailer: scan.trailer,
          scans: [],
          messages: [],
          linkedMessages: [],
        });
      }
      const group = byTrailer.get(scan.trailer.id);
      group.scans.push(scan);
      group.messages.push(...scan.directMessages);
      group.linkedMessages.push(...scan.linkedMessages);
    });

    for (const group of byTrailer.values()) {
      const directSignals = signalMessages(group.messages);
      const linkedSignals = signalMessages(group.linkedMessages);
      if (!directSignals.length && !linkedSignals.length) {
        result.noChanges.push({
          trailerId: group.trailer.id,
          reason: "No new Slack message contained a trailer-movement signal.",
        });
        if (!dryRun) {
          await Promise.all(
            group.scans.map((scan) => scan.stateRef.set(scan.nextState, { merge: true }))
          );
        }
        continue;
      }

      result.trailersReviewed += 1;
      try {
        const analysis = await inferTrailerMovement({
          trailer: group.trailer,
          clients,
          channel: group.scans[0].channel,
          messages: group.messages,
          linkedMessages: group.linkedMessages,
        });
        if (!analysis.accepted) {
          result.noChanges.push({
            trailerId: group.trailer.id,
            reason: analysis.summary,
            confidence: analysis.confidence,
          });
        } else if (dryRun) {
          result.changes.push({
            trailerId: group.trailer.id,
            proposed: true,
            ...analysis.update,
            evidenceSlackTs: analysis.evidenceSlackTs,
          });
          result.changedCount += 1;
        } else {
          const evidenceMessage = [...group.messages, ...group.linkedMessages].find(
            (message) => message.ts === analysis.evidenceSlackTs
          );
          const movement = await applyTrailerMovementCommand({
            commandTs: analysis.evidenceSlackTs,
            changedBy: "Magmo AI",
            actor: { id: "magmo-ai-trailer-monitor", name: "Magmo AI" },
            analysis: {
              updates: [analysis.update],
              summary: analysis.summary,
              usage: analysis.usage,
            },
            sourceMessageCount: group.messages.length + group.linkedMessages.length,
            source: {
              channel: evidenceMessage?.channelId || group.scans[0].channel.id,
              channelName: evidenceMessage?.channelName || group.scans[0].channel.name,
              threadTs:
                evidenceMessage?.threadTs ||
                evidenceMessage?.ts ||
                analysis.evidenceSlackTs,
              command: "Twice-daily trailer movement review",
              automation: "twice_daily_trailer_monitor",
              sourceType: "ai",
            },
          });
          result.changedCount += movement.changedCount || 0;
          result.changes.push(...(movement.changes || []));
        }
        if (!dryRun) {
          await Promise.all(
            group.scans.map((scan) =>
              scan.stateRef.set(
                {
                  ...scan.nextState,
                  lastReviewSummary: analysis.summary,
                  lastReviewConfidence: analysis.confidence,
                  lastEvidenceSlackTs: analysis.evidenceSlackTs,
                },
                { merge: true }
              )
            )
          );
        }
      } catch (error) {
        if (noChangeCode(error)) {
          result.noChanges.push({
            trailerId: group.trailer.id,
            reason: clean(error?.message || error, 700),
          });
          if (!dryRun) {
            await Promise.all(
              group.scans.map((scan) => scan.stateRef.set(scan.nextState, { merge: true }))
            );
          }
        } else {
          result.errors.push({
            trailerId: group.trailer.id,
            error: clean(error?.message || error, 700),
          });
        }
      }
    }
  } catch (error) {
    result.errors.push({ error: clean(error?.message || error, 700) });
  }

  result.ok = result.errors.length === 0;
  result.completedAtIso = new Date().toISOString();
  if (!dryRun) {
    const runRef = runClaim?.ref || db.collection(RUN_COLLECTION).doc(id);
    await runRef.set(
      {
        ...result,
        status: result.ok ? "complete" : "partial",
        completedAt: FieldValue.serverTimestamp(),
        leaseUntilIso: "",
      },
      { merge: true }
    );
  }
  return result;
}
