"use strict";
// Allowlisted local source/provenance snapshots only; no network or production writes.
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto");
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const record = path.resolve(__dirname, ".."), worktree = path.resolve(record, "../..");
const root = path.resolve(worktree, "../..");
const deployment = path.join(root, "tmp/work-order-slack-preparation-fix-20260930/deployment");
const hash = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const json = file => JSON.parse(fs.readFileSync(file, "utf8"));
const baseline = json(path.join(deployment, "baseline.json"));
const sourcePaths = ["lib/inventory/workOrderAddSlack.cjs"];
const testPaths = ["test/work-order-add-slack.test.cjs", "test/storage-adc-compatibility.test.cjs", "test/firebase-storage-deploy-guard.test.cjs"];
assert.equal(execFileSync("git", ["branch", "--show-current"], { cwd: worktree, encoding: "utf8" }).trim(), "codex/work-order-slack-storage-auth-fix-20260930");
assert.equal(baseline.revision, "nextserverwest-00071-zot");
assert.equal(baseline.archiveSHA256, "cd45fc1b6184406a6e41b9db1989c2b7a5bbbd8c70d544aef3ce05e426060017");
function copy(from, relative) {
  const source = path.resolve(from), target = path.resolve(record, relative);
  assert(source.startsWith(root + path.sep)); assert(target.startsWith(record + path.sep));
  assert(!/\.(?:zip|log|pem|key)$/i.test(relative));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
  assert.equal(hash(fs.readFileSync(source)), hash(fs.readFileSync(target)));
}
for (const relative of sourcePaths) copy(path.join(root, relative), `candidate/source/${relative}`);
assert.equal(hash(fs.readFileSync(path.join(record, "candidate/source/lib/inventory/workOrderAddSlack.cjs"))),
  "d943a2fb7109ae359ae8b4a6f70ac58fd58352aef7f4d154c3d8ab015e985138");
for (const relative of testPaths) copy(path.join(root, relative), `candidate/${relative}`);
copy(path.join(root, "docs/work-order-warehouse-slack.md"), "candidate/docs/work-order-warehouse-slack.md");
for (const name of ["package.json", "package-lock.json"]) {
  copy(path.join(deployment, "scoped-source", name), `candidate/dependencies/production-${name}`);
}
const snippets = {};
for (const [name, directory] of [["root", root], ["functions", path.join(root, "functions")]]) {
  const packageFile = path.join(directory, "package.json"), lockFile = path.join(directory, "package-lock.json");
  snippets[name] = { packageSHA256: hash(fs.readFileSync(packageFile)), lockSHA256: hash(fs.readFileSync(lockFile)),
    overrides: json(packageFile).overrides };
}
fs.writeFileSync(path.join(record, "candidate/dependencies/repository-overrides.json"), JSON.stringify(snippets, null, 2) + "\n");
const receiptNames = ["baseline.json", "baseline-files.json", "candidate-files.json", "composition-report.json",
  "dependency-review.json", "independent-composition-review.json", "guardrails-scope-review.json",
  "compiled-verification.json", "dependency-runtime-verification.json", "deployment-guard-review.json",
  "package-gates.json", "root-approval.json", "deployment-receipt.json", "live-verification.json", "rollback-preflight.json"];
const requiredReceipts = ["baseline.json", "baseline-files.json", "candidate-files.json", "composition-report.json",
  "dependency-review.json", "independent-composition-review.json", "compiled-verification.json", "dependency-runtime-verification.json",
  "package-gates.json", "root-approval.json", "deployment-receipt.json", "live-verification.json", "rollback-preflight.json"];
const missing = [];
for (const name of receiptNames) {
  const file = path.join(deployment, name);
  if (fs.existsSync(file)) copy(file, `candidate/receipts/${name}`);
  else if (requiredReceipts.includes(name)) missing.push(name);
}
for (const name of ["snapshot.cjs", "audit-dependencies.cjs", "compose.cjs", "package.cjs", "deploy.cjs",
  "verify-live.cjs", "rollback.cjs", "record-rollback-preflight.cjs", "cloud-common.cjs",
  "run-verification.cjs", "test-compiled-service.test.cjs"]) {
  const file = path.join(deployment, name);
  if (fs.existsSync(file)) copy(file, `candidate/tools/${name}`);
}
const files = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    assert(!entry.isSymbolicLink());
    if (entry.isDirectory()) walk(file);
    else {
      const relative = path.relative(record, file).replace(/\\/g, "/");
      if (relative === "candidate-manifest.json") continue;
      const bytes = fs.readFileSync(file);
      files.push({ path: relative, bytes: bytes.length, sha256: hash(bytes) });
    }
  }
}
walk(record); files.sort((a, b) => a.path.localeCompare(b.path));
const deploymentFile = path.join(deployment, "deployment-receipt.json");
const deploymentState = fs.existsSync(deploymentFile) ? json(deploymentFile).state : "NOT_SUBMITTED";
const manifest = { refreshedAt: new Date().toISOString(), state: "root_authorized_scoped_publication",
  previousGitRecord: "f5b394d9bea71c09657087d27088c13c43cd31d7", productionDeploymentState: deploymentState,
  baselineRevision: baseline.revision, baselineArchiveSHA256: baseline.archiveSHA256, baselineConfigSHA256: baseline.configHash,
  scope: "Scoped Slack diagnostics, storage dependency compatibility, tests, docs, and sanitized release evidence. Not a full app or rollback archive.",
  sourcePaths, testPaths, verificationCounts: { source: 151, compiled: 44, adcGraphs: 3,
    predeployTotal: 198, additionalDeploymentGuard: 2, uniqueTotal: 200,
    focusedSlackRerunIsSubset: true, repeatedAdcChecksNotAddedAgain: true },
  pendingReceipts: missing, files };
fs.writeFileSync(path.join(record, "candidate-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(JSON.stringify({ result: "PREPARED", files: files.length + 1, productionDeploymentState: deploymentState,
  pendingReceipts: missing, manifestSHA256: hash(fs.readFileSync(path.join(record, "candidate-manifest.json"))),
  databaseWrites: 0, slackPosts: 0, gitCommits: 0, gitPushes: 0 }, null, 2));
