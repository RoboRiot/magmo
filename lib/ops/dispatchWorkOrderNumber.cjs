"use strict";

const crypto = require("node:crypto");
const {
  highestDispatchWorkOrderNumber,
  nextDispatchWorkOrderNumber,
  parseDispatchWorkOrderRoot,
} = require("./workOrderNumbering.cjs");

const COUNTER_COLLECTION = "OpsCounters";
const COUNTER_DOCUMENT = "slack-dispatch-work-order-number";
const BLUEFOLDER_SERVICE_REQUEST_URL =
  "https://advancedimaging.bluefolder.com/service/sr.aspx?srid=";

function positiveSafeInteger(value) {
  const number = Number(value);
  return Number.isSafeInteger(number) && number > 0 ? number : null;
}

function generatedBlueFolderWorkOrderUrl(workOrderNumber) {
  const number = positiveSafeInteger(workOrderNumber);
  if (!number) {
    throw new Error("A numeric work-order number is required for the BlueFolder link.");
  }
  return `${BLUEFOLDER_SERVICE_REQUEST_URL}${encodeURIComponent(String(number))}`;
}

function dispatchRootForNumber(messages, workOrderNumber) {
  const wanted = positiveSafeInteger(workOrderNumber);
  if (!wanted) return null;
  return (
    (Array.isArray(messages) ? messages : []).find(
      (message) => parseDispatchWorkOrderRoot(message) === wanted
    ) || null
  );
}

function dispatchRootSubject(message) {
  const lines = String(message?.text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const titleLine = lines.find((line, index) => {
    if (index === 0 && parseDispatchWorkOrderRoot(message) !== null) return false;
    return true;
  });
  if (!titleLine) return "";
  const linked = titleLine.match(/<[^|>]+\|([^>]+)>/);
  return String(linked?.[1] || titleLine)
    .replace(/^\*+|\*+$/g, "")
    .trim();
}

function dispatchRootUrl(message) {
  const lines = String(message?.text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const titleLine = lines.find((line, index) => {
    if (index === 0 && parseDispatchWorkOrderRoot(message) !== null) return false;
    return true;
  });
  return String(titleLine?.match(/^<([^|>]+)\|[^>]+>$/)?.[1] || "").trim();
}

function normalizeComparableTitle(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function isMatchingGeneratedDispatchRoot(
  message,
  workOrderNumber,
  subject,
  bluefolderUrl = generatedBlueFolderWorkOrderUrl(workOrderNumber)
) {
  if (parseDispatchWorkOrderRoot(message) !== positiveSafeInteger(workOrderNumber)) {
    return false;
  }
  if (dispatchRootUrl(message) !== String(bluefolderUrl || "").trim()) {
    return false;
  }
  const existingSubject = normalizeComparableTitle(dispatchRootSubject(message));
  const wantedSubject = normalizeComparableTitle(subject);
  return Boolean(existingSubject && wantedSubject && existingSubject === wantedSubject);
}

function deterministicSlackClientMessageId(seed) {
  const hex = crypto
    .createHash("sha256")
    .update(String(seed || ""))
    .digest("hex")
    .slice(0, 32)
    .split("");
  // Format the deterministic digest as an RFC 4122 UUID. Slack accepts this
  // as client_msg_id and deduplicates a retried parent post.
  hex[12] = "5";
  hex[16] = ((Number.parseInt(hex[16], 16) & 0x3) | 0x8).toString(16);
  return `${hex.slice(0, 8).join("")}-${hex.slice(8, 12).join("")}-${hex
    .slice(12, 16)
    .join("")}-${hex.slice(16, 20).join("")}-${hex.slice(20).join("")}`;
}

/**
 * Reserve a work-order number for one generated request.
 *
 * The Firestore transaction serializes all Magmo generators. A request keeps
 * its unused reservation on retry, while a reservation already occupied by a
 * different Dispatch root is advanced safely. Slack remains the source for
 * the current public sequence and the counter protects simultaneous Magmo
 * requests between Slack scans.
 */
async function reserveDispatchWorkOrderNumber({
  db,
  requestRef,
  slackMessages,
  nowIso = new Date().toISOString(),
  serverTimestamp,
}) {
  if (!db?.runTransaction || !requestRef) {
    throw new Error("A Firestore database and service-request reference are required.");
  }
  const roots = Array.isArray(slackMessages) ? slackMessages : [];
  const occupiedNumbers = new Set(
    roots.map(parseDispatchWorkOrderRoot).filter((number) => number !== null)
  );
  const slackHighest = highestDispatchWorkOrderNumber(roots);
  const counterRef = db.collection(COUNTER_COLLECTION).doc(COUNTER_DOCUMENT);

  return db.runTransaction(async (transaction) => {
    const requestSnapshot = await transaction.get(requestRef);
    if (!requestSnapshot.exists) {
      throw new Error("Service request does not exist.");
    }
    const counterSnapshot = await transaction.get(counterRef);
    const requestData = requestSnapshot.data() || {};
    const counterData = counterSnapshot.exists ? counterSnapshot.data() || {} : {};
    const existing = positiveSafeInteger(requestData.allocatedWorkOrderNumber);
    const reservedThrough = positiveSafeInteger(counterData.lastReservedNumber) || 0;

    if (existing && !occupiedNumbers.has(existing)) {
      return String(existing);
    }

    const number = nextDispatchWorkOrderNumber(roots, {
      reservedThrough,
      minimum: 1,
    });
    const timestamp = typeof serverTimestamp === "function" ? serverTimestamp() : nowIso;
    transaction.set(
      counterRef,
      {
        lastReservedNumber: number,
        sourceSlackHighestNumber: slackHighest,
        updatedAt: timestamp,
        updatedAtIso: nowIso,
      },
      { merge: true }
    );
    transaction.set(
      requestRef,
      {
        allocatedWorkOrderNumber: String(number),
        workOrderNumberAllocation: {
          number: String(number),
          source: "slack_dispatch_numeric_roots",
          sourceSlackHighestNumber: slackHighest,
          reservedAtIso: nowIso,
        },
        updatedAt: timestamp,
      },
      { merge: true }
    );
    return String(number);
  });
}

module.exports = {
  BLUEFOLDER_SERVICE_REQUEST_URL,
  COUNTER_COLLECTION,
  COUNTER_DOCUMENT,
  deterministicSlackClientMessageId,
  dispatchRootForNumber,
  dispatchRootSubject,
  dispatchRootUrl,
  generatedBlueFolderWorkOrderUrl,
  isMatchingGeneratedDispatchRoot,
  positiveSafeInteger,
  reserveDispatchWorkOrderNumber,
};
