const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const babel = require("@babel/core");
const { loadToolLabelPayload } = require("../lib/inventory/toolLabelData.cjs");
const { selectToolWorkOrderIndex } = require("../lib/inventory/toolWorkOrderSelection.cjs");

test("saved Tool document is authoritative; unrelated identity fields cannot replace barcode", async () => {
  const reads = [];
  const payload = await loadToolLabelPayload({ toolId: "ais-t47", db: { collection(name) { return { doc(id) { reads.push(`${name}/${id}`); return { get: async () => ({ exists: true, data: () => ({ name: "Meter", localSN: "AIS99999", id: "AIS99999", description: "First\nsecond", oem: ["A", "B"] }) }) }; } }; } } });
  assert.deepEqual(reads, ["Tool/AIS_T00047"]);
  assert.equal(payload.barcode_value, "AIS_T00047");
  assert.equal(payload.qr_value, "https://magmo.cloud/NewSearch/Tools/AIS_T00047");
  assert.equal(payload.description, "First second");
  assert.equal(payload.oem, "A, B");
});

test("invalid/missing/archived tools fail without writes", async () => {
  await assert.rejects(loadToolLabelPayload({toolId: "33551"}), { code: "invalid_tool_id" });
  const db = (data, exists = true) => ({ collection() { return { doc() { return { get: async () => ({ exists, data: () => data }) }; } }; } });
  await assert.rejects(loadToolLabelPayload({toolId: "AIS_T00047", db: db({}, false)}), { code: "tool_not_found" });
  await assert.rejects(loadToolLabelPayload({toolId: "AIS_T00047", db: db({archived: true})}), { code: "tool_unavailable" });
  await assert.rejects(loadToolLabelPayload({toolId: "AIS_T00047", db: db({isDeleted: true})}), { code: "tool_unavailable" });
  await assert.rejects(loadToolLabelPayload({toolId: "AIS_T00047", db: db({deletedAt: "2026-10-05"})}), { code: "tool_unavailable" });
});

test("tool current work order honors scanner assignment and explicit editor selection", () => {
  const orders = [{workOrder: "100", date: "2026-01-01"}, {workOrder: "200", date: "2026-09-01"}, {workOrder: "", date: ""}];
  assert.equal(selectToolWorkOrderIndex(orders, "100"), 0);
  assert.equal(selectToolWorkOrderIndex(orders, "100", 2), 2);
  assert.equal(selectToolWorkOrderIndex(orders, "missing"), 1);
  assert.equal(selectToolWorkOrderIndex(orders, "100", 99), 0);
});

function loadRoute(authenticated = true) {
  const filename = path.resolve(__dirname, "../pages/api/print/tool-label.js");
  const module = {exports: {}};
  const source = babel.transformSync(fs.readFileSync(filename, "utf8"), {filename, babelrc:false, configFile:false, plugins:["@babel/plugin-transform-modules-commonjs"]}).code;
  const mocks = {
    "../../../utils/apiAuth": {requireFirebaseAuth: async (_req,res) => {if (!authenticated) res.status(401).json({ok:false});}},
    "../../../context/FirebaseAdmin": {adminDb:{}},
    "../../../lib/inventory/toolLabelData.cjs": {loadToolLabelPayload: async ({toolId}) => {if (toolId === "missing") throw Object.assign(new Error("Not found"), {statusCode:404}); return {tool_id:"AIS_T00047", name:"Server-owned name"};}},
  };
  new Function("require", "module", "exports", source)((name) => mocks[name], module, module.exports);
  return module.exports.default;
}
function response() { return {writableEnded:false, headers:{}, setHeader(k,v){this.headers[k]=v;}, status(n){this.statusCode=n; return this;}, json(value){this.body=value; this.writableEnded=true; return this;}}; }

test("print route rejects unauthenticated, extra label content, and nonexistent tool", async () => {
  const oldToken=process.env.STORAGE_SCAN_BRIDGE_TOKEN; process.env.STORAGE_SCAN_BRIDGE_TOKEN="t".repeat(32);
  try {
    let res=response(); await loadRoute(false)({method:"POST",body:{toolId:"AIS_T00047"}},res); assert.equal(res.statusCode,401);
    res=response(); await loadRoute()({method:"POST",body:{toolId:"AIS_T00047",name:"Fake"}},res); assert.equal(res.statusCode,400);
    res=response(); await loadRoute()({method:"POST",body:{toolId:"missing"}},res); assert.equal(res.statusCode,404);
  } finally {if(oldToken===undefined) delete process.env.STORAGE_SCAN_BRIDGE_TOKEN; else process.env.STORAGE_SCAN_BRIDGE_TOKEN=oldToken;}
});

test("print route sends authoritative payload once; uncertain response never retries", async () => {
  const oldToken=process.env.STORAGE_SCAN_BRIDGE_TOKEN, oldFetch=global.fetch;
  process.env.STORAGE_SCAN_BRIDGE_TOKEN="t".repeat(32);
  const calls=[];
  try {
    global.fetch=async (url,options) => {calls.push({url,options}); return {ok:true,status:200,json:async()=>({ok:true})};};
    let res=response(); await loadRoute()({method:"POST",body:{toolId:"AIS_T00047"}},res);
    assert.equal(res.statusCode,200); assert.equal(calls.length,1);
    assert.equal(JSON.parse(calls[0].options.body).name,"Server-owned name");
    assert.match(calls[0].options.headers.Authorization,/^Bearer /);
    global.fetch=async()=>{calls.push({}); throw Object.assign(new Error("secret URL detail"),{name:"AbortError"});};
    res=response(); await loadRoute()({method:"POST",body:{toolId:"AIS_T00047"}},res);
    assert.equal(res.statusCode,504); assert.equal(calls.length,2);
    assert.equal(res.body.code,"tool_label_delivery_uncertain"); assert.doesNotMatch(JSON.stringify(res.body),/secret URL/);
  } finally {global.fetch=oldFetch; if(oldToken===undefined) delete process.env.STORAGE_SCAN_BRIDGE_TOKEN; else process.env.STORAGE_SCAN_BRIDGE_TOKEN=oldToken;}
});

test("tool page has no implicit save in print path and handles already-present Slack tools", () => {
  const source=fs.readFileSync(path.resolve(__dirname,"../pages/NewSearch/Tools/[id]/index.js"),"utf8");
  const print=source.slice(source.indexOf("const handlePrintLabel ="),source.indexOf("const removeHistoryEntry ="));
  assert.doesNotMatch(print,/saveTool\(/);
  assert.match(print,/toolId: routeId/);
  assert.match(source,/title: alreadyExists \? "Already on Slack"/);
  assert.match(source,/listKey: "tools",\s+toolId,/);
});
