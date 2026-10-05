"use strict";
// Scoped server overlay only. No cloud, Firestore, Slack, or printer calls.
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const parser = require("@babel/parser"), traverse = require("@babel/traverse").default;
const T = require("../../ais-duplicate-fix-20260930/deployment/factory-utils.cjs");
const here = __dirname, root = path.resolve(here, "../../..");
const version = process.argv[2] || "v2";
assert(/^v[1-9][0-9]*$/.test(version));
const baseline = JSON.parse(T.read(path.join(here, "baseline.json")));
const inputs = JSON.parse(T.read(path.join(here, `compiler-inputs-${version}.json`)));
const success = JSON.parse(T.read(path.join(here, `compiler-success-${version}.json`)));
assert.equal(success.inputReceiptSHA256, T.sha(fs.readFileSync(path.join(here, `compiler-inputs-${version}.json`))));
assert.equal(T.sha(fs.readFileSync(path.join(here, "source.zip"))), baseline.archiveSHA256);
const overlay = path.join(here, `server-overlay-${version}`), reportPath = path.join(here, `server-overlay-report-${version}.json`);
assert(!fs.existsSync(overlay) && !fs.existsSync(reportPath), "Preserve previous candidates; choose a new compiler version");
const base = path.join(here, "source"), compiler = path.join(here, inputs.workspace, inputs.output);
const sourceHashes = {}, modules = [], files = [];
const ids = { toolIdentity: 94500000, slackTargets: 94500001, toolSlack: 94500002,
  toolLabelData: 94500003, itemHistoryCopy: 94500010, cryptoCopy: 94500011,
  toolLabelHandler: 94500020, toolLabelEntry: 94500021 };
const baselineIndex = T.index(path.join(base, ".next/server"));
for (const id of Object.values(ids)) assert(!baselineIndex.has(id), `Private module ID collision: ${id}`);
function frozen(relative) {
  const row = inputs.inputs.find(entry => entry.path === relative); assert(row, relative);
  const value = T.read(path.join(here, inputs.workspace, relative));
  assert.equal(T.sha(value), row.sha256, `Frozen source drift: ${relative}`);
  assert.equal(T.sha(T.read(path.join(root, relative))), row.sha256, `Working source drift after freeze: ${relative}`);
  sourceHashes[relative] = row.sha256;
  return value;
}
function editsApplied(source, edits) {
  for (const edit of edits.sort((a, b) => b.start - a.start)) source = source.slice(0, edit.start) + edit.value + source.slice(edit.end);
  return source;
}
function cjs(relative, mappings) {
  let source = frozen(relative); const edits = [], seen = new Set();
  traverse(parser.parse(source), { CallExpression(p) {
    if (p.node.callee.type !== "Identifier" || p.node.callee.name !== "require") return;
    assert(!p.scope.getBinding("require"), "Shadowed source require is unsupported");
    assert.equal(p.node.arguments.length, 1); assert.equal(p.node.arguments[0].type, "StringLiteral");
    const key = p.node.arguments[0].value; assert(Object.hasOwn(mappings, key), `Unreviewed dependency ${relative}: ${key}`);
    seen.add(key); const mapped = mappings[key];
    edits.push({ start: p.node.start, end: p.node.end, value: typeof mapped === "number" ? `__webpack_require__(${mapped})` : mapped });
  }});
  assert.deepEqual([...seen].sort(), Object.keys(mappings).sort(), `Unused dependency mapping: ${relative}`);
  source = `function(module,exports,__webpack_require__){${editsApplied(source, edits)}\n}`;
  parser.parseExpression(source);
  modules.push({ source: relative, sha256: T.sha(source), importMap: mappings }); return source;
}
function sender() {
  const relative = "pages/api/slack/add-to-list.js";
  let source = frozen(relative); const edits = [], seen = new Set();
  const imports = {
    "../../../utils/apiAuth": "__webpack_require__.e(1067).then(__webpack_require__.bind(__webpack_require__,81067))",
    "../../../context/FirebaseAdmin": "__webpack_require__.e(2771).then(__webpack_require__.bind(__webpack_require__,52771))",
    "../../../lib/slack/toolListIdentity.cjs": `Promise.resolve(__webpack_require__(${ids.toolSlack}))`,
    "../../../lib/ops/workOrders": "__webpack_require__.e(8806).then(__webpack_require__.bind(__webpack_require__,78806))",
  };
  traverse(parser.parse(source, { sourceType: "module" }), {
    ImportDeclaration() { assert.fail("Unexpected static sender import"); },
    ExportNamedDeclaration(p) { assert(p.node.declaration); edits.push({ start: p.node.start, end: p.node.declaration.start, value: "" }); },
    ExportDefaultDeclaration(p) { assert.equal(p.node.declaration.type, "FunctionDeclaration"); edits.push({ start: p.node.start, end: p.node.declaration.start, value: "" }); },
    CallExpression(p) {
      if (p.node.callee.type !== "Import") return;
      assert.equal(p.node.arguments.length, 1); assert.equal(p.node.arguments[0].type, "StringLiteral");
      const key = p.node.arguments[0].value; assert(Object.hasOwn(imports, key), `Unreviewed dynamic sender import ${key}`); seen.add(key);
      edits.push({ start: p.node.start, end: p.node.end, value: imports[key] });
    },
  });
  assert.deepEqual([...seen].sort(), Object.keys(imports).sort());
  source = `function(module,exports,__webpack_require__){__webpack_require__.r(exports);__webpack_require__.d(exports,{default:()=>handler,sendSlackListItem:()=>sendSlackListItem});\n${editsApplied(source, edits)}\n}`;
  parser.parseExpression(source); modules.push({ source: relative, sha256: T.sha(source), importMap: imports }); return source;
}
function inject(source, additions) {
  // The first factory's parent is the top-level module registry. All added IDs
  // were checked globally above; the helper checks this file again.
  return T.inject(source, additions);
}
function save(relative, value, changedIds = [], addedIds = []) {
  const destination = path.join(overlay, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true }); fs.writeFileSync(destination, value, { flag: "wx" });
  const beforePath = path.join(base, relative), before = fs.existsSync(beforePath) ? T.read(beforePath) : null;
  if (before && relative.endsWith(".js")) {
    const after = new Map(T.factories(value).map(factory => [factory.id, factory.source]));
    for (const factory of T.factories(before)) if (!changedIds.includes(factory.id)) {
      assert.equal(after.get(factory.id), factory.source, `Unrelated factory changed: ${relative} ${factory.id}`);
    }
    assert.deepEqual(T.loaderChunks(value), T.loaderChunks(before), `Existing loader chunks changed: ${relative}`);
  }
  files.push({ path: relative, beforeSHA256: before === null ? null : T.sha(before), afterSHA256: T.sha(value), changedFactoryIds: changedIds, addedFactoryIds: addedIds });
}
const workRelative = ".next/server/chunks/93100.js", workBase = T.read(path.join(base, workRelative));
const identity = cjs("lib/inventory/toolIdentity.cjs", {});
const historyCopy = T.getFactory(workBase, 93100050), cryptoCopy = T.getFactory(workBase, 93100051);
const toolSlack = cjs("lib/slack/toolListIdentity.cjs", { "node:crypto": ids.cryptoCopy,
  "../inventory/toolIdentity.cjs": ids.toolIdentity, "../items/itemHistory.cjs": ids.itemHistoryCopy });
const targets = cjs("lib/inventory/workOrderAddSlackTargets.cjs", {});
const labelData = cjs("lib/inventory/toolLabelData.cjs", { "./toolIdentity.cjs": ids.toolIdentity });
const common = new Map([[ids.toolIdentity, identity], [ids.toolSlack, toolSlack], [ids.itemHistoryCopy, historyCopy], [ids.cryptoCopy, cryptoCopy]]);
const replacements = {
  93100031: cjs("lib/inventory/workOrderAddService.cjs", { "node:crypto": 93100051,
    "./itemLocationContract.cjs": 93100026, "./storageUnitPlacement.cjs": 93100045,
    "./storageUnitContract.cjs": 93100060, "./toolIdentity.cjs": ids.toolIdentity,
    "./workOrderAddContract.cjs": 93100057, "../ops/trailerClientLinks.cjs": 93100039,
    "../ops/workOrderMachineLink.cjs": 'require(process.cwd()+"/machine-link/workOrderMachineLink.cjs")' }),
  93100057: cjs("lib/inventory/workOrderAddContract.cjs", { "./storageUnitContract.cjs": 93100060,
    "./toolIdentity.cjs": ids.toolIdentity, "../items/itemHistory.cjs": 93100050 }),
  93100062: cjs("lib/inventory/workOrderAddSlack.cjs", { "node:crypto": 93100051,
    "./workOrderAddContract.cjs": 93100057, "../items/itemEditorOperations.cjs": 93100025,
    "../items/itemHistory.cjs": 93100050, "./workOrderAddSlackThread.cjs": 93100061,
    "./workOrderAddSlackTargets.cjs": ids.slackTargets }),
  93100061: cjs("lib/inventory/workOrderAddSlackThread.cjs", { "node:crypto": 93100051,
    "./workOrderAddContract.cjs": 93100057, "./workOrderAddSlackTargets.cjs": ids.slackTargets,
    "../ops/dispatchReceipt.cjs": 93100058 }),
  93100000: sender(),
};
const workAdded = new Map([...common, [ids.slackTargets, targets]]);
save(workRelative, inject(T.patchFactories(workBase, replacements), workAdded), Object.keys(replacements).map(Number), [...workAdded.keys()]);
const senderRelative = ".next/server/chunks/1572.js", senderBase = T.read(path.join(base, senderRelative));
assert.equal(T.getFactory(senderBase, 1572), T.getFactory(workBase, 93100000), "Deployed sender copies differ");
save(senderRelative, inject(T.patchFactories(senderBase, { 1572: replacements[93100000] }), common), [1572], [...common.keys()]);

// New route: one compiler-verified handler, using the existing production Next
// wrapper, Firebase Admin, auth, and runtime. No freshly built shared graph.
frozen("pages/api/print/tool-label.js");
const compiledLabel = T.read(path.join(compiler, "server/pages/api/print/tool-label.js"));
const candidates = T.factories(compiledLabel).filter(factory => factory.source.includes("tool_label_delivery_uncertain"));
assert.equal(candidates.length, 1);
const labelHandler = T.remap(candidates[0].source, new Map([[87732, 81067], [27336, 52771], [90094, ids.toolLabelData]]), true);
const templateRelative = ".next/server/pages/api/print/storage-label.js", template = T.read(path.join(base, templateRelative));
let entry = T.remap(T.getFactory(template, 34986), new Map([[30113, ids.toolLabelHandler]]));
assert.equal(entry.split("/api/print/storage-label").length - 1, 4);
entry = entry.replaceAll("/api/print/storage-label", "/api/print/tool-label");
let route = T.patchFactories(template, { 30113: labelHandler, 34986: entry });
route = route.replace("30113:", `${ids.toolLabelHandler}:`).replace("34986:", `${ids.toolLabelEntry}:`);
route = T.replaceOnce(route, "a.id=5491,a.ids=[1067,2771,5491]", "a.id=94502,a.ids=[1067,2771,94502]");
route = T.replaceOnce(route, "b.s=34986", `b.s=${ids.toolLabelEntry}`);
route = inject(route, new Map([[ids.toolIdentity, identity], [ids.toolLabelData, labelData]]));
parser.parse(route);
const routeFactories = new Map(T.factories(route).map(factory => [factory.id, factory.source]));
for (const factory of T.factories(template)) if (![30113, 34986].includes(factory.id)) {
  assert.equal(routeFactories.get(factory.id), factory.source, `New route changed baseline dependency ${factory.id}`);
}
save(".next/server/pages/api/print/tool-label.js", route, [], [ids.toolLabelHandler, ids.toolLabelEntry, ids.toolIdentity, ids.toolLabelData]);
const manifestPath = ".next/server/pages-manifest.json", manifest = JSON.parse(T.read(path.join(base, manifestPath)));
assert(!manifest["/api/print/tool-label"]); manifest["/api/print/tool-label"] = "pages/api/print/tool-label.js";
save(manifestPath, JSON.stringify(manifest));
const report = { createdAt: new Date().toISOString(), baselineRevision: baseline.revision,
  baselineArchiveSHA256: baseline.archiveSHA256, compilerVersion: version,
  compilerInputSHA256: success.inputReceiptSHA256, overlayDirectory: path.basename(overlay),
  files, sourceHashes, modules, privateModuleIds: ids, existingUnrelatedFactoriesBytePreserved: true,
  newRouteBaselineDependenciesBytePreserved: true, machineLinkDynamicPathPreserved: true,
  firebaseConfigurationUnchanged: true, deletedFiles: [], productionMutations: 0 };
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n", { flag: "wx" });
console.log(JSON.stringify({ overlayDirectory: report.overlayDirectory, files, privateModuleIds: ids }, null, 2));
