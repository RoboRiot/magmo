"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const {
  resolveWorkOrderSiteLinkInTransaction,
  deterministicSiteClientId,
} = require("../lib/ops/workOrderSiteLink.cjs");

const WHEN = "2026-09-24T19:00:00.000Z";
const CUSTOMER = "12345";
const LOCATION = "67890";
const SITE_ADDRESS = "635 Camino de los Mares, suites 101–102, San Clemente, CA 92673";
const nestedSite = {
  bluefolderLocationId: LOCATION,
  name: "SimonMed San Clemente",
  addressStreet: "635 Camino de los Mares, suites 101–102",
  city: "San Clemente",
  state: "CA",
  postalCode: "92673",
  formattedAddress: SITE_ADDRESS,
  isPrimary: false,
};
const parent = {
  name: "SimonMed Imaging",
  location: "6900 E Camelback Road, Scottsdale, AZ 85251",
  bluefolderCustomerId: CUSTOMER,
  bluefolderLocationId: "HQ-LOCATION",
  bluefolderLocations: [nestedSite],
  machines: ["Machine/HQ-MACHINE"],
};
const payload = {
  eventType: "work_order.imported",
  workOrderId: "10673",
  blueFolder: {
    serviceRequestId: "10673",
    customerId: CUSTOMER,
    customerName: "SimonMed Imaging",
    customerLocationId: LOCATION,
    customerLocationName: nestedSite.name,
    addressStreet: nestedSite.addressStreet,
    addressCity: nestedSite.city,
    addressState: nestedSite.state,
    addressPostalCode: nestedSite.postalCode,
  },
};
const freshProof = {
  source: "bluefolder_customers_get",
  customerId: CUSTOMER,
  customerName: "SimonMed Imaging",
  active: true,
  location: { ...nestedSite, isPrimary: false },
};

// The resolver may issue multiple narrow Firestore queries, but it must never
// mutate a document before the importer has completed its remaining reads.
function repository(initial = {}) {
  const rows = new Map(Object.entries(initial));
  const reads = [];
  const equal = (left, right) => left?.path && right?.path
    ? left.path === right.path : left === right;
  const doc = (path) => ({ path, id: path.split("/").at(-1) });
  const snapshot = (path) => ({ ...doc(path), ref: doc(path), exists: rows.has(path),
    data: () => rows.get(path) });
  const valueAt = (data, field) => String(field).split(".").reduce((value, key) => value?.[key], data);
  const query = (collection, filters = [], max = Infinity) => ({
    collection, filters, max,
    where: (field, operator, value) => query(collection, [...filters, { field, operator, value }], max),
    limit: (limit) => query(collection, filters, limit),
    doc: (id) => doc(`${collection}/${id}`),
  });
  const db = { collection: (name) => query(name), doc };
  const get = async (target) => {
    reads.push(target.path || `${target.collection}:query`);
    if (target.path) return snapshot(target.path);
    const docs = [...rows].filter(([path, data]) => {
      if (path.split("/").length !== 2 || !path.startsWith(`${target.collection}/`)) return false;
      return target.filters.every(({ field, operator, value }) => {
        const actual = valueAt(data, field);
        if (operator === "==") return equal(actual, value);
        if (operator === "array-contains") return Array.isArray(actual) && actual.some((entry) => equal(entry, value));
        if (operator === "in") return value.some((entry) => equal(actual, entry));
        throw new Error(`Unsupported fake query operator ${operator}`);
      });
    }).slice(0, target.max).map(([path]) => snapshot(path));
    return { docs, empty: !docs.length, size: docs.length, forEach: (callback) => docs.forEach(callback) };
  };
  const transaction = {
    get,
    getAll: (...refs) => Promise.all(refs.map(get)),
    set: () => assert.fail("Site resolver must queue creation, not write within its read phase"),
    create: () => assert.fail("Site resolver must queue creation, not write within its read phase"),
    update: () => assert.fail("Site resolver must not update existing records"),
    delete: () => assert.fail("Site resolver must not delete existing records"),
  };
  return { rows, reads, db, transaction,
    resolve: (input = payload, options = {}) => resolveWorkOrderSiteLinkInTransaction(
      transaction, db, input, { linkedAtIso: WHEN, ...options }),
  };
}

function assertUnlinked(result) {
  assert.equal(Boolean(result.patch?.clientId), false);
  assert.equal(result.creation ?? null, null);
  assert.ok(result.reason, "Unsafe/missing identity should have a diagnostic reason");
}

test("materializes verified nested BlueFolder site instead of linking its parent headquarters", async () => {
  const repo = repository({ "Client/AIS100": parent });
  const before = JSON.stringify([...repo.rows]);
  const result = await repo.resolve();
  assert.match(result.patch.clientId, /^AIS\d+$/);
  assert.notEqual(result.patch.clientId, "AIS100");
  assert.equal(result.creation.ref.path, `Client/${result.patch.clientId}`);
  assert.equal(result.patch.clientRef.path, result.creation.ref.path);
  assert.equal(result.patch.bluefolderCustomerId, CUSTOMER);
  assert.equal(result.patch.bluefolderLocationId, LOCATION);
  assert.equal(result.creation.data.bluefolderCustomerId, CUSTOMER);
  assert.equal(result.creation.data.bluefolderLocationId, LOCATION);
  assert.match(result.patch.clientName, /San Clemente/);
  assert.match(result.patch.clientLocation, /635 Camino de los Mares/);
  assert.doesNotMatch(result.patch.clientLocation, /Camelback|Scottsdale/);
  assert.equal(JSON.stringify([...repo.rows]), before, "Resolver only returns a pending site creation");
  assert.ok(!JSON.stringify(result.creation.data.machines || []).includes("HQ-MACHINE"));
});

test("nested-site identity is deterministic across imports and remains duplicate-free on replay", async () => {
  const repo = repository({ "Client/AIS100": parent });
  const first = await repo.resolve();
  const anotherOrder = await repo.resolve({ ...payload, workOrderId: "10674",
    blueFolder: { ...payload.blueFolder, serviceRequestId: "10674" } });
  assert.equal(anotherOrder.patch.clientId, first.patch.clientId);
  repo.rows.set(first.creation.ref.path, first.creation.data);
  const replay = await repo.resolve();
  assert.equal(replay.patch.clientId, first.patch.clientId);
  assert.equal(replay.creation ?? null, null);
  assert.equal(repo.rows.size, 2);
});

test("existing exact site is reused without creating or modifying parent or site", async () => {
  const repo = repository({ "Client/AIS100": parent,
    "Client/AIS200": { name: nestedSite.name, location: SITE_ADDRESS,
      bluefolderCustomerId: CUSTOMER, bluefolderLocationId: LOCATION } });
  const before = JSON.stringify([...repo.rows]);
  const result = await repo.resolve();
  assert.equal(result.patch.clientId, "AIS200");
  assert.equal(result.patch.clientRef?.path, "Client/AIS200");
  assert.equal(result.creation ?? null, null);
  assert.equal(JSON.stringify([...repo.rows]), before);
});

test("existing verified location alias wins without creating another site", async () => {
  const repo = repository({ "Client/AIS100": parent,
    "Client/AIS201": { name: nestedSite.name, location: SITE_ADDRESS,
      bluefolderCustomerId: CUSTOMER, bluefolderLocationId: "PREVIOUS-LOCATION",
      bluefolderLocationAliasKeys: [`${CUSTOMER}:${LOCATION}`] } });
  const result = await repo.resolve();
  assert.equal(result.patch.clientId, "AIS201");
  assert.equal(result.patch.clientRef?.path, "Client/AIS201");
  assert.equal(result.creation ?? null, null);
});

test("read-only/dry-run mode does not propose a new Client record", async () => {
  assertUnlinked(await repository({ "Client/AIS100": parent }).resolve(payload, { allowCreate: false }));
});

test("a deterministic ID collision never overwrites an unrelated Client", async () => {
  const repo = repository({ "Client/AIS100": parent });
  const first = await repo.resolve();
  const unrelated = { name: "Unrelated site", bluefolderCustomerId: "other", bluefolderLocationId: "other-location" };
  repo.rows.set(first.creation.ref.path, unrelated);
  const result = await repo.resolve();
  assert.ok(result.creation);
  assert.notEqual(result.patch.clientId, first.patch.clientId);
  assert.match(result.patch.clientId, /^AIS\d+$/);
  assert.deepEqual(repo.rows.get(first.creation.ref.path), unrelated);
});

test("exhausted deterministic ID candidates stop safely without overwriting unrelated records", async () => {
  const repo = repository({ "Client/AIS100": parent });
  for (let index = 0; index < 32; index++) repo.rows.set(
    `Client/${deterministicSiteClientId(CUSTOMER, LOCATION, index)}`, { name: `Unrelated client ${index}` });
  const before = JSON.stringify([...repo.rows]);
  assertUnlinked(await repo.resolve());
  assert.equal(JSON.stringify([...repo.rows]), before);
});

test("missing immutable source IDs cannot fall back to title, customer name, or headquarters", async () => {
  for (const omitted of ["customerId", "customerLocationId"]) {
    const source = { ...payload.blueFolder };
    delete source[omitted];
    assertUnlinked(await repository({ "Client/AIS100": parent }).resolve({ ...payload, blueFolder: source }));
  }
});

test("payload address alone cannot create a site without matching nested directory evidence", async () => {
  for (const catalog of [[], [{ ...nestedSite, bluefolderLocationId: "OTHER" }]]) {
    assertUnlinked(await repository({ "Client/AIS100": { ...parent, bluefolderLocations: catalog } }).resolve());
  }
});

test("identical names and addresses on another customer's catalog are not identity evidence", async () => {
  assertUnlinked(await repository({ "Client/AIS100": { ...parent, bluefolderCustomerId: "OTHER-CUSTOMER" } }).resolve());
});

test("conflicting duplicated nested location metadata is review-only", async () => {
  for (const conflicting of [{ ...nestedSite, formattedAddress: "Different address", addressStreet: "Different street" },
    { ...nestedSite, name: "A different site" }]) {
    assertUnlinked(await repository({ "Client/AIS100": parent,
      "Client/AIS101": { ...parent, bluefolderLocations: [conflicting] } }).resolve());
  }
});

test("consistent nested catalog copies across several client records resolve to one separate site", async () => {
  const repo = repository({ "Client/AIS100": parent,
    "Client/AIS101": { ...parent, name: "SimonMed Northwest", bluefolderLocationId: "NORTHWEST" } });
  const result = await repo.resolve();
  assert.ok(result.creation);
  assert.notEqual(result.patch.clientId, "AIS100");
  assert.notEqual(result.patch.clientId, "AIS101");
  assert.equal(result.creation.data.bluefolderLocationId, LOCATION);
});

test("conflicting duplicate nested rows in a single parent also fail closed", async () => {
  assertUnlinked(await repository({ "Client/AIS100": { ...parent,
    bluefolderLocations: [nestedSite, { ...nestedSite, addressStreet: "Wrong address", formattedAddress: "Wrong address" }] } }).resolve());
});

test("duplicate direct location claims are ambiguous even when one is archived", async () => {
  const site = { name: nestedSite.name, location: SITE_ADDRESS,
    bluefolderCustomerId: CUSTOMER, bluefolderLocationId: LOCATION };
  for (const duplicate of [site, { ...site, archived: true }]) {
    assertUnlinked(await repository({ "Client/AIS100": parent, "Client/AIS200": site, "Client/AIS201": duplicate }).resolve());
  }
});

test("a direct site and a different aliased site cannot compete silently", async () => {
  assertUnlinked(await repository({ "Client/AIS100": parent,
    "Client/AIS200": { name: nestedSite.name, bluefolderCustomerId: CUSTOMER, bluefolderLocationId: LOCATION },
    "Client/AIS201": { name: nestedSite.name, bluefolderCustomerId: CUSTOMER,
      bluefolderLocationAliasKeys: [`${CUSTOMER}:${LOCATION}`] } }).resolve());
});

test("unavailable exact sites are not resurrected or replaced by another Client", async () => {
  for (const flag of [{ deletedAt: WHEN }, { archivedAt: WHEN }, { deleted: true }, { archived: true }, { bluefolderInactive: true }]) {
    assertUnlinked(await repository({ "Client/AIS100": parent,
      "Client/AIS200": { name: nestedSite.name, bluefolderCustomerId: CUSTOMER, bluefolderLocationId: LOCATION, ...flag } }).resolve());
  }
});

test("unavailable catalog parents do not authorize automatic site creation", async () => {
  for (const flag of [{ deletedAt: WHEN }, { archivedAt: WHEN }, { deleted: true }, { archived: true }, { bluefolderInactive: true }]) {
    assertUnlinked(await repository({ "Client/AIS100": { ...parent, ...flag } }).resolve());
  }
});

test("generic customer and requested title do not override a verified nested site's display identity", async () => {
  const result = await repository({ "Client/AIS100": parent }).resolve({ ...payload,
    subject: "SimonMed HQ - urgent shipping", blueFolder: { ...payload.blueFolder,
      customerName: "Generic organization" } });
  assert.match(result.patch.clientName, /San Clemente/);
  assert.match(result.patch.clientLocation, /635 Camino de los Mares/);
});

test("contradictory incoming site metadata does not overwrite verified catalog evidence", async () => {
  for (const conflicting of [{ customerLocationName: "Untrusted guessed headquarters" },
    { addressStreet: "6900 E Camelback Road" }, { addressCity: "Scottsdale" },
    { addressState: "AZ" }, { addressPostalCode: "85251" }]) {
    assertUnlinked(await repository({ "Client/AIS100": parent }).resolve({ ...payload,
      blueFolder: { ...payload.blueFolder, ...conflicting } }));
  }
});

test("exact site ID belonging to a conflicting customer cannot be used without a reviewed alias", async () => {
  assertUnlinked(await repository({ "Client/AIS100": parent,
    "Client/AIS200": { name: nestedSite.name, bluefolderCustomerId: "OTHER-CUSTOMER", bluefolderLocationId: LOCATION } }).resolve());
});

test("an existing manually maintained site requires review instead of silent duplication", async () => {
  assertUnlinked(await repository({ "Client/AIS100": parent,
    "Client/AIS200": { name: nestedSite.name, location: SITE_ADDRESS } }).resolve());
});

test("incomplete nested site metadata is not filled by unverified payload text", async () => {
  for (const missing of ["name", "addressStreet", "city"]) {
    const incomplete = { ...nestedSite };
    delete incomplete[missing];
    assertUnlinked(await repository({ "Client/AIS100": { ...parent, bluefolderLocations: [incomplete] } }).resolve());
  }
});

test("internally supplied fresh proof creates the same isolated leaf when the unique root cache is stale", async () => {
  const staleRoot = { ...parent, bluefolderLocations: [] };
  const repo = repository({ "Client/AIS100": staleRoot });
  const before = structuredClone([...repo.rows]);
  const result = await repo.resolve(payload, { freshCustomerProof: freshProof });
  assert.equal(result.reason, "bluefolder_verified_nested_site");
  assert.equal(result.creation.data.bluefolderParentClientId, "AIS100");
  assert.equal(result.creation.data.bluefolderSiteSource, "verified_nested_location");
  assert.deepEqual(result.creation.data.machines, []);
  assert.deepEqual(result.creation.data.bluefolderLocations.map((entry) => entry.bluefolderLocationId), [LOCATION]);
  assert.deepEqual([...repo.rows], before, "Fresh proof must not mutate the parent during resolution");
});

test("fresh proof cannot choose among duplicate roots or use an unavailable root", async () => {
  const staleRoot = { ...parent, bluefolderLocations: [] };
  for (const records of [
    { "Client/AIS100": staleRoot, "Client/AIS101": { ...staleRoot, name: "Second root" } },
    { "Client/AIS100": { ...staleRoot, archivedAt: WHEN } },
  ]) {
    assertUnlinked(await repository(records).resolve(payload, { freshCustomerProof: freshProof }));
  }
});

test("fresh proof rejects legacy represented-name or represented-address duplicates", async () => {
  const staleRoot = { ...parent, bluefolderLocations: [] };
  for (const legacy of [
    { name: nestedSite.name, location: "Different address" },
    { name: "Legacy site", location: SITE_ADDRESS },
    { name: "Legacy site", bluefolderMatchedLocation: { ...nestedSite } },
  ]) {
    const before = { "Client/AIS100": staleRoot, "Client/LEGACY": legacy };
    const result = await repository(before).resolve(payload, { freshCustomerProof: freshProof });
    assertUnlinked(result);
    assert.equal(result.reason, "bluefolder_existing_site_needs_review");
  }
});

test("fresh proof is bound to exact active nonprimary identity and matching payload metadata", async () => {
  const staleRoot = { ...parent, bluefolderLocations: [] };
  const invalidProofs = [
    { ...freshProof, source: "request_payload" },
    { ...freshProof, active: false },
    { ...freshProof, customerId: "OTHER" },
    { ...freshProof, location: { ...freshProof.location, bluefolderLocationId: "OTHER" } },
    { ...freshProof, location: { ...freshProof.location, isPrimary: true } },
    { ...freshProof, location: { ...freshProof.location, postalCode: "" } },
  ];
  for (const proof of invalidProofs) {
    assertUnlinked(await repository({ "Client/AIS100": staleRoot }).resolve(payload, { freshCustomerProof: proof }));
  }
  assertUnlinked(await repository({ "Client/AIS100": staleRoot }).resolve({
    ...payload,
    blueFolder: { ...payload.blueFolder, addressCity: "A different city" },
  }, { freshCustomerProof: freshProof }));
});

test("fresh proof never overrides an exact site created before the final transaction", async () => {
  const staleRoot = { ...parent, bluefolderLocations: [] };
  const result = await repository({
    "Client/AIS100": staleRoot,
    "Client/AIS200": {
      name: nestedSite.name,
      bluefolderCustomerId: CUSTOMER,
      bluefolderLocationId: LOCATION,
    },
  }).resolve(payload, { freshCustomerProof: freshProof });
  assert.equal(result.patch.clientId, "AIS200");
  assert.equal(result.creation, null);
});
