const assert = require("node:assert/strict");
const test = require("node:test");

const {
  HISTORY_LIMIT,
  ORIGIN_KEEP,
  ORIGIN_STAGE_VIA_SOCAL,
  MOVEMENT_CURRENT_AT_WORK_ORDER,
  MOVEMENT_FROM_WORK_ORDER,
  SOCAL_CLIENT_ID,
  SOCAL_INTERIOR_MACHINE_ID,
  WorkOrderAddContractError,
  buildAssociationSnapshot,
  buildWorkOrderAddPlan,
  buildWorkOrderMovementPlan,
  canonicalizeAssociatedPartsForItem,
  clean,
  isSocalAssociation,
  normalizeOperationId,
  normalizeMovementMode,
  normalizeOriginChoice,
  normalizeScanCodes,
  normalizeWorkOrderOption,
  searchWorkOrderOptions,
} = require("../lib/inventory/workOrderAddContract.cjs");

const NOW = "2026-08-28T19:30:00.000Z";
const DATE = "2026-08-28";
const ACTOR = {
  uid: "uid-igor",
  email: "Igor@AdvancedImagingParts.com",
  name: "Igor Savchenko",
};

function association({
  clientId = "CLIENT-A",
  clientName = "Client A",
  machineId = "MACHINE-A",
  machineName = "Machine A",
  trailerId = "",
  trailerName = "",
  type = trailerId ? "trailer" : machineId ? "machine" : "site",
} = {}) {
  return buildAssociationSnapshot({
    associationType: type,
    clientId,
    clientName,
    machineId,
    machineName,
    trailerId,
    trailerName,
    effectiveAt: NOW,
  });
}

function workOrder(overrides = {}) {
  return {
    id: "ops-10429",
    number: "10429",
    subject: "Scanner repair",
    clientId: "CLIENT-Z",
    machineId: "MACHINE-Z",
    ...overrides,
  };
}

function destination(overrides = {}) {
  return association({
    clientId: "CLIENT-Z",
    clientName: "Destination Hospital",
    machineId: "MACHINE-Z",
    machineName: "MRI 1",
    ...overrides,
  });
}

function baseItem(currentAssociation) {
  return {
    name: "Power supply",
    condition: "Ready",
    associationFrom: association({
      clientId: "CLIENT-OLD",
      clientName: "Old site",
      machineId: "MACHINE-OLD",
      machineName: "Old scanner",
    }),
    associationCurrent: currentAssociation,
    fromAssociationType: "machine",
    currentAssociationType: currentAssociation.associationType,
    clientFromId: "CLIENT-OLD",
    clientCurrentId: currentAssociation.clientId,
    machineFromId: "MACHINE-OLD",
    machineCurrentId: currentAssociation.machineId,
    newLocalCurrent: {
      region: "SoCal",
      section: { letter: "A", number: 2 },
      bin: 12,
      pallet: 4,
    },
    localLocCurrent: "SoCal–A2–B12–P4",
    region: "SoCal",
    Region: "SoCal",
    section: { letter: "A", number: 2 },
    Section: { letter: "A", number: 2 },
    bin: 12,
    Bin: 12,
    pallet: 4,
    Pallet: 4,
    selectionHistory: [{ operationId: "older-selection" }],
    saveHistory: [{ savedAt: "2026-08-20T00:00:00.000Z", savedByEmail: "old@example.com" }],
    workOrders: [{ workOrder: "10400", date: "2026-08-20" }],
    generalSearchTokens: ["power", "legacy-token"],
  };
}

test("cleaning, operation IDs, origin choices, and scan codes are deterministic", () => {
  assert.equal(clean("  hello  ", 4), "hell");
  assert.equal(normalizeOperationId(" wo-add:abc_123 "), "wo-add:abc_123");
  assert.equal(normalizeOriginChoice("keep as is"), ORIGIN_KEEP);
  assert.equal(normalizeOriginChoice("change-to-socal"), ORIGIN_STAGE_VIA_SOCAL);
  assert.equal(normalizeOriginChoice(""), "");
  assert.equal(
    normalizeMovementMode("from_work_order"),
    MOVEMENT_FROM_WORK_ORDER
  );
  assert.equal(
    normalizeMovementMode("current_at_work_order"),
    MOVEMENT_CURRENT_AT_WORK_ORDER
  );
  assert.deepEqual(
    normalizeScanCodes([
      " b-0047 ",
      "AIS-B00047",
      "B47",
      "p_0065",
      "AIS-P00065",
      "AIS123",
      "ais123",
      "Not Found",
    ]),
    ["B47", "P65", "AIS123"]
  );
  assert.throws(
    () => normalizeOperationId("bad/id"),
    (error) => error instanceof WorkOrderAddContractError && error.code === "invalid_operation_id"
  );
  assert.throws(
    () => normalizeOriginChoice("guess"),
    (error) => error.code === "invalid_origin_choice"
  );
  for (const invalid of ["", "FROM_WORK_ORDER", "keep_origin", "guess"]) {
    assert.throws(
      () => normalizeMovementMode(invalid),
      (error) => error.code === "invalid_movement_mode"
    );
  }
  assert.throws(
    () => normalizeScanCodes(Array.from({ length: 101 }, (_, index) => `AIS${index}`)),
    (error) => error.code === "too_many_scan_codes"
  );
  assert.throws(
    () => normalizeScanCodes(["AIS1", "AIS2", "AIS3"], 2),
    (error) =>
      error.code === "too_many_scan_codes" &&
      error.statusCode === 400 &&
      error.details.limit === 2
  );
});

test("explicit movement modes archive exact prior branches before applying inverse endpoints", () => {
  const priorFrom = association({
    clientId: "CLIENT-OLD",
    clientName: "Old Site",
    machineId: "MACHINE-OLD",
    machineName: "Old Scanner",
  });
  const priorCurrent = association({
    clientId: "CLIENT-PRIOR-CURRENT",
    clientName: "Prior Current",
    machineId: "MACHINE-PRIOR-CURRENT",
    machineName: "Prior Current Scanner",
  });
  const socal = association({
    clientId: SOCAL_CLIENT_ID,
    clientName: "SoCalWarehouse - Lake Forest",
    machineId: SOCAL_INTERIOR_MACHINE_ID,
    machineName: "Interior SoCal",
  });
  const itemData = {
    ...baseItem(priorCurrent),
    associationFrom: priorFrom,
    newLocalFrom: { region: "OLD", section: { letter: "R", number: 2 } },
    localLocFrom: "OLD–R2",
    workOrder: "10400",
    movementDateType: "arrival",
    movementDate: "2026-08-20",
    arrival_date: "2026-08-20",
    unrelated: { preserve: [1, 2, 3] },
    workOrders: [
      { workOrder: "10400", date: "2026-08-20" },
      { workOrder: "10429", date: "2026-08-21", note: "do not rewrite" },
    ],
  };

  const currentAtWorkOrder = buildWorkOrderMovementPlan({
    itemId: "AIS600",
    itemData,
    destinationAssociation: destination(),
    socalAssociation: socal,
    movementMode: MOVEMENT_CURRENT_AT_WORK_ORDER,
    actor: ACTOR,
    workOrder: workOrder(),
    operationId: "wo-add:current-at-work-order",
    nowIso: NOW,
    date: DATE,
  });
  assert.equal(currentAtWorkOrder.nextItem.associationFrom.machineId, SOCAL_INTERIOR_MACHINE_ID);
  assert.equal(currentAtWorkOrder.nextItem.associationCurrent.clientId, "CLIENT-Z");
  assert.deepEqual(currentAtWorkOrder.nextItem.unrelated, itemData.unrelated);
  assert.deepEqual(currentAtWorkOrder.nextItem.workOrders, itemData.workOrders);
  assert.equal(currentAtWorkOrder.workOrderAssignmentAdded, false);
  assert.equal(currentAtWorkOrder.nextItem.selectionHistory.length, 3);
  const priorSnapshot = currentAtWorkOrder.nextItem.selectionHistory.at(-2);
  assert.equal(priorSnapshot.historyType, "prior_configuration_snapshot");
  assert.deepEqual(priorSnapshot.beforeConfiguration.associationFrom, priorFrom);
  assert.deepEqual(priorSnapshot.beforeConfiguration.associationCurrent, priorCurrent);
  assert.deepEqual(priorSnapshot.beforeConfiguration.newLocalFrom, itemData.newLocalFrom);
  assert.deepEqual(
    priorSnapshot.beforeConfiguration.newLocalCurrent,
    itemData.newLocalCurrent
  );
  assert.equal(priorSnapshot.beforeConfiguration.movementDate, "2026-08-20");
  assert.equal(priorSnapshot.beforeConfiguration.workOrder, "10400");
  const resultingSnapshot = currentAtWorkOrder.nextItem.selectionHistory.at(-1);
  assert.equal(resultingSnapshot.historyType, "resulting_configuration");
  assert.equal(resultingSnapshot.movementMode, MOVEMENT_CURRENT_AT_WORK_ORDER);
  assert.deepEqual(resultingSnapshot.fromLocalLocation, itemData.newLocalCurrent);
  assert.equal(resultingSnapshot.fromLocalLocationText, itemData.localLocCurrent);
  assert.equal(resultingSnapshot.movementDateType, "departure");
  assert.equal(resultingSnapshot.departureDate, DATE);
  assert.equal(resultingSnapshot.arrivalDate, "");
  assert.equal(resultingSnapshot.afterConfiguration.associationFrom.machineId, SOCAL_INTERIOR_MACHINE_ID);
  assert.equal(resultingSnapshot.afterConfiguration.associationCurrent.clientId, "CLIENT-Z");
  assert.equal(currentAtWorkOrder.nextItem.saveHistory.at(-1).movementMode, MOVEMENT_CURRENT_AT_WORK_ORDER);
  assert.deepEqual(
    currentAtWorkOrder.audit.beforeConfiguration,
    priorSnapshot.beforeConfiguration
  );
  assert.equal(currentAtWorkOrder.audit.priorItemConfiguration, undefined);

  const fromWorkOrderItem = {
    ...itemData,
    workOrders: [{ workOrder: "10400", date: "2026-08-20" }],
  };
  const fromWorkOrder = buildWorkOrderMovementPlan({
    itemId: "AIS601",
    itemData: fromWorkOrderItem,
    destinationAssociation: destination(),
    socalAssociation: socal,
    movementMode: MOVEMENT_FROM_WORK_ORDER,
    actor: ACTOR,
    workOrder: workOrder(),
    operationId: "wo-add:from-work-order",
    nowIso: NOW,
    date: DATE,
  });
  assert.equal(fromWorkOrder.nextItem.associationFrom.clientId, "CLIENT-Z");
  assert.equal(fromWorkOrder.nextItem.associationCurrent.machineId, SOCAL_INTERIOR_MACHINE_ID);
  assert.equal(fromWorkOrder.nextItem.movementDateType, "arrival");
  assert.equal(fromWorkOrder.nextItem.arrival_date, DATE);
  assert.equal(fromWorkOrder.nextItem.departure_date, "");
  assert.deepEqual(fromWorkOrder.nextItem.newLocalFrom, {});
  assert.deepEqual(fromWorkOrder.nextItem.workOrders.at(-1), {
    workOrder: "10429",
    date: DATE,
  });
  assert.equal(fromWorkOrder.workOrderAssignmentAdded, true);
  assert.equal(fromWorkOrder.audit.workOrderAssignmentDate, DATE);
});

test("legacy warehouse fields are retained in the prior snapshot and carried to From", () => {
  const priorCurrent = association({
    clientId: SOCAL_CLIENT_ID,
    clientName: "SoCalWarehouse - Lake Forest",
    machineId: SOCAL_INTERIOR_MACHINE_ID,
    machineName: "Interior SoCal",
  });
  const itemData = baseItem(priorCurrent);
  delete itemData.newLocalCurrent;
  delete itemData.localLocCurrent;
  itemData.region = "SoCal";
  itemData.Region = "SoCal";
  itemData.section = { letter: "L", number: 9 };
  itemData.Section = { letter: "L", number: 9 };
  itemData.bin = 65;
  itemData.Bin = 65;
  itemData.pallet = 4;
  itemData.Pallet = 4;

  const plan = buildWorkOrderMovementPlan({
    itemId: "AIS602",
    itemData,
    destinationAssociation: destination(),
    socalAssociation: priorCurrent,
    movementMode: MOVEMENT_CURRENT_AT_WORK_ORDER,
    actor: ACTOR,
    workOrder: workOrder(),
    operationId: "wo-add:legacy-local-fields",
    nowIso: NOW,
    date: DATE,
  });

  const priorSnapshot = plan.nextItem.selectionHistory.at(-2);
  assert.equal(priorSnapshot.beforeConfiguration.region, "SoCal");
  assert.equal(priorSnapshot.beforeConfiguration.Bin, 65);
  assert.equal(priorSnapshot.beforeConfiguration.Pallet, 4);
  assert.deepEqual(priorSnapshot.currentLocalLocation, {
    region: "SoCal",
    section: { letter: "L", number: 9 },
    bin: 65,
    pallet: 4,
  });
  assert.deepEqual(plan.nextItem.newLocalFrom, priorSnapshot.currentLocalLocation);
  assert.equal(plan.nextItem.localLocFrom, "SoCal–L9–B65–P4");
});

test("legacy-only association aliases remain visible in flattened item history", () => {
  const socal = association({
    clientId: SOCAL_CLIENT_ID,
    clientName: "SoCalWarehouse - Lake Forest",
    machineId: SOCAL_INTERIOR_MACHINE_ID,
    machineName: "Interior SoCal",
  });
  const itemData = baseItem(socal);
  for (const field of [
    "associationFrom",
    "associationCurrent",
    "fromAssociationType",
    "currentAssociationType",
    "clientFromId",
    "machineFromId",
    "trailerFromId",
    "clientCurrentId",
    "machineCurrentId",
    "trailerCurrentId",
    "ClientFrom",
    "MachineFrom",
    "TrailerFrom",
    "ClientCurrent",
    "MachineCurrent",
    "TrailerCurrent",
  ]) {
    delete itemData[field];
  }
  Object.assign(itemData, {
    associationTypeFrom: "trailer",
    Client: "Client/C-LEGACY-FROM",
    Machine: "Machine/M-LEGACY-FROM",
    fromTrailer: "Trailers/T-LEGACY-FROM",
    associationTypeCurrent: "trailer",
    currentClient: "Client/C-LEGACY-CURRENT",
    CurrentMachine: "Machine/M-LEGACY-CURRENT",
    currentTrailer: "Trailers/T-LEGACY-CURRENT",
  });

  const plan = buildWorkOrderMovementPlan({
    itemId: "AIS603",
    itemData,
    destinationAssociation: destination(),
    socalAssociation: socal,
    movementMode: MOVEMENT_FROM_WORK_ORDER,
    actor: ACTOR,
    workOrder: workOrder(),
    operationId: "wo-add:legacy-association-fields",
    nowIso: NOW,
    date: DATE,
  });
  const prior = plan.nextItem.selectionHistory.at(-2);
  assert.equal(prior.fromAssociationType, "trailer");
  assert.equal(prior.fromClientId, "C-LEGACY-FROM");
  assert.equal(prior.fromMachineId, "M-LEGACY-FROM");
  assert.equal(prior.fromTrailerId, "T-LEGACY-FROM");
  assert.equal(prior.currentAssociationType, "trailer");
  assert.equal(prior.currentClientId, "C-LEGACY-CURRENT");
  assert.equal(prior.currentMachineId, "M-LEGACY-CURRENT");
  assert.equal(prior.currentTrailerId, "T-LEGACY-CURRENT");
  assert.equal(
    prior.beforeConfiguration.CurrentMachine,
    "Machine/M-LEGACY-CURRENT"
  );
});

test("work order options are cleaned, deduplicated, and ranked by number and text", () => {
  const options = [
    { id: "one", number: "#10428", subject: "Kyrene CT", clientName: "SimonMed" },
    { id: "two", number: "10429", subject: "Power supply", clientName: "Sherman Oaks" },
    { id: "three", number: "10431", subject: "Another issue", clientName: "Sherman Oaks" },
    { id: "duplicate-doc", number: "10431", subject: "Duplicate" },
    { id: "four", number: "10432", subject: "Deleted", deleted: true },
  ];
  assert.deepEqual(
    normalizeWorkOrderOption(options[0]),
    {
      id: "one",
      number: "10428",
      subject: "Kyrene CT",
      clientId: "",
      clientName: "SimonMed",
      clientLocation: "",
      machineId: "",
      machineName: "",
      trailerId: "",
      trailerName: "",
      workflowStatus: "",
      status: "",
      updatedAt: "",
      deleted: false,
      label: "#10428 · Kyrene CT",
      searchText: "one 10428 kyrene ct simonmed",
    }
  );
  assert.equal(searchWorkOrderOptions(options, "#10429")[0].id, "two");
  assert.deepEqual(
    searchWorkOrderOptions(options, "sherman").map((entry) => entry.number),
    ["10431", "10429"]
  );
  assert.deepEqual(
    searchWorkOrderOptions(options, "").map((entry) => entry.number),
    ["10431", "10429", "10428"]
  );
});

test("association snapshots enforce site, machine, and trailer structure", () => {
  assert.deepEqual(
    buildAssociationSnapshot({
      type: "site",
      client: { id: "CLIENT-1", name: "Clinic", location: "Los Angeles" },
    }),
    {
      schemaVersion: 2,
      associationType: "site",
      clientId: "CLIENT-1",
      clientNameSnapshot: "Clinic",
      clientLocationSnapshot: "Los Angeles",
      machineId: "",
      machineNameSnapshot: "",
      trailerId: "",
      trailerNameSnapshot: "",
      effectiveAt: "",
      effectiveAtSource: "work-order-add",
      resolutionSource: "work-order-add",
    }
  );
  assert.throws(
    () => buildAssociationSnapshot({ type: "machine", clientId: "CLIENT-1" }),
    (error) => error.code === "association_machine_required"
  );
  assert.throws(
    () =>
      buildAssociationSnapshot({
        type: "trailer",
        clientId: "CLIENT-1",
        machineId: "MACHINE-1",
      }),
    (error) => error.code === "association_trailer_required"
  );
});

test("SoCal detection uses canonical client, interior machine, or a live trailer mapping", () => {
  assert.equal(
    isSocalAssociation(association({ clientId: SOCAL_CLIENT_ID, machineId: "OTHER" })),
    true
  );
  assert.equal(
    isSocalAssociation(
      association({ clientId: "OTHER", machineId: SOCAL_INTERIOR_MACHINE_ID })
    ),
    true
  );
  const trailerAssociation = association({
    clientId: "OLD",
    machineId: "TRAILER-MACHINE",
    trailerId: "AIS40",
  });
  assert.equal(
    isSocalAssociation(trailerAssociation, {
      trailerClientById: new Map([["AIS40", SOCAL_CLIENT_ID]]),
    }),
    true
  );
  assert.equal(isSocalAssociation(trailerAssociation), false);
});

test("an item already in SoCal archives current as From and dispatches in one transition", () => {
  const socalCurrent = association({
    clientId: SOCAL_CLIENT_ID,
    clientName: "SoCalWarehouse - Lake Forest",
    machineId: SOCAL_INTERIOR_MACHINE_ID,
    machineName: "Interior SoCal",
  });
  const itemData = baseItem(socalCurrent);
  const plan = buildWorkOrderAddPlan({
    itemId: "AIS500",
    itemData,
    destinationAssociation: destination(),
    actor: ACTOR,
    workOrder: workOrder(),
    operationId: "wo-add:already-socal",
    nowIso: NOW,
    date: DATE,
  });

  assert.equal(plan.itemId, "AIS500");
  assert.equal(plan.transitions.length, 1);
  assert.equal(plan.transitions[0].kind, "dispatch_to_work_order");
  assert.equal(plan.nextItem.associationFrom.clientId, SOCAL_CLIENT_ID);
  assert.equal(plan.nextItem.associationCurrent.clientId, "CLIENT-Z");
  assert.deepEqual(plan.nextItem.newLocalFrom, itemData.newLocalCurrent);
  assert.deepEqual(plan.nextItem.newLocalCurrent, {});
  assert.equal(plan.nextItem.localLocCurrent, "");
  assert.equal(plan.nextItem.bin, "");
  assert.equal(plan.nextItem.Bin, "");
  assert.equal(plan.nextItem.condition, "Ready");
  assert.equal(plan.nextItem.selectionHistory.length, 2);
  assert.equal(plan.nextItem.saveHistory.length, 2);
  assert.equal(plan.nextItem.saveHistory.at(-1).action, "work_order_add");
  assert.equal(plan.nextItem.saveHistory.at(-1).label, "Work order add by Igor Savchenko");
  assert.deepEqual(plan.nextItem.workOrders.at(-1), {
    workOrder: "10429",
    date: DATE,
  });
  assert.ok(plan.nextItem.workOrderTokens.includes("10429"));
  assert.ok(plan.nextItem.generalSearchTokens.includes("10429"));
  assert.ok(plan.nextItem.generalSearchTokens.includes("legacy-token"));
  assert.deepEqual(
    plan.nextItem.selectionHistory.at(-1).fromLocalLocation,
    itemData.newLocalCurrent
  );
  assert.equal(
    plan.nextItem.selectionHistory.at(-1).fromLocalLocationText,
    itemData.localLocCurrent
  );
  assert.deepEqual(plan.previousMachineIds, [
    SOCAL_INTERIOR_MACHINE_ID,
    "MACHINE-OLD",
  ]);
  assert.deepEqual(plan.nextMachineIds, [SOCAL_INTERIOR_MACHINE_ID, "MACHINE-Z"]);
  assert.equal(plan.audit.originChoice, "already_socal");
  assert.equal(plan.audit.currentWasSocal, true);
  assert.equal(plan.audit.operationId, "wo-add:already-socal");
});

test("keep_origin preserves a non-SoCal current association as From", () => {
  const outside = association({
    clientId: "CLIENT-OUTSIDE",
    clientName: "Outside client",
    machineId: "MACHINE-OUTSIDE",
  });
  const plan = buildWorkOrderAddPlan({
    itemId: "AIS501",
    itemData: baseItem(outside),
    currentAssociation: outside,
    destinationAssociation: destination(),
    isCurrentSocal: false,
    originChoice: ORIGIN_KEEP,
    actor: ACTOR,
    workOrder: workOrder(),
    operationId: "wo-add:keep-origin",
    nowIso: NOW,
    date: DATE,
  });
  assert.equal(plan.transitions.length, 1);
  assert.equal(plan.nextItem.associationFrom.clientId, "CLIENT-OUTSIDE");
  assert.equal(plan.nextItem.associationCurrent.clientId, "CLIENT-Z");
  assert.equal(plan.audit.originChoice, ORIGIN_KEEP);
  assert.equal(plan.audit.intermediateAssociation, null);
});

test("stage_via_socal records two transitions and leaves SoCal as final From", () => {
  const outside = association({
    clientId: "CLIENT-OUTSIDE",
    machineId: "MACHINE-OUTSIDE",
  });
  const socal = {
    ...association({
      clientId: SOCAL_CLIENT_ID,
      clientName: "SoCalWarehouse - Lake Forest",
      machineId: SOCAL_INTERIOR_MACHINE_ID,
      machineName: "Interior SoCal",
    }),
    newLocalCurrent: {
      region: "SoCal",
      section: { letter: "W", number: 1 },
    },
    localLocCurrent: "SoCal–W1",
  };
  const itemData = baseItem(outside);
  itemData.workOrders.push({ workOrder: "10429", date: "2026-08-27" });
  itemData.workOrders.push({ workOrder: "#10429", date: "duplicate" });
  const plan = buildWorkOrderAddPlan({
    itemId: "AIS502",
    itemData,
    destinationAssociation: destination(),
    socalAssociation: socal,
    originChoice: ORIGIN_STAGE_VIA_SOCAL,
    actor: ACTOR,
    workOrder: workOrder(),
    operationId: "wo-add:via-socal",
    nowIso: NOW,
    date: DATE,
  });

  assert.deepEqual(
    plan.transitions.map((entry) => entry.kind),
    ["stage_at_socal", "dispatch_to_work_order"]
  );
  assert.equal(plan.transitions[0].fromAssociation.clientId, "CLIENT-OUTSIDE");
  assert.equal(plan.transitions[0].currentAssociation.clientId, SOCAL_CLIENT_ID);
  assert.equal(plan.transitions[1].fromAssociation.clientId, SOCAL_CLIENT_ID);
  assert.equal(plan.transitions[1].currentAssociation.clientId, "CLIENT-Z");
  assert.equal(plan.nextItem.associationFrom.clientId, SOCAL_CLIENT_ID);
  assert.deepEqual(plan.nextItem.newLocalFrom, {
    region: "SoCal",
    section: { letter: "W", number: 1 },
  });
  assert.equal(plan.nextItem.localLocFrom, "SoCal–W1");
  assert.deepEqual(plan.nextItem.selectionHistory.at(-2).fromLocalLocation, {
    region: "SoCal",
    section: { letter: "A", number: 2 },
    bin: 12,
    pallet: 4,
  });
  assert.deepEqual(plan.nextItem.selectionHistory.at(-2).currentLocalLocation, {
    region: "SoCal",
    section: { letter: "W", number: 1 },
  });
  assert.deepEqual(plan.nextItem.selectionHistory.at(-1).fromLocalLocation, {
    region: "SoCal",
    section: { letter: "W", number: 1 },
  });
  assert.deepEqual(plan.nextItem.selectionHistory.at(-1).currentLocalLocation, {});
  assert.equal(
    plan.nextItem.workOrders.filter((entry) => entry.workOrder === "10429").length,
    1
  );
  assert.equal(plan.nextItem.selectionHistory.length, 3);
  assert.equal(plan.nextItem.saveHistory.length, 2);
  assert.equal(plan.audit.transitionCount, 2);
  assert.equal(plan.audit.intermediateAssociation.clientId, SOCAL_CLIENT_ID);
});

test("existing history is never truncated while operation audit fields are appended", () => {
  const socalCurrent = association({
    clientId: SOCAL_CLIENT_ID,
    machineId: SOCAL_INTERIOR_MACHINE_ID,
  });
  const itemData = baseItem(socalCurrent);
  itemData.selectionHistory = Array.from({ length: HISTORY_LIMIT }, (_, index) => ({ index }));
  itemData.saveHistory = Array.from({ length: HISTORY_LIMIT }, (_, index) => ({ index }));
  const plan = buildWorkOrderAddPlan({
    itemId: "AIS503",
    itemData,
    destinationAssociation: destination(),
    actor: ACTOR,
    workOrder: workOrder(),
    operationId: "wo-add:bounded",
    nowIso: NOW,
    date: DATE,
  });
  assert.equal(plan.nextItem.selectionHistory.length, HISTORY_LIMIT + 1);
  assert.equal(plan.nextItem.saveHistory.length, HISTORY_LIMIT + 1);
  assert.equal(plan.nextItem.selectionHistory[0].index, 0);
  assert.equal(plan.nextItem.selectionHistory.at(-1).operationId, "wo-add:bounded");
  assert.equal(plan.nextItem.saveHistory.at(-1).actor.email, ACTOR.email.toLowerCase());

  assert.throws(
    () =>
      buildWorkOrderAddPlan({
        ...{
          itemId: "AIS503-BAD",
          itemData: { ...baseItem(socalCurrent), selectionHistory: { corrupt: true } },
          destinationAssociation: destination(),
          actor: ACTOR,
          workOrder: workOrder(),
          operationId: "wo-add:bad-history",
          nowIso: NOW,
          date: DATE,
        },
      }),
    (error) => error.code === "invalid_item_history"
  );
});

test("transition planning rejects unsafe or ambiguous input", () => {
  const outside = association({ clientId: "OUTSIDE", machineId: "OUTSIDE-M" });
  const common = {
    itemId: "AIS504",
    itemData: baseItem(outside),
    currentAssociation: outside,
    destinationAssociation: destination(),
    actor: ACTOR,
    workOrder: workOrder(),
    operationId: "wo-add:invalid",
    nowIso: NOW,
  };
  assert.throws(
    () => buildWorkOrderAddPlan(common),
    (error) => error.code === "origin_choice_required"
  );
  assert.throws(
    () =>
      buildWorkOrderAddPlan({
        ...common,
        originChoice: ORIGIN_STAGE_VIA_SOCAL,
        socalAssociation: association({ clientId: "NOT-SOCAL", machineId: "M" }),
      }),
    (error) => error.code === "invalid_socal_association"
  );
  assert.throws(
    () =>
      buildWorkOrderAddPlan({
        ...common,
        originChoice: ORIGIN_KEEP,
        actor: { uid: "uid-only" },
      }),
    (error) => error.code === "actor_required"
  );
  assert.throws(
    () =>
      buildWorkOrderAddPlan({
        ...common,
        originChoice: ORIGIN_KEEP,
        destinationAssociation: association({ clientId: "WRONG", machineId: "MACHINE-Z" }),
      }),
    (error) => error.code === "work_order_destination_mismatch"
  );
});

test("machine backlink canonicalization removes every old identity and appends one ref", () => {
  const otherRef = { id: "OTHER", path: "Test/OTHER" };
  const canonicalRef = { id: "AIS500", path: "Test/AIS500" };
  const result = canonicalizeAssociatedPartsForItem({
    associatedParts: [
      otherRef,
      "AIS500",
      { id: "AIS500", path: "Test/AIS500" },
      "OLD500",
      "keep",
      "keep",
    ],
    previousPartId: "OLD500",
    partId: "AIS500",
    partRef: canonicalRef,
    includePart: true,
  });
  assert.deepEqual(result, [otherRef, "keep", "keep", canonicalRef]);
  assert.deepEqual(
    canonicalizeAssociatedPartsForItem({
      associatedParts: result,
      partId: "AIS500",
      includePart: false,
    }),
    [otherRef, "keep", "keep"]
  );
  assert.throws(
    () =>
      canonicalizeAssociatedPartsForItem({
        associatedParts: "corrupt",
        partId: "AIS500",
        includePart: false,
      }),
    (error) => error.code === "invalid_associated_parts"
  );
});
