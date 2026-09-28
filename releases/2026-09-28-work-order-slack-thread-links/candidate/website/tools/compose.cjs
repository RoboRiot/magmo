"use strict";
// Exact 00064 baseline overlay. The fresh compiler tree is NEVER copied.
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const parser = require("@babel/parser"), traverse = require("@babel/traverse").default, { loadEnvConfig } = require("@next/env");
const T = require("../../ot-collapse-20260928/factory-tools.cjs");
const here = __dirname, root = path.resolve(here, "../../.."), source = path.join(here, "source"), active = path.join(source, ".next"), fresh = path.join(here, "fresh-next-root"), out = path.join(here, "scoped-source");
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(here, file), "utf8"));
const baseline = readJson("baseline.json"), frozen = readJson("frozen-inputs.json");
assert.equal(baseline.revision, "nextserverwest-00064-miz");
assert.equal(T.sha(fs.readFileSync(path.join(here, "source.zip"))), baseline.archiveSHA256);
for (const [file, hash] of Object.entries({ ...frozen.inputs, ...frozen.controls, ...frozen.dependencies, ...frozen.compilerInputs })) assert.equal(T.sha(fs.readFileSync(path.join(root, file))), hash, `Frozen source changed: ${file}`);
assert(!fs.existsSync(out), "Preserve existing candidate.");
const changes = new Map(), setChange = (relative, value) => changes.set(relative, Buffer.from(value)), moduleProofs = [];

// Preserve wrapper, loader, source metadata and every unrelated API factory.
const api = "server/pages/api/items/work-order-add/slack.js", oldApi = T.read(path.join(active, api)), freshApi = T.read(path.join(fresh, api));
assert.deepEqual(T.loaderChunks(oldApi), [5030, 4354, 1572]);
const oldFactories = new Map(T.factories(oldApi).map((entry) => [entry.id, entry.source]));
let newApi = T.patchFactories(oldApi, { 10985: T.getFactory(freshApi, 10985), 99397: T.getFactory(freshApi, 99397) });
const globalActive = T.index(path.join(active, "server"));
const additions = [];
for (const id of [92765, 97306]) {
  assert(!oldFactories.has(id), `New helper ${id} is already in target route.`);
  let factory = T.getFactory(freshApi, id);
  const priorCopies = globalActive.get(id) || [];
  if (priorCopies.length) {
    assert.equal(id, 92765, "Unexpected collision with the new thread helper.");
    for (const copy of priorCopies) assert.equal(T.canonical(copy.source), T.canonical(factory), `Incompatible existing shared dispatch helper ${copy.file}#${id}`);
    // Exact same old body if the pure helper is already embedded by another route.
    factory = priorCopies[0].source;
  }
  additions.push({ id, factory, existingCompatibleCopies: priorCopies.map((copy) => copy.file), freshSHA256: T.sha(T.getFactory(freshApi, id)), composedSHA256: T.sha(factory) });
}
const registry = T.factories(newApi).find((entry) => entry.id === 99397);
assert(registry);
newApi = newApi.slice(0, registry.objectEnd - 1) + "," + additions.map(({ id, factory }) => `${id}:${factory}`).join(",") + newApi.slice(registry.objectEnd - 1);
parser.parse(newApi);
assert.deepEqual(T.loaderChunks(newApi), T.loaderChunks(oldApi));
const newFactories = new Map(T.factories(newApi).map((entry) => [entry.id, entry.source]));
assert.equal(newFactories.size, oldFactories.size + 2);
for (const [id, factory] of oldFactories) if (![10985, 99397].includes(id)) assert.equal(newFactories.get(id), factory, `Unrelated API factory ${id} changed.`);
for (const id of [10985, 99397, 97306, 92765]) {
  const available = new Set([...newFactories.keys(), ...[5030, 4354, 1572].flatMap((chunk) => T.factories(T.read(path.join(active, `server/chunks/${chunk}.js`))).map((item) => item.id))]);
  for (const required of T.requiredIds(newFactories.get(id))) assert(available.has(required), `Missing direct dependency ${required} for ${id}`);
}
setChange(`.next/${api}`, newApi);
moduleProofs.push({ target: api, replacedModules: [10985, 99397], addedModules: additions.map(({ factory, ...proof }) => proof), loaderChunksUnchanged: [5030, 4354, 1572], unrelatedModulesPreserved: true });

// Only mainSearch's concatenated WorkOrderAddModal factory changes. Root's
// independent intra-factory AST proof is required before package approval.
const route = "/NewSearch/mainSearch", activeManifest = JSON.parse(T.read(path.join(active, "build-manifest.json"))), freshManifest = JSON.parse(T.read(path.join(fresh, "build-manifest.json")));
const getPage = (manifest) => manifest.pages[route].find((file) => /pages\/NewSearch\/mainSearch-[^.]+\.js$/.test(file));
const activePage = getPage(activeManifest), freshPage = getPage(freshManifest), oldPageCode = T.read(path.join(active, activePage)), freshPageCode = T.read(path.join(fresh, freshPage));
const newUiFactory = T.getFactory(freshPageCode, 60992), newPageCode = T.patchFactories(oldPageCode, { 60992: newUiFactory });
const activeUiFactories = new Map(T.factories(oldPageCode).map(({ id, source }) => [id, source])), composedUiFactories = new Map(T.factories(newPageCode).map(({ id, source }) => [id, source]));
assert.deepEqual([...composedUiFactories.keys()], [...activeUiFactories.keys()]);
for (const [id, factory] of activeUiFactories) if (id !== 60992) assert.equal(composedUiFactories.get(id), factory, `Unrelated UI factory ${id} changed.`);
assert.deepEqual([...T.requiredIds(newUiFactory)], [...T.requiredIds(activeUiFactories.get(60992))]);
const pageSHA256 = T.sha(newPageCode), newPage = activePage.replace(/mainSearch-[^.]+\.js$/, `mainSearch-${pageSHA256.slice(0, 16)}.js`);
assert(!fs.existsSync(path.join(active, newPage)), "New UI asset must be immutable and additive.");
setChange(`.next/${newPage}`, newPageCode);
const activeCss = activeManifest.pages[route].filter((file) => file.endsWith(".css"));
const freshCss = freshManifest.pages[route].filter((file) => file.endsWith(".css"));
assert.equal(activeCss.length, freshCss.length);
for (let index = 0; index < activeCss.length; index++) assert.equal(T.read(path.join(active, activeCss[index])), T.read(path.join(fresh, freshCss[index])), "UI CSS content changed.");
const targetCss = activeCss.find((file) => T.read(path.join(active, file)).includes(".WorkOrderAddModal_"));
const uiAst = parser.parseExpression(newUiFactory), uiStatements = uiAst.body.body;
const defaultBinding = newUiFactory.match(/\.d\([^,]+,\{default:\(\)=>\s*([A-Za-z_$][\w$]*)/)[1];
const modalStatement = uiStatements.find((node) => node.type === "FunctionDeclaration" && newUiFactory.slice(node.start, node.end).includes("/api/items/work-order-add/confirm"));
assert(modalStatement?.id?.name, "Modal binding is unavailable.");
const uiBindings = { module: 60992, require: uiAst.params[2].name, exportObject: uiAst.params[1].name, default: defaultBinding, modal: modalStatement.id.name };
moduleProofs.push({ target: `client:${activePage}#60992`, before: T.sha(activeUiFactories.get(60992)), after: T.sha(newUiFactory), unrelatedModulesPreserved: true, unchangedImports: true, bindings: uiBindings });

// Old static content is immutable. Only new build manifests are emitted.
const oldBuildId = T.read(path.join(active, "BUILD_ID")).trim(), newBuildId = `wo-slack-thread-${pageSHA256.slice(0, 16)}`;
const substitutions = [[path.basename(activePage), path.basename(newPage)], [oldBuildId, newBuildId]], metadataChanges = [];
for (const file of T.walk(active)) {
  if (!/\.(?:js|json|html)$/.test(file) || file.startsWith(path.join(active, "static") + path.sep)) continue;
  const relative = T.slash(path.relative(source, file)), original = changes.has(relative) ? changes.get(relative).toString("utf8") : T.read(file);
  let updated = original;
  for (const [before, after] of substitutions) updated = updated.split(before).join(after);
  if (updated !== original) {
    let reversed = updated; for (const [before, after] of [...substitutions].reverse()) reversed = reversed.split(after).join(before);
    assert.equal(reversed, original, `Irreversible metadata update: ${relative}`); setChange(relative, updated); metadataChanges.push(relative);
  }
}
setChange(".next/BUILD_ID", newBuildId); metadataChanges.push(".next/BUILD_ID");
for (const file of T.walk(path.join(active, "static", oldBuildId))) {
  let value = T.read(file); for (const [before, after] of substitutions) value = value.split(before).join(after);
  setChange(`.next/static/${newBuildId}/${T.slash(path.relative(path.join(active, "static", oldBuildId), file))}`, value);
}
fs.cpSync(source, out, { recursive: true });
for (const [relative, bytes] of changes) { const file = path.join(out, relative); fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, bytes); }
const oldFiles = new Set(T.walk(source).map((file) => T.slash(path.relative(source, file)))), newFiles = new Set(T.walk(out).map((file) => T.slash(path.relative(out, file))));
for (const relative of oldFiles) if (!changes.has(relative)) assert.equal(T.sha(fs.readFileSync(path.join(out, relative))), T.sha(fs.readFileSync(path.join(source, relative))), `Unrelated file changed: ${relative}`);
const forbiddenNames = [...newFiles].filter((relative) => /(^|\/)(?:\.env(?:\.|$)|.*(?:service[-_]?account|firebase-adminsdk|credentials?\.(?:json|pem|key)).*)(?:$|\/)/i.test(relative)); assert.deepEqual(forbiddenNames, []);
loadEnvConfig(root, false, { info() {}, error() {} });
const sensitive = Object.entries(process.env).filter(([key, value]) => !key.startsWith("NEXT_PUBLIC_") && /(?:TOKEN|SECRET|PASSWORD|PRIVATE|API_KEY|CLIENT_EMAIL|SERVICE_ACCOUNT)/i.test(key) && typeof value === "string" && value.length >= 8);
const changedBytes = Buffer.concat([...changes.values()]), embeddedSensitiveNames = sensitive.filter(([, value]) => changedBytes.includes(Buffer.from(value))).map(([key]) => key); assert.deepEqual(embeddedSensitiveNames, []);
const buildWorkspaceLeaks = ["fresh-next-root", "build-workspace"].filter((value) => changedBytes.includes(Buffer.from(value))); assert.deepEqual(buildWorkspaceLeaks, []);
const inventory = [...newFiles].sort().map((relative) => ({ path: relative, sha256: T.sha(fs.readFileSync(path.join(out, relative))), bytes: fs.statSync(path.join(out, relative)).size }));
const report = { composedAt: new Date().toISOString(), baselineRevision: baseline.revision, baselineUpdateTime: baseline.updateTime, baselineGeneration: baseline.source.storageSource.generation, baselineArchiveSHA256: baseline.archiveSHA256, baselineConfigSHA256: baseline.configHash, activeBuildId: oldBuildId, newBuildId, activePage, newPage, pageSHA256, activeCss: targetCss, newCss: targetCss, cssUnchanged: true, uiBindings, frozenInputs: { ...frozen.inputs, ...frozen.dependencies, ...frozen.controls }, moduleProofs, added: [...newFiles].filter((file) => !oldFiles.has(file)).sort(), modified: [...oldFiles].filter((file) => changes.has(file)).sort(), metadataChanges: metadataChanges.sort(), substitutions, noDeletedFiles: [...oldFiles].every((file) => newFiles.has(file)), unrelatedFilesPreserved: true, sharedSenderPreserved: true, allSharedChunksPreserved: true, immutableOldAssetsPreserved: [...oldFiles].filter((file) => file.startsWith(".next/static/")).length, runtimeConfigChanged: false, forbiddenNames, embeddedSensitiveNames, buildWorkspaceLeaks, threadModuleId: 97306, serviceModuleId: 99397, routeModuleId: 10985, dispatchReceiptModuleId: 92765, files: inventory.length };
fs.writeFileSync(path.join(here, "candidate-files.json"), JSON.stringify(inventory, null, 2) + "\n");
fs.writeFileSync(path.join(here, "composition-report.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
