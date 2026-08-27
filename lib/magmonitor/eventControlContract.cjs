const crypto = require("node:crypto");

const MAGMONITOR_COMMAND_ROOT = "magmonitor/commands";
const MAGMONITOR_INGEST_THROTTLE_ROOT = "magmonitor/ingestThrottle";
const DEFAULT_INGEST_MIN_INTERVAL_MS = 30 * 60 * 1000;
const DEFAULT_INGEST_EARLY_ARRIVAL_TOLERANCE_MS = 60 * 1000;
const DEFAULT_DEVICE_SESSION_TTL_SECONDS = 60 * 60;

function normalizeSystemId(value) {
  const systemId = String(value || "").trim();
  return /^[a-z0-9][a-z0-9-]{4,119}$/i.test(systemId) ? systemId : "";
}

function commandPath(systemId) {
  const normalized = normalizeSystemId(systemId);
  if (!normalized) throw new Error("A valid Magmonitor system ID is required.");
  return `${MAGMONITOR_COMMAND_ROOT}/${normalized}`;
}

function ingestThrottlePath(systemId) {
  const normalized = normalizeSystemId(systemId);
  if (!normalized) throw new Error("A valid Magmonitor system ID is required.");
  return `${MAGMONITOR_INGEST_THROTTLE_ROOT}/${normalized}`;
}

function clampInteger(value, fallback, minimum, maximum) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(maximum, Math.max(minimum, Math.trunc(parsed)));
}

function ingestMinIntervalMs(value) {
  return clampInteger(
    value,
    DEFAULT_INGEST_MIN_INTERVAL_MS,
    DEFAULT_INGEST_MIN_INTERVAL_MS,
    24 * 60 * 60 * 1000
  );
}

function deviceSessionTtlSeconds(value) {
  return clampInteger(
    value,
    DEFAULT_DEVICE_SESSION_TTL_SECONDS,
    15 * 60,
    60 * 60
  );
}

function ingestNextAllowedAtMs(acceptedAtMs, intervalMs) {
  return (
    acceptedAtMs +
    ingestMinIntervalMs(intervalMs) -
    DEFAULT_INGEST_EARLY_ARRIVAL_TOLERANCE_MS
  );
}

function deviceSessionIdentity(systemId, expiresAtSeconds) {
  const normalized = normalizeSystemId(systemId);
  if (!normalized) throw new Error("A valid Magmonitor system ID is required.");
  const digest = crypto.createHash("sha256").update(normalized).digest("hex").slice(0, 32);
  return {
    uid: `magmonitor-device-${digest}`,
    claims: {
      magmonitorDevice: true,
      magmonitorSystemId: normalized,
      magmonitorSessionExpiresAt: Math.trunc(Number(expiresAtSeconds)),
    },
  };
}

function isoTime(value) {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate().toISOString();
  const parsed = value instanceof Date ? value : new Date(value);
  return Number.isFinite(parsed.getTime()) ? parsed.toISOString() : null;
}

function buildPublishedCommand(control = {}) {
  const commandId = String(control.commandId || "").trim().slice(0, 80);
  const action = control.action === "stop" ? "stop" : control.action === "start" ? "start" : "";
  const requestedAt = isoTime(control.requestedAt);
  const expiresAt = isoTime(control.expiresAt);
  const issuedAtMs = Number(
    control.issuedAtMs ?? (requestedAt ? new Date(requestedAt).getTime() : Number.NaN)
  );
  const expiresAtMs = Number(
    control.expiresAtMs ?? (expiresAt ? new Date(expiresAt).getTime() : Number.NaN)
  );
  if (!commandId || !action || !Number.isFinite(issuedAtMs) || !Number.isFinite(expiresAtMs)) {
    throw new Error("A complete Magmonitor command is required.");
  }
  return {
    commandId,
    action,
    issuedAtMs: Math.trunc(issuedAtMs),
    expiresAtMs: Math.trunc(expiresAtMs),
    protocolVersion: 2,
  };
}

async function publishCommand(database, systemId, control) {
  if (!database || typeof database.ref !== "function") {
    throw new Error("Magmonitor realtime control is unavailable.");
  }
  const command = buildPublishedCommand(control);
  await database.ref(commandPath(systemId)).set(command);
  return command;
}

async function clearCommand(database, systemId, commandId) {
  if (!database || typeof database.ref !== "function") {
    throw new Error("Magmonitor realtime control is unavailable.");
  }
  const expectedId = String(commandId || "").trim().slice(0, 80);
  if (!expectedId) return false;
  const result = await database.ref(commandPath(systemId)).transaction(
    (current) => {
      if (!current || current.commandId !== expectedId) return undefined;
      return null;
    },
    undefined,
    false
  );
  return Boolean(result?.committed);
}

function throttleDecision(current, nowMs, intervalMs) {
  const acceptedAtMs = Number(current?.acceptedAtMs);
  const minimumInterval = ingestMinIntervalMs(intervalMs);
  if (!Number.isFinite(acceptedAtMs)) {
    return {
      accepted: true,
      retryAfterMs: 0,
      nextAllowedAtMs: ingestNextAllowedAtMs(nowMs, minimumInterval),
    };
  }
  const nextAllowedAtMs = ingestNextAllowedAtMs(acceptedAtMs, minimumInterval);
  return {
    accepted: nowMs >= nextAllowedAtMs,
    retryAfterMs: Math.max(0, nextAllowedAtMs - nowMs),
    nextAllowedAtMs:
      nowMs >= nextAllowedAtMs
        ? ingestNextAllowedAtMs(nowMs, minimumInterval)
        : nextAllowedAtMs,
  };
}

async function claimIngestWindow(
  database,
  { systemId, requestId, nowMs = Date.now(), intervalMs = DEFAULT_INGEST_MIN_INTERVAL_MS }
) {
  if (!database || typeof database.ref !== "function") {
    throw new Error("Magmonitor ingest throttling is unavailable.");
  }
  const normalizedRequestId = String(requestId || "").trim().slice(0, 80);
  if (!normalizedRequestId) throw new Error("A Magmonitor ingest request ID is required.");
  const minimumInterval = ingestMinIntervalMs(intervalMs);
  const fallbackNextAllowedAtMs = ingestNextAllowedAtMs(nowMs, minimumInterval);
  let lastDecision = {
    accepted: false,
    retryAfterMs: fallbackNextAllowedAtMs - nowMs,
    nextAllowedAtMs: fallbackNextAllowedAtMs,
  };
  const result = await database.ref(ingestThrottlePath(systemId)).transaction(
    (current) => {
      lastDecision = throttleDecision(current, nowMs, minimumInterval);
      if (!lastDecision.accepted) return undefined;
      return {
        requestId: normalizedRequestId,
        acceptedAtMs: nowMs,
        nextAllowedAtMs: lastDecision.nextAllowedAtMs,
      };
    },
    undefined,
    false
  );
  if (!result?.committed) {
    return {
      accepted: false,
      retryAfterMs: Math.max(
        1,
        lastDecision.retryAfterMs || lastDecision.nextAllowedAtMs - nowMs || minimumInterval
      ),
      nextAllowedAtMs: lastDecision.nextAllowedAtMs,
    };
  }
  return {
    accepted: true,
    retryAfterMs: 0,
    nextAllowedAtMs: lastDecision.nextAllowedAtMs,
  };
}

async function releaseIngestWindow(database, { systemId, requestId }) {
  if (!database || typeof database.ref !== "function") return false;
  const expectedId = String(requestId || "").trim().slice(0, 80);
  if (!expectedId) return false;
  const result = await database.ref(ingestThrottlePath(systemId)).transaction(
    (current) => {
      if (!current || current.requestId !== expectedId) return undefined;
      return null;
    },
    undefined,
    false
  );
  return Boolean(result?.committed);
}

function legacyUpgradePayload() {
  return {
    ok: false,
    code: "event_driven_control_required",
    error: "This Magmonitor control agent must be upgraded to event-driven control.",
    eventDriven: true,
    deviceSessionEndpoint: "/api/magmonitor/device-session",
  };
}

function controlWritesAllowed(environment = process.env) {
  const deployment = String(environment.OPS_ENVIRONMENT || "").trim().toLowerCase();
  const mode = String(environment.OPS_INGEST_MODE || "").trim().toLowerCase();
  const writeEnabled = String(environment.OPS_INGEST_WRITE_ENABLED || "")
    .trim()
    .toLowerCase();
  if (["staging", "test"].includes(deployment)) return false;
  if (["read_only", "readonly"].includes(mode)) return false;
  if (writeEnabled === "false") return false;
  return true;
}

module.exports = {
  DEFAULT_DEVICE_SESSION_TTL_SECONDS,
  DEFAULT_INGEST_EARLY_ARRIVAL_TOLERANCE_MS,
  DEFAULT_INGEST_MIN_INTERVAL_MS,
  MAGMONITOR_COMMAND_ROOT,
  MAGMONITOR_INGEST_THROTTLE_ROOT,
  buildPublishedCommand,
  claimIngestWindow,
  clearCommand,
  commandPath,
  controlWritesAllowed,
  deviceSessionIdentity,
  deviceSessionTtlSeconds,
  ingestMinIntervalMs,
  ingestThrottlePath,
  legacyUpgradePayload,
  normalizeSystemId,
  publishCommand,
  releaseIngestWindow,
  throttleDecision,
};
