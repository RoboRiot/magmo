import crypto from "crypto";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import {
  cleanSystemName,
  isSystemStale,
  MAX_CHART_SYSTEMS,
  normalizeManufacturer,
  normalizeMetrics,
  parseRange,
} from "./shared";

export const MAGMONITOR_SYSTEMS_COLLECTION = "MagmonitorSystems";
const READING_RETENTION_DAYS = 180;
const MAX_CURRENT_SYSTEMS = 500;
const MAX_POINTS_PER_SYSTEM = 2000;

function cleanText(value, limit) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function cleanEnum(value, allowed, fallback = "unknown") {
  const normalized = String(value || "").trim().toLowerCase();
  return allowed.includes(normalized) ? normalized : fallback;
}

function cleanTrailerId(value) {
  const match = String(value || "").match(/AIS\s*[-_]?\s*(\d+)/i);
  return match ? `AIS${Number(match[1])}` : "";
}

function normalizeMirror(rawMirror, manufacturer) {
  if (!rawMirror || typeof rawMirror !== "object" || Array.isArray(rawMirror)) {
    return null;
  }

  const mirror = {};
  if (Object.prototype.hasOwnProperty.call(rawMirror, "serviceStatus")) {
    mirror.serviceStatus = cleanEnum(rawMirror.serviceStatus, [
      "running",
      "stopped",
      "not_installed",
      "unknown",
    ]);
  }
  if (Object.prototype.hasOwnProperty.call(rawMirror, "portStatus")) {
    mirror.portStatus = cleanEnum(rawMirror.portStatus, [
      "reading",
      "waiting",
      "released",
      "checking",
      "unknown",
    ]);
  }
  if (Object.prototype.hasOwnProperty.call(rawMirror, "detail")) {
    mirror.detail = cleanText(rawMirror.detail, 500);
  }
  if (Object.prototype.hasOwnProperty.call(rawMirror, "controllerVersion")) {
    mirror.controllerVersion = cleanText(rawMirror.controllerVersion, 40);
  }
  if (Object.prototype.hasOwnProperty.call(rawMirror, "payloadStatus")) {
    mirror.payloadStatus = cleanEnum(rawMirror.payloadStatus, [
      "current",
      "update_available",
      "unknown",
    ]);
  }
  if (typeof rawMirror.localLayout === "boolean") {
    mirror.localLayout = rawMirror.localLayout;
  }
  if (Object.prototype.hasOwnProperty.call(rawMirror, "lastUpdateAt")) {
    const lastUpdate = rawMirror.lastUpdateAt
      ? new Date(rawMirror.lastUpdateAt)
      : null;
    mirror.lastUpdateAt =
      lastUpdate && Number.isFinite(lastUpdate.getTime())
        ? lastUpdate.toISOString()
        : null;
  }
  if (Object.prototype.hasOwnProperty.call(rawMirror, "collectionCount")) {
    const collectionCount = Number(rawMirror.collectionCount);
    mirror.collectionCount = Number.isFinite(collectionCount)
      ? Math.max(0, Math.min(Math.trunc(collectionCount), 1000000000))
      : 0;
  }
  const metrics = normalizeMetrics(rawMirror.metrics, manufacturer);
  if (Object.keys(metrics).length) mirror.metrics = metrics;

  return Object.keys(mirror).length ? mirror : null;
}

function safeSlug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 58);
}

export function makeSystemId(manufacturer, systemName) {
  const vendor = normalizeManufacturer(manufacturer);
  const name = cleanSystemName(systemName);
  if (!vendor || !name) return "";
  const digest = crypto
    .createHash("sha256")
    .update(`${vendor}\n${name}`, "utf8")
    .digest("hex")
    .slice(0, 10);
  return `${vendor.toLowerCase()}--${safeSlug(name) || "scanner"}--${digest}`;
}

export function readIngestKey(req) {
  const direct = req.headers?.["x-magmonitor-key"];
  if (typeof direct === "string" && direct.trim()) return direct.trim();

  const authorization = req.headers?.authorization || "";
  const bearer = String(authorization).match(/^Bearer\s+(.+)$/i);
  return bearer?.[1]?.trim() || "";
}

export function hasValidIngestKey(req) {
  const expected = String(process.env.MAGMONITOR_INGEST_KEY || "").trim();
  const received = readIngestKey(req);
  if (expected.length < 32 || !received) return false;

  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(received, "utf8");
  if (expectedBuffer.length !== receivedBuffer.length) return false;
  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

export function parseReadingPayload(body) {
  const manufacturer = normalizeManufacturer(body?.manufacturer);
  const systemName = cleanSystemName(body?.systemName || body?.scanner || body?.name);
  const metrics = normalizeMetrics(body?.metrics, manufacturer);
  const mirror = normalizeMirror(body?.mirror, manufacturer);
  const source = cleanText(body?.source || "magmonitor", 80);
  const port = cleanText(body?.port, 40);
  const agentVersion = cleanText(body?.agentVersion, 40);
  const trailerId = cleanTrailerId(
    body?.trailerId || body?.associatedTrailerId || body?.metadata?.trailerId,
  );
  const collectedAt = new Date(body?.collectedAt || Date.now());

  if (!manufacturer) throw new Error("manufacturer must be Siemens or GE.");
  if (!systemName) throw new Error("systemName is required.");
  if (!Object.keys(metrics).length && !mirror) {
    throw new Error("At least one supported metric or mirror status is required.");
  }
  if (!Number.isFinite(collectedAt.getTime())) {
    throw new Error("collectedAt must be a valid date.");
  }

  const now = Date.now();
  if (collectedAt.getTime() > now + 24 * 60 * 60 * 1000) {
    throw new Error("collectedAt is too far in the future.");
  }
  if (collectedAt.getTime() < now - 365 * 24 * 60 * 60 * 1000) {
    throw new Error("collectedAt is more than one year old.");
  }

  return {
    manufacturer,
    systemName,
    metrics,
    mirror,
    hasMetrics: Object.keys(metrics).length > 0,
    source,
    port,
    agentVersion,
    trailerId,
    collectedAt,
    systemId: makeSystemId(manufacturer, systemName),
  };
}

export async function storeReading(adminDb, payload) {
  const systemRef = adminDb
    .collection(MAGMONITOR_SYSTEMS_COLLECTION)
    .doc(payload.systemId);
  const batch = adminDb.batch();
  const systemUpdate = {
    displayName: payload.systemName,
    manufacturer: payload.manufacturer,
    lastReceivedAt: FieldValue.serverTimestamp(),
    source: payload.source,
    port: payload.port,
    agentVersion: payload.agentVersion,
    schemaVersion: 2,
  };
  if (payload.agentVersion) {
    systemUpdate.controlAgentLastSeenAt = FieldValue.serverTimestamp();
    systemUpdate.controlAgentVersion = payload.agentVersion;
  }
  if (payload.trailerId) systemUpdate.trailerId = payload.trailerId;
  if (payload.hasMetrics) {
    systemUpdate.metrics = payload.metrics;
    systemUpdate.lastCollectedAt = Timestamp.fromDate(payload.collectedAt);
  }
  if (payload.mirror) {
    systemUpdate.mirror = payload.mirror;
    systemUpdate.lastMirrorAt = FieldValue.serverTimestamp();
    if (payload.mirror.controllerVersion) {
      systemUpdate.controllerLastSeenAt = FieldValue.serverTimestamp();
    }
  }
  batch.set(
    systemRef,
    systemUpdate,
    {
      mergeFields: Object.keys(systemUpdate).flatMap((field) =>
        field === "mirror"
          ? Object.keys(payload.mirror).map((mirrorField) =>
              `mirror.${mirrorField}`
            )
          : [field]
      ),
    }
  );
  if (payload.hasMetrics) {
    const collectedTimestamp = Timestamp.fromDate(payload.collectedAt);
    const readingRef = systemRef
      .collection("readings")
      .doc(String(payload.collectedAt.getTime()));
    const expiresAt = Timestamp.fromDate(
      new Date(
        payload.collectedAt.getTime() +
          READING_RETENTION_DAYS * 24 * 60 * 60 * 1000
      )
    );
    batch.set(
      readingRef,
      {
        metrics: payload.metrics,
        collectedAt: collectedTimestamp,
        receivedAt: FieldValue.serverTimestamp(),
        expiresAt,
        source: payload.source,
        schemaVersion: 2,
      },
      { merge: true }
    );
  }
  await batch.commit();

  return {
    systemId: payload.systemId,
    collectedAt: payload.collectedAt.toISOString(),
  };
}

function timestampToIso(value) {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate().toISOString();
  const parsed = new Date(value);
  return Number.isFinite(parsed.getTime()) ? parsed.toISOString() : null;
}

function serializeControl(rawControl) {
  if (!rawControl || typeof rawControl !== "object") return null;
  const action = cleanEnum(rawControl.action, ["start", "stop"], "");
  let status = cleanEnum(
    rawControl.status,
    ["pending", "completed", "failed", "expired"],
    ""
  );
  if (!action || !status) return null;

  const expiresAt = timestampToIso(rawControl.expiresAt);
  if (
    status === "pending" &&
    expiresAt &&
    new Date(expiresAt).getTime() <= Date.now()
  ) {
    status = "expired";
  }

  return {
    commandId: cleanText(rawControl.commandId, 80),
    action,
    status,
    message: cleanText(rawControl.message, 240),
    requestedAt: timestampToIso(rawControl.requestedAt),
    completedAt: timestampToIso(rawControl.completedAt),
    expiresAt,
  };
}

function serializeSystem(snapshot) {
  const data = snapshot.data() || {};
  const lastCollectedAt = timestampToIso(data.lastCollectedAt);
  return {
    id: snapshot.id,
    displayName: cleanSystemName(data.displayName) || snapshot.id,
    trailerId: cleanTrailerId(
      data.trailerId || data.associatedTrailerId || data?.metadata?.trailerId,
    ),
    manufacturer: normalizeManufacturer(data.manufacturer),
    metrics:
      data.metrics && typeof data.metrics === "object" ? data.metrics : {},
    lastCollectedAt,
    lastReceivedAt: timestampToIso(data.lastReceivedAt),
    source: cleanText(data.source, 80),
    port: cleanText(data.port, 40),
    agentVersion: cleanText(data.agentVersion, 40),
    mirror: normalizeMirror(data.mirror, normalizeManufacturer(data.manufacturer)),
    lastMirrorAt: timestampToIso(data.lastMirrorAt),
    controllerLastSeenAt: timestampToIso(data.controllerLastSeenAt),
    controlAgentLastSeenAt: timestampToIso(data.controlAgentLastSeenAt),
    controlAgentVersion: cleanText(data.controlAgentVersion, 40),
    control: serializeControl(data.control),
    stale: isSystemStale(lastCollectedAt),
  };
}

function serializeReading(system, snapshot) {
  const data = snapshot.data() || {};
  return {
    systemId: system.id,
    systemName: system.displayName,
    manufacturer: system.manufacturer,
    collectedAt: timestampToIso(data.collectedAt),
    metrics:
      data.metrics && typeof data.metrics === "object" ? data.metrics : {},
  };
}

function cleanRequestedIds(values) {
  return Array.from(
    new Set(
      (Array.isArray(values) ? values : [values])
        .flatMap((value) => String(value || "").split(","))
        .map((value) => value.trim())
        .filter((value) => /^[a-z0-9-]{5,120}$/i.test(value))
    )
  ).slice(0, MAX_CHART_SYSTEMS);
}

export async function loadDashboardData(adminDb, options = {}) {
  const range = parseRange(options.range);
  const includeHistory = options.includeHistory !== false;
  const currentSnapshot = await adminDb
    .collection(MAGMONITOR_SYSTEMS_COLLECTION)
    .orderBy("lastReceivedAt", "desc")
    .limit(MAX_CURRENT_SYSTEMS)
    .get();
  const systems = currentSnapshot.docs
    .map(serializeSystem)
    .filter((system) => system.manufacturer);
  const systemById = new Map(systems.map((system) => [system.id, system]));

  let selectedSystemIds = cleanRequestedIds(options.systemIds).filter((id) =>
    systemById.has(id)
  );
  if (!selectedSystemIds.length && systems.length) {
    selectedSystemIds = systems
      .slice(0, MAX_CHART_SYSTEMS)
      .map((system) => system.id);
  }

  const since = Timestamp.fromDate(new Date(Date.now() - range.milliseconds));
  const historySets = includeHistory
    ? await Promise.all(selectedSystemIds.map(async (systemId) => {
      const system = systemById.get(systemId);
      const readings = await adminDb
        .collection(MAGMONITOR_SYSTEMS_COLLECTION)
        .doc(systemId)
        .collection("readings")
        .where("collectedAt", ">=", since)
        .orderBy("collectedAt", "asc")
        .limit(MAX_POINTS_PER_SYSTEM)
        .get();
      return readings.docs
        .map((snapshot) => serializeReading(system, snapshot))
        .filter((reading) => reading.collectedAt);
    }))
    : [];

  return {
    generatedAt: new Date().toISOString(),
    range: range.key,
    systems,
    selectedSystemIds,
    history: historySets.flat(),
  };
}
