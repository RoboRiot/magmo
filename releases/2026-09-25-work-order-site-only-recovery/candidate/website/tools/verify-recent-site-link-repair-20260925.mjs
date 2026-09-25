import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { encodeFirestoreValue, verifyBackupManifest } = require("../lib/firestoreBackupCodec.cjs");
const root = path.resolve(import.meta.dirname, "..");
const applyDir = path.join(root, "outputs/work-order-site-only-recovery-20260925/apply-2026-09-25T19-51-50-351Z");
const backupDir = path.join(root, "outputs/firestore-backups/2026-09-25-site-only-recovery-predeploy");
const manifestPath = path.join(backupDir, "manifest.json");
const backupDataPath = path.join(backupDir, "firestore-documents.jsonl");
const reviewPath = path.join(root, "outputs/work-order-site-only-recovery-20260925/reviewed-targets.json");
const scriptPath = path.join(root, "scripts/repair-recent-work-order-links-2026-09-25.mjs");

function loadEnv() {
  for (const name of [".env.local", ".env"]) {
    const file = path.join(root, name);
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const match = line.trim().match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (!match || process.env[match[1]] != null) continue;
      let value = match[2].trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[match[1]] = value.replace(/\\n/g, "\n");
    }
  }
}

function sortValue(value) {
  if (Array.isArray(value)) return value.map(sortValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, sortValue(value[key])]));
  }
  return value;
}

function stable(value) {
  return JSON.stringify(sortValue(value));
}

function sha256(value) {
  return crypto.createHash("sha256").update(stable(value)).digest("hex");
}

function changedKeys(before, after) {
  return [...new Set([...Object.keys(before || {}), ...Object.keys(after || {})])]
    .filter((key) => stable(before?.[key]) !== stable(after?.[key]))
    .sort();
}

async function backupRows(paths) {
  const wanted = new Set(paths);
  const rows = new Map();
  const input = fs.createReadStream(backupDataPath, { encoding: "utf8" });
  const lines = readline.createInterface({ input, crlfDelay: Infinity });
  for await (const line of lines) {
    const record = JSON.parse(line);
    if (wanted.has(record.path)) rows.set(record.path, record);
  }
  assert.deepEqual([...rows.keys()].sort(), [...wanted].sort(), "Every protected control must exist in the complete backup");
  return rows;
}

async function main() {
  const backup = await verifyBackupManifest(manifestPath);
  assert.equal(backup.documentCount, 187443);
  assert.equal(backup.collectionCount, 1015);
  assert.equal(backup.sha256, "661c286a5fd2ab183f4ec89afcd85f7fe8da67aa47dbebf6e6394db69be4374e");

  const review = JSON.parse(fs.readFileSync(reviewPath, "utf8"));
  const preimages = JSON.parse(fs.readFileSync(path.join(applyDir, "preimages.json"), "utf8"));
  const patches = JSON.parse(fs.readFileSync(path.join(applyDir, "planned-patches.json"), "utf8"));
  const applyReceipt = JSON.parse(fs.readFileSync(path.join(applyDir, "receipt.json"), "utf8"));
  const applyVerification = JSON.parse(fs.readFileSync(path.join(applyDir, "verification.json"), "utf8"));
  const repairModule = await import(`file:///${scriptPath.replace(/\\/g, "/")}`);
  const targetIds = review.targets.map((target) => target.id).sort();
  assert.deepEqual(Object.keys(patches).sort(), targetIds);
  assert.deepEqual(applyReceipt.workOrderIds.slice().sort(), targetIds);
  assert.equal(applyReceipt.workOrdersPatched, 16);
  assert.equal(applyReceipt.inventoryItemsModified, 0);
  assert.equal(applyReceipt.directoryDocumentsModified, 0);
  assert.equal(applyVerification.untouchedFieldDifferences, 0);
  assert.equal(applyVerification.destinations.length, 16);

  const source = fs.readFileSync(scriptPath, "utf8");
  assert.match(source, /tx\.update\(db\.doc\(`OpsWorkOrders\//);
  assert.match(source, /tx\.create\(receipt,summary\)/);
  assert.doesNotMatch(source, /(?:update|set|create|delete)\(db\.doc\([`'"](?:Test|Client|Machine|Trailers)\//);

  loadEnv();
  assert.equal(process.env.FIREBASE_PROJECT_ID, "magmo-ac10c");
  const credentialsPath = path.resolve(root,
    process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH ||
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS);
  const account = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));
  assert.equal(account.project_id, "magmo-ac10c");
  if (!getApps().length) initializeApp({ credential: cert(account), projectId: account.project_id });
  const db = getFirestore();

  const preimageByPath = new Map(preimages.documents.map((entry) => [entry.path, entry]));
  const liveTargets = await db.getAll(...targetIds.map((id) => db.doc(`OpsWorkOrders/${id}`)));
  const targetSummary = [];
  for (const snapshot of liveTargets) {
    assert(snapshot.exists);
    const id = snapshot.id;
    const before = preimageByPath.get(snapshot.ref.path)?.data;
    const patch = patches[id];
    assert(before && patch);
    assert(Object.keys(patch).every((key) => repairModule.ALLOWED_PATCH_KEYS.includes(key)));
    const live = encodeFirestoreValue(snapshot.data());
    const expected = { ...before, ...patch };
    assert.equal(stable(live), stable(expected), `${id} must equal its exact preimage plus allowlisted patch`);
    const actualChanged = changedKeys(before, live);
    const expectedChanged = changedKeys(before, expected);
    assert.deepEqual(actualChanged, expectedChanged, `${id} changed-key set`);
    assert(actualChanged.every((key) => repairModule.ALLOWED_PATCH_KEYS.includes(key)));
    const protectedChanged = actualChanged.filter((key) => /history|workflow|slack|item|inventory|assignment|calendar|receipt/i.test(key));
    assert.deepEqual(protectedChanged, [], `${id} protected operational fields`);
    const target = review.targets.find((entry) => entry.id === id);
    assert.equal(live.clientId, target.clientId);
    assert.equal(live.machineId, undefined);
    assert.equal(live.trailerId, undefined);
    targetSummary.push({ workOrderId: id, clientId: live.clientId, changedKeys: actualChanged,
      beforeSHA256: sha256(before), afterSHA256: sha256(live) });
  }

  const protectedPaths = [
    "Client/AIS78723", "Client/AIS31753", "Client/AIS94688", "Client/AIS24933",
    "Client/AIS46541", "Client/AIS15358", "Client/AIS17182",
    "Test/AIS23663",
    "Test/AIS23663/WorkOrderAddHistory/67e2deaf-ca06-4b71-a8f8-4bb2ea159cc1",
    "InventoryWorkOrderAddOperations/67e2deaf-ca06-4b71-a8f8-4bb2ea159cc1",
    "OpsWorkOrders/10659", "OpsWorkOrders/10677",
  ];
  const protectedBackup = await backupRows(protectedPaths);
  const protectedLive = await db.getAll(...protectedPaths.map((value) => db.doc(value)));
  const protectedSummary = [];
  const listenerBookkeeping = new Set([
    "bluefolderImportFingerprint", "bluefolderImportUpdatedAt", "bluefolderImportUpdatedAtIso", "updatedAt",
  ]);
  for (const snapshot of protectedLive) {
    assert(snapshot.exists, `${snapshot.ref.path} must still exist`);
    const before = protectedBackup.get(snapshot.ref.path).data;
    const live = encodeFirestoreValue(snapshot.data());
    const differences = changedKeys(before, live);
    if (snapshot.ref.path.startsWith("OpsWorkOrders/")) {
      assert(differences.every((key) => listenerBookkeeping.has(key)), `${snapshot.ref.path} control changed outside listener bookkeeping`);
      for (const key of ["clientId", "machineId", "trailerId", "selectionHistory", "workflowStageHistory",
        "assignmentHistory", "inventoryMovements", "partMovementsHistory", "workOrders"]) {
        assert.equal(stable(live[key]), stable(before[key]), `${snapshot.ref.path}.${key}`);
      }
    } else {
      assert.equal(stable(live), stable(before), `${snapshot.ref.path} must be byte-logically unchanged from backup`);
    }
    protectedSummary.push({ path: snapshot.ref.path, unchanged: differences.length === 0,
      changedKeys: differences, backupSHA256: sha256(before), liveSHA256: sha256(live) });
  }

  const repairReceiptSnapshot = await db.doc("DataRepairReceipts/recent-work-order-site-links-20260925").get();
  assert(repairReceiptSnapshot.exists);
  const repairReceipt = repairReceiptSnapshot.data() || {};
  assert.deepEqual((repairReceipt.workOrderIds || []).slice().sort(), targetIds);
  assert.equal(repairReceipt.workOrdersPatched, 16);
  assert.equal(repairReceipt.inventoryItemsModified, 0);
  assert.equal(repairReceipt.directoryDocumentsModified, 0);

  const output = {
    schemaVersion: 1,
    checkedAt: new Date().toISOString(),
    repairId: applyReceipt.repairId,
    independentVerificationPassed: true,
    targetCount: targetSummary.length,
    exactPreimagePlusPatchCount: targetSummary.length,
    unexpectedChangedFields: 0,
    protectedOperationalFieldChanges: 0,
    inventoryItemsModified: 0,
    directoryDocumentsModified: 0,
    workOrderAddDestinationsVerifiedByApply: applyVerification.destinations.length,
    backup: { documentCount: backup.documentCount, collectionCount: backup.collectionCount,
      artifactSHA256: backup.sha256, manifestSHA256: "5144876dba6ca86c5ae8b84e051b9c10f9e60e0ade8afaca424e0cafe54d67cc" },
    targets: targetSummary,
    protectedControls: protectedSummary,
  };
  const outputPath = path.join(applyDir, "independent-verification.json");
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), { flag: "wx" });
  console.log(JSON.stringify({ outputPath, targetCount: output.targetCount,
    protectedControlCount: output.protectedControls.length, passed: true }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
