import { adminDb } from "../../../../../context/FirebaseAdmin";
import {
  sendStorageScanError,
  setStorageScanResponseHeaders,
} from "../../../../../lib/inventory/storageUnitScanApi";
import scanSessions from "../../../../../lib/inventory/storageUnitScanSessions.cjs";
import callbackRateLimit from "../../../../../lib/inventory/scanCallbackRateLimit.cjs";

const {
  bearerTokenFromRequest,
  cleanCallbackToken,
  ingestStorageScanEvent,
} = scanSessions;
const { scanCallbackRetryAfter } = callbackRateLimit;

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
  try {
    const callbackToken = cleanCallbackToken(bearerTokenFromRequest(req));
    if (!callbackToken) {
      return res.status(401).json({
        ok: false,
        code: "invalid_callback_token",
        error: "The scan callback credential is invalid.",
      });
    }
    const retryAfter = scanCallbackRetryAfter(req, { namespace: "storage-unit" });
    if (retryAfter) {
      res.setHeader("Retry-After", String(retryAfter));
      return res.status(429).json({
        ok: false,
        code: "callback_rate_limited",
        error: "Too many scanner callback requests were received.",
      });
    }
    if (!adminDb) {
      return res.status(503).json({
        ok: false,
        code: "scanner_unavailable",
        error: "The warehouse scanner is unavailable.",
      });
    }
    const result = await ingestStorageScanEvent({
      db: adminDb,
      sessionId: req.query?.id,
      callbackToken,
      body: req.body,
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
