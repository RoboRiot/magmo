"use strict";

// Read-only verification: function metadata, downloaded source, public health,
// and known work-order destinations. This script performs no application writes.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const { client, request } = require("../ops-reliability-20260922/cloud.cjs");

const CF = "https://cloudfunctions.googleapis.com/v2/";
const functionName = "projects/magmo-ac10c/locations/us-west2/functions/nextServerWest";
const file = (name) => path.join(__dirname, name);
const json = (name) => JSON.parse(fs.readFileSync(file(name), "utf8"));
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
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
  return sha(JSON.stringify(stable({ service, build, labels: fn.labels })));
}

function stringField(document, name) {
  return document.fields?.[name]?.stringValue || "";
}

let phase = "metadata";
(async () => {
  const receipt = json("deployment-receipt.json");
  const report = json("composition-report.json");
  assert.equal(receipt.state, "ACTIVE");

  const fn = await request(CF + functionName);
  assert.equal(fn.state, "ACTIVE");
  assert.equal(fn.serviceConfig.revision, receipt.revision);
  assert.deepEqual(fn.buildConfig.source, receipt.deployedSource);
  assert.equal(fn.buildConfig.runtime, "nodejs22");
  assert.equal(fn.buildConfig.entryPoint, "nextServerWest");
  assert.equal(configHash(fn), receipt.configHash);

  phase = "downloaded_source";
  const storage = fn.buildConfig.source.storageSource;
  const { data } = await client.request({
    url: `https://storage.googleapis.com/storage/v1/b/${storage.bucket}/o/${encodeURIComponent(storage.object)}`,
    params: { alt: "media", generation: storage.generation },
    responseType: "arraybuffer",
    timeout: 60000,
  });
  const liveArchiveSHA256 = sha(Buffer.from(data));
  assert.equal(liveArchiveSHA256, receipt.artifactSHA256);
  assert.equal(liveArchiveSHA256, sha(fs.readFileSync(file("artifact.zip"))));

  phase = "health";
  const healthResponse = await fetch("https://magmo.cloud/api/ops/health", {
    headers: { "Cache-Control": "no-cache" },
    signal: AbortSignal.timeout(20000),
  });
  assert.equal(healthResponse.status, 200);
  const health = await healthResponse.json();
  assert.equal(health.bluefolderStatusSync?.statusOnly, true);
  for (const key of ["createsWorkOrders", "createsSlackPosts", "writesSlack", "writesBlueFolder", "deletesMessages", "modifiesHours"]) {
    assert.equal(health.bluefolderStatusSync?.[key], false, key);
  }

  phase = "read_only_work_orders";
  const verifiedOrders = [];
  for (const [id, expectedClient, expectedMachine, expectedTrailer, expectClientRef] of [
    ["10658", "AIS94688", "", "", false],
    ["10659", "AIS78594", "AIS82553", "AIS20", true],
    ["10677", "AIS79109", "AIS32820", "", true],
  ]) {
    const document = await request(`https://firestore.googleapis.com/v1/projects/magmo-ac10c/databases/(default)/documents/OpsWorkOrders/${id}`);
    const actual = {
      workOrderId: id,
      clientId: stringField(document, "clientId"),
      machineId: stringField(document, "machineId"),
      trailerId: stringField(document, "trailerId"),
      verifiedBy: "read-only Firestore REST GET",
    };
    assert.equal(actual.clientId, expectedClient);
    assert.equal(actual.machineId, expectedMachine);
    assert.equal(actual.trailerId, expectedTrailer);
    if (expectClientRef) assert(document.fields.clientRef?.referenceValue.endsWith(`/Client/${expectedClient}`), `${id} clientRef`);
    if (expectedMachine) assert(document.fields.machineRef?.referenceValue.endsWith(`/Machine/${expectedMachine}`), `${id} machineRef`);
    if (expectedTrailer) assert(document.fields.trailerRef?.referenceValue.endsWith(`/Trailers/${expectedTrailer}`), `${id} trailerRef`);
    verifiedOrders.push(actual);
  }

  phase = "public_runtime";
  const pageResponse = await fetch("https://magmo.cloud/NewSearch/mainSearch", {
    headers: { "Cache-Control": "no-cache" },
    signal: AbortSignal.timeout(20000),
  });
  assert.equal(pageResponse.status, 200);
  assert((await pageResponse.text()).includes(report.unchangedBuildId));

  const result = {
    checkedAt: new Date().toISOString(),
    state: fn.state,
    revision: fn.serviceConfig.revision,
    sourceGeneration: storage.generation,
    runtime: fn.buildConfig.runtime,
    entryPoint: fn.buildConfig.entryPoint,
    region: "us-west2",
    liveArchiveSHA256,
    configHash: configHash(fn),
    exactReviewedArtifact: true,
    unrelatedConfigurationPreserved: true,
    healthStatus: healthResponse.status,
    closeStatusSyncPreserved: true,
    unchangedBuildId: report.unchangedBuildId,
    verifiedOrders,
    noDataWrites: true,
    noSlackWrites: true,
    noBlueFolderWrites: true,
  };
  fs.writeFileSync(file("live-verification.json"), JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
})().catch((error) => {
  console.error(JSON.stringify({
    ok: false,
    phase,
    error: "read_only_verification_failed",
    status: error.response?.status || null,
    detail: error instanceof assert.AssertionError ? error.message : undefined,
  }));
  process.exitCode = 1;
});
