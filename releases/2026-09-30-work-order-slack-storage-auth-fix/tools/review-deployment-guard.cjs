"use strict";
// Review/snapshot only the new Storage gate; retain unrelated verifier edits.
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const record = path.resolve(__dirname, ".."), root = path.resolve(record, "../../../..");
const deployment = path.join(root, "tmp/work-order-slack-preparation-fix-20260930/deployment");
const hash = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const relative = "scripts/verify-firebase-build.js";
const source = fs.readFileSync(path.join(root, relative), "utf8");
const marker = "// A dependency override can break Cloud Run's metadata authentication while";
const start = source.indexOf(marker), end = source.indexOf("console.log(", start);
assert(start > 0 && end > start); assert.equal(source.indexOf(marker, start + 1), -1);
const addition = source.slice(start, end), before = source.slice(0, start) + source.slice(end);
assert(before.includes('const { spawnSync } = require("child_process");'));
assert(before.includes("Compiled Magmonitor ingest regression failed"));
assert(!before.includes("storageVerification"));
assert(addition.includes('env: { ...process.env, STORAGE_ADC_CANDIDATE_ROOT: "" }'));
assert(addition.includes("timeout: 45000"));
assert(addition.includes("storageVerification.error || storageVerification.status !== 0"));
const result = spawnSync(process.execPath, ["--test", "test/firebase-storage-deploy-guard.test.cjs", "test/storage-adc-compatibility.test.cjs"],
  { cwd: root, encoding: "utf8", windowsHide: true, timeout: 45000 });
assert.equal(result.status, 0, result.stderr || result.stdout);
assert.match(result.stdout, /# pass 4/); assert.match(result.stdout, /# fail 0/);
const line = source.slice(0, start).split("\n").length;
const addedLines = addition.replace(/\n$/, "").split("\n");
const patch = `diff --git a/${relative} b/${relative}\n--- a/${relative}\n+++ b/${relative}\n@@ -${line},1 +${line},${addedLines.length + 1} @@\n` +
  addedLines.map(text => `+${text}`).join("\n") + "\n console.log(\n";
const patchDirectory = path.join(record, "candidate/source-patches");
fs.mkdirSync(patchDirectory, { recursive: true });
const patchFile = path.join(patchDirectory, "verify-firebase-build-storage-adc.patch");
fs.writeFileSync(patchFile, patch);
const artifactSHA256 = hash(fs.readFileSync(path.join(deployment, "artifact.zip")));
assert.equal(artifactSHA256, "698401991766587795dc9ac668e39c39b0bab326ce653680352c479f65a54b53");
const report = { result: "PASS", checkedAt: new Date().toISOString(), sourceFile: relative,
  beforeStorageGateSHA256: hash(before), afterStorageGateSHA256: hash(source),
  patchSHA256: hash(patch), patchContainsOnlyStorageGate: true,
  preexistingIngestGatePreserved: true, candidateOverrideCleared: true,
  tests: { passed: 4, uniqueNewDeployGuardTests: 2, repeatedAdcGraphChecks: 2, failed: 0,
    outputSHA256: hash(result.stdout + result.stderr),
    testSHA256: hash(fs.readFileSync(path.join(root, "test/firebase-storage-deploy-guard.test.cjs"))) },
  approvedRuntimeArtifactUnchanged: true, artifactSHA256,
  databaseWrites: 0, slackPosts: 0, productionMutations: 0 };
fs.writeFileSync(path.join(deployment, "deployment-guard-review.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
