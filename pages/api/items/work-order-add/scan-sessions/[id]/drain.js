import { adminDb } from "../../../../../../context/FirebaseAdmin";
import {
  hasOnlyBodyKeys,
  requireStorageScanUser,
  sendStorageScanError,
  setStorageScanResponseHeaders,
} from "../../../../../../lib/inventory/storageUnitScanApi";
import scannerCapture from "../../../../../../lib/inventory/workOrderScannerCapture.cjs";

const { getWorkOrderScannerCapture, signalWorkOrderScannerDrain } = scannerCapture;

export const config = { api: { bodyParser: { sizeLimit: "1kb" } } };

export default async function handler(req, res) {
  setStorageScanResponseHeaders(res);
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, code: "method_not_allowed", error: "Method not allowed." });
  }
  const authUser = await requireStorageScanUser(req, res);
  if (!authUser || res.writableEnded) return;
  if (
    !hasOnlyBodyKeys(req.body, ["workOrderId", "reason"]) ||
    Object.keys(req.body || {}).length !== 2
  ) {
    return res.status(400).json({ ok: false, code: "invalid_request", error: "The drain body must contain only workOrderId and reason." });
  }
  if (!adminDb) {
    return res.status(503).json({ ok: false, code: "scanner_unavailable", error: "The Work Order scanner is unavailable." });
  }
  try {
    const session = await getWorkOrderScannerCapture({
      db: adminDb,
      authUser,
      sessionId: req.query?.id,
    });
    if (String(session.workOrderId) !== String(req.body.workOrderId)) {
      return res.status(409).json({ ok: false, code: "session_target_conflict", error: "This scanner session belongs to another work order." });
    }
    const drain = await signalWorkOrderScannerDrain({
      sessionId: session.sessionId,
      workOrderId: session.workOrderId,
      reason: req.body.reason,
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
    return sendStorageScanError(res, error, "work-order-drain");
  }
}
