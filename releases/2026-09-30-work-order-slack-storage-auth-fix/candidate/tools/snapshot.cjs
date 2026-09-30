"use strict";

const fs = require("node:fs");
const path = require("node:path");
const cp = require("node:child_process");
const assert = require("node:assert/strict");
const { client, getFunction, configHash, sha256 } = require("../../work-order-save-slack-confirmation-20260929/deployment/cloud-common.cjs");

const expected = {
  revision: "nextserverwest-00071-zot",
  updateTime: "2026-09-29T23:17:28.038170336Z",
  generation: "1790723626923081",
  configHash: "de4d951c93305fd1ae8a781baae316a87b52f5e8825a907a736c0f427eb147fc",
};
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
function write(name, value) {
  fs.writeFileSync(path.join(__dirname, name), `${JSON.stringify(value, null, 2)}\n`, { flag: "wx" });
}
(async () => {
  assert(!fs.existsSync(path.join(__dirname, "baseline.json")), "Baseline already exists; do not overwrite");
  const before = await getFunction();
  check(before);
  const source = before.buildConfig.source.storageSource;
  const { data } = await client.request({
    url: `https://storage.googleapis.com/storage/v1/b/${source.bucket}/o/${encodeURIComponent(source.object)}`,
    params: { alt: "media", generation: source.generation },
    responseType: "arraybuffer", timeout: 60_000,
  });
  const archive = Buffer.from(data);
  const zipPath = path.join(__dirname, "source.zip");
  fs.writeFileSync(zipPath, archive, { flag: "wx" });
  const names = cp.execFileSync("tar", ["-tf", zipPath], { encoding: "utf8" }).trim().split(/\r?\n/).filter(Boolean);
  assert(names.length > 0);
  assert(names.every((name) => !path.isAbsolute(name) && !name.includes("\\") && !name.split("/").includes("..")));
  const sourceDir = path.join(__dirname, "source");
  fs.mkdirSync(sourceDir);
  cp.execFileSync("tar", ["-xf", zipPath, "-C", sourceDir], { stdio: "pipe" });
  const files = walk(sourceDir).map((absolute) => ({
    path: path.relative(sourceDir, absolute).replaceAll("\\", "/"),
    sha256: sha256(fs.readFileSync(absolute)), bytes: fs.statSync(absolute).size,
  })).sort((a, b) => a.path.localeCompare(b.path));
  assert.deepEqual(files.map((f) => f.path).sort(), names.filter((n) => !n.endsWith("/")).map((n) => n.replace(/^\.\//, "")).sort());
  const after = await getFunction();
  check(after);
  assert.deepEqual(after.buildConfig.source, before.buildConfig.source);
  fs.mkdirSync(path.join(__dirname, "private"));
  write("private/function-before.json", before);
  write("private/function-after.json", after);
  const baseline = {
    capturedAt: new Date().toISOString(), functionName: before.name, state: before.state,
    revision: before.serviceConfig.revision, updateTime: before.updateTime,
    source: before.buildConfig.source, configHash: configHash(before),
    configurationBackup: "private/function-before.json",
    configurationBackupSHA256: sha256(fs.readFileSync(path.join(__dirname, "private/function-before.json"))),
    archiveFile: "source.zip", archiveSHA256: sha256(archive), archiveBytes: archive.length,
    runtime: before.buildConfig.runtime, entryPoint: before.buildConfig.entryPoint, region: "us-west2",
    buildId: fs.readFileSync(path.join(sourceDir, ".next", "BUILD_ID"), "utf8").trim(), files: files.length,
    sourceAndConfigurationStableDuringCapture: true,
    productionMutations: 0, databaseWrites: 0, slackPosts: 0,
  };
  write("baseline-files.json", files);
  write("baseline.json", baseline);
  console.log(JSON.stringify(baseline, null, 2));
})().catch((error) => {
  console.error(JSON.stringify({ error: "production_snapshot_failed", code: error?.code || null,
    status: error?.response?.status || null, detail: error instanceof assert.AssertionError ? error.message : undefined }));
  process.exitCode = 1;
});
