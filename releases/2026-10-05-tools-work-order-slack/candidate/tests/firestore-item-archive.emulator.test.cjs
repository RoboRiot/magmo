const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

// Opt in explicitly. Both SDKs below are pinned to this disposable demo project
// and loopback emulator; this suite never loads .env or FirebaseAdmin.js.
const ENABLED = process.env.MAGMO_ARCHIVE_EMULATOR_TEST === "1";
const PROJECT = "demo-magmo-archive";
const HOST = "127.0.0.1:8189";

function loadModule(relativePath, mocks = {}) {
  const filename = path.resolve(__dirname, "..", relativePath);
  const babel = require("@babel/core");
  const source = babel.transformSync(fs.readFileSync(filename, "utf8"), {
    filename, babelrc: false, configFile: false,
    plugins: ["@babel/plugin-transform-modules-commonjs"],
  }).code;
  const module = { exports: {} };
  const localRequire = (request) => Object.prototype.hasOwnProperty.call(mocks, request)
    ? mocks[request]
    : require(request.startsWith(".") ? path.resolve(path.dirname(filename), request) : request);
  new Function("require", "module", "exports", source)(localRequire, module, module.exports);
  return module.exports;
}

function comparable(value) {
  if (value == null || typeof value !== "object") return value;
  if (typeof value.path === "string" && value.firestore) return { reference: value.path };
  if (typeof value.toMillis === "function") return { timestamp: value.toMillis() };
  if (value instanceof Date) return { timestamp: value.getTime() };
  if (Array.isArray(value)) return value.map(comparable);
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, comparable(value[key])]));
}

async function denied(operation, label) {
  await assert.rejects(operation, (error) => {
    assert.match(String(error?.code), /permission-denied|PERMISSION_DENIED|^7$/, label);
    return true;
  }, label);
}

function responseRecorder() {
  return {
    headersSent: false, writableEnded: false, statusCode: null, body: null,
    setHeader() {},
    status(value) { this.statusCode = value; return this; },
    json(value) { this.body = value; this.headersSent = true; this.writableEnded = true; return this; },
  };
}

test("item archive and rename security against the isolated Firestore emulator", {
  skip: !ENABLED && "Set MAGMO_ARCHIVE_EMULATOR_TEST=1, FIRESTORE_EMULATOR_HOST=127.0.0.1:8189 and GCLOUD_PROJECT=demo-magmo-archive.",
  timeout: 120000,
}, async (t) => {
  assert.equal(process.env.FIRESTORE_EMULATOR_HOST, HOST, "Refusing any non-test Firestore host.");
  assert.equal(process.env.GCLOUD_PROJECT, PROJECT, "Refusing any non-demo project.");
  if (process.env.GOOGLE_CLOUD_PROJECT) assert.equal(process.env.GOOGLE_CLOUD_PROJECT, PROJECT);
  // The emulator has no need to discover a Google metadata/credential server.
  const previousMetadataDetection = process.env.METADATA_SERVER_DETECTION;
  process.env.METADATA_SERVER_DETECTION = "none";

  const { initializeApp, deleteApp } = require("firebase-admin/app");
  const { getFirestore, FieldValue, Timestamp } = require("firebase-admin/firestore");
  const firebase = require("firebase/compat/app");
  require("firebase/compat/firestore");
  const { connectFirestoreEmulator, setLogLevel } = require("firebase/firestore");
  setLogLevel("silent");
  const runId = `${Date.now()}-${process.pid}`;
  const id = (suffix) => `emulator-${runId}-${suffix}`;
  const adminApp = initializeApp({ projectId: PROJECT }, id("admin-sdk"));
  const adminDb = getFirestore(adminApp);
  adminDb.settings({ host: HOST, ssl: false });
  const clients = [];
  const makeClient = (role, email) => {
    const app = firebase.initializeApp({ projectId: PROJECT, apiKey: "emulator-only", appId: id(role) }, id(role));
    const db = app.firestore();
    connectFirestoreEmulator(db._delegate, "127.0.0.1", 8189, {
      mockUserToken: { sub: id(role), email, email_verified: true, role },
    });
    clients.push({ app, db });
    return db;
  };
  const employee = makeClient("employee", "archive-test@advancedimagingparts.com");
  const browserAdmin = makeClient("admin", "archive-admin@advancedimagingparts.com");
  const viewer = makeClient("viewer", "archive-viewer@example.test");
  const outsider = makeClient("outside", "archive-outside@example.test");
  const { commitItemWithMachineBacklinks } = loadModule("utils/warehouseAssociations.js");
  const emptyBucket = {
    getFiles: async () => [[]],
    file: () => { throw new Error("No Storage access is allowed in the Firestore-only emulator suite."); },
  };

  try {
    await t.test("internal item read/create/update work while direct deletion stays denied", async () => {
      const itemId = id("normal");
      const ref = employee.collection("Test").doc(itemId);
      await ref.set({ name: "Current item", localSN: itemId, visible: true });
      assert.equal((await ref.get()).data().name, "Current item");
      await ref.update({ name: "Edited current item" });
      assert.equal((await viewer.collection("Test").doc(itemId).get()).data().name, "Edited current item");
      await denied(() => ref.delete(), "an employee cannot directly delete an item");
      await denied(() => browserAdmin.collection("Test").doc(itemId).delete(), "admin claim is not a client-delete bypass");
      await denied(() => viewer.collection("Test").doc(itemId).update({ name: "Forged" }), "viewer writes denied");
      await denied(() => outsider.collection("Test").doc(itemId).get(), "unapproved user reads denied");
      assert.equal((await adminDb.collection("Test").doc(itemId).get()).data().name, "Edited current item");
    });

    await t.test("stale clients cannot create numeric or noncanonical AIS document paths", async () => {
      const digits = `${Date.now()}33551`;
      for (const legacyId of [digits, `ais${digits}`, `AIS ${digits}`, `AIS-${digits}`, `ais_${digits}`,
        `AIS\t${digits}`, `aIs_\t -${digits}`, ` AIS${digits} `]) {
        await denied(() => employee.collection("Test").doc(legacyId).set({
          name: "Must not register a duplicate spelling", localSN: legacyId,
        }), `noncanonical path ${legacyId}`);
        assert.equal((await adminDb.collection("Test").doc(legacyId).get()).exists, false);
      }
      const canonical = `AIS${digits}`;
      await employee.collection("Test").doc(canonical).set({
        name: "Canonical item", localSN: canonical, local_sn: canonical, aisNumber: canonical,
      });
      assert.equal((await adminDb.collection("Test").doc(canonical).get()).data().name, "Canonical item");
    });

    await t.test("new aliases cannot borrow another AIS and legacy ordinary updates remain valid", async () => {
      const digits = `${Date.now()}33552`;
      const canonical = `AIS${digits}`;
      const legacy = { name: "Keep legacy item", localSN: digits, local_sn: digits, nested: { keep: "all details" } };
      await adminDb.collection("Test").doc(digits).set(legacy);
      await adminDb.collection("Test").doc(canonical).set({ name: "Original item", localSN: canonical });
      for (const field of ["localSN", "local_sn", "aisNumber"]) {
        await denied(() => employee.collection("Test").doc(id(`different-id-${field}`)).set({
          name: "Conflicting alias", [field]: canonical,
        }), `new ${field} must match document identity`);
        await denied(() => employee.collection("Test").doc(digits).update({ [field]: canonical }),
          `existing legacy record cannot acquire another document's ${field}`);
      }
      await employee.collection("Test").doc(digits).update({ name: "Edited legacy name" });
      await employee.collection("Test").doc(canonical).update({ name: "Edited original name" });
      assert.deepEqual((await adminDb.collection("Test").doc(digits).get()).data(), { ...legacy, name: "Edited legacy name" });
      assert.equal((await adminDb.collection("Test").doc(canonical).get()).data().localSN, canonical);
    });

    await t.test("canonical creation fails for an existing numeric legacy owner or retired numeric identity", async () => {
      for (const collection of ["Test", "ArchivedItemIds"]) {
        const digits = `${Date.now()}${collection === "Test" ? "33553" : "33554"}`;
        const preserved = { name: "Legacy owner", localSN: digits, keep: { history: ["unchanged"] } };
        await adminDb.collection(collection).doc(digits).set(preserved);
        await denied(() => employee.collection("Test").doc(`AIS${digits}`).set({
          name: "Must not steal legacy identity", localSN: `AIS${digits}`,
        }), `${collection} numeric identity blocks a new canonical item`);
        assert.deepEqual((await adminDb.collection(collection).doc(digits).get()).data(), preserved);
      }
      const digits = `${Date.now()}23019`;
      const preserved = { name: "Lowercase legacy owner", localSN: `ais${digits}` };
      await adminDb.collection("Test").doc(`ais${digits}`).set(preserved);
      await denied(() => employee.collection("Test").doc(`AIS${digits}`).set({ name: "Forbidden case duplicate", localSN: `AIS${digits}` }),
        "a lowercase legacy document blocks the canonical spelling");
      await employee.collection("Test").doc(`ais${digits}`).update({ name: "Lowercase owner still editable" });
      assert.equal((await adminDb.collection("Test").doc(`ais${digits}`).get()).data().localSN, preserved.localSN);
    });

    await t.test("one atomic batch cannot create numeric and canonical duplicates in either write order", async () => {
      for (const reversed of [false, true]) {
        const digits = `${Date.now()}${reversed ? "33555" : "33556"}`;
        const ids = reversed ? [`AIS${digits}`, digits] : [digits, `AIS${digits}`];
        const batch = employee.batch();
        ids.forEach((itemId) => batch.set(employee.collection("Test").doc(itemId), { name: "Duplicate", localSN: itemId }));
        await denied(() => batch.commit(), "numeric and canonical pair is rejected atomically");
        for (const itemId of ids) assert.equal((await adminDb.collection("Test").doc(itemId).get()).exists, false);
      }
    });

    await t.test("actual concurrent numeric and prefixed creation has exactly one canonical winner", async () => {
      const digits = `${Date.now()}33557`;
      const outcomes = await Promise.allSettled([digits, `AIS${digits}`].map((partId, index) =>
        commitItemWithMachineBacklinks({ db: employee, partId,
          itemData: { name: `Concurrent ${index}`, localSN: partId }, nextMachineIds: [],
        })
      ));
      assert.equal(outcomes.filter((result) => result.status === "fulfilled").length, 1);
      assert.equal(outcomes.filter((result) => result.status === "rejected").length, 1);
      assert.equal((await adminDb.collection("Test").doc(digits).get()).exists, false);
      const canonical = (await adminDb.collection("Test").doc(`AIS${digits}`).get()).data();
      assert.ok(["Concurrent 0", "Concurrent 1"].includes(canonical.name));
      assert.equal(canonical.localSN, `AIS${digits}`);
      const before = comparable(canonical);
      await assert.rejects(commitItemWithMachineBacklinks({ db: employee, partId: `AIS${digits}`,
        itemData: { name: "Must not overwrite winner", localSN: `AIS${digits}` }, nextMachineIds: [],
      }), /already exists|already in use/);
      assert.deepEqual(comparable((await adminDb.collection("Test").doc(`AIS${digits}`).get()).data()), before);
    });

    await t.test("a legacy numeric item can rename without changing historical retirement semantics", async () => {
      const sourceId = `${Date.now()}33558`;
      const targetId = `AIS${Date.now()}33559`;
      const source = { name: "Legacy numeric item", localSN: sourceId, local_sn: sourceId, aisNumber: sourceId,
        nested: { history: ["preserved"] } };
      await adminDb.collection("Test").doc(sourceId).set(source);
      await commitItemWithMachineBacklinks({ db: employee, partId: targetId, previousPartId: sourceId,
        itemData: { name: source.name, localSN: targetId }, nextMachineIds: [],
      });
      const receipt = (await adminDb.collection("ItemRenames").doc(sourceId).get()).data();
      assert.deepEqual(receipt.retiredIds, [sourceId]);
      assert.deepEqual(receipt.beforeData, source);
      assert.deepEqual((await adminDb.collection("Test").doc(targetId).get()).data().nested, source.nested);
      await denied(() => employee.collection("Test").doc(`AIS${sourceId}`).set({ name: "Forbidden reuse", localSN: `AIS${sourceId}` }),
        "a canonical spelling cannot reuse a retired numeric identity");
    });

    await t.test("archives and rename receipts are private and immutable even under the catch-all", async () => {
      for (const collection of ["ItemArchives", "ItemRenames"]) {
        const recordId = id(`private-${collection}`);
        const seed = { sourceId: recordId, state: "preserved", beforeData: { private: "recovery-only" } };
        await adminDb.collection(collection).doc(recordId).set(seed);
        await adminDb.collection(collection).doc(recordId).collection("nested").doc("snapshot").set(seed);
        const ref = browserAdmin.collection(collection).doc(recordId);
        await denied(() => ref.get(), `${collection} existing root read`);
        await denied(() => browserAdmin.collection(collection).get(), `${collection} collection listing`);
        await denied(() => ref.update({ state: "forged" }), `${collection} root update`);
        await denied(() => ref.delete(), `${collection} root deletion`);
        await denied(() => browserAdmin.collection(collection).doc(id(`forge-${collection}`)).set(seed), `${collection} forged creation`);
        const nested = ref.collection("nested").doc("snapshot");
        await denied(() => nested.get(), `${collection} descendant read`);
        await denied(() => nested.set({ state: "forged" }), `${collection} descendant write`);
        assert.deepEqual((await adminDb.collection(collection).doc(recordId).get()).data(), seed);
      }
      const missing = await employee.collection("ItemRenames").doc(id("missing-receipt")).get();
      assert.equal(missing.exists, false, "safe rename can read an absent receipt precondition");
    });

    await t.test("archived document IDs and all supported serial aliases cannot be recreated", async () => {
      const digits = `${Date.now()}01`;
      const canonical = `AIS${digits}`;
      await adminDb.collection("ArchivedItemIds").doc(canonical).set({ itemId: canonical, state: "archived" });
      assert.equal((await employee.collection("ArchivedItemIds").doc(canonical).get()).exists, true);
      await denied(() => employee.collection("ArchivedItemIds").get(), "reservation list is private");
      await denied(() => employee.collection("ArchivedItemIds").doc(canonical).delete(), "reservation cannot be removed");
      await denied(() => employee.collection("ArchivedItemIds").doc(canonical).update({ state: "active" }), "reservation cannot be rewritten");
      await denied(() => employee.collection("ArchivedItemIds").doc(id("forged-reservation")).set({ state: "renamed", sourceId: id("normal"), itemId: id("fake-target") }), "standalone reservation forgery denied");
      for (const alias of [canonical, `ais-${digits}`, `AIS _-${digits}`]) {
        await denied(() => employee.collection("Test").doc(alias).set({ name: "Recreated" }), `reserved document ID ${alias}`);
        for (const field of ["localSN", "local_sn", "aisNumber"]) {
          await denied(() => employee.collection("Test").doc(id(`alias-${field}`)).set({ name: "Alias reuse", [field]: alias }), `reserved ${field}`);
        }
        await denied(() => employee.collection("Parts").doc(alias).set({ name: "Republished" }), "catalog cannot resurrect a reserved ID");
      }
      const activeId = id("active-alias-change");
      await adminDb.collection("Test").doc(activeId).set({ name: "Active", localSN: activeId });
      await denied(() => employee.collection("Test").doc(activeId).update({ localSN: canonical }), "update cannot reuse an archived alias");
      await denied(() => employee.collection("ItemVisionIndex").doc(activeId).set({ name: "Forged index" }), "vision index stays server-owned");
    });

    await t.test("actual rename transaction preserves the full preimage and moves machine backlinks", async () => {
      const sourceId = id("rename-source");
      const targetId = id("rename-target");
      const machineId = id("rename-machine");
      const source = {
        name: "Original coil", localSN: sourceId, local_sn: sourceId,
        pn: ["PN-7", "PN-8"], nested: { description: "Keep every field", values: [1, null, "three"] },
        capturedAt: Timestamp.fromMillis(1788710400000),
        MachineCurrent: adminDb.collection("Machine").doc(machineId),
      };
      await adminDb.collection("Test").doc(sourceId).set(source);
      await adminDb.collection("Test").doc(sourceId).collection("ShipmentHistory").doc("history").set({ keep: "Original history" });
      await adminDb.collection("Machine").doc(machineId).set({ associatedParts: [adminDb.collection("Test").doc(sourceId), "KEEP"] });
      const result = await commitItemWithMachineBacklinks({
        db: employee, partId: targetId, previousPartId: sourceId,
        itemData: { name: "Renamed coil", localSN: targetId, local_sn: targetId },
        nextMachineIds: [machineId],
      });
      assert.equal(result.operation, "rename");
      assert.equal((await adminDb.collection("Test").doc(sourceId).get()).exists, false);
      const target = (await adminDb.collection("Test").doc(targetId).get()).data();
      assert.equal(target.name, "Renamed coil");
      assert.deepEqual(target.nested, source.nested);
      const receipt = (await adminDb.collection("ItemRenames").doc(sourceId).get()).data();
      assert.equal(receipt.sourceId, sourceId);
      assert.equal(receipt.targetId, targetId);
      assert.equal(receipt.sourcePath, `Test/${sourceId}`);
      assert.equal(receipt.sourcePhotoPrefix, `Parts/${sourceId}/`);
      assert.deepEqual(comparable(receipt.beforeData), comparable(source));
      assert.ok(receipt.retiredIds.includes(sourceId));
      for (const retiredId of receipt.retiredIds) {
        const reservation = await employee.collection("ArchivedItemIds").doc(retiredId).get();
        assert.deepEqual(reservation.data(), { state: "renamed", sourceId, itemId: targetId });
        await denied(() => employee.collection("Test").doc(retiredId).set({ name: "Stale editor resurrection", localSN: retiredId }), "renamed identity is retired");
      }
      const machine = (await adminDb.collection("Machine").doc(machineId).get()).data();
      assert.ok(machine.associatedParts.some((part) => part?.path === `Test/${targetId}`));
      assert.ok(!machine.associatedParts.some((part) => part?.path === `Test/${sourceId}`));
      assert.equal((await adminDb.collection("Test").doc(sourceId).collection("ShipmentHistory").doc("history").get()).exists, true);
      await denied(() => employee.collection("ItemRenames").doc(sourceId).get(), "a created receipt is private");
    });

    await t.test("forged rename receipts fail atomically rather than deleting the source", async () => {
      const variants = ["missing-beforeData", "changed-beforeData", "wrong-source", "wrong-target", "wrong-photo-prefix", "no-target", "source-retained", "missing-retirement", "missing-canonical-retirement", "unrelated-retired-id"];
      for (const variant of variants) {
        const sourceId = id(`forged-source-${variant}`);
        const targetId = id(`forged-target-${variant}`);
        const source = { name: "Must survive", localSN: sourceId, privateNested: { intact: true } };
        const formattedAlias = `AIS ${Date.now()}77`;
        const canonicalAlias = formattedAlias.replace(" ", "");
        if (variant === "missing-canonical-retirement") source.localSN = formattedAlias;
        await adminDb.collection("Test").doc(sourceId).set(source);
        const receipt = { sourceId, targetId, beforeData: source, sourcePath: `Test/${sourceId}`, sourcePhotoPrefix: `Parts/${sourceId}/`, retiredIds: [sourceId] };
        if (variant === "missing-canonical-retirement") receipt.retiredIds.push(formattedAlias, canonicalAlias);
        if (variant === "missing-beforeData") delete receipt.beforeData;
        if (variant === "changed-beforeData") receipt.beforeData = { ...source, name: "Changed" };
        if (variant === "wrong-source") receipt.sourceId = id("unrelated-source");
        if (variant === "wrong-target") receipt.targetId = id("unwritten-target");
        if (variant === "wrong-photo-prefix") receipt.sourcePhotoPrefix = "Parts/other/";
        if (variant === "unrelated-retired-id") receipt.retiredIds.push(id("another-active-item"));
        const batch = employee.batch();
        batch.set(employee.collection("ItemRenames").doc(sourceId), receipt);
        if (variant !== "missing-retirement") {
          for (const retiredId of receipt.retiredIds) {
            if (variant === "missing-canonical-retirement" && retiredId === canonicalAlias) continue;
            batch.set(employee.collection("ArchivedItemIds").doc(retiredId), { state: "renamed", sourceId, itemId: targetId });
          }
        }
        if (variant !== "no-target") batch.set(employee.collection("Test").doc(targetId), { name: "New", localSN: targetId });
        if (variant !== "source-retained") batch.delete(employee.collection("Test").doc(sourceId));
        await denied(() => batch.commit(), `invalid receipt ${variant}`);
        assert.deepEqual((await adminDb.collection("Test").doc(sourceId).get()).data(), source);
        assert.equal((await adminDb.collection("Test").doc(targetId).get()).exists, false);
        assert.equal((await adminDb.collection("ItemRenames").doc(sourceId).get()).exists, false);
        for (const retiredId of receipt.retiredIds) assert.equal((await adminDb.collection("ArchivedItemIds").doc(retiredId).get()).exists, false);
      }
    });

    await t.test("rename retires all eight literal/canonical legacy aliases without retaining them on the target", async () => {
      const digits = String(Date.now());
      const sourceId = `AIS-${digits}1`;
      const targetId = `AIS${digits}9`;
      const source = {
        name: "Legacy aliases", localSN: `AIS ${digits}2`,
        local_sn: `ais_${digits}3`, aisNumber: `AIS-${digits}4`,
      };
      await adminDb.collection("Test").doc(sourceId).set(source);
      await commitItemWithMachineBacklinks({
        db: employee, partId: targetId, previousPartId: sourceId,
        itemData: { name: "New serial", localSN: targetId, local_sn: targetId }, nextMachineIds: [],
      });
      const target = (await adminDb.collection("Test").doc(targetId).get()).data();
      assert.equal(target.localSN, targetId);
      assert.equal(target.local_sn, targetId);
      assert.equal(target.aisNumber, targetId);
      const receipt = (await adminDb.collection("ItemRenames").doc(sourceId).get()).data();
      assert.equal(receipt.retiredIds.length, 8);
      assert.deepEqual(receipt.beforeData, source);
      for (const retiredId of receipt.retiredIds) {
        assert.deepEqual((await employee.collection("ArchivedItemIds").doc(retiredId).get()).data(), { state: "renamed", sourceId, itemId: targetId });
        await denied(() => employee.collection("Test").doc(retiredId).set({ name: "Retired alias reuse" }), "each retired alias stays blocked");
      }
    });

    await t.test("rename refuses to retire an alias owned by another active item", async () => {
      const sourceId = id("alias-owner-source");
      const targetId = id("alias-owner-target");
      const conflictingId = id("alias-owner-other");
      await adminDb.collection("Test").doc(sourceId).set({ name: "Source", localSN: sourceId, aisNumber: conflictingId });
      await adminDb.collection("Test").doc(conflictingId).set({ name: "Separate active owner", localSN: conflictingId });
      await assert.rejects(() => commitItemWithMachineBacklinks({
        db: employee, partId: targetId, previousPartId: sourceId,
        itemData: { localSN: targetId }, nextMachineIds: [],
      }), (error) => error.code === "warehouse-associations/retired-identity-in-use");
      assert.equal((await adminDb.collection("Test").doc(sourceId).get()).exists, true);
      assert.equal((await adminDb.collection("Test").doc(targetId).get()).exists, false);
      assert.equal((await adminDb.collection("ItemRenames").doc(sourceId).get()).exists, false);
      assert.equal((await adminDb.collection("ArchivedItemIds").doc(conflictingId).get()).exists, false);
      assert.equal((await adminDb.collection("Test").doc(conflictingId).get()).data().name, "Separate active owner");
    });

    await t.test("target collisions and receipt reuse cannot overwrite earlier records", async () => {
      const sourceId = id("collision-source");
      const targetId = id("collision-target");
      await adminDb.collection("Test").doc(sourceId).set({ name: "Source", localSN: sourceId });
      await adminDb.collection("Test").doc(targetId).set({ name: "Existing target", localSN: targetId });
      await assert.rejects(() => commitItemWithMachineBacklinks({ db: employee, partId: targetId, previousPartId: sourceId,
        itemData: { name: "Overwrite", localSN: targetId }, nextMachineIds: [] }), /already exists/);
      assert.equal((await adminDb.collection("Test").doc(targetId).get()).data().name, "Existing target");
      assert.equal((await adminDb.collection("ItemRenames").doc(sourceId).get()).exists, false);
      const immutable = { sourceId, targetId: id("earlier-target"), beforeData: { keep: "immutable" } };
      await adminDb.collection("ItemRenames").doc(sourceId).set(immutable);
      const repeatTargetId = id("repeat-target");
      await assert.rejects(() => commitItemWithMachineBacklinks({ db: employee, partId: repeatTargetId, previousPartId: sourceId,
        itemData: { name: "Second rename", localSN: repeatTargetId }, nextMachineIds: [] }));
      assert.deepEqual((await adminDb.collection("ItemRenames").doc(sourceId).get()).data(), immutable);
      assert.equal((await adminDb.collection("Test").doc(sourceId).get()).data().name, "Source");
      assert.equal((await adminDb.collection("Test").doc(repeatTargetId).get()).exists, false);
    });

    await t.test("the admin archive API preserves recovery records and removes active inventory atomically", async () => {
      const itemId = id("archive-api");
      const alias = `AIS${Date.now()}02`;
      const source = { name: "Archive this item", localSN: alias, nested: { full: "payload" } };
      await adminDb.collection("Test").doc(itemId).set(source);
      await adminDb.collection("Test").doc(itemId).collection("ShipmentHistory").doc("record").set({ retainedInArchive: true });
      await adminDb.collection("Parts").doc(itemId).set({ name: source.name, localSN: alias });
      await adminDb.collection("ItemVisionIndex").doc(itemId).set({ name: source.name });
      const groupId = id("archive-membership");
      await adminDb.collection("shipping_groups").doc(groupId).set({ itemIds: [itemId, "KEEP"], itemCount: 2 });
      let actor = { uid: id("api-user"), email: "archive-test@advancedimagingparts.com", email_verified: true, role: "employee" };
      const { default: handler } = loadModule("pages/api/items/delete.js", {
        "../../../context/FirebaseAdmin": { adminDb, adminBucket: emptyBucket },
        "../../../utils/apiAuth": { requireFirebaseAuth: async () => actor },
      });
      const forbidden = responseRecorder();
      await handler({ method: "DELETE", body: { itemId } }, forbidden);
      assert.equal(forbidden.statusCode, 403);
      assert.equal((await adminDb.collection("Test").doc(itemId).get()).exists, true);
      actor = { ...actor, role: "admin" };
      const response = responseRecorder();
      await handler({ method: "DELETE", body: { itemId } }, response);
      assert.equal(response.statusCode, 200, JSON.stringify(response.body));
      assert.equal(response.body.ok, true);
      for (const collection of ["Test", "Parts", "ItemVisionIndex"]) {
        assert.equal((await adminDb.collection(collection).doc(itemId).get()).exists, false);
      }
      const archive = (await adminDb.collection("ItemArchives").doc(itemId).get()).data();
      assert.equal(archive.state, "archived");
      const snapshots = (await adminDb.collection("ItemArchives").doc(itemId).collection("snapshots").get()).docs.map((doc) => doc.data());
      assert.deepEqual(snapshots.find((row) => row.sourcePath === `Test/${itemId}`).data, source);
      assert.ok(snapshots.some((row) => row.sourcePath === `Test/${itemId}/ShipmentHistory/record`));
      assert.deepEqual((await adminDb.collection("shipping_groups").doc(groupId).get()).data(), { itemIds: ["KEEP"], itemCount: 1 });
      assert.equal((await adminDb.collection("ArchivedItemIds").doc(alias).get()).data().itemId, itemId);
      await denied(() => employee.collection("Test").doc(itemId).set(source), "archived source cannot be recreated");
      const retry = responseRecorder();
      await handler({ method: "DELETE", body: { itemId } }, retry);
      assert.equal(retry.statusCode, 200);
      assert.equal(retry.body.alreadyArchived, true);
    });

    await t.test("archiving a renamed item cleans its receipt chain and exact legacy memberships", async () => {
      const sourceId = id("chain-source");
      const middleId = id("chain-middle");
      const finalId = id("chain-final");
      const historicalPath = `Test/${sourceId}/ShipmentHistory/old-history`;
      await adminDb.collection("Test").doc(sourceId).set({ name: "Original chain item", localSN: sourceId, local_sn: sourceId });
      await adminDb.doc(historicalPath).set({ immutableHistory: "Original shipment" });
      for (const [previousPartId, partId] of [[sourceId, middleId], [middleId, finalId]]) {
        await adminDb.collection("Parts").doc(previousPartId).set({ name: "Old published record", localSN: previousPartId });
        await adminDb.collection("ItemVisionIndex").doc(previousPartId).set({ name: "Old index entry" });
        await commitItemWithMachineBacklinks({
          db: employee, partId, previousPartId,
          itemData: { name: "Renamed chain item", localSN: partId, local_sn: partId },
          nextMachineIds: [],
        });
      }
      const groupId = id("chain-membership");
      const similarId = `${sourceId}-similar`;
      const historicalMention = { itemId: sourceId, purpose: "historical evidence" };
      await adminDb.collection("shipping_groups").doc(groupId).set({
        itemIds: [sourceId, middleId, finalId, "KEEP", similarId], itemCount: 5,
        history: historicalMention,
      });
      const scannedPhotoPrefixes = [];
      const bucket = {
        getFiles: async ({ prefix }) => { scannedPhotoPrefixes.push(prefix); return [[]]; },
        file: emptyBucket.file,
      };
      const { archiveAndDeleteItem } = require("../lib/items/itemArchive.cjs");
      const result = await archiveAndDeleteItem({
        db: adminDb, bucket, itemId: finalId,
        actor: { uid: id("chain-admin"), email: "archive-admin@advancedimagingparts.com" },
        deleteField: FieldValue.delete(),
      });
      assert.equal(result.ok, true);
      for (const retiredId of [sourceId, middleId, finalId]) {
        for (const collection of ["Test", "Parts", "ItemVisionIndex"]) {
          assert.equal((await adminDb.collection(collection).doc(retiredId).get()).exists, false, `${collection}/${retiredId} removed`);
        }
        const reservation = (await adminDb.collection("ArchivedItemIds").doc(retiredId).get()).data();
        assert.equal(reservation.state, "archived");
        assert.equal(reservation.itemId, finalId);
        assert.ok(scannedPhotoPrefixes.includes(`Parts/${retiredId}/`), "each known photo prefix was included");
        await denied(() => employee.collection("Test").doc(retiredId).set({ name: "Resurrection", localSN: retiredId }), "all archived chain IDs stay unavailable");
      }
      assert.equal((await adminDb.doc(historicalPath).get()).exists, false);
      const snapshotRows = (await adminDb.collection("ItemArchives").doc(finalId).collection("snapshots").get()).docs.map((doc) => doc.data());
      for (const sourcePath of [historicalPath, `Parts/${sourceId}`, `Parts/${middleId}`, `Test/${finalId}`]) {
        assert.ok(snapshotRows.some((row) => row.sourcePath === sourcePath), `recovery snapshot for ${sourcePath}`);
      }
      assert.deepEqual((await adminDb.collection("shipping_groups").doc(groupId).get()).data(), {
        itemIds: ["KEEP", similarId], itemCount: 2, history: historicalMention,
      });
    });
  } finally {
    for (const { db, app } of clients) { await db.terminate(); await app.delete(); }
    await adminDb.terminate();
    await deleteApp(adminApp);
    if (previousMetadataDetection === undefined) delete process.env.METADATA_SERVER_DETECTION;
    else process.env.METADATA_SERVER_DETECTION = previousMetadataDetection;
  }
});
