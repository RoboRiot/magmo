import fsPromises from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const {
  BACKUP_DOCUMENT_FILE,
  BACKUP_FORMAT,
  BACKUP_FORMAT_VERSION,
  BACKUP_MANIFEST_FILE,
  INCOMPLETE_MARKER,
  encodeFirestoreValue,
  inspectJsonlFile,
  readGitMetadata,
  verifyBackupManifest,
} = require("../lib/firestoreBackupCodec.cjs");

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceDirectory = path.resolve(scriptDirectory, "..");
const args = process.argv.slice(2);

function optionValue(name) {
  const inline = args.find((argument) => argument.startsWith(`${name}=`));
  const index = args.indexOf(name);
  if (inline && index >= 0) {
    throw new Error(`${name} may only be supplied once.`);
  }
  if (inline) {
    const value = inline.slice(name.length + 1).trim();
    if (!value) throw new Error(`${name} requires a value.`);
    return value;
  }
  if (index >= 0) {
    const value = args[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`${name} requires a value.`);
    }
    return value;
  }
  return null;
}

function boundedInteger(value, fallback, minimum, maximum, name) {
  if (value == null) return fallback;
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed)) {
    throw new Error(`${name} must be an integer.`);
  }
  return Math.max(minimum, Math.min(maximum, parsed));
}

function resolveWorkspacePath(value) {
  return path.isAbsolute(value)
    ? path.resolve(value)
    : path.resolve(workspaceDirectory, value);
}

function printHelp() {
  console.log(`Usage:
  node scripts/backup-firestore-local.mjs [backup options]
  node scripts/backup-firestore-local.mjs --verify=PATH

Backup options:
  --output=PATH                  New backup directory. Defaults to a dated path.
  --page-size=NUMBER             Firestore query page size (25-500; default 100).
  --child-scan-concurrency=NUM   Concurrent subcollection scans (1-32; default 1).

Verification:
  --verify=PATH                  Verify a backup directory or manifest only.
                                 This mode never initializes Firebase.
  --help                         Show this help.

A completed backup has manifest status "complete" and no ${INCOMPLETE_MARKER}
marker. Never delete or reuse a directory that still has the marker.
`);
}

const knownOptions = new Set([
  "--help",
  "--verify",
  "--output",
  "--page-size",
  "--child-scan-concurrency",
]);
for (let index = 0; index < args.length; index += 1) {
  const argument = args[index];
  if (!argument.startsWith("--")) {
    throw new Error(`Unexpected positional argument: ${argument}`);
  }
  const name = argument.split("=", 1)[0];
  if (!knownOptions.has(name)) throw new Error(`Unknown option: ${name}`);
  if (!argument.includes("=") && name !== "--help") index += 1;
}

if (args.includes("--help")) {
  printHelp();
  process.exit(0);
}

const verifyInput = optionValue("--verify");
if (verifyInput) {
  const conflictingOptions = [
    "--output",
    "--page-size",
    "--child-scan-concurrency",
  ].filter((name) => optionValue(name) != null);
  if (conflictingOptions.length) {
    throw new Error(
      `--verify cannot be combined with ${conflictingOptions.join(", ")}.`
    );
  }
  const verification = await verifyBackupManifest(
    resolveWorkspacePath(verifyInput)
  );
  console.log(JSON.stringify(verification, null, 2));
  process.exit(0);
}

const requestedOutput = optionValue("--output");
const pageSize = boundedInteger(
  optionValue("--page-size"),
  100,
  25,
  500,
  "--page-size"
);
const childScanConcurrency = boundedInteger(
  optionValue("--child-scan-concurrency"),
  1,
  1,
  32,
  "--child-scan-concurrency"
);
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupDirectory = requestedOutput
  ? resolveWorkspacePath(requestedOutput)
  : path.join(
      workspaceDirectory,
      "outputs",
      "firestore-backups",
      `${timestamp}-magmo-firestore`
    );
const documentPath = path.join(backupDirectory, BACKUP_DOCUMENT_FILE);
const manifestPath = path.join(backupDirectory, BACKUP_MANIFEST_FILE);
const markerPath = path.join(backupDirectory, INCOMPLETE_MARKER);

async function writeExclusiveAndSync(filePath, contents) {
  const handle = await fsPromises.open(filePath, "wx");
  try {
    await handle.writeFile(contents, "utf8");
    await handle.sync();
  } finally {
    await handle.close();
  }
}

async function mapConcurrent(values, limit, callback) {
  const results = new Array(values.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < values.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await callback(values[index], index);
    }
  }
  await Promise.all(
    Array.from(
      { length: Math.min(values.length, Math.max(1, limit)) },
      worker
    )
  );
  return results;
}

const startedAt = new Date().toISOString();
// Capture Git state before creating output files so the backup cannot make
// its own source tree appear dirty. Only the branch, SHA, and boolean status
// are retained; filenames and file contents are never written to the manifest.
const git = readGitMetadata(workspaceDirectory);

// A run always owns a brand-new leaf directory. Refusing an existing leaf
// prevents a retry from overwriting or relabeling an incomplete/complete run.
await fsPromises.mkdir(path.dirname(backupDirectory), { recursive: true });
await fsPromises.mkdir(backupDirectory);
await writeExclusiveAndSync(
  markerPath,
  `${JSON.stringify(
    {
      status: "incomplete",
      startedAt,
      note: "Do not use, delete, or reuse this backup directory unless a completed manifest is present and this marker is absent.",
    },
    null,
    2
  )}\n`
);

let output;
try {
  const [{ FieldPath }, { adminDb }] = await Promise.all([
    import("firebase-admin/firestore"),
    import("../context/FirebaseAdmin.js"),
  ]);
  if (!adminDb) {
    throw new Error(
      "Firebase Admin is unavailable. Load the local admin credentials before backing up Firestore."
    );
  }

  output = await fsPromises.open(documentPath, "wx");
  const collectionCounts = {};
  let documentCount = 0;

  async function backupCollection(collectionReference) {
    collectionCounts[collectionReference.path] = 0;
    let lastDocumentId = "";

    while (true) {
      let query = collectionReference
        .orderBy(FieldPath.documentId())
        .limit(pageSize);
      if (lastDocumentId) query = query.startAfter(lastDocumentId);
      const snapshot = await query.get();
      if (snapshot.empty) break;

      // listCollections() is a read-only metadata request. Most root documents
      // have no children, so bounded parallel discovery avoids making tens of
      // thousands of independent network round trips serially.
      const childCollectionsByDocument = await mapConcurrent(
        snapshot.docs,
        childScanConcurrency,
        (documentSnapshot) => documentSnapshot.ref.listCollections()
      );

      for (
        let documentIndex = 0;
        documentIndex < snapshot.docs.length;
        documentIndex += 1
      ) {
        const documentSnapshot = snapshot.docs[documentIndex];
        const record = {
          path: documentSnapshot.ref.path,
          createTime:
            documentSnapshot.createTime?.toDate?.().toISOString() || null,
          updateTime:
            documentSnapshot.updateTime?.toDate?.().toISOString() || null,
          readTime: documentSnapshot.readTime?.toDate?.().toISOString() || null,
          data: encodeFirestoreValue(documentSnapshot.data()),
        };
        await output.write(`${JSON.stringify(record)}\n`);
        documentCount += 1;
        collectionCounts[collectionReference.path] += 1;

        const childCollections = childCollectionsByDocument[documentIndex];
        for (const childCollection of childCollections) {
          await backupCollection(childCollection);
        }
      }

      lastDocumentId = snapshot.docs[snapshot.docs.length - 1].id;
      if (snapshot.size < pageSize) break;
    }
  }

  try {
    const rootCollections = await adminDb.listCollections();
    for (const collectionReference of rootCollections.sort((left, right) =>
      left.id.localeCompare(right.id)
    )) {
      await backupCollection(collectionReference);
      console.error(
        `Backed up ${collectionReference.path}: ${collectionCounts[collectionReference.path]} documents`
      );
    }
    await output.sync();
  } finally {
    await output.close();
    output = null;
  }

  // Re-open the closed artifact and inspect it as a stream. This checks the
  // byte count, SHA-256, and record count without loading the JSONL into memory.
  const statsBeforeInspection = await fsPromises.stat(documentPath);
  const inspection = await inspectJsonlFile(documentPath);
  const statsAfterInspection = await fsPromises.stat(documentPath);
  if (
    statsBeforeInspection.size !== statsAfterInspection.size ||
    statsBeforeInspection.mtimeMs !== statsAfterInspection.mtimeMs ||
    inspection.bytes !== statsAfterInspection.size
  ) {
    throw new Error("Backup JSONL changed during the post-close verification.");
  }
  if (inspection.documentCount !== documentCount) {
    throw new Error(
      `Backup record recount found ${inspection.documentCount}; expected ${documentCount}.`
    );
  }

  const completedAt = new Date().toISOString();
  const sourceProject =
    adminDb.projectId || process.env.FIREBASE_ADMIN_PROJECT_ID || "";
  if (!sourceProject.trim()) {
    throw new Error("Firestore source project could not be identified.");
  }
  const manifest = {
    format: BACKUP_FORMAT,
    formatVersion: BACKUP_FORMAT_VERSION,
    status: "complete",
    startedAt,
    completedAt,
    createdAt: completedAt,
    sourceProject,
    source: {
      projectId: sourceProject,
      databaseId: "(default)",
    },
    scope: {
      firestoreIncluded: true,
      firestoreOnly: true,
      storageIncluded: false,
      storageModified: false,
      authIncluded: false,
    },
    git,
    documentCount,
    collectionCount: Object.keys(collectionCounts).length,
    collectionCounts,
    pageSize,
    childScanConcurrency,
    files: {
      [BACKUP_DOCUMENT_FILE]: {
        bytes: inspection.bytes,
        sha256: inspection.sha256,
      },
    },
    verification: {
      artifactClosedBeforeInspection: true,
      byteCountRechecked: true,
      checksumRecomputed: true,
      documentCountRecounted: true,
      artifactStableDuringInspection: true,
    },
    notes: [
      "Logical local backup produced through the Firestore Admin API.",
      "Firestore references, timestamps, geopoints, byte arrays, and nested subcollections are type-tagged for restoration.",
      "This artifact includes Firestore only; Cloud Storage and Firebase Authentication are not included.",
      "No Firestore, Cloud Storage, or Firebase Authentication source data was modified by this backup.",
    ],
  };
  await writeExclusiveAndSync(
    manifestPath,
    `${JSON.stringify(manifest, null, 2)}\n`
  );

  // A manifest that cannot be reopened as a complete manifest is not complete.
  // In that case the marker remains and the directory must not be used.
  const persistedManifest = JSON.parse(
    await fsPromises.readFile(manifestPath, "utf8")
  );
  if (persistedManifest.status !== "complete") {
    throw new Error("Persisted backup manifest is not complete.");
  }
  await fsPromises.unlink(markerPath);

  console.log(
    JSON.stringify(
      {
        status: "complete",
        backupDirectory,
        manifestPath,
        documentPath,
        documentCount,
        collectionCount: manifest.collectionCount,
        bytes: inspection.bytes,
        sha256: inspection.sha256,
        pageSize,
        childScanConcurrency,
        git,
        scope: manifest.scope,
      },
      null,
      2
    )
  );
} catch (error) {
  if (output) {
    try {
      await output.close();
    } catch {
      // Preserve the original failure. The marker already makes this run
      // unusable, even if the partial output handle could not close cleanly.
    }
  }
  console.error(
    `Backup is incomplete. Preserve the directory and ${INCOMPLETE_MARKER} marker for diagnosis: ${backupDirectory}`
  );
  throw error;
}
