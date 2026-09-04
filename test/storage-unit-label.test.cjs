const assert = require("node:assert/strict");
const test = require("node:test");

const {
  renderStorageUnitLabelSymbols,
} = require("../lib/inventory/storageUnitLabel.cjs");

test("renders a phone URL QR and canonical storage serial Code 128", () => {
  const result = renderStorageUnitLabelSymbols("b-0047");
  assert.equal(result.payload.unit_id, "B47");
  assert.equal(
    result.payload.qr_value,
    "https://magmo.cloud/NewSearch/inventory/storage/B47"
  );
  assert.equal(result.payload.barcode_value, "AIS-B00047");
  assert.equal(result.payload.serial_id, "AIS-B00047");
  assert.equal(result.payload.barcode_format, "CODE128");
  assert.match(result.qrSvg, /^<svg /);
  assert.match(result.barcodeSvg, /^<svg /);
  assert.notEqual(result.qrSvg, result.barcodeSvg);
});

test("renders one serial barcode per bin item from an enriched payload", () => {
  const result = renderStorageUnitLabelSymbols({
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
    items: [
      {
        item_id: "AIS17704",
        name: "Pellet",
        barcode_value: "SN-12345",
        ais_number: "AIS17704",
      },
      {
        item_id: "AIS17705",
        name: "Detector",
        barcode_value: "AIS17705",
        ais_number: "AIS17705",
      },
    ],
    bins: [],
  });

  assert.deepEqual(
    result.itemBarcodeSvgs.map((entry) => entry.itemId),
    ["AIS17704", "AIS17705"]
  );
  for (const entry of result.itemBarcodeSvgs) {
    assert.match(entry.svg, /^<svg /);
  }
});

test("renders a pallet label with its numeric display value", () => {
  const result = renderStorageUnitLabelSymbols("P65");
  assert.equal(result.payload.storage_unit_type, "pallet");
  assert.equal(result.payload.display_number, "65");
  assert.match(result.qrSvg, /viewBox=/);
  assert.match(result.barcodeSvg, /viewBox=/);
});

test("refuses zero and regular-item IDs", () => {
  assert.throws(() => renderStorageUnitLabelSymbols("P0"), /positive bin or pallet/i);
  assert.throws(() => renderStorageUnitLabelSymbols("AIS17704"), /positive bin or pallet/i);
});
