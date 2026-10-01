const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const parser = require("@babel/parser");
const subject = require("../lib/items/itemIdentitySearch.cjs");

function fakeCollection(records, reads = []) {
  class Query {
    constructor({ filters = [], lower = null, upper = null, cursor = null, limit = Infinity } = {}) {
      Object.assign(this, { filters, lower, upper, cursor, batchLimit: limit });
    }
    next(overrides) { return new Query({ filters: this.filters, lower: this.lower, upper: this.upper,
      cursor: this.cursor, limit: this.batchLimit, ...overrides }); }
    orderBy() { return this; }
    where(field, operator, value) { return this.next({ filters: [...this.filters, { field, operator, value }] }); }
    startAt(lower) { return this.next({ lower }); }
    endAt(upper) { return this.next({ upper }); }
    startAfter(cursor) { return this.next({ cursor: cursor.id || cursor }); }
    limit(limit) { return this.next({ limit }); }
    async get() {
      reads.push(this);
      const docs = records.filter((record) =>
        (!this.cursor || record.id > this.cursor) && (!this.lower || record.id >= this.lower)
        && (!this.upper || record.id <= this.upper)
        && this.filters.every(({ field, operator, value }) => {
          if (operator === "in") return value.includes(record[field]);
          if (operator === "==") return record[field] === value;
          throw new Error(`Unexpected operator ${operator}`);
        })
      ).sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0).slice(0, this.batchLimit)
        .map((record) => ({ id: record.id, data: () => ({ ...record }) }));
      return { docs, size: docs.length };
    }
  }
  return new Query();
}

test("AIS matching preserves zeros and accepts equivalent input without conflating arbitrary IDs", () => {
  assert.equal(subject.aisSearchPrefix(" ais-00404 "), "AIS00404");
  assert.equal(subject.aisSearchPrefix("404"), "AIS404");
  for (const value of ["B33551", "33551-other", "AIS33551/test", ""]) assert.equal(subject.aisSearchPrefix(value), "");
  assert.equal(subject.itemMatchesAisSearch({ id: "33551" }, "AIS33551"), true);
  assert.equal(subject.itemMatchesAisSearch({ id: "AIS33551" }, "33551"), true);
  assert.equal(subject.itemMatchesAisSearch({ id: "other", aisNumber: "ais_33551" }, "33551"), true);
  assert.equal(subject.itemMatchesAisSearch({ id: "AIS00404" }, "404"), false);
});

test("identity union deduplicates by actual document ID only, not normalized AIS", async () => {
  const reads = [];
  const collection = fakeCollection([
    { id: "33551", name: "test", localSN: "33551" },
    { id: "AIS33551", name: "original", localSN: "AIS33551" },
    { id: "AIS33552", name: "other" },
  ], reads);
  const queries = subject.buildItemAisSearchQueries({ collection, documentId: "id", value: "AIS33551", limit: 26 });
  const docs = subject.mergeItemIdentitySnapshots(await Promise.all(queries.map((query) => query.get())));
  assert.deepEqual(docs.map((doc) => [doc.id, doc.data().name]), [["33551", "test"], ["AIS33551", "original"]]);
  assert.ok(reads.every((query) => query.batchLimit === 26));
  assert.ok(reads.every((query) => query.upper || query.filters.length));
});

const inventoryPath = path.resolve(__dirname, "../pages/NewSearch/inventory/inventoryManage.js");
const inventorySource = fs.readFileSync(inventoryPath, "utf8");
const inventoryAst = parser.parse(inventorySource, { sourceType: "module", plugins: ["jsx"] });
const inventoryFunctionNames = new Set(["normalizeLocation", "mapItemDocument", "getFirestoreEqualityValues",
  "locationValueMatches", "itemMatchesInventoryFilters", "buildInventoryQueryPlan", "fetchUnionInventoryPage"]);
const inventoryFunctions = inventoryAst.program.body.filter((node) =>
  node.type === "FunctionDeclaration" && inventoryFunctionNames.has(node.id.name)
).map((node) => inventorySource.slice(node.start, node.end)).join("\n");

for (const input of ["33551", "AIS33551", "ais-33551"]) {
  test(`actual Inventory Manager query and filter reveal every exact identity record for ${input}`, async () => {
    const records = [
      { id: "33551", name: "test", localSN: "33551" },
      { id: "AIS33551", name: "original", localSN: "AIS33551" },
      { id: "legacy-aisNumber", name: "legacy alias", aisNumber: "AIS33551" },
      { id: "legacy-local_sn", name: "secondary alias", localSN: "different", local_sn: "AIS33551" },
      { id: "hidden", name: "hidden duplicate", localSN: "AIS33551", visible: false },
      { id: "AIS33552", name: "unrelated", localSN: "AIS33552" },
    ];
    const collection = fakeCollection(records);
    const context = vm.createContext({ ...subject, Map, Set,
      firebase: { firestore: { FieldPath: { documentId: () => "id" } } },
      getRefId: (value) => value?.id || value || "",
      naturalCollator: new Intl.Collator(undefined, { numeric: true, sensitivity: "base" }),
    });
    vm.runInContext(inventoryFunctions, context);
    const filters = { localSN: input };
    const plan = context.buildInventoryQueryPlan({ collection: () => collection }, filters);
    assert.equal(plan.label, "local-sn-canonical-and-legacy");
    const result = await context.fetchUnionInventoryPage({ queries: plan.queries, filters, page: 1, pageSize: 25 });
    assert.deepEqual(Array.from(result.items, (item) => item.id), ["33551", "AIS33551", "legacy-aisNumber", "legacy-local_sn"]);
    assert.equal(result.totalMatches, 4);
    assert.equal(result.hasNextPage, false);
    const secondPage = await context.fetchUnionInventoryPage({ queries: plan.queries, filters, page: 2, pageSize: 1 });
    assert.deepEqual(Array.from(secondPage.items, (item) => item.id), ["AIS33551"]);
  });
}
