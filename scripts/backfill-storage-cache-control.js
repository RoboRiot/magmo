/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { cert, getApps, initializeApp } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");

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

function initializeAdmin() {
  if (getApps().length) return;
  const configuredPath =
    process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH ||
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const serviceAccountPath = configuredPath ? path.resolve(configuredPath) : "";
  const serviceAccount =
    serviceAccountPath && fs.existsSync(serviceAccountPath)
      ? JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"))
      : null;
  const projectId = serviceAccount?.project_id || "magmo-ac10c";
  const storageBucket =
    process.env.FIREBASE_STORAGE_BUCKET ||
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    `${projectId}.appspot.com`;
  initializeApp({
    ...(serviceAccount ? { credential: cert(serviceAccount) } : {}),
    projectId,
    storageBucket,
  });
}

function cacheable(metadata = {}) {
  const type = String(metadata.contentType || "").toLowerCase();
  return (
    type.startsWith("image/") ||
    type.startsWith("video/") ||
    type === "application/pdf"
  );
}

async function run() {
  const apply = process.argv.includes("--apply");
  const limitArgument = process.argv.find((value) => value.startsWith("--limit="));
  const limit = Math.max(1, Number(limitArgument?.slice(8)) || Number.MAX_SAFE_INTEGER);
  initializeAdmin();
  const bucket = getStorage().bucket();
  let pageToken;
  let inspected = 0;
  let eligible = 0;
  let updated = 0;

  do {
    const [files, , response] = await bucket.getFiles({
      autoPaginate: false,
      maxResults: Math.min(500, limit - inspected),
      pageToken,
    });
    for (const file of files) {
      if (inspected >= limit) break;
      inspected += 1;
      const [metadata] = await file.getMetadata();
      if (!cacheable(metadata)) continue;
      eligible += 1;
      if (metadata.cacheControl === "public,max-age=31536000,immutable") continue;
      console.log(`${apply ? "UPDATE" : "WOULD_UPDATE"} ${file.name}`);
      if (apply) {
        await file.setMetadata({
          cacheControl: "public,max-age=31536000,immutable",
        });
        updated += 1;
      }
    }
    pageToken = inspected < limit ? response?.nextPageToken : undefined;
  } while (pageToken && inspected < limit);

  console.log(
    JSON.stringify({ apply, inspected, eligible, updated }, null, 2)
  );
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
