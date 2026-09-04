import { adminDb } from "../../../../../../../context/FirebaseAdmin";
import {
  hasOnlyBodyKeys,
  requireStorageScanUser,
  sendStorageScanError,
  setStorageScanResponseHeaders,
} from "../../../../../../../lib/inventory/storageUnitScanApi";
import scanSessions from "../../../../../../../lib/inventory/storageUnitScanSessions.cjs";
import storageUnitPlacement from "../../../../../../../lib/inventory/storageUnitPlacement.cjs";

const { resolveStorageScanEvent } = scanSessions;
const { resolveStorageScanCode } = storageUnitPlacement;

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
  if (!hasOnlyBodyKeys(req.body || {}, [])) {
    return res.status(400).json({
      ok: false,
      code: "invalid_request",
      error: "The resolve request must contain an empty object.",
    });
  }
  const authUser = await requireStorageScanUser(req, res);
  if (!authUser || res.writableEnded) return;
  if (!adminDb) {
    return res.status(503).json({
      ok: false,
      code: "scanner_unavailable",
      error: "The warehouse scanner is unavailable.",
    });
  }
  try {
    const result = await resolveStorageScanEvent({
      db: adminDb,
      authUser,
      sessionId: req.query?.id,
      eventId: req.query?.eventId,
      resolveStorageScanCode,
    });
    return res.status(200).json({
      ok: true,
      duplicate: result.duplicate,
      event: result.event,
    });
  } catch (error) {
    return sendStorageScanError(res, error, "resolve-event");
  }
}
