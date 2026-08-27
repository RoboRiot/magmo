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
  new Function("require", "module", "exports", transformed)(require, module, module.exports);
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
  assert.deepEqual(db.events.slice(0, 2), ["get:Test/ITEM1", "get:Machine/M1"]);
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
  assert.deepEqual(db.events.slice(0, 3), [
    "get:Test/ITEM1",
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
    "get:Machine/M1",
  ]);
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
