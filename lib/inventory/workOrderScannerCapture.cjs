"use strict";

const scanSessions = require("./storageUnitScanSessions.cjs");

const WORK_ORDER_SCAN_SCHEMA_VERSION = 1;
const WORK_ORDER_SCAN_SESSION_COLLECTION = "WorkOrderAddScanSessions";
const WORK_ORDER_SCAN_EVENT_COLLECTION = "Events";
const WORK_ORDER_COLLECTION = "OpsWorkOrders";
const DEFAULT_WORK_ORDER_SCAN_TTL_SECONDS = 300;
const MIN_WORK_ORDER_SCAN_TTL_SECONDS = 60;
const MAX_WORK_ORDER_SCAN_TTL_SECONDS = 900;
const DEFAULT_WORK_ORDER_POLL_AFTER_MS = 1000;
const WORK_ORDER_START_STALE_AFTER_MS = 30_000;
const STOP_REASONS = new Set(["cancelled", "confirmed", "expired", "failed"]);

function fail(statusCode, code, message) {
  throw new scanSessions.StorageScanError(statusCode, code, message);
}

function cleanText(value, maxLength = 500) {
  return String(value == null ? "" : value).trim().slice(0, maxLength);
}

function cleanWorkOrderId(value) {
  const candidate = cleanText(value, 180);
  if (!candidate || /[\/\\\u0000-\u001f\u007f]/.test(candidate)) return "";
  return candidate;
}

function workOrderScanTtlSeconds(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return DEFAULT_WORK_ORDER_SCAN_TTL_SECONDS;
  return Math.min(
    MAX_WORK_ORDER_SCAN_TTL_SECONDS,
    Math.max(MIN_WORK_ORDER_SCAN_TTL_SECONDS, Math.floor(parsed))
  );
}

function normalizeStopReason(value) {
  const reason = cleanText(value, 30).toLowerCase();
  if (!STOP_REASONS.has(reason)) {
    fail(400, "invalid_request", "A valid Work Order scanner stop reason is required.");
  }
  return reason;
}

function workOrderSessionRef(db, sessionId) {
  const safeSessionId = scanSessions.cleanSessionId(sessionId);
  if (!db || !safeSessionId) {
    fail(400, "invalid_session_id", "A valid Work Order scanner session is required.");
  }
  return db.collection(WORK_ORDER_SCAN_SESSION_COLLECTION).doc(safeSessionId);
}

function workOrderCallbackUrl(sessionId, env = process.env) {
  const safeSessionId = scanSessions.cleanSessionId(sessionId);
  if (!safeSessionId) {
    fail(400, "invalid_session_id", "A valid Work Order scanner session is required.");
  }
  return `${scanSessions.getCallbackBaseUrl(env)}/api/items/work-order-add/scan-sessions/${encodeURIComponent(
    safeSessionId
  )}/events`;
}

function publicWorkOrderScanEvent(data = {}) {
  return {
    eventId: scanSessions.cleanEventId(data.eventId),
    code: scanSessions.cleanScannedCode(data.code),
    scannedAt: scanSessions.timestampToIso(data.scannedAt),
    receivedAt: scanSessions.timestampToIso(data.receivedAt),
  };
}

function normalizeSessionStatus(value) {
  const status = cleanText(value, 30).toLowerCase();
  return ["starting", "active", "cancelled", "confirmed", "expired", "failed"].includes(status)
    ? status
    : "failed";
}

function isStaleStartingSession(data, nowMs) {
  if (normalizeSessionStatus(data?.status) !== "starting") return false;
  // Starting-session freshness is anchored to creation. Cleanup bookkeeping
  // (for example, recording a failed stop) must never refresh a start lease.
  const startedAt =
    scanSessions.timestampToMillis(data?.createdAt) ||
    scanSessions.timestampToMillis(data?.updatedAt);
  return !startedAt || startedAt + WORK_ORDER_START_STALE_AFTER_MS <= Number(nowMs);
}

function workOrderControlIdentifies(controlSnapshot, sessionId, workOrderId) {
  const control = controlSnapshot?.data?.() || {};
  return (
    scanSessions.cleanSessionId(control.activeSessionId) === sessionId &&
    cleanText(control.activeTargetType, 30) === "work-order-add" &&
    cleanWorkOrderId(control.activeWorkOrderId) === workOrderId
  );
}

function workOrderControlIsHealthy(
  controlSnapshot,
  sessionId,
  workOrderId,
  nowMs,
  expectedStatus = ""
) {
  const control = controlSnapshot?.data?.() || {};
  const status = cleanText(control.status, 30).toLowerCase();
  const statusMatches = expectedStatus
    ? status === expectedStatus
    : status === "starting" || status === "active";
  return (
    workOrderControlIdentifies(controlSnapshot, sessionId, workOrderId) &&
    statusMatches &&
    scanSessions.timestampToMillis(control.expiresAt) > Number(nowMs)
  );
}

function laterTimestamp(currentValue, candidateValue) {
  const currentMs = scanSessions.timestampToMillis(currentValue);
  const candidateMs = scanSessions.timestampToMillis(candidateValue);
  return currentMs > candidateMs ? currentValue : candidateValue;
}

function publicWorkOrderScanSession(sessionId, data = {}, events = []) {
  return {
    id: scanSessions.cleanSessionId(sessionId),
    sessionId: scanSessions.cleanSessionId(sessionId),
    workOrderId: cleanWorkOrderId(data.workOrderId),
    status: normalizeSessionStatus(data.status),
    captureMode: "remote-callback",
    createdAt: scanSessions.timestampToIso(data.createdAt),
    updatedAt: scanSessions.timestampToIso(data.updatedAt),
    expiresAt: scanSessions.timestampToIso(data.expiresAt),
    completedAt: scanSessions.timestampToIso(data.completedAt),
    eventCount: Math.max(0, Number(data.eventCount) || 0),
    pollAfterMs: DEFAULT_WORK_ORDER_POLL_AFTER_MS,
    bridgeStartStatus: cleanText(data.bridgeStartStatus, 30) || "unknown",
    bridgeStopStatus: cleanText(data.bridgeStopStatus, 30) || "not_requested",
    bridgeCompensationStatus:
      cleanText(data.bridgeCompensationStatus, 30) || "not_requested",
    bridgeCompensationAt: scanSessions.timestampToIso(
      data.bridgeCompensationAt
    ),
    events: (Array.isArray(events) ? events : [])
      .map(publicWorkOrderScanEvent)
      .filter((event) => event.eventId && event.code),
  };
}

function normalizeBridgeStopResult(result = {}) {
  return {
    delivered: Boolean(result.delivered),
    status: Number(result.status) || 0,
    code: cleanText(result.code, 80) || "",
  };
}

async function attemptWorkOrderScannerStop(options) {
  try {
    return normalizeBridgeStopResult(
      await signalWorkOrderScannerStop(options)
    );
  } catch (error) {
    return {
      delivered: false,
      status: Number(error?.statusCode) || 0,
      code: cleanText(error?.code, 80) || "scanner_bridge_unavailable",
    };
  }
}

async function recordWorkOrderBridgeStop({
  db,
  sessionRef,
  stopResult,
  recordedAt = new Date(),
  compensation = false,
  controlRef = null,
  sessionId = "",
  workOrderId = "",
  ensureTerminalFailure = false,
}) {
  const normalized = normalizeBridgeStopResult(stopResult);
  return db.runTransaction(async (transaction) => {
    const snapshots = await Promise.all([
      transaction.get(sessionRef),
      ...(controlRef ? [transaction.get(controlRef)] : []),
    ]);
    const snapshot = snapshots[0];
    const controlSnapshot = snapshots[1] || null;
    if (!snapshot.exists) return null;
    const current = snapshot.data() || {};
    const alreadyDelivered = current.bridgeStopStatus === "delivered";
    const delivered = alreadyDelivered || normalized.delivered;
    const alreadyCompensated =
      current.bridgeCompensationStatus === "delivered";
    const compensationDelivered =
      alreadyCompensated || normalized.delivered;
    const shouldFailSession =
      ensureTerminalFailure && scanSessions.isOpenScanStatus(current.status);
    const patch = {
      ...(shouldFailSession
        ? {
            status: "failed",
            completedAt: current.completedAt || recordedAt,
            bridgeStartStatus: "failed",
          }
        : {}),
      bridgeStopStatus: delivered ? "delivered" : "failed",
      bridgeStoppedAt: delivered
        ? current.bridgeStoppedAt ||
          laterTimestamp(current.bridgeStoppedAt, recordedAt)
        : current.bridgeStoppedAt || null,
      updatedAt: laterTimestamp(current.updatedAt, recordedAt),
      ...(compensation
        ? {
            bridgeCompensationStatus: compensationDelivered
              ? "delivered"
              : "failed",
            bridgeCompensationAt: alreadyCompensated
              ? current.bridgeCompensationAt || recordedAt
              : laterTimestamp(current.bridgeCompensationAt, recordedAt),
          }
        : {}),
    };
    transaction.set(sessionRef, patch, { merge: true });
    if (
      controlRef &&
      workOrderControlIdentifies(controlSnapshot, sessionId, workOrderId)
    ) {
      scanSessions.releaseStorageScanControl(
        transaction,
        db,
        sessionId,
        recordedAt,
        controlSnapshot
      );
    }
    return { ...current, ...patch };
  });
}

async function transitionOpenWorkOrderSessionToFailed({
  db,
  sessionRef,
  controlRef,
  sessionId,
  workOrderId,
  now,
  staleOnly = false,
}) {
  return db.runTransaction(async (transaction) => {
    const [sessionSnapshot, controlSnapshot] = await Promise.all([
      transaction.get(sessionRef),
      transaction.get(controlRef),
    ]);
    if (!sessionSnapshot.exists) {
      return { data: null, transitioned: false };
    }
    const current = sessionSnapshot.data() || {};
    const mayTransition = staleOnly
      ? isStaleStartingSession(current, now.getTime())
      : scanSessions.isOpenScanStatus(current.status);
    let data = current;
    if (mayTransition) {
      data = {
        ...current,
        status: "failed",
        completedAt: now,
        updatedAt: now,
        bridgeStartStatus: "failed",
        bridgeStopStatus:
          current.bridgeStopStatus === "delivered" ? "delivered" : "pending",
      };
      transaction.set(sessionRef, data, { merge: true });
    }
    if (
      workOrderControlIdentifies(controlSnapshot, sessionId, workOrderId)
    ) {
      scanSessions.releaseStorageScanControl(
        transaction,
        db,
        sessionId,
        now,
        controlSnapshot
      );
    }
    return { data, transitioned: mayTransition };
  });
}

async function failAndStopWorkOrderStart({
  db,
  sessionRef,
  controlRef,
  sessionId,
  workOrderId,
  now = new Date(),
  fetchImpl,
  env,
  staleOnly = false,
}) {
  let transition = null;
  let transitionError = null;
  try {
    transition = await transitionOpenWorkOrderSessionToFailed({
      db,
      sessionRef,
      controlRef,
      sessionId,
      workOrderId,
      now,
      staleOnly,
    });
  } catch (error) {
    transitionError = error;
  }

  const stopResult = await attemptWorkOrderScannerStop({
    sessionId,
    workOrderId,
    reason: "failed",
    fetchImpl,
    env,
  });

  // A transient cleanup failure must not prevent the exact stop, and gets one
  // more Firestore attempt after the bridge call before the original failure
  // is returned to the browser.
  if (transitionError) {
    try {
      transition = await transitionOpenWorkOrderSessionToFailed({
        db,
        sessionRef,
        controlRef,
        sessionId,
        workOrderId,
        now: new Date(),
        staleOnly,
      });
      transitionError = null;
    } catch (error) {
      transitionError = error;
    }
  }

  let recordedData = transition?.data || null;
  try {
    recordedData =
      (await recordWorkOrderBridgeStop({
        db,
        sessionRef,
        stopResult,
        recordedAt: new Date(),
        compensation: true,
        controlRef,
        sessionId,
        workOrderId,
        ensureTerminalFailure: true,
      })) || recordedData;
    if (recordedData && !scanSessions.isOpenScanStatus(recordedData.status)) {
      transitionError = null;
    }
  } catch (error) {
    if (!transitionError) transitionError = error;
  }
  return { data: recordedData, stopResult, transitionError };
}

function stopFailureStatus(stopResult) {
  const status = Number(stopResult?.status) || 0;
  return status >= 400 && status < 500 ? status : 502;
}

async function listWorkOrderScanEvents(sessionRef) {
  const snapshot = await sessionRef
    .collection(WORK_ORDER_SCAN_EVENT_COLLECTION)
    .orderBy("receivedAt", "asc")
    .limit(scanSessions.MAX_SESSION_EVENTS)
    .get();
  return snapshot.docs.map((document) => document.data() || {});
}

function bridgeFailure(result, action) {
  const bridgeStatus = Number(result?.status) || 0;
  const statusCode = [400, 401, 403, 409, 503].includes(bridgeStatus)
    ? bridgeStatus
    : 502;
  const code = bridgeStatus === 409
    ? "scanner_busy"
    : bridgeStatus === 503
      ? "scanner_unavailable"
      : result?.code || `scanner_${action}_failed`;
  fail(
    statusCode,
    code,
    action === "start"
      ? "The warehouse scanner did not accept the Work Order capture session."
      : "The warehouse scanner did not acknowledge the Work Order stop signal."
  );
}

async function signalWorkOrderScannerStart({
  sessionId,
  workOrderId,
  callbackUrl,
  callbackToken,
  expiresAt,
  fetchImpl,
  env = process.env,
}) {
  const safeSessionId = scanSessions.cleanSessionId(sessionId);
  const safeWorkOrderId = cleanWorkOrderId(workOrderId);
  const safeCallbackToken = scanSessions.cleanCallbackToken(callbackToken);
  if (!safeSessionId || !safeWorkOrderId || !safeCallbackToken || !callbackUrl) {
    fail(500, "scanner_start_invalid", "The Work Order scanner start request is invalid.");
  }
  const result = await scanSessions.callScannerBridge(
    "start",
    {
      schemaVersion: WORK_ORDER_SCAN_SCHEMA_VERSION,
      sessionId: safeSessionId,
      target: { type: "work-order-add", workOrderId: safeWorkOrderId },
      callback: {
        url: callbackUrl,
        bearerToken: safeCallbackToken,
        expiresAt: scanSessions.timestampToIso(expiresAt),
      },
    },
    { fetchImpl, env, routeFamily: "work-order-scan" }
  );
  if (!result.delivered) bridgeFailure(result, "start");
  return result;
}

async function signalWorkOrderScannerStop({
  sessionId,
  workOrderId,
  reason,
  fetchImpl,
  env = process.env,
}) {
  const safeSessionId = scanSessions.cleanSessionId(sessionId);
  const safeWorkOrderId = cleanWorkOrderId(workOrderId);
  const safeReason = normalizeStopReason(reason);
  if (!safeSessionId || !safeWorkOrderId) {
    fail(400, "invalid_request", "A valid Work Order scanner stop signal is required.");
  }
  return scanSessions.callScannerBridge(
    "stop",
    {
      schemaVersion: WORK_ORDER_SCAN_SCHEMA_VERSION,
      sessionId: safeSessionId,
      workOrderId: safeWorkOrderId,
      reason: safeReason,
    },
    { fetchImpl, env, routeFamily: "work-order-scan" }
  );
}

async function signalWorkOrderScannerDrain({
  sessionId,
  workOrderId,
  reason = "confirmed",
  fetchImpl,
  env = process.env,
}) {
  const safeSessionId = scanSessions.cleanSessionId(sessionId);
  const safeWorkOrderId = cleanWorkOrderId(workOrderId);
  const safeReason = normalizeStopReason(reason);
  if (!safeSessionId || !safeWorkOrderId) {
    fail(400, "invalid_request", "A valid Work Order scanner drain signal is required.");
  }
  return scanSessions.callScannerBridge(
    "drain",
    {
      schemaVersion: WORK_ORDER_SCAN_SCHEMA_VERSION,
      sessionId: safeSessionId,
      workOrderId: safeWorkOrderId,
      reason: safeReason,
    },
    { fetchImpl, env, routeFamily: "work-order-scan" }
  );
}

async function startWorkOrderScannerCapture({
  db,
  authUser,
  sessionId,
  workOrderId,
  nowMs = Date.now(),
  fetchImpl,
  env = process.env,
}) {
  if (!db) fail(503, "scanner_unavailable", "The scanner service is unavailable.");
  if (!authUser?.uid) fail(401, "auth_required", "Authentication is required.");
  const safeSessionId = scanSessions.cleanSessionId(sessionId);
  const safeWorkOrderId = cleanWorkOrderId(workOrderId);
  if (!safeSessionId || !safeWorkOrderId || !Number.isFinite(Number(nowMs))) {
    fail(400, "invalid_request", "A valid Work Order scanner session is required.");
  }
  scanSessions.getBridgeConfiguration("start", env);
  const callbackUrl = workOrderCallbackUrl(safeSessionId, env);
  const generated = scanSessions.generateSessionCredentials();
  let callbackToken = generated.callbackToken;
  const callbackTokenHash = generated.callbackTokenHash;
  const ttlSeconds = workOrderScanTtlSeconds(env.WORK_ORDER_SCAN_TTL_SECONDS);
  const now = new Date(Number(nowMs));
  const expiresAt = new Date(Number(nowMs) + ttlSeconds * 1000);
  const sessionRef = workOrderSessionRef(db, safeSessionId);
  const controlRef = scanSessions.storageScanControlRef(db);
  const workOrderRef = db.collection(WORK_ORDER_COLLECTION).doc(safeWorkOrderId);
  const sessionData = {
    schemaVersion: WORK_ORDER_SCAN_SCHEMA_VERSION,
    workOrderId: safeWorkOrderId,
    status: "starting",
    createdBy: {
      uid: cleanText(authUser.uid, 128),
      email: cleanText(authUser.email, 180).toLowerCase(),
    },
    createdAt: now,
    updatedAt: now,
    expiresAt,
    completedAt: null,
    callbackTokenHash,
    callbackTokenVersion: 1,
    eventCount: 0,
    lastEventAt: null,
    bridgeStartStatus: "pending",
    bridgeStopStatus: "not_requested",
    bridgeCompensationStatus: "not_requested",
  };

  const reservation = await db.runTransaction(async (transaction) => {
    const [existingSession, controlSnapshot, workOrderSnapshot] = await Promise.all([
      transaction.get(sessionRef),
      transaction.get(controlRef),
      transaction.get(workOrderRef),
    ]);
    if (existingSession.exists) {
      const current = existingSession.data() || {};
      scanSessions.assertSessionOwner(current, authUser);
      if (cleanWorkOrderId(current.workOrderId) !== safeWorkOrderId) {
        fail(409, "session_id_conflict", "This scanner session ID belongs to another work order.");
      }
      if (
        scanSessions.isOpenScanStatus(current.status) &&
        scanSessions.timestampToMillis(current.expiresAt) > Number(nowMs)
      ) {
        const currentStatus = normalizeSessionStatus(current.status);
        if (
          currentStatus !== "active" ||
          !workOrderControlIsHealthy(
            controlSnapshot,
            safeSessionId,
            safeWorkOrderId,
            Number(nowMs),
            "active"
          )
        ) {
          const failedData = {
            ...current,
            status: "failed",
            completedAt: now,
            updatedAt: now,
            bridgeStartStatus: "failed",
            bridgeStopStatus:
              current.bridgeStopStatus === "delivered"
                ? "delivered"
                : "pending",
          };
          transaction.set(sessionRef, failedData, { merge: true });
          if (
            workOrderControlIdentifies(
              controlSnapshot,
              safeSessionId,
              safeWorkOrderId
            )
          ) {
            scanSessions.releaseStorageScanControl(
              transaction,
              db,
              safeSessionId,
              now,
              controlSnapshot
            );
          }
          return {
            kind: currentStatus === "starting" ? "uncertain-start" : "orphaned",
            data: failedData,
          };
        }
        return { kind: "existing", data: current };
      }
      fail(409, "session_id_conflict", "This scanner session ID is no longer reusable.");
    }
    if (!workOrderSnapshot.exists || workOrderSnapshot.data()?.deletedAt) {
      fail(404, "work_order_not_found", "The selected Magmo work order no longer exists.");
    }
    if (!cleanText(workOrderSnapshot.data()?.clientId, 180)) {
      fail(409, "work_order_destination_missing", "Link the work order destination before scanning inventory.");
    }
    const control = controlSnapshot.exists ? controlSnapshot.data() || {} : {};
    if (
      scanSessions.cleanSessionId(control.activeSessionId) &&
      scanSessions.timestampToMillis(control.expiresAt) > Number(nowMs)
    ) {
      fail(409, "scanner_busy", "Another warehouse scan session is already active.");
    }
    transaction.set(sessionRef, sessionData, { merge: false });
    transaction.set(
      controlRef,
      {
        activeSessionId: safeSessionId,
        activeUnitId: null,
        activeTargetType: "work-order-add",
        activeWorkOrderId: safeWorkOrderId,
        status: "starting",
        expiresAt,
        updatedAt: now,
      },
      { merge: true }
    );
    return { kind: "created", data: sessionData };
  });

  if (
    reservation?.kind === "orphaned" ||
    reservation?.kind === "uncertain-start"
  ) {
    generated.callbackToken = "";
    callbackToken = "";
    const cleanup = await failAndStopWorkOrderStart({
      db,
      sessionRef,
      controlRef,
      sessionId: safeSessionId,
      workOrderId: safeWorkOrderId,
      fetchImpl,
      env,
    });
    if (!cleanup.stopResult.delivered) {
      fail(
        stopFailureStatus(cleanup.stopResult),
        cleanup.stopResult.code || "scanner_stop_failed",
        "The orphaned scanner session was released, but its cleanup stop was not acknowledged."
      );
    }
    if (reservation.kind === "uncertain-start") {
      fail(
        409,
        "session_failed",
        "The earlier scanner start was uncertain and was released safely. Start a new session."
      );
    }
    fail(
      409,
      "scanner_session_orphaned",
      "The earlier scanner session lost its lock and was released safely. Start a new session."
    );
  }

  if (reservation?.kind === "existing") {
    generated.callbackToken = "";
    callbackToken = "";
    const settledData = await expireWorkOrderSession({
      db,
      sessionId: safeSessionId,
      data: reservation.data,
      nowMs: Number(nowMs),
      fetchImpl,
      env,
      authUser,
      revalidate: true,
      requireActive: true,
    });
    if (!scanSessions.isOpenScanStatus(settledData?.status)) {
      const status = normalizeSessionStatus(settledData?.status);
      fail(
        status === "expired" ? 410 : 409,
        `session_${status}`,
        status === "failed"
          ? "The earlier scanner start became uncertain and was released safely. Start a new session."
          : `The scanner session is ${status}.`
      );
    }
    const events = await listWorkOrderScanEvents(sessionRef);
    return publicWorkOrderScanSession(safeSessionId, settledData, events);
  }

  let bridgeResult;
  try {
    bridgeResult = await signalWorkOrderScannerStart({
      sessionId: safeSessionId,
      workOrderId: safeWorkOrderId,
      callbackUrl,
      callbackToken,
      expiresAt,
      fetchImpl,
      env,
    });
  } catch (error) {
    await failAndStopWorkOrderStart({
      db,
      sessionRef,
      controlRef,
      sessionId: safeSessionId,
      workOrderId: safeWorkOrderId,
      fetchImpl,
      env,
    });
    throw error;
  } finally {
    generated.callbackToken = "";
    callbackToken = "";
  }

  const activatedAt = new Date();
  let activation;
  try {
    activation = await db.runTransaction(async (transaction) => {
      const [currentSession, currentControl] = await Promise.all([
        transaction.get(sessionRef),
        transaction.get(controlRef),
      ]);
      if (!currentSession.exists) {
        return { activated: false, data: null, reason: "missing" };
      }
      const current = currentSession.data() || {};
      const currentStatus = normalizeSessionStatus(current.status);
      if (currentStatus === "active") {
        if (
          workOrderControlIsHealthy(
            currentControl,
            safeSessionId,
            safeWorkOrderId,
            Number(nowMs),
            "active"
          )
        ) {
          return { activated: true, data: current, reason: "already-active" };
        }
      }
      if (currentStatus !== "starting" && currentStatus !== "active") {
        return { activated: false, data: current, reason: currentStatus };
      }
      if (
        !workOrderControlIsHealthy(
          currentControl,
          safeSessionId,
          safeWorkOrderId,
          Number(nowMs),
          currentStatus === "starting" ? "starting" : "active"
        )
      ) {
        const failedData = {
          ...current,
          status: "failed",
          completedAt: activatedAt,
          updatedAt: activatedAt,
          bridgeStartStatus: "failed",
          bridgeStopStatus:
            current.bridgeStopStatus === "delivered" ? "delivered" : "pending",
        };
        transaction.set(sessionRef, failedData, { merge: true });
        return { activated: false, data: failedData, reason: "lock-lost" };
      }
      const activeData = {
        ...current,
        status: "active",
        updatedAt: activatedAt,
        bridgeStartStatus: "delivered",
        bridgeStartedAt: activatedAt,
        bridgeSessionId: bridgeResult.bridgeSessionId || null,
      };
      transaction.set(sessionRef, activeData, { merge: true });
      transaction.set(
        controlRef,
        { status: "active", updatedAt: activatedAt },
        { merge: true }
      );
      return { activated: true, data: activeData, reason: "activated" };
    });
  } catch (error) {
    await failAndStopWorkOrderStart({
      db,
      sessionRef,
      controlRef,
      sessionId: safeSessionId,
      workOrderId: safeWorkOrderId,
      fetchImpl,
      env,
    });
    throw error;
  }
  if (!activation?.activated) {
    const terminalStatus = normalizeSessionStatus(activation?.data?.status);
    const stopReason = STOP_REASONS.has(terminalStatus)
      ? terminalStatus
      : "failed";
    const stopResult = await attemptWorkOrderScannerStop({
      sessionId: safeSessionId,
      workOrderId: safeWorkOrderId,
      reason: stopReason,
      fetchImpl,
      env,
    });
    let recordedData = activation?.data || null;
    try {
      recordedData =
        (await recordWorkOrderBridgeStop({
          db,
          sessionRef,
          stopResult,
          recordedAt: new Date(),
          compensation: true,
        })) || recordedData;
    } catch {
      // The exact bridge stop already ran. The error returned below keeps the
      // uncertain cleanup visible without masking it as a successful start.
    }
    if (!stopResult.delivered) {
      fail(
        stopFailureStatus(stopResult),
        stopResult.code || "scanner_stop_failed",
        "The scanner session ended during startup, and its cleanup stop was not acknowledged."
      );
    }
    if (!recordedData || activation.reason === "missing") {
      fail(404, "session_not_found", "The scan session could not be found.");
    }
    const status = normalizeSessionStatus(recordedData.status);
    fail(
      status === "expired" ? 410 : 409,
      status === "failed" ? "scanner_start_failed" : `session_${status}`,
      "The scanner session ended before activation completed."
    );
  }
  return publicWorkOrderScanSession(safeSessionId, activation.data);
}

async function expireWorkOrderSession({
  db,
  sessionId,
  data,
  nowMs,
  fetchImpl,
  env,
  authUser = null,
  revalidate = false,
  requireActive = false,
}) {
  const staleStarting = isStaleStartingSession(data, Number(nowMs));
  const expired =
    scanSessions.isOpenScanStatus(data.status) &&
    scanSessions.timestampToMillis(data.expiresAt) <= Number(nowMs);
  if (!revalidate && !staleStarting && !expired) {
    return data;
  }
  const sessionRef = workOrderSessionRef(db, sessionId);
  const controlRef = scanSessions.storageScanControlRef(db);
  const now = new Date(Number(nowMs));
  const transition = await db.runTransaction(async (transaction) => {
    const [sessionSnapshot, controlSnapshot] = await Promise.all([
      transaction.get(sessionRef),
      transaction.get(controlRef),
    ]);
    if (!sessionSnapshot.exists) {
      return { data: null, transitioned: false, missing: true };
    }
    const current = sessionSnapshot.data() || {};
    if (authUser) scanSessions.assertSessionOwner(current, authUser);
    const currentStaleStarting = isStaleStartingSession(
      current,
      Number(nowMs)
    );
    const currentExpired =
      scanSessions.isOpenScanStatus(current.status) &&
      scanSessions.timestampToMillis(current.expiresAt) <= Number(nowMs);
    const currentStatus = normalizeSessionStatus(current.status);
    const currentUnhealthy =
      requireActive &&
      scanSessions.isOpenScanStatus(currentStatus) &&
      (currentStatus !== "active" ||
        !workOrderControlIsHealthy(
          controlSnapshot,
          sessionId,
          cleanWorkOrderId(current.workOrderId),
          Number(nowMs),
          "active"
        ));
    if (!currentStaleStarting && !currentExpired && !currentUnhealthy) {
      return { data: current, transitioned: false, missing: false };
    }
    const terminalStatus = currentExpired ? "expired" : "failed";
    const finalData = {
      ...current,
      status: terminalStatus,
      completedAt: now,
      updatedAt: now,
      bridgeStartStatus: currentStaleStarting || currentUnhealthy
        ? "failed"
        : current.bridgeStartStatus,
      bridgeStopStatus:
        current.bridgeStopStatus === "delivered" ? "delivered" : "pending",
    };
    transaction.set(sessionRef, finalData, { merge: true });
    if (
      workOrderControlIdentifies(
        controlSnapshot,
        sessionId,
        cleanWorkOrderId(current.workOrderId)
      )
    ) {
      scanSessions.releaseStorageScanControl(transaction, db, sessionId, now, controlSnapshot);
    }
    return {
      data: finalData,
      transitioned: true,
      missing: false,
      reason: terminalStatus === "expired" ? "expired" : "failed",
      compensation: currentStaleStarting || currentUnhealthy,
    };
  });
  if (transition?.missing) {
    fail(404, "session_not_found", "The scan session could not be found.");
  }
  if (transition?.transitioned) {
    const stopResult = await attemptWorkOrderScannerStop({
      sessionId,
      workOrderId: transition.data.workOrderId,
      reason: transition.reason,
      fetchImpl,
      env,
    });
    return (
      (await recordWorkOrderBridgeStop({
        db,
        sessionRef,
        stopResult,
        recordedAt: new Date(),
        compensation: transition.compensation,
      })) || transition.data
    );
  }
  return transition?.data || data;
}

async function getWorkOrderScannerCapture({
  db,
  authUser,
  sessionId,
  nowMs = Date.now(),
  fetchImpl,
  env = process.env,
}) {
  const safeSessionId = scanSessions.cleanSessionId(sessionId);
  const sessionRef = workOrderSessionRef(db, safeSessionId);
  const snapshot = await sessionRef.get();
  if (!snapshot.exists) fail(404, "session_not_found", "The scan session could not be found.");
  let data = snapshot.data() || {};
  scanSessions.assertSessionOwner(data, authUser);
  data = await expireWorkOrderSession({
    db,
    sessionId: safeSessionId,
    data,
    nowMs,
    fetchImpl,
    env,
    authUser,
    revalidate: true,
  });
  const events = await listWorkOrderScanEvents(sessionRef);
  return publicWorkOrderScanSession(safeSessionId, data, events);
}

async function stopWorkOrderScannerCapture({
  db,
  authUser,
  sessionId,
  workOrderId,
  reason,
  nowMs = Date.now(),
  fetchImpl,
  env = process.env,
}) {
  const safeSessionId = scanSessions.cleanSessionId(sessionId);
  const safeWorkOrderId = cleanWorkOrderId(workOrderId);
  const safeReason = normalizeStopReason(reason);
  if (!db || !safeSessionId || !safeWorkOrderId) {
    fail(400, "invalid_request", "A valid Work Order scanner stop signal is required.");
  }
  const sessionRef = workOrderSessionRef(db, safeSessionId);
  const controlRef = scanSessions.storageScanControlRef(db);
  const now = new Date(Number(nowMs));
  const terminal = await db.runTransaction(async (transaction) => {
    const [sessionSnapshot, controlSnapshot] = await Promise.all([
      transaction.get(sessionRef),
      transaction.get(controlRef),
    ]);
    if (!sessionSnapshot.exists) fail(404, "session_not_found", "The scan session could not be found.");
    const current = sessionSnapshot.data() || {};
    scanSessions.assertSessionOwner(current, authUser);
    if (cleanWorkOrderId(current.workOrderId) !== safeWorkOrderId) {
      fail(409, "session_target_conflict", "This stop signal does not match the Work Order session.");
    }
    const currentStatus = normalizeSessionStatus(current.status);
    const finalData = scanSessions.isOpenScanStatus(currentStatus)
      ? {
          ...current,
          status: safeReason,
          completedAt: now,
          updatedAt: now,
          bridgeStopStatus:
            current.bridgeStopStatus === "delivered" ? "delivered" : "pending",
        }
      : current;
    if (scanSessions.isOpenScanStatus(currentStatus)) {
      transaction.set(sessionRef, finalData, { merge: true });
    }
    if (
      workOrderControlIdentifies(
        controlSnapshot,
        safeSessionId,
        safeWorkOrderId
      )
    ) {
      scanSessions.releaseStorageScanControl(transaction, db, safeSessionId, now, controlSnapshot);
    }
    return finalData;
  });
  const stopResult = await attemptWorkOrderScannerStop({
    sessionId: safeSessionId,
    workOrderId: safeWorkOrderId,
    reason: safeReason,
    fetchImpl,
    env,
  });
  const recorded =
    (await recordWorkOrderBridgeStop({
      db,
      sessionRef,
      stopResult,
      recordedAt: new Date(),
    })) || terminal;
  const session = publicWorkOrderScanSession(safeSessionId, recorded);
  const attemptDelivered = Boolean(stopResult.delivered);
  const effectivelyDelivered =
    attemptDelivered || recorded?.bridgeStopStatus === "delivered";
  return {
    delivered: effectivelyDelivered,
    attemptDelivered,
    attemptStatus: Number(stopResult.status) || 0,
    attemptCode: stopResult.code || "",
    status: Number(stopResult.status) || 0,
    code: stopResult.code || "",
    session,
    sessionId: safeSessionId,
    workOrderId: safeWorkOrderId,
    reason: safeReason,
    committed: true,
  };
}

async function ingestWorkOrderScanEvent({ db, sessionId, callbackToken, body, nowMs = Date.now() }) {
  const safeCallbackToken = scanSessions.cleanCallbackToken(callbackToken);
  if (!safeCallbackToken) {
    fail(401, "invalid_callback_token", "The scan callback credential is invalid.");
  }
  const safeSessionId = scanSessions.cleanSessionId(sessionId);
  if (!safeSessionId) fail(400, "invalid_session_id", "A valid scan session ID is required.");
  const eventInput = scanSessions.validateEventBody(body, nowMs);
  const sessionRef = workOrderSessionRef(db, safeSessionId);
  const initialSnapshot = await sessionRef.get();
  if (!initialSnapshot.exists) {
    fail(401, "invalid_callback_token", "The scan callback credential is invalid.");
  }
  const initialSession = initialSnapshot.data() || {};
  if (!scanSessions.callbackTokenMatches(safeCallbackToken, initialSession.callbackTokenHash)) {
    fail(401, "invalid_callback_token", "The scan callback credential is invalid.");
  }
  scanSessions.assertOpenAndUnexpired(initialSession, Number(nowMs));
  const eventRef = scanSessions.storageScanEventRef(sessionRef, eventInput.eventId);
  const now = new Date(Number(nowMs));
  const eventData = {
    schemaVersion: WORK_ORDER_SCAN_SCHEMA_VERSION,
    eventId: eventInput.eventId,
    code: eventInput.code,
    scannedAt: eventInput.scannedAt,
    receivedAt: now,
  };
  return db.runTransaction(async (transaction) => {
    const [sessionSnapshot, eventSnapshot] = await Promise.all([
      transaction.get(sessionRef),
      transaction.get(eventRef),
    ]);
    if (!sessionSnapshot.exists) {
      fail(401, "invalid_callback_token", "The scan callback credential is invalid.");
    }
    const current = sessionSnapshot.data() || {};
    if (!scanSessions.callbackTokenMatches(safeCallbackToken, current.callbackTokenHash)) {
      fail(401, "invalid_callback_token", "The scan callback credential is invalid.");
    }
    scanSessions.assertOpenAndUnexpired(current, Number(nowMs));
    if (eventSnapshot.exists) {
      const existing = eventSnapshot.data() || {};
      if (existing.eventId !== eventInput.eventId || existing.code !== eventInput.code) {
        fail(409, "event_id_conflict", "This scan event ID was already used.");
      }
      return { duplicate: true, event: publicWorkOrderScanEvent(existing) };
    }
    const eventCount = Math.max(0, Number(current.eventCount) || 0);
    if (eventCount >= scanSessions.MAX_SESSION_EVENTS) {
      fail(409, "session_event_limit", "The scan session has reached its event limit.");
    }
    transaction.set(eventRef, eventData, { merge: false });
    transaction.set(
      sessionRef,
      { eventCount: eventCount + 1, lastEventAt: now, updatedAt: now },
      { merge: true }
    );
    return { duplicate: false, event: publicWorkOrderScanEvent(eventData) };
  });
}

module.exports = {
  DEFAULT_WORK_ORDER_POLL_AFTER_MS,
  DEFAULT_WORK_ORDER_SCAN_TTL_SECONDS,
  MAX_WORK_ORDER_SCAN_TTL_SECONDS,
  MIN_WORK_ORDER_SCAN_TTL_SECONDS,
  STOP_REASONS,
  WORK_ORDER_START_STALE_AFTER_MS,
  WORK_ORDER_SCAN_EVENT_COLLECTION,
  WORK_ORDER_SCAN_SCHEMA_VERSION,
  WORK_ORDER_SCAN_SESSION_COLLECTION,
  cleanWorkOrderId,
  getWorkOrderScannerCapture,
  ingestWorkOrderScanEvent,
  publicWorkOrderScanEvent,
  publicWorkOrderScanSession,
  signalWorkOrderScannerStart,
  signalWorkOrderScannerDrain,
  signalWorkOrderScannerStop,
  startWorkOrderScannerCapture,
  stopWorkOrderScannerCapture,
  workOrderCallbackUrl,
  workOrderScanTtlSeconds,
  workOrderSessionRef,
};
