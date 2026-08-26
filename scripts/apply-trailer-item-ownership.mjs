import crypto from "node:crypto";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import {
  FieldValue,
  getFirestore,
} from "firebase-admin/firestore";

const require = createRequire(import.meta.url);
const { clean } = require("../lib/ops/trailerMigration.cjs");
const { ownershipFingerprint } = require("../lib/ops/trailerItemOwnership.cjs");

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDirectory, "..");
const args = process.argv.slice(2);
const planArgument = args.find((argument) => argument.startsWith("--plan="));
const checksumArgument = args.find((argument) => argument.startsWith("--checksum="));
const backupArgument = args.find((argument) =>
  argument.startsWith("--backup-manifest=")
);

if (args.includes("--help") || !args.includes("--apply")) {
  console.log(`Usage: node scripts/apply-trailer-item-ownership.mjs --apply [options]

Applies a fully reviewed trailer-item ownership plan. The script verifies the
full backup, checks the exact plan checksum, creates a local preimage of every
affected item and machine, and aborts before writing if any item changed since
the audit.

Required:
  --apply                   Explicitly authorize applying the plan.
  --plan=PATH               Audit JSON produced by the ownership audit script.
  --checksum=SHA256         Exact planChecksum printed by that audit.

Optional:
  --backup-manifest=PATH    Completed backup manifest (defaults to report path).
  --help                    Show this help.
`);
  process.exit(args.includes("--help") ? 0 : 1);
}

if (!planArgument || !checksumArgument) {
  throw new Error("--plan and --checksum are required with --apply.");
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

function initializeFirestore() {
  if (getApps().length) return getFirestore();
  const credentialPath = clean(
    process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH ||
      process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
      process.env.GOOGLE_APPLICATION_CREDENTIALS,
    2000
  );
  if (!credentialPath) {
    throw new Error("FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH is not configured.");
  }
  const resolvedPath = path.isAbsolute(credentialPath)
    ? credentialPath
    : path.resolve(repoRoot, credentialPath);
  const serviceAccount = JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
  initializeApp({
    credential: cert(serviceAccount),
    projectId: serviceAccount.project_id,
  });
  return getFirestore();
}

async function sha256(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);
    stream.on("error", reject);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
  });
}

function encodeValue(value) {
  if (value === null) return null;
  if (value === undefined) return { __firestoreType: "undefined" };
  if (["string", "number", "boolean"].includes(typeof value)) return value;
  if (Array.isArray(value)) return value.map(encodeValue);
  if (typeof value?.path === "string" && value?.firestore) {
    return { __firestoreType: "reference", path: value.path };
  }
  if (typeof value?.toDate === "function") {
    return { __firestoreType: "timestamp", iso: value.toDate().toISOString() };
  }
  if (value instanceof Date) {
    return { __firestoreType: "date", iso: value.toISOString() };
  }
  if (Buffer.isBuffer(value) || value instanceof Uint8Array) {
    return {
      __firestoreType: "bytes",
      base64: Buffer.from(value).toString("base64"),
    };
  }
  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, encodeValue(nested)])
    );
  }
  return String(value);
}

const planPath = path.resolve(repoRoot, planArgument.slice("--plan=".length));
const requestedChecksum = checksumArgument.slice("--checksum=".length).trim();
const report = JSON.parse(await fsPromises.readFile(planPath, "utf8"));
if (
  report.format !== "magmo-trailer-item-ownership-audit" ||
  report.formatVersion !== 1 ||
  !report.readOnly
) {
  throw new Error("The supplied plan is not a supported ownership audit.");
}
if (report.summary?.reviewRequiredCount !== 0) {
  throw new Error(
    `Plan still has ${report.summary?.reviewRequiredCount || 0} review-required items.`
  );
}

const changes = (report.items || []).filter((item) => item.status === "change");
const checksumPayload = changes.map((item) => ({
  id: item.id,
  beforeFingerprint: item.beforeFingerprint,
  patch: item.patch,
}));
const calculatedChecksum = crypto
  .createHash("sha256")
  .update(JSON.stringify(checksumPayload))
  .digest("hex");
if (
  calculatedChecksum !== report.planChecksum ||
  calculatedChecksum !== requestedChecksum
) {
  throw new Error("Plan checksum does not match the reviewed checksum.");
}

const backupManifestPath = backupArgument
  ? path.resolve(repoRoot, backupArgument.slice("--backup-manifest=".length))
  : path.resolve(report.backup?.manifestPath || "");
const backupManifest = JSON.parse(
  await fsPromises.readFile(backupManifestPath, "utf8")
);
const backupEntry = backupManifest.files?.["firestore-documents.jsonl"];
const backupDocumentPath = path.join(
  path.dirname(backupManifestPath),
  "firestore-documents.jsonl"
);
if (
  backupManifest.format !== "magmo-firestore-jsonl-backup" ||
  !backupEntry?.sha256 ||
  backupEntry.sha256 !== report.backup?.sha256
) {
  throw new Error("Backup manifest does not match the audited backup.");
}
const backupStats = await fsPromises.stat(backupDocumentPath);
if (backupStats.size !== backupEntry.bytes) {
  throw new Error("Backup byte count changed since the audit.");
}
console.error("Verifying full backup checksum before applying changes...");
if ((await sha256(backupDocumentPath)) !== backupEntry.sha256) {
  throw new Error("Backup checksum verification failed.");
}

const db = initializeFirestore();
const itemRefs = changes.map((item) => db.collection("Test").doc(item.id));
console.error(`Preflighting ${itemRefs.length} item records...`);
const itemSnapshots = await db.getAll(...itemRefs);
const preflightConflicts = [];
for (let index = 0; index < changes.length; index += 1) {
  const snapshot = itemSnapshots[index];
  if (
    !snapshot.exists ||
    ownershipFingerprint(snapshot.data() || {}) !== changes[index].beforeFingerprint
  ) {
    preflightConflicts.push(changes[index].id);
  }
}
if (preflightConflicts.length) {
  throw new Error(
    `Aborted before writing because ${preflightConflicts.length} items changed after the audit: ${preflightConflicts.join(", ")}`
  );
}

const machineIds = Array.from(
  new Set(
    changes
      .flatMap((item) =>
        (item.branches || [])
          .filter((branch) => branch.status === "change")
          .map((branch) => clean(branch.associatedMachineId, 180))
      )
      .filter(Boolean)
  )
).sort();
const machineRefs = machineIds.map((id) => db.collection("Machine").doc(id));
const machineSnapshots = machineRefs.length ? await db.getAll(...machineRefs) : [];
const preimage = {
  format: "magmo-trailer-item-ownership-preimage",
  formatVersion: 1,
  createdAt: new Date().toISOString(),
  sourceProject: db.projectId || report.sourceProject || "",
  planPath,
  planChecksum: calculatedChecksum,
  items: itemSnapshots.map((snapshot) => ({
    path: snapshot.ref.path,
    updateTime: snapshot.updateTime?.toDate?.().toISOString() || "",
    data: encodeValue(snapshot.data() || {}),
  })),
  machines: machineSnapshots.map((snapshot) => ({
    path: snapshot.ref.path,
    exists: snapshot.exists,
    updateTime: snapshot.updateTime?.toDate?.().toISOString() || "",
    data: snapshot.exists ? encodeValue(snapshot.data() || {}) : null,
  })),
};
const runId = `trailer-item-ownership-${new Date()
  .toISOString()
  .replace(/[:.]/g, "-")}`;
const outputDirectory = path.join(repoRoot, "outputs", "trailer-item-ownership");
await fsPromises.mkdir(outputDirectory, { recursive: true });
const preimagePath = path.join(outputDirectory, `${runId}-preimage.json`);
await fsPromises.writeFile(
  preimagePath,
  `${JSON.stringify(preimage, null, 2)}\n`,
  { encoding: "utf8", flag: "wx" }
);
const preimageSha256 = await sha256(preimagePath);
console.error(`Wrote preimage backup: ${preimagePath}`);

const migrationRef = db.collection("MigrationAudit").doc(runId);
await migrationRef.set({
  type: "trailer-item-ownership",
  status: "applying",
  planChecksum: calculatedChecksum,
  planPath,
  targetCount: changes.length,
  preimagePath,
  preimageSha256,
  startedAt: FieldValue.serverTimestamp(),
});

const results = [];
let nextIndex = 0;
async function worker() {
  while (true) {
    const index = nextIndex;
    nextIndex += 1;
    if (index >= changes.length) return;
    const item = changes[index];
    const itemRef = db.collection("Test").doc(item.id);
    try {
      await db.runTransaction(async (transaction) => {
        const snapshot = await transaction.get(itemRef);
        if (
          !snapshot.exists ||
          ownershipFingerprint(snapshot.data() || {}) !== item.beforeFingerprint
        ) {
          throw new Error("ownership fields changed after preflight");
        }
        const update = {};
        for (const [field, documentPath] of Object.entries(
          item.patch?.setReferences || {}
        )) {
          update[field] = db.doc(documentPath);
        }
        Object.assign(update, item.patch?.setValues || {});
        for (const field of item.patch?.deleteFields || []) {
          update[field] = FieldValue.delete();
        }
        transaction.update(itemRef, update);

        const associatedMachineIds = Array.from(
          new Set(
            (item.branches || [])
              .filter((branch) => branch.status === "change")
              .map((branch) => clean(branch.associatedMachineId, 180))
              .filter(Boolean)
          )
        );
        for (const machineId of associatedMachineIds) {
          transaction.set(
            db.collection("Machine").doc(machineId),
            { associatedParts: FieldValue.arrayUnion(itemRef) },
            { merge: true }
          );
        }
        transaction.set(migrationRef.collection("items").doc(item.id), {
          itemId: item.id,
          name: item.name || "",
          beforeFingerprint: item.beforeFingerprint,
          patch: item.patch,
          associatedMachineIds,
          appliedAt: FieldValue.serverTimestamp(),
        });
      });
      results.push({ id: item.id, status: "applied" });
    } catch (error) {
      results.push({ id: item.id, status: "failed", error: error.message });
    }
  }
}

await Promise.all(Array.from({ length: 6 }, () => worker()));
const failures = results.filter((result) => result.status === "failed");
await migrationRef.set(
  {
    status: failures.length ? "completed-with-failures" : "complete",
    appliedCount: results.length - failures.length,
    failedCount: failures.length,
    failures,
    completedAt: FieldValue.serverTimestamp(),
  },
  { merge: true }
);

const resultPath = path.join(outputDirectory, `${runId}-apply-result.json`);
const resultReport = {
  format: "magmo-trailer-item-ownership-apply-result",
  formatVersion: 1,
  runId,
  createdAt: new Date().toISOString(),
  planPath,
  planChecksum: calculatedChecksum,
  preimagePath,
  preimageSha256,
  appliedCount: results.length - failures.length,
  failedCount: failures.length,
  results: results.sort((left, right) => left.id.localeCompare(right.id, "en", { numeric: true })),
};
await fsPromises.writeFile(
  resultPath,
  `${JSON.stringify(resultReport, null, 2)}\n`,
  { encoding: "utf8", flag: "wx" }
);
console.log(
  JSON.stringify(
    {
      runId,
      resultPath,
      planChecksum: calculatedChecksum,
      preimagePath,
      preimageSha256,
      appliedCount: resultReport.appliedCount,
      failedCount: resultReport.failedCount,
    },
    null,
    2
  )
);
if (failures.length) process.exitCode = 1;
