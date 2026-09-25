import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { createRequire } from "node:module";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const require = createRequire(import.meta.url);
const { encodeFirestoreValue } = require("../lib/firestoreBackupCodec.cjs");
const { resolveWorkOrderDestination } = require("../lib/inventory/workOrderAddService.cjs");
const { workOrderEquipmentLinkStatus } = require("../lib/ops/workOrderMachineLink.cjs");

const root = path.resolve(import.meta.dirname, "..");
const applyDir = path.join(
  root,
  "outputs/work-order-site-only-recovery-20260925/fresh-site-apply-2026-09-25T20-56-18.004Z",
);
const proofPath = path.join(
  root,
  "outputs/work-order-site-only-recovery-20260925/reviewed-fresh-site-targets.json",
);
const receiptPath = path.join(
  root,
  "tmp/work-order-site-only-retry-20260925/fresh-site-recovery-receipt.json",
);
const deploymentReceiptPath = path.join(
  root,
  "tmp/work-order-fresh-site-proof-20260925/deployment-receipt.json",
);
const backupDir = path.join(
  root,
  "outputs/firestore-backups/2026-09-25-site-only-recovery-predeploy",
);
const backupPath = path.join(backupDir, "firestore-documents.jsonl");
const manifestPath = path.join(backupDir, "manifest.json");

const expected = Object.freeze({
  proofSHA256: "772e5275877bd18e1faf43539cf83e3d2e097e63018a233930b02044107c4ee2",
  receiptSHA256: "707251bad7bfdbc7942e859a52f85958b68c0d666b31bbd38581c70853366a73",
  deploymentReceiptSHA256: "8b9019140b8af20dbce13d49e6cf074c2c61188fee3ec9699e72253823dcc962",
  manifestSHA256: "5144876dba6ca86c5ae8b84e051b9c10f9e60e0ade8afaca424e0cafe54d67cc",
  backupDataSHA256: "661c286a5fd2ab183f4ec89afcd85f7fe8da67aa47dbebf6e6394db69be4374e",
  revision: "nextserverwest-00061-rej",
  generation: "1790369259300423",
  artifactSHA256: "075a5c40481f4e9f8b83261995cecd8be22c435d8ba89badf40f27cf97e9ae77",
  configSHA256: "de4d951c93305fd1ae8a781baae316a87b52f5e8825a907a736c0f427eb147fc",
});

function fileSHA256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === "object") {
    if (value.__firestoreType === "timestamp" || value.__firestoreType === "date") {
      return { $timestamp: value.iso };
    }
    if (value.__firestoreType === "reference") return { $reference: value.path };
    if (value.__firestoreType === "bytes") return { $bytes: value.base64 };
    if (value.__firestoreType === "geopoint") {
      return { $geo: [value.latitude, value.longitude] };
    }
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, stableValue(value[key])]),
    );
  }
  return value;
}

function stable(value) {
  return JSON.stringify(stableValue(value));
}

function sha(value) {
  return crypto.createHash("sha256").update(stable(value)).digest("hex");
}

function decodeValue(value = {}) {
  if ("nullValue" in value) return null;
  if ("booleanValue" in value) return value.booleanValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return value.doubleValue;
  if ("timestampValue" in value) {
    return { __firestoreType: "timestamp", iso: value.timestampValue };
  }
  if ("stringValue" in value) return value.stringValue;
  if ("bytesValue" in value) {
    return { __firestoreType: "bytes", base64: value.bytesValue };
  }
  if ("referenceValue" in value) {
    return {
      __firestoreType: "reference",
      path: String(value.referenceValue).split("/documents/").at(-1),
    };
  }
  if ("geoPointValue" in value) {
    return {
      __firestoreType: "geopoint",
      latitude: value.geoPointValue.latitude,
      longitude: value.geoPointValue.longitude,
    };
  }
  if ("arrayValue" in value) return (value.arrayValue.values || []).map(decodeValue);
  if ("mapValue" in value) {
    return Object.fromEntries(
      Object.entries(value.mapValue.fields || {}).map(([key, nested]) => [key, decodeValue(nested)]),
    );
  }
  throw new Error(`Unsupported Firestore REST value: ${JSON.stringify(value).slice(0, 200)}`);
}

function decodeDocument(document) {
  return Object.fromEntries(
    Object.entries(document.fields || {}).map(([key, value]) => [key, decodeValue(value)]),
  );
}

function documentId(document) {
  return String(document.name).split("/").at(-1);
}

function changedKeys(before, after) {
  return [...new Set([...Object.keys(before || {}), ...Object.keys(after || {})])]
    .filter((key) => stable(before?.[key]) !== stable(after?.[key]))
    .sort();
}

function isEmptyAssociation(value) {
  return value === undefined || value === null || (typeof value === "string" && !value.trim());
}

function loadEnv() {
  for (const name of [".env.local", ".env"]) {
    const file = path.join(root, name);
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const match = line.trim().match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (!match || process.env[match[1]] != null) continue;
      let value = match[2].trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[match[1]] = value.replace(/\\n/g, "\n");
    }
  }
}

async function readBackupRows(paths) {
  const selected = new Map();
  const hash = crypto.createHash("sha256");
  let count = 0;
  const input = fs.createReadStream(backupPath);
  input.on("data", (chunk) => hash.update(chunk));
  const lines = readline.createInterface({ input, crlfDelay: Infinity });
  for await (const line of lines) {
    const row = JSON.parse(line);
    count += 1;
    if (paths.has(row.path)) selected.set(row.path, row.data);
  }
  return { selected, count, dataSHA256: hash.digest("hex") };
}

function assertExactReference(document, field, expectedPath) {
  assert.equal(
    document.fields?.[field]?.referenceValue,
    document.name.replace(/\/OpsWorkOrders\/[^/]+$/, `/${expectedPath}`),
    `${documentId(document)}.${field} must be the exact typed reference`,
  );
}

async function main() {
  assert.equal(fileSHA256(proofPath), expected.proofSHA256);
  assert.equal(fileSHA256(receiptPath), expected.receiptSHA256);
  assert.equal(fileSHA256(deploymentReceiptPath), expected.deploymentReceiptSHA256);
  assert.equal(fileSHA256(manifestPath), expected.manifestSHA256);

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  assert.equal(manifest.status, "complete");
  assert.equal(manifest.documentCount, 187443);
  assert.equal(manifest.collectionCount, 1015);
  assert.equal(manifest.files?.["firestore-documents.jsonl"]?.sha256, expected.backupDataSHA256);
  assert.equal(manifest.verification?.checksumRecomputed, true);
  assert.equal(manifest.verification?.documentCountRecounted, true);

  const proof = JSON.parse(fs.readFileSync(proofPath, "utf8"));
  const receipt = JSON.parse(fs.readFileSync(receiptPath, "utf8"));
  const deployment = JSON.parse(fs.readFileSync(deploymentReceiptPath, "utf8"));
  const beforeOrders = JSON.parse(fs.readFileSync(path.join(applyDir, "before-orders.json"), "utf8"));
  const afterOrders = JSON.parse(fs.readFileSync(path.join(applyDir, "after-orders.json"), "utf8"));
  const beforeClients = JSON.parse(fs.readFileSync(path.join(applyDir, "before-clients.json"), "utf8"));
  const afterClients = JSON.parse(fs.readFileSync(path.join(applyDir, "after-clients.json"), "utf8"));
  const plan = JSON.parse(fs.readFileSync(path.join(applyDir, "creation-plan.json"), "utf8"));

  assert.equal(proof.targets.length, 8);
  assert.equal(proof.sites.length, 5);
  const targetById = new Map(proof.targets.map((target) => [target.id, target]));
  assert.equal(targetById.size, 8);
  assert.equal(deployment.state, "ACTIVE");
  assert.equal(deployment.revision, expected.revision);
  assert.equal(deployment.artifactSHA256, expected.artifactSHA256);
  assert.equal(deployment.deployedSource?.storageSource?.generation, expected.generation);
  assert.equal(deployment.configHash, expected.configSHA256);
  assert.equal(receipt.apiRevision, expected.revision);
  assert.equal(receipt.apiArtifactSha256, expected.artifactSHA256);
  assert.equal(receipt.apiSourceGeneration, expected.generation);
  assert.equal(receipt.apiConfigurationSha256, expected.configSHA256);
  assert.equal(receipt.backupManifestSha256, expected.manifestSHA256);
  assert.equal(receipt.existingOnly, true);
  assert.equal(receipt.equipmentFieldsOmitted, true);
  assert.equal(receipt.daemonStateWritten, false);
  assert.equal(receipt.noItemWrites, true);
  assert.deepEqual(receipt.pendingClientOrderIds, ["10480", "10516", "10648"]);
  assert.deepEqual(receipt.transientAckIds, receipt.pendingClientOrderIds);

  const beforeOrderMap = new Map(beforeOrders.map((document) => [documentId(document), document]));
  const afterOrderMap = new Map(afterOrders.map((document) => [documentId(document), document]));
  assert.deepEqual([...beforeOrderMap.keys()].sort(), [...targetById.keys()].sort());
  assert.deepEqual([...afterOrderMap.keys()].sort(), [...targetById.keys()].sort());

  const allowedOrderChanges = new Set([
    "workOrderId",
    "number",
    "bluefolderServiceRequestId",
    "bluefolderImportSource",
    "bluefolderImportFingerprint",
    "bluefolderImportUpdatedAt",
    "bluefolderImportUpdatedAtIso",
    "updatedAt",
    "clientId",
    "clientRef",
    "clientName",
    "clientLocation",
    "clientLinkSource",
    "clientLinkMatchReason",
    "clientLinkedAtIso",
    "connectionsUpdatedAt",
    "connectionsUpdatedBy",
    "bluefolderCustomerId",
    "bluefolderCustomerName",
    "bluefolderLocationId",
    "bluefolderLocationName",
    "bluefolderAddressStreet",
    "bluefolderAddressCity",
    "bluefolderAddressState",
    "bluefolderAddressPostalCode",
    "bluefolderAddressCountry",
  ]);
  const sensitivePattern = /workflow|history|slack|assignment|calendar|asset|machine|trailer|equipment|inventory|item|movement|receipt/i;
  const orderSummary = [];
  for (const target of proof.targets) {
    const beforeDocument = beforeOrderMap.get(target.id);
    const afterDocument = afterOrderMap.get(target.id);
    const before = decodeDocument(beforeDocument);
    const after = decodeDocument(afterDocument);
    const changed = changedKeys(before, after);
    assert(changed.every((key) => allowedOrderChanges.has(key)), `${target.id}: unexpected changes ${changed}`);
    assert.deepEqual(changed.filter((key) => sensitivePattern.test(key)), []);
    assert.equal(after.clientId, target.expectedClientId);
    assertExactReference(afterDocument, "clientRef", `Client/${target.expectedClientId}`);
    assert.equal(after.bluefolderCustomerId, target.customerId);
    assert.equal(after.bluefolderLocationId, target.locationId);
    for (const field of [
      "machineId",
      "machineRef",
      "machineName",
      "trailerId",
      "trailerRef",
      "trailerName",
    ]) {
      assert(isEmptyAssociation(before[field]), `${target.id}: pre-existing ${field}`);
      assert(isEmptyAssociation(after[field]), `${target.id}: recovery added ${field}`);
    }
    assert.deepEqual(before.bluefolderEquipmentIds || [], target.equipmentIds);
    assert.deepEqual(before.bluefolderEquipmentNames || [], target.equipmentNames);
    assert.deepEqual(after.bluefolderEquipmentIds || [], target.equipmentIds);
    assert.deepEqual(after.bluefolderEquipmentNames || [], target.equipmentNames);
    for (const field of ["bluefolderEquipmentIds", "bluefolderEquipmentNames", "blueFolder"]) {
      assert.equal(
        sha(beforeDocument.fields?.[field] ?? null),
        sha(afterDocument.fields?.[field] ?? null),
        `${target.id}: ${field} changed bytewise`,
      );
    }
    const status = workOrderEquipmentLinkStatus(after);
    assert.equal(status.equipmentLinkStatus, target.expectedStatus);
    assert.equal(status.equipmentLinkIssue, target.expectedIssue);
    orderSummary.push({
      workOrderId: target.id,
      clientId: target.expectedClientId,
      changedFields: changed,
      beforeSHA256: sha(before),
      afterSHA256: sha(after),
      selectedEquipmentPreserved: true,
      workflowAssetsHistoryPreserved: true,
      durableEquipmentLinkStatus: status.equipmentLinkStatus,
      durableEquipmentLinkIssue: status.equipmentLinkIssue,
    });
  }

  const beforeClientMap = new Map(beforeClients.map((document) => [documentId(document), document]));
  const afterClientMap = new Map(afterClients.map((document) => [documentId(document), document]));
  assert.equal(beforeClientMap.size, 264);
  assert.equal(afterClientMap.size, 268);
  for (const [id, beforeDocument] of beforeClientMap) {
    assert(afterClientMap.has(id), `Client/${id} removed`);
    assert.equal(stable(beforeDocument.fields), stable(afterClientMap.get(id).fields), `Client/${id} changed`);
  }
  const createdClientIds = [...afterClientMap.keys()]
    .filter((id) => !beforeClientMap.has(id))
    .sort();
  assert.deepEqual(createdClientIds, ["AIS12854", "AIS26295", "AIS50904", "AIS56092"]);
  assert.deepEqual(createdClientIds, Object.keys(plan.creations).sort());
  for (const id of createdClientIds) {
    const actual = decodeDocument(afterClientMap.get(id));
    const planned = structuredClone(plan.creations[id]);
    for (const field of ["createdAt", "bluefolderSiteCreatedAtIso"]) {
      assert.equal(typeof actual[field]?.iso === "string" || typeof actual[field] === "string", true);
      delete actual[field];
      delete planned[field];
    }
    assert.equal(stable(actual), stable(planned), `Client/${id} differs from reviewed plan`);
  }
  for (const site of proof.sites) {
    const document = afterClientMap.get(site.expectedClientId);
    assert(document, `Client/${site.expectedClientId} missing`);
    const data = decodeDocument(document);
    assert.equal(data.bluefolderCustomerId, site.customerId);
    assert.equal(data.bluefolderLocationId, site.locationId);
    assert.equal(data.bluefolderParentClientId, site.parentClientId);
    assert.equal(data.bluefolderSiteSource, "verified_nested_location");
    assert.equal(data.name, site.location.name);
    assert.deepEqual(data.bluefolderLocationAliasKeys, [`${site.customerId}:${site.locationId}`]);
    assert.deepEqual(data.machines, []);
    assert.equal(data.bluefolderInactive, false);
  }

  const backupPaths = new Set(proof.targets.map((target) => `OpsWorkOrders/${target.id}`));
  const backup = await readBackupRows(backupPaths);
  assert.equal(backup.count, 187443);
  assert.equal(backup.dataSHA256, expected.backupDataSHA256);
  assert.equal(backup.selected.size, 8);
  for (const target of proof.targets) {
    const row = backup.selected.get(`OpsWorkOrders/${target.id}`);
    assert(row, `${target.id}: missing full-backup preimage`);
    assert.deepEqual(row.bluefolderEquipmentIds || [], target.equipmentIds);
    assert.deepEqual(row.bluefolderEquipmentNames || [], target.equipmentNames);
  }

  const httpById = new Map(receipt.httpResults.map((row) => [row.workOrderId, row]));
  assert.equal(httpById.size, 8);
  for (const target of proof.targets) {
    const row = httpById.get(target.id);
    assert(row);
    assert.equal(row.created, false);
    assert.equal(row.clientId, target.expectedClientId);
    assert.equal(row.equipmentLinkStatus, target.expectedStatus);
    const expectedIssue = receipt.pendingClientOrderIds.includes(target.id)
      ? "work_order_client_missing"
      : target.expectedIssue;
    assert.equal(row.equipmentLinkIssue, expectedIssue);
    assert.match(row.requestId, /^[a-f0-9]{24}$/);
  }

  loadEnv();
  assert.equal(process.env.FIREBASE_PROJECT_ID, "magmo-ac10c");
  const credentialsPath = path.resolve(
    root,
    process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH ||
      process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
      process.env.GOOGLE_APPLICATION_CREDENTIALS,
  );
  const account = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));
  assert.equal(account.project_id, "magmo-ac10c");
  if (!getApps().length) {
    initializeApp({ credential: cert(account), projectId: account.project_id });
  }
  const db = getFirestore();
  const clientIds = [...new Set(proof.sites.flatMap((site) => [site.expectedClientId, site.parentClientId]))];
  const livePaths = [
    ...proof.targets.map((target) => `OpsWorkOrders/${target.id}`),
    ...clientIds.map((id) => `Client/${id}`),
  ];
  const liveSnapshots = await db.getAll(...livePaths.map((value) => db.doc(value)));
  const liveByPath = new Map();
  for (const snapshot of liveSnapshots) {
    assert(snapshot.exists, `${snapshot.ref.path} missing live`);
    liveByPath.set(snapshot.ref.path, snapshot);
    const encoded = encodeFirestoreValue(snapshot.data());
    if (snapshot.ref.parent.id === "OpsWorkOrders") {
      assert.equal(stable(encoded), stable(decodeDocument(afterOrderMap.get(snapshot.id))), `${snapshot.ref.path} drifted`);
    } else {
      assert.equal(stable(encoded), stable(decodeDocument(afterClientMap.get(snapshot.id))), `${snapshot.ref.path} drifted`);
    }
  }

  const tx = {
    get: async (ref) => {
      const snapshot = liveByPath.get(ref.path);
      assert(snapshot, `Unexpected inventory destination read: ${ref.path}`);
      return snapshot;
    },
  };
  const inventoryDestinations = [];
  for (const target of proof.targets) {
    if (target.equipmentIds.length) {
      await assert.rejects(
        resolveWorkOrderDestination(tx, db, target.id, new Date().toISOString()),
        (error) => error.code === "work_order_machine_not_linked",
      );
      inventoryDestinations.push({ workOrderId: target.id, result: "blocked_missing_machine" });
    } else {
      const resolved = await resolveWorkOrderDestination(tx, db, target.id, new Date().toISOString());
      assert.equal(resolved.association.clientId, target.expectedClientId);
      assert.equal(resolved.association.associationType, "site");
      assert(isEmptyAssociation(resolved.association.machineId));
      assert(isEmptyAssociation(resolved.association.trailerId));
      inventoryDestinations.push({ workOrderId: target.id, result: "site_ready" });
    }
  }
  assert.equal(inventoryDestinations.filter((row) => row.result === "blocked_missing_machine").length, 6);
  assert.equal(inventoryDestinations.filter((row) => row.result === "site_ready").length, 2);

  const result = {
    schemaVersion: 1,
    checkedAt: new Date().toISOString(),
    independentVerificationPassed: true,
    readOnlyVerification: true,
    apiRevision: expected.revision,
    apiArtifactSHA256: expected.artifactSHA256,
    workOrderCount: 8,
    exactCreatedClientCount: 4,
    exactExistingClientPreimagesPreserved: 264,
    selectedEquipmentOrdersPreserved: 6,
    siteOnlyOrdersPreserved: 2,
    transientFirstCreateAcknowledgements: receipt.transientAckIds,
    automaticRetriesPerformed: 0,
    unexpectedWorkOrderFieldChanges: 0,
    protectedWorkflowAssetHistoryChanges: 0,
    existingClientChanges: 0,
    inventoryItemChanges: 0,
    parentClientChanges: 0,
    createdClientIds,
    workOrders: orderSummary,
    inventoryDestinations,
    fullBackup: {
      documentCount: manifest.documentCount,
      collectionCount: manifest.collectionCount,
      dataSHA256: expected.backupDataSHA256,
      manifestSHA256: expected.manifestSHA256,
      targetPreimagesPresent: 8,
      selectedEquipmentEvidenceMatchesReviewedProof: true,
    },
    liveSnapshotsEqualProtectedAfterImages: true,
    noDatabaseWritesDuringIndependentVerification: true,
  };
  const outputPath = path.join(applyDir, "independent-verification.json");
  fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, { flag: "wx" });
  console.log(
    JSON.stringify(
      {
        outputPath,
        passed: true,
        workOrderCount: 8,
        createdClientCount: 4,
        existingClientsUnchanged: 264,
        destinations: { blockedMissingMachine: 6, siteReady: 2 },
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
