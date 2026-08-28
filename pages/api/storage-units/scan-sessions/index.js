import { adminDb } from "../../../../context/FirebaseAdmin";
import {
  hasOnlyBodyKeys,
  requireStorageScanUser,
  sendStorageScanError,
  setStorageScanResponseHeaders,
} from "../../../../lib/inventory/storageUnitScanApi";
import scanSessions from "../../../../lib/inventory/storageUnitScanSessions.cjs";

const { startStorageScanSession } = scanSessions;

export const config = {
  api: { bodyParser: { sizeLimit: "4kb" } },
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
  if (!hasOnlyBodyKeys(req.body, ["unitId"]) || Object.keys(req.body).length !== 1) {
    return res.status(400).json({
      ok: false,
      code: "invalid_request",
      error: "The request body must contain only unitId.",
    });
  }
  if (!adminDb) {
    return res.status(503).json({
      ok: false,
      code: "scanner_unavailable",
      error: "The warehouse scanner is unavailable.",
    });
  }
  try {
    const session = await startStorageScanSession({
      db: adminDb,
      authUser,
      rawUnitId: req.body.unitId,
    });
    return res.status(201).json({ ok: true, session, events: session.events });
  } catch (error) {
    return sendStorageScanError(res, error, "start");
  }
}
