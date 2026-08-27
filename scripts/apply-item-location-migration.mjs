import crypto from "node:crypto";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import {
  FieldValue,
  GeoPoint,
  Timestamp,
  getFirestore,
} from "firebase-admin/firestore";

const require = createRequire(import.meta.url);
const {
  applyMachineBacklinkPlanToEncodedMachine,
  associatedPartIds,
  classifyDocumentState,
  clean,
  computePlanHash,
  decodeFirestoreValue,
  documentFingerprint,
  encodeFirestoreValue,
  machineStructuralFingerprint,
  sha256Value,
  validateItemLocationPreimage,
} = require("../lib/inventory/itemLocationContract.cjs");
const { verifyBackupManifest } = require("../lib/firestoreBackupCodec.cjs");

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDirectory, "..");
const args = process.argv.slice(2);

function argumentValue(name) {
  const prefix = `--${name}=`;
  return args.find((argument) => argument.startsWith(prefix))?.slice(prefix.length) || "";
}

function usage(exitCode = 0) {
  console.log(`Usage: node scripts/apply-item-location-migration.mjs [options]

The default mode performs every checksum, project, count, update-time, item, and
machine preflight with no local or Firestore writes. Preimage preparation is an
explicit local-only mode. Applying requires the exact prepared artifact.

Required for dry-run and apply:
  --plan=PATH               Plan from plan-item-location-migration.mjs
  --project=PROJECT_ID      Exact Firebase project ID
  --backup-manifest=PATH    Exact completed backup manifest used by the plan
  --backup-hash=SHA256      Exact verified firestore-documents.jsonl hash
  --plan-hash=SHA256        Exact hash printed by the planner
  --expected-count=N        Exact number of change items

Prepare the rollback artifact (zero Firestore writes):
  --prepare-preimage
  --preimage=PATH            Optional output path; creation is exclusive, exact reuse allowed

Additional apply authorization and artifact gates:
  --apply
  --preimage=PATH            Exact artifact printed by --prepare-preimage
  --preimage-hash=SHA256     Exact artifact hash printed by --prepare-preimage
  --confirm=APPLY_ITEM_LOCATION_MIGRATION

Optional:
  --run-id=ID               Stable journal ID (defaults from plan hash)
  --help                    Show this help
`);
  process.exit(exitCode);
}

if (args.includes("--help")) usage(0);
const requiredNames = [
  "plan",
  "project",
  "backup-manifest",
  "backup-hash",
  "plan-hash",
  "expected-count",
];
for (const name of requiredNames) {
  if (!argumentValue(name)) usage(1);
}
const applyRequested = args.includes("--apply");
const preparePreimageRequested = args.includes("--prepare-preimage");
if (applyRequested && preparePreimageRequested) {
  throw new Error("--apply and --prepare-preimage are mutually exclusive.");
}
if (
  applyRequested &&
  argumentValue("confirm") !== "APPLY_ITEM_LOCATION_MIGRATION"
) {
  throw new Error("--apply requires --confirm=APPLY_ITEM_LOCATION_MIGRATION.");
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

for (const filename of [".env.local", ".env"]) {
  loadEnvFile(path.join(repoRoot, filename));
}

function initializeFirestore(expectedProject) {
  if (getApps().length) {
    const db = getFirestore();
    if (db.projectId !== expectedProject) {
      throw new Error(`Initialized project ${db.projectId} does not match ${expectedProject}.`);
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
  if (serviceAccount.project_id !== expectedProject) {
    throw new Error(
      `Credential project ${serviceAccount.project_id || "(missing)"} does not match ${expectedProject}.`
    );
  }
  initializeApp({ credential: cert(serviceAccount), projectId: serviceAccount.project_id });
  return getFirestore();
}

function updateTimeIso(snapshot) {
  return snapshot?.updateTime?.toDate?.().toISOString?.() || "";
}

const planPath = path.resolve(repoRoot, argumentValue("plan"));
const plan = JSON.parse(await fsPromises.readFile(planPath, "utf8"));
const expectedProject = argumentValue("project").trim();
const requestedPlanHash = argumentValue("plan-hash").trim();
const requestedBackupHash = argumentValue("backup-hash").trim();
const expectedCount = Number(argumentValue("expected-count"));
if (!Number.isInteger(expectedCount) || expectedCount < 0) {
  throw new Error("--expected-count must be a non-negative integer.");
}
if (
  plan.format !== "magmo-item-location-migration-plan" ||
  plan.formatVersion !== 1 ||
  !plan.readOnly
) {
  throw new Error("Unsupported item-location plan.");
}
if (plan.sourceProject !== expectedProject) {
  throw new Error(`Plan project ${plan.sourceProject} does not match ${expectedProject}.`);
}
const calculatedPlanHash = computePlanHash(plan);
if (
  calculatedPlanHash !== plan.planHash ||
  calculatedPlanHash !== requestedPlanHash
) {
  throw new Error("Plan hash does not match the reviewed hash.");
}
if (plan.summary?.reviewRequiredCount !== 0) {
  throw new Error(
    `Plan has ${plan.summary?.reviewRequiredCount || 0} review-required items; apply is blocked.`
  );
}
const changes = (plan.items || []).filter((item) => item.status === "change");
if (
  expectedCount !== changes.length ||
  expectedCount !== plan.expectedApplyCount ||
  expectedCount !== plan.summary?.changeCount
) {
  throw new Error(
    `Expected count gate failed: argument=${expectedCount}, plan=${changes.length}.`
  );
}

const manifestPath = path.resolve(repoRoot, argumentValue("backup-manifest"));
const backupVerification = await verifyBackupManifest(manifestPath);
const manifest = JSON.parse(await fsPromises.readFile(manifestPath, "utf8"));
const backupEntry = manifest.files?.["firestore-documents.jsonl"];
if (manifest.sourceProject !== expectedProject) {
  throw new Error("Backup project does not match the explicit project gate.");
}
if (
  backupEntry.sha256 !== requestedBackupHash ||
  backupEntry.sha256 !== plan.backup?.sha256
) {
  throw new Error("Backup hash does not match the plan and explicit gate.");
}
if (backupVerification.sha256 !== backupEntry.sha256) {
  throw new Error("Verified backup checksum does not match its manifest.");
}

const db = initializeFirestore(expectedProject);
if (db.projectId !== expectedProject) throw new Error("Firestore project gate failed.");
const runId = clean(
  argumentValue("run-id") || `item-location-${calculatedPlanHash.slice(0, 24)}`,
  100
);
if (!/^[A-Za-z0-9._-]+$/.test(runId)) throw new Error("--run-id contains unsafe characters.");
const migrationRef = db.collection("MigrationAudit").doc(runId);
const existingJournal = await migrationRef.get();
if (
  existingJournal.exists &&
  (existingJournal.data()?.planHash !== calculatedPlanHash ||
    existingJournal.data()?.sourceProject !== expectedProject)
) {
  throw new Error(`MigrationAudit/${runId} belongs to a different migration.`);
}

const itemRefs = changes.map((item) => db.collection("Test").doc(item.id));
const itemSnapshots = itemRefs.length ? await db.getAll(...itemRefs) : [];
const itemStates = new Map();
const conflicts = [];
for (let index = 0; index < changes.length; index += 1) {
  const item = changes[index];
  const snapshot = itemSnapshots[index];
  if (!snapshot.exists) {
    conflicts.push(`${item.id}:missing`);
    continue;
  }
  const state = classifyDocumentState(item, snapshot.data() || {});
  itemStates.set(item.id, state);
  if (state === "before" && updateTimeIso(snapshot) !== item.updateTime) {
    conflicts.push(`${item.id}:update-time`);
  } else if (state === "conflict") {
    conflicts.push(`${item.id}:fingerprint`);
  }
}
if (conflicts.length) {
  throw new Error(`Item preflight conflicts: ${conflicts.join(", ")}`);
}

const machineConditions = plan.machinePreconditions || [];
const machineRefs = machineConditions.map((machine) => db.collection("Machine").doc(machine.id));
const machineSnapshots = machineRefs.length ? await db.getAll(...machineRefs) : [];
const machineSnapshotById = new Map();
const allItemsBefore = changes.every((item) => itemStates.get(item.id) === "before");
for (let index = 0; index < machineConditions.length; index += 1) {
  const condition = machineConditions[index];
  const snapshot = machineSnapshots[index];
  machineSnapshotById.set(condition.id, snapshot);
  if (condition.exists !== snapshot.exists) {
    conflicts.push(`${condition.id}:machine-existence`);
    continue;
  }
  if (!snapshot.exists) continue;
  const data = snapshot.data() || {};
  if (machineStructuralFingerprint(data) !== condition.structuralFingerprint) {
    conflicts.push(`${condition.id}:machine-structure`);
  }
  if (
    allItemsBefore &&
    (updateTimeIso(snapshot) !== condition.updateTime ||
      documentFingerprint(data) !== condition.documentFingerprint)
  ) {
    conflicts.push(`${condition.id}:machine-precondition`);
  }
  const partIds = new Set(associatedPartIds(data));
  for (const item of changes) {
    const state = itemStates.get(item.id);
    if (item.machineBacklinks.add.includes(condition.id)) {
      const shouldExist = state === "after";
      if (partIds.has(item.id) !== shouldExist) {
        conflicts.push(`${condition.id}:${item.id}:add-membership-${state}`);
      }
    }
    if (item.machineBacklinks.remove.includes(condition.id)) {
      const beforeHadPart = condition.associatedPartIds.includes(item.id);
      const shouldExist = state === "before" ? beforeHadPart : false;
      if (partIds.has(item.id) !== shouldExist) {
        conflicts.push(`${condition.id}:${item.id}:remove-membership-${state}`);
      }
    }
  }
}
if (conflicts.length) throw new Error(`Machine preflight conflicts: ${conflicts.join(", ")}`);

const preflightSummary = {
  dryRun: !applyRequested,
  mode: preparePreimageRequested
    ? "prepare-preimage"
    : applyRequested
      ? "apply"
      : "preflight",
  firestoreWritesPerformed: false,
  sourceProject: expectedProject,
  runId,
  planPath,
  planHash: calculatedPlanHash,
  backupHash: requestedBackupHash,
  expectedCount,
  beforeCount: changes.filter((item) => itemStates.get(item.id) === "before").length,
  afterCount: changes.filter((item) => itemStates.get(item.id) === "after").length,
  affectedMachineCount: machineConditions.length,
  existingJournalStatus: existingJournal.exists
    ? existingJournal.data()?.status || "unknown"
    : "none",
};

function assertValidPreimage(preimage) {
  const validation = validateItemLocationPreimage({
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
  return validation;
}

async function loadVerifiedPreimage(filePath, expectedHash) {
  if (expectedHash && !/^[a-f0-9]{64}$/i.test(expectedHash)) {
    throw new Error("--preimage-hash must be a 64-character SHA-256 value.");
  }
  const bytes = await fsPromises.readFile(filePath);
  const actualHash = crypto.createHash("sha256").update(bytes).digest("hex");
  if (expectedHash && actualHash.toLowerCase() !== expectedHash.toLowerCase()) {
    throw new Error("Preimage checksum does not match --preimage-hash.");
  }
  const value = JSON.parse(bytes.toString("utf8"));
  assertValidPreimage(value);
  return { preimage: value, sha256: actualHash };
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

function createPreimageFromPreflight() {
  const preimageItems = changes.map((item, index) => ({
    id: item.id,
    path: itemSnapshots[index].ref.path,
    updateTime: updateTimeIso(itemSnapshots[index]),
    beforeFingerprint: item.beforeDocumentFingerprint,
    expectedAfterFingerprint: item.afterDocumentFingerprint,
    data: encodeFirestoreValue(itemSnapshots[index].data() || {}),
  }));
  const preimageMachines = machineConditions.map((condition, index) => {
    const snapshot = machineSnapshots[index];
    const beforeData = snapshot.exists ? snapshot.data() || {} : null;
    const expectedAfter = snapshot.exists
      ? applyMachineBacklinkPlanToEncodedMachine(beforeData, changes, condition.id)
      : null;
    return {
      id: condition.id,
      path: snapshot.ref.path,
      exists: snapshot.exists,
      updateTime: updateTimeIso(snapshot),
      beforeFingerprint: snapshot.exists ? documentFingerprint(beforeData) : "",
      expectedAfterFingerprint: expectedAfter ? sha256Value(expectedAfter) : "",
      data: snapshot.exists ? encodeFirestoreValue(beforeData) : null,
    };
  });
  return {
    format: "magmo-item-location-migration-preimage",
    formatVersion: 1,
    createdAt: new Date().toISOString(),
    sourceProject: expectedProject,
    runId,
    planPath,
    planHash: calculatedPlanHash,
    backupManifestPath: manifestPath,
    backupSha256: requestedBackupHash,
    targetCount: changes.length,
    machineCount: machineConditions.length,
    preparationMode: "live-read-only-preflight",
    firestoreWritesPerformed: false,
    items: preimageItems,
    machines: preimageMachines,
  };
}

if (preparePreimageRequested) {
  if (existingJournal.exists) {
    throw new Error(
      `--prepare-preimage requires no MigrationAudit/${runId} journal; Firestore may already have been written.`
    );
  }
  if (!allItemsBefore) {
    throw new Error("--prepare-preimage requires every item to match its exact before state.");
  }
  const prepared = createPreimageFromPreflight();
  assertValidPreimage(prepared);
  const preparedPath = path.resolve(
    repoRoot,
    argumentValue("preimage") ||
      path.join("outputs", "item-location-migration", `${runId}-preimage.json`)
  );
  let reused = false;
  let verifiedPrepared;
  if (fs.existsSync(preparedPath)) {
    verifiedPrepared = await loadVerifiedPreimage(preparedPath, "");
    reused = true;
  } else {
    await writeDurableJsonExclusive(preparedPath, prepared);
    verifiedPrepared = await loadVerifiedPreimage(preparedPath, "");
  }
  const preparedHash = verifiedPrepared.sha256;
  console.log(
    JSON.stringify(
      {
        ...preflightSummary,
        dryRun: true,
        localArtifactWritten: !reused,
        preimagePrepared: true,
        preimageReused: reused,
        preimagePath: preparedPath,
        preimageSha256: preparedHash,
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
  suppliedPreimageHash
);
const preimagePath = suppliedPreimagePath;
const preimageSha256 = loadedPreimage.sha256;
const preimage = loadedPreimage.preimage;

if (!applyRequested) {
  console.log(
    JSON.stringify(
      {
        ...preflightSummary,
        preimageValidated: true,
        preimagePath,
        preimageSha256,
      },
      null,
      2
    )
  );
  process.exit(0);
}

if (!existingJournal.exists && !allItemsBefore) {
  throw new Error("A fresh apply requires every item to match its exact prepared before state.");
}
if (existingJournal.exists) {
  const journalPreimagePath = clean(existingJournal.data()?.preimagePath, 2000);
  const journalPreimageSha256 = clean(existingJournal.data()?.preimageSha256, 200);
  if (
    path.resolve(journalPreimagePath || ".") !== preimagePath ||
    journalPreimageSha256 !== preimageSha256
  ) {
    throw new Error(
      `MigrationAudit/${runId} is not bound to the exact supplied preimage path and hash.`
    );
  }
}

if (!existingJournal.exists) {
  await migrationRef.create({
    type: "item-location-migration",
    formatVersion: 1,
    status: "applying",
    sourceProject: expectedProject,
    runId,
    planPath,
    planHash: calculatedPlanHash,
    backupManifestPath: manifestPath,
    backupSha256: requestedBackupHash,
    targetCount: changes.length,
    preimagePath,
    preimageSha256,
    preimagePreparedBeforeFirestoreWrites: true,
    startedAt: FieldValue.serverTimestamp(),
  });
} else {
  await migrationRef.set(
    { status: "applying", resumedAt: FieldValue.serverTimestamp() },
    { merge: true }
  );
}

// Track the exact expected machine state through resumable per-item
// transactions. This catches concurrent associatedParts edits, not only
// structural machine changes, while still allowing states written by an
// earlier attempt of this same journal.
const expectedMachineDataById = new Map(
  preimage.machines
    .filter((machine) => machine.exists)
    .map((machine) => {
      const alreadyAppliedItems = changes.filter(
        (item) => itemStates.get(item.id) === "after"
      );
      return [
        machine.id,
        applyMachineBacklinkPlanToEncodedMachine(
          machine.data || {},
          alreadyAppliedItems,
          machine.id
        ),
      ];
    })
);

const results = [];
for (const item of changes) {
  if (itemStates.get(item.id) === "after") {
    results.push({ id: item.id, status: "already-applied" });
    continue;
  }
  const itemRef = db.collection("Test").doc(item.id);
  const touchedMachineIds = Array.from(
    new Set([...item.machineBacklinks.add, ...item.machineBacklinks.remove])
  ).sort();
  try {
    await db.runTransaction(async (transaction) => {
      const itemSnapshot = await transaction.get(itemRef);
      if (
        !itemSnapshot.exists ||
        updateTimeIso(itemSnapshot) !== item.updateTime ||
        classifyDocumentState(item, itemSnapshot.data() || {}) !== "before"
      ) {
        throw new Error("item no longer matches its exact before state/update time");
      }
      const touchedMachineSnapshots = [];
      for (const machineId of touchedMachineIds) {
        const machineSnapshot = await transaction.get(db.collection("Machine").doc(machineId));
        if (!machineSnapshot.exists) throw new Error(`Machine/${machineId} is missing`);
        const condition = machineConditions.find((entry) => entry.id === machineId);
        if (
          !condition ||
          machineStructuralFingerprint(machineSnapshot.data() || {}) !==
            condition.structuralFingerprint
        ) {
          throw new Error(`Machine/${machineId} changed structurally`);
        }
        const expectedMachineData = expectedMachineDataById.get(machineId);
        if (
          !expectedMachineData ||
          documentFingerprint(machineSnapshot.data() || {}) !==
            sha256Value(expectedMachineData)
        ) {
          throw new Error(`Machine/${machineId} no longer matches the journaled state`);
        }
        touchedMachineSnapshots.push({ machineId, snapshot: machineSnapshot });
      }
      const update = {};
      for (const [field, documentPath] of Object.entries(item.patch.setReferences || {})) {
        update[field] = db.doc(documentPath);
      }
      for (const [field, value] of Object.entries(item.patch.setValues || {})) {
        update[field] = decodeFirestoreValue(encodeFirestoreValue(value), {
          db,
          Timestamp,
          GeoPoint,
        });
      }
      for (const field of item.patch.deleteFields || []) update[field] = FieldValue.delete();
      transaction.update(itemRef, update, { lastUpdateTime: itemSnapshot.updateTime });
      for (const { machineId, snapshot } of touchedMachineSnapshots) {
        const machineRef = snapshot.ref;
        if (item.machineBacklinks.remove.includes(machineId)) {
          transaction.update(machineRef, {
            associatedParts: FieldValue.arrayRemove(itemRef, item.id),
          });
        }
        if (item.machineBacklinks.add.includes(machineId)) {
          transaction.set(
            machineRef,
            { associatedParts: FieldValue.arrayUnion(itemRef) },
            { merge: true }
          );
        }
      }
      transaction.set(migrationRef.collection("items").doc(item.id), {
        itemId: item.id,
        status: "applied",
        beforeFingerprint: item.beforeDocumentFingerprint,
        afterFingerprint: item.afterDocumentFingerprint,
        patch: item.patch,
        machineBacklinks: item.machineBacklinks,
        appliedAt: FieldValue.serverTimestamp(),
      });
    });
    for (const machineId of touchedMachineIds) {
      expectedMachineDataById.set(
        machineId,
        applyMachineBacklinkPlanToEncodedMachine(
          expectedMachineDataById.get(machineId),
          [item],
          machineId
        )
      );
    }
    results.push({ id: item.id, status: "applied" });
  } catch (error) {
    results.push({ id: item.id, status: "failed", error: error.message });
    break;
  }
}

const failed = results.filter((result) => result.status === "failed");
const verifyItemSnapshots = itemRefs.length ? await db.getAll(...itemRefs) : [];
const verifyMachineSnapshots = machineRefs.length ? await db.getAll(...machineRefs) : [];
const postVerifyErrors = [];
for (let index = 0; index < changes.length; index += 1) {
  const item = changes[index];
  const snapshot = verifyItemSnapshots[index];
  if (!snapshot.exists || documentFingerprint(snapshot.data() || {}) !== item.afterDocumentFingerprint) {
    postVerifyErrors.push(`${item.id}:after-fingerprint`);
  }
}
for (let index = 0; index < preimage.machines.length; index += 1) {
  const expected = preimage.machines[index];
  const snapshot = verifyMachineSnapshots[index];
  if (
    snapshot.exists !== expected.exists ||
    (snapshot.exists &&
      documentFingerprint(snapshot.data() || {}) !== expected.expectedAfterFingerprint)
  ) {
    postVerifyErrors.push(`${expected.id}:machine-after-fingerprint`);
  }
}

const status = failed.length || postVerifyErrors.length ? "incomplete" : "complete";
await migrationRef.set(
  {
    status,
    appliedCount: results.filter((result) => result.status === "applied").length,
    alreadyAppliedCount: results.filter((result) => result.status === "already-applied").length,
    failed,
    postVerifyErrors,
    completedAt: FieldValue.serverTimestamp(),
  },
  { merge: true }
);

const resultReport = {
  format: "magmo-item-location-migration-apply-result",
  formatVersion: 1,
  createdAt: new Date().toISOString(),
  sourceProject: expectedProject,
  runId,
  status,
  planPath,
  planHash: calculatedPlanHash,
  preimagePath,
  preimageSha256,
  expectedCount,
  results,
  postVerifyErrors,
};
const resultStamp = new Date().toISOString().replace(/[:.]/g, "-");
const resultPath = path.join(
  repoRoot,
  "outputs",
  "item-location-migration",
  `${runId}-${resultStamp}-apply-result.json`
);
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
      status,
      preimagePath,
      preimageSha256,
      resultPath,
      postVerifyErrors,
    },
    null,
    2
  )
);
if (status !== "complete") process.exitCode = 1;
