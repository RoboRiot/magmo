const assert = require("node:assert/strict");
const test = require("node:test");

const {
  renderStorageUnitLabelSymbols,
} = require("../lib/inventory/storageUnitLabel.cjs");

test("renders a QR and Code 128 from the same canonical bin ID", () => {
  const result = renderStorageUnitLabelSymbols("b-0047");
  assert.equal(result.payload.unit_id, "B47");
  assert.equal(result.payload.qr_value, "B47");
  assert.equal(result.payload.barcode_value, "B47");
  assert.equal(result.payload.barcode_format, "CODE128");
  assert.match(result.qrSvg, /^<svg /);
  assert.match(result.barcodeSvg, /^<svg /);
  assert.notEqual(result.qrSvg, result.barcodeSvg);
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
