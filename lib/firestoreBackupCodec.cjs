const crypto = require("node:crypto");
const fs = require("node:fs");
const fsPromises = require("node:fs/promises");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const BACKUP_FORMAT = "magmo-firestore-jsonl-backup";
const BACKUP_FORMAT_VERSION = 1;
const BACKUP_DOCUMENT_FILE = "firestore-documents.jsonl";
const BACKUP_MANIFEST_FILE = "manifest.json";
const INCOMPLETE_MARKER = "INCOMPLETE";

function encodeFirestoreValue(value) {
  if (value === null) return null;
  if (value === undefined) return { __firestoreType: "undefined" };
  if (typeof value === "number" && !Number.isFinite(value)) {
    return { __firestoreType: "number", value: String(value) };
  }
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
  if (Array.isArray(value)) return value.map(encodeFirestoreValue);
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
    typeof value?.longitude === "number" &&
    (value.constructor?.name === "GeoPoint" ||
      typeof value?.isEqual === "function")
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
        encodeFirestoreValue(nestedValue),
      ])
    );
  }
  return { __firestoreType: typeof value, value: String(value) };
}

async function inspectJsonlFile(filePath) {
  const hash = crypto.createHash("sha256");
  const stream = fs.createReadStream(filePath);
  let bytes = 0;
  let documentCount = 0;
  let currentLineBytes = 0;

  for await (const chunk of stream) {
    hash.update(chunk);
    bytes += chunk.length;

    let cursor = 0;
    while (cursor < chunk.length) {
      const newlineIndex = chunk.indexOf(0x0a, cursor);
      if (newlineIndex === -1) {
        currentLineBytes += chunk.length - cursor;
        break;
      }
      currentLineBytes += newlineIndex - cursor;
      if (currentLineBytes === 0) {
        throw new Error(
          `Backup JSONL contains an empty record before record ${documentCount + 1}.`
        );
      }
      documentCount += 1;
      currentLineBytes = 0;
      cursor = newlineIndex + 1;
    }
  }

  if (currentLineBytes > 0) documentCount += 1;
  return {
    bytes,
    documentCount,
    sha256: hash.digest("hex"),
  };
}

async function sha256File(filePath) {
  return (await inspectJsonlFile(filePath)).sha256;
}

async function countJsonlRecords(filePath) {
  return (await inspectJsonlFile(filePath)).documentCount;
}

function runGit(repoRoot, argumentsList) {
  const result = spawnSync("git", ["-C", repoRoot, ...argumentsList], {
    encoding: "utf8",
    shell: false,
    windowsHide: true,
  });
  if (result.error || result.status !== 0) return null;
  return result.stdout.trim();
}

function readGitMetadata(repoRoot) {
  if (runGit(repoRoot, ["rev-parse", "--is-inside-work-tree"]) !== "true") {
    return { available: false, branch: null, sha: null, dirty: null };
  }

  const sha = runGit(repoRoot, ["rev-parse", "HEAD"]);
  const branch = runGit(repoRoot, ["symbolic-ref", "--short", "-q", "HEAD"]);
  const status = runGit(repoRoot, [
    "status",
    "--porcelain=v1",
    "--untracked-files=normal",
  ]);
  return {
    available: Boolean(sha),
    branch: branch || null,
    sha: sha || null,
    dirty: status == null ? null : status.length > 0,
  };
}

function isNonNegativeInteger(value) {
  return Number.isSafeInteger(value) && value >= 0;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

async function exists(filePath) {
  try {
    await fsPromises.access(filePath);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

async function resolveManifestPath(inputPath) {
  if (!inputPath || typeof inputPath !== "string") {
    throw new Error("A backup directory or manifest path is required.");
  }
  const resolvedPath = path.resolve(inputPath);
  const stats = await fsPromises.stat(resolvedPath);
  return stats.isDirectory()
    ? path.join(resolvedPath, BACKUP_MANIFEST_FILE)
    : resolvedPath;
}

async function verifyBackupManifest(inputPath, options = {}) {
  const manifestPath = await resolveManifestPath(inputPath);
  const backupDirectory = path.dirname(manifestPath);
  const markerPath = path.join(backupDirectory, INCOMPLETE_MARKER);
  if (!options.allowIncompleteMarker && (await exists(markerPath))) {
    throw new Error(
      `Backup is incomplete because ${INCOMPLETE_MARKER} is still present.`
    );
  }

  let manifest;
  try {
    manifest = JSON.parse(await fsPromises.readFile(manifestPath, "utf8"));
  } catch (error) {
    throw new Error(`Backup manifest could not be read: ${error.message}`);
  }

  if (
    manifest.format !== BACKUP_FORMAT ||
    manifest.formatVersion !== BACKUP_FORMAT_VERSION
  ) {
    throw new Error("Backup manifest format or version is unsupported.");
  }
  if (manifest.status !== "complete") {
    throw new Error("Backup manifest status is not complete.");
  }
  if (
    typeof manifest.sourceProject !== "string" ||
    manifest.sourceProject.trim().length === 0
  ) {
    throw new Error("Backup manifest sourceProject is missing.");
  }
  const scope = manifest.scope;
  if (
    !isPlainObject(scope) ||
    scope.firestoreIncluded !== true ||
    scope.firestoreOnly !== true ||
    scope.storageIncluded !== false ||
    scope.storageModified !== false ||
    scope.authIncluded !== false
  ) {
    throw new Error("Backup manifest Firestore-only scope is missing or invalid.");
  }
  const git = manifest.git;
  if (
    !isPlainObject(git) ||
    typeof git.available !== "boolean" ||
    (git.available &&
      (!/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/i.test(git.sha || "") ||
        !(git.branch === null || typeof git.branch === "string") ||
        typeof git.dirty !== "boolean")) ||
    (!git.available &&
      !(git.branch === null && git.sha === null && git.dirty === null))
  ) {
    throw new Error("Backup manifest Git metadata is missing or invalid.");
  }
  const verification = manifest.verification;
  if (
    !isPlainObject(verification) ||
    verification.artifactClosedBeforeInspection !== true ||
    verification.byteCountRechecked !== true ||
    verification.checksumRecomputed !== true ||
    verification.documentCountRecounted !== true ||
    verification.artifactStableDuringInspection !== true
  ) {
    throw new Error("Backup manifest verification receipt is incomplete.");
  }
  if (!isNonNegativeInteger(manifest.documentCount)) {
    throw new Error("Backup manifest documentCount is invalid.");
  }
  if (!isNonNegativeInteger(manifest.collectionCount)) {
    throw new Error("Backup manifest collectionCount is invalid.");
  }
  if (!isPlainObject(manifest.collectionCounts)) {
    throw new Error("Backup manifest collectionCounts is invalid.");
  }
  const collectionEntries = Object.entries(manifest.collectionCounts);
  if (
    collectionEntries.length !== manifest.collectionCount ||
    collectionEntries.some(([, count]) => !isNonNegativeInteger(count))
  ) {
    throw new Error("Backup manifest collection counts do not match.");
  }
  const collectionDocumentCount = collectionEntries.reduce(
    (total, [, count]) => total + count,
    0
  );
  if (collectionDocumentCount !== manifest.documentCount) {
    throw new Error(
      "Backup manifest collectionCounts do not sum to documentCount."
    );
  }

  const fileEntry = manifest.files?.[BACKUP_DOCUMENT_FILE];
  if (
    !isPlainObject(fileEntry) ||
    !isNonNegativeInteger(fileEntry.bytes) ||
    !/^[a-f0-9]{64}$/i.test(fileEntry.sha256 || "")
  ) {
    throw new Error("Backup manifest JSONL file metadata is invalid.");
  }

  const documentPath = path.join(backupDirectory, BACKUP_DOCUMENT_FILE);
  const statsBefore = await fsPromises.stat(documentPath);
  if (!statsBefore.isFile() || statsBefore.size !== fileEntry.bytes) {
    throw new Error("Backup JSONL byte count does not match the manifest.");
  }
  const inspection = await inspectJsonlFile(documentPath);
  const statsAfter = await fsPromises.stat(documentPath);
  if (
    statsAfter.size !== statsBefore.size ||
    statsAfter.mtimeMs !== statsBefore.mtimeMs ||
    inspection.bytes !== statsAfter.size
  ) {
    throw new Error("Backup JSONL changed while it was being verified.");
  }
  if (inspection.sha256.toLowerCase() !== fileEntry.sha256.toLowerCase()) {
    throw new Error("Backup JSONL checksum does not match the manifest.");
  }
  if (inspection.documentCount !== manifest.documentCount) {
    throw new Error("Backup JSONL record count does not match the manifest.");
  }
  if (!options.allowIncompleteMarker && (await exists(markerPath))) {
    throw new Error(
      `Backup became incomplete because ${INCOMPLETE_MARKER} appeared during verification.`
    );
  }

  return {
    valid: true,
    status: manifest.status,
    manifestPath,
    backupDirectory,
    documentPath,
    documentCount: inspection.documentCount,
    collectionCount: manifest.collectionCount,
    bytes: inspection.bytes,
    sha256: inspection.sha256,
    scope,
  };
}

module.exports = {
  BACKUP_DOCUMENT_FILE,
  BACKUP_FORMAT,
  BACKUP_FORMAT_VERSION,
  BACKUP_MANIFEST_FILE,
  INCOMPLETE_MARKER,
  countJsonlRecords,
  encodeFirestoreValue,
  inspectJsonlFile,
  readGitMetadata,
  sha256File,
  verifyBackupManifest,
};
