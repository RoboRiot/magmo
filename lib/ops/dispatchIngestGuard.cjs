"use strict";

const { OpsHttpError, cleanText } = require("./ingestContract.cjs");

const SLACK_WORK_ORDER_WRITE_EVENTS = new Set([
  // hours_context is read-only, but it is still a Slack command and therefore
  // must prove that it came from the canonical Dispatch thread.
  "work_order.hours_context",
  "work_order.created",
  "work_order.completed",
  "work_order.service_complete",
  "work_order.parts",
  "work_order.reprocess_assignments",
  "message.created",
]);
const KNOWN_TESTING_CHANNEL_IDS = Object.freeze(["C07F6V10PRS"]);

function envValue(value, maxLength = 180) {
  return String(value || "")
    .replace(/\s+#.*$/, "")
    .trim()
    .slice(0, maxLength);
}

function normalizeChannelName(value) {
  return envValue(value, 180).replace(/^#/, "").trim().toLowerCase();
}

function permalinkCoordinates(value) {
  const raw = envValue(value, 1200);
  if (!raw) return { channel: "", threadTs: "" };
  try {
    const parsed = new URL(raw);
    const channel = parsed.pathname.match(/\/archives\/(C[A-Z0-9]+)/i)?.[1] || "";
    let threadTs = parsed.searchParams.get("thread_ts") || "";
    if (!threadTs) {
      const compact = parsed.pathname.match(/\/p(\d{10})(\d{6})/);
      if (compact?.[1] && compact?.[2]) {
        threadTs = `${compact[1]}.${compact[2]}`;
      }
    }
    return {
      channel: envValue(channel, 180),
      threadTs: envValue(threadTs, 80),
    };
  } catch (_) {
    return { channel: "", threadTs: "" };
  }
}

function resolveDispatchIngestSettings(env = {}) {
  // Intentionally do not fall back to SLACK_CHANNEL_ID. Older standalone
  // listeners used that variable for #testing, which is exactly the source of
  // the cross-channel corruption this guard prevents.
  const explicitChannelId = envValue(env.OPS_DISPATCH_CHANNEL_ID);
  const conversationChannelId = envValue(env.OPS_CONVERSATION_CHANNEL_ID);
  const channelId = explicitChannelId || conversationChannelId;
  const channelName = normalizeChannelName(
    env.OPS_DISPATCH_CHANNEL_NAME || "dispatch"
  );
  const testingChannelIds = new Set(
    [
      ...KNOWN_TESTING_CHANNEL_IDS,
      env.OPS_TESTING_CHANNEL_ID,
      env.SLACK_TESTING_CHANNEL_ID,
    ]
      .flatMap((value) => envValue(value).split(","))
      .map((value) => envValue(value))
      .filter(Boolean)
  );
  return {
    channelId,
    channelName,
    channelIdSource: explicitChannelId
      ? "OPS_DISPATCH_CHANNEL_ID"
      : conversationChannelId
      ? "OPS_CONVERSATION_CHANNEL_ID"
      : "",
    testingChannelIds,
  };
}

function extractSlackCoordinates(body = {}) {
  const source = body.source && typeof body.source === "object" ? body.source : {};
  const permalink = permalinkCoordinates(body.slackPermalink);
  const channels = [
    envValue(body.slackChannel),
    envValue(source.channel),
    permalink.channel,
  ].filter(Boolean);
  const threadTs =
    envValue(body.slackThreadTs, 80) ||
    envValue(source.threadTs, 80) ||
    permalink.threadTs;
  const channelName = normalizeChannelName(
    source.channelName || body.slackChannelName
  );
  return {
    channels: [...new Set(channels)],
    threadTs,
    permalinkChannel: permalink.channel,
    permalinkThreadTs: permalink.threadTs,
    channelName,
    hasSlackCoordinates: Boolean(
      channels.length ||
        threadTs ||
        envValue(body.slackPermalink, 1200) ||
        envValue(source.commandTs, 80) ||
        envValue(body.slackTs, 80)
    ),
  };
}

function isDispatchChannel(value, settings) {
  const channel = envValue(value);
  if (!channel) return false;
  if (settings.channelId && channel.toUpperCase() === settings.channelId.toUpperCase()) {
    return true;
  }
  const name = normalizeChannelName(channel);
  return Boolean(settings.channelName && name === settings.channelName);
}

function testingEvidence(coordinates, settings) {
  if (coordinates.channelName === "testing") return true;
  return coordinates.channels.some((channel) => {
    if (settings.testingChannelIds.has(channel)) return true;
    return normalizeChannelName(channel) === "testing";
  });
}

function dispatchGuardPlan(eventType, body = {}, env = {}) {
  if (!SLACK_WORK_ORDER_WRITE_EVENTS.has(eventType)) {
    return { action: "pass", reason: "not_slack_work_order_write" };
  }
  const coordinates = extractSlackCoordinates(body);

  // Direct/manual Magmo creation remains valid. It is not a Slack event and
  // therefore has no channel coordinates to canonicalize.
  if (eventType === "work_order.created" && !coordinates.hasSlackCoordinates) {
    return { action: "pass", reason: "manual_creation" };
  }

  const settings = resolveDispatchIngestSettings(env);
  if (!settings.channelId) {
    throw new OpsHttpError(
      503,
      "dispatch_channel_not_configured",
      "Magmo cannot accept Slack work-order events until the numeric Dispatch channel ID is configured.",
      {
        retryable: true,
        action:
          "Set OPS_DISPATCH_CHANNEL_ID to the Slack #dispatch channel ID. Do not use SLACK_CHANNEL_ID, which may still identify #testing.",
      }
    );
  }
  if (
    settings.testingChannelIds.has(settings.channelId) ||
    normalizeChannelName(settings.channelName) === "testing"
  ) {
    throw new OpsHttpError(
      503,
      "dispatch_channel_points_to_testing",
      "Magmo refused to start Slack work-order ingestion because the configured Dispatch channel is #testing.",
      {
        retryable: false,
        action:
          "Set OPS_DISPATCH_CHANNEL_ID or OPS_CONVERSATION_CHANNEL_ID to the numeric #dispatch channel ID. Testing can never be the canonical Ops channel.",
      }
    );
  }

  const channelMismatch =
    !coordinates.channels.length ||
    coordinates.channels.some(
      (channel) => !isDispatchChannel(channel, settings)
    );
  const nameMismatch = Boolean(
    coordinates.channelName && coordinates.channelName !== settings.channelName
  );
  const missingThread = !coordinates.threadTs;
  const threadMismatch = Boolean(
    coordinates.threadTs &&
      coordinates.permalinkThreadTs &&
      coordinates.threadTs !== coordinates.permalinkThreadTs
  );
  const isTesting = testingEvidence(coordinates, settings);

  if (!channelMismatch && !nameMismatch && !missingThread && !threadMismatch) {
    return {
      action: "accept",
      reason: "dispatch_coordinates",
      settings,
      coordinates,
    };
  }

  if (eventType === "work_order.created") {
    return {
      action: "resolve",
      reason: isTesting
        ? "testing_coordinates"
        : missingThread
        ? "missing_dispatch_thread"
        : threadMismatch
        ? "conflicting_dispatch_thread"
        : "non_dispatch_coordinates",
      settings,
      coordinates,
    };
  }

  throw new OpsHttpError(
    409,
    isTesting ? "testing_event_rejected" : "non_dispatch_event_rejected",
    isTesting
      ? "Magmo rejected a Slack work-order event from #testing."
      : "Magmo rejected a Slack work-order event that was not tied to the configured #dispatch thread.",
    {
      retryable: false,
      action:
        "Configure the external listener to monitor #dispatch, then replay the original #dispatch event. Testing messages are never assignment evidence.",
      details: {
        workOrderId: cleanText(body.workOrderId, 180),
        expectedChannel: settings.channelId,
      },
    }
  );
}

function canonicalizeDispatchPayload(body = {}, dispatchThread = {}, settings = {}) {
  const channel = envValue(dispatchThread.slackChannel || settings.channelId);
  const threadTs = envValue(dispatchThread.slackThreadTs, 80);
  if (
    !channel ||
    !threadTs ||
    channel.toUpperCase() !== String(settings.channelId || "").toUpperCase()
  ) {
    throw new OpsHttpError(
      409,
      "invalid_dispatch_resolution",
      "Magmo could not verify an exact numeric work-order root in the configured #dispatch channel.",
      {
        retryable: true,
        action:
          "Confirm the numeric work-order root exists in #dispatch and retry the ingest event.",
      }
    );
  }
  const source =
    body.source && typeof body.source === "object"
      ? {
          ...body.source,
          channel,
          threadTs,
          channelName: settings.channelName || "dispatch",
        }
      : body.source;
  return {
    ...body,
    slackChannel: channel,
    slackThreadTs: threadTs,
    ...(Object.prototype.hasOwnProperty.call(dispatchThread, "slackPermalink")
      ? { slackPermalink: envValue(dispatchThread.slackPermalink, 1200) }
      : {}),
    ...(source ? { source } : {}),
  };
}

module.exports = {
  SLACK_WORK_ORDER_WRITE_EVENTS,
  canonicalizeDispatchPayload,
  dispatchGuardPlan,
  extractSlackCoordinates,
  permalinkCoordinates,
  resolveDispatchIngestSettings,
};
