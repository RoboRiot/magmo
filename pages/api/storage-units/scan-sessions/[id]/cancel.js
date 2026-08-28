import { adminDb } from "../../../../../context/FirebaseAdmin";
import {
  hasOnlyBodyKeys,
  requireStorageScanUser,
  sendStorageScanError,
  setStorageScanResponseHeaders,
} from "../../../../../lib/inventory/storageUnitScanApi";
import scanSessions from "../../../../../lib/inventory/storageUnitScanSessions.cjs";

const { cancelStorageScanSession } = scanSessions;

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
  if (!hasOnlyBodyKeys(req.body || {}, []) || Object.keys(req.body || {}).length !== 0) {
    return res.status(400).json({
      ok: false,
      code: "invalid_request",
      error: "Cancel does not accept request fields.",
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
    const result = await cancelStorageScanSession({
      db: adminDb,
      authUser,
      sessionId: req.query?.id,
    });
    const status = result.stopDelivered ? 200 : 502;
    return res.status(status).json({
      ok: result.stopDelivered,
      session: result.session,
      events: result.session.events,
      stop: { delivered: result.stopDelivered },
      ...(result.stopDelivered
        ? {}
        : {
            code: "scanner_stop_failed",
            error:
              "The session was cancelled, but the scanner stop signal was not acknowledged.",
          }),
    });
  } catch (error) {
    return sendStorageScanError(res, error, "cancel");
  }
}
