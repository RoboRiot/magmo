"use strict";
// Exact, allowlisted ZIP creation; never overwrites a candidate ZIP. Packaging
// requires both independent artifact evidence and root's byte-review receipt.
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), assert = require("node:assert/strict"), { execFileSync } = require("node:child_process");
const here = __dirname, root = path.resolve(here, "../../.."), candidate = path.join(here, "scoped-source"), artifact = path.join(here, "artifact.zip");
const file = (name) => path.join(here, name), read = (name) => JSON.parse(fs.readFileSync(file(name), "utf8")), sha256 = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const report = read("composition-report.json"), reportHash = sha256(fs.readFileSync(file("composition-report.json"))), frozen = read("frozen-inputs.json");
const receipts = ["compiled-verification.json", "compiled-ui-verification.json", "compiled-ui-scope-verification.json", "source-verification.json", "independent-artifact-review.json", "root-independent-verification.json"];
for (const name of receipts) {
  const receipt = read(name); assert.equal(receipt.result || receipt.status, "PASS", name);
  if (name !== "source-verification.json") assert.equal(receipt.compositionReportSHA256, reportHash, name);
}
const compiled = read("compiled-verification.json"), ui = read("compiled-ui-verification.json"), uiScope = read("compiled-ui-scope-verification.json"), rootReview = read("root-independent-verification.json");
assert.equal(compiled.tests.passed, 38); assert.equal(compiled.tests.failed, 0);
assert.equal(ui.productionNetworkRequests, 0); assert.equal(ui.liveInventoryWrites, 0); assert.equal(ui.liveSlackPosts, 0);
assert.equal(ui.candidatePage.sha256, report.pageSHA256); assert.equal(ui.candidateCss.unchangedFromBaseline, true);
assert.equal(uiScope.productionWrites, false); assert.equal(uiScope.unchangedHostProof.structurallyEquivalentPrefixStatementCount, 75); assert.equal(uiScope.unchangedHostProof.structurallyEquivalentSuffixStatementCount, 18);
assert.equal(rootReview.deletedFiles, 0); assert.equal(rootReview.immutableOldAssetsPreserved, 139);
for (const [relative, expected] of Object.entries({ ...frozen.inputs, ...frozen.controls, ...frozen.dependencies, ...frozen.compilerInputs, ...compiled.testHashes })) assert.equal(sha256(fs.readFileSync(path.join(root, relative))), expected, `Frozen input/test drifted: ${relative}`);
assert.equal(sha256(fs.readFileSync(file("source.zip"))), report.baselineArchiveSHA256);
assert.equal(report.noDeletedFiles, true); assert.equal(report.unrelatedFilesPreserved, true); assert.equal(report.runtimeConfigChanged, false);
const inventory = read("candidate-files.json"); assert.equal(inventory.length, 507);
const walk = (folder) => fs.readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
  const target = path.join(folder, entry.name); assert(!fs.lstatSync(target).isSymbolicLink(), "Symlink not allowed in release."); return entry.isDirectory() ? walk(target) : [target];
});
const files = walk(candidate).map((name) => path.relative(candidate, name).replaceAll("\\", "/")).sort();
assert.deepEqual(files, inventory.map((entry) => entry.path).sort());
for (const entry of inventory) assert.equal(sha256(fs.readFileSync(path.join(candidate, entry.path))), entry.sha256, entry.path);
assert(!fs.existsSync(artifact), "Preserve existing immutable ZIP; verify it separately.");
execFileSync("tar", ["-a", "-cf", artifact, "-C", candidate, "."], { stdio: "pipe" });
const listed = execFileSync("tar", ["-tf", artifact], { encoding: "utf8" }).trim().split(/\r?\n/).filter((entry) => !entry.endsWith("/"));
const names = listed.map((entry) => entry.replace(/^\.\//, ""));
assert.equal(new Set(names).size, names.length); assert.deepEqual(names.sort(), files);
assert(names.every((name) => !path.isAbsolute(name) && !name.split("/").includes("..")));
const check = fs.mkdtempSync(path.join(here, "zip-verification-"));
execFileSync("tar", ["-xf", artifact, "-C", check], { stdio: "pipe" });
const extracted = walk(check).map((name) => path.relative(check, name).replaceAll("\\", "/")).sort(); assert.deepEqual(extracted, files);
for (const entry of inventory) assert.equal(sha256(fs.readFileSync(path.join(check, entry.path))), entry.sha256, `ZIP entry mismatch: ${entry.path}`);
const gates = { result: "PASS", packagedAt: new Date().toISOString(), artifactSHA256: sha256(fs.readFileSync(artifact)), artifactBytes: fs.statSync(artifact).size, compositionReportSHA256: reportHash, baselineRevision: report.baselineRevision, baselineArchiveSHA256: report.baselineArchiveSHA256, candidateBuildId: report.newBuildId, noDeletedFiles: true, unchangedFilesVerified: true, compiledTestsPassed: true, compiledTestCount: compiled.tests.passed, compiledUiPassed: true, compiledUiScopePassed: true, independentReviewPassed: true, zipEntriesVerified: files.length, sourceOnly: true, receiptHashes: Object.fromEntries(receipts.map((name) => [name, sha256(fs.readFileSync(file(name)))])), frozenInputsSHA256: sha256(fs.readFileSync(file("frozen-inputs.json"))), candidateInventorySHA256: sha256(fs.readFileSync(file("candidate-files.json"))) };
fs.writeFileSync(file("package-gates.json"), JSON.stringify(gates, null, 2) + "\n", { flag: "wx" }); console.log(JSON.stringify(gates, null, 2));
