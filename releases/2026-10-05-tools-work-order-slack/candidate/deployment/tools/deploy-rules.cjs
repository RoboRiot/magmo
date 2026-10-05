"use strict";
const { fs, assert, request, file, json, sha256, writeReceipt } = require("./cloud-common.cjs");
const base = "https://firebaserules.googleapis.com/v1/";
const releaseName = "projects/magmo-ac10c/releases/cloud.firestore";
let phase = "preflight", receipt;
(async () => {
  const plan = json("rules-plan.json"), sourceText = fs.readFileSync(file("firestore-scoped.rules"), "utf8");
  const before = fs.readFileSync(file("firestore-before.rules"), "utf8");
  assert.equal(sha256(sourceText), plan.afterSHA256); assert.equal(sha256(before), plan.beforeSHA256);
  assert.equal(sourceText.replaceAll('\n        && collection != "ToolSlackDeliveries"', ""), before);
  assert.equal(plan.addedLines, 2);
  const verification = json("rules-verification.json");
  assert.equal(verification.status, "passed"); assert.equal(verification.failed, 0); assert.equal(verification.skipped, 0);
  assert.equal(verification.rulesSHA256, plan.afterSHA256);
  assert.equal(verification.logSHA256, sha256(fs.readFileSync(file("firestore-scoped-emulator.log"))));
  if (process.argv.includes("--status")) {
    receipt = json("rules-deployment-receipt.json"); assert(receipt.createdRuleset, "Unknown create outcome requires manual investigation, never resubmit");
    const live = await request(base + releaseName), rules = await request(base + live.rulesetName);
    assert.equal(live.rulesetName, receipt.createdRuleset); assert.equal(sha256(rules.source.files[0].content), plan.afterSHA256);
    Object.assign(receipt, { state: "ACTIVE", completedAt: new Date().toISOString(), releaseUpdateTime: live.updateTime });
    writeReceipt("rules-deployment-receipt.json", receipt); console.log(JSON.stringify(receipt)); return;
  }
  assert(!fs.existsSync(file("rules-deployment-receipt.json")), "Existing deployment journal: only --status is allowed");
  const live = await request(base + releaseName), rules = await request(base + live.rulesetName);
  assert.equal(live.rulesetName, plan.baselineRelease.rulesetName); assert.equal(live.updateTime, plan.baselineRelease.updateTime);
  assert.equal(rules.source.files.length, 1); assert.equal(sha256(rules.source.files[0].content), plan.beforeSHA256);
  if (!process.argv.includes("--apply")) {
    console.log(JSON.stringify({ ok: true, readOnly: true, beforeRuleset: live.rulesetName, beforeSHA256: plan.beforeSHA256,
      afterSHA256: plan.afterSHA256, addedLines: 2, databaseWrites: 0, slackWrites: 0 })); return;
  }
  const approval = json("rules-approval.json");
  assert.equal(approval.rulesApproved, true); assert.equal(approval.beforeSHA256, plan.beforeSHA256);
  assert.equal(approval.afterSHA256, plan.afterSHA256); assert.equal(approval.baselineRuleset, plan.baselineRelease.rulesetName);
  assert.equal(approval.databaseWritesAllowed, false); assert.equal(approval.slackWritesAllowed, false);
  for (const name of ["deploy-rules.cjs", "cloud-common.cjs", "rules-plan.json", "rules-verification.json"]) {
    assert.equal(approval.toolHashes?.[name], sha256(fs.readFileSync(file(name))), `Unapproved file: ${name}`);
  }
  phase = "validation";
  const source = { files: [{ name: plan.fileName, content: sourceText }] };
  const checked = await request(base + "projects/magmo-ac10c:test", "POST", { source });
  assert(!(checked.issues || []).some((issue) => issue.severity === "ERROR"), "Rules validation failed");
  const recheck = await request(base + releaseName);
  assert.equal(recheck.rulesetName, live.rulesetName); assert.equal(recheck.updateTime, live.updateTime);
  receipt = { state: "CREATING", startedAt: new Date().toISOString(), originalRuleset: live.rulesetName,
    originalReleaseUpdateTime: live.updateTime, beforeSHA256: plan.beforeSHA256, afterSHA256: plan.afterSHA256, databaseWrites: 0, slackWrites: 0 };
  writeReceipt("rules-deployment-receipt.json", receipt, true);
  phase = "create";
  const created = await request(base + "projects/magmo-ac10c/rulesets", "POST", { source });
  assert(created.name); receipt.createdRuleset = created.name; receipt.state = "CREATED"; writeReceipt("rules-deployment-receipt.json", receipt);
  const final = await request(base + releaseName);
  assert.equal(final.rulesetName, live.rulesetName); assert.equal(final.updateTime, live.updateTime);
  phase = "publish";
  await request(base + releaseName, "PATCH", { release: { name: releaseName, rulesetName: created.name }, updateMask: "rulesetName" });
  const published = await request(base + releaseName), publishedRules = await request(base + published.rulesetName);
  assert.equal(published.rulesetName, created.name); assert.equal(sha256(publishedRules.source.files[0].content), plan.afterSHA256);
  Object.assign(receipt, { state: "ACTIVE", completedAt: new Date().toISOString(), releaseUpdateTime: published.updateTime });
  writeReceipt("rules-deployment-receipt.json", receipt); console.log(JSON.stringify(receipt));
})().catch((error) => {
  console.error(JSON.stringify({ ok: false, phase, error: "rules_guard_or_request_failed", status: error.response?.status || null,
    detail: error instanceof assert.AssertionError ? error.message : undefined, state: receipt?.state || null })); process.exitCode = 1;
});
