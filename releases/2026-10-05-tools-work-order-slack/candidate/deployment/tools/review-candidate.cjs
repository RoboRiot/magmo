"use strict";
// Independent, read-only release review. Output is local evidence only.
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const parser = require("@babel/parser");
const T = require("../../ais-duplicate-fix-20260930/deployment/factory-utils.cjs");
const here = __dirname, root = path.resolve(here, "../../..");
const baselineDir = path.join(here, "source"), candidateDir = path.join(here, "scoped-source");
const readJson = name => JSON.parse(T.read(path.join(here, name)));
const hashFile = file => T.sha(fs.readFileSync(file));
const receipt = name => ({ path: name, sha256: hashFile(path.join(here, name)) });
const composition = readJson("composition-report.json"), baseline = readJson("baseline.json");
const modal = readJson("modal-overlay-report.json"), tool = readJson("tool-page-overlay-report.json");
const server = readJson("server-overlay-report-v2.json"), packaged = readJson("package-verification.json");
const checks = [];
function check(name, run) { run(); checks.push(name); }
const fileMap = directory => new Map(T.walk(directory).map(file => [T.slash(path.relative(directory, file)), hashFile(file)]));
const before = fileMap(baselineDir), after = fileMap(candidateDir);
const added = [...after.keys()].filter(file => !before.has(file)).sort();
const modified = [...before.keys()].filter(file => after.get(file) !== before.get(file)).sort();
const expectedAdded = [".next/server/pages/api/print/tool-label.js", ".next/" + modal.newPage,
  ".next/" + tool.newPage, `.next/static/${composition.buildId}/_buildManifest.js`,
  `.next/static/${composition.buildId}/_ssgManifest.js`].sort();
check("Exact candidate file inventory; no deletion or unapproved new executable", () => {
  assert.equal(after.size, 563); assert.equal(modified.length, 63); assert.equal(added.length, 5);
  assert.deepEqual(added, expectedAdded); assert.deepEqual(added, composition.added);
  assert.deepEqual(modified, composition.modified); assert([...before.keys()].every(file => after.has(file)));
  for (const f of readJson("baseline-files.json")) assert.equal(before.get(f.path), f.sha256, f.path);
  for (const f of readJson("candidate-files.json")) assert.equal(after.get(f.path), f.sha256, f.path);
  assert.equal(hashFile(path.join(here, "source.zip")), baseline.archiveSHA256);
});
check("All existing browser assets, runtime configuration, dependencies and non-Next files preserved", () => {
  for (const [file, hash] of before) {
    if (!file.startsWith(".next/") || file.startsWith(".next/static/")) assert.equal(after.get(file), hash, file);
  }
});
check("Other changed existing files are reversible build/asset references only", () => {
  const executable = new Set([".next/server/chunks/93100.js", ".next/server/chunks/1572.js"]);
  for (const file of modified) {
    if (executable.has(file)) continue;
    if (file === ".next/BUILD_ID") { assert.equal(T.read(path.join(candidateDir, file)), composition.buildId); continue; }
    if (file === ".next/server/pages-manifest.json") {
      const old = JSON.parse(T.read(path.join(baselineDir, file))), current = JSON.parse(T.read(path.join(candidateDir, file)));
      assert.equal(current["/api/print/tool-label"], "pages/api/print/tool-label.js");
      delete current["/api/print/tool-label"]; assert.deepEqual(current, old); continue;
    }
    assert(/\.(?:json|html|js)$/.test(file), file);
    let reverted = T.read(path.join(candidateDir, file));
    for (const [oldValue, newValue] of [...composition.substitutions].reverse()) reverted = reverted.split(newValue).join(oldValue);
    assert.equal(reverted, T.read(path.join(baselineDir, file)), file);
  }
});
const factoryMap = text => new Map(T.factories(text).map(f => [f.id, f.source]));
check("Main search modal changes only statements 77, 80, 81; all other factories and imports byte-preserved", () => {
  const oldPage = T.read(path.join(baselineDir, ".next", modal.oldPage));
  const newPage = T.read(path.join(candidateDir, ".next", modal.newPage));
  const oldMap = factoryMap(oldPage), newMap = factoryMap(newPage);
  assert.deepEqual([...oldMap.keys()].sort(), [...newMap.keys()].sort());
  for (const [id, source] of oldMap) if (id !== 60992) assert.equal(newMap.get(id), source);
  const old = oldMap.get(60992), current = newMap.get(60992);
  assert.equal(T.sha(old), modal.beforeSHA256); assert.equal(T.sha(current), modal.afterSHA256);
  assert.equal(T.sha(newPage), modal.pageSHA256);
  let inverse = current;
  for (const edit of [...modal.editPairs].reverse()) inverse = T.replaceOnce(inverse, edit.after, edit.before);
  assert.equal(inverse, old);
  const statements = source => { const ast = parser.parse("(" + source + ")");
    return ast.program.body[0].expression.body.body.map(s => source.slice(s.start - 1, s.end - 1)); };
  const bs = statements(old), as = statements(current);
  assert.equal(as.length, bs.length);
  assert.deepEqual(bs.flatMap((s, i) => s === as[i] ? [] : [i]), [77, 80, 81]);
  assert.deepEqual([...T.requiredIds(current)].sort(), [...T.requiredIds(old)].sort());
});
check("Tool page changes only its page factory and isolated dependency-free helper; dependency closure preserved", () => {
  const oldPage = T.read(path.join(baselineDir, ".next", tool.oldPage));
  const newPage = T.read(path.join(candidateDir, ".next", tool.newPage));
  assert.equal(T.sha(oldPage), tool.oldPageSHA256); assert.equal(T.sha(newPage), tool.newPageSHA256);
  const oldMap = factoryMap(oldPage), newMap = factoryMap(newPage);
  assert.deepEqual([...newMap.keys()].filter(id => !oldMap.has(id)), [98100520]);
  for (const [id, source] of oldMap) if (id !== 53915) assert.equal(newMap.get(id), source);
  assert.equal(T.sha(newMap.get(53915)), tool.newFactorySHA256);
  assert.equal(T.sha(newMap.get(98100520)), tool.helperSHA256);
  assert.equal(T.requiredIds(newMap.get(98100520)).size, 0);
  const graph = T.graph(path.join(candidateDir, ".next"), tool.route);
  for (const id of [53915, 98100520]) for (const dependency of T.requiredIds(graph.get(id))) assert(graph.has(dependency));
  const frozen = new Map(readJson("compiler-inputs-v1.json").inputs.map(f => [f.path, f.sha256]));
  for (const [file, hash] of Object.entries(tool.sourceHashes)) assert.equal(frozen.get(file), hash, file);
});
check("Server executable overlays alter only enumerated factories, preserve loader chunks and copied history/crypto", () => {
  for (const f of server.files.filter(f => f.path.endsWith(".js") && f.beforeSHA256)) {
    const oldCode = T.read(path.join(baselineDir, f.path)), newCode = T.read(path.join(candidateDir, f.path));
    assert.equal(T.sha(oldCode), f.beforeSHA256); assert.equal(T.sha(newCode), f.afterSHA256);
    const oldMap = factoryMap(oldCode), newMap = factoryMap(newCode);
    assert.deepEqual([...newMap.keys()].filter(id => !oldMap.has(id)).sort(), [...f.addedFactoryIds].sort());
    assert.deepEqual([...oldMap.keys()].filter(id => oldMap.get(id) !== newMap.get(id)).sort(), [...f.changedFactoryIds].sort());
    assert([...oldMap.keys()].every(id => newMap.has(id)));
    assert.deepEqual(T.loaderChunks(newCode), T.loaderChunks(oldCode));
  }
  const baselineCommon = factoryMap(T.read(path.join(baselineDir, ".next/server/chunks/93100.js")));
  for (const file of ["93100.js", "1572.js"]) {
    const current = factoryMap(T.read(path.join(candidateDir, ".next/server/chunks", file)));
    assert.equal(current.get(94500010), baselineCommon.get(93100050));
    assert.equal(current.get(94500011), baselineCommon.get(93100051));
  }
  const current = factoryMap(T.read(path.join(candidateDir, ".next/server/chunks/93100.js")));
  assert(current.get(93100031).includes('require(process.cwd()+"/machine-link/workOrderMachineLink.cjs")'));
  const frozen = new Map(readJson("compiler-inputs-v2.json").inputs.map(f => [f.path, f.sha256]));
  for (const [file, hash] of Object.entries(server.sourceHashes)) assert.equal(frozen.get(file), hash, file);
});
const compiled = readJson("compiled-services-verification.json");
const modalTest = readJson("compiled-modal-verification.json"), toolTest = readJson("compiled-tool-page-verification.json");
const printTest = readJson("compiled-tool-label-api-verification.json");
check("125 exact compiled service tests and associated inputs bind to candidate bytes", () => {
  assert.equal(compiled.result, "PASS"); assert.equal(compiled.passed, 125); assert.equal(compiled.failed, 0); assert.equal(compiled.skipped, 0);
  assert.equal(compiled.actualCandidateFactories, true); assert.equal(compiled.candidateDirectory, "scoped-source");
  assert.equal(compiled.overlayReportSHA256, hashFile(path.join(here, "server-overlay-report-v2.json")));
  for (const f of compiled.overlayFiles.filter(f => f.path.endsWith(".js"))) assert.equal(after.get(f.path), f.sha256);
  for (const f of compiled.tests) assert.equal(hashFile(path.join(root, f.path)), f.sha256);
  assert.equal(hashFile(path.join(here, "compiled-server-loader.cjs")), compiled.loaderSHA256);
  assert.equal(hashFile(path.join(here, "test-compiled-services.cjs")), compiled.harnessSHA256);
  assert.equal(hashFile(path.join(here, "compiled-services.tap")), compiled.logSHA256);
});
check("Compiled modal, tool-page browser, and label API receipts bind to exact candidate assets", () => {
  for (const report of [modalTest, toolTest]) {
    assert.equal(report.result, "PASS"); assert.equal(report.productionRequests, 0); assert.equal(report.productionWrites, 0);
    assert.equal(after.get(".next/" + report.pageAsset), report.pageSHA256);
    for (const [file, hash] of Object.entries(report.assetHashes)) assert.equal(after.get(".next/" + file), hash, file);
  }
  assert.equal(modalTest.results.length, 13); assert.equal(toolTest.results.length, 6);
  assert.equal(toolTest.errors.length, 0); assert.equal(modalTest.missingCssKeys.length, 0); assert.equal(modalTest.selectorsMissing.length, 0);
  assert.equal(printTest.passed, true); assert.equal(printTest.checks.length, 5);
  assert.equal(after.get(".next/server/pages/api/print/tool-label.js"), printTest.routeSHA256);
  assert.equal(printTest.realPrintJobs, 0); assert.equal(printTest.realDatabaseWrites, 0);
});
check("Final artifact and package evidence match reviewed candidate", () => {
  assert.equal(packaged.result, "PASS"); assert.equal(packaged.extractedBytesMatch, true);
  assert.equal(hashFile(path.join(here, "artifact.zip")), packaged.artifactSHA256);
  assert.equal(hashFile(path.join(here, "composition-report.json")), packaged.compositionReportSHA256);
  assert.equal(hashFile(path.join(here, "candidate-files.json")), packaged.candidateFilesSHA256);
  for (const [file, hash] of Object.entries(composition.frozenHashes)) assert.equal(hashFile(path.join(root, file)), hash, file);
});
const report = {
  result: "PASS", checkedAt: new Date().toISOString(), reviewer: "tool_slack_dedupe",
  baselineRevision: baseline.revision, baselineArchiveSHA256: baseline.archiveSHA256,
  buildId: composition.buildId, artifactSHA256: packaged.artifactSHA256,
  files: after.size, modified: modified.length, added: added.length, deleted: 0,
  checks, compiledTests: { server: 125, modalBrowser: 13, toolPageBrowser: 6, toolLabelApi: 5 },
  receipts: ["composition-report.json", "candidate-files.json", "package-verification.json",
    "server-overlay-report-v2.json", "modal-overlay-report.json", "tool-page-overlay-report.json",
    "compiled-services-verification.json", "compiled-modal-verification.json", "compiled-tool-page-verification.json",
    "compiled-tool-label-api-verification.json", "rules-verification.json", "tools-slack-readonly-verification.json"].map(receipt),
  reviewScriptSHA256: hashFile(__filename), productionRequests: 0, productionMutations: 0,
  limitations: ["External apps or humans can still race to insert a Slack row; Slack does not expose a unique tool-ID constraint.",
    "No real Slack message, inventory mutation or physical print was generated by this candidate review."]
};
fs.writeFileSync(path.join(here, "independent-review.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ result: report.result, checks: checks.length, compiledTests: report.compiledTests, artifactSHA256: report.artifactSHA256 }));
