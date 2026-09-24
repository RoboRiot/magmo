"use strict";
const fs = require("node:fs"), path = require("node:path"), vm = require("node:vm"), crypto = require("node:crypto");
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
  return evaluate(factory(directory, ".next/server/chunks/6681.js", 16681), {
    55511: crypto, 96784: ops("senderIdentity"), 44552: importContract,
  }, directory);
}
const before = loadContract(source), after = loadContract(out);

test("all nondeclared production files and immutable assets are byte-for-byte preserved", () => {
  const declared = new Map(report.entries.map((entry) => [entry.path, entry]));
  for (const file of walk(source)) {
    const relative = path.relative(source, file).replaceAll("\\", "/"), next = path.join(out, relative);
    assert(fs.existsSync(next), relative);
    if (!declared.has(relative)) assert.equal(sha(fs.readFileSync(file)), sha(fs.readFileSync(next)), relative);
  }
  for (const entry of report.entries) assert.equal(sha(fs.readFileSync(path.join(out, entry.path))), entry.after, entry.path);
  assert.equal(read(path.join(out, ".next", report.oldAsset)), read(path.join(source, ".next", report.oldAsset)));
  assert.equal(read(path.join(out, ".next/static", report.oldBuildId, "_buildManifest.js")), read(path.join(source, ".next/static", report.oldBuildId, "_buildManifest.js")));
});
test("backend edits are exactly reversible scoped edits; no surrounding code changes", () => {
  const proofs = require("./patch-proofs.json"), restored = new Map();
  for (const proof of [...proofs].reverse()) {
    let code = restored.get(proof.path) || read(path.join(out, proof.path));
    for (const edit of [...proof.edits].reverse()) {
      assert.equal(code.split(edit.after).length, 2, `${proof.path}: unique changed range`);
      code = code.replace(edit.after, edit.before);
    }
    restored.set(proof.path, code);
  }
  for (const [file, code] of restored) assert.equal(code, read(path.join(source, file)), file);
});
test("release-reference changes are only asset/build identifiers", () => {
  const proofs = new Set(require("./patch-proofs.json").map((proof) => proof.path));
  for (const entry of report.entries.filter((entry) => entry.before && !proofs.has(entry.path))) {
    const reverted = read(path.join(out, entry.path)).split(path.basename(report.newAsset)).join(path.basename(report.oldAsset)).split(report.newBuildId).join(report.oldBuildId);
    assert.equal(reverted, read(path.join(source, entry.path)), entry.path);
  }
});
test("machine-label UI change is exactly one expression and all release references resolve", () => {
  const old = read(path.join(source, ".next", report.oldAsset)), next = read(path.join(out, ".next", report.newAsset));
  assert.equal(next.replace('c?s:tf(t?.destinationIssue)||"Destination not linked"', 'c?s:"Destination not linked"'), old);
  const manifest = JSON.parse(read(path.join(out, ".next/build-manifest.json")));
  assert(manifest.pages["/NewSearch/mainSearch"].includes(report.newAsset));
  assert(read(path.join(out, ".next/server/pages/NewSearch/mainSearch.html")).includes(path.basename(report.newAsset)));
  assert.equal(read(path.join(out, ".next/BUILD_ID")), report.newBuildId);
});
test("health preserves close-status and every existing capability", () => {
  const old = plain(before.runtimeCapabilities({})), next = plain(after.runtimeCapabilities({}));
  assert.equal(next.bluefolderEquipmentLink.existingOnly, true);
  assert.equal(next.bluefolderEquipmentLink.rejectsUnresolvedInventoryMachine, true);
  delete next.bluefolderEquipmentLink; assert.deepEqual(next, old);
});
test("OpenAPI adds only selected-equipment and existing-only metadata plus capability", () => {
  const old = plain(before.buildOpenApiSpec()), next = plain(after.buildOpenApiSpec());
  const properties = next.components.schemas.WorkOrderImportedRequest.properties;
  assert.equal(properties.existingOnly.type, "boolean");
  assert.equal(properties.blueFolder.properties.equipmentIds.type, "array");
  delete properties.existingOnly; delete properties.blueFolder.properties.equipmentIds; delete properties.blueFolder.properties.equipmentNames;
  delete next["x-magmo-capabilities"].bluefolderEquipmentLink;
  assert.deepEqual(next, old);
});
for (const payload of [
  { eventType: "work_order.imported", blueFolder: { serviceRequestId: "10664" }, subject: "unchanged" },
  { eventType: "work_order.command_context", workOrderId: "10664" },
  { eventType: "work_order.bluefolder_status", workOrderId: "10664", blueFolder: { serviceRequestId: "10664", status: "Closed", dateTimeClosed: "2026-09-24T12:00:00Z" }, observedAt: "2026-09-24T12:01:00Z" },
]) test(`existing event validation remains identical: ${payload.eventType}`, () => assert.deepEqual(plain(after.validateIngestRequest(payload)), plain(before.validateIngestRequest(payload))));
test("compiled import endpoint accepts complete equipment identity and existing-only control", () => {
  const payload = { eventType: "work_order.imported", existingOnly: true, blueFolder: { serviceRequestId: "10664", equipmentIds: ["E1"], equipmentNames: ["AQ64 CT"] } };
  assert.equal(after.validateIngestRequest(payload).workOrderId, "10664");
  for (const mutation of [ { existingOnly: "true" }, { blueFolder: { serviceRequestId: "10664", equipmentIds: "E1" } }, { blueFolder: { serviceRequestId: "10664", equipmentNames: [{ name: "AQ64 CT" }] } } ]) {
    assert.throws(() => after.validateIngestRequest({ ...payload, ...mutation }), (error) => error.statusCode === 400);
  }
});
test("missing/deleted work-order refresh errors are permanent 404/409 with no traceback", () => {
  for (const [code, status] of [["work_order_not_found", 404], ["work_order_deleted", 409]]) {
    const result = after.errorResponse(Object.assign(new Error("Refresh unavailable."), { code }), "test");
    assert.equal(result.statusCode, status); assert.equal(result.body.code, code); assert.equal(result.body.retryable, false);
  }
});
test("all import-contract copies load the exact same reviewed contract", () => {
  for (const file of [".next/server/chunks/8806.js", ".next/server/pages/api/cron/trailer-slack-monitor.js", ".next/server/pages/api/ops/health.js", ".next/server/pages/api/ops/openapi.js"]) {
    assert.equal(evaluate(factory(out, file, 44552), {}), packaged("blueFolderImportContract"));
  }
});
const inventory = (name) => require(path.join(root, "lib/inventory", name + ".cjs"));
const compiledService = evaluate(factory(out, ".next/server/chunks/4354.js", 54354), {
  77598: crypto, 47805: inventory("itemLocationContract"), 71621: inventory("storageUnitPlacement"),
  95098: inventory("storageUnitContract"), 92631: inventory("workOrderAddContract"), 65282: packaged("trailerClientLinks"),
});
const compiledScanner = evaluate(factory(out, ".next/server/chunks/428.js", 40428), { 61324: inventory("storageUnitScanSessions") });
for (const [file, target, compiled] of [["work-order-add-service.test.cjs", "../lib/inventory/workOrderAddService.cjs", compiledService], ["work-order-scanner-capture.test.cjs", "../lib/inventory/workOrderScannerCapture.cjs", compiledScanner]]) {
  const filename = path.join(root, "test", file);
  new Function("require", "__dirname", "__filename", read(filename))((request) => request === target ? compiled : require(request.startsWith(".") ? path.resolve(path.dirname(filename), request) : request), path.dirname(filename), filename);
}
const compiledOptions = evaluate(factory(out, ".next/server/pages/api/items/work-order-add/options.js", 82318), {}, out, ";b.serializeWorkOrderAddOption=j;");
test("compiled options distinguish unlinked, changed, valid machine, trailer, and genuine site-only destinations", () => {
  for (const [data, issue] of [
    [{ clientId: "C1", bluefolderEquipmentIds: ["E1"] }, "Machine not linked"],
    [{ clientId: "C1", machineId: "M1", bluefolderEquipmentIds: ["E2"], machineLinkEquipmentIds: ["E1"], machineLinkSource: "bluefolder_work_order_import" }, "Machine link needs review"],
    [{ clientId: "C1", machineId: "M1", bluefolderEquipmentIds: ["E1"] }, ""],
    [{ clientId: "C1", trailerId: "T1", bluefolderEquipmentIds: ["E1"] }, ""],
    [{ clientId: "C1" }, ""], [{}, "Destination not linked"],
  ]) {
    const option = compiledOptions.serializeWorkOrderAddOption({ id: "10664", data: () => data });
    assert.equal(option.destinationIssue, issue); assert.equal(option.destinationLinked, !issue);
  }
});
function compiledWorkOrders(localRequire) {
  return evaluate(factory(out, ".next/server/chunks/8806.js", 78806), {
    7879: localRequire("firebase-admin/firestore"), 52771: localRequire("../../context/FirebaseAdmin"), 19298: {}, 96096: {},
    20574: ops("commandResponsibilityContract"), 63378: ops("dispatchEvidencePolicy"), 45516: ops("calendarSessionEvidence"),
    96784: ops("senderIdentity"), 44552: packaged("blueFolderImportContract"), 9413: ops("slackWatermark"), 78320: ops("summaryProvenance"),
    78673: ops("remoteWorkEvidence"), 63897: ops("messageRevision"), 65282: packaged("trailerClientLinks"), 75175: packaged("workOrderClientLink"),
    85033: packaged("clientDirectory"), 19490: ops("messageLifecycle"),
  });
}
// Execute the complete source import-transaction regression suite against the
// actual compiled production module, not a reimplementation of its importer.
{
  const filename = path.join(root, "test/work-order-machine-import.test.cjs"), original = read(filename);
  const marker = 'new Function("require", "module", "exports", code)';
  assert.equal(original.split(marker).length, 2);
  const modified = original.replace(marker, '((require, module) => { module.exports = { importOpsBlueFolderWorkOrder: compiledWorkOrders(require).JZ }; })');
  new Function("require", "__dirname", "compiledWorkOrders", modified)(require, path.dirname(filename), compiledWorkOrders);
}
test("manual connection update clears only the equipment stamp and provenance in the exact compiled function", () => {
  const code = read(path.join(out, ".next/server/chunks/8806.js")); let fn;
  traverse(parser.parse(code), { FunctionDeclaration(p) { if (p.node.id.name === "aj" && code.slice(p.node.start, p.node.end).includes("connectionsUpdatedBy")) fn = code.slice(p.node.start, p.node.end); } });
  assert(fn.includes('machineLinkSource:"manual",machineLinkEquipmentIds:[]'));
});
