import crypto from "node:crypto";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, GeoPoint, Timestamp, getFirestore } from "firebase-admin/firestore";

const require = createRequire(import.meta.url);
const {
  STORAGE_UNIT_COLLECTION,
  STORAGE_UNIT_COUNT,
  classifyStorageUnitState,
  clean,
  compareTestInvariants,
  computeStorageUnitPlanHash,
  computeTestInvariant,
  decodeFirestoreValue,
  documentFingerprint,
  validateStorageUnitPlan,
  validateStorageUnitPreimage,
} = require("../lib/inventory/storageUnitMigration.cjs");
const { verifyBackupManifest } = require("../lib/firestoreBackupCodec.cjs");

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDirectory, "..");
const args = process.argv.slice(2);

function argumentValue(name) {
  const prefix = `--${name}=`;
  return args.find((argument) => argument.startsWith(prefix))?.slice(prefix.length) || "";
}

function usage(exitCode = 0) {
  console.log(`Usage: node scripts/restore-storage-unit-migration.mjs [options]

Default mode is a live, read-only restore preflight. It verifies the reviewed
backup, plan, preimage, source journal, all 221 StorageUnits states, and the
unchanged Test collection. Restore can delete migration-created units or put
preexisting unit documents back exactly from the preimage. It never writes Test.

Required:
  --plan=PATH
  --preimage=PATH
  --preimage-hash=SHA256
  --project=PROJECT_ID
  --backup-manifest=PATH
  --backup-hash=SHA256
  --plan-hash=SHA256
  --expected-count=221

Additional restore authorization:
  --apply
  --confirm=RESTORE_STORAGE_UNIT_MIGRATION

Optional:
  --run-id=ID               Source apply journal ID
  --restore-run-id=ID       Restore journal ID
  --help                    Show this help
`);
  process.exit(exitCode);
}

if (args.includes("--help")) usage(0);
for (const name of [
  "plan",
  "preimage",
  "preimage-hash",
  "project",
  "backup-manifest",
  "backup-hash",
  "plan-hash",
  "expected-count",
]) {
  if (!argumentValue(name)) usage(1);
}
const applyRequested = args.includes("--apply");
if (applyRequested && argumentValue("confirm") !== "RESTORE_STORAGE_UNIT_MIGRATION") {
  throw new Error("--apply requires --confirm=RESTORE_STORAGE_UNIT_MIGRATION.");
}

const expectedProject = argumentValue("project").trim();
const requestedBackupHash = argumentValue("backup-hash").trim().toLowerCase();
const requestedPlanHash = argumentValue("plan-hash").trim().toLowerCase();
const requestedPreimageHash = argumentValue("preimage-hash").trim().toLowerCase();
const expectedCount = Number(argumentValue("expected-count"));
for (const [name, value] of [
  ["backup-hash", requestedBackupHash],
  ["plan-hash", requestedPlanHash],
  ["preimage-hash", requestedPreimageHash],
]) {
  if (!/^[a-f0-9]{64}$/.test(value)) {
    throw new Error(`--${name} must be a 64-character SHA-256 value.`);
  }
}
if (expectedCount !== STORAGE_UNIT_COUNT) {
  throw new Error(`--expected-count must be exactly ${STORAGE_UNIT_COUNT}.`);
}

const planPath = path.resolve(repoRoot, argumentValue("plan"));
const plan = JSON.parse(await fsPromises.readFile(planPath, "utf8"));
const calculatedPlanHash = computeStorageUnitPlanHash(plan);
const planValidation = validateStorageUnitPlan(plan, {
  sourceProject: expectedProject,
  planHash: requestedPlanHash,
  backupSha256: requestedBackupHash,
  expectedCount,
});
if (!planValidation.valid || calculatedPlanHash !== requestedPlanHash) {
  throw new Error(`Plan contract validation failed: ${planValidation.errors.join("; ")}`);
}

const manifestPath = path.resolve(repoRoot, argumentValue("backup-manifest"));
const backupVerification = await verifyBackupManifest(manifestPath);
const manifest = JSON.parse(await fsPromises.readFile(manifestPath, "utf8"));
if (manifest.sourceProject !== expectedProject) {
  throw new Error("Backup project does not match the explicit project gate.");
}
if (
  backupVerification.sha256.toLowerCase() !== requestedBackupHash ||
  manifest.files?.["firestore-documents.jsonl"]?.sha256?.toLowerCase() !== requestedBackupHash ||
  plan.backup?.sha256?.toLowerCase() !== requestedBackupHash
) {
  throw new Error("Backup hash does not match the plan, manifest, and explicit gate.");
}
if (
  plan.backup.documentCount !== manifest.documentCount ||
  plan.backup.bytes !== backupVerification.bytes ||
  plan.backup.createdAt !== manifest.createdAt
) {
  throw new Error("Plan backup receipt does not match the exact verified manifest.");
}

const preimagePath = path.resolve(repoRoot, argumentValue("preimage"));
const preimageBytes = await fsPromises.readFile(preimagePath);
const actualPreimageHash = crypto.createHash("sha256").update(preimageBytes).digest("hex");
if (actualPreimageHash.toLowerCase() !== requestedPreimageHash) {
  throw new Error("Preimage checksum does not match --preimage-hash.");
}
const preimage = JSON.parse(preimageBytes.toString("utf8"));

const runId = clean(
  argumentValue("run-id") || `storage-units-${calculatedPlanHash.slice(0, 24)}`,
  100
);
const restoreRunId = clean(argumentValue("restore-run-id") || `${runId}-restore`, 100);
if (!/^[A-Za-z0-9._-]+$/.test(runId) || !/^[A-Za-z0-9._-]+$/.test(restoreRunId)) {
  throw new Error("Run IDs contain unsafe characters.");
}
if (runId === restoreRunId) throw new Error("Source and restore run IDs must differ.");

const preimageValidation = validateStorageUnitPreimage({
  preimage,
  plan,
  sourceProject: expectedProject,
  planHash: calculatedPlanHash,
  backupSha256: requestedBackupHash,
  runId,
  expectedCount,
});
if (!preimageValidation.valid) {
  throw new Error(`Preimage contract validation failed: ${preimageValidation.errors.join("; ")}`);
}

function loadEnvFile(filename) {
  if (!fs.existsSync(filename)) return;
  for (const rawLine of fs.readFileSync(filename, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const match = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
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
for (const filename of [".env.local", ".env"]) loadEnvFile(path.join(repoRoot, filename));

function initializeFirestore(projectId) {
  if (getApps().length) {
    const db = getFirestore();
    if (db.projectId !== projectId) {
      throw new Error(`Initialized project ${db.projectId} does not match ${projectId}.`);
    }
    return db;
  }
  const credentialValue = clean(
    process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH ||
      process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
      process.env.GOOGLE_APPLICATION_CREDENTIALS,
    2000
  );
  if (!credentialValue) throw new Error("Firebase Admin credentials are not configured.");
  const credentialPath = path.isAbsolute(credentialValue)
    ? credentialValue
    : path.resolve(repoRoot, credentialValue);
  const serviceAccount = JSON.parse(fs.readFileSync(credentialPath, "utf8"));
  if (serviceAccount.project_id !== projectId) {
    throw new Error(
      `Credential project ${serviceAccount.project_id || "(missing)"} does not match ${projectId}.`
    );
  }
  initializeApp({ credential: cert(serviceAccount), projectId: serviceAccount.project_id });
  return getFirestore();
}

function updateTimeIso(snapshot) {
  return snapshot?.updateTime?.toDate?.().toISOString?.() || "";
}

async function readLiveTestInvariant(db) {
  const snapshot = await db.collection("Test").get();
  return computeTestInvariant(
    snapshot.docs.map((document) => ({
      id: document.id,
      data: document.data() || {},
      updateTime: updateTimeIso(document),
    }))
  );
}

const db = initializeFirestore(expectedProject);
if (db.projectId !== expectedProject) throw new Error("Firestore project gate failed.");
const sourceRef = db.collection("MigrationAudit").doc(runId);
const restoreRef = db.collection("MigrationAudit").doc(restoreRunId);
const [sourceJournal, existingRestoreJournal] = await Promise.all([
  sourceRef.get(),
  restoreRef.get(),
]);
if (
  sourceJournal.exists &&
  (sourceJournal.data()?.type !== "storage-unit-entity-migration" ||
    sourceJournal.data()?.sourceProject !== expectedProject ||
    sourceJournal.data()?.planHash !== calculatedPlanHash ||
    sourceJournal.data()?.backupSha256 !== requestedBackupHash ||
    path.resolve(clean(sourceJournal.data()?.preimagePath, 2000) || ".") !== preimagePath ||
    clean(sourceJournal.data()?.preimageSha256, 100).toLowerCase() !== requestedPreimageHash)
) {
  throw new Error(`MigrationAudit/${runId} does not match the reviewed migration/preimage.`);
}
if (
  existingRestoreJournal.exists &&
  (existingRestoreJournal.data()?.type !== "storage-unit-entity-migration-restore" ||
    existingRestoreJournal.data()?.sourceRunId !== runId ||
    existingRestoreJournal.data()?.sourceProject !== expectedProject ||
    existingRestoreJournal.data()?.planHash !== calculatedPlanHash ||
    existingRestoreJournal.data()?.preimageSha256 !== requestedPreimageHash)
) {
  throw new Error(`MigrationAudit/${restoreRunId} belongs to a different restore.`);
}

const liveTestInvariant = await readLiveTestInvariant(db);
const testPreflightErrors = compareTestInvariants(plan.testInvariant, liveTestInvariant);
if (testPreflightErrors.length) {
  throw new Error(`Immutable Test preflight failed: ${testPreflightErrors.slice(0, 25).join("; ")}`);
}

const unitRefs = plan.units.map((unit) => db.collection(STORAGE_UNIT_COLLECTION).doc(unit.id));
const unitSnapshots = unitRefs.length ? await db.getAll(...unitRefs) : [];
const states = new Map();
const preflightErrors = [];
for (let index = 0; index < plan.units.length; index += 1) {
  const unit = plan.units[index];
  const snapshot = unitSnapshots[index];
  const state = classifyStorageUnitState(unit, {
    exists: snapshot.exists,
    data: snapshot.exists ? snapshot.data() || {} : null,
  });
  states.set(unit.id, state);
  if (state === "conflict") preflightErrors.push(`${unit.id}:fingerprint-or-existence`);
}
if (preflightErrors.length) {
  throw new Error(`Restore preflight conflicts: ${preflightErrors.join(", ")}`);
}

const preflightSummary = {
  dryRun: !applyRequested,
  mode: applyRequested ? "restore" : "restore-preflight",
  firestoreWritesPerformed: false,
  testWritesPerformed: 0,
  sourceProject: expectedProject,
  sourceRunId: runId,
  restoreRunId,
  sourceJournalStatus: sourceJournal.exists ? sourceJournal.data()?.status || "unknown" : "none",
  restoreJournalStatus: existingRestoreJournal.exists
    ? existingRestoreJournal.data()?.status || "unknown"
    : "none",
  planPath,
  planHash: calculatedPlanHash,
  backupHash: requestedBackupHash,
  preimagePath,
  preimageSha256: requestedPreimageHash,
  expectedUnitCount: expectedCount,
  afterCount: plan.units.filter((unit) => states.get(unit.id) === "after").length,
  restoredCount: plan.units.filter((unit) => states.get(unit.id) === "before").length,
  unchangedCount: plan.units.filter((unit) => states.get(unit.id) === "both").length,
  immutableTestCount: liveTestInvariant.count,
  immutableTestFingerprint: liveTestInvariant.aggregateDocumentFingerprint,
  immutableMembershipFingerprint: liveTestInvariant.aggregateMembershipFingerprint,
  sourceMigrationPresent: sourceJournal.exists,
};

if (!applyRequested) {
  console.log(JSON.stringify(preflightSummary, null, 2));
  process.exit(0);
}
if (!sourceJournal.exists) {
  throw new Error(`MigrationAudit/${runId} does not exist; no reviewed apply can be restored.`);
}

if (!existingRestoreJournal.exists) {
  await restoreRef.create({
    type: "storage-unit-entity-migration-restore",
    formatVersion: 1,
    status: "restoring",
    sourceProject: expectedProject,
    sourceRunId: runId,
    restoreRunId,
    targetCollection: STORAGE_UNIT_COLLECTION,
    planPath,
    planHash: calculatedPlanHash,
    backupManifestPath: manifestPath,
    backupSha256: requestedBackupHash,
    preimagePath,
    preimageSha256: requestedPreimageHash,
    targetCount: expectedCount,
    testWritesPlanned: 0,
    testWritesPerformed: 0,
    startedAt: FieldValue.serverTimestamp(),
  });
} else {
  await restoreRef.set(
    { status: "restoring", resumedAt: FieldValue.serverTimestamp(), testWritesPerformed: 0 },
    { merge: true }
  );
}

const preimageById = new Map(preimage.units.map((unit) => [unit.id, unit]));
const results = [];
for (const unit of plan.units) {
  if (["before", "both"].includes(states.get(unit.id))) {
    results.push({ id: unit.id, status: "already-restored" });
    continue;
  }
  const before = preimageById.get(unit.id);
  const unitRef = db.collection(STORAGE_UNIT_COLLECTION).doc(unit.id);
  try {
    await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(unitRef);
      const currentState = classifyStorageUnitState(unit, {
        exists: snapshot.exists,
        data: snapshot.exists ? snapshot.data() || {} : null,
      });
      if (currentState === "before" || currentState === "both") {
        transaction.set(restoreRef.collection("storageUnits").doc(unit.id), {
          unitId: unit.id,
          status: "already-restored",
          restoredExists: before.exists,
          beforeFingerprint: unit.desiredFingerprint,
          afterFingerprint: before.beforeFingerprint,
          testWritesPerformed: 0,
          verifiedAt: FieldValue.serverTimestamp(),
        });
        return;
      }
      if (currentState !== "after") throw new Error("unit no longer matches its exact after state");
      if (before.exists) {
        transaction.set(
          unitRef,
          decodeFirestoreValue(before.data, { db, Timestamp, GeoPoint })
        );
      } else {
        transaction.delete(unitRef);
      }
      transaction.set(restoreRef.collection("storageUnits").doc(unit.id), {
        unitId: unit.id,
        status: "restored",
        restoredExists: before.exists,
        beforeFingerprint: unit.desiredFingerprint,
        afterFingerprint: before.beforeFingerprint,
        testWritesPerformed: 0,
        restoredAt: FieldValue.serverTimestamp(),
      });
    });
    results.push({ id: unit.id, status: before.exists ? "restored" : "deleted-created-unit" });
  } catch (error) {
    results.push({ id: unit.id, status: "failed", error: error.message });
    break;
  }
}

const failed = results.filter((result) => result.status === "failed");
const verifyUnitSnapshots = unitRefs.length ? await db.getAll(...unitRefs) : [];
const postVerifyErrors = [];
for (let index = 0; index < preimage.units.length; index += 1) {
  const before = preimage.units[index];
  const snapshot = verifyUnitSnapshots[index];
  if (snapshot.exists !== before.exists) {
    postVerifyErrors.push(`${before.id}:restored-existence`);
  } else if (
    snapshot.exists &&
    documentFingerprint(snapshot.data() || {}) !== before.beforeFingerprint
  ) {
    postVerifyErrors.push(`${before.id}:restored-fingerprint`);
  }
}
const postTestInvariant = await readLiveTestInvariant(db);
postVerifyErrors.push(...compareTestInvariants(plan.testInvariant, postTestInvariant));
const status = failed.length || postVerifyErrors.length ? "incomplete" : "complete";

await restoreRef.set(
  {
    status,
    restoredCount: results.filter((result) => result.status === "restored").length,
    deletedCreatedUnitCount: results.filter((result) => result.status === "deleted-created-unit").length,
    alreadyRestoredCount: results.filter((result) => result.status === "already-restored").length,
    failed,
    postVerifiedUnitCount: preimage.units.length - postVerifyErrors.filter(
      (error) => /^B\d+:|^P\d+:/.test(error)
    ).length,
    postVerifiedTestCount: postTestInvariant.count,
    postVerifiedTestFingerprint: postTestInvariant.aggregateDocumentFingerprint,
    postVerifiedMembershipFingerprint: postTestInvariant.aggregateMembershipFingerprint,
    testWritesPerformed: 0,
    postVerifyErrors,
    completedAt: FieldValue.serverTimestamp(),
  },
  { merge: true }
);

const resultReport = {
  format: "magmo-storage-unit-migration-restore-result",
  formatVersion: 1,
  createdAt: new Date().toISOString(),
  sourceProject: expectedProject,
  sourceRunId: runId,
  restoreRunId,
  status,
  planPath,
  planHash: calculatedPlanHash,
  backupSha256: requestedBackupHash,
  preimagePath,
  preimageSha256: requestedPreimageHash,
  expectedUnitCount: expectedCount,
  testWritesPerformed: 0,
  results,
  postVerifyErrors,
};
const resultStamp = new Date().toISOString().replace(/[:.]/g, "-");
const resultPath = path.join(
  repoRoot,
  "outputs",
  "storage-unit-migration",
  `${restoreRunId}-${resultStamp}-restore-result.json`
);
await fsPromises.mkdir(path.dirname(resultPath), { recursive: true });
await fsPromises.writeFile(resultPath, `${JSON.stringify(resultReport, null, 2)}\n`, {
  encoding: "utf8",
  flag: "wx",
});
console.log(
  JSON.stringify(
    {
      ...preflightSummary,
      dryRun: false,
      firestoreWritesPerformed: true,
      testWritesPerformed: 0,
      status,
      resultPath,
      postVerifyErrors,
    },
    null,
    2
  )
);
if (status !== "complete") process.exitCode = 1;
