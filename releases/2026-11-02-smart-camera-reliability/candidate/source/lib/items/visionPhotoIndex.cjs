"use strict";

const { createHash } = require("node:crypto");
const { isLegacyStorageAllowed } = require("../../utils/askMagmoPrivateBoundary.cjs");
const { getItemPhotoStoragePrefixes } = require("./itemEditorOperations.cjs");

const INDEX_COLLECTION = "ItemVisionIndex";
const DEFAULT_LIMITS = { maxFiles: 60, maxListed: 300, maxPrefixes: 20,
  maxFileBytes: 25 * 1024 * 1024, maxTotalBytes: 120 * 1024 * 1024, concurrency: 3,
  timeoutMs: 60000, readTimeoutMs: 20000 };
const hashes = (value) => [...new Set((Array.isArray(value) ? value : [value])
  .filter((v) => typeof v === "string").map((v) => v.trim().toLowerCase())
  .filter((v) => /^[a-f0-9]{64}$/.test(v)))];

class VisionPhotoIndexError extends Error {
  constructor(code, message, status = 409, retryable = true) {
    super(message); this.name = "VisionPhotoIndexError";
    this.code = code; this.status = status; this.retryable = retryable;
  }
}

function normalizePhotoStoragePrefixes(item = {}, itemId = "") {
  return getItemPhotoStoragePrefixes(itemId, [item.photoStoragePrefix,
    ...(Array.isArray(item.photoStoragePrefixes) ? item.photoStoragePrefixes : [])])
    .filter((prefix) => !/[\u007f]/.test(prefix) && isLegacyStorageAllowed(prefix));
}
function activeSource(snapshot, reserved) {
  const value = snapshot?.exists ? snapshot.data() || {} : null;
  return Boolean(value && !reserved?.exists && value.isArchived !== true && value.archived !== true &&
    value.deleted !== true && value.isDeleted !== true);
}
function serializeValue(value) {
  if (value === undefined) return { __type: "undefined" };
  if (value === null || typeof value !== "object") return value;
  if (value.path && value.firestore) return { __type: "reference", path: value.path };
  if (value instanceof Date) return { __type: "date", value: value.toISOString() };
  if (Buffer.isBuffer(value)) return { __type: "bytes", value: value.toString("base64") };
  if (typeof value.toDate === "function" && value.seconds !== undefined) {
    return { __type: "timestamp", seconds: value.seconds, nanoseconds: value.nanoseconds || 0 };
  }
  if (Array.isArray(value)) return value.map(serializeValue);
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, serializeValue(value[key])]));
}
function snapshotVersion(snapshot) {
  if (!snapshot?.exists) return "missing";
  if (snapshot.updateTime?.seconds !== undefined) return `${snapshot.updateTime.seconds}:${snapshot.updateTime.nanoseconds || 0}`;
  return createHash("sha256").update(JSON.stringify(serializeValue(snapshot.data()))).digest("hex");
}
function originalImage(name, prefixes) {
  const prefix = prefixes.find((value) => name.startsWith(value));
  if (!prefix || !isLegacyStorageAllowed(name)) return false;
  const leaf = name.slice(prefix.length);
  return leaf && !/[\\/\u0000-\u001f\u007f]/.test(leaf) &&
    /\.(?:jpe?g|png|webp|gif|avif|heic|heif|bmp|tiff?)$/i.test(leaf) &&
    !/(?:^|[_.-])(?:thumb(?:nail)?|preview)(?:[_.-]|$)|_\d{2,4}x\d{2,4}\./i.test(leaf);
}
async function boundedMap(values, concurrency, visit) {
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, values.length) }, async () => {
    while (cursor < values.length) { const index = cursor++; await visit(values[index], index); }
  }));
}
function validFingerprint(entry, prefixes) {
  return entry && originalImage(String(entry.path || ""), prefixes) &&
    hashes(entry.sha256).length === 1 && /^\d{1,30}$/.test(String(entry.generation || "")) &&
    Number.isSafeInteger(Number(entry.size)) && Number(entry.size) >= 0;
}
function sameObject(metadata, fingerprint, requireChecksum = false) {
  return String(metadata.generation || "") === String(fingerprint.generation) &&
    Number(metadata.size) === Number(fingerprint.size) &&
    (!requireChecksum || Boolean(metadata.crc32c && fingerprint.crc32c && metadata.crc32c === fingerprint.crc32c));
}
function within(promise, timeoutMs) {
  let timer;
  return Promise.race([promise, new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error("Photo index read timed out")), Math.max(1, timeoutMs));
  })]).finally(() => clearTimeout(timer));
}
function readOriginal(file, maxBytes, timeoutMs) {
  if (typeof file.createReadStream !== "function") return within(file.download({ validation: "crc32c" }).then(([buffer]) => buffer), timeoutMs);
  return new Promise((resolve, reject) => {
    const stream = file.createReadStream({ validation: "crc32c" });
    const chunks = []; let bytes = 0;
    const timer = setTimeout(() => stream.destroy(new Error("Photo read timed out")), timeoutMs);
    stream.on("data", (chunk) => {
      bytes += chunk.length;
      if (bytes > maxBytes) stream.destroy(new Error("Photo exceeded its advertised size"));
      else chunks.push(chunk);
    });
    stream.once("error", (error) => { clearTimeout(timer); reject(error); });
    stream.once("end", () => { clearTimeout(timer); resolve(Buffer.concat(chunks)); });
  });
}

// Read-only. All downloads are of pinned object generations and bounded by
// advertised size; a failed/partial refresh never claims full photo coverage.
async function collectItemPhotoFingerprints({ bucket, item, itemId, previous = [], cached = new Map(), limits = {} }) {
  const cap = { ...DEFAULT_LIMITS, ...limits };
  const deadline = Date.now() + cap.timeoutMs;
  const remainingTime = () => Math.max(1, Math.min(cap.readTimeoutMs, deadline - Date.now()));
  const prefixes = normalizePhotoStoragePrefixes(item, itemId);
  const result = { complete: true, photoCount: 0, hashedCount: 0, failedCount: 0,
    truncated: false, files: [], failures: [] };
  const fail = (code, path = "") => { result.complete = false; result.failedCount++; result.failures.push({ code, path }); };
  if (!bucket) { fail("storage_unavailable"); return result; }
  if (prefixes.length > cap.maxPrefixes) { result.truncated = true; result.complete = false; }
  const listed = new Map();
  let listedCount = 0;
  for (const prefix of prefixes.slice(0, cap.maxPrefixes)) {
    let pageToken;
    do {
      try {
        const remaining = cap.maxListed - listedCount;
        if (remaining <= 0) { result.truncated = true; result.complete = false; break; }
        if (Date.now() >= deadline) { fail("photo_timeout", prefix); break; }
        const [files, next] = await within(bucket.getFiles({ prefix, autoPaginate: false,
          maxResults: Math.min(100, remaining), ...(pageToken ? { pageToken } : {}) }), remainingTime());
        listedCount += files.length;
        for (const file of files) if (originalImage(file.name, prefixes)) listed.set(file.name, file);
        pageToken = next?.pageToken;
      } catch { fail("photo_list_failed", prefix); break; }
    } while (pageToken);
  }
  result.photoCount = listed.size;
  if (listed.size > cap.maxFiles) { result.truncated = true; result.complete = false; }
  const old = new Map((Array.isArray(previous) ? previous : []).filter((entry) => validFingerprint(entry, prefixes)).map((entry) => [entry.path, entry]));
  let bytes = 0;
  await boundedMap([...listed.values()].sort((a, b) => a.name.localeCompare(b.name)).slice(0, cap.maxFiles), cap.concurrency, async (file) => {
    try {
      if (Date.now() >= deadline) { fail("photo_timeout", file.name); return; }
      const metadata = file.metadata?.generation ? file.metadata : (await within(file.getMetadata(), remainingTime()))[0];
      const size = Number(metadata.size);
      if (!Number.isSafeInteger(size) || size < 0 || size > cap.maxFileBytes || !/^\d{1,30}$/.test(String(metadata.generation || ""))) {
        fail("photo_size_or_version_unavailable", file.name); return;
      }
      const oldEntry = old.get(file.name);
      const cachedEntry = cached.get(file.name);
      let digest;
      if (oldEntry && sameObject(metadata, oldEntry)) digest = oldEntry.sha256;
      else if (cachedEntry && hashes(cachedEntry.sha256).length && sameObject(metadata, cachedEntry, true)) digest = cachedEntry.sha256;
      else {
        if (bytes + size > cap.maxTotalBytes) { result.truncated = true; fail("photo_byte_limit", file.name); return; }
        bytes += size;
        const buffer = await readOriginal(bucket.file(file.name, { generation: String(metadata.generation) }), size, remainingTime());
        if (buffer.length !== size) { fail("photo_size_changed", file.name); return; }
        digest = createHash("sha256").update(buffer).digest("hex");
      }
      // Verify that the pinned version is still the current photo.
      const [current] = await within(bucket.file(file.name).getMetadata(), remainingTime());
      if (!sameObject(current, { generation: metadata.generation, size })) { fail("photo_changed", file.name); return; }
      result.files.push({ path: file.name, generation: String(metadata.generation), size,
        crc32c: String(metadata.crc32c || ""), sha256: digest.toLowerCase() });
    } catch { fail("photo_read_failed", file.name); }
  });
  result.files.sort((a, b) => a.path.localeCompare(b.path));
  result.hashedCount = result.files.length;
  return result;
}

// Exact-match retrieval verifies indexed fingerprints against the current
// object's generation. Deleted or replaced photos cannot produce stale matches.
async function verifyPhotoFingerprintMatch({ bucket, item, itemId, indexRecord, requestedHashes }) {
  const wanted = new Set(hashes(requestedHashes));
  const prefixes = normalizePhotoStoragePrefixes(item, itemId);
  const candidates = (Array.isArray(indexRecord?.photoFingerprintFiles) ? indexRecord.photoFingerprintFiles : []).filter((entry) =>
    validFingerprint(entry, prefixes) && wanted.has(entry.sha256.toLowerCase())).slice(0, DEFAULT_LIMITS.maxFiles);
  const matched = new Set(); const verifiedFiles = []; let complete = true;
  const deadline = Date.now() + DEFAULT_LIMITS.readTimeoutMs;
  if (!bucket) return { matchedHashes: [], complete: false, verifiedFiles: [] };
  await boundedMap(candidates, DEFAULT_LIMITS.concurrency, async (entry) => {
    try {
      if (Date.now() >= deadline) { complete = false; return; }
      const [metadata] = await within(bucket.file(entry.path).getMetadata(), deadline - Date.now());
      if (sameObject(metadata, entry)) { matched.add(entry.sha256.toLowerCase()); verifiedFiles.push(entry); }
    } catch (error) { if (Number(error?.code) !== 404) complete = false; }
  });
  return { matchedHashes: [...matched], complete, verifiedFiles };
}

async function prepareItemVisionIndex({ db, bucket, itemId, buildRecord, refreshPhotos = true,
  allowOrphanCleanup = false, cachedFingerprints, photoLimits }) {
  if (!itemId || /[\/\\\u0000-\u001f]/.test(itemId) || itemId.length > 200) {
    throw new VisionPhotoIndexError("invalid_item_id", "A valid inventory item ID is required.", 400, false);
  }
  const refs = { source: db.collection("Test").doc(itemId), reserved: db.collection("ArchivedItemIds").doc(itemId),
    index: db.collection(INDEX_COLLECTION).doc(itemId) };
  const values = await Promise.all(Object.values(refs).map((ref) => ref.get()));
  const snapshots = Object.fromEntries(Object.keys(refs).map((key, index) => [key, values[index]]));
  const versions = Object.fromEntries(Object.entries(snapshots).map(([key, snapshot]) => [key, snapshotVersion(snapshot)]));
  const base = { itemId, refs, versions, before: snapshots.index.exists ? snapshots.index.data() : null };
  if (!activeSource(snapshots.source, snapshots.reserved)) {
    if (allowOrphanCleanup) return { ...base, action: snapshots.index.exists ? "delete" : "none" };
    throw new VisionPhotoIndexError("item_not_found", "The saved item is missing or archived.", 404, false);
  }
  const item = snapshots.source.data();
  const previous = base.before || {};
  const record = buildRecord(item, itemId);
  const photoIndex = refreshPhotos ? await collectItemPhotoFingerprints({ bucket, item, itemId,
    previous: previous.photoFingerprintFiles || [], cached: cachedFingerprints, limits: photoLimits }) : null;
  const previousFiles = (Array.isArray(previous.photoFingerprintFiles) ? previous.photoFingerprintFiles : []).filter((entry) => validFingerprint(entry, record.photoStoragePrefixes));
  const files = photoIndex?.complete ? photoIndex.files :
    [...new Map([...previousFiles, ...(photoIndex?.files || [])].map((entry) => [entry.path, entry])).values()];
  record.photoFingerprintFiles = files;
  record.photoSha256 = photoIndex?.complete ? hashes(files.map((file) => file.sha256)) :
    hashes([...hashes(previous.photoSha256), ...files.map((file) => file.sha256)]);
  record.photoIndexComplete = photoIndex ? photoIndex.complete : previous.photoIndexComplete === true;
  record.photoIndexUpdatedAt = photoIndex?.complete ? record.updatedAt : previous.photoIndexUpdatedAt || null;
  record.sourceVersion = versions.source;
  return { ...base, action: "set", record, photoIndex };
}

async function applyItemVisionIndexPlan({ db, plan }) {
  if (plan.action === "none") return { updated: false };
  return db.runTransaction(async (transaction) => {
    const current = {};
    for (const [key, ref] of Object.entries(plan.refs)) current[key] = await transaction.get(ref);
    for (const key of Object.keys(plan.refs)) {
      if (snapshotVersion(current[key]) !== plan.versions[key]) {
        throw new VisionPhotoIndexError("index_source_changed", "The item or its index changed while photos were indexed. Retry the index update.");
      }
    }
    if (plan.action === "set") {
      if (!activeSource(current.source, current.reserved)) throw new VisionPhotoIndexError("item_not_found", "The item is missing or archived.", 404, false);
      transaction.set(plan.refs.index, plan.record);
    } else {
      if (activeSource(current.source, current.reserved)) throw new VisionPhotoIndexError("item_restored", "The item became active. Retry the audit.");
      transaction.delete(plan.refs.index);
    }
    return { updated: true };
  });
}

async function refreshItemVisionIndex(options) {
  const plan = await prepareItemVisionIndex(options);
  await applyItemVisionIndexPlan({ db: options.db, plan });
  return { itemId: options.itemId, indexVersion: plan.record.version, photoIndex: plan.photoIndex };
}

module.exports = { INDEX_COLLECTION, DEFAULT_LIMITS, VisionPhotoIndexError, normalizePhotoSha256: hashes,
  normalizePhotoStoragePrefixes, serializeValue, snapshotVersion, originalImage, collectItemPhotoFingerprints,
  verifyPhotoFingerprintMatch, prepareItemVisionIndex, applyItemVisionIndexPlan, refreshItemVisionIndex };
