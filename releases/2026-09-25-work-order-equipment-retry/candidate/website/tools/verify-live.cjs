"use strict";
// Read-only production checks. No import replay, inventory movement, or metadata mutation probe.
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict"), crypto = require("node:crypto");
const { client, request } = require("../ops-reliability-20260922/cloud.cjs");
const json = (name) => JSON.parse(fs.readFileSync(path.join(__dirname, name), "utf8"));
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const stable = (value) => Array.isArray(value) ? value.map(stable) : value && typeof value === "object" ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])])) : value;
function configHash(fn) {
  const service = structuredClone(fn.serviceConfig), build = structuredClone(fn.buildConfig);
  for (const key of ["revision", "uri", "service"]) delete service[key];
  for (const key of ["source", "sourceProvenance", "build"]) delete build[key];
  return sha(JSON.stringify(stable({ service, build, labels: fn.labels })));
}
function decode(value = {}) {
  if ("nullValue" in value) return null;
  if ("stringValue" in value) return value.stringValue;
  if ("referenceValue" in value) return value.referenceValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return value.doubleValue;
  if ("timestampValue" in value) return value.timestampValue;
  if ("arrayValue" in value) return (value.arrayValue.values || []).map(decode);
  if ("mapValue" in value) return Object.fromEntries(Object.entries(value.mapValue.fields || {}).map(([key, nested]) => [key, decode(nested)]));
  return undefined;
}
const decodeDocument = (doc) => Object.fromEntries(Object.entries(doc.fields || {}).map(([key, value]) => [key, decode(value)]));
let phase = "preflight";
(async () => {
  const receipt = json("deployment-receipt.json"), report = json("composition-report.json"); assert.equal(receipt.state, "ACTIVE");
  const fn = await request("https://cloudfunctions.googleapis.com/v2/projects/magmo-ac10c/locations/us-west2/functions/nextServerWest");
  assert.equal(fn.state, "ACTIVE"); assert.equal(fn.serviceConfig.revision, receipt.revision); assert.deepEqual(fn.buildConfig.source, receipt.deployedSource); assert.equal(configHash(fn), receipt.configHash);
  assert.equal(fn.buildConfig.runtime, "nodejs22"); assert.equal(fn.buildConfig.entryPoint, "nextServerWest");
  const storage = fn.buildConfig.source.storageSource;
  const deployed = await client.request({ url: `https://storage.googleapis.com/storage/v1/b/${storage.bucket}/o/${encodeURIComponent(storage.object)}`, params: { alt: "media", generation: storage.generation }, responseType: "arraybuffer", timeout: 60000 });
  assert.equal(sha(Buffer.from(deployed.data)), receipt.artifactSHA256);
  phase = "health";
  const healthResponse = await fetch("https://magmo.cloud/api/ops/health", { signal: AbortSignal.timeout(20000), headers: { "Cache-Control": "no-cache" } });
  assert.equal(healthResponse.status, 200); const health = await healthResponse.json();
  assert.deepEqual(health.bluefolderEquipmentLink, { version: "2026-09-24.1", equipmentIds: true, equipmentNames: true, existingOnly: true, preservesManualAssets: true, rejectsUnresolvedInventoryMachine: true });
  assert(health.supportedEventTypes.includes("work_order.imported")); assert.equal(health.bluefolderImport.requiresSlackCoordinates, false);
  phase = "read_only_work_orders";
  const getOrder = async (id) => decodeDocument(await request("https://firestore.googleapis.com/v1/projects/magmo-ac10c/databases/(default)/documents/OpsWorkOrders/" + id));
  const workOrder10677 = await getOrder("10677");
  assert.equal(workOrder10677.clientId, "AIS79109"); assert.equal(workOrder10677.machineId, "AIS32820");
  const status = require(path.join(__dirname, report.sourceDirectory, "machine-link/workOrderMachineLink.cjs")).workOrderEquipmentLinkStatus(workOrder10677);
  assert.deepEqual(status, { equipmentLinkStatus: "resolved", equipmentLinkIssue: "" });
  const workOrder10659 = await getOrder("10659");
  assert.equal(workOrder10659.clientId, "AIS78594"); assert.equal(workOrder10659.machineId, "AIS82553"); assert.equal(workOrder10659.trailerId, "AIS20");
  phase = "unchanged_ui";
  const page = await fetch("https://magmo.cloud/NewSearch/mainSearch", { signal: AbortSignal.timeout(20000), headers: { "Cache-Control": "no-cache" } });
  assert.equal(page.status, 200); assert((await page.text()).includes(report.unchangedBuildId));
  const result = { checkedAt: new Date().toISOString(), revision: receipt.revision, deployedSource: receipt.deployedSource, artifactSHA256: receipt.artifactSHA256,
    runtime: fn.buildConfig.runtime, entryPoint: fn.buildConfig.entryPoint, region: "us-west2", unrelatedConfigurationPreserved: receipt.unrelatedConfigurationPreserved,
    workOrder10677: { clientId: workOrder10677.clientId, machineId: workOrder10677.machineId,
      computedFromDeployedHelper: { equipmentLinkStatus: status.equipmentLinkStatus, equipmentLinkIssue: status.equipmentLinkIssue } },
    preservedWorkOrder10659: { clientId: workOrder10659.clientId, machineId: workOrder10659.machineId, trailerId: workOrder10659.trailerId },
    unchangedBuildId: report.unchangedBuildId, noDataWrites: true, noSlackWrites: true, noBlueFolderWrites: true };
  fs.writeFileSync(path.join(__dirname, "live-verification.json"), JSON.stringify(result, null, 2)); console.log(JSON.stringify(result, null, 2));
})().catch((error) => { console.error(JSON.stringify({ ok: false, phase, error: "read_only_verification_failed", status: error.response?.status || null, detail: error instanceof assert.AssertionError ? error.message : undefined })); process.exitCode = 1; });
