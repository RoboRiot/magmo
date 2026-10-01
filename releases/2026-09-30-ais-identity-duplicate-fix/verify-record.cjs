"use strict";
// Offline integrity check; no network, credentials, database access, or writes.
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), assert = require("node:assert/strict");
const here = __dirname, manifest = JSON.parse(fs.readFileSync(path.join(here, "release-manifest.json"), "utf8"));
const hash = (data) => crypto.createHash("sha256").update(data).digest("hex");
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  assert(entry.isDirectory() || entry.isFile(), "Unexpected symlink or special file");
  return entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)];
});
const secretPatterns = [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, /AIza[\w-]{30,}/, /xox[baprs]-[\w-]{10,}/, /gh[pousr]_[A-Za-z0-9]{20,}/, /sk-[A-Za-z0-9]{20,}/, /"(?:private_key|refresh_token)"\s*:\s*"[^"\n]+"/];
const files = walk(here).map((file) => path.relative(here, file).replaceAll("\\", "/")).filter((file) => file !== "release-manifest.json").sort();
assert.deepEqual(files, manifest.files.map((entry) => entry.path).sort(), "Unexpected or missing record file");
for (const entry of manifest.files) {
  assert(!/(^|\/)(?:\.env(?:\.|$)|node_modules|private|.*firebase-adminsdk.*)(?:\/|$)|\.(?:zip|jsonl|png|jpe?g)$/i.test(entry.path), `Excluded file ${entry.path}`);
  const bytes = fs.readFileSync(path.join(here, entry.path));
  assert.equal(bytes.length, entry.bytes, entry.path); assert.equal(hash(bytes), entry.sha256, entry.path);
  assert(!secretPatterns.some((pattern) => pattern.test(bytes.toString("utf8"))), `Potential embedded secret in ${entry.path}`);
}
const source = JSON.parse(fs.readFileSync(path.join(here, "source-provenance.json"), "utf8"));
for (const entry of source.files) assert.equal(hash(fs.readFileSync(path.join(here, entry.relative))), entry.sha256, entry.relative);
const live = JSON.parse(fs.readFileSync(path.join(here, "candidate/receipts/live-verification.json"), "utf8"));
assert.equal(live.result, "PASS"); assert.equal(live.revision, manifest.liveRevision); assert.equal(live.exactArtifactSHA256, manifest.artifactSHA256);
console.log(JSON.stringify({ status: "PASS", files: files.length, exactProvenanceSnapshots: source.files.length, liveRevision: manifest.liveRevision, manifestSHA256: hash(fs.readFileSync(path.join(here, "release-manifest.json"))), secretPatternScan: "PASS", excludedFileScan: "PASS", productionActions: 0 }, null, 2));
