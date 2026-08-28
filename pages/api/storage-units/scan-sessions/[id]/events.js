import { adminDb } from "../../../../../context/FirebaseAdmin";
import {
  sendStorageScanError,
  setStorageScanResponseHeaders,
} from "../../../../../lib/inventory/storageUnitScanApi";
import scanSessions from "../../../../../lib/inventory/storageUnitScanSessions.cjs";
import storageUnitPlacement from "../../../../../lib/inventory/storageUnitPlacement.cjs";

const { bearerTokenFromRequest, ingestStorageScanEvent } = scanSessions;
const { resolveStorageScanCode } = storageUnitPlacement;

export const config = {
  api: { bodyParser: { sizeLimit: "4kb" } },
};

export default async function handler(req, res) {
  setStorageScanResponseHeaders(res);
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      ok: false,
      code: "method_not_allowed",
      error: "Method not allowed.",
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
    const result = await ingestStorageScanEvent({
      db: adminDb,
      sessionId: req.query?.id,
      callbackToken: bearerTokenFromRequest(req),
      body: req.body,
      resolveStorageScanCode,
    });
    return res.status(result.duplicate ? 200 : 202).json({
      ok: true,
      duplicate: result.duplicate,
      event: result.event,
    });
  } catch (error) {
    return sendStorageScanError(res, error, "event");
  }
}
