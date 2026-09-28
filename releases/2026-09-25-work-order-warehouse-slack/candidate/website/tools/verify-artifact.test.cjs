"use strict";

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const test = require("node:test");
const { createRequire } = require("node:module");

const here = __dirname;
const root = path.resolve(here, "../../..");
const source = path.join(here, "source");
const candidate = path.join(here, "scoped-source");
const report = JSON.parse(fs.readFileSync(path.join(here, "composition-report.json"), "utf8"));
const frozen = JSON.parse(fs.readFileSync(path.join(here, "frozen-inputs.json"), "utf8"));
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const read = (base, relative) => fs.readFileSync(path.join(base, relative), "utf8");
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
  entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);

// Force every executable gate to use no inherited production credential and
// no ambient network. Individual tests inject only synthetic values/mocks.
for (const key of Object.keys(process.env)) {
  if (/^(?:SLACK_|FIREBASE_|GOOGLE_APPLICATION_CREDENTIALS$)|(?:TOKEN|SECRET|PASSWORD|PRIVATE_KEY|CLIENT_EMAIL|SERVICE_ACCOUNT)/i.test(key)) {
    delete process.env[key];
  }
}
globalThis.fetch = async () => {
  throw new Error("Network access is disabled in packaged verification.");
};
process.chdir(candidate);

function responseRecorder() {
  const result = { status: null, body: null, headers: {} };
  const response = {
    headersSent: false,
    writableEnded: false,
    setHeader(name, value) { result.headers[String(name).toLowerCase()] = String(value); },
    status(value) { result.status = value; this.statusCode = value; return this; },
    json(value) { result.body = value; this.headersSent = true; this.writableEnded = true; return this; },
    end(value) { result.body = value; this.headersSent = true; this.writableEnded = true; return this; },
  };
  return { result, response };
}

async function loadRoute(relative) {
  const filename = path.join(candidate, relative);
  const loaded = require(filename);
  return typeof loaded?.then === "function" ? await loaded : loaded;
}

async function invoke(handler, request) {
  const { result, response } = responseRecorder();
  await handler(request, response);
  return result;
}

async function exposeRuntime(relative) {
  const filename = path.join(candidate, relative);
  const code = fs.readFileSync(filename, "utf8");
  assert.equal(code.split("module.exports=c").length, 2, `Unexpected route wrapper: ${relative}`);
  const modified = code.replace("module.exports=c", "module.exports={loaded:c,runtime:b}");
  const localModule = { exports: {} };
  new Function("require", "module", "exports", "__filename", "__dirname", modified)(
    createRequire(filename), localModule, localModule.exports, filename, path.dirname(filename)
  );
  await localModule.exports.loaded;
  return localModule.exports.runtime;
}

class Snapshot {
  constructor(reference, value) {
    this.ref = reference;
    this.id = reference.id;
    this.exists = value !== undefined;
    this.value = value;
  }
  data() { return this.value && JSON.parse(JSON.stringify(this.value)); }
}

class Reference {
  constructor(db, documentPath) {
    this.db = db;
    this.path = documentPath;
    this.id = documentPath.split("/").at(-1);
  }
  collection(name) { return new Collection(this.db, `${this.path}/${name}`); }
  async get() { return new Snapshot(this, this.db.records.get(this.path)); }
}

class Collection {
  constructor(db, collectionPath) { this.db = db; this.path = collectionPath; }
  doc(id) { return new Reference(this.db, `${this.path}/${id}`); }
}

class ReadOnlyDb {
  constructor(seed) { this.records = new Map(Object.entries(seed)); }
  collection(name) { return new Collection(this, name); }
}

function warehouseSeed(sourceClientId) {
  const locationId = sourceClientId === "AIS94688" ? "39226291" : "35057801";
  return {
    "OpsWorkOrders/10658": {
      workOrderId: "10658",
      number: "10658",
      subject: "Warehouse transfer",
      workflowStatus: "active",
      clientId: sourceClientId,
      bluefolderCustomerId: "34579389",
      bluefolderLocationId: locationId,
      bluefolderEquipmentIds: [],
      bluefolderEquipmentNames: [],
    },
    "Client/AIS94688": {
      name: "AIS - Lake Forest",
      bluefolderCustomerId: "34579389",
      bluefolderLocationId: "39226291",
      bluefolderLocationAliasKeys: ["34579389:39226291"],
      machines: [],
    },
    "Client/AIS17182": {
      name: "SoCalWarehouse - Lake Forest",
      location: "Lake Forest",
      machines: [{ path: "Machine/AIS42516", id: "AIS42516" }],
    },
    "Machine/AIS42516": {
      name: "Interior SoCal",
      client: { path: "Client/AIS17182", id: "AIS17182" },
      associatedParts: [],
    },
    "Client/AIS89914": {
      name: "Advanced Imaging Services, Inc.",
      bluefolderCustomerId: "34579389",
      bluefolderLocationId: "35057801",
      address: {
        street: "17410 Murphy Pkwy.", city: "Lathrop", state: "CA",
        postalCode: "95330", country: "United States",
      },
      machines: [],
    },
    "Client/AIS25097": {
      name: "NorCal Warehouse - Lathrop",
      location: "Lathrop",
      machines: [{ path: "Machine/AIS12954", id: "AIS12954" }],
    },
    "Machine/AIS12954": {
      name: "interior NorCal",
      client: { path: "Client/AIS25097", id: "AIS25097" },
      associatedParts: [],
    },
  };
}

test("composition is based on the exact ACTIVE00061 archive and frozen production sources", () => {
  assert.equal(report.baselineRevision, "nextserverwest-00061-rej");
  assert.equal(report.baselineArchiveSHA256, "075a5c40481f4e9f8b83261995cecd8be22c435d8ba89badf40f27cf97e9ae77");
  assert.equal(sha256(fs.readFileSync(path.join(here, "source.zip"))), report.baselineArchiveSHA256);
  for (const [relative, expected] of Object.entries(frozen.inputs)) {
    assert.equal(sha256(fs.readFileSync(path.join(root, relative))), expected, relative);
  }
  assert.equal(report.externalMachineLinkHelperPreserved, true);
  assert.equal(read(source, ".next/server/chunks/8806.js"), read(candidate, ".next/server/chunks/8806.js"));
  for (const relative of [
    ".next/server/pages/api/slack/add-to-list.js",
    ".next/server/pages/api/items/work-order-add/slack.js",
  ]) {
    const wrapper = read(candidate, relative);
    assert.equal((wrapper.match(/distDir:\"\.next\"/g) || []).length, 1, relative);
    assert(!wrapper.includes("fresh-next-root"), relative);
    assert(!wrapper.includes("build-workspace"), relative);
  }
  assert.deepEqual(report.buildWorkspaceLeaks, []);
});

test("all pre-existing immutable static assets remain byte-identical", () => {
  for (const filename of walk(path.join(source, ".next/static"))) {
    const relative = path.relative(source, filename);
    assert.equal(sha256(fs.readFileSync(filename)), sha256(fs.readFileSync(path.join(candidate, relative))), relative);
  }
});

test("candidate excludes environment and credential source files", () => {
  const forbidden = /(^|\/)(?:\.env(?:\..*)?|.*(?:service[-_]?account|firebase-adminsdk|credentials?\.(?:json|pem|key)).*)(?:$|\/)/i;
  for (const filename of walk(candidate)) {
    assert(!forbidden.test(path.relative(candidate, filename).replaceAll("\\", "/")));
  }
  assert.deepEqual(report.forbiddenNames, []);
  assert.deepEqual(report.embeddedSensitiveNames, []);
});

test("compiled warehouse service resolves only the four reviewed warehouse identities", async () => {
  const runtime = await exposeRuntime(".next/server/pages/api/items/work-order-add/confirm.js");
  const service = runtime(54354);
  assert.equal(typeof service.resolveWorkOrderDestination, "function");
  for (const [sourceClientId, targetClientId, machineId] of [
    ["AIS94688", "AIS17182", "AIS42516"],
    ["AIS17182", "AIS17182", "AIS42516"],
    ["AIS89914", "AIS25097", "AIS12954"],
    ["AIS25097", "AIS25097", "AIS12954"],
  ]) {
    const db = new ReadOnlyDb(warehouseSeed(sourceClientId));
    const destination = await service.resolveWorkOrderDestination(
      { get: (reference) => reference.get() }, db, "10658", "2026-09-25T22:00:00.000Z"
    );
    assert.equal(destination.workOrder.sourceClientId, sourceClientId);
    assert.equal(destination.workOrder.clientId, targetClientId);
    assert.equal(destination.workOrder.machineId, machineId);
    assert.equal(destination.association.clientId, targetClientId);
    assert.equal(destination.association.machineId, machineId);
    assert.equal(destination.association.warehouseInteriorDefault, true);
  }
});

test("compiled warehouse service fails closed for selected equipment and alias identity drift", async () => {
  const runtime = await exposeRuntime(".next/server/pages/api/items/work-order-add/confirm.js");
  const service = runtime(54354);
  const selected = warehouseSeed("AIS94688");
  selected["OpsWorkOrders/10658"].bluefolderEquipmentIds = ["BF-SCANNER"];
  await assert.rejects(
    service.resolveWorkOrderDestination({ get: (reference) => reference.get() }, new ReadOnlyDb(selected), "10658", "2026-09-25T22:00:00.000Z"),
    (error) => error.code === "work_order_machine_not_linked"
  );
  const drifted = warehouseSeed("AIS89914");
  drifted["OpsWorkOrders/10658"].bluefolderLocationId = "OTHER";
  await assert.rejects(
    service.resolveWorkOrderDestination({ get: (reference) => reference.get() }, new ReadOnlyDb(drifted), "10658", "2026-09-25T22:00:00.000Z"),
    (error) => error.code === "work_order_warehouse_source_mismatch"
  );
});

test("all composed API routes cold-load; method and auth gates do not touch Slack", async () => {
  const routes = {
    options: await loadRoute(".next/server/pages/api/items/work-order-add/options.js"),
    confirm: await loadRoute(".next/server/pages/api/items/work-order-add/confirm.js"),
    slack: await loadRoute(".next/server/pages/api/items/work-order-add/slack.js"),
    addToList: await loadRoute(".next/server/pages/api/slack/add-to-list.js"),
  };
  for (const [name, route] of Object.entries(routes)) {
    assert.equal(typeof route.default, "function", name);
  }
  assert.equal((await invoke(routes.options.default, { method: "POST", headers: {}, query: {} })).status, 405);
  assert.equal((await invoke(routes.confirm.default, { method: "GET", headers: {}, body: {} })).status, 405);
  assert.equal((await invoke(routes.slack.default, { method: "GET", headers: {}, body: {} })).status, 405);
  assert.equal((await invoke(routes.slack.default, { method: "POST", headers: {}, body: {} })).status, 401);
  assert.equal((await invoke(routes.addToList.default, { method: "GET", headers: {}, body: {} })).status, 405);
  assert.equal((await invoke(routes.addToList.default, { method: "POST", headers: {}, body: {} })).status, 401);
});

let compiledSlackHelper;
test.before(async () => {
  const runtime = await exposeRuntime(".next/server/pages/api/items/work-order-add/slack.js");
  compiledSlackHelper = runtime(99397);
  assert.equal(typeof compiledSlackHelper.sendConfirmedItemToSlack, "function");
});

function runTestFile(filename, replacements) {
  const code = fs.readFileSync(filename, "utf8");
  new Function("require", "__dirname", "__filename", code)(
    (request) => Object.hasOwn(replacements, request)
      ? replacements[request]
      : require(request.startsWith(".") ? path.resolve(path.dirname(filename), request) : request),
    path.dirname(filename),
    filename
  );
}

const compiledSlackProxy = new Proxy({}, {
  get(_target, property) {
    assert(compiledSlackHelper, "Compiled Slack helper was not initialized.");
    return compiledSlackHelper[property];
  },
});
runTestFile(path.join(root, "test/work-order-add-slack.test.cjs"), {
  "../lib/inventory/workOrderAddSlack.cjs": compiledSlackProxy,
});
