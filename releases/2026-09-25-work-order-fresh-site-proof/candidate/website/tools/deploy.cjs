"use strict";

// Guarded source-only deployment of the reviewed 00060 overlay. This script
// is read-only unless --apply is explicitly supplied. After submission, use
// --status; never repeat an ambiguous submission.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const { client, request } = require("../ops-reliability-20260922/cloud.cjs");

const CF = "https://cloudfunctions.googleapis.com/v2/";
const parent = "projects/magmo-ac10c/locations/us-west2";
const functionName = parent + "/functions/nextServerWest";
const file = (name) => path.join(__dirname, name);
const json = (name) => JSON.parse(fs.readFileSync(file(name), "utf8"));
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const stable = (value) => Array.isArray(value)
  ? value.map(stable)
  : value && typeof value === "object"
    ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]))
    : value;
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true })
  .flatMap((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);

function configHash(fn) {
  const service = structuredClone(fn.serviceConfig);
  const build = structuredClone(fn.buildConfig);
  for (const key of ["revision", "uri", "service"]) delete service[key];
  for (const key of ["source", "sourceProvenance", "build"]) delete build[key];
  return sha(JSON.stringify(stable({ service, build, labels: fn.labels })));
}

let phase = "preflight";
let receipt;
(async () => {
  const baseline = json("baseline.json");
  const report = json("composition-report.json");
  const expectedEntries = [
    "machine-link/blueFolderCustomerLookup.cjs",
    "machine-link/workOrderSiteLink.cjs",
    ".next/server/chunks/8806.js",
  ];
  assert.deepEqual(report.entries.map((entry) => entry.path), expectedEntries);
  assert.equal(baseline.runtime, "nodejs22");
  assert.equal(baseline.entryPoint, "nextServerWest");
  assert.equal(baseline.region, "us-west2");

  if (process.argv.includes("--status")) {
    receipt = json("deployment-receipt.json");
    assert(receipt.operation, "Never repeat an ambiguous submission");
    const operation = await request(CF + receipt.operation);
    if (!operation.done) {
      console.log(JSON.stringify({
        state: "DEPLOYING",
        stages: operation.metadata?.stages?.map(({ name, state }) => ({ name, state })),
      }));
      return;
    }
    assert(!operation.error);
    const after = await request(CF + functionName);
    assert.equal(after.state, "ACTIVE");
    assert.notEqual(after.serviceConfig.revision, baseline.revision);
    assert.equal(configHash(after), receipt.configHash);
    assert.equal(after.buildConfig.runtime, "nodejs22");
    assert.equal(after.buildConfig.entryPoint, "nextServerWest");
    const storage = after.buildConfig.source.storageSource;
    const { data } = await client.request({
      url: `https://storage.googleapis.com/storage/v1/b/${storage.bucket}/o/${encodeURIComponent(storage.object)}`,
      params: { alt: "media", generation: storage.generation },
      responseType: "arraybuffer",
      timeout: 60000,
    });
    assert.equal(sha(Buffer.from(data)), receipt.artifactSHA256);
    Object.assign(receipt, {
      state: "ACTIVE",
      completedAt: new Date().toISOString(),
      revision: after.serviceConfig.revision,
      deployedSource: after.buildConfig.source,
      deployedUpdateTime: after.updateTime,
      unrelatedConfigurationPreserved: true,
    });
    fs.writeFileSync(file("deployment-receipt.json"), JSON.stringify(receipt, null, 2));
    console.log(JSON.stringify(receipt, null, 2));
    return;
  }

  const gates = json("package-gates.json");
  assert(gates.ok && gates.rootReviewed && gates.exactArtifactTestsPassed && report.unrelatedFilesPreserved);
  assert.equal(gates.rootIndependentCompiledTestsPassed, 104);
  assert.equal(gates.rootArtifactHashVerified, true);
  assert.equal(gates.zipEntriesVerified, report.fileCount);
  const source = file("source");
  const out = file(report.sourceDirectory);
  const declared = new Map(report.entries.map((entry) => [entry.path, entry]));
  for (const old of walk(source)) {
    const relative = path.relative(source, old).replaceAll("\\", "/");
    const next = path.join(out, relative);
    assert(fs.existsSync(next), relative);
    if (!declared.has(relative)) assert.equal(sha(fs.readFileSync(old)), sha(fs.readFileSync(next)), relative);
    else assert.equal(sha(fs.readFileSync(old)), declared.get(relative).before, relative);
  }
  for (const entry of report.entries) assert.equal(sha(fs.readFileSync(path.join(out, entry.path))), entry.after, entry.path);
  assert.equal(walk(out).length, report.fileCount);
  for (const [local, hash] of Object.entries(report.sourceHashes)) {
    assert.equal(sha(fs.readFileSync(path.resolve(__dirname, "../..", local))), hash, local);
  }
  const bytes = fs.readFileSync(file("artifact.zip"));
  assert.equal(sha(bytes), gates.artifactSHA256);
  assert.equal(sha(fs.readFileSync(file("source.zip"))), baseline.archiveSHA256);
  assert(!fs.existsSync(file("deployment-receipt.json")), "Existing receipt: check status instead of redeploying");

  const before = await request(CF + functionName);
  assert.equal(before.state, "ACTIVE");
  assert.equal(before.serviceConfig.revision, baseline.revision);
  assert.equal(before.updateTime, baseline.updateTime);
  assert.deepEqual(before.buildConfig.source, baseline.source);
  assert.equal(before.buildConfig.runtime, "nodejs22");
  assert.equal(before.buildConfig.entryPoint, "nextServerWest");
  assert.equal(before.buildConfig.environmentVariables.GOOGLE_NODE_RUN_SCRIPTS, "");
  assert.equal(configHash(before), baseline.configHash);

  if (!process.argv.includes("--apply")) {
    console.log(JSON.stringify({
      ok: true,
      mode: "read_only",
      baseline: baseline.revision,
      updateTime: baseline.updateTime,
      runtime: baseline.runtime,
      entryPoint: baseline.entryPoint,
      region: baseline.region,
      sourceOnly: true,
      artifactSHA256: sha(bytes),
      rollbackArchiveSHA256: baseline.archiveSHA256,
      configHash: configHash(before),
    }, null, 2));
    return;
  }

  phase = "upload";
  const upload = await request(CF + parent + "/functions:generateUploadUrl", "POST", {});
  const sent = await fetch(upload.uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/zip" },
    body: bytes,
    signal: AbortSignal.timeout(60000),
  });
  assert(sent.ok);
  const latest = await request(CF + functionName);
  assert.equal(latest.updateTime, before.updateTime);
  assert.deepEqual(latest.buildConfig.source, before.buildConfig.source);
  assert.equal(configHash(latest), configHash(before));

  receipt = {
    state: "SUBMITTING",
    startedAt: new Date().toISOString(),
    originalRevision: before.serviceConfig.revision,
    originalUpdateTime: before.updateTime,
    originalSource: before.buildConfig.source,
    artifactSHA256: sha(bytes),
    rollbackArchiveSHA256: baseline.archiveSHA256,
    configHash: configHash(before),
    runtime: baseline.runtime,
    entryPoint: baseline.entryPoint,
    region: baseline.region,
    scope: report.scope,
    rollbackArchive: "source.zip",
    sourceOnly: true,
  };
  fs.writeFileSync(file("deployment-receipt.json"), JSON.stringify(receipt, null, 2));
  phase = "patch";
  const operation = await request(CF + functionName, "PATCH", {
    name: functionName,
    buildConfig: { source: { storageSource: upload.storageSource } },
  }, { updateMask: "buildConfig.source" });
  Object.assign(receipt, { state: "DEPLOYING", operation: operation.name });
  fs.writeFileSync(file("deployment-receipt.json"), JSON.stringify(receipt, null, 2));
  console.log(JSON.stringify({ state: receipt.state, operation: operation.name, scope: report.scope }));
})().catch((error) => {
  console.error(JSON.stringify({
    ok: false,
    phase,
    error: "deployment_guard_or_request_failed",
    status: error.response?.status || null,
    detail: error instanceof assert.AssertionError ? error.message : undefined,
    operation: receipt?.operation || null,
  }));
  process.exitCode = 1;
});
