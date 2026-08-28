import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "../../../../../context/FirebaseAdmin";
import {
  USER_ROLES,
  canAccessMagmo,
  getEffectiveRole,
  isAllowedEmailDomain,
} from "../../../../../utils/authAccess";
import {
  requireStorageScanUser,
  setStorageScanResponseHeaders,
} from "../../../../../lib/inventory/storageUnitScanApi";
import placementContract from "../../../../../lib/inventory/storageUnitPlacement.cjs";
import scanSessionContract from "../../../../../lib/inventory/storageUnitScanSessions.cjs";

const { StoragePlacementError, confirmStorageUnitPlacement } = placementContract;
const {
  StorageScanError,
  signalStorageScanStop,
  storageScanSessionRef,
} = scanSessionContract;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "24kb",
    },
  },
};

function canMutateInventory(authUser) {
  const email = String(authUser?.email || "").trim().toLowerCase();
  return (
    authUser?.uid &&
    authUser.email_verified === true &&
    isAllowedEmailDomain(email) &&
    canAccessMagmo(email, authUser) &&
    getEffectiveRole(email, authUser) !== USER_ROLES.VIEWER
  );
}

function validateBody(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new StoragePlacementError(
      "invalid_request",
      "The confirmation body must be an object."
    );
  }
  const keys = Object.keys(body);
  if (keys.some((key) => key !== "eventIds")) {
    throw new StoragePlacementError(
      "invalid_request",
      "Only selected scan event IDs may be confirmed."
    );
  }
  return body.eventIds;
}

async function recordBridgeStop(sessionId, delivered) {
  try {
    await storageScanSessionRef(adminDb, sessionId).set(
      {
        bridgeStopStatus: delivered ? "delivered" : "failed",
        bridgeStoppedAt: delivered ? new Date() : null,
        updatedAt: new Date(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("[StorageUnits][scan-confirm][bridge-status]", {
      sessionId,
      code: error?.code,
      message: error?.message,
    });
  }
}

export default async function handler(req, res) {
  setStorageScanResponseHeaders(res);
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const authUser = await requireStorageScanUser(req, res);
  if (res.headersSent || res.writableEnded) return;
  if (!authUser?.uid) return;
  if (!canMutateInventory(authUser)) {
    return res.status(403).json({ error: "Internal inventory-edit access is required." });
  }
  if (!adminDb) {
    return res.status(503).json({ error: "The inventory database is unavailable." });
  }

  const sessionId = String(req.query?.id || "").trim();
  try {
    const eventIds = validateBody(req.body);
    const result = await confirmStorageUnitPlacement({
      db: adminDb,
      sessionId,
      eventIds,
      authUser,
      FieldValue,
      sessionHelpers: scanSessionContract,
    });

    const stopResult = await signalStorageScanStop({
      sessionId,
      unitId: result.unitId,
      reason: "confirmed",
    }).catch((error) => {
      console.error("[StorageUnits][scan-confirm][bridge-stop]", {
        sessionId,
        code: error?.code,
        message: error?.message,
      });
      return { delivered: false };
    });
    const bridgeStopDelivered = Boolean(stopResult?.delivered);
    await recordBridgeStop(sessionId, bridgeStopDelivered);

    return res.status(200).json({
      ...result,
      bridgeStopDelivered,
    });
  } catch (error) {
    const known = error instanceof StoragePlacementError || error instanceof StorageScanError;
    const statusCode = known ? error.statusCode || 400 : 500;
    if (!known) {
      console.error("[StorageUnits][scan-confirm]", {
        sessionId,
        code: error?.code,
        message: error?.message,
      });
    }
    return res.status(statusCode).json({
      error: known ? error.message : "The staged placement could not be confirmed.",
      ...(known && error.code ? { code: error.code } : {}),
    });
  }
}

export { canMutateInventory, validateBody };
