import { adminDb, adminBucket } from "../../../context/FirebaseAdmin";
import { requireFirebaseAuth } from "../../../utils/apiAuth";
import {
  buildItemVisionIndexRecord,
} from "../../../utils/itemVisionIndex";
import visionPhotoIndex from "../../../lib/items/visionPhotoIndex.cjs";

const { refreshItemVisionIndex } = visionPhotoIndex;

function normalizeItemId(value) {
  const itemId = String(value || "").trim();
  if (!itemId || itemId.length > 200 || /[\/]/.test(itemId)) return "";
  return itemId;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const authUser = await requireFirebaseAuth(req, res);
    if (res.headersSent) return;
    if (!authUser?.uid) return res.status(401).json({ error: "Sign in to update Smart Camera search." });
    if (!adminDb) {
      return res.status(503).json({ error: "The item catalog is not available." });
    }

    const itemId = normalizeItemId(req.body?.itemId);
    if (!itemId) return res.status(400).json({ error: "A valid item ID is required." });

    const synced = await refreshItemVisionIndex({
      db: adminDb, bucket: adminBucket, itemId, buildRecord: buildItemVisionIndexRecord,
      refreshPhotos: req.body?.refreshPhotos !== false,
    });
    const { files, failures, ...photoIndex } = synced.photoIndex || {};
    if (synced.photoIndex && !synced.photoIndex.complete) {
      return res.status(503).json({ ok: false, itemId, indexUpdated: true, retryable: true,
        error: "The item was saved, but some photos could not be indexed for Smart Camera. Retry the index update.", photoIndex });
    }
    return res.status(200).json({ ok: true, itemId, indexVersion: synced.indexVersion, photoIndex });
  } catch (error) {
    console.error("[ItemVision][sync-index]", {
      name: error?.name,
      code: error?.code,
      message: error?.message,
    });
    return res.status(error?.status || 500).json({
      ok: false, code: error?.code || "index_update_failed", retryable: error?.retryable !== false,
      error: error?.name === "VisionPhotoIndexError" ? error.message : "The item was saved, but its Smart Camera index could not be updated. Retry the index update.",
    });
  }
}
