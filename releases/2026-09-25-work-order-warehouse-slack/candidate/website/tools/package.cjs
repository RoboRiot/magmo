"use strict";

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");

const here = __dirname;
const root = path.resolve(here, "../../..");
const candidate = path.join(here, "scoped-source");
const artifact = path.join(here, "artifact.zip");
const check = path.join(here, "artifact-check");
const report = JSON.parse(fs.readFileSync(path.join(here, "composition-report.json"), "utf8"));
const compiled = JSON.parse(fs.readFileSync(path.join(here, "compiled-verification.json"), "utf8"));
const ui = JSON.parse(fs.readFileSync(path.join(here, "compiled-ui-verification.json"), "utf8"));
const uiScope = JSON.parse(fs.readFileSync(path.join(here, "compiled-ui-scope-verification.json"), "utf8"));
const rootReview = JSON.parse(fs.readFileSync(path.join(root, "tmp/warehouse-slack-artifact-independent-verification-20260925.json"), "utf8"));
const backendReview = JSON.parse(fs.readFileSync(path.join(here, "independent-backend-review.json"), "utf8"));
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
  entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
const relative = (base, filename) => path.relative(base, filename).replaceAll("\\", "/");

assert.equal(path.resolve(check), path.join(here, "artifact-check"));
assert(fs.existsSync(artifact), "The immutable reviewed artifact must already exist; packaging never overwrites it.");
assert.equal(sha256(fs.readFileSync(path.join(here, "composition-report.json"))), compiled.compositionReportSHA256);
assert.equal(rootReview.compositionReportSHA256, compiled.compositionReportSHA256);
assert.equal(rootReview.result, "PASS");
assert.equal(rootReview.deletedFiles, 0);
assert.equal(rootReview.immutableOldAssetsPreserved, 127);
assert.equal(backendReview.result, "PASS");
assert.equal(backendReview.compositionReportSHA256, compiled.compositionReportSHA256);
assert.equal(backendReview.tests.passed, 21);
assert.equal(backendReview.tests.failed, 0);
assert.equal(ui.result, "PASS");
assert.equal(ui.productionNetworkRequests, 0);
assert.equal(ui.liveInventoryWrites, 0);
assert.equal(ui.liveSlackPosts, 0);
assert.equal(ui.candidatePage.sha256, rootReview.pageSHA256);
assert.equal(ui.candidateCss.sha256, rootReview.cssSHA256);
assert.equal(uiScope.status, "PASS");
assert.equal(uiScope.productionWrites, false);
assert.equal(uiScope.compositionReportSHA256, compiled.compositionReportSHA256);
assert.equal(uiScope.unchangedHostProof.structurallyEquivalentPrefixStatementCount, 75);
assert.equal(uiScope.unchangedHostProof.structurallyEquivalentSuffixStatementCount, 18);
assert.equal(uiScope.unchangedHostProof.defaultExport.identifierOccurrences, 2514);
assert.equal(uiScope.unchangedHostProof.onlyChangedRegionBindingUsedByHost, "WorkOrderAddModal");
assert.equal(uiScope.intendedRegionProof.SlackEndpointOutsideIntendedRegion, false);
assert.equal(
  sha256(fs.readFileSync(path.join(here, "test-compiled-ui.cjs"))),
  "8ceefd5c6ee14876d3a42084e19fcbc1a42f07d9e6ec9beb8bb2ca838b13a4bc"
);
assert.equal(
  sha256(fs.readFileSync(path.join(here, "test-compiled-ui-scope.cjs"))),
  "24572c27e3753b75dad533adc18996354a1896229205bca84da5f71d11122e9a"
);

const testFiles = [
  "verify-artifact.test.cjs",
  "test-compiled-sender.test.cjs",
  "test-options-cold-load.test.cjs",
].map((name) => path.join(here, name));
const output = execFileSync(process.execPath, ["--test", ...testFiles], {
  cwd: root,
  encoding: "utf8",
  maxBuffer: 32 * 1024 * 1024,
  env: { ...process.env },
});
assert.match(output, /# fail 0(?:\r?\n|$)/);
const testCount = Number(output.match(/# pass (\d+)/)?.[1] || 0);
assert.equal(testCount, 21);

const page = path.join(candidate, ".next", report.newPage);
const css = path.join(candidate, ".next", report.newCss);
assert.equal(sha256(fs.readFileSync(page)), rootReview.pageSHA256);
assert.equal(sha256(fs.readFileSync(css)), rootReview.cssSHA256);
assert.equal(sha256(fs.readFileSync(path.join(here, "source.zip"))), report.baselineArchiveSHA256);
for (const [sourcePath, expected] of Object.entries(report.frozenInputs)) {
  assert.equal(sha256(fs.readFileSync(path.join(root, sourcePath))), expected, sourcePath);
}

if (fs.existsSync(check)) fs.rmSync(check, { recursive: true, force: true });
fs.mkdirSync(check);
try {
  execFileSync("tar", ["-xf", artifact, "-C", check], { stdio: "pipe" });
  const candidateFiles = walk(candidate);
  const extractedFiles = walk(check);
  assert.equal(candidateFiles.length, 490);
  assert.equal(extractedFiles.length, candidateFiles.length);
  for (const filename of candidateFiles) {
    const name = relative(candidate, filename);
    const extracted = path.join(check, name);
    assert(fs.existsSync(extracted), name);
    assert.equal(sha256(fs.readFileSync(extracted)), sha256(fs.readFileSync(filename)), name);
  }
  const gates = {
    ok: true,
    rootReviewed: process.argv.includes("--root-reviewed"),
    exactArtifactTestsPassed: true,
    exactArtifactTestCount: testCount,
    compiledUiPassed: true,
    compiledUiScopePassed: true,
    independentBackendReviewPassed: true,
    rootIndependentByteVerificationPassed: true,
    zipEntriesVerified: candidateFiles.length,
    packagedAt: new Date().toISOString(),
    artifactSHA256: sha256(fs.readFileSync(artifact)),
    compositionReportSHA256: compiled.compositionReportSHA256,
    baselineRevision: report.baselineRevision,
    baselineUpdateTime: report.baselineUpdateTime,
    baselineArchiveSHA256: report.baselineArchiveSHA256,
    baselineConfigSHA256: report.baselineConfigSHA256,
    candidateBuildId: report.newBuildId,
    sourceOnly: true,
  };
  fs.writeFileSync(path.join(here, "package-gates.json"), JSON.stringify(gates, null, 2) + "\n");
  process.stdout.write(JSON.stringify(gates, null, 2) + "\n");
} finally {
  if (fs.existsSync(check)) fs.rmSync(check, { recursive: true, force: true });
}
