"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  buildDispatchEvidenceResolutionPatch,
  buildDispatchReviewQuarantinePatch,
  evaluateDispatchEvidence,
} = require("../lib/ops/dispatchEvidencePolicy.cjs");

const env = {
  OPS_DISPATCH_CHANNEL_ID: "C012DISPATCH",
  OPS_TESTING_CHANNEL_ID: "C012TESTING",
};

test("Testing coordinates are never eligible for AI conversation evidence", () => {
  const result = evaluateDispatchEvidence(
    {
      slackChannel: "C012TESTING",
      slackThreadTs: "1780000000.000100",
    },
    env
  );
  assert.equal(result.eligible, false);
  assert.equal(result.code, "testing_evidence_rejected");
});

test("only the canonical Dispatch channel is eligible", () => {
  const accepted = evaluateDispatchEvidence(
    {
      slackChannel: "C012DISPATCH",
      slackThreadTs: "1780000000.000100",
    },
    env
  );
  assert.equal(accepted.eligible, true);
  assert.equal(accepted.code, "verified_dispatch");

  const rejected = evaluateDispatchEvidence(
    {
      slackChannel: "C012OTHER",
      slackThreadTs: "1780000000.000100",
    },
    env
  );
  assert.equal(rejected.eligible, false);
  assert.equal(rejected.code, "non_dispatch_evidence_rejected");
});

test("manual-review quarantine remains fail-closed even with copied Dispatch coordinates", () => {
  const result = evaluateDispatchEvidence(
    {
      slackChannel: "C012DISPATCH",
      slackThreadTs: "1780000000.000100",
      slackEvidenceEligible: false,
      dispatchConversationReview: {
        status: "manual_review_required",
        reasonCode: "no_exact_dispatch_root",
      },
    },
    env
  );
  assert.equal(result.eligible, false);
  assert.equal(result.code, "no_exact_dispatch_root");
});

test("quarantine adds review metadata without clearing existing business data", () => {
  const workOrder = {
    workOrderId: "9517",
    subject: "Annual calibration",
    assignees: [{ id: "U1", name: "Engineer" }],
    assignmentHistory: [{ id: "history-1" }],
    slackChannel: "C012TESTING",
    slackThreadTs: "1780000000.000100",
    slackPermalink:
      "https://example.slack.com/archives/C012TESTING/p1780000000000100",
  };
  const patch = buildDispatchReviewQuarantinePatch({
    candidate: {
      workOrderId: "9517",
      repairDisposition: "manual_review_no_exact_dispatch_root",
      dispatchMatch: {
        exactNumericRoot: false,
        blueFolderSridMatched: false,
        threadTs: "",
      },
    },
    workOrder,
    auditReport: "audit.json",
    auditedAtIso: "2026-08-20T20:00:00.000Z",
  });
  assert.equal(patch.slackEvidencePolicy, "dispatch_only");
  assert.equal(patch.slackEvidenceEligible, false);
  assert.equal(
    patch.dispatchConversationReview.status,
    "manual_review_required"
  );
  assert.deepEqual(patch.dispatchConversationReview.preservedCoordinates, {
    channel: "C012TESTING",
    threadTs: "1780000000.000100",
    permalink:
      "https://example.slack.com/archives/C012TESTING/p1780000000000100",
  });
  assert.equal(Object.hasOwn(patch, "assignees"), false);
  assert.equal(Object.hasOwn(patch, "assignmentHistory"), false);
  assert.equal(Object.hasOwn(patch, "slackChannel"), false);
});

test("a candidate with an exact Dispatch match cannot be quarantined", () => {
  assert.throws(
    () =>
      buildDispatchReviewQuarantinePatch({
        candidate: {
          workOrderId: "10431",
          repairDisposition: "manual_review_no_exact_dispatch_root",
          dispatchMatch: {
            exactNumericRoot: true,
            blueFolderSridMatched: true,
            threadTs: "1780000000.000100",
          },
        },
      }),
    /has Dispatch evidence/
  );
});

test("a verified Dispatch coordinate resolves prior quarantine metadata", () => {
  const patch = buildDispatchEvidenceResolutionPatch({
    workOrder: {
      slackEvidenceEligible: false,
      dispatchConversationReview: {
        status: "manual_review_required",
        reasonCode: "no_exact_dispatch_root",
        preservedCoordinates: {
          channel: "C012TESTING",
          threadTs: "1780000000.000100",
        },
      },
    },
    slackChannel: "C012DISPATCH",
    slackThreadTs: "1780000099.000900",
    resolvedAtIso: "2026-08-20T21:00:00.000Z",
    env,
  });
  assert.equal(patch.slackEvidenceEligible, true);
  assert.equal(patch.dispatchConversationReview.status, "resolved");
  assert.equal(
    patch.dispatchConversationReview.preservedCoordinates.channel,
    "C012TESTING"
  );
  assert.equal(
    patch.dispatchConversationReview.canonicalCoordinates.channel,
    "C012DISPATCH"
  );
});
