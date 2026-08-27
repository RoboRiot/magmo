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

loadEnvFile(path.join(__dirname, "..", ".env.local"));

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

const {
  buildGeneralSearchTokens,
  buildNameTokens,
  buildWorkOrderTokens,
} = loadTranspiledModule(
  path.join(__dirname, "..", "utils", "itemFormShared.js")
);

if (!getApps().length) {
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
        }
      : undefined
  );
}

const db = getFirestore();

function tokensEqual(left, right) {
  if (!Array.isArray(left) || left.length !== right.length) return false;
  const leftSet = new Set(left.map(String));
  if (leftSet.size !== right.length) return false;
  return right.every((token) => leftSet.has(String(token)));
}

async function run() {
  const dryRun = process.argv.includes("--dry-run");
  let cursor = null;
  let processed = 0;
  let updated = 0;

  while (true) {
    let query = db.collection("Test").orderBy(FieldPath.documentId()).limit(250);
    if (cursor) query = query.startAfter(cursor);

    const snapshot = await query.get();
    if (snapshot.empty) break;

    let batch = db.batch();
    let batchWrites = 0;

    for (const document of snapshot.docs) {
      const item = document.data() || {};
      const nameLower = String(item.name || "").toLowerCase();
      const nameTokens = buildNameTokens(item.name);
      const workOrderTokens = buildWorkOrderTokens(item.workOrders || []);
      const generalSearchTokens = buildGeneralSearchTokens(item, document.id);
      const needsUpdate =
        item.nameLower !== nameLower ||
        !tokensEqual(item.nameTokens, nameTokens) ||
        !tokensEqual(item.workOrderTokens, workOrderTokens) ||
        !tokensEqual(item.generalSearchTokens, generalSearchTokens);

      if (needsUpdate) {
        if (!dryRun) {
          batch.update(document.ref, {
            nameLower,
            nameTokens,
            workOrderTokens,
            generalSearchTokens,
          });
          batchWrites += 1;
        }
        updated += 1;
      }

      if (batchWrites >= 400) {
        await batch.commit();
        batch = db.batch();
        batchWrites = 0;
      }
    }

    if (!dryRun && batchWrites > 0) await batch.commit();
    cursor = snapshot.docs[snapshot.docs.length - 1];
    processed += snapshot.size;
    console.log(`Processed ${processed} parts; updated ${updated}.`);
  }

  console.log(
    `${dryRun ? "Search backfill dry run" : "Search backfill complete"}. ` +
      `${dryRun ? "Would update" : "Updated"} ${updated} parts.`
  );
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
