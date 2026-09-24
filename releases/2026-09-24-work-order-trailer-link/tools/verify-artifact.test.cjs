"use strict";
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto");
const assert = require("node:assert/strict"), test = require("node:test");
const parser = require("@babel/parser"), traverse = require("@babel/traverse").default;
const root = path.resolve(__dirname, "../.."), report = require("./composition-report.json");
const source = path.join(__dirname, "source"), out = path.join(__dirname, report.sourceDirectory);
const read = (file) => fs.readFileSync(file, "utf8"), sha = (value) => crypto.createHash("sha256").update(value).digest("hex"), plain = (value) => JSON.parse(JSON.stringify(value));
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
function factory(directory, file, id) {
  const code = read(path.join(directory, file)); let node;
  traverse(parser.parse(code), { ObjectProperty(p) { if (p.node.key.value === id) { assert(!node); node = p.node.value; } } });
  assert(node, `Module ${id}`); return code.slice(node.start, node.end);
}
function evaluate(text, dependencies, directory = out, expose = "") {
  const module = { exports: {} };
  const requireModule = (id) => { assert(Object.hasOwn(dependencies, id), `Missing dependency ${id}`); return dependencies[id]; };
  requireModule.d = (exports, getters) => { for (const [key, value] of Object.entries(getters)) Object.defineProperty(exports, key, { get: value, enumerable: true }); };
  requireModule.n = (value) => () => value;
  requireModule.a = (module, callback) => callback((values) => values, (error) => { if (error) throw error; });
  const testedText = expose ? text.slice(0, -1) + expose + "}" : text;
  const callable = new Function("require", "process", "Buffer", `return (${testedText});`)(require, { env: {}, cwd: () => directory }, Buffer);
  callable(module, module.exports, requireModule);
  return module.exports;
}
const ops = (name) => require(path.join(root, "lib/ops", name + ".cjs"));
const packaged = (name) => require(path.join(out, "machine-link", name + ".cjs"));
function loadContract(directory) {
  const importContract = evaluate(factory(directory, ".next/server/pages/api/ops/health.js", 44552), { 55511: crypto }, directory);
  return evaluate(factory(directory, ".next/server/chunks/6681.js", 16681), { 55511: crypto, 96784: ops("senderIdentity"), 44552: importContract }, directory);
}
const before = loadContract(source), after = loadContract(out);
test("exactly one existing helper changes; all481 production files and immutable assets remain", () => {
  assert.equal(report.entries.length, 1);
  assert.equal(report.entries[0].path, "machine-link/workOrderMachineLink.cjs");
  const expected = new Map(report.entries.map((entry) => [entry.path, entry]));
  const beforeFiles = walk(source), afterFiles = walk(out);
  assert.equal(afterFiles.length, beforeFiles.length);
  for (const file of beforeFiles) {
    const relative = path.relative(source, file).replaceAll("\\", "/"), next = path.join(out, relative);
    assert(fs.existsSync(next), relative);
    if (!expected.has(relative)) assert.equal(sha(fs.readFileSync(file)), sha(fs.readFileSync(next)), relative);
    else {
      assert.equal(sha(fs.readFileSync(file)), expected.get(relative).before);
      assert.equal(sha(fs.readFileSync(next)), expected.get(relative).after);
    }
  }
  assert.equal(read(path.join(out, ".next/BUILD_ID")), report.unchangedBuildId);
});
test("equipment/status capabilities and complete OpenAPI remain byte-semantically identical", () => {
  assert.deepEqual(plain(after.runtimeCapabilities({})), plain(before.runtimeCapabilities({})));
  assert.deepEqual(plain(after.buildOpenApiSpec()), plain(before.buildOpenApiSpec()));
  const capabilities = plain(after.runtimeCapabilities({}));
  assert.equal(capabilities.bluefolderEquipmentLink.existingOnly, true);
  assert.equal(capabilities.bluefolderStatusSync.statusOnly, true);
});
test("exact packaged helper is the frozen reviewed source and preserves its deployed dependencies", () => {
  assert.equal(sha(fs.readFileSync(path.join(out, report.entries[0].path))), report.sourceHashes["lib/ops/workOrderMachineLink.cjs"]);
  for (const name of ["trailerClientLinks", "workOrderClientLink", "clientDirectory", "blueFolderImportContract", "contract-overlay"]) {
    assert.equal(read(path.join(out, "machine-link", name + ".cjs")), read(path.join(source, "machine-link", name + ".cjs")));
  }
  assert.equal(typeof packaged("workOrderMachineLink").resolveWorkOrderTrailerLink, "function");
});
const inventory = (name) => require(path.join(root, "lib/inventory", name + ".cjs"));
const compiledService = evaluate(factory(out, ".next/server/chunks/4354.js", 54354), {
  77598: crypto, 47805: inventory("itemLocationContract"), 71621: inventory("storageUnitPlacement"),
  95098: inventory("storageUnitContract"), 92631: inventory("workOrderAddContract"), 65282: packaged("trailerClientLinks"),
});
const compiledScanner = evaluate(factory(out, ".next/server/chunks/428.js", 40428), { 61324: inventory("storageUnitScanSessions") });
for (const [file, replacements] of [
  ["work-order-add-service.test.cjs", { "../lib/inventory/workOrderAddService.cjs": compiledService }],
  ["work-order-scanner-capture.test.cjs", { "../lib/inventory/workOrderScannerCapture.cjs": compiledScanner }],
  ["work-order-machine-link.test.cjs", { "../lib/ops/workOrderMachineLink.cjs": packaged("workOrderMachineLink"), "../lib/ops/blueFolderImportContract.cjs": packaged("blueFolderImportContract"), "../lib/ops/ingestContract.cjs": after }],
]) {
  const filename = path.join(root, "test", file);
  new Function("require", "__dirname", "__filename", read(filename))((request) => replacements[request] || require(request.startsWith(".") ? path.resolve(path.dirname(filename), request) : request), path.dirname(filename), filename);
}
function compiledWorkOrders(localRequire) {
  return evaluate(factory(out, ".next/server/chunks/8806.js", 78806), {
    7879: localRequire("firebase-admin/firestore"), 52771: localRequire("../../context/FirebaseAdmin"), 19298: {}, 96096: {},
    20574: ops("commandResponsibilityContract"), 63378: ops("dispatchEvidencePolicy"), 45516: ops("calendarSessionEvidence"),
    96784: ops("senderIdentity"), 44552: packaged("blueFolderImportContract"), 9413: ops("slackWatermark"), 78320: ops("summaryProvenance"),
    78673: ops("remoteWorkEvidence"), 63897: ops("messageRevision"), 65282: packaged("trailerClientLinks"), 75175: packaged("workOrderClientLink"),
    85033: packaged("clientDirectory"), 19490: ops("messageLifecycle"),
  });
}
// New trailer import tests run against the production factory including its
// transaction/ref writing, not a reimplementation of its importer.
{
  const filename = path.join(root, "test/work-order-machine-import.test.cjs"), original = read(filename);
  const marker = 'new Function("require", "module", "exports", code)';
  assert.equal(original.split(marker).length, 2);
  const modified = original.replace(marker, '((require, module) => { module.exports = { importOpsBlueFolderWorkOrder: compiledWorkOrders(require).JZ }; })');
  new Function("require", "__dirname", "compiledWorkOrders", modified)(require, path.dirname(filename), compiledWorkOrders);
}
const compiledOptions = evaluate(factory(out, ".next/server/pages/api/items/work-order-add/options.js", 82318), {}, out, ";b.serializeWorkOrderAddOption=j;");
test("unchanged compiled scanner options accept fully linked trailer+machine and continue blocking missing machines", () => {
  const linked = compiledOptions.serializeWorkOrderAddOption({ id: "10668", data: () => ({ clientId: "C1", trailerId: "AIS20", machineId: "AIS82553", bluefolderEquipmentIds: ["E20"] }) });
  assert.equal(linked.destinationLinked, true);
  assert.equal(linked.machineId, "AIS82553");
  assert.equal(linked.trailerId, "AIS20");
  const unlinked = compiledOptions.serializeWorkOrderAddOption({ id: "10668", data: () => ({ clientId: "C1", bluefolderEquipmentIds: ["E20"] }) });
  assert.equal(unlinked.destinationLinked, false); assert.equal(unlinked.destinationIssue, "Machine not linked");
});
