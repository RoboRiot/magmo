"use strict";

const storageUnitContract = require("./storageUnitContract.cjs");

const STORAGE_SCAN_IN_START_PATH = "/api/storage-units/scan-sessions";
const STORAGE_SCAN_IN_API = Object.freeze({
  start: STORAGE_SCAN_IN_START_PATH,
  session(sessionId) {
    const id = cleanSessionId(sessionId);
    return id ? `${STORAGE_SCAN_IN_START_PATH}/${encodeURIComponent(id)}` : "";
  },
  cancel(sessionId) {
    const path = STORAGE_SCAN_IN_API.session(sessionId);
    return path ? `${path}/cancel` : "";
  },
  drain(sessionId) {
    const path = STORAGE_SCAN_IN_API.session(sessionId);
    return path ? `${path}/drain` : "";
  },
  confirm(sessionId) {
    const path = STORAGE_SCAN_IN_API.session(sessionId);
    return path ? `${path}/confirm` : "";
  },
  resolve(sessionId, eventId) {
    const path = STORAGE_SCAN_IN_API.session(sessionId);
    const id = cleanEventId(eventId);
    return path && id
      ? `${path}/events/${encodeURIComponent(id)}/resolve`
      : "";
  },
});

const DEFAULT_POLL_AFTER_MS = 1500;
const MIN_POLL_AFTER_MS = 500;
const MAX_POLL_AFTER_MS = 10000;
const ACTIVE_SESSION_STATUSES = new Set([
  "active",
  "open",
  "pending",
  "ready",
  "scanning",
  "starting",
]);
const EXPIRED_SESSION_STATUSES = new Set(["expired", "timed_out", "timeout"]);
const COMPLETED_SESSION_STATUSES = new Set([
  "completed",
  "confirmed",
  "cancelled",
  "canceled",
  "closed",
]);
const ERROR_SESSION_STATUSES = new Set(["error", "failed"]);
const ROW_ERROR_STATUSES = new Set([
  "ambiguous",
  "error",
  "not_allowed",
  "unknown",
]);

function clean(value, maxLength = 500) {
  return String(value == null ? "" : value).trim().slice(0, maxLength);
}

function cleanSessionId(value) {
  const id = clean(value, 200);
  return /^[A-Za-z0-9_-]{20,80}$/.test(id) ? id : "";
}

function cleanEventId(value) {
  const id = clean(value, 200);
  return /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(id) ? id : "";
}

function normalizeScannedCode(value) {
  const code = clean(value, 180);
  if (!code || /[\/\\\u0000-\u001f\u007f]/.test(code)) return "";
  return code;
}

function normalizePollAfterMs(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return DEFAULT_POLL_AFTER_MS;
  return Math.min(MAX_POLL_AFTER_MS, Math.max(MIN_POLL_AFTER_MS, parsed));
}

function normalizeSessionStatus(value) {
  const status = clean(value, 50).toLowerCase().replace(/[\s-]+/g, "_");
  if (!status || ACTIVE_SESSION_STATUSES.has(status)) return "active";
  if (EXPIRED_SESSION_STATUSES.has(status)) return "expired";
  if (COMPLETED_SESSION_STATUSES.has(status)) return status;
  if (ERROR_SESSION_STATUSES.has(status)) return "error";
  return "error";
}

function classifyScannedCode(value) {
  const code = normalizeScannedCode(value);
  if (!code) {
    return { code: "", kind: "invalid", canonicalId: "" };
  }
  const storageUnit = storageUnitContract.parseStorageUnitId(code, {
    allowZero: true,
  });
  if (!storageUnit) return { code, kind: "item", canonicalId: code };
  if (storageUnit.number < 1) {
    return { code, kind: "invalid", canonicalId: storageUnit.id };
  }
  return {
    code,
    kind: storageUnit.type,
    canonicalId: storageUnit.id,
  };
}

function normalizeScanEvent(event = {}, index = 0) {
  const eventId = cleanEventId(
    event.eventId || event.id || event.scanEventId || event.event_id
  );
  const code = normalizeScannedCode(
    event.code || event.value || event.scanValue || event.scannedCode
  );
  const rawStatus = clean(event.status || event.resolutionStatus, 50)
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  const status = rawStatus === "invalid"
    ? "error"
    : ROW_ERROR_STATUSES.has(rawStatus)
      ? rawStatus
      : "received";
  return {
    eventId,
    rowKey: eventId || `invalid-${index}-${code || "empty"}`,
    code,
    scannedAt: event.scannedAt || event.createdAt || null,
    status,
    message: clean(event.message || event.error || event.reason, 500),
    raw: event,
  };
}

function normalizeSessionSnapshot(payload = {}) {
  const session = payload?.session && typeof payload.session === "object"
    ? payload.session
    : payload;
  const events = Array.isArray(payload?.events)
    ? payload.events
    : Array.isArray(session?.events)
      ? session.events
      : Array.isArray(payload?.scans)
        ? payload.scans
        : [];
  return {
    sessionId: cleanSessionId(
      session?.sessionId || session?.id || payload?.sessionId || payload?.id
    ),
    status: normalizeSessionStatus(session?.status || payload?.status),
    expiresAt: session?.expiresAt || payload?.expiresAt || null,
    pollAfterMs: normalizePollAfterMs(
      session?.pollAfterMs || payload?.pollAfterMs
    ),
    events: events.map(normalizeScanEvent),
  };
}

function validateResolvedRowForTarget(row = {}, targetTypeValue) {
  const targetType = clean(targetTypeValue, 20).toLowerCase();
  if (row.status !== "ready") {
    return { allowed: false, reason: row.message || "Resolve or remove this scan." };
  }
  if (row.kind === "item") return { allowed: true, reason: "" };
  if (row.kind === "bin" && targetType === "pallet") {
    return { allowed: true, reason: "" };
  }
  if (row.kind === "bin" && targetType === "bin") {
    return {
      allowed: false,
      reason: "Bins can receive items, but cannot receive another bin.",
    };
  }
  return {
    allowed: false,
    reason: "Only items and bins can be staged for storage placement.",
  };
}

function getConfirmableEventIds(rows = [], targetType) {
  const values = Array.isArray(rows) ? rows : [];
  if (!values.length) return [];
  const eventIds = [];
  const seen = new Set();
  for (const row of values) {
    const validation = validateResolvedRowForTarget(row, targetType);
    const eventId = cleanEventId(row?.eventId);
    if (!validation.allowed || !eventId || seen.has(eventId)) return [];
    seen.add(eventId);
    eventIds.push(eventId);
  }
  return eventIds;
}

function markRepeatedResolvedTargets(rows = []) {
  const seen = new Set();
  return (Array.isArray(rows) ? rows : []).map((row) => {
    const targetId = clean(row?.canonicalId, 180);
    if (row?.status !== "ready" || !targetId) return row;
    const key = `${clean(row?.kind, 20).toLowerCase()}:${targetId}`;
    if (!seen.has(key)) {
      seen.add(key);
      return row;
    }
    return {
      ...row,
      status: "duplicate",
      message: `${targetId} is already staged by an earlier scan. Remove one of the repeated scans.`,
    };
  });
}

class StorageScanInRequestError extends Error {
  constructor(message, { status = 0, code = "", payload = null } = {}) {
    super(message);
    this.name = "StorageScanInRequestError";
    this.status = status;
    this.code = code;
    this.payload = payload;
  }
}

function createStorageUnitScanInClient({ fetchImpl, getIdToken } = {}) {
  const requestFetch = fetchImpl || globalThis.fetch;
  if (typeof requestFetch !== "function") {
    throw new TypeError("A fetch implementation is required.");
  }
  if (typeof getIdToken !== "function") {
    throw new TypeError("getIdToken must be a function.");
  }

  async function request(path, { method = "GET", body, timeoutMs = 20000 } = {}) {
    if (!path) {
      throw new StorageScanInRequestError("The scanner session ID is invalid.", {
        status: 400,
        code: "invalid_session_id",
      });
    }
    const token = await getIdToken();
    if (!token) {
      throw new StorageScanInRequestError(
        "Sign in again before using Scan In.",
        { status: 401, code: "auth_required" }
      );
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    let response;
    try {
      response = await requestFetch(path, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(body === undefined ? {} : { "Content-Type": "application/json" }),
        },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
        signal: controller.signal,
      });
    } catch (error) {
      if (error?.name === "AbortError") {
        throw new StorageScanInRequestError(
          "The scanner request timed out and will be retried.",
          { status: 408, code: "request_timeout" }
        );
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload?.ok === false) {
      throw new StorageScanInRequestError(
        clean(payload?.error || payload?.message, 500) ||
          "The Scan In request failed.",
        {
          status: response.status,
          code: clean(payload?.code, 100),
          payload,
        }
      );
    }
    return payload;
  }

  return Object.freeze({
    start(unitId) {
      const canonicalUnitId = storageUnitContract.normalizeStorageUnitId(unitId);
      if (!canonicalUnitId) {
        return Promise.reject(
          new StorageScanInRequestError("A valid bin or pallet ID is required.", {
            status: 400,
            code: "invalid_storage_unit_id",
          })
        );
      }
      return request(STORAGE_SCAN_IN_API.start, {
        method: "POST",
        body: { unitId: canonicalUnitId },
      });
    },
    read(sessionId) {
      return request(STORAGE_SCAN_IN_API.session(sessionId));
    },
    cancel(sessionId) {
      return request(STORAGE_SCAN_IN_API.cancel(sessionId), {
        method: "POST",
        body: {},
      });
    },
    drain(sessionId, reason = "confirmed") {
      const safeReason = clean(reason, 40).toLowerCase();
      return request(STORAGE_SCAN_IN_API.drain(sessionId), {
        method: "POST",
        body: {
          reason: safeReason === "cancelled" ? "cancelled" : "confirmed",
        },
      });
    },
    confirm(sessionId, eventIds) {
      const ids = Array.from(
        new Set((Array.isArray(eventIds) ? eventIds : []).map(cleanEventId).filter(Boolean))
      );
      if (!ids.length) {
        return Promise.reject(
          new StorageScanInRequestError("At least one staged scan is required.", {
            status: 400,
            code: "empty_event_ids",
          })
        );
      }
      return request(STORAGE_SCAN_IN_API.confirm(sessionId), {
        method: "POST",
        body: { eventIds: ids },
      });
    },
    resolve(sessionId, eventId) {
      return request(STORAGE_SCAN_IN_API.resolve(sessionId, eventId), {
        method: "POST",
        body: {},
        timeoutMs: 15000,
      });
    },
  });
}

module.exports = {
  DEFAULT_POLL_AFTER_MS,
  MAX_POLL_AFTER_MS,
  MIN_POLL_AFTER_MS,
  STORAGE_SCAN_IN_API,
  StorageScanInRequestError,
  classifyScannedCode,
  cleanEventId,
  cleanSessionId,
  createStorageUnitScanInClient,
  getConfirmableEventIds,
  markRepeatedResolvedTargets,
  normalizePollAfterMs,
  normalizeScanEvent,
  normalizeScannedCode,
  normalizeSessionSnapshot,
  normalizeSessionStatus,
  validateResolvedRowForTarget,
};
