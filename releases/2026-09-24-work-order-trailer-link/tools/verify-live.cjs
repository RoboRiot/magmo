"use strict";
// Read-only production checks. No inventory movement or metadata mutation probe.
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const { request } = require("../ops-reliability-20260922/cloud.cjs");
const json = (file) => JSON.parse(fs.readFileSync(path.join(__dirname, file), "utf8"));
let phase = "preflight";
(async () => {
  const receipt = json("deployment-receipt.json"), report = json("composition-report.json");
  assert.equal(receipt.state, "ACTIVE");
  const fn = await request("https://cloudfunctions.googleapis.com/v2/projects/magmo-ac10c/locations/us-west2/functions/nextServerWest");
  assert.equal(fn.state, "ACTIVE"); assert.equal(fn.serviceConfig.revision, receipt.revision);
  assert.deepEqual(fn.buildConfig.source, receipt.deployedSource);
  phase = "health_and_schema";
  const healthResponse = await fetch("https://magmo.cloud/api/ops/health", { signal: AbortSignal.timeout(20000) });
  assert.equal(healthResponse.status, 200); const health = await healthResponse.json();
  const expected = require(path.join(__dirname, report.sourceDirectory, "machine-link/equipment-schema.json"));
  assert.deepEqual(health.bluefolderEquipmentLink, expected.capability);
  assert.equal(health.bluefolderStatusSync.statusOnly, true);
  for (const key of ["createsWorkOrders", "createsSlackPosts", "writesSlack", "writesBlueFolder", "deletesMessages", "modifiesHours"]) assert.equal(health.bluefolderStatusSync[key], false);
  const specResponse = await fetch("https://magmo.cloud/api/ops/openapi", { signal: AbortSignal.timeout(20000) });
  assert.equal(specResponse.status, 200); const spec = await specResponse.json();
  const properties = spec.components.schemas.WorkOrderImportedRequest.properties;
  assert.deepEqual(properties.existingOnly, expected.existingOnly);
  assert.deepEqual(properties.blueFolder.properties.equipmentIds, expected.equipment.equipmentIds);
  assert.deepEqual(properties.blueFolder.properties.equipmentNames, expected.equipment.equipmentNames);
  phase = "read_only_work_orders";
  const verifiedOrders = [];
  for (const [id, expectedClient, expectedMachine, expectedTrailer] of [
    ["10659", "AIS78594", "AIS82553", "AIS20"], ["10664", "AIS50849", "AIS21467", ""],
  ]) {
    const doc = await request("https://firestore.googleapis.com/v1/projects/magmo-ac10c/databases/(default)/documents/OpsWorkOrders/" + id);
    const value = (field) => doc.fields[field]?.stringValue || "";
    assert.equal(value("clientId"), expectedClient); assert.equal(value("machineId"), expectedMachine); assert.equal(value("trailerId"), expectedTrailer);
    if (expectedTrailer) assert(doc.fields.trailerRef?.referenceValue.endsWith("/Trailers/" + expectedTrailer));
    assert(doc.fields.machineRef?.referenceValue.endsWith("/Machine/" + expectedMachine));
    verifiedOrders.push({ workOrderId: id, clientId: value("clientId"), machineId: value("machineId"), trailerId: value("trailerId"), verifiedBy: "read-only Firestore REST GET" });
  }
  phase = "auth_boundaries_and_unchanged_ui";
  const authBoundaries = [];
  for (const [route, method] of [["options", "GET"], ["confirm", "POST"], ["scan-sessions", "POST"]]) {
    const response = await fetch("https://magmo.cloud/api/items/work-order-add/" + route, { method, ...(method === "POST" ? { headers: { "Content-Type": "application/json" }, body: "{}" } : {}), signal: AbortSignal.timeout(20000) });
    assert.equal(response.status, 401); authBoundaries.push({ route, status: response.status });
  }
  const pageResponse = await fetch("https://magmo.cloud/NewSearch/mainSearch", { signal: AbortSignal.timeout(20000), headers: { "Cache-Control": "no-cache" } });
  assert.equal(pageResponse.status, 200); assert((await pageResponse.text()).includes(report.unchangedBuildId));
  const result = { checkedAt: new Date().toISOString(), revision: receipt.revision, deployedSource: receipt.deployedSource,
    artifactSHA256: receipt.artifactSHA256, helperSHA256: report.entries[0].after, unrelatedConfigurationPreserved: receipt.unrelatedConfigurationPreserved,
    equipmentCapability: health.bluefolderEquipmentLink, closeStatusSyncPreserved: true, schemaPreserved: true,
    verifiedOrders, authBoundaries, unchangedBuildId: report.unchangedBuildId,
    noDataWrites: true, noSlackWrites: true, noBlueFolderWrites: true };
  fs.writeFileSync(path.join(__dirname, "live-verification.json"), JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
})().catch((error) => { console.error(JSON.stringify({ ok: false, phase, error: "read_only_verification_failed", status: error.response?.status || null, detail: error instanceof assert.AssertionError ? error.message : undefined })); process.exitCode = 1; });
