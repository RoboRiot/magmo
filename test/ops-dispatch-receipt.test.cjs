"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  buildDispatchReceipt,
  hasCompleteDispatchReceipt,
  parseRootSlackPermalink,
} = require("../lib/ops/dispatchReceipt.cjs");

const validReceipt = {
  workOrderId: "10455",
  slackChannel: "C07EPLKV9JT",
  slackThreadTs: "1787344750.841629",
  slackPermalink:
    "https://advancedimaging.slack.com/archives/C07EPLKV9JT/p1787344750841629",
  dispatchedAt: "2026-08-21T20:00:00.000Z",
  dispatchedBy: "manager@example.com",
};

test("a canonical Dispatch root produces the durable receipt contract", () => {
  assert.deepEqual(buildDispatchReceipt(validReceipt), {
    workOrderId: "10455",
    dispatchStatus: "posted",
    slackChannel: "C07EPLKV9JT",
    slackThreadTs: "1787344750.841629",
    slackPermalink:
      "https://advancedimaging.slack.com/archives/C07EPLKV9JT/p1787344750841629",
    dispatchedAt: "2026-08-21T20:00:00.000Z",
    dispatchedBy: "manager@example.com",
  });
});

test("Testing, replies, and mismatched root coordinates fail closed", () => {
  assert.throws(
    () =>
      buildDispatchReceipt({
        ...validReceipt,
        slackChannel: "C07F6V10PRS",
        expectedChannelId: "C07F6V10PRS",
        slackPermalink:
          "https://advancedimaging.slack.com/archives/C07F6V10PRS/p1787344750841629",
      }),
    (error) => error.code === "testing_dispatch_receipt_rejected"
  );
  assert.throws(
    () =>
      buildDispatchReceipt({
        ...validReceipt,
        slackPermalink:
          "https://advancedimaging.slack.com/archives/C07EPLKV9JT/p1787344751841630?thread_ts=1787344750.841629&cid=C07EPLKV9JT",
      }),
    (error) => error.code === "dispatch_reply_permalink_rejected"
  );
  assert.throws(
    () =>
      buildDispatchReceipt({
        ...validReceipt,
        slackPermalink:
          "https://advancedimaging.slack.com/archives/C07EPLKV9JT/p1787344751841630",
      }),
    (error) => error.code === "dispatch_permalink_thread_mismatch"
  );
});

test("completion requires only the canonical MAGMO Slack receipt", () => {
  assert.equal(
    hasCompleteDispatchReceipt({
      dispatchReceipt: {
        ...validReceipt,
        slackPermalink: "",
      },
    }),
    false
  );
  assert.equal(
    hasCompleteDispatchReceipt({
      dispatchReceipt: validReceipt,
    }),
    true
  );
});

test("a root permalink parser never accepts a thread reply", () => {
  assert.deepEqual(parseRootSlackPermalink(validReceipt.slackPermalink), {
    permalink: validReceipt.slackPermalink,
    channel: "C07EPLKV9JT",
    threadTs: "1787344750.841629",
  });
});
