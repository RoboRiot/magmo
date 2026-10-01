const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const babel = require("@babel/core");
const { normalizeItemAisValue, getItemAisLookupValues, resolveItemSaveIdentity } = require("../lib/items/itemIdentity.cjs");
const { isArchivedItemId } = require("../lib/items/itemEditorOperations.cjs");

const filename = path.resolve(__dirname, "../utils/itemFormShared.js");
const transformed = babel.transformSync(fs.readFileSync(filename, "utf8"), {
  babelrc: false, configFile: false, filename, plugins: ["@babel/plugin-transform-modules-commonjs"],
}).code;
const loaded = { exports: {} };
new Function("require", "module", "exports", transformed)(
  (request) => require(path.resolve(path.dirname(filename), request)), loaded, loaded.exports
);
const { findExistingItemByAis } = loaded.exports;

function lookupDb(documents) {
  return { collection(collectionName) {
    return {
      doc(id) { return { async get() { return { id, exists: Boolean(documents[`${collectionName}/${id}`]) }; } }; },
      where(field, _operator, value) { return { limit() { return { async get() {
        return { forEach(callback) {
          for (const [docPath, data] of Object.entries(documents)) {
            if (docPath.startsWith(`${collectionName}/`) && data[field] === value) callback({ id: docPath.slice(collectionName.length + 1) });
          }
        } };
      } }; } }; },
    };
  } };
}

test("bare, spaced, mixed-case and barcode forms identify one AIS without dropping leading zeros", () => {
  for (const value of ["33551", "AIS33551", "ais33551", " AIS-33551 ", "aIs _33551"]) {
    assert.equal(normalizeItemAisValue(value), "AIS33551");
    assert.ok(getItemAisLookupValues(value).includes("33551"));
    assert.ok(getItemAisLookupValues(value).includes("AIS33551"));
  }
  assert.equal(normalizeItemAisValue("00404"), "AIS00404");
  assert.notEqual(normalizeItemAisValue("00404"), normalizeItemAisValue("404"));
  assert.equal(normalizeItemAisValue("AIS-B00047"), "AIS-B00047");
  assert.equal(normalizeItemAisValue("CUSTOM-ID"), "CUSTOM-ID");
});

test("new saves normalize but an ordinary legacy edit never silently moves documents", () => {
  assert.equal(resolveItemSaveIdentity("33551"), "AIS33551");
  assert.equal(resolveItemSaveIdentity("33551", "AIS33551"), "AIS33551");
  assert.equal(resolveItemSaveIdentity("AIS33551", "33551"), "33551");
  assert.equal(resolveItemSaveIdentity("", "33551"), "33551");
  assert.equal(resolveItemSaveIdentity("33552", "33551"), "AIS33552");
});

test("duplicate preflight sees canonical, numeric legacy and field-only aliases in both directions", async () => {
  for (const documents of [
    { "Test/AIS33551": { name: "Original" } },
    { "Test/33551": { name: "Legacy" } },
    { "Test/OTHER": { localSN: "33551" } },
    { "Test/OTHER": { local_sn: "AIS-33551" } },
    { "Test/OTHER": { aisNumber: "ais_33551" } },
  ]) {
    for (const value of ["33551", "AIS33551", "ais-33551"]) {
      assert.ok(await findExistingItemByAis(lookupDb(documents), value));
    }
  }
  const db = lookupDb({ "Test/AIS33551": { name: "Original" }, "Test/33551": { name: "Test" } });
  assert.equal((await findExistingItemByAis(db, "AIS33551", { ignoreDocId: "AIS33551" })).id, "33551");
  await assert.rejects(findExistingItemByAis({ collection() { throw new Error("offline"); } }, "33551"), /offline/);
});

test("archived aliases reserve new identities without making unrelated existing-original updates unavailable", async () => {
  const db = lookupDb({ "ArchivedItemIds/33551": { state: "archived" } });
  assert.equal(await isArchivedItemId(db, "AIS33551"), true);
  assert.equal(await isArchivedItemId(db, "AIS33551", { exactOnly: true }), false);
  assert.equal(await isArchivedItemId(db, "33551", { exactOnly: true }), true);
});

test("both item editors route create and rename identities through the shared resolver", () => {
  for (const relative of ["pages/NewSearch/AddItem/NewItem.js", "pages/NewSearch/item/[id]/index.js"]) {
    const source = fs.readFileSync(path.resolve(__dirname, "..", relative), "utf8");
    assert.match(source, /const newDocId = resolveItemSaveIdentity\(items\.localSN, docId\)/);
    assert.match(source, /const requestedDocId = resolveItemSaveIdentity\(items\.localSN\)/);
    assert.match(source, /isArchivedItemId\(db, docId, \{ exactOnly: true \}\)/);
  }
  const newItem = fs.readFileSync(path.resolve(__dirname, "../pages/NewSearch/AddItem/NewItem.js"), "utf8");
  assert.match(newItem, /const existingId = forceNew\s*\? null\s*: savedDocId \|\| committedDocIdRef\.current \|\| null;/);
  assert.doesNotMatch(newItem, /savedDocId \|\| committedDocIdRef\.current \|\| id/);
});
