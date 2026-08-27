"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  canonicalizeDispatchPayload,
  dispatchGuardPlan,
  extractSlackCoordinates,
  resolveDispatchIngestSettings,
} = require("../lib/ops/dispatchIngestGuard.cjs");

const dispatchEnv = {
  OPS_DISPATCH_CHANNEL_ID: "C012DISPATCH",
  OPS_DISPATCH_CHANNEL_NAME: "dispatch",
  OPS_TESTING_CHANNEL_ID: "C012TESTING",
  SLACK_CHANNEL_ID: "C012TESTING",
};

test("manual work-order creation remains valid without Slack coordinates", () => {
  const plan = dispatchGuardPlan(
    "work_order.created",
    { workOrderId: "10431", subject: "Manual Magmo record" },
    {}
  );
  assert.equal(plan.action, "pass");
  assert.equal(plan.reason, "manual_creation");
});

test("legacy SLACK_CHANNEL_ID is never accepted as the Dispatch authority", () => {
  const settings = resolveDispatchIngestSettings({
    SLACK_CHANNEL_ID: "C012TESTING",
    SLACK_CHANNEL_NAME: "testing",
  });
  assert.equal(settings.channelId, "");
  assert.equal(settings.channelName, "dispatch");

  assert.throws(
    () =>
      dispatchGuardPlan(
        "message.created",
        {
          workOrderId: "10431",
          slackChannel: "C012TESTING",
          slackThreadTs: "1780000000.000100",
          slackTs: "1780000001.000200",
        },
        { SLACK_CHANNEL_ID: "C012TESTING" }
      ),
    (error) => error.code === "dispatch_channel_not_configured"
  );
});

test("Testing can never become canonical even when stale env values agree", () => {
  assert.throws(
    () =>
      dispatchGuardPlan(
        "message.created",
        {
          workOrderId: "10431",
          slackChannel: "C07F6V10PRS",
          slackThreadTs: "1780000000.000100",
          slackTs: "1780000001.000200",
        },
        {
          OPS_CONVERSATION_CHANNEL_ID: "C07F6V10PRS",
          OPS_TESTING_CHANNEL_ID: "C07F6V10PRS",
        }
      ),
    (error) =>
      error.statusCode === 503 &&
      error.code === "dispatch_channel_points_to_testing"
  );
});

test("a Testing work-order creation is resolved against Dispatch instead of persisted", () => {
  const plan = dispatchGuardPlan(
    "work_order.created",
    {
      workOrderId: "10431",
      slackChannel: "C012TESTING",
      slackThreadTs: "1780000000.000100",
      slackPermalink:
        "https://example.slack.com/archives/C012TESTING/p1780000000000100",
      source: { channelName: "testing" },
    },
    dispatchEnv
  );
  assert.equal(plan.action, "resolve");
  assert.equal(plan.reason, "testing_coordinates");
});

test("a mismatched permalink cannot override an otherwise Dispatch-looking payload", () => {
  const plan = dispatchGuardPlan(
    "work_order.created",
    {
      workOrderId: "10431",
      slackChannel: "C012DISPATCH",
      slackThreadTs: "1780000000.000100",
      slackPermalink:
        "https://example.slack.com/archives/C012TESTING/p1780000000000100",
    },
    dispatchEnv
  );
  assert.equal(plan.action, "resolve");
});

test("contradictory explicit and permalink thread timestamps are rejected", () => {
  assert.throws(
    () =>
      dispatchGuardPlan(
        "message.created",
        {
          workOrderId: "10431",
          slackChannel: "C012DISPATCH",
          slackThreadTs: "1780000000.000100",
          slackPermalink:
            "https://example.slack.com/archives/C012DISPATCH/p1780000099000900?thread_ts=1780000099.000900",
          slackTs: "1780000100.000100",
        },
        dispatchEnv
      ),
    (error) => error.code === "non_dispatch_event_rejected"
  );
});

test("Testing messages and commands fail closed and cannot become AI evidence", () => {
  assert.throws(
    () =>
      dispatchGuardPlan(
        "message.created",
        {
          workOrderId: "10431",
          slackChannel: "C012TESTING",
          slackThreadTs: "1780000000.000100",
          slackTs: "1780000001.000200",
          text: "ETA to site is 4:36pm",
        },
        dispatchEnv
      ),
    (error) =>
      error.statusCode === 409 &&
      error.code === "testing_event_rejected" &&
      /never assignment evidence/i.test(error.action)
  );
});

test("a valid Dispatch message is accepted and retains its exact thread", () => {
  const body = {
    workOrderId: "10431",
    slackChannel: "C012DISPATCH",
    slackThreadTs: "1780000000.000100",
    slackTs: "1780000001.000200",
    text: "ETA to site is 4:36pm",
  };
  const plan = dispatchGuardPlan("message.created", body, dispatchEnv);
  assert.equal(plan.action, "accept");
  assert.equal(plan.coordinates.threadTs, body.slackThreadTs);
});

test("hours context is Dispatch-only even though it performs no writes", () => {
  const body = {
    workOrderId: "10431",
    throughSlackTs: "1780000001.000200",
    source: {
      channel: "C012DISPATCH",
      threadTs: "1780000000.000100",
      commandTs: "1780000001.000200",
      channelName: "dispatch",
    },
  };
  assert.equal(
    dispatchGuardPlan("work_order.hours_context", body, dispatchEnv).action,
    "accept"
  );
  assert.throws(
    () =>
      dispatchGuardPlan(
        "work_order.hours_context",
        {
          ...body,
          source: {
            ...body.source,
            channel: "C012TESTING",
            channelName: "testing",
          },
        },
        dispatchEnv
      ),
    (error) => error.code === "testing_event_rejected"
  );
});

test("canonicalization replaces every stale coordinate with the verified Dispatch root", () => {
  const canonical = canonicalizeDispatchPayload(
    {
      workOrderId: "10431",
      slackChannel: "C012TESTING",
      slackThreadTs: "1780000000.000100",
      slackPermalink:
        "https://example.slack.com/archives/C012TESTING/p1780000000000100",
      source: {
        channel: "C012TESTING",
        threadTs: "1780000000.000100",
        channelName: "testing",
      },
    },
    {
      slackChannel: "C012DISPATCH",
      slackThreadTs: "1780000099.000900",
      slackPermalink:
        "https://example.slack.com/archives/C012DISPATCH/p1780000099000900",
    },
    {
      channelId: "C012DISPATCH",
      channelName: "dispatch",
    }
  );
  assert.equal(canonical.slackChannel, "C012DISPATCH");
  assert.equal(canonical.slackThreadTs, "1780000099.000900");
  assert.match(canonical.slackPermalink, /C012DISPATCH/);
  assert.equal(canonical.source.channel, "C012DISPATCH");
  assert.equal(canonical.source.threadTs, "1780000099.000900");
  assert.equal(canonical.source.channelName, "dispatch");
});

test("coordinate extraction treats permalink channel as authoritative evidence", () => {
  const coordinates = extractSlackCoordinates({
    slackPermalink:
      "https://example.slack.com/archives/C07EPLKV9JT/p1787166614622269?thread_ts=1787166614.622269",
  });
  assert.deepEqual(coordinates.channels, ["C07EPLKV9JT"]);
  assert.equal(coordinates.threadTs, "1787166614.622269");
});
