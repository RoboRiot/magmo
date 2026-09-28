"use strict";

// Guarded source-only deployment. Read-only unless --apply is explicit. Once
// submitted, use --status; never repeat an ambiguous deployment submission.
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
  const report = json("composition-report.json");
  const gates = json("package-gates.json");
  assert.equal(baseline.revision, "nextserverwest-00061-rej");
  assert.equal(baseline.runtime, "nodejs22");
  assert.equal(baseline.entryPoint, "nextServerWest");
  assert.equal(baseline.region, "us-west2");
  assert.equal(report.baselineRevision, baseline.revision);
  assert.equal(report.baselineUpdateTime, baseline.updateTime);
  assert.equal(report.baselineArchiveSHA256, baseline.archiveSHA256);
  assert.equal(report.baselineConfigSHA256, baseline.configHash);
  assert.equal(report.newBuildId, "wo-warehouse-slack-b13cffa6e1541257");
  assert.equal(report.runtimeConfigChanged, false);
  assert.equal(report.noDeletedFiles, true);
  assert.equal(report.unrelatedFilesPreserved, true);
  assert.deepEqual(report.forbiddenNames, []);
  assert.deepEqual(report.embeddedSensitiveNames, []);
  assert.deepEqual(report.buildWorkspaceLeaks, []);

  if (process.argv.includes("--status")) {
    receipt = json("deployment-receipt.json");
    assert(receipt.operation, "Ambiguous submission: never submit again; inspect status.");
    const operation = await request(CF + receipt.operation);
    if (!operation.done) {
      process.stdout.write(JSON.stringify({
        state: "DEPLOYING",
        stages: operation.metadata?.stages?.map(({ name, state }) => ({ name, state })),
      }, null, 2) + "\n");
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
    assert.equal(sha256(Buffer.from(data)), receipt.artifactSHA256);
    Object.assign(receipt, {
      state: "ACTIVE",
      completedAt: new Date().toISOString(),
      revision: after.serviceConfig.revision,
      deployedSource: after.buildConfig.source,
      deployedUpdateTime: after.updateTime,
      unrelatedConfigurationPreserved: true,
    });
    fs.writeFileSync(file("deployment-receipt.json"), JSON.stringify(receipt, null, 2) + "\n");
    process.stdout.write(JSON.stringify(receipt, null, 2) + "\n");
    return;
  }

  assert(gates.ok && gates.rootReviewed && gates.exactArtifactTestsPassed);
  assert.equal(gates.exactArtifactTestCount, 21);
  assert.equal(gates.compiledUiPassed, true);
  assert.equal(gates.compiledUiScopePassed, true);
  assert.equal(gates.independentBackendReviewPassed, true);
  assert.equal(gates.rootIndependentByteVerificationPassed, true);
  assert.equal(gates.zipEntriesVerified, 490);
  assert.equal(gates.compositionReportSHA256, sha256(fs.readFileSync(file("composition-report.json"))));
  const bytes = fs.readFileSync(file("artifact.zip"));
  assert.equal(sha256(bytes), gates.artifactSHA256);
  assert.equal(sha256(fs.readFileSync(file("source.zip"))), baseline.archiveSHA256);
  assert(!fs.existsSync(file("deployment-receipt.json")), "Deployment receipt exists; use --status.");

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
    process.stdout.write(JSON.stringify({
      ok: true,
      mode: "read_only",
      baselineRevision: baseline.revision,
      baselineUpdateTime: baseline.updateTime,
      runtime: baseline.runtime,
      entryPoint: baseline.entryPoint,
      region: baseline.region,
      sourceOnly: true,
      artifactSHA256: sha256(bytes),
      rollbackArchiveSHA256: baseline.archiveSHA256,
      configHash: configHash(before),
      candidateBuildId: report.newBuildId,
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
  assert.equal(configHash(latest), configHash(before));

  receipt = {
    state: "SUBMITTING",
    startedAt: new Date().toISOString(),
    originalRevision: before.serviceConfig.revision,
    originalUpdateTime: before.updateTime,
    originalSource: before.buildConfig.source,
    artifactSHA256: sha256(bytes),
    compositionReportSHA256: gates.compositionReportSHA256,
    candidateBuildId: report.newBuildId,
    rollbackArchiveSHA256: baseline.archiveSHA256,
    configHash: configHash(before),
    runtime: baseline.runtime,
    entryPoint: baseline.entryPoint,
    region: baseline.region,
    scope: "work-order warehouse defaults and opt-in post-save Slack popup",
    rollbackArchive: "source.zip",
    sourceOnly: true,
    databaseWrites: 0,
  };
  fs.writeFileSync(file("deployment-receipt.json"), JSON.stringify(receipt, null, 2) + "\n");
  phase = "patch";
  const operation = await request(CF + functionName, "PATCH", {
    name: functionName,
    buildConfig: { source: { storageSource: upload.storageSource } },
  }, { updateMask: "buildConfig.source" });
  Object.assign(receipt, { state: "DEPLOYING", operation: operation.name });
  fs.writeFileSync(file("deployment-receipt.json"), JSON.stringify(receipt, null, 2) + "\n");
  process.stdout.write(JSON.stringify({ state: receipt.state, operation: operation.name, sourceOnly: true }) + "\n");
})().catch((error) => {
  process.stderr.write(JSON.stringify({
    ok: false,
    phase,
    error: "deployment_guard_or_request_failed",
    status: error.response?.status || null,
    detail: error instanceof assert.AssertionError ? error.message : undefined,
    operation: receipt?.operation || null,
  }) + "\n");
  process.exitCode = 1;
});
