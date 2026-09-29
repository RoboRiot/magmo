"use strict";
// Local mechanical snapshots only. No commits, pushes, credentials, or network.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const record = path.resolve(__dirname, "..");
const worktree = path.resolve(record, "../..");
const workspace = path.resolve(worktree, "../..");
const deployment = path.join(workspace, "tmp/work-order-save-slack-confirmation-20260929/deployment");
const expectedBranch = "codex/work-order-three-choice-confirmation-20260929";
const previousGitRecord = "ad75566457ffd0392cb2c7cefa9c776ff1a8b647";
const hash = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
assert.equal(path.basename(record), "2026-09-29-work-order-three-choice-confirmation");
assert.equal(execFileSync("git", ["branch", "--show-current"], { cwd: worktree, encoding: "utf8" }).trim(), expectedBranch);
const baseline = readJson(path.join(deployment, "baseline.json"));
const frozen = readJson(path.join(deployment, "frozen-inputs.json"));
assert.equal(baseline.revision, "nextserverwest-00070-liw");
assert.equal(baseline.archiveSHA256, "e4201b19e44328e633c7f0c11f5bba377c5488a3d4ef57f881d921bdd843329e");
assert.equal(frozen.baselineArchiveSHA256, baseline.archiveSHA256);

function copy(source, relative) {
  const absoluteSource = path.resolve(source);
  const target = path.resolve(record, relative);
  assert(absoluteSource.startsWith(workspace + path.sep));
  assert(target.startsWith(record + path.sep));
  assert(!/\.(?:zip|log|pem|key)$/i.test(relative));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(absoluteSource, target);
  assert.equal(hash(fs.readFileSync(absoluteSource)), hash(fs.readFileSync(target)));
}

const sourcePaths = [
  "components/WorkOrderAddModal.js",
  "components/WorkOrderAddModal.module.css",
  "lib/inventory/workOrderAddUiContract.js",
];
for (const relative of sourcePaths) {
  const source = path.join(workspace, relative);
  assert.equal(hash(fs.readFileSync(source)), frozen.hashes[relative], `Source changed since freeze: ${relative}`);
  copy(source, `candidate/website/source/${relative}`);
}
const testPaths = [
  "test/work-order-add-ui-contract.test.cjs",
  "test/work-order-add-slack-ui.browser.test.cjs",
  "test/work-order-add-compiled-ui.browser.test.cjs",
  "test/fast-scan-drain-ui.test.cjs",
  "test/helpers/work-order-add-decision-scenarios.cjs",
];
for (const relative of testPaths) copy(path.join(workspace, relative), `candidate/website/${relative}`);
for (const relative of ["docs/work-order-warehouse-slack.md", "docs/work-order-slack-thread-links.md"]) {
  copy(path.join(workspace, relative), `candidate/${relative}`);
}
const receiptNames = [
  "baseline.json", "baseline-files.json", "scope.json", "frozen-inputs.json", "topology.json",
  "isolated-build-inputs.json", "oracle-analysis.json", "ui-region-topology.json", "candidate-files.json",
  "source-verification.json", "composition-report.json", "compiled-ui-verification-v3.json",
  "independent-composition-review.json", "package-gates.json",
  "root-approval.json", "deployment-receipt.json", "live-verification.json",
  "rollback-preflight.json",
];
const pendingReceipts = [];
for (const name of receiptNames) {
  const source = path.join(deployment, name);
  if (fs.existsSync(source)) copy(source, `candidate/website/receipts/${name}`);
  else pendingReceipts.push(name);
}
const toolNames = [
  "inspect-current.cjs", "snapshot.cjs", "analyze-baseline.cjs", "freeze-inputs.cjs",
  "prepare-isolated-build.cjs", "run-compiler.cjs", "analyze-oracle.cjs", "cloud-common.cjs",
  "inspect-ui-region.cjs", "map-oracle-dependencies.cjs", "run-compiled-ui-tests.cjs",
  "compose.cjs", "package.cjs", "deploy.cjs", "rollback.cjs", "verify-live.cjs",
  "record-rollback-preflight.cjs",
  "test-compiled-ui.cjs", "test-compiled-ui-scope.cjs", "run-compiled-tests.cjs",
  "test-compiled-backend.test.cjs", "independent-artifact-audit.cjs",
];
for (const name of toolNames) {
  const source = path.join(deployment, name);
  if (fs.existsSync(source)) copy(source, `candidate/website/tools/${name}`);
}
const files = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    assert(!entry.isSymbolicLink(), "Symlinks are not accepted in the release record");
    if (entry.isDirectory()) walk(absolute);
    else {
      const relative = path.relative(record, absolute).replace(/\\/g, "/");
      if (relative === "candidate-manifest.json") continue;
      const bytes = fs.readFileSync(absolute);
      files.push({ path: relative, bytes: bytes.length, sha256: hash(bytes) });
    }
  }
}
walk(record);
files.sort((a, b) => a.path.localeCompare(b.path));
const deploymentReceipt = path.join(deployment, "deployment-receipt.json");
const productionDeploymentState = fs.existsSync(deploymentReceipt) ? readJson(deploymentReceipt).state : "NOT_SUBMITTED";
const manifest = {
  refreshedAt: new Date().toISOString(), state: productionDeploymentState === "ACTIVE" ? "deployed_pending_git_publication_review" : "prepared_pending_final_release_review",
  previousGitRecord, productionDeploymentState,
  baselineRevision: baseline.revision, baselineGeneration: baseline.source.storageSource.generation,
  baselineArchiveSHA256: baseline.archiveSHA256, baselineConfigSHA256: baseline.configHash,
  scope: "Two changed UI source snapshots, unchanged UI contract control, focused tests, docs, tools, and sanitized receipts. Not a complete rebuild or rollback archive.",
  sourcePaths, testPaths, pendingReceipts, files,
};
fs.writeFileSync(path.join(record, "candidate-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(JSON.stringify({ result: "PREPARED", files: files.length + 1, pendingReceipts, productionDeploymentState,
  manifestSHA256: hash(fs.readFileSync(path.join(record, "candidate-manifest.json"))),
  databaseWrites: 0, slackPosts: 0, gitCommits: 0, gitPushes: 0 }, null, 2));
