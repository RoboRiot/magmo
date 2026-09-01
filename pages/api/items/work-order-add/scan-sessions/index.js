import { adminDb } from "../../../../../context/FirebaseAdmin";
import {
  hasOnlyBodyKeys,
  requireStorageScanUser,
  sendStorageScanError,
  setStorageScanResponseHeaders,
} from "../../../../../lib/inventory/storageUnitScanApi";
import scannerCapture from "../../../../../lib/inventory/workOrderScannerCapture.cjs";

const { startWorkOrderScannerCapture } = scannerCapture;

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
    !hasOnlyBodyKeys(req.body, ["sessionId", "workOrderId"]) ||
    Object.keys(req.body || {}).length !== 2
  ) {
    return res.status(400).json({
      ok: false,
      code: "invalid_request",
      error: "The request body must contain only sessionId and workOrderId.",
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
    const session = await startWorkOrderScannerCapture({
      db: adminDb,
      authUser,
      sessionId: req.body.sessionId,
      workOrderId: req.body.workOrderId,
    });
    return res.status(201).json({ ok: true, session });
  } catch (error) {
    return sendStorageScanError(res, error, "work-order-start");
  }
}
