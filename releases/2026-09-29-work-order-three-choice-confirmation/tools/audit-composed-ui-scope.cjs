"use strict";
// Read-only independent verification of the final v3 candidate, not its composer.
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const record = path.resolve(__dirname, ".."), workspace = path.resolve(record, "../../../..");
const parser = require(path.join(workspace, "node_modules/@babel/parser"));
const traverse = require(path.join(workspace, "node_modules/@babel/traverse")).default;
const generate = require(path.join(workspace, "node_modules/@babel/generator")).default;
const T = require(path.join(workspace, "tmp/ot-collapse-20260928/factory-tools.cjs"));
const deployment = path.join(workspace, "tmp/work-order-save-slack-confirmation-20260929/deployment");
const activeRoot = path.join(deployment, "source"), candidateRoot = path.join(deployment, "scoped-source-v3");
const compositionBytes = fs.readFileSync(path.join(deployment, "composition-report.json"));
const composition = JSON.parse(compositionBytes);
const analysis = JSON.parse(fs.readFileSync(path.join(deployment, "oracle-analysis.json"), "utf8"));
function modal(factory) {
  const ast = parser.parse(`(${factory})`);
  let host;
  traverse(ast, { Function(p) { if (!host) { host = p; p.stop(); } } });
  const result = host.get("body.body")[79];
  assert.equal(result.node.type, "FunctionDeclaration");
  assert.equal(result.node.id.name, "tI");
  return { ast, host, path: result, code: generate(result.node, { compact: true, comments: false }).code,
    before: factory.slice(0, result.node.start - 1), after: factory.slice(result.node.end - 1) };
}
const activePage = T.read(path.join(activeRoot, ".next", composition.activePage));
const candidatePage = T.read(path.join(candidateRoot, ".next", composition.newPage));
assert.equal(T.sha(candidatePage), composition.pageSHA256);
const activeFactories = new Map(T.factories(activePage).map((entry) => [entry.id, entry.source]));
const candidateFactories = new Map(T.factories(candidatePage).map((entry) => [entry.id, entry.source]));
assert.deepEqual([...candidateFactories.keys()], [...activeFactories.keys()]);
const changedIds = [...activeFactories].filter(([id, source]) => source !== candidateFactories.get(id)).map(([id]) => id).sort((a, b) => a - b);
assert.deepEqual(changedIds, [21704, 60992]);
const activeModal = modal(activeFactories.get(60992)), candidateModal = modal(candidateFactories.get(60992));
assert.equal(candidateModal.before, activeModal.before);
assert.equal(candidateModal.after, activeModal.after);

const oraclePage = T.read(path.join(deployment, "build-workspace/.next-oracle", analysis.oracle.page));
const oracleModal = modal(T.getFactory(oraclePage, analysis.oracleModuleIds.component));
// Derived independently from helper bodies (see modal-binding-scope.json),
// without relying on declaration positions used by the composer.
const explicitSemanticMap = { tS: "t_", t_: "tS", tj: "tC", tC: "tj" };
const edits = [];
oracleModal.path.traverse({ ReferencedIdentifier(p) {
  const binding = p.scope.getBinding(p.node.name);
  if (binding === oracleModal.host.scope.getBinding(p.node.name) && explicitSemanticMap[p.node.name]) {
    edits.push([p.node, explicitSemanticMap[p.node.name]]);
  }
} });
for (const [node, name] of edits) node.name = name;
assert.equal(candidateModal.code, generate(oracleModal.path.node, { compact: true, comments: false }).code,
  "Composed modal differs from the independently semantically rebased compiler output");
assert.equal(candidateFactories.get(21704), T.getFactory(oraclePage, analysis.oracleModuleIds.cssMapping));
const classNames = [...candidateFactories.get(21704).matchAll(/"(WorkOrderAddModal_[A-Za-z0-9_-]+)"/g)].map((match) => match[1]);
assert(classNames.length >= 79);
const candidateCss = T.read(path.join(candidateRoot, ".next", composition.newCss));
for (const name of classNames) assert(candidateCss.includes(`.${name}`), `Missing CSS selector ${name}`);
assert.deepEqual([...T.requiredIds(candidateFactories.get(60992))].sort((a,b) => a-b), [...T.requiredIds(activeFactories.get(60992))].sort((a,b) => a-b));

const relativeFiles = (root) => T.walk(root).map((file) => T.slash(path.relative(root, file))).sort();
const oldFiles = relativeFiles(activeRoot), newFiles = relativeFiles(candidateRoot);
const newSet = new Set(newFiles), oldSet = new Set(oldFiles);
assert(oldFiles.every((file) => newSet.has(file)), "Baseline file was deleted");
const modified = [], unchanged = [], backendPreserved = [];
for (const relative of oldFiles) {
  const oldBytes = fs.readFileSync(path.join(activeRoot, relative));
  const newBytes = fs.readFileSync(path.join(candidateRoot, relative));
  const identical = oldBytes.equals(newBytes);
  if (/^(?:\.next\/server\/(?:pages\/api\/|chunks\/)|work-order-link\/)/.test(relative)) {
    assert(identical, `Backend executable changed: ${relative}`);
    backendPreserved.push({ path: relative, sha256: T.sha(oldBytes) });
  }
  if (relative.startsWith(".next/static/")) assert(identical, `Existing immutable static asset changed: ${relative}`);
  if (identical) { unchanged.push(relative); continue; }
  modified.push(relative);
  assert(composition.metadataChanges.includes(relative), `Non-metadata baseline file changed: ${relative}`);
  let restored = newBytes.toString("utf8");
  for (const [before, after] of [...composition.substitutions].reverse()) restored = restored.split(after).join(before);
  assert.equal(restored, oldBytes.toString("utf8"), `Nonreversible metadata change: ${relative}`);
}
const added = newFiles.filter((relative) => !oldSet.has(relative));
assert.deepEqual(modified.sort(), [...composition.modified].sort());
assert.deepEqual(added.sort(), [...composition.added].sort());
assert.equal(added.length, 3);
assert(added.includes(`.next/${composition.newPage}`));
assert.equal(fs.readFileSync(path.join(candidateRoot, ".next", composition.newCss)).compare(fs.readFileSync(path.join(activeRoot, ".next", composition.activeCss))), 0);
const output = {
  checkedAt: new Date().toISOString(), result: "PASS", candidateDirectory: "scoped-source-v3",
  compositionSHA256: T.sha(compositionBytes), compositionReportSHA256: T.sha(compositionBytes), baselineRevision: composition.baselineRevision,
  baselineArchiveSHA256: composition.baselineArchiveSHA256, pageSHA256: composition.pageSHA256,
  candidatePageSHA256: composition.pageSHA256, candidateBuildId: composition.newBuildId, baselineFiles: oldFiles.length, candidateFiles: newFiles.length,
  unchangedFiles: unchanged.length, modifiedMetadataFiles: modified.length, addedFiles: added,
  changedPageFactoryIds: changedIds, changedFactoryIds: changedIds, modalStatementIndex: 79,
  modalOnly60992: true, cssMappingComplete: true, cssSelectorCount: classNames.length,
  itemStatusFactoriesPreserved: true, backendExecutableFilesPreserved: true,
  explicitSemanticMap, semanticallyRebasedReferenceCount: edits.length,
  exactOracleModalAfterIndependentRebase: true, hostBytesOutsideModalPreserved: true,
  allOtherPageFactoriesPreserved: true, allExistingStaticAssetsPreserved: true,
  allBackendAndLinkageFilesByteIdentical: true, preservedBackendFileCount: backendPreserved.length,
  preservedBackendInventorySHA256: T.sha(JSON.stringify(backendPreserved)),
  newCssByteIdentical: true, sourceWrites: 0, candidateChanges: 0, productionWrites: 0,
};
const target = path.join(record, "candidate/evidence/independent-composition-review.json");
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, JSON.stringify(output, null, 2) + "\n");
fs.writeFileSync(path.join(deployment, "independent-composition-review.json"), JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify(output, null, 2));
