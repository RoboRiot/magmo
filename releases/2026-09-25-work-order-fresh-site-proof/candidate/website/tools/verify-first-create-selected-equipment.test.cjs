"use strict";

// Standalone extension of the exact compiled-artifact suite. The reviewed
// source/tests and deployed artifact stay byte-for-byte frozen; this appends one
// behavioral regression to the in-memory machine-import test harness.
const fs = require("node:fs");
const path = require("node:path");

const suitePath = path.join(__dirname, "verify-artifact.test.cjs");
const source = fs.readFileSync(suitePath, "utf8");
const marker = "  const original = read(filename);";
if (source.split(marker).length !== 2) throw new Error("Compiled suite injection point changed");

const extension = String.raw`
test("first verified fresh leaf with selected unmapped equipment commits the site and replay reports the durable reason", async () => {
  const selectedPayload = {
    ...freshPayload,
    blueFolder: {
      ...freshPayload.blueFolder,
      equipmentIds: ["fresh-equipment-unmapped"],
      equipmentNames: ["Unmapped Scanner Model"],
    },
  };
  const repo = repository({ "Client/FRESHROOT": freshRoot }, { lookupResult: freshLookupSuccess });
  const parentBefore = structuredClone(repo.rows.get("Client/FRESHROOT"));

  const first = await repo.importWorkOrder(selectedPayload);
  assert.match(first.after.clientId, /^AIS\d+$/);
  assert.equal(first.after.equipmentLinkStatus, "unresolved");
  assert.equal(first.after.equipmentLinkIssue, "work_order_client_missing");
  const saved = repo.rows.get("OpsWorkOrders/10680");
  assert.equal(saved.clientId, first.after.clientId);
  assert.equal(saved.machineId, undefined);
  assert.deepEqual(saved.bluefolderEquipmentIds, ["fresh-equipment-unmapped"]);
  const leaf = repo.rows.get("Client/" + first.after.clientId);
  assert.equal(leaf.bluefolderParentClientId, "FRESHROOT");
  assert.equal(leaf.bluefolderSiteSource, "verified_nested_location");
  assert.deepEqual(leaf.machines, []);
  assert.deepEqual(repo.rows.get("Client/FRESHROOT"), parentBefore);
  assert.equal(repo.lookupCalls(), 1);
  assert.equal(repo.readingAfterWrite(), false);
  const writesAfterFirst = repo.writes();

  const replay = await repo.importWorkOrder(selectedPayload);
  assert.equal(replay.idempotentReplay, true);
  assert.equal(replay.after.clientId, first.after.clientId);
  assert.equal(replay.after.equipmentLinkStatus, "unresolved");
  assert.equal(replay.after.equipmentLinkIssue, "bluefolder_equipment_not_mapped");
  assert.equal(repo.lookupCalls(), 1);
  assert.equal(repo.writes(), writesAfterFirst);
  assert.equal(repo.readingAfterWrite(), false);
});
`;

const augmented = source.replace(
  marker,
  `  const original = read(filename) + ${JSON.stringify(extension)};`
);

new Function("require", "__dirname", "__filename", augmented)(require, __dirname, suitePath);
