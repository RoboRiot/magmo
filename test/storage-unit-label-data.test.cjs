const assert = require("node:assert/strict");
const test = require("node:test");

const {
  MAX_LABEL_ITEMS,
  buildItemLabelEntry,
  loadStorageUnitLabelPayload,
  uniqueSortedStorageIds,
} = require("../lib/inventory/storageUnitLabelData.cjs");

function nestedValue(value, field) {
  return String(field)
    .split(".")
    .reduce((current, segment) => current?.[segment], value);
}

function documentSnapshot(id, data) {
  return {
    id,
    exists: data != null,
    data: () => data || undefined,
  };
}

function fakeDatabase({ storageUnits = {}, items = {} } = {}) {
  const queries = [];
  const collections = { StorageUnits: storageUnits, Test: items };
  return {
    queries,
    collection(name) {
      const records = collections[name] || {};
      return {
        doc(id) {
          return {
            async get() {
              return documentSnapshot(id, records[id]);
            },
          };
        },
        where(field, operator, expected) {
          queries.push({ collection: name, field, operator, expected });
          return {
            async get() {
              const docs = Object.entries(records)
                .filter(([, data]) => {
                  const actual = nestedValue(data, field);
                  if (operator === "in") return expected.includes(actual);
                  if (operator === "==") return actual === expected;
                  throw new Error(`Unsupported fake query operator ${operator}`);
                })
                .map(([id, data]) => documentSnapshot(id, data));
              return { docs };
            },
          };
        },
      };
    },
  };
}

test("item label entries preserve the display name and prefer a recorded serial", () => {
  assert.deepEqual(
    buildItemLabelEntry({
      id: "AIS17704",
      name: " Pellet ",
      localSN: ["SN-10", "SN-11"],
    }),
    {
      item_id: "AIS17704",
      name: "Pellet",
      barcode_value: "SN-10, SN-11",
      ais_number: "AIS17704",
    }
  );
  assert.deepEqual(buildItemLabelEntry({ id: "legacy-7", serialCode: "X7" }), {
    item_id: "legacy-7",
    name: "Unnamed item",
    barcode_value: "X7",
    ais_number: "X7",
  });
});

test("storage ID lists canonicalize, de-duplicate, filter by type, and sort naturally", () => {
  assert.deepEqual(
    uniqueSortedStorageIds(
      ["B10", "B2", "AIS-B00002", "P3", "bad", "b-00001"],
      "bin"
    ),
    ["B1", "B2", "B10"]
  );
});

test("bin label data is derived from current and compatible legacy membership", async () => {
  const db = fakeDatabase({
    storageUnits: { B47: { type: "bin" } },
    items: {
      AIS20: {
        name: "Zeta detector",
        localSN: ["SN-Z"],
        newLocalCurrent: { bin: 47 },
      },
      AIS2: { name: "Alpha pellet", serialCode: "SER-2", bin: "47" },
      AIS3: { name: "Middle board", Bin: 47 },
      AIS4: {
        name: "Stale legacy association",
        bin: 47,
        newLocalCurrent: { bin: 99 },
      },
      AIS5: {
        name: "Current wins over duplicate legacy fields",
        bin: 47,
        Bin: 47,
        newLocalCurrent: { bin: "47" },
      },
      AIS6: { name: "Elsewhere", newLocalCurrent: { bin: 12 } },
    },
  });

  const payload = await loadStorageUnitLabelPayload({
    db,
    unitId: "AIS-B00047",
    publicOrigin: "https://inventory.example",
  });

  assert.equal(payload.template, "storage-unit-v2");
  assert.equal(payload.unit_id, "B47");
  assert.equal(payload.serial_id, "AIS-B00047");
  assert.equal(
    payload.qr_value,
    "https://inventory.example/NewSearch/inventory/storage/B47"
  );
  assert.deepEqual(payload.bins, []);
  assert.deepEqual(
    payload.items.map((item) => item.item_id),
    ["AIS2", "AIS5", "AIS3", "AIS20"]
  );
  assert.deepEqual(payload.items[0], {
    item_id: "AIS2",
    name: "Alpha pellet",
    barcode_value: "SER-2",
    ais_number: "AIS2",
  });
  assert.equal(payload.items.some((item) => item.item_id === "AIS4"), false);
  assert.deepEqual(
    db.queries.filter((query) => query.collection === "Test").map((query) => query.field),
    ["newLocalCurrent.bin", "bin", "Bin"]
  );
});

test("pallet label data combines linked and observed bins without listing items", async () => {
  const db = fakeDatabase({
    storageUnits: {
      P65: { type: "pallet" },
      B2: { type: "bin", parentPalletId: "P65" },
      B3: { type: "bin", parentPalletId: "P65" },
      B99: { type: "bin", parentPalletId: "P99" },
    },
    items: {
      AIS10: { newLocalCurrent: { pallet: 65, bin: 2 } },
      AIS11: { newLocalCurrent: { pallet: "65", bin: 10 } },
      AIS12: { pallet: 65 },
      AIS13: { pallet: 65, newLocalCurrent: { pallet: 66, bin: 50 } },
    },
  });

  const payload = await loadStorageUnitLabelPayload({ db, unitId: "P65" });

  assert.deepEqual(payload.items, []);
  assert.deepEqual(payload.bins, [
    { unit_id: "B2", display_id: "B2", serial_id: "AIS-B00002" },
    { unit_id: "B3", display_id: "B3", serial_id: "AIS-B00003" },
    { unit_id: "B10", display_id: "B10", serial_id: "AIS-B00010" },
  ]);
  assert.ok(
    db.queries.some(
      (query) =>
        query.collection === "StorageUnits" &&
        query.field === "parentPalletId" &&
        query.operator === "==" &&
        query.expected === "P65"
    )
  );
});

test("label data rejects unavailable, missing, and oversized records safely", async () => {
  await assert.rejects(
    loadStorageUnitLabelPayload({ unitId: "B47" }),
    (error) => error.code === "database_unavailable" && error.statusCode === 503
  );
  await assert.rejects(
    loadStorageUnitLabelPayload({ db: fakeDatabase(), unitId: "B47" }),
    (error) => error.code === "storage_unit_not_found" && error.statusCode === 404
  );

  const items = Object.fromEntries(
    Array.from({ length: MAX_LABEL_ITEMS + 1 }, (_, index) => [
      `AIS${index + 1}`,
      { name: `Item ${index + 1}`, newLocalCurrent: { bin: 47 } },
    ])
  );
  await assert.rejects(
    loadStorageUnitLabelPayload({
      db: fakeDatabase({ storageUnits: { B47: {} }, items }),
      unitId: "B47",
    }),
    (error) =>
      error.code === "storage_label_too_many_items" && error.statusCode === 409
  );
});
