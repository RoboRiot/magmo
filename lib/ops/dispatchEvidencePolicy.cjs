"use strict";

const DEFAULT_DISPATCH_CHANNEL_ID = "C07EPLKV9JT";
const DEFAULT_TESTING_CHANNEL_ID = "C07F6V10PRS";
const MANUAL_REVIEW_STATUS = "manual_review_required";
const MISSING_ROOT_REASON = "no_exact_dispatch_root";

function clean(value, maxLength = 1200) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function channelIds(value) {
  return String(value || "")
    .split(",")
    .map((entry) => clean(entry, 120))
    .filter((entry) => /^C[A-Z0-9]+$/i.test(entry));
}

function permalinkCoordinates(value) {
  const raw = clean(value, 1200);
  if (!raw) return { channel: "", threadTs: "" };
  try {
    const parsed = new URL(raw);
    const channel = parsed.pathname.match(/\/archives\/(C[A-Z0-9]+)/i)?.[1] || "";
    let threadTs = parsed.searchParams.get("thread_ts") || "";
    if (!threadTs) {
      const compact = parsed.pathname.match(/\/p(\d{10})(\d{6})/);
      if (compact?.[1] && compact?.[2]) threadTs = `${compact[1]}.${compact[2]}`;
    }
    return { channel: clean(channel, 120), threadTs: clean(threadTs, 120) };
  } catch (_) {
    return { channel: "", threadTs: "" };
  }
}

function workOrderCoordinates(workOrder = {}) {
  const permalink = permalinkCoordinates(workOrder.slackPermalink);
  return {
    channel: clean(workOrder.slackChannel || permalink.channel, 120),
    threadTs: clean(workOrder.slackThreadTs || permalink.threadTs, 120),
    permalink: clean(workOrder.slackPermalink, 1200),
  };
}

function dispatchEvidenceSettings(env = {}) {
  const dispatchIds = new Set([
    ...channelIds(env.OPS_DISPATCH_CHANNEL_ID),
    ...channelIds(env.OPS_CONVERSATION_CHANNEL_ID),
    DEFAULT_DISPATCH_CHANNEL_ID,
  ].map((entry) => entry.toUpperCase()));
  const testingIds = new Set([
    ...channelIds(env.OPS_TESTING_CHANNEL_ID),
    ...channelIds(env.SLACK_TESTING_CHANNEL_ID),
    DEFAULT_TESTING_CHANNEL_ID,
  ].map((entry) => entry.toUpperCase()));
  for (const testingId of testingIds) dispatchIds.delete(testingId);
  return { dispatchIds, testingIds };
}

function evaluateDispatchEvidence(workOrder = {}, env = {}) {
  const coordinates = workOrderCoordinates(workOrder);
  const settings = dispatchEvidenceSettings(env);
  const channel = coordinates.channel.toUpperCase();
  const review =
    workOrder.dispatchConversationReview &&
    typeof workOrder.dispatchConversationReview === "object"
      ? workOrder.dispatchConversationReview
      : {};

  if (workOrder.slackEvidenceEligible === false) {
    return {
      eligible: false,
      code: clean(review.reasonCode, 120) || "dispatch_review_required",
      message:
        "This work order is quarantined from AI conversation analysis until its exact Dispatch root is verified.",
      coordinates,
    };
  }
  if (clean(review.status, 80) === MANUAL_REVIEW_STATUS) {
    return {
      eligible: false,
      code: clean(review.reasonCode, 120) || "dispatch_review_required",
      message:
        "This work order requires a verified Dispatch root before Slack can be used as AI evidence.",
      coordinates,
    };
  }
  if (!channel || !coordinates.threadTs) {
    return {
      eligible: false,
      code: "missing_dispatch_coordinates",
      message: "This work order does not have a verified Dispatch thread.",
      coordinates,
    };
  }
  if (settings.testingIds.has(channel)) {
    return {
      eligible: false,
      code: "testing_evidence_rejected",
      message: "Testing conversations are never eligible as Magmo Ops AI evidence.",
      coordinates,
    };
  }
  if (!settings.dispatchIds.has(channel)) {
    return {
      eligible: false,
      code: "non_dispatch_evidence_rejected",
      message: "Only the verified Slack Dispatch thread can be used as Magmo Ops AI evidence.",
      coordinates,
    };
  }
  return { eligible: true, code: "verified_dispatch", coordinates };
}

function buildDispatchReviewQuarantinePatch({
  candidate = {},
  workOrder = {},
  auditReport = "",
  auditedAtIso = new Date().toISOString(),
} = {}) {
  const workOrderId = clean(
    candidate.workOrderId || workOrder.workOrderId || workOrder.number,
    180
  );
  if (!/^\d{3,12}$/.test(workOrderId)) {
    throw new Error("A numeric work order ID is required for Dispatch quarantine.");
  }
  if (candidate.repairDisposition !== "manual_review_no_exact_dispatch_root") {
    throw new Error(`Work order #${workOrderId} is not an unmatched audit candidate.`);
  }
  if (
    candidate.dispatchMatch?.exactNumericRoot ||
    candidate.dispatchMatch?.blueFolderSridMatched ||
    clean(candidate.dispatchMatch?.threadTs, 120)
  ) {
    throw new Error(`Work order #${workOrderId} has Dispatch evidence and must not be quarantined.`);
  }
  const preservedCoordinates = workOrderCoordinates(workOrder);
  return {
    slackEvidencePolicy: "dispatch_only",
    slackEvidenceEligible: false,
    dispatchConversationReview: {
      status: MANUAL_REVIEW_STATUS,
      reasonCode: MISSING_ROOT_REASON,
      reviewed: false,
      workOrderId,
      auditReport: clean(auditReport, 500),
      auditedAtIso: clean(auditedAtIso, 80),
      preservedCoordinates,
      note:
        "No exact numeric BlueFolder-linked root was found in Dispatch. Existing business, people, history, and message data were preserved, but Slack evidence is blocked pending manual review.",
    },
  };
}

function buildDispatchEvidenceResolutionPatch({
  workOrder = {},
  slackChannel = "",
  slackThreadTs = "",
  slackPermalink = "",
  resolvedAtIso = new Date().toISOString(),
  env = process.env,
} = {}) {
  const candidate = {
    ...workOrder,
    slackChannel,
    slackThreadTs,
    ...(slackPermalink ? { slackPermalink } : {}),
  };
  const evaluation = evaluateDispatchEvidence(
    { ...candidate, slackEvidenceEligible: true, dispatchConversationReview: null },
    env
  );
  if (!evaluation.eligible) {
    throw new Error(evaluation.message);
  }
  const previousReview =
    workOrder.dispatchConversationReview &&
    typeof workOrder.dispatchConversationReview === "object"
      ? workOrder.dispatchConversationReview
      : {};
  return {
    slackEvidencePolicy: "dispatch_only",
    slackEvidenceEligible: true,
    dispatchConversationReview: {
      ...previousReview,
      status: "resolved",
      reviewed: Boolean(previousReview.reviewed),
      resolutionSource: "verified_dispatch_coordinates",
      resolvedAtIso: clean(resolvedAtIso, 80),
      canonicalCoordinates: evaluation.coordinates,
    },
  };
}

module.exports = {
  DEFAULT_DISPATCH_CHANNEL_ID,
  DEFAULT_TESTING_CHANNEL_ID,
  MANUAL_REVIEW_STATUS,
  MISSING_ROOT_REASON,
  buildDispatchEvidenceResolutionPatch,
  buildDispatchReviewQuarantinePatch,
  dispatchEvidenceSettings,
  evaluateDispatchEvidence,
  workOrderCoordinates,
};
