"use strict";
const assert = require("node:assert/strict"), test = require("node:test");
const fs = require("node:fs"), path = require("node:path"), babel = require("@babel/core");
const filename = path.resolve(__dirname, "../lib/ops/workOrders.js");
const code = babel.transformSync(fs.readFileSync(filename, "utf8"), { babelrc: false, configFile: false,
  plugins: ["@babel/plugin-transform-modules-commonjs"] }).code;

function repository(initial = {}, { lookupResult = null, lookupImpl = null } = {}) {
  const rows = new Map(Object.entries({
    "Client/C1": { name: "Ramin", bluefolderCustomerId: "customer1", bluefolderLocationId: "location1" },
    "Machine/M1": { name: "AQ64 CT", clientId: "C1" }, ...initial,
  }));
  let writes = 0, readingAfterWrite = false, transactionDepth = 0, lookupCalls = 0;
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
      transactionDepth++;
      let result;
      try {
        result = await callback({
          get: async (target) => {
            if (pending.length) readingAfterWrite = true;
            if (target.path) return snapshot(target.path);
            const docs = [...rows].filter(([p, data]) => p.startsWith(`${target.collection}/`) &&
              (!target.field || (target.op === "array-contains" ? (data[target.field] || []).includes(target.value) : equal(data[target.field], target.value))))
              .slice(0, target.max).map(([p]) => snapshot(p));
            return { docs };
          },
          set: (target, data) => pending.push([target.path, data]),
          create: (target, data) => { assert(!rows.has(target.path)); pending.push([target.path, data]); },
        });
      } finally {
        transactionDepth--;
      }
      for (const [p, update] of pending) { rows.set(p, { ...rows.get(p), ...update }); writes++; }
      return result;
    },
  };
  const mocks = {
    "../../context/FirebaseAdmin": { adminDb: db },
    "firebase-admin/firestore": { FieldValue: { serverTimestamp: () => "2026-09-24T18:00:00Z", increment: (n) => n }, Timestamp: {} },
    "./companyMemory": {}, "./parts": {},
    "./blueFolderCustomerLookup.cjs": {
      getVerifiedBlueFolderLocation: async (...args) => {
        lookupCalls++;
        assert.equal(transactionDepth, 0, "BlueFolder customer lookup must run outside Firestore transactions");
        if (lookupImpl) return lookupImpl(args, { rows });
        return lookupResult || { ok: false, reason: "bluefolder_customer_lookup_unavailable" };
      },
    },
  };
  const module = { exports: {} };
  new Function("require", "module", "exports", code)((request) => mocks[request] ?? require(
    request.startsWith(".") ? path.resolve(path.dirname(filename), request) : request), module, module.exports);
  return { importWorkOrder: module.exports.importOpsBlueFolderWorkOrder, rows,
    writes: () => writes, readingAfterWrite: () => readingAfterWrite,
    lookupCalls: () => lookupCalls };
}
const payload = { eventType: "work_order.imported", blueFolder: { serviceRequestId: "10664",
  customerId: "customer1", customerLocationId: "location1", equipmentIds: ["equipment1"], equipmentNames: ["AQ64 CT"] }, subject: "Issue" };

test("real import resolves both client and selected machine and is replay-idempotent", async () => {
  const repo = repository();
  const first = await repo.importWorkOrder(payload);
  assert.equal(first.after.clientId, "C1");
  assert.equal(first.after.machineId, "M1");
  assert.equal(first.after.equipmentLinkStatus, "resolved");
  assert.equal(first.after.equipmentLinkIssue, "");
  assert.equal(repo.rows.get("OpsWorkOrders/10664").machineRef.path, "Machine/M1");
  const second = await repo.importWorkOrder(payload);
  assert.equal(second.idempotentReplay, true);
  assert.equal(second.after.equipmentLinkStatus, "resolved");
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
    const result = await repo.importWorkOrder(payload);
    for (const [key, value] of Object.entries(selected)) assert.equal(repo.rows.get("OpsWorkOrders/10664")[key], value);
    if (selected.trailerId) assert.equal(repo.rows.get("OpsWorkOrders/10664").machineId, undefined);
    assert.equal(result.after.equipmentLinkStatus, "manual");
    assert.equal(result.after.equipmentLinkIssue, "");
  }
});
test("a newly resolved site is suppressed when an existing manual machine belongs elsewhere", async () => {
  const original = { machineId: "M2", machineRef: { path: "Machine/M2", id: "M2" },
    selectionHistory: [{ preserved: true }] };
  const repo = repository({ "Machine/M2": { name: "Manual scanner", clientId: "C2" },
    "OpsWorkOrders/10664": original });
  const result = await repo.importWorkOrder(payload);
  const saved = repo.rows.get("OpsWorkOrders/10664");
  assert.equal(saved.clientId, undefined);
  assert.equal(saved.machineId, "M2");
  assert.deepEqual(saved.machineRef, original.machineRef);
  assert.deepEqual(saved.selectionHistory, original.selectionHistory);
  assert.equal(result.after.equipmentLinkStatus, "site_unresolved");
  assert.equal(result.after.equipmentLinkIssue, "existing_machine_client_mismatch");
});
test("a missing client is safely healed when the preserved manual machine has an exact typed site relation", async () => {
  const original = { machineId: "M1", machineRef: { path: "Machine/M1", id: "M1" },
    selectionHistory: [{ preserved: true }] };
  const repo = repository({ "OpsWorkOrders/10664": original });
  const result = await repo.importWorkOrder(payload);
  const saved = repo.rows.get("OpsWorkOrders/10664");
  assert.equal(saved.clientId, "C1");
  assert.equal(saved.machineId, "M1");
  assert.deepEqual(saved.machineRef, original.machineRef);
  assert.deepEqual(saved.selectionHistory, original.selectionHistory);
  assert.equal(result.after.equipmentLinkStatus, "manual");
});
test("client healing retains previously imported equipment when BlueFolder omits equipment fields", async () => {
  const oldEquipment = { bluefolderEquipmentIds: ["old-equipment"], bluefolderEquipmentNames: ["Old scanner"] };
  const repo = repository({ "OpsWorkOrders/10664": { machineId: "M1", ...oldEquipment } });
  await repo.importWorkOrder({ blueFolder: { serviceRequestId: "10664", customerId: "customer1",
    customerLocationId: "location1" } });
  const saved = repo.rows.get("OpsWorkOrders/10664");
  assert.equal(saved.clientId, "C1");
  assert.equal(saved.machineId, "M1");
  assert.deepEqual(saved.bluefolderEquipmentIds, oldEquipment.bluefolderEquipmentIds);
  assert.deepEqual(saved.bluefolderEquipmentNames, oldEquipment.bluefolderEquipmentNames);
});
test("an existing client and manual asset are never rebound by a different incoming site", async () => {
  const repo = repository({ "Client/C2": { name: "Other site", bluefolderCustomerId: "customer2",
    bluefolderLocationId: "location2" }, "Machine/M2": { clientId: "C2" },
    "OpsWorkOrders/10664": { clientId: "C2", machineId: "M2" } });
  await repo.importWorkOrder(payload);
  const saved = repo.rows.get("OpsWorkOrders/10664");
  assert.equal(saved.clientId, "C2");
  assert.equal(saved.machineId, "M2");
});
test("a typed matching client reference can fill its missing client ID", async () => {
  const repo = repository({ "OpsWorkOrders/10664": { clientRef: { path: "Client/C1", id: "C1" } } });
  const result = await repo.importWorkOrder(payload);
  assert.equal(repo.rows.get("OpsWorkOrders/10664").clientId, "C1");
  assert.equal(repo.rows.get("OpsWorkOrders/10664").clientRef.path, "Client/C1");
  assert.notEqual(result.after.equipmentLinkStatus, "site_unresolved");
});
test("a conflicting or malformed existing client reference is never overwritten by site healing", async () => {
  for (const clientRef of [
    { path: "Client/C2", id: "C2" },
    { path: "Machine/C1", id: "C1" },
    { path: "Client/C1/history/H1" },
  ]) {
    const repo = repository({ "OpsWorkOrders/10664": { clientRef } });
    const result = await repo.importWorkOrder(payload);
    const saved = repo.rows.get("OpsWorkOrders/10664");
    assert.equal(saved.clientId, undefined);
    assert.deepEqual(saved.clientRef, clientRef);
    assert.equal(result.after.equipmentLinkStatus, "site_unresolved");
    assert.match(result.after.equipmentLinkIssue, /^existing_client_(?:mismatch|identity_conflict)$/);
  }
});
test("typed work-order asset IDs and refs must agree before a missing client can be healed", async () => {
  for (const existing of [
    { machineId: "M1", machineRef: { path: "Machine/M2", id: "M2" } },
    { trailerId: "T1", trailerRef: { path: "Trailers/T2", id: "T2" } },
    { machineRef: { path: "Trailers/M1", id: "M1" } },
  ]) {
    const repo = repository({ "OpsWorkOrders/10664": existing });
    const result = await repo.importWorkOrder(payload);
    assert.equal(repo.rows.get("OpsWorkOrders/10664").clientId, undefined);
    assert.equal(result.after.equipmentLinkStatus, "site_unresolved");
    assert.match(result.after.equipmentLinkIssue, /^existing_(machine|trailer)_identity_conflict$/);
  }
});
test("a matching manual trailer can heal the site without adding a machine", async () => {
  const repo = repository({ "Trailers/T1": { currentClient: { path: "Client/C1", id: "C1" } },
    "OpsWorkOrders/10664": { trailerId: "T1", trailerRef: { path: "Trailers/T1", id: "T1" } } });
  const result = await repo.importWorkOrder(payload);
  const saved = repo.rows.get("OpsWorkOrders/10664");
  assert.equal(saved.clientId, "C1");
  assert.equal(saved.trailerId, "T1");
  assert.equal(saved.machineId, undefined);
  assert.equal(result.after.equipmentLinkStatus, "manual");
});
test("a declared counterpart is verified but not added to a partial manual work-order link", async () => {
  const machineRepo = repository({
    "Machine/M1": { name: "AQ64 CT", clientId: "C1", trailerId: "T1" },
    "Trailers/T1": { currentClientId: "C1", associatedMachineId: "M1" },
    "OpsWorkOrders/10664": { machineId: "M1" },
  });
  await machineRepo.importWorkOrder(payload);
  assert.equal(machineRepo.rows.get("OpsWorkOrders/10664").clientId, "C1");
  assert.equal(machineRepo.rows.get("OpsWorkOrders/10664").trailerId, undefined);

  const trailerRepo = repository({
    "Machine/M1": { name: "AQ64 CT", clientId: "C1", trailerId: "T1" },
    "Trailers/T1": { currentClientId: "C1", associatedMachineId: "M1" },
    "OpsWorkOrders/10664": { trailerId: "T1" },
  });
  await trailerRepo.importWorkOrder(payload);
  assert.equal(trailerRepo.rows.get("OpsWorkOrders/10664").clientId, "C1");
  assert.equal(trailerRepo.rows.get("OpsWorkOrders/10664").machineId, undefined);
});
test("a contradictory declared counterpart suppresses client healing without changing the selected asset", async () => {
  const machineRepo = repository({
    "Machine/M1": { name: "AQ64 CT", clientId: "C1", trailerId: "T1" },
    "Trailers/T1": { currentClientId: "C2", associatedMachineId: "M1" },
    "OpsWorkOrders/10664": { machineId: "M1" },
  });
  const machineResult = await machineRepo.importWorkOrder(payload);
  assert.equal(machineRepo.rows.get("OpsWorkOrders/10664").clientId, undefined);
  assert.equal(machineRepo.rows.get("OpsWorkOrders/10664").machineId, "M1");
  assert.equal(machineResult.after.equipmentLinkIssue, "existing_machine_declared_trailer_client_mismatch");

  const trailerRepo = repository({
    "Machine/M2": { clientId: "C2", trailerId: "T1" },
    "Trailers/T1": { currentClientId: "C1", associatedMachineId: "M2" },
    "OpsWorkOrders/10664": { trailerId: "T1" },
  });
  const trailerResult = await trailerRepo.importWorkOrder(payload);
  assert.equal(trailerRepo.rows.get("OpsWorkOrders/10664").clientId, undefined);
  assert.equal(trailerRepo.rows.get("OpsWorkOrders/10664").trailerId, "T1");
  assert.equal(trailerResult.after.equipmentLinkIssue, "existing_trailer_declared_machine_client_mismatch");
});
test("a previously unmatched idempotent import can resolve after directory mapping is added", async () => {
  const repo = repository();
  repo.rows.delete("Machine/M1");
  const unresolved = await repo.importWorkOrder(payload);
  assert.equal(repo.rows.get("OpsWorkOrders/10664").machineId, undefined);
  assert.equal(unresolved.after.equipmentLinkStatus, "unresolved");
  assert.equal(unresolved.after.equipmentLinkIssue, "bluefolder_equipment_not_mapped");
  repo.rows.set("Machine/M1", { name: "Different display name", clientId: "C1", bluefolderEquipmentId: "equipment1" });
  const next = await repo.importWorkOrder(payload);
  assert.equal(next.idempotentReplay, false);
  assert.equal(next.after.machineId, "M1");
  assert.equal(next.after.equipmentLinkStatus, "resolved");
});
test("import response distinguishes stale automatic evidence from preserved manual assets", async () => {
  const repo = repository({ "OpsWorkOrders/10664": { clientId: "C1", machineId: "M1",
    machineLinkEquipmentIds: ["equipment-old"], bluefolderEquipmentIds: ["equipment-old"] } });
  const result = await repo.importWorkOrder(payload);
  assert.equal(result.after.machineId, "M1");
  assert.equal(result.after.equipmentLinkStatus, "needs_review");
  assert.equal(result.after.equipmentLinkIssue, "bluefolder_equipment_selection_changed");
});
test("an unresolved site remains retryable even when BlueFolder selected no equipment", async () => {
  const repo = repository();
  const result = await repo.importWorkOrder({ eventType: "work_order.imported", subject: "Unknown site",
    blueFolder: { serviceRequestId: "10665", customerId: "missing", customerLocationId: "missing",
      equipmentIds: [], equipmentNames: [] } });
  assert.equal(result.after.clientId, "");
  assert.equal(result.after.equipmentLinkStatus, "site_unresolved");
  assert.equal(result.after.equipmentLinkIssue, "work_order_client_missing");
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

const nestedSite = { bluefolderLocationId: "38577093", name: "Simonmed Imaging - San Clemente",
  addressStreet: "635 Camino de los Mares ste 101 & 102", city: "San Clemente", state: "CA", postalCode: "92673", country: "United States" };
const parentClient = { name: "SimonMed Imaging", bluefolderCustomerId: "34579885", bluefolderLocationId: "HQ",
  location: "Scottsdale HQ", bluefolderLocations: [nestedSite], machines: ["HQ-machine"], history: [{ existing: true }] };
const sitePayload = { eventType: "work_order.imported", subject: "Ship parts", blueFolder: { serviceRequestId: "10673",
  customerId: "34579885", customerLocationId: "38577093", customerLocationName: nestedSite.name } };

test("nested site import atomically creates exact destination, leaves parent untouched and reuses site across orders", async () => {
  const repo = repository({ "Client/PARENT": parentClient });
  const first = await repo.importWorkOrder(sitePayload);
  assert.match(first.after.clientId, /^AIS\d+$/);
  assert.notEqual(first.after.clientId, "PARENT");
  assert.equal(first.after.clientName, nestedSite.name);
  assert.match(first.after.clientLocation, /635 Camino de los Mares/);
  const site = repo.rows.get(`Client/${first.after.clientId}`);
  assert.deepEqual(site.machines, []); assert.equal(site.history, undefined);
  assert.equal(site.bluefolderLocationId, "38577093");
  assert.deepEqual(repo.rows.get("Client/PARENT"), parentClient);
  assert.equal((await repo.importWorkOrder(sitePayload)).idempotentReplay, true);
  assert.equal(repo.writes(), 2);
  const second = await repo.importWorkOrder({ ...sitePayload, blueFolder: { ...sitePayload.blueFolder, serviceRequestId: "10674" } });
  assert.equal(second.after.clientId, first.after.clientId);
  assert.equal(repo.writes(), 3);
  assert.equal(repo.readingAfterWrite(), false);
});

test("existing Slack-first work order gains a verified nested site without losing Slack receipt, assignments or hours", async () => {
  const original = { workflowStatus: "done", status: "completed", slackChannel: "C07EPLKV9JT", slackThreadTs: "1.2",
    dispatchReceipt: { channel: "C07EPLKV9JT", threadTs: "1.2" }, calendarEvents: [{ hours: 3 }],
    workflowStageHistory: [{ stage: "done" }], assignees: [{ id: "U1" }] };
  const repo = repository({ "Client/PARENT": parentClient, "OpsWorkOrders/10673": original });
  await repo.importWorkOrder({ ...sitePayload, existingOnly: true });
  const saved = repo.rows.get("OpsWorkOrders/10673");
  for (const [key, value] of Object.entries(original)) assert.deepEqual(saved[key], value, key);
  assert.notEqual(saved.clientId, "PARENT"); assert(saved.clientId);
  assert.equal(repo.readingAfterWrite(), false);
});

test("a conflicting existing asset suppresses both the nested-site link and materialization", async () => {
  const original = { machineId: "M2", machineRef: { path: "Machine/M2", id: "M2" },
    selectionHistory: [{ preserved: true }] };
  const repo = repository({ "Client/PARENT": parentClient, "Client/C2": { name: "Other site" },
    "Machine/M2": { name: "Manual scanner", clientId: "C2" }, "OpsWorkOrders/10673": original });
  const result = await repo.importWorkOrder({ ...sitePayload, existingOnly: true });
  const saved = repo.rows.get("OpsWorkOrders/10673");
  assert.equal(saved.clientId, undefined);
  assert.equal(saved.machineId, "M2");
  assert.deepEqual(saved.selectionHistory, original.selectionHistory);
  assert.equal([...repo.rows.keys()].filter(p => /^Client\/AIS/.test(p)).length, 0);
  assert.equal(result.after.equipmentLinkStatus, "site_unresolved");
  assert.equal(result.after.equipmentLinkIssue, "existing_machine_client_mismatch");
});

test("a conflicting existing client reference also suppresses nested-site materialization", async () => {
  const original = { clientRef: { path: "Client/MANUAL", id: "MANUAL" }, history: [{ preserved: true }] };
  const repo = repository({ "Client/PARENT": parentClient, "OpsWorkOrders/10673": original });
  const result = await repo.importWorkOrder({ ...sitePayload, existingOnly: true });
  const saved = repo.rows.get("OpsWorkOrders/10673");
  assert.equal(saved.clientId, undefined);
  assert.deepEqual(saved.clientRef, original.clientRef);
  assert.deepEqual(saved.history, original.history);
  assert.equal([...repo.rows.keys()].filter(p => /^Client\/AIS/.test(p)).length, 0);
  assert.equal(result.after.equipmentLinkStatus, "site_unresolved");
  assert.equal(result.after.equipmentLinkIssue, "existing_client_mismatch");
});

test("manually connected work order never creates a nested site or changes destination", async () => {
  const repo = repository({ "Client/PARENT": parentClient, "OpsWorkOrders/10673": { clientId: "manual", clientName: "Manual site" } });
  await repo.importWorkOrder(sitePayload);
  assert.equal(repo.rows.get("OpsWorkOrders/10673").clientId, "manual");
  assert.equal([...repo.rows.keys()].filter(p => /^Client\/AIS/.test(p)).length, 0);
});

const freshLocation = {
  bluefolderLocationId: "fresh-location",
  name: "Fresh Satellite Site",
  addressStreet: "100 Verified Ave",
  city: "Fontana",
  state: "CA",
  postalCode: "92337",
  country: "",
  isPrimary: false,
};
const freshRoot = {
  name: "Fresh Parent Customer",
  bluefolderCustomerId: "fresh-customer",
  bluefolderLocations: [],
  machines: [],
};
const freshPayload = {
  eventType: "work_order.imported",
  subject: "Fresh site intake",
  blueFolder: {
    serviceRequestId: "10680",
    customerId: "fresh-customer",
    customerName: "Fresh Parent Customer",
    customerLocationId: "fresh-location",
    customerLocationName: freshLocation.name,
    addressStreet: freshLocation.addressStreet,
    addressCity: freshLocation.city,
    addressState: freshLocation.state,
    addressPostalCode: freshLocation.postalCode,
    addressCountry: freshLocation.country,
    equipmentIds: [],
    equipmentNames: [],
  },
};
const freshLookupSuccess = {
  ok: true,
  reason: "bluefolder_customer_lookup_verified",
  proof: {
    source: "bluefolder_customers_get",
    customerId: "fresh-customer",
    customerName: "Fresh Parent Customer",
    active: true,
    location: freshLocation,
  },
};

test("fresh nonprimary proof is fetched outside the transaction, creates one isolated leaf, and is not fetched on replay", async () => {
  const repo = repository({ "Client/FRESHROOT": freshRoot }, { lookupResult: freshLookupSuccess });
  const beforeParent = structuredClone(repo.rows.get("Client/FRESHROOT"));
  const first = await repo.importWorkOrder(freshPayload);
  assert.equal(repo.lookupCalls(), 1);
  assert.match(first.after.clientId, /^AIS\d+$/);
  assert.notEqual(first.after.clientId, "FRESHROOT");
  const leaf = repo.rows.get(`Client/${first.after.clientId}`);
  assert.equal(leaf.bluefolderParentClientId, "FRESHROOT");
  assert.equal(leaf.bluefolderSiteSource, "verified_nested_location");
  assert.deepEqual(leaf.machines, []);
  assert.deepEqual(leaf.bluefolderLocations.map((entry) => entry.bluefolderLocationId), ["fresh-location"]);
  assert.deepEqual(repo.rows.get("Client/FRESHROOT"), beforeParent);
  assert.equal(first.after.equipmentLinkStatus, "not_selected");
  const replay = await repo.importWorkOrder(freshPayload);
  assert.equal(replay.idempotentReplay, true);
  assert.equal(replay.after.clientId, first.after.clientId);
  assert.equal(repo.lookupCalls(), 1);
});

test("fresh lookup failure preserves normal metadata intake while leaving Client and associations untouched and retryable", async () => {
  const repo = repository({ "Client/FRESHROOT": freshRoot }, {
    lookupResult: { ok: false, reason: "bluefolder_customer_lookup_timeout" },
  });
  const result = await repo.importWorkOrder(freshPayload);
  assert.equal(repo.lookupCalls(), 1);
  assert.equal(repo.writes(), 1, "Only the ordinary work-order metadata write is allowed");
  assert.equal(repo.rows.get("OpsWorkOrders/10680").subject, freshPayload.subject);
  assert.equal(repo.rows.get("OpsWorkOrders/10680").clientId, undefined);
  assert.equal([...repo.rows.keys()].filter((key) => /^Client\/AIS/.test(key)).length, 0);
  assert.equal(result.after.equipmentLinkStatus, "site_unresolved");
  assert.equal(result.after.equipmentLinkIssue, "bluefolder_customer_lookup_timeout");
});

test("fresh lookup is never attempted for existing or incoming asset/client association evidence", async () => {
  const guardedExisting = [
    { clientRef: { path: "Client/MANUAL", id: "MANUAL" } },
    { machineId: "M1" },
    { machineRef: {} },
    { machineName: "Manual scanner" },
    { trailerId: "T1" },
    { trailerRef: [] },
    { trailerName: "Trailer 1" },
  ];
  for (const existing of guardedExisting) {
    const repo = repository({
      "Client/FRESHROOT": freshRoot,
      "OpsWorkOrders/10680": existing,
    }, { lookupResult: freshLookupSuccess });
    await repo.importWorkOrder({ ...freshPayload, existingOnly: true });
    assert.equal(repo.lookupCalls(), 0, JSON.stringify(existing));
    assert.equal([...repo.rows.keys()].filter((key) => /^Client\/AIS/.test(key)).length, 0);
  }
  for (const incoming of [{ machineName: "Manual scanner" }, { trailerName: "Trailer 1" }, { clientId: "MANUAL" }]) {
    const repo = repository({ "Client/FRESHROOT": freshRoot }, { lookupResult: freshLookupSuccess });
    await repo.importWorkOrder({ ...freshPayload, ...incoming });
    assert.equal(repo.lookupCalls(), 0, JSON.stringify(incoming));
  }
});

test("fresh lookup is skipped for a changed stored source identity and for non-unique customer roots", async () => {
  const changed = repository({
    "Client/FRESHROOT": freshRoot,
    "OpsWorkOrders/10680": { bluefolderCustomerId: "different-customer" },
  }, { lookupResult: freshLookupSuccess });
  await changed.importWorkOrder({ ...freshPayload, existingOnly: true });
  assert.equal(changed.lookupCalls(), 0);
  assert.equal(changed.rows.get("OpsWorkOrders/10680").clientId, undefined);

  const ambiguous = repository({
    "Client/FRESHROOT": freshRoot,
    "Client/FRESHROOT2": { ...freshRoot, name: "Duplicate root" },
  }, { lookupResult: freshLookupSuccess });
  await ambiguous.importWorkOrder(freshPayload);
  assert.equal(ambiguous.lookupCalls(), 0);
  assert.equal(ambiguous.rows.get("OpsWorkOrders/10680").clientId, undefined);
});

test("a concurrent exact site wins over fresh proof without creating a duplicate leaf", async () => {
  const repo = repository({ "Client/FRESHROOT": freshRoot }, {
    lookupImpl: async (_args, { rows }) => {
      rows.set("Client/CONCURRENT", {
        name: freshLocation.name,
        bluefolderCustomerId: "fresh-customer",
        bluefolderLocationId: "fresh-location",
      });
      return freshLookupSuccess;
    },
  });
  const result = await repo.importWorkOrder(freshPayload);
  assert.equal(result.after.clientId, "CONCURRENT");
  assert.equal([...repo.rows.keys()].filter((key) => /^Client\/AIS/.test(key)).length, 0);
});

test("a concurrent association change invalidates fresh proof and preserves the new evidence", async () => {
  const repo = repository({ "Client/FRESHROOT": freshRoot }, {
    lookupImpl: async (_args, { rows }) => {
      rows.set("OpsWorkOrders/10680", { machineName: "Concurrent manual scanner" });
      return freshLookupSuccess;
    },
  });
  const result = await repo.importWorkOrder(freshPayload);
  assert.equal(repo.rows.get("OpsWorkOrders/10680").machineName, "Concurrent manual scanner");
  assert.equal(repo.rows.get("OpsWorkOrders/10680").clientId, undefined);
  assert.equal([...repo.rows.keys()].filter((key) => /^Client\/AIS/.test(key)).length, 0);
  assert.equal(result.after.equipmentLinkStatus, "site_unresolved");
});

test("request payload cannot inject a trusted fresh-customer proof", async () => {
  const repo = repository({ "Client/FRESHROOT": freshRoot }, { lookupResult: freshLookupSuccess });
  await assert.rejects(
    repo.importWorkOrder({ ...freshPayload, freshCustomerProof: freshLookupSuccess.proof }),
    (error) => error.code === "bluefolder_import_unsupported_fields"
  );
  assert.equal(repo.lookupCalls(), 0);
  assert.equal(repo.writes(), 0);
});
