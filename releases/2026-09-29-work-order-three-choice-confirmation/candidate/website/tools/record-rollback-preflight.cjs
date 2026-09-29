"use strict";

const { fs, assert, file, json, sha256, configHash, getFunction, archiveHash, writeReceipt } = require("./cloud-common.cjs");

(async () => {
  assert(!fs.existsSync(file("rollback-preflight.json")), "Preserve the existing rollback preflight.");
  const baseline = json("baseline.json");
  const deployed = json("deployment-receipt.json");
  assert.equal(deployed.state, "ACTIVE");
  assert.equal(sha256(fs.readFileSync(file("source.zip"))), baseline.archiveSHA256);
  const current = await getFunction();
  assert.equal(current.state, "ACTIVE");
  assert.equal(current.serviceConfig.revision, deployed.revision);
  assert.equal(current.updateTime, deployed.deployedUpdateTime);
  assert.deepEqual(current.buildConfig.source, deployed.deployedSource);
  assert.equal(configHash(current), baseline.configHash);
  assert.equal(await archiveHash(current), deployed.artifactSHA256);
  const result = {
    result: "PASS",
    checkedAt: new Date().toISOString(),
    ready: true,
    changed: false,
    currentRevision: current.serviceConfig.revision,
    deployedArtifactSHA256: deployed.artifactSHA256,
    sourceOnly: true,
    rollbackRevision: baseline.revision,
    rollbackArchive: "source.zip",
    rollbackArchiveSHA256: baseline.archiveSHA256,
    configHash: baseline.configHash,
    rollbackToolSHA256: sha256(fs.readFileSync(file("rollback.cjs"))),
    dataWillBeRestored: false,
    rulesWillBeRestored: false,
    productionWrites: 0,
  };
  writeReceipt("rollback-preflight.json", result, true);
  console.log(JSON.stringify(result, null, 2));
})().catch((error) => {
  console.error(JSON.stringify({ error: "rollback_preflight_failed", status: error.response?.status || null, detail: error instanceof assert.AssertionError ? error.message : undefined }));
  process.exitCode = 1;
});
