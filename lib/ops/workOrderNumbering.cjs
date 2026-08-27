"use strict";

/**
 * Parse the numeric work-order number from a Slack #dispatch parent message.
 *
 * Dispatch parents start with an exact `#12345` line followed by the title.
 * Replies and references elsewhere in a message are intentionally ignored so
 * they cannot advance the allocator.
 */
function parseDispatchWorkOrderRoot(message) {
  const isMessageObject =
    message !== null && typeof message === "object" && !Array.isArray(message);
  if (isMessageObject) {
    const threadTs = String(message.thread_ts || "").trim();
    const ts = String(message.ts || "").trim();
    if (threadTs && (!ts || threadTs !== ts)) return null;
  }

  const text = String(isMessageObject ? message.text || "" : message || "")
    .replace(/^\uFEFF/, "");
  const firstLine = text.split(/\r?\n/, 1)[0].trim();
  // Slack users occasionally bold the number, so accept one matching `*`
  // wrapper while keeping the line otherwise exact.
  const match = firstLine.match(/^(\*)?#(\d+)(?:\1)?$/);
  if (!match) return null;
  if (Boolean(match[1]) !== firstLine.endsWith("*")) return null;

  const number = Number(match[2]);
  return Number.isSafeInteger(number) && number > 0 ? number : null;
}

function normalizedReservedThrough(value) {
  const number = Number(value);
  return Number.isSafeInteger(number) && number > 0 ? number : 0;
}

function highestDispatchWorkOrderNumber(messages, { reservedThrough = 0 } = {}) {
  let highest = normalizedReservedThrough(reservedThrough);
  for (const message of Array.isArray(messages) ? messages : []) {
    const number = parseDispatchWorkOrderRoot(message);
    if (number !== null && number > highest) highest = number;
  }
  return highest;
}

function nextDispatchWorkOrderNumber(
  messages,
  { reservedThrough = 0, minimum = 1 } = {}
) {
  const normalizedMinimum = normalizedReservedThrough(minimum) || 1;
  const highest = highestDispatchWorkOrderNumber(messages, { reservedThrough });
  return Math.max(highest + 1, normalizedMinimum);
}

module.exports = {
  highestDispatchWorkOrderNumber,
  nextDispatchWorkOrderNumber,
  parseDispatchWorkOrderRoot,
};
