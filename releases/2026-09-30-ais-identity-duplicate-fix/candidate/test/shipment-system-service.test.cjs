"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const shipmentContract = require("../lib/inventory/shipmentSystemContract.cjs");
const {
  ShipmentSystemServiceError,
  addShipmentItems,
  createShipmentSystem,
} = require("../lib/inventory/shipmentSystemService.cjs");

const NOW_MS = Date.parse("2026-09-04T18:30:00.000Z");
const AUTH_USER = {
  uid: "user-shipments",
  email: "Warehouse.User@AdvancedImagingParts.com",
  name: "Warehouse User",
};
const EXTERNAL_CLIENT_ID = "CLIENT-REGIONAL";

class FakeDocumentReference {
  constructor(db, path) {
    this.firestore = db;
    this.path = path;
    this.id = path.split("/").at(-1);
  }

  collection(name) {
    return new FakeCollectionReference(this.firestore, `${this.path}/${name}`);
  }

  isEqual(other) {
    return Boolean(other && other.path === this.path);
  }
}

class FakeCollectionReference {
  constructor(db, path) {
    this.firestore = db;
    this.path = path;
  }

  doc(id) {
    return this.firestore.reference(`${this.path}/${id}`);
  }
}

function cloneValue(value) {
  if (value instanceof FakeDocumentReference) return value;
  if (value instanceof Date) return new Date(value.getTime());
  if (Array.isArray(value)) return value.map(cloneValue);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, nested]) => [key, cloneValue(nested)])
  );
}

class FakeFirestore {
  constructor() {
    this.documents = new Map();
    this.references = new Map();
    this.events = [];
    this.committedWrites = [];
  }

  collection(name) {
    return new FakeCollectionReference(this, name);
  }

  reference(path) {
    if (!this.references.has(path)) {
      this.references.set(path, new FakeDocumentReference(this, path));
    }
    return this.references.get(path);
  }

  seed(path, data) {
    this.documents.set(path, cloneValue(data));
  }

  remove(path) {
    this.documents.delete(path);
  }

  snapshot(ref) {
    const exists = this.documents.has(ref.path);
    return {
      exists,
      id: ref.id,
      ref,
      data: () =>
        exists ? cloneValue(this.documents.get(ref.path)) : undefined,
    };
  }

  async runTransaction(callback) {
    const writes = [];
    const transaction = {
      get: async (ref) => {
        this.events.push(`get:${ref.path}`);
        return this.snapshot(ref);
      },
      create: (ref, data) => {
        this.events.push(`create:${ref.path}`);
        writes.push({ type: "create", ref, data: cloneValue(data) });
      },
      set: (ref, data, options = {}) => {
        this.events.push(`set:${ref.path}`);
        writes.push({ type: "set", ref, data: cloneValue(data), options });
      },
    };

    const result = await callback(transaction);
    for (const write of writes) {
      if (write.type === "create" && this.documents.has(write.ref.path)) {
        const error = new Error(`Document ${write.ref.path} already exists.`);
        error.code = "already-exists";
        throw error;
      }
      const current = this.documents.get(write.ref.path) || {};
      const next =
        write.type === "set" && write.options?.merge
          ? { ...cloneValue(current), ...cloneValue(write.data) }
          : cloneValue(write.data);
      this.documents.set(write.ref.path, next);
      this.committedWrites.push(`${write.type}:${write.ref.path}`);
    }
    return result;
  }

  data(path) {
    const value = this.documents.get(path);
    return value === undefined ? undefined : cloneValue(value);
  }
}

function seedEndpoints(db, { skipWarehouseBacklinks = true } = {}) {
  const externalRef = db.collection("Client").doc(EXTERNAL_CLIENT_ID);
  const warehouseClientRef = db
    .collection("Client")
    .doc(shipmentContract.SOCAL_CLIENT_ID);
  const warehouseMachineRef = db
    .collection("Machine")
    .doc(shipmentContract.SOCAL_INTERIOR_MACHINE_ID);
  const existingMachineRef = db.collection("Machine").doc("AIS69999");

  db.seed(externalRef.path, {
    name: "Regional Medical Center",
    location: "Sacramento, California",
    machines: [existingMachineRef],
  });
  db.seed(warehouseClientRef.path, {
    name: "SoCalWarehouse - Lake Forest",
    location: "Lake Forest, California",
    machines: [warehouseMachineRef],
  });
  db.seed(warehouseMachineRef.path, {
    name: "Interior SoCal",
    client: warehouseClientRef,
    associatedParts: [db.collection("Test").doc("KEEP-WAREHOUSE")],
    skipAssociatedParts: skipWarehouseBacklinks,
  });
  return { externalRef, existingMachineRef, warehouseMachineRef };
}

function referencePaths(values = []) {
  return values.map((value) => value?.path || value);
}

function assertAllReadsPrecedeWrites(events) {
  const firstWrite = events.findIndex((event) => !event.startsWith("get:"));
  const lastRead = events.reduce(
    (index, event, currentIndex) =>
      event.startsWith("get:") ? currentIndex : index,
    -1
  );
  assert.ok(firstWrite >= 0, `expected writes in ${events.join(", ")}`);
  assert.ok(lastRead < firstWrite, `all reads must precede writes: ${events.join(", ")}`);
}

async function createSystem(db, overrides = {}) {
  return createShipmentSystem({
    db,
    authUser: AUTH_USER,
    operationId: "shipment-create-0001",
    name: "Regional MRI delivery",
    direction: "incoming",
    externalClientId: EXTERNAL_CLIENT_ID,
    nowMs: NOW_MS,
    idFactory: () => "AIS70010",
    ...overrides,
  });
}

test("shipment-system creation atomically records canonical routes and client membership", async () => {
  const db = new FakeFirestore();
  const { externalRef, existingMachineRef } = seedEndpoints(db);

  const result = await createSystem(db);

  assert.equal(result.ok, true);
  assert.equal(result.alreadyConfirmed, false);
  assert.equal(result.system.id, "AIS70010");
  assert.equal(result.system.direction, "incoming");
  assert.equal(result.system.from.machineId, "AIS70010");
  assert.equal(
    result.system.current.machineId,
    shipmentContract.SOCAL_INTERIOR_MACHINE_ID
  );

  const stored = db.data("Machine/AIS70010");
  assert.equal(stored.shipmentSystem, true);
  assert.equal(stored.associationSchemaVersion, 2);
  assert.equal(stored.clientFromId, EXTERNAL_CLIENT_ID);
  assert.equal(stored.machineFromId, "AIS70010");
  assert.equal(stored.clientCurrentId, shipmentContract.SOCAL_CLIENT_ID);
  assert.equal(
    stored.machineCurrentId,
    shipmentContract.SOCAL_INTERIOR_MACHINE_ID
  );
  assert.equal(stored.ClientFrom.path, externalRef.path);
  assert.equal(stored.MachineFrom.path, "Machine/AIS70010");
  assert.equal(stored.client.path, externalRef.path);
  assert.deepEqual(stored.associatedParts, []);

  assert.deepEqual(
    referencePaths(db.data(externalRef.path).machines),
    [existingMachineRef.path, "Machine/AIS70010"]
  );
  const receipt = db.data("InventoryShipmentOperations/shipment-create-0001");
  assert.equal(receipt.type, "shipment_system_create");
  assert.equal(receipt.systemId, "AIS70010");
  assert.equal(receipt.createdBy.uid, AUTH_USER.uid);
  assertAllReadsPrecedeWrites(db.events);
});

test("system creation retries AIS collisions and does not alter the colliding machine", async () => {
  const db = new FakeFirestore();
  seedEndpoints(db);
  db.seed("Machine/AIS70010", { name: "Existing scanner", preserved: true });

  const result = await createSystem(db, {
    idFactory: (attempt) => (attempt === 0 ? "AIS70010" : "AIS70011"),
  });

  assert.equal(result.system.id, "AIS70011");
  assert.deepEqual(db.data("Machine/AIS70010"), {
    name: "Existing scanner",
    preserved: true,
  });
  assert.equal(db.data("Machine/AIS70011").shipmentSystem, true);
});

test("replaying a system operation is idempotent and conflicting reuse is rejected", async () => {
  const db = new FakeFirestore();
  seedEndpoints(db);
  const first = await createSystem(db);
  const writesAfterFirst = db.committedWrites.length;

  const replay = await createSystem(db, { idFactory: () => "AIS79999" });
  assert.equal(replay.system.id, first.system.id);
  assert.equal(replay.alreadyConfirmed, true);
  assert.equal(db.committedWrites.length, writesAfterFirst);
  assert.equal(db.data("Machine/AIS79999"), undefined);

  await assert.rejects(
    () => createSystem(db, { name: "A different request" }),
    (error) =>
      error instanceof ShipmentSystemServiceError &&
      error.code === "operation_conflict" &&
      error.statusCode === 409
  );
  assert.equal(db.committedWrites.length, writesAfterFirst);
});

test("adding shipment rows creates individual items, immutable audits, and safe backlinks", async () => {
  const db = new FakeFirestore();
  const { warehouseMachineRef } = seedEndpoints(db);
  await createSystem(db);
  db.events = [];

  const items = [
    {
      name: "Gradient coil",
      description: "Crated replacement coil",
      itemType: "item",
    },
    {
      name: "Wood skid",
      description: "Palletized accessory cartons",
      itemType: "pallet",
    },
  ];
  const result = await addShipmentItems({
    db,
    authUser: AUTH_USER,
    operationId: "shipment-add-0001",
    systemId: "AIS70010",
    items,
    nowMs: NOW_MS,
    idFactory: (_attempt, index) => `AIS7100${index + 1}`,
  });

  assert.equal(result.ok, true);
  assert.equal(result.itemCount, 2);
  assert.equal(result.totalItemCount, 2);
  assert.deepEqual(
    result.items.map((item) => item.shipmentUnitType),
    ["item", "pallet"]
  );

  const first = db.data("Test/AIS71001");
  const second = db.data("Test/AIS71002");
  assert.equal(first.ShipmentSystem.path, "Machine/AIS70010");
  assert.equal(first.MachineFrom.path, "Machine/AIS70010");
  assert.equal(
    first.MachineCurrent.path,
    `Machine/${shipmentContract.SOCAL_INTERIOR_MACHINE_ID}`
  );
  assert.equal(first.movementDateType, "arrival");
  assert.equal(first.shipmentOperationId, "shipment-add-0001");
  assert.equal(first.associationFrom.effectiveAt, "2026-09-04");
  assert.equal(first.associationCurrent.effectiveAt, "2026-09-04");
  assert.equal(first.selectionHistory[0].operationId, "shipment-add-0001");
  assert.equal(first.saveHistory[0].operationId, "shipment-add-0001");
  assert.equal(second.shipmentUnitType, "pallet");
  assert.equal(Object.hasOwn(second, "pallet"), false);
  assert.equal(Object.hasOwn(second.newLocalCurrent, "pallet"), false);
  assert.ok(first.nameTokens.includes("gradient"));
  assert.ok(first.generalSearchTokens.includes("ais71001"));

  for (const id of ["AIS71001", "AIS71002"]) {
    const audit = db.data(
      `Test/${id}/ShipmentHistory/shipment-add-0001`
    );
    assert.equal(audit.type, "shipment_item_registration");
    assert.equal(audit.shipmentSystemId, "AIS70010");
    assert.equal(audit.createdBy.uid, AUTH_USER.uid);
    assert.deepEqual(audit.associationFrom, db.data(`Test/${id}`).associationFrom);
    assert.deepEqual(
      audit.associationCurrent,
      db.data(`Test/${id}`).associationCurrent
    );
  }
  assert.equal(
    db.data("InventoryShipmentOperations/shipment-add-0001").type,
    "shipment_items_add"
  );
  assert.deepEqual(
    referencePaths(db.data("Machine/AIS70010").associatedParts),
    ["Test/AIS71001", "Test/AIS71002"]
  );
  assert.equal(db.data("Machine/AIS70010").shipmentItemCount, 2);
  assert.deepEqual(
    referencePaths(db.data(warehouseMachineRef.path).associatedParts),
    ["Test/KEEP-WAREHOUSE"],
    "the high-volume warehouse machine opts out of complete backlinks"
  );
  assertAllReadsPrecedeWrites(db.events);

  const writesAfterFirst = db.committedWrites.length;
  const replay = await addShipmentItems({
    db,
    authUser: AUTH_USER,
    operationId: "shipment-add-0001",
    systemId: "AIS70010",
    items,
    nowMs: NOW_MS,
    idFactory: (_attempt, index) => `AIS7999${index}`,
  });
  assert.equal(replay.alreadyConfirmed, true);
  assert.equal(replay.totalItemCount, 2);
  assert.equal(db.data("Machine/AIS70010").shipmentItemCount, 2);
  assert.equal(db.committedWrites.length, writesAfterFirst);
});

test("a missing associated machine aborts every item, audit, receipt, and backlink write", async () => {
  const db = new FakeFirestore();
  const { warehouseMachineRef } = seedEndpoints(db);
  await createSystem(db);
  db.remove(warehouseMachineRef.path);
  const writesBefore = db.committedWrites.length;

  await assert.rejects(
    () =>
      addShipmentItems({
        db,
        authUser: AUTH_USER,
        operationId: "shipment-add-missing-machine",
        systemId: "AIS70010",
        items: [{ name: "Cabinet", description: "Accessory cabinet" }],
        nowMs: NOW_MS,
        idFactory: () => "AIS72001",
      }),
    (error) =>
      error instanceof ShipmentSystemServiceError &&
      error.code === "associated_machine_missing" &&
      error.statusCode === 409
  );

  assert.equal(db.data("Test/AIS72001"), undefined);
  assert.equal(
    db.data("Test/AIS72001/ShipmentHistory/shipment-add-missing-machine"),
    undefined
  );
  assert.equal(
    db.data("InventoryShipmentOperations/shipment-add-missing-machine"),
    undefined
  );
  assert.equal(db.data("Machine/AIS70010").shipmentItemCount, 0);
  assert.equal(db.committedWrites.length, writesBefore);
});

test("outgoing systems persist the inverse route and departure fields through item creation", async () => {
  const db = new FakeFirestore();
  seedEndpoints(db);

  const created = await createSystem(db, {
    operationId: "shipment-create-outgoing",
    direction: "outgoing",
    idFactory: () => "AIS73001",
  });
  assert.equal(created.system.from.clientId, shipmentContract.SOCAL_CLIENT_ID);
  assert.equal(
    created.system.from.machineId,
    shipmentContract.SOCAL_INTERIOR_MACHINE_ID
  );
  assert.equal(created.system.current.clientId, EXTERNAL_CLIENT_ID);
  assert.equal(created.system.current.machineId, "AIS73001");

  const result = await addShipmentItems({
    db,
    authUser: AUTH_USER,
    operationId: "shipment-add-outgoing",
    systemId: "AIS73001",
    items: [
      {
        name: "Cryogenic compressor",
        description: "Boxed compressor assembly",
        itemType: "item",
      },
    ],
    nowMs: NOW_MS,
    idFactory: () => "AIS73002",
  });

  assert.equal(result.direction, "outgoing");
  const item = db.data("Test/AIS73002");
  assert.equal(item.clientFromId, shipmentContract.SOCAL_CLIENT_ID);
  assert.equal(
    item.machineFromId,
    shipmentContract.SOCAL_INTERIOR_MACHINE_ID
  );
  assert.equal(item.clientCurrentId, EXTERNAL_CLIENT_ID);
  assert.equal(item.machineCurrentId, "AIS73001");
  assert.equal(item.movementDateType, "departure");
  assert.equal(item.arrival_date, "");
  assert.equal(item.departure_date, "2026-09-04");
  assert.equal(item.status, "Outgoing shipment");
});

test("item creation retries a colliding generated ID without altering the existing item", async () => {
  const db = new FakeFirestore();
  seedEndpoints(db);
  await createSystem(db);
  db.seed("Test/AIS74001", {
    name: "Existing inventory item",
    preserved: true,
  });

  const result = await addShipmentItems({
    db,
    authUser: AUTH_USER,
    operationId: "shipment-add-collision",
    systemId: "AIS70010",
    items: [{ name: "RF cabinet", description: "Crated RF cabinet" }],
    nowMs: NOW_MS,
    idFactory: (attempt) => (attempt === 0 ? "AIS74001" : "AIS74002"),
  });

  assert.deepEqual(result.items.map((item) => item.id), ["AIS74002"]);
  assert.deepEqual(db.data("Test/AIS74001"), {
    name: "Existing inventory item",
    preserved: true,
  });
  assert.equal(db.data("Test/AIS74002").shipmentSystemId, "AIS70010");
  assert.deepEqual(
    db.data("InventoryShipmentOperations/shipment-add-collision").itemIds,
    ["AIS74002"]
  );
});

test("Admin item creation retries archived identities without resurrecting or changing their archives", async () => {
  const db = new FakeFirestore();
  seedEndpoints(db);
  await createSystem(db);
  const reservation = { itemId: "AIS74001", state: "archived" };
  const archive = { state: "archived", itemId: "AIS74001", snapshotCount: 3 };
  db.seed("ArchivedItemIds/AIS74001", reservation);
  db.seed("ItemArchives/AIS74001", archive);

  const result = await addShipmentItems({
    db,
    authUser: AUTH_USER,
    operationId: "shipment-add-archived-collision",
    systemId: "AIS70010",
    items: [{ name: "RF cabinet", description: "Crated RF cabinet" }],
    nowMs: NOW_MS,
    idFactory: (attempt) => (attempt === 0 ? "AIS74001" : "AIS74002"),
  });

  assert.deepEqual(result.items.map((item) => item.id), ["AIS74002"]);
  assert.equal(db.data("Test/AIS74001"), undefined);
  assert.deepEqual(db.data("ArchivedItemIds/AIS74001"), reservation);
  assert.deepEqual(db.data("ItemArchives/AIS74001"), archive);
  assert.equal(db.data("Test/AIS74002").shipmentSystemId, "AIS70010");
  assert.deepEqual(db.data("InventoryShipmentOperations/shipment-add-archived-collision").itemIds, ["AIS74002"]);
});

for (const ownerPath of ["Test/74001", "Test/ais-74001", "ArchivedItemIds/74001"]) {
  test(`Admin item creation protects the legacy identity at ${ownerPath}`, async () => {
    const db = new FakeFirestore();
    seedEndpoints(db);
    await createSystem(db);
    const owner = { name: "Preserved legacy identity", localSN: "74001", preserved: true };
    db.seed(ownerPath, owner);
    db.events.length = 0;
    const result = await addShipmentItems({
      db, authUser: AUTH_USER, operationId: "shipment-add-legacy-collision",
      systemId: "AIS70010", items: [{ name: "Cabinet", description: "Crated cabinet" }],
      nowMs: NOW_MS, idFactory: attempt => attempt === 0 ? "74001" : "74002",
    });
    assert.deepEqual(result.items.map(item => item.id), ["AIS74002"]);
    assert.deepEqual(db.data(ownerPath), owner);
    assert.equal(db.data("Test/AIS74001"), undefined);
    assert.equal(db.data("Test/74002"), undefined);
    assert.equal(db.data("Test/AIS74002").localSN, "AIS74002");
    assertAllReadsPrecedeWrites(db.events);
  });
}

test("an invalid canonical warehouse owner prevents every system-creation write", async () => {
  const db = new FakeFirestore();
  const { externalRef, warehouseMachineRef } = seedEndpoints(db);
  db.seed(warehouseMachineRef.path, {
    name: "Interior SoCal",
    client: db.collection("Client").doc("CLIENT-WRONG-WAREHOUSE"),
  });

  await assert.rejects(
    () => createSystem(db),
    (error) =>
      error instanceof ShipmentSystemServiceError &&
      error.code === "invalid_warehouse_endpoint" &&
      error.statusCode === 409
  );

  assert.equal(db.data("Machine/AIS70010"), undefined);
  assert.equal(
    db.data("InventoryShipmentOperations/shipment-create-0001"),
    undefined
  );
  assert.deepEqual(
    referencePaths(db.data(externalRef.path).machines),
    ["Machine/AIS69999"]
  );
  assert.equal(db.committedWrites.length, 0);
});
