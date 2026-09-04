"use strict";

const bwipjs = require("bwip-js");
const {
  buildStorageUnitLabelPayload,
} = require("./storageUnitContract.cjs");

function renderStorageUnitLabelSymbols(value) {
  const payload =
    value && typeof value === "object" && !Array.isArray(value)
      ? value
      : buildStorageUnitLabelPayload(value);
  const shared = {
    backgroundcolor: "FFFFFF",
    barcolor: "000000",
    padding: 0,
  };

  const renderCode128 = (text, scale = 3, height = 12) =>
    bwipjs.toSVG({
      ...shared,
      text: String(text || ""),
      bcid: "code128",
      scale,
      height,
      includetext: false,
    });

  return {
    payload,
    qrSvg: bwipjs.toSVG({
      ...shared,
      text: payload.qr_value,
      bcid: "qrcode",
      scale: 4,
      eclevel: "M",
    }),
    barcodeSvg: renderCode128(payload.barcode_value),
    itemBarcodeSvgs: (Array.isArray(payload.items) ? payload.items : []).map(
      (item) => ({
        itemId: String(item?.item_id || ""),
        svg: renderCode128(item?.barcode_value, 2, 10),
      })
    ),
    binBarcodeSvgs: (Array.isArray(payload.bins) ? payload.bins : []).map(
      (bin) => ({
        unitId: String(bin?.unit_id || ""),
        svg: renderCode128(bin?.serial_id, 2, 10),
      })
    ),
  };
}

module.exports = {
  renderStorageUnitLabelSymbols,
};
