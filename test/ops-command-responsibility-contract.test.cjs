"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  commandResponsibilityId,
  normalizeTerminalResponsibility,
} = require("../lib/ops/commandResponsibilityContract.cjs");

test("terminal responsibility requires exact-ID final evidence and a stable id", () => {
  const value = normalizeTerminalResponsibility(
    {
      apply: true,
      confidence: 0.96,
      phases: [
        {
          slackUserId: "U111111",
          name: "Igor Savchenko",
          workMode: "remote",
          phase: "initial",
          evidenceType: "remote_action",
          evidence: "Initial remote connection",
          evidenceSlackTs: "100.0",
          confidence: 0.94,
        },
        {
          slackUserId: "U222222",
          name: "Stanley Wu",
          workMode: "remote",
          phase: "final",
          evidenceType: "remote_action",
          evidence: "Completed remaining remote diagnostics",
          evidenceSlackTs: "200.0",
          confidence: 0.97,
        },
      ],
      finalAssignees: [
        { id: "U222222", name: "Stanley Wu", workMode: "remote" },
        { id: "U999999", name: "Invented Person", workMode: "remote" },
      ],
      participants: [],
    },
    "final"
  );
  assert.equal(value.apply, true);
  assert.deepEqual(value.finalAssignees.map((person) => person.id), ["U222222"]);
  assert.equal(
    commandResponsibilityId("final", "300-0"),
    commandResponsibilityId("final", "300-0")
  );
});

test("low-confidence or non-terminal responsibility cannot write", () => {
  const input = {
    apply: true,
    confidence: 0.5,
    phases: [],
    finalAssignees: [],
  };
  assert.equal(normalizeTerminalResponsibility(input, "final").apply, false);
  assert.equal(normalizeTerminalResponsibility(input, "parts").apply, false);
});
