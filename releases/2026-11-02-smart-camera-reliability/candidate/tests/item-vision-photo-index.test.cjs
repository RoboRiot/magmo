"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { createHash } = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const babel = require("@babel/core");
const service = require("../lib/items/visionPhotoIndex.cjs");
const filename = path.resolve(__dirname, "../utils/itemVisionIndex.js");
const loaded = new Module(filename, module);
loaded.filename = filename; loaded.paths = Module._nodeModulePaths(path.dirname(filename));
loaded._compile(babel.transformSync(fs.readFileSync(filename, "utf8"), {
  filename, configFile: false, babelrc: false, presets: [[require.resolve("@babel/preset-env"), { targets: { node: "current" } }]],
}).code, filename);
const { buildItemVisionIndexRecord, normalizePhotoStoragePrefixes } = loaded.exports;
const sha = (value) => createHash("sha256").update(value).digest("hex");

function database(initial = {}) {
  let sequence = 1;
  const docs = new Map(Object.entries(initial).map(([key, data]) => [key, { data, version: sequence++ }]));
  const writes = [];
  const ref = (key) => ({ path: key, id: key.split("/").at(-1), get: async () => snapshot(key) });
  const snapshot = (key) => {
    const value = docs.get(key);
    return { exists: Boolean(value), id: key.split("/").at(-1), ref: ref(key),
      updateTime: value ? { seconds: value.version, nanoseconds: 0 } : null,
      data: () => value?.data };
  };
  const db = { collection: (collection) => ({ doc: (id) => ref(`${collection}/${id}`) }),
    runTransaction: async (visit) => {
      const pending = [];
      const answer = await visit({ get: async (r) => snapshot(r.path),
        set: (r, data) => pending.push({ key: r.path, data }), delete: (r) => pending.push({ key: r.path }) });
      for (const action of pending) {
        writes.push(action);
        if (action.data) docs.set(action.key, { data: action.data, version: sequence++ });
        else docs.delete(action.key);
      }
      return answer;
    },
    change: (key, data) => docs.set(key, { data, version: sequence++ }),
    remove: (key) => docs.delete(key), docs, writes };
  return db;
}
function storage(entries = {}) {
  const objects = new Map(Object.entries(entries).map(([key, value]) => [key,
    typeof value === "string" ? { bytes: Buffer.from(value), generation: "1", crc32c: "checksum" } : value]));
  const reads = [], lists = [];
  const metadata = (value) => ({ generation: value.generation || "1", size: String(value.bytes.length), crc32c: value.crc32c || "checksum" });
  const file = (name, options = {}) => ({ name,
    getMetadata: async () => {
      const value = objects.get(name);
      if (!value) throw Object.assign(new Error("Missing"), { code: 404 });
      if (value.metadataError) throw new Error("Storage unavailable");
      return [metadata(value)];
    },
    download: async () => {
      reads.push(name);
      const value = objects.get(name);
      if (!value || value.error) throw new Error("Download failed");
      assert.equal(options.generation, value.generation || "1", "download is generation pinned");
      return [value.bytes];
    },
  });
  return { objects, reads, lists, file,
    getFiles: async ({ prefix, maxResults, pageToken }) => {
      lists.push(prefix);
      const all = [...objects.keys()].filter((key) => key.startsWith(prefix)).sort();
      const start = Number(pageToken || 0); const end = start + maxResults;
      return [all.slice(start, end).map((name) => ({ ...file(name), metadata: metadata(objects.get(name)) })),
        end < all.length ? { pageToken: String(end) } : null];
    },
  };
}
const args = (db, bucket, extra = {}) => ({ db, bucket, itemId: "AIS1", buildRecord: buildItemVisionIndexRecord, ...extra });

test("v2 metadata validates retained/approved prefixes and never trusts item-supplied hashes", () => {
  const item = { name: "Scanner", photoStoragePrefixes: ["Parts/OLD/", "Parts/ItemRequest_approved/", "Parts/../", "Parts/", "https://outside/", "Parts/OTHER/nested/", "Parts/OLD/"], photoSha256: [sha("forged")] };
  const record = buildItemVisionIndexRecord(item, "AIS1");
  assert.equal(record.version, 2);
  assert.deepEqual(record.photoSha256, []);
  assert.deepEqual(record.photoStoragePrefixes, ["Parts/AIS1/", "Parts/OLD/", "Parts/ItemRequest_approved/"]);
  assert.deepEqual(service.normalizePhotoStoragePrefixes(item, "AIS1"), normalizePhotoStoragePrefixes(item, "AIS1"));
});

test("original image hashing uses raw bytes across retained folders and skips thumbnails", async () => {
  const bytes = Buffer.from([255, 216, 0, 234, 15, 41, 255, 217]);
  const bucket = storage({ "Parts/AIS1/item__1.jpg": { bytes, generation: "17" },
    "Parts/OLD/label__2.png": "label", "Parts/AIS1/thumb_1.jpg": "thumbnail",
    "Parts/AIS1/item_200x200.jpg": "resized", "Parts/AIS1/nested/photo.jpg": "nested", "Parts/AIS1/doc.pdf": "pdf" });
  const result = await service.collectItemPhotoFingerprints({ bucket, item: { photoStoragePrefixes: ["Parts/OLD/"] }, itemId: "AIS1" });
  assert.equal(result.complete, true);
  assert.equal(result.hashedCount, 2);
  assert.ok(result.files.some((entry) => entry.sha256 === sha(bytes) && entry.generation === "17"));
  assert.equal(bucket.reads.length, 2);
});

test("verified generation cache avoids rereading original photo bytes", async () => {
  const bucket = storage({ "Parts/AIS1/item.jpg": "photo" });
  const cached = new Map([["Parts/AIS1/item.jpg", { generation: "1", size: 5, crc32c: "checksum", sha256: sha("photo") }]]);
  const result = await service.collectItemPhotoFingerprints({ bucket, item: {}, itemId: "AIS1", cached });
  assert.equal(result.files[0].sha256, sha("photo"));
  assert.equal(bucket.reads.length, 0);
  cached.get("Parts/AIS1/item.jpg").crc32c = "different";
  await service.collectItemPhotoFingerprints({ bucket, item: {}, itemId: "AIS1", cached });
  assert.equal(bucket.reads.length, 1, "checksum mismatch requires fresh bytes");
});

test("metadata-only refresh preserves fingerprints without Storage requests", async () => {
  const old = { photoSha256: [sha("photo")], photoFingerprintFiles: [{ path: "Parts/AIS1/item.jpg", generation: "1", size: 5, sha256: sha("photo") }], photoIndexComplete: true };
  const db = database({ "Test/AIS1": { name: "Updated name" }, "ItemVisionIndex/AIS1": old });
  const bucket = storage();
  await service.refreshItemVisionIndex(args(db, bucket, { refreshPhotos: false }));
  const next = db.docs.get("ItemVisionIndex/AIS1").data;
  assert.equal(next.name, "Updated name");
  assert.deepEqual(next.photoSha256, old.photoSha256);
  assert.equal(next.photoIndexComplete, true);
  assert.equal(bucket.lists.length, 0);
});

test("photo failure writes fresh metadata but preserves old fingerprints and reports incomplete", async () => {
  const old = { photoSha256: [sha("old")] };
  const db = database({ "Test/AIS1": { name: "Fresh" }, "ItemVisionIndex/AIS1": old });
  const bucket = storage({ "Parts/AIS1/item.jpg": { bytes: Buffer.from("new"), error: true } });
  const result = await service.refreshItemVisionIndex(args(db, bucket));
  assert.equal(result.photoIndex.complete, false);
  assert.equal(result.photoIndex.failedCount, 1);
  const next = db.docs.get("ItemVisionIndex/AIS1").data;
  assert.equal(next.name, "Fresh");
  assert.deepEqual(next.photoSha256, [sha("old")]);
  assert.equal(next.photoIndexComplete, false);
});

test("a completed empty refresh clears deleted photo fingerprints", async () => {
  const db = database({ "Test/AIS1": { name: "Fresh" }, "ItemVisionIndex/AIS1": { photoSha256: [sha("old")] } });
  await service.refreshItemVisionIndex(args(db, storage()));
  assert.deepEqual(db.docs.get("ItemVisionIndex/AIS1").data.photoSha256, []);
});

test("photo bounds report partial coverage and do not erase previous hashes", async () => {
  const db = database({ "Test/AIS1": {}, "ItemVisionIndex/AIS1": { photoSha256: [sha("old")] } });
  const result = await service.refreshItemVisionIndex(args(db, storage({ "Parts/AIS1/a.jpg": "a", "Parts/AIS1/b.jpg": "b" }), { photoLimits: { maxFiles: 1 } }));
  assert.equal(result.photoIndex.truncated, true);
  assert.equal(result.photoIndex.complete, false);
  assert.ok(db.docs.get("ItemVisionIndex/AIS1").data.photoSha256.includes(sha("old")));
});

for (const [label, initial] of [
  ["missing", {}], ["archived", { "Test/AIS1": {}, "ArchivedItemIds/AIS1": { state: "archived" } }],
  ["deleted flag", { "Test/AIS1": { deleted: true } }],
]) test(`${label} inventory is never indexed`, async () => {
  const db = database(initial); const bucket = storage();
  await assert.rejects(service.refreshItemVisionIndex(args(db, bucket)), (error) => error.status === 404 && error.retryable === false);
  assert.equal(db.writes.length, 0); assert.equal(bucket.lists.length, 0);
});

for (const key of ["Test/AIS1", "ArchivedItemIds/AIS1", "ItemVisionIndex/AIS1"]) {
  test(`concurrent ${key} changes prevent stale index writes`, async () => {
    const db = database({ "Test/AIS1": { name: "Original" } });
    const plan = await service.prepareItemVisionIndex(args(db, storage()));
    db.change(key, { name: "Concurrent", state: "archived" });
    await assert.rejects(service.applyItemVisionIndexPlan({ db, plan }), (error) => error.code === "index_source_changed");
    assert.equal(db.writes.length, 0);
  });
}

test("orphan cleanup only deletes index and refuses a concurrently restored source", async () => {
  const db = database({ "ItemVisionIndex/AIS1": { name: "Orphan" } });
  const plan = await service.prepareItemVisionIndex(args(db, storage(), { allowOrphanCleanup: true }));
  assert.equal(plan.action, "delete");
  db.change("Test/AIS1", { name: "Restored" });
  await assert.rejects(service.applyItemVisionIndexPlan({ db, plan }), /changed/);
  assert.equal(db.writes.length, 0);
  db.remove("Test/AIS1");
  const current = await service.prepareItemVisionIndex(args(db, storage(), { allowOrphanCleanup: true }));
  await service.applyItemVisionIndexPlan({ db, plan: current });
  assert.deepEqual(db.writes, [{ key: "ItemVisionIndex/AIS1" }]);
});

test("exact matching rejects removed or replaced objects even if old hashes were preserved", async () => {
  const bucket = storage({ "Parts/AIS1/item.jpg": { bytes: Buffer.from("old"), generation: "1" } });
  const indexRecord = { photoFingerprintFiles: [{ path: "Parts/AIS1/item.jpg", generation: "1", size: 3, sha256: sha("old") }] };
  const options = { bucket, item: {}, itemId: "AIS1", indexRecord, requestedHashes: [sha("old")] };
  assert.deepEqual((await service.verifyPhotoFingerprintMatch(options)).matchedHashes, [sha("old")]);
  bucket.objects.set("Parts/AIS1/item.jpg", { bytes: Buffer.from("new"), generation: "2" });
  assert.deepEqual((await service.verifyPhotoFingerprintMatch(options)).matchedHashes, []);
  bucket.objects.clear();
  assert.deepEqual((await service.verifyPhotoFingerprintMatch(options)).matchedHashes, []);
});

test("exact matching does not use arbitrary prefixes or metadata-only supplied hashes", async () => {
  const bucket = storage({ "Parts/OTHER/item.jpg": "old" });
  const result = await service.verifyPhotoFingerprintMatch({ bucket, item: {}, itemId: "AIS1", requestedHashes: [sha("old")],
    indexRecord: { photoSha256: [sha("old")], photoFingerprintFiles: [{ path: "Parts/OTHER/item.jpg", generation: "1", size: 3, sha256: sha("old") }] } });
  assert.deepEqual(result.matchedHashes, []);
});
