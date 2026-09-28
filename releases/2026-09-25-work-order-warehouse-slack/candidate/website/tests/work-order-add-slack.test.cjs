const test = require("node:test");
const assert = require("node:assert/strict");
const service = require("../lib/inventory/workOrderAddSlack.cjs");
const clone = structuredClone;
const OP = "InventoryWorkOrderAddOperations/op-1";
const RECEIPT = `${OP}/SlackItems/AIS123`;
const ACTOR = { uid: "user-1", email: "user@advancedimagingparts.com" };
const NOW = Date.parse("2026-09-25T21:00:00Z");

class Ref {
  constructor(path) { this.path = path; }
  collection(name) { return new Collection(`${this.path}/${name}`); }
}
class Collection {
  constructor(path) { this.path = path; }
  doc(id) { return new Ref(`${this.path}/${id}`); }
}
class Db {
  constructor(seed) { this.records = Object.fromEntries(Object.entries(seed).map(([key, value]) => [key, clone(value)])); this.writes = []; this.tail = Promise.resolve(); }
  collection(name) { return new Collection(name); }
  runTransaction(callback) {
    const run = this.tail.then(async () => {
      const writes = [];
      const result = await callback({
        get: async (ref) => ({ exists: this.records[ref.path] !== undefined, data: () => clone(this.records[ref.path]) }),
        set: (ref, data, options = {}) => writes.push({ ref, data: clone(data), options }),
      });
      for (const { ref, data, options } of writes) {
        this.records[ref.path] = options.merge ? { ...this.records[ref.path], ...data } : data;
        this.writes.push(ref.path);
      }
      return result;
    });
    this.tail = run.catch(() => {});
    return run;
  }
}
function setup(mode = "current_at_work_order") {
  const associationFrom = { clientId: "WAREHOUSE", machineId: "INTERIOR", trailerId: "", associationType: "machine" };
  const associationCurrent = { clientId: "HOSPITAL", machineId: "SCANNER", trailerId: "", associationType: "machine" };
  const item = { name: "Motor", pn: ["PN1", "PN2"], sn: ["SN1"], trackingNumber: "TRACK1",
    descriptions: [{ date: "2026-01-01", description: "Old" }, { date: "2026-09-25", description: "Saved description" }],
    movementDate: "2026-09-25", departure_date: mode === "current_at_work_order" ? "2026-09-25" : "",
    arrival_date: mode === "from_work_order" ? "2026-09-25" : "",
    associationFrom, associationCurrent, workOrders: [{ workOrder: "10658" }],
    selectionHistory: ["preserve", { action: "work_order_add", operationId: "op-1" }] };
  const audit = { itemId: "AIS123", operationId: "op-1", movementMode: mode, workOrder: { number: "10658" },
    movementDate: item.movementDate, afterConfiguration: { associationFrom, associationCurrent } };
  const operation = { type: "work_order_add_movement", createdBy: ACTOR, movementMode: mode,
    result: { operationId: "op-1", ok: true, completedAt: new Date(NOW).toISOString(), itemCount: 1,
      items: [{ id: "AIS123" }], workOrder: { number: "10658" }, movementMode: mode } };
  const seed = { [OP]: operation, "Test/AIS123": item, "Test/AIS123/WorkOrderAddHistory/op-1": audit };
  const db = new Db(seed);
  const sent = [];
  const sendItem = async (payload, hooks) => {
    sent.push(clone(payload));
    if (!hooks.resumeRow) {
      await hooks.beforeCreate();
      await hooks.onRowCreated({ listId: "L1", rowId: "R1" });
    }
    return { ok: true, warnings: [] };
  };
  const args = { db, authUser: ACTOR, operationId: "op-1", itemId: "AIS123",
    sendItem, now: () => NOW, loadPhotos: async () => ["https://example.test/saved-photo.jpg"] };
  return { db, args, sent, seed };
}

for (const [mode, list] of [["current_at_work_order", "shipping"], ["from_work_order", "receiving"]]) {
  test(`${mode} sends persisted fields to ${list} only after the saved operation exists`, async () => {
    const { args, db, seed, sent } = setup(mode);
    const result = await service.sendConfirmedItemToSlack(args);
    assert.equal(result.status, "sent");
    assert.equal(sent[0].listKey, list);
    assert.equal(sent[0].title, "Motor (AIS123)");
    assert.equal(sent[0].pn_sn, "PN: PN1  SN: SN1");
    assert.equal(sent[0].work_order, "10658");
    assert.equal(sent[0].description, "Saved description");
    assert.equal(sent[0].tracking, "TRACK1");
    assert.equal(sent[0][list === "shipping" ? "shipping_date" : "received_date"], "2026-09-25");
    assert.deepEqual(sent[0].photoUrls, ["https://example.test/saved-photo.jpg"]);
    for (const [path, data] of Object.entries(seed)) assert.deepEqual(db.records[path], data);
    assert(db.writes.every((path) => path === RECEIPT));
    assert.equal((await service.sendConfirmedItemToSlack(args)).alreadySent, true);
    assert.equal(sent.length, 1);
  });
}

test("only confirmed manifest membership and its creator authorize Slack", async () => {
  for (const alter of [
    ({ args }) => { args.authUser = { ...ACTOR, uid: "other" }; },
    ({ args }) => { args.itemId = "AIS999"; },
    ({ db }) => { delete db.records[OP]; },
    ({ db }) => { db.records[OP].result.ok = false; },
    ({ db }) => { db.records[OP].result.itemCount = 2; },
    ({ db }) => { db.records[OP].movementMode = "from_work_order"; },
    ({ db }) => { delete db.records["Test/AIS123/WorkOrderAddHistory/op-1"]; },
  ]) {
    const context = setup(); alter(context);
    await assert.rejects(service.sendConfirmedItemToSlack(context.args));
    assert.equal(context.sent.length, 0);
    assert.equal(context.db.writes.length, 0);
  }
});

test("changed associations, removed work order, archived item or movement date block stale sends", async () => {
  for (const alter of [
    (item) => { item.associationCurrent.machineId = "OTHER"; },
    (item) => { item.workOrders = []; },
    (item) => { item.deletedAt = "today"; },
    (item) => { item.movementDate = "2026-09-26"; },
    (item) => { item.selectionHistory.push({ action: "work_order_add", operationId: "op-2" }); },
  ]) {
    const { db, args, sent } = setup(); alter(db.records["Test/AIS123"]);
    await assert.rejects(service.sendConfirmedItemToSlack(args));
    assert.equal(sent.length, 0);
  }
});

test("concurrent click is leased and cannot create another Slack row", async () => {
  const { args } = setup();
  let resolveEntered, release;
  const entered = new Promise((resolve) => { resolveEntered = resolve; });
  const blocked = new Promise((resolve) => { release = resolve; });
  const sender = args.sendItem;
  args.sendItem = async (...values) => { resolveEntered(); await blocked; return sender(...values); };
  const first = service.sendConfirmedItemToSlack(args);
  await entered;
  assert.equal((await service.sendConfirmedItemToSlack(args)).status, "sending");
  release();
  assert.equal((await first).status, "sent");
});

test("network uncertainty after create started is blocked instead of blindly duplicated", async () => {
  const { args, db } = setup();
  let calls = 0;
  args.sendItem = async (_body, hooks) => { calls++; await hooks.beforeCreate(); throw new Error("timeout"); };
  assert.equal((await service.sendConfirmedItemToSlack(args)).status, "uncertain");
  assert.equal(db.records[RECEIPT].createStarted, true);
  assert.equal((await service.sendConfirmedItemToSlack(args)).status, "uncertain");
  assert.equal(calls, 1);
});

test("explicit Slack rejection permits retry; fatal/unknown responses do not", async () => {
  for (const code of ["ratelimited", "invalid_auth", "fatal_error", "internal_error", "unknown"]) {
    const { args } = setup();
    args.sendItem = async (_body, hooks) => {
      await hooks.beforeCreate(); await hooks.onCreateRejected(code); return { ok: false, error: code };
    };
    const result = await service.sendConfirmedItemToSlack(args);
    assert.equal(result.status, service.definitiveCreateRejection(code) ? "failed" : "uncertain");
  }
});

test("a partial send resumes its saved row and payload without saving inventory again", async () => {
  const { args, db, seed } = setup();
  let creates = 0;
  args.sendItem = async (_body, hooks) => {
    if (!hooks.resumeRow) { creates++; await hooks.beforeCreate(); await hooks.onRowCreated({ listId: "L1", rowId: "R1" }); }
    return { ok: false, error: "update_failed" };
  };
  assert.equal((await service.sendConfirmedItemToSlack(args)).status, "failed");
  db.records["Test/AIS123"].name = "Later unrelated edit";
  args.sendItem = async (body, hooks) => {
    assert.deepEqual(hooks.resumeRow, { listId: "L1", rowId: "R1" });
    assert.equal(body.title, "Motor (AIS123)");
    return { ok: true, warnings: ["Some item photos could not be attached to Slack."] };
  };
  const result = await service.sendConfirmedItemToSlack(args);
  assert.equal(result.status, "sent"); assert.equal(result.warnings.length, 1); assert.equal(creates, 1);
  assert.deepEqual(db.records[OP], seed[OP]);
  assert(db.writes.every((path) => path === RECEIPT));
});

test("expired in-flight create with no row remains uncertain; pre-create lease may recover", async () => {
  for (const createStarted of [true, false]) {
    const { args, db, sent } = setup();
    db.records[RECEIPT] = { status: "sending", leaseUntil: NOW - 1, createStarted, listKey: "shipping" };
    assert.equal((await service.sendConfirmedItemToSlack(args)).status, createStarted ? "uncertain" : "sent");
    assert.equal(sent.length, createStarted ? 0 : 1);
  }
});

test("photo failures occur before any Slack creation and are retryable", async () => {
  const { args, sent } = setup();
  args.loadPhotos = async () => { throw new Error("storage offline"); };
  assert.equal((await service.sendConfirmedItemToSlack(args)).status, "failed");
  assert.equal(sent.length, 0);
});

test("a lost completion response cannot downgrade a durably sent receipt", async () => {
  const { args, db, sent } = setup();
  const transact = db.runTransaction.bind(db);
  let interrupted = false;
  db.runTransaction = async (callback) => {
    const value = await transact(callback);
    if (!interrupted && db.records[RECEIPT]?.status === "sent") {
      interrupted = true;
      throw new Error("Connection lost after successful commit");
    }
    return value;
  };
  assert.equal((await service.sendConfirmedItemToSlack(args)).status, "sent");
  assert.equal(db.records[RECEIPT].status, "sent");
  assert.equal((await service.sendConfirmedItemToSlack(args)).alreadySent, true);
  assert.equal(sent.length, 1);
});

test("photo loader uses existing folders and one extra URL to disclose the ten-photo limit", async () => {
  const queries = [];
  const bucket = { name: "bucket", getFiles: async (query) => {
    queries.push(query);
    return [Array.from({ length: 11 }, (_, i) => ({ name: `${query.prefix}${String(i).padStart(2,"0")}.jpg`,
      getMetadata: async () => [{ metadata: { firebaseStorageDownloadTokens: "existing-token" } }] }))];
  } };
  const result = await service.loadItemPhotoUrls(bucket, "AIS123", { photoStoragePrefixes: ["Parts/OLD123/", "NotParts/secret"] });
  assert.equal(result.length, 11);
  assert.deepEqual(queries.map((q) => q.prefix), ["Parts/AIS123/", "Parts/OLD123/"]);
  assert(queries.every((q) => q.autoPaginate === false && q.maxResults === 11));
  assert(result.every((url) => url.startsWith("https://firebasestorage.googleapis.com/v0/b/bucket/")));
});

test("invalid item paths and missing auth never access Firestore", async () => {
  for (const itemId of ["../AIS123", "Test/AIS123", "", {}, null]) {
    const { args } = setup();
    await assert.rejects(service.sendConfirmedItemToSlack({ ...args, itemId }));
  }
  const { args } = setup();
  await assert.rejects(service.sendConfirmedItemToSlack({ ...args, authUser: null }));
});
