"use strict";

const { fs, assert, request, CF, parent, functionName, file, json, sha256, configHash, getFunction, archiveHash, checkBaseline, writeReceipt } = require("./cloud-common.cjs");
let phase = "preflight";
let receipt;

(async () => {
  const baseline = json("baseline.json");
  assert.equal(baseline.revision, "nextserverwest-00070-liw");
  assert.equal(baseline.archiveSHA256, "e4201b19e44328e633c7f0c11f5bba377c5488a3d4ef57f881d921bdd843329e");
  assert.equal(sha256(fs.readFileSync(file("source.zip"))), baseline.archiveSHA256);
  if (process.argv.includes("--status")) {
    receipt = json("deployment-receipt.json");
    assert(receipt.operation, "Ambiguous submission; never resubmit.");
    const operation = await request(CF + receipt.operation);
    if (!operation.done) {
      console.log(JSON.stringify({ state: "DEPLOYING", stages: operation.metadata?.stages?.map(({ name, state }) => ({ name, state })) }));
      return;
    }
    assert(!operation.error, "Cloud deployment failed; inspect the existing operation.");
    const after = await getFunction();
    assert.equal(after.state, "ACTIVE");
    assert.notEqual(after.serviceConfig.revision, baseline.revision);
    assert.equal(configHash(after), baseline.configHash);
    assert.equal(await archiveHash(after), receipt.artifactSHA256);
    Object.assign(receipt, { state: "ACTIVE", completedAt: new Date().toISOString(), revision: after.serviceConfig.revision, deployedSource: after.buildConfig.source, deployedUpdateTime: after.updateTime, unrelatedConfigurationPreserved: true });
    writeReceipt("deployment-receipt.json", receipt);
    console.log(JSON.stringify(receipt, null, 2));
    return;
  }

  assert(!fs.existsSync(file("deployment-receipt.json")), "Submission journal already exists; only --status is permitted.");
  const report = json("composition-report.json");
  const gates = json("package-gates.json");
  const approval = json("root-approval.json");
  const bytes = fs.readFileSync(file("artifact.zip"));
  const artifactSHA256 = sha256(bytes);
  const reportHash = sha256(fs.readFileSync(file("composition-report.json")));
  assert.equal(gates.result, "PASS");
  assert.equal(gates.rootReviewed, true);
  assert.equal(gates.artifactSHA256, artifactSHA256);
  assert.equal(gates.compositionReportSHA256, reportHash);
  assert.equal(gates.sourceOnly, true);
  assert.equal(gates.compiledTestsPassed, true);
  assert.equal(gates.independentReviewPassed, true);
  assert.equal(approval.sourceOnlyApproved, true);
  assert.equal(approval.artifactSHA256, artifactSHA256);
  assert.equal(approval.packageGatesSHA256, sha256(fs.readFileSync(file("package-gates.json"))));
  assert.equal(approval.compositionReportSHA256, reportHash);
  assert.equal(approval.baselineArchiveSHA256, baseline.archiveSHA256);
  assert.equal(approval.baselineRevision, baseline.revision);
  assert.equal(approval.configHash, baseline.configHash);
  assert.equal(approval.databaseWritesAllowed, false);
  assert.equal(approval.testSlackPostsAllowed, false);
  for (const name of ["deploy.cjs", "cloud-common.cjs", "rollback.cjs", "verify-live.cjs"]) {
    assert.equal(approval.toolHashes?.[name], sha256(fs.readFileSync(file(name))), `Unapproved tool: ${name}`);
  }
  for (const [name, expected] of Object.entries(gates.receiptHashes)) {
    assert.equal(sha256(fs.readFileSync(file(name))), expected, `Changed gate receipt: ${name}`);
  }
  assert.equal(report.baselineArchiveSHA256, baseline.archiveSHA256);
  assert.equal(report.runtimeConfigChanged, false);
  assert.equal(report.noDeletedFiles, true);
  assert.equal(report.unrelatedFilesPreserved, true);
  assert.deepEqual(report.changedFactoryIds, [21704, 60992]);
  const before = await getFunction();
  checkBaseline(before, baseline);
  assert.equal(await archiveHash(before), baseline.archiveSHA256);
  if (!process.argv.includes("--apply")) {
    console.log(JSON.stringify({ ok: true, mode: "read_only", baselineRevision: baseline.revision, baselineGeneration: baseline.source.storageSource.generation, artifactSHA256, sourceOnly: true, configHash: baseline.configHash, rollbackArchiveSHA256: baseline.archiveSHA256 }, null, 2));
    return;
  }

  phase = "upload";
  const upload = await request(CF + `${parent}/functions:generateUploadUrl`, "POST", {});
  const sent = await fetch(upload.uploadUrl, { method: "PUT", headers: { "Content-Type": "application/zip" }, body: bytes, signal: AbortSignal.timeout(60_000) });
  assert(sent.ok, "Source upload failed.");
  const immediatelyBeforePatch = await getFunction();
  checkBaseline(immediatelyBeforePatch, baseline);
  assert.equal(await archiveHash(immediatelyBeforePatch), baseline.archiveSHA256);
  receipt = { state: "SUBMITTING", startedAt: new Date().toISOString(), originalRevision: baseline.revision, originalSource: baseline.source, originalUpdateTime: baseline.updateTime, artifactSHA256, compositionReportSHA256: reportHash, configHash: baseline.configHash, scope: "Work Order Add single three-choice confirmation popup and matching CSS module mapping only", sourceOnly: true, rollbackArchive: "source.zip", databaseWrites: 0, testSlackPosts: 0 };
  writeReceipt("deployment-receipt.json", receipt, true);
  phase = "patch";
  const operation = await request(CF + functionName, "PATCH", { name: functionName, buildConfig: { source: { storageSource: upload.storageSource } } }, { updateMask: "buildConfig.source" });
  Object.assign(receipt, { state: "DEPLOYING", operation: operation.name });
  writeReceipt("deployment-receipt.json", receipt);
  console.log(JSON.stringify({ state: receipt.state, operation: receipt.operation, sourceOnly: true }));
})().catch((error) => {
  console.error(JSON.stringify({ ok: false, phase, error: "deployment_guard_or_request_failed", status: error.response?.status || null, detail: error instanceof assert.AssertionError ? error.message : undefined, operation: receipt?.operation || null }));
  process.exitCode = 1;
});
