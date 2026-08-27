function clean(value, maxLength = 500) {
  if (Array.isArray(value)) return clean(value[0], maxLength);
  if (value && typeof value === "object") {
    return clean(value.text ?? value._ ?? "", maxLength);
  }
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function normalizeKey(value) {
  return clean(value, 240)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function booleanValue(value) {
  return ["1", "true", "yes", "y"].includes(clean(value, 20).toLowerCase());
}

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function locationRows(customer = {}) {
  const locations = customer.locations;
  if (Array.isArray(locations)) return locations;
  if (locations && typeof locations === "object") {
    return asArray(locations.location || locations.locations);
  }
  return asArray(customer.location || customer.primaryLocation).filter(
    (entry) => entry && typeof entry === "object"
  );
}

function formatAddress(location = {}) {
  const street = clean(
    location.addressStreet ||
      location.streetAddress ||
      location.street ||
      location.addressLine1,
    250
  );
  const city = clean(location.addressCity || location.city, 100);
  const state = clean(location.addressState || location.state || location.region, 100);
  const postalCode = clean(
    location.addressPostalCode || location.postalCode || location.zipCode || location.zip,
    30
  );
  const country = clean(location.addressCountry || location.country, 100);
  const cityLine = [city, state].filter(Boolean).join(", ");
  const locality = [cityLine, postalCode].filter(Boolean).join(" ");
  return [street, locality, country].filter(Boolean).join(", ");
}

function normalizeLocation(location = {}) {
  const normalized = {
    bluefolderLocationId: clean(
      location.bluefolderLocationId ||
        location.customerLocationId ||
        location.locationId ||
        location.id,
      100
    ),
    name: clean(location.locationName || location.name, 160),
    addressStreet: clean(
      location.addressStreet || location.streetAddress || location.street,
      250
    ),
    city: clean(location.addressCity || location.city, 100),
    state: clean(location.addressState || location.state || location.region, 100),
    postalCode: clean(
      location.addressPostalCode || location.postalCode || location.zipCode,
      30
    ),
    country: clean(location.addressCountry || location.country, 100),
    isPrimary: booleanValue(location.isPrimary),
  };
  normalized.formattedAddress =
    clean(location.formattedAddress || location.formatted, 500) ||
    formatAddress(normalized);
  return normalized;
}

function normalizeBlueFolderCustomer(customer = {}) {
  const locations = locationRows(customer)
    .map(normalizeLocation)
    .filter(
      (location) =>
        location.bluefolderLocationId || location.name || location.formattedAddress
    );
  const primaryLocation =
    locations.find((location) => location.isPrimary) || locations[0] || null;
  return {
    bluefolderCustomerId: clean(customer.customerId || customer.id, 100),
    externalId: clean(customer.externalId, 180),
    name: clean(customer.customerName || customer.name, 220),
    inactive: booleanValue(customer.inactive),
    locations,
    primaryLocation,
  };
}

function magmoClient(snapshot) {
  const data = typeof snapshot?.data === "function" ? snapshot.data() || {} : snapshot?.data || snapshot || {};
  return {
    id: clean(snapshot?.id || data.id, 180),
    name: clean(data.name || data.Name || data.clientName || data.companyName, 220),
    bluefolderCustomerId: clean(
      data.bluefolderCustomerId || data.blueFolderCustomerId,
      100
    ),
    bluefolderLocationId: clean(
      data.bluefolderLocationId || data.blueFolderLocationId,
      100
    ),
    externalId: clean(
      data.bluefolderExternalId || data.blueFolderExternalId || data.externalId,
      180
    ),
    data,
  };
}

function exactMatches(clients, predicate) {
  return clients.filter(predicate);
}

function matchBlueFolderCustomer(rawClients, customer, { allowNameMatch = true } = {}) {
  const clients = rawClients.map(magmoClient);
  const bluefolder = normalizeBlueFolderCustomer(customer);
  if (!bluefolder.bluefolderCustomerId && !bluefolder.externalId && !bluefolder.name) {
    return { match: null, reason: "invalid_bluefolder_customer", ambiguous: [] };
  }

  if (bluefolder.bluefolderCustomerId) {
    const byCustomerId = exactMatches(
      clients,
      (client) => client.bluefolderCustomerId === bluefolder.bluefolderCustomerId
    );
    if (byCustomerId.length === 1) {
      return { match: byCustomerId[0], reason: "bluefolder_customer_id", ambiguous: [] };
    }
    if (byCustomerId.length > 1) {
      return { match: null, reason: "duplicate_bluefolder_customer_id", ambiguous: byCustomerId };
    }
  }

  if (bluefolder.externalId) {
    const externalKey = normalizeKey(bluefolder.externalId);
    const byExternalId = exactMatches(
      clients,
      (client) =>
        normalizeKey(client.externalId) === externalKey || normalizeKey(client.id) === externalKey
    );
    if (byExternalId.length === 1) {
      return { match: byExternalId[0], reason: "bluefolder_external_id", ambiguous: [] };
    }
    if (byExternalId.length > 1) {
      return { match: null, reason: "duplicate_bluefolder_external_id", ambiguous: byExternalId };
    }
  }

  if (allowNameMatch && bluefolder.name) {
    const nameKey = normalizeKey(bluefolder.name);
    const byName = exactMatches(clients, (client) => normalizeKey(client.name) === nameKey);
    if (byName.length === 1) {
      return { match: byName[0], reason: "unique_exact_name", ambiguous: [] };
    }
    if (byName.length > 1) {
      return { match: null, reason: "duplicate_exact_name", ambiguous: byName };
    }
  }

  return { match: null, reason: "no_safe_match", ambiguous: [] };
}

function matchBlueFolderLocation(
  rawClients,
  customer,
  location,
  { allowNameMatch = true, allowCustomerFallback = true } = {}
) {
  const clients = rawClients.map(magmoClient);
  const bluefolder = normalizeBlueFolderCustomer(customer);
  const normalizedLocation = location ? normalizeLocation(location) : null;

  if (normalizedLocation?.bluefolderLocationId) {
    const byLocationId = exactMatches(
      clients,
      (client) =>
        client.bluefolderLocationId === normalizedLocation.bluefolderLocationId
    );
    if (byLocationId.length === 1) {
      return {
        match: byLocationId[0],
        reason: "bluefolder_location_id",
        priority: 1,
        ambiguous: [],
      };
    }
    if (byLocationId.length > 1) {
      return {
        match: null,
        reason: "duplicate_bluefolder_location_id",
        priority: 1,
        ambiguous: byLocationId,
      };
    }
  }

  if (allowNameMatch && normalizedLocation?.name) {
    const locationNameKey = normalizeKey(normalizedLocation.name);
    const byLocationName = exactMatches(
      clients,
      (client) => normalizeKey(client.name) === locationNameKey
    );
    if (byLocationName.length === 1) {
      return {
        match: byLocationName[0],
        reason: "unique_exact_location_name",
        priority: 2,
        ambiguous: [],
      };
    }
    if (byLocationName.length > 1) {
      return {
        match: null,
        reason: "duplicate_exact_location_name",
        priority: 2,
        ambiguous: byLocationName,
      };
    }
  }

  if (!allowCustomerFallback) {
    return {
      match: null,
      reason: "no_safe_match",
      priority: 3,
      ambiguous: [],
      bluefolder,
    };
  }
  const customerMatch = matchBlueFolderCustomer(rawClients, customer, {
    allowNameMatch,
  });
  return {
    ...customerMatch,
    reason: customerMatch.match
      ? `customer_fallback_${customerMatch.reason}`
      : customerMatch.reason,
    priority: 3,
    bluefolder,
  };
}

function blueFolderLocationRecords(customer) {
  const bluefolder = normalizeBlueFolderCustomer(customer);
  const locations = bluefolder.locations.length ? bluefolder.locations : [null];
  return locations.map((location, locationIndex) => ({
    rawCustomer: customer,
    bluefolder,
    location,
    locationIndex,
    key: [
      bluefolder.bluefolderCustomerId || bluefolder.externalId || bluefolder.name,
      location?.bluefolderLocationId || location?.name || `location-${locationIndex}`,
    ].join("::"),
  }));
}

function publicCandidates(entries = []) {
  return entries.map((entry) => ({ id: entry.id, name: entry.name }));
}

function planBlueFolderLocationMatches(
  rawClients,
  rawCustomers,
  { allowNameMatch = true } = {}
) {
  const records = rawCustomers.flatMap(blueFolderLocationRecords);
  const proposals = [];
  const unmatched = [];
  const ambiguous = [];

  records.forEach((record) => {
    const result = matchBlueFolderLocation(
      rawClients,
      record.rawCustomer,
      record.location,
      {
        allowNameMatch,
        allowCustomerFallback: record.bluefolder.locations.length === 1,
      }
    );
    const resultRecord = { ...record, ...result };
    if (result.match) proposals.push(resultRecord);
    else if (result.ambiguous?.length) ambiguous.push(resultRecord);
    else unmatched.push(resultRecord);
  });

  const proposalsByMagmoClient = new Map();
  proposals.forEach((proposal) => {
    if (!proposalsByMagmoClient.has(proposal.match.id)) {
      proposalsByMagmoClient.set(proposal.match.id, []);
    }
    proposalsByMagmoClient.get(proposal.match.id).push(proposal);
  });

  const matches = [];
  proposalsByMagmoClient.forEach((clientProposals) => {
    const bestPriority = Math.min(
      ...clientProposals.map((proposal) => proposal.priority)
    );
    const strongest = clientProposals.filter(
      (proposal) => proposal.priority === bestPriority
    );
    if (strongest.length === 1) {
      matches.push(strongest[0]);
      clientProposals
        .filter((proposal) => proposal !== strongest[0])
        .forEach((proposal) => {
          ambiguous.push({
            ...proposal,
            match: null,
            reason: "magmo_client_claimed_by_stronger_location_match",
            ambiguous: [strongest[0].match],
          });
        });
      return;
    }
    clientProposals.forEach((proposal) => {
      ambiguous.push({
        ...proposal,
        match: null,
        reason: "multiple_bluefolder_locations_match_one_magmo_client",
        ambiguous: publicCandidates(strongest.map((entry) => entry.match)),
      });
    });
  });

  return { records, matches, unmatched, ambiguous };
}

function clientAddressPatch(
  customer,
  { location = null, overwriteLocation = false, current = {} } = {}
) {
  const bluefolder = normalizeBlueFolderCustomer(customer);
  const primary = bluefolder.primaryLocation;
  const matchedLocation = location ? normalizeLocation(location) : primary;
  const patch = {
    bluefolderCustomerId: bluefolder.bluefolderCustomerId,
    bluefolderExternalId: bluefolder.externalId,
    bluefolderLocationId: matchedLocation?.bluefolderLocationId || "",
    bluefolderLocationName: matchedLocation?.name || "",
    bluefolderInactive: bluefolder.inactive,
    bluefolderLocations: bluefolder.locations,
    bluefolderPrimaryLocation: primary,
    bluefolderMatchedLocation: matchedLocation,
    addressSource: "bluefolder",
  };
  if (matchedLocation?.formattedAddress) {
    const currentAddress = resolveClientAddress({ address: current.address });
    const currentAddressIsBlueFolder =
      clean(current.addressSource, 40).toLowerCase() === "bluefolder";
    if (overwriteLocation || currentAddressIsBlueFolder || !currentAddress) {
      patch.address = {
        street: matchedLocation.addressStreet,
        city: matchedLocation.city,
        state: matchedLocation.state,
        postalCode: matchedLocation.postalCode,
        country: matchedLocation.country,
        formatted: matchedLocation.formattedAddress,
      };
    }
    const currentLocation = clean(
      current.location || current.local || current.Location,
      500
    );
    if (overwriteLocation || currentAddressIsBlueFolder || !currentLocation) {
      patch.location = matchedLocation.formattedAddress;
    }
  }
  return patch;
}

function resolveClientAddress(data = {}) {
  const matched = data.bluefolderMatchedLocation || {};
  const fromMatched =
    clean(matched.formattedAddress, 500) || formatAddress(matched);
  if (fromMatched) return fromMatched;
  const address = data.address;
  if (typeof address === "string") return clean(address, 500);
  const fromAddress = address && typeof address === "object"
    ? clean(address.formatted, 500) || formatAddress(address)
    : "";
  if (fromAddress) return fromAddress;
  const primary = data.bluefolderPrimaryLocation || data.primaryLocation || {};
  const fromPrimary = clean(primary.formattedAddress, 500) || formatAddress(primary);
  if (fromPrimary) return fromPrimary;
  return clean(data.location || data.local || data.Location, 500);
}

module.exports = {
  blueFolderLocationRecords,
  clientAddressPatch,
  formatAddress,
  matchBlueFolderCustomer,
  matchBlueFolderLocation,
  normalizeBlueFolderCustomer,
  normalizeLocation,
  normalizeKey,
  planBlueFolderLocationMatches,
  resolveClientAddress,
};
