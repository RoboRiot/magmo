import { adminDb, adminBucket } from "../../../context/FirebaseAdmin";
import { requireFirebaseAuth } from "../../../utils/apiAuth";
import { buildNameTokens, buildGeneralSearchTokens, buildWorkOrderTokens } from "../../../utils/itemFormShared";
import service from "../../../lib/items/itemChangeRequests.cjs";
import { buildItemVisionIndexRecord } from "../../../utils/itemVisionIndex";
import visionPhotoIndex from "../../../lib/items/visionPhotoIndex.cjs";

export const config = { api: { bodyParser: { sizeLimit: "512kb" } } };

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (!["GET", "POST"].includes(req.method)) { res.setHeader("Allow", "GET, POST"); return res.status(405).json({ error: "Method not allowed." }); }
  const actor = await requireFirebaseAuth(req, res);
  if (res.headersSent || res.writableEnded) return;
  // requireFirebaseAuth historically returns null during local development;
  // approval endpoints fail closed in every environment.
  if (!actor?.uid) return res.status(401).json({ error: "Sign in to view or submit item changes." });
  try {
    let result;
    if (req.method === "GET") result = await service.listItemChangeRequests({ db: adminDb, actor, input: req.query });
    else if (req.body?.action === "submit") result = await service.submitItemChangeRequest({ db: adminDb, actor, input: req.body });
    else if (["approve", "reject"].includes(req.body?.action)) result = await service.reviewItemChangeRequest({
      db: adminDb, actor, input: req.body,
      buildSearchFields: (item, itemId) => ({ nameLower: String(item.name || "").toLowerCase(), nameTokens: buildNameTokens(item.name), generalSearchTokens: buildGeneralSearchTokens(item, itemId), workOrderTokens: buildWorkOrderTokens(item) }),
    });
    else return res.status(400).json({ error: "Choose submit, approve or reject." });
    // Approval has already committed atomically. Indexing is a recoverable
    // follow-up; never report a committed approval as an unsaved inventory item.
    if (req.method === "POST" && req.body?.action === "approve" && result?.request?.status === "approved") {
      try {
        const indexed = await visionPhotoIndex.refreshItemVisionIndex({ db: adminDb, bucket: adminBucket,
          itemId: result.request.itemId, buildRecord: buildItemVisionIndexRecord });
        result.visionIndex = { ok: indexed.photoIndex?.complete === true, itemId: result.request.itemId,
          retryable: indexed.photoIndex?.complete !== true };
        if (!result.visionIndex.ok) result.warning = "The changes were approved and saved, but some photos are still missing from Smart Camera. Open the item and retry its photo index update.";
      } catch (error) {
        console.error("[Items][approved-vision-index]", { itemId: result.request.itemId, code: error?.code });
        result.visionIndex = { ok: false, itemId: result.request.itemId, retryable: error?.retryable !== false };
        result.warning = "The changes were approved and saved, but Smart Camera indexing is pending. Open the item and retry its photo index update.";
      }
    }
    return res.status(200).json(result);
  } catch (error) {
    const expected = error instanceof service.ItemChangeRequestError;
    console.error("[Items][change-requests]", { code: error?.code, message: error?.message });
    return res.status(expected ? error.status : 500).json({ code: error.code || "change_request_failed", error: expected ? error.message : "The change request could not be completed. Retry safely; no partial approval will be applied.", ...(expected && error.details ? { details: error.details } : {}) });
  }
}
