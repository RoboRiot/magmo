const test = require("node:test");
const assert = require("node:assert/strict");
const {
  resolveSlackSenderIdentity,
  scalarText,
} = require("../lib/ops/senderIdentity.cjs");
const {
  validateIngestRequest,
} = require("../lib/ops/ingestContract.cjs");

function messageRequest(overrides = {}) {
  return {
    eventType: "message.created",
    workOrderId: "10472",
    slackTs: "1787680080.123456",
    slackChannel: "C0123456789",
    slackThreadTs: "1787670000.123456",
    senderId: "U07FH9NKCSD",
    senderName: "Igor Savchenko",
    text: "I arrived onsite.",
    ...overrides,
  };
}

test("flat Slack sender ID and name are preserved", () => {
  assert.deepEqual(resolveSlackSenderIdentity(messageRequest()), {
    id: "U07FH9NKCSD",
    name: "Igor Savchenko",
  });
});

test("nested sender object is flattened without object coercion", () => {
  const identity = resolveSlackSenderIdentity(
    messageRequest({
      senderId: undefined,
      senderName: undefined,
      sender: { id: "u07fh9nkcsd", name: "Igor Savchenko" },
    })
  );
  assert.deepEqual(identity, {
    id: "U07FH9NKCSD",
    name: "Igor Savchenko",
  });
});

test("malformed senderName object cannot turn into object Object", () => {
  const identity = resolveSlackSenderIdentity(
    messageRequest({ senderName: { unexpected: true } })
  );
  assert.deepEqual(identity, {
    id: "U07FH9NKCSD",
    name: "U07FH9NKCSD",
  });
  assert.equal(scalarText({ name: "Igor" }), "");
  assert.equal(scalarText("[object Object]"), "");
});

test("nested senderName identity is accepted when it contains a valid Slack ID", () => {
  const validated = validateIngestRequest(
    messageRequest({
      senderId: undefined,
      senderName: { id: "U07FH9NKCSD", name: "Igor Savchenko" },
    })
  );
  assert.deepEqual(validated.sender, {
    id: "U07FH9NKCSD",
    name: "Igor Savchenko",
  });
});

test("message ingest rejects an ambiguous sender instead of recording it", () => {
  assert.throws(
    () =>
      validateIngestRequest(
        messageRequest({
          senderId: { unexpected: true },
          senderName: "[object Object]",
          sender: { name: { nested: "Igor" } },
        })
      ),
    (error) => error.code === "missing_slack_sender"
  );
});

test("conflicting valid Slack IDs are rejected instead of mixing an ID and name", () => {
  assert.equal(
    resolveSlackSenderIdentity(
      messageRequest({
        senderId: "U1111111",
        sender: { id: "U2222222", name: "Stanley Wu" },
      })
    ),
    null
  );
  assert.throws(
    () =>
      validateIngestRequest(
        messageRequest({
          senderId: "U1111111",
          sender: { id: "U2222222", name: "Stanley Wu" },
        })
      ),
    (error) => error.code === "missing_slack_sender"
  );
});

test("a valid Slack ID remains authoritative even when it is not in a static directory", () => {
  assert.deepEqual(
    resolveSlackSenderIdentity(
      messageRequest({
        senderId: "U9999999",
        senderName: undefined,
        sender: undefined,
      })
    ),
    { id: "U9999999", name: "U9999999" }
  );
});
