"use strict";

const { parseStringPromise } = require("xml2js");
const { createHash } = require("node:crypto");
const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PROOF_MAX_AGE_MS = 5 * 60 * 1000;
const trustedProofs = new WeakSet();
const clean = (value, max = 500) => typeof value === "string" || typeof value === "number"
  ? String(value).replace(/\s+/g, " ").trim().slice(0, max) : "";
const canonicalEquipmentId = value => GUID.test(clean(value)) ? clean(value).toUpperCase() : "";
function scalar(value) {
  if (Array.isArray(value)) return value.length === 1 ? scalar(value[0]) : "";
  if (value && typeof value === "object") return scalar(value._ ?? value.text ?? "");
  return clean(value, 2000);
}
function plain(value) {
  if (Array.isArray(value)) return value.map(plain);
  if (!value || typeof value !== "object") return scalar(value);
  return { ...(value.$ || {}), ...Object.fromEntries(Object.entries(value).filter(([key]) => key !== "$" && key !== "_").map(([key, entry]) => [key, plain(entry)])),
    ...(value._ !== undefined ? { text: scalar(value._) } : {}) };
}
function field(value, names) {
  const wanted = new Set(names.map(name => name.toLowerCase()));
  const entries = Object.entries(value || {}).filter(([key]) => wanted.has(key.toLowerCase())).map(([, entry]) => scalar(entry));
  const unique = [...new Set(entries)];
  return unique.length === 1 ? unique[0] : "";
}
function boolean(value) {
  const text = scalar(value).toLowerCase();
  return ["true", "1", "yes"].includes(text) ? true : ["false", "0", "no"].includes(text) ? false : null;
}
function isVerifiedEquipmentProof(proof, { nowMs = Date.now() } = {}) {
  const verified = Date.parse(proof?.verifiedAtIso || "");
  return Boolean(proof && trustedProofs.has(proof) && Number.isFinite(verified) &&
    verified <= nowMs + 5000 && nowMs - verified <= PROOF_MAX_AGE_MS);
}

// Only this server module can mint a proof. JSON serialized through an HTTP
// request, an audit file, or Firestore cannot impersonate a fresh lookup.
function normalizeVerifiedEquipmentResponse(parsed, expectedId, { nowMs = Date.now() } = {}) {
  const id = canonicalEquipmentId(expectedId), root = plain(parsed?.response || parsed);
  const fail = reason => ({ ok: false, reason });
  if (!id) return fail("bluefolder_equipment_lookup_invalid_guid");
  if (!["ok", "success", "succeeded"].includes(field(root, ["status"]).toLowerCase())) return fail("bluefolder_equipment_lookup_api_rejected");
  const rows = root?.equipmentItem == null ? [] : Array.isArray(root.equipmentItem) ? root.equipmentItem : [root.equipmentItem];
  if (rows.length !== 1 || !rows[0] || typeof rows[0] !== "object") return fail("bluefolder_equipment_lookup_ambiguous");
  const equipment = rows[0];
  if (canonicalEquipmentId(field(equipment, ["equipmentId"])) !== id) return fail("bluefolder_equipment_lookup_identity_mismatch");
  const inactive = boolean(field(equipment, ["inactive", "isInactive"])), active = boolean(field(equipment, ["active", "isActive"]));
  if ((inactive !== null && active !== null && active === inactive) ||
      (inactive !== false && active !== true) || inactive === true || active === false) return fail("bluefolder_equipment_lookup_not_explicitly_active");
  const customerId = field(equipment, ["customerId"]), locationId = field(equipment, ["locationId", "customerLocationId"]);
  if (!/^\d+$/.test(customerId) || !/^\d+$/.test(locationId)) return fail("bluefolder_equipment_lookup_site_missing");
  const name = field(equipment, ["equipName"]), manufacturer = field(equipment, ["mfrName"]), model = field(equipment, ["modelNo"]), type = field(equipment, ["equipType"]);
  // The immutable GUID + active exact site identifies the source asset. BlueFolder
  // may legitimately omit descriptive OEM/model/modality fields; retain blanks
  // rather than inventing values or rejecting an otherwise verified scanner.
  if (!name) return fail("bluefolder_equipment_lookup_identity_incomplete");
  const notes = field(equipment, ["notes"]);
  const custom = JSON.stringify(equipment.customFields || {});
  const mobilityText = [name, type, model, notes, custom].join(" ");
  const mobileProfile = /\b(?:trailer|mobile|transportable|relocatable|van|truck)\b|\bAIS\s*[-#]?\s*\d{1,3}\b/i.test(mobilityText) ||
    boolean(field(equipment, ["mobile", "isMobile"])) === true || Boolean(field(equipment, ["trailerId", "trailerNumber"]));
  const mobileNumber = Number(name.match(/^MOBILE\s*#\s*0*(\d+)\b/i)?.[1] || 0);
  if (mobileProfile && !(customerId === "34579389" && Number.isInteger(mobileNumber) && mobileNumber > 0 && mobileNumber <= 999)) {
    return fail("bluefolder_equipment_lookup_mobile_requires_review");
  }
  const rawSerial = field(equipment, ["serialNo"]);
  const serial = /^(?:tbd|n\/?a|none|unknown|not available|not known|-+|0+)$/i.test(rawSerial) ? "" : rawSerial;
  const proof = { source: "bluefolder_equipment_get", equipmentId: id, active: true, customerId, locationId,
    name: clean(name, 220), manufacturer: clean(manufacturer, 100), model: clean(model, 220), type: clean(type, 100),
    serial: clean(serial, 220), sourceSerial: clean(rawSerial, 220), stationaryScreenPassed: !mobileProfile,
    ...(mobileProfile ? { mobileNumber } : {}),
    verifiedAtIso: new Date(nowMs).toISOString() };
  proof.sourceHash = createHash("sha256").update(JSON.stringify(proof)).digest("hex");
  Object.freeze(proof); trustedProofs.add(proof);
  return Object.freeze({ ok: true, reason: "bluefolder_equipment_lookup_verified", proof });
}

async function readBounded(response, maximum) {
  if (Number(response.headers?.get?.("content-length") || 0) > maximum) throw Object.assign(new Error(), { code: "response_too_large" });
  if (!response.body?.getReader) {
    const text = await response.text();
    if (Buffer.byteLength(text) > maximum) throw Object.assign(new Error(), { code: "response_too_large" });
    return text;
  }
  const reader = response.body.getReader(), chunks = []; let length = 0;
  try {
    for (;;) {
      const chunk = await reader.read(); if (chunk.done) break;
      length += chunk.value.byteLength;
      if (length > maximum) { await reader.cancel(); throw Object.assign(new Error(), { code: "response_too_large" }); }
      chunks.push(Buffer.from(chunk.value));
    }
    return Buffer.concat(chunks, length).toString("utf8");
  } finally { reader.releaseLock?.(); }
}

function createBlueFolderEquipmentLookup({ fetchImpl = globalThis.fetch, env = process.env, now = Date.now,
  timeoutMs = 8000, maxResponseBytes = 128 * 1024, maxCacheEntries = 128 } = {}) {
  const cache = new Map(), inflight = new Map();
  const lookup = async expectedId => {
    const id = canonicalEquipmentId(expectedId);
    if (!id) return { ok: false, reason: "bluefolder_equipment_lookup_invalid_guid" };
    const prior = cache.get(id);
    if (prior && prior.until > now()) return prior.result;
    cache.delete(id);
    if (inflight.has(id)) return inflight.get(id);
    if (inflight.size >= maxCacheEntries) return { ok: false, reason: "bluefolder_equipment_lookup_busy" };
    const request = async () => {
      const token = String(env.BLUEFOLDER_API_TOKEN || env.BLUEFOLDER_API_KEY || "").replace(/\s+#.*$/, "").trim();
      if (!token) return { ok: false, reason: "bluefolder_equipment_lookup_credentials_missing" };
      const base = String(env.BLUEFOLDER_BASE_URL || "https://app.bluefolder.com/api/2.0").replace(/\/+$/, "");
      let url;
      try {
        url = new URL(`${base}/equipment/get.aspx`);
        if (url.protocol !== "https:" || url.hostname !== "app.bluefolder.com" || url.username || url.password || url.search || url.hash) throw new Error();
      } catch { return { ok: false, reason: "bluefolder_equipment_lookup_base_url_invalid" }; }
      const controller = new AbortController(), timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const response = await fetchImpl(url.href, { method: "POST", redirect: "error", signal: controller.signal,
          headers: { Authorization: `Basic ${Buffer.from(`${token}:x`).toString("base64")}`, "Content-Type": "text/xml", Accept: "text/xml, application/xml" },
          body: `<request><equipmentId>${id}</equipmentId></request>` });
        if (!response?.ok) return { ok: false, reason: response?.status === 429 ? "bluefolder_equipment_lookup_rate_limited" : "bluefolder_equipment_lookup_http_failed" };
        const text = await readBounded(response, maxResponseBytes);
        if (/<!DOCTYPE|<!ENTITY/i.test(text)) return { ok: false, reason: "bluefolder_equipment_lookup_malformed_response" };
        let parsed;
        try { parsed = await parseStringPromise(text, { explicitArray: false, trim: true }); }
        catch { return { ok: false, reason: "bluefolder_equipment_lookup_malformed_response" }; }
        return normalizeVerifiedEquipmentResponse(parsed, id, { nowMs: now() });
      } catch (error) {
        return { ok: false, reason: error?.name === "AbortError" ? "bluefolder_equipment_lookup_timeout"
          : error?.code === "response_too_large" ? "bluefolder_equipment_lookup_response_too_large" : "bluefolder_equipment_lookup_unavailable" };
      } finally { clearTimeout(timer); }
    };
    const pending = request().then(result => {
      cache.set(id, { result, until: now() + (result.ok ? PROOF_MAX_AGE_MS : 30000) });
      while (cache.size > maxCacheEntries) cache.delete(cache.keys().next().value);
      return result;
    }).finally(() => inflight.delete(id));
    inflight.set(id, pending); return pending;
  };
  lookup.clearCache = () => cache.clear();
  return lookup;
}

module.exports = { canonicalEquipmentId, PROOF_MAX_AGE_MS, isVerifiedEquipmentProof,
  normalizeVerifiedEquipmentResponse, createBlueFolderEquipmentLookup,
  getVerifiedBlueFolderEquipment: createBlueFolderEquipmentLookup() };
