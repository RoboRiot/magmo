import crypto from "node:crypto";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FieldPath } from "firebase-admin/firestore";
import { adminDb } from "../context/FirebaseAdmin.js";

if (!adminDb) {
  throw new Error(
    "Firebase Admin is unavailable. Load the local admin credentials before backing up Firestore."
  );
}

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceDirectory = path.resolve(scriptDirectory, "..");
const requestedOutput = process.argv.find((value) => value.startsWith("--output="));
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupDirectory = requestedOutput
  ? path.resolve(workspaceDirectory, requestedOutput.slice("--output=".length))
  : path.join(
      workspaceDirectory,
      "outputs",
      "firestore-backups",
      `${timestamp}-magmo-firestore`
    );
const documentPath = path.join(backupDirectory, "firestore-documents.jsonl");
const manifestPath = path.join(backupDirectory, "manifest.json");
const pageSizeArgument = process.argv.find((value) =>
  value.startsWith("--page-size=")
);
const pageSize = Math.max(
  25,
  Math.min(500, Number(pageSizeArgument?.slice("--page-size=".length)) || 100)
);
const childScanConcurrencyArgument = process.argv.find((value) =>
  value.startsWith("--child-scan-concurrency=")
);
const childScanConcurrency = Math.max(
  1,
  Math.min(
    32,
    Number(
      childScanConcurrencyArgument?.slice(
        "--child-scan-concurrency=".length
      )
    ) || 1
  )
);

function encodeValue(value) {
  if (value === null) return null;
  if (value === undefined) return { __firestoreType: "undefined" };
  if (["string", "number", "boolean"].includes(typeof value)) return value;
  if (value instanceof Date) {
    return { __firestoreType: "date", iso: value.toISOString() };
  }
  if (Buffer.isBuffer(value) || value instanceof Uint8Array) {
    return {
      __firestoreType: "bytes",
      base64: Buffer.from(value).toString("base64"),
    };
  }
  if (Array.isArray(value)) return value.map(encodeValue);
  if (typeof value?.path === "string" && value?.firestore) {
    return { __firestoreType: "reference", path: value.path };
  }
  if (
    typeof value?.seconds === "number" &&
    typeof value?.nanoseconds === "number" &&
    typeof value?.toDate === "function"
  ) {
    return {
      __firestoreType: "timestamp",
      seconds: value.seconds,
      nanoseconds: value.nanoseconds,
      iso: value.toDate().toISOString(),
    };
  }
  if (
    typeof value?.latitude === "number" &&
    typeof value?.longitude === "number"
  ) {
    return {
      __firestoreType: "geopoint",
      latitude: value.latitude,
      longitude: value.longitude,
    };
  }
  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        encodeValue(nestedValue),
      ])
    );
  }
  return { __firestoreType: typeof value, value: String(value) };
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

await fsPromises.mkdir(backupDirectory, { recursive: true });
const output = await fsPromises.open(documentPath, "wx");
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
        createTime: documentSnapshot.createTime?.toDate?.().toISOString() || null,
        updateTime: documentSnapshot.updateTime?.toDate?.().toISOString() || null,
        readTime: documentSnapshot.readTime?.toDate?.().toISOString() || null,
        data: encodeValue(documentSnapshot.data()),
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
} finally {
  await output.close();
}

const documentSha256 = await sha256(documentPath);
const stats = await fsPromises.stat(documentPath);
const manifest = {
  format: "magmo-firestore-jsonl-backup",
  formatVersion: 1,
  sourceProject: adminDb.projectId || process.env.FIREBASE_ADMIN_PROJECT_ID || "",
  createdAt: new Date().toISOString(),
  documentCount,
  collectionCount: Object.keys(collectionCounts).length,
  collectionCounts,
  pageSize,
  childScanConcurrency,
  files: {
    "firestore-documents.jsonl": {
      bytes: stats.size,
      sha256: documentSha256,
    },
  },
  notes: [
    "Logical local backup produced through the Firestore Admin API.",
    "Firestore references, timestamps, geopoints, byte arrays, and nested subcollections are type-tagged for restoration.",
    "No source documents were modified by this backup.",
  ],
};
await fsPromises.writeFile(
  manifestPath,
  `${JSON.stringify(manifest, null, 2)}\n`,
  { encoding: "utf8", flag: "wx" }
);

console.log(
  JSON.stringify(
    {
      backupDirectory,
      manifestPath,
      documentPath,
      documentCount,
      collectionCount: manifest.collectionCount,
      bytes: stats.size,
      sha256: documentSha256,
      pageSize,
      childScanConcurrency,
    },
    null,
    2
  )
);
