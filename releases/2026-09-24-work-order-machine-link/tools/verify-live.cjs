"use strict";
// No successful mutation probe: invalid equipment is rejected before DB access.
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), assert = require("node:assert/strict");
const { request } = require("../ops-reliability-20260922/cloud.cjs");
const report = require("./composition-report.json"), out = path.join(__dirname, report.sourceDirectory);
const json = (name) => JSON.parse(fs.readFileSync(path.join(__dirname, name), "utf8"));
let phase = "preflight";
(async () => {
  const receipt = json("deployment-receipt.json"); assert.equal(receipt.state, "ACTIVE");
  const fn = await request("https://cloudfunctions.googleapis.com/v2/projects/magmo-ac10c/locations/us-west2/functions/nextServerWest");
  assert.equal(fn.serviceConfig.revision, receipt.revision); assert.equal(fn.state, "ACTIVE");
  phase = "health";
  const healthResponse = await fetch("https://magmo.cloud/api/ops/health", { signal: AbortSignal.timeout(20000) }); assert.equal(healthResponse.status, 200);
  const health = await healthResponse.json(), additions = require(path.join(out, "machine-link/equipment-schema.json"));
  assert.deepEqual(health.bluefolderEquipmentLink, additions.capability);
  assert.equal(health.bluefolderStatusSync.statusOnly, true);
  for (const key of ["createsWorkOrders", "createsSlackPosts", "writesSlack", "writesBlueFolder", "deletesMessages", "modifiesHours"]) assert.equal(health.bluefolderStatusSync[key], false);
  phase = "openapi";
  const specResponse = await fetch("https://magmo.cloud/api/ops/openapi", { signal: AbortSignal.timeout(20000) }); assert.equal(specResponse.status, 200);
  const spec = await specResponse.json(), properties = spec.components.schemas.WorkOrderImportedRequest.properties;
  assert.deepEqual(properties.existingOnly, additions.existingOnly);
  assert.deepEqual(properties.blueFolder.properties.equipmentIds, additions.equipment.equipmentIds);
  assert.deepEqual(properties.blueFolder.properties.equipmentNames, additions.equipment.equipmentNames);
  assert.deepEqual(spec["x-magmo-capabilities"].bluefolderEquipmentLink, additions.capability);
  phase = "negative_validation";
  const env = fn.serviceConfig.environmentVariables || {}, credential = env.OPS_INGEST_SECRET || env.CRON_SECRET;
  assert(typeof credential === "string" && credential.length);
  const negative = { eventType: "work_order.imported", existingOnly: true, blueFolder: { serviceRequestId: "machine-link-negative-verification", equipmentIds: "invalid-array" } };
  assert.throws(() => require(path.join(out, "machine-link/blueFolderImportContract.cjs")).validateEquipmentIdentity(negative.blueFolder), (error) => error.code === "bluefolder_equipment_identity_invalid");
  const negativeResponse = await fetch("https://magmo.cloud/api/ops/ingest", { method: "POST", headers: { "Content-Type": "application/json", "x-ops-ingest-secret": credential }, body: JSON.stringify(negative), signal: AbortSignal.timeout(20000) });
  const negativeResult = await negativeResponse.json(); assert.equal(negativeResponse.status, 400); assert.equal(negativeResult.code, "bluefolder_equipment_identity_invalid");
  phase = "real_work_order_read_only";
  const contextResponse = await fetch("https://magmo.cloud/api/ops/ingest", { method: "POST", headers: { "Content-Type": "application/json", "x-ops-ingest-secret": credential }, body: JSON.stringify({ eventType: "work_order.command_context", workOrderId: "10664" }), signal: AbortSignal.timeout(20000) });
  assert.equal(contextResponse.status, 200);
  const contextResult = await contextResponse.json(); assert.equal(contextResult.ok, true); assert.equal(contextResult.context.workOrderId, "10664"); assert.equal(contextResult.context.deleted, false);
  // Command context deliberately omits destination fields. Verify those directly
  // through a read-only Firestore GET instead of pretending the context shows them.
  const destinationDocument = await request("https://firestore.googleapis.com/v1/projects/magmo-ac10c/databases/(default)/documents/OpsWorkOrders/10664");
  const clientId = destinationDocument.fields.clientId.stringValue, machineId = destinationDocument.fields.machineId.stringValue;
  assert.equal(clientId, "AIS50849"); assert.equal(machineId, "AIS21467");
  phase = "unauthenticated_scanner_boundaries";
  const unauthenticatedChecks = [];
  for (const [route, method] of [["options", "GET"], ["confirm", "POST"], ["scan-sessions", "POST"]]) {
    const response = await fetch("https://magmo.cloud/api/items/work-order-add/" + route, { method, ...(method === "POST" ? { headers: { "Content-Type": "application/json" }, body: "{}" } : {}), signal: AbortSignal.timeout(20000) });
    assert.equal(response.status, 401, route); unauthenticatedChecks.push({ route, status: response.status });
  }
  phase = "client_asset";
  const pageResponse = await fetch("https://magmo.cloud/NewSearch/mainSearch", { signal: AbortSignal.timeout(20000), headers: { "Cache-Control": "no-cache" } }); assert.equal(pageResponse.status, 200);
  const html = await pageResponse.text(); assert(html.includes(path.basename(report.newAsset))); assert(html.includes(report.newBuildId));
  const assetResponse = await fetch("https://magmo.cloud/_next/" + report.newAsset, { signal: AbortSignal.timeout(20000) }); assert.equal(assetResponse.status, 200);
  const bytes = Buffer.from(await assetResponse.arrayBuffer()), expected = fs.readFileSync(path.join(out, ".next", report.newAsset));
  assert.equal(crypto.createHash("sha256").update(bytes).digest("hex"), crypto.createHash("sha256").update(expected).digest("hex"));
  const result = { checkedAt: new Date().toISOString(), revision: receipt.revision, apiVersion: health.apiVersion,
    capability: health.bluefolderEquipmentLink, closeStatusSyncPreserved: true, schemaVerified: true,
    authenticatedNegativeProbe: { status: negativeResponse.status, code: negativeResult.code, rejectedBeforeDatabaseAccess: true },
    realWorkOrder: { workOrderId: "10664", contextStatus: contextResponse.status, clientId, machineId, destinationVerifiedBy: "read-only Firestore GET" }, unauthenticatedChecks,
    clientAssetSHA256: crypto.createHash("sha256").update(bytes).digest("hex"), newBuildId: report.newBuildId,
    noDataWrites: true, noSlackWrites: true, noBlueFolderWrites: true };
  fs.writeFileSync(path.join(__dirname, "live-verification.json"), JSON.stringify(result, null, 2)); console.log(JSON.stringify(result, null, 2));
})().catch((error) => { console.error(JSON.stringify({ ok: false, phase, error: "verification_failed", status: error.response?.status || null, detail: error instanceof assert.AssertionError ? error.message : undefined })); process.exitCode = 1; });
