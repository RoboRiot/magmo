"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { createHash } = require("node:crypto");
const repair = require("../scripts/repair-item-vision-index.cjs");
const sha = (value) => createHash("sha256").update(value).digest("hex");
function directory(t) {
  const parent = path.resolve(os.tmpdir());
  const dir = fs.mkdtempSync(path.join(parent, "magmo-vision-repair-test-"));
  t.after(() => {
    const resolved = path.resolve(dir);
    assert.ok(resolved.startsWith(parent + path.sep) && path.basename(resolved).startsWith("magmo-vision-repair-test-"));
    fs.rmSync(resolved, { recursive: true, force: true });
  });
  return dir;
}
function writeManifest(dir, manifest, entries) {
  manifest.files = {};
  for (const [name, values] of Object.entries(entries)) {
    const bytes = Buffer.from(values.map((value) => JSON.stringify(value)).join("\n") + "\n");
    fs.writeFileSync(path.join(dir, name), bytes);
    manifest.files[name] = { bytes: bytes.length, sha256: sha(bytes) };
  }
  fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(manifest));
}

test("photo cache verifies both manifests and joins only matching generation/size/checksum", (t) => {
  const dir = directory(t);
  writeManifest(dir, { status: "complete", bucket: "bucket" }, {
    "objects.jsonl": [
      { key: "one", bucket: "bucket", name: "Parts/AIS1/a.jpg", generation: "1", size: "5", crc32c: "crc" },
      { key: "two", bucket: "bucket", name: "Parts/AIS1/b.jpg", generation: "2", size: "5", crc32c: "crc" },
    ],
    "downloads.jsonl": [
      { key: "one", generation: "1", bytes: 5, crc32c: "crc", sha256: sha("photo") },
      { key: "two", generation: "old", bytes: 5, crc32c: "crc", sha256: sha("photo") },
    ],
  });
  const cache = repair.loadPhotoCache(dir, "bucket");
  assert.equal(cache.size, 1);
  assert.equal(cache.get("Parts/AIS1/a.jpg").sha256, sha("photo"));
  assert.throws(() => repair.loadPhotoCache(dir, "another-bucket"), /matching-bucket/);
  fs.appendFileSync(path.join(dir, "downloads.jsonl"), "\n");
  assert.throws(() => repair.loadPhotoCache(dir, "bucket"), /checksum mismatch/);
});

function applyFixture(t, concurrent = false) {
  const planDirectory = directory(t), out = directory(t);
  const item = { name: "Saved" }, before = { name: "Old index" };
  const plan = { itemId: "AIS1", action: "set", versions: { source: "1:0", reserved: "missing", index: "2:0" },
    before, record: { sourceItemId: "AIS1", name: "Saved", version: 2 }, photoIndex: { complete: true } };
  writeManifest(planDirectory, { format: "magmo-vision-index-plan", version: 2, mode: "dry-run", projectId: "test-project", bucket: "bucket" }, { "plan.jsonl": [plan] });
  const writes = [];
  const ref = (key) => ({ path: key });
  const db = { collection: (name) => ({ doc: (id) => ref(`${name}/${id}`) }),
    runTransaction: async (visit) => {
      const persisted = fs.readFileSync(path.join(out, "before-images.jsonl"), "utf8");
      assert.deepEqual(JSON.parse(persisted.trim()).data, before, "before image is durable before the mutation attempt");
      return visit({ get: async (r) => {
        const source = r.path === "Test/AIS1";
        const index = r.path === "ItemVisionIndex/AIS1";
        return { exists: source || index, updateTime: { seconds: source ? 1 : concurrent ? 3 : 2, nanoseconds: 0 },
          data: () => source ? item : index ? before : undefined };
      }, set: (r, data) => writes.push({ path: r.path, data }), delete: (r) => writes.push({ path: r.path, deleted: true }) });
    },
  };
  return { db, bucket: { name: "bucket" }, projectId: "test-project", directory: out, planDirectory, writes };
}

test("repair applies only the saved index plan with a durable exact before image", async (t) => {
  const fixture = applyFixture(t);
  await repair.applyPlan(fixture);
  assert.deepEqual(fixture.writes.map((write) => write.path), ["ItemVisionIndex/AIS1"]);
  const manifest = JSON.parse(fs.readFileSync(path.join(fixture.directory, "manifest.json"), "utf8"));
  assert.equal(manifest.summary.updated, 1);
  assert.equal(manifest.summary.failed, 0);
  assert.ok(manifest.files["before-images.jsonl"].sha256);
});

test("repair skips concurrent index changes and records the conflict instead of overwriting", async (t) => {
  const fixture = applyFixture(t, true);
  const priorExit = process.exitCode;
  try { await repair.applyPlan(fixture); } finally { process.exitCode = priorExit; }
  assert.deepEqual(fixture.writes, []);
  const receipt = JSON.parse(fs.readFileSync(path.join(fixture.directory, "results.jsonl"), "utf8").trim());
  assert.equal(receipt.ok, false);
  assert.equal(receipt.code, "index_source_changed");
});

test("tampered plans fail before any database mutation", async (t) => {
  const fixture = applyFixture(t);
  fs.appendFileSync(path.join(fixture.planDirectory, "plan.jsonl"), "\n");
  await assert.rejects(repair.applyPlan(fixture), /checksum mismatch/);
  assert.deepEqual(fixture.writes, []);
});
