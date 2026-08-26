import crypto from "node:crypto";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const require = createRequire(import.meta.url);
const { clean, groupTrailerRecords } = require("../lib/ops/trailerMigration.cjs");
const {
  buildTrailerOwnershipIndexes,
  explicitTrailerTextEvidence,
  ownershipFingerprint,
  planItemTrailerOwnership,
} = require("../lib/ops/trailerItemOwnership.cjs");
const reviewedOverrides = require("../lib/ops/trailerItemReviewedOverrides.cjs");

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDirectory, "..");
const args = process.argv.slice(2);
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const outputArgument = args.find((argument) => argument.startsWith("--output="));
const backupArgument = args.find((argument) =>
  argument.startsWith("--backup-manifest=")
);
const outputPath = outputArgument
  ? path.resolve(repoRoot, outputArgument.slice("--output=".length))
  : path.join(
      repoRoot,
      "outputs",
      "trailer-item-ownership",
      `${timestamp}-audit.json`
    );
const backupManifestPath = backupArgument
  ? path.resolve(repoRoot, backupArgument.slice("--backup-manifest=".length))
  : path.join(
      repoRoot,
      "outputs",
      "firestore-backups",
      "2026-08-20T00-11-32-679Z-magmo-firestore",
      "manifest.json"
    );

if (args.includes("--help")) {
  console.log(`Usage: node scripts/audit-trailer-item-ownership.mjs [options]

Read-only audit. Compares every current root Test item to the pre-migration local
backup and prepares only deterministic trailer-ownership corrections.

Options:
  --output=PATH             Write the JSON audit to PATH.
  --backup-manifest=PATH    Completed backup manifest to verify and compare.
  --help                    Show this help.
`);
  process.exit(0);
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

function decodeValue(value) {
  if (Array.isArray(value)) return value.map(decodeValue);
  if (!value || typeof value !== "object") return value;
  if (value.__firestoreType === "reference") return { path: value.path || "" };
  if (
    value.__firestoreType === "timestamp" ||
    value.__firestoreType === "date"
  ) {
    return value.iso || "";
  }
  if (value.__firestoreType) return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, nested]) => [key, decodeValue(nested)])
  );
}

async function validateBackup() {
  const manifest = JSON.parse(await fsPromises.readFile(backupManifestPath, "utf8"));
  if (
    manifest.format !== "magmo-firestore-jsonl-backup" ||
    manifest.formatVersion !== 1 ||
    !manifest.documentCount
  ) {
    throw new Error(`Backup manifest is incomplete or unsupported: ${backupManifestPath}`);
  }
  const fileEntry = manifest.files?.["firestore-documents.jsonl"];
  if (!fileEntry?.sha256 || !fileEntry?.bytes) {
    throw new Error("Backup manifest does not contain a completed JSONL checksum.");
  }
  const documentPath = path.join(
    path.dirname(backupManifestPath),
    "firestore-documents.jsonl"
  );
  const stats = await fsPromises.stat(documentPath);
  if (stats.size !== fileEntry.bytes) {
    throw new Error(
      `Backup byte count mismatch: expected ${fileEntry.bytes}, found ${stats.size}`
    );
  }
  console.error("Verifying the completed backup checksum...");
  const actualSha256 = await sha256(documentPath);
  if (actualSha256 !== fileEntry.sha256) {
    throw new Error("Backup checksum verification failed.");
  }
  return { manifest, documentPath, actualSha256 };
}

async function readOriginalItems(documentPath) {
  const originals = new Map();
  const input = fs.createReadStream(documentPath, { encoding: "utf8" });
  const lines = readline.createInterface({ input, crlfDelay: Infinity });
  let sawTest = false;
  for await (const line of lines) {
    if (!line.trim()) continue;
    const record = JSON.parse(line);
    const rootCollection = String(record.path || "").split("/")[0];
    if (rootCollection === "Test") {
      sawTest = true;
      const segments = String(record.path).split("/");
      if (segments.length === 2) {
        originals.set(segments[1], {
          data: decodeValue(record.data || {}),
          updateTime: record.updateTime || "",
        });
      }
      continue;
    }
    if (sawTest) break;
  }
  return originals;
}

function evidenceSignature(record = {}) {
  return explicitTrailerTextEvidence(record)
    .map((entry) => `${entry.branch}:${entry.number}:${entry.path}:${entry.phrase}`)
    .sort();
}

const backup = await validateBackup();
console.error("Reading original Test items from the verified backup...");
const originals = await readOriginalItems(backup.documentPath);
const db = initializeFirestore();
console.error("Reading current trailers and items from Firestore...");
const [trailerSnapshot, itemSnapshot] = await Promise.all([
  db.collection("Trailers").get(),
  db.collection("Test").get(),
]);

const trailerRecords = trailerSnapshot.docs.map((document) => ({
  id: document.id,
  ...document.data(),
}));
const groups = groupTrailerRecords(trailerRecords);
const indexes = buildTrailerOwnershipIndexes(groups);
const currentIds = new Set(itemSnapshot.docs.map((document) => document.id));
const originalOnlyIds = [...originals.keys()]
  .filter((id) => !currentIds.has(id))
  .sort((left, right) => left.localeCompare(right, "en", { numeric: true }));

const items = itemSnapshot.docs
  .map((document) => {
    const currentRecord = document.data() || {};
    const original = originals.get(document.id);
    const originalRecord = original?.data || {};
    const plan = planItemTrailerOwnership({
      id: document.id,
      currentRecord,
      originalRecord,
      ...indexes,
      reviewedOverrides,
    });
    return {
      ...plan,
      originalFound: Boolean(original),
      originalUpdateTime: original?.updateTime || "",
      currentUpdateTime: document.updateTime?.toDate?.().toISOString() || "",
      ownershipChangedSinceBackup: original
        ? ownershipFingerprint(originalRecord) !== ownershipFingerprint(currentRecord)
        : false,
      trailerTextEvidenceChangedSinceBackup: original
        ? JSON.stringify(evidenceSignature(originalRecord)) !==
          JSON.stringify(evidenceSignature(currentRecord))
        : false,
    };
  })
  .sort((left, right) => left.id.localeCompare(right.id, "en", { numeric: true }));

const plansForChecksum = items
  .filter((item) => item.status === "change")
  .map((item) => ({
    id: item.id,
    beforeFingerprint: item.beforeFingerprint,
    patch: item.patch,
  }));
const planChecksum = crypto
  .createHash("sha256")
  .update(JSON.stringify(plansForChecksum))
  .digest("hex");
const count = (status) => items.filter((item) => item.status === status).length;
const report = {
  format: "magmo-trailer-item-ownership-audit",
  formatVersion: 1,
  createdAt: new Date().toISOString(),
  sourceProject: db.projectId || backup.manifest.sourceProject || "",
  readOnly: true,
  rule: {
    activeOwnership:
      "A trailer-owned branch stores the trailer and associated machine, but no client. The client/site is derived from the trailer link so the item follows the trailer when it is re-linked.",
    explicitText:
      "From Trailer AIS[number] assigns the from branch; For/To Trailer AIS[number] assigns the current branch.",
    ambiguity:
      "Conflicting or unresolved evidence is review-only and is excluded from the deterministic change plan.",
  },
  backup: {
    manifestPath: backupManifestPath,
    documentPath: backup.documentPath,
    documentCount: backup.manifest.documentCount,
    bytes: backup.manifest.files["firestore-documents.jsonl"].bytes,
    sha256: backup.actualSha256,
    verified: true,
  },
  planChecksum,
  summary: {
    currentItemCount: items.length,
    originalItemCount: originals.size,
    currentOnlyItemCount: items.filter((item) => !item.originalFound).length,
    originalOnlyItemCount: originalOnlyIds.length,
    deterministicChangeCount: count("change"),
    alreadyCorrectTrailerOwnershipCount: count("correct"),
    reviewRequiredCount: count("review"),
    noTrailerEvidenceCount: count("none"),
    ownershipChangedSinceBackupCount: items.filter(
      (item) => item.ownershipChangedSinceBackup
    ).length,
    trailerTextEvidenceChangedSinceBackupCount: items.filter(
      (item) => item.trailerTextEvidenceChangedSinceBackup
    ).length,
  },
  originalOnlyIds,
  items,
};

await fsPromises.mkdir(path.dirname(outputPath), { recursive: true });
await fsPromises.writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(
  JSON.stringify(
    {
      outputPath,
      planChecksum,
      summary: report.summary,
    },
    null,
    2
  )
);
