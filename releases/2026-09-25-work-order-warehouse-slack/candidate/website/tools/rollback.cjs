"use strict";

// Explicit source-only rollback to the exact ACTIVE00061 archive. This never
// restores or modifies Firestore, Storage data, credentials, or runtime config.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const { client, request } = require("../../ops-reliability-20260922/cloud.cjs");

const CF = "https://cloudfunctions.googleapis.com/v2/";
const parent = "projects/magmo-ac10c/locations/us-west2";
const functionName = `${parent}/functions/nextServerWest`;
const file = (name) => path.join(__dirname, name);
const json = (name) => JSON.parse(fs.readFileSync(file(name), "utf8"));
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const stable = (value) => Array.isArray(value)
  ? value.map(stable)
  : value && typeof value === "object"
    ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]))
    : value;

function configHash(fn) {
  const service = structuredClone(fn.serviceConfig);
  const build = structuredClone(fn.buildConfig);
  for (const key of ["revision", "uri", "service"]) delete service[key];
  for (const key of ["source", "sourceProvenance", "build"]) delete build[key];
  return sha256(JSON.stringify(stable({ service, build, labels: fn.labels })));
}

let phase = "preflight";
let receipt;
(async () => {
  const baseline = json("baseline.json");
  const deployed = json("deployment-receipt.json");
  const bytes = fs.readFileSync(file("source.zip"));
  assert.equal(baseline.revision, "nextserverwest-00061-rej");
  assert.equal(sha256(bytes), baseline.archiveSHA256);
  assert.equal(deployed.state, "ACTIVE", "Only rollback a confirmed deployment.");

  if (process.argv.includes("--status")) {
    receipt = json("rollback-receipt.json");
    assert(receipt.operation, "Ambiguous rollback: never repeat automatically.");
    const operation = await request(CF + receipt.operation);
    if (!operation.done) {
      process.stdout.write(JSON.stringify({
        state: "ROLLING_BACK",
        stages: operation.metadata?.stages?.map(({ name, state }) => ({ name, state })),
      }, null, 2) + "\n");
      return;
    }
    assert(!operation.error);
    const after = await request(CF + functionName);
    assert.equal(after.state, "ACTIVE");
    assert.equal(configHash(after), deployed.configHash);
    assert.equal(after.buildConfig.runtime, baseline.runtime);
    assert.equal(after.buildConfig.entryPoint, baseline.entryPoint);
    const storage = after.buildConfig.source.storageSource;
    const { data } = await client.request({
      url: `https://storage.googleapis.com/storage/v1/b/${storage.bucket}/o/${encodeURIComponent(storage.object)}`,
      params: { alt: "media", generation: storage.generation },
      responseType: "arraybuffer",
      timeout: 60000,
    });
    assert.equal(sha256(Buffer.from(data)), baseline.archiveSHA256);
    Object.assign(receipt, {
      state: "ACTIVE",
      completedAt: new Date().toISOString(),
      revision: after.serviceConfig.revision,
      source: after.buildConfig.source,
      configurationPreserved: true,
      dataRestored: false,
    });
    fs.writeFileSync(file("rollback-receipt.json"), JSON.stringify(receipt, null, 2) + "\n");
    process.stdout.write(JSON.stringify(receipt, null, 2) + "\n");
    return;
  }

  assert(!fs.existsSync(file("rollback-receipt.json")), "Rollback already submitted; use --status.");
  const before = await request(CF + functionName);
  assert.equal(before.state, "ACTIVE");
  assert.equal(before.serviceConfig.revision, deployed.revision, "Refusing to overwrite a later deployment.");
  assert.deepEqual(before.buildConfig.source, deployed.deployedSource);
  assert.equal(configHash(before), deployed.configHash);

  if (!process.argv.includes("--apply")) {
    process.stdout.write(JSON.stringify({
      ready: true,
      changed: false,
      currentRevision: before.serviceConfig.revision,
      rollbackArchiveSHA256: baseline.archiveSHA256,
      restoresRevisionSource: baseline.revision,
      runtime: baseline.runtime,
      entryPoint: baseline.entryPoint,
      region: baseline.region,
      sourceOnly: true,
      dataWillBeRestored: false,
    }, null, 2) + "\n");
    return;
  }

  phase = "upload";
  const upload = await request(CF + `${parent}/functions:generateUploadUrl`, "POST", {});
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
  assert.equal(configHash(latest), deployed.configHash);

  receipt = {
    state: "SUBMITTING",
    startedAt: new Date().toISOString(),
    previousRevision: before.serviceConfig.revision,
    previousSource: before.buildConfig.source,
    restoredFromRevision: baseline.revision,
    archiveSHA256: baseline.archiveSHA256,
    configHash: deployed.configHash,
    runtime: baseline.runtime,
    entryPoint: baseline.entryPoint,
    region: baseline.region,
    sourceOnly: true,
    dataRestored: false,
  };
  fs.writeFileSync(file("rollback-receipt.json"), JSON.stringify(receipt, null, 2) + "\n");
  phase = "patch";
  const operation = await request(CF + functionName, "PATCH", {
    name: functionName,
    buildConfig: { source: { storageSource: upload.storageSource } },
  }, { updateMask: "buildConfig.source" });
  Object.assign(receipt, { state: "ROLLING_BACK", operation: operation.name });
  fs.writeFileSync(file("rollback-receipt.json"), JSON.stringify(receipt, null, 2) + "\n");
  process.stdout.write(JSON.stringify({ state: receipt.state, operation: operation.name, sourceOnly: true }) + "\n");
})().catch((error) => {
  process.stderr.write(JSON.stringify({
    ok: false,
    phase,
    error: "rollback_guard_or_request_failed",
    status: error.response?.status || null,
    detail: error instanceof assert.AssertionError ? error.message : undefined,
    operation: receipt?.operation || null,
  }) + "\n");
  process.exitCode = 1;
});

