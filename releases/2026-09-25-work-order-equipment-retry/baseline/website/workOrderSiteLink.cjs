"use strict";

const { createHash } = require("node:crypto");
const { normalizeBlueFolderWorkOrderIdentity, resolveWorkOrderClientLink,
  buildWorkOrderClientLinkPatch, clean } = require("./workOrderClientLink.cjs");
const { blueFolderLocationAliasKey, clientAddressPatch } = require("./clientDirectory.cjs");

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

// This function only READS. The caller queues creation AFTER all transaction
// reads, so the new site and work-order link commit atomically. Never bind a
// nested location to its parent's HQ address, assets, or inventory history.
async function resolveWorkOrderSiteLinkInTransaction(transaction, db, payload, { linkedAtIso = "", allowCreate = true } = {}) {
  const identity = normalizeBlueFolderWorkOrderIdentity(payload);
  const result = (reason, patch = {}, creation = null) => ({ reason, patch, creation });
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
  if (!proofs.length) return result("bluefolder_nested_site_not_verified");
  if (new Set(proofs.map(proof => JSON.stringify(proof.location))).size !== 1) return result("bluefolder_nested_site_conflict");
  const { parent, location } = proofs.sort((a, b) => a.parent.id.localeCompare(b.parent.id))[0];
  if (!location.name || !location.addressStreet || !location.city) return result("bluefolder_nested_site_incomplete");
  const key = value => clean(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  for (const [provided, verified] of [
    [identity.customerLocationName, location.name], [identity.addressStreet, location.addressStreet],
    [identity.addressCity, location.city], [identity.addressState, location.state],
    [identity.addressPostalCode, location.postalCode], [identity.addressCountry, location.country],
  ]) {
    if (provided && verified && key(provided) !== key(verified)) return result("bluefolder_nested_site_payload_conflict");
  }
  const legacy = directory.docs.filter(doc => {
    const data = doc.data() || {};
    if (doc.id === parent.id) return false;
    return key(data.name || data.Name || data.clientName) === key(location.name) ||
      (key(data.address?.street || data.address?.addressStreet) === key(location.addressStreet) &&
       key(data.address?.city) === key(location.city));
  });
  if (legacy.length) return result("bluefolder_existing_site_needs_review");

  const verifiedLocation = location;
  for (let attempt = 0; attempt < 32; attempt++) {
    const ref = clients.doc(deterministicSiteClientId(identity.customerId, identity.customerLocationId, attempt));
    const existing = await transaction.get(ref);
    if (existing.exists) continue; // Never overwrite an unrelated AIS record.
    const data = {
      ...clientAddressPatch({ customerId: identity.customerId, customerName: identity.customerName || parent.data.name,
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

module.exports = { resolveWorkOrderSiteLinkInTransaction, deterministicSiteClientId };
