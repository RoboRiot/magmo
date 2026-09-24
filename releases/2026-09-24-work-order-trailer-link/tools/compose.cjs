"use strict";
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), assert = require("node:assert/strict");
const root = path.resolve(__dirname, "../.."), source = path.join(__dirname, "source");
const outputName = process.argv[2] || "scoped-source";
assert(/^scoped-source(?:-v\d+)?$/.test(outputName));
const out = path.join(__dirname, outputName), relative = "machine-link/workOrderMachineLink.cjs";
const reviewedSource = "lib/ops/workOrderMachineLink.cjs";
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
assert(fs.existsSync(path.join(source, relative)), "Active artifact lacks external machine-link helper");
assert(fs.existsSync(path.join(source, "machine-link/trailerClientLinks.cjs")), "Active artifact lacks exact trailer identity dependency");
assert(!fs.existsSync(out), "Never overwrite a candidate");
const baseline = JSON.parse(fs.readFileSync(path.join(__dirname, "baseline.json"), "utf8"));
assert.equal(sha(fs.readFileSync(path.join(__dirname, "source.zip"))), baseline.archiveSHA256);
const before = fs.readFileSync(path.join(source, relative)), after = fs.readFileSync(path.join(root, reviewedSource));
assert.notEqual(sha(before), sha(after), "No helper fix has been staged yet");
assert(after.toString("utf8").includes("trailerClientLinks"), "Reviewed helper must use existing trailer identity dependency");
fs.cpSync(source, out, { recursive: true, force: false, errorOnExist: true });
fs.copyFileSync(path.join(root, reviewedSource), path.join(out, relative));
for (const file of walk(source)) {
  const name = path.relative(source, file).replaceAll("\\", "/");
  if (name !== relative) assert.equal(sha(fs.readFileSync(file)), sha(fs.readFileSync(path.join(out, name))), name);
}
assert.equal(walk(source).length, walk(out).length, "Do not add or remove files");
const report = { preparedAt: new Date().toISOString(), scope: "Work order trailer association: one external machine-link helper only", sourceDirectory: outputName,
  baselineRevision: baseline.revision, baselineSource: baseline.source, unrelatedFilesPreserved: true,
  entries: [{ path: relative, before: sha(before), after: sha(after) }], sourceHashes: { [reviewedSource]: sha(after) },
  unchangedBuildId: fs.readFileSync(path.join(out, ".next/BUILD_ID"), "utf8"), fileCount: walk(out).length };
fs.writeFileSync(path.join(__dirname, "composition-report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
