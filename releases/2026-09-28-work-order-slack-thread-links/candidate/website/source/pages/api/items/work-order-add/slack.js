import { adminDb, adminBucket } from "../../../../context/FirebaseAdmin";
import { hasOnlyBodyKeys, requireStorageScanUser, setStorageScanResponseHeaders } from "../../../../lib/inventory/storageUnitScanApi";
import workOrderAddSlack from "../../../../lib/inventory/workOrderAddSlack.cjs";
import { sendSlackListItem } from "../../slack/add-to-list";

export const config = { api: { bodyParser: { sizeLimit: "2kb" } } };

export default async function handler(req, res) {
  setStorageScanResponseHeaders(res);
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, code: "method_not_allowed", error: "Method not allowed." });
  }
  const authUser = await requireStorageScanUser(req, res);
  if (!authUser || res.headersSent || res.writableEnded) return;
  if (!hasOnlyBodyKeys(req.body, ["operationId", "itemId"])) {
    return res.status(400).json({ ok: false, code: "invalid_request", error: "Only the saved operation and item IDs are accepted." });
  }
  try {
    const deadline = Date.now() + 210000;
    const fetchImpl = async (url, options = {}) => {
      const remaining = deadline - Date.now();
      if (remaining <= 0) throw new Error("Slack item send timed out.");
      return fetch(url, { ...options, signal: AbortSignal.timeout(Math.min(20000, remaining)) });
    };
    const result = await workOrderAddSlack.sendConfirmedItemToSlack({
      db: adminDb, bucket: adminBucket, authUser,
      operationId: req.body.operationId, itemId: req.body.itemId,
      fetchImpl,
      sendItem: async (body, internal) => {
        let output;
        const response = {
          writableEnded: false,
          status() { return this; },
          json(value) { output = value; this.writableEnded = true; return this; },
        };
        await sendSlackListItem({ method: "POST", body }, response, { ...internal, fetchImpl });
        return output;
      },
    });
    return res.status(200).json({ ok: true, result });
  } catch (error) {
    const known = error instanceof workOrderAddSlack.WorkOrderSlackError || error?.name === "WorkOrderAddContractError";
    if (!known) console.error("[WorkOrderAdd][Slack]", { code: error?.code || "internal_error" });
    return res.status(known ? error.statusCode || 400 : 500).json({
      ok: false, code: known ? error.code : "internal_error",
      error: known ? error.message : "Slack status could not be saved. Check status before trying again.",
    });
  }
}
