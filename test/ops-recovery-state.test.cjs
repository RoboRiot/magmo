const test = require("node:test");
const assert = require("node:assert/strict");
const {
  initialRecoveryStage,
  latestRecoveryCommand,
  recoveryCandidates,
  rootDispatchAssignees,
} = require("../lib/ops/recoveryState.cjs");

const summer = { id: "U-SUMMER", name: "Summer Ye" };
const yao = { id: "U-YAO", name: "Yao N" };

test("recovery gives !done precedence over BlueFolder assignment and age", () => {
  const messages = [
    { slackTs: "100.0", sender: yao, candidates: [summer], text: "#10115 assign to Summer Ye" },
    { slackTs: "200.0", sender: summer, text: "!done" },
  ];
  assert.equal(latestRecoveryCommand(messages).workflowStatus, "done");
  assert.equal(initialRecoveryStage({ messages, bluefolderAssignees: [summer], nowMs: 9999999999999 }).workflowStatus, "done");
});

test("recovery distinguishes !complete from !done", () => {
  const messages = [
    { slackTs: "100.0", sender: summer, text: "!done" },
    { slackTs: "200.0", sender: summer, text: "!complete" },
  ];
  assert.equal(latestRecoveryCommand(messages).workflowStatus, "service_complete");
});

test("only the assign-to target is a BlueFolder dispatch assignee", () => {
  const root = {
    sender: yao,
    text: "#10115 Accent - assign to Summer Ye",
    candidates: [yao, summer, { id: "U-JULIE", name: "Julie Tang" }],
  };
  assert.deepEqual(rootDispatchAssignees(root), [summer]);
});

test("bots and synthetic recovery identities cannot become people", () => {
  const messages = [
    { sender: yao, candidates: [summer], text: "real message" },
    { sender: { id: "magmo-recovery", name: "Magmo recovery" }, candidates: [], text: "analysis" },
    { sender: { id: "U-BOT", name: "Magmo" }, botMessage: true, text: "summary" },
  ];
  assert.deepEqual(recoveryCandidates(messages), [yao, summer]);
});

test("old non-terminal recovered threads become inactive", () => {
  const messages = [{ slackTs: "100.0", sender: summer, text: "working onsite" }];
  assert.equal(initialRecoveryStage({ messages, bluefolderAssignees: [summer], nowMs: 100 * 1000 + 8 * 86400000 }).workflowStatus, "inactive");
});
