"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const babel = require("@babel/core");
const { VisionPhotoIndexError } = require("../lib/items/visionPhotoIndex.cjs");

async function call({ body = { itemId: "AIS1" }, indexed, error, method = "POST", actor = { uid: "authorized" } } = {}) {
  const filename = path.resolve(__dirname, "../pages/api/items/sync-index.js");
  const source = babel.transformSync(fs.readFileSync(filename, "utf8"), { filename, configFile: false, babelrc: false,
    plugins: ["@babel/plugin-transform-modules-commonjs"] }).code;
  const calls = [];
  const mocks = {
    "../../../context/FirebaseAdmin": { adminDb: {}, adminBucket: {} },
    "../../../utils/apiAuth": { requireFirebaseAuth: async () => actor },
    "../../../utils/itemVisionIndex": { buildItemVisionIndexRecord: () => ({}) },
    "../../../lib/items/visionPhotoIndex.cjs": { refreshItemVisionIndex: async (options) => {
      calls.push(options); if (error) throw error;
      return indexed || { itemId: "AIS1", indexVersion: 2, photoIndex: { complete: true, photoCount: 2, hashedCount: 2, files: [], failures: [] } };
    } },
  };
  const module = { exports: {} };
  new Function("require", "module", "exports", source)((key) => {
    assert.ok(Object.hasOwn(mocks, key), `Unexpected dependency ${key}`); return mocks[key];
  }, module, module.exports);
  const result = { calls };
  const res = { headersSent: false, setHeader() {}, status(code) { result.status = code; return this; }, json(value) { result.body = value; return this; } };
  await module.exports.default({ method, body }, res);
  return result;
}

test("photo sync route returns verified coverage without leaking file names", async () => {
  const result = await call();
  assert.equal(result.status, 200);
  assert.equal(result.body.ok, true);
  assert.equal(result.body.photoIndex.complete, true);
  assert.equal(result.body.photoIndex.files, undefined);
  assert.equal(result.calls[0].refreshPhotos, true);
});

test("photo sync route reports saved inventory and retryable partial indexing", async () => {
  const result = await call({ indexed: { indexVersion: 2, photoIndex: { complete: false, photoCount: 2, hashedCount: 1,
    failedCount: 1, files: [{ path: "private-name" }], failures: [{ path: "private-name" }] } } });
  assert.equal(result.status, 503);
  assert.equal(result.body.indexUpdated, true);
  assert.equal(result.body.retryable, true);
  assert.equal(result.body.photoIndex.failedCount, 1);
  assert.equal(result.body.photoIndex.files, undefined);
  assert.equal(result.body.photoIndex.failures, undefined);
  assert.match(result.body.error, /item was saved/i);
});

test("source conflicts retry safely and missing inventory does not suggest another save", async () => {
  const changed = await call({ error: new VisionPhotoIndexError("index_source_changed", "Retry index") });
  assert.equal(changed.status, 409);
  assert.equal(changed.body.retryable, true);
  const missing = await call({ error: new VisionPhotoIndexError("item_not_found", "Missing", 404, false) });
  assert.equal(missing.status, 404);
  assert.equal(missing.body.retryable, false);
});

test("invalid ID and methods cannot reach indexing; old item IDs are not trusted cleanup instructions", async () => {
  assert.equal((await call({ method: "GET" })).status, 405);
  const invalid = await call({ body: { itemId: "../other" } });
  assert.equal(invalid.status, 400); assert.equal(invalid.calls.length, 0);
  const result = await call({ body: { itemId: "AIS1", previousItemId: "UNRELATED", photoSha256: ["forged"] } });
  assert.equal(result.calls[0].previousItemId, undefined);
  assert.equal(result.calls[0].photoSha256, undefined);
});

test("indexing fails closed without authentication even in development with Admin credentials", async () => {
  const result = await call({ actor: null });
  assert.equal(result.status, 401);
  assert.equal(result.calls.length, 0);
});
