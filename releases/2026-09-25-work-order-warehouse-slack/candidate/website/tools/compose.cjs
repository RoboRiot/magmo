"use strict";

// Compose the frozen warehouse defaults + Slack prompt onto exact ACTIVE 00061.
// The dirty root build is a compiler oracle only; this script starts from the
// downloaded production archive and copies no root source or environment file.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { loadEnvConfig } = require("@next/env");

const here = __dirname;
const root = path.resolve(here, "../../..");
const source = path.join(here, "source");
const activeNext = path.join(source, ".next");
const freshNext = path.join(here, "fresh-next-root");
const out = path.join(here, "scoped-source");
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const slash = (value) => value.replace(/\\/g, "/");
const read = (base, relative) => fs.readFileSync(path.join(base, relative), "utf8");
const bytes = (base, relative) => fs.readFileSync(path.join(base, relative));
const walk = (folder) => fs.readdirSync(folder, { withFileTypes: true }).flatMap((entry) =>
  entry.isDirectory() ? walk(path.join(folder, entry.name)) : [path.join(folder, entry.name)]);

const baseline = JSON.parse(read(here, "baseline.json"));
const frozen = JSON.parse(read(here, "frozen-inputs.json"));
assert.equal(baseline.revision, "nextserverwest-00061-rej");
assert.equal(baseline.archiveSHA256, "075a5c40481f4e9f8b83261995cecd8be22c435d8ba89badf40f27cf97e9ae77");
assert.equal(sha256(bytes(here, "source.zip")), baseline.archiveSHA256);
for (const [relative, expected] of Object.entries(frozen.inputs)) {
  assert.equal(sha256(bytes(root, relative)), expected, `Frozen input drifted: ${relative}`);
}
assert(!fs.existsSync(out), "Preserve the already-composed candidate for review.");

function factoryLocation(code, id) {
  const ast = parser.parse(code);
  const matches = [];
  traverse(ast, { ObjectProperty(p) {
    const raw = p.node.key?.value ?? (p.node.key?.name && /^\d+$/.test(p.node.key.name) ? p.node.key.name : null);
    if (Number(raw) === id && p.get("value").isFunction()) matches.push(p.node.value);
  } });
  assert.equal(matches.length, 1, `Expected exactly one module factory ${id}.`);
  return matches[0];
}
function factory(code, id) {
  const node = factoryLocation(code, id);
  return code.slice(node.start, node.end);
}
function patchFactories(code, replacements) {
  const edits = [];
  for (const [rawId, replacement] of Object.entries(replacements)) {
    const node = factoryLocation(code, Number(rawId));
    parser.parseExpression(replacement);
    edits.push({ start: node.start, end: node.end, text: replacement });
  }
  for (const edit of edits.sort((left, right) => right.start - left.start)) {
    code = code.slice(0, edit.start) + edit.text + code.slice(edit.end);
  }
  parser.parse(code);
  return code;
}
function rewireMachineLink(factoryCode, expectedCount) {
  const expression = parser.parseExpression(factoryCode);
  const requireName = expression.params?.[2]?.name;
  assert(requireName, "Webpack require parameter is absent.");
  const pattern = new RegExp(`\\b${requireName.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}\\(20951\\)`, "g");
  const matches = factoryCode.match(pattern) || [];
  assert.equal(matches.length, expectedCount, "Unexpected machine-link import count.");
  const result = factoryCode.replace(pattern, 'require(process.cwd()+"/machine-link/workOrderMachineLink.cjs")');
  parser.parseExpression(result);
  return result;
}
function patchLoaderChunks(code, expected, replacement) {
  const ast = parser.parse(code);
  const matches = [];
  traverse(ast, { CallExpression(p) {
    if (p.node.callee?.type !== "MemberExpression" || p.node.callee.property?.name !== "X") return;
    const array = p.node.arguments.find((argument) => argument?.type === "ArrayExpression");
    if (array) matches.push(array);
  } });
  assert.equal(matches.length, 1, "Expected one webpack loader chunk array.");
  const before = matches[0].elements.map((entry) => entry?.value);
  assert.deepEqual(before, expected);
  code = code.slice(0, matches[0].start) + JSON.stringify(replacement) + code.slice(matches[0].end);
  parser.parse(code);
  return code;
}
function clientRegistry(code) {
  const context = { self: { webpackChunk_N_E: [] } };
  vm.runInNewContext(code, context, { timeout: 3000 });
  return new Map(context.self.webpackChunk_N_E.flatMap(([, modules]) => Object.entries(modules || {})
    .map(([id, item]) => [Number(id), sha256(item.toString())])));
}
function serverRegistry(code) {
  const context = { exports: {}, module: { exports: {} } }; context.module.exports = context.exports;
  vm.runInNewContext(code, context, { timeout: 3000 });
  const modules = context.exports.modules || context.module.exports.modules || {};
  return new Map(Object.entries(modules).map(([id, item]) => [Number(id), sha256(item.toString())]));
}

const changes = new Map();
const moduleProofs = [];
function setChange(relative, content) {
  changes.set(slash(relative), Buffer.isBuffer(content) ? content : Buffer.from(content));
}

function normalizeCompilerDistDir(code, label) {
  const freshDistDir = 'distDir:"tmp/work-order-warehouse-slack-20260925/deployment/fresh-next-root"';
  assert.equal(code.split(freshDistDir).length, 2, `Unexpected compiler distDir metadata: ${label}`);
  const normalized = code.replace(freshDistDir, 'distDir:".next"');
  assert(!normalized.includes("fresh-next-root"), `Build workspace path remains in ${label}.`);
  return normalized;
}

// Client: replace only the frozen WorkOrderAddModal concatenated factory.
const route = "/NewSearch/mainSearch";
const activeBuildManifest = JSON.parse(read(activeNext, "build-manifest.json"));
const freshBuildManifest = JSON.parse(read(freshNext, "build-manifest.json"));
const pageAsset = (manifest) => manifest.pages[route].find((file) => /pages\/NewSearch\/mainSearch-[^.]+\.js$/.test(file));
const activePage = pageAsset(activeBuildManifest);
const freshPage = pageAsset(freshBuildManifest);
const activePageCode = read(activeNext, activePage);
const freshPageCode = read(freshNext, freshPage);
const clientFactory = factory(freshPageCode, 60992);
const composedPageCode = patchFactories(activePageCode, { 60992: clientFactory });
const activeClientModules = clientRegistry(activePageCode);
const composedClientModules = clientRegistry(composedPageCode);
assert.deepEqual([...activeClientModules.keys()], [...composedClientModules.keys()]);
for (const [id, hash] of activeClientModules) {
  if (id === 60992) assert.notEqual(composedClientModules.get(id), hash);
  else assert.equal(composedClientModules.get(id), hash, `Unrelated client module ${id} changed.`);
}
assert(composedPageCode.includes("/api/items/work-order-add/slack"));

// CSS: the compiler emitted one unchanged CSS asset and one asset whose exact
// prefix is byte-identical through the first WorkOrderAddModal selector.
const cssFor = (base, manifest) => manifest.pages[route].filter((file) => file.endsWith(".css"))
  .map((file) => ({ file, code: read(base, file) }));
const activeCss = cssFor(activeNext, activeBuildManifest).find((entry) => entry.code.includes(".WorkOrderAddModal_"));
const freshCss = cssFor(freshNext, freshBuildManifest).find((entry) => entry.code.includes(".WorkOrderAddModal_"));
assert(activeCss && freshCss);
const activeBoundary = activeCss.code.indexOf(".WorkOrderAddModal_");
const freshBoundary = freshCss.code.indexOf(".WorkOrderAddModal_");
const activeCssPrefix = activeCss.code.slice(0, activeBoundary);
const freshCssPrefix = freshCss.code.slice(0, freshBoundary);
assert.equal(freshCssPrefix, activeCssPrefix, "Unrelated CSS prefix changed.");
const freshCssTailWithoutTarget = freshCss.code.slice(freshBoundary).replaceAll(".WorkOrderAddModal_", ".TARGET_");
const tailModulePrefixes = [...new Set(freshCssTailWithoutTarget.match(/\.[A-Za-z][A-Za-z0-9_-]*_/g) || [])];
assert(tailModulePrefixes.every((prefix) => prefix.startsWith(".TARGET_")), "Another CSS module follows the target boundary.");

const newPage = activePage.replace(/mainSearch-[^.]+\.js$/, `mainSearch-${sha256(composedPageCode).slice(0, 16)}.js`);
const newCss = activeCss.file.replace(/[^/]+\.css$/, `${sha256(freshCss.code).slice(0, 16)}.css`);
setChange(`.next/${newPage}`, composedPageCode);
setChange(`.next/${newCss}`, freshCss.code);
moduleProofs.push({
  target: `client:${activePage}#60992`, before: activeClientModules.get(60992), after: composedClientModules.get(60992),
  unrelatedModulesPreserved: true,
});

// Server warehouse behavior: preserve ACTIVE chunk topology and external
// machine-link helper while replacing only frozen service/contract factories.
const active4354 = read(activeNext, "server/chunks/4354.js");
let freshService = factory(read(freshNext, "server/chunks/4354.js"), 54354);
freshService = rewireMachineLink(freshService, 1);
const freshContract = factory(read(freshNext, "server/chunks/2631.js"), 92631);
const composed4354 = patchFactories(active4354, { 54354: freshService, 92631: freshContract });
const active4354Modules = serverRegistry(active4354);
const composed4354Modules = serverRegistry(composed4354);
for (const [id, hash] of active4354Modules) {
  if ([54354, 92631].includes(id)) assert.notEqual(composed4354Modules.get(id), hash);
  else assert.equal(composed4354Modules.get(id), hash, `Unrelated 4354 module ${id} changed.`);
}
setChange(".next/server/chunks/4354.js", composed4354);
moduleProofs.push({ target: "server/chunks/4354.js", replacedModules: [54354, 92631], unrelatedModulesPreserved: true,
  machineLinkSource: "existing external /machine-link/workOrderMachineLink.cjs" });

// Options embeds its serializer in the route. Keep the ACTIVE route wrapper and
// add only chunk 4354, which now carries the frozen contract.
const activeOptions = read(activeNext, "server/pages/api/items/work-order-add/options.js");
let freshOptionsFactory = factory(read(freshNext, "server/pages/api/items/work-order-add/options.js"), 82318);
freshOptionsFactory = rewireMachineLink(freshOptionsFactory, 1);
let composedOptions = patchFactories(activeOptions, { 82318: freshOptionsFactory });
// Frozen contract 92631 uses storage-unit contract module 95098. Preserve its
// reviewed ACTIVE implementation by loading existing chunk 7581, rather than
// copying the broader fresh compiler closure.
composedOptions = patchLoaderChunks(composedOptions, [5030], [5030, 7581, 4354]);
setChange(".next/server/pages/api/items/work-order-add/options.js", composedOptions);
moduleProofs.push({ target: "server/pages/api/items/work-order-add/options.js#82318", loaderBefore: [5030], loaderAfter: [5030, 7581, 4354],
  machineLinkSource: "existing external /machine-link/workOrderMachineLink.cjs",
  storageUnitContractSource: "existing ACTIVE chunk 7581 module 95098" });

// Slack sender is a new isolated shared chunk. Its route wrapper is compiler
// output from the frozen source; the existing default endpoint remains present.
let senderChunkCode = read(freshNext, "server/chunks/1572.js");
const freshOpsLoader = "Promise.all([c.e(9449),c.e(2341),c.e(8806)]).then(c.bind(c,78806))";
const activeOpsLoader = "c.e(8806).then(c.bind(c,78806))";
assert.equal(senderChunkCode.split(freshOpsLoader).length, 2, "Unexpected sender Ops dynamic-loader topology.");
senderChunkCode = senderChunkCode.replace(freshOpsLoader, activeOpsLoader);
assert(!senderChunkCode.includes("c.e(9449)") && !senderChunkCode.includes("c.e(2341)"),
  "Fresh-only Ops chunks remain in the sender.");
const senderChunk = Buffer.from(senderChunkCode);
assert(!fs.existsSync(path.join(activeNext, "server/chunks/1572.js")), "Sender chunk collides with ACTIVE.");
setChange(".next/server/chunks/1572.js", senderChunk);
const freshAddToList = normalizeCompilerDistDir(
  read(freshNext, "server/pages/api/slack/add-to-list.js"),
  "api/slack/add-to-list"
);
assert.deepEqual([...serverRegistry(senderChunk.toString("utf8")).keys()], [1572]);
setChange(".next/server/pages/api/slack/add-to-list.js", freshAddToList);
moduleProofs.push({ target: "server/chunks/1572.js#1572", opsLoaderBefore: [9449, 2341, 8806], opsLoaderAfter: [8806],
  opsModule: 78806, opsExport: "recordOpsInventoryMovement", opsSource: "existing ACTIVE chunk 8806" });

// The additive work-order Slack route originally points at fresh chunk 2631 for
// contract 92631. Repoint only that loader edge to composed ACTIVE chunk 4354.
let workOrderSlackRoute = read(freshNext, "server/pages/api/items/work-order-add/slack.js");
workOrderSlackRoute = patchLoaderChunks(workOrderSlackRoute, [5030, 2631, 1572], [5030, 4354, 1572]);
workOrderSlackRoute = normalizeCompilerDistDir(workOrderSlackRoute, "api/items/work-order-add/slack");
setChange(".next/server/pages/api/items/work-order-add/slack.js", workOrderSlackRoute);

// Minimal trace manifests: preserve the ACTIVE closures and add only the local
// chunks actually introduced by the composed loaders. The additive route uses
// the union of existing authenticated work-order + Slack closures.
function nftEntries(base, relative) { return JSON.parse(read(base, relative)).files || []; }
function abstractAbsolute(nftRelative, entry) {
  return path.posix.resolve("/project/.next", path.posix.dirname(nftRelative), slash(entry));
}
function abstractRelative(nftRelative, absolute) {
  return path.posix.relative(path.posix.resolve("/project/.next", path.posix.dirname(nftRelative)), absolute);
}
function rebaseEntries(fromNft, entries, toNft) {
  return entries.map((entry) => abstractRelative(toNft, abstractAbsolute(fromNft, entry)));
}
function localChunkEntry(nftRelative, chunk) {
  return abstractRelative(nftRelative, path.posix.resolve("/project/.next/server/chunks", `${chunk}.js`));
}
const optionsNft = "server/pages/api/items/work-order-add/options.js.nft.json";
const addNft = "server/pages/api/slack/add-to-list.js.nft.json";
const slackNft = "server/pages/api/items/work-order-add/slack.js.nft.json";
const activeOptionsEntries = nftEntries(activeNext, optionsNft);
const activeAddEntries = nftEntries(activeNext, addNft);
const composedOptionsEntries = [...new Set([
  ...activeOptionsEntries,
  localChunkEntry(optionsNft, 7581),
  localChunkEntry(optionsNft, 4354),
])].sort();
const composedAddEntries = [...new Set([...activeAddEntries, localChunkEntry(addNft, 1572)])].sort();
const composedSlackEntries = [...new Set([
  ...rebaseEntries(optionsNft, activeOptionsEntries, slackNft),
  ...rebaseEntries(addNft, activeAddEntries, slackNft),
  localChunkEntry(slackNft, 4354), localChunkEntry(slackNft, 1572), localChunkEntry(slackNft, 5030),
  abstractRelative(slackNft, "/project/.next/server/webpack-api-runtime.js"),
])].sort();
setChange(`.next/${optionsNft}`, JSON.stringify({ version: 1, files: composedOptionsEntries }));
setChange(`.next/${addNft}`, JSON.stringify({ version: 1, files: composedAddEntries }));
setChange(`.next/${slackNft}`, JSON.stringify({ version: 1, files: composedSlackEntries }));

const pagesManifestRelative = "server/pages-manifest.json";
const pagesManifest = JSON.parse(read(activeNext, pagesManifestRelative));
assert(!pagesManifest["/api/items/work-order-add/slack"]);
pagesManifest["/api/items/work-order-add/slack"] = "pages/api/items/work-order-add/slack.js";
setChange(`.next/${pagesManifestRelative}`, JSON.stringify(pagesManifest, null, 2));

// Emit immutable client assets and a new build ID while preserving every old
// immutable asset. Reference substitutions must reverse exactly.
const oldBuildId = read(activeNext, "BUILD_ID").trim();
const newBuildId = `wo-warehouse-slack-${sha256(composedPageCode + freshCss.code).slice(0, 16)}`;
const substitutions = [
  [path.basename(activePage), path.basename(newPage)],
  [path.basename(activeCss.file), path.basename(newCss)],
  [oldBuildId, newBuildId],
];
const metadataChanges = [];
for (const file of walk(activeNext)) {
  const relative = slash(path.relative(source, file));
  if (!/\.(?:js|json|html)$/.test(file) || file === path.join(activeNext, activePage)) continue;
  // Every pre-existing static file is immutable. New build-scoped copies are
  // emitted below; no existing static asset or historical build manifest may
  // be rewritten in place.
  if (file.startsWith(path.join(activeNext, "static") + path.sep)) continue;
  const original = fs.readFileSync(file, "utf8");
  let updated = changes.has(relative) ? changes.get(relative).toString("utf8") : original;
  for (const [before, after] of substitutions) updated = updated.split(before).join(after);
  if (updated !== (changes.has(relative) ? changes.get(relative).toString("utf8") : original)) {
    let reversed = updated;
    for (const [before, after] of [...substitutions].reverse()) reversed = reversed.split(after).join(before);
    assert.equal(reversed, changes.has(relative) ? changes.get(relative).toString("utf8") : original,
      `Reference update was not reversible: ${relative}`);
    metadataChanges.push(relative);
    setChange(relative, updated);
  }
}
setChange(".next/BUILD_ID", newBuildId);
metadataChanges.push(".next/BUILD_ID");
for (const file of walk(path.join(activeNext, "static", oldBuildId))) {
  const inner = slash(path.relative(path.join(activeNext, "static", oldBuildId), file));
  let updated = fs.readFileSync(file, "utf8");
  for (const [before, after] of substitutions) updated = updated.split(before).join(after);
  setChange(`.next/static/${newBuildId}/${inner}`, updated);
}

// Ensure build manifest now points at the immutable target client assets.
const composedManifest = JSON.parse(changes.get(".next/build-manifest.json").toString("utf8"));
assert(composedManifest.pages[route].includes(newPage));
assert(composedManifest.pages[route].includes(newCss));
assert(!composedManifest.pages[route].includes(activePage));
assert(!composedManifest.pages[route].includes(activeCss.file));

// Build the candidate strictly from ACTIVE and prove all non-declared files.
fs.cpSync(source, out, { recursive: true });
for (const [relative, content] of changes) {
  const target = path.join(out, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}
for (const file of walk(source)) {
  const relative = slash(path.relative(source, file));
  if (!changes.has(relative)) {
    assert.equal(sha256(fs.readFileSync(file)), sha256(fs.readFileSync(path.join(out, relative))), `Unrelated file changed: ${relative}`);
  }
}

// Reject local env/credential filenames and any non-public credential value in
// newly emitted or changed bytes. Values and raw env contents are never logged.
const forbiddenNames = walk(out).map((file) => slash(path.relative(out, file))).filter((relative) =>
  /(^|\/)(?:\.env(?:\.|$)|.*(?:service[-_]?account|firebase-adminsdk|credentials?\.(?:json|pem|key)).*)(?:$|\/)/i.test(relative));
assert.deepEqual(forbiddenNames, []);
loadEnvConfig(root, false, { info() {}, error() {} });
const sensitiveValues = Object.entries(process.env).filter(([key, value]) =>
  !key.startsWith("NEXT_PUBLIC_") && /(?:TOKEN|SECRET|PASSWORD|PRIVATE|API_KEY|CLIENT_EMAIL|SERVICE_ACCOUNT)/i.test(key) &&
  typeof value === "string" && value.length >= 8);
const changedBytes = Buffer.concat([...changes.values()]);
const embeddedSensitiveNames = sensitiveValues.filter(([, value]) => changedBytes.includes(Buffer.from(value))).map(([key]) => key);
assert.deepEqual(embeddedSensitiveNames, [], "A non-public environment value entered the candidate.");
const buildWorkspaceLeaks = ["fresh-next-root", "build-workspace"].filter((value) => changedBytes.includes(Buffer.from(value)));
assert.deepEqual(buildWorkspaceLeaks, [], "A local compiler workspace path entered the candidate.");

const sourceFiles = new Set(walk(source).map((file) => slash(path.relative(source, file))));
const outFiles = new Set(walk(out).map((file) => slash(path.relative(out, file))));
const added = [...outFiles].filter((file) => !sourceFiles.has(file)).sort();
const modified = [...sourceFiles].filter((file) => changes.has(file)).sort();
const report = {
  composedAt: new Date().toISOString(),
  baselineRevision: baseline.revision,
  baselineUpdateTime: baseline.updateTime,
  baselineGeneration: baseline.source.storageSource.generation,
  baselineArchiveSHA256: baseline.archiveSHA256,
  baselineConfigSHA256: baseline.configHash,
  activeBuildId: oldBuildId,
  newBuildId,
  activePage,
  newPage,
  activeCss: activeCss.file,
  newCss,
  cssProof: {
    unrelatedPrefixBytes: Buffer.byteLength(activeCssPrefix),
    unrelatedPrefixSHA256: sha256(activeCssPrefix),
    targetPrefixOccurrencesBefore: (activeCss.code.match(/WorkOrderAddModal_/g) || []).length,
    targetPrefixOccurrencesAfter: (freshCss.code.match(/WorkOrderAddModal_/g) || []).length,
    noOtherModuleAfterBoundary: true,
  },
  frozenInputs: frozen.inputs,
  moduleProofs,
  routes: {
    confirm: "unchanged route wrapper; composed 4354 factories",
    options: "active wrapper + factory 82318 + loader 4354",
    slack: "additive route; loader rebased 2631 -> 4354",
    addToList: "frozen shared-sender route wrapper + additive chunk 1572",
  },
  added,
  modified,
  metadataChanges: [...new Set(metadataChanges)].sort(),
  noDeletedFiles: [...sourceFiles].every((file) => outFiles.has(file)),
  unrelatedFilesPreserved: true,
  unrelatedClientModulesPreserved: true,
  unrelated4354ModulesPreserved: true,
  externalMachineLinkHelperPreserved: true,
  forbiddenNames,
  embeddedSensitiveNames,
  buildWorkspaceLeaks,
  runtimeConfigChanged: false,
  parentApproved: false,
  testsPassed: false,
};
fs.writeFileSync(path.join(here, "composition-report.json"), JSON.stringify(report, null, 2) + "\n");
process.stdout.write(JSON.stringify({ composed: true, newBuildId, newPage, newCss, added: added.length, modified: modified.length }) + "\n");
