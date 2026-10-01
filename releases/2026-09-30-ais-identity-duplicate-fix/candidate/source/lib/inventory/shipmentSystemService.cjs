"use strict";

const crypto = require("node:crypto");
const shipmentContract = require("./shipmentSystemContract.cjs");
const { normalizeItemAisValue, getItemAisLookupValues } = require("../items/itemIdentity.cjs");

const OPERATION_COLLECTION = "InventoryShipmentOperations";
const ITEM_COLLECTION = "Test";
const MACHINE_COLLECTION = "Machine";
const CLIENT_COLLECTION = "Client";
const ITEM_AUDIT_COLLECTION = "ShipmentHistory";
const MAX_TRANSACTION_WRITES = 450;
const MAX_ID_ATTEMPTS = 20;
const RETIRED_TRAILER_CLIENT_ID = "AIS62854";

class ShipmentSystemServiceError extends Error {
  constructor(code, message, statusCode = 400, details = undefined) {
    super(message);
    this.name = "ShipmentSystemServiceError";
    this.code = code;
    this.statusCode = statusCode;
    if (details !== undefined) this.details = details;
  }
}

function fail(code, message, statusCode = 400, details) {
  throw new ShipmentSystemServiceError(code, message, statusCode, details);
}

function clean(value, maxLength = 500) {
  return String(value == null ? "" : value).trim().slice(0, maxLength);
}

function normalizeDocumentId(value, label) {
  const id = clean(value, 180);
  if (!id || id.includes("/") || !/^[A-Za-z0-9][A-Za-z0-9._:-]{0,179}$/.test(id)) {
    fail("invalid_document_id", `${label} is invalid.`);
  }
  return id;
}

function normalizeOperationId(value) {
  const operationId = normalizeDocumentId(value, "Operation ID");
  if (operationId.length < 8) {
    fail("invalid_operation_id", "Operation ID is too short.");
  }
  return operationId;
}

function actorFromAuth(authUser = {}) {
  const uid = clean(authUser.uid, 128);
  const email = clean(authUser.email, 320).toLowerCase();
  if (!uid || !email) fail("auth_required", "Authentication is required.", 401);
  return {
    uid,
    email,
    name: clean(
      authUser.magmoName || authUser.name || authUser.displayName || email,
      240
    ),
  };
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, stableValue(value[key])])
  );
}

function requestHash(value) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(stableValue(value)))
    .digest("hex");
}

function referenceId(value) {
  if (!value) return "";
  if (typeof value === "string") {
    return clean(value.split("/").filter(Boolean).pop(), 180);
  }
  if (value.id) return clean(value.id, 180);
  return referenceId(value.path);
}

function clientSummary(snapshot) {
  if (!snapshot?.exists) return null;
  const data = snapshot.data() || {};
  return {
    id: snapshot.id,
    name: clean(data.name || data.clientName || snapshot.id, 240),
    location: clean(data.location || data.local || data.clientLocation || "", 500),
  };
}

function machineSummary(snapshot) {
  if (!snapshot?.exists) return null;
  const data = snapshot.data() || {};
  return {
    id: snapshot.id,
    name: clean(data.name || snapshot.id, 240),
    location: clean(data.location || data.local || "", 500),
  };
}

function dateInLosAngeles(date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function randomAisId() {
  // Bulk packing lists can reserve hundreds of IDs at once. Keep the familiar
  // AIS prefix while using a large enough numeric space that an otherwise
  // valid batch is not repeatedly rejected as the inventory grows.
  return `AIS${crypto.randomInt(10000000, 100000000)}`;
}

function transactionCreate(transaction, ref, data) {
  if (typeof transaction.create === "function") {
    transaction.create(ref, data);
  } else {
    transaction.set(ref, data, { merge: false });
  }
}

function assertReceipt(existing, { actor, hash, type }) {
  if (
    clean(existing.requestHash, 100) !== hash ||
    clean(existing.type, 100) !== type ||
    clean(existing.createdBy?.uid, 128) !== actor.uid
  ) {
    fail(
      "operation_conflict",
      "This operation ID was already used for another shipment request.",
      409
    );
  }
  return { ...(existing.result || {}), alreadyConfirmed: true };
}

function uniqueReferences(values = []) {
  const seen = new Set();
  const output = [];
  for (const value of values) {
    const id = referenceId(value);
    const key = id || `unknown:${output.length}`;
    if (!value || seen.has(key)) continue;
    seen.add(key);
    output.push(value);
  }
  return output;
}

function materializeAssociationReferences(db, record) {
  const next = { ...record };
  next.ClientFrom = db.collection(CLIENT_COLLECTION).doc(record.clientFromId);
  next.ClientCurrent = db
    .collection(CLIENT_COLLECTION)
    .doc(record.clientCurrentId);
  next.MachineFrom = db
    .collection(MACHINE_COLLECTION)
    .doc(record.machineFromId);
  next.MachineCurrent = db
    .collection(MACHINE_COLLECTION)
    .doc(record.machineCurrentId);
  if (record.shipmentSystemId) {
    next.ShipmentSystem = db
      .collection(MACHINE_COLLECTION)
      .doc(record.shipmentSystemId);
  }
  return next;
}

function normalizePartSearchText(value) {
  return clean(value, 5000)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function buildPrefixTokens(values, maxTokens = 1500) {
  const output = new Set();
  for (const raw of values) {
    const normalized = normalizePartSearchText(raw);
    if (!normalized) continue;
    output.add(normalized);
    for (const word of normalized.split(" ").filter(Boolean)) {
      output.add(word);
      for (let length = 1; length <= word.length; length += 1) {
        output.add(word.slice(0, length));
        if (output.size >= maxTokens) return Array.from(output);
      }
    }
  }
  return Array.from(output).slice(0, maxTokens);
}

function addSearchTokens(record, itemId) {
  const description = record.descriptions?.[0]?.description || "";
  const values = [
    record.name,
    description,
    itemId,
    record.shipmentSystemName,
    record.shipmentUnitType,
    record.associationFrom?.clientNameSnapshot,
    record.associationFrom?.machineNameSnapshot,
    record.associationCurrent?.clientNameSnapshot,
    record.associationCurrent?.machineNameSnapshot,
  ];
  return {
    ...record,
    nameTokens: buildPrefixTokens([record.name], 1000),
    generalSearchTokens: buildPrefixTokens(values, 1500),
  };
}

function systemPublicSummary(id, record) {
  const route = record.shipmentRoute || {
    direction: record.shipmentDirection,
    from: record.associationFrom,
    current: record.associationCurrent,
  };
  return {
    id,
    name: clean(record.name, 240),
    direction: route.direction,
    from: {
      clientId: route.from.clientId,
      clientName: route.from.clientNameSnapshot,
      machineId: route.from.machineId,
      machineName: route.from.machineNameSnapshot,
    },
    current: {
      clientId: route.current.clientId,
      clientName: route.current.clientNameSnapshot,
      machineId: route.current.machineId,
      machineName: route.current.machineNameSnapshot,
    },
    itemCount: Number(record.shipmentItemCount) || 0,
    status: clean(record.shipmentStatus, 80) || "open",
  };
}

async function createShipmentSystem({
  db,
  authUser,
  operationId,
  name,
  direction,
  externalClientId,
  nowMs = Date.now(),
  idFactory = randomAisId,
} = {}) {
  if (!db || typeof db.runTransaction !== "function") {
    fail("database_unavailable", "The inventory database is unavailable.", 503);
  }
  const actor = actorFromAuth(authUser);
  const input = {
    operationId: normalizeOperationId(operationId),
    name: clean(name, 240),
    direction: shipmentContract.normalizeShipmentDirection(direction),
    externalClientId: normalizeDocumentId(externalClientId, "External client/site"),
  };
  if (!input.name) fail("system_name_required", "Enter a shipment-system name.");
  if (input.externalClientId === RETIRED_TRAILER_CLIENT_ID) {
    fail(
      "retired_client",
      "AIS TRAILERS is retired. Select the actual external client/site."
    );
  }
  if (input.externalClientId === shipmentContract.SOCAL_CLIENT_ID) {
    fail(
      "external_client_required",
      "Select the external shipment client/site; Magmo adds SoCal automatically."
    );
  }
  const hash = requestHash(input);
  const now = new Date(nowMs);
  const nowIso = now.toISOString();
  const movementDate = dateInLosAngeles(now);
  const receiptRef = db.collection(OPERATION_COLLECTION).doc(input.operationId);

  for (let attempt = 0; attempt < MAX_ID_ATTEMPTS; attempt += 1) {
    const candidateId = normalizeDocumentId(idFactory(attempt), "Generated system ID");
    try {
      return await db.runTransaction(async (transaction) => {
        const receiptSnapshot = await transaction.get(receiptRef);
        if (receiptSnapshot.exists) {
          return assertReceipt(receiptSnapshot.data() || {}, {
            actor,
            hash,
            type: "shipment_system_create",
          });
        }

        const externalRef = db
          .collection(CLIENT_COLLECTION)
          .doc(input.externalClientId);
        const warehouseClientRef = db
          .collection(CLIENT_COLLECTION)
          .doc(shipmentContract.SOCAL_CLIENT_ID);
        const warehouseMachineRef = db
          .collection(MACHINE_COLLECTION)
          .doc(shipmentContract.SOCAL_INTERIOR_MACHINE_ID);
        const systemRef = db.collection(MACHINE_COLLECTION).doc(candidateId);
        const [
          externalSnapshot,
          warehouseClientSnapshot,
          warehouseMachineSnapshot,
          systemSnapshot,
        ] = await Promise.all([
          transaction.get(externalRef),
          transaction.get(warehouseClientRef),
          transaction.get(warehouseMachineRef),
          transaction.get(systemRef),
        ]);
        if (!externalSnapshot.exists) {
          fail(
            "external_client_missing",
            "The selected external client/site no longer exists.",
            409
          );
        }
        if (!warehouseClientSnapshot.exists || !warehouseMachineSnapshot.exists) {
          fail(
            "warehouse_endpoint_missing",
            "The canonical SoCal Warehouse Interior endpoint is unavailable.",
            503
          );
        }
        if (systemSnapshot.exists) {
          fail(
            "generated_id_collision",
            "The generated shipment-system ID is already in use.",
            409
          );
        }

        const externalData = externalSnapshot.data() || {};
        if (
          externalData.machines !== undefined &&
          !Array.isArray(externalData.machines)
        ) {
          fail(
            "invalid_client_machines",
            "The selected client/site has an invalid machine list; no shipment system was created.",
            409
          );
        }
        const warehouseMachineData = warehouseMachineSnapshot.data() || {};
        const warehouseOwnerId = referenceId(
          warehouseMachineData.client || warehouseMachineData.Client
        );
        if (
          warehouseOwnerId &&
          warehouseOwnerId !== shipmentContract.SOCAL_CLIENT_ID
        ) {
          fail(
            "invalid_warehouse_endpoint",
            "The SoCal Interior machine is not linked to the canonical warehouse client.",
            409
          );
        }

        const route = shipmentContract.buildShipmentRoute({
          direction: input.direction,
          system: { id: candidateId, name: input.name },
          externalClient: clientSummary(externalSnapshot),
          warehouseClient: clientSummary(warehouseClientSnapshot),
          warehouseMachine: machineSummary(warehouseMachineSnapshot),
          effectiveAt: movementDate,
        });
        const baseRecord = shipmentContract.buildShipmentSystemRecord({
          id: candidateId,
          name: input.name,
          route,
          actorEmail: actor.email,
          nowIso,
        });
        const systemRecord = materializeAssociationReferences(db, {
          ...baseRecord,
          shipmentOwnerClientId: input.externalClientId,
          client: externalRef,
          createdAt: now,
          updatedAt: now,
        });
        const clientMachines = uniqueReferences([
          ...(externalData.machines || []),
          systemRef,
        ]);
        const result = {
          ok: true,
          alreadyConfirmed: false,
          operationId: input.operationId,
          system: systemPublicSummary(candidateId, systemRecord),
          completedAt: nowIso,
          completedBy: actor,
        };

        transactionCreate(transaction, systemRef, systemRecord);
        transaction.set(externalRef, { machines: clientMachines }, { merge: true });
        transactionCreate(transaction, receiptRef, {
          schemaVersion: 1,
          type: "shipment_system_create",
          requestHash: hash,
          systemId: candidateId,
          createdAt: now,
          createdBy: actor,
          result,
        });
        return result;
      });
    } catch (error) {
      if (
        error?.code === "generated_id_collision" &&
        attempt + 1 < MAX_ID_ATTEMPTS
      ) {
        continue;
      }
      throw error;
    }
  }
  fail(
    "system_id_unavailable",
    "Magmo could not reserve a unique shipment-system ID. Try again.",
    409
  );
}

function normalizeSystemRoute(record, systemId) {
  const route = record.shipmentRoute || {
    direction: record.shipmentDirection,
    from: record.associationFrom,
    current: record.associationCurrent,
  };
  const validated = shipmentContract.validateShipmentRoute(route, systemId);
  return {
    schemaVersion: 1,
    direction: validated.direction,
    from: { ...validated.from },
    current: { ...validated.current },
  };
}

function newItemIds(count, idFactory) {
  const ids = new Set();
  let guard = 0;
  while (ids.size < count && guard < count * 50 + 100) {
    ids.add(normalizeDocumentId(normalizeItemAisValue(idFactory(guard)), "Generated item ID"));
    guard += 1;
  }
  if (ids.size !== count) {
    fail(
      "item_id_unavailable",
      "Magmo could not reserve enough unique item IDs. Try again.",
      409
    );
  }
  return Array.from(ids);
}

async function addShipmentItems({
  db,
  authUser,
  operationId,
  systemId,
  items,
  nowMs = Date.now(),
  idFactory = randomAisId,
} = {}) {
  if (!db || typeof db.runTransaction !== "function") {
    fail("database_unavailable", "The inventory database is unavailable.", 503);
  }
  const actor = actorFromAuth(authUser);
  const normalizedItems = shipmentContract.validateShipmentItems(items);
  const input = {
    operationId: normalizeOperationId(operationId),
    systemId: normalizeDocumentId(systemId, "Shipment system ID"),
    items: normalizedItems,
  };
  const estimatedWrites = normalizedItems.length * 2 + 3;
  if (estimatedWrites > MAX_TRANSACTION_WRITES) {
    fail(
      "shipment_write_limit",
      `This request requires ${estimatedWrites} writes; the safe limit is ${MAX_TRANSACTION_WRITES}.`,
      409,
      { estimatedWrites, maxWrites: MAX_TRANSACTION_WRITES }
    );
  }
  const hash = requestHash(input);
  const now = new Date(nowMs);
  const nowIso = now.toISOString();
  const movementDate = dateInLosAngeles(now);
  const receiptRef = db.collection(OPERATION_COLLECTION).doc(input.operationId);
  const systemRef = db.collection(MACHINE_COLLECTION).doc(input.systemId);

  for (let attempt = 0; attempt < MAX_ID_ATTEMPTS; attempt += 1) {
    const candidateIds = newItemIds(normalizedItems.length, (index) =>
      idFactory(attempt, index)
    );
    try {
      return await db.runTransaction(async (transaction) => {
        const receiptSnapshot = await transaction.get(receiptRef);
        if (receiptSnapshot.exists) {
          return assertReceipt(receiptSnapshot.data() || {}, {
            actor,
            hash,
            type: "shipment_items_add",
          });
        }

        const systemSnapshot = await transaction.get(systemRef);
        if (!systemSnapshot.exists) {
          fail(
            "shipment_system_missing",
            "The selected shipment system no longer exists.",
            404
          );
        }
        const systemData = systemSnapshot.data() || {};
        if (systemData.shipmentSystem !== true) {
          fail(
            "not_shipment_system",
            "The selected machine is not a shipment system.",
            409
          );
        }
        const route = normalizeSystemRoute(systemData, input.systemId);
        const targetRefs = candidateIds.map((itemId) =>
          db.collection(ITEM_COLLECTION).doc(itemId)
        );
        // The Admin SDK bypasses client rules. Reserve the logical AIS identity,
        // including numeric-only legacy documents, inside this same transaction.
        const identityIds = [...new Set(candidateIds.flatMap(getItemAisLookupValues))];
        const identityRefs = identityIds.map((itemId) =>
          db.collection(ITEM_COLLECTION).doc(itemId)
        );
        const reservedRefs = identityIds.map((itemId) =>
          db.collection("ArchivedItemIds").doc(itemId)
        );
        const machineIds = Array.from(
          new Set([route.from.machineId, route.current.machineId])
        ).sort();
        const machineRefs = machineIds.map((machineId) =>
          db.collection(MACHINE_COLLECTION).doc(machineId)
        );
        const [targetSnapshots, reservedSnapshots, otherMachineSnapshots] = await Promise.all([
          Promise.all(identityRefs.map((ref) => transaction.get(ref))),
          Promise.all(reservedRefs.map((ref) => transaction.get(ref))),
          Promise.all(
            machineRefs.map((ref) =>
              ref.id === input.systemId
                ? Promise.resolve(systemSnapshot)
                : transaction.get(ref)
            )
          ),
        ]);
        if ([...targetSnapshots, ...reservedSnapshots].some((snapshot) => snapshot.exists)) {
          fail(
            "generated_item_id_collision",
            "One of the generated item IDs is already in use.",
            409
          );
        }

        const machineSnapshots = new Map(
          machineIds.map((machineId, index) => [
            machineId,
            otherMachineSnapshots[index],
          ])
        );
        for (const machineId of machineIds) {
          if (!machineSnapshots.get(machineId)?.exists) {
            fail(
              "associated_machine_missing",
              `Machine ${machineId} no longer exists; no shipment items were created.`,
              409
            );
          }
        }

        const system = {
          id: input.systemId,
          name: clean(systemData.name || input.systemId, 240),
        };
        const records = normalizedItems.map((draft, index) => {
          const itemId = candidateIds[index];
          const base = shipmentContract.buildShipmentItemRecord({
            id: itemId,
            draft,
            system,
            route,
            operationId: input.operationId,
            actorEmail: actor.email,
            nowIso,
            date: movementDate,
          });
          return materializeAssociationReferences(
            db,
            addSearchTokens(
              {
                ...base,
                createdAt: now,
                updatedAt: now,
              },
              itemId
            )
          );
        });

        const machineUpdates = new Map();
        for (const machineId of machineIds) {
          const machineSnapshot = machineSnapshots.get(machineId);
          const machineData = machineSnapshot.data() || {};
          if (
            machineData.associatedParts !== undefined &&
            !Array.isArray(machineData.associatedParts)
          ) {
            fail(
              "invalid_machine_backlinks",
              `Machine ${machineId} has an invalid associated-parts list; no shipment items were created.`,
              409
            );
          }
          if (machineData.skipAssociatedParts === true) continue;
          machineUpdates.set(
            machineId,
            uniqueReferences([
              ...(machineData.associatedParts || []),
              ...targetRefs,
            ])
          );
        }

        for (let index = 0; index < records.length; index += 1) {
          const itemRef = targetRefs[index];
          const auditRef = itemRef
            .collection(ITEM_AUDIT_COLLECTION)
            .doc(input.operationId);
          transactionCreate(transaction, itemRef, records[index]);
          transactionCreate(transaction, auditRef, {
            schemaVersion: 1,
            type: "shipment_item_registration",
            operationId: input.operationId,
            shipmentSystemId: input.systemId,
            shipmentDirection: route.direction,
            shipmentUnitType: records[index].shipmentUnitType,
            associationFrom: records[index].associationFrom,
            associationCurrent: records[index].associationCurrent,
            createdAt: now,
            createdBy: actor,
          });
        }

        for (const machineId of machineIds) {
          if (
            machineId !== input.systemId &&
            !machineUpdates.has(machineId)
          ) {
            continue;
          }
          const update = { updatedAt: now };
          if (machineUpdates.has(machineId)) {
            update.associatedParts = machineUpdates.get(machineId);
          }
          if (machineId === input.systemId) {
            update.shipmentItemCount =
              Math.max(0, Number(systemData.shipmentItemCount) || 0) +
              records.length;
          }
          transaction.set(
            db.collection(MACHINE_COLLECTION).doc(machineId),
            update,
            { merge: true }
          );
        }

        const result = {
          ok: true,
          alreadyConfirmed: false,
          operationId: input.operationId,
          systemId: input.systemId,
          itemCount: records.length,
          totalItemCount:
            Math.max(0, Number(systemData.shipmentItemCount) || 0) +
            records.length,
          direction: route.direction,
          items: records.map((record, index) => ({
            id: candidateIds[index],
            name: record.name,
            shipmentUnitType: record.shipmentUnitType,
          })),
          completedAt: nowIso,
          completedBy: actor,
        };
        transactionCreate(transaction, receiptRef, {
          schemaVersion: 1,
          type: "shipment_items_add",
          requestHash: hash,
          systemId: input.systemId,
          itemIds: candidateIds,
          createdAt: now,
          createdBy: actor,
          result,
        });
        return result;
      });
    } catch (error) {
      if (
        error?.code === "generated_item_id_collision" &&
        attempt + 1 < MAX_ID_ATTEMPTS
      ) {
        continue;
      }
      throw error;
    }
  }
  fail(
    "item_id_unavailable",
    "Magmo could not reserve unique item IDs. Try again.",
    409
  );
}

module.exports = {
  CLIENT_COLLECTION,
  ITEM_AUDIT_COLLECTION,
  ITEM_COLLECTION,
  MACHINE_COLLECTION,
  MAX_TRANSACTION_WRITES,
  OPERATION_COLLECTION,
  ShipmentSystemServiceError,
  actorFromAuth,
  addSearchTokens,
  addShipmentItems,
  createShipmentSystem,
  dateInLosAngeles,
  materializeAssociationReferences,
  normalizeSystemRoute,
  referenceId,
  requestHash,
  systemPublicSummary,
  uniqueReferences,
};
