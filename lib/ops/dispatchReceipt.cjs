"use strict";

const DEFAULT_DISPATCH_CHANNEL_ID = "C07EPLKV9JT";
const KNOWN_TESTING_CHANNEL_IDS = new Set(["C07F6V10PRS"]);
const SLACK_TIMESTAMP_PATTERN = /^\d{8,}(?:\.\d{1,9})?$/;

function clean(value, maxLength = 1200) {
  return String(value || "").trim().slice(0, maxLength);
}

function dispatchReceiptError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function normalizedSlackTimestamp(value) {
  const timestamp = clean(value, 80);
  if (!SLACK_TIMESTAMP_PATTERN.test(timestamp)) return "";
  const [seconds, fraction = ""] = timestamp.split(".");
  return `${seconds}.${fraction.padEnd(9, "0").slice(0, 9)}`;
}

function parseRootSlackPermalink(value) {
  const permalink = clean(value, 1200);
  let parsed;
  try {
    parsed = new URL(permalink);
  } catch {
    throw dispatchReceiptError(
      "invalid_dispatch_permalink",
      "Slack did not return a valid canonical Dispatch root permalink."
    );
  }
  const hostname = parsed.hostname.toLowerCase();
  if (
    parsed.protocol !== "https:" ||
    (hostname !== "slack.com" && !hostname.endsWith(".slack.com"))
  ) {
    throw dispatchReceiptError(
      "invalid_dispatch_permalink",
      "The Dispatch receipt permalink must be an HTTPS Slack permalink."
    );
  }
  const match = parsed.pathname.match(
    /^\/archives\/([A-Z0-9]+)\/p(\d{8,})(\d{6})\/?$/i
  );
  if (!match) {
    throw dispatchReceiptError(
      "invalid_dispatch_permalink",
      "The Dispatch receipt permalink must point to a Slack message."
    );
  }
  if (parsed.searchParams.has("thread_ts")) {
    throw dispatchReceiptError(
      "dispatch_reply_permalink_rejected",
      "The Dispatch receipt must point to the work-order root, not a thread reply."
    );
  }
  return {
    permalink: parsed.toString(),
    channel: match[1],
    threadTs: `${match[2]}.${match[3]}`,
  };
}

function buildDispatchReceipt({
  workOrderId,
  slackChannel,
  slackThreadTs,
  slackPermalink,
  dispatchedAt = new Date().toISOString(),
  dispatchedBy,
  expectedChannelId = DEFAULT_DISPATCH_CHANNEL_ID,
}) {
  const normalizedWorkOrderId = clean(workOrderId, 80);
  if (!/^\d+$/.test(normalizedWorkOrderId)) {
    throw dispatchReceiptError(
      "invalid_dispatch_work_order",
      "A numeric work-order ID is required for a Dispatch receipt."
    );
  }
  const channel = clean(slackChannel, 120);
  const expectedChannel = clean(expectedChannelId, 120);
  if (!channel || !expectedChannel || channel !== expectedChannel) {
    throw dispatchReceiptError(
      "dispatch_channel_mismatch",
      `The Slack root is not in the configured Dispatch channel (${expectedChannel || "missing"}).`
    );
  }
  if (KNOWN_TESTING_CHANNEL_IDS.has(channel.toUpperCase())) {
    throw dispatchReceiptError(
      "testing_dispatch_receipt_rejected",
      "The Slack Testing channel cannot be used for a Dispatch receipt."
    );
  }
  const threadTs = clean(slackThreadTs, 80);
  if (!normalizedSlackTimestamp(threadTs)) {
    throw dispatchReceiptError(
      "invalid_dispatch_thread",
      "Slack did not return a valid Dispatch root timestamp."
    );
  }
  const parsedPermalink = parseRootSlackPermalink(slackPermalink);
  if (parsedPermalink.channel !== channel) {
    throw dispatchReceiptError(
      "dispatch_permalink_channel_mismatch",
      "The Slack permalink channel does not match the Dispatch root channel."
    );
  }
  if (
    normalizedSlackTimestamp(parsedPermalink.threadTs) !==
    normalizedSlackTimestamp(threadTs)
  ) {
    throw dispatchReceiptError(
      "dispatch_permalink_thread_mismatch",
      "The Slack permalink does not point to the recorded Dispatch root."
    );
  }
  const dispatchedAtIso = clean(dispatchedAt, 80);
  if (!dispatchedAtIso || Number.isNaN(Date.parse(dispatchedAtIso))) {
    throw dispatchReceiptError(
      "invalid_dispatched_at",
      "A valid dispatch timestamp is required for the Dispatch receipt."
    );
  }
  const actor = clean(dispatchedBy, 180);
  if (!actor) {
    throw dispatchReceiptError(
      "missing_dispatched_by",
      "The MAGMO user who dispatched the work order is required."
    );
  }
  return {
    workOrderId: normalizedWorkOrderId,
    dispatchStatus: "posted",
    slackChannel: channel,
    slackThreadTs: threadTs,
    slackPermalink: parsedPermalink.permalink,
    dispatchedAt: new Date(dispatchedAtIso).toISOString(),
    dispatchedBy: actor,
  };
}

function hasCompleteDispatchReceipt(value = {}, expectedChannelId = "") {
  const receipt =
    value?.dispatchReceipt && typeof value.dispatchReceipt === "object"
      ? value.dispatchReceipt
      : value;
  try {
    const canonical = buildDispatchReceipt({
      ...receipt,
      expectedChannelId:
        clean(expectedChannelId, 120) || clean(receipt.slackChannel, 120),
    });
    return canonical.dispatchStatus === "posted";
  } catch {
    return false;
  }
}

module.exports = {
  DEFAULT_DISPATCH_CHANNEL_ID,
  KNOWN_TESTING_CHANNEL_IDS,
  buildDispatchReceipt,
  hasCompleteDispatchReceipt,
  normalizedSlackTimestamp,
  parseRootSlackPermalink,
};
