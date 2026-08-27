"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  buildOpsReconciliationPlan,
  classifyReconciliationCandidate,
} = require("../lib/ops/reconciliationContract.cjs");

const igor = {
  id: "U_IGOR",
  email: "igor@example.com",
  name: "Igor Savchenko",
};
const stanley = {
  id: "U_STANLEY",
  email: "stanley@example.com",
  name: "Stanley Wu",
};
const julie = {
  id: "U_JULIE",
  email: "julie@example.com",
  name: "Julie Tang",
};
const julianBluefolder = {
  id: "bluefolder:julian",
  name: "Julian Ortiz",
};
const julianSlack = {
  id: "U_JULIAN",
  email: "julian@example.com",
  name: "Julian Ortiz",
};

function current(overrides = {}) {
  return {
    status: "active",
    workflowStatus: "unassigned",
    assignees: [],
    participants: [],
    assignmentHistory: [],
    participationHistory: [],
    workflowStageHistory: [],
    priorityTier: "needs_scheduled",
    priorityLabel: "Soon",
    priorityOrder: 2,
    prioritySource: "ai",
    priorityConfidence: 0.6,
    ...overrides,
  };
}

function analysis(overrides = {}) {
  return {
    changed: true,
    assignees: [],
    confidence: 0.95,
    reason: "Full-thread responsibility evidence.",
    participants: [],
    participationChanged: true,
    participationConfidence: 0.95,
    participationReason: "Full-thread contribution evidence.",
    priorityChanged: false,
    priorityTier: "needs_scheduled",
    priorityLabel: "Soon",
    priorityGenerated: false,
    priorityOrder: 2,
    priorityConfidence: 0.6,
    workflowChanged: false,
    workflowStatus: "unassigned",
    workflowConfidence: 0.6,
    remoteStateChanged: false,
    remoteWorkActive: false,
    remoteWorkConfidence: 0,
    workMode: "unspecified",
    ...overrides,
  };
}

test("creation allowlist admits #10380 but skips #10379 without a dispatch thread", () => {
  assert.deepEqual(
    classifyReconciliationCandidate({
      workOrderId: "10380",
      hasDispatchThread: true,
      existsInMagmo: false,
      allowedMissingIds: ["10380"],
    }),
    { action: "create", workOrderId: "10380" }
  );
  assert.deepEqual(
    classifyReconciliationCandidate({
      workOrderId: "10379",
      hasDispatchThread: false,
      existsInMagmo: false,
      allowedMissingIds: ["10380"],
    }),
    { action: "skip_no_dispatch_thread", workOrderId: "10379" }
  );
  assert.equal(
    classifyReconciliationCandidate({
      workOrderId: "10427",
      hasDispatchThread: true,
      existsInMagmo: false,
      allowedMissingIds: ["10380"],
    }).action,
    "skip_not_allowlisted"
  );
});

test("the latest human !done or !complete command controls terminal recovery", () => {
  const plan = buildOpsReconciliationPlan({
    current: current({ workflowStatus: "active" }),
    threadMessages: [
      { slackTs: "100.0", sender: igor, text: "!done" },
      { slackTs: "200.0", sender: igor, text: "!complete" },
    ],
    analysis: analysis({ workflowChanged: true, workflowStatus: "active", workflowConfidence: 1 }),
  });
  assert.equal(plan.patch.workflowStatus, "service_complete");
  assert.equal(plan.patch.status, "active");
  assert.equal(plan.decisions.terminalCommand, "!complete");
  assert.equal(plan.decisions.workflowSource, "slack_terminal_command");

  const done = buildOpsReconciliationPlan({
    current: current(),
    threadMessages: [{ slackTs: "300.0", sender: igor, text: "!done" }],
    analysis: analysis(),
  });
  assert.equal(done.patch.workflowStatus, "done");
  assert.equal(done.patch.status, "completed");
  assert.equal(done.patch.remoteWorkActive, false);
});

test("closed and existing terminal records never reopen from inference", () => {
  const closed = buildOpsReconciliationPlan({
    current: current({ status: "closed", workflowStatus: "closed" }),
    threadMessages: [{ slackTs: "300.0", sender: igor, text: "!complete" }],
    analysis: analysis({ workflowChanged: true, workflowStatus: "active", workflowConfidence: 1 }),
  });
  assert.equal(closed.patch.workflowStatus, "closed");
  assert.equal(closed.decisions.workflowSource, "preserved_closed");

  const done = buildOpsReconciliationPlan({
    current: current({ status: "completed", workflowStatus: "done" }),
    threadMessages: [{ slackTs: "300.0", sender: igor, text: "QA passed" }],
    analysis: analysis({ workflowChanged: true, workflowStatus: "active", workflowConfidence: 1 }),
  });
  assert.equal(done.patch.workflowStatus, "done");
  assert.equal(done.decisions.workflowSource, "preserved_terminal");
});

test("only current BlueFolder Assigned To engineers are protected physical workers", () => {
  const plan = buildOpsReconciliationPlan({
    current: current({
      assignees: [julianSlack, julie],
    }),
    bluefolderAssignees: [julianBluefolder],
    threadMessages: [{ slackTs: "100.0", sender: stanley, text: "I am troubleshooting remotely." }],
    analysis: analysis({
      assignees: [{ ...stanley, workMode: "remote" }],
      participants: [julie],
      remoteStateChanged: true,
      remoteWorkActive: true,
      remoteWorkConfidence: 0.98,
      workMode: "remote",
    }),
  });
  assert.deepEqual(
    plan.patch.assignees.map((person) => [person.name, person.workMode]).sort(),
    [
      ["Julian Ortiz", "physical"],
      ["Stanley Wu", "remote"],
    ]
  );
  assert.deepEqual(plan.patch.participants.map((person) => person.name), ["Julie Tang"]);
  assert.equal(plan.patch.workflowStatus, "active");
  assert.equal(plan.patch.workMode, "mixed");
  assert.equal(
    plan.patch.assignees.find((person) => person.name === "Julian Ortiz").id,
    "U_JULIAN",
    "a known Slack identity is retained for the BlueFolder engineer"
  );
});

test("manual assignments, participants, oversight, and exclusions survive reconciliation", () => {
  const original = current({
    assignees: [igor],
    participants: [julie],
    oversightManagers: [stanley],
    clockSessions: [{ id: "clock-1" }],
    assignmentHistory: [
      {
        source: "manual_assignment",
        assignees: [{ ...igor, workMode: "physical" }],
      },
    ],
    participationHistory: [
      { source: "manual", participants: [julie] },
    ],
    assignmentExclusions: [
      {
        id: "exclude-stanley",
        slackUserId: stanley.id,
        email: stanley.email,
        name: stanley.name,
      },
    ],
  });
  const plan = buildOpsReconciliationPlan({
    current: original,
    threadMessages: [{ slackTs: "100.0", sender: stanley, text: "Remote work" }],
    analysis: analysis({
      assignees: [{ ...stanley, workMode: "remote" }],
      participants: [],
    }),
  });
  assert.deepEqual(plan.patch.assignees.map((person) => person.name), ["Igor Savchenko"]);
  assert.deepEqual(plan.patch.participants.map((person) => person.name), ["Julie Tang"]);
  assert.equal(plan.decisions.manualAssigneeCount, 1);
  assert.equal(plan.decisions.manualParticipantCount, 1);
  assert.equal("oversightManagers" in plan.patch, false);
  assert.equal("clockSessions" in plan.patch, false);
  assert.deepEqual(original.oversightManagers, [stanley], "the helper does not mutate its input");
});

test("manual category feedback is retained while an unlocked category can change", () => {
  const locked = buildOpsReconciliationPlan({
    current: current({
      priorityTier: "anytime",
      priorityLabel: "Anytime",
      priorityOrder: 3,
      prioritySource: "manual",
      priorityFeedback: { vote: "up" },
    }),
    analysis: analysis({
      priorityChanged: true,
      priorityTier: "hard_down",
      priorityLabel: "Hard down",
      priorityOrder: 0,
      priorityConfidence: 0.99,
    }),
  });
  assert.equal(locked.patch.priorityTier, "anytime");
  assert.equal(locked.decisions.manualPriorityPreserved, true);

  const changed = buildOpsReconciliationPlan({
    current: current(),
    analysis: analysis({
      priorityChanged: true,
      priorityTier: "hard_down",
      priorityLabel: "Hard down",
      priorityOrder: 0,
      priorityConfidence: 0.99,
      priorityReason: "The scanner is currently unusable.",
    }),
  });
  assert.equal(changed.patch.priorityTier, "hard_down");
  assert.equal(changed.decisions.priorityChanged, true);
});

test("rejected generated categories and manual stage moves are not overwritten", () => {
  const plan = buildOpsReconciliationPlan({
    current: current({
      workflowStatus: "on_hold",
      holdReason: "Waiting for OEM approval.",
      workflowStageHistory: [
        { stage: "active", source: "manual_stage_move" },
      ],
      priorityTier: "needs_scheduled",
      rejectedPriorityTiers: ["generated_vendor_wait"],
    }),
    analysis: analysis({
      workflowChanged: true,
      workflowStatus: "active",
      workflowConfidence: 0.99,
      priorityChanged: true,
      priorityTier: "generated_vendor_wait",
      priorityLabel: "Vendor wait",
      priorityGenerated: true,
      priorityConfidence: 0.99,
    }),
  });
  assert.equal(plan.patch.workflowStatus, "on_hold");
  assert.equal(plan.decisions.manualStagePreserved, true);
  assert.equal(plan.patch.priorityTier, "needs_scheduled");
});

test("an old non-terminal dispatch thread becomes inactive only without a stronger source", () => {
  const nowMs = Date.parse("2026-08-18T12:00:00Z");
  const plan = buildOpsReconciliationPlan({
    current: current({ workflowStatus: "unassigned" }),
    threadMessages: [
      {
        slackTs: String(Date.parse("2026-08-10T12:00:00Z") / 1000),
        sender: igor,
        text: "Waiting for an update.",
      },
    ],
    analysis: analysis(),
    nowMs,
  });
  assert.equal(plan.patch.workflowStatus, "inactive");
  assert.equal(plan.decisions.workflowSource, "seven_day_inactivity");
});
