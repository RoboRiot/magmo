"use strict";

const { referenceId, trailerName } = require("./trailerClientLinks.cjs");
const { resolveWorkOrderClientLink } = require("./workOrderClientLink.cjs");

function clean(value) {
  if (value && typeof value === "object") return clean(value.text ?? value._ ?? "");
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, 220);
}

function equipmentId(value) {
  const id = clean(value);
  return /^[a-f\d-]{36}$/i.test(id) ? id.toUpperCase() : id;
}

function unique(values, normalize = clean) {
  return [...new Set((Array.isArray(values) ? values : [values]).map(normalize).filter(Boolean))];
}

function blueFolderEquipmentIdentity(value = {}) {
  const nested = value.blueFolder && typeof value.blueFolder === "object" ? value.blueFolder : value;
  return {
    equipmentIds: unique(nested.equipmentIds ?? nested.bluefolderEquipmentIds ??
      nested.equipmentId ?? nested.bluefolderEquipmentId ?? [], equipmentId),
    equipmentNames: unique(nested.equipmentNames ?? nested.bluefolderEquipmentNames ??
      nested.equipmentName ?? nested.bluefolderEquipmentName ?? []),
  };
}

function hasSelectedBlueFolderEquipment(value) {
  const identity = blueFolderEquipmentIdentity(value);
  return Boolean(identity.equipmentIds.length || identity.equipmentNames.length);
}

function workOrderMachineLinkNeedsReview(value = {}) {
  const linkedIds = unique(value.machineLinkEquipmentIds || [], equipmentId).sort();
  if (!linkedIds.length) return false; // Explicit/manual connections have no automatic stamp.
  const selectedIds = blueFolderEquipmentIdentity(value).equipmentIds.sort();
  return JSON.stringify(linkedIds) !== JSON.stringify(selectedIds);
}

function unavailableMachine(data = {}) {
  return Boolean(data.deletedAt || data.archivedAt || data.deleted === true || data.archived === true);
}

// Typed relationship fields may contain a document reference, exact document ID,
// or collection/document path. Never accept the last segment of another type.
function typedReferenceId(value, collection) {
  if (value == null || value === "") return { id: "", invalid: false };
  let path = "", id = "";
  if (typeof value === "string") {
    path = value.trim();
    if (!path) return { id: "", invalid: false };
  } else if (typeof value === "object" && !Array.isArray(value)) {
    if (typeof value.path === "string") path = value.path;
    else if (Array.isArray(value._path?.segments)) path = value._path.segments.join("/");
    if (typeof value.id === "string") id = value.id;
    if (!path && !id) return { id: "", invalid: true };
  } else return { id: "", invalid: true };
  if (/[\\\u0000-\u001f\u007f]/.test(path) || /[\/\\\u0000-\u001f\u007f]/.test(id)) {
    return { id: "", invalid: true };
  }
  if (path.includes("/")) {
    const segments = path.replace(/^\//, "").split("/");
    if (segments.length !== 2 || segments[0] !== collection || !segments[1]) {
      return { id: "", invalid: true };
    }
    if (id && id !== segments[1]) return { id: "", invalid: true };
    id = segments[1];
  } else if (path) {
    if (id && id !== path) return { id: "", invalid: true };
    id = path;
  }
  return { id, invalid: !id || id === "." || id === ".." };
}

function typedAliases(data, fields, collection) {
  const values = fields.map((field) => typedReferenceId(data?.[field], collection));
  return { ids: [...new Set(values.map((entry) => entry.id).filter(Boolean))], invalid: values.some((entry) => entry.invalid) };
}

const MACHINE_TRAILER_FIELDS = ["trailerId", "trailer"];
const TRAILER_MACHINE_FIELDS = ["associatedMachine", "associatedMachineId", "machine", "machineId", "currentMachineId"];
const TRAILER_CLIENT_FIELDS = ["currentClient", "currentClientId", "locationCurrentId", "client", "clientId"];

function machineBelongsToClient(data, clientData, machineId, clientId) {
  const { ids, invalid } = typedAliases(data, ["client", "Client", "clientId", "ClientId"], "Client");
  if (invalid) return false;
  if (ids.length) return ids.length === 1 && ids[0] === clientId;
  return [...(Array.isArray(clientData.machines) ? clientData.machines : []), ...(Array.isArray(clientData.Machines) ? clientData.Machines : [])]
    .some((value) => { const parsed = typedReferenceId(value, "Machine"); return !parsed.invalid && parsed.id === machineId; });
}

function resolveWorkOrderTrailerLink(trailers, resolvedMachine, { clientId } = {}) {
  if (!resolvedMachine?.match?.id) return resolvedMachine;
  const machine = resolvedMachine.match;
  const fail = (reason) => ({ ...resolvedMachine, match: null, trailer: null, reason });
  const declared = typedAliases(machine.data, MACHINE_TRAILER_FIELDS, "Trailers");
  if (declared.invalid || declared.ids.length > 1) return fail("bluefolder_trailer_identity_conflict");
  const candidates = new Map();
  for (const row of Array.isArray(trailers) ? trailers : []) {
    if (!row?.id) continue;
    const linked = typedAliases(row.data, TRAILER_MACHINE_FIELDS, "Machine");
    if (declared.ids.includes(row.id) || linked.ids.includes(machine.id)) candidates.set(row.id, row);
  }
  if (declared.ids.length && !candidates.has(declared.ids[0])) return fail("bluefolder_trailer_missing");
  if (!candidates.size) return { ...resolvedMachine, trailer: null };
  if (candidates.size !== 1) return fail("bluefolder_trailer_duplicate_mapping");
  const trailer = [...candidates.values()][0];
  if (trailer.id === "layout_meta" || unavailableMachine(trailer.data)) return fail("bluefolder_trailer_unavailable");
  const linkedMachine = typedAliases(trailer.data, TRAILER_MACHINE_FIELDS, "Machine");
  if (linkedMachine.invalid || linkedMachine.ids.length !== 1 || linkedMachine.ids[0] !== machine.id) {
    return fail("bluefolder_trailer_machine_mismatch");
  }
  const linkedClient = typedAliases(trailer.data, TRAILER_CLIENT_FIELDS, "Client");
  if (linkedClient.invalid || linkedClient.ids.length !== 1 || linkedClient.ids[0] !== clientId) {
    return fail("bluefolder_trailer_client_mismatch");
  }
  if (declared.ids.length && declared.ids[0] !== trailer.id) return fail("bluefolder_trailer_identity_conflict");
  return { ...resolvedMachine, trailer };
}

async function resolveTrailerForMachineInTransaction(transaction, db, resolved, clientId) {
  if (!resolved.match?.id) return resolved;
  const declared = typedAliases(resolved.match.data, MACHINE_TRAILER_FIELDS, "Trailers");
  if (declared.invalid || declared.ids.length > 1) return resolveWorkOrderTrailerLink([], resolved, { clientId });
  const machineRef = db.collection("Machine").doc(resolved.match.id);
  const trailers = db.collection("Trailers"), rows = new Map();
  const queries = TRAILER_MACHINE_FIELDS.flatMap((field) =>
    [machineRef, machineRef.id, machineRef.path, `/${machineRef.path}`].map((value) => trailers.where(field, "==", value).limit(2)));
  const snapshots = await Promise.all(queries.map((query) => transaction.get(query)));
  for (const snapshot of snapshots) for (const doc of snapshot.docs) {
    rows.set(doc.id, { id: doc.id, data: doc.data() || {}, ref: doc.ref });
  }
  for (const id of declared.ids) {
    if (rows.has(id)) continue;
    const doc = await transaction.get(trailers.doc(id));
    if (doc.exists) rows.set(doc.id, { id: doc.id, data: doc.data() || {}, ref: doc.ref });
  }
  return resolveWorkOrderTrailerLink([...rows.values()], resolved, { clientId });
}

// Equipment names are a fallback only inside the already-resolved exact site.
// Never match a subject, partial model name, or a machine from another client.
function resolveWorkOrderMachineLink(machines, identityValue, { clientId, clientData = {} } = {}) {
  const identity = blueFolderEquipmentIdentity(identityValue);
  const result = (reason, match = null) => ({ reason, match, identity });
  if (!hasSelectedBlueFolderEquipment(identity)) return result("bluefolder_equipment_missing");
  if (!clientId) return result("work_order_client_missing");
  if (identity.equipmentIds.length !== 1 || identity.equipmentNames.length > 1) {
    return result("bluefolder_equipment_ambiguous");
  }
  const wantedId = identity.equipmentIds[0];
  const allRecords = (machines || []).filter((row) => row?.id);
  const records = allRecords.filter((row) => !unavailableMachine(row.data));
  const mapped = allRecords.filter((row) => unique([
    row.data?.bluefolderEquipmentId, row.data?.blueFolderEquipmentId,
  ], equipmentId).includes(wantedId));
  if (mapped.length > 1) return result("bluefolder_equipment_duplicate_mapping");
  if (mapped.length === 1) {
    const row = mapped[0];
    if (unavailableMachine(row.data)) return result("bluefolder_equipment_machine_unavailable");
    if (!machineBelongsToClient(row.data || {}, clientData, row.id, clientId)) {
      return result("bluefolder_equipment_client_mismatch");
    }
    const ids = unique([row.data?.bluefolderEquipmentId, row.data?.blueFolderEquipmentId], equipmentId);
    return ids.length === 1 ? result("bluefolder_equipment_id", row)
      : result("bluefolder_equipment_identity_conflict");
  }
  if (identity.equipmentNames.length !== 1) return result("bluefolder_equipment_not_mapped");
  const siteMatch = resolveWorkOrderClientLink([{ id: clientId, data: clientData }], identityValue);
  if (!siteMatch.match) return result("bluefolder_equipment_site_identity_unverified");
  const wantedName = clean(identity.equipmentNames[0]).toLowerCase();
  const matches = records.filter((row) =>
    clean(row.data?.name).toLowerCase() === wantedName &&
    machineBelongsToClient(row.data || {}, clientData, row.id, clientId));
  if (matches.length !== 1) return result(matches.length ? "bluefolder_equipment_name_ambiguous" : "bluefolder_equipment_not_mapped");
  const match = matches[0];
  const existingIds = unique([match.data?.bluefolderEquipmentId, match.data?.blueFolderEquipmentId], equipmentId);
  if (existingIds.length && (existingIds.length !== 1 || existingIds[0] !== wantedId)) {
    return result("bluefolder_equipment_identity_conflict");
  }
  return result("bluefolder_equipment_exact_name_at_client", match);
}

async function resolveWorkOrderMachineLinkInTransaction(transaction, db, identity, clientId) {
  const equipment = blueFolderEquipmentIdentity(identity);
  if (!clientId || equipment.equipmentIds.length !== 1 || equipment.equipmentNames.length > 1) {
    return resolveWorkOrderMachineLink([], equipment, { clientId });
  }
  const clientRef = db.collection("Client").doc(clientId);
  const clientSnapshot = await transaction.get(clientRef);
  if (!clientSnapshot.exists) return { match: null, reason: "work_order_client_missing", identity: equipment };
  const clientData = clientSnapshot.data() || {};
  const collection = db.collection("Machine");
  const queries = [];
  for (const field of ["bluefolderEquipmentId", "blueFolderEquipmentId"]) {
    for (const id of unique([equipment.equipmentIds[0], equipment.equipmentIds[0].toLowerCase()])) {
      queries.push(collection.where(field, "==", id).limit(2));
    }
  }
  for (const field of ["client", "Client", "clientId", "ClientId"]) {
    for (const value of [clientRef, clientId, clientRef.path]) {
      queries.push(collection.where(field, "==", value));
    }
  }
  const snapshots = await Promise.all(queries.map((query) => transaction.get(query)));
  const rows = new Map();
  for (const snapshot of snapshots) for (const doc of snapshot.docs) {
    rows.set(doc.id, { id: doc.id, data: doc.data() || {}, ref: doc.ref });
  }
  const backlinks = unique([...(clientData.machines || []), ...(clientData.Machines || [])], referenceId)
    .filter((id) => !rows.has(id) && !/[\/\\]/.test(id));
  for (const doc of await Promise.all(backlinks.map((id) => transaction.get(collection.doc(id))))) {
    if (doc.exists) rows.set(doc.id, { id: doc.id, data: doc.data() || {}, ref: doc.ref });
  }
  const resolved = resolveWorkOrderMachineLink([...rows.values()], identity, { clientId, clientData });
  return resolveTrailerForMachineInTransaction(transaction, db, resolved, clientId);
}

function buildWorkOrderMachineLinkPatch(resolved, { linkedAtIso = "", source = "bluefolder_work_order_import" } = {}) {
  if (!resolved?.match?.id) return {};
  const declared = typedAliases(resolved.match.data, MACHINE_TRAILER_FIELDS, "Trailers");
  if (declared.invalid || declared.ids.length > 1 || (declared.ids.length && !resolved.trailer)) return {};
  return {
    machineId: resolved.match.id,
    machineName: clean(resolved.match.data?.name || resolved.match.id),
    ...(resolved.match.ref ? { machineRef: resolved.match.ref } : {}),
    machineLinkSource: source,
    machineLinkMatchReason: resolved.reason,
    machineLinkEquipmentIds: resolved.identity.equipmentIds,
    ...(linkedAtIso ? { machineLinkedAtIso: linkedAtIso } : {}),
    ...(resolved.trailer ? {
      trailerId: resolved.trailer.id,
      trailerName: trailerName(resolved.trailer.data, resolved.trailer.id),
      ...(resolved.trailer.ref ? { trailerRef: resolved.trailer.ref } : {}),
    } : {}),
  };
}

module.exports = { blueFolderEquipmentIdentity, hasSelectedBlueFolderEquipment,
  workOrderMachineLinkNeedsReview,
  resolveWorkOrderTrailerLink,
  machineBelongsToClient, resolveWorkOrderMachineLink, resolveWorkOrderMachineLinkInTransaction,
  buildWorkOrderMachineLinkPatch };
