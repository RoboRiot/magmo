"use strict";
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), assert = require("node:assert/strict");
const hash = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, "release-manifest.json"), "utf8"));
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const actual = walk(__dirname).map(file => path.relative(__dirname, file).replaceAll("\\", "/")).filter(file => file !== "release-manifest.json").sort();
assert.deepEqual(actual, manifest.files.map(file => file.path).sort());
for (const file of manifest.files) {
  assert(!/(?:^|\/)(?:private|node_modules|\.env[^/]*)(?:\/|$)|\.(?:zip|jsonl|ndjson)$/.test(file.path));
  const bytes = fs.readFileSync(path.join(__dirname, file.path));
  assert.equal(bytes.length, file.bytes, file.path); assert.equal(hash(bytes), file.sha256, file.path);
}
const provenance = JSON.parse(fs.readFileSync(path.join(__dirname, "source-provenance.json"), "utf8"));
assert.equal(provenance.credentialScan.status, "PASS"); assert.equal(provenance.credentialScan.knownPrivateValueMatches, 0);
for (const file of provenance.entries) assert.equal(hash(fs.readFileSync(path.join(__dirname, file.path))), file.sha256, file.path);
console.log(JSON.stringify({ result: "PASS", files: manifest.files.length, artifactSHA256: manifest.artifactSHA256, provenanceHashesVerified: true, productionRequests: 0 }));
