"use strict";
const { fs, assert, request, file, json, sha256, writeReceipt } = require("./cloud-common.cjs");
const base = "https://firebaserules.googleapis.com/v1/", releaseName = "projects/magmo-ac10c/releases/cloud.firestore";
(async () => {
  const plan = json("rules-plan.json");
  assert.equal(sha256(fs.readFileSync(file("firestore-before.rules"))), plan.beforeSHA256);
  const original = await request(base + plan.baselineRelease.rulesetName);
  assert.equal(original.source.files.length, 1); assert.equal(sha256(original.source.files[0].content), plan.beforeSHA256);
  if (process.argv.includes("--plan")) {
    assert(!process.argv.includes("--apply"));
    console.log(JSON.stringify({ ready: true, changed: false, rollbackRuleset: plan.baselineRelease.rulesetName,
      rollbackSHA256: plan.beforeSHA256, databaseWrites: 0 })); return;
  }
  const deployed = json("rules-deployment-receipt.json");
  assert.equal(deployed.state, "ACTIVE"); assert.equal(deployed.afterSHA256, plan.afterSHA256);
  if (process.argv.includes("--status")) {
    const receipt = json("rules-rollback-receipt.json"), live = await request(base + releaseName);
    assert.equal(live.rulesetName, plan.baselineRelease.rulesetName);
    const rules = await request(base + live.rulesetName); assert.equal(sha256(rules.source.files[0].content), plan.beforeSHA256);
    Object.assign(receipt, { state: "ACTIVE", completedAt: new Date().toISOString(), releaseUpdateTime: live.updateTime });
    writeReceipt("rules-rollback-receipt.json", receipt); console.log(JSON.stringify(receipt)); return;
  }
  assert(!fs.existsSync(file("rules-rollback-receipt.json")), "Existing rollback journal: only --status is allowed");
  const live = await request(base + releaseName); assert.equal(live.rulesetName, deployed.createdRuleset, "Refusing to overwrite later rules");
  assert.equal(live.updateTime, deployed.releaseUpdateTime);
  const current = await request(base + live.rulesetName); assert.equal(sha256(current.source.files[0].content), plan.afterSHA256);
  if (!process.argv.includes("--apply")) {
    console.log(JSON.stringify({ ready: true, changed: false, currentRuleset: live.rulesetName,
      rollbackRuleset: plan.baselineRelease.rulesetName, rollbackSHA256: plan.beforeSHA256, databaseWrites: 0 })); return;
  }
  const approval = json("rules-rollback-approval.json");
  assert.equal(approval.rulesRollbackApproved, true); assert.equal(approval.fromRuleset, deployed.createdRuleset);
  assert.equal(approval.beforeSHA256, plan.beforeSHA256); assert.equal(approval.toolSHA256, sha256(fs.readFileSync(__filename)));
  const final = await request(base + releaseName);
  assert.equal(final.rulesetName, live.rulesetName); assert.equal(final.updateTime, live.updateTime);
  const receipt = { state: "SUBMITTING", startedAt: new Date().toISOString(), originalRuleset: live.rulesetName,
    targetRuleset: plan.baselineRelease.rulesetName, beforeSHA256: plan.beforeSHA256, databaseWrites: 0 };
  writeReceipt("rules-rollback-receipt.json", receipt, true);
  await request(base + releaseName, "PATCH", { release: { name: releaseName, rulesetName: plan.baselineRelease.rulesetName }, updateMask: "rulesetName" });
  const after = await request(base + releaseName); assert.equal(after.rulesetName, plan.baselineRelease.rulesetName);
  Object.assign(receipt, { state: "ACTIVE", completedAt: new Date().toISOString(), releaseUpdateTime: after.updateTime });
  writeReceipt("rules-rollback-receipt.json", receipt); console.log(JSON.stringify(receipt));
})().catch((error) => {
  console.error(JSON.stringify({ ok: false, error: "rules_rollback_guard_or_request_failed", status: error.response?.status || null,
    detail: error instanceof assert.AssertionError ? error.message : undefined })); process.exitCode = 1;
});
