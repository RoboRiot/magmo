import { adminDb } from "../../../../../../context/FirebaseAdmin";
import {
  sendStorageScanError,
  setStorageScanResponseHeaders,
} from "../../../../../../lib/inventory/storageUnitScanApi";
import scannerCapture from "../../../../../../lib/inventory/workOrderScannerCapture.cjs";
import scanSessions from "../../../../../../lib/inventory/storageUnitScanSessions.cjs";
import callbackRateLimit from "../../../../../../lib/inventory/scanCallbackRateLimit.cjs";

const { ingestWorkOrderScanEvent } = scannerCapture;
const { bearerTokenFromRequest, cleanCallbackToken } = scanSessions;
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

  // Gate malformed or missing credentials before invoking any code that can
  // read Firestore. The capture service performs the hash comparison later.
  const callbackToken = cleanCallbackToken(bearerTokenFromRequest(req));
  if (!callbackToken) {
    return res.status(401).json({
      ok: false,
      code: "invalid_callback_token",
      error: "The scan callback credential is invalid.",
    });
  }
  const retryAfter = scanCallbackRetryAfter(req, { namespace: "work-order-add" });
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
      error: "The Work Order scanner is unavailable.",
    });
  }
  try {
    const result = await ingestWorkOrderScanEvent({
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
    return sendStorageScanError(res, error, "work-order-event");
  }
}
