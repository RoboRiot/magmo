"use strict";
const { createSourceLinkPayload } = require("./workOrderSourceLinkPayload.cjs");
function createWorkOrderSourceLookup({ env = process.env, now = Date.now,
  loadClient = () => require("../bluefolder/client") } = {}) {
  const cache = new Map(), inflight = new Map();
  return async function getWorkOrderSource(workOrderId) {
    if (!/^\d{3,12}$/.test(workOrderId || "")) return { ok: false, reason: "bluefolder_source_identity_invalid" };
    if (!String(env.BLUEFOLDER_API_TOKEN || env.BLUEFOLDER_API_KEY || "").trim()) return { ok: false, reason: "bluefolder_source_credentials_missing" };
    const prior = cache.get(workOrderId);
    if (prior && prior.until > now()) return prior.result;
    if (inflight.has(workOrderId)) return inflight.get(workOrderId);
    if (inflight.size >= 64) return { ok: false, reason: "bluefolder_source_lookup_busy" };
    const pending = (async () => {
      try {
        const { BlueFolderClient, extractWorkOrderFields, getBlueFolderSlackSettings } = loadClient();
        const settings = { ...getBlueFolderSlackSettings(), bluefolderTimeoutMs: 8000,
          bluefolderBaseUrl: "https://app.bluefolder.com/api/2.0",
          bluefolderWorkOrderDetailPath: "/serviceRequests/get.aspx?serviceRequestId={id}" };
        const raw = await new BlueFolderClient(settings).getWorkOrder(workOrderId);
        const payload = createSourceLinkPayload(extractWorkOrderFields)(workOrderId, raw, settings);
        return { ok: true, payload };
      } catch (error) {
        return { ok: false, reason: /^[a-z_]{5,120}$/.test(error?.code || "") ? error.code : "bluefolder_source_lookup_unavailable" };
      }
    })().then(result => {
      cache.set(workOrderId, { result, until: now() + (result.ok ? 30000 : 5000) });
      while (cache.size > 128) cache.delete(cache.keys().next().value);
      return result;
    }).finally(() => inflight.delete(workOrderId));
    inflight.set(workOrderId, pending); return pending;
  };
}
module.exports = { createWorkOrderSourceLookup, getWorkOrderSource: createWorkOrderSourceLookup() };
