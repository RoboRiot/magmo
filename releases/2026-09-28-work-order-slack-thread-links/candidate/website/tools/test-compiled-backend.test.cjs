"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict"), test = require("node:test"), { createRequire } = require("node:module"), { spawnSync } = require("node:child_process");
const T = require("../../ot-collapse-20260928/factory-tools.cjs");
const here = __dirname, root = path.resolve(here, "../../.."), source = path.join(here, "source"), candidate = path.join(here, "scoped-source");
const report = JSON.parse(T.read(path.join(here, "composition-report.json"))), api = ".next/server/pages/api/items/work-order-add/slack.js";
for (const key of Object.keys(process.env)) if (/^(?:SLACK_|FIREBASE_|GOOGLE_APPLICATION_CREDENTIALS$)|(?:TOKEN|SECRET|PASSWORD|PRIVATE_KEY|CLIENT_EMAIL|SERVICE_ACCOUNT)/i.test(key)) delete process.env[key];
globalThis.fetch = async () => { throw new Error("Ambient network disabled in compiled tests."); };
const routeCode = T.read(path.join(candidate, api)), factories = new Map();
for (const relative of [api, ...T.loaderChunks(routeCode).map((id) => `.next/server/chunks/${id}.js`)]) {
  const filename = path.join(candidate, relative);
  for (const { id, source: factory } of T.factories(T.read(filename))) factories.set(id, new Function("require", `return (${factory});`)(createRequire(filename)));
}
function runtime(overrides = {}) {
  const cache = new Map();
  function webpackRequire(id) {
    if (Object.hasOwn(overrides, id)) return overrides[id];
    if (cache.has(id)) return cache.get(id).exports;
    const factory = factories.get(id); assert.equal(typeof factory, "function", `Missing actual compiled module ${id}`);
    const module = { exports: {} }; cache.set(id, module); factory(module, module.exports, webpackRequire); return module.exports;
  }
  webpackRequire.d = (exports, definition) => { for (const [key, get] of Object.entries(definition)) Object.defineProperty(exports, key, { enumerable: true, get }); };
  webpackRequire.r = (exports) => { Object.defineProperty(exports, "__esModule", { value: true }); };
  webpackRequire.n = (value) => () => value?.__esModule ? value.default : value;
  webpackRequire.o = (value, key) => Object.hasOwn(value, key);
  webpackRequire.a = (module, callback) => {
    const exports = module.exports; let done, fail; module.exports = new Promise((resolve, reject) => { done = resolve; fail = reject; });
    callback((dependencies) => dependencies, (error) => error ? fail(error) : done(exports));
  };
  return webpackRequire;
}
const actualRuntime = runtime(), compiledService = actualRuntime(report.serviceModuleId), compiledThread = actualRuntime(report.threadModuleId);
assert.equal(typeof compiledService.sendConfirmedItemToSlack, "function"); assert.equal(typeof compiledThread.sendConfirmedItemThreadLink, "function");
// Execute the same mocked behavior/race suites against exact compiled factory
// bodies. Only their service import is redirected, never their assertions.
for (const relative of ["test/work-order-add-slack.test.cjs", "test/work-order-add-slack-thread.test.cjs"]) {
  const filename = path.join(root, relative), localRequire = createRequire(filename), sourceCode = T.read(filename);
  const intercepted = (request) => request === "../lib/inventory/workOrderAddSlack.cjs" ? compiledService : request === "../lib/inventory/workOrderAddSlackThread.cjs" ? compiledThread : localRequire(request);
  new Function("require", "module", "exports", "__filename", "__dirname", sourceCode)(intercepted, { exports: {} }, {}, filename, path.dirname(filename));
}
test("exact overlay retains all 504 baseline files, 139 old assets, all shared chunks and unrelated API bytes", () => {
  const before = T.walk(source).map((file) => T.slash(path.relative(source, file))), after = T.walk(candidate).map((file) => T.slash(path.relative(candidate, file)));
  assert.equal(before.length, 504); assert.equal(after.length, 507); assert.equal(report.metadataChanges.length, 60);
  assert.deepEqual(after.filter((file) => !before.includes(file)).sort(), report.added);
  assert.equal(before.filter((file) => file.startsWith(".next/static/")).length, 139);
  for (const file of before) {
    assert(after.includes(file), file);
    const old = fs.readFileSync(path.join(source, file)), current = fs.readFileSync(path.join(candidate, file));
    if (report.metadataChanges.includes(file)) {
      let reversed = current.toString("utf8");
      for (const [from, to] of [...report.substitutions].reverse()) reversed = reversed.split(to).join(from);
      assert.equal(reversed, old.toString("utf8"), `Non-reversible metadata ${file}`);
    } else if (file !== api) assert.equal(T.sha(current), T.sha(old), file);
  }
});
test("only handler/service factories and two reviewed local helpers change in API route", () => {
  const old = new Map(T.factories(T.read(path.join(source, api))).map(({ id, source }) => [id, source]));
  const current = new Map(T.factories(routeCode).map(({ id, source }) => [id, source]));
  assert.deepEqual([...current.keys()].filter((id) => !old.has(id)).sort((a, b) => a - b), [92765, 97306]);
  for (const [id, factory] of old) if (![10985, 99397].includes(id)) assert.equal(current.get(id), factory);
  assert.deepEqual(T.loaderChunks(routeCode), [5030, 4354, 1572]);
  assert.equal(current.get(92765), T.getFactory(T.read(path.join(source, ".next/server/pages/api/ops/service-requests.js")), 92765));
  for (const id of [10985, 99397, 92765, 97306]) for (const required of T.requiredIds(current.get(id))) assert(factories.has(required), `${id} requires ${required}`);
});
test("actual composed route cold-loads under unmodified deployed webpack runtime without credentials", () => {
  const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !/TOKEN|SECRET|PASSWORD|PRIVATE|FIREBASE|GOOGLE_APPLICATION_CREDENTIALS|SLACK_/i.test(key)));
  const script = `global.fetch=async()=>{throw Error('Network forbidden')}; Promise.resolve(require(${JSON.stringify(path.join(candidate, api))})).then(x=>{if(!x)throw Error('Missing route');console.log('COMPILED_COLD_LOAD_PASS')}).catch(e=>{console.error(e.message);process.exitCode=1});`;
  const result = spawnSync(process.execPath, ["-e", script], { cwd: candidate, env, encoding: "utf8", timeout: 30000, windowsHide: true });
  assert.equal(result.status, 0, result.stderr); assert.match(result.stdout, /COMPILED_COLD_LOAD_PASS/);
});
function response() { return { headers: {}, statusCode: 200, headersSent: false, writableEnded: false, setHeader(key, value) { this.headers[key] = value; }, status(value) { this.statusCode = value; return this; }, json(value) { this.body = value; this.headersSent = this.writableEnded = true; return this; } }; }
test("compiled handler keeps staff/method/body gates and passes one bounded fetch to list and thread workflows", async () => {
  const actor = { uid: "mock-staff" }, calls = [], db = {}, bucket = {};
  const errors = class extends Error {};
  const custom = runtime({
    52771: { adminDb: db, ck: bucket },
    66712: { kn: (res) => res.setHeader("Cache-Control", "private, no-store"), tP: async () => actor, DJ: (body, keys) => body && Object.keys(body).every((key) => keys.includes(key)) },
    99397: { WorkOrderSlackError: errors, sendConfirmedItemToSlack: async (input) => {
      calls.push(input); assert.equal(input.db, db); assert.equal(input.bucket, bucket); assert.equal(input.authUser, actor); assert.equal(typeof input.fetchImpl, "function");
      assert.deepEqual(await input.sendItem({ title: "Saved" }, { authUser: actor }), { ok: true }); return { status: "sent", listStatus: "sent", threadStatus: "sent" };
    } },
    1572: { sendSlackListItem: async (req, res, internal) => { assert.deepEqual(req.body, { title: "Saved" }); assert.equal(internal.authUser, actor); assert.equal(internal.fetchImpl, calls.at(-1).fetchImpl); res.json({ ok: true }); } },
  });
  const handler = (await custom(10985)).default;
  const wrong = response(); await handler({ method: "GET" }, wrong); assert.equal(wrong.statusCode, 405);
  for (const key of ["channel", "thread_ts", "rowId", "threadLinkRequested", "fetchImpl", "blocks"]) { const res = response(); await handler({ method: "POST", body: { operationId: "op-1", itemId: "AIS123", [key]: "injected" } }, res); assert.equal(res.statusCode, 400); }
  assert.equal(calls.length, 0);
  const saved = response(); await handler({ method: "POST", body: { operationId: "op-1", itemId: "AIS123" } }, saved); assert.equal(saved.statusCode, 200); assert.equal(saved.body.result.threadStatus, "sent"); assert.equal(calls.length, 1);
  const unauthorized = runtime({ 52771: {}, 66712: { kn: () => {}, tP: async (_req, res) => { res.status(401).json({ ok: false }); return null; } }, 99397: {}, 1572: {} });
  const denied = response(); await (await unauthorized(10985)).default({ method: "POST", body: {} }, denied); assert.equal(denied.statusCode, 401);
});
