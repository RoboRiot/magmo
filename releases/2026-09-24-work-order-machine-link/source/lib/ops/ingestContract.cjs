const crypto = require("crypto");
const {
  resolveSlackSenderIdentity,
} = require("./senderIdentity.cjs");
const {
  PROTECTED_DISPATCH_FIELDS,
  forbiddenDispatchFields,
  unsupportedImportFields,
  validateEquipmentIdentity,
} = require("./blueFolderImportContract.cjs");

const {
  validateBlueFolderStatusSync,
  BlueFolderStatusSyncError,
} = require("./blueFolderStatusSync.cjs");

const API_VERSION = "2026-09-24.1";
const BLUEFOLDER_EQUIPMENT_LINK_CAPABILITY = Object.freeze({
  version: "2026-09-24.1",
  equipmentIds: true,
  equipmentNames: true,
  existingOnly: true,
  preservesManualAssets: true,
  rejectsUnresolvedInventoryMachine: true,
});
const BLUEFOLDER_STATUS_SYNC_CAPABILITY = Object.freeze({
  eventType: "work_order.bluefolder_status",
  version: "2026-09-24.1",
  direction: "bluefolder_to_magmo",
  allowedStatuses: ["Closed"],
  statusOnly: true,
  createsWorkOrders: false,
  createsSlackPosts: false,
  writesSlack: false,
  writesBlueFolder: false,
  deletesMessages: false,
  modifiesHours: false,
});
const READ_EVENT_TYPES = Object.freeze([
  "work_order.command_context",
  "work_order.hours_context",
  "trailer.command_context",
]);
const WRITE_EVENT_TYPES = Object.freeze([
  "work_order.created",
  "work_order.imported",
  "work_order.bluefolder_status",
  "work_order.completed",
  "work_order.service_complete",
  "work_order.parts",
  "work_order.reprocess_assignments",
  "message.created",
  "trailer.movement",
]);
const SUPPORTED_EVENT_TYPES = Object.freeze([
  ...READ_EVENT_TYPES,
  ...WRITE_EVENT_TYPES,
]);
const COMMAND_EVENT_TYPES = new Set([
  "work_order.hours_context",
  "work_order.completed",
  "work_order.service_complete",
  "work_order.parts",
  "work_order.reprocess_assignments",
  "trailer.movement",
]);
const WORK_ORDER_EVENT_TYPES = new Set(
  SUPPORTED_EVENT_TYPES.filter((eventType) => eventType.startsWith("work_order.")).concat(
    "message.created"
  )
);
const RESOURCE_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_.:-]{0,179}$/;
const SLACK_TIMESTAMP_PATTERN = /^\d{8,}(?:\.\d{1,9})?$/;

class OpsHttpError extends Error {
  constructor(statusCode, code, message, options = {}) {
    super(message);
    this.name = "OpsHttpError";
    this.statusCode = statusCode;
    this.code = code;
    this.retryable = Boolean(options.retryable);
    this.action = cleanText(options.action, 300);
    this.details = options.details && typeof options.details === "object"
      ? options.details
      : undefined;
  }
}

function cleanText(value, maxLength = 500) {
  return String(value || "").trim().slice(0, maxLength);
}

function normalizeResourceId(value, label = "resource") {
  const id = cleanText(value, 180);
  if (!RESOURCE_ID_PATTERN.test(id)) {
    throw new OpsHttpError(
      400,
      "invalid_resource_id",
      `A valid ${label} ID is required.`,
      { action: `Provide the exact Magmo ${label} document ID.` }
    );
  }
  return id;
}

function normalizeSlackTimestamp(value, label) {
  const timestamp = cleanText(value, 80);
  if (!SLACK_TIMESTAMP_PATTERN.test(timestamp)) {
    throw new OpsHttpError(
      400,
      "invalid_slack_timestamp",
      `A valid Slack ${label} timestamp is required.`,
      { action: `Send Slack's original ${label} timestamp without changing it.` }
    );
  }
  return timestamp;
}

function compareSlackTimestamps(left, right) {
  const value = (input) => {
    const match = String(input || "").match(/^(\d{8,})(?:\.(\d{1,9}))?$/);
    return match
      ? BigInt(match[1]) * 1_000_000_000n +
          BigInt(String(match[2] || "").padEnd(9, "0"))
      : null;
  };
  const leftValue = value(left);
  const rightValue = value(right);
  if (leftValue === null || rightValue === null) return 0;
  return leftValue < rightValue ? -1 : leftValue > rightValue ? 1 : 0;
}

function normalizeCommandIdentity(body = {}) {
  const source = body.source && typeof body.source === "object" ? body.source : {};
  const channel = cleanText(source.channel || body.slackChannel, 180);
  const threadTs = normalizeSlackTimestamp(
    source.threadTs || body.slackThreadTs,
    "thread"
  );
  const commandTs = normalizeSlackTimestamp(
    body.commandTs || source.commandTs,
    "command"
  );
  if (!channel || !RESOURCE_ID_PATTERN.test(channel)) {
    throw new OpsHttpError(400, "invalid_slack_channel", "A valid Slack channel is required.", {
      action: "Send source.channel with the Slack channel ID.",
    });
  }
  return {
    channel,
    threadTs,
    commandTs,
    command: cleanText(source.command || source.commandText || body.command, 1000),
    channelName: cleanText(source.channelName, 180),
    automation: cleanText(source.automation, 120),
    sourceType: cleanText(source.sourceType, 30).toLowerCase(),
  };
}

function normalizeActor(body = {}) {
  const actor = body.actor && typeof body.actor === "object" ? body.actor : {};
  const name = cleanText(actor.name || body.changedBy || body.completedBy, 180);
  const id = cleanText(actor.id || body.changedById || body.completedById, 180);
  if (!name && !id) {
    throw new OpsHttpError(400, "missing_actor", "The person issuing the command is required.", {
      action: "Send actor.id and actor.name, or the legacy changedBy/completedBy value.",
    });
  }
  return { id, name: name || id };
}

function normalizeMovementType(value) {
  const normalized = cleanText(value, 40)
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  return ["departed", "in_transit", "moved", "arrived"].includes(normalized)
    ? normalized
    : "";
}

function validateIngestRequest(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new OpsHttpError(400, "invalid_json_body", "The request body must be a JSON object.");
  }
  const eventType = cleanText(body.eventType, 100);
  if (!SUPPORTED_EVENT_TYPES.includes(eventType)) {
    throw new OpsHttpError(400, "unsupported_event_type", "Unsupported Ops event type.", {
      details: { supportedEventTypes: SUPPORTED_EVENT_TYPES },
    });
  }
  const normalized = { eventType, body };
  if (eventType === "work_order.bluefolder_status") {
    const statusSync = validateBlueFolderStatusSync(body);
    return { ...normalized, workOrderId: statusSync.workOrderId };
  }
  if (eventType === "work_order.imported") {
    const blueFolder =
      body.blueFolder &&
      typeof body.blueFolder === "object" &&
      !Array.isArray(body.blueFolder)
        ? body.blueFolder
        : {};
    const serviceRequestId = normalizeResourceId(
      blueFolder.serviceRequestId,
      "BlueFolder service request"
    );
    const suppliedWorkOrderId = cleanText(body.workOrderId, 180);
    if (
      suppliedWorkOrderId &&
      normalizeResourceId(suppliedWorkOrderId, "work order") !== serviceRequestId
    ) {
      throw new OpsHttpError(
        409,
        "bluefolder_identity_mismatch",
        "workOrderId must match the immutable BlueFolder service-request ID.",
        {
          action:
            "Send the same numeric identifier in workOrderId and blueFolder.serviceRequestId, or omit workOrderId.",
          details: { serviceRequestId, workOrderId: suppliedWorkOrderId },
        }
      );
    }
    const forbidden = forbiddenDispatchFields(body);
    if (forbidden.length) {
      throw new OpsHttpError(
        400,
        "bluefolder_import_contains_slack_receipt",
        "work_order.imported accepts BlueFolder data only and cannot carry Slack or Dispatch receipt fields.",
        {
          action:
            "Remove Slack coordinates, command timestamps, and Dispatch receipt fields. Magmo alone attaches the authoritative Dispatch receipt later.",
          details: { forbiddenFields: forbidden },
        }
      );
    }
    const unsupported = unsupportedImportFields(body);
    if (unsupported.length) {
      throw new OpsHttpError(
        400,
        "bluefolder_import_unsupported_fields",
        "work_order.imported contains fields outside the documented BlueFolder import contract.",
        {
          action:
            "Send only the fields documented by WorkOrderImportedRequest. Slack and Dispatch identifiers must use Magmo's separate authoritative receipt flow.",
          details: { unsupportedFields: unsupported },
        }
      );
    }
    try {
      if (Object.prototype.hasOwnProperty.call(body, "existingOnly") && typeof body.existingOnly !== "boolean") {
        throw Object.assign(new Error("existingOnly must be a boolean."), { code: "bluefolder_import_existing_only_invalid" });
      }
      validateEquipmentIdentity(blueFolder);
    } catch (error) {
      throw new OpsHttpError(400, error.code, error.message);
    }
    normalized.workOrderId = serviceRequestId;
    normalized.blueFolderServiceRequestId = serviceRequestId;
  } else if (WORK_ORDER_EVENT_TYPES.has(eventType)) {
    normalized.workOrderId = normalizeResourceId(body.workOrderId, "work order");
  }
  if (eventType === "message.created") {
    normalized.slackTs = normalizeSlackTimestamp(body.slackTs, "message");
    normalized.sender = resolveSlackSenderIdentity(body);
    if (!normalized.sender?.id) {
      throw new OpsHttpError(
        400,
        "missing_slack_sender",
        "A valid Slack sender ID is required for message evidence.",
        {
          action:
            "Send senderId as Slack's U… user ID, or send sender.id with that ID. Do not stringify the sender object.",
        }
      );
    }
  }
  if (COMMAND_EVENT_TYPES.has(eventType)) {
    normalized.source = normalizeCommandIdentity(body);
    normalized.actor = normalizeActor(body);
  }
  if (eventType === "work_order.hours_context") {
    normalized.throughSlackTs = normalizeSlackTimestamp(
      body.throughSlackTs,
      "hours cutoff"
    );
    if (normalized.throughSlackTs !== normalized.source.commandTs) {
      throw new OpsHttpError(
        400,
        "hours_cutoff_mismatch",
        "The hours cutoff must match the original Slack command timestamp.",
        {
          action:
            "Send throughSlackTs and source.commandTs using the exact timestamp of the same !hours command.",
        }
      );
    }
    const evidenceThroughSlackTs = cleanText(body.evidenceThroughSlackTs, 80);
    normalized.evidenceThroughSlackTs = evidenceThroughSlackTs
      ? normalizeSlackTimestamp(evidenceThroughSlackTs, "hours evidence cutoff")
      : "";
    if (
      normalized.evidenceThroughSlackTs &&
      compareSlackTimestamps(
        normalized.evidenceThroughSlackTs,
        normalized.throughSlackTs
      ) > 0
    ) {
      throw new OpsHttpError(
        400,
        "hours_evidence_after_cutoff",
        "The expected evidence timestamp cannot be later than the !hours command.",
        {
          action:
            "Send the newest pre-command Slack evidence timestamp, or leave evidenceThroughSlackTs empty when no reply evidence is known.",
        }
      );
    }
  }
  if (eventType === "trailer.movement") {
    if (!body.analysis || typeof body.analysis !== "object" || Array.isArray(body.analysis)) {
      throw new OpsHttpError(400, "invalid_trailer_analysis", "Trailer movement analysis is required.");
    }
    const updates = Array.isArray(body.analysis.updates) ? body.analysis.updates : [];
    if (!updates.length || updates.length > 5) {
      throw new OpsHttpError(
        400,
        "invalid_trailer_updates",
        "Provide between one and five unambiguous trailer movement updates."
      );
    }
    const seenTrailerIds = new Set();
    updates.forEach((update) => {
      const trailerId = normalizeResourceId(update && update.trailerId, "trailer");
      if (seenTrailerIds.has(trailerId)) {
        throw new OpsHttpError(400, "ambiguous_trailer_update", `Trailer ${trailerId} was included more than once.`);
      }
      seenTrailerIds.add(trailerId);
      const movementType = normalizeMovementType(update && update.movementType);
      if (!movementType) {
        throw new OpsHttpError(
          400,
          "invalid_movement_state",
          "Movement state must be departed, in-transit, moved, or arrived."
        );
      }
      if (update && update.fromClientId) normalizeResourceId(update.fromClientId, "origin client");
      if (["departed", "in_transit", "moved", "arrived"].includes(movementType)) {
        if (update && update.toClientId) {
          normalizeResourceId(update.toClientId, "destination client");
        } else if (!cleanText(update && update.toClientName, 180)) {
          throw new OpsHttpError(
            400,
            "missing_destination",
            "A destination client ID or existing typed destination name is required."
          );
        }
      }
      const confidence = Number(update && update.confidence);
      if (!Number.isFinite(confidence) || confidence < 0 || confidence > 1) {
        throw new OpsHttpError(400, "invalid_confidence", "Movement confidence must be between 0 and 1.");
      }
      if (!cleanText(update && update.evidence, 700)) {
        throw new OpsHttpError(400, "missing_evidence", "Every trailer change requires evidence.");
      }
    });
  }
  return normalized;
}

function commandEventId(eventType, identity) {
  return crypto
    .createHash("sha256")
    .update([eventType, identity.channel, identity.threadTs, identity.commandTs].join(":"))
    .digest("hex");
}

function runtimeCapabilities(env = process.env) {
  const environment = cleanText(
    env.OPS_ENVIRONMENT || env.NEXT_PUBLIC_DEPLOY_ENV || "production",
    40
  ).toLowerCase();
  const writeEnabled =
    cleanText(env.OPS_INGEST_MODE, 40).toLowerCase() !== "read_only" &&
    cleanText(env.OPS_INGEST_WRITE_ENABLED || "true", 20).toLowerCase() !== "false";
  const rawVersion = cleanText(
    env.OPS_DEPLOY_VERSION || env.K_REVISION || env.GITHUB_SHA || "development",
    120
  );
  const deployedVersion = /^[A-Za-z0-9_.:@/-]+$/.test(rawVersion)
    ? rawVersion
    : "unknown";
  return {
    ok: true,
    service: "magmo-ops-ingest",
    apiVersion: API_VERSION,
    deployedVersion,
    environment,
    writeEnabled,
    supportedEventTypes: SUPPORTED_EVENT_TYPES,
    movementStates: ["departed", "in_transit", "moved", "arrived"],
    slackWorkOrderChannelPolicy: "dispatch_only",
    dispatchChannelIdConfigured: Boolean(
      cleanText(
        env.OPS_DISPATCH_CHANNEL_ID || env.OPS_CONVERSATION_CHANNEL_ID,
        180
      )
    ),
    idempotencyKeyFields: ["source.channel", "source.threadTs", "commandTs"],
    bluefolderImport: {
      eventType: "work_order.imported",
      requiresSlackCoordinates: false,
      idempotencyKeyFields: ["blueFolder.serviceRequestId"],
      preservesAuthoritativeSlackReceipt: true,
      createsSlackPosts: false,
    },
    bluefolderStatusSync: BLUEFOLDER_STATUS_SYNC_CAPABILITY,
    bluefolderEquipmentLink: BLUEFOLDER_EQUIPMENT_LINK_CAPABILITY,
    workOrderCommandContext: {
      evidenceWatermarkField: "latestIngestedSlackTs",
      watermarkSource: "stored_message_evidence",
    },
    messageCreatedSender: {
      acceptedFields: ["senderId", "sender.id"],
      requiresSlackUserId: true,
      acceptsStringifiedSender: false,
    },
    slackDispatchRootOwnership: {
      owner: "magmo",
      externalRootCreationAllowed: false,
    },
    openApiUrl: "/api/ops/openapi",
  };
}

function classifyOpsError(error) {
  if (error instanceof OpsHttpError) return error;
  if (error instanceof BlueFolderStatusSyncError) {
    return new OpsHttpError(error.statusCode, error.code, error.message, {
      retryable: error.retryable,
    });
  }
  const message = cleanText(error && error.message, 700);
  if (["work_order_deleted", "work_order_not_found"].includes(error?.code)) {
    return new OpsHttpError(error.code === "work_order_deleted" ? 409 : 404, error.code, message, { retryable: false });
  }
  if (error?.code === "bluefolder_identity_conflict") {
    return new OpsHttpError(409, error.code, message, {
      retryable: false,
      action:
        "Do not reuse a Magmo work-order ID for a different BlueFolder service request.",
    });
  }
  if (error?.code === "bluefolder_import_contains_slack_receipt") {
    return new OpsHttpError(400, error.code, message, {
      retryable: false,
      action:
        "Remove all Slack and Dispatch receipt fields from work_order.imported.",
    });
  }
  if (error?.code === "bluefolder_import_unsupported_fields") {
    return new OpsHttpError(400, error.code, message, {
      retryable: false,
      action:
        "Send only the documented work_order.imported BlueFolder fields and omit Slack or Dispatch identifiers.",
      details: Array.isArray(error?.fields)
        ? { unsupportedFields: error.fields }
        : undefined,
    });
  }
  const missingWorkOrder = message.match(/Ops work order ([A-Za-z0-9_.:-]+) does not exist/i);
  if (missingWorkOrder) {
    return new OpsHttpError(404, "work_order_not_found", message, {
      action: `Sync or recreate work order ${missingWorkOrder[1]} in Magmo, then retry the original Slack command.`,
      details: { workOrderId: missingWorkOrder[1] },
    });
  }
  if (/trailer does not exist/i.test(message)) {
    return new OpsHttpError(404, "trailer_not_found", message, {
      action: "Refresh trailer.command_context and retry with an available trailer ID.",
    });
  }
  if (/client does not exist/i.test(message)) {
    return new OpsHttpError(404, "client_not_found", message, {
      action: "Refresh trailer.command_context and retry with an available client ID.",
    });
  }
  if (/Firebase Admin Firestore is not initialized|not configured/i.test(message)) {
    return new OpsHttpError(503, "service_unavailable", "The Ops ingest service is temporarily unavailable.", {
      retryable: true,
    });
  }
  if (
    /valid|required|unsupported|empty|invalid|mismatch|does not match|already at|ambiguous|confidence|duplicate trailer/i.test(
      message
    )
  ) {
    return new OpsHttpError(400, "invalid_request", message || "The request is invalid.", {
      retryable: false,
    });
  }
  return new OpsHttpError(500, "internal_error", "The Ops event could not be processed.", {
    retryable: true,
    action: "Retry later with the same idempotency key. Contact Magmo support if it continues.",
  });
}

function errorResponse(error, requestId) {
  const classified = classifyOpsError(error);
  return {
    statusCode: classified.statusCode,
    body: {
      ok: false,
      code: classified.code,
      error: classified.message,
      retryable: classified.retryable,
      ...(classified.action ? { action: classified.action } : {}),
      ...(classified.details ? { details: classified.details } : {}),
      requestId: cleanText(requestId, 80),
      apiVersion: API_VERSION,
    },
  };
}

function buildResourceChange(resourceType, resourceId, before, after) {
  const appliedChanges = {};
  const keys = new Set([
    ...Object.keys(before || {}),
    ...Object.keys(after || {}),
  ]);
  keys.forEach((key) => {
    if (key === "workflowStageElapsedMs") return;
    const previous = before && Object.prototype.hasOwnProperty.call(before, key)
      ? before[key]
      : null;
    const saved = after && Object.prototype.hasOwnProperty.call(after, key)
      ? after[key]
      : null;
    if (JSON.stringify(previous) !== JSON.stringify(saved)) {
      appliedChanges[key] = { before: previous, after: saved };
    }
  });
  return {
    resourceType,
    resourceId,
    before: before || null,
    after: after || null,
    appliedChanges,
  };
}

function buildBlueFolderImportChange(resourceId, before, after) {
  const change = buildResourceChange("work_order", resourceId, before, after);
  // Imports cannot write Dispatch receipts. A serialized new record includes
  // empty receipt defaults, and the post-transaction read may include a receipt
  // saved concurrently by Generate/Accept. Neither is a change made by import.
  // Keep the authoritative snapshots intact, but never claim receipt ownership.
  for (const field of PROTECTED_DISPATCH_FIELDS) {
    delete change.appliedChanges[field];
  }
  return change;
}

function buildOpenApiSpec() {
  const genericEventTypes = SUPPORTED_EVENT_TYPES.filter(
    (eventType) =>
      !["work_order.imported", "work_order.bluefolder_status", "message.created", "work_order.command_context"].includes(
        eventType
      )
  );
  return {
    openapi: "3.1.0",
    info: {
      title: "Magmo Ops Ingest API",
      version: API_VERSION,
      description:
        "Authenticated Ops synchronization. Magmo exclusively creates Slack Dispatch roots; external workers may import BlueFolder records without Slack coordinates and may ingest evidence only for an existing Dispatch thread.",
    },
    "x-magmo-capabilities": {
      slackDispatchRootOwner: "magmo",
      bluefolderImportEventType: "work_order.imported",
      bluefolderImportIdempotencyFields: ["blueFolder.serviceRequestId"],
      bluefolderStatusSync: BLUEFOLDER_STATUS_SYNC_CAPABILITY,
      bluefolderEquipmentLink: BLUEFOLDER_EQUIPMENT_LINK_CAPABILITY,
      commandContextEvidenceWatermark: "latestIngestedSlackTs",
      acceptedSlackSenderFields: ["senderId", "sender.id"],
      acceptsStringifiedSender: false,
    },
    servers: [
      { url: "https://magmo.cloud", description: "Production" },
      { url: "https://magmo-test.web.app", description: "Read-only staging" },
    ],
    paths: {
      "/api/ops/ingest": {
        post: {
          summary: "Ingest an authenticated Ops event",
          security: [{ OpsIngestSecret: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/IngestRequest" },
                examples: {
                  blueFolderStatus: {
                    summary: "Close an existing Magmo order from verified BlueFolder status, without external writes",
                    value: {
                      eventType: "work_order.bluefolder_status",
                      workOrderId: "10468",
                      blueFolder: { serviceRequestId: "10468", status: "Closed", dateTimeClosed: "2026-09-24T16:00:00Z" },
                      observedAt: "2026-09-24T16:01:00Z",
                    },
                  },
                  blueFolderImport: {
                    summary: "Import a BlueFolder work order without Slack data",
                    value: {
                      eventType: "work_order.imported",
                      workOrderId: "10468",
                      blueFolder: { serviceRequestId: "10468" },
                      number: "10468",
                      subject: "Scanner requires service",
                      description: "BlueFolder issue details",
                      customer: "Example Imaging",
                      bluefolderUrl:
                        "https://advancedimaging.bluefolder.com/service/sr.aspx?srid=10468",
                    },
                  },
                  messageEvidence: {
                    summary: "Ingest an existing Dispatch-thread message",
                    value: {
                      eventType: "message.created",
                      workOrderId: "10467",
                      slackChannel: "C07EPLKV9JT",
                      slackThreadTs: "1782847034.191739",
                      slackTs: "1782847999.000100",
                      senderId: "U07FH9NKCSD",
                      senderName: "Igor Savchenko",
                      text: "Heading out now",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Authoritative saved result or command context",
              content: {
                "application/json": {
                  schema: {
                    oneOf: [
                      { $ref: "#/components/schemas/BlueFolderStatusSyncResponse" },
                      { $ref: "#/components/schemas/WorkOrderImportedResponse" },
                      { $ref: "#/components/schemas/WorkOrderCommandContextResponse" },
                      { $ref: "#/components/schemas/GenericSuccessResponse" },
                    ],
                  },
                },
              },
            },
            400: { description: "Invalid or ambiguous request" },
            401: { description: "Missing or invalid credential" },
            403: { description: "Writes are disabled in this environment" },
            404: { description: "Referenced work order, trailer, or client does not exist" },
            409: { description: "The same command is already being processed" },
            500: { description: "Unexpected server failure" },
            503: { description: "The ingest service is not configured or available" },
          },
        },
      },
      "/api/ops/health": {
        get: { summary: "Get capabilities and deployed version", responses: { 200: { description: "Capabilities" } } },
      },
      "/api/ops/openapi": {
        get: { summary: "Get this OpenAPI document", responses: { 200: { description: "OpenAPI 3.1 document" } } },
      },
    },
    components: {
      securitySchemes: {
        OpsIngestSecret: { type: "apiKey", in: "header", name: "x-ops-ingest-secret" },
      },
      schemas: {
        IngestRequest: {
          oneOf: [
            { $ref: "#/components/schemas/BlueFolderStatusSyncRequest" },
            { $ref: "#/components/schemas/WorkOrderImportedRequest" },
            { $ref: "#/components/schemas/MessageCreatedRequest" },
            { $ref: "#/components/schemas/WorkOrderCommandContextRequest" },
            { $ref: "#/components/schemas/GenericOpsEventRequest" },
          ],
        },
        BlueFolderStatusSyncRequest: {
          type: "object",
          additionalProperties: false,
          required: ["eventType", "workOrderId", "blueFolder", "observedAt"],
          description: "One-way, status-only closure of an existing, exactly linked Magmo order. No Slack fields, record creation, hour edits, or message deletion. Manual reopenings are protected against stale closures.",
          properties: {
            eventType: { type: "string", const: "work_order.bluefolder_status" },
            workOrderId: { type: "string", pattern: RESOURCE_ID_PATTERN.source },
            observedAt: { type: "string", format: "date-time" },
            sourceUpdatedAt: { type: "string", format: "date-time" },
            blueFolder: {
              type: "object",
              additionalProperties: false,
              required: ["serviceRequestId", "status"],
              properties: {
                serviceRequestId: { type: "string", pattern: "^[0-9]+$" },
                status: { type: "string", const: "Closed" },
                dateTimeClosed: { type: "string", format: "date-time" },
              },
            },
          },
        },
        BlueFolderStatusSyncResponse: {
          type: "object",
          required: ["ok", "eventType", "before", "after", "appliedChanges", "requestId", "apiVersion"],
          properties: {
            ok: { type: "boolean", const: true },
            eventType: { type: "string", const: "work_order.bluefolder_status" },
            before: { type: "object" },
            after: { type: "object" },
            appliedChanges: { type: "object" },
            idempotentReplay: { type: "boolean" },
            reason: { type: "string" },
            requestId: { type: "string" },
            apiVersion: { type: "string" },
          },
        },
        WorkOrderImportedRequest: {
          type: "object",
          description:
            "Slack-free, idempotent BlueFolder import. Slack coordinates, command timestamps, and Dispatch receipt fields are rejected.",
          required: ["eventType", "blueFolder"],
          properties: {
            eventType: { type: "string", const: "work_order.imported" },
            existingOnly: { type: "boolean", description: "Metadata refresh must not recreate a missing work order." },
            workOrderId: {
              type: "string",
              pattern: RESOURCE_ID_PATTERN.source,
              description:
                "Optional compatibility alias. When supplied, it must equal blueFolder.serviceRequestId.",
            },
            blueFolder: {
              type: "object",
              required: ["serviceRequestId"],
              properties: {
                serviceRequestId: {
                  type: "string",
                  pattern: RESOURCE_ID_PATTERN.source,
                  description: "Immutable import identity and idempotency key.",
                },
                customerId: {
                  type: "string",
                  description: "BlueFolder parent customer ID.",
                },
                customerName: { type: "string" },
                customerLocationId: {
                  type: "string",
                  description:
                    "Exact BlueFolder customer-location ID used for deterministic Magmo Client linking.",
                },
                customerLocationName: { type: "string" },
                equipmentIds: {
                  type: "array", maxItems: 50, items: { type: "string", maxLength: 220 },
                  description: "All equipment IDs actually selected in BlueFolder; never inferred from the subject.",
                },
                equipmentNames: {
                  type: "array", maxItems: 50, items: { type: "string", maxLength: 220 },
                  description: "Selected equipment names; unique exact matches may resolve within the linked client only.",
                },
                addressStreet: { type: "string" },
                addressCity: { type: "string" },
                addressState: { type: "string" },
                addressPostalCode: { type: "string" },
                addressCountry: { type: "string" },
              },
              additionalProperties: false,
            },
            number: { type: "string" },
            subject: { type: "string" },
            description: { type: "string" },
            customer: { type: "string" },
            bluefolderUrl: { type: "string", format: "uri" },
            createdAt: { type: "string", format: "date-time" },
            bluefolderStatus: { type: "string" },
            bluefolderBillingStatus: { type: "string" },
            bluefolderDateTimeClosed: { type: "string" },
            bluefolderWorkflowStatus: { type: "string" },
            bluefolderAssignees: {
              type: "array",
              items: { $ref: "#/components/schemas/Person" },
            },
            clientId: { type: "string" },
            clientName: { type: "string" },
            clientLocation: { type: "string" },
            machineId: { type: "string" },
            machineName: { type: "string" },
            trailerId: { type: "string" },
            trailerName: { type: "string" },
          },
          additionalProperties: false,
        },
        MessageCreatedRequest: {
          type: "object",
          required: [
            "eventType",
            "workOrderId",
            "slackChannel",
            "slackThreadTs",
            "slackTs",
            "text",
          ],
          anyOf: [
            { required: ["senderId"] },
            {
              required: ["sender"],
              properties: { sender: { required: ["id"] } },
            },
          ],
          properties: {
            eventType: { type: "string", const: "message.created" },
            workOrderId: { type: "string", pattern: RESOURCE_ID_PATTERN.source },
            slackChannel: { type: "string" },
            slackThreadTs: { type: "string", pattern: SLACK_TIMESTAMP_PATTERN.source },
            slackTs: { type: "string", pattern: SLACK_TIMESTAMP_PATTERN.source },
            senderId: { type: "string", pattern: "^[UW][A-Z0-9]{5,}$" },
            senderName: { type: "string" },
            sender: { $ref: "#/components/schemas/SlackSender" },
            text: { type: "string" },
          },
        },
        WorkOrderCommandContextRequest: {
          type: "object",
          required: ["eventType", "workOrderId"],
          properties: {
            eventType: { type: "string", const: "work_order.command_context" },
            workOrderId: { type: "string", pattern: RESOURCE_ID_PATTERN.source },
          },
          additionalProperties: false,
        },
        GenericOpsEventRequest: {
          type: "object",
          required: ["eventType"],
          properties: {
            eventType: { type: "string", enum: genericEventTypes },
            workOrderId: { type: "string", pattern: RESOURCE_ID_PATTERN.source },
            slackChannel: { type: "string" },
            slackThreadTs: { type: "string", pattern: SLACK_TIMESTAMP_PATTERN.source },
            slackPermalink: { type: "string", format: "uri" },
            commandTs: { type: "string", pattern: SLACK_TIMESTAMP_PATTERN.source },
            source: { type: "object" },
            actor: { $ref: "#/components/schemas/Person" },
            analysis: { type: "object" },
          },
        },
        Person: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string", format: "email" },
          },
        },
        SlackSender: {
          type: "object",
          required: ["id"],
          description: "Must be an object. JSON-stringified sender objects are rejected.",
          properties: {
            id: { type: "string", pattern: "^[UW][A-Z0-9]{5,}$" },
            name: { type: "string" },
          },
          additionalProperties: true,
        },
        ResourceChange: {
          type: "object",
          required: ["resourceType", "resourceId", "before", "after", "appliedChanges"],
          properties: {
            resourceType: { type: "string" },
            resourceId: { type: "string" },
            before: { type: ["object", "null"] },
            after: { type: ["object", "null"] },
            appliedChanges: { type: "object" },
          },
        },
        WorkOrderImportedResponse: {
          type: "object",
          required: [
            "ok",
            "eventType",
            "created",
            "idempotentReplay",
            "before",
            "after",
            "appliedChanges",
            "requestId",
            "apiVersion",
          ],
          properties: {
            ok: { type: "boolean", const: true },
            eventType: { type: "string", const: "work_order.imported" },
            created: { type: "boolean" },
            idempotentReplay: { type: "boolean" },
            idempotencyKey: {
              type: "object",
              properties: { blueFolderServiceRequestId: { type: "string" } },
            },
            before: { type: ["object", "null"] },
            after: { type: "object" },
            appliedChanges: { type: "object" },
            changes: {
              type: "array",
              items: { $ref: "#/components/schemas/ResourceChange" },
            },
            requestId: { type: "string" },
            apiVersion: { type: "string" },
          },
        },
        WorkOrderCommandContextResponse: {
          type: "object",
          required: ["ok", "context", "requestId"],
          properties: {
            ok: { type: "boolean", const: true },
            context: {
              type: "object",
              required: ["workOrderId", "latestIngestedSlackTs"],
              properties: {
                workOrderId: { type: "string" },
                latestIngestedSlackTs: {
                  type: ["string", "null"],
                  pattern: SLACK_TIMESTAMP_PATTERN.source,
                  description:
                    "Newest Slack timestamp already persisted in Magmo message evidence. Resume after this value without replaying older messages.",
                },
              },
            },
            requestId: { type: "string" },
          },
        },
        GenericSuccessResponse: {
          type: "object",
          required: ["ok", "requestId"],
          properties: {
            ok: { type: "boolean" },
            requestId: { type: "string" },
          },
        },
      },
    },
  };
}

module.exports = {
  API_VERSION,
  COMMAND_EVENT_TYPES,
  OpsHttpError,
  READ_EVENT_TYPES,
  SUPPORTED_EVENT_TYPES,
  WRITE_EVENT_TYPES,
  buildBlueFolderImportChange,
  buildResourceChange,
  buildOpenApiSpec,
  classifyOpsError,
  cleanText,
  commandEventId,
  errorResponse,
  normalizeActor,
  normalizeCommandIdentity,
  normalizeMovementType,
  normalizeResourceId,
  runtimeCapabilities,
  validateIngestRequest,
};
