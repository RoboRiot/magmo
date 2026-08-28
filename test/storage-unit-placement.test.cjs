const assert = require("node:assert/strict");
const test = require("node:test");

const placement = require("../lib/inventory/storageUnitPlacement.cjs");
const scanSessions = require("../lib/inventory/storageUnitScanSessions.cjs");

const DELETE_FIELD = Object.freeze({ __deleteField: true });
const FieldValue = { delete: () => DELETE_FIELD };

function clone(value) {
  return value === undefined ? undefined : structuredClone(value);
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
    this.db.queryReads += 1;
    return this.db.querySnapshot(this);
  }
}

class FakeCollection extends FakeQuery {
  constructor(db, collectionPath) {
    super(db, collectionPath);
    this.path = collectionPath;
  }

  doc(id) {
    if (!id) throw new TypeError("Fake Firestore document IDs cannot be empty.");
    return new FakeReference(this.db, `${this.path}/${id}`);
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
    this.db.referenceReads += 1;
    this.db.readPaths.push(this.path);
    return this.db.snapshot(this);
  }
}

function isImmediateChild(documentPath, collectionPath) {
  const prefix = `${collectionPath}/`;
  return (
    documentPath.startsWith(prefix) &&
    !documentPath.slice(prefix.length).includes("/")
  );
}

function matchesQuery(data, query) {
  if (!query.field) return true;
  const actual = nestedValue(data, query.field);
  if (query.operator === "==") return actual === query.expected;
  if (query.operator === "in") {
    return Array.isArray(query.expected) && query.expected.some((value) => actual === value);
  }
  throw new Error(`Unsupported fake query operator: ${query.operator}`);
}

function mergeDocument(previous, update) {
  const next = clone(previous || {});
  for (const [key, value] of Object.entries(update || {})) {
    if (value && value.__deleteField === true) delete next[key];
    else next[key] = clone(value);
  }
  return next;
}

class FakeDb {
  constructor(seed = {}) {
    this.records = new Map(
      Object.entries(seed).map(([path, value]) => [path, clone(value)])
    );
    this.referenceReads = 0;
    this.queryReads = 0;
    this.readPaths = [];
    this.commits = 0;
    this.committedWrites = 0;
  }

  collection(name) {
    return new FakeCollection(this, name);
  }

  snapshot(reference) {
    return new FakeSnapshot(reference, this.records.get(reference.path));
  }

  querySnapshot(query) {
    const docs = Array.from(this.records.entries())
      .filter(([path, data]) =>
        isImmediateChild(path, query.collectionPath) && matchesQuery(data, query)
      )
      .slice(0, query.max)
      .map(([path, value]) => new FakeSnapshot(new FakeReference(this, path), value));
    return { docs, empty: docs.length === 0, size: docs.length };
  }

  async runTransaction(callback) {
    const writes = [];
    const transaction = {
      get: async (target) => {
        if (target instanceof FakeQuery && !(target instanceof FakeReference)) {
          this.queryReads += 1;
          return this.querySnapshot(target);
        }
        this.referenceReads += 1;
        this.readPaths.push(target.path);
        return this.snapshot(target);
      },
      update: (reference, data) => writes.push({ type: "update", reference, data }),
      set: (reference, data, options = {}) =>
        writes.push({ type: "set", reference, data, options }),
      create: (reference, data) => writes.push({ type: "create", reference, data }),
    };
    const result = await callback(transaction);
    for (const write of writes) {
      const path = write.reference.path;
      const previous = this.records.get(path);
      if (write.type === "create" && previous !== undefined) {
        throw new Error(`Document already exists: ${path}`);
      }
      if (write.type === "update" && previous === undefined) {
        throw new Error(`Document does not exist: ${path}`);
      }
      const next =
        write.type === "update" || write.options?.merge
          ? mergeDocument(previous, write.data)
          : clone(write.data);
      this.records.set(path, next);
    }
    this.commits += 1;
    this.committedWrites += writes.length;
    return result;
  }

  data(path) {
    return clone(this.records.get(path));
  }
}

function unitData(id, overrides = {}) {
  const kind = id.startsWith("B") ? "bin" : "pallet";
  return {
    code: id,
    kind,
    number: Number(id.slice(1)),
    displayNumber: id.slice(1),
    active: true,
    ...overrides,
  };
}

function confirmedLocation(region = "F", letter = "E", number = "14") {
  const warehouseLocation = { region, section: { letter, number } };
  return {
    warehouseLocation,
    locationStatus: "confirmed",
    locationCandidates: [{ warehouseLocation, itemCount: 1 }],
  };
}

function sessionSeed({ sessionId, unitId, eventEntries, itemSeed = {}, unitSeed = {} }) {
  const sessionRefPath = `StorageUnitScanSessions/${sessionId}`;
  const seed = {
    [sessionRefPath]: {
      schemaVersion: 1,
      unitId,
      unitType: unitId.startsWith("B") ? "bin" : "pallet",
      status: "active",
      createdBy: {
        uid: "owner-1",
        email: "owner@advancedimagingparts.com",
      },
      expiresAt: new Date("2026-08-28T00:00:00.000Z"),
    },
    "StorageUnitScanControls/default": {
      activeSessionId: sessionId,
      activeUnitId: unitId,
      status: "active",
    },
    ...unitSeed,
    ...itemSeed,
  };
  const fakeDb = new FakeDb(seed);
  const sessionRef = fakeDb.collection("StorageUnitScanSessions").doc(sessionId);
  for (const entry of eventEntries) {
    const eventRef = scanSessions.storageScanEventRef(sessionRef, entry.eventId);
    fakeDb.records.set(eventRef.path, clone(entry));
  }
  return fakeDb;
}

const OWNER = {
  uid: "owner-1",
  email: "owner@advancedimagingparts.com",
};
const NOW_MS = Date.parse("2026-08-27T12:00:00.000Z");

test("read-only resolver recognizes canonical units and exact normalized item identities", async () => {
  const db = new FakeDb({
    "StorageUnits/B47": unitData("B47"),
    "StorageUnits/P65": unitData("P65"),
    "Test/AIS17704": {
      localSN: "AIS17704",
      local_sn: "AIS17704",
      name: "Pellet",
      pn: ["PX-1"],
    },
  });

  const item = await placement.resolveStorageUnitScan({
    db,
    rawCode: " ais-17704 ",
    targetUnitId: "B47",
  });
  assert.equal(item.status, "resolved");
  assert.equal(item.kind, "item");
  assert.equal(item.itemId, "AIS17704");

  const bin = await placement.resolveStorageUnitScan({
    db,
    rawCode: " b_0047 ",
    targetUnitId: "P65",
  });
  assert.deepEqual(
    { status: bin.status, kind: bin.kind, id: bin.storageUnitId },
    { status: "resolved", kind: "bin", id: "B47" }
  );

  assert.equal(
    (await placement.resolveStorageUnitScan({ db, rawCode: "B47", targetUnitId: "B47" }))
      .status,
    "invalid"
  );
  assert.equal(
    (await placement.resolveStorageUnitScan({ db, rawCode: "P65", targetUnitId: "P65" }))
      .status,
    "invalid"
  );
  assert.equal(
    (await placement.resolveStorageUnitScan({ db, rawCode: "P0", targetUnitId: "P65" }))
      .status,
    "invalid"
  );
  assert.equal(
    (await placement.resolveStorageUnitScan({ db, rawCode: "AIS99999", targetUnitId: "B47" }))
      .status,
    "unknown"
  );
  assert.equal(db.records.size, 3, "scan resolution must remain read-only");
});

test("resolver refuses normalized SKU ambiguity instead of guessing", async () => {
  const db = new FakeDb({
    "StorageUnits/B47": unitData("B47"),
    "Test/AIS100": { localSN: "AIS100" },
    "Test/legacy-copy": { local_sn: "AIS-100" },
  });
  const result = await placement.resolveStorageUnitScan({
    db,
    rawCode: "ais_100",
    targetUnitId: "B47",
  });
  assert.equal(result.status, "ambiguous");
  assert.match(result.message, /cannot be placed safely/i);
});

test("placement semantics preserve unverified coordinates and canonicalize containers", () => {
  const itemData = {
    newLocalCurrent: {
      region: "Z",
      section: { letter: "Q", number: "9" },
      bin: 5,
      pallet: 6,
      legacyNote: "keep me",
    },
  };
  const standaloneBin = placement.buildNextItemPlacement({
    itemData,
    target: {
      id: "B47",
      kind: "bin",
      number: 47,
      data: { locationStatus: "review_required", parentStatus: "none" },
    },
  });
  assert.deepEqual(standaloneBin.after, {
    region: "Z",
    section: { letter: "Q", number: "9" },
    bin: 47,
    pallet: "",
    legacyNote: "keep me",
  });
  assert.equal(standaloneBin.locationVerified, false);
  assert.deepEqual(standaloneBin.previousNewLocalCurrent, itemData.newLocalCurrent);

  const parentedBin = placement.buildNextItemPlacement({
    itemData,
    target: {
      id: "B47",
      kind: "bin",
      number: 47,
      data: {
        ...confirmedLocation("F", "E", "14"),
        parentStatus: "confirmed",
        parentPalletId: "P12",
      },
    },
  });
  assert.equal(parentedBin.after.bin, 47);
  assert.equal(parentedBin.after.pallet, 12);
  assert.equal(parentedBin.after.region, "F");
  assert.deepEqual(parentedBin.after.section, { letter: "E", number: "14" });

  const directPallet = placement.buildNextItemPlacement({
    itemData,
    target: { id: "P65", kind: "pallet", number: 65, data: {} },
  });
  assert.equal(directPallet.after.bin, "");
  assert.equal(directPallet.after.pallet, 65);

  const binOnPallet = placement.buildNextItemPlacement({
    itemData,
    target: { id: "P65", kind: "pallet", number: 65, data: {} },
    sourceBinId: "B47",
  });
  assert.equal(binOnPallet.after.bin, 47);
  assert.equal(binOnPallet.after.pallet, 65);

  const malformedLegacy = placement.buildNextItemPlacement({
    itemData: { newLocalCurrent: "legacy malformed value", region: "KEEP" },
    target: { id: "B47", kind: "bin", number: 47, data: {} },
  });
  assert.equal(malformedLegacy.previousNewLocalCurrent, "legacy malformed value");
  assert.equal(malformedLegacy.after.region, "KEEP");
});

test("plan rejects direct-and-bin membership conflicts in either staging order", () => {
  for (const stagedEntries of [
    [
      { eventId: "direct", kind: "item", itemId: "AIS1" },
      { eventId: "bin", kind: "bin", storageUnitId: "B47" },
    ],
    [
      { eventId: "bin", kind: "bin", storageUnitId: "B47" },
      { eventId: "direct", kind: "item", itemId: "AIS1" },
    ],
  ]) {
    assert.throws(
      () => placement.buildPlacementPlan({
        targetUnit: { id: "P65", data: unitData("P65") },
        stagedEntries,
        directItemsById: new Map([["AIS1", { id: "AIS1", data: {} }]]),
        binItemsById: new Map([["B47", [{ id: "AIS1", data: {} }]]]),
        stagedBinDataById: new Map([["B47", unitData("B47")]]),
      }),
      (error) => error.code === "conflicting_staged_membership"
    );
  }
});

test("plan rejects confirmations above the conservative Firestore write budget", () => {
  const stagedEntries = [];
  const directItemsById = new Map();
  for (let index = 1; index <= 199; index += 1) {
    const itemId = `AIS${index}`;
    stagedEntries.push({ eventId: `event-${index}`, kind: "item", itemId });
    directItemsById.set(itemId, { id: itemId, data: {} });
  }
  assert.throws(
    () =>
      placement.buildPlacementPlan({
        targetUnit: { id: "B47", data: unitData("B47") },
        stagedEntries,
        directItemsById,
        binItemsById: new Map(),
        stagedBinDataById: new Map(),
      }),
    (error) => error.code === "write_limit" && error.details.estimatedWrites === 402
  );
});

test("confirmation preserves unrelated item fields, appends history, owns the lock, and is idempotent", async () => {
  const sessionId = "abcdefghijklmnopqrstuvwx";
  const eventId = "scanner-1:000001";
  const previousCurrent = {
    region: "OLD",
    section: { letter: "A", number: "1" },
    bin: 3,
    pallet: 9,
    legacyEvidence: { recorded: true },
  };
  const db = sessionSeed({
    sessionId,
    unitId: "B65",
    eventEntries: [
      {
        eventId,
        code: "AIS-17704",
        resolution: {
          status: "resolved",
          kind: "item",
          code: "AIS-17704",
          canonicalCode: "AIS17704",
          itemId: "AIS17704",
        },
      },
    ],
    itemSeed: {
      "Test/AIS17704": {
        localSN: "AIS17704",
        name: "Pellet",
        newLocalCurrent: previousCurrent,
        localLocCurrent: "OLD–A1–B3–P9",
        from: { clientId: "FOOTHILL", trailerId: "AIS23" },
        selectionHistory: [{ untouched: true }],
        unrelated: { nested: [1, 2, 3] },
      },
    },
    unitSeed: {
      "StorageUnits/B65": unitData("B65", {
        ...confirmedLocation("F", "E", "14"),
        parentStatus: "none",
        parentPalletId: null,
      }),
    },
  });

  const result = await placement.confirmStorageUnitPlacement({
    db,
    sessionId,
    eventIds: [eventId],
    authUser: OWNER,
    nowMs: NOW_MS,
    FieldValue,
    sessionHelpers: scanSessions,
  });
  assert.equal(result.newlyConfirmed, true);
  assert.equal(result.placedItemCount, 1);

  const item = db.data("Test/AIS17704");
  assert.deepEqual(item.unrelated, { nested: [1, 2, 3] });
  assert.deepEqual(item.from, { clientId: "FOOTHILL", trailerId: "AIS23" });
  assert.deepEqual(item.selectionHistory, [{ untouched: true }]);
  assert.deepEqual(item.newLocalCurrent, {
    region: "F",
    section: { letter: "E", number: "14" },
    bin: 65,
    pallet: "",
    legacyEvidence: { recorded: true },
  });

  const historyPath = `Test/AIS17704/StoragePlacementHistory/${result.confirmationKey}`;
  const history = db.data(historyPath);
  assert.deepEqual(history.beforeNewLocalCurrent, previousCurrent);
  assert.deepEqual(history.afterNewLocalCurrent, item.newLocalCurrent);
  assert.equal(history.locationVerified, true);
  assert.equal(db.data(`StorageUnitScanSessions/${sessionId}`).status, "confirmed");
  assert.equal(db.data("StorageUnitScanControls/default").activeSessionId, null);

  const writeCount = db.committedWrites;
  const retry = await placement.confirmStorageUnitPlacement({
    db,
    sessionId,
    eventIds: [eventId],
    authUser: OWNER,
    nowMs: NOW_MS + 1000,
    FieldValue,
    sessionHelpers: scanSessions,
  });
  assert.equal(retry.alreadyConfirmed, true);
  assert.equal(db.committedWrites, writeCount, "retry must not duplicate placement writes");

  await assert.rejects(
    placement.confirmStorageUnitPlacement({
      db,
      sessionId,
      eventIds: ["scanner-1:different"],
      authUser: OWNER,
      nowMs: NOW_MS + 2000,
      FieldValue,
      sessionHelpers: scanSessions,
    }),
    (error) => error.code === "session_confirmed"
  );
});

test("confirmation rejects a different authenticated owner before reading staged events", async () => {
  const sessionId = "ownercheckabcdefghijklmn";
  const eventId = "scanner-1:owner";
  const db = sessionSeed({
    sessionId,
    unitId: "B47",
    eventEntries: [
      {
        eventId,
        code: "AIS1",
        resolution: { status: "resolved", kind: "item", itemId: "AIS1" },
      },
    ],
    itemSeed: { "Test/AIS1": { localSN: "AIS1" } },
    unitSeed: { "StorageUnits/B47": unitData("B47") },
  });
  await assert.rejects(
    placement.confirmStorageUnitPlacement({
      db,
      sessionId,
      eventIds: [eventId],
      authUser: { uid: "other-user", email: "other@advancedimagingparts.com" },
      nowMs: NOW_MS,
      FieldValue,
      sessionHelpers: scanSessions,
    }),
    (error) => error.code === "session_not_found" && error.statusCode === 404
  );
  assert.equal(db.readPaths.some((path) => path.includes("/Events/")), false);
  assert.equal(db.committedWrites, 0);
});

test("placing a bin on a pallet updates its canonical parent and every contained item", async () => {
  const sessionId = "binmoveabcdefghijklmnop";
  const eventId = "scanner-3:bin47";
  const db = sessionSeed({
    sessionId,
    unitId: "P65",
    eventEntries: [
      {
        eventId,
        code: "b-0047",
        resolution: {
          status: "resolved",
          kind: "bin",
          canonicalCode: "B47",
          storageUnitId: "B47",
        },
      },
    ],
    itemSeed: {
      "Test/AIS1": {
        localSN: "AIS1",
        newLocalCurrent: {
          region: "OLD",
          section: { letter: "A", number: "1" },
          bin: 47,
          pallet: 9,
        },
      },
      "Test/AIS2": {
        localSN: "AIS2",
        region: "OLD",
        section: { letter: "A", number: "2" },
        bin: "47",
        pallet: "9",
      },
    },
    unitSeed: {
      "StorageUnits/P65": unitData("P65", confirmedLocation("F", "E", "14")),
      "StorageUnits/B47": unitData("B47", {
        parentPalletId: "P9",
        parentStatus: "confirmed",
        parentCandidates: [{ parentPalletId: "P9", itemCount: 2 }],
        warehouseLocation: {
          region: "OLD",
          section: { letter: "A", number: "1" },
        },
        locationStatus: "confirmed",
        locationCandidates: [
          {
            warehouseLocation: {
              region: "OLD",
              section: { letter: "A", number: "1" },
            },
            itemCount: 2,
          },
        ],
        reviewRequired: true,
        reviewReasons: ["conflicting_parent_pallets", "manual_note"],
      }),
    },
  });

  const result = await placement.confirmStorageUnitPlacement({
    db,
    sessionId,
    eventIds: [eventId],
    authUser: OWNER,
    nowMs: NOW_MS,
    FieldValue,
    sessionHelpers: scanSessions,
  });
  assert.equal(result.placedBinCount, 1);
  assert.equal(result.placedItemCount, 2);
  for (const itemId of ["AIS1", "AIS2"]) {
    const current = db.data(`Test/${itemId}`).newLocalCurrent;
    assert.equal(current.bin, 47);
    assert.equal(current.pallet, 65);
    assert.equal(current.region, "F");
    assert.deepEqual(current.section, { letter: "E", number: "14" });
  }

  const bin = db.data("StorageUnits/B47");
  assert.equal(bin.parentPalletId, "P65");
  assert.equal(bin.parentStatus, "confirmed");
  assert.deepEqual(bin.parentCandidates, [{ parentPalletId: "P65", itemCount: 2 }]);
  assert.deepEqual(bin.warehouseLocation, {
    region: "F",
    section: { letter: "E", number: "14" },
  });
  assert.deepEqual(bin.reviewReasons, ["manual_note"]);
  assert.equal(bin.reviewRequired, true);
  assert.equal(db.queryReads, 3, "bin membership is read from the three legacy-compatible fields");
});

test("multi-item confirmation revalidates one canonical item read per SKU and performs no alias queries", async () => {
  const sessionId = "multireadabcdefghijklmn";
  const events = [];
  const itemSeed = {};
  for (let index = 1; index <= 20; index += 1) {
    const itemId = `AIS${20000 + index}`;
    events.push({
      eventId: `scanner-2:${index}`,
      code: index % 2 ? itemId : `AIS-${20000 + index}`,
      resolution: {
        status: "resolved",
        kind: "item",
        itemId,
        canonicalCode: itemId,
      },
    });
    itemSeed[`Test/${itemId}`] = { localSN: itemId, keep: index };
  }
  const db = sessionSeed({
    sessionId,
    unitId: "B47",
    eventEntries: events,
    itemSeed,
    unitSeed: { "StorageUnits/B47": unitData("B47") },
  });

  const result = await placement.confirmStorageUnitPlacement({
    db,
    sessionId,
    eventIds: events.map((entry) => entry.eventId),
    authUser: OWNER,
    nowMs: NOW_MS,
    FieldValue,
    sessionHelpers: scanSessions,
  });
  assert.equal(result.placedItemCount, 20);
  assert.equal(db.queryReads, 0, "direct-item confirm must not rerun SKU alias queries");
  for (const itemId of result.itemIds) {
    assert.equal(
      db.readPaths.filter((path) => path === `Test/${itemId}`).length,
      1,
      `${itemId} should be revalidated from its canonical document once`
    );
  }
});
