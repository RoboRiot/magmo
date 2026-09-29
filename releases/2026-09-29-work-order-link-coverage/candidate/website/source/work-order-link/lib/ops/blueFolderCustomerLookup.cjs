"use strict";

const { parseStringPromise } = require("xml2js");
const {
  normalizeBlueFolderCustomer,
  normalizeLocation,
} = require("./clientDirectory.cjs");

const DEFAULT_BASE_URL = "https://app.bluefolder.com/api/2.0";
const DEFAULT_TIMEOUT_MS = 8000;
const DEFAULT_MAX_RESPONSE_BYTES = 512 * 1024;
const DEFAULT_SUCCESS_TTL_MS = 5 * 60 * 1000;
const DEFAULT_FAILURE_TTL_MS = 30 * 1000;
const DEFAULT_MAX_CACHE_ENTRIES = 128;
const SUCCESS_STATUSES = new Set(["ok", "success", "succeeded"]);
const trustedCustomerProofs = new WeakMap();
const trustedCustomerEquipmentCatalogs = new WeakMap();
const CUSTOMER_PROOF_MAX_AGE_MS = 5 * 60 * 1000;
function isVerifiedCustomerProof(proof, { nowMs = Date.now() } = {}) {
  const verifiedAt = proof && trustedCustomerProofs.get(proof);
  return Number.isFinite(verifiedAt) && verifiedAt <= nowMs + 5000 && nowMs - verifiedAt <= CUSTOMER_PROOF_MAX_AGE_MS;
}
function brandCustomerProof(proof, verifiedAt, catalog = null) {
  Object.freeze(proof.location); Object.freeze(proof);
  trustedCustomerProofs.set(proof, verifiedAt);
  if (catalog) trustedCustomerEquipmentCatalogs.set(proof, Object.freeze(catalog.map(row => Object.freeze({ ...row }))));
  return proof;
}
function getVerifiedCustomerEquipmentCatalog(proof, options) {
  return isVerifiedCustomerProof(proof, options) ? trustedCustomerEquipmentCatalogs.get(proof) || null : null;
}
function hasRequiredSourceAddress(location = {}) {
  const country = String(location.country || "").trim().toLowerCase().replace(/[^a-z]/g, "");
  const explicitNonUs = Boolean(country) && !["us", "usa", "unitedstates", "unitedstatesofamerica", "unknown", "none", "na", "notavailable"].includes(country);
  return Boolean(location.name && location.addressStreet && location.city && location.postalCode &&
    (location.state || explicitNonUs));
}

function clean(value, maxLength = 500) {
  if (Array.isArray(value)) return clean(value[0], maxLength);
  if (value && typeof value === "object") {
    return clean(value.text ?? value._ ?? "", maxLength);
  }
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function envValue(value) {
  return String(value || "").replace(/\s+#.*$/, "").trim();
}

function xmlEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function asArray(value) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function ownValue(object, names) {
  if (!object || typeof object !== "object" || Array.isArray(object)) return undefined;
  const wanted = new Set(asArray(names).map((name) => String(name).toLowerCase()));
  const entry = Object.entries(object).find(([key]) => wanted.has(String(key).toLowerCase()));
  return entry?.[1];
}

function scalar(value) {
  if (Array.isArray(value)) return value.length === 1 ? scalar(value[0]) : "";
  if (value && typeof value === "object") {
    if (Object.prototype.hasOwnProperty.call(value, "_")) return scalar(value._);
    if (Object.prototype.hasOwnProperty.call(value, "text")) return scalar(value.text);
    return "";
  }
  return clean(value, 1000);
}

function explicitBoolean(value) {
  const normalized = scalar(value).toLowerCase();
  if (["true", "1", "yes", "y"].includes(normalized)) return true;
  if (["false", "0", "no", "n"].includes(normalized)) return false;
  return null;
}

function stripXmlAttrs(value) {
  if (Array.isArray(value)) return value.map(stripXmlAttrs);
  if (!value || typeof value !== "object") return scalar(value);
  const output = { ...(value.$ || {}) };
  if (value._ != null) output.text = scalar(value._);
  for (const [key, child] of Object.entries(value)) {
    if (key === "$" || key === "_") continue;
    output[key] = stripXmlAttrs(child);
  }
  return output;
}

function collectNamedObjects(node, name, output = []) {
  if (!node || typeof node !== "object") return output;
  if (Array.isArray(node)) {
    node.forEach((entry) => collectNamedObjects(entry, name, output));
    return output;
  }
  for (const [key, value] of Object.entries(node)) {
    if (String(key).toLowerCase() === String(name).toLowerCase()) {
      asArray(value).forEach((entry) => {
        if (entry && typeof entry === "object" && !Array.isArray(entry)) output.push(entry);
      });
    }
    if (value && typeof value === "object") collectNamedObjects(value, name, output);
  }
  return output;
}

function canonicalLocation(raw = {}) {
  return {
    customerLocationId: scalar(ownValue(raw, [
      "customerLocationId", "customerLocationID", "locationId", "id",
    ])),
    name: scalar(ownValue(raw, ["name", "locationName", "customerLocationName"])),
    addressStreet: scalar(ownValue(raw, [
      "addressStreet", "streetAddress", "street", "addressLine1",
    ])),
    addressCity: scalar(ownValue(raw, ["addressCity", "city"])),
    addressState: scalar(ownValue(raw, ["addressState", "state", "region"])),
    addressPostalCode: scalar(ownValue(raw, [
      "addressPostalCode", "postalCode", "zipCode", "zip",
    ])),
    addressCountry: scalar(ownValue(raw, ["addressCountry", "country"])),
    isPrimary: scalar(ownValue(raw, ["isPrimary", "primary"])),
  };
}

function locationRows(customer = {}) {
  const container = ownValue(customer, "locations");
  if (Array.isArray(container)) return container.filter((entry) => entry && typeof entry === "object");
  if (container && typeof container === "object") {
    const nested = ownValue(container, ["location", "locations", "customerLocation"]);
    if (nested != null) return asArray(nested).filter((entry) => entry && typeof entry === "object");
  }
  const direct = ownValue(customer, ["location", "customerLocation"]);
  return asArray(direct).filter((entry) => entry && typeof entry === "object");
}

function customerActive(rawCustomer = {}) {
  const inactive = explicitBoolean(ownValue(rawCustomer, ["inactive", "isInactive"]));
  const active = explicitBoolean(ownValue(rawCustomer, ["active", "isActive"]));
  if (inactive !== null && active !== null && active !== !inactive) return null;
  if (inactive !== null) return inactive === false;
  return active === true ? true : null;
}

function normalizeVerifiedCustomerResponse(parsed, expectedCustomerId, expectedLocationId, { nowMs = Date.now() } = {}) {
  const customerId = clean(expectedCustomerId, 100);
  const locationId = clean(expectedLocationId, 100);
  const fail = (reason) => ({ ok: false, reason });
  if (!customerId || !locationId) return fail("bluefolder_customer_lookup_identity_missing");

  const root = stripXmlAttrs(parsed?.response || parsed);
  const status = scalar(ownValue(root, "status")).toLowerCase();
  if (!SUCCESS_STATUSES.has(status)) return fail("bluefolder_customer_lookup_api_rejected");

  let rawCustomers = collectNamedObjects(root, "customer");
  if (!rawCustomers.length && ownValue(root, ["customerId", "customerID", "id"]) != null) {
    rawCustomers = [root];
  }
  if (rawCustomers.length !== 1) {
    return fail(rawCustomers.length ? "bluefolder_customer_lookup_ambiguous" : "bluefolder_customer_lookup_missing");
  }

  const rawCustomer = rawCustomers[0];
  const rawLocations = locationRows(rawCustomer);
  const canonicalLocations = rawLocations.map(canonicalLocation);
  const normalizedCustomer = normalizeBlueFolderCustomer({
    customerId: scalar(ownValue(rawCustomer, ["customerId", "customerID", "id"])),
    customerName: scalar(ownValue(rawCustomer, ["customerName", "name"])),
    inactive: scalar(ownValue(rawCustomer, ["inactive", "isInactive"])),
    locations: canonicalLocations,
  });
  if (normalizedCustomer.bluefolderCustomerId !== customerId) {
    return fail("bluefolder_customer_lookup_customer_mismatch");
  }
  if (customerActive(rawCustomer) !== true) {
    return fail("bluefolder_customer_lookup_customer_not_explicitly_active");
  }

  const matches = rawLocations
    .map((raw, index) => ({
      raw,
      location: normalizeLocation(canonicalLocations[index]),
    }))
    .filter(({ location }) => location.bluefolderLocationId === locationId);
  if (matches.length !== 1) {
    return fail(matches.length ? "bluefolder_customer_lookup_location_ambiguous" : "bluefolder_customer_lookup_location_missing");
  }
  const selected = matches[0];
  const selectedPrimary = explicitBoolean(ownValue(selected.raw, ["isPrimary", "primary"]));
  if (selectedPrimary === null) {
    return fail("bluefolder_customer_lookup_location_not_explicitly_nonprimary");
  }
  const explicitPrimaryCount = rawLocations.filter((raw) =>
    explicitBoolean(ownValue(raw, ["isPrimary", "primary"])) === true
  ).length;
  if (explicitPrimaryCount > 1) {
    return fail("bluefolder_customer_lookup_primary_location_ambiguous");
  }
  const location = selected.location;
  if (!hasRequiredSourceAddress(location)) {
    return fail("bluefolder_customer_lookup_location_incomplete");
  }

  const catalog = collectNamedObjects(rawCustomer, "equipmentItem").map(item => ({
    equipmentId: scalar(ownValue(item, "equipmentId")).toUpperCase(),
    customerId: scalar(ownValue(item, "customerId")), locationId: scalar(ownValue(item, ["locationId", "customerLocationId"])),
    name: scalar(ownValue(item, "equipName")),
  }));
  return {
    ok: true,
    reason: "bluefolder_customer_lookup_verified",
    proof: brandCustomerProof({
      source: "bluefolder_customers_get",
      customerId,
      customerName: normalizedCustomer.name,
      active: true,
      location: {
        ...location,
        isPrimary: selectedPrimary,
      },
    }, nowMs, catalog),
  };
}

async function readBoundedText(response, maxResponseBytes) {
  const contentLength = Number(response?.headers?.get?.("content-length") || 0);
  if (Number.isFinite(contentLength) && contentLength > maxResponseBytes) {
    throw Object.assign(new Error("response too large"), { lookupReason: "bluefolder_customer_lookup_response_too_large" });
  }
  if (response?.body?.getReader) {
    const reader = response.body.getReader();
    const chunks = [];
    let total = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = Buffer.from(value || []);
        total += chunk.length;
        if (total > maxResponseBytes) {
          await reader.cancel().catch(() => {});
          throw Object.assign(new Error("response too large"), { lookupReason: "bluefolder_customer_lookup_response_too_large" });
        }
        chunks.push(chunk);
      }
    } finally {
      reader.releaseLock?.();
    }
    return Buffer.concat(chunks, total).toString("utf8");
  }
  const text = await response.text();
  if (Buffer.byteLength(text, "utf8") > maxResponseBytes) {
    throw Object.assign(new Error("response too large"), { lookupReason: "bluefolder_customer_lookup_response_too_large" });
  }
  return text;
}

function cloneResult(value) {
  const cloned = JSON.parse(JSON.stringify(value));
  const verifiedAt = value?.proof && trustedCustomerProofs.get(value.proof);
  if (Number.isFinite(verifiedAt) && cloned.proof) brandCustomerProof(cloned.proof, verifiedAt, trustedCustomerEquipmentCatalogs.get(value.proof));
  return cloned;
}

function createBlueFolderCustomerLookup({
  fetchImpl = globalThis.fetch,
  env = process.env,
  now = () => Date.now(),
  timeoutMs = DEFAULT_TIMEOUT_MS,
  maxResponseBytes = DEFAULT_MAX_RESPONSE_BYTES,
  successTtlMs = DEFAULT_SUCCESS_TTL_MS,
  failureTtlMs = DEFAULT_FAILURE_TTL_MS,
  maxCacheEntries = DEFAULT_MAX_CACHE_ENTRIES,
} = {}) {
  const cache = new Map();
  const inflight = new Map();
  const putCache = (key, result) => {
    cache.delete(key);
    cache.set(key, {
      expiresAt: now() + (result.ok ? successTtlMs : failureTtlMs),
      result: cloneResult(result),
    });
    while (cache.size > maxCacheEntries) cache.delete(cache.keys().next().value);
  };

  const request = async (customerId, locationId) => {
    const token = envValue(env.BLUEFOLDER_API_TOKEN || env.BLUEFOLDER_API_KEY);
    if (!token) return { ok: false, reason: "bluefolder_customer_lookup_credentials_missing" };
    if (typeof fetchImpl !== "function") {
      return { ok: false, reason: "bluefolder_customer_lookup_fetch_unavailable" };
    }
    const baseUrl = envValue(env.BLUEFOLDER_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, "");
    let url;
    try {
      url = new URL(`${baseUrl}/customers/get.aspx`);
      if (url.protocol !== "https:") return { ok: false, reason: "bluefolder_customer_lookup_base_url_invalid" };
    } catch {
      return { ok: false, reason: "bluefolder_customer_lookup_base_url_invalid" };
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(url.toString(), {
        method: "POST",
        redirect: "error",
        headers: {
          Authorization: `Basic ${Buffer.from(`${token}:x`).toString("base64")}`,
          "Content-Type": "text/xml",
          Accept: "text/xml, application/xml",
        },
        body: `<request><customerId>${xmlEscape(customerId)}</customerId></request>`,
        signal: controller.signal,
      });
      if (!response?.ok) {
        response?.body?.cancel?.().catch?.(() => {});
        return {
          ok: false,
          reason: Number(response?.status) === 429
            ? "bluefolder_customer_lookup_rate_limited"
            : "bluefolder_customer_lookup_http_failed",
        };
      }
      const rawText = await readBoundedText(response, maxResponseBytes);
      let parsed;
      try {
        parsed = await parseStringPromise(rawText, { explicitArray: false, trim: true });
      } catch {
        return { ok: false, reason: "bluefolder_customer_lookup_malformed_response" };
      }
      return normalizeVerifiedCustomerResponse(parsed, customerId, locationId, { nowMs: now() });
    } catch (error) {
      if (error?.lookupReason) return { ok: false, reason: error.lookupReason };
      if (error?.name === "AbortError") return { ok: false, reason: "bluefolder_customer_lookup_timeout" };
      return { ok: false, reason: "bluefolder_customer_lookup_unavailable" };
    } finally {
      clearTimeout(timer);
    }
  };

  const lookup = async (rawCustomerId, rawLocationId) => {
    const customerId = clean(rawCustomerId, 100);
    const locationId = clean(rawLocationId, 100);
    if (!customerId || !locationId) {
      return { ok: false, reason: "bluefolder_customer_lookup_identity_missing" };
    }
    const key = `${customerId}:${locationId}`;
    const cached = cache.get(key);
    if (cached && cached.expiresAt > now()) return cloneResult(cached.result);
    if (cached) cache.delete(key);
    if (inflight.has(key)) return cloneResult(await inflight.get(key));
    if (inflight.size >= maxCacheEntries) {
      return { ok: false, reason: "bluefolder_customer_lookup_busy" };
    }
    const pending = request(customerId, locationId).then((result) => {
      putCache(key, result);
      return result;
    }).finally(() => inflight.delete(key));
    inflight.set(key, pending);
    return cloneResult(await pending);
  };

  lookup.clearCache = () => {
    cache.clear();
    inflight.clear();
  };
  return lookup;
}

const getVerifiedBlueFolderLocation = createBlueFolderCustomerLookup();

module.exports = {
  DEFAULT_MAX_RESPONSE_BYTES,
  DEFAULT_TIMEOUT_MS,
  createBlueFolderCustomerLookup,
  getVerifiedBlueFolderLocation,
  normalizeVerifiedCustomerResponse,
  isVerifiedCustomerProof,
  getVerifiedCustomerEquipmentCatalog,
  hasRequiredSourceAddress,
};
