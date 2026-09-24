"use strict";
// Explicit source-only rollback. Inventory data and runtime configuration are never restored.
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), assert = require("node:assert/strict");
const { client, request } = require("../ops-reliability-20260922/cloud.cjs");
const CF = "https://cloudfunctions.googleapis.com/v2/", parent = "projects/magmo-ac10c/locations/us-west2", name = parent + "/functions/nextServerWest";
const file = (value) => path.join(__dirname, value), json = (value) => JSON.parse(fs.readFileSync(file(value), "utf8"));
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const stable = (value) => Array.isArray(value) ? value.map(stable) : value && typeof value === "object" ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])])) : value;
function configHash(fn) {
  const service = structuredClone(fn.serviceConfig), build = structuredClone(fn.buildConfig);
  for (const key of ["revision", "uri", "service"]) delete service[key];
  for (const key of ["source", "sourceProvenance", "build"]) delete build[key];
  return sha(JSON.stringify(stable({ service, build, labels: fn.labels })));
}
let phase = "preflight", receipt;
(async () => {
  const baseline = json("baseline.json"), deployed = json("deployment-receipt.json");
  const bytes = fs.readFileSync(file("source.zip")); assert.equal(sha(bytes), baseline.archiveSHA256);
  assert.equal(deployed.state, "ACTIVE", "Only rollback a confirmed deployment");
  if (process.argv.includes("--status")) {
    receipt = json("rollback-receipt.json"); assert(receipt.operation, "Ambiguous submission: never repeat automatically");
    const operation = await request(CF + receipt.operation);
    if (!operation.done) { console.log(JSON.stringify({ state: "ROLLING_BACK", stages: operation.metadata?.stages?.map((stage) => ({ name: stage.name, state: stage.state })) })); return; }
    assert(!operation.error);
    const after = await request(CF + name); assert.equal(after.state, "ACTIVE"); assert.equal(configHash(after), deployed.configHash);
    const storage = after.buildConfig.source.storageSource;
    const { data } = await client.request({ url: `https://storage.googleapis.com/storage/v1/b/${storage.bucket}/o/${encodeURIComponent(storage.object)}`, params: { alt: "media", generation: storage.generation }, responseType: "arraybuffer", timeout: 60000 });
    assert.equal(sha(Buffer.from(data)), baseline.archiveSHA256);
    Object.assign(receipt, { state: "ACTIVE", completedAt: new Date().toISOString(), revision: after.serviceConfig.revision, source: after.buildConfig.source, configurationPreserved: true, dataRestored: false });
    fs.writeFileSync(file("rollback-receipt.json"), JSON.stringify(receipt, null, 2)); console.log(JSON.stringify(receipt, null, 2)); return;
  }
  assert(!fs.existsSync(file("rollback-receipt.json")), "Rollback already submitted: use --status");
  const before = await request(CF + name); assert.equal(before.state, "ACTIVE");
  assert.equal(before.serviceConfig.revision, deployed.revision, "Do not overwrite a later deployment");
  assert.deepEqual(before.buildConfig.source, deployed.deployedSource); assert.equal(configHash(before), deployed.configHash);
  if (!process.argv.includes("--apply")) { console.log(JSON.stringify({ ready: true, changed: false, rollbackArchiveSHA256: baseline.archiveSHA256, sourceOnly: true, dataWillBeRestored: false })); return; }
  phase = "upload";
  const upload = await request(CF + parent + "/functions:generateUploadUrl", "POST", {});
  const sent = await fetch(upload.uploadUrl, { method: "PUT", headers: { "Content-Type": "application/zip" }, body: bytes, signal: AbortSignal.timeout(60000) }); assert(sent.ok);
  const latest = await request(CF + name); assert.equal(latest.updateTime, before.updateTime); assert.equal(configHash(latest), deployed.configHash);
  receipt = { state: "SUBMITTING", startedAt: new Date().toISOString(), previousRevision: before.serviceConfig.revision, restoredFromRevision: baseline.revision, archiveSHA256: baseline.archiveSHA256, sourceOnly: true, dataRestored: false };
  fs.writeFileSync(file("rollback-receipt.json"), JSON.stringify(receipt, null, 2));
  phase = "patch";
  const operation = await request(CF + name, "PATCH", { name, buildConfig: { source: { storageSource: upload.storageSource } } }, { updateMask: "buildConfig.source" });
  Object.assign(receipt, { state: "ROLLING_BACK", operation: operation.name }); fs.writeFileSync(file("rollback-receipt.json"), JSON.stringify(receipt, null, 2));
  console.log(JSON.stringify({ state: receipt.state, operation: operation.name, sourceOnly: true }));
})().catch((error) => { console.error(JSON.stringify({ ok: false, phase, error: "rollback_guard_or_request_failed", status: error.response?.status || null, operation: receipt?.operation || null })); process.exitCode = 1; });
