"use strict";
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), assert = require("node:assert/strict");
const { client, request } = require("../ops-reliability-20260922/cloud.cjs");
const CF = "https://cloudfunctions.googleapis.com/v2/", parent = "projects/magmo-ac10c/locations/us-west2", name = parent + "/functions/nextServerWest";
const file = (name) => path.join(__dirname, name), json = (name) => JSON.parse(fs.readFileSync(file(name), "utf8"));
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const stable = (value) => Array.isArray(value) ? value.map(stable) : value && typeof value === "object" ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])])) : value;
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
function configHash(fn) {
  const service = structuredClone(fn.serviceConfig), build = structuredClone(fn.buildConfig);
  for (const key of ["revision", "uri", "service"]) delete service[key];
  for (const key of ["source", "sourceProvenance", "build"]) delete build[key];
  return sha(JSON.stringify(stable({ service, build, labels: fn.labels })));
}
let phase = "preflight", receipt;
(async () => {
  const baseline = json("baseline.json"), report = json("composition-report.json");
  assert.deepEqual(report.entries.map((entry) => entry.path), ["machine-link/workOrderMachineLink.cjs"], "One-file helper overlay only");
  if (process.argv.includes("--status")) {
    receipt = json("deployment-receipt.json");
    assert(receipt.operation, "Ambiguous submission: never repeat automatically");
    const operation = await request(CF + receipt.operation);
    if (!operation.done) { console.log(JSON.stringify({ state: "DEPLOYING", stages: operation.metadata?.stages?.map((stage) => ({ name: stage.name, state: stage.state })) })); return; }
    assert(!operation.error);
    const after = await request(CF + name);
    assert.equal(after.state, "ACTIVE"); assert.notEqual(after.serviceConfig.revision, baseline.revision); assert.equal(configHash(after), receipt.configHash);
    const storage = after.buildConfig.source.storageSource;
    const { data } = await client.request({ url: `https://storage.googleapis.com/storage/v1/b/${storage.bucket}/o/${encodeURIComponent(storage.object)}`, params: { alt: "media", generation: storage.generation }, responseType: "arraybuffer", timeout: 60000 });
    assert.equal(sha(Buffer.from(data)), receipt.artifactSHA256);
    Object.assign(receipt, { state: "ACTIVE", completedAt: new Date().toISOString(), revision: after.serviceConfig.revision, deployedSource: after.buildConfig.source, unrelatedConfigurationPreserved: true });
    fs.writeFileSync(file("deployment-receipt.json"), JSON.stringify(receipt, null, 2)); console.log(JSON.stringify(receipt, null, 2)); return;
  }
  const gates = json("package-gates.json");
  assert(gates.ok && gates.rootReviewed && gates.exactArtifactTestsPassed && report.unrelatedFilesPreserved);
  const source = file("source"), out = file(report.sourceDirectory), declared = new Map(report.entries.map((entry) => [entry.path, entry]));
  for (const old of walk(source)) {
    const relative = path.relative(source, old).replaceAll("\\", "/"); assert(fs.existsSync(path.join(out, relative)));
    if (!declared.has(relative)) assert.equal(sha(fs.readFileSync(old)), sha(fs.readFileSync(path.join(out, relative))), relative);
    else assert.equal(sha(fs.readFileSync(old)), declared.get(relative).before, relative);
  }
  for (const next of walk(out)) { const relative = path.relative(out, next).replaceAll("\\", "/"); if (!fs.existsSync(path.join(source, relative))) assert(declared.has(relative), relative); }
  for (const entry of report.entries) assert.equal(sha(fs.readFileSync(path.join(out, entry.path))), entry.after, entry.path);
  for (const [local, hash] of Object.entries(report.sourceHashes)) assert.equal(sha(fs.readFileSync(path.resolve(__dirname, "../..", local))), hash, local);
  const bytes = fs.readFileSync(file("artifact.zip")); assert.equal(sha(bytes), gates.artifactSHA256); assert.equal(sha(fs.readFileSync(file("source.zip"))), baseline.archiveSHA256);
  assert(!fs.existsSync(file("deployment-receipt.json")), "Existing receipt: check status instead of redeploying");
  const before = await request(CF + name);
  assert.equal(before.state, "ACTIVE"); assert.equal(before.serviceConfig.revision, baseline.revision); assert.equal(before.updateTime, baseline.updateTime); assert.deepEqual(before.buildConfig.source, baseline.source);
  assert.equal(before.buildConfig.environmentVariables.GOOGLE_NODE_RUN_SCRIPTS, "");
  if (!process.argv.includes("--apply")) { console.log(JSON.stringify({ ok: true, mode: "read_only", baseline: baseline.revision, sourceOnly: true, artifactSHA256: sha(bytes) })); return; }
  phase = "upload";
  const upload = await request(CF + parent + "/functions:generateUploadUrl", "POST", {});
  const sent = await fetch(upload.uploadUrl, { method: "PUT", headers: { "Content-Type": "application/zip" }, body: bytes, signal: AbortSignal.timeout(60000) }); assert(sent.ok);
  const latest = await request(CF + name); assert.equal(latest.updateTime, before.updateTime); assert.equal(configHash(latest), configHash(before));
  receipt = { state: "SUBMITTING", startedAt: new Date().toISOString(), originalRevision: before.serviceConfig.revision, originalSource: before.buildConfig.source, artifactSHA256: sha(bytes), configHash: configHash(before), scope: report.scope, rollbackArchive: "source.zip" };
  fs.writeFileSync(file("deployment-receipt.json"), JSON.stringify(receipt, null, 2));
  phase = "patch";
  const operation = await request(CF + name, "PATCH", { name, buildConfig: { source: { storageSource: upload.storageSource } } }, { updateMask: "buildConfig.source" });
  Object.assign(receipt, { state: "DEPLOYING", operation: operation.name }); fs.writeFileSync(file("deployment-receipt.json"), JSON.stringify(receipt, null, 2));
  console.log(JSON.stringify({ state: receipt.state, operation: operation.name, scope: report.scope }));
})().catch((error) => { console.error(JSON.stringify({ ok: false, phase, error: "deployment_guard_or_request_failed", status: error.response?.status || null, operation: receipt?.operation || null })); process.exitCode = 1; });
