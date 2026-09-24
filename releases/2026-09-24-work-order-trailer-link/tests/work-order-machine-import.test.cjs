"use strict";
const assert = require("node:assert/strict"), test = require("node:test");
const fs = require("node:fs"), path = require("node:path"), babel = require("@babel/core");
const filename = path.resolve(__dirname, "../lib/ops/workOrders.js");
const code = babel.transformSync(fs.readFileSync(filename, "utf8"), { babelrc: false, configFile: false,
  plugins: ["@babel/plugin-transform-modules-commonjs"] }).code;

function repository(initial = {}) {
  const rows = new Map(Object.entries({
    "Client/C1": { name: "Ramin", bluefolderCustomerId: "customer1", bluefolderLocationId: "location1" },
    "Machine/M1": { name: "AQ64 CT", clientId: "C1" }, ...initial,
  }));
  let writes = 0, readingAfterWrite = false;
  const ref = (value) => ({ path: value, id: value.split("/").at(-1), get: async () => snapshot(value) });
  const snapshot = (value) => ({ ...ref(value), ref: ref(value), exists: rows.has(value), data: () => ({ ...rows.get(value) }) });
  const equal = (a, b) => a?.path && b?.path ? a.path === b.path : a === b;
  const db = {
    collection(collection) {
      const query = (field, op, value, max = Infinity) => ({ collection, field, op, value, max,
        where: (f, o, v) => query(f, o, v), limit: (n) => query(field, op, value, n) });
      return { ...query(), doc: (id) => ref(`${collection}/${id}`) };
    },
    async runTransaction(callback) {
      const pending = [];
      const result = await callback({
        get: async (target) => {
          if (pending.length) readingAfterWrite = true;
          if (target.path) return snapshot(target.path);
          const docs = [...rows].filter(([p, data]) => p.startsWith(`${target.collection}/`) &&
            (target.op === "array-contains" ? (data[target.field] || []).includes(target.value) : equal(data[target.field], target.value)))
            .slice(0, target.max).map(([p]) => snapshot(p));
          return { docs };
        },
        set: (target, data) => pending.push([target.path, data]),
      });
      for (const [p, update] of pending) { rows.set(p, { ...rows.get(p), ...update }); writes++; }
      return result;
    },
  };
  const mocks = {
    "../../context/FirebaseAdmin": { adminDb: db },
    "firebase-admin/firestore": { FieldValue: { serverTimestamp: () => "2026-09-24T18:00:00Z", increment: (n) => n }, Timestamp: {} },
    "./companyMemory": {}, "./parts": {},
  };
  const module = { exports: {} };
  new Function("require", "module", "exports", code)((request) => mocks[request] ?? require(
    request.startsWith(".") ? path.resolve(path.dirname(filename), request) : request), module, module.exports);
  return { importWorkOrder: module.exports.importOpsBlueFolderWorkOrder, rows,
    writes: () => writes, readingAfterWrite: () => readingAfterWrite };
}
const payload = { eventType: "work_order.imported", blueFolder: { serviceRequestId: "10664",
  customerId: "customer1", customerLocationId: "location1", equipmentIds: ["equipment1"], equipmentNames: ["AQ64 CT"] }, subject: "Issue" };

test("real import resolves both client and selected machine and is replay-idempotent", async () => {
  const repo = repository();
  const first = await repo.importWorkOrder(payload);
  assert.equal(first.after.clientId, "C1");
  assert.equal(first.after.machineId, "M1");
  assert.equal(repo.rows.get("OpsWorkOrders/10664").machineRef.path, "Machine/M1");
  const second = await repo.importWorkOrder(payload);
  assert.equal(second.idempotentReplay, true);
  assert.equal(repo.writes(), 1);
  assert.equal(repo.readingAfterWrite(), false);
});
test("equipment-only refresh fills an existing client-linked work order without altering receipts, lifecycle, or history", async () => {
  const stored = { clientId: "C1", subject: "Original", workflowStatus: "closed", status: "completed",
    dispatchReceipt: { slackThreadTs: "1.2" }, selectionHistory: [{ old: true }], assignees: [{ id: "U1" }] };
  const repo = repository({ "OpsWorkOrders/10664": stored });
  await repo.importWorkOrder({ blueFolder: payload.blueFolder });
  const after = repo.rows.get("OpsWorkOrders/10664");
  for (const [key, value] of Object.entries(stored)) assert.deepEqual(after[key], value, key);
  assert.equal(after.machineId, "M1");
});
test("manual machine and trailer selections are never rebound by equipment imports", async () => {
  for (const selected of [{ machineId: "manual" }, { trailerId: "T1" }]) {
    const repo = repository({ "OpsWorkOrders/10664": { clientId: "C1", ...selected } });
    await repo.importWorkOrder(payload);
    for (const [key, value] of Object.entries(selected)) assert.equal(repo.rows.get("OpsWorkOrders/10664")[key], value);
    if (selected.trailerId) assert.equal(repo.rows.get("OpsWorkOrders/10664").machineId, undefined);
  }
});
test("a previously unmatched idempotent import can resolve after directory mapping is added", async () => {
  const repo = repository();
  repo.rows.delete("Machine/M1");
  await repo.importWorkOrder(payload);
  assert.equal(repo.rows.get("OpsWorkOrders/10664").machineId, undefined);
  repo.rows.set("Machine/M1", { name: "Different display name", clientId: "C1", bluefolderEquipmentId: "equipment1" });
  const next = await repo.importWorkOrder(payload);
  assert.equal(next.idempotentReplay, false);
  assert.equal(next.after.machineId, "M1");
});
test("existing-only refresh cannot recreate a deleted or concurrently missing work order", async () => {
  for (const initial of [{}, { "OpsWorkOrders/10664": { deletedAt: "2026-09-24", clientId: "C1" } }]) {
    const repo = repository(initial);
    await assert.rejects(repo.importWorkOrder({ ...payload, existingOnly: true }),
      (error) => ["work_order_deleted", "work_order_not_found"].includes(error.code));
    assert.equal(repo.writes(), 0);
  }
});

test("new work orders link both trailer and selected machine in one transaction and retain first-replay idempotency", async () => {
  const repo = repository({
    "Machine/M1": { name: "AQ64 CT", clientId: "C1", trailerId: "AIS20" },
    "Trailers/AIS20": { name: "Trailer 20", associatedMachine: { path: "Machine/M1", id: "M1" }, currentClientId: "C1" },
  });
  const first = await repo.importWorkOrder(payload);
  assert.equal(first.after.clientId, "C1"); assert.equal(first.after.machineId, "M1"); assert.equal(first.after.trailerId, "AIS20");
  const saved = repo.rows.get("OpsWorkOrders/10664");
  assert.equal(saved.machineRef.path, "Machine/M1"); assert.equal(saved.trailerRef.path, "Trailers/AIS20");
  assert.equal(saved.trailerName, "Trailer 20");
  assert.equal((await repo.importWorkOrder(payload)).idempotentReplay, true);
  assert.equal(repo.writes(), 1); assert.equal(repo.readingAfterWrite(), false);
});
test("reverse trailer links work for every supported typed alias and do not require a forward backlink", async () => {
  for (const field of ["associatedMachine", "associatedMachineId", "machine", "machineId", "currentMachineId"]) {
    for (const value of ["M1", "Machine/M1", "/Machine/M1", { path: "Machine/M1", id: "M1" }]) {
      const repo = repository({ "Trailers/AIS20": { [field]: value, currentClientId: "C1" } });
      await repo.importWorkOrder(payload);
      assert.equal(repo.rows.get("OpsWorkOrders/10664").trailerId, "AIS20", field);
      assert.equal(repo.readingAfterWrite(), false);
    }
  }
});
test("declared missing or conflicting trailer relationships do not save a partial machine-only destination", async () => {
  for (const records of [
    {},
    { "Trailers/AIS20": { associatedMachineId: "M1", currentClientId: "C2" } },
    { "Trailers/AIS20": { associatedMachineId: "M2", currentClientId: "C1" } },
    { "Trailers/AIS20": { associatedMachineId: "M1", currentClientId: "C1", archived: true } },
    { "Trailers/AIS20": { associatedMachineId: "M1", machineId: "M2", currentClientId: "C1" } },
    { "Trailers/AIS20": { associatedMachineId: "M1", currentClientId: "C1" }, "Trailers/AIS21": { associatedMachineId: "M1", currentClientId: "C1" } },
  ]) {
    const repo = repository({ "Machine/M1": { name: "AQ64 CT", clientId: "C1", trailerId: "AIS20" }, ...records });
    await repo.importWorkOrder(payload);
    const saved = repo.rows.get("OpsWorkOrders/10664");
    assert.equal(saved.machineId, undefined); assert.equal(saved.trailerId, undefined);
    assert.deepEqual(saved.bluefolderEquipmentIds, ["equipment1"]);
    assert.equal(repo.readingAfterWrite(), false);
  }
});
test("manual machine or trailer assets stay unchanged even when BlueFolder equipment has a live trailer", async () => {
  for (const selected of [{ machineId: "manual-machine" }, { trailerId: "manual-trailer" }]) {
    const repo = repository({ "OpsWorkOrders/10664": { clientId: "C1", ...selected },
      "Trailers/AIS20": { associatedMachineId: "M1", currentClientId: "C1" } });
    await repo.importWorkOrder(payload);
    const saved = repo.rows.get("OpsWorkOrders/10664");
    assert.equal(saved.machineId, selected.machineId); assert.equal(saved.trailerId, selected.trailerId);
  }
});
