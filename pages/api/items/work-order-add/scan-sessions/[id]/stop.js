import { adminDb } from "../../../../../../context/FirebaseAdmin";
import {
  hasOnlyBodyKeys,
  requireStorageScanUser,
  sendStorageScanError,
  setStorageScanResponseHeaders,
} from "../../../../../../lib/inventory/storageUnitScanApi";
import scannerCapture from "../../../../../../lib/inventory/workOrderScannerCapture.cjs";

const { stopWorkOrderScannerCapture } = scannerCapture;

export const config = {
  api: { bodyParser: { sizeLimit: "1kb" } },
};

export default async function handler(req, res) {
  setStorageScanResponseHeaders(res);
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      ok: false,
      code: "method_not_allowed",
      error: "Method not allowed.",
    });
  }
  const authUser = await requireStorageScanUser(req, res);
  if (!authUser || res.headersSent || res.writableEnded) return;
  if (
    !hasOnlyBodyKeys(req.body, ["workOrderId", "reason"]) ||
    Object.keys(req.body || {}).length !== 2
  ) {
    return res.status(400).json({
      ok: false,
      code: "invalid_request",
      error: "The request body must contain only workOrderId and reason.",
    });
  }
  if (!adminDb) {
    return res.status(503).json({
      ok: false,
      code: "scanner_unavailable",
      error: "The Work Order scanner is unavailable.",
    });
  }
  try {
    const stop = await stopWorkOrderScannerCapture({
      db: adminDb,
      authUser,
      sessionId: req.query?.id,
      workOrderId: req.body.workOrderId,
      reason: req.body.reason,
    });
    if (!stop.delivered) {
      const bridgeStatus = Number(stop.status) || 0;
      const responseStatus =
        bridgeStatus >= 400 && bridgeStatus < 600 ? bridgeStatus : 502;
      return res.status(responseStatus).json({
        ok: false,
        code: "scanner_stop_failed",
        error:
          "The Work Order capture was stopped, but the scanner stop signal was not acknowledged.",
        committed: true,
        session: stop.session,
        stop,
      });
    }
    return res.status(200).json({
      ok: true,
      committed: true,
      session: stop.session,
      stop,
    });
  } catch (error) {
    return sendStorageScanError(res, error, "work-order-stop");
  }
}
