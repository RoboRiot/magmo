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
  where(field, operator, value) { assert.equal(operator, "=="); return { collectionPath: this.path, field, value }; }
}
class Db {
  constructor(seed) { this.records = Object.fromEntries(Object.entries(seed).map(([key, value]) => [key, clone(value)])); this.writes = []; this.tail = Promise.resolve(); }
  collection(name) { return new Collection(name); }
  runTransaction(callback) {
    const run = this.tail.then(async () => {
      const writes = [];
      const result = await callback({
        get: async (ref) => ref.collectionPath
          ? { docs: Object.entries(this.records).filter(([key, data]) =>
            key.startsWith(`${ref.collectionPath}/`) && key.split("/").length === ref.collectionPath.split("/").length + 1 &&
            ref.field.split(".").reduce((parent, part) => parent?.[part], data) === ref.value)
            .map(([key, data]) => ({ id: key.split("/").at(-1), data: () => clone(data) })) }
          : ({ exists: this.records[ref.path] !== undefined, data: () => clone(this.records[ref.path]) }),
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
    sendItem, now: () => NOW, loadPhotos: async () => ["https://example.test/saved-photo.jpg"],
    logError: () => {},
    sendThreadLink: async () => ({ status: "sent", threadStatus: "sent", alreadySent: true }) };
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

test("photo Error and TypeError retain safe diagnostics and never imply an existing Slack row", async () => {
  for (const [ErrorType, expectedCode] of [[Error, "photo_loading_failed"], [TypeError, "type_error"]]) {
    const { args, db, sent, seed } = setup();
    const logs = [];
    args.logError = (entry) => logs.push(entry);
    args.loadPhotos = async () => { throw new ErrorType("Private failure details"); };
    const result = await service.sendConfirmedItemToSlack(args);
    assert.equal(result.status, "failed");
    assert.equal(result.errorCode, expectedCode);
    assert.equal(result.errorName, ErrorType.name);
    assert.equal(result.errorStage, "photo_loading");
    assert.match(result.message, /could not read this item's saved photos/);
    assert.match(result.message, /No Slack row was created/);
    assert.doesNotMatch(result.message, /resume|Private failure details/);
    assert.equal(db.records[RECEIPT].errorCode, expectedCode);
    assert.deepEqual(logs, [{ operationId: "op-1", itemId: "AIS123", errorStage: "photo_loading",
      errorName: ErrorType.name, errorCode: expectedCode, rowExists: false, createStarted: false }]);
    assert.equal(sent.length, 0);
    args.loadPhotos = async () => [];
    assert.equal((await service.sendConfirmedItemToSlack(args)).status, "sent");
    assert.equal(sent.length, 1);
    for (const [path, data] of Object.entries(seed)) assert.deepEqual(db.records[path], data);
    assert(db.writes.every((path) => path === RECEIPT));
  }
});

test("storage service error codes are preserved without disclosing SDK messages or URLs", async () => {
  for (const [code, expectedCode] of [[403, "http_403"], [7, "grpc_permission_denied"],
    ["storage/unauthorized", "storage_permission_denied"], ["ETIMEDOUT", "ETIMEDOUT"]]) {
    const { args, db, sent } = setup();
    const logs = [];
    args.logError = (entry) => logs.push(entry);
    args.loadPhotos = service.loadItemPhotoUrls;
    args.bucket = { name: "private-bucket", getFiles: async () => {
      throw Object.assign(new Error("GET https://private.test/image?token=SECRET failed for private@example.test"), { code });
    } };
    const result = await service.sendConfirmedItemToSlack(args);
    assert.equal(result.errorCode, expectedCode);
    assert.equal(result.errorStage, "photo_loading");
    assert.match(result.message, /No Slack row was created/);
    assert.equal(sent.length, 0);
    assert.doesNotMatch(JSON.stringify({ result, receipt: db.records[RECEIPT], logs }), /private|SECRET|https:/);
  }
});

test("the reproduced photo storage authentication failure has a specific safe diagnostic", async () => {
  const { args, db, sent } = setup();
  const logs = [];
  args.logError = (entry) => logs.push(entry);
  args.loadPhotos = async () => {
    throw new Error("Invalid response from metadata service: incorrect Metadata-Flavor header. Expected 'Google', got no header");
  };
  const result = await service.sendConfirmedItemToSlack(args);
  assert.equal(result.errorCode, "storage_auth_metadata_incompatible");
  assert.equal(result.errorName, "Error");
  assert.equal(result.errorStage, "photo_loading");
  assert.equal(db.records[RECEIPT].errorCode, "storage_auth_metadata_incompatible");
  assert.equal(logs[0].errorCode, "storage_auth_metadata_incompatible");
  assert.match(result.message, /server could not authenticate to photo storage/);
  assert.match(result.message, /before retrying/);
  assert.match(result.message, /No Slack row was created/);
  assert.equal(sent.length, 0);
  assert.doesNotMatch(JSON.stringify({ result, receipt: db.records[RECEIPT], logs }), /Metadata-Flavor|Expected 'Google'/);
});

test("payload building and checkpoint failures retain their own stage", async () => {
  for (const failureStage of ["payload_build", "payload_checkpoint", "completion_checkpoint"]) {
    const { args, db, seed } = setup();
    const logs = [];
    args.logError = (entry) => logs.push(entry);
    if (failureStage === "payload_build") {
      args.loadPhotos = async (_bucket, _id, item) => {
        item.name = { toString() { throw new TypeError("sensitive item details"); } };
        return [];
      };
    } else {
      const transact = db.runTransaction.bind(db);
      let attempts = 0;
      db.runTransaction = async (callback) => {
        attempts++;
        if (attempts === (failureStage === "payload_checkpoint" ? 2 : 5)) {
          throw Object.assign(new Error("sensitive database transport error"), { code: "ECONNRESET" });
        }
        return transact(callback);
      };
    }
    const result = await service.sendConfirmedItemToSlack(args);
    assert.equal(result.status, "failed");
    assert.equal(result.errorStage, failureStage);
    assert.equal(db.records[RECEIPT].errorStage, failureStage);
    assert.equal(logs[0].errorStage, failureStage);
    assert.equal(result.errorCode, failureStage === "payload_build" ? "type_error" : "ECONNRESET");
    assert.match(result.message, failureStage === "completion_checkpoint" ? /Slack row already exists/ : /No Slack row was created/);
    assert.doesNotMatch(JSON.stringify({ result, logs }), /sensitive/);
    for (const [path, data] of Object.entries(seed)) assert.deepEqual(db.records[path], data);
    assert(db.writes.every((path) => path === RECEIPT));
  }
});

test("known Slack failures show actionable safe code and distinguish existing row resumes", async () => {
  for (const [code, expectedMessage] of [["invalid_auth", /connection needs administrator/],
    ["missing_scope", /check the app's list access/], ["ratelimited", /Wait briefly/],
    ["missing_title_column_env", /list configuration needs administrator/]]) {
    const { args } = setup();
    args.sendItem = async () => ({ ok: false, error: code, message: "unsafe SDK detail" });
    const result = await service.sendConfirmedItemToSlack(args);
    assert.equal(result.errorCode, code);
    assert.equal(result.errorStage, "slack_list_delivery");
    assert.match(result.message, expectedMessage);
    assert.match(result.message, /No Slack row was created/);
    assert.doesNotMatch(result.message, /unsafe/);
  }
  const { args, db, seed } = setup();
  let creates = 0;
  args.sendItem = async (_payload, hooks) => {
    creates++;
    await hooks.beforeCreate();
    await hooks.onRowCreated({ listId: "L1", rowId: "R1" });
    return { ok: false, error: "update_failed" };
  };
  const failed = await service.sendConfirmedItemToSlack(args);
  assert.match(failed.message, /Slack row already exists; retry will resume it/);
  assert.doesNotMatch(failed.message, /No Slack row was created/);
  args.sendItem = async (_payload, hooks) => {
    assert.deepEqual(hooks.resumeRow, { listId: "L1", rowId: "R1" });
    return { ok: true };
  };
  assert.equal((await service.sendConfirmedItemToSlack(args)).status, "sent");
  assert.equal(creates, 1);
  for (const [path, data] of Object.entries(seed)) assert.deepEqual(db.records[path], data);
});

test("untrusted error names/codes/messages/causes and sender debug are never exposed in diagnostics", async () => {
  const secrets = ["https://private.test/photo?token=SECRET", "xoxb-secret-token", "private@example.test", "private Slack text"];
  for (const channel of ["throw", "response"]) {
    const { args, db } = setup();
    const logs = [];
    args.logError = (entry) => logs.push(entry);
    args.sendItem = async () => {
      if (channel === "response") return { ok: false, error: secrets[0], message: secrets[1], debug: secrets };
      const error = new Error(secrets.join(" "));
      error.code = secrets[0]; error.name = secrets[1]; error.cause = { code: secrets[2], message: secrets[3] };
      error.stack = secrets.join(" ");
      throw error;
    };
    const result = await service.sendConfirmedItemToSlack(args);
    assert.equal(result.errorCode, "slack_list_delivery_failed");
    assert.equal(result.errorName, "Error");
    const output = JSON.stringify({ result, receipt: db.records[RECEIPT], logs });
    for (const secret of secrets) assert(!output.includes(secret));
    assert.equal(logs.length, 1);
  }
});

test("failure receipt storage errors are logged safely without clearing create uncertainty", async () => {
  const { args, db, seed } = setup();
  const logs = [];
  args.logError = (entry) => logs.push(entry);
  const transact = db.runTransaction.bind(db);
  let attempts = 0;
  db.runTransaction = async (callback) => {
    if (++attempts === 4) throw Object.assign(new Error("private database error"), { code: 14 });
    return transact(callback);
  };
  args.sendItem = async (_payload, hooks) => { await hooks.beforeCreate(); throw new TypeError("secret"); };
  await assert.rejects(service.sendConfirmedItemToSlack(args), /private database error/);
  assert.equal(db.records[RECEIPT].createStarted, true);
  assert.equal(db.records[RECEIPT].status, "sending");
  assert.equal(logs[0].errorCode, "type_error");
  assert.equal(logs[0].errorStage, "slack_list_delivery");
  assert.equal(logs[1].errorCode, "grpc_unavailable");
  assert.equal(logs[1].errorStage, "completion_checkpoint");
  assert.doesNotMatch(JSON.stringify(logs), /secret|private/);
  for (const [path, data] of Object.entries(seed)) assert.deepEqual(db.records[path], data);
});

test("diagnostic logger failure cannot prevent a safe failure receipt", async () => {
  const { args, db } = setup();
  args.logError = () => { throw new Error("Logger unavailable"); };
  args.loadPhotos = async () => { throw new TypeError("Storage response invalid"); };
  const result = await service.sendConfirmedItemToSlack(args);
  assert.equal(result.status, "failed");
  assert.equal(db.records[RECEIPT].errorCode, "type_error");
  assert.equal(db.records[RECEIPT].createStarted, undefined);
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

test("thread link runs only after a durable sent list receipt and uses saved identity", async () => {
  const { args, db, sent } = setup();
  let links = 0;
  args.sendThreadLink = async (input) => {
    links++;
    assert.equal(db.records[RECEIPT].status, "sent");
    assert.equal(db.records[RECEIPT].threadLinkRequested, true);
    assert.equal(input.receiptRef.path, RECEIPT);
    assert.equal(input.operationId, "op-1");
    assert.equal(input.itemId, "AIS123");
    assert.equal(input.authUser, ACTOR);
    return { status: "sent", threadStatus: "sent", message: "Sent and linked." };
  };
  const result = await service.sendConfirmedItemToSlack(args);
  assert.equal(result.listStatus, "sent");
  assert.equal(result.threadStatus, "sent");
  assert.equal(sent.length, 1);
  assert.equal(links, 1);
});

test("thread-only retry never repeats list creation, photo loading, or inventory writes", async () => {
  const { args, db, sent, seed } = setup();
  let links = 0, photos = 0;
  args.loadPhotos = async () => { photos++; return []; };
  args.sendThreadLink = async () => (++links === 1
    ? { status: "failed", threadStatus: "failed", message: "List saved, thread unavailable." }
    : { status: "sent", threadStatus: "sent" });
  assert.equal((await service.sendConfirmedItemToSlack(args)).status, "failed");
  assert.equal(db.records[RECEIPT].status, "sent");
  assert.equal((await service.sendConfirmedItemToSlack(args)).status, "sent");
  assert.equal(links, 2);
  assert.equal(photos, 1);
  assert.equal(sent.length, 1);
  for (const [key, value] of Object.entries(seed)) assert.deepEqual(db.records[key], value);
  assert(db.writes.every((key) => key === RECEIPT));
});

test("list failure never starts thread posting; interrupted thread result preserves list success", async () => {
  const { args, db, sent } = setup();
  let links = 0;
  args.sendThreadLink = async () => { links++; throw new Error("Lost checkpoint response"); };
  const result = await service.sendConfirmedItemToSlack(args);
  assert.equal(result.status, "uncertain");
  assert.equal(result.listStatus, "sent");
  assert.equal(result.threadStatus, "uncertain");
  assert.equal(db.records[RECEIPT].status, "sent");
  await service.sendConfirmedItemToSlack(args);
  assert.equal(sent.length, 1);
  assert.equal(links, 2);
  const failed = setup();
  failed.args.sendThreadLink = async () => { throw new Error("Must not reach thread"); };
  failed.args.loadPhotos = async () => { throw new Error("Photo unavailable"); };
  assert.equal((await service.sendConfirmedItemToSlack(failed.args)).status, "failed");
});

test("legacy receipts are not opted into thread linking during status checks or retries", async () => {
  for (const status of ["sent", "failed"]) {
    const { args, db } = setup();
    db.records[RECEIPT] = { status, row: { listId: "L1", rowId: "R1" }, listKey: "shipping" };
    args.sendThreadLink = async () => {
      assert.equal(db.records[RECEIPT].threadLinkRequested, undefined);
      return { status: "sent", threadStatus: "not_requested", alreadySent: true };
    };
    assert.equal((await service.sendConfirmedItemToSlack(args)).status, "sent");
    assert.equal(db.records[RECEIPT].threadLinkRequested, undefined);
  }
});

test("complete saved list-to-thread integration posts native row link once and preserves all inventory", async () => {
  const { args, db, seed } = setup();
  const threadService = require("../lib/inventory/workOrderAddSlackThread.cjs");
  db.records[OP].workOrderId = "10658";
  Object.assign(db.records[OP].result.workOrder, { id: "10658", workOrderId: "10658" });
  db.records["OpsWorkOrders/10658"] = { number: "10658", workOrderId: "10658",
    slackChannel: "C07EPLKV9JT", slackThreadTs: "1790611696.872509" };
  const before = clone(db.records);
  let rows = 0;
  args.sendItem = async (_payload, hooks) => {
    rows++;
    await hooks.beforeCreate();
    await hooks.onRowCreated({ listId: "F08HLDPQJ2G", rowId: "Rec0C4W7T20D9" });
    return { ok: true, warnings: ["Existing list warning"] };
  };
  const posts = [];
  args.fetchImpl = async (url, options) => {
    if (url.includes("/conversations.replies?")) {
      assert.equal(options.method, "GET");
      return { ok: true, status: 200, json: async () => ({ ok: true,
        messages: [{ ts: "1790611696.872509", text: "#10658 LF ships parts to Lathrop" }] }) };
    }
    assert.equal(url, "https://slack.com/api/chat.postMessage");
    posts.push(JSON.parse(options.body));
    return { ok: true, status: 200, json: async () => ({ ok: true, channel: "C07EPLKV9JT",
      ts: "1790611697.872509", message: { ts: "1790611697.872509", thread_ts: "1790611696.872509" } }) };
  };
  args.sendThreadLink = input => threadService.sendConfirmedItemThreadLink({ ...input,
    env: { SLACK_BOT_TOKEN: "test-only" }, wait: async () => {} });
  const result = await service.sendConfirmedItemToSlack(args);
  assert.equal(result.status, "sent");
  assert.equal(result.listStatus, "sent");
  assert.equal(result.threadStatus, "sent");
  assert(result.warnings.includes("Existing list warning"));
  assert.equal((await service.sendConfirmedItemToSlack(args)).alreadySent, true);
  assert.equal(rows, 1);
  assert.equal(posts.length, 1);
  assert.deepEqual(posts[0].blocks[0].elements[0].elements[1], {
    type: "list_record", file_id: "F08HLDPQJ2G", record_id: "Rec0C4W7T20D9", text: "Motor (AIS123)" });
  assert(!JSON.stringify(posts).includes("saved-photo.jpg"));
  for (const [key, value] of Object.entries(before)) assert.deepEqual(db.records[key], value);
  assert.deepEqual(db.records["Test/AIS123"], seed["Test/AIS123"]);
  assert(db.writes.every((key) => key === RECEIPT));
});
