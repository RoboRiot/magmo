"use strict";

const { fs, assert, request, CF, parent, functionName, file, json, sha256, configHash, getFunction, archiveHash, writeReceipt } = require("./cloud-common.cjs");
let phase = "preflight";
let receipt;

(async () => {
  const baseline = json("baseline.json");
  const deployed = json("metadata-deployment-receipt.json");
  const bytes = fs.readFileSync(file("source.zip"));
  assert.equal(baseline.revision, "nextserverwest-00075-rod");
  assert.equal(sha256(bytes), "8f7046a9121d8076cf4be67701cd2612ff5084c7bbd25a776c8ac09606ee63fb");
  assert.equal(deployed.state, "ACTIVE");
  assert.equal(deployed.configHash, baseline.configHash);
  if (process.argv.includes("--status")) {
    receipt = json("rollback-final-receipt.json");
    assert(receipt.operation, "Ambiguous rollback; never resubmit.");
    const operation = await request(CF + receipt.operation);
    if (!operation.done) { console.log(JSON.stringify({ state: "ROLLING_BACK", stages: operation.metadata?.stages?.map(({ name, state }) => ({ name, state })) })); return; }
    assert(!operation.error);
    const after = await getFunction();
    assert.equal(after.state, "ACTIVE");
    assert.equal(configHash(after), baseline.configHash);
    assert.equal(await archiveHash(after), baseline.archiveSHA256);
    Object.assign(receipt, { state: "ACTIVE", completedAt: new Date().toISOString(), revision: after.serviceConfig.revision, source: after.buildConfig.source, configurationPreserved: true, dataRestored: false, rulesRestored: false });
    writeReceipt("rollback-final-receipt.json", receipt);
    console.log(JSON.stringify(receipt, null, 2));
    return;
  }
  assert(!fs.existsSync(file("rollback-final-receipt.json")), "Rollback already journaled; use --status only.");
  const before = await getFunction();
  assert.equal(before.state, "ACTIVE");
  assert.equal(before.serviceConfig.revision, deployed.revision, "Refusing to overwrite a later deployment.");
  assert.equal(before.updateTime, deployed.deployedUpdateTime);
  assert.deepEqual(before.buildConfig.source, deployed.deployedSource);
  assert.equal(configHash(before), baseline.configHash);
  assert.equal(await archiveHash(before), deployed.artifactSHA256);
  if (!process.argv.includes("--apply")) {
    console.log(JSON.stringify({ ready: true, changed: false, currentRevision: before.serviceConfig.revision, sourceOnly: true, rollbackArchiveSHA256: baseline.archiveSHA256, restoredFromRevision: baseline.revision, dataWillBeRestored: false, rulesWillBeRestored: false }, null, 2));
    return;
  }
  const approval = json("rollback-final-approval.json");
  assert.equal(approval.rollbackApproved, true);
  assert.equal(approval.fromRevision, deployed.revision);
  assert.equal(approval.archiveSHA256, baseline.archiveSHA256);
  assert.equal(approval.toolSHA256, sha256(fs.readFileSync(file("rollback-final.cjs"))));
  assert.equal(approval.commonToolSHA256, sha256(fs.readFileSync(file("cloud-common.cjs"))));
  phase = "upload";
  const upload = await request(CF + `${parent}/functions:generateUploadUrl`, "POST", {});
  const sent = await fetch(upload.uploadUrl, { method: "PUT", headers: { "Content-Type": "application/zip" }, body: bytes, signal: AbortSignal.timeout(60_000) });
  assert(sent.ok);
  const latest = await getFunction();
  assert.equal(latest.updateTime, before.updateTime);
  assert.deepEqual(latest.buildConfig.source, before.buildConfig.source);
  assert.equal(configHash(latest), baseline.configHash);
  assert.equal(await archiveHash(latest), deployed.artifactSHA256);
  receipt = { state: "SUBMITTING", startedAt: new Date().toISOString(), previousRevision: before.serviceConfig.revision, previousSource: before.buildConfig.source, restoredFromRevision: baseline.revision, archiveSHA256: baseline.archiveSHA256, configHash: baseline.configHash, sourceOnly: true, dataRestored: false, rulesRestored: false };
  writeReceipt("rollback-final-receipt.json", receipt, true);
  phase = "patch";
  const operation = await request(CF + functionName, "PATCH", { name: functionName, buildConfig: { source: { storageSource: upload.storageSource } } }, { updateMask: "buildConfig.source" });
  Object.assign(receipt, { state: "ROLLING_BACK", operation: operation.name });
  writeReceipt("rollback-final-receipt.json", receipt);
  console.log(JSON.stringify({ state: receipt.state, operation: receipt.operation, sourceOnly: true }));
})().catch((error) => {
  console.error(JSON.stringify({ ok: false, phase, error: "rollback_guard_or_request_failed", status: error.response?.status || null, detail: error instanceof assert.AssertionError ? error.message : undefined, operation: receipt?.operation || null }));
  process.exitCode = 1;
});
