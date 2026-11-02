/* eslint-disable no-console */
"use strict";
// Dry-run plans contain exact index before images and source/index versions.
// Applying a saved plan changes ItemVisionIndex only, and checks every version
// again in a transaction. Inventory documents and photos are never changed.
const path = require("node:path");
const fs = require("node:fs");
const Module = require("node:module");
const { createHash } = require("node:crypto");
const { cert, getApps, initializeApp } = require("firebase-admin/app");
const { FieldPath, getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const babel = require("@babel/core");
const vision = require("../lib/items/visionPhotoIndex.cjs");
const digest = (value) => createHash("sha256").update(value).digest("hex");
const argument = (name) => process.argv.find((value) => value.startsWith(`--${name}=`))?.slice(name.length + 3);

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]] !== undefined) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    process.env[match[1]] = value;
  }
}
function loadBuilder() {
  const filename = path.resolve(__dirname, "../utils/itemVisionIndex.js");
  const loaded = new Module(filename, module);
  loaded.filename = filename; loaded.paths = Module._nodeModulePaths(path.dirname(filename));
  loaded._compile(babel.transformFileSync(filename, { configFile: false, babelrc: false,
    presets: [[require.resolve("@babel/preset-env"), { targets: { node: "current" } }]],
  }).code, filename);
  return loaded.exports.buildItemVisionIndexRecord;
}
function initializeAdmin() {
  if (!getApps().length) {
    const configuredPath = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH ||
      process.env.FIREBASE_SERVICE_ACCOUNT_PATH || process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const account = configuredPath && fs.existsSync(configuredPath) ? JSON.parse(fs.readFileSync(configuredPath, "utf8")) : null;
    initializeApp({ ...(account ? { credential: cert(account) } : {}),
      projectId: argument("project") || account?.project_id || process.env.FIREBASE_ADMIN_PROJECT_ID || "magmo-ac10c",
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "magmo-ac10c.appspot.com" });
  }
}
function verifiedJsonLines(directory, filename, manifest) {
  const bytes = fs.readFileSync(path.join(directory, filename));
  if (!manifest.files?.[filename]?.sha256 || digest(bytes) !== manifest.files[filename].sha256 || bytes.length !== manifest.files[filename].bytes) {
    throw new Error(`Backup checksum mismatch for ${filename}; cached hashes will not be used.`);
  }
  return bytes.toString("utf8").split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
}
function loadPhotoCache(directory, bucketName) {
  if (!directory) return new Map();
  const manifest = JSON.parse(fs.readFileSync(path.join(directory, "manifest.json"), "utf8"));
  if (manifest.status !== "complete" || manifest.bucket !== bucketName) throw new Error("Photo cache must be a complete, matching-bucket backup.");
  // Deliberately never open private/object-metadata.jsonl or its download tokens.
  const objects = verifiedJsonLines(directory, "objects.jsonl", manifest);
  const downloads = new Map(verifiedJsonLines(directory, "downloads.jsonl", manifest).map((entry) => [entry.key, entry]));
  const cache = new Map();
  for (const entry of objects) {
    const download = downloads.get(entry.key);
    if (entry.bucket !== bucketName || !entry.name.startsWith("Parts/") || !download ||
      String(entry.generation) !== String(download.generation) || Number(entry.size) !== Number(download.bytes) ||
      !entry.crc32c || entry.crc32c !== download.crc32c || !vision.normalizePhotoSha256(download.sha256).length) continue;
    cache.set(entry.name, { generation: String(entry.generation), size: Number(entry.size), crc32c: entry.crc32c, sha256: download.sha256 });
  }
  return cache;
}
async function documentIds(db, collection) {
  const result = []; let cursor = null;
  do {
    let query = db.collection(collection).select().orderBy(FieldPath.documentId()).limit(250);
    if (cursor) query = query.startAfter(cursor);
    const page = await query.get();
    result.push(...page.docs.map((entry) => entry.id));
    if (page.size < 250) break;
    cursor = page.docs.at(-1);
  } while (true);
  return result;
}
function durableLine(fd, value) { fs.writeSync(fd, `${JSON.stringify(value)}\n`); fs.fsyncSync(fd); }
function compactPlan(plan) {
  const { files, failures, ...photoIndex } = plan.photoIndex || {};
  return { itemId: plan.itemId, action: plan.action, versions: plan.versions,
    before: vision.serializeValue(plan.before), ...(plan.record ? { record: plan.record } : {}), photoIndex,
    ...(failures?.length ? { photoFailures: failures } : {}) };
}
function finishManifest(directory, manifest, filenames) {
  manifest.completedAt = new Date().toISOString();
  manifest.files = Object.fromEntries(filenames.map((name) => {
    const bytes = fs.readFileSync(path.join(directory, name));
    return [name, { bytes: bytes.length, sha256: digest(bytes) }];
  }));
  fs.writeFileSync(path.join(directory, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, { flag: "wx" });
}

async function createPlan({ db, bucket, projectId, directory, limit, itemId, cacheDirectory }) {
  const cachedFingerprints = loadPhotoCache(cacheDirectory, bucket.name);
  const buildRecord = loadBuilder();
  const ids = itemId ? [itemId] : [...new Set((await Promise.all([
    documentIds(db, "Test"), documentIds(db, vision.INDEX_COLLECTION),
  ])).flat())].sort().slice(0, limit);
  const planFd = fs.openSync(path.join(directory, "plan.jsonl"), "wx");
  const failureFd = fs.openSync(path.join(directory, "failures.jsonl"), "wx");
  const manifest = { format: "magmo-vision-index-plan", version: 2, projectId, bucket: bucket.name,
    startedAt: new Date().toISOString(), mode: "dry-run", remoteWrites: 0,
    summary: { considered: ids.length, set: 0, delete: 0, none: 0, incompletePhotos: 0, errors: 0 } };
  try {
    for (const id of ids) {
      try {
        const plan = await vision.prepareItemVisionIndex({ db, bucket, itemId: id, buildRecord,
          allowOrphanCleanup: true, cachedFingerprints });
        durableLine(planFd, compactPlan(plan));
        manifest.summary[plan.action]++;
        if (plan.photoIndex && !plan.photoIndex.complete) manifest.summary.incompletePhotos++;
      } catch (error) {
        manifest.summary.errors++;
        durableLine(failureFd, { itemId: id, code: error.code || "plan_failed", message: error.message });
      }
      const processed = manifest.summary.set + manifest.summary.delete + manifest.summary.none + manifest.summary.errors;
      if (processed % 50 === 0 || processed === ids.length) console.log(JSON.stringify({ processed, ...manifest.summary }));
    }
  } finally { fs.closeSync(planFd); fs.closeSync(failureFd); }
  manifest.status = manifest.summary.errors || manifest.summary.incompletePhotos ? "needs-review" : "complete";
  finishManifest(directory, manifest, ["plan.jsonl", "failures.jsonl"]);
  console.log(`Read-only plan saved in ${directory}. No Firestore or Storage writes were made.`);
  if (manifest.summary.errors) process.exitCode = 2;
}

async function applyPlan({ db, bucket, projectId, directory, planDirectory }) {
  const manifest = JSON.parse(fs.readFileSync(path.join(planDirectory, "manifest.json"), "utf8"));
  if (manifest.format !== "magmo-vision-index-plan" || manifest.version !== 2 || manifest.mode !== "dry-run" ||
    manifest.projectId !== projectId || manifest.bucket !== bucket.name) throw new Error("The plan does not match this project/bucket.");
  const plans = verifiedJsonLines(planDirectory, "plan.jsonl", manifest);
  const beforeFd = fs.openSync(path.join(directory, "before-images.jsonl"), "wx");
  const resultFd = fs.openSync(path.join(directory, "results.jsonl"), "wx");
  const receipt = { format: "magmo-vision-index-apply", version: 2, projectId, bucket: bucket.name,
    startedAt: new Date().toISOString(), sourcePlan: path.resolve(planDirectory), sourcePlanSha256: manifest.files["plan.jsonl"].sha256,
    summary: { updated: 0, deleted: 0, unchanged: 0, failed: 0, incompletePhotos: 0 } };
  try {
    for (const entry of plans) {
      if (!entry.itemId || /[\/\\\u0000-\u001f]/.test(entry.itemId) || !["set", "delete", "none"].includes(entry.action)) throw new Error("Invalid plan entry.");
      // Persist the exact prior index (including absence) and all preconditions
      // before attempting its write. Never overwrite another repair's index.
      durableLine(beforeFd, { itemId: entry.itemId, indexPath: `${vision.INDEX_COLLECTION}/${entry.itemId}`,
        exists: entry.versions.index !== "missing", data: entry.before, versions: entry.versions });
      const plan = { ...entry, refs: { source: db.collection("Test").doc(entry.itemId),
        reserved: db.collection("ArchivedItemIds").doc(entry.itemId), index: db.collection(vision.INDEX_COLLECTION).doc(entry.itemId) } };
      try {
        await vision.applyItemVisionIndexPlan({ db, plan });
        receipt.summary[entry.action === "set" ? "updated" : entry.action === "delete" ? "deleted" : "unchanged"]++;
        if (entry.action === "set" && entry.photoIndex?.complete === false) receipt.summary.incompletePhotos++;
        durableLine(resultFd, { itemId: entry.itemId, action: entry.action, ok: true });
      } catch (error) {
        receipt.summary.failed++;
        durableLine(resultFd, { itemId: entry.itemId, action: entry.action, ok: false, code: error.code || "apply_failed", message: error.message });
      }
    }
  } finally { fs.closeSync(beforeFd); fs.closeSync(resultFd); }
  receipt.status = receipt.summary.failed || receipt.summary.incompletePhotos ? "partial" : "complete";
  finishManifest(directory, receipt, ["before-images.jsonl", "results.jsonl"]);
  console.log(JSON.stringify(receipt.summary));
  console.log(`Index-only apply receipt and before images saved in ${directory}. Inventory and photos were not changed.`);
  if (receipt.summary.failed) process.exitCode = 2;
}

async function run() {
  if (process.argv.includes("--help")) {
    console.log("Dry run: node scripts/backfill-item-vision-index.js --out=NEW_DIRECTORY [--item=AIS123] [--limit=50] [--photo-cache=VERIFIED_BACKUP_PHOTOS_DIR]\nApply an inspected plan, after a full inventory backup: node scripts/backfill-item-vision-index.js --apply --plan=DRY_RUN_DIRECTORY --out=NEW_RECEIPT_DIRECTORY\nAll writes are limited to ItemVisionIndex; concurrent changes are skipped with a recorded error.");
    return;
  }
  const apply = process.argv.includes("--apply");
  if (apply && !argument("plan")) throw new Error("--apply requires --plan=DRY_RUN_DIRECTORY; first inspect a read-only plan.");
  const directory = path.resolve(argument("out") || path.join("outputs", "vision-index", new Date().toISOString().replace(/[:.]/g, "-")));
  // Creating only the parent is harmless; never reuse or overwrite a plan.
  fs.mkdirSync(path.dirname(directory), { recursive: true });
  fs.mkdirSync(directory, { recursive: false });
  loadEnvFile(path.join(__dirname, "../.env.local"));
  initializeAdmin();
  const db = getFirestore(); const bucket = getStorage().bucket();
  const projectId = getApps()[0].options.projectId;
  if (!projectId) throw new Error("A concrete Firebase project is required.");
  const options = { db, bucket, projectId, directory };
  if (apply) await applyPlan({ ...options, planDirectory: path.resolve(argument("plan")) });
  else await createPlan({ ...options, limit: Math.max(1, Number(argument("limit")) || Infinity),
    itemId: argument("item"), cacheDirectory: argument("photo-cache") });
}

module.exports = { run, loadPhotoCache, verifiedJsonLines, compactPlan, createPlan, applyPlan };
if (require.main === module) run().catch((error) => { console.error({ code: error.code, message: error.message }); process.exitCode = 1; });
