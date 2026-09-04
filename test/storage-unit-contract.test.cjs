const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const {
  buildStorageUnitLabelPayload,
  buildStorageUnitRoute,
  buildStorageUnitSerialId,
  isReservedStorageUnitId,
  normalizeStorageUnitId,
  parseStorageUnitId,
  resolveScanDestination,
} = require("../lib/inventory/storageUnitContract.cjs");

test("storage unit IDs normalize to an uppercase unpadded canonical ID", () => {
  assert.equal(normalizeStorageUnitId("B47"), "B47");
  assert.equal(normalizeStorageUnitId(" b-0047 "), "B47");
  assert.equal(normalizeStorageUnitId("p_0065"), "P65");
  assert.equal(normalizeStorageUnitId("AIS-B00047"), "B47");
  assert.equal(normalizeStorageUnitId("ais_p-00065"), "P65");
  assert.equal(buildStorageUnitSerialId("B47"), "AIS-B00047");
  assert.equal(buildStorageUnitSerialId("AIS-P00065"), "AIS-P00065");
  assert.deepEqual(parseStorageUnitId("P65"), {
    id: "P65",
    serialId: "AIS-P00065",
    prefix: "P",
    type: "pallet",
    number: 65,
    displayNumber: "65",
    canCreateOrPrint: true,
  });
});

test("zero, out-of-range, and malformed IDs cannot be created or printed", () => {
  for (const value of [
    "",
    "P0",
    "B0",
    "P-",
    "P1.5",
    "X47",
    "B/47",
    "B100000",
    "AIS17704",
  ]) {
    assert.equal(normalizeStorageUnitId(value), "", value);
  }

  assert.equal(isReservedStorageUnitId("P0"), true);
  assert.equal(isReservedStorageUnitId("B0"), true);
  assert.equal(isReservedStorageUnitId("AIS47"), false);
  assert.equal(
    parseStorageUnitId("P0", { allowZero: true })?.canCreateOrPrint,
    false
  );
});

test("storage scans route to storage details while item scans keep the item route", () => {
  assert.deepEqual(resolveScanDestination("B47"), {
    kind: "storage-unit",
    id: "B47",
    storageUnit: {
      id: "B47",
      serialId: "AIS-B00047",
      prefix: "B",
      type: "bin",
      number: 47,
      displayNumber: "47",
      canCreateOrPrint: true,
    },
    destination: "/NewSearch/inventory/storage/B47",
  });
  assert.equal(
    resolveScanDestination(" p-0065 ").destination,
    "/NewSearch/inventory/storage/P65"
  );
  assert.deepEqual(resolveScanDestination("AIS-B00047"), {
    kind: "storage-unit",
    id: "B47",
    storageUnit: {
      id: "B47",
      serialId: "AIS-B00047",
      prefix: "B",
      type: "bin",
      number: 47,
      displayNumber: "47",
      canCreateOrPrint: true,
    },
    destination: "/NewSearch/inventory/storage/B47",
  });
  assert.equal(
    resolveScanDestination("P0").destination,
    "/NewSearch/inventory/storage/P0"
  );
  assert.equal(
    resolveScanDestination("AIS17704").destination,
    "/NewSearch/item/AIS17704"
  );
  assert.equal(
    resolveScanDestination("11255").destination,
    "/NewSearch/item/11255"
  );
  assert.equal(
    resolveScanDestination("legacy item").destination,
    "/NewSearch/item/legacy%20item"
  );
  assert.equal(resolveScanDestination("Not%20Found"), null);
  assert.equal(resolveScanDestination("No result"), null);
  assert.equal(buildStorageUnitRoute("not-a-unit"), "");
});

test("storage label payload is fully derived from the canonical unit ID", () => {
  assert.deepEqual(buildStorageUnitLabelPayload(" b-0047 "), {
    template: "storage-unit-v2",
    label_type: "storage_unit",
    storage_unit_type: "bin",
    unit_id: "B47",
    display_number: "47",
    local_sn: "AIS-B00047",
    serial_id: "AIS-B00047",
    qr_value: "https://magmo.cloud/NewSearch/inventory/storage/B47",
    barcode_value: "AIS-B00047",
    barcode_format: "CODE128",
  });
  assert.deepEqual(buildStorageUnitLabelPayload("P65"), {
    template: "storage-unit-v2",
    label_type: "storage_unit",
    storage_unit_type: "pallet",
    unit_id: "P65",
    display_number: "65",
    local_sn: "AIS-P00065",
    serial_id: "AIS-P00065",
    qr_value: "https://magmo.cloud/NewSearch/inventory/storage/P65",
    barcode_value: "AIS-P00065",
    barcode_format: "CODE128",
  });

  assert.equal(
    buildStorageUnitLabelPayload("B47", {
      publicOrigin: "https://inventory.example/path-is-discarded",
    }).qr_value,
    "https://inventory.example/NewSearch/inventory/storage/B47"
  );
  assert.equal(
    buildStorageUnitLabelPayload("B47", {
      publicOrigin: "http://insecure.example",
    }).qr_value,
    "https://magmo.cloud/NewSearch/inventory/storage/B47"
  );
});

test("storage label payload rejects zero, item IDs, and command-like input", () => {
  for (const value of ["P0", "B0", "AIS17704", "B47^XA", "../B47"]) {
    assert.throws(
      () => buildStorageUnitLabelPayload(value),
      (error) =>
        error instanceof TypeError && error.code === "invalid_storage_unit_id",
      value
    );
  }
});

test("warehouse scanning locks after one result and stops the camera before navigation", () => {
  const source = fs.readFileSync(
    path.join(__dirname, "..", "pages", "Warehousedb", "WarehouseScan.js"),
    "utf8"
  );
  assert.match(source, /scanLockedRef\.current\s*=\s*true/);
  assert.match(source, /stopStream=\{!scanning\}/);
  assert.match(source, /router\.push\(resolved\.destination\)/);
  assert.doesNotMatch(source, /readQR\(data\)/);
});

test("regular item saves reserve B/P IDs and item URLs redirect storage IDs", () => {
  const itemDetailSource = fs.readFileSync(
    path.join(
      __dirname,
      "..",
      "pages",
      "NewSearch",
      "item",
      "[id]",
      "index.js"
    ),
    "utf8"
  );
  const addItemSource = fs.readFileSync(
    path.join(__dirname, "..", "pages", "NewSearch", "AddItem", "NewItem.js"),
    "utf8"
  );

  for (const source of [itemDetailSource, addItemSource]) {
    assert.match(source, /isReservedStorageUnitId/);
    assert.match(source, /assertRegularItemId\(newDocId\)/);
    assert.match(source, /assertRegularItemId\(docId\)/);
  }
  assert.match(
    itemDetailSource,
    /const storageUnitRoute = buildStorageUnitRoute\(id\)/
  );
});

test("inventory storage rows use canonical document IDs and map links request current membership", () => {
  const inventorySource = fs.readFileSync(
    path.join(
      __dirname,
      "..",
      "pages",
      "NewSearch",
      "inventory",
      "inventoryManage.js"
    ),
    "utf8"
  );
  const localLocationSource = fs.readFileSync(
    path.join(
      __dirname,
      "..",
      "pages",
      "NewSearch",
      "item",
      "[id]",
      "NewLocal.js"
    ),
    "utf8"
  );

  assert.match(inventorySource, /parseStorageUnitId\(documentId\)/);
  assert.match(inventorySource, /documentId !== parsedUnit\.id/);
  assert.match(localLocationSource, /palletLocationScope", "current"/);
  assert.match(localLocationSource, /binLocationScope", "current"/);
});
