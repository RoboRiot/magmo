const test = require("node:test"), assert = require("node:assert/strict");
const { verifyInputs, buildPatch } = require("../tmp/repair-work-order-10658-warehouse-site-20260925.cjs");
function fixture() {
  return [
    { clientId: "AIS94688", clientLinkSource: "reviewed_recent_work_order_links_20260925", recentLinksRepairId: "recent-work-order-site-links-20260925", number: "10658", bluefolderCustomerId: "34579389", bluefolderLocationId: "35057801" },
    { bluefolderCustomerId: "34579389", bluefolderLocationId: "39226291" },
    { name: "Advanced Imaging Services, Inc.", location: "17410 Murphy Pkwy., Lathrop, CA 95330, United States", bluefolderCustomerId: "34579389", bluefolderLocationId: "35057801", address: { street: "17410 Murphy Pkwy.", city: "Lathrop", state: "CA", postalCode: "95330" }, bluefolderLocations: [{ bluefolderLocationId: "35057801", isPrimary: true }] },
    { machines: [{ path: "Machine/AIS12954" }] },
    { client: { path: "Client/AIS25097" } },
  ];
}
const snapshots = values => values.map(value => ({ exists: true, data: () => value }));
test("only the exact reviewed site-only LF-to-current-BF-Lathrop correction passes", () => {
  verifyInputs(snapshots(fixture()));
  const values = fixture(); values[0].clientRef = { path: "Client/AIS94688" };
  verifyInputs(snapshots(values));
});
test("manual, wrong-site, selected-equipment, deleted and wrong-reference records stop", () => {
  for (const change of [
    wo => { wo.clientId = "AIS89914"; }, wo => { wo.clientLinkSource = "manual"; },
    wo => { wo.recentLinksRepairId = "other"; }, wo => { wo.number = "10659"; },
    wo => { wo.bluefolderLocationId = "39226291"; }, wo => { wo.bluefolderCustomerId = "other"; },
    wo => { wo.clientRef = { path: "Trailers/AIS94688" }; }, wo => { wo.clientRef = false; },
    wo => { wo.machineRef = false; }, wo => { wo.trailerName = 0; },
    wo => { wo.bluefolderEquipmentIds = ["selected"] ; }, wo => { wo.blueFolder = { equipmentNames: ["MRI"] }; },
    wo => { wo.blueFolder = { customerLocationId: "39226291" }; }, wo => { wo.deleted = true; },
  ]) { const values = fixture(); change(values[0]); assert.throws(() => verifyInputs(snapshots(values))); }
});
test("a nested cached primary is insufficient without exact own destination identity and address", () => {
  for (const change of [
    client => { client.bluefolderLocationId = "elsewhere"; }, client => { client.address.city = "elsewhere"; },
    client => { client.address.street = "elsewhere"; }, client => { client.address.postalCode = "92630"; },
    client => { client.bluefolderLocations[0].isPrimary = false; }, client => { client.bluefolderInactive = true; },
  ]) { const values = fixture(); change(values[2]); assert.throws(() => verifyInputs(snapshots(values))); }
});
test("canonical Lathrop ownership and backlink must both hold", () => {
  for (const change of [
    values => { values[3].machines = []; }, values => { values[4].client.path = "Client/AIS17182"; },
  ]) { const values = fixture(); change(values); assert.throws(() => verifyInputs(snapshots(values))); }
});
test("patch contains only ten reviewed association/bookkeeping fields and a typed destination ref", () => {
  const db = { doc: path => ({ path, firestore: true }) };
  const patch = buildPatch(db, fixture()[2], new Date("2026-09-25T21:00:00Z"));
  assert.deepEqual(Object.keys(patch).sort(), ["clientId", "clientLinkMatchReason", "clientLinkSource", "clientLinkedAtIso", "clientLocation", "clientName", "clientRef", "updatedAt", "warehouseDestinationRepairId", "warehouseDestinationRepairedAtIso"]);
  assert.equal(patch.clientId, "AIS89914"); assert.equal(patch.clientRef.path, "Client/AIS89914");
  assert.equal(patch.updatedAt.toDate().toISOString(), "2026-09-25T21:00:00.000Z");
});
