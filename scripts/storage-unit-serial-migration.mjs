import crypto from "node:crypto";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

const require = createRequire(import.meta.url);
const {
  MUTATED_FIELDS,
  SERIAL_MIGRATION_FORMAT_VERSION,
  SERIAL_PREIMAGE_FORMAT,
  STORAGE_UNIT_COLLECTION,
  buildStorageUnitSerialPlan,
  classifySerialState,
  clean,
  compareTestInvariants,
  computeSerialPlanHash,
  computeTestInvariant,
  decodeFirestoreValue,
  documentFingerprint,
  encodeFirestoreValue,
  stableStringify,
  validateStorageUnitSerialPlan,
  validateStorageUnitSerialPreimage,
} = require("../lib/inventory/storageUnitSerialMigration.cjs");
const {
  BACKUP_DOCUMENT_FILE,
  verifyBackupManifest,
} = require("../lib/firestoreBackupCodec.cjs");

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDirectory, "..");
const args = process.argv.slice(2);
const MODES = new Set(["plan", "preimage", "apply", "verify", "restore"]);
const RESTORABLE_SOURCE_JOURNAL_STATUSES = new Set([
  "applying",
  "incomplete",
  "complete",
]);
const KNOWN_OPTIONS = new Set([
  "--help",
  "--mode",
  "--project",
  "--backup-manifest",
  "--backup-hash",
  "--expected-count",
  "--plan",
  "--plan-hash",
  "--preimage",
  "--preimage-hash",
  "--output",
  "--run-id",
  "--restore-run-id",
  "--confirm",
]);

function usage(exitCode = 0) {
  console.log(`Usage: node scripts/storage-unit-serial-migration.mjs --mode=MODE [options]

Creates and applies an additive serial alias migration for existing bin/pallet
documents. Document IDs remain B#/P#. Only StorageUnits.serialCode and
StorageUnits.scannerAliases may change. Test inventory and all location,
membership, parent, and photo fields are fingerprint-guarded and never written.

Required in every mode:
  --mode=plan|preimage|apply|verify|restore
  --project=PROJECT_ID
  --backup-manifest=PATH       Completed dated Firestore backup manifest
  --backup-hash=SHA256         Exact verified JSONL checksum
  --expected-count=NUMBER      Exact StorageUnits count (currently 232)

Plan from the completed backup (offline, no Firebase writes):
  --mode=plan
  --output=PATH                New exclusive plan path

Live preimage preparation (read-only Firestore; local artifact only):
  --mode=preimage
  --plan=PATH --plan-hash=SHA256
  --preimage=PATH              New exclusive rollback artifact path

Apply (writes only StorageUnits alias fields and MigrationAudit):
  --mode=apply
  --plan=PATH --plan-hash=SHA256
  --preimage=PATH --preimage-hash=SHA256
  --confirm=APPLY_STORAGE_UNIT_SERIAL_ALIASES

Verify (read-only Firestore):
  --mode=verify
  --plan=PATH --plan-hash=SHA256
  --preimage=PATH --preimage-hash=SHA256

Restore (restores only the two alias fields from the exact preimage):
  --mode=restore
  --plan=PATH --plan-hash=SHA256
  --preimage=PATH --preimage-hash=SHA256
  --confirm=RESTORE_STORAGE_UNIT_SERIAL_ALIASES

Optional:
  --run-id=ID                  Stable source MigrationAudit ID
  --restore-run-id=ID          Stable restore MigrationAudit ID
  --output=PATH                Apply/verify/restore result path
  --help
`);
  process.exit(exitCode);
}

function optionValue(name) {
  const fullName = `--${name}`;
  const inline = args.filter((argument) => argument.startsWith(`${fullName}=`));
  const separateIndexes = args
    .map((argument, index) => (argument === fullName ? index : -1))
    .filter((index) => index >= 0);
  if (inline.length + separateIndexes.length > 1) {
    throw new Error(`${fullName} may only be supplied once.`);
  }
  if (inline.length) {
    const value = inline[0].slice(fullName.length + 1).trim();
    if (!value) throw new Error(`${fullName} requires a value.`);
    return value;
  }
  if (separateIndexes.length) {
    const value = args[separateIndexes[0] + 1];
    if (!value || value.startsWith("--")) throw new Error(`${fullName} requires a value.`);
    return value;
  }
  return "";
}

for (let index = 0; index < args.length; index += 1) {
  const argument = args[index];
  if (!argument.startsWith("--")) throw new Error(`Unexpected positional argument: ${argument}`);
  const name = argument.split("=", 1)[0];
  if (!KNOWN_OPTIONS.has(name)) throw new Error(`Unknown option: ${name}`);
  if (!argument.includes("=") && name !== "--help") index += 1;
}
if (args.includes("--help")) usage(0);

const mode = optionValue("mode").toLowerCase();
if (!MODES.has(mode)) usage(1);
for (const name of ["project", "backup-manifest", "backup-hash", "expected-count"]) {
  if (!optionValue(name)) usage(1);
}
if (mode === "plan" && !optionValue("output")) usage(1);
if (mode !== "plan" && (!optionValue("plan") || !optionValue("plan-hash"))) usage(1);
if (mode === "preimage" && !optionValue("preimage")) usage(1);
if (
  ["apply", "verify", "restore"].includes(mode) &&
  (!optionValue("preimage") || !optionValue("preimage-hash"))
) {
  usage(1);
}
if (mode === "apply" && optionValue("confirm") !== "APPLY_STORAGE_UNIT_SERIAL_ALIASES") {
  throw new Error("Apply requires --confirm=APPLY_STORAGE_UNIT_SERIAL_ALIASES.");
}
if (mode === "restore" && optionValue("confirm") !== "RESTORE_STORAGE_UNIT_SERIAL_ALIASES") {
  throw new Error("Restore requires --confirm=RESTORE_STORAGE_UNIT_SERIAL_ALIASES.");
}
if (!["apply", "restore"].includes(mode) && optionValue("confirm")) {
  throw new Error("--confirm is accepted only in apply or restore mode.");
}

const expectedProject = clean(optionValue("project"), 300);
const requestedBackupHash = optionValue("backup-hash").trim().toLowerCase();
const expectedCount = Number(optionValue("expected-count"));
if (!/^[a-f0-9]{64}$/.test(requestedBackupHash)) {
  throw new Error("--backup-hash must be a 64-character SHA-256 value.");
}
if (!Number.isSafeInteger(expectedCount) || expectedCount < 1) {
  throw new Error("--expected-count must be a positive integer.");
}

function resolveRepoPath(value) {
  return path.isAbsolute(value) ? path.resolve(value) : path.resolve(repoRoot, value);
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

async function readHashedJson(filePath, expectedHash = "") {
  const bytes = await fsPromises.readFile(filePath);
  const sha256 = crypto.createHash("sha256").update(bytes).digest("hex");
  if (expectedHash && sha256 !== expectedHash.toLowerCase()) {
    throw new Error(`${filePath} checksum does not match its explicit SHA-256 gate.`);
  }
  return { value: JSON.parse(bytes.toString("utf8")), sha256 };
}

const manifestPath = resolveRepoPath(optionValue("backup-manifest"));
const backupVerification = await verifyBackupManifest(manifestPath);
const manifest = JSON.parse(await fsPromises.readFile(manifestPath, "utf8"));
if (manifest.sourceProject !== expectedProject) {
  throw new Error("Backup source project does not match --project.");
}
if (
  backupVerification.sha256.toLowerCase() !== requestedBackupHash ||
  manifest.files?.[BACKUP_DOCUMENT_FILE]?.sha256?.toLowerCase() !== requestedBackupHash
) {
  throw new Error("Backup checksum does not match --backup-hash and the manifest receipt.");
}
if ((manifest.collectionCounts?.[STORAGE_UNIT_COLLECTION] || 0) !== expectedCount) {
  throw new Error("Backup StorageUnits count does not match --expected-count.");
}

async function loadBackupInputs(documentPath) {
  const storageUnits = [];
  const items = [];
  let warehouseDirectory = null;
  let warehouseDirectoryUpdateTime = "";
  const input = fs.createReadStream(documentPath, { encoding: "utf8" });
  const lines = readline.createInterface({ input, crlfDelay: Infinity });
  for await (const line of lines) {
    const record = JSON.parse(line);
    const storageMatch = clean(record.path, 1000).match(/^StorageUnits\/([^/]+)$/);
    const testMatch = clean(record.path, 1000).match(/^Test\/([^/]+)$/);
    if (storageMatch) {
      storageUnits.push({
        id: storageMatch[1],
        path: record.path,
        updateTime: clean(record.updateTime, 100),
        data: record.data || {},
      });
    } else if (testMatch) {
      items.push({
        id: testMatch[1],
        path: record.path,
        updateTime: clean(record.updateTime, 100),
        data: record.data || {},
      });
    } else if (record.path === "Warehouse/directory") {
      if (warehouseDirectory) throw new Error("Backup contains duplicate Warehouse/directory records.");
      warehouseDirectory = record.data || {};
      warehouseDirectoryUpdateTime = clean(record.updateTime, 100);
    }
  }
  if (!warehouseDirectory) throw new Error("Backup is missing Warehouse/directory.");
  return { storageUnits, items, warehouseDirectory, warehouseDirectoryUpdateTime };
}

if (mode === "plan") {
  const inputs = await loadBackupInputs(backupVerification.documentPath);
  if (inputs.items.length !== (manifest.collectionCounts?.Test || 0)) {
    throw new Error("Backup root Test count does not match the manifest.");
  }
  const plan = buildStorageUnitSerialPlan({
    sourceProject: expectedProject,
    backup: {
      createdAt: manifest.createdAt,
      documentCount: manifest.documentCount,
      bytes: backupVerification.bytes,
      sha256: backupVerification.sha256,
      verified: true,
    },
    warehouseDirectory: inputs.warehouseDirectory,
    warehouseDirectoryUpdateTime: inputs.warehouseDirectoryUpdateTime,
    storageUnits: inputs.storageUnits,
    items: inputs.items,
    expectedCount,
  });
  const validation = validateStorageUnitSerialPlan(plan, {
    sourceProject: expectedProject,
    backupSha256: requestedBackupHash,
    planHash: plan.planHash,
    expectedCount,
  });
  if (!validation.valid) {
    throw new Error(`Generated plan validation failed: ${validation.errors.join("; ")}`);
  }
  const outputPath = resolveRepoPath(optionValue("output"));
  await writeDurableJsonExclusive(outputPath, plan);
  const artifact = await readHashedJson(outputPath);
  console.log(
    JSON.stringify(
      {
        mode,
        readOnly: true,
        firestoreWritesPerformed: false,
        testWritesPerformed: 0,
        sourceProject: expectedProject,
        backupManifestPath: manifestPath,
        backupSha256: requestedBackupHash,
        expectedUnitCount: expectedCount,
        expectedWriteCount: plan.expectedWriteCount,
        itemIdentityCollisionCount: plan.itemIdentityCollisionCount,
        planPath: outputPath,
        planHash: plan.planHash,
        planFileSha256: artifact.sha256,
      },
      null,
      2
    )
  );
  process.exit(0);
}

const requestedPlanHash = optionValue("plan-hash").trim().toLowerCase();
if (!/^[a-f0-9]{64}$/.test(requestedPlanHash)) {
  throw new Error("--plan-hash must be a 64-character SHA-256 value.");
}
const planPath = resolveRepoPath(optionValue("plan"));
const { value: plan } = await readHashedJson(planPath);
const calculatedPlanHash = computeSerialPlanHash(plan);
const planValidation = validateStorageUnitSerialPlan(plan, {
  sourceProject: expectedProject,
  backupSha256: requestedBackupHash,
  planHash: requestedPlanHash,
  expectedCount,
});
if (!planValidation.valid || calculatedPlanHash !== requestedPlanHash) {
  throw new Error(`Plan validation failed: ${planValidation.errors.join("; ")}`);
}
if (
  plan.backup?.createdAt !== manifest.createdAt ||
  plan.backup?.documentCount !== manifest.documentCount ||
  plan.backup?.bytes !== backupVerification.bytes
) {
  throw new Error("Plan does not belong to the exact verified backup manifest.");
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
  initializeApp({ credential: cert(serviceAccount), projectId });
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

async function readLiveState(db) {
  const [unitSnapshot, directorySnapshot, testInvariant] = await Promise.all([
    db.collection(STORAGE_UNIT_COLLECTION).get(),
    db.collection("Warehouse").doc("directory").get(),
    readLiveTestInvariant(db),
  ]);
  if (!directorySnapshot.exists) throw new Error("Live Warehouse/directory is missing.");
  const byId = new Map(unitSnapshot.docs.map((document) => [document.id, document]));
  const expectedIds = new Set(plan.units.map((unit) => unit.id));
  const unexpectedIds = Array.from(byId.keys()).filter((id) => !expectedIds.has(id));
  const missingIds = Array.from(expectedIds).filter((id) => !byId.has(id));
  const errors = [];
  if (unitSnapshot.size !== expectedCount) {
    errors.push(`live StorageUnits count is ${unitSnapshot.size}, expected ${expectedCount}`);
  }
  if (unexpectedIds.length) errors.push(`unexpected StorageUnits: ${unexpectedIds.join(", ")}`);
  if (missingIds.length) errors.push(`missing StorageUnits: ${missingIds.join(", ")}`);
  if (documentFingerprint(directorySnapshot.data() || {}) !== plan.warehouseDirectory.fingerprint) {
    errors.push("Warehouse/directory fingerprint changed since backup");
  }
  if (updateTimeIso(directorySnapshot) !== plan.warehouseDirectory.updateTime) {
    errors.push("Warehouse/directory updateTime changed since backup");
  }
  errors.push(...compareTestInvariants(plan.testInvariant, testInvariant));
  const states = new Map();
  for (const unit of plan.units) {
    const snapshot = byId.get(unit.id);
    states.set(
      unit.id,
      classifySerialState(unit, {
        exists: Boolean(snapshot?.exists),
        data: snapshot?.exists ? snapshot.data() || {} : null,
      })
    );
  }
  return {
    byId,
    states,
    testInvariant,
    errors,
    directorySnapshot,
  };
}

const db = initializeFirestore(expectedProject);
if (db.projectId !== expectedProject) throw new Error("Firestore project gate failed.");
const runId = clean(
  optionValue("run-id") || `storage-unit-serial-${requestedPlanHash.slice(0, 24)}`,
  100
);
const restoreRunId = clean(optionValue("restore-run-id") || `${runId}-restore`, 100);
if (!/^[A-Za-z0-9._-]+$/.test(runId) || !/^[A-Za-z0-9._-]+$/.test(restoreRunId)) {
  throw new Error("Run IDs contain unsafe characters.");
}
if (runId === restoreRunId) throw new Error("Source and restore run IDs must differ.");

const sourceRef = db.collection("MigrationAudit").doc(runId);
const restoreRef = db.collection("MigrationAudit").doc(restoreRunId);

function assertMatchingSourceJournal(snapshot, { requireRestorable = false } = {}) {
  if (!snapshot.exists) {
    if (requireRestorable) throw new Error(`MigrationAudit/${runId} is missing.`);
    return;
  }
  const data = snapshot.data() || {};
  if (
    data.type !== "storage-unit-serial-alias-migration" ||
    data.sourceProject !== expectedProject ||
    data.targetCollection !== STORAGE_UNIT_COLLECTION ||
    stableStringify(data.mutationAllowlist) !== stableStringify(MUTATED_FIELDS) ||
    data.runId !== runId ||
    data.planHash !== requestedPlanHash ||
    data.backupSha256 !== requestedBackupHash ||
    data.preimageSha256 !== requestedPreimageHash ||
    data.expectedUnitCount !== expectedCount
  ) {
    throw new Error(`MigrationAudit/${runId} belongs to a different migration.`);
  }
  if (requireRestorable && !RESTORABLE_SOURCE_JOURNAL_STATUSES.has(data.status)) {
    throw new Error(
      `MigrationAudit/${runId} is not in a restorable source state ` +
        `(expected applying, incomplete, or complete).`
    );
  }
}

let preimage = null;
let preimagePath = "";
let requestedPreimageHash = "";
if (["apply", "verify", "restore"].includes(mode)) {
  requestedPreimageHash = optionValue("preimage-hash").trim().toLowerCase();
  if (!/^[a-f0-9]{64}$/.test(requestedPreimageHash)) {
    throw new Error("--preimage-hash must be a 64-character SHA-256 value.");
  }
  preimagePath = resolveRepoPath(optionValue("preimage"));
  const loaded = await readHashedJson(preimagePath, requestedPreimageHash);
  preimage = loaded.value;
  const validation = validateStorageUnitSerialPreimage({
    preimage,
    plan,
    sourceProject: expectedProject,
    planHash: requestedPlanHash,
    backupSha256: requestedBackupHash,
    runId,
    expectedCount,
  });
  if (!validation.valid) {
    throw new Error(`Preimage validation failed: ${validation.errors.join("; ")}`);
  }
}

if (mode === "preimage") {
  const existingJournal = await sourceRef.get();
  if (existingJournal.exists) {
    throw new Error(`MigrationAudit/${runId} already exists; refusing a new preimage.`);
  }
  const live = await readLiveState(db);
  const conflicts = plan.units
    .filter((unit) => !["before", "both"].includes(live.states.get(unit.id)))
    .map((unit) => `${unit.id}:${live.states.get(unit.id)}`);
  if (live.errors.length || conflicts.length) {
    throw new Error(
      `Live preimage preflight failed: ${[...live.errors, ...conflicts].slice(0, 30).join("; ")}`
    );
  }
  const prepared = {
    format: SERIAL_PREIMAGE_FORMAT,
    formatVersion: SERIAL_MIGRATION_FORMAT_VERSION,
    createdAt: new Date().toISOString(),
    sourceProject: expectedProject,
    targetCollection: STORAGE_UNIT_COLLECTION,
    mutationAllowlist: [...MUTATED_FIELDS],
    runId,
    planHash: requestedPlanHash,
    backupSha256: requestedBackupHash,
    targetCount: expectedCount,
    preparationMode: "live-read-only-preflight",
    firestoreWritesPerformed: false,
    testWritesPerformed: 0,
    testInvariant: live.testInvariant,
    units: plan.units.map((unit) => {
      const snapshot = live.byId.get(unit.id);
      return {
        id: unit.id,
        path: unit.path,
        exists: true,
        updateTime: updateTimeIso(snapshot),
        beforeFingerprint: documentFingerprint(snapshot.data() || {}),
        expectedAfterFingerprint: unit.afterFingerprint,
        data: encodeFirestoreValue(snapshot.data() || {}),
      };
    }),
  };
  const validation = validateStorageUnitSerialPreimage({
    preimage: prepared,
    plan,
    sourceProject: expectedProject,
    planHash: requestedPlanHash,
    backupSha256: requestedBackupHash,
    runId,
    expectedCount,
  });
  if (!validation.valid) {
    throw new Error(`Prepared preimage validation failed: ${validation.errors.join("; ")}`);
  }
  const preparedPath = resolveRepoPath(optionValue("preimage"));
  await writeDurableJsonExclusive(preparedPath, prepared);
  const artifact = await readHashedJson(preparedPath);
  console.log(
    JSON.stringify(
      {
        mode,
        readOnly: true,
        firestoreWritesPerformed: false,
        testWritesPerformed: 0,
        sourceProject: expectedProject,
        runId,
        expectedUnitCount: expectedCount,
        preimagePath: preparedPath,
        preimageSha256: artifact.sha256,
      },
      null,
      2
    )
  );
  process.exit(0);
}

const sourceJournal = await sourceRef.get();
assertMatchingSourceJournal(sourceJournal, { requireRestorable: mode === "restore" });
const liveBefore = await readLiveState(db);
if (liveBefore.errors.length) {
  throw new Error(`Live invariant preflight failed: ${liveBefore.errors.slice(0, 30).join("; ")}`);
}
const conflictStates = plan.units
  .filter((unit) => liveBefore.states.get(unit.id) === "conflict")
  .map((unit) => unit.id);
if (conflictStates.length) {
  throw new Error(`StorageUnits fingerprint conflicts: ${conflictStates.join(", ")}`);
}

function defaultResultPath(resultMode, id) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return path.join(
    repoRoot,
    "outputs",
    "storage-unit-serial-migration",
    `${id}-${stamp}-${resultMode}.json`
  );
}

async function writeResult(resultMode, id, value) {
  const outputPath = optionValue("output")
    ? resolveRepoPath(optionValue("output"))
    : defaultResultPath(resultMode, id);
  await writeDurableJsonExclusive(outputPath, value);
  return outputPath;
}

if (mode === "verify") {
  const errors = plan.units
    .filter((unit) => !["after", "both"].includes(liveBefore.states.get(unit.id)))
    .map((unit) => `${unit.id}:${liveBefore.states.get(unit.id)}`);
  const status = errors.length ? "incomplete" : "complete";
  const report = {
    format: "magmo-storage-unit-serial-alias-verification",
    formatVersion: SERIAL_MIGRATION_FORMAT_VERSION,
    createdAt: new Date().toISOString(),
    mode,
    status,
    readOnly: true,
    firestoreWritesPerformed: false,
    testWritesPerformed: 0,
    sourceProject: expectedProject,
    runId,
    planPath,
    planHash: requestedPlanHash,
    backupSha256: requestedBackupHash,
    preimagePath,
    preimageSha256: requestedPreimageHash,
    expectedUnitCount: expectedCount,
    verifiedAfterCount: plan.units.length - errors.length,
    errors,
  };
  const resultPath = await writeResult("verify", runId, report);
  console.log(JSON.stringify({ ...report, resultPath }, null, 2));
  if (status !== "complete") process.exitCode = 1;
  process.exit();
}

if (mode === "apply") {
  if (!sourceJournal.exists) {
    await sourceRef.create({
      type: "storage-unit-serial-alias-migration",
      formatVersion: SERIAL_MIGRATION_FORMAT_VERSION,
      status: "applying",
      sourceProject: expectedProject,
      targetCollection: STORAGE_UNIT_COLLECTION,
      mutationAllowlist: [...MUTATED_FIELDS],
      runId,
      planPath,
      planHash: requestedPlanHash,
      backupManifestPath: manifestPath,
      backupSha256: requestedBackupHash,
      preimagePath,
      preimageSha256: requestedPreimageHash,
      expectedUnitCount: expectedCount,
      testWritesPlanned: 0,
      testWritesPerformed: 0,
      startedAt: FieldValue.serverTimestamp(),
    });
  } else {
    await sourceRef.set(
      { status: "applying", resumedAt: FieldValue.serverTimestamp(), testWritesPerformed: 0 },
      { merge: true }
    );
  }

  const results = [];
  for (const unit of plan.units) {
    const unitRef = db.collection(STORAGE_UNIT_COLLECTION).doc(unit.id);
    try {
      let outcome = "updated";
      await db.runTransaction(async (transaction) => {
        const snapshot = await transaction.get(unitRef);
        const state = classifySerialState(unit, {
          exists: snapshot.exists,
          data: snapshot.exists ? snapshot.data() || {} : null,
        });
        if (["after", "both"].includes(state)) {
          outcome = "already-applied";
        } else if (state === "before") {
          transaction.update(unitRef, unit.patch);
        } else {
          throw new Error("document no longer matches the exact plan before/after state");
        }
        transaction.set(sourceRef.collection("storageUnits").doc(unit.id), {
          unitId: unit.id,
          serialCode: unit.patch.serialCode,
          status: outcome,
          beforeFingerprint: unit.beforeFingerprint,
          afterFingerprint: unit.afterFingerprint,
          testWritesPerformed: 0,
          verifiedAt: FieldValue.serverTimestamp(),
        });
      });
      results.push({ id: unit.id, status: outcome });
    } catch (error) {
      results.push({ id: unit.id, status: "failed", error: error.message });
      break;
    }
  }

  const liveAfter = await readLiveState(db);
  const postVerifyErrors = [...liveAfter.errors];
  for (const unit of plan.units) {
    if (!["after", "both"].includes(liveAfter.states.get(unit.id))) {
      postVerifyErrors.push(`${unit.id}:${liveAfter.states.get(unit.id)}`);
    }
  }
  const failed = results.filter((result) => result.status === "failed");
  const status = failed.length || postVerifyErrors.length ? "incomplete" : "complete";
  await sourceRef.set(
    {
      status,
      updatedCount: results.filter((result) => result.status === "updated").length,
      alreadyAppliedCount: results.filter((result) => result.status === "already-applied").length,
      failed,
      postVerifyErrors,
      testWritesPerformed: 0,
      completedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  const report = {
    format: "magmo-storage-unit-serial-alias-apply-result",
    formatVersion: SERIAL_MIGRATION_FORMAT_VERSION,
    createdAt: new Date().toISOString(),
    mode,
    status,
    sourceProject: expectedProject,
    runId,
    planPath,
    planHash: requestedPlanHash,
    backupSha256: requestedBackupHash,
    preimagePath,
    preimageSha256: requestedPreimageHash,
    expectedUnitCount: expectedCount,
    firestoreWritesPerformed: true,
    testWritesPerformed: 0,
    results,
    postVerifyErrors,
  };
  const resultPath = await writeResult("apply-result", runId, report);
  console.log(JSON.stringify({ ...report, resultPath }, null, 2));
  if (status !== "complete") process.exitCode = 1;
  process.exit();
}

if (mode === "restore") {
  const existingRestore = await restoreRef.get();
  if (existingRestore.exists) {
    const data = existingRestore.data() || {};
    if (
      data.type !== "storage-unit-serial-alias-restore" ||
      data.sourceRunId !== runId ||
      data.sourceProject !== expectedProject ||
      data.planHash !== requestedPlanHash ||
      data.preimageSha256 !== requestedPreimageHash
    ) {
      throw new Error(`MigrationAudit/${restoreRunId} belongs to a different restore.`);
    }
    await restoreRef.set(
      { status: "restoring", resumedAt: FieldValue.serverTimestamp(), testWritesPerformed: 0 },
      { merge: true }
    );
  } else {
    await restoreRef.create({
      type: "storage-unit-serial-alias-restore",
      formatVersion: SERIAL_MIGRATION_FORMAT_VERSION,
      status: "restoring",
      sourceProject: expectedProject,
      sourceRunId: runId,
      restoreRunId,
      targetCollection: STORAGE_UNIT_COLLECTION,
      mutationAllowlist: [...MUTATED_FIELDS],
      planPath,
      planHash: requestedPlanHash,
      backupManifestPath: manifestPath,
      backupSha256: requestedBackupHash,
      preimagePath,
      preimageSha256: requestedPreimageHash,
      expectedUnitCount: expectedCount,
      testWritesPlanned: 0,
      testWritesPerformed: 0,
      startedAt: FieldValue.serverTimestamp(),
    });
  }

  const preimageById = new Map(preimage.units.map((unit) => [unit.id, unit]));
  const results = [];
  for (const unit of plan.units) {
    const unitRef = db.collection(STORAGE_UNIT_COLLECTION).doc(unit.id);
    const before = preimageById.get(unit.id);
    try {
      let outcome = "restored";
      await db.runTransaction(async (transaction) => {
        const snapshot = await transaction.get(unitRef);
        const state = classifySerialState(unit, {
          exists: snapshot.exists,
          data: snapshot.exists ? snapshot.data() || {} : null,
        });
        if (["before", "both"].includes(state)) {
          outcome = "already-restored";
        } else if (state === "after") {
          const original = decodeFirestoreValue(before.data, { db });
          const restorePatch = {};
          for (const field of MUTATED_FIELDS) {
            restorePatch[field] = Object.prototype.hasOwnProperty.call(original, field)
              ? original[field]
              : FieldValue.delete();
          }
          transaction.update(unitRef, restorePatch);
        } else {
          throw new Error("document no longer matches the exact plan before/after state");
        }
        transaction.set(restoreRef.collection("storageUnits").doc(unit.id), {
          unitId: unit.id,
          status: outcome,
          beforeFingerprint: unit.afterFingerprint,
          afterFingerprint: unit.beforeFingerprint,
          testWritesPerformed: 0,
          verifiedAt: FieldValue.serverTimestamp(),
        });
      });
      results.push({ id: unit.id, status: outcome });
    } catch (error) {
      results.push({ id: unit.id, status: "failed", error: error.message });
      break;
    }
  }

  const liveAfter = await readLiveState(db);
  const postVerifyErrors = [...liveAfter.errors];
  for (const unit of plan.units) {
    if (!["before", "both"].includes(liveAfter.states.get(unit.id))) {
      postVerifyErrors.push(`${unit.id}:${liveAfter.states.get(unit.id)}`);
    }
  }
  const failed = results.filter((result) => result.status === "failed");
  const status = failed.length || postVerifyErrors.length ? "incomplete" : "complete";
  await restoreRef.set(
    {
      status,
      restoredCount: results.filter((result) => result.status === "restored").length,
      alreadyRestoredCount: results.filter((result) => result.status === "already-restored").length,
      failed,
      postVerifyErrors,
      testWritesPerformed: 0,
      completedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  const report = {
    format: "magmo-storage-unit-serial-alias-restore-result",
    formatVersion: SERIAL_MIGRATION_FORMAT_VERSION,
    createdAt: new Date().toISOString(),
    mode,
    status,
    sourceProject: expectedProject,
    sourceRunId: runId,
    restoreRunId,
    planPath,
    planHash: requestedPlanHash,
    backupSha256: requestedBackupHash,
    preimagePath,
    preimageSha256: requestedPreimageHash,
    expectedUnitCount: expectedCount,
    firestoreWritesPerformed: true,
    testWritesPerformed: 0,
    results,
    postVerifyErrors,
  };
  const resultPath = await writeResult("restore-result", restoreRunId, report);
  console.log(JSON.stringify({ ...report, resultPath }, null, 2));
  if (status !== "complete") process.exitCode = 1;
}
