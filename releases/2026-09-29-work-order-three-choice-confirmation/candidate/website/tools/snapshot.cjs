"use strict";

const fs = require("node:fs");
const path = require("node:path");
const cp = require("node:child_process");
const assert = require("node:assert/strict");
const {
  client,
  getFunction,
  configHash,
  sha256,
} = require("../../work-order-link-coverage-20260929/deployment/cloud-common.cjs");

const EXPECTED = Object.freeze({
  revision: "nextserverwest-00070-liw",
  updateTime: "2026-09-29T18:55:39.909232541Z",
  generation: "1790707920911481",
  configHash: "de4d951c93305fd1ae8a781baae316a87b52f5e8825a907a736c0f427eb147fc",
});

async function getActiveFunction() {
  let last;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    last = await getFunction();
    if (last.state === "ACTIVE") return last;
    await new Promise((resolve) => setTimeout(resolve, 750));
  }
  assert.equal(last?.state, "ACTIVE");
  return last;
}

function walk(root) {
  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const target = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...walk(target));
    else if (entry.isFile()) files.push(target);
  }
  return files;
}

(async () => {
  const baselinePath = path.join(__dirname, "baseline.json");
  const inventoryPath = path.join(__dirname, "baseline-files.json");
  const zipPath = path.join(__dirname, "source.zip");
  const sourceDir = path.join(__dirname, "source");
  assert(!fs.existsSync(baselinePath), "baseline.json already exists");
  assert(!fs.existsSync(inventoryPath), "baseline-files.json already exists");

  const fn = await getActiveFunction();
  assert.equal(fn.state, "ACTIVE");
  assert.equal(fn.serviceConfig.revision, EXPECTED.revision);
  assert.equal(fn.updateTime, EXPECTED.updateTime);
  assert.equal(fn.buildConfig.runtime, "nodejs22");
  assert.equal(fn.buildConfig.entryPoint, "nextServerWest");
  assert.equal(configHash(fn), EXPECTED.configHash);
  const storage = fn.buildConfig.source?.storageSource;
  assert(storage?.bucket && storage?.object && storage?.generation);
  assert.equal(String(storage.generation), EXPECTED.generation);

  const { data } = await client.request({
    url: `https://storage.googleapis.com/storage/v1/b/${storage.bucket}/o/${encodeURIComponent(storage.object)}`,
    params: { alt: "media", generation: storage.generation },
    responseType: "arraybuffer",
    timeout: 60_000,
  });
  const bytes = Buffer.from(data);
  if (fs.existsSync(zipPath)) assert.equal(sha256(fs.readFileSync(zipPath)), sha256(bytes));
  else fs.writeFileSync(zipPath, bytes, { flag: "wx" });

  const names = cp.execFileSync("tar", ["-tf", zipPath], { encoding: "utf8" })
    .trim()
    .split(/\r?\n/)
    .filter(Boolean);
  assert(names.length > 0);
  assert(names.every((name) => !path.isAbsolute(name) && !name.split("/").includes("..")));
  if (!fs.existsSync(sourceDir)) {
    fs.mkdirSync(sourceDir);
    cp.execFileSync("tar", ["-xf", zipPath, "-C", sourceDir], { stdio: "pipe" });
  }

  const files = walk(sourceDir).map((file) => ({
    path: path.relative(sourceDir, file).replaceAll("\\", "/"),
    sha256: sha256(fs.readFileSync(file)),
    bytes: fs.statSync(file).size,
  })).sort((a, b) => a.path.localeCompare(b.path));
  assert.deepEqual(
    files.map((item) => item.path).sort(),
    names.filter((name) => !name.endsWith("/")).map((name) => name.replace(/^\.\//, "")).sort(),
  );
  const buildId = fs.readFileSync(path.join(sourceDir, ".next", "BUILD_ID"), "utf8").trim();

  const after = await getActiveFunction();
  assert.equal(after.serviceConfig.revision, fn.serviceConfig.revision);
  assert.equal(after.updateTime, fn.updateTime);
  assert.deepEqual(after.buildConfig.source, fn.buildConfig.source);
  assert.equal(configHash(after), EXPECTED.configHash);

  const baseline = {
    capturedAt: new Date().toISOString(),
    functionName: fn.name,
    revision: fn.serviceConfig.revision,
    updateTime: fn.updateTime,
    source: fn.buildConfig.source,
    archiveFile: "source.zip",
    archiveSHA256: sha256(bytes),
    archiveBytes: bytes.length,
    configHash: EXPECTED.configHash,
    runtime: fn.buildConfig.runtime,
    entryPoint: fn.buildConfig.entryPoint,
    region: "us-west2",
    buildId,
    files: files.length,
    productionMutations: 0,
    databaseWrites: 0,
    slackPosts: 0,
  };
  fs.writeFileSync(inventoryPath, `${JSON.stringify(files, null, 2)}\n`, { flag: "wx" });
  fs.writeFileSync(baselinePath, `${JSON.stringify(baseline, null, 2)}\n`, { flag: "wx" });
  console.log(JSON.stringify(baseline, null, 2));
})().catch((error) => {
  console.error(JSON.stringify({
    error: "production_snapshot_failed",
    status: error?.response?.status || null,
    code: error?.code || null,
    detail: error instanceof assert.AssertionError ? error.message : undefined,
  }));
  process.exitCode = 1;
});
