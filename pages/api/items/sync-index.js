import { adminDb } from "../../../context/FirebaseAdmin";
import { requireFirebaseAuth } from "../../../utils/apiAuth";
import {
  ITEM_VISION_INDEX_COLLECTION,
  buildItemVisionIndexRecord,
} from "../../../utils/itemVisionIndex";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

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
    if (IS_PRODUCTION && !authUser?.uid) return;
    if (!adminDb) {
      return res.status(503).json({ error: "The item catalog is not available." });
    }

    const itemId = normalizeItemId(req.body?.itemId);
    const previousItemId = normalizeItemId(req.body?.previousItemId);
    if (!itemId) return res.status(400).json({ error: "A valid item ID is required." });

    const itemDocument = await adminDb.collection("Test").doc(itemId).get();
    if (!itemDocument.exists) {
      return res.status(404).json({ error: "The saved item could not be found." });
    }

    const record = buildItemVisionIndexRecord(
      itemDocument.data() || {},
      itemDocument.id
    );
    const batch = adminDb.batch();
    batch.set(
      adminDb.collection(ITEM_VISION_INDEX_COLLECTION).doc(itemId),
      record
    );
    if (previousItemId && previousItemId !== itemId) {
      batch.delete(
        adminDb.collection(ITEM_VISION_INDEX_COLLECTION).doc(previousItemId)
      );
    }
    await batch.commit();

    return res.status(200).json({ ok: true, itemId });
  } catch (error) {
    console.error("[ItemVision][sync-index]", {
      name: error?.name,
      code: error?.code,
      message: error?.message,
    });
    return res.status(500).json({
      error: "The item was saved, but its Smart Camera index could not be updated.",
    });
  }
}
