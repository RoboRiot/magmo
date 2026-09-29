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

const MANUFACTURER_PREFIXES = Object.freeze([
  { tokens: ["general", "electric"], value: "ge" },
  { tokens: ["ge", "healthcare"], value: "ge" },
  { tokens: ["siemens", "healthineers"], value: "siemens" },
  { tokens: ["siemens"], value: "siemens" },
  { tokens: ["philips"], value: "philips" },
  { tokens: ["toshiba"], value: "canon" },
  { tokens: ["canon"], value: "canon" },
  { tokens: ["hitachi"], value: "hitachi" },
  { tokens: ["ge"], value: "ge" },
]);
const MODALITY_EDGES = Object.freeze([
  { tokens: ["pet", "ct"], value: "petct" },
  { tokens: ["petct"], value: "petct" },
  { tokens: ["pet"], value: "pet" },
  { tokens: ["mri"], value: "mri" },
  { tokens: ["mr"], value: "mri" },
  { tokens: ["ct"], value: "ct" },
  { tokens: ["x", "ray"], value: "xray" },
  { tokens: ["xray"], value: "xray" },
  { tokens: ["dexa"], value: "dexa" },
  { tokens: ["mammography"], value: "mammography" },
  { tokens: ["mammo"], value: "mammography" },
  { tokens: ["ultrasound"], value: "ultrasound" },
  { tokens: ["c", "arm"], value: "carm" },
  { tokens: ["carm"], value: "carm" },
]);
const GENERIC_MODEL_TOKENS = new Set(["equipment", "machine", "scanner", "system", "unit"]);

function identityTokens(value) {
  return clean(value).normalize("NFKC").toLowerCase().match(/[a-z0-9]+/g) || [];
}

function edgeIdentity(tokens, definitions, edge = "prefix") {
  for (const definition of definitions) {
    const candidate = edge === "suffix" ? tokens.slice(-definition.tokens.length) : tokens.slice(0, definition.tokens.length);
    if (candidate.length === definition.tokens.length && candidate.every((token, index) => token === definition.tokens[index])) {
      return definition;
    }
  }
  return null;
}

// This is deliberately not fuzzy matching. It only removes a recognized OEM at
// the beginning and a recognized modality at an edge, retaining every model,
// numeric and variant token for an exact comparison (MR750 never equals MR750W).
function canonicalEquipmentModel(value) {
  let tokens = identityTokens(value);
  const manufacturer = edgeIdentity(tokens, MANUFACTURER_PREFIXES);
  if (manufacturer) tokens = tokens.slice(manufacturer.tokens.length);
  const prefixModality = edgeIdentity(tokens, MODALITY_EDGES);
  if (prefixModality) tokens = tokens.slice(prefixModality.tokens.length);
  const suffixModality = edgeIdentity(tokens, MODALITY_EDGES, "suffix");
  if (suffixModality) tokens = tokens.slice(0, -suffixModality.tokens.length);
  const modalityConflict = Boolean(prefixModality && suffixModality && prefixModality.value !== suffixModality.value);
  const model = tokens.join(" ");
  const generic = !tokens.length || tokens.every((token) => GENERIC_MODEL_TOKENS.has(token));
  return {
    model: generic ? "" : model,
    manufacturer: manufacturer?.value || "",
    modality: modalityConflict ? "" : (prefixModality?.value || suffixModality?.value || ""),
    invalid: modalityConflict,
  };
}

function canonicalManufacturer(value) {
  const tokens = identityTokens(value);
  const exact = MANUFACTURER_PREFIXES.find((entry) =>
    entry.tokens.length === tokens.length && entry.tokens.every((token, index) => token === tokens[index]));
  return exact?.value || (tokens.length ? `unknown:${tokens.join(" ")}` : "");
}

function canonicalModality(value) {
  const tokens = identityTokens(value);
  const exact = MODALITY_EDGES.find((entry) =>
    entry.tokens.length === tokens.length && entry.tokens.every((token, index) => token === tokens[index]));
  return exact?.value || (tokens.length ? `unknown:${tokens.join(" ")}` : "");
}

function scalarAliases(data, fields, canonicalize) {
  const raw = fields.map((field) => data?.[field]).filter((value) => value !== undefined && value !== null && value !== "");
  if (raw.some((value) => !["string", "number"].includes(typeof value))) return { value: "", invalid: true };
  const values = unique(raw, (value) => canonicalize(value)).filter(Boolean);
  return { value: values.length === 1 ? values[0] : "", invalid: values.length > 1 || (raw.length > 0 && !values.length) };
}

function structuredMachineIdentity(data = {}) {
  const modelFields = ["Model", "model", "typedModel", "TypedModel"];
  const rawModels = modelFields.map((field) => data?.[field])
    .filter((value) => value !== undefined && value !== null && value !== "");
  const malformedModel = rawModels.some((value) => !["string", "number"].includes(typeof value));
  const parsedModels = rawModels.filter((value) => ["string", "number"].includes(typeof value))
    .map(canonicalEquipmentModel);
  const modelValues = unique(parsedModels.map((entry) => entry.model));
  const manufacturers = scalarAliases(data, ["OEM", "oem", "manufacturer"], canonicalManufacturer);
  const modalities = scalarAliases(data, ["Modality", "modality"], canonicalModality);
  const display = canonicalEquipmentModel(data.name);
  const manufacturerValues = unique([manufacturers.value, display.manufacturer,
    ...parsedModels.map((entry) => entry.manufacturer)]);
  const modalityValues = unique([modalities.value, display.modality,
    ...parsedModels.map((entry) => entry.modality)]);
  return {
    model: modelValues.length === 1 ? modelValues[0] : "",
    modelValues,
    manufacturer: manufacturerValues.length === 1 ? manufacturerValues[0] : "",
    modality: modalityValues.length === 1 ? modalityValues[0] : "",
    invalid: malformedModel || modelValues.length > 1 || (rawModels.length > 0 && !modelValues.length) ||
      parsedModels.some((entry) => entry.invalid) || manufacturers.invalid || modalities.invalid || display.invalid ||
      manufacturerValues.length > 1 || modalityValues.length > 1,
  };
}

function equipmentIdentityConflict(equipment, machineIdentity) {
  return Boolean(
    equipment.invalid || machineIdentity.invalid ||
    (equipment.manufacturer && machineIdentity.manufacturer && equipment.manufacturer !== machineIdentity.manufacturer) ||
    (equipment.modality && machineIdentity.modality && equipment.modality !== machineIdentity.modality)
  );
}

function workOrderEquipmentLinkStatus(value = {}, { unresolvedReason = "" } = {}) {
  const linkedIds = unique(value.machineLinkEquipmentIds || [], equipmentId);
  if (linkedIds.length && workOrderMachineLinkNeedsReview(value)) {
    return { equipmentLinkStatus: "needs_review", equipmentLinkIssue: "bluefolder_equipment_selection_changed" };
  }
  if (!clean(value.clientId)) {
    return { equipmentLinkStatus: "site_unresolved", equipmentLinkIssue: clean(unresolvedReason) || "work_order_client_missing" };
  }
  const selected = hasSelectedBlueFolderEquipment(value);
  if (!selected) return { equipmentLinkStatus: "not_selected", equipmentLinkIssue: "" };
  const hasMachine = Boolean(clean(value.machineId));
  const hasTrailer = Boolean(clean(value.trailerId));
  if (linkedIds.length && !hasMachine) {
    return { equipmentLinkStatus: "needs_review", equipmentLinkIssue: "automatic_machine_link_missing" };
  }
  if (hasMachine || hasTrailer) {
    return { equipmentLinkStatus: linkedIds.length ? "resolved" : "manual", equipmentLinkIssue: "" };
  }
  return { equipmentLinkStatus: "unresolved", equipmentLinkIssue: clean(unresolvedReason) || "bluefolder_equipment_not_mapped" };
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

function typedArrayAliases(data, fields, collection) {
  const values = [];
  for (const field of fields) {
    const raw = data?.[field];
    if (raw == null) continue;
    if (!Array.isArray(raw)) return { ids: [], invalid: true };
    values.push(...raw.map((value) => typedReferenceId(value, collection)));
  }
  return {
    ids: [...new Set(values.map((entry) => entry.id).filter(Boolean))],
    invalid: values.some((entry) => entry.invalid),
  };
}

function workOrderAssetIdentity(workOrder = {}) {
  const machine = typedAliases(workOrder, ["machineId", "machineRef"], "Machine");
  const trailer = typedAliases(workOrder, ["trailerId", "trailerRef"], "Trailers");
  return {
    machine,
    trailer,
    hasExistingAsset: machine.invalid || trailer.invalid || machine.ids.length > 0 || trailer.ids.length > 0,
  };
}

// A BlueFolder site refresh may fill a missing work-order client, but it must
// never turn an existing manual asset into a cross-site association. Validate
// only typed IDs/references and the stored asset relationships; names and work-
// order text are deliberately excluded from this decision.
async function validateExistingWorkOrderAssetSiteInTransaction(
  transaction,
  db,
  workOrder,
  proposedClientLink,
  { clientData: suppliedClientData } = {}
) {
  const assets = workOrderAssetIdentity(workOrder);
  const result = (allowed, reason = "") => ({
    allowed,
    reason,
    hasExistingAsset: assets.hasExistingAsset,
    machineId: assets.machine.ids.length === 1 ? assets.machine.ids[0] : "",
    trailerId: assets.trailer.ids.length === 1 ? assets.trailer.ids[0] : "",
  });
  if (assets.machine.invalid || assets.machine.ids.length > 1) {
    return result(false, "existing_machine_identity_conflict");
  }
  if (assets.trailer.invalid || assets.trailer.ids.length > 1) {
    return result(false, "existing_trailer_identity_conflict");
  }

  const proposedClient = typedAliases(proposedClientLink, ["clientId", "clientRef"], "Client");
  if (proposedClient.invalid || proposedClient.ids.length !== 1) {
    return result(false, "resolved_client_identity_conflict");
  }
  const clientId = proposedClient.ids[0];
  const existingClient = typedAliases(workOrder, ["clientId", "clientRef"], "Client");
  if (existingClient.invalid || existingClient.ids.length > 1) {
    return result(false, "existing_client_identity_conflict");
  }
  if (existingClient.ids.length && existingClient.ids[0] !== clientId) {
    return result(false, "existing_client_mismatch");
  }
  if (!assets.hasExistingAsset) return result(true);
  let clientData = suppliedClientData;
  if (clientData === undefined) {
    const clientSnapshot = await transaction.get(db.collection("Client").doc(clientId));
    if (!clientSnapshot.exists) return result(false, "resolved_client_missing");
    clientData = clientSnapshot.data() || {};
  }
  if (!clientData || typeof clientData !== "object" || Array.isArray(clientData)) {
    return result(false, "resolved_client_malformed");
  }
  if (unavailableMachine(clientData) || clientData.bluefolderInactive === true) {
    return result(false, "resolved_client_unavailable");
  }

  const machineClientIssue = (data, machineId) => {
    const directClient = typedAliases(data, ["client", "Client", "clientId", "ClientId"], "Client");
    if (directClient.invalid || directClient.ids.length > 1) return "existing_machine_client_identity_conflict";
    if (directClient.ids.length) {
      return directClient.ids[0] === clientId ? "" : "existing_machine_client_mismatch";
    }
    const backlinks = typedArrayAliases(clientData, ["machines", "Machines"], "Machine");
    if (backlinks.invalid) return "resolved_client_machine_identity_conflict";
    return backlinks.ids.includes(machineId) ? "" : "existing_machine_client_missing";
  };
  const trailerClientIssue = (data) => {
    const trailerClient = typedAliases(data, TRAILER_CLIENT_FIELDS, "Client");
    if (trailerClient.invalid || trailerClient.ids.length > 1) return "existing_trailer_client_identity_conflict";
    if (!trailerClient.ids.length) return "existing_trailer_client_missing";
    return trailerClient.ids[0] === clientId ? "" : "existing_trailer_client_mismatch";
  };

  let machineData = null;
  let trailerData = null;
  let declaredTrailer = { ids: [], invalid: false };
  let linkedMachine = { ids: [], invalid: false };
  if (assets.machine.ids.length) {
    const machineSnapshot = await transaction.get(db.collection("Machine").doc(assets.machine.ids[0]));
    if (!machineSnapshot.exists) return result(false, "existing_machine_missing");
    machineData = machineSnapshot.data() || {};
    if (unavailableMachine(machineData)) return result(false, "existing_machine_unavailable");
    const clientIssue = machineClientIssue(machineData, assets.machine.ids[0]);
    if (clientIssue) return result(false, clientIssue);
    declaredTrailer = typedAliases(machineData, MACHINE_TRAILER_FIELDS, "Trailers");
    if (declaredTrailer.invalid || declaredTrailer.ids.length > 1) {
      return result(false, "existing_machine_trailer_identity_conflict");
    }
    if (assets.trailer.ids.length && declaredTrailer.ids.length &&
        declaredTrailer.ids[0] !== assets.trailer.ids[0]) {
      return result(false, "existing_machine_trailer_mismatch");
    }
  }

  if (assets.trailer.ids.length) {
    const trailerSnapshot = await transaction.get(db.collection("Trailers").doc(assets.trailer.ids[0]));
    if (!trailerSnapshot.exists) return result(false, "existing_trailer_missing");
    if (trailerSnapshot.id === "layout_meta") return result(false, "existing_trailer_unavailable");
    trailerData = trailerSnapshot.data() || {};
    if (unavailableMachine(trailerData)) return result(false, "existing_trailer_unavailable");
    const clientIssue = trailerClientIssue(trailerData);
    if (clientIssue) return result(false, clientIssue);
    linkedMachine = typedAliases(trailerData, TRAILER_MACHINE_FIELDS, "Machine");
    if (linkedMachine.invalid || linkedMachine.ids.length > 1) {
      return result(false, "existing_trailer_machine_identity_conflict");
    }
    if (assets.machine.ids.length) {
      if (!linkedMachine.ids.length) return result(false, "existing_trailer_machine_missing");
      if (linkedMachine.ids[0] !== assets.machine.ids[0]) {
        return result(false, "existing_trailer_machine_mismatch");
      }
    }
  }

  // A work order may intentionally retain only one side of a manual machine /
  // trailer choice. Do not add the counterpart, but if the selected asset
  // declares one, validate that live relationship before attaching a new site.
  if (machineData && !trailerData && declaredTrailer.ids.length) {
    const relatedTrailer = await transaction.get(db.collection("Trailers").doc(declaredTrailer.ids[0]));
    if (!relatedTrailer.exists) return result(false, "existing_machine_declared_trailer_missing");
    const data = relatedTrailer.data() || {};
    if (relatedTrailer.id === "layout_meta" || unavailableMachine(data)) {
      return result(false, "existing_machine_declared_trailer_unavailable");
    }
    const clientIssue = trailerClientIssue(data);
    if (clientIssue) return result(false, `existing_machine_declared_trailer_${clientIssue.replace(/^existing_trailer_/, "")}`);
    const backlink = typedAliases(data, TRAILER_MACHINE_FIELDS, "Machine");
    if (backlink.invalid || backlink.ids.length !== 1 || backlink.ids[0] !== assets.machine.ids[0]) {
      return result(false, "existing_machine_declared_trailer_backlink_mismatch");
    }
  }
  if (trailerData && !machineData && linkedMachine.ids.length) {
    const relatedMachine = await transaction.get(db.collection("Machine").doc(linkedMachine.ids[0]));
    if (!relatedMachine.exists) return result(false, "existing_trailer_declared_machine_missing");
    const data = relatedMachine.data() || {};
    if (unavailableMachine(data)) return result(false, "existing_trailer_declared_machine_unavailable");
    const clientIssue = machineClientIssue(data, linkedMachine.ids[0]);
    if (clientIssue) return result(false, `existing_trailer_declared_machine_${clientIssue.replace(/^existing_machine_/, "")}`);
    const forward = typedAliases(data, MACHINE_TRAILER_FIELDS, "Trailers");
    if (forward.invalid || forward.ids.length > 1 ||
        (forward.ids.length && forward.ids[0] !== assets.trailer.ids[0])) {
      return result(false, "existing_trailer_declared_machine_forward_link_mismatch");
    }
  }

  return result(true);
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
  if (!clientData || typeof clientData !== "object" || Array.isArray(clientData)) {
    return result("bluefolder_equipment_client_malformed");
  }
  if (unavailableMachine(clientData)) return result("bluefolder_equipment_client_unavailable");
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
  const siteRecords = records.filter((row) =>
    machineBelongsToClient(row.data || {}, clientData, row.id, clientId));
  const exactNameMatches = siteRecords.filter((row) =>
    clean(row.data?.name).toLowerCase() === wantedName);
  if (exactNameMatches.length > 1) return result("bluefolder_equipment_name_ambiguous");
  if (exactNameMatches.length === 1) {
    const match = exactNameMatches[0];
    const equipment = canonicalEquipmentModel(identity.equipmentNames[0]);
    const machineIdentity = structuredMachineIdentity(match.data);
    if (equipmentIdentityConflict(equipment, machineIdentity)) {
      return result("bluefolder_equipment_machine_identity_conflict");
    }
    const existingIds = unique([match.data?.bluefolderEquipmentId, match.data?.blueFolderEquipmentId], equipmentId);
    if (existingIds.length && (existingIds.length !== 1 || existingIds[0] !== wantedId)) {
      return result("bluefolder_equipment_identity_conflict");
    }
    return result("bluefolder_equipment_exact_name_at_client", match);
  }

  const equipment = canonicalEquipmentModel(identity.equipmentNames[0]);
  if (equipment.invalid || !equipment.model) return result("bluefolder_equipment_not_mapped");
  const structured = siteRecords.map((row) => ({ row, machine: structuredMachineIdentity(row.data) }));
  if (structured.some(({ machine }) => machine.invalid && machine.modelValues.includes(equipment.model))) {
    return result("bluefolder_equipment_machine_identity_conflict");
  }
  const modelMatches = structured.filter(({ machine }) =>
    !machine.invalid && machine.model === equipment.model && !equipmentIdentityConflict(equipment, machine));
  const modelConflicts = structured.filter(({ machine }) =>
    !machine.invalid && machine.model === equipment.model && equipmentIdentityConflict(equipment, machine));
  if (modelConflicts.length) return result("bluefolder_equipment_machine_identity_conflict");
  if (modelMatches.length !== 1) {
    return result(modelMatches.length ? "bluefolder_equipment_model_ambiguous" : "bluefolder_equipment_not_mapped");
  }
  const match = modelMatches[0].row;
  const existingIds = unique([match.data?.bluefolderEquipmentId, match.data?.blueFolderEquipmentId], equipmentId);
  if (existingIds.length && (existingIds.length !== 1 || existingIds[0] !== wantedId)) {
    return result("bluefolder_equipment_identity_conflict");
  }
  return result("bluefolder_equipment_exact_model_at_client", match);
}

async function resolveWorkOrderMachineLinkInTransaction(transaction, db, identity, clientId, { clientData: suppliedClientData } = {}) {
  const equipment = blueFolderEquipmentIdentity(identity);
  if (!clientId || equipment.equipmentIds.length !== 1 || equipment.equipmentNames.length > 1) {
    return resolveWorkOrderMachineLink([], equipment, { clientId });
  }
  const clientRef = db.collection("Client").doc(clientId);
  let clientData = suppliedClientData;
  if (clientData === undefined) {
    const clientSnapshot = await transaction.get(clientRef);
    if (!clientSnapshot.exists) return { match: null, reason: "work_order_client_missing", identity: equipment };
    clientData = clientSnapshot.data() || {};
  }
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
  workOrderMachineLinkNeedsReview, workOrderEquipmentLinkStatus,
  resolveWorkOrderTrailerLink,
  machineBelongsToClient, resolveWorkOrderMachineLink, resolveWorkOrderMachineLinkInTransaction,
  validateExistingWorkOrderAssetSiteInTransaction, buildWorkOrderMachineLinkPatch };
