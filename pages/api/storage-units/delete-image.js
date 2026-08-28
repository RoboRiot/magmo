import { adminBucket, adminDb } from "../../../context/FirebaseAdmin";
import { requireFirebaseAuth } from "../../../utils/apiAuth";
import { canAccessMagmo } from "../../../utils/authAccess";
import storageUnitDetail from "../../../lib/inventory/storageUnitDetail.cjs";

const {
  STORAGE_UNIT_COLLECTION,
  buildStorageUnitPhotoPath,
  normalizeStorageName,
  normalizeStorageUnitId,
} = storageUnitDetail;

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.setHeader("Allow", "DELETE");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const authUser = await requireFirebaseAuth(req, res);
  if (res.headersSent || res.writableEnded) return;
  if (!authUser?.uid) {
    return res.status(401).json({ error: "Authentication is required." });
  }
  if (
    authUser.email_verified !== true ||
    !canAccessMagmo(authUser.email, authUser)
  ) {
    return res.status(403).json({ error: "Magmo access is required." });
  }
  if (!adminBucket || !adminDb) {
    return res
      .status(503)
      .json({ error: "Storage-unit image storage is unavailable." });
  }

  const unitId = normalizeStorageUnitId(req.body?.unitId);
  const storageName = normalizeStorageName(req.body?.storageName);
  const storagePath = buildStorageUnitPhotoPath(unitId, storageName);
  if (!storagePath) {
    return res.status(400).json({ error: "A valid storage-unit image is required." });
  }

  try {
    const unitDocument = await adminDb
      .collection(STORAGE_UNIT_COLLECTION)
      .doc(unitId)
      .get();
    if (!unitDocument.exists) {
      return res.status(404).json({ error: "The storage unit could not be found." });
    }

    await adminBucket.file(storagePath).delete({ ignoreNotFound: true });
    return res.status(200).json({ ok: true, unitId, storageName });
  } catch (error) {
    console.error("[StorageUnits][delete-image]", {
      unitId,
      storageName,
      code: error?.code,
      message: error?.message,
    });
    return res
      .status(500)
      .json({ error: "The storage-unit image could not be deleted." });
  }
}
