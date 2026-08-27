"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  applyOpsCommandReportScope,
  messagesAfterOpsUpdate,
  normalizeOpsCommandReportType,
} = require("../lib/ops/commandReportContract.cjs");

test("service-complete reports retain the Ops update and parts status", () => {
  assert.equal(
    normalizeOpsCommandReportType("service-complete"),
    "service_complete"
  );
  const report = applyOpsCommandReportScope(
    {
      slackReport: "Service completion report",
      opsHeadline: "Service complete",
      opsStatusLine: "Parts return pending",
      opsSummary: "Repairs passed verification and the system is operational.",
      partSummary: "",
      companyLessons: [{ kind: "workflow_pattern" }],
    },
    "service_complete"
  );
  assert.match(report.opsSummary, /system is operational/i);
  assert.match(report.partSummary, /parts return remains pending/i);
  assert.equal(report.companyLessons.length, 1);
});

test("parts reports remain parts-only", () => {
  const report = applyOpsCommandReportScope(
    {
      slackReport: "Do not keep",
      opsHeadline: "Do not keep",
      opsStatusLine: "Do not keep",
      opsSummary: "Do not keep",
      partSummary: "A replacement board was taken to site.",
      companyLessons: [{ kind: "workflow_pattern" }],
    },
    "parts"
  );
  assert.equal(report.opsSummary, "");
  assert.equal(report.slackReport, "");
  assert.equal(report.partSummary, "A replacement board was taken to site.");
  assert.deepEqual(report.companyLessons, []);
});

test("completion reports use only messages newer than the recorded Ops update", () => {
  const messages = [
    { slackTs: "100.000", text: "Already summarized" },
    { slackTs: "200.000", text: "New verification result" },
  ];
  const previousUpdate = {
    summary: "The first repair was already reported.",
    throughSlackTs: "150.000",
  };
  assert.deepEqual(
    messagesAfterOpsUpdate(messages, previousUpdate, "service_complete"),
    [messages[1]]
  );
  assert.deepEqual(
    messagesAfterOpsUpdate(messages, previousUpdate, "parts"),
    messages
  );
});
