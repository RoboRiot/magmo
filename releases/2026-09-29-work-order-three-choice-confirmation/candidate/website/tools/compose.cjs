"use strict";

const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const { loadEnvConfig } = require("@next/env");
const T = require("../../ot-collapse-20260928/factory-tools.cjs");

const here = __dirname;
const root = path.resolve(here, "../../..");
const source = path.join(here, "source");
const active = path.join(source, ".next");
const oracle = path.join(here, "build-workspace", ".next-oracle");
const out = path.join(here, "scoped-source-v3");
const baseline = JSON.parse(fs.readFileSync(path.join(here, "baseline.json"), "utf8"));
const frozen = JSON.parse(fs.readFileSync(path.join(here, "frozen-inputs.json"), "utf8"));
const analysis = JSON.parse(fs.readFileSync(path.join(here, "oracle-analysis.json"), "utf8"));

assert.equal(baseline.revision, "nextserverwest-00070-liw");
assert.equal(T.sha(fs.readFileSync(path.join(here, "source.zip"))), baseline.archiveSHA256);
for (const [relative, expected] of Object.entries(frozen.hashes)) {
  assert.equal(T.sha(fs.readFileSync(path.join(root, relative))), expected, `Frozen root input drifted: ${relative}`);
  assert.equal(T.sha(fs.readFileSync(path.join(here, "build-workspace", relative))), expected, `Frozen isolated input drifted: ${relative}`);
}
assert(!fs.existsSync(out), "Preserve the existing scoped candidate for review.");
assert.equal(analysis.active.page, "static/chunks/pages/NewSearch/mainSearch-ee3b5c016831c2f7.js");
assert.equal(analysis.active.componentFactorySHA256, "c8d9dad81d6a14a81e0a657cc1aefaf723da34d022219a01ba813fbdf7886225");
assert.equal(analysis.active.cssMappingFactorySHA256, "84185ba38b3141c60a3c8b93dc02987ae032ce814b0776bf33d8a394c333dabb");
assert.equal(analysis.oracle.cssMappingFactorySHA256, "a3ebabaebb291c2a85db409eb04094c1e0cfc9cfe1b250273c1a56b0840e1286");
assert.equal(analysis.cssByteIdentical, true);

function declaredNames(node) {
  if (node.type === "FunctionDeclaration" || node.type === "ClassDeclaration") {
    return node.id?.name ? [node.id.name] : [];
  }
  if (node.type !== "VariableDeclaration") return [];
  const patternNames = (pattern) => {
    if (!pattern) return [];
    if (pattern.type === "Identifier") return [pattern.name];
    if (pattern.type === "ObjectPattern") return pattern.properties.flatMap((property) =>
      property.type === "RestElement" ? patternNames(property.argument) : patternNames(property.value)
    );
    if (pattern.type === "ArrayPattern") return pattern.elements.flatMap(patternNames);
    if (pattern.type === "AssignmentPattern") return patternNames(pattern.left);
    if (pattern.type === "RestElement") return patternNames(pattern.argument);
    assert.fail(`Unsupported top-level binding pattern: ${pattern.type}`);
  };
  return node.declarations.flatMap((declaration) => patternNames(declaration.id));
}

function parsedFactory(factory) {
  const ast = parser.parse(`(${factory})`, { sourceType: "script" });
  let factoryPath;
  traverse(ast, {
    Function(pathValue) {
      if (pathValue.node === ast.program.body[0].expression) factoryPath = pathValue;
    },
  });
  assert(factoryPath, "Factory scope is unavailable.");
  return { ast, expression: ast.program.body[0].expression, factoryPath };
}

function statementText(factory, node) {
  return factory.slice(node.start - 1, node.end - 1);
}

const activePage = analysis.active.page;
const oraclePage = analysis.oracle.page;
const activePageCode = T.read(path.join(active, activePage));
const oraclePageCode = T.read(path.join(oracle, oraclePage));
const activeFactory = T.getFactory(activePageCode, 60992);
const oracleFactory = T.getFactory(oraclePageCode, analysis.oracleModuleIds.component);
const activeParsed = parsedFactory(activeFactory);
const oracleParsed = parsedFactory(oracleFactory);
const activeStatements = activeParsed.expression.body.body;
const oracleStatements = oracleParsed.expression.body.body;
assert.equal(activeStatements.length, oracleStatements.length);
const activeModalIndex = activeStatements.findIndex((node) => statementText(activeFactory, node).includes("/api/items/work-order-add/confirm"));
const oracleModalIndex = oracleStatements.findIndex((node) => statementText(oracleFactory, node).includes("/api/items/work-order-add/confirm"));
assert.equal(activeModalIndex, 79);
assert.equal(oracleModalIndex, activeModalIndex);

const bindingMap = new Map();
const pair = (from, to, label) => {
  assert(from && to, `Missing binding at ${label}`);
  const prior = bindingMap.get(from);
  assert(prior == null || prior === to, `Conflicting binding map for ${from}`);
  bindingMap.set(from, to);
};
assert.equal(activeParsed.expression.params.length, oracleParsed.expression.params.length);
oracleParsed.expression.params.forEach((node, index) => pair(node.name, activeParsed.expression.params[index].name, `param ${index}`));
for (let index = 0; index < activeStatements.length; index += 1) {
  assert.equal(oracleStatements[index].type, activeStatements[index].type, `Statement type drift at ${index}`);
  const from = declaredNames(oracleStatements[index]);
  const to = declaredNames(activeStatements[index]);
  assert.equal(from.length, to.length, `Binding count drift at statement ${index}`);
  from.forEach((name, bindingIndex) => pair(name, to[bindingIndex], `statement ${index} binding ${bindingIndex}`));
}
assert.equal(bindingMap.get(declaredNames(oracleStatements[oracleModalIndex])[0]), declaredNames(activeStatements[activeModalIndex])[0]);

let renameIndex = 0;
const staged = [];
for (const [from, to] of bindingMap) {
  const temporary = `__work_order_scope_${renameIndex++}__`;
  oracleParsed.factoryPath.scope.rename(from, temporary);
  staged.push([temporary, to]);
}
for (const [temporary, to] of staged) oracleParsed.factoryPath.scope.rename(temporary, to);
const rebasedModalNode = oracleParsed.expression.body.body[oracleModalIndex];
const rebasedModal = generate(rebasedModalNode, { compact: true, comments: false }).code;
assert(rebasedModal.includes("Save only"));
assert(rebasedModal.includes("Save and send to Slack"));
assert(!rebasedModal.includes("Send saved items to Slack?"));
assert(rebasedModal.includes("/api/items/work-order-add/confirm"));
assert(rebasedModal.includes("/api/items/work-order-add/slack"));

const activeModalNode = activeStatements[activeModalIndex];
const modalStart = activeModalNode.start - 1;
const modalEnd = activeModalNode.end - 1;
const newFactory = activeFactory.slice(0, modalStart) + rebasedModal + activeFactory.slice(modalEnd);
parser.parseExpression(`(${newFactory})`);
assert.deepEqual([...T.requiredIds(newFactory)].sort((a, b) => a - b), [...T.requiredIds(activeFactory)].sort((a, b) => a - b));
assert(newFactory.includes("r(98092901)") || newFactory.includes("(98092901)"), "Private item-status module binding was lost.");

const oracleMapping = T.getFactory(oraclePageCode, analysis.oracleModuleIds.cssMapping);
assert.deepEqual([...T.requiredIds(oracleMapping)], []);
let newPageCode = T.patchFactories(activePageCode, { 60992: newFactory, 21704: oracleMapping });
const activeFactories = new Map(T.factories(activePageCode).map(({ id, source: factory }) => [id, factory]));
const candidateFactories = new Map(T.factories(newPageCode).map(({ id, source: factory }) => [id, factory]));
assert.deepEqual([...candidateFactories.keys()], [...activeFactories.keys()]);
const changedFactoryIds = [...activeFactories].filter(([id, factory]) => candidateFactories.get(id) !== factory).map(([id]) => id);
assert.deepEqual(changedFactoryIds, [21704, 60992]);
for (const id of [98092901, 98092902]) assert.equal(candidateFactories.get(id), activeFactories.get(id), `Private item-status factory ${id} changed.`);

const freshCss = T.read(path.join(oracle, analysis.oracle.css.path));
const activeCss = T.read(path.join(active, analysis.active.css.path));
assert.equal(freshCss, activeCss, "Reviewed WorkOrder CSS is not byte-identical to ACTIVE.");
const mappingValues = [...oracleMapping.matchAll(/"([A-Za-z0-9_-]*WorkOrderAddModal_[A-Za-z0-9_-]+)"/g)].map((match) => match[1]);
assert(mappingValues.length >= 79, "Compiled CSS mapping values are incomplete.");
for (const value of mappingValues) assert(activeCss.includes(`.${value}`), `CSS selector is missing: ${value}`);

const pageSHA256 = T.sha(newPageCode);
const newPage = activePage.replace(/mainSearch-[^.]+\.js$/, `mainSearch-${pageSHA256.slice(0, 16)}.js`);
assert.notEqual(newPage, activePage);
assert(!fs.existsSync(path.join(active, newPage)), "The candidate page path already exists in ACTIVE.");
const oldBuildId = T.read(path.join(active, "BUILD_ID")).trim();
const newBuildId = `wo-three-choice-${pageSHA256.slice(0, 16)}`;
const changes = new Map();
const setChange = (relative, value) => changes.set(relative, Buffer.from(value));
setChange(`.next/${newPage}`, newPageCode);
const substitutions = [[path.basename(activePage), path.basename(newPage)], [oldBuildId, newBuildId]];
const metadataChanges = [];
for (const file of T.walk(active)) {
  if (!/\.(?:js|json|html)$/.test(file) || file.startsWith(path.join(active, "static") + path.sep)) continue;
  const relative = T.slash(path.relative(source, file));
  const original = T.read(file);
  let updated = original;
  for (const [before, after] of substitutions) updated = updated.split(before).join(after);
  if (updated === original) continue;
  let reversed = updated;
  for (const [before, after] of [...substitutions].reverse()) reversed = reversed.split(after).join(before);
  assert.equal(reversed, original, `Irreversible metadata substitution: ${relative}`);
  setChange(relative, updated);
  metadataChanges.push(relative);
}
setChange(".next/BUILD_ID", newBuildId);
metadataChanges.push(".next/BUILD_ID");
const oldBuildStatic = path.join(active, "static", oldBuildId);
for (const file of T.walk(oldBuildStatic)) {
  let value = T.read(file);
  for (const [before, after] of substitutions) value = value.split(before).join(after);
  setChange(`.next/static/${newBuildId}/${T.slash(path.relative(oldBuildStatic, file))}`, value);
}

fs.cpSync(source, out, { recursive: true });
for (const [relative, bytes] of changes) {
  const target = path.join(out, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, bytes);
}

const oldFiles = new Set(T.walk(source).map((file) => T.slash(path.relative(source, file))));
const newFiles = new Set(T.walk(out).map((file) => T.slash(path.relative(out, file))));
assert([...oldFiles].every((relative) => newFiles.has(relative)), "A baseline file was deleted.");
for (const relative of oldFiles) {
  if (changes.has(relative)) continue;
  assert.equal(T.sha(fs.readFileSync(path.join(out, relative))), T.sha(fs.readFileSync(path.join(source, relative))), `Unrelated file changed: ${relative}`);
}
for (const relative of changes.keys()) {
  if (relative.startsWith(".next/server/pages/api/") || relative.startsWith(".next/server/chunks/") || relative.startsWith("work-order-link/")) {
    assert.fail(`Backend or linkage runtime changed: ${relative}`);
  }
}
const candidateManifest = JSON.parse(T.read(path.join(out, ".next", "build-manifest.json")));
assert(candidateManifest.pages["/NewSearch/mainSearch"].includes(newPage));
assert(!candidateManifest.pages["/NewSearch/mainSearch"].includes(activePage));
assert(candidateManifest.pages["/NewSearch/mainSearch"].includes(analysis.active.css.path));

const calendarRelative = ".next/server/pages/api/ops/calendar.js";
assert.equal(T.sha(fs.readFileSync(path.join(out, calendarRelative))), "e3fe36d124b4d587bce50d6412f57c14f30ab215e1b02ec46e7f584679f355d6");
const linkHealthRelative = "work-order-link/lib/ops/workOrderLinkHealth.cjs";
assert.equal(T.sha(fs.readFileSync(path.join(out, linkHealthRelative))), "7584758c729e51b9d24b3b10d69089798d5609406e4ad60136b037dbc0c0af95");
const active78806 = T.index(path.join(source, ".next", "server")).get(78806) || [];
const candidate78806 = T.index(path.join(out, ".next", "server")).get(78806) || [];
assert(active78806.length && candidate78806.length);
const module78806Hashes = [...new Set(active78806.map((copy) => T.sha(copy.source)))];
assert.equal(module78806Hashes.length, 1);
assert.deepEqual(candidate78806.map((copy) => T.sha(copy.source)), active78806.map((copy) => T.sha(copy.source)));

const forbiddenNames = [...newFiles].filter((relative) => /(^|\/)(?:\.env(?:\.|$)|.*(?:service[-_]?account|firebase-adminsdk|credentials?\.(?:json|pem|key)).*)(?:$|\/)/i.test(relative));
assert.deepEqual(forbiddenNames, []);
loadEnvConfig(root, false, { info() {}, error() {} });
const sensitive = Object.entries(process.env).filter(([key, value]) =>
  !key.startsWith("NEXT_PUBLIC_") && /(?:TOKEN|SECRET|PASSWORD|PRIVATE|API_KEY|CLIENT_EMAIL|SERVICE_ACCOUNT)/i.test(key) && typeof value === "string" && value.length >= 8
);
const changedBytes = Buffer.concat([...changes.values()]);
const embeddedSensitiveNames = sensitive.filter(([, value]) => changedBytes.includes(Buffer.from(value))).map(([key]) => key);
assert.deepEqual(embeddedSensitiveNames, []);
const buildWorkspaceLeaks = ["build-workspace", ".next-oracle", "work-order-save-slack-confirmation-20260929"]
  .filter((value) => changedBytes.includes(Buffer.from(value)));
assert.deepEqual(buildWorkspaceLeaks, []);

const inventory = [...newFiles].sort().map((relative) => ({
  path: relative,
  sha256: T.sha(fs.readFileSync(path.join(out, relative))),
  bytes: fs.statSync(path.join(out, relative)).size,
}));
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
  pageSHA256,
  activeCss: analysis.active.css.path,
  newCss: analysis.active.css.path,
  cssByteIdenticalToOracle: true,
  changedFactoryIds,
  componentFactory: { id: 60992, before: T.sha(activeFactory), after: T.sha(newFactory), modalStatementIndex: activeModalIndex, hostBytesOutsideModalPreserved: true },
  cssMappingFactory: { id: 21704, before: T.sha(T.getFactory(activePageCode, 21704)), after: T.sha(oracleMapping), selectorCount: mappingValues.length },
  privateItemStatusFactoriesPreserved: [98092901, 98092902],
  criticalBackend: { calendarSHA256: T.sha(fs.readFileSync(path.join(out, calendarRelative))), linkHealthSHA256: T.sha(fs.readFileSync(path.join(out, linkHealthRelative))), module78806SHA256: module78806Hashes[0] },
  added: [...newFiles].filter((relative) => !oldFiles.has(relative)).sort(),
  modified: [...oldFiles].filter((relative) => changes.has(relative)).sort(),
  metadataChanges: metadataChanges.sort(),
  substitutions,
  noDeletedFiles: true,
  unrelatedFilesPreserved: true,
  allBackendExecutableFilesPreserved: true,
  allLinkageFilesPreserved: true,
  immutableOldStaticFilesPreserved: [...oldFiles].filter((file) => file.startsWith(".next/static/")).length,
  runtimeConfigChanged: false,
  forbiddenNames,
  embeddedSensitiveNames,
  buildWorkspaceLeaks,
  files: inventory.length,
};
fs.writeFileSync(path.join(here, "candidate-files.json"), `${JSON.stringify(inventory, null, 2)}\n`, { flag: "wx" });
fs.writeFileSync(path.join(here, "composition-report.json"), `${JSON.stringify(report, null, 2)}\n`, { flag: "wx" });
console.log(JSON.stringify(report, null, 2));
