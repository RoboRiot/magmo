"use strict";

function envValue(value, maxLength = 120) {
  return String(value || "")
    .replace(/\s+#.*$/, "")
    .trim()
    .slice(0, maxLength);
}

const KNOWN_TESTING_CHANNEL_IDS = new Set(["C07F6V10PRS"]);

function dispatchConfigurationError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function resolveOpsDispatchChannelSettings(env = {}) {
  const explicitDispatchId = envValue(env.OPS_DISPATCH_CHANNEL_ID);
  const conversationId = envValue(env.OPS_CONVERSATION_CHANNEL_ID);
  const channelId = explicitDispatchId || conversationId;
  const channelIdSource = explicitDispatchId
    ? "OPS_DISPATCH_CHANNEL_ID"
    : conversationId
    ? "OPS_CONVERSATION_CHANNEL_ID"
    : "";

  if (!channelId) {
    throw dispatchConfigurationError(
      "missing_ops_dispatch_channel",
      "Magmo cannot verify or post this work order because the Dispatch channel ID is not configured. " +
        "Set OPS_DISPATCH_CHANNEL_ID (preferred) or OPS_CONVERSATION_CHANNEL_ID to the actual Slack #dispatch channel ID. " +
        "SLACK_CHANNEL_ID and channel-name fallbacks are intentionally not accepted."
    );
  }

  const testingChannelIds = new Set(
    [
      env.OPS_TESTING_CHANNEL_ID,
      env.SLACK_TESTING_CHANNEL_ID,
      ...KNOWN_TESTING_CHANNEL_IDS,
    ]
      .map((value) => envValue(value).toUpperCase())
      .filter(Boolean)
  );
  if (testingChannelIds.has(channelId.toUpperCase())) {
    throw dispatchConfigurationError(
      "unsafe_ops_dispatch_channel",
      `Magmo blocked this work order because ${channelIdSource} points to the Slack Testing channel (${channelId}). ` +
        "Set OPS_DISPATCH_CHANNEL_ID or OPS_CONVERSATION_CHANNEL_ID to the actual #dispatch channel ID before trying again."
    );
  }

  const channelName = envValue(
    env.OPS_DISPATCH_CHANNEL_NAME || "dispatch"
  )
    .replace(/^#/, "")
    .trim();

  return {
    channelId,
    channelName,
    channelIdSource,
  };
}

function slackDuplicateVerificationMessage(error, channelId = "") {
  const message = String(error?.message || error || "").toLowerCase();
  const nothingCreated = " Nothing was created.";

  if (
    error?.code === "missing_ops_dispatch_channel" ||
    error?.code === "unsafe_ops_dispatch_channel"
  ) {
    return `${String(error.message || "Dispatch channel configuration is invalid.").trim()}${nothingCreated}`;
  }

  if (!envValue(channelId)) {
    return (
      "Magmo could not verify #dispatch because no dispatch channel ID is configured. " +
      "Set OPS_DISPATCH_CHANNEL_ID (or OPS_CONVERSATION_CHANNEL_ID) to the Slack channel ID and try again." +
      nothingCreated
    );
  }
  if (message.includes("missing_scope")) {
    return (
      "Magmo's Slack bot cannot read #dispatch with its current permissions. " +
      "Confirm channels:history (or groups:history for a private channel), reinstall the app if the scope changed, and try again." +
      nothingCreated
    );
  }
  if (message.includes("not_in_channel")) {
    return (
      "Magmo's Slack bot is not a member of #dispatch. Invite the bot to #dispatch and try again." +
      nothingCreated
    );
  }
  if (
    message.includes("channel_not_found") ||
    message.includes("invalid_arguments")
  ) {
    return (
      "Magmo could not read the configured #dispatch channel. Confirm the dispatch channel ID and that the bot can access the channel, then try again." +
      nothingCreated
    );
  }
  if (message.includes("ratelimited") || message.includes("rate_limited")) {
    return (
      "Slack temporarily rate-limited Magmo while it checked #dispatch for duplicates. Wait a moment and try again." +
      nothingCreated
    );
  }
  return (
    "Magmo could not verify #dispatch for an existing matching work order. Refresh and try again." +
    nothingCreated
  );
}

module.exports = {
  resolveOpsDispatchChannelSettings,
  slackDuplicateVerificationMessage,
};
