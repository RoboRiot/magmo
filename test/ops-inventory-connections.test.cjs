const test = require("node:test");
const assert = require("node:assert/strict");

const {
  buildInventoryConnectionPlan,
  extractPartNumber,
} = require("../lib/ops/inventoryConnections.cjs");

function movement(id, direction, values = {}) {
  return { id, direction, partName: id, ...values };
}

test("extracts only explicit or standalone exact part numbers", () => {
  assert.equal(extractPartNumber("PN: PX74-07690A SN: 12"), "PX7407690A");
  assert.equal(extractPartNumber("PX74-07690A"), "PX7407690A");
  assert.equal(extractPartNumber("power control assembly"), "");
});
test("unique exact PN links shipped part to explicitly identified core", () => {
  const plan = buildInventoryConnectionPlan([
    movement("used", "shipping", {
      itemId: "AIS23586",
      pnSn: "PN: PX74-07690A",
    }),
    movement("core", "receiving", {
      itemId: "AIS23707",
      partName: "CORE-BAD Toshiba Power Control Assembly",
      pnSn: "PN: PX74-07690A",
    }),
  ]);
  assert.equal(plan.swapConnections.length, 1);
  assert.equal(plan.swapConnections[0].source, "exact_part_number");
  assert.equal(plan.returnConnections.length, 0);
});

test("does not infer a swap from names or an ambiguous exact PN", () => {
  const plan = buildInventoryConnectionPlan([
    movement("used-a", "shipping", { pnSn: "PN: ABC-123" }),
    movement("used-b", "shipping", { pnSn: "PN: ABC-123" }),
    movement("core", "receiving", {
      partName: "CORE-BAD same name",
      pnSn: "PN: ABC-123",
    }),
  ]);
  assert.equal(plan.swapConnections.length, 0);
  assert.equal(plan.unlinkedShipping.length, 2);
  assert.equal(plan.unlinkedReceiving.length, 1);
});

test("an explicit unused return takes precedence over inferred PN swaps", () => {
  const plan = buildInventoryConnectionPlan([
    movement("shipped", "shipping", {
      itemId: "AIS1",
      pnSn: "PN: ABC-123",
      pairedMovementId: "returned",
      pairId: "return-pair",
    }),
    movement("returned", "receiving", {
      itemId: "AIS1",
      pnSn: "PN: ABC-123",
      pairedMovementId: "shipped",
      pairId: "return-pair",
    }),
    movement("core", "receiving", {
      partName: "CORE-BAD replacement",
      pnSn: "PN: ABC-123",
    }),
  ]);
  assert.equal(plan.returnConnections.length, 1);
  assert.equal(plan.swapConnections.length, 0);
  assert.equal(plan.unlinkedReceiving[0].id, "core");
});

test("recorded swap links allow different inventory IDs and part numbers", () => {
  const plan = buildInventoryConnectionPlan([
    movement("replacement", "shipping", {
      itemId: "AIS100",
      pnSn: "PN: NEW-100",
      swappedMovementId: "bad-core",
      swapPairId: "swap-1",
    }),
    movement("bad-core", "receiving", {
      itemId: "AIS200",
      pnSn: "PN: OLD-200",
      swappedMovementId: "replacement",
      swapPairId: "swap-1",
    }),
  ]);
  assert.equal(plan.swapConnections.length, 1);
  assert.equal(plan.swapConnections[0].source, "recorded_swap");
  assert.equal(plan.returnConnections.length, 0);
});
