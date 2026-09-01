"use strict";

const crypto = require("node:crypto");
const itemLocationContract = require("./itemLocationContract.cjs");
const placementContract = require("./storageUnitPlacement.cjs");
const storageUnitContract = require("./storageUnitContract.cjs");
const workOrderAddContract = require("./workOrderAddContract.cjs");
const trailerLinks = require("../ops/trailerClientLinks.cjs");

const OPS_WORK_ORDER_COLLECTION = "OpsWorkOrders";
const ITEM_COLLECTION = "Test";
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
  const clientId = clean(workOrderData.clientId, 180);
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
  const clientData = clientSnapshot.data() || {};
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

  let machineData = null;
  if (machineId) {
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
    resolutionSource: "magmo-work-order",
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
    const resolution = await placementContract.resolveStorageUnitScan({
      db,
      rawCode: code,
      transaction,
    });
    if (resolution.status !== "resolved") {
      fail(
        `scan_${resolution.status || "invalid"}`,
        resolution.message || `${code} could not be resolved safely.`,
        resolution.status === "unknown" ? 404 : 409,
        { code, resolution }
      );
    }
    let resolvedItems = [];
    if (resolution.kind === "item") {
      const itemRef = db.collection(ITEM_COLLECTION).doc(resolution.itemId);
      const itemSnapshot = await transaction.get(itemRef);
      if (!itemSnapshot.exists) {
        fail("item_not_found", `${resolution.itemId} no longer exists.`, 404);
      }
      resolvedItems = [
        { id: itemSnapshot.id, data: itemSnapshot.data() || {}, snapshot: itemSnapshot },
      ];
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
    if (!resolvedItems.length) {
      fail(
        "empty_storage_unit",
        `${resolution.storageUnitId || code} has no current inventory items to add.`,
        409
      );
    }
    for (const item of resolvedItems) {
      if (!items.has(item.id)) items.set(item.id, item);
    }
    resolutions.push({
      code,
      kind: resolution.kind,
      canonicalId:
        resolution.itemId || resolution.storageUnitId || resolution.canonicalCode,
      itemIds: resolvedItems.map((item) => item.id),
    });
    if (items.size > MAX_ITEMS) {
      fail(
        "work_order_add_too_large",
        `This list expands to more than ${MAX_ITEMS} items. Split it into smaller confirmations.`,
        409
      );
    }
  }
  return { scans: normalizedScans, items: Array.from(items.values()), resolutions };
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
    membershipFingerprint: membershipFingerprint(resolved),
    nonSocalItemCount: itemSummaries.filter((item) => !item.currentSocal).length,
    preview: {
      id: resolved.canonicalId,
      name:
        resolved.kind === "item"
          ? itemDisplayName(firstItem.data, firstItem.id)
          : `${resolved.kind === "bin" ? "Bin" : "Pallet"} ${resolved.canonicalId}`,
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
      workOrderAddContract.buildWorkOrderMovementPlan({
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

    const auditRefs = plans.map((plan) =>
      db
        .collection(ITEM_COLLECTION)
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

    const affectedMachineIds = Array.from(
      new Set(
        plans.flatMap((plan) => [
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
    for (const plan of plans) {
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
      for (const plan of plans) {
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
      const itemRef = db.collection(ITEM_COLLECTION).doc(plan.itemId);
      const nextItem = materializeAssociationReferences(db, {
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
      completedAt: nowIso,
      completedBy: actor,
    };
    transaction.set(
      operationRef,
      {
        schemaVersion: 2,
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
  confirmWorkOrderAdd,
  dateInLosAngeles,
  materializeAssociationReferences,
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
