"use strict";
const { fs, assert, file, json, sha256, writeReceipt } = require("./cloud-common.cjs");
const baseline = json("rules-baseline.json");
const before = fs.readFileSync(file("firestore-before.rules"), "utf8");
assert.equal(sha256(before), baseline.beforeSHA256);
const anchor = '        && collection != "InventoryWorkOrderAddOperations"';
const addition = '\n        && collection != "ToolSlackDeliveries"';
assert.equal(before.split(anchor).length - 1, 2);
assert(!before.includes("ToolSlackDeliveries"));
const after = before.replaceAll(anchor, anchor + addition);
assert.equal(after.replaceAll(addition, ""), before);
fs.writeFileSync(file("firestore-scoped.rules"), after, { flag: "wx" });
const plan = { composedAt: new Date().toISOString(), baselineRelease: baseline.release, fileName: baseline.fileName,
  beforeSHA256: sha256(before), afterSHA256: sha256(after), addedLines: 2,
  changedMatches: ["catch-all read excludes ToolSlackDeliveries", "catch-all writes exclude ToolSlackDeliveries"],
  exactBaselineReversible: true, productionMutations: 0 };
writeReceipt("rules-plan.json", plan, true);
console.log(JSON.stringify(plan, null, 2));
