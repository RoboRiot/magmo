import { adminDb } from "../../../../../context/FirebaseAdmin";
import {
  hasOnlyBodyKeys,
  requireStorageScanUser,
  sendStorageScanError,
  setStorageScanResponseHeaders,
} from "../../../../../lib/inventory/storageUnitScanApi";
import scanSessions from "../../../../../lib/inventory/storageUnitScanSessions.cjs";

const { getStorageScanSession, signalStorageScanDrain } = scanSessions;

export const config = { api: { bodyParser: { sizeLimit: "1kb" } } };

export default async function handler(req, res) {
  setStorageScanResponseHeaders(res);
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, code: "method_not_allowed", error: "Method not allowed." });
  }
  if (!hasOnlyBodyKeys(req.body || {}, ["reason"])) {
    return res.status(400).json({ ok: false, code: "invalid_request", error: "The drain body may contain only reason." });
  }
  const authUser = await requireStorageScanUser(req, res);
  if (!authUser || res.writableEnded) return;
  if (!adminDb) {
    return res.status(503).json({ ok: false, code: "scanner_unavailable", error: "The warehouse scanner is unavailable." });
  }
  try {
    const session = await getStorageScanSession({
      db: adminDb,
      authUser,
      sessionId: req.query?.id,
    });
    const drain = await signalStorageScanDrain({
      sessionId: session.sessionId,
      unitId: session.unitId,
      reason: req.body?.reason || "confirmed",
    });
    if (!drain.delivered) {
      const missing = drain.attempts?.length && drain.attempts.every((entry) => entry.status === 404);
      return res.status(missing ? 404 : 502).json({
        ok: false,
        code: missing ? "scanner_drain_unsupported" : "scanner_drain_failed",
        error: missing
          ? "The scanner server does not support queue draining yet."
          : "The scanner queue could not be drained.",
      });
    }
    return res.status(200).json({ ok: true, drain });
  } catch (error) {
    return sendStorageScanError(res, error, "drain");
  }
}
