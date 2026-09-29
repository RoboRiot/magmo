"use strict";
// LOCAL DRAFT ONLY. Never uploads, deploys, executes app handlers or mutates data.
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict"), parser = require("@babel/parser"), traverse = require("@babel/traverse").default;
const { sha, read, getFactory, patchFactories, requiredIds, walk } = require("../../ot-collapse-20260928/factory-tools.cjs");
const root = path.resolve(__dirname, "../../.."), baseline = path.join(__dirname, "source"), outName = process.argv[2] || "draft-source-v1";
assert(/^draft-source-v\d+$/.test(outName));
const out = path.join(__dirname, outName); assert(!fs.existsSync(out), "Do not overwrite a candidate");
const baselineMeta = JSON.parse(read(path.join(__dirname, "baseline.json")));
assert.equal(sha(fs.readFileSync(path.join(__dirname, "source.zip"))), baselineMeta.archiveSHA256);
const chunkPath = ".next/server/chunks/8806.js", chunk = read(path.join(baseline, chunkPath)), factory = getFactory(chunk, 78806);
assert.equal(sha(chunk), "218a069f424806c8bc455a671de85595f0aa69f2158bc103a29446f9659510fa");
assert.equal(sha(factory), "51514a932646d888aafcca7ef9060ddfc0e3bdced4ff9acf1400572d864d1865");
const sourcePath = "lib/ops/workOrders.js", source = read(path.join(root, sourcePath)), ast = parser.parse(source, { sourceType: "module" });
const names = ["deliverNewWorkOrderLinkAlert", "withEquipmentLinkResolution", "updateOpsConnections", "upsertOpsWorkOrder", "importOpsBlueFolderWorkOrder"], selected = new Map(), dependencyRecords = new Map();
traverse(ast, { FunctionDeclaration(p) {
  if (!names.includes(p.node.id.name)) return;
  selected.set(p.node.id.name, source.slice(p.node.start, p.node.end));
  p.traverse({ ReferencedIdentifier(q) {
    const binding = q.scope.getBinding(q.node.name);
    if (binding?.scope.path.isProgram()) dependencyRecords.set(q.node.name, binding);
  } });
} });
assert.equal(selected.size, names.length);
const liveBindings = { requireDb: "B", cleanText: "C", normalizeId: "E", normalizeWorkOrderSubject: "D", workOrderRef: "af", serializeWorkOrder: "ag", FieldValue: "e.FieldValue", ACTIVE_STATUSES: "bp", referenceId: "a0", trailerClientId: "a1", trailerMachineId: "a2", clientName: "a_", clientLocation: "a$", trailerName: "a3", buildDispatchEvidenceResolutionPatch: "ba", normalizeAssignees: "M", defaultOpsOversightManagers: "N", mergeAssignees: "O", normalizePriorityTier: "Q", normalizePriorityLabel: "S", normalizePriorityOrder: "T", initialAssignmentEntry: "ae", timestampToIso: "G", PRIORITY_TIERS: "bs", GENERATED_PRIORITY_PATTERN: "bt", PRIORITY_TIER_LABELS: "bv", PRIORITY_TIER_ORDER: "bu", buildBlueFolderLifecycleCorrection: "bh", buildBlueFolderImportPatch: "bi", initialBlueFolderWorkflowStage: "bj", buildWorkflowTransitionUpdate: "L" };
const helperBindings = new Map(), neededLive = {};
for (const [name, binding] of dependencyRecords) {
  if (selected.has(name)) continue;
  if (liveBindings[name]) { neededLive[name] = liveBindings[name]; continue; }
  const declaration = binding.path.node;
  assert.equal(declaration.type, "VariableDeclarator", `Unsupported new dependency ${name}`);
  assert.equal(declaration.init?.callee?.name, "require", `Not a local CJS helper: ${name}`);
  const request = declaration.init.arguments[0]?.value;
  assert(request?.startsWith("./"), `Unexpected helper ${name}`);
  const group = helperBindings.get(request) || [];
  assert(declaration.id.properties.some(p => p.value?.name === name && p.key.name === name), `Alias needs review ${name}`);
  group.push(name); helperBindings.set(request, group);
}
const helpers = [...helperBindings].map(([request, bindings]) => `const { ${bindings.join(", ")} } = require(${JSON.stringify("./lib/ops/" + request.slice(2))});`).join("\n");
const service = `"use strict";\n${helpers}\nmodule.exports = function createWorkOrderLinkService(dependencies) {\nconst { ${Object.keys(neededLive).join(", ")} } = dependencies;\n${names.map(name => selected.get(name)).join("\n\n")}\nreturn { updateOpsConnections, upsertOpsWorkOrder, importOpsBlueFolderWorkOrder };\n};\n`;
parser.parse(service);
const serviceInitializer = `let __woLinkCoverageService;function __getWoLinkCoverageService(){return __woLinkCoverageService||(__woLinkCoverageService=require(process.cwd()+"/work-order-link/service.cjs")({${Object.entries(neededLive).map(([name, live]) => `${name}:${live}`).join(",")}}))}`;
const replacements = [], originalFunctions = new Map();
traverse(parser.parse("(" + factory + ")"), { FunctionDeclaration(p) {
  if (!p.getFunctionParent()?.isArrowFunctionExpression()) return;
  const name = p.node.id.name, original = factory.slice(p.node.start - 1, p.node.end - 1); originalFunctions.set(name, original);
  const exportedName = { aj: "updateOpsConnections", an: "upsertOpsWorkOrder", ao: "importOpsBlueFolderWorkOrder" }[name];
  if (exportedName) replacements.push({ name, original, replacement: `async function ${name}(...args){return __getWoLinkCoverageService().${exportedName}(...args)}` });
} });
assert.equal(replacements.length, 3); let patched = factory;
for (const replacement of replacements) { assert.equal(patched.split(replacement.original).length, 2); patched = patched.replace(replacement.original, () => replacement.replacement); }
const serializer = originalFunctions.get("ag"), serializerAst = parser.parse("(" + serializer + ")"); let serializerProperty;
traverse(serializerAst, { ObjectProperty(p) { if (p.node.key.name === "clientId" && p.node.value.type === "CallExpression" && p.node.value.arguments[0]?.object?.name === "e") { assert(!serializerProperty); serializerProperty = p.node; } } });
assert(serializerProperty, "Unique serializer root clientId field required");
const insertion = 'linkHealth:require(process.cwd()+"/work-order-link/lib/ops/workOrderLinkHealth.cjs").publicLinkHealth(e.linkHealth),';
const patchedSerializer = serializer.slice(0, serializerProperty.start - 1) + insertion + serializer.slice(serializerProperty.start - 1);
assert.equal(patched.split(serializer).length, 2); patched = patched.replace(serializer, () => serviceInitializer + patchedSerializer);
parser.parseExpression(patched);
let reversed = patched.replace(serviceInitializer, "").replace(patchedSerializer, () => serializer);
for (const replacement of replacements) reversed = reversed.replace(replacement.replacement, () => replacement.original);
assert.equal(reversed, factory, "All other factory bytes must be unchanged");
const finalChunk = patchFactories(chunk, { 78806: patched });
assert.equal(sha(finalChunk.replace(patched, () => factory)), sha(chunk), "All other shared factories must be unchanged");
const frozenFiles = new Map([[sourcePath, sha(source)]]), copyFiles = new Map();
function include(relative) {
  if (copyFiles.has(relative)) return;
  if (relative === "lib/bluefolder/client.js") return; // Exact active compiled client is adapted below, never the dirty source graph.
  const value = fs.readFileSync(path.join(root, relative)); copyFiles.set(relative, value); frozenFiles.set(relative, sha(value));
  traverse(parser.parse(value.toString("utf8"), { sourceType: "unambiguous" }), { CallExpression(p) {
    if (p.node.callee.name !== "require" || p.node.arguments[0]?.type !== "StringLiteral") return;
    const request = p.node.arguments[0].value; if (!request.startsWith(".")) return;
    let resolved = path.resolve(root, path.dirname(relative), request); if (!path.extname(resolved)) resolved += ".js";
    const child = path.relative(root, resolved).replaceAll("\\", "/"); assert(child.startsWith("lib/"), "Unexpected relative helper scope " + child); include(child);
  } });
}
for (const request of helperBindings.keys()) include("lib/ops/" + request.slice(2));
for (const relative of ["lib/ops/workOrderLinkRuntime.cjs", "lib/ops/workOrderLinkSweep.cjs"]) include(relative);
const importContractRelative = "lib/ops/blueFolderImportContract.cjs", legacyImportContract = "machine-link/blueFolderImportContract.cjs";
const importContract = read(path.join(root, importContractRelative)), originalImportContract = read(path.join(baseline, legacyImportContract));
const presenceLine = '  if (hasOwn(blueFolder, "equipmentIds")) desired.bluefolderEquipmentFieldPresence = "present";';
assert.equal(importContract.split(presenceLine).length, 2);
assert.equal(importContract.replace(presenceLine + "\n", "").replaceAll("\r\n", "\n"), originalImportContract.replaceAll("\r\n", "\n"), "Import contract changes limited to explicit presence marker");
frozenFiles.set(importContractRelative, sha(importContract));
const bfFactory = getFactory(read(path.join(baseline, ".next/server/chunks/741.js")), 96965);
assert.equal(sha(bfFactory), "e7237d875c3118aa608ff79b62e339ed064a12ecd298c6be09e191e8901e5bb4");
assert.deepEqual([...requiredIds(bfFactory)], [46566]);
const bluefolderAdapter = `"use strict";\n// Exact 00066 BlueFolder factory; only public export names are adapted.\nconst entry = { exports: {} };\nconst load = id => { if(id !== 46566) throw new Error("Unexpected BlueFolder dependency"); return require("xml2js"); };\nload.d = (target, definitions) => { for (const [key, getter] of Object.entries(definitions)) Object.defineProperty(target,key,{enumerable:true,get:getter}); };\n(${bfFactory})(entry,entry.exports,load);\nmodule.exports = { getBlueFolderSlackSettings: entry.exports._, extractWorkOrderFields: entry.exports.ag, BlueFolderClient: entry.exports.su, createBlueFolderClient: entry.exports.wQ };\n`;
parser.parse(bluefolderAdapter);
fs.cpSync(baseline, out, { recursive: true, force: false, errorOnExist: true });
function write(relative, value) { fs.mkdirSync(path.dirname(path.join(out, relative)), { recursive: true }); fs.writeFileSync(path.join(out, relative), value); }
write(chunkPath, finalChunk); write("work-order-link/service.cjs", service); write("work-order-link/lib/bluefolder/client.js", bluefolderAdapter);
write(legacyImportContract, importContract);
for (const [relative, value] of copyFiles) write("work-order-link/" + relative, value);
const routeOverlay = require("./compose-route-overlays.cjs")({ root, baseline, out, frozenFiles });
for (const [relative, expected] of frozenFiles) assert.equal(sha(fs.readFileSync(path.join(root, relative))), expected, "Input changed during draft: " + relative);
const changed = [], added = [], oldFiles = new Set(walk(baseline).map(file => path.relative(baseline, file).replaceAll("\\", "/")));
for (const relative of oldFiles) if (sha(fs.readFileSync(path.join(baseline, relative))) !== sha(fs.readFileSync(path.join(out, relative)))) changed.push(relative);
for (const file of walk(out)) { const relative = path.relative(out, file).replaceAll("\\", "/"); if (!oldFiles.has(relative)) added.push(relative); }
assert.deepEqual(changed.sort(), [chunkPath, legacyImportContract, ".next/server/pages/api/cron/magmonitor-alerts.js", ".next/server/pages-manifest.json", ".next/routes-manifest.json"].sort());
const report = { generatedAt: new Date().toISOString(), draftOnly: true, approvedForDeployment: false, directory: outName, baseline: baselineMeta, sourceHashes: Object.fromEntries(frozenFiles), changed, added, sharedFactory: { module: 78806, beforeSHA256: sha(factory), afterSHA256: sha(patched), originalExportMappingsPreserved: true, reverseVerified: true, bindings: neededLive, functions: replacements.map(({ name, original, replacement }) => ({ name, beforeSHA256: sha(original), afterSHA256: sha(replacement) })), sourceFunctions: Object.fromEntries([...selected].map(([name, value]) => [name, sha(value)])), unaffectedFunctionCount: originalFunctions.size - 4, serializerInsertion: insertion }, liveBluefolderAdapter: { id: 96965, factorySHA256: sha(bfFactory), sourceCopied: false }, noStaticChanges: true, noRouteChangesYet: true, productionMutations: 0 };
report.routeOverlay = routeOverlay; report.noRouteChangesYet = false;
fs.writeFileSync(path.join(__dirname, outName + "-report.json"), JSON.stringify(report, null, 2) + "\n"); console.log(JSON.stringify({ directory: report.directory, sourceHashes: report.sourceHashes, changed: report.changed, added: report.added, routeOverlay }, null, 2));
