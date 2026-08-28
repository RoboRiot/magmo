const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const {
  buildStorageUnitPhotoPath,
  getMembershipEqualityValues,
  getParentPalletSummary,
  getStorageLocationSummary,
  groupPalletContents,
  mergeCurrentAndLegacyMembershipRecords,
  normalizeStorageName,
  normalizeStorageUnitId,
  storageUnitNumber,
  storageUnitType,
} = require("../lib/inventory/storageUnitDetail.cjs");

test("storage detail uses canonical B/P IDs and numeric plus string membership values", () => {
  assert.equal(normalizeStorageUnitId(" b-0047 "), "B47");
  assert.equal(normalizeStorageUnitId("p_065"), "P65");
  assert.equal(normalizeStorageUnitId("P0"), "");
  assert.equal(normalizeStorageUnitId("AIS47"), "");
  assert.equal(storageUnitType("B47"), "bin");
  assert.equal(storageUnitType("P65"), "pallet");
  assert.equal(storageUnitNumber("P65"), 65);
  assert.deepEqual(getMembershipEqualityValues("B47"), [47, "47"]);
});

test("storage-unit photo paths cannot escape their exact unit folder", () => {
  assert.equal(
    buildStorageUnitPhotoPath("b47", "171234-photo.jpg"),
    "StorageUnits/B47/171234-photo.jpg"
  );
  for (const invalidName of [
    "",
    ".",
    "..",
    "../P65/photo.jpg",
    "nested/photo.jpg",
    "nested\\photo.jpg",
    "bad\0name.jpg",
  ]) {
    assert.equal(normalizeStorageName(invalidName), "");
    assert.equal(buildStorageUnitPhotoPath("B47", invalidName), "");
  }
  assert.equal(buildStorageUnitPhotoPath("../B47", "photo.jpg"), "");
});

test("one observed current location is shown without mutating the storage record", () => {
  const summary = getStorageLocationSummary({}, [
    {
      newLocalCurrent: {
        region: "B",
        section: { letter: "D", number: 5 },
      },
    },
    {
      newLocalCurrent: {
        region: "B",
        section: "D5",
      },
    },
  ]);
  assert.equal(summary.status, "observed");
  assert.equal(summary.location.label, "B - D5");
  assert.equal(summary.candidates.length, 1);
});

test("an unrelated entity review does not hide a confirmed warehouse location", () => {
  const result = getStorageLocationSummary({
    warehouseLocation: {
      region: "B",
      section: { letter: "D", number: 5 },
    },
    locationStatus: "confirmed",
    reviewRequired: true,
    reviewReasons: ["excluded_parent_pallet_zero"],
  });

  assert.equal(result.status, "confirmed");
  assert.equal(result.location.label, "B - D5");
});

test("conflicting P65 positions remain review candidates instead of becoming consensus", () => {
  const summary = getStorageLocationSummary(
    {
      locationStatus: "review_required",
      locationCandidates: [
        { region: "F", section: { letter: "C", number: 12 } },
        { region: "F", section: { letter: "C", number: 14 } },
      ],
    },
    [
      {
        newLocalCurrent: {
          region: "F",
          section: { letter: "E", number: 14 },
        },
      },
    ]
  );
  assert.equal(summary.status, "review_required");
  assert.equal(summary.location, null);
  assert.deepEqual(
    summary.candidates.map((candidate) => candidate.label),
    ["F - C12", "F - C14", "F - E14"]
  );
});

test("bin parent pallets are normalized and conflicts remain review-only", () => {
  const confirmed = getParentPalletSummary(
    { parentPalletId: "P65" },
    [
      { newLocalCurrent: { pallet: 65 } },
      { newLocalCurrent: { pallet: "65" } },
    ]
  );
  assert.equal(confirmed.status, "confirmed");
  assert.equal(confirmed.parentPalletId, "P65");

  const conflict = getParentPalletSummary({}, [
    { newLocalCurrent: { pallet: 45 } },
    { newLocalCurrent: { pallet: "54" } },
  ]);
  assert.equal(conflict.status, "review_required");
  assert.equal(conflict.parentPalletId, "");
  assert.deepEqual(conflict.candidates, ["P45", "P54"]);

  const storedReview = getParentPalletSummary(
    {
      parentStatus: "review_required",
      parentCandidates: [
        { parentPalletId: "P96", itemCount: 7 },
        { parentPalletId: "P54", itemCount: 11 },
      ],
    },
    []
  );
  assert.equal(storedReview.status, "review_required");
  assert.deepEqual(storedReview.candidates, ["P54", "P96"]);
});

test("pallet contents keep direct items and group bin items by canonical bin", () => {
  const direct = { id: "AIS1", newLocalCurrent: { pallet: 65 } };
  const numericBin = {
    id: "AIS2",
    newLocalCurrent: { pallet: "65", bin: 47 },
  };
  const stringBin = {
    id: "AIS3",
    newLocalCurrent: { pallet: 65, bin: "47" },
  };
  const grouped = groupPalletContents([stringBin, direct, numericBin]);
  assert.deepEqual(grouped.directItems.map((item) => item.id), ["AIS1"]);
  assert.deepEqual(grouped.bins.map((bin) => bin.id), ["B47"]);
  assert.deepEqual(
    grouped.bins[0].items.map((item) => item.id),
    ["AIS3", "AIS2"]
  );
  assert.equal(grouped.allItems.length, 3);
});

test("legacy current-membership fallbacks do not override current data", () => {
  const result = mergeCurrentAndLegacyMembershipRecords({
    currentRecords: [
      { id: "current", newLocalCurrent: { bin: 47 } },
    ],
    legacyLowerRecords: [
      { id: "lower", bin: "47", newLocalCurrent: {} },
      { id: "stale", bin: 47, newLocalCurrent: { bin: 12 } },
    ],
    legacyUpperRecords: [
      { id: "upper", Bin: 47, newLocalCurrent: {} },
      { id: "lower-wins", bin: 12, Bin: 47, newLocalCurrent: {} },
    ],
    membershipField: "bin",
  });

  assert.deepEqual(
    result.map((record) => record.id).sort(),
    ["current", "lower", "upper"]
  );
});

test("storage detail reads current membership, retains hidden records, and prints only by ID", () => {
  const source = fs.readFileSync(
    path.join(
      __dirname,
      "..",
      "pages",
      "NewSearch",
      "inventory",
      "storage",
      "[id].js"
    ),
    "utf8"
  );
  assert.match(source, /newLocalCurrent\.bin/);
  assert.match(source, /newLocalCurrent\.pallet/);
  assert.match(source, /legacyUpperLocationField/);
  assert.doesNotMatch(source, /newLocalFrom/);
  assert.match(source, /hidden:\s*data\.visible\s*===\s*false/);
  assert.doesNotMatch(source, /visible\s*!==\s*false/);
  assert.match(source, /JSON\.stringify\(\{\s*unitId\s*\}\)/);
  assert.match(source, /params\.set\("binLocationScope", "current"\)/);
  assert.match(source, /params\.set\("palletLocationScope", "current"\)/);
});
