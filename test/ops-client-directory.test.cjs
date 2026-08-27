const assert = require("node:assert/strict");
const test = require("node:test");

const {
  clientAddressPatch,
  matchBlueFolderCustomer,
  matchBlueFolderLocation,
  normalizeBlueFolderCustomer,
  planBlueFolderLocationMatches,
  resolveClientAddress,
} = require("../lib/ops/clientDirectory.cjs");

const blueFolderCustomer = {
  customerId: "12345",
  externalId: "AIS90001",
  customerName: "Prohealth North Hollywood",
  locations: {
    location: [
      {
        locationId: "88",
        locationName: "Main",
        addressStreet: "123 Main St",
        addressCity: "North Hollywood",
        addressState: "CA",
        addressPostalCode: "91601",
        addressCountry: "US",
        isPrimary: "true",
      },
    ],
  },
};

test("normalizes the BlueFolder primary customer address", () => {
  const result = normalizeBlueFolderCustomer(blueFolderCustomer);
  assert.equal(result.bluefolderCustomerId, "12345");
  assert.equal(result.primaryLocation.bluefolderLocationId, "88");
  assert.equal(
    result.primaryLocation.formattedAddress,
    "123 Main St, North Hollywood, CA 91601, US"
  );
});

test("recognizes BlueFolder's documented customerLocationId field", () => {
  const result = normalizeBlueFolderCustomer({
    customerId: "12345",
    customerName: "Prohealth",
    locations: {
      location: {
        customerLocationId: "location-900",
        locationName: "Prohealth Tarzana",
        addressStreet: "1 Tarzana Ave",
      },
    },
  });
  assert.equal(result.locations[0].bluefolderLocationId, "location-900");
});

test("matches a stored BlueFolder location ID before the location name", () => {
  const location = normalizeBlueFolderCustomer(blueFolderCustomer).locations[0];
  const result = matchBlueFolderLocation(
    [
      { id: "AIS1", data: { name: "Different name", bluefolderLocationId: "88" } },
      { id: "AIS2", data: { name: "Main" } },
    ],
    blueFolderCustomer,
    location
  );
  assert.equal(result.match.id, "AIS1");
  assert.equal(result.reason, "bluefolder_location_id");
  assert.equal(result.priority, 1);
});

test("matches a unique exact BlueFolder location name to the Magmo site name", () => {
  const location = normalizeBlueFolderCustomer(blueFolderCustomer).locations[0];
  const result = matchBlueFolderLocation(
    [
      { id: "AIS1", data: { name: "Main" } },
      { id: "AIS2", data: { name: "Another Site" } },
    ],
    blueFolderCustomer,
    location
  );
  assert.equal(result.match.id, "AIS1");
  assert.equal(result.reason, "unique_exact_location_name");
  assert.equal(result.priority, 2);
});

test("uses customer-level matching only after location matching fails", () => {
  const location = normalizeBlueFolderCustomer(blueFolderCustomer).locations[0];
  const result = matchBlueFolderLocation(
    [
      {
        id: "AIS1",
        data: {
          name: "Prohealth North Hollywood",
          bluefolderCustomerId: "12345",
        },
      },
    ],
    blueFolderCustomer,
    { ...location, bluefolderLocationId: "missing", name: "Missing Site" }
  );
  assert.equal(result.match.id, "AIS1");
  assert.equal(result.reason, "customer_fallback_bluefolder_customer_id");
  assert.equal(result.priority, 3);
});

test("does not use one customer-level match for multiple distinct service locations", () => {
  const customer = {
    ...blueFolderCustomer,
    locations: {
      location: [
        blueFolderCustomer.locations.location[0],
        {
          locationId: "99",
          locationName: "West Hills",
          addressStreet: "7300 Medical Center Dr",
        },
      ],
    },
  };
  const plan = planBlueFolderLocationMatches(
    [
      {
        id: "AIS1",
        data: {
          name: "Prohealth North Hollywood",
          bluefolderCustomerId: "12345",
        },
      },
    ],
    [customer]
  );
  assert.equal(plan.matches.length, 0);
  assert.equal(plan.unmatched.length, 2);
});

test("a stronger stored location ID prevents another BlueFolder location overwriting that client", () => {
  const customers = [
    blueFolderCustomer,
    {
      customerId: "67890",
      customerName: "Another Parent",
      locations: {
        location: {
          customerLocationId: "99",
          locationName: "Different name",
          addressStreet: "9 Other St",
        },
      },
    },
  ];
  const plan = planBlueFolderLocationMatches(
    [{ id: "AIS1", data: { name: "Different name", bluefolderLocationId: "88" } }],
    customers
  );
  assert.equal(plan.matches.length, 1);
  assert.equal(plan.matches[0].location.bluefolderLocationId, "88");
  assert.equal(plan.ambiguous.length, 1);
  assert.equal(
    plan.ambiguous[0].reason,
    "magmo_client_claimed_by_stronger_location_match"
  );
});

test("does not select either location when equal-confidence locations target one Magmo client", () => {
  const customer = {
    customerId: "12345",
    customerName: "Parent",
    locations: {
      location: [
        { locationId: "1", locationName: "Same Site", addressStreet: "1 A St" },
        { locationId: "2", locationName: "Same Site", addressStreet: "2 B St" },
      ],
    },
  };
  const plan = planBlueFolderLocationMatches(
    [{ id: "AIS1", data: { name: "Same Site" } }],
    [customer]
  );
  assert.equal(plan.matches.length, 0);
  assert.equal(plan.ambiguous.length, 2);
});

test("matches an explicit BlueFolder customer ID before a name", () => {
  const result = matchBlueFolderCustomer(
    [
      {
        id: "AIS1",
        data: { name: "Wrong name", bluefolderCustomerId: "12345" },
      },
      {
        id: "AIS2",
        data: { name: "Prohealth North Hollywood" },
      },
    ],
    blueFolderCustomer
  );
  assert.equal(result.match.id, "AIS1");
  assert.equal(result.reason, "bluefolder_customer_id");
});

test("does not guess when multiple Magmo clients have the same name", () => {
  const result = matchBlueFolderCustomer(
    [
      { id: "AIS1", data: { name: "Prohealth North Hollywood" } },
      { id: "AIS2", data: { name: "Prohealth North Hollywood" } },
    ],
    { ...blueFolderCustomer, customerId: "", externalId: "" }
  );
  assert.equal(result.match, null);
  assert.equal(result.reason, "duplicate_exact_name");
  assert.equal(result.ambiguous.length, 2);
});

test("stores structured BlueFolder address without replacing a legacy location by default", () => {
  const patch = clientAddressPatch(blueFolderCustomer, {
    current: { location: "North Hollywood" },
  });
  assert.equal(patch.location, undefined);
  assert.equal(patch.address.postalCode, "91601");
  assert.equal(patch.bluefolderPrimaryLocation.formattedAddress.includes("123 Main St"), true);
});

test("does not replace an existing structured Magmo address without explicit overwrite", () => {
  const patch = clientAddressPatch(blueFolderCustomer, {
    current: {
      location: "North Hollywood",
      address: { formatted: "Existing verified address" },
    },
  });
  assert.equal(patch.location, undefined);
  assert.equal(patch.address, undefined);
  assert.equal(
    patch.bluefolderMatchedLocation.formattedAddress,
    "123 Main St, North Hollywood, CA 91601, US"
  );
});

test("upgrades a previously synced customer address to an exact BlueFolder site address", () => {
  const customer = {
    ...blueFolderCustomer,
    locations: {
      location: [
        blueFolderCustomer.locations.location[0],
        {
          locationId: "99",
          locationName: "West Hills",
          addressStreet: "7300 Medical Center Dr",
          addressCity: "West Hills",
          addressState: "CA",
          addressPostalCode: "91307",
        },
      ],
    },
  };
  const selected = normalizeBlueFolderCustomer(customer).locations[1];
  const patch = clientAddressPatch(customer, {
    location: selected,
    current: {
      addressSource: "bluefolder",
      address: { formatted: "123 Main St, North Hollywood, CA 91601, US" },
      location: "123 Main St, North Hollywood, CA 91601, US",
    },
  });
  assert.equal(patch.address.formatted, "7300 Medical Center Dr, West Hills, CA 91307");
  assert.equal(patch.location, "7300 Medical Center Dr, West Hills, CA 91307");
});

test("resolves the structured BlueFolder address before a legacy location", () => {
  const patch = clientAddressPatch(blueFolderCustomer, {
    current: { location: "North Hollywood" },
  });
  assert.equal(
    resolveClientAddress({ ...patch, location: "North Hollywood" }),
    "123 Main St, North Hollywood, CA 91601, US"
  );
});

test("stores the exact selected non-primary location and its parent customer ID", () => {
  const customer = {
    ...blueFolderCustomer,
    locations: {
      location: [
        blueFolderCustomer.locations.location[0],
        {
          customerLocationId: "99",
          locationName: "West Hills",
          addressStreet: "99 West Hills Rd",
          addressCity: "West Hills",
          addressState: "CA",
          addressPostalCode: "91307",
          addressCountry: "US",
          isPrimary: "false",
        },
      ],
    },
  };
  const selected = normalizeBlueFolderCustomer(customer).locations[1];
  const patch = clientAddressPatch(customer, {
    location: selected,
    current: { location: "West Hills" },
  });
  assert.equal(patch.bluefolderCustomerId, "12345");
  assert.equal(patch.bluefolderLocationId, "99");
  assert.equal(patch.bluefolderLocationName, "West Hills");
  assert.equal(patch.address.formatted, "99 West Hills Rd, West Hills, CA 91307, US");
  assert.equal(resolveClientAddress(patch), patch.address.formatted);
});
