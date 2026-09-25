"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const scriptPath = path.join(
  __dirname,
  "../scripts/repair-torrance-work-order-equipment-2026-09-25.mjs"
);
const modulePromise = import(pathToFileURL(scriptPath).href);
const EQUIPMENT = "09859C69-CD50-4277-BB40-60A696300768";
const MACHINE = "AIS32820";
const CLIENT = "AIS79109";
const ORDER_IDS = ["9837", "10456", "10677"];

function fixture(id = "10677") {
  const client = {
    name: "Prohealth - Torrance ",
    bluefolderCustomerId: "34579369",
    bluefolderLocationId: "35203706",
    notes: { untouched: true },
  };
  const machine = {
    name: "Siemens espree MR",
    Model: "Espree",
    OEM: "Siemens",
    Modality: "MRI",
    client: { path: `Client/${CLIENT}` },
    serial: "LOCAL-SERIAL-KEEP",
    associatedParts: [{ path: "Test/KEEP" }],
  };
  const wo = {
    clientId: CLIENT,
    clientRef: { path: `Client/${CLIENT}` },
    bluefolderServiceRequestId: id,
    workOrderId: id,
    bluefolderCustomerId: "34579369",
    bluefolderLocationId: "35203706",
    bluefolderEquipmentIds: [EQUIPMENT.toLowerCase()],
    bluefolderEquipmentNames: ["Espree"],
    subject: "Keep the original subject",
    workflowStatus: "inactive",
    assignmentHistory: [{ preserve: true }],
  };
  const bf = {
    id,
    customer: "Prohealth Advanced Imaging",
    customerId: "34579369",
    customerLocationId: "35203706",
    customerLocationName: "Prohealth - Torrance",
    equipmentIds: [EQUIPMENT.toLowerCase()],
    equipmentNames: ["Espree"],
  };
  const machines = [{ id: MACHINE, data: machine }];
  return { id, wo, bf, client, machine, machines };
}

test("repair exports the exact reviewed equipment, work-order allowlist, and repair identity", async () => {
  const repair = await modulePromise;
  assert.equal(repair.REPAIR_ID, "torrance-equipment-link-20260925");
  assert.equal(repair.EQ, EQUIPMENT);
  assert.deepEqual(repair.ORDER_IDS, ORDER_IDS);
  assert.equal(repair.ORDER_IDS.includes("10202"), false, "10202 has no live selected equipment");
});

test("reviewed machine and all three reviewed orders validate without mutating source records", async () => {
  const { validateReviewedMapping, validateReviewedOrder } = await modulePromise;
  for (const id of ORDER_IDS) {
    const input = fixture(id);
    const before = structuredClone(input);
    validateReviewedMapping(input);
    const identity = validateReviewedOrder(id, input.wo, input.bf, input.client);
    assert.deepEqual(input, before, `${id} validation must be read-only`);
    assert.deepEqual(identity.blueFolder.equipmentIds, [EQUIPMENT.toLowerCase()]);
  }
});

test("work-order validation refuses IDs outside the fixed allowlist and changed BlueFolder identity", async () => {
  const { validateReviewedOrder } = await modulePromise;
  let input = fixture("10202");
  assert.throws(
    () => validateReviewedOrder(input.id, input.wo, input.bf, input.client),
    /outside fixed scope/
  );

  const changes = [
    ["id", "10678"],
    ["equipmentIds", []],
    ["equipmentIds", [EQUIPMENT, "OTHER"]],
    ["equipmentIds", ["OTHER"]],
    ["customerId", "OTHER"],
    ["customerLocationId", "OTHER"],
  ];
  for (const [field, value] of changes) {
    input = fixture();
    input.bf[field] = value;
    assert.throws(
      () => validateReviewedOrder(input.id, input.wo, input.bf, input.client),
      undefined,
      `changed live BlueFolder ${field}`
    );
  }

  for (const field of [
    "clientId",
    "bluefolderServiceRequestId",
    "bluefolderCustomerId",
    "bluefolderLocationId",
  ]) {
    input = fixture();
    input.wo[field] = "OTHER";
    assert.throws(
      () => validateReviewedOrder(input.id, input.wo, input.bf, input.client),
      undefined,
      `changed stored ${field}`
    );
  }
});

test("work-order validation refuses to overwrite any existing manual machine or trailer selection", async () => {
  const { validateReviewedOrder } = await modulePromise;
  for (const [field, value] of [
    ["machineId", MACHINE],
    ["machineRef", { path: `Machine/${MACHINE}` }],
    ["trailerId", "AIS23"],
    ["trailerRef", { path: "Trailers/AIS23" }],
  ]) {
    const input = fixture();
    input.wo[field] = value;
    assert.throws(
      () => validateReviewedOrder(input.id, input.wo, input.bf, input.client),
      /Existing explicit asset/,
      field
    );
  }
});

test("reviewed machine accepts typed client aliases but rejects conflicting or malformed relationships", async () => {
  const { validateReviewedMapping, validateReviewedOrder } = await modulePromise;
  for (const [field, value] of [
    ["client", { path: `Client/${CLIENT}` }],
    ["Client", `Client/${CLIENT}`],
    ["clientId", CLIENT],
    ["ClientId", { path: `Client/${CLIENT}` }],
  ]) {
    const input = fixture();
    for (const key of ["client", "Client", "clientId", "ClientId"]) delete input.machine[key];
    input.machine[field] = value;
    validateReviewedMapping(input);
  }

  for (const mutate of [
    (input) => { input.machine.client = { path: "Client/OTHER" }; },
    (input) => { input.machine.Client = { path: `Client/${CLIENT}` }; input.machine.client = { path: "Client/OTHER" }; },
    (input) => { input.machine.client = { path: `Trailers/${CLIENT}` }; },
    (input) => { input.machine.client = { path: `Client/${CLIENT}/History/one` }; },
  ]) {
    const input = fixture();
    mutate(input);
    assert.throws(() => validateReviewedMapping(input));
  }
  const wrongWorkOrderRef = fixture();
  wrongWorkOrderRef.wo.clientRef = { path: `Machine/${CLIENT}` };
  assert.throws(() => validateReviewedOrder(
    wrongWorkOrderRef.id,
    wrongWorkOrderRef.wo,
    wrongWorkOrderRef.bf,
    wrongWorkOrderRef.client
  ));
});

test("reviewed mapping refuses renamed, unavailable, trailer-linked, conflicting, or duplicate machines", async () => {
  const { validateReviewedMapping } = await modulePromise;
  for (const mutate of [
    (input) => { input.machine.name = "Espree replacement"; },
    (input) => { input.machine.deletedAt = "2026-09-25"; },
    (input) => { input.client.archived = true; },
    (input) => { input.machine.trailerId = "AIS23"; },
    (input) => { input.machine.bluefolderEquipmentId = "OTHER"; },
    (input) => { input.machine.blueFolderEquipmentId = "OTHER"; },
    (input) => { input.machines.push({ id: "OTHER", data: { bluefolderEquipmentId: EQUIPMENT } }); },
    (input) => { input.machines.push({ id: "ARCHIVED", data: { blueFolderEquipmentId: EQUIPMENT.toLowerCase(), archived: true } }); },
  ]) {
    const input = fixture();
    mutate(input);
    assert.throws(() => validateReviewedMapping(input));
  }
});

test("stored equipment aliases may only restate the same reviewed ID", async () => {
  const { validateReviewedMapping, validateReviewedOrder } = await modulePromise;
  const input = fixture();
  input.machine.bluefolderEquipmentId = EQUIPMENT.toLowerCase();
  input.machine.blueFolderEquipmentId = EQUIPMENT;
  input.wo.bluefolderEquipmentIds = [EQUIPMENT.toLowerCase()];
  validateReviewedMapping(input);
  validateReviewedOrder(input.id, input.wo, input.bf, input.client);

  input.wo.bluefolderEquipmentIds = ["OTHER"];
  assert.throws(() => validateReviewedOrder(input.id, input.wo, input.bf, input.client));
});

test("reviewed permanent equipment mapping requires the observed structured machine identity", async () => {
  const { validateReviewedMapping } = await modulePromise;
  for (const [field, value] of [["Model", "Avanto"], ["OEM", "GE"], ["Modality", "CT"]]) {
    const input = fixture();
    input.machine[field] = value;
    assert.throws(() => validateReviewedMapping(input));
  }
});

test("repair source retains provenance guards and the fixed no-inventory-write scope", () => {
  const source = fs.readFileSync(scriptPath, "utf8");
  assert.match(source, /reviewed_torrance_equipment_link_20260925/);
  assert.match(source, /reviewed_unique_machine_at_exact_site_manufacturer_modality_name_variation/);
  assert.match(source, /machineLinkRepairId\s*:\s*REPAIR_ID/);
  assert.match(source, /connectionsUpdatedBy\s*:\s*['"]Magmo reviewed equipment repair['"]/);
  assert.match(source, /inventoryItemsModified\s*:\s*0/);
  assert.match(source, /existingHistoryNamesModelsLocationsWorkflowPreserved\s*:\s*true/);
  assert.doesNotMatch(source, /(?:update|set|create|delete)\s*\(\s*db\.doc\s*\(\s*[`'"]Test\//);
  assert.doesNotMatch(source, /collection\s*\(\s*['"]Test['"]\s*\)/);
});
