import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const {
  STORAGE_UNIT_COUNT,
  buildStorageUnitPlan,
  validateStorageUnitPlan,
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
  console.log(`Usage: node scripts/plan-storage-unit-migration.mjs [options]

Builds a deterministic StorageUnits migration plan entirely from a completed,
checksum-verified logical Firestore backup. It never connects to Firestore and
plans zero writes to Test.

Required:
  --backup-manifest=PATH    manifest.json from backup-firestore-local.mjs
  --backup-hash=SHA256      Exact reviewed firestore-documents.jsonl hash
  --project=PROJECT_ID      Exact Firebase project ID
  --expected-count=221      Exact B1..B119 plus P1..P102 unit count

Optional:
  --output=PATH             Output JSON path (exclusive creation)
  --help                    Show this help
`);
  process.exit(exitCode);
}

if (args.includes("--help")) usage(0);
for (const name of ["backup-manifest", "backup-hash", "project", "expected-count"]) {
  if (!argumentValue(name)) usage(1);
}

const expectedProject = argumentValue("project").trim();
const requestedBackupHash = argumentValue("backup-hash").trim().toLowerCase();
const expectedCount = Number(argumentValue("expected-count"));
if (!/^[a-f0-9]{64}$/.test(requestedBackupHash)) {
  throw new Error("--backup-hash must be a 64-character SHA-256 value.");
}
if (expectedCount !== STORAGE_UNIT_COUNT) {
  throw new Error(`--expected-count must be exactly ${STORAGE_UNIT_COUNT}.`);
}

const manifestPath = path.resolve(repoRoot, argumentValue("backup-manifest"));
const backupVerification = await verifyBackupManifest(manifestPath);
const manifest = JSON.parse(await fsPromises.readFile(manifestPath, "utf8"));
if (manifest.sourceProject !== expectedProject) {
  throw new Error(
    `Backup project ${manifest.sourceProject || "(missing)"} does not match --project=${expectedProject}.`
  );
}
if (backupVerification.sha256.toLowerCase() !== requestedBackupHash) {
  throw new Error("Verified backup checksum does not match --backup-hash.");
}

const items = [];
const existingUnits = [];
let warehouseDirectory = null;
let warehouseDirectoryUpdateTime = "";
let parsedDocumentCount = 0;
const input = fs.createReadStream(backupVerification.documentPath, { encoding: "utf8" });
const lines = readline.createInterface({ input, crlfDelay: Infinity });
for await (const line of lines) {
  if (!line.trim()) continue;
  parsedDocumentCount += 1;
  const record = JSON.parse(line);
  const segments = String(record.path || "").split("/").filter(Boolean);
  if (segments.length !== 2) continue;
  const [collection, id] = segments;
  if (collection === "Test") {
    items.push({
      id,
      data: record.data || {},
      createTime: record.createTime || "",
      updateTime: record.updateTime || "",
    });
  } else if (collection === "StorageUnits") {
    existingUnits.push({
      id,
      data: record.data || {},
      createTime: record.createTime || "",
      updateTime: record.updateTime || "",
    });
  } else if (record.path === "Warehouse/directory") {
    if (warehouseDirectory) throw new Error("Backup contains duplicate Warehouse/directory records.");
    warehouseDirectory = record.data || {};
    warehouseDirectoryUpdateTime = record.updateTime || "";
  }
}

if (parsedDocumentCount !== manifest.documentCount) {
  throw new Error(
    `Backup document count mismatch: manifest=${manifest.documentCount}, parsed=${parsedDocumentCount}.`
  );
}
if (items.length !== manifest.collectionCounts?.Test) {
  throw new Error(
    `Root Test count mismatch: manifest=${manifest.collectionCounts?.Test}, parsed=${items.length}.`
  );
}
if (existingUnits.length !== (manifest.collectionCounts?.StorageUnits || 0)) {
  throw new Error(
    `Root StorageUnits count mismatch: manifest=${manifest.collectionCounts?.StorageUnits || 0}, parsed=${existingUnits.length}.`
  );
}
if (!warehouseDirectory) throw new Error("Warehouse/directory is missing from the verified backup.");

const plan = buildStorageUnitPlan({
  sourceProject: expectedProject,
  backup: {
    createdAt: manifest.createdAt,
    documentCount: manifest.documentCount,
    bytes: backupVerification.bytes,
    sha256: backupVerification.sha256,
    verified: true,
  },
  warehouseDirectory,
  warehouseDirectoryUpdateTime,
  items,
  existingUnits,
});
const validation = validateStorageUnitPlan(plan, {
  sourceProject: expectedProject,
  planHash: plan.planHash,
  backupSha256: requestedBackupHash,
  expectedCount,
});
if (!validation.valid) {
  throw new Error(`Generated plan failed its contract: ${validation.errors.join("; ")}`);
}

const outputArgument = argumentValue("output");
const outputDirectory = path.join(repoRoot, "outputs", "storage-unit-migration");
const outputPath = outputArgument
  ? path.resolve(repoRoot, outputArgument)
  : path.join(
      outputDirectory,
      `${String(manifest.createdAt).replace(/[:.]/g, "-")}-plan.json`
    );
await fsPromises.mkdir(path.dirname(outputPath), { recursive: true });
await fsPromises.writeFile(outputPath, `${JSON.stringify(plan, null, 2)}\n`, {
  encoding: "utf8",
  flag: "wx",
});

console.log(
  JSON.stringify(
    {
      dryRun: true,
      firestoreReadsPerformed: false,
      firestoreWritesPerformed: false,
      testWritesPlanned: 0,
      sourceProject: plan.sourceProject,
      outputPath,
      backupSha256: requestedBackupHash,
      planHash: plan.planHash,
      expectedUnitCount: plan.expectedUnitCount,
      expectedWriteCount: plan.expectedWriteCount,
      testInvariant: {
        count: plan.testInvariant.count,
        idSetFingerprint: plan.testInvariant.idSetFingerprint,
        aggregateDocumentFingerprint: plan.testInvariant.aggregateDocumentFingerprint,
        aggregateMembershipFingerprint: plan.testInvariant.aggregateMembershipFingerprint,
      },
      summary: plan.summary,
    },
    null,
    2
  )
);
