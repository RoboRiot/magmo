"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { createHash } = require("node:crypto");
const service = require("../lib/slack/toolListIdentity.cjs");
const ID = "AIS_T00001";
const LIST = "FTOOLS";
const ACTOR = { uid: "staff", email: "staff@example.test" };
const NOW = Date.parse("2026-10-05T18:00:00Z");
const PATH = `${service.COLLECTION}/${createHash("sha256").update(JSON.stringify([LIST, ID])).digest("hex")}`;
const row = (id = ID, extra = {}) => ({ id: "Rec1", fields: [{ key: "name", text: `Meter (${id})` }], ...extra });
class Ref {
  constructor(path) { this.path = path; }
  collection(name) { return { doc: (id) => new Ref(`${this.path}/${name}/${id}`) }; }
}
class Db {
  constructor(seed = {}) { this.records = structuredClone(seed); this.writes = []; this.tail = Promise.resolve(); }
  collection(name) { return { doc: (id) => new Ref(`${name}/${id}`) }; }
  runTransaction(callback) {
    const run = this.tail.then(async () => {
      const writes = [];
      const value = await callback({
        get: async (ref) => ({ exists: Object.hasOwn(this.records, ref.path), data: () => structuredClone(this.records[ref.path]) }),
        set: (ref, data, options = {}) => writes.push({ path: ref.path, data: structuredClone(data), options }),
      });
      for (const write of writes) {
        this.records[write.path] = write.options.merge ? { ...this.records[write.path], ...write.data } : write.data;
        this.writes.push(write.path);
      }
      return value;
    });
    this.tail = run.catch(() => {}); return run;
  }
}
function setup() {
  const tool = { name: "Saved meter", description: "Saved description", photoUrls: ["https://example.test/photo.jpg"], workOrders: [{ workOrder: "10699", date: "2026-10-05" }] };
  const db = new Db({ [`Tool/${ID}`]: tool });
  const calls = [], sent = [];
  const state = { active: [], archived: [] };
  const args = { db, authUser: ACTOR, body: { toolId: ID, title: "Untrusted title", photoUrls: ["https://other.test/"], work_order: "99999" }, listId: LIST, now: () => NOW,
    slackApi: async (method, payload) => {
      calls.push({ method, payload });
      assert.equal(method, "slackLists.items.list");
      return { ok: true, items: payload.archived ? state.archived : state.active, response_metadata: { next_cursor: "" } };
    },
    sendItem: async (payload, hooks) => {
      sent.push(structuredClone(payload));
      if (!hooks.resumeRow) {
        await hooks.beforeCreate(); state.active.push(row());
        await hooks.onRowCreated({ listId: LIST, rowId: "Rec1" });
      }
      return { ok: true, list_id: LIST, item_id: "Rec1", warnings: [] };
    },
  };
  return { tool, db, args, calls, sent, state };
}

test("explicit tool identity and old terminal-ID request work; conflicts fail closed", () => {
  assert.equal(service.toolIdFromRequest({ toolId: ID }), ID);
  assert.equal(service.toolIdFromRequest({ title: `Tool (${ID})` }), ID);
  assert.throws(() => service.toolIdFromRequest({ title: `mention ${ID} here` }), /valid, matching/);
  assert.throws(() => service.toolIdFromRequest({ toolId: ID, localSN: "AIS_T00002" }), /valid, matching/);
  assert.throws(() => service.toolIdFromRequest({ toolId: ID, title: "Other (AIS_T00002)" }), /valid, matching/);
  assert.throws(() => service.toolIdFromRequest({ toolId: "AIS33551" }), /valid, matching/);
});

test("exact tool ID in typed title or ID fields only; not a prefix, component mention, or description", () => {
  assert.equal(service.rowMatchesTool(row(), ID), true);
  assert.equal(service.rowMatchesTool(row("AIS_T000010"), ID), false);
  assert.equal(service.rowMatchesTool(row("AIS_T1"), ID), true);
  assert.equal(service.rowMatchesTool({ fields: [{ key: "description", text: `Includes (${ID})` }] }, ID), false);
  assert.equal(service.rowMatchesTool({ fields: [{ key: "name", text: `For ${ID} toolkit` }] }, ID), false);
  assert.equal(service.rowMatchesTool({ fields: [{ key: "local_sn", text: ID }] }, ID), true);
  assert.equal(service.rowMatchesTool({ fields: [{ column_id: "TITLE", rich_text: [{ type: "rich_text", elements: [{ type: "rich_text_section", elements: [{ type: "text", text: `Meter (${ID})` }] }] }] }] }, ID, { titleColumnId: "TITLE" }), true);
  assert.equal(service.rowMatchesTool({ fields: [{ key: "name", value: JSON.stringify([{ type: "rich_text", elements: [{ type: "text", text: `Meter (${ID})` }] }]) }] }, ID), true);
});

for (const archived of [false, true]) test(`existing ${archived ? "archived" : "active"} tool returns alreadyExists without any Slack writes`, async () => {
  const { args, sent, state, db, tool } = setup();
  state[archived ? "archived" : "active"].push(row());
  const hooked = []; args.internal = { onRowCreated: async (value) => hooked.push(value) };
  const result = await service.sendToolToSlackOnce(args);
  assert.equal(result.ok, true); assert.equal(result.alreadyExists, true); assert.equal(result.archived, archived);
  assert.match(result.message, /already on Slack/); assert.equal(sent.length, 0);
  assert.equal(hooked[0].rowId, "Rec1"); assert.deepEqual(db.records[`Tool/${ID}`], tool);
  assert(db.writes.every((path) => path === PATH));
});

test("lookup pages past first 100 and checks archived only after all active pages", async () => {
  const calls = [];
  const found = await service.findExistingToolRow({ listId: LIST, toolId: ID, slackApi: async (_method, payload) => {
    calls.push(payload);
    if (!payload.archived && !payload.cursor) return { ok: true, items: [row("AIS_T00002")], response_metadata: { next_cursor: "page2" } };
    if (!payload.archived) return { ok: true, items: [] };
    return { ok: true, items: [row()] };
  } });
  assert.equal(found.archived, true); assert.equal(calls.length, 3);
  assert.equal(calls[1].cursor, "page2"); assert.equal(calls[2].archived, true);
});

test("metadata primary title column is honored for custom column keys", async () => {
  const found = await service.findExistingToolRow({ listId: LIST, toolId: ID, titleColumnId: "STALE", slackApi: async () => ({ ok: true,
    list: { list_metadata: { schema: [{ id: "CUSTOM", is_primary_column: true }] } },
    items: [{ id: "RecCustom", fields: [{ column_id: "CUSTOM", text: `Meter (${ID})` }] }],
  }) });
  assert.equal(found.rowId, "RecCustom");
});

test("missing row IDs, malformed pages and unknown pagination fail closed", async () => {
  for (const result of [
    { items: [{ fields: [{ key: "name", text: `Meter (${ID})` }] }] },
    { items: [{ id: "Rec1" }] },
    { items: [], response_metadata: { next_cursor: 1 } },
    { items: [], response_metadata: [] },
    { items: [], has_more: true },
    { items: [row()], list: { list_metadata: { schema: [{ id: "OTHER" }] } } },
    { items: [{ id: "Rec1", fields: [{ column_id: "UNKNOWN", text: "A tool" }] }] },
  ]) {
    await assert.rejects(service.findExistingToolRow({ listId: LIST, toolId: ID, titleColumnId: "STALE",
      slackApi: async () => ({ ok: true, ...result }) }), { code: "tool_slack_lookup_incomplete" });
  }
});

test("lookup errors, repeated cursors and incomplete pagination never permit creating", async () => {
  for (const response of [{ ok: false, error: "missing_scope" }, { ok: true }, { ok: true, items: [], response_metadata: { next_cursor: "same" } }]) {
    const { args, sent } = setup(); args.slackApi = async () => response;
    await assert.rejects(service.sendToolToSlackOnce(args), /could not/); assert.equal(sent.length, 0);
  }
  await assert.rejects(service.findExistingToolRow({ listId: LIST, toolId: ID, maxPages: 1,
    slackApi: async () => ({ ok: true, items: [], response_metadata: { next_cursor: "more" } }) }), /could not finish/);
});

test("new tool is sent with authoritative saved fields and subsequent attempts re-check Slack", async () => {
  const { args, sent, calls, db, tool } = setup();
  const result = await service.sendToolToSlackOnce(args);
  assert.equal(result.ok, true); assert.equal(result.alreadyExists, false);
  assert.equal(sent[0].title, `Saved meter (${ID})`); assert.equal(sent[0].work_order, "10699");
  assert.equal(sent[0].description, "Saved description"); assert.deepEqual(sent[0].photoUrls, tool.photoUrls);
  const count = calls.length;
  assert.equal((await service.sendToolToSlackOnce(args)).alreadyExists, true);
  assert.equal(sent.length, 1); assert(calls.length > count); assert.equal(db.records[PATH].createStarted, false);
});

test("missing, deleted or unauthenticated tools cannot send or reserve a row", async () => {
  for (const mutate of [
    ({ args }) => { args.authUser = null; },
    ({ db }) => { delete db.records[`Tool/${ID}`]; },
    ({ db }) => { db.records[`Tool/${ID}`].deleted = true; },
  ]) {
    const context = setup(); mutate(context);
    await assert.rejects(service.sendToolToSlackOnce(context.args));
    assert.equal(context.sent.length, 0); assert.equal(context.calls.length, 0); assert.equal(context.db.writes.length, 0);
  }
});

test("concurrent toolpage and work-order sends serialize by the same list and ID", async () => {
  const { args, sent } = setup();
  let entered, release;
  const began = new Promise((resolve) => { entered = resolve; });
  const waiting = new Promise((resolve) => { release = resolve; });
  const original = args.slackApi;
  args.slackApi = async (...values) => { entered(); await waiting; return original(...values); };
  const first = service.sendToolToSlackOnce(args); await began;
  await assert.rejects(service.sendToolToSlackOnce({ ...args, authUser: { uid: "other" } }), { code: "tool_slack_send_in_progress" });
  release(); assert.equal((await first).ok, true); assert.equal(sent.length, 1);
});

test("unknown create outcome is reconciled by ID if visible, never blindly re-created", async () => {
  const { args, db, state } = setup();
  let creates = 0;
  args.sendItem = async (_payload, hooks) => { await hooks.beforeCreate(); creates++; throw new Error("timeout"); };
  await assert.rejects(service.sendToolToSlackOnce(args), /timeout/);
  assert.equal(db.records[PATH].status, "uncertain"); assert.equal(db.records[PATH].createStarted, true);
  await assert.rejects(service.sendToolToSlackOnce(args), { code: "tool_slack_creation_uncertain" });
  assert.equal(creates, 1);
  state.active.push(row());
  args.sendItem = async (_payload, hooks) => {
    assert.equal(hooks.resumeRow.rowId, "Rec1"); return { ok: true, item_id: "Rec1", list_id: LIST };
  };
  assert.equal((await service.sendToolToSlackOnce(args)).ok, true); assert.equal(creates, 1);
});

test("known row update failure resumes same saved payload and does not create again", async () => {
  const { args, sent, db } = setup();
  const sender = args.sendItem;
  args.sendItem = async (...values) => { await sender(...values); return { ok: false, error: "ratelimited" }; };
  assert.equal((await service.sendToolToSlackOnce(args)).ok, false);
  db.records[`Tool/${ID}`].name = "Changed name";
  args.sendItem = async (payload, hooks) => { assert(hooks.resumeRow); assert.match(payload.title, /^Saved meter/); return { ok: true }; };
  assert.equal((await service.sendToolToSlackOnce(args)).ok, true); assert.equal(sent.length, 1);
});

test("definitive create rejection permits retry; archived row recovered after timeout never resumes", async () => {
  const context = setup(); const original = context.args.sendItem;
  context.args.sendItem = async (_payload, hooks) => {
    await hooks.beforeCreate(); await hooks.onCreateRejected("missing_scope"); return { ok: false, error: "missing_scope" };
  };
  assert.equal((await service.sendToolToSlackOnce(context.args)).ok, false);
  assert.equal(context.db.records[PATH].createStarted, false);
  context.args.sendItem = original;
  assert.equal((await service.sendToolToSlackOnce(context.args)).ok, true);
  context.db.records[PATH].status = "incomplete";
  context.state.archived = context.state.active; context.state.active = [];
  assert.equal((await service.sendToolToSlackOnce(context.args)).archived, true);
  assert.equal(context.sent.length, 1);
});

test("completed known row absent from both sets is not silently recreated", async () => {
  const { args, state, sent } = setup();
  await service.sendToolToSlackOnce(args); state.active = [];
  await assert.rejects(service.sendToolToSlackOnce(args), { code: "tool_slack_creation_uncertain" });
  assert.equal(sent.length, 1);
});

test("a failed duplicate lookup never downgrades a completed row into a resumable delivery", async () => {
  const { args, sent, db } = setup();
  await service.sendToolToSlackOnce(args);
  const lookup = args.slackApi;
  args.slackApi = async () => ({ ok: false, error: "ratelimited" });
  await assert.rejects(service.sendToolToSlackOnce(args), { code: "tool_slack_lookup_failed" });
  assert.equal(db.records[PATH].deliveryPending, false);
  args.slackApi = lookup;
  assert.equal((await service.sendToolToSlackOnce(args)).alreadyExists, true);
  assert.equal(sent.length, 1);
});

test("confirmed work-order snapshot stays immutable and a concurrent movement blocks a new send", async () => {
  const { args, db, sent } = setup();
  db.records[`Tool/${ID}`].selectionHistory = [{ action: "work_order_add", operationId: "op1" }];
  args.internal = { confirmedToolOperationId: "op1", confirmedToolPayload: { listKey: "tools", toolId: ID,
    local_sn: ID, title: `Confirmed snapshot (${ID})`, description: "Confirmed description", work_order: "10699", photoUrls: [] } };
  db.records[`Tool/${ID}`].name = "Edited name";
  await service.sendToolToSlackOnce(args);
  assert.equal(sent[0].title, `Confirmed snapshot (${ID})`);
  const second = setup();
  second.args.internal = args.internal;
  second.db.records[`Tool/${ID}`].selectionHistory = [{ action: "work_order_add", operationId: "op2" }];
  await assert.rejects(service.sendToolToSlackOnce(second.args), { code: "tool_moved_since_confirmation" });
  assert.equal(second.sent.length, 0);
  second.db.records[`Tool/${ID}`].selectionHistory = [{ action: "work_order_add", operationId: "op1" }];
  second.db.records[`Tool/${ID}`].workOrders = [{ workOrder: "10700" }];
  await assert.rejects(service.sendToolToSlackOnce(second.args), { code: "tool_moved_since_confirmation" });
  assert.equal(second.sent.length, 0);
});

function loadRoute(db, fetchImpl) {
  const fs = require("node:fs"), path = require("node:path"), babel = require("@babel/core");
  const filename = path.resolve(__dirname, "../pages/api/slack/add-to-list.js");
  const code = babel.transformSync(fs.readFileSync(filename, "utf8"), { babelrc: false, configFile: false,
    plugins: ["@babel/plugin-transform-dynamic-import", "@babel/plugin-transform-modules-commonjs"] }).code;
  const mod = { exports: {} };
  const localRequire = (value) => {
    if (value === "../../../utils/apiAuth") return { requireFirebaseAuth: async () => ACTOR };
    if (value === "../../../context/FirebaseAdmin") return { adminDb: db };
    if (value.startsWith(".")) return require(path.resolve(path.dirname(filename), value));
    return require(value);
  };
  new Function("module", "exports", "require", "globalThis", code)(mod, mod.exports, localRequire, { fetch: fetchImpl });
  return mod.exports;
}
function response() { return { writableEnded: false, statusCode: 200,
  status(code) { this.statusCode = code; return this; },
  json(value) { this.body = value; this.writableEnded = true; return this; } }; }
async function toolEnvironment(callback) {
  const values = { SLACK_BOT_TOKEN: "test-only", SLACK_LIST_TOOLS_ID: LIST,
    SLACK_LIST_TOOLS_TITLE_COL: "CTOOLS", SLACK_LIST_TOOLS_WO_COL: "CWO", SLACK_LIST_TOOLS_PHOTOS_COL: "CPHOTO" };
  const prior = Object.fromEntries(Object.keys(values).map((key) => [key, process.env[key]]));
  Object.assign(process.env, values);
  try { await callback(); } finally { for (const [key, value] of Object.entries(prior)) {
    if (value === undefined) delete process.env[key]; else process.env[key] = value;
  } }
}

test("actual shared HTTP handler guards old toolpage and work-order paths identically", async () => toolEnvironment(async () => {
  const { db } = setup();
  const calls = [];
  const route = loadRoute(db, async (url, options) => {
    calls.push(url); assert(url.endsWith("slackLists.items.list"));
    assert.equal(JSON.parse(options.body).list_id, LIST);
    return { ok: true, json: async () => ({ ok: true, items: [{ id: "RecExisting", fields: [{ column_id: "CTOOLS", text: `Old title (${ID})` }] }] }) };
  });
  const res = response();
  await route.default({ method: "POST", body: { listKey: "tools", title: `Old toolpage (${ID})`,
    toolIdentityGuarded: true, db: "untrusted", resumeRow: { rowId: "injected" } } }, res);
  assert.equal(res.body.alreadyExists, true); assert.equal(res.body.item_id, "RecExisting");
  const hooked = [], second = response();
  await route.sendSlackListItem({ method: "POST", body: { listKey: "tools", toolId: ID } }, second,
    { authUser: ACTOR, db, onRowCreated: async (row) => hooked.push(row) });
  assert.equal(second.body.alreadyExists, true); assert.equal(hooked[0].rowId, "RecExisting");
  assert.equal(calls.length, 2);
}));

test("actual HTTP handler creates only one authoritative tool row and denies malformed identity", async () => toolEnvironment(async () => {
  const { db } = setup(); db.records[`Tool/${ID}`].photoUrls = [];
  const calls = [], rows = [];
  const route = loadRoute(db, async (url, options) => {
    const payload = JSON.parse(options.body); calls.push({ url, payload });
    if (url.endsWith("slackLists.items.list")) return { ok: true, json: async () => ({ ok: true, items: rows }) };
    if (url.endsWith("slackLists.items.create")) {
      assert.match(JSON.stringify(payload), /Saved meter/); assert(!JSON.stringify(payload).includes("Untrusted"));
      rows.push({ id: "RecNew", fields: [{ column_id: "CTOOLS", text: `Saved meter (${ID})` }] });
      return { ok: true, json: async () => ({ ok: true, item: rows[0] }) };
    }
    assert(url.endsWith("slackLists.items.update")); return { ok: true, json: async () => ({ ok: true }) };
  });
  const bad = response(); await route.default({ method: "POST", body: { listKey: "tools", toolId: "AIS33" } }, bad);
  assert.equal(bad.statusCode, 400); assert.equal(calls.length, 0);
  const res = response(); await route.default({ method: "POST", body: { listKey: "tools", toolId: ID, title: "Untrusted" } }, res);
  assert.equal(res.body.ok, true); assert.equal(res.body.alreadyExists, false);
  const again = response(); await route.default({ method: "POST", body: { listKey: "tools", toolId: ID } }, again);
  assert.equal(again.body.alreadyExists, true);
  assert.equal(calls.filter((call) => call.url.endsWith("slackLists.items.create")).length, 1);
}));

test("tool receipt collection cannot be read or forged through catch-all rules", () => {
  const fs = require("node:fs"), path = require("node:path");
  const rules = fs.readFileSync(path.resolve(__dirname, "../firestore.rules"), "utf8");
  const wildcard = rules.slice(rules.indexOf("match /{collection}/{document=**}"));
  assert.equal((wildcard.match(/collection != "ToolSlackDeliveries"/g) || []).length, 2);
});

function workOrderSetup() {
  const context = setup();
  const { db, args } = context;
  const associationFrom = { clientId: "WAREHOUSE", machineId: "INTERIOR", trailerId: "", associationType: "machine" };
  const associationCurrent = { clientId: "CUSTOMER", machineId: "MACHINE", trailerId: "", associationType: "machine" };
  Object.assign(db.records[`Tool/${ID}`], { associationFrom, associationCurrent, movementDate: "2026-10-05",
    departure_date: "2026-10-05", selectionHistory: [{ action: "work_order_add", operationId: "tool-op-1" }] });
  const operationId = "tool-op-1";
  const operationPath = `InventoryWorkOrderAddOperations/${operationId}`;
  db.records[operationPath] = { type: "work_order_add_movement", createdBy: ACTOR, movementMode: "current_at_work_order",
    result: { operationId, ok: true, completedAt: new Date(NOW).toISOString(), itemCount: 1,
      items: [{ id: ID, kind: "tool", name: "Saved meter" }],
      slackTargets: [{ id: ID, kind: "tool", name: "Saved meter", itemIds: [ID] }],
      workOrder: { number: "10699" }, movementMode: "current_at_work_order" } };
  db.records[`Tool/${ID}/WorkOrderAddHistory/${operationId}`] = { itemId: ID, operationId, movementMode: "current_at_work_order",
    workOrder: { number: "10699" }, movementDate: "2026-10-05", afterConfiguration: { associationFrom, associationCurrent } };
  let threadCalls = 0;
  const bulk = { db, authUser: ACTOR, operationId, itemId: ID, now: () => NOW, logError: () => {},
    loadPhotos: async () => { throw new Error("Tools must not use regular inventory photo folders"); },
    sendThreadLink: async () => { threadCalls++; return { status: "sent", threadStatus: "sent" }; },
    sendItem: async (body, internal) => {
      try { return await service.sendToolToSlackOnce({ ...args, body, internal }); }
      catch (error) {
        if (error instanceof service.ToolSlackIdentityError) return { ok: false, error: error.code, message: error.message };
        throw error;
      }
    },
  };
  return { ...context, bulk, operationPath, receiptPath: `${operationPath}/SlackItems/${ID}`, threadCalls: () => threadCalls };
}

test("real bulk dispatcher plus shared tool guard keeps existing archived tools out of list and thread writes", async () => {
  const bulkService = require("../lib/inventory/workOrderAddSlack.cjs");
  const context = workOrderSetup(); context.state.archived.push(row());
  const result = await bulkService.sendConfirmedItemToSlack(context.bulk);
  assert.equal(result.status, "sent"); assert.equal(result.alreadyExists, true);
  assert.match(result.message, /archived/); assert.equal(context.threadCalls(), 0); assert.equal(context.sent.length, 0);
  assert.equal(context.db.records[context.receiptPath].threadLinkRequested, false);
});

test("bulk tool uncertainty is safely reconciled through the global guard without another create", async () => {
  const bulkService = require("../lib/inventory/workOrderAddSlack.cjs");
  const context = workOrderSetup(); const original = context.args.sendItem; let creates = 0;
  context.args.sendItem = async (_payload, hooks) => {
    await hooks.beforeCreate(); creates++; context.state.active.push(row()); throw new Error("Timeout waiting for create response");
  };
  assert.equal((await bulkService.sendConfirmedItemToSlack(context.bulk)).status, "uncertain");
  context.args.sendItem = async (...values) => { assert(values[1].resumeRow); return original(...values); };
  assert.equal((await bulkService.sendConfirmedItemToSlack(context.bulk)).status, "sent");
  assert.equal(creates, 1); assert.equal(context.sent.length, 1);
});

test("bulk tool lookup failure reports a safe actionable error instead of a generic Slack failure", async () => {
  const bulkService = require("../lib/inventory/workOrderAddSlack.cjs");
  const context = workOrderSetup();
  context.args.slackApi = async () => ({ ok: false, error: "missing_scope" });
  const result = await bulkService.sendConfirmedItemToSlack(context.bulk);
  assert.equal(result.status, "failed"); assert.equal(result.errorCode, "tool_slack_lookup_failed");
  assert.match(result.message, /could not check whether this tool is already on Slack/);
  assert.equal(context.sent.length, 0); assert.equal(context.threadCalls(), 0);
});

test("new bulk tool send retains persisted tool photos in its immutable payload", async () => {
  const bulkService = require("../lib/inventory/workOrderAddSlack.cjs");
  const context = workOrderSetup();
  const result = await bulkService.sendConfirmedItemToSlack(context.bulk);
  assert.equal(result.status, "sent"); assert.equal(result.alreadyExists, undefined);
  assert.deepEqual(context.sent[0].photoUrls, context.tool.photoUrls);
  assert.deepEqual(context.db.records[context.receiptPath].payload.photoUrls, context.tool.photoUrls);
  assert.deepEqual(context.db.records[PATH].payload.photoUrls, context.tool.photoUrls);
  assert.equal(context.threadCalls(), 1);
});
