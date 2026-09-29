"use strict";
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const record = path.resolve(__dirname, "..");
const hash = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const manifest = JSON.parse(fs.readFileSync(path.join(record, "candidate-manifest.json"), "utf8"));
const expected = new Map(manifest.files.map((entry) => [entry.path, entry]));
assert.equal(expected.size, manifest.files.length, "Manifest contains duplicate paths");
const actual = [], forbidden = [];
const secretTests = {
  slackToken: /\bxox[baprs]-[A-Za-z0-9-]{18,}/,
  slackWebhook: /https:\/\/hooks\.slack\.com\/services\/[A-Z0-9]{6,}\/[A-Z0-9]{6,}\/[A-Za-z0-9]{15,}/,
  googleApiKey: /AIza[A-Za-z0-9_-]{30,}/,
  openAiKey: /\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{40,}/,
  privateKey: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----\r?\n[A-Za-z0-9+/=\r\n]{40,}/,
  signedStorageUrl: /https:\/\/(?:storage\.googleapis\.com|firebasestorage\.googleapis\.com)\/[^\s"'<>]+[?&](?:X-Goog-Signature|token)=[A-Za-z0-9%_-]{20,}/,
};
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    const relative = path.relative(record, absolute).replace(/\\/g, "/");
    assert(!entry.isSymbolicLink(), `Symlink found: ${relative}`);
    if (entry.isDirectory()) { walk(absolute); continue; }
    if (/(?:^|\/)(?:\.env(?:\.[^/]*)?|[^/]*service[-_]?account[^/]*\.json|[^/]*credentials[^/]*\.json|[^/]*\.(?:zip|pem|key|log))$/i.test(relative)) {
      forbidden.push({ path: relative, reason: "forbidden_filename" });
    }
    const bytes = fs.readFileSync(absolute), text = bytes.toString("utf8");
    for (const [reason, pattern] of Object.entries(secretTests)) if (pattern.test(text)) forbidden.push({ path: relative, reason });
    if (relative === "candidate-manifest.json") continue;
    actual.push(relative);
    const entryExpected = expected.get(relative);
    assert(entryExpected, `Unmanifested file: ${relative}`);
    assert.equal(bytes.length, entryExpected.bytes, `Size mismatch: ${relative}`);
    assert.equal(hash(bytes), entryExpected.sha256, `Hash mismatch: ${relative}`);
  }
}
walk(record);
assert.deepEqual(actual.sort(), [...expected.keys()].sort());
assert.deepEqual(forbidden, []);
const receiptPath = (name) => path.join(record, "candidate/website/receipts", name);
const frozen = JSON.parse(fs.readFileSync(receiptPath("frozen-inputs.json"), "utf8"));
for (const relative of manifest.sourcePaths) {
  assert.equal(hash(fs.readFileSync(path.join(record, "candidate/website/source", relative))), frozen.hashes[relative], `Frozen source mismatch: ${relative}`);
}
assert.equal(hash(fs.readFileSync(receiptPath("scope.json"))), frozen.scopeSHA256);
const gatesPath = receiptPath("package-gates.json");
if (fs.existsSync(gatesPath)) {
  const gates = JSON.parse(fs.readFileSync(gatesPath, "utf8"));
  for (const [name, expectedHash] of Object.entries(gates.receiptHashes || {})) {
    assert.equal(hash(fs.readFileSync(receiptPath(name))), expectedHash, `Package receipt changed: ${name}`);
  }
  if (gates.frozenInputsSHA256) assert.equal(hash(fs.readFileSync(receiptPath("frozen-inputs.json"))), gates.frozenInputsSHA256);
  if (gates.candidateInventorySHA256) assert.equal(hash(fs.readFileSync(receiptPath("candidate-files.json"))), gates.candidateInventorySHA256);
  if (gates.compositionReportSHA256) assert.equal(hash(fs.readFileSync(receiptPath("composition-report.json"))), gates.compositionReportSHA256);
}
const approvalPath = receiptPath("root-approval.json");
if (fs.existsSync(approvalPath)) {
  const approval = JSON.parse(fs.readFileSync(approvalPath, "utf8"));
  if (approval.packageGatesSHA256) assert.equal(hash(fs.readFileSync(gatesPath)), approval.packageGatesSHA256);
  for (const [name, expectedHash] of Object.entries(approval.toolHashes || {})) {
    assert.equal(hash(fs.readFileSync(path.join(record, "candidate/website/tools", name))), expectedHash, `Approved tool changed: ${name}`);
  }
}
if (manifest.productionDeploymentState === "ACTIVE") {
  assert.deepEqual(manifest.pendingReceipts, [], "Final record has missing receipts");
  const json = (name) => JSON.parse(fs.readFileSync(receiptPath(name), "utf8"));
  const deployed = json("deployment-receipt.json"), live = json("live-verification.json"), rollback = json("rollback-preflight.json");
  const gates = json("package-gates.json"), approval = json("root-approval.json"), source = json("source-verification.json");
  assert.equal(deployed.state, "ACTIVE");
  assert.equal(live.result, "PASS");
  assert.equal(live.revision, deployed.revision);
  assert.deepEqual(live.source, deployed.deployedSource);
  assert.equal(live.artifactSHA256, deployed.artifactSHA256);
  assert.equal(gates.artifactSHA256, deployed.artifactSHA256);
  assert.equal(approval.artifactSHA256, deployed.artifactSHA256);
  assert.equal(rollback.result, "PASS");
  assert.equal(rollback.ready, true);
  assert.equal(rollback.changed, false);
  assert.equal(rollback.currentRevision, deployed.revision);
  assert.equal(rollback.rollbackRevision, manifest.baselineRevision);
  assert.equal(rollback.rollbackArchiveSHA256, manifest.baselineArchiveSHA256);
  assert.equal(source.result, "PASS");
  assert(source.suites.every((suite) => suite.exitCode === 0 && (!Object.hasOwn(suite, "skipped") || suite.skipped === 0)));
  assert.equal(json("compiled-ui-verification-v3.json").result, "PASS");
  assert.equal(json("independent-composition-review.json").result, "PASS");
  for (const proof of [deployed, live, rollback]) assert.equal(proof.configHash, manifest.baselineConfigSHA256);
}
console.log(JSON.stringify({ result: "PASS", filesVerified: actual.length + 1,
  forbiddenFiles: 0, detectedCredentialPatterns: 0, frozenSourceHashesVerified: manifest.sourcePaths.length,
  productionDeploymentState: manifest.productionDeploymentState, pendingReceipts: manifest.pendingReceipts,
  manifestSHA256: hash(fs.readFileSync(path.join(record, "candidate-manifest.json"))),
  databaseWrites: 0, slackPosts: 0, gitWrites: 0 }, null, 2));
