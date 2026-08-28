"use strict";

const bwipjs = require("bwip-js");
const {
  buildStorageUnitLabelPayload,
} = require("./storageUnitContract.cjs");

function renderStorageUnitLabelSymbols(value) {
  const payload = buildStorageUnitLabelPayload(value);
  const shared = {
    text: payload.unit_id,
    backgroundcolor: "FFFFFF",
    barcolor: "000000",
    padding: 0,
  };

  return {
    payload,
    qrSvg: bwipjs.toSVG({
      ...shared,
      bcid: "qrcode",
      scale: 4,
      eclevel: "M",
    }),
    barcodeSvg: bwipjs.toSVG({
      ...shared,
      bcid: "code128",
      scale: 3,
      height: 12,
      includetext: false,
    }),
  };
}

module.exports = {
  renderStorageUnitLabelSymbols,
};
