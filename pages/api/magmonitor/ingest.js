import crypto from "crypto";
import { adminDb, adminRealtimeDb } from "../../../context/FirebaseAdmin";
import {
  hasValidIngestKey,
  parseReadingPayload,
  storeReading,
} from "../../../lib/magmonitor/server";

const {
  claimIngestWindow,
  ingestMinIntervalMs,
  releaseIngestWindow,
} = require("../../../lib/magmonitor/eventControlContract.cjs");

const recentIngests = new Map();

function minimumIngestIntervalMs() {
  return ingestMinIntervalMs(process.env.MAGMONITOR_INGEST_MIN_INTERVAL_MS);
}

function sendThrottled(res, payload, retryAfterMs, nextAllowedAtMs) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Retry-After", String(Math.max(1, Math.ceil(retryAfterMs / 1000))));
  return res.status(202).json({
    ok: true,
    stored: false,
    throttled: true,
    systemId: payload.systemId,
    collectedAt: payload.collectedAt.toISOString(),
    retryAfterMs,
    nextAllowedAt: new Date(nextAllowedAtMs).toISOString(),
  });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "64kb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!process.env.MAGMONITOR_INGEST_KEY) {
    return res.status(503).json({
      error: "Magmonitor ingestion is not configured.",
    });
  }
  if (!hasValidIngestKey(req)) {
    return res.status(401).json({ error: "Invalid ingest credentials." });
  }
  if (!adminDb || !adminRealtimeDb) {
    return res.status(503).json({ error: "Magmonitor storage is unavailable." });
  }

  try {
    const payload = parseReadingPayload(req.body);
    if (!payload.hasMetrics) {
      res.setHeader("Cache-Control", "no-store");
      return res.status(202).json({
        ok: true,
        stored: false,
        ignored: true,
        systemId: payload.systemId,
        collectedAt: payload.collectedAt.toISOString(),
      });
    }
    const nowMs = Date.now();
    const intervalMs = minimumIngestIntervalMs();
    const cachedNextAllowedAt = Number(recentIngests.get(payload.systemId) || 0);
    if (cachedNextAllowedAt > nowMs) {
      return sendThrottled(
        res,
        payload,
        cachedNextAllowedAt - nowMs,
        cachedNextAllowedAt
      );
    }

    const requestId = crypto.randomBytes(18).toString("hex");
    const claim = await claimIngestWindow(adminRealtimeDb, {
      systemId: payload.systemId,
      requestId,
      nowMs,
      intervalMs,
    });
    recentIngests.set(payload.systemId, claim.nextAllowedAtMs);
    if (!claim.accepted) {
      return sendThrottled(
        res,
        payload,
        claim.retryAfterMs,
        claim.nextAllowedAtMs
      );
    }

    let stored;
    try {
      stored = await storeReading(adminDb, payload);
    } catch (storeError) {
      recentIngests.delete(payload.systemId);
      try {
        await releaseIngestWindow(adminRealtimeDb, {
          systemId: payload.systemId,
          requestId,
        });
      } catch (releaseError) {
        console.error("[Magmonitor][ingest throttle release]", releaseError?.message);
      }
      throw storeError;
    }
    res.setHeader("Cache-Control", "no-store");
    return res.status(202).json({
      ok: true,
      stored: true,
      throttled: false,
      ...stored,
      nextAllowedAt: new Date(claim.nextAllowedAtMs).toISOString(),
    });
  } catch (error) {
    const expected =
      /manufacturer|systemName|supported metric|mirror status|collectedAt/i.test(
        error?.message || ""
      );
    if (!expected) {
      console.error("[Magmonitor][ingest]", error?.message);
    }
    return res.status(expected ? 400 : 500).json({
      error: expected
        ? error.message
        : "Magmonitor could not store this reading.",
    });
  }
}
