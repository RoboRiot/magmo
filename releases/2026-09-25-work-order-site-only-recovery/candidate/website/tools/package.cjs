"use strict";
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), assert = require("node:assert/strict"), { execFileSync } = require("node:child_process");
const root = path.resolve(__dirname, "../.."), report = JSON.parse(fs.readFileSync(path.join(__dirname, "composition-report.json"), "utf8"));
const candidate = path.resolve(__dirname, report.sourceDirectory), artifact = path.resolve(__dirname, "artifact.zip"), check = path.resolve(__dirname, "artifact-check");
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
assert.equal(path.dirname(check), path.resolve(__dirname)); assert.equal(path.basename(check), "artifact-check"); assert(fs.existsSync(artifact), "Reviewed artifact must already exist");
const output = execFileSync(process.execPath, ["--test", path.join(__dirname, "verify-artifact.test.cjs")], { cwd: root, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
assert.match(output, /# fail 0(?:\r?\n|$)/); const count = Number(output.match(/# pass (\d+)/)?.[1] || 0); assert(count >= 63);
for (const entry of report.entries) assert.equal(sha(fs.readFileSync(path.join(candidate, entry.path))), entry.after, entry.path);
for (const [local, expected] of Object.entries(report.sourceHashes)) assert.equal(sha(fs.readFileSync(path.join(root, local))), expected, local);
fs.rmSync(check, { recursive: true, force: true }); fs.mkdirSync(check);
try {
  execFileSync("tar", ["-xf", artifact, "-C", check], { stdio: "pipe" });
  const candidateFiles = walk(candidate), extractedFiles = walk(check); assert.equal(extractedFiles.length, candidateFiles.length);
  for (const file of candidateFiles) { const relative = path.relative(candidate, file); const extracted = path.join(check, relative); assert(fs.existsSync(extracted), relative); assert.equal(sha(fs.readFileSync(extracted)), sha(fs.readFileSync(file)), relative); }
  const gates = { ok: true, rootReviewed: process.argv.includes("--root-reviewed"), exactArtifactTestsPassed: true, exactArtifactTestCount: count,
    zipEntriesVerified: candidateFiles.length, packagedAt: new Date().toISOString(), artifactSHA256: sha(fs.readFileSync(artifact)) };
  fs.writeFileSync(path.join(__dirname, "package-gates.json"), JSON.stringify(gates, null, 2)); console.log(JSON.stringify(gates, null, 2));
} finally { fs.rmSync(check, { recursive: true, force: true }); }
