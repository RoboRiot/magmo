const crypto = require("crypto");

const API_VERSION = "2026-08-04";
const READ_EVENT_TYPES = Object.freeze([
  "work_order.command_context",
  "trailer.command_context",
]);
const WRITE_EVENT_TYPES = Object.freeze([
  "work_order.created",
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
  if (WORK_ORDER_EVENT_TYPES.has(eventType)) {
    normalized.workOrderId = normalizeResourceId(body.workOrderId, "work order");
  }
  if (COMMAND_EVENT_TYPES.has(eventType)) {
    normalized.source = normalizeCommandIdentity(body);
    normalized.actor = normalizeActor(body);
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
        normalizeResourceId(update && update.toClientId, "destination client");
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
    idempotencyKeyFields: ["source.channel", "source.threadTs", "commandTs"],
    openApiUrl: "/api/ops/openapi",
  };
}

function classifyOpsError(error) {
  if (error instanceof OpsHttpError) return error;
  const message = cleanText(error && error.message, 700);
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

function buildOpenApiSpec() {
  return {
    openapi: "3.1.0",
    info: {
      title: "Magmo Ops Ingest API",
      version: API_VERSION,
      description: "Authenticated, idempotent Slack-to-Magmo work-order and trailer events.",
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
              },
            },
          },
          responses: {
            200: { description: "Authoritative saved result or command context" },
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
          type: "object",
          required: ["eventType"],
          properties: {
            eventType: { type: "string", enum: SUPPORTED_EVENT_TYPES },
            workOrderId: { type: "string", pattern: RESOURCE_ID_PATTERN.source },
            commandTs: { type: "string", pattern: SLACK_TIMESTAMP_PATTERN.source },
            source: {
              type: "object",
              properties: {
                channel: { type: "string" },
                threadTs: { type: "string", pattern: SLACK_TIMESTAMP_PATTERN.source },
                command: { type: "string" },
              },
            },
            actor: {
              type: "object",
              properties: { id: { type: "string" }, name: { type: "string" } },
            },
            analysis: { type: "object" },
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
