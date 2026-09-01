import { adminDb } from "../../../../context/FirebaseAdmin";
import {
  hasOnlyBodyKeys,
  requireStorageScanUser,
  setStorageScanResponseHeaders,
} from "../../../../lib/inventory/storageUnitScanApi";
import workOrderAddService from "../../../../lib/inventory/workOrderAddService.cjs";

const { WorkOrderAddError, previewWorkOrderAddScan } = workOrderAddService;

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
  if (
    !hasOnlyBodyKeys(req.body, ["code"]) ||
    Object.keys(req.body || {}).length !== 1
  ) {
    return res.status(400).json({
      ok: false,
      code: "invalid_request",
      error: "The request body must contain only code.",
    });
  }
  if (!adminDb) {
    return res.status(503).json({
      ok: false,
      code: "database_unavailable",
      error: "The inventory database is unavailable.",
    });
  }
  try {
    const resolution = await previewWorkOrderAddScan({
      db: adminDb,
      rawCode: req.body.code,
    });
    return res.status(200).json({ ok: true, resolution });
  } catch (error) {
    const known =
      error instanceof WorkOrderAddError ||
      ["WorkOrderAddContractError", "StoragePlacementError"].includes(
        error?.name
      );
    const status = known ? error.statusCode || 400 : 500;
    if (!known) {
      console.error("[WorkOrderAdd][resolve]", {
        code: error?.code,
        message: error?.message,
      });
    }
    return res.status(status).json({
      ok: false,
      code: known ? error.code : "internal_error",
      error: known ? error.message : "The scanned code could not be resolved.",
      ...(known && error.details ? { details: error.details } : {}),
    });
  }
}
