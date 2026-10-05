"use strict";

const fs = require("node:fs");
const path = require("node:path");
const cp = require("node:child_process");
const assert = require("node:assert/strict");
const { client, request, getFunction, configHash, sha256 } = require("./cloud-common.cjs");

const expected = {
  revision: "nextserverwest-00075-rod",
  updateTime: "2026-10-01T15:48:45.807350374Z",
  generation: "1790869540632509",
  configHash: "de4d951c93305fd1ae8a781baae316a87b52f5e8825a907a736c0f427eb147fc",
};
const here = __dirname;
function check(fn) {
  assert.equal(fn.state, "ACTIVE");
  assert.equal(fn.serviceConfig.revision, expected.revision);
  assert.equal(fn.updateTime, expected.updateTime);
  assert.equal(fn.buildConfig.runtime, "nodejs22");
  assert.equal(fn.buildConfig.entryPoint, "nextServerWest");
  assert.equal(String(fn.buildConfig.source.storageSource.generation), expected.generation);
  assert.equal(configHash(fn), expected.configHash);
}
function walk(root) {
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) return walk(absolute);
    assert(entry.isFile(), "Archive may not contain links or special files");
    return [absolute];
  });
}
function save(name, value) {
  fs.writeFileSync(path.join(here, name), typeof value === "string" || Buffer.isBuffer(value) ? value : `${JSON.stringify(value, null, 2)}\n`, { flag: "wx" });
}
(async () => {
  assert(!fs.existsSync(path.join(here, "baseline.json")), "Baseline exists; never replace a snapshot");
  const before = await getFunction();
  check(before);
  const source = before.buildConfig.source.storageSource;
  const { data } = await client.request({
    url: `https://storage.googleapis.com/storage/v1/b/${source.bucket}/o/${encodeURIComponent(source.object)}`,
    params: { alt: "media", generation: source.generation }, responseType: "arraybuffer", timeout: 60000,
  });
  const archive = Buffer.from(data);
  if (fs.existsSync(path.join(here, "source.zip"))) assert.equal(sha256(fs.readFileSync(path.join(here, "source.zip"))), sha256(archive));
  else save("source.zip", archive);
  const names = cp.execFileSync("tar", ["-tf", path.join(here, "source.zip")], { encoding: "utf8" }).trim().split(/\r?\n/).filter(Boolean);
  assert(names.length > 0);
  assert(names.every((name) => !path.isAbsolute(name) && !name.includes("\\") && !name.split("/").includes("..")), "Unsafe archive path");
  const sourceDir = path.join(here, "source");
  fs.mkdirSync(sourceDir, { recursive: true });
  cp.execFileSync("tar", ["-xf", path.join(here, "source.zip"), "-C", sourceDir], { stdio: "pipe" });
  const files = walk(sourceDir).map((absolute) => ({
    path: path.relative(sourceDir, absolute).replaceAll("\\", "/"), sha256: sha256(fs.readFileSync(absolute)), bytes: fs.statSync(absolute).size,
  })).sort((a, b) => a.path.localeCompare(b.path));
  assert.deepEqual(files.map((f) => f.path).sort(), names.filter((n) => !n.endsWith("/")).map((n) => n.replace(/^\.\//, "")).sort());
  const after = await getFunction();
  check(after);
  assert.deepEqual(after.buildConfig.source, before.buildConfig.source);
  fs.mkdirSync(path.join(here, "private"), { recursive: true });
  assert(cp.execFileSync("git", ["check-ignore", path.join(here, "private", "function-before.json")], { encoding: "utf8" }).trim(), "Private backup must be gitignored");
  save("private/function-before.json", before);
  save("private/function-after.json", after);
  const baseline = {
    capturedAt: new Date().toISOString(), functionName: before.name, state: before.state,
    revision: before.serviceConfig.revision, updateTime: before.updateTime, source: before.buildConfig.source,
    configHash: configHash(before), configurationBackup: "private/function-before.json",
    configurationBackupSHA256: sha256(fs.readFileSync(path.join(here, "private/function-before.json"))),
    archiveFile: "source.zip", archiveSHA256: sha256(archive), archiveBytes: archive.length,
    runtime: before.buildConfig.runtime, entryPoint: before.buildConfig.entryPoint, region: "us-west2",
    buildId: fs.readFileSync(path.join(sourceDir, ".next/BUILD_ID"), "utf8").trim(), files: files.length,
    sourceAndConfigurationStableDuringCapture: true, productionMutations: 0, databaseWrites: 0, slackPosts: 0,
  };
  save("baseline-files.json", files);
  save("baseline.json", baseline);

  const rb = "https://firebaserules.googleapis.com/v1/";
  const release = await request(rb + "projects/magmo-ac10c/releases/cloud.firestore");
  const rules = await request(rb + release.rulesetName);
  assert.equal(rules.source.files.length, 1);
  const ruleFile = rules.source.files[0];
  assert.equal(typeof ruleFile.content, "string");
  const recheck = await request(rb + release.name);
  assert.equal(recheck.updateTime, release.updateTime);
  assert.equal(recheck.rulesetName, release.rulesetName);
  save("firestore-before.rules", ruleFile.content);
  save("rules-baseline.json", { capturedAt: new Date().toISOString(), release, fileName: ruleFile.name, beforeSHA256: sha256(ruleFile.content), sourceStableDuringCapture: true, productionMutations: 0 });
  const hosting = await request("https://firebasehosting.googleapis.com/v1beta1/sites/magmo-ac10c/releases", "GET", undefined, { pageSize: 1 });
  const hostingRelease = hosting.releases?.[0];
  assert(hostingRelease?.version?.name);
  save("hosting-baseline.json", { capturedAt: new Date().toISOString(), release: hostingRelease, productionMutations: 0 });
  console.log(JSON.stringify({ ...baseline, firestoreRuleset: release.rulesetName, firestoreRulesSHA256: sha256(ruleFile.content), hostingRelease: hostingRelease.name }, null, 2));
})().catch((error) => {
  console.error(JSON.stringify({ error: "production_snapshot_failed", code: error?.code || null, status: error?.response?.status || null, detail: error instanceof assert.AssertionError ? error.message : undefined }));
  process.exitCode = 1;
});
