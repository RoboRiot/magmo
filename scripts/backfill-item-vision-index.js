/* eslint-disable no-console */
const path = require("path");
const fs = require("fs");
const Module = require("module");
const { cert, getApps, initializeApp } = require("firebase-admin/app");
const { FieldPath, getFirestore } = require("firebase-admin/firestore");
const babel = require("@babel/core");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  fs.readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .forEach((line) => {
      const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (!match || process.env[match[1]] !== undefined) return;
      let value = match[2].trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[match[1]] = value;
    });
}

function loadTranspiledModule(filePath) {
  const transformed = babel.transformFileSync(filePath, {
    presets: [require.resolve("@babel/preset-env")],
  });
  const loaded = new Module(filePath, module);
  loaded.filename = filePath;
  loaded.paths = Module._nodeModulePaths(path.dirname(filePath));
  loaded._compile(transformed.code, filePath);
  return loaded.exports;
}

loadEnvFile(path.join(__dirname, "..", ".env.local"));

const {
  ITEM_VISION_INDEX_COLLECTION,
  buildItemVisionIndexRecord,
} = loadTranspiledModule(
  path.join(__dirname, "..", "utils", "itemVisionIndex.js")
);

function initializeAdmin() {
  if (getApps().length) return;
  const configuredPath =
    process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH ||
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const serviceAccountPath = configuredPath
    ? path.resolve(configuredPath)
    : null;
  const serviceAccount =
    serviceAccountPath && fs.existsSync(serviceAccountPath)
      ? JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"))
      : null;

  initializeApp(
    serviceAccount
      ? {
          credential: cert(serviceAccount),
          projectId: serviceAccount.project_id,
          storageBucket:
            process.env.FIREBASE_STORAGE_BUCKET || "magmo-ac10c.appspot.com",
        }
      : undefined
  );
}

function getLimit() {
  const raw = process.argv.find((argument) => argument.startsWith("--limit="));
  if (!raw) return Infinity;
  const parsed = Number(raw.split("=")[1]);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : Infinity;
}

async function run() {
  const apply = process.argv.includes("--apply");
  const limit = getLimit();
  initializeAdmin();
  const db = getFirestore();
  let cursor = null;
  let processed = 0;
  let indexed = 0;

  while (processed < limit) {
    const pageLimit = Math.min(250, limit - processed);
    let query = db
      .collection("Test")
      .orderBy(FieldPath.documentId())
      .limit(pageLimit);
    if (cursor) query = query.startAfter(cursor);
    const snapshot = await query.get();
    if (snapshot.empty) break;

    const batch = db.batch();
    snapshot.docs.forEach((document) => {
      const record = buildItemVisionIndexRecord(
        document.data() || {},
        document.id
      );
      if (apply) {
        batch.set(
          db.collection(ITEM_VISION_INDEX_COLLECTION).doc(document.id),
          record
        );
      }
      indexed += 1;
    });
    if (apply) await batch.commit();

    processed += snapshot.size;
    cursor = snapshot.docs[snapshot.docs.length - 1];
    console.log(
      `${apply ? "Indexed" : "Would index"} ${indexed} of ${processed} processed items.`
    );
    if (snapshot.size < pageLimit) break;
  }

  console.log(
    apply
      ? `Smart Camera index complete: ${indexed} items written to ${ITEM_VISION_INDEX_COLLECTION}.`
      : `Dry run complete: ${indexed} items would be written. Re-run with --apply to create the index.`
  );
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
