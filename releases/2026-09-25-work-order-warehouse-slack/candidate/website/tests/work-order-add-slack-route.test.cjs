const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const babel = require("@babel/core");

function load(relativePath, mocks, fetchImpl = async () => { throw new Error("Network forbidden in tests"); }) {
  const filename = path.resolve(__dirname, "..", relativePath);
  const transformed = babel.transformSync(fs.readFileSync(filename, "utf8"), {
    babelrc: false, configFile: false,
    plugins: ["@babel/plugin-transform-dynamic-import", "@babel/plugin-transform-modules-commonjs"],
  }).code;
  const module = { exports: {} };
  const localRequire = (request) => {
    if (Object.hasOwn(mocks, request)) return mocks[request];
    return require(request.startsWith(".") ? path.resolve(path.dirname(filename), request) : request);
  };
  new Function("module", "exports", "require", "globalThis", "fetch", transformed)(module, module.exports, localRequire, { fetch: fetchImpl }, fetchImpl);
  return module.exports;
}
function response() {
  return { statusCode: 200, headers: {}, writableEnded: false, headersSent: false,
    setHeader(k,v) { this.headers[k] = v; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; this.writableEnded = this.headersSent = true; return this; } };
}
const ACTOR = { uid: "staff", email: "staff@advancedimagingparts.com" };

test("bulk endpoint authenticates and rejects caller payload, direction and row overrides", async () => {
  let calls = 0;
  const handler = load("pages/api/items/work-order-add/slack.js", {
    "../../../../context/FirebaseAdmin": { adminDb: {} },
    "../../../../lib/inventory/storageUnitScanApi": {
      requireStorageScanUser: async () => ACTOR,
      hasOnlyBodyKeys: (body, keys) => body && Object.keys(body).every((key) => keys.includes(key)),
      setStorageScanResponseHeaders: (res) => res.setHeader("Cache-Control", "private, no-store"),
    },
    "../../../../lib/inventory/workOrderAddSlack.cjs": { sendConfirmedItemToSlack: async () => { calls++; } },
    "../../slack/add-to-list": {},
  }).default;
  for (const key of ["listKey", "direction", "rowId", "payload", "authUser", "itemIds"]) {
    const res = response();
    await handler({ method: "POST", body: { operationId: "op", itemId: "AIS1", [key]: "fake" } }, res);
    assert.equal(res.statusCode, 400);
    assert.match(res.headers["Cache-Control"], /no-store/);
  }
  assert.equal(calls, 0);
});

test("bulk endpoint sends only server-derived payload through the existing Shipping/Receiving implementation", async () => {
  const calls = [];
  const handler = load("pages/api/items/work-order-add/slack.js", {
    "../../../../context/FirebaseAdmin": { adminDb: "db", adminBucket: "bucket" },
    "../../../../lib/inventory/storageUnitScanApi": {
      requireStorageScanUser: async () => ACTOR,
      hasOnlyBodyKeys: () => true, setStorageScanResponseHeaders: () => {},
    },
    "../../../../lib/inventory/workOrderAddSlack.cjs": { sendConfirmedItemToSlack: async (input) => {
      assert.equal(input.db, "db"); assert.equal(input.bucket, "bucket"); assert.equal(input.authUser, ACTOR);
      assert.deepEqual(await input.sendItem({ title: "Saved item" }, { authUser: ACTOR }), { ok: true });
      return { itemId: input.itemId, status: "sent" };
    } },
    "../../slack/add-to-list": { sendSlackListItem: async (req, res, internal) => {
      calls.push(req.body); assert.equal(internal.authUser, ACTOR); assert.equal(typeof internal.fetchImpl, "function");
      res.status(200).json({ ok: true });
    } },
  }).default;
  const res = response();
  await handler({ method: "POST", body: { operationId: "op", itemId: "AIS1" } }, res);
  assert.equal(res.body.result.status, "sent");
  assert.deepEqual(calls, [{ title: "Saved item" }]);
});

test("bulk endpoint does not touch the service without authenticated staff or POST", async () => {
  const handler = load("pages/api/items/work-order-add/slack.js", {
    "../../../../context/FirebaseAdmin": {},
    "../../../../lib/inventory/storageUnitScanApi": {
      requireStorageScanUser: async (_req,res) => { res.status(403).json({ ok: false }); return null; },
      setStorageScanResponseHeaders: () => {},
    },
    "../../../../lib/inventory/workOrderAddSlack.cjs": {}, "../../slack/add-to-list": {},
  }).default;
  const denied = response(); await handler({ method: "POST" }, denied); assert.equal(denied.statusCode,403);
  const wrong = response(); await handler({ method: "GET" }, wrong); assert.equal(wrong.statusCode,405);
});

async function withSlackEnv(run) {
  const values = { SLACK_BOT_TOKEN: "test-only", SLACK_LIST_SHIPPING_ID: "L1",
    SLACK_LIST_SHIPPING_TITLE_COL: "CT", SLACK_LIST_SHIPPING_DESCRIPTION_COL: "CD",
    SLACK_LIST_SHIPPING_PNSN_COL: "CP", SLACK_LIST_SHIPPING_WO_COL: "CW",
    SLACK_LIST_SHIPPING_LOCALSN_COL: "CL", SLACK_LIST_SHIPPING_TRACKING_COL: "CK",
    SLACK_LIST_SHIPPING_PHOTOS_COL: "CF", SLACK_LIST_SHIPPING_DATE_COL: "CDate" };
  const prior = Object.fromEntries(Object.keys(values).map((key) => [key, process.env[key]]));
  Object.assign(process.env, values);
  try { await run(); } finally { for (const [key,value] of Object.entries(prior)) { if (value === undefined) delete process.env[key]; else process.env[key] = value; } }
}
function slackModule(fetchImpl) {
  const movements = [], authCalls = [];
  const mod = load("pages/api/slack/add-to-list.js", {
    "../../../utils/apiAuth": { requireFirebaseAuth: async (req) => { authCalls.push(req); return ACTOR; } },
    "../../../lib/ops/workOrders": { recordOpsInventoryMovement: async (input) => { movements.push(input); return { attached: true }; } },
  }, fetchImpl);
  return { ...mod, movements, authCalls };
}
const BODY = { listKey: "shipping", title: "Saved motor (AIS1)", pn_sn: "PN: P1 SN: S1", work_order: "10658",
  local_sn: "AIS1", shipping_date: "2026-09-25", description: "Saved description", photoUrls: [] };

test("shared sender checkpoints row before filling fields and records same Ops movement", async () => withSlackEnv(async () => {
  const order = [], requests = [];
  const api = slackModule(async (url, options) => {
    requests.push(JSON.parse(options.body));
    if (url.endsWith("items.create")) { order.push("create"); return { json: async () => ({ ok: true, item: { id: "R1" } }) }; }
    assert(url.endsWith("items.update")); order.push("update"); return { json: async () => ({ ok: true }) };
  });
  const res = response();
  await api.sendSlackListItem({ method: "POST", body: BODY }, res, {
    authUser: ACTOR, beforeCreate: async () => order.push("intent"),
    onRowCreated: async (row) => { assert.deepEqual(row,{ listId:"L1",rowId:"R1" }); order.push("checkpoint"); },
  });
  assert.deepEqual(order, ["intent","create","checkpoint","update"]);
  assert.equal(res.body.ok,true); assert.equal(api.authCalls.length,0);
  assert.equal(api.movements[0].sourceId, "L1-R1"); assert.equal(api.movements[0].direction,"shipping");
  assert.equal(api.movements[0].itemId,"AIS1"); assert.equal(api.movements[0].workOrderNumber,"10658");
  assert(requests[1].cells.some((cell) => cell.column_id === "CDate" && cell.date[0] === "2026-09-25"));
}));

test("shared sender resumes existing row, rejects changed list, and never recreates on update failure", async () => withSlackEnv(async () => {
  let calls = 0;
  const api = slackModule(async (url) => { calls++; assert(url.endsWith("items.update")); return { json: async () => ({ ok: false, error:"ratelimited" }) }; });
  const res = response();
  await api.sendSlackListItem({ method:"POST",body:BODY },res,{ authUser:ACTOR,resumeRow:{listId:"L1",rowId:"R1"} });
  assert.equal(res.body.ok,false); assert.equal(calls,1);
  const mismatch = response();
  await api.sendSlackListItem({method:"POST",body:BODY},mismatch,{authUser:ACTOR,resumeRow:{listId:"OTHER",rowId:"R1"}});
  assert.equal(mismatch.statusCode,409); assert.equal(calls,1);
}));

test("default item-button handler cannot trust internal controls from HTTP body", async () => withSlackEnv(async () => {
  const urls=[];
  const api=slackModule(async (url)=>{ urls.push(url); return {json:async()=>({ok:true,item:{id:"R1"}})}; });
  const res=response();
  await api.default({method:"POST",body:{...BODY, authUser:{uid:"fake"},resumeRow:{listId:"L1",rowId:"FAKE"}}},res);
  assert.equal(api.authCalls.length,1); assert(urls.some((url)=>url.endsWith("items.create")));
  assert.equal(res.body.item_id,"R1");
}));

test("failed photo downloads are not uploaded as images and the ten-photo limit is disclosed", async () => withSlackEnv(async () => {
  let downloads = 0;
  const api = slackModule(async (url) => {
    if (url.startsWith("https://example.test/")) {
      downloads++;
      return { ok: false, status: 404, arrayBuffer: async () => { throw new Error("Do not consume error pages as images"); } };
    }
    assert(!url.includes("files."), "No image upload is permitted after a failed download");
    return { json: async () => ({ ok: true, item: { id: "R1" } }) };
  });
  const res = response();
  await api.sendSlackListItem({ method: "POST", body: { ...BODY,
    photoUrls: Array.from({ length: 11 }, (_, i) => `https://example.test/${i}.jpg`) } }, res, { authUser: ACTOR });
  assert.equal(res.body.ok, true);
  assert.equal(downloads, 10);
  assert(res.body.warnings.some((value) => /up to 10/.test(value)));
  assert(res.body.warnings.some((value) => /could not be attached/.test(value)));
}));
