const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const babel = require("@babel/core");

function loadProjectModule(relativePath) {
  const filename = path.join(__dirname, "..", relativePath);
  const source = fs.readFileSync(filename, "utf8");
  const transformed = babel.transformSync(source, {
    babelrc: false,
    configFile: false,
    filename,
    plugins: ["@babel/plugin-transform-modules-commonjs"],
  }).code;
  const module = { exports: {} };
  const localRequire = (request) => request === "./itemFormShared"
    ? loadProjectModule("utils/itemFormShared.js")
    : require(request.startsWith(".") ? path.resolve(path.dirname(filename), request) : request);
  new Function("require", "module", "exports", transformed)(localRequire, module, module.exports);
  return module.exports;
}

const {
  canonicalizeAssociatedPartsForItem,
  buildMachineDetailHydrationSeed,
  commitItemWithMachineBacklinks,
  createMachineDetailHydrationState,
  findMachineDetailRequestBranch,
  summarizeMachineDetailHydration,
} = loadProjectModule("utils/warehouseAssociations.js");

class FakeDocumentReference {
  constructor(db, collectionName, id) {
    this.firestore = db;
    this.collectionName = collectionName;
    this.id = id;
    this.path = `${collectionName}/${id}`;
  }

  isEqual(other) {
    return Boolean(other && other.path === this.path);
  }
}

function cloneValue(value) {
  if (value instanceof FakeDocumentReference) return value;
  if (Array.isArray(value)) return value.map(cloneValue);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, nested]) => [key, cloneValue(nested)])
  );
}

class FakeFirestore {
  constructor(initialDocuments = {}) {
    this.documents = new Map(
      Object.entries(initialDocuments).map(([documentPath, data]) => [
        documentPath,
        cloneValue(data),
      ])
    );
    this.references = new Map();
    this.events = [];
  }

  collection(collectionName) {
    return {
      doc: (id) => {
        const key = `${collectionName}/${id}`;
        if (!this.references.has(key)) {
          this.references.set(key, new FakeDocumentReference(this, collectionName, id));
        }
        return this.references.get(key);
      },
    };
  }

  snapshot(ref) {
    const exists = this.documents.has(ref.path);
    return {
      exists,
      ref,
      data: () => (exists ? cloneValue(this.documents.get(ref.path)) : undefined),
    };
  }

  async runTransaction(callback) {
    const writes = [];
    const transaction = {
      get: async (ref) => {
        this.events.push(`get:${ref.path}`);
        return this.snapshot(ref);
      },
      set: (ref, data, options = {}) => {
        this.events.push(`set:${ref.path}`);
        writes.push({ type: "set", ref, data: cloneValue(data), options });
      },
      update: (ref, data) => {
        this.events.push(`update:${ref.path}`);
        writes.push({ type: "update", ref, data: cloneValue(data) });
      },
      delete: (ref) => {
        this.events.push(`delete:${ref.path}`);
        writes.push({ type: "delete", ref });
      },
    };
    const result = await callback(transaction);
    for (const write of writes) {
      if (write.type === "delete") {
        this.documents.delete(write.ref.path);
        continue;
      }
      const existing = this.documents.get(write.ref.path) || {};
      if (write.type === "update" || write.options?.merge) {
        this.documents.set(write.ref.path, { ...existing, ...cloneValue(write.data) });
      } else {
        this.documents.set(write.ref.path, cloneValue(write.data));
      }
    }
    return result;
  }

  data(documentPath) {
    return this.documents.get(documentPath);
  }
}

function assertAllReadsPrecedeWrites(events) {
  const firstWrite = events.findIndex((event) => !event.startsWith("get:"));
  const lastRead = events.reduce(
    (last, event, index) => (event.startsWith("get:") ? index : last),
    -1
  );
  assert.ok(firstWrite >= 0, `expected a write in ${events.join(", ")}`);
  assert.ok(lastRead < firstWrite, `all reads must precede writes: ${events.join(", ")}`);
}

test("bare numeric create uses the canonical AIS path and aliases before any machine or item write", async () => {
  const db = new FakeFirestore({ "Machine/M1": { associatedParts: [] } });
  const result = await commitItemWithMachineBacklinks({ db, partId: "33551",
    itemData: { name: "test", localSN: "33551", local_sn: "33551" }, nextMachineIds: ["M1"] });
  assert.equal(result.partId, "AIS33551");
  assert.equal(db.data("Test/33551"), undefined);
  assert.equal(db.data("Test/AIS33551").localSN, "AIS33551");
  assert.equal(db.data("Test/AIS33551").local_sn, "AIS33551");
  assert.equal(db.data("Machine/M1").associatedParts[0].path, "Test/AIS33551");
  assert.ok(db.events.includes("get:Test/33551"));
  assert.ok(db.events.includes("get:ArchivedItemIds/AIS33551"));
  assertAllReadsPrecedeWrites(db.events);
});

for (const existingId of ["AIS33551", "33551", "ais33551", "AIS-33551", "ais_33551"]) {
  test(`create and rename reject existing logical AIS owner ${existingId} without changing either item`, async () => {
    for (const previousPartId of [undefined, "OLD"]) {
      const original = { name: "Original", history: ["preserve"] };
      const db = new FakeFirestore({ [`Test/${existingId}`]: original, "Test/OLD": { name: "Source" } });
      await assert.rejects(commitItemWithMachineBacklinks({ db, partId: "33551", previousPartId,
        itemData: { name: "test" }, nextMachineIds: [] }), { code: "warehouse-associations/target-exists" });
      assert.deepEqual(db.data(`Test/${existingId}`), original);
      assert.equal(db.data("Test/OLD").name, "Source");
      assert.ok(db.events.every((entry) => entry.startsWith("get:")));
    }
  });
}

test("archive reservations are rechecked atomically even if a stale preflight allowed the ID", async () => {
  for (const retiredId of ["AIS33551", "33551", "ais-33551"]) {
    const db = new FakeFirestore({ [`ArchivedItemIds/${retiredId}`]: { state: "archived" } });
    await assert.rejects(commitItemWithMachineBacklinks({ db, partId: "33551", itemData: { name: "test" }, nextMachineIds: [] }),
      { code: "warehouse-associations/item-archived" });
    assert.equal(db.data("Test/AIS33551"), undefined);
    assert.ok(db.events.every((entry) => entry.startsWith("get:")));
  }
});

test("legacy numeric edits remain on their old path and never overwrite the canonical original", async () => {
  const original = { name: "Original", localSN: "AIS33551", saveHistory: [{ savedAt: "2026-09-30", itemName: "Original" }] };
  const db = new FakeFirestore({ "Test/AIS33551": original, "Test/33551": { name: "test", localSN: "33551" } });
  const result = await commitItemWithMachineBacklinks({ db, partId: "33551", previousPartId: "33551",
    itemData: { name: "test edited", localSN: "33551" }, nextMachineIds: [] });
  assert.equal(result.operation, "update");
  assert.equal(result.partId, "33551");
  assert.deepEqual(db.data("Test/AIS33551"), original);
  assert.equal(db.data("Test/33551").name, "test edited");
  assert.equal(db.data("ItemRenames/33551"), undefined);
});

test("archiving a malformed shadow ID does not block an ordinary edit of the original canonical item", async () => {
  const db = new FakeFirestore({ "Test/AIS33551": { name: "Original" }, "ArchivedItemIds/33551": { state: "archived" } });
  await commitItemWithMachineBacklinks({ db, partId: "AIS33551", previousPartId: "AIS33551",
    itemData: { name: "Original edited" }, nextMachineIds: [] });
  assert.equal(db.data("Test/AIS33551").name, "Original edited");
});

test("a legitimate numeric legacy rename keeps the immutable historical retirement receipt format", async () => {
  const source = { name: "Legacy", localSN: "33551", local_sn: "33551" };
  const db = new FakeFirestore({ "Test/33551": source });
  await commitItemWithMachineBacklinks({ db, partId: "33552", previousPartId: "33551",
    itemData: { name: "Renamed" }, nextMachineIds: [] });
  assert.equal(db.data("Test/33551"), undefined);
  assert.equal(db.data("Test/AIS33552").localSN, "AIS33552");
  assert.deepEqual(db.data("ItemRenames/33551").retiredIds, ["33551"]);
  assert.deepEqual(db.data("ItemRenames/33551").beforeData, source);
  assert.equal(db.data("ArchivedItemIds/AIS33551"), undefined);
  await assert.rejects(commitItemWithMachineBacklinks({ db, partId: "AIS33551", itemData: { name: "Reuse" }, nextMachineIds: [] }),
    { code: "warehouse-associations/item-archived" });
});

test("a transaction retry rechecks the canonical target when another creation wins the race", async () => {
  const db = new FakeFirestore();
  const runTransaction = db.runTransaction.bind(db);
  db.runTransaction = async (callback) => {
    const firstReads = [];
    await callback({ get: async (ref) => { firstReads.push(ref.path); return db.snapshot(ref); }, set() {}, update() {}, delete() {} });
    assert.ok(firstReads.includes("Test/AIS33551"));
    db.documents.set("Test/AIS33551", { name: "Winner" });
    return runTransaction(callback);
  };
  await assert.rejects(commitItemWithMachineBacklinks({ db, partId: "33551", itemData: { name: "Loser" }, nextMachineIds: [] }),
    { code: "warehouse-associations/target-exists" });
  assert.equal(db.data("Test/AIS33551").name, "Winner");
  assert.equal(db.data("Test/33551"), undefined);
});

for (const rename of [false, true]) {
  test(`${rename ? "rename" : "update"} atomically preserves live work orders and concurrent history before replacing current order`, async () => {
    const oldSave = { savedAt: "2026-01-01T00:00:00Z", savedByEmail: "first@example.com" };
    const concurrentSave = { savedAt: "2026-09-30T10:00:00Z", savedByEmail: "other@example.com", itemName: "Concurrent edit" };
    const newSave = { savedAt: "2026-09-30T11:00:00Z", savedByEmail: "me@example.com", itemName: "My edit" };
    const originals = [{ workOrder: "OLD-101", date: "2020-01-01", note: "verbatim" }, { workOrder: "LIVE-202", date: "2026-09-30" }];
    const live = {
      name: "Concurrent edit", localSN: "ITEM", workOrders: originals,
      saveHistory: [oldSave, concurrentSave],
      selectionHistory: [{ savedAt: oldSave.savedAt, workOrder: "OLD-101" }, { savedAt: concurrentSave.savedAt, workOrder: "LIVE-202" }],
    };
    const db = new FakeFirestore({ "Test/ITEM": live });
    const target = rename ? "RENAMED" : "ITEM";
    const result = await commitItemWithMachineBacklinks({
      db, partId: target, previousPartId: "ITEM", nextMachineIds: [],
      itemData: { name: "My edit", workOrders: [{ workOrder: "NEW-303", date: "2026-09-30" }],
        saveHistory: [oldSave, newSave], selectionHistory: [live.selectionHistory[0]],
      },
    });
    const saved = db.data(`Test/${target}`);
    assert.deepEqual(saved.workOrders, [{ workOrder: "NEW-303", date: "2026-09-30" }]);
    assert.deepEqual(saved.workOrderHistory.slice(0, 2).map((record) => record.entry), originals);
    assert.deepEqual(saved.saveHistory, [oldSave, concurrentSave, { ...newSave, workOrder: "NEW-303" }]);
    assert.deepEqual(saved.selectionHistory, live.selectionHistory);
    assert(saved.workOrderTokens.includes("old101"));
    assert(saved.workOrderTokens.includes("live202"));
    assert(saved.workOrderTokens.includes("new303"));
    assert(saved.generalSearchTokens.includes("old101"));
    assert.deepEqual(result.committedAudit, {
      workOrders: saved.workOrders, workOrderHistory: saved.workOrderHistory,
      selectionHistory: saved.selectionHistory, saveHistory: saved.saveHistory,
    });
    assertAllReadsPrecedeWrites(db.events);
    if (rename) {
      assert.equal(db.data("Test/ITEM"), undefined);
      assert.deepEqual(db.data("ItemRenames/ITEM").beforeData, live);
    }
  });
}

test("machine hydration status remains independently attributable to each branch", () => {
  const state = createMachineDetailHydrationState();
  state.from = {
    requestId: 11,
    machineId: "M1",
    pending: true,
    error: "",
  };
  state.current = {
    requestId: 12,
    machineId: "M2",
    pending: false,
    error: "Machine M2 was removed",
  };

  assert.deepEqual(summarizeMachineDetailHydration(state), {
    pending: true,
    error: "Machine M2 was removed",
  });
  assert.equal(findMachineDetailRequestBranch(state, 11), "from");
  assert.equal(findMachineDetailRequestBranch(state, 12), "current");
  assert.equal(findMachineDetailRequestBranch(state, 99), "");
});

test("machine hydration seed keeps both loaded branches and prefers saved From metadata", () => {
  const seeded = buildMachineDetailHydrationSeed({
    fromMachine: { id: "M1", name: "From live", OEM: "Live OEM" },
    currentMachine: { id: "M2", name: "Current live" },
    preferredMachine: { name: "Historical snapshot", OEM: "Saved OEM" },
  });

  assert.deepEqual(seeded.owner, { branch: "from", requestId: 0 });
  assert.equal(seeded.state.from.machineId, "M1");
  assert.equal(seeded.state.from.machineData.id, "M1");
  assert.equal(seeded.state.from.machineData.name, "Historical snapshot");
  assert.equal(seeded.state.from.machineData.OEM, "Saved OEM");
  assert.equal(seeded.state.current.machineId, "M2");
  assert.equal(seeded.state.current.machineData.name, "Current live");
});

test("pure canonicalizer replaces only old/target identities and preserves unrelated entries", () => {
  const db = new FakeFirestore();
  const oldRef = db.collection("Test").doc("OLD");
  const targetRef = db.collection("Test").doc("NEW");
  const unrelatedRef = db.collection("Test").doc("KEEP");
  const opaque = { legacy: "preserve exactly" };
  const current = ["OLD", oldRef, unrelatedRef, opaque, "NEW", targetRef, "KEEP-STRING"];
  const next = canonicalizeAssociatedPartsForItem({
    associatedParts: current,
    previousPartId: "OLD",
    partId: "NEW",
    partRef: targetRef,
    includePart: true,
  });

  assert.deepEqual(next, [unrelatedRef, opaque, "KEEP-STRING", targetRef]);
  assert.strictEqual(next[0], unrelatedRef);
  assert.strictEqual(next[1], opaque);
  assert.strictEqual(next.at(-1), targetRef);
  assert.equal(current.length, 7, "input array is not mutated");
});

test("new create requires an absent target and commits one canonical machine backlink", async () => {
  const db = new FakeFirestore({
    "Machine/M1": { name: "Machine one", associatedParts: ["KEEP", "ITEM1"] },
  });
  const machineRef = db.collection("Machine").doc("M1");
  const result = await commitItemWithMachineBacklinks({
    db,
    partId: "ITEM1",
    itemData: { name: "New item", MachineFrom: machineRef },
    nextMachineIds: ["M1", "M1"],
  });

  assert.equal(result.operation, "create");
  assert.deepEqual(result.nextMachineIds, ["M1"]);
  assert.equal(db.data("Test/ITEM1").name, "New item");
  assert.equal(db.data("Machine/M1").name, "Machine one");
  assert.deepEqual(
    db.data("Machine/M1").associatedParts.map((entry) =>
      typeof entry === "string" ? entry : entry.path
    ),
    ["KEEP", "Test/ITEM1"]
  );
  assertAllReadsPrecedeWrites(db.events);
  assert.deepEqual(db.events.slice(0, 3), ["get:Test/ITEM1", "get:ArchivedItemIds/ITEM1", "get:Machine/M1"]);
});

test("same-ID update reads old and new machines, merges the item, and moves backlinks", async () => {
  const db = new FakeFirestore();
  const itemRef = db.collection("Test").doc("ITEM1");
  const oldMachineRef = db.collection("Machine").doc("M1");
  const newMachineRef = db.collection("Machine").doc("M2");
  db.documents.set("Test/ITEM1", {
    name: "Before",
    preserved: true,
    MachineFrom: oldMachineRef,
  });
  db.documents.set("Machine/M1", {
    name: "Old machine",
    associatedParts: [itemRef, "ITEM1", "KEEP-OLD"],
  });
  db.documents.set("Machine/M2", {
    name: "New machine",
    associatedParts: ["KEEP-NEW", "ITEM1"],
  });

  const result = await commitItemWithMachineBacklinks({
    db,
    partId: "ITEM1",
    previousPartId: "ITEM1",
    itemData: { name: "After", MachineFrom: newMachineRef },
    nextMachineIds: ["M2"],
  });

  assert.equal(result.operation, "update");
  assert.deepEqual(result.addedMachineIds, ["M2"]);
  assert.deepEqual(result.removedMachineIds, ["M1"]);
  assert.equal(db.data("Test/ITEM1").preserved, true, "update payload does not replace item");
  assert.equal(db.data("Test/ITEM1").name, "After");
  assert.deepEqual(db.data("Machine/M1").associatedParts, ["KEEP-OLD"]);
  assert.deepEqual(
    db.data("Machine/M2").associatedParts.map((entry) =>
      typeof entry === "string" ? entry : entry.path
    ),
    ["KEEP-NEW", "Test/ITEM1"]
  );
  assertAllReadsPrecedeWrites(db.events);
  assert.deepEqual(db.events.slice(0, 4), [
    "get:Test/ITEM1",
    "get:ArchivedItemIds/ITEM1",
    "get:Machine/M1",
    "get:Machine/M2",
  ]);
});

test("rename preserves unknown source fields, resets form-owned fields, and atomically replaces backlinks", async () => {
  const db = new FakeFirestore();
  const oldItemRef = db.collection("Test").doc("OLD");
  const targetItemRef = db.collection("Test").doc("NEW");
  const machineRef = db.collection("Machine").doc("M1");
  db.documents.set("Test/OLD", {
    name: "Old item",
    dateCreated: "2020-01-02",
    externalWorkflowField: { keep: true },
    MachineFrom: machineRef,
    CurrentClient: "Client/STALE",
    Parent: oldItemRef,
  });
  db.documents.set("Machine/M1", {
    name: "Machine one",
    associatedParts: ["OLD", oldItemRef, "KEEP", "NEW", targetItemRef],
  });

  const result = await commitItemWithMachineBacklinks({
    db,
    partId: "NEW",
    previousPartId: "OLD",
    itemData: {
      name: "Renamed item",
      MachineFrom: machineRef,
      clientCurrentId: "CLIENT-NEW",
    },
    nextMachineIds: ["M1"],
    renameFieldsToReplace: [
      "MachineFrom",
      "CurrentClient",
      "clientCurrentId",
      "Parent",
    ],
  });

  assert.equal(result.operation, "rename");
  assert.equal(db.documents.has("Test/OLD"), false);
  assert.equal(db.data("Test/NEW").name, "Renamed item");
  assert.equal(db.data("Test/NEW").dateCreated, "2020-01-02");
  assert.deepEqual(db.data("Test/NEW").externalWorkflowField, { keep: true });
  assert.equal(db.data("Test/NEW").CurrentClient, undefined);
  assert.equal(db.data("Test/NEW").Parent, undefined);
  assert.equal(db.data("Test/NEW").clientCurrentId, "CLIENT-NEW");
  assert.deepEqual(db.data("ItemRenames/OLD"), {
    sourceId: "OLD",
    targetId: "NEW",
    beforeData: {
      name: "Old item",
      dateCreated: "2020-01-02",
      externalWorkflowField: { keep: true },
      MachineFrom: machineRef,
      CurrentClient: "Client/STALE",
      Parent: oldItemRef,
    },
    sourcePath: "Test/OLD",
    sourcePhotoPrefix: "Parts/OLD/",
    retiredIds: ["OLD"],
  });
  assert.deepEqual(db.data("ArchivedItemIds/OLD"), { state: "renamed", sourceId: "OLD", itemId: "NEW" });
  assert.equal(db.data("ArchivedItemIds/NEW"), undefined);
  assert.deepEqual(db.data("Test/NEW").photoStoragePrefixes, ["Parts/NEW/", "Parts/OLD/"]);
  assert.deepEqual(
    db.data("Machine/M1").associatedParts.map((entry) =>
      typeof entry === "string" ? entry : entry.path
    ),
    ["KEEP", "Test/NEW"]
  );
  assertAllReadsPrecedeWrites(db.events);
  assert.deepEqual(db.events.slice(0, 3), [
    "get:Test/OLD",
    "get:Test/NEW",
    "get:ItemRenames/OLD",
  ]);
});

test("rename atomically retires old literal and canonical aliases while retaining prior photo folders", async () => {
  const db = new FakeFirestore({
    "Test/AIS00123": {
      name: "Item",
      localSN: "AIS 00123",
      local_sn: "ais-00123",
      aisNumber: "AIS_00456",
      photoStoragePrefixes: ["Parts/ORIGINAL/"],
    },
  });
  await commitItemWithMachineBacklinks({
    db, partId: "AIS00999", previousPartId: "AIS00123",
    itemData: { name: "Renamed" }, nextMachineIds: [],
  });
  const retiredIds = ["AIS 00123", "AIS00123", "AIS00456", "AIS_00456", "ais-00123"];
  assert.deepEqual(db.data("ItemRenames/AIS00123").retiredIds, retiredIds);
  for (const retiredId of retiredIds) {
    assert.deepEqual(db.data(`ArchivedItemIds/${retiredId}`), {
      state: "renamed", sourceId: "AIS00123", itemId: "AIS00999",
    });
  }
  assert.equal(db.data("ArchivedItemIds/AIS00999"), undefined);
  const target = db.data("Test/AIS00999");
  assert.equal(target.localSN, "AIS00999");
  assert.equal(target.local_sn, "AIS00999");
  assert.equal(target.aisNumber, "AIS00999");
  assert.deepEqual(target.photoStoragePrefixes, ["Parts/AIS00999/", "Parts/AIS00123/", "Parts/ORIGINAL/"]);
  assertAllReadsPrecedeWrites(db.events);
});

test("a prior alias matching the new target is updated instead of reserving the target", async () => {
  const db = new FakeFirestore({ "Test/OLD": { name: "Old", aisNumber: "AIS00999" } });
  await commitItemWithMachineBacklinks({
    db, partId: "AIS00999", previousPartId: "OLD", itemData: { name: "New" }, nextMachineIds: [],
  });
  assert.deepEqual(db.data("ItemRenames/OLD").retiredIds, ["OLD"]);
  assert.equal(db.data("ArchivedItemIds/AIS00999"), undefined);
});

test("a retry after the rename commit retains its committed identity and old photo folders", async () => {
  const editorDraft = {
    name: "Unsaved title",
    localSN: "NEW",
    local_sn: "OLD",
    aisNumber: "OLD",
    photoStoragePrefixes: ["Parts/ORIGINAL/"],
  };
  const db = new FakeFirestore({
    "Test/OLD": { ...editorDraft, name: "Old title", localSN: "OLD" },
  });
  const committed = await commitItemWithMachineBacklinks({
    db, partId: "NEW", previousPartId: "OLD", itemData: editorDraft, nextMachineIds: [],
  });
  assert.deepEqual(committed.committedIdentity, {
    localSN: "NEW", local_sn: "NEW", aisNumber: "NEW",
    photoStoragePrefixes: ["Parts/NEW/", "Parts/OLD/", "Parts/ORIGINAL/"],
  });
  // A later photo upload may fail without rolling back this transaction. The
  // next save uses the returned identity while preserving the user's draft.
  const retryDraft = { ...editorDraft, ...committed.committedIdentity };
  await commitItemWithMachineBacklinks({
    db, partId: committed.partId, previousPartId: committed.partId,
    itemData: retryDraft, nextMachineIds: [],
  });
  assert.deepEqual(db.data("Test/NEW"), retryDraft);
  assert.equal(db.data("Test/OLD"), undefined);
  assert.equal(db.data("ArchivedItemIds/OLD").itemId, "NEW");
});

for (const conflictCollection of ["ArchivedItemIds", "Test"]) {
  test(`a retired alias occupied in ${conflictCollection} aborts without any mutation`, async () => {
    const source = { name: "Old", localSN: "AIS 00123" };
    const conflict = { name: "Reserved elsewhere" };
    const db = new FakeFirestore({ "Test/OLD": source, [`${conflictCollection}/AIS00123`]: conflict });
    await assert.rejects(commitItemWithMachineBacklinks({
      db, partId: "NEW", previousPartId: "OLD", itemData: { name: "New" }, nextMachineIds: [],
    }), (error) => ["warehouse-associations/retired-identity-conflict", "warehouse-associations/retired-identity-in-use"].includes(error.code));
    assert.deepEqual(db.data("Test/OLD"), source);
    assert.deepEqual(db.data(`${conflictCollection}/AIS00123`), conflict);
    assert.equal(db.data("Test/NEW"), undefined);
    assert.equal(db.data("ItemRenames/OLD"), undefined);
    assert.equal(db.events.every((event) => event.startsWith("get:")), true);
  });
}

test("an alias-only rename cannot retire the new target's own identity", async () => {
  const db = new FakeFirestore({ "Test/AIS00123": { name: "Old" } });
  await assert.rejects(commitItemWithMachineBacklinks({
    db, partId: "ais-00123", previousPartId: "AIS00123", itemData: { name: "New" }, nextMachineIds: [],
  }), (error) => error.code === "warehouse-associations/same-item-identity");
  assert.equal(db.data("Test/AIS00123").name, "Old");
  assert.equal(db.data("Test/ais-00123"), undefined);
  assert.equal(db.events.every((event) => event.startsWith("get:")), true);
});

test("an occupied rename receipt aborts without changing either item or the preserved original", async () => {
  const original = { name: "Current source", externalWorkflowField: { keep: true } };
  const receipt = { sourceId: "OLD", targetId: "EARLIER", beforeData: { name: "Preserved original" } };
  const db = new FakeFirestore({ "Test/OLD": original, "ItemRenames/OLD": receipt });
  await assert.rejects(commitItemWithMachineBacklinks({
    db,
    partId: "NEW",
    previousPartId: "OLD",
    itemData: { name: "New name" },
    nextMachineIds: [],
  }), (error) => error.code === "warehouse-associations/rename-receipt-exists");
  assert.deepEqual(db.data("Test/OLD"), original);
  assert.deepEqual(db.data("ItemRenames/OLD"), receipt);
  assert.equal(db.data("Test/NEW"), undefined);
  assert.equal(db.events.every((event) => event.startsWith("get:")), true);
});

test("ordinary create and update operations do not create rename receipts", async () => {
  const db = new FakeFirestore();
  await commitItemWithMachineBacklinks({
    db, partId: "ITEM", itemData: { name: "Created" }, nextMachineIds: [],
  });
  await commitItemWithMachineBacklinks({
    db, partId: "ITEM", previousPartId: "ITEM", itemData: { name: "Updated" }, nextMachineIds: [],
  });
  assert.equal(db.data("Test/ITEM").name, "Updated");
  assert.equal([...db.documents.keys()].some((key) => key.startsWith("ItemRenames/")), false);
  assert.equal([...db.documents.keys()].some((key) => key.startsWith("ArchivedItemIds/")), false);
});

test("missing newly associated machine aborts the item and all existing machine changes", async () => {
  const db = new FakeFirestore();
  const itemRef = db.collection("Test").doc("ITEM1");
  const oldMachineRef = db.collection("Machine").doc("M1");
  db.documents.set("Test/ITEM1", { name: "Before", MachineFrom: oldMachineRef });
  db.documents.set("Machine/M1", {
    name: "Old machine",
    associatedParts: [itemRef, "ITEM1", "KEEP"],
  });
  const beforeItem = cloneValue(db.data("Test/ITEM1"));
  const beforeMachine = cloneValue(db.data("Machine/M1"));

  await assert.rejects(
    commitItemWithMachineBacklinks({
      db,
      partId: "ITEM1",
      previousPartId: "ITEM1",
      itemData: { name: "Must not commit" },
      nextMachineIds: ["MISSING"],
    }),
    (error) => {
      assert.equal(error.code, "warehouse-associations/machine-missing");
      assert.deepEqual(error.machineIds, ["MISSING"]);
      return true;
    }
  );
  assert.deepEqual(db.data("Test/ITEM1"), beforeItem);
  assert.deepEqual(db.data("Machine/M1"), beforeMachine);
  assert.equal(db.events.some((event) => !event.startsWith("get:")), false);
});

test("create and rename target-exists guards abort without writes", async () => {
  const createDb = new FakeFirestore({ "Test/ITEM1": { name: "Existing" } });
  await assert.rejects(
    commitItemWithMachineBacklinks({
      db: createDb,
      partId: "ITEM1",
      itemData: { name: "Duplicate" },
      nextMachineIds: [],
    }),
    (error) => error.code === "warehouse-associations/target-exists"
  );
  assert.equal(createDb.data("Test/ITEM1").name, "Existing");
  assert.deepEqual(createDb.events, ["get:Test/ITEM1"]);

  const renameDb = new FakeFirestore({
    "Test/OLD": { name: "Old" },
    "Test/NEW": { name: "Occupied" },
  });
  await assert.rejects(
    commitItemWithMachineBacklinks({
      db: renameDb,
      partId: "NEW",
      previousPartId: "OLD",
      itemData: { name: "Must not replace" },
      nextMachineIds: [],
    }),
    (error) => error.code === "warehouse-associations/target-exists"
  );
  assert.equal(renameDb.data("Test/OLD").name, "Old");
  assert.equal(renameDb.data("Test/NEW").name, "Occupied");
  assert.equal(renameDb.events.some((event) => !event.startsWith("get:")), false);
});
