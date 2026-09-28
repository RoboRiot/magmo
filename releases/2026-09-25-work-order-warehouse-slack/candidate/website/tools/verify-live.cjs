"use strict";

// Read-only post-deployment verification. It downloads source and performs
// public GET/method/auth checks only; it never authenticates or posts to Slack.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const { client, request } = require("../../ops-reliability-20260922/cloud.cjs");

const CF = "https://cloudfunctions.googleapis.com/v2/";
const functionName = "projects/magmo-ac10c/locations/us-west2/functions/nextServerWest";
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

async function publicRequest(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: { "Cache-Control": "no-cache", ...(options.headers || {}) },
    signal: AbortSignal.timeout(20000),
  });
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
  const liveArchiveSHA256 = sha256(Buffer.from(data));
  assert.equal(liveArchiveSHA256, receipt.artifactSHA256);
  assert.equal(liveArchiveSHA256, sha256(fs.readFileSync(file("artifact.zip"))));

  phase = "health";
  const healthResponse = await publicRequest("https://magmo.cloud/api/ops/health");
  assert.equal(healthResponse.status, 200);
  const health = await healthResponse.json();
  assert.equal(health.bluefolderStatusSync?.statusOnly, true);
  for (const key of ["createsWorkOrders", "createsSlackPosts", "writesSlack", "writesBlueFolder", "deletesMessages", "modifiesHours"]) {
    assert.equal(health.bluefolderStatusSync?.[key], false, key);
  }

  phase = "public_assets";
  const pageResponse = await publicRequest("https://magmo.cloud/NewSearch/mainSearch");
  assert.equal(pageResponse.status, 200);
  assert((await pageResponse.text()).includes(report.newBuildId));
  const pageAsset = await publicRequest(`https://magmo.cloud/_next/${report.newPage}`);
  assert.equal(pageAsset.status, 200);
  assert.equal(sha256(Buffer.from(await pageAsset.arrayBuffer())), sha256(fs.readFileSync(path.join(file("scoped-source/.next"), report.newPage))));
  const cssAsset = await publicRequest(`https://magmo.cloud/_next/${report.newCss}`);
  assert.equal(cssAsset.status, 200);
  assert.equal(sha256(Buffer.from(await cssAsset.arrayBuffer())), sha256(fs.readFileSync(path.join(file("scoped-source/.next"), report.newCss))));

  phase = "public_method_auth_gates";
  const checks = [];
  for (const [name, url, options, expected] of [
    ["workOrderSlackMethod", "https://magmo.cloud/api/items/work-order-add/slack", { method: "GET" }, 405],
    ["workOrderSlackAuth", "https://magmo.cloud/api/items/work-order-add/slack", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" }, 401],
    ["legacySlackMethod", "https://magmo.cloud/api/slack/add-to-list", { method: "GET" }, 405],
    ["optionsMethod", "https://magmo.cloud/api/items/work-order-add/options", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" }, 405],
    ["confirmMethod", "https://magmo.cloud/api/items/work-order-add/confirm", { method: "GET" }, 405],
  ]) {
    const response = await publicRequest(url, options);
    assert.equal(response.status, expected, name);
    checks.push({ name, status: response.status });
  }

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
    candidateBuildId: report.newBuildId,
    exactReviewedArtifact: true,
    unrelatedConfigurationPreserved: true,
    healthStatus: healthResponse.status,
    closeStatusSyncPreserved: true,
    publicAssetsVerified: [report.newPage, report.newCss],
    publicChecks: checks,
    noAuthenticatedRequests: true,
    noDataWrites: true,
    noSlackWrites: true,
    noBlueFolderWrites: true,
  };
  fs.writeFileSync(file("live-verification.json"), JSON.stringify(result, null, 2) + "\n");
  process.stdout.write(JSON.stringify(result, null, 2) + "\n");
})().catch((error) => {
  process.stderr.write(JSON.stringify({
    ok: false,
    phase,
    error: "read_only_verification_failed",
    status: error.response?.status || null,
    detail: error instanceof assert.AssertionError ? error.message : undefined,
  }) + "\n");
  process.exitCode = 1;
});
