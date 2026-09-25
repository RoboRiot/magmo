"use strict";
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), assert = require("node:assert/strict");
const { client, request } = require("../ops-reliability-20260922/cloud.cjs");
const CF = "https://cloudfunctions.googleapis.com/v2/", parent = "projects/magmo-ac10c/locations/us-west2", name = parent + "/functions/nextServerWest";
const file = (name) => path.join(__dirname, name), json = (name) => JSON.parse(fs.readFileSync(file(name), "utf8"));
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const stable = (value) => Array.isArray(value) ? value.map(stable) : value && typeof value === "object" ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])])) : value;
function configHash(fn) {
  const service = structuredClone(fn.serviceConfig), build = structuredClone(fn.buildConfig);
  for (const key of ["revision", "uri", "service"]) delete service[key];
  for (const key of ["source", "sourceProvenance", "build"]) delete build[key];
  return sha(JSON.stringify(stable({ service, build, labels: fn.labels })));
}
let phase = "preflight", rollback;
(async () => {
  const baseline = json("baseline.json"), deployed = json("deployment-receipt.json");
  assert.equal(deployed.state, "ACTIVE", "Complete deployment status verification before rollback");
  const archive = fs.readFileSync(file("source.zip")); assert.equal(sha(archive), baseline.archiveSHA256);
  if (process.argv.includes("--status")) {
    rollback = json("rollback-receipt.json"); assert(rollback.operation, "Missing rollback operation");
    const operation = await request(CF + rollback.operation);
    if (!operation.done) { console.log(JSON.stringify({ state: "ROLLING_BACK", stages: operation.metadata?.stages?.map((stage) => ({ name: stage.name, state: stage.state })) })); return; }
    assert(!operation.error);
    const after = await request(CF + name); assert.equal(after.state, "ACTIVE"); assert.notEqual(after.serviceConfig.revision, deployed.revision); assert.equal(configHash(after), deployed.configHash);
    assert.equal(after.buildConfig.runtime, "nodejs22"); assert.equal(after.buildConfig.entryPoint, "nextServerWest");
    const storage = after.buildConfig.source.storageSource;
    const { data } = await client.request({ url: `https://storage.googleapis.com/storage/v1/b/${storage.bucket}/o/${encodeURIComponent(storage.object)}`, params: { alt: "media", generation: storage.generation }, responseType: "arraybuffer", timeout: 60000 });
    assert.equal(sha(Buffer.from(data)), baseline.archiveSHA256);
    Object.assign(rollback, { state: "ACTIVE_BASELINE_RESTORED", completedAt: new Date().toISOString(), revision: after.serviceConfig.revision, deployedSource: after.buildConfig.source });
    fs.writeFileSync(file("rollback-receipt.json"), JSON.stringify(rollback, null, 2)); console.log(JSON.stringify(rollback, null, 2)); return;
  }
  assert(!fs.existsSync(file("rollback-receipt.json")), "Existing rollback receipt: check status instead of repeating");
  const before = await request(CF + name); assert.equal(before.state, "ACTIVE"); assert.equal(before.serviceConfig.revision, deployed.revision); assert.deepEqual(before.buildConfig.source, deployed.deployedSource); assert.equal(configHash(before), deployed.configHash);
  if (!process.argv.includes("--apply")) { console.log(JSON.stringify({ ok: true, mode: "read_only", currentRevision: deployed.revision, restoreSourceGeneration: baseline.source.storageSource.generation, sourceOnly: true, archiveSHA256: baseline.archiveSHA256 })); return; }
  phase = "upload";
  const upload = await request(CF + parent + "/functions:generateUploadUrl", "POST", {});
  const sent = await fetch(upload.uploadUrl, { method: "PUT", headers: { "Content-Type": "application/zip" }, body: archive, signal: AbortSignal.timeout(60000) }); assert(sent.ok);
  const latest = await request(CF + name); assert.equal(latest.updateTime, before.updateTime); assert.equal(configHash(latest), configHash(before));
  rollback = { state: "SUBMITTING", startedAt: new Date().toISOString(), fromRevision: deployed.revision, archiveSHA256: baseline.archiveSHA256, configHash: deployed.configHash };
  fs.writeFileSync(file("rollback-receipt.json"), JSON.stringify(rollback, null, 2));
  phase = "patch";
  const operation = await request(CF + name, "PATCH", { name, buildConfig: { source: { storageSource: upload.storageSource } } }, { updateMask: "buildConfig.source" });
  Object.assign(rollback, { state: "ROLLING_BACK", operation: operation.name }); fs.writeFileSync(file("rollback-receipt.json"), JSON.stringify(rollback, null, 2));
  console.log(JSON.stringify({ state: rollback.state, operation: operation.name }));
})().catch((error) => { console.error(JSON.stringify({ ok: false, phase, error: "rollback_guard_or_request_failed", status: error.response?.status || null, operation: rollback?.operation || null })); process.exitCode = 1; });
