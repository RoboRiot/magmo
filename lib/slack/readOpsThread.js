import https from "https";
import dispatchEvidencePolicy from "../ops/dispatchEvidencePolicy.cjs";

const { evaluateDispatchEvidence } = dispatchEvidencePolicy;

const FALLBACK_NAMES = new Map([
  ["U07F4G8NP2P", "Yao N"],
  ["U07EY4TF21L", "Stanley Wu"],
  ["U0B3CSLG126", "Joshua Yoon"],
  ["U07FH9RLMNV", "Stan Redd"],
]);

function clean(value, maxLength = 6000) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function identityMap() {
  const names = new Map(FALLBACK_NAMES);
  for (const rawPair of String(process.env.SLACK_USER_NAME_MAP || "").split(",")) {
    const separator = rawPair.indexOf("=");
    if (separator < 1) continue;
    const id = clean(rawPair.slice(0, separator), 80);
    const name = clean(rawPair.slice(separator + 1), 100);
    if (id && name) names.set(id, name);
  }
  return names;
}

export function getOpsSlackCoordinates(workOrder) {
  let channel = clean(workOrder?.slackChannel, 120);
  let threadTs = clean(workOrder?.slackThreadTs, 120);
  try {
    const permalink = new URL(workOrder?.slackPermalink || "");
    if (!channel) {
      channel = permalink.pathname.match(/\/archives\/(C[A-Z0-9]+)/)?.[1] || "";
    }
    if (!threadTs) threadTs = permalink.searchParams.get("thread_ts") || "";
    if (!threadTs) {
      const compactTs = permalink.pathname.match(/\/p(\d{10})(\d{6})/) || [];
      if (compactTs[1] && compactTs[2]) threadTs = compactTs[1] + "." + compactTs[2];
    }
  } catch (_) {
    // Stored channel/thread fields remain the primary source.
  }
  return { channel, threadTs };
}

function slackGet(method, params) {
  const token = clean(process.env.SLACK_BOT_TOKEN, 500);
  if (!token) throw new Error("Missing SLACK_BOT_TOKEN");
  const query = new URLSearchParams(params).toString();
  return new Promise((resolve, reject) => {
    const request = https.request(
      "https://slack.com/api/" + method + "?" + query,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
        timeout: 30000,
      },
      (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          if (response.statusCode === 429) {
            return reject(
              new Error(
                "Slack is rate limited; retry after " +
                  (response.headers["retry-after"] || "30") +
                  " seconds."
              )
            );
          }
          if ((response.statusCode || 500) >= 400) {
            return reject(new Error("Slack returned HTTP " + response.statusCode + "."));
          }
          try {
            const data = JSON.parse(body);
            if (!data.ok) {
              throw new Error(
                "Slack " + method + " failed: " + (data.error || "unknown error")
              );
            }
            resolve(data);
          } catch (error) {
            reject(error);
          }
        });
      }
    );
    request.on("timeout", () =>
      request.destroy(new Error("Slack request timed out."))
    );
    request.on("error", reject);
    request.end();
  });
}

function readableSlackText(value, names) {
  return clean(value, 6000)
    .replace(/<@([A-Z0-9]+)>/g, (_, id) => "@" + (names.get(id) || id))
    .replace(/<([^>|]+)\|([^>]+)>/g, "$2")
    .replace(/<([^>]+)>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function flattenSlackText(value, depth = 0) {
  if (depth > 8 || value == null) return [];
  if (typeof value === "string") {
    const valueText = clean(value, 3000);
    return valueText ? [valueText] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((entry) => flattenSlackText(entry, depth + 1));
  }
  if (typeof value !== "object") return [];
  return ["text", "title", "fallback", "value", "label", "name", "elements", "blocks"]
    .flatMap((key) => flattenSlackText(value[key], depth + 1));
}

async function loadSlackNames(rawMessages, names) {
  const ids = new Set();
  for (const message of rawMessages) {
    if (message?.user) ids.add(clean(message.user, 80));
    const payload = JSON.stringify(message || {});
    for (const match of payload.matchAll(/<@([A-Z0-9]+)>/g)) ids.add(match[1]);
  }
  for (const id of ids) {
    if (!id || names.has(id)) continue;
    try {
      const data = await slackGet("users.info", { user: id });
      const profile = data.user?.profile || {};
      const name = clean(
        profile.real_name ||
          profile.display_name ||
          data.user?.real_name ||
          data.user?.name,
        100
      );
      if (name) names.set(id, name);
    } catch (_) {
      // Keep the Slack ID only when the bot cannot read that user's profile.
    }
  }
}

function mergeMessageText(message, names) {
  const values = [message?.text, ...flattenSlackText(message?.blocks), ...flattenSlackText(message?.attachments)];
  const seen = new Set();
  return values
    .map((value) => readableSlackText(value, names))
    .filter((value) => {
      const key = value.toLowerCase();
      if (!value || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .join("\n")
    .slice(0, 6000);
}

export function mergeOpsSlackMessages(...groups) {
  const byTs = new Map();
  for (const message of groups.flat()) {
    const slackTs = clean(message?.slackTs, 180);
    if (!slackTs) continue;
    byTs.set(slackTs, { ...(byTs.get(slackTs) || {}), ...message, slackTs });
  }
  return [...byTs.values()].sort(
    (left, right) => Number(left.slackTs) - Number(right.slackTs)
  );
}

export async function readOpsSlackThread(workOrder) {
  const evidence = evaluateDispatchEvidence(workOrder, process.env);
  if (!evidence.eligible) {
    const error = new Error(evidence.message);
    error.code = evidence.code;
    throw error;
  }
  const { channel, threadTs } = evidence.coordinates;
  const names = identityMap();
  const rawMessages = [];
  let cursor = "";
  for (let page = 0; page < 5; page += 1) {
    const data = await slackGet("conversations.replies", {
      channel,
      ts: threadTs,
      limit: "200",
      ...(cursor ? { cursor } : {}),
    });
    rawMessages.push(...(data.messages || []));
    cursor = clean(data.response_metadata?.next_cursor, 500);
    if (!cursor) break;
  }
  await loadSlackNames(rawMessages, names);
  const messages = [];
  for (const message of rawMessages) {
      const userId = clean(message.user, 80);
      const senderName =
        names.get(userId) ||
        clean(
          message.user_profile?.real_name || message.user_profile?.display_name,
          100
        ) ||
        clean(message.username || message.bot_profile?.name, 100) ||
        userId ||
        "Slack";
      const text = mergeMessageText(message, names);
      if (!message.ts || !text) continue;
      const candidateIds = new Set([userId]);
      for (const match of JSON.stringify(message || {}).matchAll(/<@([A-Z0-9]+)>/g)) {
        candidateIds.add(match[1]);
      }
      messages.push({
        id: clean(message.ts, 180).replace(/[^A-Za-z0-9_.-]/g, "_"),
        slackTs: clean(message.ts, 180),
        sender: { id: userId, name: senderName },
        text,
        candidates: [...candidateIds]
          .filter(Boolean)
          .map((id) => ({ id, name: names.get(id) || id })),
        botMessage: Boolean(message.bot_id || message.subtype === "bot_message"),
        metadata:
          message.metadata && typeof message.metadata === "object"
            ? message.metadata
            : null,
      });
  }
  messages.sort((left, right) => Number(left.slackTs) - Number(right.slackTs));
  return {
    messages,
    sourceMessageCount: messages.length,
    throughSlackTs: messages.length
      ? messages[messages.length - 1].slackTs
      : threadTs,
  };
}

function workOrderPattern(number) {
  const escaped = String(number || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:#\\s*${escaped}\\b|srid=${escaped}\\b)`, "i");
}

function subjectFromRoot(text, number) {
  const linkLabel = String(text || "").match(/<https?:\/\/[^>|]+\|([^>]+)>/)?.[1];
  if (linkLabel) return clean(linkLabel.replace(/^\*+|\*+$/g, ""), 500);
  return clean(
    String(text || "")
      .replace(workOrderPattern(number), "")
      .replace(/assign(?:ed)?\s+to[\s\S]*$/i, "")
      .replace(/[*_`]+/g, " "),
    500
  ) || `Recovered work order #${number}`;
}

function dispatchChannelIds() {
  // Do not use SLACK_CHANNEL_ID or SLACK_REPORT_CHANNEL_IDS here. Standalone
  // workers historically pointed those variables at #testing. Recovery and
  // ingest canonicalization must only search the dedicated Dispatch channel.
  const values = [
    process.env.OPS_DISPATCH_CHANNEL_ID,
    process.env.OPS_CONVERSATION_CHANNEL_ID,
    "C07EPLKV9JT",
  ];
  const testingIds = new Set(
    [process.env.OPS_TESTING_CHANNEL_ID, process.env.SLACK_TESTING_CHANNEL_ID]
      .flatMap((value) => String(value || "").split(","))
      .map((value) => clean(value, 80))
      .filter(Boolean)
  );
  return [...new Set(values.flatMap((value) => String(value || "").split(","))
    .map((value) => clean(value, 80))
    .filter((value) => /^C[A-Z0-9]+$/i.test(value) && !testingIds.has(value)))];
}

async function findOpsSlackWorkOrderThreadInChannels(workOrderNumber, channels) {
  const number = clean(workOrderNumber, 120).replace(/^#/, "").trim();
  if (!/^\d{3,12}$/.test(number)) {
    throw new Error("Enter a valid numeric work order number.");
  }
  const pattern = workOrderPattern(number);
  for (const channel of channels) {
    let cursor = "";
    for (let page = 0; page < 12; page += 1) {
      const data = await slackGet("conversations.history", {
        channel,
        limit: "200",
        ...(cursor ? { cursor } : {}),
      });
      const match = (data.messages || []).find((message) => {
        const rootTs = clean(message.thread_ts || message.ts, 120);
        return rootTs === clean(message.ts, 120) && pattern.test(String(message.text || ""));
      });
      if (match?.ts) {
        let permalink = "";
        try {
          const link = await slackGet("chat.getPermalink", {
            channel,
            message_ts: match.ts,
          });
          permalink = clean(link.permalink, 1200);
        } catch (_) {
          // Channel and timestamp are sufficient when a permalink cannot be created.
        }
        return {
          number,
          subject: subjectFromRoot(match.text, number),
          description: readableSlackText(match.text, identityMap()),
          slackChannel: channel,
          slackThreadTs: clean(match.ts, 120),
          slackPermalink: permalink,
          bluefolderUrl:
            String(match.text || "").match(/<(https?:\/\/[^>|]*sr\.aspx\?srid=\d+)[>|]/i)?.[1] || "",
        };
      }
      cursor = clean(data.response_metadata?.next_cursor, 500);
      if (!cursor) break;
    }
  }
  throw new Error(`Work order #${number} was not found in the configured Slack dispatch history.`);
}

export async function findOpsDispatchWorkOrderThread(
  workOrderNumber,
  dispatchChannelId = ""
) {
  const configured = clean(dispatchChannelId, 80);
  const channels = configured ? [configured] : dispatchChannelIds();
  if (!channels.length) {
    throw new Error(
      "No numeric Slack Dispatch channel ID is configured. Set OPS_DISPATCH_CHANNEL_ID."
    );
  }
  return findOpsSlackWorkOrderThreadInChannels(workOrderNumber, channels);
}

export async function findOpsSlackWorkOrderThread(workOrderNumber) {
  return findOpsSlackWorkOrderThreadInChannels(
    workOrderNumber,
    dispatchChannelIds()
  );
}
