import { adminDb } from "../../../../../context/FirebaseAdmin";
import {
  requireStorageScanUser,
  sendStorageScanError,
  setStorageScanResponseHeaders,
} from "../../../../../lib/inventory/storageUnitScanApi";
import scanSessions from "../../../../../lib/inventory/storageUnitScanSessions.cjs";

const { getStorageScanSession } = scanSessions;

export default async function handler(req, res) {
  setStorageScanResponseHeaders(res);
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({
      ok: false,
      code: "method_not_allowed",
      error: "Method not allowed.",
    });
  }
  const authUser = await requireStorageScanUser(req, res);
  if (!authUser || res.headersSent || res.writableEnded) return;
  if (!adminDb) {
    return res.status(503).json({
      ok: false,
      code: "scanner_unavailable",
      error: "The warehouse scanner is unavailable.",
    });
  }
  try {
    const session = await getStorageScanSession({
      db: adminDb,
      authUser,
      sessionId: req.query?.id,
    });
    return res.status(200).json({ ok: true, session, events: session.events });
  } catch (error) {
    return sendStorageScanError(res, error, "status");
  }
}
