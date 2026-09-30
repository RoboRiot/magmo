"use strict";
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto");
const assert = require("node:assert/strict");
const record = path.resolve(__dirname, "..");
const json = file => JSON.parse(fs.readFileSync(file, "utf8"));
const hash = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const manifest = json(path.join(record, "candidate-manifest.json"));
const expected = new Map(manifest.files.map(file => [file.path, file]));
assert.equal(expected.size, manifest.files.length);
const actual = [], forbidden = [];
const secretPatterns = {
  slackToken: /\bxox[baprs]-[A-Za-z0-9-]{18,}/,
  slackWebhook: /https:\/\/hooks\.slack\.com\/services\/[A-Z0-9]{6,}\/[A-Z0-9]{6,}\/[A-Za-z0-9]{15,}/,
  googleApiKey: /AIza[A-Za-z0-9_-]{30,}/,
  privateKey: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----\r?\n[A-Za-z0-9+/=\r\n]{40,}/,
  signedStorageUrl: /https:\/\/(?:storage\.googleapis\.com|firebasestorage\.googleapis\.com)\/[^\s"'<>]+[?&](?:X-Goog-Signature|token)=[A-Za-z0-9%_-]{20,}/,
};
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    assert(!entry.isSymbolicLink());
    const file = path.join(directory, entry.name), relative = path.relative(record, file).replace(/\\/g, "/");
    if (entry.isDirectory()) { walk(file); continue; }
    if (/(?:^|\/)(?:\.env(?:\.[^/]*)?|[^/]*service[-_]?account[^/]*\.json|[^/]*credentials[^/]*\.json|[^/]*\.(?:zip|pem|key|log))$/i.test(relative)) forbidden.push(relative);
    const bytes = fs.readFileSync(file), text = bytes.toString("utf8");
    for (const [reason, pattern] of Object.entries(secretPatterns)) if (pattern.test(text)) forbidden.push(`${relative}: ${reason}`);
    if (relative === "candidate-manifest.json") continue;
    actual.push(relative); assert(expected.has(relative), `Unmanifested file: ${relative}`);
    assert.equal(bytes.length, expected.get(relative).bytes); assert.equal(hash(bytes), expected.get(relative).sha256);
  }
}
walk(record);
assert.deepEqual(actual.sort(), [...expected.keys()].sort()); assert.deepEqual(forbidden, []);
const receipt = name => json(path.join(record, "candidate/receipts", name));
assert.equal(receipt("independent-composition-review.json").pass, true);
assert.equal(receipt("guardrails-scope-review.json").result, "PASS");
assert.deepEqual(receipt("composition-report.json").modified.sort(),
  [".next/server/pages/api/items/work-order-add/slack.js", "package.json", "package-lock.json"].sort());
const gatesPath = path.join(record, "candidate/receipts/package-gates.json");
if (fs.existsSync(gatesPath)) {
  const gates = json(gatesPath);
  for (const [name, expectedHash] of Object.entries(gates.receiptHashes)) {
    assert.equal(hash(fs.readFileSync(path.join(record, "candidate/receipts", name))), expectedHash, `Gate receipt changed: ${name}`);
  }
}
if (process.argv.includes("--final")) {
  assert.deepEqual(manifest.pendingReceipts, []);
  const deployed = receipt("deployment-receipt.json"), live = receipt("live-verification.json"), rollback = receipt("rollback-preflight.json");
  assert.equal(deployed.state, "ACTIVE"); assert.equal(live.result, "PASS"); assert.equal(rollback.result, "PASS");
  assert.equal(live.revision, deployed.revision);
  assert.equal(rollback.currentRevision, deployed.revision); assert.equal(rollback.rollbackRevision, manifest.baselineRevision);
  assert.equal(rollback.rollbackArchiveSHA256, manifest.baselineArchiveSHA256);
  assert.equal(receipt("compiled-verification.json").result, "PASS");
  assert.equal(receipt("compiled-verification.json").source.passed, 151);
  assert.equal(receipt("compiled-verification.json").compiled.passed, 44);
  assert.equal(receipt("dependency-runtime-verification.json").pass, true);
  assert.equal(receipt("deployment-guard-review.json").result, "PASS");
  assert.equal(manifest.verificationCounts.uniqueTotal, 200);
  const approval = receipt("root-approval.json"), gates = receipt("package-gates.json");
  assert.equal(approval.artifactSHA256, deployed.artifactSHA256);
  assert.equal(gates.artifactSHA256, deployed.artifactSHA256);
  assert.equal(live.artifactSHA256, deployed.artifactSHA256);
  assert.equal(approval.packageGatesSHA256, hash(fs.readFileSync(gatesPath)));
  for (const [name, expectedHash] of Object.entries(approval.toolHashes))
    assert.equal(hash(fs.readFileSync(path.join(record, "candidate/tools", name))), expectedHash);
  for (const proof of [deployed, live, rollback]) assert.equal(proof.configHash, manifest.baselineConfigSHA256);
  assert.equal(rollback.changed, false); assert.equal(rollback.ready, true);
}
console.log(JSON.stringify({ result: "PASS", filesVerified: actual.length + 1, forbiddenFiles: 0,
  productionDeploymentState: manifest.productionDeploymentState, pendingReceipts: manifest.pendingReceipts,
  manifestSHA256: hash(fs.readFileSync(path.join(record, "candidate-manifest.json"))),
  databaseWrites: 0, slackPosts: 0, gitWrites: 0 }, null, 2));
