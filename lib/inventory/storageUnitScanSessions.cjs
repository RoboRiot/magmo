"use strict";

const crypto = require("node:crypto");
const storageUnitContract = require("./storageUnitContract.cjs");

const STORAGE_SCAN_SESSION_COLLECTION = "StorageUnitScanSessions";
const STORAGE_SCAN_EVENT_COLLECTION = "Events";
const STORAGE_SCAN_CONTROL_COLLECTION = "StorageUnitScanControls";
const STORAGE_SCAN_CONTROL_DOCUMENT = "default";
const STORAGE_UNIT_COLLECTION = "StorageUnits";
const STORAGE_SCAN_SCHEMA_VERSION = 1;
const DEFAULT_SESSION_TTL_SECONDS = 300;
const MIN_SESSION_TTL_SECONDS = 60;
const MAX_SESSION_TTL_SECONDS = 900;
const MAX_SESSION_EVENTS = 250;
const DEFAULT_POLL_AFTER_MS = 1500;
const BRIDGE_TIMEOUT_MS = 8000;
const SESSION_ID_PATTERN = /^[A-Za-z0-9_-]{20,80}$/;
const EVENT_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{40,120}$/;
const OPEN_SESSION_STATUSES = new Set(["starting", "active"]);
const TERMINAL_SESSION_STATUSES = new Set([
  "cancelled",
  "confirmed",
  "expired",
  "failed",
]);

class StorageScanError extends Error {
  constructor(statusCode, code, message) {
    super(message);
    this.name = "StorageScanError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

function fail(statusCode, code, message) {
  throw new StorageScanError(statusCode, code, message);
}

function cleanText(value, maxLength = 200) {
  return String(value == null ? "" : value).trim().slice(0, maxLength);
}

function cleanSessionId(value) {
  const candidate = cleanText(value, 100);
  return SESSION_ID_PATTERN.test(candidate) ? candidate : "";
}

function cleanEventId(value) {
  const candidate = cleanText(value, 128);
  return EVENT_ID_PATTERN.test(candidate) ? candidate : "";
}

function cleanScannedCode(value) {
  const candidate = cleanText(value, 180);
  if (
    !candidate ||
    /[\/\\\u0000-\u001f\u007f]/.test(candidate) ||
    Buffer.byteLength(candidate, "utf8") > 360
  ) {
    return "";
  }
  return candidate;
}

function cleanBridgeSessionId(value) {
  const candidate = cleanText(value, 120);
  return /^[A-Za-z0-9][A-Za-z0-9._:-]{0,119}$/.test(candidate)
    ? candidate
    : "";
}

function cleanBridgeExpiry(value) {
  const candidate = cleanText(value, 64);
  const millis = Date.parse(candidate);
  return candidate && Number.isFinite(millis) ? new Date(millis).toISOString() : "";
}

function normalizeEmail(value) {
  return cleanText(value, 180).toLowerCase();
}

function timestampToMillis(value) {
  if (!value) return 0;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (typeof value.toDate === "function") return value.toDate().getTime();
  if (typeof value.seconds === "number") {
    return value.seconds * 1000 + Math.floor(Number(value.nanoseconds || 0) / 1e6);
  }
  const millis = value instanceof Date ? value.getTime() : Date.parse(value);
  return Number.isFinite(millis) ? millis : 0;
}

function timestampToIso(value) {
  const millis = timestampToMillis(value);
  return millis > 0 ? new Date(millis).toISOString() : null;
}

function sessionTtlSeconds(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return DEFAULT_SESSION_TTL_SECONDS;
  return Math.min(
    MAX_SESSION_TTL_SECONDS,
    Math.max(MIN_SESSION_TTL_SECONDS, Math.floor(parsed))
  );
}

function generateSessionCredentials() {
  const sessionId = crypto.randomBytes(18).toString("base64url");
  const callbackToken = crypto.randomBytes(32).toString("base64url");
  return {
    sessionId,
    callbackToken,
    callbackTokenHash: hashCallbackToken(callbackToken),
  };
}

function hashCallbackToken(token) {
  return crypto.createHash("sha256").update(String(token || ""), "utf8").digest("hex");
}

function cleanCallbackToken(value) {
  const candidate = cleanText(value, 160);
  return TOKEN_PATTERN.test(candidate) ? candidate : "";
}

function callbackTokenMatches(token, expectedHash) {
  const candidate = cleanCallbackToken(token);
  const expected = cleanText(expectedHash, 64).toLowerCase();
  if (!candidate || !/^[a-f0-9]{64}$/.test(expected)) {
    return false;
  }
  const actualBuffer = Buffer.from(hashCallbackToken(candidate), "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  return crypto.timingSafeEqual(actualBuffer, expectedBuffer);
}

function bearerTokenFromRequest(req) {
  const header = cleanText(req?.headers?.authorization, 240);
  const match = header.match(/^Bearer\s+([^\s]+)$/i);
  return match ? match[1] : "";
}

function isOpenScanStatus(value) {
  return OPEN_SESSION_STATUSES.has(cleanText(value, 30).toLowerCase());
}

function isTerminalScanStatus(value) {
  return TERMINAL_SESSION_STATUSES.has(cleanText(value, 30).toLowerCase());
}

function storageScanSessionRef(db, sessionId) {
  const safeSessionId = cleanSessionId(sessionId);
  if (!db || !safeSessionId) {
    fail(400, "invalid_session_id", "A valid scan session ID is required.");
  }
  return db.collection(STORAGE_SCAN_SESSION_COLLECTION).doc(safeSessionId);
}

function storageScanControlRef(db) {
  if (!db) fail(503, "scanner_unavailable", "The scanner service is unavailable.");
  return db
    .collection(STORAGE_SCAN_CONTROL_COLLECTION)
    .doc(STORAGE_SCAN_CONTROL_DOCUMENT);
}

function storageScanEventRef(sessionRef, eventId) {
  const safeEventId = cleanEventId(eventId);
  if (!sessionRef || !safeEventId) {
    fail(400, "invalid_event_id", "A valid scan event ID is required.");
  }
  const documentId = crypto
    .createHash("sha256")
    .update(safeEventId, "utf8")
    .digest("hex");
  return sessionRef.collection(STORAGE_SCAN_EVENT_COLLECTION).doc(documentId);
}

function releaseStorageScanControl(
  transaction,
  db,
  sessionId,
  now = new Date(),
  controlSnapshot
) {
  const controlRef = storageScanControlRef(db);
  const safeSessionId = cleanSessionId(sessionId);
  if (!controlSnapshot || !safeSessionId) {
    fail(
      500,
      "scan_control_snapshot_required",
      "The scanner lock could not be released safely."
    );
  }
  if (cleanSessionId(controlSnapshot.data()?.activeSessionId) !== safeSessionId) {
    return false;
  }
  transaction.set(
    controlRef,
    {
      activeSessionId: null,
      activeUnitId: null,
      activeTargetType: null,
      activeWorkOrderId: null,
      status: "idle",
      expiresAt: null,
      updatedAt: now,
      lastReleasedSessionId: safeSessionId,
    },
    { merge: true }
  );
  return true;
}

function normalizeSessionStatus(value) {
  const status = cleanText(value, 30).toLowerCase();
  if (OPEN_SESSION_STATUSES.has(status) || TERMINAL_SESSION_STATUSES.has(status)) {
    return status;
  }
  return "failed";
}

function sanitizeResolution(value = {}) {
  const allowedStatuses = new Set(["resolved", "unknown", "ambiguous", "invalid"]);
  const allowedKinds = new Set(["item", "bin", "pallet"]);
  const status = cleanText(value.status, 20).toLowerCase();
  const kind = cleanText(value.kind, 20).toLowerCase();
  const safePreviewList = (entry) => {
    const values = Array.isArray(entry) ? entry : entry == null ? [] : [entry];
    return Array.from(
      new Set(values.map((item) => cleanText(item, 180)).filter(Boolean))
    ).slice(0, 8);
  };
  const preview = value.preview && typeof value.preview === "object"
    ? {
        id: cleanText(value.preview.id, 180),
        localSN: cleanText(value.preview.localSN, 180),
        name: cleanText(value.preview.name, 240),
        pn: safePreviewList(value.preview.pn),
        sn: safePreviewList(value.preview.sn),
        displayNumber: cleanText(value.preview.displayNumber, 40),
        hidden: value.preview.hidden === true,
      }
    : null;
  return {
    status: allowedStatuses.has(status) ? status : "invalid",
    kind: allowedKinds.has(kind) ? kind : null,
    code: cleanScannedCode(value.code),
    canonicalCode: cleanText(value.canonicalCode, 180),
    itemId: cleanText(value.itemId, 180),
    storageUnitId: storageUnitContract.normalizeStorageUnitId(value.storageUnitId),
    preview,
    message: cleanText(value.message, 500),
  };
}

function publicScanEvent(data = {}) {
  const hasResolution = Boolean(
    data.resolution &&
      typeof data.resolution === "object" &&
      ["resolved", "unknown", "ambiguous", "invalid"].includes(
        cleanText(data.resolution.status, 20).toLowerCase()
      )
  );
  const resolution = sanitizeResolution(data.resolution || {});
  return {
    eventId: cleanEventId(data.eventId),
    code: cleanScannedCode(data.code),
    scannedAt: timestampToIso(data.scannedAt),
    receivedAt: timestampToIso(data.receivedAt),
    sequence: Math.max(0, Number(data.sequence) || 0),
    status: hasResolution ? resolution.status : "received",
    kind: hasResolution ? resolution.kind : null,
    itemId: hasResolution ? resolution.itemId || null : null,
    storageUnitId: hasResolution ? resolution.storageUnitId || null : null,
    canonicalCode: hasResolution ? resolution.canonicalCode || null : null,
    preview: hasResolution ? resolution.preview : null,
    message: hasResolution ? resolution.message || "" : "Queued for resolution.",
    resolution: hasResolution ? resolution : null,
  };
}

function publicScanSession(sessionId, data = {}, events = []) {
  const unit = storageUnitContract.parseStorageUnitId(data.unitId);
  return {
    id: cleanSessionId(sessionId),
    sessionId: cleanSessionId(sessionId),
    status: normalizeSessionStatus(data.status),
    unitId: unit?.id || "",
    unitType: unit?.type || "",
    unitNumber: unit?.number || 0,
    createdAt: timestampToIso(data.createdAt),
    updatedAt: timestampToIso(data.updatedAt),
    expiresAt: timestampToIso(data.expiresAt),
    completedAt: timestampToIso(data.completedAt),
    eventCount: Math.max(0, Number(data.eventCount) || 0),
    pollAfterMs: DEFAULT_POLL_AFTER_MS,
    bridgeStartStatus: cleanText(data.bridgeStartStatus, 30) || "unknown",
    bridgeStopStatus: cleanText(data.bridgeStopStatus, 30) || "not_requested",
    events: events.map(publicScanEvent).filter((event) => event.eventId),
  };
}

function isLoopbackHostname(hostname) {
  const normalized = cleanText(hostname, 255).toLowerCase();
  return (
    normalized === "localhost" ||
    normalized === "127.0.0.1" ||
    normalized === "::1" ||
    normalized === "[::1]"
  );
}

function normalizeServiceUrl(value, { production = false } = {}) {
  const candidate = cleanText(value, 1000);
  if (!candidate) return "";
  let parsed;
  try {
    parsed = new URL(candidate);
  } catch {
    return "";
  }
  if (parsed.username || parsed.password || parsed.hash) return "";
  const loopback = isLoopbackHostname(parsed.hostname);
  if (production) {
    if (parsed.protocol !== "https:" || loopback) return "";
  } else if (parsed.protocol !== "https:" && !(parsed.protocol === "http:" && loopback)) {
    return "";
  }
  return parsed.toString().replace(/\/$/, "");
}

function appendBridgePath(baseUrl, action) {
  const parsed = new URL(`${String(baseUrl).replace(/\/$/, "")}/`);
  parsed.pathname = `${parsed.pathname.replace(/\/$/, "")}/storage-scan/${action}`;
  return parsed.toString();
}

function replaceStorageBridgeAction(targetUrl, action) {
  const parsed = new URL(targetUrl);
  const suffix = "/storage-scan/stop";
  if (!parsed.pathname.endsWith(suffix)) return "";
  parsed.pathname = `${parsed.pathname.slice(0, -suffix.length)}/storage-scan/${action}`;
  return parsed.toString();
}

function scannerEnabled(env = process.env) {
  return cleanText(env.STORAGE_SCAN_ENABLED, 10).toLowerCase() === "true";
}

function getBridgeConfiguration(action, env = process.env) {
  if (!["start", "stop", "drain"].includes(action)) {
    fail(500, "invalid_bridge_action", "The scanner bridge action is invalid.");
  }
  if (!scannerEnabled(env)) {
    fail(503, "scanner_disabled", "Warehouse scanning is disabled.");
  }

  const production = cleanText(env.NODE_ENV, 30).toLowerCase() === "production";
  const opsEnvironment = cleanText(env.OPS_ENVIRONMENT, 30).toLowerCase();
  const isolatedEnvironment =
    opsEnvironment === "test" ||
    opsEnvironment === "testing" ||
    opsEnvironment === "staging";
  const explicitName =
    action === "start"
      ? "STORAGE_SCAN_START_URL"
      : action === "drain"
        ? "STORAGE_SCAN_DRAIN_URL"
        : "STORAGE_SCAN_STOP_URL";
  const explicitUrl = normalizeServiceUrl(env[explicitName], { production });
  if (env[explicitName] && !explicitUrl) {
    fail(503, "scanner_configuration_invalid", "The scanner bridge URL is invalid.");
  }

  if (isolatedEnvironment) {
    const exactStart = normalizeServiceUrl(env.STORAGE_SCAN_START_URL, {
      production,
    });
    const exactStop = normalizeServiceUrl(env.STORAGE_SCAN_STOP_URL, {
      production,
    });
    const isolatedToken = cleanText(env.STORAGE_SCAN_BRIDGE_TOKEN, 500);
    if (!exactStart || !exactStop || isolatedToken.length < 32) {
      fail(
        503,
        "scanner_test_configuration_invalid",
        "The isolated scanner bridge is not fully configured."
      );
    }
    const isolatedCandidate =
      action === "start"
        ? exactStart
        : action === "stop"
          ? exactStop
          : replaceStorageBridgeAction(exactStop, "drain");
    if (!isolatedCandidate) {
      fail(
        503,
        "scanner_test_configuration_invalid",
        "The isolated scanner drain URL could not be derived."
      );
    }
    return {
      bridgeToken: isolatedToken,
      candidates: [explicitUrl || isolatedCandidate],
      production,
    };
  }

  const publicBase = normalizeServiceUrl(env.NGROK_BASE_URL, { production });
  if (env.NGROK_BASE_URL && !publicBase) {
    fail(503, "scanner_configuration_invalid", "The public scanner bridge URL is invalid.");
  }

  const localBase = production
    ? ""
    : normalizeServiceUrl(
        env.STORAGE_SCAN_LOCAL_BASE_URL || "http://127.0.0.1:5000",
        { production: false }
      );
  if (!production && env.STORAGE_SCAN_LOCAL_BASE_URL && !localBase) {
    fail(503, "scanner_configuration_invalid", "The local scanner bridge URL is invalid.");
  }

  const candidates = Array.from(
    new Set(
      [
        explicitUrl,
        publicBase ? appendBridgePath(publicBase, action) : "",
        localBase ? appendBridgePath(localBase, action) : "",
      ].filter(Boolean)
    )
  );
  if (!candidates.length) {
    fail(503, "scanner_not_configured", "The scanner bridge is not configured.");
  }

  const hasPublicCandidate = candidates.some(
    (candidate) => !isLoopbackHostname(new URL(candidate).hostname)
  );
  const bridgeToken = cleanText(env.STORAGE_SCAN_BRIDGE_TOKEN, 500);
  if (hasPublicCandidate && bridgeToken.length < 32) {
    fail(
      503,
      "scanner_bridge_auth_missing",
      "The public scanner bridge is not securely configured."
    );
  }
  return { bridgeToken, candidates, production };
}

function getCallbackBaseUrl(env = process.env) {
  if (!scannerEnabled(env)) {
    fail(503, "scanner_disabled", "Warehouse scanning is disabled.");
  }
  const production = cleanText(env.NODE_ENV, 30).toLowerCase() === "production";
  const configured = env.STORAGE_SCAN_CALLBACK_BASE_URL ||
    (production ? "" : "http://127.0.0.1:3000");
  const callbackBase = normalizeServiceUrl(configured, { production });
  if (!callbackBase) {
    fail(
      503,
      "scanner_callback_not_configured",
      "The scanner callback origin is not securely configured."
    );
  }
  return callbackBase;
}

function buildCallbackUrl(sessionId, env = process.env) {
  const safeSessionId = cleanSessionId(sessionId);
  if (!safeSessionId) {
    fail(400, "invalid_session_id", "A valid scan session ID is required.");
  }
  return `${getCallbackBaseUrl(env)}/api/storage-units/scan-sessions/${encodeURIComponent(
    safeSessionId
  )}/events`;
}

async function readJsonResponse(response) {
  const raw = await response.text().catch(() => "");
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function bridgeRouteCandidate(targetUrl, action, routeFamily) {
  if (routeFamily === "storage-scan") return targetUrl;
  if (routeFamily !== "work-order-scan") {
    fail(500, "invalid_bridge_route", "The scanner bridge route is invalid.");
  }
  const parsed = new URL(targetUrl);
  const storageSuffix = `/storage-scan/${action}`;
  if (!parsed.pathname.endsWith(storageSuffix)) return "";
  parsed.pathname = `${parsed.pathname.slice(0, -storageSuffix.length)}/work-order-scan/${action}`;
  return parsed.toString();
}

async function callScannerBridge(action, payload, options = {}) {
  const fetchImpl = options.fetchImpl || globalThis.fetch;
  if (typeof fetchImpl !== "function") {
    fail(503, "scanner_fetch_unavailable", "The scanner bridge is unavailable.");
  }
  const config = getBridgeConfiguration(action, options.env || process.env);
  const routeFamily = options.routeFamily || "storage-scan";
  const candidates = config.candidates
    .map((targetUrl) => bridgeRouteCandidate(targetUrl, action, routeFamily))
    .filter(Boolean);
  if (!candidates.length) {
    fail(
      503,
      "scanner_route_not_configured",
      "The requested scanner bridge route is not configured."
    );
  }
  const attempts = [];
  for (const targetUrl of candidates) {
    const headers = { "Content-Type": "application/json" };
    if (config.bridgeToken) headers.Authorization = `Bearer ${config.bridgeToken}`;
    if (/ngrok/i.test(targetUrl)) headers["ngrok-skip-browser-warning"] = "true";
    try {
      const response = await fetchImpl(targetUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        // A start payload contains a per-session callback capability. Never
        // allow an intermediary to forward that body to a different origin.
        // Operators must configure the bridge's final canonical URL directly.
        redirect: "error",
        signal: AbortSignal.timeout(BRIDGE_TIMEOUT_MS),
      });
      const responsePayload = await readJsonResponse(response);
      attempts.push({ status: response.status });
      if (response.status === 404) continue;
      if (!response.ok) {
        return {
          delivered: false,
          status: response.status,
          code: "scanner_bridge_rejected",
          attempts,
        };
      }
      return {
        delivered: true,
        status: response.status,
        bridgeSessionId: cleanBridgeSessionId(
          responsePayload.bridgeSessionId || responsePayload.sessionId
        ),
        expiresAt: cleanBridgeExpiry(responsePayload.expiresAt),
        draining: responsePayload.draining === true,
        drained: responsePayload.drained === true,
        pendingEventCount: Math.max(
          0,
          Math.min(MAX_SESSION_EVENTS, Number(responsePayload.pendingEventCount) || 0)
        ),
        attempts,
      };
    } catch (error) {
      attempts.push({
        status: 0,
        code: error?.name === "TimeoutError" ? "timeout" : "network_error",
      });
    }
  }
  return {
    delivered: false,
    status: 0,
    code: "scanner_bridge_unavailable",
    attempts,
  };
}

async function signalStorageScanStart({
  sessionId,
  unitId,
  callbackUrl,
  callbackToken,
  expiresAt,
  fetchImpl,
  env,
}) {
  const unit = storageUnitContract.parseStorageUnitId(unitId);
  const safeSessionId = cleanSessionId(sessionId);
  if (!unit || !safeSessionId || !TOKEN_PATTERN.test(String(callbackToken || ""))) {
    fail(500, "scanner_start_invalid", "The scanner start request is invalid.");
  }
  return callScannerBridge(
    "start",
    {
      schemaVersion: STORAGE_SCAN_SCHEMA_VERSION,
      sessionId: safeSessionId,
      target: { unitId: unit.id, type: unit.type, number: unit.number },
      callback: {
        url: callbackUrl,
        bearerToken: callbackToken,
        expiresAt: timestampToIso(expiresAt),
      },
    },
    { fetchImpl, env }
  );
}

async function signalStorageScanStop({
  sessionId,
  unitId,
  reason,
  fetchImpl,
  env,
}) {
  const safeSessionId = cleanSessionId(sessionId);
  const unit = storageUnitContract.parseStorageUnitId(unitId);
  const safeReason = cleanText(reason, 30).toLowerCase();
  if (!safeSessionId || !unit || !["cancelled", "confirmed", "expired", "failed"].includes(safeReason)) {
    fail(500, "scanner_stop_invalid", "The scanner stop request is invalid.");
  }
  return callScannerBridge(
    "stop",
    {
      schemaVersion: STORAGE_SCAN_SCHEMA_VERSION,
      sessionId: safeSessionId,
      unitId: unit.id,
      reason: safeReason,
    },
    { fetchImpl, env }
  );
}

async function signalStorageScanDrain({
  sessionId,
  unitId,
  reason = "confirmed",
  fetchImpl,
  env,
}) {
  const safeSessionId = cleanSessionId(sessionId);
  const unit = storageUnitContract.parseStorageUnitId(unitId);
  const safeReason = cleanText(reason, 30).toLowerCase();
  if (
    !safeSessionId ||
    !unit ||
    !["cancelled", "confirmed", "expired", "failed"].includes(safeReason)
  ) {
    fail(500, "scanner_drain_invalid", "The scanner drain request is invalid.");
  }
  return callScannerBridge(
    "drain",
    {
      schemaVersion: STORAGE_SCAN_SCHEMA_VERSION,
      sessionId: safeSessionId,
      unitId: unit.id,
      reason: safeReason,
    },
    { fetchImpl, env }
  );
}

function assertSessionOwner(data, authUser) {
  if (!authUser?.uid) {
    fail(401, "auth_required", "Authentication is required.");
  }
  if (cleanText(data?.createdBy?.uid, 128) !== cleanText(authUser.uid, 128)) {
    fail(404, "session_not_found", "The scan session could not be found.");
  }
}

function assertOpenAndUnexpired(data, nowMs) {
  if (!isOpenScanStatus(data?.status)) {
    const status = normalizeSessionStatus(data?.status);
    fail(
      status === "expired" ? 410 : 409,
      `session_${status}`,
      `The scan session is ${status}.`
    );
  }
  if (timestampToMillis(data.expiresAt) <= nowMs) {
    fail(410, "session_expired", "The scan session has expired.");
  }
}

async function startStorageScanSession({
  db,
  authUser,
  rawUnitId,
  nowMs = Date.now(),
  fetchImpl,
  env = process.env,
}) {
  if (!db) fail(503, "scanner_unavailable", "The scanner service is unavailable.");
  if (!authUser?.uid) fail(401, "auth_required", "Authentication is required.");
  const unit = storageUnitContract.parseStorageUnitId(rawUnitId);
  if (!unit) fail(400, "invalid_unit_id", "A positive bin or pallet ID is required.");
  // Validate all external configuration before creating any server-side state.
  getBridgeConfiguration("start", env);
  const callbackBase = getCallbackBaseUrl(env);
  void callbackBase;

  const credentials = generateSessionCredentials();
  const ttlSeconds = sessionTtlSeconds(env.STORAGE_SCAN_SESSION_TTL_SECONDS);
  const now = new Date(nowMs);
  const expiresAt = new Date(nowMs + ttlSeconds * 1000);
  const sessionRef = storageScanSessionRef(db, credentials.sessionId);
  const controlRef = storageScanControlRef(db);
  const unitRef = db.collection(STORAGE_UNIT_COLLECTION).doc(unit.id);
  const sessionData = {
    schemaVersion: STORAGE_SCAN_SCHEMA_VERSION,
    unitId: unit.id,
    unitType: unit.type,
    unitNumber: unit.number,
    status: "starting",
    createdBy: {
      uid: cleanText(authUser.uid, 128),
      email: normalizeEmail(authUser.email),
    },
    createdAt: now,
    updatedAt: now,
    expiresAt,
    completedAt: null,
    callbackTokenHash: credentials.callbackTokenHash,
    callbackTokenVersion: 1,
    eventCount: 0,
    lastEventAt: null,
    bridgeStartStatus: "pending",
    bridgeStopStatus: "not_requested",
  };

  await db.runTransaction(async (transaction) => {
    const [unitSnapshot, controlSnapshot] = await Promise.all([
      transaction.get(unitRef),
      transaction.get(controlRef),
    ]);
    if (!unitSnapshot.exists) {
      fail(404, "unit_not_found", "The storage unit could not be found.");
    }
    const control = controlSnapshot.exists ? controlSnapshot.data() || {} : {};
    if (
      cleanSessionId(control.activeSessionId) &&
      timestampToMillis(control.expiresAt) > nowMs
    ) {
      fail(409, "scanner_busy", "Another warehouse scan session is already active.");
    }
    transaction.set(sessionRef, sessionData, { merge: false });
    transaction.set(
      controlRef,
      {
        activeSessionId: credentials.sessionId,
        activeUnitId: unit.id,
        status: "starting",
        expiresAt,
        updatedAt: now,
      },
      { merge: true }
    );
  });

  const callbackUrl = buildCallbackUrl(credentials.sessionId, env);
  const bridgeResult = await signalStorageScanStart({
    sessionId: credentials.sessionId,
    unitId: unit.id,
    callbackUrl,
    callbackToken: credentials.callbackToken,
    expiresAt,
    fetchImpl,
    env,
  });
  if (!bridgeResult.delivered) {
    await db.runTransaction(async (transaction) => {
      const [currentSession, currentControl] = await Promise.all([
        transaction.get(sessionRef),
        transaction.get(controlRef),
      ]);
      if (currentSession.exists && currentSession.data()?.status === "starting") {
        transaction.set(
          sessionRef,
          {
            status: "failed",
            updatedAt: new Date(),
            completedAt: new Date(),
            bridgeStartStatus: "failed",
          },
          { merge: true }
        );
      }
      if (currentControl.data()?.activeSessionId === credentials.sessionId) {
        releaseStorageScanControl(
          transaction,
          db,
          credentials.sessionId,
          new Date(),
          currentControl
        );
      }
    });
    await signalStorageScanStop({
      sessionId: credentials.sessionId,
      unitId: unit.id,
      reason: "failed",
      fetchImpl,
      env,
    }).catch(() => null);
    fail(502, bridgeResult.code, "The warehouse scanner did not accept the session.");
  }

  const activatedAt = new Date();
  await db.runTransaction(async (transaction) => {
    const [currentSession, currentControl] = await Promise.all([
      transaction.get(sessionRef),
      transaction.get(controlRef),
    ]);
    if (!currentSession.exists || currentSession.data()?.status !== "starting") return;
    transaction.set(
      sessionRef,
      {
        status: "active",
        updatedAt: activatedAt,
        bridgeStartStatus: "delivered",
        bridgeStartedAt: activatedAt,
        bridgeSessionId: bridgeResult.bridgeSessionId || null,
      },
      { merge: true }
    );
    if (currentControl.data()?.activeSessionId === credentials.sessionId) {
      transaction.set(
        controlRef,
        { status: "active", updatedAt: activatedAt },
        { merge: true }
      );
    }
  });

  return publicScanSession(credentials.sessionId, {
    ...sessionData,
    status: "active",
    updatedAt: activatedAt,
    bridgeStartStatus: "delivered",
  });
}

async function listSessionEvents(sessionRef) {
  const snapshot = await sessionRef
    .collection(STORAGE_SCAN_EVENT_COLLECTION)
    .orderBy("receivedAt", "asc")
    .limit(MAX_SESSION_EVENTS)
    .get();
  return snapshot.docs.map((document) => document.data() || {});
}

async function expireSessionIfNeeded({ db, sessionId, data, nowMs, fetchImpl, env }) {
  if (!isOpenScanStatus(data.status) || timestampToMillis(data.expiresAt) > nowMs) {
    return data;
  }
  const sessionRef = storageScanSessionRef(db, sessionId);
  const controlRef = storageScanControlRef(db);
  const now = new Date(nowMs);
  let expiredData = data;
  await db.runTransaction(async (transaction) => {
    const [sessionSnapshot, controlSnapshot] = await Promise.all([
      transaction.get(sessionRef),
      transaction.get(controlRef),
    ]);
    if (!sessionSnapshot.exists) return;
    const current = sessionSnapshot.data() || {};
    if (!isOpenScanStatus(current.status) || timestampToMillis(current.expiresAt) > nowMs) {
      expiredData = current;
      return;
    }
    expiredData = {
      ...current,
      status: "expired",
      updatedAt: now,
      completedAt: now,
      bridgeStopStatus: "pending",
    };
    transaction.set(sessionRef, expiredData, { merge: true });
    if (controlSnapshot.data()?.activeSessionId === sessionId) {
      releaseStorageScanControl(
        transaction,
        db,
        sessionId,
        now,
        controlSnapshot
      );
    }
  });
  if (expiredData.status === "expired") {
    const stopResult = await signalStorageScanStop({
      sessionId,
      unitId: expiredData.unitId,
      reason: "expired",
      fetchImpl,
      env,
    }).catch(() => ({ delivered: false }));
    const stoppedAt = new Date();
    await sessionRef.set(
      {
        bridgeStopStatus: stopResult.delivered ? "delivered" : "failed",
        bridgeStoppedAt: stopResult.delivered ? stoppedAt : null,
        updatedAt: stoppedAt,
      },
      { merge: true }
    );
    expiredData = {
      ...expiredData,
      bridgeStopStatus: stopResult.delivered ? "delivered" : "failed",
      bridgeStoppedAt: stopResult.delivered ? stoppedAt : null,
      updatedAt: stoppedAt,
    };
  }
  return expiredData;
}

async function getStorageScanSession({
  db,
  authUser,
  sessionId,
  nowMs = Date.now(),
  fetchImpl,
  env = process.env,
}) {
  const safeSessionId = cleanSessionId(sessionId);
  if (!safeSessionId) fail(400, "invalid_session_id", "A valid scan session ID is required.");
  const sessionRef = storageScanSessionRef(db, safeSessionId);
  const snapshot = await sessionRef.get();
  if (!snapshot.exists) fail(404, "session_not_found", "The scan session could not be found.");
  let data = snapshot.data() || {};
  assertSessionOwner(data, authUser);
  data = await expireSessionIfNeeded({
    db,
    sessionId: safeSessionId,
    data,
    nowMs,
    fetchImpl,
    env,
  });
  const events = await listSessionEvents(sessionRef);
  return publicScanSession(safeSessionId, data, events);
}

async function cancelStorageScanSession({
  db,
  authUser,
  sessionId,
  nowMs = Date.now(),
  fetchImpl,
  env = process.env,
}) {
  const safeSessionId = cleanSessionId(sessionId);
  if (!safeSessionId) fail(400, "invalid_session_id", "A valid scan session ID is required.");
  const sessionRef = storageScanSessionRef(db, safeSessionId);
  const controlRef = storageScanControlRef(db);
  const now = new Date(nowMs);
  let finalData = null;
  await db.runTransaction(async (transaction) => {
    const [sessionSnapshot, controlSnapshot] = await Promise.all([
      transaction.get(sessionRef),
      transaction.get(controlRef),
    ]);
    if (!sessionSnapshot.exists) {
      fail(404, "session_not_found", "The scan session could not be found.");
    }
    const current = sessionSnapshot.data() || {};
    assertSessionOwner(current, authUser);
    const status = normalizeSessionStatus(current.status);
    if (status === "confirmed") {
      fail(409, "session_confirmed", "The scan session is already confirmed.");
    }
    finalData = isOpenScanStatus(status)
      ? {
          ...current,
          status: "cancelled",
          completedAt: now,
          updatedAt: now,
          bridgeStopStatus: "pending",
        }
      : current;
    if (isOpenScanStatus(status)) {
      transaction.set(sessionRef, finalData, { merge: true });
    }
    if (controlSnapshot.data()?.activeSessionId === safeSessionId) {
      releaseStorageScanControl(
        transaction,
        db,
        safeSessionId,
        now,
        controlSnapshot
      );
    }
  });

  const stopResult = await signalStorageScanStop({
    sessionId: safeSessionId,
    unitId: finalData.unitId,
    reason: finalData.status === "expired" ? "expired" : "cancelled",
    fetchImpl,
    env,
  }).catch(() => ({ delivered: false, code: "scanner_bridge_unavailable" }));
  const stopRecordedAt = new Date();
  await sessionRef.set(
    {
      bridgeStopStatus: stopResult.delivered ? "delivered" : "failed",
      bridgeStoppedAt: stopResult.delivered ? stopRecordedAt : null,
      updatedAt: stopRecordedAt,
    },
    { merge: true }
  );
  finalData = {
    ...finalData,
    bridgeStopStatus: stopResult.delivered ? "delivered" : "failed",
    bridgeStoppedAt: stopResult.delivered ? stopRecordedAt : null,
    updatedAt: stopRecordedAt,
  };
  return {
    session: publicScanSession(safeSessionId, finalData),
    stopDelivered: Boolean(stopResult.delivered),
  };
}

function normalizeScannedAt(value, nowMs) {
  if (value === undefined || value === null || value === "") return new Date(nowMs);
  const millis = Date.parse(String(value));
  if (
    !Number.isFinite(millis) ||
    millis < nowMs - 24 * 60 * 60 * 1000 ||
    millis > nowMs + 5 * 60 * 1000
  ) {
    fail(400, "invalid_scanned_at", "scannedAt must be a recent ISO timestamp.");
  }
  return new Date(millis);
}

function validateEventBody(body, nowMs) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    fail(400, "invalid_request", "The scan event body must be an object.");
  }
  const allowed = new Set(["eventId", "code", "scannedAt"]);
  if (Object.keys(body).some((key) => !allowed.has(key))) {
    fail(400, "invalid_request", "The scan event contains unsupported fields.");
  }
  const eventId = cleanEventId(body.eventId);
  const code = cleanScannedCode(body.code);
  if (!eventId) fail(400, "invalid_event_id", "A valid scan event ID is required.");
  if (!code) fail(400, "invalid_scan_code", "A valid scanned code is required.");
  return { eventId, code, scannedAt: normalizeScannedAt(body.scannedAt, nowMs) };
}

async function ingestStorageScanEvent({
  db,
  sessionId,
  callbackToken,
  body,
  nowMs = Date.now(),
}) {
  const safeCallbackToken = cleanCallbackToken(callbackToken);
  if (!safeCallbackToken) {
    fail(401, "invalid_callback_token", "The scan callback credential is invalid.");
  }
  const safeSessionId = cleanSessionId(sessionId);
  if (!safeSessionId) fail(400, "invalid_session_id", "A valid scan session ID is required.");
  const eventInput = validateEventBody(body, nowMs);
  const sessionRef = storageScanSessionRef(db, safeSessionId);
  const initialSnapshot = await sessionRef.get();
  if (!initialSnapshot.exists) {
    fail(401, "invalid_callback_token", "The scan callback credential is invalid.");
  }
  const initialSession = initialSnapshot.data() || {};
  if (!callbackTokenMatches(safeCallbackToken, initialSession.callbackTokenHash)) {
    fail(401, "invalid_callback_token", "The scan callback credential is invalid.");
  }
  assertOpenAndUnexpired(initialSession, nowMs);

  const eventRef = storageScanEventRef(sessionRef, eventInput.eventId);
  const now = new Date(nowMs);
  const eventData = {
    schemaVersion: STORAGE_SCAN_SCHEMA_VERSION,
    eventId: eventInput.eventId,
    code: eventInput.code,
    scannedAt: eventInput.scannedAt,
    receivedAt: now,
  };

  const result = await db.runTransaction(async (transaction) => {
    const [sessionSnapshot, eventSnapshot] = await Promise.all([
      transaction.get(sessionRef),
      transaction.get(eventRef),
    ]);
    if (!sessionSnapshot.exists) {
      fail(401, "invalid_callback_token", "The scan callback credential is invalid.");
    }
    const currentSession = sessionSnapshot.data() || {};
    if (!callbackTokenMatches(safeCallbackToken, currentSession.callbackTokenHash)) {
      fail(401, "invalid_callback_token", "The scan callback credential is invalid.");
    }
    assertOpenAndUnexpired(currentSession, nowMs);
    if (eventSnapshot.exists) {
      const existing = eventSnapshot.data() || {};
      if (existing.eventId !== eventInput.eventId || existing.code !== eventInput.code) {
        fail(409, "event_id_conflict", "This scan event ID was already used.");
      }
      return { duplicate: true, event: publicScanEvent(existing) };
    }
    const eventCount = Math.max(0, Number(currentSession.eventCount) || 0);
    if (eventCount >= MAX_SESSION_EVENTS) {
      fail(409, "session_event_limit", "The scan session has reached its event limit.");
    }
    eventData.sequence = eventCount + 1;
    transaction.set(eventRef, eventData, { merge: false });
    transaction.set(
      sessionRef,
      {
        eventCount: eventCount + 1,
        lastEventAt: now,
        updatedAt: now,
      },
      { merge: true }
    );
    return { duplicate: false, event: publicScanEvent(eventData) };
  });
  return result;
}

function hasStoredResolution(data = {}) {
  return Boolean(
    data.resolution &&
      typeof data.resolution === "object" &&
      ["resolved", "unknown", "ambiguous", "invalid"].includes(
        cleanText(data.resolution.status, 20).toLowerCase()
      )
  );
}

async function resolveStorageScanEvent({
  db,
  authUser,
  sessionId,
  eventId,
  resolveStorageScanCode,
  nowMs = Date.now(),
}) {
  if (!db || typeof db.collection !== "function") {
    fail(503, "scanner_unavailable", "The scanner service is unavailable.");
  }
  if (!authUser?.uid) fail(401, "auth_required", "Authentication is required.");
  if (typeof resolveStorageScanCode !== "function") {
    fail(503, "scan_resolver_unavailable", "The scan resolver is unavailable.");
  }
  const safeSessionId = cleanSessionId(sessionId);
  const safeEventId = cleanEventId(eventId);
  if (!safeSessionId || !safeEventId) {
    fail(400, "invalid_event", "A valid scan session and event are required.");
  }
  const sessionRef = storageScanSessionRef(db, safeSessionId);
  const eventRef = storageScanEventRef(sessionRef, safeEventId);
  const [initialSessionSnapshot, initialEventSnapshot] = await Promise.all([
    sessionRef.get(),
    eventRef.get(),
  ]);
  if (!initialSessionSnapshot.exists) {
    fail(404, "session_not_found", "The scan session could not be found.");
  }
  const initialSession = initialSessionSnapshot.data() || {};
  assertSessionOwner(initialSession, authUser);
  assertOpenAndUnexpired(initialSession, Number(nowMs));
  if (!initialEventSnapshot.exists) {
    fail(404, "event_not_found", "The scan event could not be found.");
  }
  const initialEvent = initialEventSnapshot.data() || {};
  if (cleanEventId(initialEvent.eventId) !== safeEventId) {
    fail(409, "event_id_conflict", "The stored scan event identity is invalid.");
  }
  if (hasStoredResolution(initialEvent)) {
    return { duplicate: true, event: publicScanEvent(initialEvent) };
  }

  const resolved = sanitizeResolution(
    await resolveStorageScanCode(db, initialEvent.code, {
      targetUnitId: initialSession.unitId,
    })
  );
  const resolvedAt = new Date(Number(nowMs));
  return db.runTransaction(async (transaction) => {
    const [sessionSnapshot, eventSnapshot] = await Promise.all([
      transaction.get(sessionRef),
      transaction.get(eventRef),
    ]);
    if (!sessionSnapshot.exists) {
      fail(404, "session_not_found", "The scan session could not be found.");
    }
    const currentSession = sessionSnapshot.data() || {};
    assertSessionOwner(currentSession, authUser);
    assertOpenAndUnexpired(currentSession, Number(nowMs));
    if (!eventSnapshot.exists) {
      fail(404, "event_not_found", "The scan event could not be found.");
    }
    const currentEvent = eventSnapshot.data() || {};
    if (
      cleanEventId(currentEvent.eventId) !== safeEventId ||
      cleanScannedCode(currentEvent.code) !== cleanScannedCode(initialEvent.code)
    ) {
      fail(409, "event_changed", "The scan event changed while it was resolving.");
    }
    if (hasStoredResolution(currentEvent)) {
      return { duplicate: true, event: publicScanEvent(currentEvent) };
    }
    const nextEvent = {
      ...currentEvent,
      resolution: resolved,
      resolvedAt,
    };
    transaction.set(
      eventRef,
      { resolution: resolved, resolvedAt },
      { merge: true }
    );
    return { duplicate: false, event: publicScanEvent(nextEvent) };
  });
}

module.exports = {
  BRIDGE_TIMEOUT_MS,
  DEFAULT_POLL_AFTER_MS,
  DEFAULT_SESSION_TTL_SECONDS,
  EVENT_ID_PATTERN,
  MAX_SESSION_EVENTS,
  MAX_SESSION_TTL_SECONDS,
  MIN_SESSION_TTL_SECONDS,
  OPEN_SESSION_STATUSES,
  SESSION_ID_PATTERN,
  STORAGE_SCAN_CONTROL_COLLECTION,
  STORAGE_SCAN_CONTROL_DOCUMENT,
  STORAGE_SCAN_EVENT_COLLECTION,
  STORAGE_SCAN_SCHEMA_VERSION,
  STORAGE_SCAN_SESSION_COLLECTION,
  StorageScanError,
  assertOpenAndUnexpired,
  assertSessionOwner,
  bearerTokenFromRequest,
  buildCallbackUrl,
  callScannerBridge,
  callbackTokenMatches,
  cancelStorageScanSession,
  cleanEventId,
  cleanCallbackToken,
  cleanScannedCode,
  cleanSessionId,
  generateSessionCredentials,
  getBridgeConfiguration,
  getCallbackBaseUrl,
  getStorageScanSession,
  hashCallbackToken,
  ingestStorageScanEvent,
  isOpenScanStatus,
  isTerminalScanStatus,
  normalizeSessionStatus,
  publicScanEvent,
  publicScanSession,
  releaseStorageScanControl,
  resolveStorageScanEvent,
  sanitizeResolution,
  scannerEnabled,
  sessionTtlSeconds,
  signalStorageScanStart,
  signalStorageScanDrain,
  signalStorageScanStop,
  startStorageScanSession,
  storageScanControlRef,
  storageScanEventRef,
  storageScanSessionRef,
  timestampToIso,
  timestampToMillis,
  validateEventBody,
};
