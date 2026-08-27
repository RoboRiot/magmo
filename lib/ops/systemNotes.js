import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "../../context/FirebaseAdmin";
import { OPS_WORK_ORDER_COLLECTION } from "./workOrders";

export const OPS_SYSTEM_NOTE_COLLECTION = "OpsSystemNotes";

function requireDb() {
  if (!adminDb) throw new Error("Firebase Admin Firestore is not initialized.");
  return adminDb;
}

function clean(value, maxLength = 500) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function normalizeKey(value) {
  return clean(value, 240)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function refId(value) {
  if (!value) return "";
  if (typeof value === "string") {
    return clean(value.split("/").filter(Boolean).pop(), 180);
  }
  if (typeof value === "object") {
    return clean(
      value.id ||
        value._key?.path?.segments?.slice(-1)?.[0] ||
        value._path?.segments?.slice(-1)?.[0] ||
        value.path?.split("/").filter(Boolean).pop(),
      180
    );
  }
  return "";
}

function timestampToIso(value) {
  if (!value) return "";
  if (typeof value.toDate === "function") return value.toDate().toISOString();
  const parsed = new Date(value);
  return Number.isFinite(parsed.getTime()) ? parsed.toISOString() : "";
}

function locationText(value) {
  if (!value) return "";
  if (typeof value === "string") return clean(value, 500);
  if (Array.isArray(value)) return value.map(locationText).filter(Boolean).join(", ").slice(0, 500);
  if (typeof value === "object") return Object.values(value).map(locationText).filter(Boolean).join(", ").slice(0, 500);
  return "";
}

function serializeNote(snapshot) {
  const data = snapshot.data() || {};
  return {
    id: snapshot.id,
    scopeType: clean(data.scopeType, 30) === "machine" ? "machine" : "client",
    clientId: clean(data.clientId, 180),
    clientName: clean(data.clientName, 220),
    machineId: clean(data.machineId, 180),
    machineName: clean(data.machineName, 220),
    workOrderId: clean(data.workOrderId, 180),
    workOrderNumber: clean(data.workOrderNumber || data.workOrderId, 120),
    workOrderSubject: clean(data.workOrderSubject, 500),
    text: clean(data.text, 1800),
    source: clean(data.source || "magmo", 40),
    createdBy: clean(data.createdBy, 180),
    createdAt: timestampToIso(data.createdAt) || clean(data.createdAtIso, 80),
    slackTs: clean(data.slackTs, 180),
  };
}

function serializeWorkOrder(snapshot, requestById = new Map()) {
  const data = snapshot.data() || {};
  const request = requestById.get(clean(data.intakeServiceRequestId, 180)) || {};
  const machine = request.machine && typeof request.machine === "object" ? request.machine : {};
  const client = request.confirmedClient && typeof request.confirmedClient === "object"
    ? request.confirmedClient
    : {};
  const status = clean(data.workflowStatus || data.workflowStage || data.status, 40);
  return {
    id: snapshot.id,
    number: clean(data.number || snapshot.id, 120),
    subject: clean(data.subject, 500),
    customer: clean(data.customer, 220),
    workflowStatus: status || "unassigned",
    clientId: clean(data.clientId || client.id, 180),
    clientName: clean(data.clientName || client.name || data.customer, 220),
    machineId: clean(data.machineId || request.machineId || machine.id, 180),
    machineName: clean(data.machineName || machine.name || machine.label, 220),
    lastActivityAt:
      timestampToIso(data.lastActivityAt) || clean(data.lastActivityAtIso, 80),
  };
}

async function loadCatalog() {
  const db = requireDb();
  const [clientSnapshot, machineSnapshot, noteSnapshot, workOrderSnapshot, requestSnapshot] =
    await Promise.all([
      db.collection("Client").limit(500).get(),
      db.collection("Machine").limit(1200).get(),
      db.collection(OPS_SYSTEM_NOTE_COLLECTION).limit(1500).get(),
      db.collection(OPS_WORK_ORDER_COLLECTION).limit(500).get(),
      db.collection("ServiceRequests").limit(500).get(),
    ]);

  const requestById = new Map(
    requestSnapshot.docs.map((document) => [document.id, document.data() || {}])
  );
  const clientMachineIds = new Map();
  clientSnapshot.docs.forEach((document) => {
    (Array.isArray(document.data()?.machines) ? document.data().machines : [])
      .map(refId)
      .filter(Boolean)
      .forEach((machineId) => {
        if (!clientMachineIds.has(machineId)) clientMachineIds.set(machineId, new Set());
        clientMachineIds.get(machineId).add(document.id);
      });
  });
  machineSnapshot.docs.forEach((document) => {
    const directClientId = refId(document.data()?.client || document.data()?.Client);
    if (!directClientId) return;
    if (!clientMachineIds.has(document.id)) clientMachineIds.set(document.id, new Set());
    clientMachineIds.get(document.id).add(directClientId);
  });
  const clients = clientSnapshot.docs
    .map((document) => {
      const data = document.data() || {};
      return {
        id: document.id,
        name: clean(data.name || data.clientName || data.companyName, 220),
        location: locationText(data.location || data.address),
      };
    })
    .filter((client) => client.name)
    .sort((a, b) => a.name.localeCompare(b.name));
  const machines = machineSnapshot.docs
    .map((document) => {
      const data = document.data() || {};
      const name = clean(data.name || document.id, 220);
      const model = clean(data.Model || data.model, 160);
      return {
        id: document.id,
        name,
        label: [
          name,
          clean(data.OEM || data.oem || data.manufacturer, 100),
          clean(data.Modality || data.modality, 100),
          model,
        ].filter(Boolean).join(" - "),
        model,
        clientIds: Array.from(clientMachineIds.get(document.id) || []),
      };
    })
    .filter((machine) => machine.name)
    .sort((a, b) => a.label.localeCompare(b.label));
  const notes = noteSnapshot.docs
    .filter((document) => !document.data()?.deletedAt)
    .map(serializeNote)
    .filter((note) => note.text)
    .sort((a, b) => Date.parse(b.createdAt || 0) - Date.parse(a.createdAt || 0));
  const workOrders = workOrderSnapshot.docs
    .filter((document) => !document.data()?.deletedAt)
    .map((document) => serializeWorkOrder(document, requestById));

  const clientsByName = new Map(clients.map((client) => [normalizeKey(client.name), client]));
  workOrders.forEach((workOrder) => {
    if (!workOrder.clientId) {
      const match = clientsByName.get(normalizeKey(workOrder.clientName || workOrder.customer));
      if (match) {
        workOrder.clientId = match.id;
        workOrder.clientName = match.name;
      }
    }
  });
  return { clients, machines, notes, workOrders };
}

export async function listOpsSystemNotes({ clientId = "", machineId = "" } = {}) {
  const catalog = await loadCatalog();
  const normalizedClientId = clean(clientId, 180);
  const normalizedMachineId = clean(machineId, 180);
  if (!normalizedClientId && !normalizedMachineId) return catalog;
  return {
    clients: catalog.clients.filter((client) => !normalizedClientId || client.id === normalizedClientId),
    machines: catalog.machines.filter(
      (machine) =>
        (!normalizedMachineId || machine.id === normalizedMachineId) &&
        (!normalizedClientId || machine.clientIds.includes(normalizedClientId))
    ),
    notes: catalog.notes.filter(
      (note) =>
        (!normalizedClientId || note.clientId === normalizedClientId) &&
        (!normalizedMachineId ||
          note.scopeType === "client" ||
          note.machineId === normalizedMachineId)
    ),
    workOrders: catalog.workOrders.filter(
      (workOrder) =>
        (!normalizedClientId || workOrder.clientId === normalizedClientId) &&
        (!normalizedMachineId || workOrder.machineId === normalizedMachineId)
    ),
  };
}

export async function createOpsSystemNote({
  workOrderId,
  text,
  scopeType = "machine",
  clientId = "",
  machineId = "",
  createdBy = "Magmo admin",
  source = "magmo",
  sourceId = "",
  slackTs = "",
}) {
  const db = requireDb();
  const normalizedWorkOrderId = clean(workOrderId, 180);
  const noteText = clean(text, 1800);
  if (!normalizedWorkOrderId) throw new Error("Select the associated work order.");
  if (!noteText) throw new Error("Write the client or system note.");
  const workOrderSnapshot = await db
    .collection(OPS_WORK_ORDER_COLLECTION)
    .doc(normalizedWorkOrderId)
    .get();
  if (!workOrderSnapshot.exists || workOrderSnapshot.data()?.deletedAt) {
    throw new Error("The associated Ops work order does not exist.");
  }
  const catalog = await loadCatalog();
  const workOrder = catalog.workOrders.find((entry) => entry.id === normalizedWorkOrderId) ||
    serializeWorkOrder(workOrderSnapshot);
  const resolvedClientId = clean(clientId || workOrder.clientId, 180);
  const resolvedMachineId = clean(machineId || workOrder.machineId, 180);
  const client = catalog.clients.find((entry) => entry.id === resolvedClientId);
  const machine = catalog.machines.find((entry) => entry.id === resolvedMachineId);
  const normalizedScope = clean(scopeType, 30) === "client" ? "client" : "machine";
  if (!client) throw new Error("Link this work order to a valid Magmo client before saving a note.");
  if (normalizedScope === "machine" && !machine) {
    throw new Error("Select a machine for this system note.");
  }
  if (
    normalizedScope === "machine" &&
    machine.clientIds.length &&
    !machine.clientIds.includes(client.id)
  ) {
    throw new Error("The selected machine does not belong to that client.");
  }
  const safeSourceId = clean(sourceId, 180).replace(/[^A-Za-z0-9_.-]/g, "_");
  const noteRef = safeSourceId
    ? db.collection(OPS_SYSTEM_NOTE_COLLECTION).doc(safeSourceId)
    : db.collection(OPS_SYSTEM_NOTE_COLLECTION).doc();
  const existing = await noteRef.get();
  if (!existing.exists) {
    const nowIso = new Date().toISOString();
    await noteRef.set({
      scopeType: normalizedScope,
      clientId: client.id,
      clientName: client.name,
      machineId: normalizedScope === "machine" ? machine.id : "",
      machineName: normalizedScope === "machine" ? machine.name : "",
      workOrderId: workOrder.id,
      workOrderNumber: workOrder.number,
      workOrderSubject: workOrder.subject,
      text: noteText,
      source: clean(source, 40) || "magmo",
      createdBy: clean(createdBy, 180),
      slackTs: clean(slackTs, 180),
      createdAt: FieldValue.serverTimestamp(),
      createdAtIso: nowIso,
      updatedAt: FieldValue.serverTimestamp(),
    });
  }
  return serializeNote(await noteRef.get());
}
