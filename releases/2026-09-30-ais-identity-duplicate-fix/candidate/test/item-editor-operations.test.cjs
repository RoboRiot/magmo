const assert = require("node:assert/strict");
const test = require("node:test");
const {
  createItemOperationController,
  findAvailableLocalSerialNumber,
  getItemPhotoStoragePrefixes,
  isArchivedItemId,
} = require("../lib/items/itemEditorOperations.cjs");

test("an in-flight save blocks duplicate saves, generation, and printing until all work finishes", async () => {
  let finishUpload;
  const uploading = new Promise((resolve) => { finishUpload = resolve; });
  const statuses = [];
  let writes = 0;
  let overlappingActions = 0;
  const operations = createItemOperationController((status) => statuses.push(status));
  const saving = operations.run("save", "Saving item…", async (report) => {
    writes += 1;
    report("Uploading photo 1 of 1…");
    await uploading;
    return { docId: "AIS12345" };
  });
  // The lock is acquired before the first asynchronous task even starts.
  assert.equal(operations.isBusy(), true);
  for (const kind of ["save", "generate", "print"]) {
    assert.equal(await operations.run(kind, "Other", () => { overlappingActions += 1; }), null);
  }
  assert.equal(writes, 1);
  assert.equal(overlappingActions, 0);
  assert.equal(statuses.at(-1).message, "Uploading photo 1 of 1…");
  finishUpload();
  assert.deepEqual(await saving, { docId: "AIS12345" });
  assert.equal(operations.isBusy(), false);
  assert.equal(statuses.at(-1), null);
  assert.equal(await operations.run("save", "Saving again", () => "saved"), "saved");
});

test("validation exits and rejected writes clear busy state and allow retry", async () => {
  const statuses = [];
  const operations = createItemOperationController((status) => statuses.push(status));
  assert.equal(await operations.run("save", "Validating", () => null), null);
  assert.equal(operations.isBusy(), false);
  await assert.rejects(
    operations.run("save", "Saving", async () => { throw new Error("Write failed"); }),
    /Write failed/
  );
  assert.equal(operations.isBusy(), false);
  assert.equal(statuses.at(-1), null);
  assert.equal(await operations.run("save", "Retrying", () => "retry success"), "retry success");
});

test("Local SN generation skips the current draft and saved ID, then retries occupied candidates", async () => {
  const candidates = ["AIS10000", "ais10001", "AIS10002", "AIS10003"];
  const checked = [];
  const result = await findAvailableLocalSerialNumber({
    generateCandidate: () => candidates.shift(),
    excludedIds: ["AIS10000", "AIS10001"],
    exists: async (candidate) => {
      checked.push(candidate);
      return candidate === "AIS10002";
    },
  });
  assert.equal(result, "AIS10003");
  assert.deepEqual(checked, ["AIS10002", "AIS10003"]);
});

test("Local SN generation fails closed on an unavailable lookup or exhausted candidates", async () => {
  await assert.rejects(findAvailableLocalSerialNumber({
    generateCandidate: () => "AIS10000",
    exists: async () => { throw new Error("Lookup unavailable"); },
  }), /Lookup unavailable/);
  let attempts = 0;
  await assert.rejects(findAvailableLocalSerialNumber({
    generateCandidate: () => { attempts += 1; return "AIS10000"; },
    exists: async () => true,
  }), /unused Local SN/);
  assert.equal(attempts, 10);
});

test("an archived item ID stays unavailable even after its live item is gone", async () => {
  const reads = [];
  const db = {
    collection(name) {
      assert.equal(name, "ArchivedItemIds");
      return { doc(id) { return { async get() {
        reads.push(id);
        return { exists: id === "AIS10000" };
      } }; } };
    },
  };
  assert.equal(await isArchivedItemId(db, " AIS10000 "), true);
  assert.equal(await isArchivedItemId(db, "AIS10001"), false);
  assert.equal(await isArchivedItemId(db, ""), false);
  assert.ok(reads.includes("AIS10000") && reads.includes("10000"));
  assert.ok(reads.includes("AIS10001") && reads.includes("10001"));
  const beforeVariant = reads.length;
  assert.equal(await isArchivedItemId(db, "ais-10000"), true);
  assert.ok(reads.slice(beforeVariant).includes("AIS10000"));
  assert.equal(await isArchivedItemId(db, "10000"), true);
  const candidates = ["AIS10000", "AIS10001"];
  assert.equal(await findAvailableLocalSerialNumber({
    generateCandidate: () => candidates.shift(),
    exists: (candidate) => isArchivedItemId(db, candidate),
  }), "AIS10001");
});

test("photo folders retain every previous rename prefix without duplicates or paths outside inventory photos", () => {
  assert.deepEqual(getItemPhotoStoragePrefixes("NEW", [
    "Parts/OLD/", "Parts/OLDER", "Parts/OLD/", "Parts/NEW/",
    "ItemArchivePhotos/OLD/", "Parts/../", "Parts/OLD/nested/", null,
  ]), ["Parts/NEW/", "Parts/OLD/", "Parts/OLDER/"]);
});
