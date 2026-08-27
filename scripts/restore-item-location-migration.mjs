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
  clean,
  computePlanHash,
  decodeFirestoreValue,
  documentFingerprint,
  validateItemLocationPreimage,
} = require("../lib/inventory/itemLocationContract.cjs");

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDirectory, "..");
const args = process.argv.slice(2);

function argumentValue(name) {
  const prefix = `--${name}=`;
  return args.find((argument) => argument.startsWith(prefix))?.slice(prefix.length) || "";
}

function usage(exitCode = 0) {
  console.log(`Usage: node scripts/restore-item-location-migration.mjs [options]

Targeted restore for one item-location migration. It restores only the item and
machine documents captured in the verified preimage. Every current document
must exactly match its expected migration after-state (or already-restored
before-state); unrelated subsequent edits block restoration.

Run this without --apply immediately after --prepare-preimage and before the
first migration write. A successful summary reports readyBeforeApply: true.

Required:
  --plan=PATH
  --plan-hash=SHA256
  --preimage=PATH
  --preimage-hash=SHA256
  --project=PROJECT_ID
  --expected-count=N

Without --apply the command is a read-only preflight. Applying also requires:
  --apply
  --confirm=RESTORE_ITEM_LOCATION_MIGRATION

Optional:
  --help
`);
  process.exit(exitCode);
}

if (args.includes("--help")) usage(0);
for (const name of [
  "plan",
  "plan-hash",
  "preimage",
  "preimage-hash",
  "project",
  "expected-count",
]) {
  if (!argumentValue(name)) usage(1);
}
const applyRequested = args.includes("--apply");
if (
  applyRequested &&
  argumentValue("confirm") !== "RESTORE_ITEM_LOCATION_MIGRATION"
) {
  throw new Error("--apply requires --confirm=RESTORE_ITEM_LOCATION_MIGRATION.");
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
    if (db.projectId !== expectedProject) throw new Error("Initialized project mismatch.");
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
    throw new Error(`Credential project ${serviceAccount.project_id} does not match ${expectedProject}.`);
  }
  initializeApp({ credential: cert(serviceAccount), projectId: serviceAccount.project_id });
  return getFirestore();
}

const planPath = path.resolve(repoRoot, argumentValue("plan"));
const preimagePath = path.resolve(repoRoot, argumentValue("preimage"));
const expectedProject = argumentValue("project").trim();
const requestedPlanHash = argumentValue("plan-hash").trim();
const requestedPreimageHash = argumentValue("preimage-hash").trim();
const expectedCount = Number(argumentValue("expected-count"));
if (!Number.isInteger(expectedCount) || expectedCount < 0) {
  throw new Error("--expected-count must be a non-negative integer.");
}
const plan = JSON.parse(await fsPromises.readFile(planPath, "utf8"));
if (
  plan.format !== "magmo-item-location-migration-plan" ||
  plan.formatVersion !== 1 ||
  plan.sourceProject !== expectedProject ||
  !plan.readOnly
) {
  throw new Error("Plan format/project mismatch.");
}
const calculatedPlanHash = computePlanHash(plan);
if (calculatedPlanHash !== plan.planHash || calculatedPlanHash !== requestedPlanHash) {
  throw new Error("Plan hash mismatch.");
}
const changes = (plan.items || []).filter((item) => item.status === "change");
if (
  changes.length !== expectedCount ||
  plan.expectedApplyCount !== expectedCount ||
  plan.summary?.changeCount !== expectedCount ||
  plan.summary?.reviewRequiredCount !== 0
) {
  throw new Error("Expected count gate failed.");
}
if (!/^[a-f0-9]{64}$/i.test(requestedPreimageHash)) {
  throw new Error("--preimage-hash must be a 64-character SHA-256 value.");
}
const preimageBytes = await fsPromises.readFile(preimagePath);
const calculatedPreimageHash = crypto
  .createHash("sha256")
  .update(preimageBytes)
  .digest("hex");
if (calculatedPreimageHash.toLowerCase() !== requestedPreimageHash.toLowerCase()) {
  throw new Error("Preimage checksum mismatch.");
}
const preimage = JSON.parse(preimageBytes.toString("utf8"));
if (!/^[A-Za-z0-9._-]+$/.test(preimage.runId || "")) {
  throw new Error("Preimage run ID contains unsafe characters.");
}
const preimageValidation = validateItemLocationPreimage({
  preimage,
  plan,
  sourceProject: expectedProject,
  planHash: calculatedPlanHash,
  backupSha256: plan.backup?.sha256 || "",
  runId: preimage.runId,
  expectedCount,
});
if (!preimageValidation.valid) {
  throw new Error(
    `Preimage contract validation failed: ${preimageValidation.errors.join("; ")}`
  );
}

const db = initializeFirestore(expectedProject);
const itemRefs = preimage.items.map((item) => db.doc(item.path));
const machineRefs = preimage.machines.map((machine) => db.doc(machine.path));
const itemSnapshots = itemRefs.length ? await db.getAll(...itemRefs) : [];
const machineSnapshots = machineRefs.length ? await db.getAll(...machineRefs) : [];
const itemStates = new Map();
const machineStates = new Map();
const conflicts = [];
for (let index = 0; index < preimage.items.length; index += 1) {
  const expected = preimage.items[index];
  const snapshot = itemSnapshots[index];
  if (!snapshot.exists) {
    conflicts.push(`${expected.id}:missing`);
    continue;
  }
  const fingerprint = documentFingerprint(snapshot.data() || {});
  const state = fingerprint === expected.expectedAfterFingerprint
    ? "after"
    : fingerprint === expected.beforeFingerprint
      ? "before"
      : "conflict";
  itemStates.set(expected.id, state);
  if (state === "conflict") conflicts.push(`${expected.id}:not-exact-after-or-before`);
}
for (let index = 0; index < preimage.machines.length; index += 1) {
  const expected = preimage.machines[index];
  const snapshot = machineSnapshots[index];
  let state = "conflict";
  if (!expected.exists && !snapshot.exists) state = "before";
  else if (expected.exists && snapshot.exists) {
    const fingerprint = documentFingerprint(snapshot.data() || {});
    state = fingerprint === expected.expectedAfterFingerprint
      ? "after"
      : fingerprint === expected.beforeFingerprint
        ? "before"
        : "conflict";
  }
  machineStates.set(expected.id, state);
  if (state === "conflict") conflicts.push(`${expected.id}:machine-not-exact-after-or-before`);
}
if (conflicts.length) {
  throw new Error(
    `Targeted restore blocked because current data does not match the exact migration after-state: ${conflicts.join(", ")}`
  );
}

const restoreRunId = `${preimage.runId}-restore`;
const sourceMigrationRef = db.collection("MigrationAudit").doc(preimage.runId);
const restoreRef = db.collection("MigrationAudit").doc(restoreRunId);
const [sourceMigrationJournal, restoreJournal] = await db.getAll(
  sourceMigrationRef,
  restoreRef
);
if (
  sourceMigrationJournal.exists &&
  (sourceMigrationJournal.data()?.planHash !== calculatedPlanHash ||
    sourceMigrationJournal.data()?.sourceProject !== expectedProject ||
    sourceMigrationJournal.data()?.preimageSha256 !== calculatedPreimageHash ||
    path.resolve(sourceMigrationJournal.data()?.preimagePath || ".") !== preimagePath)
) {
  throw new Error(`MigrationAudit/${preimage.runId} is not bound to this exact preimage.`);
}
if (
  restoreJournal.exists &&
  (restoreJournal.data()?.planHash !== calculatedPlanHash ||
    restoreJournal.data()?.preimageSha256 !== calculatedPreimageHash)
) {
  throw new Error(`MigrationAudit/${restoreRunId} belongs to a different restore.`);
}
const allBefore =
  Array.from(itemStates.values()).every((state) => state === "before") &&
  Array.from(machineStates.values()).every((state) => state === "before");
const allAfter =
  Array.from(itemStates.values()).every((state) => state === "after") &&
  Array.from(machineStates.values()).every((state) => state === "after");
if (!allBefore && !allAfter && !restoreJournal.exists) {
  throw new Error("Mixed before/after state has no matching restore journal; manual review is required.");
}

const summary = {
  dryRun: !applyRequested,
  sourceProject: expectedProject,
  runId: preimage.runId,
  restoreRunId,
  planHash: calculatedPlanHash,
  preimageHash: calculatedPreimageHash,
  expectedCount,
  itemsToRestore: Array.from(itemStates.values()).filter((state) => state === "after").length,
  machinesToRestore: Array.from(machineStates.values()).filter((state) => state === "after").length,
  readyBeforeApply: allBefore && !sourceMigrationJournal.exists && !restoreJournal.exists,
  alreadyRestored: allBefore && restoreJournal.exists,
  sourceMigrationJournalStatus: sourceMigrationJournal.exists
    ? sourceMigrationJournal.data()?.status || "unknown"
    : "none",
  existingRestoreJournalStatus: restoreJournal.exists
    ? restoreJournal.data()?.status || "unknown"
    : "none",
};
if (!applyRequested) {
  console.log(JSON.stringify(summary, null, 2));
  process.exit(0);
}
if (!allBefore && !sourceMigrationJournal.exists) {
  throw new Error(
    `Restore apply requires the matching MigrationAudit/${preimage.runId} source journal.`
  );
}
if (allBefore) {
  if (restoreJournal.exists) {
    await restoreRef.set(
      {
        status: "complete",
        idempotentVerificationAt: FieldValue.serverTimestamp(),
        completedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    await db.collection("MigrationAudit").doc(preimage.runId).set(
      {
        restoreStatus: "complete",
        restoreRunId,
        restoredAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }
  const status = restoreJournal.exists
    ? "already-restored"
    : sourceMigrationJournal.exists
      ? "no-target-data-to-restore"
      : "migration-not-applied";
  console.log(JSON.stringify({ ...summary, dryRun: false, status }, null, 2));
  process.exit(0);
}

if (!restoreJournal.exists) {
  await restoreRef.create({
    type: "item-location-migration-restore",
    formatVersion: 1,
    status: "restoring",
    sourceProject: expectedProject,
    sourceRunId: preimage.runId,
    planHash: calculatedPlanHash,
    preimagePath,
    preimageSha256: calculatedPreimageHash,
    targetCount: expectedCount,
    startedAt: FieldValue.serverTimestamp(),
  });
} else {
  await restoreRef.set(
    { status: "restoring", resumedAt: FieldValue.serverTimestamp() },
    { merge: true }
  );
}

const results = [];
async function restoreDocument(expected, collection) {
  const ref = db.doc(expected.path);
  const stateMap = collection === "items" ? itemStates : machineStates;
  if (stateMap.get(expected.id) === "before") {
    results.push({ path: expected.path, status: "already-restored" });
    return;
  }
  await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (
      !snapshot.exists ||
      documentFingerprint(snapshot.data() || {}) !== expected.expectedAfterFingerprint
    ) {
      throw new Error(`${expected.path} changed after restore preflight`);
    }
    const restoredData = decodeFirestoreValue(expected.data, { db, Timestamp, GeoPoint });
    transaction.set(ref, restoredData);
    transaction.set(restoreRef.collection(collection).doc(expected.id), {
      path: expected.path,
      beforeFingerprint: expected.beforeFingerprint,
      afterFingerprint: expected.expectedAfterFingerprint,
      restoredAt: FieldValue.serverTimestamp(),
    });
  });
  results.push({ path: expected.path, status: "restored" });
}

let restoreError = null;
try {
  for (const item of preimage.items) await restoreDocument(item, "items");
  for (const machine of preimage.machines) {
    if (!machine.exists) continue;
    await restoreDocument(machine, "machines");
  }
} catch (error) {
  restoreError = error;
}

const verifyItems = itemRefs.length ? await db.getAll(...itemRefs) : [];
const verifyMachines = machineRefs.length ? await db.getAll(...machineRefs) : [];
const postVerifyErrors = [];
preimage.items.forEach((expected, index) => {
  const snapshot = verifyItems[index];
  if (!snapshot.exists || documentFingerprint(snapshot.data() || {}) !== expected.beforeFingerprint) {
    postVerifyErrors.push(`${expected.id}:item-before-fingerprint`);
  }
});
preimage.machines.forEach((expected, index) => {
  const snapshot = verifyMachines[index];
  if (
    snapshot.exists !== expected.exists ||
    (expected.exists &&
      documentFingerprint(snapshot.data() || {}) !== expected.beforeFingerprint)
  ) {
    postVerifyErrors.push(`${expected.id}:machine-before-fingerprint`);
  }
});
if (restoreError) postVerifyErrors.push(`restore-error:${restoreError.message}`);
const status = postVerifyErrors.length ? "incomplete" : "complete";
await restoreRef.set(
  {
    status,
    restoredDocumentCount: results.filter((result) => result.status === "restored").length,
    postVerifyErrors,
    completedAt: FieldValue.serverTimestamp(),
  },
  { merge: true }
);
await db.collection("MigrationAudit").doc(preimage.runId).set(
  {
    restoreStatus: status,
    restoreRunId,
    restoredAt: status === "complete" ? FieldValue.serverTimestamp() : null,
  },
  { merge: true }
);

const resultStamp = new Date().toISOString().replace(/[:.]/g, "-");
const resultPath = path.join(
  repoRoot,
  "outputs",
  "item-location-migration",
  `${restoreRunId}-${resultStamp}-result.json`
);
await fsPromises.writeFile(
  resultPath,
  `${JSON.stringify(
    {
      format: "magmo-item-location-migration-restore-result",
      formatVersion: 1,
      createdAt: new Date().toISOString(),
      status,
      ...summary,
      dryRun: false,
      results,
      postVerifyErrors,
    },
    null,
    2
  )}\n`,
  { encoding: "utf8", flag: "wx" }
);
console.log(JSON.stringify({ ...summary, dryRun: false, status, resultPath, postVerifyErrors }, null, 2));
if (status !== "complete") process.exitCode = 1;
