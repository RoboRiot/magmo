const assert = require("node:assert/strict");
const test = require("node:test");

const service = require("../lib/inventory/workOrderAddService.cjs");

function clone(value) {
  if (value === undefined || value === null) return value;
  if (value instanceof Date) return new Date(value.getTime());
  if (value instanceof FakeReference) {
    return { path: value.path, id: value.id };
  }
  if (Array.isArray(value)) return value.map(clone);
  if (typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, clone(nested)]));
  }
  return value;
}

function nestedValue(value, dottedPath) {
  return String(dottedPath)
    .split(".")
    .reduce((current, key) => current?.[key], value);
}

class FakeSnapshot {
  constructor(reference, value) {
    this.ref = reference;
    this.id = reference.id;
    this.exists = value !== undefined;
    this._value = value;
  }

  data() {
    return clone(this._value);
  }
}

class FakeReference {
  constructor(db, path) {
    this.db = db;
    this.path = path;
    this.id = path.split("/").at(-1);
  }

  collection(name) {
    return new FakeCollection(this.db, `${this.path}/${name}`);
  }

  async get() {
    return this.db.snapshot(this);
  }
}

class FakeQuery {
  constructor(db, collectionPath, field = "", operator = "", expected = null, max = Infinity) {
    this.db = db;
    this.collectionPath = collectionPath;
    this.field = field;
    this.operator = operator;
    this.expected = expected;
    this.max = max;
  }

  where(field, operator, expected) {
    return new FakeQuery(this.db, this.collectionPath, field, operator, expected, this.max);
  }

  limit(max) {
    return new FakeQuery(
      this.db,
      this.collectionPath,
      this.field,
      this.operator,
      this.expected,
      max
    );
  }

  async get() {
    return this.db.querySnapshot(this);
  }
}

class FakeCollection extends FakeQuery {
  constructor(db, path) {
    super(db, path);
    this.path = path;
  }

  doc(id) {
    if (!id) throw new TypeError("Document ID is required.");
    return new FakeReference(this.db, `${this.path}/${id}`);
  }
}

function isImmediateChild(documentPath, collectionPath) {
  const prefix = `${collectionPath}/`;
  return documentPath.startsWith(prefix) && !documentPath.slice(prefix.length).includes("/");
}

function matchesQuery(data, query) {
  if (!query.field) return true;
  const actual = nestedValue(data, query.field);
  if (query.operator === "==") return actual === query.expected;
  if (query.operator === "in") {
    return Array.isArray(query.expected) && query.expected.includes(actual);
  }
  throw new Error(`Unsupported query operator ${query.operator}`);
}

function mergeDocument(previous, update) {
  return { ...clone(previous || {}), ...clone(update || {}) };
}

class FakeDb {
  constructor(seed = {}) {
    this.records = new Map(Object.entries(seed).map(([path, value]) => [path, clone(value)]));
    this.commits = 0;
    this.writes = 0;
  }

  collection(name) {
    return new FakeCollection(this, name);
  }

  snapshot(reference) {
    return new FakeSnapshot(reference, this.records.get(reference.path));
  }

  querySnapshot(query) {
    const docs = Array.from(this.records.entries())
      .filter(
        ([path, data]) => isImmediateChild(path, query.collectionPath) && matchesQuery(data, query)
      )
      .slice(0, query.max)
      .map(([path, data]) => new FakeSnapshot(new FakeReference(this, path), data));
    return { docs, size: docs.length, empty: docs.length === 0 };
  }

  async runTransaction(callback) {
    const pending = [];
    const transaction = {
      get: async (target) => {
        assert.equal(pending.length, 0, "Firestore transaction reads must precede all writes");
        return target instanceof FakeReference
          ? this.snapshot(target)
          : this.querySnapshot(target);
      },
      set: (reference, data, options = {}) =>
        pending.push({ reference, data, options }),
    };
    const result = await callback(transaction);
    for (const write of pending) {
      const previous = this.records.get(write.reference.path);
      this.records.set(
        write.reference.path,
        write.options?.merge
          ? mergeDocument(previous, write.data)
          : clone(write.data)
      );
    }
    this.commits += 1;
    this.writes += pending.length;
    return result;
  }

  data(path) {
    return clone(this.records.get(path));
  }
}

const ACTOR = {
  uid: "igor-1",
  email: "isavchenko@advancedimagingparts.com",
  name: "Igor Savchenko",
  magmoName: "Igor Savchenko",
};
const NOW_MS = Date.parse("2026-08-28T18:30:00.000Z");

function association(clientId, clientName) {
  return {
    schemaVersion: 2,
    associationType: "site",
    clientId,
    clientNameSnapshot: clientName,
    clientLocationSnapshot: "",
    machineId: "",
    machineNameSnapshot: "",
    trailerId: "",
    trailerNameSnapshot: "",
    effectiveAt: "2026-08-01T00:00:00.000Z",
    effectiveAtSource: "item-save",
    resolutionSource: "item-editor",
  };
}

function itemSeed(id, clientId, clientName, overrides = {}) {
  return {
    name: `Part ${id}`,
    localSN: id,
    local_sn: id,
    associationSchemaVersion: 2,
    ClientCurrent: { path: `Client/${clientId}`, id: clientId },
    clientCurrentId: clientId,
    currentAssociationType: "site",
    associationCurrent: association(clientId, clientName),
    newLocalCurrent: {
      region: "F",
      section: { letter: "A", number: "1" },
      bin: 7,
    },
    localLocCurrent: "F–A1–B7",
    selectionHistory: [],
    saveHistory: [],
    workOrders: [],
    generalSearchTokens: [id.toLowerCase()],
    ...overrides,
  };
}

function baseSeed(itemOverrides = {}) {
  return {
    "OpsWorkOrders/10490": {
      workOrderId: "10490",
      number: "10490",
      subject: "Destination scanner repair",
      workflowStatus: "active",
      clientId: "CDEST",
    },
    "Client/CDEST": { name: "Destination Hospital", machines: [] },
    "Client/AIS17182": {
      name: "SoCalWarehouse - Lake Forest",
      location: "Lake Forest",
      machines: [{ path: "Machine/AIS42516", id: "AIS42516" }],
    },
    "Machine/AIS42516": {
      name: "Interior SoCal",
      client: { path: "Client/AIS17182", id: "AIS17182" },
      associatedParts: [],
    },
    "Test/AIS100": itemSeed(
      "AIS100",
      "AIS17182",
      "SoCalWarehouse - Lake Forest",
      itemOverrides
    ),
  };
}

async function membershipProof(db, scans) {
  const reader = { get: (referenceOrQuery) => referenceOrQuery.get() };
  const resolved = await service.resolveScanItems(reader, db, scans);
  return resolved.resolutions.map((resolution, index) => ({
    code: resolved.scans[index],
    fingerprint: service.membershipFingerprint(resolution),
  }));
}

function warehouseSeed(sourceClientId) {
  const seed = baseSeed({ unrelated: { retained: true },
    selectionHistory: [{ old: "selection" }], saveHistory: [{ old: "save" }],
    workOrders: [{ workOrder: "10490", date: "2025-02-03" }],
  });
  seed["OpsWorkOrders/10490"].clientId = sourceClientId;
  if (["AIS94688", "AIS89914"].includes(sourceClientId)) {
    seed["OpsWorkOrders/10490"].bluefolderCustomerId = "34579389";
    seed["OpsWorkOrders/10490"].bluefolderLocationId = sourceClientId === "AIS94688" ? "39226291" : "35057801";
  }
  seed["OpsWorkOrders/10490"].subject = "LF ships parts to Lathrop for repair";
  seed["Client/AIS94688"] = {
    name: "AIS - Lake Forest", machines: [], bluefolderCustomerId: "34579389",
    bluefolderLocationId: "39226291", bluefolderLocationAliasKeys: ["34579389:39226291"],
  };
  seed["Client/AIS25097"] = { name: "NorCal Warehouse - Lathrop", machines: [
    { path: "Machine/AIS12954", id: "AIS12954" },
  ] };
  seed["Client/AIS89914"] = { name: "Advanced Imaging Services, Inc.", machines: [],
    bluefolderCustomerId: "34579389", bluefolderLocationId: "35057801",
    address: { street: "17410 Murphy Pkwy.", city: "Lathrop", state: "CA", postalCode: "95330", country: "United States" },
  };
  seed["Machine/AIS12954"] = { name: "interior NorCal", client: { path: "Client/AIS25097", id: "AIS25097" }, associatedParts: [] };
  // A generic similarly named machine is not the canonical warehouse Interior.
  seed["Machine/AIS35161"] = { name: "interior", client: { path: "Client/AIS25097", id: "AIS25097" } };
  return seed;
}

for (const [sourceClientId, clientId, machineId] of [
  ["AIS94688", "AIS17182", "AIS42516"],
  ["AIS17182", "AIS17182", "AIS42516"],
  ["AIS25097", "AIS25097", "AIS12954"],
  ["AIS89914", "AIS25097", "AIS12954"],
]) {
  for (const movementMode of ["from_work_order", "current_at_work_order"]) {
    test(`warehouse ${sourceClientId} defaults to its canonical Interior for ${movementMode}, preserving provenance and replay`, async () => {
      const seed = warehouseSeed(sourceClientId);
      const db = new FakeDb(seed);
      const input = { db, authUser: ACTOR, operationId: `warehouse-${sourceClientId}-${movementMode}`,
        workOrderId: "10490", movementMode, scans: ["AIS100"],
        expectedMembership: await membershipProof(db, ["AIS100"]), nowMs: NOW_MS };
      const result = await service.confirmWorkOrderAdd(input);
      const item = db.data("Test/AIS100");
      const suffix = movementMode === "from_work_order" ? "From" : "Current";
      const otherSuffix = suffix === "From" ? "Current" : "From";
      const destination = item[`association${suffix}`];
      assert.equal(destination.associationType, "machine");
      assert.equal(destination.clientId, clientId);
      assert.equal(destination.machineId, machineId);
      assert.equal(destination.trailerId, "");
      assert.equal(destination.warehouseInteriorDefault, true);
      assert.equal(destination.workOrderClientId, sourceClientId);
      assert.equal(item[`Client${suffix}`].path, `Client/${clientId}`);
      assert.equal(item[`Machine${suffix}`].path, `Machine/${machineId}`);
      assert.equal(item[`association${otherSuffix}`].machineId, "AIS42516");
      assert.equal(result.workOrder.sourceClientId, sourceClientId);
      assert.equal(result.workOrder.clientId, clientId);
      assert.equal(result.workOrder.machineId, machineId);
      assert.deepEqual(db.data("OpsWorkOrders/10490"), seed["OpsWorkOrders/10490"]);
      for (const id of ["AIS94688", "AIS17182", "AIS25097", "AIS89914"]) {
        assert.deepEqual(db.data(`Client/${id}`), seed[`Client/${id}`]);
      }
      assert.deepEqual(db.data("Machine/AIS35161"), seed["Machine/AIS35161"]);
      assert.deepEqual(item.unrelated, seed["Test/AIS100"].unrelated);
      assert.deepEqual(item.selectionHistory[0], { old: "selection" });
      assert.deepEqual(item.saveHistory[0], { old: "save" });
      assert.deepEqual(item.workOrders, [{ workOrder: "10490", date: "2025-02-03" }]);
      const audit = db.data(`Test/AIS100/WorkOrderAddHistory/${input.operationId}`);
      assert.deepEqual(audit.beforeConfiguration.associationCurrent, seed["Test/AIS100"].associationCurrent);
      assert.equal(audit.workOrder.sourceClientId, sourceClientId);
      assert.equal(audit.workOrder.destinationClientId, clientId);
      assert.equal(audit.afterConfiguration[`association${suffix}`].workOrderClientId, sourceClientId);
      assert.ok(db.data(`Machine/${machineId}`).associatedParts.some((entry) => entry.path === "Test/AIS100"));
      const beforeReplay = clone(Array.from(db.records.entries()));
      const writes = db.writes;
      assert.equal((await service.confirmWorkOrderAdd(input)).alreadyConfirmed, true);
      assert.equal(db.writes, writes);
      assert.deepEqual(clone(Array.from(db.records.entries())), beforeReplay);
    });
  }
}

test("warehouse defaults never replace explicit machines/trailers or unresolved BlueFolder equipment", async () => {
  for (const explicit of [{ machineId: "MEXPLICIT" }, { trailerId: "TEXPLICIT" }]) {
    const seed = warehouseSeed("AIS25097");
    Object.assign(seed["OpsWorkOrders/10490"], explicit);
    seed["Machine/MEXPLICIT"] = { name: "Selected scanner", client: { path: "Client/AIS25097", id: "AIS25097" } };
    seed["Trailers/TEXPLICIT"] = { name: "Trailer selected", clientId: "AIS25097", machineId: "MEXPLICIT" };
    const db = new FakeDb(seed);
    const result = await service.resolveWorkOrderDestination({ get: (ref) => ref.get() }, db, "10490", new Date(NOW_MS).toISOString());
    assert.equal(result.association.machineId, "MEXPLICIT");
    assert.equal(result.association.trailerId, explicit.trailerId || "");
    assert.equal(result.association.warehouseInteriorDefault, undefined);
  }
  for (const fields of [
    { bluefolderEquipmentIds: ["SELECTED-SCANNER"] },
    { blueFolder: { equipmentNames: ["Selected scanner"] } },
    { machineLinkSource: "bluefolder_work_order_import", machineLinkEquipmentIds: ["OLD"], bluefolderEquipmentIds: [] },
  ]) {
    const seed = warehouseSeed("AIS94688");
    Object.assign(seed["OpsWorkOrders/10490"], fields);
    const db = new FakeDb(seed);
    await assert.rejects(service.resolveWorkOrderDestination({ get: (ref) => ref.get() }, db, "10490", new Date(NOW_MS).toISOString()),
      (error) => ["work_order_machine_not_linked", "work_order_machine_needs_review"].includes(error.code));
    assert.equal(db.writes, 0);
  }
});

test("BlueFolder warehouse aliases require exact work-order site IDs and Lathrop own-site address, never a cached nested site", async () => {
  for (const sourceClientId of ["AIS94688", "AIS89914"]) {
    for (const change of [
      (wo) => { delete wo.bluefolderCustomerId; },
      (wo) => { delete wo.bluefolderLocationId; },
      (wo) => { wo.bluefolderLocationId = "HOSPITAL-LOCATION"; },
      (wo) => { wo.bluefolderCustomerId = "OTHER-CUSTOMER"; },
      (wo) => { wo.blueFolder = { customerId: "OTHER-CUSTOMER", customerLocationId: wo.bluefolderLocationId }; },
      (wo) => { wo.blueFolder = { customerId: wo.bluefolderCustomerId, customerLocationId: "OTHER-LOCATION" }; },
    ]) {
      const seed = warehouseSeed(sourceClientId); change(seed["OpsWorkOrders/10490"]);
      const db = new FakeDb(seed);
      await assert.rejects(service.resolveWorkOrderDestination({ get: (ref) => ref.get() }, db, "10490", new Date(NOW_MS).toISOString()),
        (error) => error.code === "work_order_warehouse_source_mismatch");
      assert.equal(db.writes, 0);
    }
  }
  for (const change of [
    (client) => { client.bluefolderLocationId = "OTHER"; },
    (client) => { client.bluefolderCustomerId = "OTHER"; },
    (client) => { delete client.address; },
    (client) => { client.address.city = "Stockton"; },
    (client) => { client.address.street = "OTHER"; },
    (client) => { client.address.postalCode = "92630"; },
  ]) {
    const seed = warehouseSeed("AIS89914");
    const client = seed["Client/AIS89914"];
    client.bluefolderLocations = [{ ...client.address, bluefolderLocationId: "35057801", isPrimary: true }];
    change(client);
    const db = new FakeDb(seed);
    await assert.rejects(service.resolveWorkOrderDestination({ get: (ref) => ref.get() }, db, "10490", new Date(NOW_MS).toISOString()),
      (error) => error.code === "work_order_warehouse_interior_unavailable");
  }
  // Customer roots caching the same primary Lathrop site are not warehouse aliases.
  for (let index = 0; index < 39; index++) {
    const clientId = `ROOT${index}`;
    const seed = warehouseSeed(clientId);
    seed[`Client/${clientId}`] = { name: "Hospital root", bluefolderCustomerId: "34579389",
      bluefolderLocations: [{ bluefolderLocationId: "35057801", isPrimary: true, city: "Lathrop" }] };
    Object.assign(seed["OpsWorkOrders/10490"], { bluefolderCustomerId: "34579389", bluefolderLocationId: "35057801" });
    const db = new FakeDb(seed);
    const result = await service.resolveWorkOrderDestination({ get: (ref) => ref.get() }, db, "10490", new Date(NOW_MS).toISOString());
    assert.equal(result.association.clientId, clientId);
    assert.equal(result.association.associationType, "site");
    assert.equal(result.association.warehouseInteriorDefault, undefined);
  }
});

test("warehouse defaults fail closed on identity drift, missing Interior, wrong ownership, tombstones and malformed links", async () => {
  const changes = [
    (seed) => { seed["Client/AIS94688"].bluefolderLocationId = "OTHER"; },
    (seed) => { seed["Client/AIS94688"].bluefolderLocationAliasKeys = []; },
    (seed) => { delete seed["Client/AIS17182"]; },
    (seed) => { delete seed["Machine/AIS42516"]; },
    (seed) => { seed["Machine/AIS42516"].client = { path: "Client/OTHER", id: "OTHER" }; },
    (seed) => { seed["Machine/AIS42516"].client = { path: "Trailers/AIS17182", id: "AIS17182" }; },
    (seed) => { seed["Machine/AIS42516"].ClientId = false; },
    (seed) => { seed["Client/AIS17182"].machines = []; },
    (seed) => { seed["Client/AIS17182"].machines = false; },
    (seed) => { seed["Machine/AIS42516"].archived = true; },
    (seed) => { seed["Client/AIS94688"].bluefolderInactive = true; },
  ];
  for (const change of changes) {
    const seed = warehouseSeed("AIS94688"); change(seed);
    const db = new FakeDb(seed);
    await assert.rejects(service.confirmWorkOrderAdd({ db, authUser: ACTOR, operationId: "warehouse-fail-closed", workOrderId: "10490",
      movementMode: "current_at_work_order", scans: ["AIS100"], expectedMembership: await membershipProof(db, ["AIS100"]), nowMs: NOW_MS }),
    (error) => error.code === "work_order_warehouse_interior_unavailable");
    assert.equal(db.writes, 0);
    assert.deepEqual(db.data("Test/AIS100"), seed["Test/AIS100"]);
  }
  for (const field of ["machineRef", "trailerRef", "machineName", "trailerName"]) {
    for (const value of [false, 0, {}, { path: "Trailers/OTHER", id: "OTHER" }, "explicit"]) {
      const seed = warehouseSeed("AIS25097"); seed["OpsWorkOrders/10490"][field] = value;
      const db = new FakeDb(seed);
      await assert.rejects(service.resolveWorkOrderDestination({ get: (ref) => ref.get() }, db, "10490", new Date(NOW_MS).toISOString()),
        (error) => error.code === "work_order_machine_needs_review");
    }
  }
});

test("a confirmed direct item move is atomic, audited, searchable, and idempotent", async () => {
  const priorFrom = association("CPRIOR", "Prior From Site");
  const legacyAssociationValues = Object.fromEntries(
    service.LEGACY_ASSOCIATION_FIELDS.map((field, index) => [
      field,
      `${field}-legacy-${index}`,
    ])
  );
  const seed = baseSeed({
    ...legacyAssociationValues,
    associationFrom: priorFrom,
    fromAssociationType: "site",
    clientFromId: "CPRIOR",
    ClientFrom: { path: "Client/CPRIOR", id: "CPRIOR" },
    newLocalFrom: { region: "LEGACY", section: { letter: "Q", number: "8" } },
    localLocFrom: "LEGACY–Q8",
    workOrder: "10400",
    movementDate: "2026-08-20",
    unrelated: { nested: ["preserve", 42] },
  });
  const db = new FakeDb(seed);
  const input = {
    db,
    authUser: ACTOR,
    operationId: "operation-direct-0001",
    workOrderId: "10490",
    movementMode: "current_at_work_order",
    scans: ["AIS100"],
    expectedMembership: await membershipProof(db, ["AIS100"]),
    nowMs: NOW_MS,
  };
  const result = await service.confirmWorkOrderAdd(input);
  assert.equal(result.itemCount, 1);
  assert.equal(result.alreadyConfirmed, false);
  const item = db.data("Test/AIS100");
  assert.equal(item.clientFromId, "AIS17182");
  assert.equal(item.ClientFrom.path, "Client/AIS17182");
  assert.equal(item.clientCurrentId, "CDEST");
  assert.equal(item.ClientCurrent.path, "Client/CDEST");
  assert.deepEqual(item.newLocalFrom, {
    region: "F",
    section: { letter: "A", number: "1" },
    bin: 7,
  });
  assert.deepEqual(item.newLocalCurrent, {});
  assert.equal(item.bin, "");
  assert.equal(item.Bin, "");
  assert.deepEqual(item.unrelated, { nested: ["preserve", 42] });
  assert.equal(item.workOrders.at(-1).workOrder, "10490");
  assert.ok(item.workOrderTokens.includes("10490"));
  assert.equal(item.selectionHistory.at(-1).label, "Work order add by Igor Savchenko");
  assert.equal(item.saveHistory.at(-1).action, "work_order_add");
  assert.equal(item.movementDateType, "departure");
  assert.equal(item.departure_date, "2026-08-28");
  assert.equal(item.arrival_date, "");
  const audit = db.data("Test/AIS100/WorkOrderAddHistory/operation-direct-0001");
  assert.equal(audit.transitionCount, 1);
  assert.equal(audit.movementMode, "current_at_work_order");
  assert.deepEqual(audit.beforeConfiguration.associationFrom, priorFrom);
  assert.equal(audit.beforeConfiguration.associationCurrent.clientId, "AIS17182");
  assert.deepEqual(audit.beforeConfiguration.newLocalFrom, {
    region: "LEGACY",
    section: { letter: "Q", number: "8" },
  });
  assert.deepEqual(audit.beforeConfiguration.newLocalCurrent, {
    region: "F",
    section: { letter: "A", number: "1" },
    bin: 7,
  });
  assert.equal(audit.beforeConfiguration.workOrder, "10400");
  assert.equal(audit.beforeConfiguration.movementDate, "2026-08-20");
  for (const [field, priorValue] of Object.entries(legacyAssociationValues)) {
    assert.equal(
      audit.beforeConfiguration[field],
      priorValue,
      `${field} must remain in the immutable pre-change snapshot`
    );
    assert.equal(
      Object.hasOwn(item, field),
      false,
      `${field} must not survive as a conflicting live association alias`
    );
  }
  assert.equal(audit.workOrderAssignmentAdded, true);
  assert.equal(audit.workOrderAssignmentDate, "2026-08-28");
  assert.equal(item.selectionHistory.at(-2).fromClientId, "CPRIOR");
  assert.equal(item.selectionHistory.at(-2).currentClientId, "AIS17182");
  assert.equal(item.selectionHistory.at(-2).workOrder, "10400");
  assert.equal(item.selectionHistory.at(-2).movementDate, "2026-08-20");
  assert.deepEqual(item.selectionHistory.at(-1).fromLocalLocation, {
    region: "F",
    section: { letter: "A", number: "1" },
    bin: 7,
  });

  const writesAfterFirst = db.writes;
  const replay = await service.confirmWorkOrderAdd(input);
  assert.equal(replay.alreadyConfirmed, true);
  assert.equal(db.writes, writesAfterFirst);
  assert.equal(db.data("Test/AIS100").selectionHistory.length, 2);
});

test("movement mode is required and from_work_order is authoritative over prior location", async () => {
  const seed = baseSeed();
  seed["Client/COLD"] = { name: "Previous Hospital", machines: [] };
  seed["Test/AIS100"] = itemSeed("AIS100", "COLD", "Previous Hospital");
  const db = new FakeDb(seed);
  const baseInput = {
    db,
    authUser: ACTOR,
    operationId: "operation-stage-0002",
    workOrderId: "10490",
    scans: ["AIS100"],
    expectedMembership: await membershipProof(db, ["AIS100"]),
    nowMs: NOW_MS,
  };
  await assert.rejects(
    service.confirmWorkOrderAdd(baseInput),
    (error) => error.code === "invalid_movement_mode"
  );
  await assert.rejects(
    service.confirmWorkOrderAdd({ ...baseInput, movementMode: "stage_via_socal" }),
    (error) => error.code === "invalid_movement_mode"
  );
  assert.equal(db.writes, 0);
  assert.equal(db.data("InventoryWorkOrderAddOperations/operation-stage-0002"), undefined);

  const result = await service.confirmWorkOrderAdd({
    ...baseInput,
    movementMode: "from_work_order",
  });
  assert.equal(result.itemCount, 1);
  const item = db.data("Test/AIS100");
  assert.equal(item.fromAssociationType, "site");
  assert.equal(item.clientFromId, "CDEST");
  assert.equal(item.machineFromId, undefined);
  assert.equal(item.currentAssociationType, "machine");
  assert.equal(item.clientCurrentId, "AIS17182");
  assert.equal(item.machineCurrentId, "AIS42516");
  assert.equal(item.selectionHistory.length, 2);
  assert.equal(item.selectionHistory[0].transitionKind, "prior_configuration");
  assert.equal(item.selectionHistory[1].transitionKind, "work_order_to_socal");
  assert.equal(item.selectionHistory[1].movementDateType, "arrival");
  assert.equal(item.selectionHistory[1].arrivalDate, "2026-08-28");
  assert.equal(item.selectionHistory[1].departureDate, "");
  assert.equal(item.movementDateType, "arrival");
  assert.equal(item.arrival_date, "2026-08-28");
  assert.equal(item.departure_date, "");
  assert.equal(
    item.selectionHistory[0].beforeConfiguration.associationCurrent.clientId,
    "COLD"
  );
  const machine = db.data("Machine/AIS42516");
  assert.deepEqual(machine.associatedParts.map((entry) => entry.path), ["Test/AIS100"]);
  const audit = db.data("Test/AIS100/WorkOrderAddHistory/operation-stage-0002");
  assert.equal(audit.movementMode, "from_work_order");
  assert.equal(audit.beforeConfiguration.associationCurrent.clientId, "COLD");
  assert.equal(audit.afterConfiguration.associationFrom.clientId, "CDEST");
  assert.equal(audit.afterConfiguration.associationCurrent.machineId, "AIS42516");

  await assert.rejects(
    service.confirmWorkOrderAdd({
      ...baseInput,
      movementMode: "current_at_work_order",
    }),
    (error) => error.code === "operation_conflict"
  );
});

test("an existing work-order assignment becomes current while all original assignments retain their dates and metadata in history", async () => {
  const existingAssignments = [
    { workOrder: "WO #10490", date: "2026-07-04", note: "retain exact entry" },
    { workOrder: "10400", date: "2026-06-01" },
  ];
  const db = new FakeDb(baseSeed({ workOrders: existingAssignments }));
  const scans = ["AIS100"];
  const result = await service.confirmWorkOrderAdd({
    db,
    authUser: ACTOR,
    operationId: "operation-existing-work-order-0012",
    workOrderId: "10490",
    movementMode: "current_at_work_order",
    scans,
    expectedMembership: await membershipProof(db, scans),
    nowMs: NOW_MS,
  });
  assert.equal(result.workOrderAssignmentAddedCount, 0);
  assert.deepEqual(db.data("Test/AIS100").workOrders, [existingAssignments[0]]);
  assert.deepEqual(db.data("Test/AIS100").workOrderHistory.map((record) => record.entry), existingAssignments);
  const audit = db.data(
    "Test/AIS100/WorkOrderAddHistory/operation-existing-work-order-0012"
  );
  assert.equal(audit.workOrderAssignmentAdded, false);
  assert.equal(audit.workOrderAssignmentDate, null);
});

test("a destination machine can use an unambiguous scalar client link", async () => {
  const seed = baseSeed();
  seed["OpsWorkOrders/10490"].machineId = "MDEST";
  seed["Machine/MDEST"] = {
    name: "Destination MRI",
    clientId: "CDEST",
    associatedParts: [],
  };
  const db = new FakeDb(seed);
  const scans = ["AIS100"];
  await service.confirmWorkOrderAdd({
    db,
    authUser: ACTOR,
    operationId: "operation-scalar-machine-client-0015",
    workOrderId: "10490",
    movementMode: "current_at_work_order",
    scans,
    expectedMembership: await membershipProof(db, scans),
    nowMs: NOW_MS,
  });
  assert.equal(db.data("Test/AIS100").machineCurrentId, "MDEST");
});

for (const movementMode of ["current_at_work_order", "from_work_order"]) {
  test(`changed BlueFolder equipment blocks a stale auto-linked machine before ${movementMode}`, async () => {
    const seed = baseSeed();
    Object.assign(seed["OpsWorkOrders/10490"], {
      machineId: "MDEST", machineLinkSource: "bluefolder_work_order_import",
      machineLinkEquipmentIds: ["BF-OLD"], bluefolderEquipmentIds: ["BF-NEW"],
    });
    seed["Machine/MDEST"] = { name: "AQ64 CT", clientId: "CDEST" };
    const db = new FakeDb(seed);
    const before = db.data("Test/AIS100");
    await assert.rejects(service.confirmWorkOrderAdd({
      db, authUser: ACTOR, operationId: "operation-stale-machine-0022", workOrderId: "10490",
      movementMode, scans: ["AIS100"], expectedMembership: await membershipProof(db, ["AIS100"]), nowMs: NOW_MS,
    }), (error) => error.code === "work_order_machine_needs_review" && error.statusCode === 409);
    assert.equal(db.writes, 0);
    assert.deepEqual(db.data("Test/AIS100"), before);
  });

  test(`selected BlueFolder equipment requires a linked machine before ${movementMode}`, async () => {
    for (const evidence of [
      { bluefolderEquipmentIds: ["BF-EQUIPMENT-1"] },
      { bluefolderEquipmentNames: ["AQ64 CT"] },
      { blueFolder: { equipmentIds: ["BF-EQUIPMENT-1"] } },
    ]) {
      const seed = baseSeed();
      Object.assign(seed["OpsWorkOrders/10490"], evidence);
      const db = new FakeDb(seed);
      const before = db.data("Test/AIS100");
      await assert.rejects(service.confirmWorkOrderAdd({
        db, authUser: ACTOR, operationId: "operation-unlinked-equipment-0020",
        workOrderId: "10490", movementMode, scans: ["AIS100"],
        expectedMembership: await membershipProof(db, ["AIS100"]), nowMs: NOW_MS,
      }), (error) => error.code === "work_order_machine_not_linked" && error.statusCode === 409);
      assert.equal(db.writes, 0);
      assert.deepEqual(db.data("Test/AIS100"), before);
      assert.equal(db.data("InventoryWorkOrderAddOperations/operation-unlinked-equipment-0020"), undefined);
    }
  });

  test(`linked BlueFolder machine is saved with references, prior history, and backlinks for ${movementMode}`, async () => {
    const priorCurrent = {
      ...association("AIS17182", "SoCalWarehouse - Lake Forest"),
      associationType: "machine", machineId: "AIS42516", machineNameSnapshot: "Interior SoCal",
    };
    const priorFrom = association("CPRIOR", "Prior site");
    const seed = baseSeed({
      associationCurrent: priorCurrent, machineCurrentId: "AIS42516",
      MachineCurrent: { path: "Machine/AIS42516", id: "AIS42516" }, currentAssociationType: "machine",
      associationFrom: priorFrom,
      selectionHistory: [{ legacy: "retain prior history" }],
      saveHistory: [{ legacy: "retain prior save" }],
    });
    Object.assign(seed["OpsWorkOrders/10490"], {
      bluefolderEquipmentIds: ["BF-EQUIPMENT-1"], machineId: "MDEST", machineName: "AQ64 CT",
    });
    seed["Machine/MDEST"] = { name: "AQ64 CT", clientId: "CDEST", associatedParts: [] };
    const db = new FakeDb(seed);
    const result = await service.confirmWorkOrderAdd({
      db, authUser: ACTOR, operationId: "operation-linked-equipment-0021",
      workOrderId: "10490", movementMode, scans: ["AIS100"],
      expectedMembership: await membershipProof(db, ["AIS100"]), nowMs: NOW_MS,
    });
    const item = db.data("Test/AIS100");
    const workOrderSide = movementMode === "from_work_order" ? "From" : "Current";
    const warehouseSide = workOrderSide === "From" ? "Current" : "From";
    assert.equal(item[`Machine${workOrderSide}`].path, "Machine/MDEST");
    assert.equal(item[`machine${workOrderSide}Id`], "MDEST");
    assert.equal(item[`association${workOrderSide}`].associationType, "machine");
    assert.equal(item[`association${workOrderSide}`].machineNameSnapshot, "AQ64 CT");
    assert.equal(item[`Machine${warehouseSide}`].path, "Machine/AIS42516");
    assert.equal(item[`machine${warehouseSide}Id`], "AIS42516");
    assert.equal(result.workOrder.machineId, "MDEST");
    assert.equal(item.workOrders.at(-1).workOrder, "10490");
    assert.deepEqual(item.selectionHistory[0], { legacy: "retain prior history" });
    assert.deepEqual(item.saveHistory[0], { legacy: "retain prior save" });
    const audit = db.data("Test/AIS100/WorkOrderAddHistory/operation-linked-equipment-0021");
    assert.deepEqual(audit.beforeConfiguration.associationCurrent, priorCurrent);
    assert.deepEqual(audit.beforeConfiguration.associationFrom, priorFrom);
    assert.equal(audit.afterConfiguration[`association${workOrderSide}`].machineId, "MDEST");
    assert.ok(db.data("Machine/MDEST").associatedParts.some((part) => part.path === "Test/AIS100"));
  });
}

test("conflicting direct machine client fields cannot be rescued by a stale client backlink", async () => {
  const seed = baseSeed();
  seed["OpsWorkOrders/10490"].machineId = "MDEST";
  seed["Client/CDEST"].machines = [{ path: "Machine/MDEST", id: "MDEST" }];
  seed["Machine/MDEST"] = {
    name: "Conflicted destination MRI",
    client: { path: "Client/CDEST", id: "CDEST" },
    ClientId: "OTHER",
    associatedParts: [],
  };
  const db = new FakeDb(seed);
  const scans = ["AIS100"];
  await assert.rejects(
    service.confirmWorkOrderAdd({
      db,
      authUser: ACTOR,
      operationId: "operation-conflicting-machine-client-0016",
      workOrderId: "10490",
      movementMode: "current_at_work_order",
      scans,
      expectedMembership: await membershipProof(db, scans),
      nowMs: NOW_MS,
    }),
    (error) =>
      error.code === "work_order_machine_client_mismatch" &&
      error.statusCode === 409
  );
  assert.equal(db.writes, 0);
});

test("a trailer destination requires a live machine and rejects a different work-order machine", async () => {
  const missingSeed = baseSeed();
  Object.assign(missingSeed["OpsWorkOrders/10490"], {
    trailerId: "TDEST",
    machineId: "MDEST",
  });
  missingSeed["Trailers/TDEST"] = {
    name: "Destination trailer",
    currentClient: { path: "Client/CDEST", id: "CDEST" },
  };
  missingSeed["Machine/MDEST"] = {
    name: "Destination MRI",
    client: { path: "Client/CDEST", id: "CDEST" },
    associatedParts: [],
  };
  missingSeed["Client/CDEST"].machines = [
    { path: "Machine/MDEST", id: "MDEST" },
  ];
  const missingDb = new FakeDb(missingSeed);
  const scans = ["AIS100"];
  await assert.rejects(
    service.confirmWorkOrderAdd({
      db: missingDb,
      authUser: ACTOR,
      operationId: "operation-trailer-machine-missing-0017",
      workOrderId: "10490",
      movementMode: "current_at_work_order",
      scans,
      expectedMembership: await membershipProof(missingDb, scans),
      nowMs: NOW_MS,
    }),
    (error) =>
      error.code === "work_order_trailer_machine_missing" &&
      error.statusCode === 409
  );
  assert.equal(missingDb.writes, 0);

  const mismatchSeed = baseSeed();
  Object.assign(mismatchSeed["OpsWorkOrders/10490"], {
    trailerId: "TDEST",
    machineId: "MDEST",
  });
  mismatchSeed["Trailers/TDEST"] = {
    name: "Destination trailer",
    currentClient: { path: "Client/CDEST", id: "CDEST" },
    associatedMachine: { path: "Machine/MOTHER", id: "MOTHER" },
  };
  const mismatchDb = new FakeDb(mismatchSeed);
  await assert.rejects(
    service.confirmWorkOrderAdd({
      db: mismatchDb,
      authUser: ACTOR,
      operationId: "operation-trailer-machine-mismatch-0018",
      workOrderId: "10490",
      movementMode: "current_at_work_order",
      scans,
      expectedMembership: await membershipProof(mismatchDb, scans),
      nowMs: NOW_MS,
    }),
    (error) =>
      error.code === "work_order_trailer_machine_mismatch" &&
      error.statusCode === 409
  );
  assert.equal(mismatchDb.writes, 0);
});

for (const movementMode of ["current_at_work_order", "from_work_order"]) {
  test(`trailer AIS20 and machine AIS82553 are saved together with full history for ${movementMode}`, async () => {
    const seed = baseSeed();
    seed["OpsWorkOrders/10659"] = { clientId: "CDEST", machineId: "AIS82553", trailerId: "AIS20", number: "10659" };
    seed["Machine/AIS82553"] = { name: "Trailer 20 scanner", clientId: "CDEST", associatedParts: [] };
    seed["Trailers/AIS20"] = { name: "Trailer 20", currentClient: { path: "Client/CDEST", id: "CDEST" }, associatedMachine: { path: "Machine/AIS82553", id: "AIS82553" } };
    const db = new FakeDb(seed), before = db.data("Test/AIS100");
    await service.confirmWorkOrderAdd({ db, authUser: ACTOR, operationId: "trailer-movement-10659-0023", workOrderId: "10659", movementMode,
      scans: ["AIS100"], expectedMembership: await membershipProof(db, ["AIS100"]), nowMs: NOW_MS });
    const item = db.data("Test/AIS100"), side = movementMode === "from_work_order" ? "From" : "Current", other = side === "From" ? "Current" : "From";
    assert.equal(item[`Trailer${side}`].path, "Trailers/AIS20"); assert.equal(item[`Machine${side}`].path, "Machine/AIS82553");
    assert.equal(item[`trailer${side}Id`], "AIS20"); assert.equal(item[`machine${side}Id`], "AIS82553");
    assert.equal(item[`association${side}`].associationType, "trailer"); assert.equal(item[`machine${other}Id`], "AIS42516");
    assert.equal(item[`trailer${other}Id`], undefined);
    const audit = db.data("Test/AIS100/WorkOrderAddHistory/trailer-movement-10659-0023");
    assert.deepEqual(audit.beforeConfiguration.associationCurrent, before.associationCurrent);
    assert.equal(audit.afterConfiguration[`association${side}`].trailerId, "AIS20");
    assert.equal(audit.afterConfiguration[`association${side}`].machineId, "AIS82553");
    assert.ok(db.data("Machine/AIS82553").associatedParts.some((part) => part.path === "Test/AIS100"));
  });
}

test("machines that opt out of complete associatedParts backlinks are never rewritten", async () => {
  const seed = baseSeed();
  seed["Machine/AIS42516"] = {
    ...seed["Machine/AIS42516"],
    skipAssociatedParts: true,
    associatedPartsSkippedReason: "interior-socal-warehouse",
    associatedParts: [{ path: "Test/EXISTING", id: "EXISTING" }],
  };
  const db = new FakeDb(seed);
  const scans = ["AIS100"];
  await service.confirmWorkOrderAdd({
    db,
    authUser: ACTOR,
    operationId: "operation-skip-backlinks-0013",
    workOrderId: "10490",
    movementMode: "from_work_order",
    scans,
    expectedMembership: await membershipProof(db, scans),
    nowMs: NOW_MS,
  });
  assert.deepEqual(db.data("Machine/AIS42516").associatedParts, [
    { path: "Test/EXISTING", id: "EXISTING" },
  ]);
});

test("pallet and direct scans expand and deduplicate the same current item", async () => {
  const seed = baseSeed({ newLocalCurrent: { pallet: 1 }, localLocCurrent: "P1" });
  seed["StorageUnits/P1"] = {
    code: "P1",
    kind: "pallet",
    number: 1,
    displayNumber: "1",
  };
  seed["Test/AIS101"] = itemSeed(
    "AIS101",
    "AIS17182",
    "SoCalWarehouse - Lake Forest",
    { newLocalCurrent: { pallet: "1" }, localLocCurrent: "P1" }
  );
  const db = new FakeDb(seed);
  const scans = ["P1", "AIS101"];
  const result = await service.confirmWorkOrderAdd({
    db,
    authUser: ACTOR,
    operationId: "operation-pallet-0003",
    workOrderId: "10490",
    movementMode: "current_at_work_order",
    scans,
    expectedMembership: await membershipProof(db, scans),
    nowMs: NOW_MS,
  });
  assert.equal(result.itemCount, 2);
  assert.deepEqual(
    result.items.map((item) => item.id).sort(),
    ["AIS100", "AIS101"]
  );
  assert.equal(db.data("Test/AIS100").selectionHistory.length, 2);
  assert.equal(db.data("Test/AIS101").selectionHistory.length, 2);
  assert.equal(db.data("StorageUnits/P1").code, "P1");
});

test("direct bins and pallet-linked bins expand their exact current contents", async () => {
  const binSeed = baseSeed();
  binSeed["StorageUnits/B7"] = {
    code: "B7",
    kind: "bin",
    number: 7,
    displayNumber: "7",
  };
  const binDb = new FakeDb(binSeed);
  const binScans = ["B7"];
  const binResult = await service.confirmWorkOrderAdd({
    db: binDb,
    authUser: ACTOR,
    operationId: "operation-bin-0004",
    workOrderId: "10490",
    movementMode: "current_at_work_order",
    scans: binScans,
    expectedMembership: await membershipProof(binDb, binScans),
    nowMs: NOW_MS,
  });
  assert.deepEqual(binResult.items.map((item) => item.id), ["AIS100"]);

  const palletSeed = baseSeed({
    newLocalCurrent: { bin: 8 },
    localLocCurrent: "B8",
  });
  palletSeed["StorageUnits/P2"] = {
    code: "P2",
    kind: "pallet",
    number: 2,
    displayNumber: "2",
  };
  palletSeed["StorageUnits/B8"] = {
    code: "B8",
    kind: "bin",
    number: 8,
    displayNumber: "8",
    parentPalletId: "P2",
  };
  const palletDb = new FakeDb(palletSeed);
  const palletScans = ["P2"];
  const palletResult = await service.confirmWorkOrderAdd({
    db: palletDb,
    authUser: ACTOR,
    operationId: "operation-linked-bin-0005",
    workOrderId: "10490",
    movementMode: "current_at_work_order",
    scans: palletScans,
    expectedMembership: await membershipProof(palletDb, palletScans),
    nowMs: NOW_MS,
  });
  assert.deepEqual(palletResult.items.map((item) => item.id), ["AIS100"]);
});

test("confirmation stops when a reviewed bin or pallet membership changes", async () => {
  const seed = baseSeed({ newLocalCurrent: { pallet: 3 }, localLocCurrent: "P3" });
  seed["StorageUnits/P3"] = {
    code: "P3",
    kind: "pallet",
    number: 3,
    displayNumber: "3",
  };
  const db = new FakeDb(seed);
  const scans = ["P3"];
  const expectedMembership = await membershipProof(db, scans);
  db.records.set(
    "Test/AIS101",
    itemSeed("AIS101", "AIS17182", "SoCalWarehouse - Lake Forest", {
      newLocalCurrent: { pallet: 3 },
      localLocCurrent: "P3",
    })
  );

  await assert.rejects(
    service.confirmWorkOrderAdd({
      db,
      authUser: ACTOR,
      operationId: "operation-membership-drift-0006",
      workOrderId: "10490",
      movementMode: "current_at_work_order",
      scans,
      expectedMembership,
      nowMs: NOW_MS,
    }),
    (error) => error.code === "staged_membership_changed" && error.statusCode === 409
  );
  assert.equal(db.writes, 0);
  assert.equal(db.data("Test/AIS100").selectionHistory.length, 0);
});

test("legacy machine backlinks are removed and the destination backlink is added", async () => {
  const seed = baseSeed({
    fromMachine: { path: "Machine/MOLD", id: "MOLD" },
  });
  seed["Machine/MOLD"] = {
    name: "Legacy machine",
    associatedParts: [{ path: "Test/AIS100", id: "AIS100" }],
  };
  seed["Machine/MDEST"] = {
    name: "Destination scanner",
    client: { path: "Client/CDEST", id: "CDEST" },
    associatedParts: [],
  };
  seed["Client/CDEST"].machines = [{ path: "Machine/MDEST", id: "MDEST" }];
  seed["OpsWorkOrders/10490"].machineId = "MDEST";
  const db = new FakeDb(seed);
  const scans = ["AIS100"];
  await service.confirmWorkOrderAdd({
    db,
    authUser: ACTOR,
    operationId: "operation-backlinks-0007",
    workOrderId: "10490",
    movementMode: "current_at_work_order",
    scans,
    expectedMembership: await membershipProof(db, scans),
    nowMs: NOW_MS,
  });
  assert.deepEqual(db.data("Machine/MOLD").associatedParts, []);
  assert.deepEqual(
    db.data("Machine/MDEST").associatedParts.map((entry) => entry.path),
    ["Test/AIS100"]
  );
});

test("explicit movement mode archives a stale trailer configuration without trusting it", async () => {
  const seed = baseSeed({
    currentAssociationType: "trailer",
    clientCurrentId: "AIS17182",
    machineCurrentId: "MTRAILER",
    trailerCurrentId: "T1",
    MachineCurrent: { path: "Machine/MTRAILER", id: "MTRAILER" },
    TrailerCurrent: { path: "Trailers/T1", id: "T1" },
    associationCurrent: {
      ...association("AIS17182", "SoCalWarehouse - Lake Forest"),
      associationType: "trailer",
      machineId: "MTRAILER",
      machineNameSnapshot: "Trailer scanner",
      trailerId: "T1",
      trailerNameSnapshot: "Trailer 1",
    },
  });
  seed["Client/COLD"] = {
    name: "Current outside client",
    machines: [{ path: "Machine/MTRAILER", id: "MTRAILER" }],
  };
  seed["Machine/MTRAILER"] = {
    name: "Trailer scanner",
    client: { path: "Client/COLD", id: "COLD" },
    associatedParts: [{ path: "Test/AIS100", id: "AIS100" }],
  };
  seed["Trailers/T1"] = {
    name: "Trailer 1",
    currentClient: { path: "Client/COLD", id: "COLD" },
    associatedMachine: { path: "Machine/MTRAILER", id: "MTRAILER" },
  };
  const db = new FakeDb(seed);
  const scans = ["AIS100"];
  await service.confirmWorkOrderAdd({
    db,
    authUser: ACTOR,
    operationId: "operation-live-trailer-0008",
    workOrderId: "10490",
    movementMode: "current_at_work_order",
    scans,
    expectedMembership: await membershipProof(db, scans),
    nowMs: NOW_MS,
  });
  const audit = db.data(
    "Test/AIS100/WorkOrderAddHistory/operation-live-trailer-0008"
  );
  assert.equal(audit.beforeConfiguration.associationCurrent.trailerId, "T1");
  assert.equal(audit.afterConfiguration.associationFrom.machineId, "AIS42516");
  assert.equal(audit.afterConfiguration.associationCurrent.clientId, "CDEST");
});

test("movement fails closed if the authoritative Lake Forest client is missing", async () => {
  const seed = baseSeed();
  seed["Client/COLD"] = { name: "Outside client", machines: [] };
  seed["Test/AIS100"] = itemSeed("AIS100", "COLD", "Outside client");
  delete seed["Client/AIS17182"];
  const db = new FakeDb(seed);
  const scans = ["AIS100"];
  await assert.rejects(
    service.confirmWorkOrderAdd({
      db,
      authUser: ACTOR,
      operationId: "operation-socal-missing-0009",
      workOrderId: "10490",
      movementMode: "from_work_order",
      scans,
      expectedMembership: await membershipProof(db, scans),
      nowMs: NOW_MS,
    }),
    (error) => error.code === "socal_client_missing" && error.statusCode === 409
  );
  assert.equal(db.writes, 0);
});

test("movement fails closed if the Interior machine is missing", async () => {
  const seed = baseSeed();
  seed["Client/COLD"] = { name: "Outside client", machines: [] };
  seed["Test/AIS100"] = itemSeed("AIS100", "COLD", "Outside client");
  delete seed["Machine/AIS42516"];
  const db = new FakeDb(seed);
  const scans = ["AIS100"];
  await assert.rejects(
    service.confirmWorkOrderAdd({
      db,
      authUser: ACTOR,
      operationId: "operation-socal-machine-missing-0010",
      workOrderId: "10490",
      movementMode: "current_at_work_order",
      scans,
      expectedMembership: await membershipProof(db, scans),
      nowMs: NOW_MS,
    }),
    (error) =>
      error.code === "socal_interior_machine_unavailable" &&
      error.statusCode === 409
  );
  assert.equal(db.writes, 0);
});

test("movement fails closed when the canonical Interior machine has conflicting client evidence", async () => {
  const seed = baseSeed();
  seed["Machine/AIS42516"].client = { path: "Client/OTHER", id: "OTHER" };
  const db = new FakeDb(seed);
  const scans = ["AIS100"];
  await assert.rejects(
    service.confirmWorkOrderAdd({
      db,
      authUser: ACTOR,
      operationId: "operation-socal-ambiguous-0014",
      workOrderId: "10490",
      movementMode: "current_at_work_order",
      scans,
      expectedMembership: await membershipProof(db, scans),
      nowMs: NOW_MS,
    }),
    (error) =>
      error.code === "socal_interior_machine_ambiguous" &&
      error.statusCode === 409
  );
  assert.equal(db.writes, 0);
});

test("a missing prior current client is archived and does not block explicit movement", async () => {
  const seed = baseSeed();
  seed["Test/AIS100"] = itemSeed("AIS100", "CMISSING", "Missing client");
  const db = new FakeDb(seed);
  const scans = ["AIS100"];
  await service.confirmWorkOrderAdd({
    db,
    authUser: ACTOR,
    operationId: "operation-current-client-missing-0011",
    workOrderId: "10490",
    movementMode: "from_work_order",
    scans,
    expectedMembership: await membershipProof(db, scans),
    nowMs: NOW_MS,
  });
  const item = db.data("Test/AIS100");
  assert.equal(item.clientFromId, "CDEST");
  assert.equal(item.clientCurrentId, "AIS17182");
  assert.equal(item.selectionHistory.length, 2);
  assert.equal(
    item.selectionHistory[0].beforeConfiguration.associationCurrent.clientId,
    "CMISSING"
  );
});

function toolSeed(overrides = {}) {
  return {
    name: "Scanner service kit", description: "Calibrated toolkit; keep together.",
    fromClientId: "CFROM", fromClientName: "Prior source",
    fromMachineId: "MFROM", fromMachineName: "Prior source machine",
    currentClientId: "COLD", currentClientName: "Prior site",
    currentMachineId: "MOLD", currentMachineName: "Prior machine",
    ClientFrom: { path: "Client/CFROM", id: "CFROM" },
    MachineFrom: { path: "Machine/MFROM", id: "MFROM" },
    ClientCurrent: { path: "Client/COLD", id: "COLD" },
    MachineCurrent: { path: "Machine/MOLD", id: "MOLD" },
    localLocFrom: "Old shelf", localLocCurrent: "Tool cabinet 2",
    photoUrls: ["https://example.test/saved-tool-photo"],
    componentItemIds: ["AIS100"], componentItems: [{ id: "AIS100", name: "Included component" }],
    componentItemRefs: [{ path: "Test/AIS100", id: "AIS100" }],
    workOrders: [{ workOrder: "10000", date: "2025-01-01", note: "keep history" }],
    selectionHistory: Array.from({ length: 125 }, (_, index) => ({ savedAt: String(index), note: `old ${index}` })),
    custom: { calibration: "2026-10-01", retained: true },
    ...overrides,
  };
}

for (const mode of ["from_work_order", "current_at_work_order"]) {
  test(`Tool ${mode} movement preserves separate identity, flat fields, all history and components`, async () => {
    const seed = baseSeed();
    seed["Tool/AIS_T00001"] = toolSeed();
    seed["OpsWorkOrders/10490"].machineId = "MDEST";
    seed["Client/CDEST"].machines = [{ path: "Machine/MDEST", id: "MDEST" }];
    seed["Machine/MDEST"] = { name: "Destination scanner", clientId: "CDEST", associatedParts: [] };
    const db = new FakeDb(seed);
    const beforeTool = db.data("Tool/AIS_T00001");
    const beforeItem = db.data("Test/AIS100");
    const beforeMachines = [db.data("Machine/AIS42516"), db.data("Machine/MDEST")];
    const preview = await service.previewWorkOrderAddScan({ db, rawCode: "https://magmo.cloud/NewSearch/Tools/AIS_T00001" });
    assert.equal(preview.kind, "tool");
    assert.equal(preview.canonicalId, "AIS_T00001");
    assert.equal(preview.preview.name, "Scanner service kit");
    assert.equal(preview.preview.description, beforeTool.description);
    assert.deepEqual(preview.itemIds, ["AIS_T00001"]);
    assert.deepEqual(preview.entityKeys, ["tool:AIS_T00001"]);
    assert.equal(preview.preview.items[0].kind, "tool");
    assert.equal(db.writes, 0);
    const input = { db, authUser: ACTOR, operationId: `tool-${mode}`, workOrderId: "10490", movementMode: mode,
      scans: ["ais_t1"], expectedMembership: [{ code: preview.code, fingerprint: preview.membershipFingerprint }], nowMs: NOW_MS };
    const result = await service.confirmWorkOrderAdd(input);
    assert.equal(result.itemCount, 1);
    assert.equal(result.items[0].kind, "tool");
    assert.equal(result.items[0].collection, "Tool");
    assert.deepEqual(result.slackTargets, [{ id: "AIS_T00001", kind: "tool", name: beforeTool.name,
      description: beforeTool.description, itemIds: ["AIS_T00001"] }]);
    const saved = db.data("Tool/AIS_T00001");
    const audit = db.data(`Tool/AIS_T00001/WorkOrderAddHistory/tool-${mode}`);
    const fromIsWorkOrder = mode === "from_work_order";
    assert.equal(saved.fromClientId, fromIsWorkOrder ? "CDEST" : "AIS17182");
    assert.equal(saved.currentClientId, fromIsWorkOrder ? "AIS17182" : "CDEST");
    assert.equal(saved.fromMachineId, fromIsWorkOrder ? "MDEST" : "AIS42516");
    assert.equal(saved.currentMachineId, fromIsWorkOrder ? "AIS42516" : "MDEST");
    assert.equal(saved.ClientCurrent.path, `Client/${saved.currentClientId}`);
    assert.equal(saved.MachineCurrent.path, `Machine/${saved.currentMachineId}`);
    assert.equal(saved.associationCurrent.clientId, saved.currentClientId);
    assert.equal(saved.selectionHistory.length, beforeTool.selectionHistory.length + 2);
    assert.deepEqual(saved.selectionHistory.slice(0, beforeTool.selectionHistory.length), beforeTool.selectionHistory);
    assert.equal(saved.selectionHistory.at(-2).fromClientName, "Prior source");
    assert.equal(saved.selectionHistory.at(-2).toClientName, "Prior site");
    assert.equal(saved.selectionHistory.at(-2).toMachineName, "Prior machine");
    assert.equal(saved.selectionHistory.at(-1).toClientName, saved.currentClientName);
    assert.equal(saved.selectionHistory.at(-1).toMachineName, saved.currentMachineName);
    assert.deepEqual(audit.beforeConfiguration.workOrders, beforeTool.workOrders);
    assert.equal(audit.beforeConfiguration.currentClientName, "Prior site");
    assert.equal(audit.entityCollection, "Tool");
    for (const field of ["description", "photoUrls", "componentItemIds", "componentItems", "componentItemRefs", "custom"]) {
      assert.deepEqual(saved[field], beforeTool[field], field);
    }
    assert.deepEqual(db.data("Test/AIS100"), beforeItem);
    assert.deepEqual([db.data("Machine/AIS42516"), db.data("Machine/MDEST")], beforeMachines);
    assert.equal(db.records.has("Test/AIS_T00001"), false);
    assert.equal(db.records.has(`Test/AIS_T00001/WorkOrderAddHistory/tool-${mode}`), false);
    const writes = db.writes;
    const replay = await service.confirmWorkOrderAdd(input);
    assert.equal(replay.alreadyConfirmed, true);
    assert.deepEqual(replay.slackTargets, result.slackTargets);
    assert.equal(db.writes, writes);
  });
}

test("mixed Tool/item scans stay typed and do not expand Tool component items", async () => {
  const seed = baseSeed();
  seed["Tool/AIS_T00001"] = toolSeed();
  const db = new FakeDb(seed);
  const scans = ["AIS_T00001", "AIS100"];
  const result = await service.confirmWorkOrderAdd({ db, authUser: ACTOR, operationId: "mixed-tool-item",
    workOrderId: "10490", movementMode: "current_at_work_order", scans,
    expectedMembership: await membershipProof(db, scans), nowMs: NOW_MS });
  assert.equal(result.itemCount, 2);
  assert.deepEqual(result.items.map(({ id, kind }) => ({ id, kind })), [{ id: "AIS_T00001", kind: "tool" }, { id: "AIS100", kind: "item" }]);
  assert.deepEqual(result.slackTargets.map(({ id, kind }) => ({ id, kind })), [{ id: "AIS_T00001", kind: "tool" }, { id: "AIS100", kind: "item" }]);
  assert.deepEqual(db.data("Machine/AIS42516").associatedParts.map((ref) => ref.path), ["Test/AIS100"]);
});

test("bin/pallet Slack targets are root summaries while contained item movement and legacy membership proofs stay intact", async () => {
  for (const [code, kind] of [["B7", "bin"], ["P3", "pallet"]]) {
    const seed = baseSeed({ newLocalCurrent: { bin: 7, pallet: 3 } });
    seed[`StorageUnits/${code}`] = { code, kind, name: "Service shipment", description: "Keep sealed", number: kind === "bin" ? 7 : 3 };
    seed["Test/AIS101"] = itemSeed("AIS101", "AIS17182", "SoCal", { newLocalCurrent: { bin: 7, pallet: 3 } });
    const db = new FakeDb(seed);
    const preview = await service.previewWorkOrderAddScan({ db, rawCode: code });
    const oldFingerprint = require("node:crypto").createHash("sha256").update(JSON.stringify({ kind, canonicalId: code, itemIds: ["AIS100", "AIS101"] }), "utf8").digest("hex");
    assert.equal(preview.membershipFingerprint, oldFingerprint);
    assert.equal(preview.preview.name, "Service shipment");
    const result = await service.confirmWorkOrderAdd({ db, authUser: ACTOR, operationId: `summary-${code}`,
      workOrderId: "10490", movementMode: "current_at_work_order", scans: [code],
      expectedMembership: [{ code, fingerprint: oldFingerprint }], nowMs: NOW_MS });
    assert.equal(result.itemCount, 2);
    assert.deepEqual(result.slackTargets, [{ id: code, kind, name: "Service shipment", description: "Keep sealed", itemIds: ["AIS100", "AIS101"] }]);
    assert.equal(db.data("Test/AIS100").selectionHistory.length, 2);
    assert.equal(db.data("Test/AIS101").selectionHistory.length, 2);
    assert.deepEqual(db.data(`StorageUnits/${code}`), seed[`StorageUnits/${code}`]);
    assert.deepEqual(db.data(`InventoryWorkOrderAddOperations/summary-${code}`).result.slackTargets, result.slackTargets);
  }
});

test("unknown, deleted, conflicting and malformed Tool scans fail closed before any write", async () => {
  for (const [code, data, expectedCode] of [["AIS_T00001", undefined, "scan_unknown"],
    ["AIS_T00001", toolSeed({ deleted: true }), "tool_unavailable"],
    ["AIS_T00001", toolSeed({ isDeleted: true }), "tool_unavailable"],
    ["AIS_T00001", toolSeed({ isArchived: true }), "tool_unavailable"],
    ["AIS_T00001", toolSeed({ localSN: "AIS77777" }), "tool_identity_conflict"],
    ["AIS_T00000", undefined, "scan_invalid"],
    ["https://evil.test/NewSearch/Tools/AIS_T00001", toolSeed(), "scan_invalid"]]) {
    const seed = baseSeed();
    seed["Test/AIS_T00001"] = itemSeed("AIS_T00001", "AIS17182", "Incorrect item namespace");
    if (data) seed["Tool/AIS_T00001"] = data;
    const db = new FakeDb(seed);
    await assert.rejects(service.previewWorkOrderAddScan({ db, rawCode: code }), (error) => error.code === expectedCode);
    assert.equal(db.writes, 0);
  }
});

test("cross-kind IDs cannot collide in movement or Slack receipt identity", async () => {
  const seed = baseSeed();
  seed["Tool/AIS_T00001"] = toolSeed();
  seed["StorageUnits/B7"] = { code: "B7", kind: "bin", number: 7 };
  seed["Test/AIS_T00001"] = itemSeed("AIS_T00001", "AIS17182", "Legacy invalid ID");
  const db = new FakeDb(seed);
  await assert.rejects(service.resolveScanItems({ get: (reference) => reference.get() }, db, ["AIS_T00001", "B7"]), (error) => error.code === "scan_identity_conflict");
  assert.equal(db.writes, 0);
});

test("empty containers still reject movement and do not become Slack-only sends", async () => {
  const seed = baseSeed({ newLocalCurrent: {} });
  seed["StorageUnits/B8"] = { code: "B8", kind: "bin", number: 8 };
  const db = new FakeDb(seed);
  await assert.rejects(service.previewWorkOrderAddScan({ db, rawCode: "B8" }), (error) => error.code === "empty_storage_unit");
  assert.equal(db.writes, 0);
});
