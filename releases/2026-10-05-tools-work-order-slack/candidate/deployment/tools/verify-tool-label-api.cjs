"use strict";
// Exact compiled route, real baseline webpack runtime, mocked auth/DB/printer.
const fs = require("node:fs"), path = require("node:path"), vm = require("node:vm"), assert = require("node:assert/strict");
const T = require("../../ot-collapse-20260928/factory-tools.cjs");
const here = __dirname, base = path.join(here, "source/.next/server");
const report = JSON.parse(T.read(path.join(here, "server-overlay-report-v2.json")));
const relative = ".next/server/pages/api/print/tool-label.js";
const routeFile = path.join(here, report.overlayDirectory, relative), source = T.read(routeFile);
assert.equal(T.sha(source), report.files.find(file => file.path === relative).afterSHA256);
for (const file of T.walk(base).filter(file => file.endsWith(".js"))) {
  const code = T.read(file);
  for (const match of code.matchAll(/\.ids=\[([^\]]*)\]/g)) {
    assert(!match[1].split(",").map(Number).includes(94502), `Baseline chunk collision in ${file}`);
  }
}
assert(!fs.existsSync(path.join(base, "chunks/94502.js")));
const beforeManifest = JSON.parse(T.read(path.join(base, "pages-manifest.json")));
const manifest = JSON.parse(T.read(path.join(here, report.overlayDirectory, ".next/server/pages-manifest.json")));
assert.equal(manifest["/api/print/tool-label"], "pages/api/print/tool-label.js");
for (const [key, value] of Object.entries(beforeManifest)) assert.equal(manifest[key], value);
assert.equal(Object.keys(manifest).length, Object.keys(beforeManifest).length + 1);

let authenticated = false, dbReads = 0, printCalls = 0;
const runtimeModule = { exports: {} };
vm.runInNewContext(T.read(path.join(base, "webpack-api-runtime.js")), { module: runtimeModule, require: (request) => require(path.join(base, request)) });
const runtime = runtimeModule.exports;
const fakeAuth = { requireFirebaseAuth: async (req, res) => {
  if (!authenticated) { res.status(401).json({ error: "Missing auth token." }); return null; }
  return { uid: "fixture-user", email: "fixture@example.test" };
} };
const fakeAdmin = { adminDb: { collection: (name) => {
  assert.equal(name, "Tool"); return { doc: (id) => ({ get: async () => {
    dbReads += 1; assert.equal(id, "AIS_T00001");
    return { exists: true, data: () => ({ name: "Compiled tool fixture", description: "Fixture only", model: "Demo" }) };
  } }) };
} } };
const register = runtime.C;
runtime.C = (chunk) => {
  register(chunk);
  runtime.m[81067] = (module) => { module.exports = fakeAuth; };
  runtime.m[52771] = (module) => { module.exports = fakeAdmin; };
};
const moduleObject = { exports: {} };
vm.runInNewContext(source, { module: moduleObject, require: (request) => {
  if (request === "../../../webpack-api-runtime.js") return runtime;
  assert(["next/dist/compiled/next-server/pages-api.runtime.prod.js", "@opentelemetry/api"].includes(request), `Unexpected runtime dependency: ${request}`);
  return require(request);
}, process: { env: { STORAGE_SCAN_BRIDGE_TOKEN: "fixture-token-only-".padEnd(40, "x") } },
  AbortController, setTimeout, clearTimeout,
  fetch: async (url, options) => {
    printCalls += 1; assert.equal(url, "https://unobtruded-unquibbling-kandice.ngrok-free.dev/print-tool-label");
    const payload = JSON.parse(options.body);
    assert.equal(payload.tool_id, "AIS_T00001"); assert.equal(payload.barcode_value, "AIS_T00001");
    assert.equal(payload.qr_value, "https://magmo.cloud/NewSearch/Tools/AIS_T00001");
    assert.equal(payload.name, "Compiled tool fixture");
    return { ok: true, status: 200, json: async () => ({ ok: true }) };
  },
});
function response() {
  return { statusCode: 0, writableEnded: false, headers: {}, setHeader(name, value) { this.headers[name] = value; },
    status(value) { this.statusCode = value; return this; }, json(value) { this.body = value; this.writableEnded = true; return this; } };
}
(async () => {
  const entry = await moduleObject.exports;
  assert.equal(typeof entry.default, "function"); assert.equal(typeof entry.handler, "function");
  const checks = [];
  let res = response(); await entry.default({ method: "GET" }, res); assert.equal(res.statusCode, 405); checks.push("GET method guard");
  res = response(); await entry.default({ method: "POST", body: { toolId: "AIS_T00001" } }, res); assert.equal(res.statusCode, 401); checks.push("Unauthenticated POST guard");
  assert.equal(dbReads, 0); assert.equal(printCalls, 0);
  authenticated = true;
  res = response(); await entry.default({ method: "POST", body: { toolId: "AIS_T00001", name: "forged" } }, res); assert.equal(res.statusCode, 400); checks.push("Forged payload fields rejected");
  res = response(); await entry.default({ method: "POST", body: { toolId: "AIS33551" } }, res); assert.equal(res.statusCode, 400); checks.push("Item ID rejected as Tool");
  assert.equal(dbReads, 0); assert.equal(printCalls, 0);
  res = response(); await entry.default({ method: "POST", body: { toolId: "AIS_T00001" } }, res); assert.equal(res.statusCode, 200); assert.equal(dbReads, 1); assert.equal(printCalls, 1); checks.push("Trusted Tool payload and single mocked print");
  const result = { passed: true, checkedAt: new Date().toISOString(), routeSHA256: T.sha(source), checks,
    actualBaselineWebpackRuntime: true, baselineChunk94502Collision: false, pagesManifestOnlyNewToolRoute: true,
    realDatabaseReads: 0, realDatabaseWrites: 0, realPrintJobs: 0, productionMutations: 0 };
  fs.writeFileSync(path.join(here, "compiled-tool-label-api-verification.json"), JSON.stringify(result, null, 2) + "\n", { flag: "wx" });
  console.log(JSON.stringify(result, null, 2));
})().catch(error => { console.error(error); process.exitCode = 1; });
