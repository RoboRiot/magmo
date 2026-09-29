"use strict";

const fs = require("node:fs");
const path = require("node:path");
const cp = require("node:child_process");
const assert = require("node:assert/strict");
const T = require("../../ot-collapse-20260928/factory-tools.cjs");

const here = __dirname;
const file = (name) => path.join(here, name);
const json = (name) => JSON.parse(fs.readFileSync(file(name), "utf8"));
const reportBytes = fs.readFileSync(file("composition-report.json"));
const reportHash = T.sha(reportBytes);
const report = JSON.parse(reportBytes);
const frozen = json("frozen-inputs.json");
const compiled = json("compiled-ui-verification-v3.json");
const independent = json("independent-composition-review.json");
const candidate = file("scoped-source-v3");
const artifact = file("artifact.zip");

assert(process.argv.includes("--root-reviewed"), "Root review flag is required.");
assert.equal(report.baselineRevision, "nextserverwest-00070-liw");
assert.equal(report.baselineArchiveSHA256, "e4201b19e44328e633c7f0c11f5bba377c5488a3d4ef57f881d921bdd843329e");
assert.equal(T.sha(fs.readFileSync(file("source.zip"))), report.baselineArchiveSHA256);
assert.equal(frozen.baselineArchiveSHA256, report.baselineArchiveSHA256);
assert.equal(compiled.result, "PASS");
assert.equal(compiled.productionRequests, 0);
assert.equal(compiled.productionWrites, 0);
assert.equal(compiled.pageSHA256, report.pageSHA256);
assert.equal(compiled.componentFactorySHA256, report.componentFactory.after);
assert.equal(compiled.cssFactorySHA256, report.cssMappingFactory.after);
assert.deepEqual(compiled.missingCssKeys, []);
assert.deepEqual(compiled.selectorsMissing, []);
assert(compiled.results.length >= 9);
assert.equal(independent.result || independent.status, "PASS");
assert.equal(independent.compositionReportSHA256, reportHash);
assert.equal(independent.candidatePageSHA256 || independent.pageSHA256, report.pageSHA256);
assert.deepEqual(independent.changedFactoryIds, [21704, 60992]);
assert.equal(report.componentFactory.hostBytesOutsideModalPreserved, true);
assert.equal(report.cssByteIdenticalToOracle, true);
assert.deepEqual(report.changedFactoryIds, [21704, 60992]);
assert.deepEqual(report.privateItemStatusFactoriesPreserved, [98092901, 98092902]);
assert.equal(report.noDeletedFiles, true);
assert.equal(report.unrelatedFilesPreserved, true);
assert.equal(report.allBackendExecutableFilesPreserved, true);
assert.equal(report.allLinkageFilesPreserved, true);
assert.equal(report.runtimeConfigChanged, false);
assert.deepEqual(report.forbiddenNames, []);
assert.deepEqual(report.embeddedSensitiveNames, []);
assert.deepEqual(report.buildWorkspaceLeaks, []);

const inventory = json("candidate-files.json");
const files = T.walk(candidate).map((name) => {
  assert(!fs.lstatSync(name).isSymbolicLink());
  return path.relative(candidate, name).replaceAll("\\", "/");
}).sort();
assert.deepEqual(files, inventory.map((entry) => entry.path).sort());
assert.equal(files.length, report.files);
for (const entry of inventory) assert.equal(T.sha(fs.readFileSync(path.join(candidate, entry.path))), entry.sha256, entry.path);
assert(!fs.existsSync(artifact), "Never overwrite the immutable artifact.");
assert(!fs.existsSync(file("package-gates.json")), "Package gates already exist.");
cp.execFileSync("tar", ["-a", "-cf", artifact, "-C", candidate, "."], { stdio: "pipe" });
const names = cp.execFileSync("tar", ["-tf", artifact], { encoding: "utf8" }).trim().split(/\r?\n/)
  .filter((name) => !name.endsWith("/")).map((name) => name.replace(/^\.\//, ""));
assert.equal(new Set(names).size, names.length);
assert.deepEqual(names.sort(), files);
assert(names.every((name) => !path.isAbsolute(name) && !name.split("/").includes("..")));
const verify = fs.mkdtempSync(file("zip-verification-"));
cp.execFileSync("tar", ["-xf", artifact, "-C", verify], { stdio: "pipe" });
for (const entry of inventory) assert.equal(T.sha(fs.readFileSync(path.join(verify, entry.path))), entry.sha256, `ZIP mismatch: ${entry.path}`);

const receipts = ["compiled-ui-verification-v3.json", "independent-composition-review.json"];
const gates = {
  result: "PASS",
  packagedAt: new Date().toISOString(),
  rootReviewed: true,
  artifactSHA256: T.sha(fs.readFileSync(artifact)),
  artifactBytes: fs.statSync(artifact).size,
  compositionReportSHA256: reportHash,
  baselineRevision: report.baselineRevision,
  baselineArchiveSHA256: report.baselineArchiveSHA256,
  candidateBuildId: report.newBuildId,
  candidatePageSHA256: report.pageSHA256,
  changedFactoryIds: report.changedFactoryIds,
  noDeletedFiles: true,
  unchangedFilesVerified: true,
  compiledTestsPassed: true,
  compiledScenarioCount: compiled.results.length,
  independentReviewPassed: true,
  zipEntriesVerified: files.length,
  sourceOnly: true,
  runtimeConfigurationPreserved: true,
  receiptHashes: Object.fromEntries(receipts.map((name) => [name, T.sha(fs.readFileSync(file(name)))])),
  frozenInputsSHA256: T.sha(fs.readFileSync(file("frozen-inputs.json"))),
  candidateInventorySHA256: T.sha(fs.readFileSync(file("candidate-files.json"))),
};
fs.writeFileSync(file("package-gates.json"), `${JSON.stringify(gates, null, 2)}\n`, { flag: "wx" });
console.log(JSON.stringify(gates, null, 2));
