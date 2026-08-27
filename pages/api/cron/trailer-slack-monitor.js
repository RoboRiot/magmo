import crypto from "crypto";
import { monitorTrailerSlackMovements } from "../../../lib/ops/trailerSlackMonitor";

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left || ""));
  const rightBuffer = Buffer.from(String(right || ""));
  return (
    leftBuffer.length === rightBuffer.length &&
    crypto.timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function isAuthorized(req) {
  const expected = String(
    process.env.TRAILER_MONITOR_SECRET ||
      process.env.OPS_INGEST_SECRET ||
      process.env.CRON_SECRET ||
      ""
  ).trim();
  if (!expected) return false;
  const bearer = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  const supplied = String(
    req.headers["x-ops-ingest-secret"] || bearer || req.query.secret || ""
  ).trim();
  return Boolean(supplied) && safeEqual(supplied, expected);
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }
  if (!isAuthorized(req)) {
    return res.status(401).json({ ok: false, error: "unauthorized" });
  }

  try {
    const result = await monitorTrailerSlackMovements({
      dryRun: req.query.dryRun === "1" || req.body?.dryRun === true,
      force: req.query.force === "1" || req.body?.force === true,
      requestedRunId: req.body?.runId || "",
    });
    return res.status(result.ok ? 200 : 502).json(result);
  } catch (error) {
    console.error("[TrailerSlackMonitorCron]", error);
    return res.status(500).json({
      ok: false,
      error: "trailer_slack_monitor_failed",
      message: String(error?.message || error),
    });
  }
}
