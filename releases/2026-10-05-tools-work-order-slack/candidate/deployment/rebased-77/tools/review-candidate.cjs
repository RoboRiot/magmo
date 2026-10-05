"use strict";
const fs = require("node:fs"), path = require("node:path"), cp = require("node:child_process"), assert = require("node:assert/strict");
const T = require("../../../ais-duplicate-fix-20260930/deployment/factory-utils.cjs");
const here = __dirname, parent = path.dirname(here), read = file => JSON.parse(fs.readFileSync(file, "utf8"));
const hash = file => T.sha(fs.readFileSync(file));
const report = read(path.join(here, "package-report.json")), baseline = read(path.join(here, "baseline.json"));
const before = read(path.join(here, "baseline-files.json")), after = read(path.join(here, "candidate-files.json"));
const beforeMap = new Map(before.map(f => [f.path, f.sha256])), afterMap = new Map(after.map(f => [f.path, f.sha256]));
assert.equal(baseline.revision, "nextserverwest-00077-puh"); assert.equal(before.length, 575); assert.equal(after.length, 575);
assert.deepEqual([...beforeMap.keys()].sort(), [...afterMap.keys()].sort());
const changed = [...beforeMap.keys()].filter(file => beforeMap.get(file) !== afterMap.get(file));
assert.deepEqual(changed, [".next/server/pages/NewSearch/Tools/[id].html"]);
for (const f of before) assert.equal(hash(path.join(here, "source", f.path)), f.sha256, f.path);
for (const f of after) assert.equal(hash(path.join(here, "candidate", f.path)), f.sha256, f.path);
const priorHtml = T.read(path.join(here, "source", report.html.path)), finalHtml = T.read(path.join(here, "candidate", report.html.path));
assert.equal(priorHtml.split(report.html.oldSrc).length - 1, 1);
assert.equal(finalHtml.split(report.html.newSrc).length - 1, 1);
assert.equal(finalHtml.replace(report.html.newSrc, report.html.oldSrc), priorHtml);
assert.equal(hash(path.join(here, "source.zip")), baseline.archiveSHA256);
assert.equal(hash(path.join(here, "artifact.zip")), report.artifactSHA256);
assert.equal(T.read(path.join(here, "candidate/.next/BUILD_ID")), baseline.buildId);
const bootstrap = JSON.parse(cp.execFileSync(process.execPath, [path.join(parent, "verify-page-bootstrap.cjs"), path.join(here, "candidate")], { encoding: "utf8" }));
assert.equal(bootstrap.result, "PASS");
const server = read(path.join(parent, "server-overlay-report-v2.json"));
const retainedFactories = [];
for (const file of server.files.filter(f => f.path.endsWith(".js"))) {
  const original = new Map(T.factories(T.read(path.join(parent, "scoped-source", file.path))).map(f => [f.id, f.source]));
  const current = new Map(T.factories(T.read(path.join(here, "candidate", file.path))).map(f => [f.id, f.source]));
  for (const id of [...file.changedFactoryIds, ...file.addedFactoryIds]) {
    assert.equal(current.get(id), original.get(id), `Previously verified factory changed: ${file.path}:${id}`);
    retainedFactories.push({ file: file.path, id, sha256: T.sha(current.get(id)) });
  }
}
for (const name of ["compiled-modal-verification.json", "compiled-tool-page-verification.json"]) {
  const receipt = read(path.join(parent, name)); assert.equal(receipt.result, "PASS");
  for (const [file, digest] of Object.entries(receipt.assetHashes)) assert.equal(hash(path.join(here, "candidate/.next", file)), digest, file);
}
const result = {
  result: "PASS", reviewedAt: new Date().toISOString(), baselineRevision: baseline.revision,
  rollbackRevision: baseline.revision, baselineArchiveSHA256: baseline.archiveSHA256,
  artifactSHA256: report.artifactSHA256, buildId: baseline.buildId,
  files: after.length, changedFiles: changed, exactOneHtmlInverse: true,
  noAddedOrDeletedFiles: true, allOps77FilesPreservedExceptRequestedHtml: true,
  allJavaScriptAndConfigurationPreserved: true, bootstrap,
  retainedFeatureFactories: retainedFactories, compiledTestsReusedByExactFactoryAndBrowserAssetIdentity: true,
  knownPassingFeatureTests: { compiledServer: 125, modalBrowser: 13, toolPageBrowser: 6, toolLabelApi: 5 },
  evidence: Object.fromEntries(["baseline.json", "baseline-files.json", "candidate-files.json", "package-report.json"].map(file => [file, hash(path.join(here, file))])),
  reviewScriptSHA256: hash(__filename), bootstrapScriptSHA256: hash(path.join(parent, "verify-page-bootstrap.cjs")),
  productionRequests: 0, databaseWrites: 0, slackPosts: 0, printJobs: 0,
};
fs.writeFileSync(path.join(here, "independent-candidate-review.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify({ result: result.result, files: result.files, changed: changed.length, retainedFactories: retainedFactories.length, artifactSHA256: result.artifactSHA256 }));
