const test = require("node:test");
const assert = require("node:assert/strict");
const {
  OpsHttpError,
  READ_EVENT_TYPES,
  SUPPORTED_EVENT_TYPES,
  WRITE_EVENT_TYPES,
  buildOpenApiSpec,
  buildResourceChange,
  classifyOpsError,
  commandEventId,
  errorResponse,
  normalizeMovementType,
  runtimeCapabilities,
  validateIngestRequest,
} = require("../lib/ops/ingestContract.cjs");
const {
  isClosedMessageIngestionBoundary,
} = require("../lib/ops/messageLifecycle.cjs");

test("only Closed is a hard message-ingestion boundary", () => {
  assert.equal(isClosedMessageIngestionBoundary("service_complete"), false);
  assert.equal(isClosedMessageIngestionBoundary("done"), false);
  assert.equal(isClosedMessageIngestionBoundary("closed"), true);
  assert.equal(isClosedMessageIngestionBoundary("Closed"), true);
});

const identity = {
  channel: "C0123456789",
  threadTs: "1720000000.000100",
  commandTs: "1720000001.000200",
};

function trailerRequest(overrides = {}) {
  return {
    eventType: "trailer.movement",
    commandTs: identity.commandTs,
    source: {
      channel: identity.channel,
      threadTs: identity.threadTs,
      command: "!trailer 51 departed Acme for Bravo",
    },
    actor: { id: "U0123456789", name: "Test Operator" },
    analysis: {
      updates: [
        {
          trailerId: "trailer-51",
          movementType: "departed",
          fromClientId: "client-acme",
          toClientId: "client-bravo",
          confidence: 0.99,
          evidence: "Operator reported departure in the Slack thread.",
        },
      ],
    },
    ...overrides,
  };
}

test("capability response advertises the complete contract without credentials", () => {
  const capabilities = runtimeCapabilities({
    OPS_ENVIRONMENT: "staging",
    OPS_INGEST_MODE: "read_only",
    OPS_DEPLOY_VERSION: "abc123",
    OPS_INGEST_SECRET: "must-not-leak",
  });
  assert.equal(capabilities.environment, "staging");
  assert.equal(capabilities.writeEnabled, false);
  assert.equal(capabilities.deployedVersion, "abc123");
  assert.equal(capabilities.slackWorkOrderChannelPolicy, "dispatch_only");
  assert.equal(capabilities.dispatchChannelIdConfigured, false);
  assert.deepEqual(capabilities.movementStates, [
    "departed",
    "in_transit",
    "moved",
    "arrived",
  ]);
  assert.equal(JSON.stringify(capabilities).includes("must-not-leak"), false);
  assert.ok(SUPPORTED_EVENT_TYPES.includes("trailer.command_context"));
  assert.ok(SUPPORTED_EVENT_TYPES.includes("trailer.movement"));
  assert.ok(READ_EVENT_TYPES.includes("work_order.hours_context"));
  assert.equal(WRITE_EVENT_TYPES.includes("work_order.hours_context"), false);
  assert.equal(WRITE_EVENT_TYPES.includes("work_order.imported"), true);
  assert.deepEqual(capabilities.bluefolderImport, {
    eventType: "work_order.imported",
    requiresSlackCoordinates: false,
    idempotencyKeyFields: ["blueFolder.serviceRequestId"],
    preservesAuthoritativeSlackReceipt: true,
    createsSlackPosts: false,
  });
  assert.equal(
    capabilities.workOrderCommandContext.evidenceWatermarkField,
    "latestIngestedSlackTs"
  );
  assert.deepEqual(capabilities.messageCreatedSender.acceptedFields, [
    "senderId",
    "sender.id",
  ]);
  assert.equal(capabilities.messageCreatedSender.acceptsStringifiedSender, false);
  assert.equal(capabilities.slackDispatchRootOwnership.owner, "magmo");
  assert.equal(
    capabilities.slackDispatchRootOwnership.externalRootCreationAllowed,
    false
  );
});

test("BlueFolder imports are Slack-free and use the immutable service-request ID", () => {
  const request = {
    eventType: "work_order.imported",
    workOrderId: "10468",
    blueFolder: { serviceRequestId: "10468" },
    number: "10468",
    subject: "Scanner requires service",
  };
  const validated = validateIngestRequest(request);
  assert.equal(validated.workOrderId, "10468");
  assert.equal(validated.blueFolderServiceRequestId, "10468");
  assert.equal(validated.source, undefined);

  assert.throws(
    () =>
      validateIngestRequest({
        ...request,
        workOrderId: "10469",
      }),
    (error) => error.statusCode === 409 && error.code === "bluefolder_identity_mismatch"
  );
  assert.throws(
    () =>
      validateIngestRequest({
        ...request,
        slackChannel: "C07EPLKV9JT",
        slackThreadTs: "1782847034.191739",
      }),
    (error) =>
      error.statusCode === 400 &&
      error.code === "bluefolder_import_contains_slack_receipt"
  );
  for (const forbidden of [
    {
      blueFolder: {
        serviceRequestId: "10468",
        slackChannel: "C07EPLKV9JT",
      },
    },
    {
      source: {
        slackPermalink: "https://example.slack.com/archives/C07EPLKV9JT",
      },
    },
    {
      bluefolderAssignees: [
        { id: "bluefolder-person-1", slackUserId: "U02ENGINEER" },
      ],
    },
  ]) {
    assert.throws(
      () => validateIngestRequest({ ...request, ...forbidden }),
      (error) =>
        error.statusCode === 400 &&
        error.code === "bluefolder_import_contains_slack_receipt"
    );
  }
  assert.throws(
    () => validateIngestRequest({ ...request, unexpectedValue: true }),
    (error) =>
      error.statusCode === 400 &&
      error.code === "bluefolder_import_unsupported_fields"
  );
});

test("hours context requires a Dispatch command identity, actor, and matching cutoff", () => {
  const request = {
    eventType: "work_order.hours_context",
    workOrderId: "10431",
    throughSlackTs: identity.commandTs,
    evidenceThroughSlackTs: identity.threadTs,
    source: {
      ...identity,
      command: "!hours",
      channelName: "dispatch",
    },
    actor: { id: "U0123456789", name: "Test Operator" },
  };
  const validated = validateIngestRequest(request);
  assert.equal(validated.throughSlackTs, identity.commandTs);
  assert.equal(validated.evidenceThroughSlackTs, identity.threadTs);
  assert.equal(validated.source.commandTs, identity.commandTs);
  assert.equal(validated.actor.name, "Test Operator");

  assert.throws(
    () => validateIngestRequest({ ...request, actor: undefined }),
    (error) => error.code === "missing_actor"
  );
  assert.throws(
    () => validateIngestRequest({ ...request, throughSlackTs: "1720000002.000300" }),
    (error) => error.code === "hours_cutoff_mismatch"
  );
  assert.equal(
    validateIngestRequest({ ...request, evidenceThroughSlackTs: "" })
      .evidenceThroughSlackTs,
    ""
  );
  assert.throws(
    () =>
      validateIngestRequest({
        ...request,
        evidenceThroughSlackTs: "1720000002.000300",
      }),
    (error) => error.code === "hours_evidence_after_cutoff"
  );
});

test("movement states accept hyphenated in-transit and validate IDs", () => {
  assert.equal(normalizeMovementType("in-transit"), "in_transit");
  const request = trailerRequest();
  request.analysis.updates[0].movementType = "in-transit";
  const validated = validateIngestRequest(request);
  assert.equal(validated.source.channel, identity.channel);
  assert.equal(validated.actor.name, "Test Operator");
});

test("an existing typed transit destination can be used without creating a client", () => {
  const request = trailerRequest();
  request.analysis.updates[0].movementType = "arrived";
  request.analysis.updates[0].toClientId = "";
  request.analysis.updates[0].toClientName = "SimonMed Reno Eureka";
  assert.doesNotThrow(() => validateIngestRequest(request));
});

test("ambiguous trailer updates are rejected before a handler can write", () => {
  const request = trailerRequest();
  request.analysis.updates.push({ ...request.analysis.updates[0] });
  assert.throws(
    () => validateIngestRequest(request),
    (error) => error instanceof OpsHttpError && error.statusCode === 400
  );
});

test("invalid work-order, client, and Slack identifiers return 400", () => {
  assert.throws(
    () =>
      validateIngestRequest({
        eventType: "work_order.command_context",
        workOrderId: "../../invalid",
      }),
    (error) => error.statusCode === 400 && error.code === "invalid_resource_id"
  );
  const invalidClient = trailerRequest();
  invalidClient.analysis.updates[0].toClientId = "client/invalid";
  assert.throws(() => validateIngestRequest(invalidClient), /valid destination client ID/i);
  const invalidTimestamp = trailerRequest({ commandTs: "not-a-slack-ts" });
  assert.throws(() => validateIngestRequest(invalidTimestamp), /Slack command timestamp/i);
});

test("the Slack tuple produces a stable command idempotency key", () => {
  const first = commandEventId("trailer.movement", identity);
  const replay = commandEventId("trailer.movement", { ...identity });
  const nextCommand = commandEventId("trailer.movement", {
    ...identity,
    commandTs: "1720000002.000300",
  });
  assert.equal(first, replay);
  assert.notEqual(first, nextCommand);
});

test("resource changes contain authoritative before and after values", () => {
  const change = buildResourceChange(
    "work_order",
    "WO-100",
    { status: "active", assignees: ["A"] },
    { status: "completed", assignees: ["A"] }
  );
  assert.deepEqual(change.appliedChanges, {
    status: { before: "active", after: "completed" },
  });
  assert.equal(change.after.status, "completed");
});

test("missing work orders are actionable 404s and unknown failures stay generic", () => {
  const missing = errorResponse(
    new Error("Ops work order WO-404 does not exist."),
    "request-1"
  );
  assert.equal(missing.statusCode, 404);
  assert.equal(missing.body.code, "work_order_not_found");
  assert.match(missing.body.action, /sync or recreate/i);

  const unknown = errorResponse(new Error("database password=secret-value"), "request-2");
  assert.equal(unknown.statusCode, 500);
  assert.equal(unknown.body.error, "The Ops event could not be processed.");
  assert.equal(JSON.stringify(unknown.body).includes("secret-value"), false);
  assert.equal(classifyOpsError(new Error("A valid request is required.")).statusCode, 400);
});

test("OpenAPI publishes health, ingest, statuses, and authentication", () => {
  const spec = buildOpenApiSpec();
  assert.equal(spec.openapi, "3.1.0");
  assert.ok(spec.paths["/api/ops/health"]);
  const ingest = spec.paths["/api/ops/ingest"].post;
  assert.ok(ingest.responses[400]);
  assert.ok(ingest.responses[404]);
  assert.ok(ingest.responses[500]);
  assert.equal(
    spec.components.securitySchemes.OpsIngestSecret.name,
    "x-ops-ingest-secret"
  );
  assert.equal(
    spec.components.schemas.WorkOrderImportedRequest.properties.eventType.const,
    "work_order.imported"
  );
  assert.deepEqual(
    spec.components.schemas.WorkOrderImportedRequest.required,
    ["eventType", "blueFolder"]
  );
  assert.ok(spec.components.schemas.MessageCreatedRequest.properties.senderId);
  assert.ok(spec.components.schemas.MessageCreatedRequest.properties.sender);
  assert.ok(
    spec.components.schemas.WorkOrderCommandContextResponse.properties.context
      .properties.latestIngestedSlackTs
  );
  assert.ok(spec.components.schemas.ResourceChange.properties.appliedChanges);
  assert.equal(spec["x-magmo-capabilities"].slackDispatchRootOwner, "magmo");
});
