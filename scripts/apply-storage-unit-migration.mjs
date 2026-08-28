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
  encodeFirestoreValue,
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
  console.log(`Usage: node scripts/apply-storage-unit-migration.mjs [options]

Default mode performs live, read-only Test and StorageUnits preflight. Preimage
preparation writes one local rollback artifact but performs zero Firestore
writes. Apply writes only StorageUnits and MigrationAudit; it never writes Test.

Required for every mode:
  --plan=PATH               Reviewed planner output
  --project=PROJECT_ID      Exact Firebase project ID
  --backup-manifest=PATH    Exact completed backup used by the plan
  --backup-hash=SHA256      Exact verified JSONL hash
  --plan-hash=SHA256        Exact reviewed plan hash
  --expected-count=221      Exact B1..B119 plus P1..P102 count

Prepare the required rollback artifact:
  --prepare-preimage
  --preimage=PATH           Optional exclusive output path

Additional apply gates:
  --apply
  --preimage=PATH
  --preimage-hash=SHA256
  --confirm=APPLY_STORAGE_UNIT_MIGRATION

Optional:
  --run-id=ID               Stable MigrationAudit ID (defaults from plan hash)
  --help                    Show this help
`);
  process.exit(exitCode);
}

if (args.includes("--help")) usage(0);
for (const name of [
  "plan",
  "project",
  "backup-manifest",
  "backup-hash",
  "plan-hash",
  "expected-count",
]) {
  if (!argumentValue(name)) usage(1);
}

const applyRequested = args.includes("--apply");
const preparePreimageRequested = args.includes("--prepare-preimage");
if (applyRequested && preparePreimageRequested) {
  throw new Error("--apply and --prepare-preimage are mutually exclusive.");
}
if (applyRequested && argumentValue("confirm") !== "APPLY_STORAGE_UNIT_MIGRATION") {
  throw new Error("--apply requires --confirm=APPLY_STORAGE_UNIT_MIGRATION.");
}
if (applyRequested && (!argumentValue("preimage") || !argumentValue("preimage-hash"))) {
  throw new Error("--apply requires exact --preimage and --preimage-hash gates.");
}
if (preparePreimageRequested && argumentValue("preimage-hash")) {
  throw new Error("--prepare-preimage computes the hash; do not supply --preimage-hash.");
}
if (
  !preparePreimageRequested &&
  !applyRequested &&
  Boolean(argumentValue("preimage")) !== Boolean(argumentValue("preimage-hash"))
) {
  throw new Error("A preimage validation dry run requires both --preimage and --preimage-hash.");
}

const expectedProject = argumentValue("project").trim();
const requestedBackupHash = argumentValue("backup-hash").trim().toLowerCase();
const requestedPlanHash = argumentValue("plan-hash").trim().toLowerCase();
const expectedCount = Number(argumentValue("expected-count"));
if (!/^[a-f0-9]{64}$/.test(requestedBackupHash)) {
  throw new Error("--backup-hash must be a 64-character SHA-256 value.");
}
if (!/^[a-f0-9]{64}$/.test(requestedPlanHash)) {
  throw new Error("--plan-hash must be a 64-character SHA-256 value.");
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

async function loadVerifiedPreimage(filePath, expectedHash, assertion) {
  if (expectedHash && !/^[a-f0-9]{64}$/i.test(expectedHash)) {
    throw new Error("--preimage-hash must be a 64-character SHA-256 value.");
  }
  const bytes = await fsPromises.readFile(filePath);
  const actualHash = crypto.createHash("sha256").update(bytes).digest("hex");
  if (expectedHash && actualHash.toLowerCase() !== expectedHash.toLowerCase()) {
    throw new Error("Preimage checksum does not match --preimage-hash.");
  }
  const preimage = JSON.parse(bytes.toString("utf8"));
  assertion(preimage);
  return { preimage, sha256: actualHash };
}

async function writeDurableJsonExclusive(filePath, value) {
  await fsPromises.mkdir(path.dirname(filePath), { recursive: true });
  const handle = await fsPromises.open(filePath, "wx", 0o600);
  try {
    await handle.writeFile(`${JSON.stringify(value, null, 2)}\n`, "utf8");
    await handle.sync();
  } finally {
    await handle.close();
  }
}

const db = initializeFirestore(expectedProject);
if (db.projectId !== expectedProject) throw new Error("Firestore project gate failed.");
const runId = clean(
  argumentValue("run-id") || `storage-units-${calculatedPlanHash.slice(0, 24)}`,
  100
);
if (!/^[A-Za-z0-9._-]+$/.test(runId)) throw new Error("--run-id contains unsafe characters.");
const migrationRef = db.collection("MigrationAudit").doc(runId);
const existingJournal = await migrationRef.get();
if (
  existingJournal.exists &&
  (existingJournal.data()?.type !== "storage-unit-entity-migration" ||
    existingJournal.data()?.sourceProject !== expectedProject ||
    existingJournal.data()?.planHash !== calculatedPlanHash ||
    existingJournal.data()?.backupSha256 !== requestedBackupHash)
) {
  throw new Error(`MigrationAudit/${runId} belongs to a different migration.`);
}

const liveTestInvariant = await readLiveTestInvariant(db);
const testPreflightErrors = compareTestInvariants(plan.testInvariant, liveTestInvariant);
if (testPreflightErrors.length) {
  throw new Error(`Immutable Test preflight failed: ${testPreflightErrors.slice(0, 25).join("; ")}`);
}

const unitRefs = plan.units.map((unit) => db.collection(STORAGE_UNIT_COLLECTION).doc(unit.id));
const unitSnapshots = unitRefs.length ? await db.getAll(...unitRefs) : [];
const states = new Map();
const unitPreflightErrors = [];
for (let index = 0; index < plan.units.length; index += 1) {
  const unit = plan.units[index];
  const snapshot = unitSnapshots[index];
  const state = classifyStorageUnitState(unit, {
    exists: snapshot.exists,
    data: snapshot.exists ? snapshot.data() || {} : null,
  });
  states.set(unit.id, state);
  if (state === "conflict") {
    unitPreflightErrors.push(`${unit.id}:fingerprint-or-existence`);
  } else if (
    ["before", "both"].includes(state) &&
    unit.beforeExists &&
    updateTimeIso(snapshot) !== unit.beforeUpdateTime
  ) {
    unitPreflightErrors.push(`${unit.id}:before-update-time`);
  }
}
if (unitPreflightErrors.length) {
  throw new Error(`StorageUnits preflight conflicts: ${unitPreflightErrors.join(", ")}`);
}

const allPreparedBefore = plan.units.every((unit) =>
  ["before", "both"].includes(states.get(unit.id))
);
const preflightSummary = {
  dryRun: !applyRequested,
  mode: preparePreimageRequested ? "prepare-preimage" : applyRequested ? "apply" : "preflight",
  firestoreWritesPerformed: false,
  testWritesPerformed: 0,
  sourceProject: expectedProject,
  runId,
  planPath,
  planHash: calculatedPlanHash,
  backupHash: requestedBackupHash,
  expectedUnitCount: expectedCount,
  beforeCount: plan.units.filter((unit) => states.get(unit.id) === "before").length,
  afterCount: plan.units.filter((unit) => states.get(unit.id) === "after").length,
  unchangedCount: plan.units.filter((unit) => states.get(unit.id) === "both").length,
  immutableTestCount: liveTestInvariant.count,
  immutableTestFingerprint: liveTestInvariant.aggregateDocumentFingerprint,
  immutableMembershipFingerprint: liveTestInvariant.aggregateMembershipFingerprint,
  existingJournalStatus: existingJournal.exists
    ? existingJournal.data()?.status || "unknown"
    : "none",
};

function assertValidPreimage(preimage) {
  const validation = validateStorageUnitPreimage({
    preimage,
    plan,
    sourceProject: expectedProject,
    planHash: calculatedPlanHash,
    backupSha256: requestedBackupHash,
    runId,
    expectedCount,
  });
  if (!validation.valid) {
    throw new Error(`Preimage contract validation failed: ${validation.errors.join("; ")}`);
  }
}

function createPreimageFromPreflight() {
  return {
    format: "magmo-storage-unit-migration-preimage",
    formatVersion: 1,
    createdAt: new Date().toISOString(),
    sourceProject: expectedProject,
    targetCollection: STORAGE_UNIT_COLLECTION,
    runId,
    planHash: calculatedPlanHash,
    backupSha256: requestedBackupHash,
    targetCount: expectedCount,
    preparationMode: "live-read-only-preflight",
    firestoreWritesPerformed: false,
    testWritesPerformed: 0,
    testInvariant: plan.testInvariant,
    units: plan.units.map((unit, index) => {
      const snapshot = unitSnapshots[index];
      return {
        id: unit.id,
        path: unit.path,
        exists: snapshot.exists,
        updateTime: updateTimeIso(snapshot),
        beforeFingerprint: snapshot.exists ? documentFingerprint(snapshot.data() || {}) : "",
        expectedAfterFingerprint: unit.desiredFingerprint,
        data: snapshot.exists ? encodeFirestoreValue(snapshot.data() || {}) : null,
      };
    }),
  };
}

if (preparePreimageRequested) {
  if (existingJournal.exists) {
    throw new Error(
      `--prepare-preimage requires no MigrationAudit/${runId}; the migration may already have written Firestore.`
    );
  }
  if (!allPreparedBefore) {
    throw new Error("--prepare-preimage requires all 221 units to match the verified backup before state.");
  }
  const prepared = createPreimageFromPreflight();
  assertValidPreimage(prepared);
  const preparedPath = path.resolve(
    repoRoot,
    argumentValue("preimage") ||
      path.join("outputs", "storage-unit-migration", `${runId}-preimage.json`)
  );
  let reused = false;
  let verifiedPrepared;
  if (fs.existsSync(preparedPath)) {
    verifiedPrepared = await loadVerifiedPreimage(preparedPath, "", assertValidPreimage);
    reused = true;
  } else {
    await writeDurableJsonExclusive(preparedPath, prepared);
    verifiedPrepared = await loadVerifiedPreimage(preparedPath, "", assertValidPreimage);
  }
  console.log(
    JSON.stringify(
      {
        ...preflightSummary,
        dryRun: true,
        localArtifactWritten: !reused,
        preimagePrepared: true,
        preimageReused: reused,
        preimagePath: preparedPath,
        preimageSha256: verifiedPrepared.sha256,
      },
      null,
      2
    )
  );
  process.exit(0);
}

const suppliedPreimagePath = argumentValue("preimage")
  ? path.resolve(repoRoot, argumentValue("preimage"))
  : "";
const suppliedPreimageHash = argumentValue("preimage-hash").trim();
if (!suppliedPreimagePath) {
  console.log(JSON.stringify(preflightSummary, null, 2));
  process.exit(0);
}
const loadedPreimage = await loadVerifiedPreimage(
  suppliedPreimagePath,
  suppliedPreimageHash,
  assertValidPreimage
);
const preimage = loadedPreimage.preimage;
const preimageSha256 = loadedPreimage.sha256;

if (!applyRequested) {
  console.log(
    JSON.stringify(
      {
        ...preflightSummary,
        preimageValidated: true,
        preimagePath: suppliedPreimagePath,
        preimageSha256,
      },
      null,
      2
    )
  );
  process.exit(0);
}

if (!existingJournal.exists && !allPreparedBefore) {
  throw new Error("A fresh apply requires every unit to match its exact prepared before state.");
}
if (existingJournal.exists) {
  if (
    path.resolve(clean(existingJournal.data()?.preimagePath, 2000) || ".") !==
      suppliedPreimagePath ||
    clean(existingJournal.data()?.preimageSha256, 100).toLowerCase() !== preimageSha256.toLowerCase()
  ) {
    throw new Error(`MigrationAudit/${runId} is not bound to the supplied preimage path/hash.`);
  }
}

if (!existingJournal.exists) {
  await migrationRef.create({
    type: "storage-unit-entity-migration",
    formatVersion: 1,
    status: "applying",
    sourceProject: expectedProject,
    targetCollection: STORAGE_UNIT_COLLECTION,
    runId,
    planPath,
    planHash: calculatedPlanHash,
    backupManifestPath: manifestPath,
    backupSha256: requestedBackupHash,
    targetCount: expectedCount,
    preimagePath: suppliedPreimagePath,
    preimageSha256,
    preimagePreparedBeforeFirestoreWrites: true,
    testWritesPlanned: 0,
    testWritesPerformed: 0,
    immutableTestCount: plan.testInvariant.count,
    immutableTestFingerprint: plan.testInvariant.aggregateDocumentFingerprint,
    immutableMembershipFingerprint: plan.testInvariant.aggregateMembershipFingerprint,
    startedAt: FieldValue.serverTimestamp(),
  });
} else {
  await migrationRef.set(
    { status: "applying", resumedAt: FieldValue.serverTimestamp(), testWritesPerformed: 0 },
    { merge: true }
  );
}

const results = [];
for (const unit of plan.units) {
  const state = states.get(unit.id);
  if (["after", "both"].includes(state)) {
    results.push({ id: unit.id, status: "already-desired" });
    continue;
  }
  const unitRef = db.collection(STORAGE_UNIT_COLLECTION).doc(unit.id);
  try {
    await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(unitRef);
      const currentState = classifyStorageUnitState(unit, {
        exists: snapshot.exists,
        data: snapshot.exists ? snapshot.data() || {} : null,
      });
      if (currentState === "after" || currentState === "both") {
        transaction.set(migrationRef.collection("storageUnits").doc(unit.id), {
          unitId: unit.id,
          status: "already-desired",
          operation: unit.operation,
          beforeExists: unit.beforeExists,
          beforeFingerprint: unit.beforeFingerprint,
          afterFingerprint: unit.desiredFingerprint,
          testWritesPerformed: 0,
          verifiedAt: FieldValue.serverTimestamp(),
        });
        return;
      }
      if (currentState !== "before") throw new Error("unit no longer matches its preimage state");
      if (unit.beforeExists && updateTimeIso(snapshot) !== unit.beforeUpdateTime) {
        throw new Error("unit before updateTime changed");
      }
      transaction.set(
        unitRef,
        decodeFirestoreValue(unit.desiredData, { db, Timestamp, GeoPoint })
      );
      transaction.set(migrationRef.collection("storageUnits").doc(unit.id), {
        unitId: unit.id,
        status: "applied",
        operation: unit.operation,
        beforeExists: unit.beforeExists,
        beforeFingerprint: unit.beforeFingerprint,
        afterFingerprint: unit.desiredFingerprint,
        testWritesPerformed: 0,
        appliedAt: FieldValue.serverTimestamp(),
      });
    });
    results.push({ id: unit.id, status: "applied" });
  } catch (error) {
    results.push({ id: unit.id, status: "failed", error: error.message });
    break;
  }
}

const failed = results.filter((result) => result.status === "failed");
const verifyUnitSnapshots = unitRefs.length ? await db.getAll(...unitRefs) : [];
const postVerifyErrors = [];
for (let index = 0; index < plan.units.length; index += 1) {
  const unit = plan.units[index];
  const snapshot = verifyUnitSnapshots[index];
  if (!snapshot.exists || documentFingerprint(snapshot.data() || {}) !== unit.desiredFingerprint) {
    postVerifyErrors.push(`${unit.id}:after-fingerprint`);
  }
}
const postTestInvariant = await readLiveTestInvariant(db);
postVerifyErrors.push(...compareTestInvariants(plan.testInvariant, postTestInvariant));

const status = failed.length || postVerifyErrors.length ? "incomplete" : "complete";
await migrationRef.set(
  {
    status,
    appliedCount: results.filter((result) => result.status === "applied").length,
    alreadyDesiredCount: results.filter((result) => result.status === "already-desired").length,
    failed,
    postVerifiedUnitCount: verifyUnitSnapshots.filter((snapshot) => snapshot.exists).length,
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
  format: "magmo-storage-unit-migration-apply-result",
  formatVersion: 1,
  createdAt: new Date().toISOString(),
  sourceProject: expectedProject,
  runId,
  status,
  planPath,
  planHash: calculatedPlanHash,
  backupSha256: requestedBackupHash,
  preimagePath: suppliedPreimagePath,
  preimageSha256,
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
  `${runId}-${resultStamp}-apply-result.json`
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
      preimagePath: suppliedPreimagePath,
      preimageSha256,
      resultPath,
      postVerifyErrors,
    },
    null,
    2
  )
);
if (status !== "complete") process.exitCode = 1;
