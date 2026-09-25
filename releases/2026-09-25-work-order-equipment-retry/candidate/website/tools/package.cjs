"use strict";
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");

const root = path.resolve(__dirname, "../..");
const report = JSON.parse(fs.readFileSync(path.join(__dirname, "composition-report.json"), "utf8"));
const candidate = path.resolve(__dirname, report.sourceDirectory);
const artifact = path.resolve(__dirname, "artifact.zip");
const check = path.resolve(__dirname, "artifact-check");
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true })
  .flatMap((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
const relative = (base, file) => path.relative(base, file).replaceAll("\\", "/");

assert.equal(path.dirname(check), path.resolve(__dirname), "Extraction directory must remain inside this release directory");
assert.equal(path.basename(check), "artifact-check", "Unexpected extraction target");
assert(fs.existsSync(artifact), "The reviewed artifact must already exist; this command never creates or overwrites it");

const output = execFileSync(process.execPath, ["--test", path.join(__dirname, "verify-artifact.test.cjs")], {
  cwd: root,
  encoding: "utf8",
  maxBuffer: 16 * 1024 * 1024,
});
assert.match(output, /# fail 0(?:\r?\n|$)/, "Exact-artifact test suite failed");
const count = Number(output.match(/# pass (\d+)/)?.[1] || 0);
assert(count >= 47, "Expected the complete helper and compiled-import regression suite");

for (const entry of report.entries) {
  assert.equal(sha(fs.readFileSync(path.join(candidate, entry.path))), entry.after, `Candidate changed: ${entry.path}`);
}
for (const [local, expected] of Object.entries(report.sourceHashes)) {
  assert.equal(sha(fs.readFileSync(path.join(root, local))), expected, `Reviewed source changed: ${local}`);
}

fs.rmSync(check, { recursive: true, force: true });
fs.mkdirSync(check);
try {
  execFileSync("tar", ["-xf", artifact, "-C", check], { stdio: "pipe" });
  const candidateFiles = walk(candidate);
  const extractedFiles = walk(check);
  assert.equal(extractedFiles.length, candidateFiles.length, "ZIP omitted or added source files");
  for (const file of candidateFiles) {
    const name = relative(candidate, file);
    const extracted = path.join(check, name);
    assert(fs.existsSync(extracted), `ZIP entry missing: ${name}`);
    assert.equal(sha(fs.readFileSync(extracted)), sha(fs.readFileSync(file)), `ZIP entry differs: ${name}`);
  }
  const gates = {
    ok: true,
    rootReviewed: process.argv.includes("--root-reviewed"),
    exactArtifactTestsPassed: true,
    exactArtifactTestCount: count,
    zipEntriesVerified: candidateFiles.length,
    packagedAt: new Date().toISOString(),
    artifactSHA256: sha(fs.readFileSync(artifact)),
  };
  fs.writeFileSync(path.join(__dirname, "package-gates.json"), JSON.stringify(gates, null, 2));
  console.log(JSON.stringify(gates, null, 2));
} finally {
  fs.rmSync(check, { recursive: true, force: true });
}
