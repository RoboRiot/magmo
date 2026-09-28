"use strict";

// Read-only, generation-pinned production code backup. Never logs environment
// variables, credentials, tokens, database records, or Slack messages.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const { client, request } = require("../../ops-reliability-20260922/cloud.cjs");

const here = __dirname;
const functionUrl = "https://cloudfunctions.googleapis.com/v2/projects/magmo-ac10c/locations/us-west2/functions/nextServerWest";
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const stable = (value) => Array.isArray(value) ? value.map(stable) : value && typeof value === "object"
  ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])])) : value;
function configHash(fn) {
  const service = structuredClone(fn.serviceConfig);
  const build = structuredClone(fn.buildConfig);
  for (const key of ["revision", "uri", "service"]) delete service[key];
  for (const key of ["source", "sourceProvenance", "build"]) delete build[key];
  return sha256(JSON.stringify(stable({ service, build, labels: fn.labels })));
}

(async () => {
  const archive = path.join(here, "source.zip");
  const metadata = path.join(here, "baseline.json");
  const source = path.join(here, "source");
  assert(!fs.existsSync(archive) && !fs.existsSync(metadata) && !fs.existsSync(source), "Preserve existing baseline.");
  const fn = await request(functionUrl);
  assert.equal(fn.state, "ACTIVE");
  assert.equal(fn.serviceConfig.revision, "nextserverwest-00064-miz");
  assert.equal(fn.buildConfig.runtime, "nodejs22");
  assert.equal(fn.buildConfig.entryPoint, "nextServerWest");
  assert.equal(configHash(fn), "de4d951c93305fd1ae8a781baae316a87b52f5e8825a907a736c0f427eb147fc");
  const storage = fn.buildConfig.source.storageSource;
  const { data } = await client.request({
    url: `https://storage.googleapis.com/storage/v1/b/${storage.bucket}/o/${encodeURIComponent(storage.object)}`,
    params: { alt: "media", generation: storage.generation }, responseType: "arraybuffer", timeout: 60000,
  });
  const after = await request(functionUrl);
  assert.equal(after.state, "ACTIVE");
  assert.equal(after.updateTime, fn.updateTime);
  assert.deepEqual(after.buildConfig.source, fn.buildConfig.source);
  assert.equal(configHash(after), configHash(fn));
  const bytes = Buffer.from(data);
  const archiveSHA256 = sha256(bytes);
  assert.equal(archiveSHA256, "cbbfd0dc99d439b1110a25fc36cc455bed84771400feebbca9c2af8622b744f8");
  fs.writeFileSync(archive, bytes, { flag: "wx" });
  fs.mkdirSync(source);
  const listing = execFileSync("tar", ["-tf", archive], { encoding: "utf8" }).trim().split(/\r?\n/);
  assert(listing.every((entry) => !path.isAbsolute(entry) && !entry.replaceAll("\\", "/").split("/").includes("..")), "Unsafe archive path.");
  execFileSync("tar", ["-xf", archive, "-C", source], { stdio: "pipe" });
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
  const files = walk(source).map((file) => ({ path: path.relative(source, file).replaceAll("\\", "/"), bytes: fs.statSync(file).size, sha256: sha256(fs.readFileSync(file)) })).sort((a, b) => a.path.localeCompare(b.path));
  const baseline = {
    checkedAt: new Date().toISOString(), revision: fn.serviceConfig.revision, updateTime: fn.updateTime,
    source: fn.buildConfig.source, archiveSHA256, archiveBytes: bytes.length, configHash: configHash(fn),
    runtime: fn.buildConfig.runtime, entryPoint: fn.buildConfig.entryPoint, region: "us-west2",
    buildId: fs.readFileSync(path.join(source, ".next/BUILD_ID"), "utf8").trim(), files: files.length,
    databaseWrites: 0, slackPosts: 0, productionMutations: 0,
  };
  assert.equal(baseline.buildId, "ops-ot-collapse-ba090bd8698ef94f");
  fs.writeFileSync(path.join(here, "baseline-files.json"), JSON.stringify(files, null, 2) + "\n", { flag: "wx" });
  fs.writeFileSync(metadata, JSON.stringify(baseline, null, 2) + "\n", { flag: "wx" });
  console.log(JSON.stringify(baseline, null, 2));
})().catch((error) => {
  console.error(JSON.stringify({ error: "snapshot_failed", status: error.response?.status || null, detail: error instanceof assert.AssertionError ? error.message : undefined }));
  process.exitCode = 1;
});
