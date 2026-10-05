"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const identity = require("../lib/inventory/toolIdentity.cjs");
const contract = require("../lib/inventory/workOrderAddContract.cjs");

test("Tool IDs normalize their own namespace without confusing item or container codes", () => {
  for (const code of ["AIS_T00001", "ais_t1", "AIS-T00001", " AIS T 1 ", "AIST00001"]) {
    assert.equal(identity.normalizeToolId(code), "AIS_T00001", code);
  }
  for (const code of ["AIS33551", "33551", "B1", "AIS-B00001", "AIS_P00001", "T00001", "AIS_T0", "AIS_T00000", "AIS_T100000", "AIS_T1/extra", "AIS_T1\n", "AIS_T1\u0000", null, {}, 1]) {
    assert.equal(identity.normalizeToolId(code), "", String(code));
  }
  assert.equal(identity.buildToolRoute("ais-t17"), "/NewSearch/Tools/AIS_T00017");
  assert.equal(identity.buildToolRoute("AIS17"), "");
  assert.equal(new Set(identity.getToolLookupValues("AIS_T00001")).size, identity.getToolLookupValues("AIS_T00001").length);
});

test("Tool QR parsing trusts only exact HTTPS Magmo Tool routes", () => {
  for (const url of ["https://magmo.cloud/NewSearch/Tools/AIS_T00001", "https://magmo.cloud/NewSearch/Tools/AIS_T00001/"]) {
    assert.equal(identity.parseToolScanCode(url), "AIS_T00001");
  }
  for (const url of ["http://magmo.cloud/NewSearch/Tools/AIS_T00001", "https://evil.test/NewSearch/Tools/AIS_T00001", "https://magmo.cloud.evil.test/NewSearch/Tools/AIS_T00001", "https://user@magmo.cloud/NewSearch/Tools/AIS_T00001", "https://magmo.cloud/NewSearch/Tools/AIS_T00001?redirect=evil", "https://magmo.cloud/NewSearch/Tools/AIS_T00001#x", "https://magmo.cloud/NewSearch/item/AIS_T00001", "https://magmo.cloud/NewSearch/Tools/AIS_T00001/extra", "https://magmo.cloud/NewSearch/Tools/AIS_T00001%2Fextra"]) {
    assert.equal(identity.parseToolScanCode(url), "", url);
  }
});

test("work-order scans collapse Tool code/QR aliases while retaining item and container compatibility", () => {
  assert.deepEqual(contract.normalizeScanCodes(["ais_t1", "AIS_T00001", "https://magmo.cloud/NewSearch/Tools/AIS_T00001", "AIS100", "AIS-B00007", "B7"]), ["AIS_T00001", "AIS100", "B7"]);
});
