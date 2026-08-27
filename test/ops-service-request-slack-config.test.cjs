"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  resolveOpsDispatchChannelSettings,
  slackDuplicateVerificationMessage,
} = require("../lib/ops/serviceRequestSlackConfig.cjs");

test("dispatch channel resolver prefers the dedicated channel ID", () => {
  const result = resolveOpsDispatchChannelSettings(
    {
      OPS_DISPATCH_CHANNEL_ID: "C-DISPATCH",
      OPS_CONVERSATION_CHANNEL_ID: "C-CONVERSATION",
      OPS_TESTING_CHANNEL_ID: "C-TESTING",
    },
    { slackChannelId: "C-LEGACY", slackChannelName: "legacy" }
  );

  assert.equal(result.channelId, "C-DISPATCH");
  assert.equal(result.channelName, "dispatch");
  assert.equal(result.channelIdSource, "OPS_DISPATCH_CHANNEL_ID");
});

test("existing Ops conversation channel is a safe dispatch fallback", () => {
  const result = resolveOpsDispatchChannelSettings(
    { OPS_CONVERSATION_CHANNEL_ID: "C07EPLKV9JT" },
    { slackChannelName: "dispatch" }
  );

  assert.equal(result.channelId, "C07EPLKV9JT");
  assert.equal(result.channelName, "dispatch");
  assert.equal(result.channelIdSource, "OPS_CONVERSATION_CHANNEL_ID");
});

test("legacy Slack channel settings cannot authorize a Dispatch write", () => {
  assert.throws(
    () =>
      resolveOpsDispatchChannelSettings(
        { SLACK_CHANNEL_ID: "C-LEGACY" },
        { slackChannelId: "C-BASE", slackChannelName: "legacy" }
      ),
    (error) => {
      assert.equal(error.code, "missing_ops_dispatch_channel");
      assert.match(error.message, /OPS_DISPATCH_CHANNEL_ID/i);
      assert.match(error.message, /SLACK_CHANNEL_ID.*not accepted/i);
      return true;
    }
  );
});

test("a channel name without an explicit Dispatch channel ID fails closed", () => {
  assert.throws(
    () => resolveOpsDispatchChannelSettings({ OPS_DISPATCH_CHANNEL_NAME: "dispatch" }),
    /Dispatch channel ID is not configured/i
  );
});

test("the configured Testing channel cannot be used as Dispatch", () => {
  assert.throws(
    () =>
      resolveOpsDispatchChannelSettings({
        OPS_DISPATCH_CHANNEL_ID: "C-TESTING",
        OPS_TESTING_CHANNEL_ID: "C-TESTING",
      }),
    (error) => {
      assert.equal(error.code, "unsafe_ops_dispatch_channel");
      assert.match(error.message, /points to the Slack Testing channel/i);
      assert.match(error.message, /actual #dispatch channel ID/i);
      return true;
    }
  );
});

test("the known Testing channel ID is rejected even without a Testing env value", () => {
  assert.throws(
    () =>
      resolveOpsDispatchChannelSettings({
        OPS_CONVERSATION_CHANNEL_ID: "C07F6V10PRS",
      }),
    (error) => error.code === "unsafe_ops_dispatch_channel"
  );
});

test("Slack duplicate verification errors preserve fail-closed behavior with useful guidance", () => {
  assert.match(
    slackDuplicateVerificationMessage(new Error("missing_scope"), "C123"),
    /cannot read #dispatch/i
  );
  assert.match(
    slackDuplicateVerificationMessage(new Error("anything"), ""),
    /no dispatch channel ID is configured/i
  );
  assert.match(
    slackDuplicateVerificationMessage(new Error("channel_not_found"), "C123"),
    /confirm the dispatch channel ID/i
  );
  const unsafe = new Error(
    "Magmo blocked this work order because OPS_DISPATCH_CHANNEL_ID points to Testing."
  );
  unsafe.code = "unsafe_ops_dispatch_channel";
  assert.match(
    slackDuplicateVerificationMessage(unsafe, ""),
    /points to Testing.*Nothing was created/i
  );
});
