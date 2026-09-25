"use strict";

const { createHash } = require("node:crypto");
const { normalizeBlueFolderWorkOrderIdentity, resolveWorkOrderClientLink,
  buildWorkOrderClientLinkPatch, clean } = require("./workOrderClientLink.cjs");
const {
  blueFolderLocationAliasKey,
  clientAddressPatch,
  formatAddress,
  resolveClientAddress,
} = require("./clientDirectory.cjs");

const FRESH_SITE_ASSET_FIELDS = Object.freeze([
  "machineId", "machineRef", "machineName",
  "trailerId", "trailerRef", "trailerName",
]);

function unavailable(data = {}) {
  return Boolean(data.deletedAt || data.archivedAt || data.deleted === true || data.archived === true || data.bluefolderInactive === true);
}
function locationData(raw = {}) {
  const location = {
    bluefolderLocationId: clean(raw.bluefolderLocationId || raw.customerLocationId || raw.locationId || raw.id, 100),
    name: clean(raw.name || raw.locationName || raw.customerLocationName, 220),
    addressStreet: clean(raw.addressStreet || raw.street, 250),
    city: clean(raw.city || raw.addressCity, 100), state: clean(raw.state || raw.addressState, 100),
    postalCode: clean(raw.postalCode || raw.addressPostalCode, 30), country: clean(raw.country || raw.addressCountry, 100),
  };
  return location;
}
function deterministicSiteClientId(customerId, locationId, attempt = 0) {
  const digest = createHash("sha256").update(`magmo-bluefolder-site:${customerId}:${locationId}:${attempt}`).digest("hex");
  return `AIS${10000 + (parseInt(digest.slice(0, 8), 16) % 90000)}`;
}

function populated(value) {
  if (value === undefined || value === null) return false;
  if (typeof value === "string") return Boolean(value.trim());
  if (typeof value === "number" || typeof value === "boolean") return true;
  // Objects and arrays in typed association fields are references or malformed
  // values. Either way, the fresh-site fallback must not reinterpret them.
  return true;
}

function freshSiteLookupPreconditions(existing = {}, payload = {}) {
  const identity = normalizeBlueFolderWorkOrderIdentity(payload);
  const result = (eligible, reason) => ({ eligible, reason, identity });
  if (!identity.customerId || !identity.customerLocationId) {
    return result(false, "bluefolder_fresh_site_identity_missing");
  }
  if (["clientId", "clientRef"].some((field) => populated(existing?.[field]) || populated(payload?.[field]))) {
    return result(false, "bluefolder_fresh_site_existing_client");
  }
  if (FRESH_SITE_ASSET_FIELDS.some((field) => populated(existing?.[field]) || populated(payload?.[field]))) {
    return result(false, "bluefolder_fresh_site_existing_asset");
  }
  const storedCustomerIds = [existing.bluefolderCustomerId, existing.blueFolderCustomerId]
    .filter(populated).map((value) => clean(value, 100));
  const storedLocationIds = [existing.bluefolderLocationId, existing.blueFolderLocationId]
    .filter(populated).map((value) => clean(value, 100));
  if (new Set(storedCustomerIds).size > 1 || storedCustomerIds.some((value) => value !== identity.customerId)) {
    return result(false, "bluefolder_fresh_site_customer_identity_changed");
  }
  if (new Set(storedLocationIds).size > 1 || storedLocationIds.some((value) => value !== identity.customerLocationId)) {
    return result(false, "bluefolder_fresh_site_location_identity_changed");
  }
  return result(true, "bluefolder_fresh_site_lookup_eligible");
}

function topLevelCustomerRoot(row) {
  const data = row?.data || {};
  return !clean(data.bluefolderParentClientId || data.blueFolderParentClientId, 180) &&
    clean(data.bluefolderSiteSource, 120).toLowerCase() !== "verified_nested_location";
}

function comparisonKey(value) {
  return clean(value, 1000).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function validateFreshCustomerProof(rawProof, identity) {
  const fail = (reason) => ({ ok: false, reason });
  if (!rawProof || typeof rawProof !== "object" || Array.isArray(rawProof) ||
      rawProof.source !== "bluefolder_customers_get") {
    return fail("bluefolder_fresh_site_proof_missing");
  }
  if (rawProof.active !== true) return fail("bluefolder_fresh_site_customer_inactive");
  if (clean(rawProof.customerId, 100) !== identity.customerId) {
    return fail("bluefolder_fresh_site_customer_mismatch");
  }
  const location = locationData(rawProof.location);
  if (location.bluefolderLocationId !== identity.customerLocationId) {
    return fail("bluefolder_fresh_site_location_mismatch");
  }
  if (rawProof.location?.isPrimary !== false) {
    return fail("bluefolder_fresh_site_location_not_nonprimary");
  }
  if (!location.name || !location.addressStreet || !location.city || !location.state ||
      !location.postalCode) {
    return fail("bluefolder_fresh_site_location_incomplete");
  }
  const verifiedCustomerName = clean(rawProof.customerName, 220);
  for (const [provided, verified] of [
    [identity.customerName, verifiedCustomerName],
    [identity.customerLocationName, location.name],
    [identity.addressStreet, location.addressStreet],
    [identity.addressCity, location.city],
    [identity.addressState, location.state],
    [identity.addressPostalCode, location.postalCode],
    [identity.addressCountry, location.country],
  ]) {
    if (provided && (!verified || comparisonKey(provided) !== comparisonKey(verified))) {
      return fail("bluefolder_fresh_site_payload_conflict");
    }
  }
  return { ok: true, location, customerName: verifiedCustomerName };
}

function hasFreshPhysicalSiteConflict(directoryDocs, location) {
  const locationName = comparisonKey(location.name);
  const verifiedAddresses = new Set([
    location.formattedAddress,
    formatAddress(location),
    [location.addressStreet, location.city, location.state, location.postalCode, location.country]
      .filter(Boolean).join(", "),
    [location.addressStreet, location.city, location.state, location.postalCode]
      .filter(Boolean).join(", "),
  ].map(comparisonKey).filter(Boolean));
  return directoryDocs.some((doc) => {
    const data = doc.data() || {};
    const representedName = comparisonKey(data.name || data.Name || data.clientName);
    if (locationName && representedName === locationName) return true;
    const representedAddress = comparisonKey(resolveClientAddress(data));
    if (representedAddress && verifiedAddresses.has(representedAddress)) return true;
    const address = data.address && typeof data.address === "object" ? data.address : {};
    return comparisonKey(address.street || address.addressStreet) === comparisonKey(location.addressStreet) &&
      comparisonKey(address.city) === comparisonKey(location.city) &&
      Boolean(comparisonKey(location.addressStreet)) && Boolean(comparisonKey(location.city));
  });
}

// This function only READS. The caller queues creation AFTER all transaction
// reads, so the new site and work-order link commit atomically. Never bind a
// nested location to its parent's HQ address, assets, or inventory history.
async function resolveWorkOrderSiteLinkInTransaction(transaction, db, payload, {
  linkedAtIso = "",
  allowCreate = true,
  freshCustomerProof = null,
  assessFreshLookup = false,
} = {}) {
  const identity = normalizeBlueFolderWorkOrderIdentity(payload);
  const result = (reason, patch = {}, creation = null, freshLookupEligibility = null) => ({
    reason,
    patch,
    creation,
    ...(freshLookupEligibility ? { freshLookupEligibility } : {}),
  });
  if (!identity.customerLocationId) return result("bluefolder_location_id_missing");
  const clients = db.collection("Client");
  const queries = ["bluefolderLocationId", "blueFolderLocationId"].map(field => clients.where(field, "==", identity.customerLocationId).limit(3));
  const aliasKey = blueFolderLocationAliasKey(identity.customerId, identity.customerLocationId);
  if (aliasKey) queries.push(clients.where("bluefolderLocationAliasKeys", "array-contains", aliasKey).limit(3));
  const byId = new Map();
  for (const snap of await Promise.all(queries.map(q => transaction.get(q)))) {
    for (const doc of snap.docs) byId.set(doc.id, { id: doc.id, ref: doc.ref, data: doc.data() || {} });
  }
  const resolved = resolveWorkOrderClientLink([...byId.values()], identity);
  if (resolved.match) {
    if (unavailable(resolved.match.data)) return result("bluefolder_site_unavailable");
    const customerId = clean(resolved.match.data.bluefolderCustomerId || resolved.match.data.blueFolderCustomerId, 100);
    // An explicit reviewed alias may legitimately connect legacy customer IDs.
    if (customerId && identity.customerId && customerId !== identity.customerId && resolved.reason !== "bluefolder_location_alias") {
      return result("bluefolder_site_customer_mismatch");
    }
    return result(resolved.reason, buildWorkOrderClientLinkPatch(resolved, { clientRef: clients.doc(resolved.match.id), linkedAtIso }));
  }
  if (byId.size || resolved.ambiguous?.length) return result(resolved.reason);
  if (!allowCreate || !identity.customerId) return result("bluefolder_nested_site_not_verified");

  // A full bounded directory read also detects unlinked legacy site records;
  // don't silently create a duplicate of a manually maintained destination.
  const directory = await transaction.get(clients.limit(1001));
  if (directory.docs.length > 1000) return result("bluefolder_site_directory_review_required");
  const parents = directory.docs.map(doc => ({ id: doc.id, ref: doc.ref, data: doc.data() || {} }))
    .filter(row => !unavailable(row.data) && clean(row.data.bluefolderCustomerId || row.data.blueFolderCustomerId, 100) === identity.customerId);
  const proofs = [];
  for (const parent of parents) {
    for (const raw of Array.isArray(parent.data.bluefolderLocations) ? parent.data.bluefolderLocations : []) {
      const location = locationData(raw);
      if (location.bluefolderLocationId === identity.customerLocationId) proofs.push({ parent, location });
    }
  }
  const roots = parents.filter(topLevelCustomerRoot);
  let parent;
  let location;
  let proofCustomerName = "";
  let usedFreshProof = false;
  if (!proofs.length) {
    const eligibility = roots.length === 1
      ? { eligible: true, reason: "bluefolder_nested_site_not_verified" }
      : {
          eligible: false,
          reason: roots.length
            ? "bluefolder_fresh_site_customer_root_ambiguous"
            : "bluefolder_fresh_site_customer_root_missing",
        };
    if (!freshCustomerProof) {
      return result(
        "bluefolder_nested_site_not_verified",
        {},
        null,
        assessFreshLookup ? eligibility : null
      );
    }
    if (!eligibility.eligible) return result(eligibility.reason);
    const verified = validateFreshCustomerProof(freshCustomerProof, identity);
    if (!verified.ok) return result(verified.reason);
    parent = roots[0];
    location = verified.location;
    proofCustomerName = verified.customerName;
    usedFreshProof = true;
  } else {
    if (new Set(proofs.map(proof => JSON.stringify(proof.location))).size !== 1) {
      return result("bluefolder_nested_site_conflict");
    }
    ({ parent, location } = proofs.sort((a, b) => a.parent.id.localeCompare(b.parent.id))[0]);
    if (!location.name || !location.addressStreet || !location.city) {
      return result("bluefolder_nested_site_incomplete");
    }
    for (const [provided, verified] of [
      [identity.customerLocationName, location.name], [identity.addressStreet, location.addressStreet],
      [identity.addressCity, location.city], [identity.addressState, location.state],
      [identity.addressPostalCode, location.postalCode], [identity.addressCountry, location.country],
    ]) {
      if (provided && verified && comparisonKey(provided) !== comparisonKey(verified)) {
        return result("bluefolder_nested_site_payload_conflict");
      }
    }
  }

  if (usedFreshProof) {
    if (hasFreshPhysicalSiteConflict(directory.docs, location)) {
      return result("bluefolder_existing_site_needs_review");
    }
  } else {
    const legacy = directory.docs.filter(doc => {
      const data = doc.data() || {};
      if (doc.id === parent.id) return false;
      return comparisonKey(data.name || data.Name || data.clientName) === comparisonKey(location.name) ||
        (comparisonKey(data.address?.street || data.address?.addressStreet) === comparisonKey(location.addressStreet) &&
         comparisonKey(data.address?.city) === comparisonKey(location.city));
    });
    if (legacy.length) return result("bluefolder_existing_site_needs_review");
  }

  const verifiedLocation = location;
  for (let attempt = 0; attempt < 32; attempt++) {
    const ref = clients.doc(deterministicSiteClientId(identity.customerId, identity.customerLocationId, attempt));
    const existing = await transaction.get(ref);
    if (existing.exists) continue; // Never overwrite an unrelated AIS record.
    const data = {
      ...clientAddressPatch({ customerId: identity.customerId,
        customerName: proofCustomerName || identity.customerName || parent.data.name,
        locations: [verifiedLocation] }, { location: verifiedLocation, current: {}, overwriteLocation: true }),
      name: verifiedLocation.name, machines: [],
      bluefolderLocationAliasKeys: [aliasKey],
      bluefolderParentClientId: parent.id,
      createdBy: "Magmo BlueFolder site sync", createdAt: linkedAtIso,
      bluefolderSiteCreatedAtIso: linkedAtIso,
      bluefolderSiteSource: "verified_nested_location", bluefolderSiteWorkOrderId: identity.serviceRequestId,
    };
    const match = { id: ref.id, ref, data };
    const patch = buildWorkOrderClientLinkPatch({ match, identity, reason: "bluefolder_verified_nested_site" }, { clientRef: ref, linkedAtIso });
    return result("bluefolder_verified_nested_site", patch, { ref, data });
  }
  return result("bluefolder_site_id_allocation_exhausted");
}

async function assessFreshSiteLookupInTransaction(transaction, db, existing, payload) {
  const preconditions = freshSiteLookupPreconditions(existing, payload);
  if (!preconditions.eligible) return preconditions;
  const siteLink = await resolveWorkOrderSiteLinkInTransaction(
    transaction,
    db,
    payload,
    { allowCreate: true, assessFreshLookup: true }
  );
  if (siteLink.reason !== "bluefolder_nested_site_not_verified") {
    return { eligible: false, reason: siteLink.reason, identity: preconditions.identity };
  }
  return {
    eligible: siteLink.freshLookupEligibility?.eligible === true,
    reason: siteLink.freshLookupEligibility?.reason || "bluefolder_fresh_site_not_eligible",
    identity: preconditions.identity,
  };
}

module.exports = {
  assessFreshSiteLookupInTransaction,
  deterministicSiteClientId,
  freshSiteLookupPreconditions,
  resolveWorkOrderSiteLinkInTransaction,
  validateFreshCustomerProof,
};
