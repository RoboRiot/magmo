import { adminDb } from "../../../../context/FirebaseAdmin";
import {
  hasOnlyBodyKeys,
  requireStorageScanUser,
  setStorageScanResponseHeaders,
} from "../../../../lib/inventory/storageUnitScanApi";
import workOrderAddService from "../../../../lib/inventory/workOrderAddService.cjs";
import workOrderAddContract from "../../../../lib/inventory/workOrderAddContract.cjs";

const { WorkOrderAddError, confirmWorkOrderAdd } = workOrderAddService;

export const config = {
  api: { bodyParser: { sizeLimit: "24kb" } },
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
    !hasOnlyBodyKeys(req.body, [
      "operationId",
      "workOrderId",
      "scans",
      "movementMode",
      "expectedMembership",
    ])
  ) {
    return res.status(400).json({
      ok: false,
      code: "invalid_request",
      error: "The confirmation body contains unsupported fields.",
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
    const movementMode = workOrderAddContract.normalizeMovementMode(
      req.body.movementMode
    );
    const result = await confirmWorkOrderAdd({
      db: adminDb,
      authUser,
      operationId: req.body.operationId,
      workOrderId: req.body.workOrderId,
      scans: req.body.scans,
      movementMode,
      expectedMembership: req.body.expectedMembership,
    });
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    const known =
      error instanceof WorkOrderAddError ||
      ["WorkOrderAddContractError", "StoragePlacementError"].includes(
        error?.name
      );
    const status = known ? error.statusCode || 400 : 500;
    if (!known) {
      console.error("[WorkOrderAdd][confirm]", {
        code: error?.code,
        message: error?.message,
      });
    }
    return res.status(status).json({
      ok: false,
      code: known ? error.code : "internal_error",
      error: known
        ? error.message
        : "The Work order add list could not be confirmed.",
      ...(known && error.details ? { details: error.details } : {}),
    });
  }
}
