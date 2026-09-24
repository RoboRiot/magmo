"use strict";

const {
  matchBlueFolderCustomer,
  matchBlueFolderLocation,
} = require("./clientDirectory.cjs");
const {
  clientLocation,
  clientName,
} = require("./trailerClientLinks.cjs");

function clean(value, maxLength = 500) {
  if (Array.isArray(value)) return clean(value[0], maxLength);
  if (value && typeof value === "object") {
    return clean(value.text ?? value._ ?? "", maxLength);
  }
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function normalizeBlueFolderWorkOrderIdentity(value = {}) {
  const topLevel = value && typeof value === "object" ? value : {};
  const source =
    topLevel.blueFolder &&
    typeof topLevel.blueFolder === "object" &&
    !Array.isArray(topLevel.blueFolder)
      ? topLevel.blueFolder
      : topLevel;
  return {
    serviceRequestId: clean(
      source.serviceRequestId ||
        source.serviceRequestID ||
        topLevel.workOrderId ||
        topLevel.id,
      180
    ),
    customerId: clean(
      source.customerId ||
        source.customerID ||
        source.bluefolderCustomerId ||
        topLevel.bluefolder_customer_id,
      100
    ),
    customerName: clean(
      source.customerName ||
        source.bluefolderCustomerName ||
        topLevel.customerName ||
        topLevel.customer ||
        topLevel.bluefolder_customer_name,
      220
    ),
    customerLocationId: clean(
      source.customerLocationId ||
        source.customerLocationID ||
        source.locationId ||
        source.bluefolderLocationId ||
        topLevel.bluefolder_location_id,
      100
    ),
    customerLocationName: clean(
      source.customerLocationName ||
        source.locationName ||
        source.bluefolderLocationName ||
        topLevel.bluefolder_location_name,
      220
    ),
    addressStreet: clean(
      source.addressStreet || topLevel.bluefolder_address_street,
      250
    ),
    addressCity: clean(
      source.addressCity || topLevel.bluefolder_address_city,
      100
    ),
    addressState: clean(
      source.addressState || topLevel.bluefolder_address_state,
      100
    ),
    addressPostalCode: clean(
      source.addressPostalCode || topLevel.bluefolder_address_postal_code,
      30
    ),
    addressCountry: clean(
      source.addressCountry || topLevel.bluefolder_address_country,
      100
    ),
  };
}

function resolveWorkOrderClientLink(
  rawClients,
  rawIdentity,
  { allowCustomerFallback = false } = {}
) {
  const identity = normalizeBlueFolderWorkOrderIdentity(rawIdentity);
  if (identity.customerLocationId) {
    const result = matchBlueFolderLocation(
      rawClients,
      {
        customerId: identity.customerId,
        customerName: identity.customerName,
      },
      {
        customerLocationId: identity.customerLocationId,
        locationName: identity.customerLocationName,
        addressStreet: identity.addressStreet,
        addressCity: identity.addressCity,
        addressState: identity.addressState,
        addressPostalCode: identity.addressPostalCode,
        addressCountry: identity.addressCountry,
      },
      { allowNameMatch: false, allowCustomerFallback: false }
    );
    return { ...result, identity };
  }

  if (allowCustomerFallback && identity.customerId) {
    const result = matchBlueFolderCustomer(
      rawClients,
      {
        customerId: identity.customerId,
        customerName: identity.customerName,
      },
      { allowNameMatch: false }
    );
    return {
      ...result,
      reason: result.match
        ? `customer_fallback_${result.reason}`
        : result.reason,
      priority: 3,
      identity,
    };
  }

  return {
    match: null,
    reason: identity.customerId
      ? "bluefolder_location_id_missing"
      : "bluefolder_destination_identity_missing",
    priority: 4,
    ambiguous: [],
    identity,
  };
}

function buildWorkOrderClientLinkPatch(
  resolved,
  {
    clientRef = null,
    source = "bluefolder_work_order_import",
    linkedAtIso = "",
  } = {}
) {
  const match = resolved?.match;
  const identity = normalizeBlueFolderWorkOrderIdentity(
    resolved?.identity || {}
  );
  if (!match?.id) return {};
  const data = match.data || {};
  const patch = {
    clientId: clean(match.id, 180),
    clientName: clientName(data, match.id),
    clientLocation: clientLocation(data),
    bluefolderCustomerId: identity.customerId,
    bluefolderLocationId: identity.customerLocationId,
    bluefolderCustomerName: identity.customerName,
    bluefolderLocationName: identity.customerLocationName,
    clientLinkSource: clean(source, 120),
    clientLinkMatchReason: clean(resolved.reason, 120),
  };
  if (clientRef) patch.clientRef = clientRef;
  if (linkedAtIso) patch.clientLinkedAtIso = clean(linkedAtIso, 80);
  return patch;
}

module.exports = {
  buildWorkOrderClientLinkPatch,
  clean,
  normalizeBlueFolderWorkOrderIdentity,
  resolveWorkOrderClientLink,
};
