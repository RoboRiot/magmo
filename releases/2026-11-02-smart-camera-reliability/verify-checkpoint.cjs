"use strict";
// Structural verification only; never invokes a deployment, database, or API.
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), assert = require("node:assert/strict");
const directory = __dirname;
const sha = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const manifest = JSON.parse(fs.readFileSync(path.join(directory, "checkpoint-manifest.json")));
const provenance = JSON.parse(fs.readFileSync(path.join(directory, "source-provenance.json")));
assert.equal(manifest.buildId, provenance.buildId);
assert.equal(manifest.finalCompositionSHA256, provenance.finalCompositionSHA256);
assert.equal(manifest.sourceCopiesComplete, true);
assert.equal(manifest.copiedEntries, provenance.entries.length);
const expected = new Set([".gitattributes", "README.md", "checkpoint-manifest.json", "source-provenance.json", "verify-checkpoint.cjs"]);
for (const entry of provenance.entries) {
  assert(!expected.has(entry.path), "Duplicate recorded path"); expected.add(entry.path);
  const target = path.resolve(directory, entry.path); assert(target.startsWith(directory + path.sep));
  const data = fs.readFileSync(target); assert.equal(data.length, entry.bytes, entry.path);
  assert.equal(sha(data), entry.sha256, entry.path);
}
function walk(folder) {
  for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
    assert(!entry.isSymbolicLink(), "Links are not allowed in the release record");
    const target = path.join(folder, entry.name);
    if (entry.isDirectory()) walk(target);
    else assert(expected.delete(path.relative(directory, target).replaceAll("\\", "/")), "Unrecorded release file");
  }
}
walk(directory); assert.equal(expected.size, 0);
console.log(JSON.stringify({ status: "PASS", buildId: manifest.buildId, verifiedCopies: provenance.entries.length,
  livePostflightVerified: manifest.livePostflightVerified,
  externalCalls: 0, liveWrites: 0 }));
