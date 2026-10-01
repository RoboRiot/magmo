const assert = require("node:assert/strict");
const path = require("node:path");
const Module = require("node:module");
const test = require("node:test");
const babel = require("@babel/core");

function loadSource(relativePath, overrides = {}) {
  const filename = path.resolve(__dirname, "..", relativePath);
  const loaded = new Module(filename, module);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(path.dirname(filename));
  const originalRequire = loaded.require.bind(loaded);
  loaded.require = (request) =>
    Object.hasOwn(overrides, request) ? overrides[request] : originalRequire(request);
  loaded._compile(babel.transformFileSync(filename, {
    babelrc: false,
    configFile: false,
    presets: [require.resolve("@babel/preset-env")],
  }).code, filename);
  return loaded.exports;
}

const searchHelpers = loadSource("utils/itemFormShared.js");
const associations = loadSource("utils/warehouseAssociations.js");

function makeHarness(records, { onGet, allowCollectionScans = false } = {}) {
  const reads = [];
  class DocumentReference {}
  class Query {
    constructor(collection, filters = [], cursor = null, limit = Infinity, lower = null, upper = null) {
      Object.assign(this, { collection, filters, cursor, batchLimit: limit, lower, upper });
    }
    where(field, operator, value) {
      return new Query(this.collection, [...this.filters, { field, operator, value }], this.cursor, this.batchLimit, this.lower, this.upper);
    }
    orderBy() { return this; }
    select() { return this; }
    startAfter(cursor) {
      return new Query(this.collection, this.filters, cursor.id || cursor, this.batchLimit, this.lower, this.upper);
    }
    startAt(lower) {
      return new Query(this.collection, this.filters, this.cursor, this.batchLimit, lower, this.upper);
    }
    endAt(upper) {
      return new Query(this.collection, this.filters, this.cursor, this.batchLimit, this.lower, upper);
    }
    limit(limit) {
      return new Query(this.collection, this.filters, this.cursor, limit, this.lower, this.upper);
    }
    doc(id) { return Object.assign(new DocumentReference(), { id, path: `${this.collection}/${id}` }); }
    async get() {
      reads.push({ collection: this.collection, filters: this.filters, cursor: this.cursor, lower: this.lower, upper: this.upper });
      if (this.collection === "Test" && !this.filters.length && !this.upper && !allowCollectionScans) {
        throw new Error("Unexpected full inventory scan");
      }
      onGet?.(reads.at(-1), reads.length);
      const docs = (this.collection === "Test" ? records : [])
        .filter((item) => !this.cursor || item.id > this.cursor)
        .filter((item) => !this.lower || item.id >= this.lower)
        .filter((item) => !this.upper || item.id <= this.upper)
        .filter((item) => this.filters.every(({ field, operator, value }) => {
          const actual = item[field];
          if (operator === "array-contains") return actual?.includes(value);
          if (operator === "array-contains-any") return actual?.some((token) => value.includes(token));
          if (operator === "==") return actual === value;
          if (operator === "in") return value.includes(actual);
          throw new Error(`Unsupported test operator: ${operator}`);
        }))
        .sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
        .slice(0, this.batchLimit)
        .map((item) => ({ id: item.id, data: () => ({ ...item }) }));
      return { docs, empty: !docs.length, size: docs.length, forEach: (fn) => docs.forEach(fn) };
    }
  }
  const db = { collection: (name) => new Query(name) };
  const firestore = Object.assign(() => db, {
    DocumentReference,
    FieldPath: { documentId: () => "id" },
  });
  const { fetchPartsWithMachineDataPage } = loadSource("utils/fetchAssociations.js", {
    "../context/Firebase": { firestore },
    "./warehouseAssociations": associations,
  });
  return { fetchPartsWithMachineDataPage, reads };
}

function indexedItem(id, name, extra = {}) {
  const item = { id, name, visible: true, ...extra };
  return {
    ...item,
    nameTokens: searchHelpers.buildNameTokens(name),
    generalSearchTokens: searchHelpers.buildGeneralSearchTokens(item, id),
  };
}

function options(type, term, extra = {}) {
  return {
    search: { type, raw: term, lower: term.toLowerCase() },
    visibleOnly: true,
    needsMachineData: false,
    allowLegacyScanFallback: false,
    filterFn: (item) => searchHelpers.itemMatchesGeneralSearch(item, term),
    ...extra,
  };
}

for (const type of ["Name", "General"]) {
  test(`${type}: IRF3 with no indexed matches returns empty without reading the inventory`, async () => {
    const { fetchPartsWithMachineDataPage, reads } = makeHarness(
      Array.from({ length: 3405 }, (_, i) => indexedItem(`AIS${i}`, "RF coil"))
    );
    const result = await fetchPartsWithMachineDataPage(options(type, "IRF3"));
    assert.deepEqual(result.parts, []);
    assert.equal(result.hasNextPage, false);
    assert.equal(result.debug.scannedDocs, 0);
    assert.equal(reads.length, type === "General" ? 2 : 1);
  });
}

test("General retains the legacy name-token query without falling back to a full scan", async () => {
  const item = indexedItem("AIS1", "IRF3 module");
  delete item.generalSearchTokens;
  const { fetchPartsWithMachineDataPage, reads } = makeHarness([item]);
  const result = await fetchPartsWithMachineDataPage(options("General", "IRF3"));
  assert.deepEqual(result.parts.map((part) => part.id), ["AIS1"]);
  assert.equal(reads.length, 2);
  assert.equal(reads[1].filters[0].field, "nameTokens");
});

test("indexed matches preserve visibility, multiple terms, and pagination", async () => {
  const { fetchPartsWithMachineDataPage } = makeHarness([
    indexedItem("AIS1", "IRF3 module", { visible: false }),
    indexedItem("AIS2", "IRF3 coil"),
    indexedItem("AIS3", "IRF3 module"),
    indexedItem("AIS4", "IRF3 module"),
    indexedItem("AIS5", "IRF3 module"),
  ]);
  const first = await fetchPartsWithMachineDataPage(options("General", "IRF3 module", { pageSize: 2 }));
  assert.deepEqual(first.parts.map((part) => part.id), ["AIS3", "AIS4"]);
  assert.equal(first.hasNextPage, true);
  const second = await fetchPartsWithMachineDataPage(options("General", "IRF3 module", {
    pageSize: 2, startAfterDoc: first.lastDoc,
  }));
  assert.deepEqual(second.parts.map((part) => part.id), ["AIS5"]);
  assert.equal(second.hasNextPage, false);
});

test("an exact batch of hidden matches does not restart as a collection scan", async () => {
  const { fetchPartsWithMachineDataPage, reads } = makeHarness(
    Array.from({ length: 26 }, (_, i) => indexedItem(`AIS${String(i).padStart(3, "0")}`, "IRF3", { visible: false }))
  );
  const result = await fetchPartsWithMachineDataPage(options("General", "IRF3"));
  assert.deepEqual(result.parts, []);
  assert.equal(result.hasNextPage, false);
  assert.equal(reads.length, 2);
  assert.ok(reads.every((read) => read.filters[0].field === "generalSearchTokens"));
});

test("legacy collection scanning remains explicitly available to other callers", async () => {
  const { fetchPartsWithMachineDataPage } = makeHarness([
    { id: "AIS1", name: "IRF3", visible: true },
  ], { allowCollectionScans: true });
  const result = await fetchPartsWithMachineDataPage(options("General", "IRF3", { allowLegacyScanFallback: true }));
  assert.deepEqual(result.parts.map((part) => part.id), ["AIS1"]);
  assert.equal(result.debug.searchMode, "scan-fallback");
});

test("an already canceled search makes no reads", async () => {
  const controller = new AbortController();
  controller.abort();
  const { fetchPartsWithMachineDataPage, reads } = makeHarness([]);
  await assert.rejects(fetchPartsWithMachineDataPage(options("General", "IRF3", { signal: controller.signal })), { name: "AbortError" });
  assert.equal(reads.length, 0);
});

test("canceling an index request stops the fallback query", async () => {
  const controller = new AbortController();
  const { fetchPartsWithMachineDataPage, reads } = makeHarness([], {
    onGet: () => controller.abort(),
  });
  await assert.rejects(fetchPartsWithMachineDataPage(options("General", "IRF3", { signal: controller.signal })), { name: "AbortError" });
  assert.equal(reads.length, 1);
});

test("canceling during client lookup stops further machine and item queries", async () => {
  const controller = new AbortController();
  const { fetchPartsWithMachineDataPage, reads } = makeHarness([], {
    onGet: () => controller.abort(),
  });
  await assert.rejects(fetchPartsWithMachineDataPage(options("General", "IRF3", {
    selectedClientFrom: "cancel-client", signal: controller.signal,
  })), { name: "AbortError" });
  assert.equal(reads.length, 1);
  assert.equal(reads[0].collection, "Machine");
});

for (const value of ["33551", "AIS33551", "ais-33551"]) {
  test(`SKU ${value}: preserve separate canonical and legacy records with bounded lookups`, async () => {
    const { itemMatchesAisSearch } = require("../lib/items/itemIdentitySearch.cjs");
    const { fetchPartsWithMachineDataPage, reads } = makeHarness([
      indexedItem("33551", "test", { localSN: "33551" }),
      indexedItem("AIS33551", "Original gantry", { localSN: "AIS33551" }),
      indexedItem("AIS33552", "Other item", { localSN: "AIS33552" }),
      indexedItem("legacy-alias-record", "Legacy alias", { local_sn: "AIS33551" }),
    ]);
    const result = await fetchPartsWithMachineDataPage(options("SKU", value, {
      filterFn: (item) => itemMatchesAisSearch(item, value),
    }));
    assert.deepEqual(result.parts.map((part) => part.id), ["33551", "AIS33551", "legacy-alias-record"]);
    assert.equal(result.parts.find((part) => part.id === "33551").name, "test");
    assert.equal(result.parts.find((part) => part.id === "AIS33551").name, "Original gantry");
    assert.ok(reads.every((read) => read.filters.length || read.upper), "No inventory-wide scans");
    assert.equal(result.hasNextPage, false);
  });
}

test("SKU union pagination never reintroduces lower AIS records after a numeric legacy cursor", async () => {
  const { itemMatchesAisSearch } = require("../lib/items/itemIdentitySearch.cjs");
  const { fetchPartsWithMachineDataPage } = makeHarness([
    indexedItem("33551", "test"),
    indexedItem("AIS00001", "Must never enter this prefix query"),
    indexedItem("AIS33551", "Original"),
    indexedItem("AIS33551001", "Longer ID"),
  ]);
  const base = options("SKU", "33551", { pageSize: 1, filterFn: (item) => itemMatchesAisSearch(item, "33551") });
  const first = await fetchPartsWithMachineDataPage(base);
  assert.deepEqual(first.parts.map((part) => part.id), ["33551"]);
  assert.equal(first.hasNextPage, true);
  const second = await fetchPartsWithMachineDataPage({ ...base, startAfterDoc: first.lastDoc });
  assert.deepEqual(second.parts.map((part) => part.id), ["AIS33551"]);
  const third = await fetchPartsWithMachineDataPage({ ...base, startAfterDoc: second.lastDoc });
  assert.deepEqual(third.parts.map((part) => part.id), ["AIS33551001"]);
  assert.equal(third.hasNextPage, false);
});

test("SKU exact input retains all digits and respects visibility and other filters", async () => {
  const { itemMatchesAisSearch } = require("../lib/items/itemIdentitySearch.cjs");
  const { fetchPartsWithMachineDataPage } = makeHarness([
    indexedItem("AIS33551111", "Wrong long ID"),
    indexedItem("AIS33551222", "Wanted long ID"),
    indexedItem("33551222", "Hidden legacy", { visible: false }),
    indexedItem("legacy-filtered", "Wrong site", { localSN: "AIS33551222", clientFromId: "wrong" }),
  ]);
  const result = await fetchPartsWithMachineDataPage(options("SKU", "33551222", {
    filterFn: (item) => !item.clientFromId && itemMatchesAisSearch(item, "33551222"),
  }));
  assert.deepEqual(result.parts.map((part) => part.id), ["AIS33551222"]);
});

test("General bare AIS digits already find the indexed numeric legacy record without a search rewrite", async () => {
  const item = indexedItem("33551", "test", { localSN: "33551", local_sn: "33551" });
  assert.ok(item.generalSearchTokens.includes("33551"));
  assert.equal(searchHelpers.itemMatchesGeneralSearch(item, "33551"), true);
  const { fetchPartsWithMachineDataPage, reads } = makeHarness([item, indexedItem("AIS91557", "Original gantry")]);
  const result = await fetchPartsWithMachineDataPage(options("General", "33551"));
  assert.deepEqual(result.parts.map((part) => part.id), ["33551"]);
  assert.deepEqual(reads.map((read) => read.filters[0].field), ["generalSearchTokens"]);
});
