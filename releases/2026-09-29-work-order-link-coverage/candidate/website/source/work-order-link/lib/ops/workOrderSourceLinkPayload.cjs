"use strict";
const own = (value, key) => Object.prototype.hasOwnProperty.call(value || {}, key);

// Shared read-only detail projection. The extractor is injected by the server
// callers so this contract cannot import workOrders and form a hydration cycle.
function createSourceLinkPayload(extractWorkOrderFields) {
  return function sourceLinkPayload(id, raw, settings) {
    const source = extractWorkOrderFields(raw, settings);
    if (String(source.id) !== id) throw Object.assign(new Error("Source work-order identity mismatch"), { code: "bluefolder_identity_conflict" });
    const blueFolder = { serviceRequestId: id };
    for (const key of ["customerId", "customerLocationId", "customerLocationName", "addressStreet", "addressCity", "addressState", "addressPostalCode", "addressCountry"]) {
      if (source[key] !== undefined && source[key] !== null && String(source[key]).trim()) blueFolder[key] = source[key];
    }
    if (source.customer) blueFolder.customerName = source.customer;
    const equipmentKeys = ["equipmenttoservice", "equipmentitems", "equipmentitem", "equipmentid", "equipment_id"];
    const presentKeys = Object.keys(raw || {}).filter(key => equipmentKeys.includes(key.toLowerCase()));
    if (presentKeys.length || own(raw, "equipmentIds")) {
      let ids = source.equipmentIds, names = source.equipmentNames;
      if (own(raw, "equipmentIds")) {
        if (!Array.isArray(raw.equipmentIds) || raw.equipmentIds.some(id => typeof id !== "string" || !id.trim() || id.length > 220)) {
          throw Object.assign(new Error("Invalid source equipment array"), { code: "bluefolder_equipment_identity_invalid" });
        }
        const direct = [...new Set(raw.equipmentIds.map(id => id.trim()))];
        if (presentKeys.length && JSON.stringify([...direct].sort()) !== JSON.stringify([...ids].sort())) {
          throw Object.assign(new Error("Conflicting source equipment representations"), { code: "bluefolder_equipment_identity_conflict" });
        }
        ids = direct;
      }
      if (!ids.length && presentKeys.some(key => {
        const value = raw[key];
        return value != null && value !== "" && !(Array.isArray(value) && !value.length) &&
          !(typeof value === "object" && !Array.isArray(value) && !Object.keys(value).length);
      })) throw Object.assign(new Error("Unknown nonempty equipment representation"), { code: "bluefolder_equipment_identity_invalid" });
      blueFolder.equipmentIds = ids;
      blueFolder.equipmentNames = names;
    }
    return { eventType: "work_order.imported", workOrderId: id, existingOnly: true, blueFolder };
  };
}
module.exports = { createSourceLinkPayload };
