"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { createHash } = require("node:crypto");
const service = require("../lib/inventory/workOrderAddSlackThread.cjs");
const clone = structuredClone;
const OP = "InventoryWorkOrderAddOperations/op-1";
const RECEIPT = `${OP}/SlackItems/AIS123`;
const WO = "OpsWorkOrders/10691";
const ACTOR = { uid: "user-1" };
const NOW = Date.parse("2026-09-28T21:00:00Z");
const CHANNEL = "C07EPLKV9JT", THREAD = "1790611696.872509", REPLY = "1790620373.203899";
const fieldValue = (value, field) => field.split(".").reduce((parent, key) => parent?.[key], value);
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
  constructor(seed) { this.records = clone(seed); this.writes = []; this.tail = Promise.resolve(); }
  collection(name) { return new Collection(name); }
  snapshot(path) { return { id: path.split("/").at(-1), exists: this.records[path] !== undefined, data: () => clone(this.records[path]) }; }
  runTransaction(callback) {
    const run = this.tail.then(async () => {
      const writes = [];
      const result = await callback({
        get: async (ref) => ref.collectionPath
          ? { docs: Object.entries(this.records).filter(([path, data]) => path.startsWith(`${ref.collectionPath}/`) && path.split("/").length === ref.collectionPath.split("/").length + 1 && fieldValue(data, ref.field) === ref.value).map(([path]) => this.snapshot(path)) }
          : this.snapshot(ref.path),
        set: (ref, data, options = {}) => writes.push({ ref, data: clone(data), options }),
      });
      for (const { ref, data, options } of writes) {
        this.records[ref.path] = options.merge ? { ...this.records[ref.path], ...data } : data;
        this.writes.push({ path: ref.path, data });
      }
      return result;
    });
    this.tail = run.catch(() => {});
    return run;
  }
}
const response = (value, status = 200) => ({ ok: status >= 200 && status < 300, status, json: async () => clone(value) });
function setup(mode = "current_at_work_order") {
  const listKey = mode === "from_work_order" ? "receiving" : "shipping";
  const operation = { type: "work_order_add_movement", createdBy: ACTOR, workOrderId: "10691", movementMode: mode,
    result: { operationId: "op-1", ok: true, completedAt: new Date(NOW).toISOString(), itemCount: 1,
      items: [{ id: "AIS123" }], workOrder: { id: "10691", workOrderId: "10691", number: "10691" }, movementMode: mode } };
  const receipt = { status: "sent", operationId: "op-1", itemId: "AIS123", requestedBy: ACTOR.uid,
    listKey, threadLinkRequested: true, row: { listId: "F08HLDPQJ2G", rowId: "Rec0C4W7T20D9" },
    payload: { title: "GE MRI Driver (AIS123)", local_sn: "AIS123", work_order: "10691", listKey, photoUrls: ["https://private.example/photo.jpg"] },
    warnings: ["Original warning"], completedAt: new Date(NOW) };
  const seed = { [OP]: operation, [RECEIPT]: receipt,
    [WO]: { number: "10691", workOrderId: "10691", slackChannel: CHANNEL, slackThreadTs: THREAD },
    "Test/AIS123": { history: "untouched" } };
  const db = new Db(seed), calls = [], waits = [];
  const root = { ts: THREAD, text: "#10691 *<https://advancedimaging.bluefolder.com/service/sr.aspx?srid=10691|Work order subject>*" };
  const args = { db, authUser: ACTOR, operationId: "op-1", itemId: "AIS123", now: () => NOW,
    env: { SLACK_BOT_TOKEN: "test-token" }, wait: async (ms) => waits.push(ms),
    fetchImpl: async (url, options) => {
      const parsed = new URL(url), method = parsed.pathname.split("/").at(-1);
      const body = options.method === "GET" ? Object.fromEntries(parsed.searchParams) : JSON.parse(options.body);
      calls.push({ method, body, options });
      if (method === "conversations.replies") return response({ ok: true, messages: [root] });
      assert.equal(method, "chat.postMessage");
      return response({ ok: true, channel: CHANNEL, ts: REPLY, message: { ts: REPLY, thread_ts: THREAD } });
    } };
  return { args, db, seed, calls, waits, root };
}

for (const mode of ["current_at_work_order", "from_work_order"]) {
  test(`${mode} posts one native list-record link into exact root, without pictures or unfurls`, async () => {
    const { args, db, seed, calls, waits } = setup(mode);
    const result = await service.sendConfirmedItemThreadLink(args);
    assert.equal(result.status, "sent");
    assert.deepEqual(waits, [1050]);
    assert.deepEqual(calls.map((call) => call.method), ["conversations.replies", "chat.postMessage"]);
    assert.equal(calls[0].options.method, "GET");
    assert.deepEqual(calls[0].body, { channel: CHANNEL, ts: THREAD, limit: "1" });
    const body = calls[1].body;
    assert.equal(body.channel, CHANNEL); assert.equal(body.thread_ts, THREAD);
    assert.equal(body.reply_broadcast, false);
    for (const key of ["unfurl_links", "unfurl_media", "unfurl_app_links", "link_names", "mrkdwn"]) assert.equal(body[key], false);
    assert.deepEqual(body.blocks[0].elements[0].elements[1], {
      type: "list_record", file_id: "F08HLDPQJ2G", record_id: "Rec0C4W7T20D9", text: "GE MRI Driver (AIS123)" });
    assert.match(body.text, mode === "from_work_order" ? /^Receiving:/ : /^Shipping:/);
    assert(!JSON.stringify(body).includes("private.example"));
    assert(!Object.hasOwn(body, "attachments"));
    assert(db.writes.every((write) => write.path === RECEIPT && Object.keys(write.data).join() === "threadLink"));
    for (const [path, before] of Object.entries(seed)) {
      const actual = clone(db.records[path]); if (path === RECEIPT) delete actual.threadLink;
      assert.deepEqual(actual, before);
    }
    assert.equal((await service.sendConfirmedItemThreadLink(args)).alreadySent, true);
    assert.equal(calls.length, 2);
  });
}

test("legacy completed rows do not back-post and invalid actor/manifest never writes", async () => {
  const legacy = setup(); delete legacy.db.records[RECEIPT].threadLinkRequested;
  assert.equal((await service.sendConfirmedItemThreadLink(legacy.args)).threadStatus, "not_requested");
  assert.equal(legacy.calls.length, 0); assert.equal(legacy.db.writes.length, 0);
  for (const alter of [
    ({ args }) => { args.authUser = null; },
    ({ args }) => { args.authUser = { uid: "other" }; },
    ({ args }) => { args.itemId = "../AIS123"; },
    ({ args }) => { args.receiptRef = { path: "Other/receipt" }; },
    ({ db }) => { db.records[OP].result.itemCount = 9; },
    ({ db }) => { db.records[OP].result.ok = false; },
    ({ db }) => { db.records[RECEIPT].status = "failed"; },
    ({ db }) => { db.records[RECEIPT].requestedBy = "other"; },
    ({ db }) => { db.records[RECEIPT].listKey = "receiving"; },
  ]) {
    const context = setup(); alter(context);
    await assert.rejects(service.sendConfirmedItemThreadLink(context.args));
    assert.equal(context.calls.length, 0); assert.equal(context.db.writes.length, 0);
  }
});

test("missing, quarantined, deleted, identity-conflicting and duplicate thread mappings never post", async () => {
  const linkId = createHash("sha256").update(`${CHANNEL}:${THREAD}`).digest("hex");
  for (const alter of [
    (db) => { delete db.records[WO]; },
    (db) => { db.records[WO].slackThreadTs = ""; },
    (db) => { db.records[WO].slackChannel = "C07F6V10PRS"; },
    (db) => { db.records[WO].slackEvidenceEligible = false; },
    (db) => { db.records[WO].dispatchConversationReview = { status: "manual_review_required" }; },
    (db) => { db.records[WO].deletedAt = "yesterday"; },
    (db) => { db.records[WO].number = "10692"; },
    (db) => { db.records[WO].blueFolder = { serviceRequestId: "10692" }; },
    (db) => { db.records[WO].dispatchReceipt = { workOrderId: "10692" }; },
    (db) => { db.records[WO].slackPermalink = `https://workspace.slack.com/archives/${CHANNEL}/p1790611696872500`; },
    (db) => { db.records[WO].slackPermalink = `https://evil.example/archives/${CHANNEL}/p1790611696872509`; },
    (db) => { db.records["OpsWorkOrders/99999"] = { slackChannel: CHANNEL, slackThreadTs: THREAD }; },
    (db) => { db.records["OpsWorkOrders/99999"] = { dispatchReceipt: { slackChannel: CHANNEL, slackThreadTs: THREAD } }; },
    (db) => { db.records[`OpsSlackThreadLinks/${linkId}`] = { active: true, workOrderId: "99999" }; },
    (db) => { db.records[OP].result.workOrder.id = "10692"; },
    (db) => { db.records[RECEIPT].payload.work_order = "10692"; },
    (db) => { db.records[RECEIPT].row.rowId = "https://evil.example"; },
  ]) {
    const { args, db, calls } = setup(); alter(db);
    assert.equal((await service.sendConfirmedItemThreadLink(args)).status, "failed");
    assert(!calls.some((call) => call.method === "chat.postMessage"));
    assert.equal(db.records[RECEIPT].status, "sent");
  }
});

test("exact root proof rejects replies, title references, conflicting BlueFolder numbers and prefixes", async () => {
  for (const altered of [
    { ts: REPLY, text: "#10691" },
    { ts: THREAD, thread_ts: "1790611696.872500", text: "#10691" },
    { ts: THREAD, text: "Discuss work order #10691 later" },
    { ts: THREAD, text: "#106910" },
    { ts: THREAD, text: "#10691 <https://advancedimaging.bluefolder.com/service/sr.aspx?srid=10692|Wrong>" },
    { ts: THREAD, text: "#10692 Wrong <https://advancedimaging.bluefolder.com/service/sr.aspx?srid=10691|Right>" },
    { ts: THREAD, text: "#10692 Wrong\nRelated: <https://advancedimaging.bluefolder.com/service/sr.aspx?srid=10691|Right>" },
    { ts: THREAD, text: "Other subject\nRelated: <https://advancedimaging.bluefolder.com/service/sr.aspx?srid=10691|Right>" },
  ]) {
    const { args, root, calls } = setup(); Object.assign(root, altered);
    assert.equal((await service.sendConfirmedItemThreadLink(args)).status, "failed");
    assert.equal(calls.length, 1);
  }
});

test("known posting rejection can retry only link, with stable client ID", async () => {
  for (const code of ["not_in_channel", "missing_scope", "ratelimited", "invalid_blocks"]) {
    const { args, db, calls } = setup(); const original = args.fetchImpl; let first = true;
    args.fetchImpl = async (...values) => {
      const result = await original(...values);
      if (values[0].endsWith("chat.postMessage") && first) { first = false; return response({ ok: false, error: code }); }
      return result;
    };
    assert.equal((await service.sendConfirmedItemThreadLink(args)).status, "failed");
    assert.equal(db.records[RECEIPT].threadLink.postStarted, false);
    assert.equal((await service.sendConfirmedItemThreadLink(args)).status, "sent");
    const posts = calls.filter((call) => call.method === "chat.postMessage");
    assert.equal(posts.length, 2); assert.equal(posts[0].body.client_msg_id, posts[1].body.client_msg_id);
  }
});

test("unknown errors and transport loss after post starts stay uncertain, never repost", async () => {
  for (const failure of ["throw", "internal_error", "fatal_error", "unknown_error", "malformed_success", "http500"]) {
    const { args, db, calls } = setup(); const original = args.fetchImpl;
    args.fetchImpl = async (...values) => {
      const result = await original(...values); if (!values[0].endsWith("chat.postMessage")) return result;
      if (failure === "throw") throw new Error("timeout");
      if (failure === "http500") return response({ ok: false, error: "invalid_auth" }, 500);
      if (failure === "malformed_success") return response({ ok: true, channel: "WRONG", ts: REPLY });
      return response({ ok: false, error: failure });
    };
    assert.equal((await service.sendConfirmedItemThreadLink(args)).status, "uncertain");
    assert.equal((await service.sendConfirmedItemThreadLink(args)).status, "uncertain");
    assert.equal(calls.filter((call) => call.method === "chat.postMessage").length, 1);
    assert.equal(db.records[RECEIPT].status, "sent");
  }
});

test("a concurrent click respects thread lease independently of completed list receipt", async () => {
  const { args, calls } = setup(); let enter, release;
  const entered = new Promise((resolve) => { enter = resolve; });
  const blocked = new Promise((resolve) => { release = resolve; });
  args.wait = async () => { enter(); await blocked; };
  const first = service.sendConfirmedItemThreadLink(args); await entered;
  assert.equal((await service.sendConfirmedItemThreadLink(args)).status, "sending");
  release(); assert.equal((await first).status, "sent");
  assert.equal(calls.filter((call) => call.method === "chat.postMessage").length, 1);
});

test("expired leases recover before post but become uncertain after durable postStarted", async () => {
  for (const postStarted of [true, false]) {
    const { args, db, calls } = setup(); db.records[RECEIPT].threadLink = { status: "sending", leaseUntil: NOW - 1, postStarted };
    assert.equal((await service.sendConfirmedItemThreadLink(args)).status, postStarted ? "uncertain" : "sent");
    assert.equal(calls.length, postStarted ? 0 : 2);
  }
});

test("lost durable completion response never downgrades sent or posts twice", async () => {
  const { args, db, calls } = setup(); const transact = db.runTransaction.bind(db); let interrupted = false;
  db.runTransaction = async (callback) => {
    const result = await transact(callback);
    if (!interrupted && db.records[RECEIPT].threadLink?.status === "sent") { interrupted = true; throw new Error("Lost commit response"); }
    return result;
  };
  assert.equal((await service.sendConfirmedItemThreadLink(args)).status, "sent");
  assert.equal((await service.sendConfirmedItemThreadLink(args)).status, "sent");
  assert.equal(calls.length, 2);
});

test("lost before-post checkpoint response blocks repost even if no request was sent", async () => {
  const { args, db, calls } = setup(); const transact = db.runTransaction.bind(db); let interrupted = false;
  db.runTransaction = async (callback) => {
    const result = await transact(callback);
    if (!interrupted && db.records[RECEIPT].threadLink?.postStarted) { interrupted = true; throw new Error("Lost commit response"); }
    return result;
  };
  assert.equal((await service.sendConfirmedItemThreadLink(args)).status, "uncertain");
  assert.equal((await service.sendConfirmedItemThreadLink(args)).status, "uncertain");
  assert.equal(calls.length, 1);
});

test("mapping changes after root verification are caught before posting", async () => {
  const { args, db, calls } = setup(); args.wait = async () => { db.records[WO].slackThreadTs = "1790611696.872500"; };
  assert.equal((await service.sendConfirmedItemThreadLink(args)).status, "failed");
  assert.equal(calls.length, 1);
});

test("expired stale worker cannot post after another worker finishes the same link", async () => {
  const { args, calls } = setup(); let enter, release, instant = NOW;
  const entered = new Promise((resolve) => { enter = resolve; });
  const blocked = new Promise((resolve) => { release = resolve; });
  args.now = () => instant;
  const first = service.sendConfirmedItemThreadLink({ ...args, wait: async () => { enter(); await blocked; } });
  await entered;
  instant += service.THREAD_LEASE_MS + 1;
  assert.equal((await service.sendConfirmedItemThreadLink(args)).status, "sent");
  release();
  const staleResult = await first;
  assert.equal(staleResult.status, "sent"); assert.equal(staleResult.alreadySent, true);
  assert.equal(calls.filter((call) => call.method === "chat.postMessage").length, 1);
});

test("HTTP429 is definitive and preserves a useful retry-after instruction", async () => {
  const { args, db } = setup(); const original = args.fetchImpl;
  args.fetchImpl = async (...values) => values[0].endsWith("chat.postMessage")
    ? { ...response({}, 429), headers: { get: () => "30" } } : original(...values);
  const result = await service.sendConfirmedItemThreadLink(args);
  assert.equal(result.status, "failed"); assert.match(result.message, /30 seconds/);
  assert.equal(db.records[RECEIPT].threadLink.postStarted, false);
});

test("saved row or payload mutation during root verification fails closed", async () => {
  for (const alter of [
    (receipt) => { receipt.row.rowId = "RecSOMETHINGELSE"; },
    (receipt) => { receipt.payload.title = "Changed after verification"; },
  ]) {
    const { args, db, calls } = setup(); args.wait = async () => alter(db.records[RECEIPT]);
    assert.equal((await service.sendConfirmedItemThreadLink(args)).status, "failed");
    assert.equal(calls.length, 1);
  }
});

test("missing token or root read errors can retry without ever marking a post started", async () => {
  for (const kind of ["token", "read"]) {
    const { args, db, calls } = setup();
    if (kind === "token") args.env = {};
    else args.fetchImpl = async () => response({ ok: false, error: "missing_scope" });
    assert.equal((await service.sendConfirmedItemThreadLink(args)).status, "failed");
    assert.notEqual(db.records[RECEIPT].threadLink.postStarted, true);
    assert.equal(calls.length, 0);
  }
});
