import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { encodeFirestoreValue } = require("../lib/firestoreBackupCodec.cjs");
const root = path.resolve(import.meta.dirname, "..");
const applyDir = path.join(
  root,
  "outputs/work-order-site-only-recovery-20260925/nested-site-apply-2026-09-25T20-01-54.916Z",
);
const backupDir = path.join(
  root,
  "outputs/firestore-backups/2026-09-25-site-only-recovery-predeploy",
);
const backupPath = path.join(backupDir, "firestore-documents.jsonl");
const manifestPath = path.join(backupDir, "manifest.json");
const proofPath = path.join(
  root,
  "outputs/work-order-site-only-recovery-20260925/reviewed-nested-site-targets.json",
);
const receiptPath = path.join(
  root,
  "tmp/work-order-site-only-retry-20260925/nested-site-recovery-receipt.json",
);

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

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === "object") {
    if (value.__firestoreType === "timestamp") return { $timestamp: value.iso };
    if (value.__firestoreType === "date") return { $timestamp: value.iso };
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

function changedKeys(before, after) {
  return [...new Set([...Object.keys(before || {}), ...Object.keys(after || {})])]
    .filter((key) => stable(before?.[key]) !== stable(after?.[key]))
    .sort();
}

function decodeValue(value = {}) {
  if ("nullValue" in value) return null;
  if ("booleanValue" in value) return value.booleanValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return value.doubleValue;
  if ("timestampValue" in value) return { __firestoreType: "timestamp", iso: value.timestampValue };
  if ("stringValue" in value) return value.stringValue;
  if ("bytesValue" in value) return { __firestoreType: "bytes", base64: value.bytesValue };
  if ("referenceValue" in value) {
    const marker = "/documents/";
    return {
      __firestoreType: "reference",
      path: String(value.referenceValue).split(marker).at(-1),
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

async function loadBackup(targetPaths) {
  const selected = new Map();
  const clients = new Map();
  const input = fs.createReadStream(backupPath, { encoding: "utf8" });
  const lines = readline.createInterface({ input, crlfDelay: Infinity });
  for await (const line of lines) {
    const row = JSON.parse(line);
    if (/^Client\/[^/]+$/.test(row.path)) clients.set(row.path, row);
    if (targetPaths.has(row.path)) selected.set(row.path, row);
  }
  return { selected, clients };
}

function assertReference(data, field, expectedPath) {
  assert.equal(
    stable(data[field]),
    stable({ __firestoreType: "reference", path: expectedPath }),
    `${field} must be an exact typed reference`,
  );
}

async function main() {
  const manifestBytes = fs.readFileSync(manifestPath);
  assert.equal(
    crypto.createHash("sha256").update(manifestBytes).digest("hex"),
    "5144876dba6ca86c5ae8b84e051b9c10f9e60e0ade8afaca424e0cafe54d67cc",
  );
  const manifest = JSON.parse(manifestBytes);
  assert.equal(manifest.status, "complete");
  assert.equal(manifest.documentCount, 187443);
  assert.equal(manifest.collectionCount, 1015);
  assert.equal(
    manifest.files?.["firestore-documents.jsonl"]?.sha256,
    "661c286a5fd2ab183f4ec89afcd85f7fe8da67aa47dbebf6e6394db69be4374e",
  );

  const proofBytes = fs.readFileSync(proofPath);
  assert.equal(
    crypto.createHash("sha256").update(proofBytes).digest("hex"),
    "8368119f835fc4a44b73699422fa869ce5ec93aad985d69d73c37a1357999012",
  );
  const proof = JSON.parse(proofBytes);
  assert.equal(proof.targets.length, 19);
  const targetById = new Map(proof.targets.map((target) => [target.id, target]));
  assert.equal(targetById.size, 19);

  const beforeOrders = JSON.parse(fs.readFileSync(path.join(applyDir, "before-orders.json"), "utf8"));
  const afterOrders = JSON.parse(fs.readFileSync(path.join(applyDir, "after-orders.json"), "utf8"));
  const beforeClients = JSON.parse(fs.readFileSync(path.join(applyDir, "before-clients.json"), "utf8"));
  const afterClients = JSON.parse(fs.readFileSync(path.join(applyDir, "after-clients.json"), "utf8"));
  const plan = JSON.parse(fs.readFileSync(path.join(applyDir, "creation-plan.json"), "utf8"));
  const receipt = JSON.parse(fs.readFileSync(receiptPath, "utf8"));
  const directRepairVerification = JSON.parse(
    fs.readFileSync(
      path.join(
        root,
        "outputs/work-order-site-only-recovery-20260925/apply-2026-09-25T19-51-50-351Z/verification.json",
      ),
      "utf8",
    ),
  );
  assert.equal(receipt.workOrderCount, 19);
  assert.equal(receipt.apiRevision, "nextserverwest-00060-tod");
  assert.equal(receipt.existingOnly, true);
  assert.equal(receipt.equipmentFieldsOmitted, true);
  assert.equal(receipt.daemonStateWritten, false);
  assert.equal(receipt.noItemWrites, true);

  const beforeOrderMap = new Map(beforeOrders.map((doc) => [documentId(doc), doc]));
  const afterOrderMap = new Map(afterOrders.map((doc) => [documentId(doc), doc]));
  assert.deepEqual([...beforeOrderMap.keys()].sort(), [...targetById.keys()].sort());
  assert.deepEqual([...afterOrderMap.keys()].sort(), [...targetById.keys()].sort());

  const protectedPaths = new Set([
    ...proof.targets.map((target) => `OpsWorkOrders/${target.id}`),
    "OpsWorkOrders/10658",
    "OpsWorkOrders/10659",
    "OpsWorkOrders/10677",
    "Test/AIS23663",
    "Test/AIS23663/WorkOrderAddHistory/67e2deaf-ca06-4b71-a8f8-4bb2ea159cc1",
    "InventoryWorkOrderAddOperations/67e2deaf-ca06-4b71-a8f8-4bb2ea159cc1",
  ]);
  const backup = await loadBackup(protectedPaths);
  assert.equal(backup.clients.size, 240);
  for (const target of proof.targets) {
    assert(backup.selected.has(`OpsWorkOrders/${target.id}`));
  }

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
    const beforeDoc = beforeOrderMap.get(target.id);
    const afterDoc = afterOrderMap.get(target.id);
    const before = decodeDocument(beforeDoc);
    const after = decodeDocument(afterDoc);
    const changed = changedKeys(before, after);
    assert(changed.every((key) => allowedOrderChanges.has(key)), `${target.id}: unexpected changes ${changed}`);
    assert.deepEqual(changed.filter((key) => sensitivePattern.test(key)), [], `${target.id}: protected field changed`);
    assert.equal(after.clientId, target.expectedClientId);
    assertReference(after, "clientRef", `Client/${target.expectedClientId}`);
    for (const key of ["machineId", "machineRef", "machineName", "trailerId", "trailerRef", "trailerName"] ) {
      assert.equal(after[key], undefined, `${target.id}.${key}`);
    }
    for (const key of ["bluefolderEquipmentIds", "bluefolderEquipmentNames"]) {
      assert.equal(after[key], undefined, `${target.id}.${key}`);
    }

    const backupData = backup.selected.get(`OpsWorkOrders/${target.id}`).data;
    const priorDiff = changedKeys(backupData, before);
    const allowedInterim = new Set([
      "bluefolderImportFingerprint",
      "bluefolderImportUpdatedAt",
      "bluefolderImportUpdatedAtIso",
      "updatedAt",
    ]);
    assert(priorDiff.every((key) => allowedInterim.has(key)), `${target.id}: pre-apply drift ${priorDiff}`);
    assert.deepEqual(priorDiff.filter((key) => sensitivePattern.test(key)), []);
    orderSummary.push({
      workOrderId: target.id,
      clientId: after.clientId,
      changedFields: changed,
      backupToPreflightBookkeepingOnly: priorDiff,
      beforeSHA256: sha(before),
      afterSHA256: sha(after),
    });
  }

  const beforeClientMap = new Map(beforeClients.map((doc) => [documentId(doc), doc]));
  const afterClientMap = new Map(afterClients.map((doc) => [documentId(doc), doc]));
  assert.equal(beforeClientMap.size, 243);
  assert.equal(afterClientMap.size, 257);
  const createdClientIds = [...afterClientMap.keys()].filter((id) => !beforeClientMap.has(id)).sort();
  assert.deepEqual(createdClientIds, Object.keys(plan.creations).sort());
  assert.deepEqual(createdClientIds, proof.targets.map((target) => target.expectedClientId).filter((id, index, all) => all.indexOf(id) === index).sort());
  for (const [id, beforeDoc] of beforeClientMap) {
    assert(afterClientMap.has(id), `Client/${id} removed`);
    assert.equal(stable(beforeDoc.fields), stable(afterClientMap.get(id).fields), `Client/${id} changed`);
  }
  for (const id of createdClientIds) {
    const actual = decodeDocument(afterClientMap.get(id));
    const expected = structuredClone(plan.creations[id]);
    for (const field of ["createdAt", "bluefolderSiteCreatedAtIso"]) {
      assert(actual[field]?.__firestoreType === "timestamp" || typeof actual[field] === "string");
      delete actual[field];
      delete expected[field];
    }
    assert.equal(stable(actual), stable(expected), `Client/${id} differs from exact reviewed plan`);
  }

  const backupClientIds = new Set([...backup.clients.keys()].map((value) => value.split("/").at(-1)));
  const interimClients = [...beforeClientMap.keys()].filter((id) => !backupClientIds.has(id)).sort();
  const unchangedBackupClients = [];
  for (const [clientPath, row] of backup.clients) {
    const id = clientPath.split("/").at(-1);
    assert(beforeClientMap.has(id), `${clientPath} removed before recovery`);
    const before = decodeDocument(beforeClientMap.get(id));
    assert.equal(stable(before), stable(row.data), `${clientPath} changed since full backup`);
    unchangedBackupClients.push(id);
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
  if (!getApps().length) initializeApp({ credential: cert(account), projectId: account.project_id });
  const db = getFirestore();
  const livePaths = [
    ...proof.targets.map((target) => `OpsWorkOrders/${target.id}`),
    ...createdClientIds.map((id) => `Client/${id}`),
    "OpsWorkOrders/10658",
    "OpsWorkOrders/10659",
    "OpsWorkOrders/10677",
    "Test/AIS23663",
    "Test/AIS23663/WorkOrderAddHistory/67e2deaf-ca06-4b71-a8f8-4bb2ea159cc1",
    "InventoryWorkOrderAddOperations/67e2deaf-ca06-4b71-a8f8-4bb2ea159cc1",
  ];
  const live = await db.getAll(...livePaths.map((value) => db.doc(value)));
  for (const snapshot of live) {
    assert(snapshot.exists, `${snapshot.ref.path} missing live`);
    const encoded = encodeFirestoreValue(snapshot.data());
    if (snapshot.ref.parent.id === "OpsWorkOrders" && targetById.has(snapshot.id)) {
      assert.equal(stable(encoded), stable(decodeDocument(afterOrderMap.get(snapshot.id))), `${snapshot.ref.path} drifted after apply`);
    } else if (snapshot.ref.parent.id === "Client" && createdClientIds.includes(snapshot.id)) {
      assert.equal(stable(encoded), stable(decodeDocument(afterClientMap.get(snapshot.id))), `${snapshot.ref.path} drifted after apply`);
    } else {
      let protectedPreimage = backup.selected.get(snapshot.ref.path)?.data;
      if (snapshot.ref.path === "OpsWorkOrders/10658") {
        protectedPreimage = directRepairVerification.documents.find(
          (entry) => entry.path === snapshot.ref.path,
        )?.data;
      }
      assert(protectedPreimage, `${snapshot.ref.path} missing protected preimage`);
      const differences = changedKeys(protectedPreimage, encoded);
      if (snapshot.ref.path.startsWith("OpsWorkOrders/")) {
        const allowed = new Set([
          "bluefolderImportFingerprint",
          "bluefolderImportUpdatedAt",
          "bluefolderImportUpdatedAtIso",
          "updatedAt",
        ]);
        assert(differences.every((key) => allowed.has(key)), `${snapshot.ref.path} protected control changed: ${differences}`);
      } else {
        assert.equal(stable(encoded), stable(protectedPreimage), `${snapshot.ref.path} protected control changed`);
      }
    }
  }

  const output = {
    schemaVersion: 1,
    checkedAt: new Date().toISOString(),
    independentVerificationPassed: true,
    apiRevision: receipt.apiRevision,
    workOrderCount: orderSummary.length,
    exactCreatedClientCount: createdClientIds.length,
    exactExistingClientPreimagesPreserved: beforeClientMap.size,
    fullBackupClientDocumentsPreserved: unchangedBackupClients.length,
    interimClientsCreatedBeforeThisRecovery: interimClients,
    unexpectedWorkOrderFieldChanges: 0,
    protectedWorkflowAssetHistoryChanges: 0,
    inventoryItemChanges: 0,
    existingClientChanges: 0,
    createdClients: createdClientIds,
    workOrders: orderSummary,
    backup: {
      documentCount: manifest.documentCount,
      collectionCount: manifest.collectionCount,
      dataArtifactSHA256: "661c286a5fd2ab183f4ec89afcd85f7fe8da67aa47dbebf6e6394db69be4374e",
      manifestSHA256: "5144876dba6ca86c5ae8b84e051b9c10f9e60e0ade8afaca424e0cafe54d67cc",
    },
    protectedControlsVerified: [
      "OpsWorkOrders/10658",
      "OpsWorkOrders/10659",
      "OpsWorkOrders/10677",
      "Test/AIS23663",
      "Test/AIS23663/WorkOrderAddHistory/67e2deaf-ca06-4b71-a8f8-4bb2ea159cc1",
      "InventoryWorkOrderAddOperations/67e2deaf-ca06-4b71-a8f8-4bb2ea159cc1",
    ],
  };
  const outputPath = path.join(applyDir, "independent-verification.json");
  fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, { flag: "wx" });
  console.log(JSON.stringify({
    outputPath,
    workOrderCount: output.workOrderCount,
    createdClientCount: output.exactCreatedClientCount,
    fullBackupClientDocumentsPreserved: output.fullBackupClientDocumentsPreserved,
    interimClientsCreatedBeforeThisRecovery: output.interimClientsCreatedBeforeThisRecovery,
    passed: true,
  }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
