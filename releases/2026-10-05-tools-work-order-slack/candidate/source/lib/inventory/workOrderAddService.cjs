"use strict";

const crypto = require("node:crypto");
const itemLocationContract = require("./itemLocationContract.cjs");
const placementContract = require("./storageUnitPlacement.cjs");
const storageUnitContract = require("./storageUnitContract.cjs");
const toolIdentity = require("./toolIdentity.cjs");
const workOrderAddContract = require("./workOrderAddContract.cjs");
const trailerLinks = require("../ops/trailerClientLinks.cjs");
const { hasSelectedBlueFolderEquipment, workOrderMachineLinkNeedsReview } = require("../ops/workOrderMachineLink.cjs");

const OPS_WORK_ORDER_COLLECTION = "OpsWorkOrders";
const ITEM_COLLECTION = "Test";
const TOOL_COLLECTION = toolIdentity.TOOL_COLLECTION;
const STORAGE_UNIT_COLLECTION = "StorageUnits";
const OPERATION_COLLECTION = "InventoryWorkOrderAddOperations";
const ITEM_AUDIT_COLLECTION = "WorkOrderAddHistory";
const SOCAL_CLIENT_ID = workOrderAddContract.SOCAL_CLIENT_ID;
const SOCAL_INTERIOR_MACHINE_ID = workOrderAddContract.SOCAL_INTERIOR_MACHINE_ID;
const MAX_SCANS = 50;
const MAX_ITEMS = 75;
const MAX_OPERATION_RESULT_ITEMS = 75;
const MAX_TRANSACTION_WRITES = 450;
const LEGACY_ASSOCIATION_FIELDS = workOrderAddContract.LEGACY_ASSOCIATION_FIELDS;

class WorkOrderAddError extends Error {
  constructor(code, message, statusCode = 400, details = undefined) {
    super(message);
    this.name = "WorkOrderAddError";
    this.code = code;
    this.statusCode = statusCode;
    if (details !== undefined) this.details = details;
  }
}

function fail(code, message, statusCode = 400, details) {
  throw new WorkOrderAddError(code, message, statusCode, details);
}

function clean(value, maxLength = 500) {
  return workOrderAddContract.clean(value, maxLength);
}

function referenceId(value) {
  return itemLocationContract.getReferenceId(value);
}

function dateInLosAngeles(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function actorFromAuth(authUser = {}) {
  const email = clean(authUser.email, 180).toLowerCase();
  const name = clean(
    authUser.magmoName || email.split("@")[0] || "Magmo user",
    180
  );
  return {
    uid: clean(authUser.uid, 128),
    email: email || "unknown",
    name: name || email || "Magmo user",
  };
}

function membershipFingerprint({ kind, canonicalId, itemIds } = {}) {
  const payload = {
    kind: clean(kind, 40).toLowerCase(),
    canonicalId: clean(canonicalId, 180).toUpperCase(),
    itemIds: Array.from(
      new Set((Array.isArray(itemIds) ? itemIds : []).map((value) => clean(value, 180)))
    )
      .filter(Boolean)
      .sort((left, right) => left.localeCompare(right, "en", { numeric: true })),
  };
  return crypto.createHash("sha256").update(JSON.stringify(payload), "utf8").digest("hex");
}

function operationRequestHash({
  workOrderId,
  scans,
  movementMode,
  expectedMembership = [],
}) {
  return crypto
    .createHash("sha256")
    .update(
      JSON.stringify({ workOrderId, scans, movementMode, expectedMembership }),
      "utf8"
    )
    .digest("hex");
}

function normalizeExpectedMembership(values, scans) {
  if (!Array.isArray(values) || values.length !== scans.length) {
    fail(
      "staged_membership_required",
      "Rescan this list so Magmo can verify the exact inventory you reviewed."
    );
  }
  return values.map((entry, index) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      fail("invalid_staged_membership", "The staged inventory proof is invalid.");
    }
    const code = workOrderAddContract.normalizeScanCodes([entry.code], 1)[0] || "";
    const fingerprint = clean(entry.fingerprint, 80).toLowerCase();
    if (code !== scans[index] || !/^[a-f0-9]{64}$/.test(fingerprint)) {
      fail("invalid_staged_membership", "The staged inventory proof is invalid.");
    }
    return { code, fingerprint };
  });
}

function normalizeWorkOrderId(value) {
  const id = clean(value, 180);
  return id && !/[\/\\\u0000-\u001f\u007f]/.test(id) ? id : "";
}

function normalizeCurrentAssociation(itemData = {}, liveTrailer = null) {
  const stored = itemLocationContract.extractBranchAssociation(itemData, "current");
  const snapshot =
    itemData.associationCurrent && typeof itemData.associationCurrent === "object"
      ? itemData.associationCurrent
      : {};
  let clientId = stored.clientId;
  let machineId = stored.machineId;
  const trailerId = stored.trailerId;
  let clientName = clean(snapshot.clientNameSnapshot, 500);
  let clientLocation = clean(snapshot.clientLocationSnapshot, 500);
  let machineName = clean(snapshot.machineNameSnapshot, 500);
  let trailerName = clean(snapshot.trailerNameSnapshot, 500);

  if (trailerId && liveTrailer) {
    const trailerData = liveTrailer.data || {};
    const liveClientId = trailerLinks.trailerClientId(trailerData);
    const liveMachineId = trailerLinks.trailerMachineId(trailerData);
    if (liveClientId) clientId = liveClientId;
    if (liveMachineId) machineId = liveMachineId;
    trailerName = trailerLinks.trailerName(trailerData, trailerId) || trailerName;
    if (liveTrailer.client) {
      clientName = trailerLinks.clientName(liveTrailer.client.data, clientId);
      clientLocation = trailerLinks.clientLocation(liveTrailer.client.data);
    }
    if (liveTrailer.machine) {
      machineName = clean(
        liveTrailer.machine.data?.name || liveTrailer.machine.id,
        500
      );
    }
  }

  const associationType = trailerId
    ? "trailer"
    : machineId
      ? "machine"
      : clientId
        ? "site"
        : "";
  if (!associationType) return null;
  return workOrderAddContract.buildAssociationSnapshot({
    associationType,
    clientId,
    clientName,
    clientLocation,
    machineId,
    machineName,
    trailerId,
    trailerName,
    effectiveAt: clean(snapshot.effectiveAt, 100),
    effectiveAtSource: clean(snapshot.effectiveAtSource, 100) || "item-current",
    resolutionSource: "work-order-add-current",
  });
}

function materializeAssociationReferences(db, nextItem = {}) {
  const item = { ...nextItem };
  LEGACY_ASSOCIATION_FIELDS.forEach((field) => delete item[field]);

  const apply = (branch, association) => {
    const current = branch === "current";
    const suffix = current ? "Current" : "From";
    const lowerSuffix = current ? "Current" : "From";
    const mapField = current ? "associationCurrent" : "associationFrom";
    const typeField = current ? "currentAssociationType" : "fromAssociationType";
    const clientIdField = `client${lowerSuffix}Id`;
    const machineIdField = `machine${lowerSuffix}Id`;
    const trailerIdField = `trailer${lowerSuffix}Id`;

    for (const field of [
      `Client${suffix}`,
      `Machine${suffix}`,
      `Trailer${suffix}`,
      clientIdField,
      machineIdField,
      trailerIdField,
      typeField,
      mapField,
    ]) {
      delete item[field];
    }
    if (!association?.clientId) return;
    item[`Client${suffix}`] = db.collection("Client").doc(association.clientId);
    item[clientIdField] = association.clientId;
    item[typeField] = association.associationType;
    item[mapField] = association;
    if (association.machineId) {
      item[`Machine${suffix}`] = db.collection("Machine").doc(association.machineId);
      item[machineIdField] = association.machineId;
    }
    if (association.trailerId) {
      item[`Trailer${suffix}`] = db.collection("Trailers").doc(association.trailerId);
      item[trailerIdField] = association.trailerId;
    }
  };

  apply("from", item.associationFrom);
  apply("current", item.associationCurrent);
  return item;
}

function toolFlatAssociationFields(value = {}) {
  const fields = {};
  for (const branch of ["from", "current"]) {
    const suffix = branch === "from" ? "From" : "Current";
    const association = value[`association${suffix}`] || {};
    fields[`${branch}ClientId`] = association.clientId || "";
    fields[`${branch}ClientName`] = association.clientNameSnapshot || "";
    fields[`${branch}MachineId`] = association.machineId || "";
    fields[`${branch}MachineName`] = association.machineNameSnapshot || "";
    fields[`location${suffix}Name`] = association.clientNameSnapshot || "";
  }
  return fields;
}

function buildToolMovementPlan(options) {
  // Reuse the audited movement/history rules, then adapt only Tool's editor
  // aliases. Tool components are references, not independent inventory moves.
  const plan = workOrderAddContract.buildWorkOrderMovementPlan(options);
  const original = options.itemData;
  const aliasFields = ["fromClientId", "fromClientName", "fromMachineId", "fromMachineName",
    "currentClientId", "currentClientName", "currentMachineId", "currentMachineName",
    "locationFromName", "locationCurrentName"];
  for (const field of aliasFields) {
    plan.audit.beforeConfiguration[field] = Object.hasOwn(original, field) ? original[field] : null;
  }
  const afterFields = toolFlatAssociationFields(plan.nextItem);
  Object.assign(plan.nextItem, afterFields);
  Object.assign(plan.audit.afterConfiguration, afterFields);
  plan.audit.entityKind = "tool";
  plan.audit.entityCollection = TOOL_COLLECTION;
  plan.nextItem.selectionHistory = plan.nextItem.selectionHistory.map((entry) => {
    if (entry.operationId !== options.operationId || entry.action !== "work_order_add") return entry;
    const prior = entry.historyType === "prior_configuration_snapshot";
    const source = prior ? original : plan.nextItem;
    const extra = {};
    for (const branch of ["from", "current"]) {
      const suffix = branch === "from" ? "From" : "Current";
      const association = source[`association${suffix}`] || {};
      extra[`${branch}ClientName`] = clean(source[`${branch}ClientName`] || association.clientNameSnapshot, 240);
      extra[`${branch}MachineName`] = clean(source[`${branch}MachineName`] || association.machineNameSnapshot, 240);
    }
    return { ...entry, ...extra, toClientId: entry.currentClientId, toMachineId: entry.currentMachineId,
      toClientName: extra.currentClientName, toMachineName: extra.currentMachineName };
  });
  return plan;
}

function materializeToolReferences(db, nextTool) {
  return { ...materializeAssociationReferences(db, nextTool), ...toolFlatAssociationFields(nextTool) };
}

function machineBelongsToClient(machineData = {}, clientData = {}, machineId, clientId) {
  const directClientIds = Array.from(
    new Set(
      [
        machineData.client,
        machineData.Client,
        machineData.clientId,
        machineData.ClientId,
      ]
        .map(referenceId)
        .filter(Boolean)
    )
  );
  if (directClientIds.length) {
    return directClientIds.length === 1 && directClientIds[0] === clientId;
  }
  return [
    ...(Array.isArray(clientData.machines) ? clientData.machines : []),
    ...(Array.isArray(clientData.Machines) ? clientData.Machines : []),
  ]
    .map(referenceId)
    .includes(machineId);
}

function warehouseLinkId(value, collection) {
  if (typeof value === "string") {
    const text = value.trim();
    if (/^[A-Za-z0-9_-]+$/.test(text)) return text;
    const parts = text.split("/");
    return parts.length === 2 && parts[0] === collection && /^[A-Za-z0-9_-]+$/.test(parts[1])
      ? parts[1] : "";
  }
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const id = warehouseLinkId(value.path, collection);
    return id && (!value.id || value.id === id) ? id : "";
  }
  return "";
}

function warehouseRecordUnavailable(value) {
  return Boolean(value.deletedAt || value.archivedAt || value.deleted === true ||
    value.archived === true || value.inactive === true || value.bluefolderInactive === true);
}

async function resolveWarehouseInteriorDefault(transaction, db, sourceClientId, sourceClientData, mapping) {
  const failDefault = () => fail(
    "work_order_warehouse_interior_unavailable",
    "The warehouse Interior destination has missing or conflicting live links. Review the warehouse setup before moving inventory; no items were changed.",
    409
  );
  if (warehouseRecordUnavailable(sourceClientData)) failDefault();
  if (sourceClientId === workOrderAddContract.LAKE_FOREST_BLUEFOLDER_CLIENT_ID && (
    String(sourceClientData.bluefolderCustomerId || "") !== "34579389" ||
    String(sourceClientData.bluefolderLocationId || "") !== "39226291" ||
    !Array.isArray(sourceClientData.bluefolderLocationAliasKeys) ||
    !sourceClientData.bluefolderLocationAliasKeys.includes("34579389:39226291")
  )) failDefault();
  if (sourceClientId === workOrderAddContract.LATHROP_BLUEFOLDER_CLIENT_ID) {
    const street = typeof sourceClientData.address?.street === "string"
      ? sourceClientData.address.street.toLowerCase().replace(/[\s.]/g, "") : "";
    if (String(sourceClientData.bluefolderCustomerId || "") !== "34579389" ||
      String(sourceClientData.bluefolderLocationId || "") !== "35057801" ||
      street !== "17410murphypkwy" ||
      clean(sourceClientData.address?.city).toLowerCase() !== "lathrop" ||
      clean(sourceClientData.address?.state).toUpperCase() !== "CA" ||
      clean(sourceClientData.address?.postalCode) !== "95330") failDefault();
  }

  const canonicalClientSnapshot = sourceClientId === mapping.clientId ? null :
    await transaction.get(db.collection("Client").doc(mapping.clientId));
  const clientData = canonicalClientSnapshot ? canonicalClientSnapshot.data() || {} : sourceClientData;
  const machineSnapshot = await transaction.get(db.collection("Machine").doc(mapping.machineId));
  if ((canonicalClientSnapshot && !canonicalClientSnapshot.exists) || !machineSnapshot.exists) failDefault();
  const machineData = machineSnapshot.data() || {};
  if (warehouseRecordUnavailable(clientData) || warehouseRecordUnavailable(machineData)) failDefault();
  const populated = (value) => value !== undefined && value !== null &&
    !(typeof value === "string" && !value.trim());
  const directLinks = [machineData.client, machineData.Client, machineData.clientId, machineData.ClientId]
    .filter(populated);
  const lists = [clientData.machines, clientData.Machines].filter((value) => value !== undefined);
  if (!directLinks.length || directLinks.some((value) => warehouseLinkId(value, "Client") !== mapping.clientId) ||
    !lists.length || lists.some((value) => !Array.isArray(value)) ||
    !lists.flat().some((value) => warehouseLinkId(value, "Machine") === mapping.machineId)) failDefault();
  return { clientData, machineData };
}

async function resolveWorkOrderDestination(transaction, db, rawWorkOrderId, nowIso) {
  const workOrderId = normalizeWorkOrderId(rawWorkOrderId);
  if (!workOrderId) fail("invalid_work_order", "Select a valid Magmo work order.");
  const workOrderRef = db.collection(OPS_WORK_ORDER_COLLECTION).doc(workOrderId);
  const workOrderSnapshot = await transaction.get(workOrderRef);
  if (!workOrderSnapshot.exists) {
    fail("work_order_not_found", "The selected Magmo work order no longer exists.", 404);
  }
  const workOrderData = workOrderSnapshot.data() || {};
  if (workOrderData.deletedAt) {
    fail("work_order_deleted", "The selected Magmo work order was deleted.", 409);
  }
  const sourceClientId = clean(workOrderData.clientId, 180);
  let clientId = sourceClientId;
  let machineId = clean(workOrderData.machineId, 180);
  const trailerId = clean(workOrderData.trailerId, 180);
  if (!clientId) {
    fail(
      "work_order_destination_missing",
      "This work order is not linked to a client destination yet.",
      409
    );
  }

  const clientRef = db.collection("Client").doc(clientId);
  const clientSnapshot = await transaction.get(clientRef);
  if (!clientSnapshot.exists) {
    fail(
      "work_order_client_missing",
      "The client linked to this work order no longer exists.",
      409
    );
  }
  let clientData = clientSnapshot.data() || {};
  const sourceClientName = trailerLinks.clientName(clientData, sourceClientId);
  let trailerData = null;
  let trailerMachineId = "";
  if (trailerId) {
    const trailerSnapshot = await transaction.get(
      db.collection("Trailers").doc(trailerId)
    );
    if (!trailerSnapshot.exists) {
      fail(
        "work_order_trailer_missing",
        "The trailer linked to this work order no longer exists.",
        409
      );
    }
    trailerData = trailerSnapshot.data() || {};
    const trailerClientId = trailerLinks.trailerClientId(trailerData);
    if (trailerClientId !== clientId) {
      fail(
        "work_order_trailer_client_mismatch",
        "The work order trailer is not currently linked to its selected client.",
        409
      );
    }
    trailerMachineId = trailerLinks.trailerMachineId(trailerData);
    if (!trailerMachineId) {
      fail(
        "work_order_trailer_machine_missing",
        "The work order trailer has no live linked machine.",
        409
      );
    }
    if (machineId && trailerMachineId !== machineId) {
      fail(
        "work_order_trailer_machine_mismatch",
        "The work order machine does not match the machine inside its trailer.",
        409
      );
    }
    if (!machineId) machineId = trailerMachineId;
  }

  if (workOrderMachineLinkNeedsReview(workOrderData)) {
    fail(
      "work_order_machine_needs_review",
      "The equipment selected in BlueFolder changed after this work order's machine was linked. Review the machine link before moving inventory; no items were changed.",
      409
    );
  }
  if (!machineId && hasSelectedBlueFolderEquipment(workOrderData)) {
    fail(
      "work_order_machine_not_linked",
      "The equipment selected in BlueFolder is not linked to a Magmo machine yet. Link the work order machine before moving inventory; no items were changed.",
      409
    );
  }

  let machineData = null;
  const warehouseMapping = workOrderAddContract.warehouseInteriorForClient(sourceClientId);
  let warehouseInteriorDefault = false;
  if (!machineId && !trailerId && warehouseMapping) {
    if (workOrderAddContract.hasExplicitWorkOrderAsset(workOrderData)) {
      fail("work_order_machine_needs_review", "This warehouse work order has an incomplete explicit asset link. Review it before moving inventory; no items were changed.", 409);
    }
    if (!workOrderAddContract.warehouseSourceIdentityMatches(workOrderData)) {
      fail("work_order_warehouse_source_mismatch", "The warehouse site selected on this work order is missing or conflicts with its BlueFolder identity. Review it before moving inventory; no items were changed.", 409);
    }
    const warehouse = await resolveWarehouseInteriorDefault(
      transaction, db, sourceClientId, clientData, warehouseMapping
    );
    clientId = warehouseMapping.clientId;
    machineId = warehouseMapping.machineId;
    clientData = warehouse.clientData;
    machineData = warehouse.machineData;
    warehouseInteriorDefault = true;
  }
  if (machineId && !warehouseInteriorDefault) {
    const machineSnapshot = await transaction.get(
      db.collection("Machine").doc(machineId)
    );
    if (!machineSnapshot.exists) {
      fail(
        "work_order_machine_missing",
        "The machine linked to this work order no longer exists.",
        409
      );
    }
    machineData = machineSnapshot.data() || {};
    if (!machineBelongsToClient(machineData, clientData, machineId, clientId)) {
      fail(
        "work_order_machine_client_mismatch",
        "The work order machine is not linked to its selected client.",
        409
      );
    }
  }

  const associationType = trailerId ? "trailer" : machineId ? "machine" : "site";
  const destinationAssociation = workOrderAddContract.buildAssociationSnapshot({
    associationType,
    clientId,
    clientName: trailerLinks.clientName(clientData, clientId),
    clientLocation: trailerLinks.clientLocation(clientData),
    machineId,
    machineName: clean(machineData?.name || workOrderData.machineName || machineId, 500),
    trailerId,
    trailerName: trailerLinks.trailerName(
      trailerData || {},
      workOrderData.trailerName || trailerId
    ),
    effectiveAt: nowIso,
    effectiveAtSource: "work-order-add",
    resolutionSource: warehouseInteriorDefault ? "work-order-warehouse-interior-default" : "magmo-work-order",
    ...(warehouseInteriorDefault ? {
      warehouseInteriorDefault: true,
      workOrderClientId: sourceClientId,
      workOrderClientNameSnapshot: sourceClientName,
    } : {}),
  });
  if (!destinationAssociation) {
    fail(
      "work_order_destination_invalid",
      "The work order destination could not be validated.",
      409
    );
  }
  return {
    workOrder: {
      id: workOrderSnapshot.id,
      workOrderId: clean(workOrderData.workOrderId || workOrderSnapshot.id, 180),
      number: clean(workOrderData.number || workOrderSnapshot.id, 120),
      subject: clean(workOrderData.subject || "Untitled work order", 500),
      workflowStatus: clean(workOrderData.workflowStatus || workOrderData.status, 80),
      clientId,
      machineId,
      trailerId,
      ...(warehouseInteriorDefault ? {
        warehouseInteriorDefault: true,
        sourceClientId,
        sourceClientName,
      } : {}),
    },
    association: destinationAssociation,
  };
}

async function resolveSocalInteriorAssociation(transaction, db, nowIso) {
  if (!SOCAL_CLIENT_ID || !SOCAL_INTERIOR_MACHINE_ID) {
    fail(
      "socal_interior_contract_missing",
      "The canonical SoCal Interior identifiers are unavailable; no inventory was moved.",
      503
    );
  }
  const [clientSnapshot, machineSnapshot] = await Promise.all([
    transaction.get(db.collection("Client").doc(SOCAL_CLIENT_ID)),
    transaction.get(db.collection("Machine").doc(SOCAL_INTERIOR_MACHINE_ID)),
  ]);
  if (!clientSnapshot.exists) {
    fail(
      "socal_client_missing",
      "The canonical SoCal Lake Forest client is unavailable; no inventory was moved.",
      409
    );
  }
  if (!machineSnapshot.exists) {
    fail(
      "socal_interior_machine_unavailable",
      "The canonical SoCal Interior machine is unavailable; no inventory was moved.",
      409
    );
  }
  const clientData = clientSnapshot.data() || {};
  const machineData = machineSnapshot.data() || {};
  if (
    (clientData.machines !== undefined && !Array.isArray(clientData.machines)) ||
    (clientData.Machines !== undefined && !Array.isArray(clientData.Machines))
  ) {
    fail(
      "socal_interior_machine_ambiguous",
      "The canonical SoCal client has malformed machine links; no inventory was moved.",
      409
    );
  }
  const directClientIds = Array.from(
    new Set(
      [
        machineData.client,
        machineData.Client,
        machineData.clientId,
        machineData.ClientId,
      ]
        .map(referenceId)
        .filter(Boolean)
    )
  );
  const listedMachineIds = [
    ...(Array.isArray(clientData.machines) ? clientData.machines : []),
    ...(Array.isArray(clientData.Machines) ? clientData.Machines : []),
  ].map(referenceId);
  const clientHasMachineList =
    Array.isArray(clientData.machines) || Array.isArray(clientData.Machines);
  const directLinkIsCanonical =
    directClientIds.length === 1 && directClientIds[0] === SOCAL_CLIENT_ID;
  const clientListsMachine = listedMachineIds.includes(SOCAL_INTERIOR_MACHINE_ID);
  if (
    directClientIds.length > 1 ||
    (directClientIds.length === 1 && !directLinkIsCanonical) ||
    (clientHasMachineList && !clientListsMachine) ||
    (!directClientIds.length && !clientListsMachine)
  ) {
    fail(
      "socal_interior_machine_ambiguous",
      "The canonical SoCal Interior machine has a missing or conflicting client link; no inventory was moved.",
      409
    );
  }
  return {
    clientData,
    machineData,
    association: workOrderAddContract.buildAssociationSnapshot({
      associationType: "machine",
      clientId: SOCAL_CLIENT_ID,
      clientName: trailerLinks.clientName(
        clientData,
        "SoCalWarehouse - Lake Forest"
      ),
      clientLocation:
        trailerLinks.clientLocation(clientData) || "Lake Forest",
      machineId: SOCAL_INTERIOR_MACHINE_ID,
      machineName: clean(machineData.name || "Interior SoCal", 500),
      effectiveAt: nowIso,
      effectiveAtSource: "work-order-add",
      resolutionSource: "work-order-add-socal-interior",
    }),
  };
}

async function queryItemsInPallet(transaction, db, palletId) {
  const parsed = storageUnitContract.parseStorageUnitId(palletId);
  if (!parsed || parsed.type !== "pallet") {
    fail("invalid_pallet", "A staged pallet is invalid.");
  }
  const values = [parsed.number, String(parsed.number)];
  const collection = db.collection(ITEM_COLLECTION);
  const documents = new Map();
  for (const field of ["newLocalCurrent.pallet", "pallet", "Pallet"]) {
    const snapshot = await transaction.get(collection.where(field, "in", values));
    for (const document of snapshot.docs || []) documents.set(document.id, document);
  }
  const linkedBins = await transaction.get(
    db.collection(STORAGE_UNIT_COLLECTION).where("parentPalletId", "==", parsed.id)
  );
  for (const binDocument of linkedBins.docs || []) {
    const bin = storageUnitContract.parseStorageUnitId(binDocument.id);
    if (!bin || bin.type !== "bin") continue;
    const binItems = await placementContract.queryItemsInBin(transaction, db, bin.id);
    for (const item of binItems) documents.set(item.id, item.snapshot);
  }
  return Array.from(documents.values())
    .filter((document) => {
      const location = placementContract.canonicalCurrentLocation(document.data() || {});
      const current = storageUnitContract.parseStorageUnitId(`P${location.pallet}`);
      if (current?.id === parsed.id) return true;
      const binId = storageUnitContract.normalizeStorageUnitId(`B${location.bin}`);
      return Boolean(
        binId &&
          (linkedBins.docs || []).some(
            (binDocument) =>
              storageUnitContract.normalizeStorageUnitId(binDocument.id) === binId
          )
      );
    })
    .map((document) => ({
      id: document.id,
      data: document.data() || {},
      snapshot: document,
    }))
    .sort((left, right) => left.id.localeCompare(right.id, "en", { numeric: true }));
}

async function resolveScanItems(transaction, db, scans) {
  const normalizedScans = workOrderAddContract.normalizeScanCodes(scans, MAX_SCANS);
  if (normalizedScans.length > MAX_SCANS) {
    fail(
      "too_many_scans",
      `A Work order add list can contain at most ${MAX_SCANS} scans.`
    );
  }
  if (!normalizedScans.length) {
    fail("empty_scan_list", "Scan at least one item, bin, or pallet.");
  }
  const items = new Map();
  const resolutions = [];
  for (const code of normalizedScans) {
    const toolId = toolIdentity.parseToolScanCode(code);
    // The Tool namespace is distinct from Test. Never turn a tool's component
    // items into independent movements, or let an unknown tool fall back to an
    // unrelated inventory record with a similar serial number.
    let toolSnapshot = null;
    if (toolId) {
      toolSnapshot = await transaction.get(db.collection(TOOL_COLLECTION).doc(toolId));
    } else if (/^AIS[ _-]*T/i.test(code)) {
      fail("scan_invalid", "Scan a valid Tool ID such as AIS_T00001.", 400);
    } else if (/[/\\\u0000-\u001f\u007f]/.test(code)) {
      fail("scan_invalid", "Scan a complete item, tool, bin, or pallet code.", 400);
    }
    const resolution = toolId
      ? { status: toolSnapshot.exists ? "resolved" : "unknown", kind: "tool", toolId,
          canonicalCode: toolId, message: `${toolId} was not found in Tools.` }
      : await placementContract.resolveStorageUnitScan({ db, rawCode: code, transaction });
    if (resolution.status !== "resolved") {
      fail(
        `scan_${resolution.status || "invalid"}`,
        resolution.message || `${code} could not be resolved safely.`,
        resolution.status === "unknown" ? 404 : 409,
        { code, resolution }
      );
    }
    let resolvedItems = [];
    let targetData = null;
    if (resolution.kind === "tool") {
      const data = toolSnapshot.data() || {};
      if (data.deleted || data.deletedAt || data.archived === true || data.isArchived === true || data.isDeleted === true) {
        fail("tool_unavailable", `${toolId} is archived or deleted and cannot be moved.`, 409);
      }
      // Stored identity aliases, when present, must all identify this Tool.
      for (const field of ["id", "toolId", "localSN", "local_sn"]) {
        if (data[field] != null && clean(data[field]) && toolIdentity.normalizeToolId(data[field]) !== toolId) {
          fail("tool_identity_conflict", `${toolId} has conflicting saved identity fields.`, 409);
        }
      }
      targetData = data;
      resolvedItems = [{ id: toolId, kind: "tool", collection: TOOL_COLLECTION, data, snapshot: toolSnapshot }];
    } else if (resolution.kind === "item") {
      const itemRef = db.collection(ITEM_COLLECTION).doc(resolution.itemId);
      const itemSnapshot = await transaction.get(itemRef);
      if (!itemSnapshot.exists) {
        fail("item_not_found", `${resolution.itemId} no longer exists.`, 404);
      }
      resolvedItems = [
        { id: itemSnapshot.id, kind: "item", collection: ITEM_COLLECTION, data: itemSnapshot.data() || {}, snapshot: itemSnapshot },
      ];
      targetData = resolvedItems[0].data;
    } else if (resolution.kind === "bin") {
      resolvedItems = await placementContract.queryItemsInBin(
        transaction,
        db,
        resolution.storageUnitId
      );
    } else if (resolution.kind === "pallet") {
      resolvedItems = await queryItemsInPallet(
        transaction,
        db,
        resolution.storageUnitId
      );
    }
    if (resolution.kind === "bin" || resolution.kind === "pallet") {
      const unitSnapshot = await transaction.get(db.collection(STORAGE_UNIT_COLLECTION).doc(resolution.storageUnitId));
      if (!unitSnapshot.exists) fail("storage_unit_not_found", "The scanned storage unit no longer exists.", 409);
      targetData = unitSnapshot.data() || {};
    }
    if (!resolvedItems.length) {
      fail(
        "empty_storage_unit",
        `${resolution.storageUnitId || code} has no current inventory items to add.`,
        409
      );
    }
    for (const item of resolvedItems) {
      const key = `${item.kind || "item"}:${item.id}`;
      if (!items.has(key)) items.set(key, { ...item, kind: item.kind || "item", collection: item.collection || ITEM_COLLECTION });
    }
    resolutions.push({
      code,
      kind: resolution.kind,
      canonicalId:
        resolution.toolId || resolution.itemId || resolution.storageUnitId || resolution.canonicalCode,
      itemIds: resolvedItems.map((item) => item.id),
      targetName: itemDisplayName(targetData, resolution.storageUnitId
        ? `${resolution.kind === "bin" ? "Bin" : "Pallet"} ${storageUnitContract.parseStorageUnitId(resolution.storageUnitId).number}`
        : resolution.toolId || resolution.itemId),
      targetDescription: latestDescription(targetData),
    });
    if (items.size > MAX_ITEMS) {
      fail(
        "work_order_add_too_large",
        `This list expands to more than ${MAX_ITEMS} items. Split it into smaller confirmations.`,
        409
      );
    }
  }
  const identities = new Map();
  for (const item of items.values()) {
    const previous = identities.get(item.id);
    if (previous && previous !== item.kind) fail("scan_identity_conflict", `${item.id} identifies more than one inventory type.`, 409);
    identities.set(item.id, item.kind);
  }
  // Slack receipts remain keyed by ID. Reject any legacy Test ID that would
  // collide with a scanned container or Tool instead of merging their state.
  for (const resolved of resolutions) {
    const previous = identities.get(resolved.canonicalId);
    if (previous && previous !== resolved.kind) fail("scan_identity_conflict", `${resolved.canonicalId} identifies more than one inventory type.`, 409);
    identities.set(resolved.canonicalId, resolved.kind);
  }
  return { scans: normalizedScans, items: Array.from(items.values()), resolutions };
}

function latestDescription(data = {}) {
  const values = Array.isArray(data.descriptions) ? data.descriptions : [];
  const latest = values.map((value, index) => ({ value, index, date: Date.parse(value?.date) || 0 }))
    .sort((left, right) => right.date - left.date || left.index - right.index)[0]?.value;
  return clean(latest?.description || data.description, 12000);
}

function buildSlackTargets(resolutions) {
  const targets = new Map();
  for (const resolved of resolutions) {
    const id = resolved.canonicalId;
    const previous = targets.get(id);
    if (previous && previous.kind !== resolved.kind) fail("scan_identity_conflict", `${id} identifies more than one inventory type.`, 409);
    if (!previous) targets.set(id, { id, kind: resolved.kind, name: resolved.targetName || id,
      description: resolved.targetDescription || "", itemIds: [...resolved.itemIds] });
  }
  return [...targets.values()];
}

function itemDisplayName(data = {}, id = "") {
  const value = Array.isArray(data.name) ? data.name.join(", ") : data.name;
  return clean(value || data.localSN || data.local_sn || id, 300);
}

function localLocationLabel(data = {}) {
  return (
    clean(data.localLocCurrent, 300) ||
    placementContract.formatCurrentLocation(
      placementContract.canonicalCurrentLocation(data)
    ) ||
    "No warehouse position"
  );
}

function associationLabel(association, itemData = {}) {
  if (!association) return localLocationLabel(itemData);
  return [
    association.clientNameSnapshot || association.clientId,
    association.trailerNameSnapshot,
    association.machineNameSnapshot,
    localLocationLabel(itemData),
  ]
    .filter(Boolean)
    .join(" · ");
}

async function loadLiveTrailerContext(transaction, db, itemRows) {
  const ids = Array.from(
    new Set(
      itemRows
        .map((item) => itemLocationContract.extractBranchAssociation(item.data, "current"))
        .map((association) => association.trailerId)
        .filter(Boolean)
    )
  ).sort();
  const result = new Map();
  for (const trailerId of ids) {
    const trailerSnapshot = await transaction.get(
      db.collection("Trailers").doc(trailerId)
    );
    if (!trailerSnapshot.exists) continue;
    const trailerData = trailerSnapshot.data() || {};
    const clientId = trailerLinks.trailerClientId(trailerData);
    const machineId = trailerLinks.trailerMachineId(trailerData);
    let client = null;
    let machine = null;
    if (clientId) {
      const snapshot = await transaction.get(db.collection("Client").doc(clientId));
      if (snapshot.exists) client = { id: snapshot.id, data: snapshot.data() || {} };
    }
    if (machineId) {
      const snapshot = await transaction.get(db.collection("Machine").doc(machineId));
      if (snapshot.exists) machine = { id: snapshot.id, data: snapshot.data() || {} };
    }
    result.set(trailerId, {
      id: trailerSnapshot.id,
      data: trailerData,
      client,
      machine,
    });
  }
  return result;
}

async function validateCurrentAssociations(
  transaction,
  db,
  itemContexts,
  liveTrailers
) {
  const clients = new Map();
  const machines = new Map();
  const load = async (collection, id, cache) => {
    if (!cache.has(id)) {
      cache.set(id, await transaction.get(db.collection(collection).doc(id)));
    }
    return cache.get(id);
  };

  for (const item of itemContexts) {
    const association = item.currentAssociation;
    if (!association?.clientId) {
      fail(
        "current_location_missing",
        `${item.id} has no authoritative current client location; no inventory was moved.`,
        409,
        { itemId: item.id }
      );
    }

    if (association.trailerId) {
      const live = liveTrailers.get(association.trailerId);
      const liveClientId = live ? trailerLinks.trailerClientId(live.data) : "";
      const liveMachineId = live ? trailerLinks.trailerMachineId(live.data) : "";
      if (
        !live ||
        !live.client ||
        !live.machine ||
        !liveClientId ||
        !liveMachineId ||
        liveClientId !== association.clientId ||
        liveMachineId !== association.machineId ||
        !machineBelongsToClient(
          live.machine.data,
          live.client.data,
          liveMachineId,
          liveClientId
        )
      ) {
        fail(
          "current_trailer_location_invalid",
          `${item.id}'s current trailer, client, or machine link is missing or inconsistent; no inventory was moved.`,
          409,
          { itemId: item.id, trailerId: association.trailerId }
        );
      }
      continue;
    }

    const clientSnapshot = await load(
      "Client",
      association.clientId,
      clients
    );
    if (!clientSnapshot.exists) {
      fail(
        "current_client_missing",
        `${item.id}'s current client no longer exists; no inventory was moved.`,
        409,
        { itemId: item.id, clientId: association.clientId }
      );
    }
    if (association.machineId) {
      const machineSnapshot = await load(
        "Machine",
        association.machineId,
        machines
      );
      if (
        !machineSnapshot.exists ||
        !machineBelongsToClient(
          machineSnapshot.data() || {},
          clientSnapshot.data() || {},
          association.machineId,
          association.clientId
        )
      ) {
        fail(
          "current_machine_location_invalid",
          `${item.id}'s current machine link is missing or inconsistent; no inventory was moved.`,
          409,
          { itemId: item.id, machineId: association.machineId }
        );
      }
    }
  }
}

function publicItemSummary(item, association) {
  return {
    id: item.id,
    kind: item.kind || "item",
    name: itemDisplayName(item.data, item.id),
    currentLocation: associationLabel(association, item.data),
  };
}

function publicConfigurationBranch(configuration = {}, branch) {
  const suffix = branch === "from" ? "From" : "Current";
  const raw = configuration[`association${suffix}`];
  const association = raw && typeof raw === "object" && !Array.isArray(raw)
    ? raw
    : {};
  const clientId = referenceId(
    association.clientId ||
      configuration[`client${suffix}Id`] ||
      configuration[`Client${suffix}`]
  );
  const machineId = referenceId(
    association.machineId ||
      configuration[`machine${suffix}Id`] ||
      configuration[`Machine${suffix}`]
  );
  const trailerId = referenceId(
    association.trailerId ||
      configuration[`trailer${suffix}Id`] ||
      configuration[`Trailer${suffix}`]
  );
  if (!clientId && !machineId && !trailerId) return null;
  return {
    associationType: clean(
      association.associationType ||
        configuration[`${branch}AssociationType`] ||
        (trailerId ? "trailer" : machineId ? "machine" : "site"),
      40
    ),
    clientId,
    clientNameSnapshot: clean(
      association.clientNameSnapshot || association.clientName,
      240
    ),
    machineId,
    machineNameSnapshot: clean(
      association.machineNameSnapshot || association.machineName,
      240
    ),
    trailerId,
    trailerNameSnapshot: clean(
      association.trailerNameSnapshot || association.trailerName,
      240
    ),
  };
}

function publicConfigurationSummary(configuration = {}) {
  return {
    from: publicConfigurationBranch(configuration, "from"),
    current: publicConfigurationBranch(configuration, "current"),
    localFromText: clean(configuration.localLocFrom, 500),
    localCurrentText: clean(configuration.localLocCurrent, 500),
  };
}

async function previewWorkOrderAddScan({ db, rawCode }) {
  if (!db) fail("database_unavailable", "The inventory database is unavailable.", 503);
  const reader = { get: (referenceOrQuery) => referenceOrQuery.get() };
  const { scans, items, resolutions } = await resolveScanItems(reader, db, [rawCode]);
  const liveTrailers = await loadLiveTrailerContext(reader, db, items);
  const itemSummaries = items.map((item) => {
    const stored = itemLocationContract.extractBranchAssociation(item.data, "current");
    const currentAssociation = normalizeCurrentAssociation(
      item.data,
      liveTrailers.get(stored.trailerId)
    );
    return {
      ...publicItemSummary(item, currentAssociation),
      currentSocal: workOrderAddContract.isSocalAssociation(
        currentAssociation,
        { socalClientId: SOCAL_CLIENT_ID }
      ),
    };
  });
  const resolved = resolutions[0];
  const firstItem = items[0];
  return {
    status: "ready",
    kind: resolved.kind,
    canonicalId: resolved.canonicalId,
    code: scans[0],
    itemIds: [...resolved.itemIds],
    entityKeys: resolved.itemIds.map((id) => `${resolved.kind === "tool" ? "tool" : "item"}:${id}`),
    membershipFingerprint: membershipFingerprint(resolved),
    nonSocalItemCount: itemSummaries.filter((item) => !item.currentSocal).length,
    preview: {
      id: resolved.canonicalId,
      name: resolved.targetName,
      description: resolved.targetDescription,
      entityKeys: resolved.itemIds.map((id) => `${resolved.kind === "tool" ? "tool" : "item"}:${id}`),
      pn: firstItem?.data?.pn || [],
      sn: firstItem?.data?.sn || [],
      currentLocation:
        itemSummaries.length === 1
          ? itemSummaries[0].currentLocation
          : `${itemSummaries.length} contained items`,
      itemCount: itemSummaries.length,
      items: itemSummaries.slice(0, 20),
    },
  };
}

function requestInput({
  operationId,
  workOrderId,
  scans,
  movementMode,
  expectedMembership,
}) {
  const safeOperationId = workOrderAddContract.normalizeOperationId(operationId);
  const safeWorkOrderId = normalizeWorkOrderId(workOrderId);
  const safeScans = workOrderAddContract.normalizeScanCodes(scans, MAX_SCANS);
  if (safeScans.length > MAX_SCANS) {
    fail(
      "too_many_scans",
      `A Work order add list can contain at most ${MAX_SCANS} scans.`
    );
  }
  const safeMovementMode = workOrderAddContract.normalizeMovementMode(movementMode);
  if (!safeOperationId) {
    fail("invalid_operation_id", "Start a new Work order add confirmation.");
  }
  if (!safeWorkOrderId) fail("invalid_work_order", "Select a valid work order.");
  if (!safeScans.length) fail("empty_scan_list", "Scan at least one inventory record.");
  const safeExpectedMembership = normalizeExpectedMembership(
    expectedMembership,
    safeScans
  );
  return {
    operationId: safeOperationId,
    workOrderId: safeWorkOrderId,
    scans: safeScans,
    movementMode: safeMovementMode,
    expectedMembership: safeExpectedMembership,
  };
}

async function confirmWorkOrderAdd({
  db,
  authUser,
  operationId,
  workOrderId,
  scans,
  movementMode,
  expectedMembership,
  nowMs = Date.now(),
}) {
  if (!db || typeof db.runTransaction !== "function") {
    fail("database_unavailable", "The inventory database is unavailable.", 503);
  }
  const input = requestInput({
    operationId,
    workOrderId,
    scans,
    movementMode,
    expectedMembership,
  });
  const actor = actorFromAuth(authUser);
  if (!actor.uid) fail("auth_required", "Authentication is required.", 401);
  const requestHash = operationRequestHash(input);
  const now = new Date(nowMs);
  const nowIso = now.toISOString();
  const movementDate = dateInLosAngeles(now);
  const operationRef = db.collection(OPERATION_COLLECTION).doc(input.operationId);

  return db.runTransaction(async (transaction) => {
    const operationSnapshot = await transaction.get(operationRef);
    if (operationSnapshot.exists) {
      const existing = operationSnapshot.data() || {};
      if (
        existing.requestHash !== requestHash ||
        clean(existing.createdBy?.uid, 128) !== actor.uid
      ) {
        fail(
          "operation_conflict",
          "This confirmation ID was already used for another Work order add.",
          409
        );
      }
      return { ...(existing.result || {}), alreadyConfirmed: true };
    }

    const destination = await resolveWorkOrderDestination(
      transaction,
      db,
      input.workOrderId,
      nowIso
    );
    const resolved = await resolveScanItems(transaction, db, input.scans);
    for (let index = 0; index < resolved.resolutions.length; index += 1) {
      const actual = membershipFingerprint(resolved.resolutions[index]);
      const expected = input.expectedMembership[index];
      if (!expected || expected.fingerprint !== actual) {
        fail(
          "staged_membership_changed",
          `${resolved.resolutions[index]?.canonicalId || input.scans[index]} changed after it was scanned. Review the refreshed contents before confirming.`,
          409,
          { code: input.scans[index] }
        );
      }
    }
    const socalInterior = await resolveSocalInteriorAssociation(
      transaction,
      db,
      nowIso
    );
    const itemContexts = resolved.items;
    const plans = itemContexts.map((item) =>
      (item.kind === "tool" ? buildToolMovementPlan : workOrderAddContract.buildWorkOrderMovementPlan)({
        itemId: item.id,
        itemData: item.data,
        destinationAssociation: destination.association,
        socalAssociation: socalInterior.association,
        movementMode: input.movementMode,
        actor,
        workOrder: destination.workOrder,
        operationId: input.operationId,
        nowIso,
        date: movementDate,
      })
    );

    const auditRefs = plans.map((plan, index) =>
      db
        .collection(itemContexts[index].collection)
        .doc(plan.itemId)
        .collection(ITEM_AUDIT_COLLECTION)
        .doc(input.operationId)
    );
    for (let index = 0; index < auditRefs.length; index += 1) {
      const auditSnapshot = await transaction.get(auditRefs[index]);
      if (auditSnapshot.exists) {
        fail(
          "item_audit_conflict",
          `${plans[index].itemId} already has history for this confirmation ID; no inventory was moved.`,
          409,
          { itemId: plans[index].itemId }
        );
      }
    }

    const itemPlans = plans.filter((plan, index) => itemContexts[index].kind !== "tool");
    const affectedMachineIds = Array.from(
      new Set(
        itemPlans.flatMap((plan) => [
          ...(plan.previousMachineIds || []),
          ...(plan.nextMachineIds || []),
        ])
      )
    )
      .filter(Boolean)
      .sort();
    const machineSnapshots = new Map();
    for (const machineId of affectedMachineIds) {
      const snapshot = await transaction.get(db.collection("Machine").doc(machineId));
      machineSnapshots.set(machineId, snapshot);
    }
    for (const plan of itemPlans) {
      for (const machineId of plan.nextMachineIds || []) {
        if (!machineSnapshots.get(machineId)?.exists) {
          fail(
            "associated_machine_missing",
            `Machine ${machineId} no longer exists; no inventory was moved.`,
            409
          );
        }
      }
    }

    const machineUpdates = new Map();
    for (const machineId of affectedMachineIds) {
      const snapshot = machineSnapshots.get(machineId);
      if (!snapshot?.exists) continue;
      const data = snapshot.data() || {};
      // Some high-volume warehouse machines intentionally opt out of complete
      // associatedParts backlinks. Item branch associations remain canonical;
      // never turn a partial opt-out list into a misleading second truth.
      if (data.skipAssociatedParts === true) continue;
      if (data.associatedParts !== undefined && !Array.isArray(data.associatedParts)) {
        fail(
          "invalid_machine_backlinks",
          `Machine ${machineId} has an invalid associated-parts list; no inventory was moved.`,
          409
        );
      }
      let associatedParts = data.associatedParts || [];
      for (const plan of itemPlans) {
        const affectsMachine =
          (plan.previousMachineIds || []).includes(machineId) ||
          (plan.nextMachineIds || []).includes(machineId);
        if (!affectsMachine) continue;
        associatedParts = workOrderAddContract.canonicalizeAssociatedPartsForItem({
          associatedParts,
          partId: plan.itemId,
          partRef: db.collection(ITEM_COLLECTION).doc(plan.itemId),
          includePart: (plan.nextMachineIds || []).includes(machineId),
        });
      }
      machineUpdates.set(machineId, associatedParts);
    }

    const estimatedWrites = plans.length * 2 + machineUpdates.size + 1;
    if (estimatedWrites > MAX_TRANSACTION_WRITES) {
      fail(
        "work_order_add_write_limit",
        `This confirmation requires ${estimatedWrites} writes; the safe limit is ${MAX_TRANSACTION_WRITES}.`,
        409,
        { estimatedWrites, maxWrites: MAX_TRANSACTION_WRITES }
      );
    }

    const publicItems = [];
    for (let index = 0; index < plans.length; index += 1) {
      const plan = plans[index];
      const source = itemContexts[index];
      const itemRef = db.collection(source.collection).doc(plan.itemId);
      const nextItem = (source.kind === "tool" ? materializeToolReferences : materializeAssociationReferences)(db, {
        ...plan.nextItem,
        lastEdited: actor.email,
        updatedAt: now,
      });
      transaction.set(itemRef, nextItem, { merge: false });
      const auditData = {
        ...plan.audit,
        operationId: input.operationId,
        workOrderId: destination.workOrder.id,
        workOrderNumber: destination.workOrder.number,
        createdAt: now,
        createdBy: actor,
      };
      if (typeof transaction.create === "function") {
        transaction.create(auditRefs[index], auditData);
      } else {
        transaction.set(auditRefs[index], auditData, { merge: false });
      }
      publicItems.push({
        id: plan.itemId,
        kind: source.kind,
        collection: source.collection,
        name: itemDisplayName(source.data, plan.itemId),
        before: publicConfigurationSummary(plan.audit.beforeConfiguration),
        after: publicConfigurationSummary(plan.audit.afterConfiguration),
        workOrderAssignmentAdded: plan.workOrderAssignmentAdded,
        transitionCount: plan.transitions.length,
      });
    }
    for (const [machineId, associatedParts] of machineUpdates.entries()) {
      transaction.set(
        db.collection("Machine").doc(machineId),
        { associatedParts },
        { merge: true }
      );
    }

    const result = {
      ok: true,
      alreadyConfirmed: false,
      operationId: input.operationId,
      workOrder: destination.workOrder,
      movementMode: input.movementMode,
      scanCount: resolved.scans.length,
      itemCount: publicItems.length,
      workOrderAssignmentAddedCount: plans.filter(
        (plan) => plan.workOrderAssignmentAdded
      ).length,
      estimatedWrites,
      items: publicItems.slice(0, MAX_OPERATION_RESULT_ITEMS),
      // Slack is a scan-root summary, deliberately not the expanded movement
      // manifest above. Both are saved atomically, never trusted from HTTP.
      slackTargets: buildSlackTargets(resolved.resolutions),
      completedAt: nowIso,
      completedBy: actor,
    };
    transaction.set(
      operationRef,
      {
        schemaVersion: 3,
        type: "work_order_add_movement",
        requestHash,
        workOrderId: input.workOrderId,
        scanCodes: resolved.scans,
        expectedMembership: input.expectedMembership,
        movementMode: input.movementMode,
        createdAt: now,
        createdBy: actor,
        result,
      },
      { merge: false }
    );
    return result;
  });
}

module.exports = {
  ITEM_AUDIT_COLLECTION,
  ITEM_COLLECTION,
  TOOL_COLLECTION,
  LEGACY_ASSOCIATION_FIELDS,
  MAX_ITEMS,
  MAX_SCANS,
  MAX_TRANSACTION_WRITES,
  OPERATION_COLLECTION,
  OPS_WORK_ORDER_COLLECTION,
  SOCAL_CLIENT_ID,
  SOCAL_INTERIOR_MACHINE_ID,
  WorkOrderAddError,
  actorFromAuth,
  buildSlackTargets,
  buildToolMovementPlan,
  confirmWorkOrderAdd,
  dateInLosAngeles,
  materializeAssociationReferences,
  materializeToolReferences,
  membershipFingerprint,
  normalizeCurrentAssociation,
  normalizeWorkOrderId,
  operationRequestHash,
  previewWorkOrderAddScan,
  queryItemsInPallet,
  resolveScanItems,
  resolveSocalInteriorAssociation,
  resolveWorkOrderDestination,
  validateCurrentAssociations,
};
