const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const fsPromises = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const {
  BACKUP_DOCUMENT_FILE,
  INCOMPLETE_MARKER,
  encodeFirestoreValue,
  inspectJsonlFile,
  verifyBackupManifest,
} = require("../lib/firestoreBackupCodec.cjs");

const repositoryRoot = path.resolve(__dirname, "..");
const backupScript = path.join(
  repositoryRoot,
  "scripts",
  "backup-firestore-local.mjs"
);
const firebaseCredentialEnvironmentKeys = [
  "FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH",
  "FIREBASE_SERVICE_ACCOUNT_PATH",
  "GOOGLE_APPLICATION_CREDENTIALS",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_FUNCTIONS_CLIENT_EMAIL",
  "FIREBASE_ADMIN_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
  "FIREBASE_FUNCTIONS_PRIVATE_KEY",
  "FIREBASE_ADMIN_PRIVATE_KEY",
  "K_SERVICE",
  "FUNCTION_TARGET",
  "GAE_ENV",
  "GOOGLE_CLOUD_PROJECT",
];

function offlineEnvironment(missingCredentialPath) {
  const environment = { ...process.env };
  for (const name of firebaseCredentialEnvironmentKeys) delete environment[name];
  environment.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH = missingCredentialPath;
  return environment;
}

async function temporaryDirectory(t) {
  const directory = await fsPromises.mkdtemp(
    path.join(os.tmpdir(), "magmo-firestore-backup-test-")
  );
  t.after(() => fsPromises.rm(directory, { recursive: true, force: true }));
  return directory;
}

async function createFixture(t) {
  const directory = await temporaryDirectory(t);
  const documentPath = path.join(directory, BACKUP_DOCUMENT_FILE);
  await fsPromises.writeFile(
    documentPath,
    [
      JSON.stringify({ path: "Test/1", data: { name: "one" } }),
      JSON.stringify({ path: "Test/2", data: { name: "two" } }),
      "",
    ].join("\n")
  );
  const inspection = await inspectJsonlFile(documentPath);
  const manifest = {
    format: "magmo-firestore-jsonl-backup",
    formatVersion: 1,
    status: "complete",
    startedAt: "2026-08-26T00:00:00.000Z",
    completedAt: "2026-08-26T00:01:00.000Z",
    sourceProject: "fixture-project",
    scope: {
      firestoreIncluded: true,
      firestoreOnly: true,
      storageIncluded: false,
      storageModified: false,
      authIncluded: false,
    },
    git: {
      available: true,
      branch: "codex/item-location-overhaul",
      sha: "79e69b0000000000000000000000000000000000",
      dirty: false,
    },
    verification: {
      artifactClosedBeforeInspection: true,
      byteCountRechecked: true,
      checksumRecomputed: true,
      documentCountRecounted: true,
      artifactStableDuringInspection: true,
    },
    documentCount: 2,
    collectionCount: 1,
    collectionCounts: { Test: 2 },
    files: {
      [BACKUP_DOCUMENT_FILE]: {
        bytes: inspection.bytes,
        sha256: inspection.sha256,
      },
    },
  };
  const manifestPath = path.join(directory, "manifest.json");
  await fsPromises.writeFile(
    manifestPath,
    `${JSON.stringify(manifest, null, 2)}\n`
  );
  return { directory, documentPath, inspection, manifest, manifestPath };
}

test("encodes Firestore-specific values without losing their types", () => {
  const timestampDate = new Date("2026-08-26T12:34:56.000Z");
  const encoded = encodeFirestoreValue({
    date: timestampDate,
    bytes: Buffer.from([0, 1, 255]),
    reference: { path: "Machine/AIS23", firestore: {} },
    timestamp: {
      seconds: 123,
      nanoseconds: 456,
      toDate: () => timestampDate,
    },
    geopoint: {
      latitude: 33.6,
      longitude: -117.7,
      isEqual: () => false,
    },
    coordinateMap: { latitude: 1, longitude: 2, label: "ordinary map" },
    notANumber: Number.NaN,
    infinity: Number.POSITIVE_INFINITY,
    missing: undefined,
  });

  assert.deepEqual(encoded.date, {
    __firestoreType: "date",
    iso: timestampDate.toISOString(),
  });
  assert.deepEqual(encoded.bytes, {
    __firestoreType: "bytes",
    base64: "AAH/",
  });
  assert.deepEqual(encoded.reference, {
    __firestoreType: "reference",
    path: "Machine/AIS23",
  });
  assert.deepEqual(encoded.timestamp, {
    __firestoreType: "timestamp",
    seconds: 123,
    nanoseconds: 456,
    iso: timestampDate.toISOString(),
  });
  assert.deepEqual(encoded.geopoint, {
    __firestoreType: "geopoint",
    latitude: 33.6,
    longitude: -117.7,
  });
  assert.deepEqual(encoded.coordinateMap, {
    latitude: 1,
    longitude: 2,
    label: "ordinary map",
  });
  assert.deepEqual(encoded.notANumber, {
    __firestoreType: "number",
    value: "NaN",
  });
  assert.deepEqual(encoded.infinity, {
    __firestoreType: "number",
    value: "Infinity",
  });
  assert.deepEqual(encoded.missing, { __firestoreType: "undefined" });
});

test("verifies manifest, bytes, checksum, and record count by streaming", async (t) => {
  const fixture = await createFixture(t);
  const result = await verifyBackupManifest(fixture.directory);

  assert.equal(result.valid, true);
  assert.equal(result.status, "complete");
  assert.equal(result.documentCount, 2);
  assert.equal(result.collectionCount, 1);
  assert.equal(result.bytes, fixture.inspection.bytes);
  assert.equal(result.sha256, fixture.inspection.sha256);
  assert.equal(result.scope.storageIncluded, false);
  assert.equal(result.scope.storageModified, false);
  assert.equal(result.scope.authIncluded, false);
});

test("rejects a backup while the INCOMPLETE marker exists", async (t) => {
  const fixture = await createFixture(t);
  await fsPromises.writeFile(
    path.join(fixture.directory, INCOMPLETE_MARKER),
    "incomplete\n"
  );

  await assert.rejects(
    verifyBackupManifest(fixture.manifestPath),
    /INCOMPLETE is still present/
  );
});

test("rejects same-size JSONL corruption by checksum", async (t) => {
  const fixture = await createFixture(t);
  const original = await fsPromises.readFile(fixture.documentPath, "utf8");
  const corrupted = original.replace('"one"', '"eno"');
  assert.equal(Buffer.byteLength(corrupted), Buffer.byteLength(original));
  await fsPromises.writeFile(fixture.documentPath, corrupted);

  await assert.rejects(
    verifyBackupManifest(fixture.directory),
    /checksum does not match/
  );
});

test("rejects a manifest record count that disagrees with JSONL", async (t) => {
  const fixture = await createFixture(t);
  fixture.manifest.documentCount = 3;
  fixture.manifest.collectionCounts.Test = 3;
  await fsPromises.writeFile(
    fixture.manifestPath,
    `${JSON.stringify(fixture.manifest, null, 2)}\n`
  );

  await assert.rejects(
    verifyBackupManifest(fixture.directory),
    /record count does not match/
  );
});

test("rejects incomplete status and non-Firestore-only scope", async (t) => {
  const incompleteFixture = await createFixture(t);
  incompleteFixture.manifest.status = "writing";
  await fsPromises.writeFile(
    incompleteFixture.manifestPath,
    `${JSON.stringify(incompleteFixture.manifest, null, 2)}\n`
  );
  await assert.rejects(
    verifyBackupManifest(incompleteFixture.directory),
    /status is not complete/
  );

  const scopeFixture = await createFixture(t);
  scopeFixture.manifest.scope.storageIncluded = true;
  await fsPromises.writeFile(
    scopeFixture.manifestPath,
    `${JSON.stringify(scopeFixture.manifest, null, 2)}\n`
  );
  await assert.rejects(
    verifyBackupManifest(scopeFixture.directory),
    /Firestore-only scope is missing or invalid/
  );
});

test("verify-only CLI succeeds without initializing Firebase", async (t) => {
  const fixture = await createFixture(t);
  const result = spawnSync(
    process.execPath,
    [backupScript, "--verify", fixture.manifestPath],
    {
      cwd: repositoryRoot,
      encoding: "utf8",
      env: offlineEnvironment(
        path.join(fixture.directory, "intentionally-missing-credentials.json")
      ),
      windowsHide: true,
    }
  );

  assert.equal(result.status, 0, result.stderr);
  const output = JSON.parse(result.stdout);
  assert.equal(output.valid, true);
  assert.equal(output.documentCount, 2);
  assert.equal(fs.existsSync(path.join(fixture.directory, INCOMPLETE_MARKER)), false);
});

test("CLI rejects an unflagged path instead of accidentally starting a backup", async (t) => {
  const fixture = await createFixture(t);
  const result = spawnSync(process.execPath, [backupScript, fixture.manifestPath], {
    cwd: repositoryRoot,
    encoding: "utf8",
    env: offlineEnvironment(
      path.join(fixture.directory, "intentionally-missing-credentials.json")
    ),
    windowsHide: true,
  });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unexpected positional argument/);
});

test("failed offline backup leaves its first-file INCOMPLETE marker", async (t) => {
  const directory = await temporaryDirectory(t);
  const outputDirectory = path.join(directory, "failed-backup");
  const result = spawnSync(
    process.execPath,
    [backupScript, `--output=${outputDirectory}`],
    {
      cwd: repositoryRoot,
      encoding: "utf8",
      env: offlineEnvironment(
        path.join(directory, "intentionally-missing-credentials.json")
      ),
      windowsHide: true,
    }
  );

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Backup is incomplete/);
  assert.equal(
    fs.existsSync(path.join(outputDirectory, INCOMPLETE_MARKER)),
    true
  );
  assert.equal(fs.existsSync(path.join(outputDirectory, "manifest.json")), false);
  assert.deepEqual(await fsPromises.readdir(outputDirectory), [INCOMPLETE_MARKER]);
});
