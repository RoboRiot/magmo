"use strict";

const { createHash } = require("node:crypto");
const { canonicalEquipmentId, isVerifiedEquipmentProof } = require("./blueFolderEquipmentLookup.cjs");
const { getVerifiedCustomerEquipmentCatalog } = require("./blueFolderCustomerLookup.cjs");
const { normalizeBlueFolderWorkOrderIdentity, resolveWorkOrderClientLink } = require("./workOrderClientLink.cjs");
const { blueFolderEquipmentIdentity, resolveWorkOrderMachineLinkInTransaction, resolveWorkOrderMachineLink, buildWorkOrderMachineLinkPatch,
  machineBelongsToClient, resolveWorkOrderTrailerLink, validateExistingWorkOrderAssetSiteInTransaction } = require("./workOrderMachineLink.cjs");
const { hasExplicitWorkOrderAsset } = require("../inventory/workOrderAddContract.cjs");
const clean = value => typeof value === "string" || typeof value === "number" ? String(value).replace(/\s+/g, " ").trim() : "";
const key = value => clean(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const unavailable = value => Boolean(value?.deletedAt || value?.archivedAt || value?.deleted === true || value?.archived === true || value?.inactive === true || value?.bluefolderInactive === true);

function equipmentOnboardingPreconditions(workOrder = {}) {
  const identity = normalizeBlueFolderWorkOrderIdentity(workOrder), equipment = blueFolderEquipmentIdentity(workOrder);
  const result = (eligible, reason) => ({ eligible, reason, identity, equipmentId: canonicalEquipmentId(equipment.equipmentIds[0]) });
  if (unavailable(workOrder)) return result(false, "bluefolder_equipment_onboarding_order_unavailable");
  if (hasExplicitWorkOrderAsset(workOrder)) return result(false, "bluefolder_equipment_onboarding_existing_asset");
  if (!/^\d+$/.test(identity.customerId) || !/^\d+$/.test(identity.customerLocationId)) return result(false, "bluefolder_equipment_onboarding_site_evidence_missing");
  if (equipment.equipmentIds.length !== 1 || equipment.equipmentNames.length > 1 || !canonicalEquipmentId(equipment.equipmentIds[0])) {
    return result(false, "bluefolder_equipment_onboarding_selection_not_unique");
  }
  return result(true, "bluefolder_equipment_onboarding_eligible");
}

function deterministicEquipmentMachineId(equipmentId, attempt = 0) {
  const hash = createHash("sha256").update(`magmo-bluefolder-equipment:${canonicalEquipmentId(equipmentId)}:${attempt}`).digest("hex");
  return `AIS${10000 + (parseInt(hash.slice(0, 8), 16) % 90000)}`;
}

function referenceId(value) {
  if (typeof value === "string") {
    const text = value.trim();
    if (/^Machine\/[A-Za-z0-9_.:-]+$/.test(text)) return text.split("/")[1];
    return /^[A-Za-z0-9_.:-]+$/.test(text) ? text : "";
  }
  if (value?.path) return referenceId(value.path);
  return "";
}

function serialValues(data = {}) {
  return [...new Set(["serialNo", "serialNumber", "SerialNumber", "SN", "sn", "serial", "Serial", "SerialNo"]
    .map(field => key(data[field])).filter(value => value && !/^(?:tbd|n a|na|none|unknown|not available|not known|0+)$/.test(value)))];
}

function typedIds(data, fields, collection) {
  const values = [];
  for (const field of fields) {
    const value = data[field]; if (value === undefined || value === null || value === "") continue;
    const raw = typeof value === "string" ? value : value?.path;
    if (typeof raw !== "string") return null;
    const parts = raw.replace(/^\//, "").split("/");
    if (!((parts.length === 1 || (parts.length === 2 && parts[0] === collection)) && /^[A-Za-z0-9_.:-]+$/.test(parts.at(-1)))) return null;
    values.push(parts.at(-1));
  }
  return [...new Set(values)];
}

async function planMobileEquipment({ transaction, db, workOrder, proof, customerProof, clientId, clientData, nowIso }) {
  const result = (reason, extra = {}) => ({ reason, patch: {}, writes: [], ...extra });
  const catalog = getVerifiedCustomerEquipmentCatalog(customerProof, { nowMs: Date.parse(nowIso) });
  if (!catalog || customerProof.customerId !== proof.customerId || customerProof.location?.bluefolderLocationId !== proof.locationId) {
    return result("bluefolder_mobile_catalog_proof_missing");
  }
  const sameNumber = catalog.filter(row => Number(row.name.match(/^MOBILE\s*#\s*0*(\d+)\b/i)?.[1] || 0) === proof.mobileNumber);
  if (sameNumber.length !== 1 || sameNumber[0].equipmentId !== proof.equipmentId || sameNumber[0].customerId !== proof.customerId || sameNumber[0].locationId !== proof.locationId) {
    return result("bluefolder_mobile_source_number_not_unique");
  }
  const trailerId = `AIS${proof.mobileNumber}`, trailerRef = db.collection("Trailers").doc(trailerId);
  const trailer = await transaction.get(trailerRef), trailerData = trailer.exists ? trailer.data() : null;
  if (!trailerData || unavailable(trailerData) || Number(trailerData.number) !== proof.mobileNumber) return result("bluefolder_mobile_trailer_identity_missing");
  const machineIds = typedIds(trailerData, ["associatedMachine", "associatedMachineId", "machine", "machineId", "currentMachineId"], "Machine");
  const clientIds = typedIds(trailerData, ["currentClient", "currentClientId", "locationCurrentId", "client", "clientId"], "Client");
  if (machineIds?.length !== 1 || clientIds?.length !== 1 || clientIds[0] !== clientId) return result("bluefolder_mobile_live_topology_mismatch");
  const snapshots = await Promise.all([transaction.get(db.collection("Machine").limit(5001)), transaction.get(db.collection("Trailers").limit(1001))]);
  if (snapshots[0].docs.length > 5000 || snapshots[1].docs.length > 1000) return result("bluefolder_mobile_directory_bounded");
  const rows = snapshots.map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ref: doc.ref, data: doc.data() || {} })));
  const machine = rows[0].find(row => row.id === machineIds[0]);
  if (!machine || unavailable(machine.data)) return result("bluefolder_mobile_machine_unavailable");
  const machineTrailer = typedIds(machine.data, ["trailer", "trailerId", "Trailer", "TrailerId", "trailerRef"], "Trailers");
  const machineClient = typedIds(machine.data, ["client", "Client", "clientId", "ClientId"], "Client");
  if (machineTrailer?.length !== 1 || machineTrailer[0] !== trailerId || machineClient?.length !== 1 || machineClient[0] !== clientId) return result("bluefolder_mobile_reciprocal_topology_missing");
  const existingIds = [machine.data.bluefolderEquipmentId, machine.data.blueFolderEquipmentId].filter(Boolean).map(canonicalEquipmentId);
  if (existingIds.some(id => id !== proof.equipmentId) || rows[0].some(row => row.id !== machine.id &&
      [row.data.bluefolderEquipmentId, row.data.blueFolderEquipmentId].some(id => canonicalEquipmentId(id) === proof.equipmentId))) return result("bluefolder_mobile_existing_guid_conflict");
  const stamp = { bluefolderEquipmentId: proof.equipmentId, bluefolderEquipmentVerifiedAtIso: proof.verifiedAtIso,
    bluefolderEquipmentSourceHash: proof.sourceHash, bluefolderEquipmentLink: { source: "verified_mobile_number_and_reciprocal_topology",
      equipmentId: proof.equipmentId, customerId: proof.customerId, locationId: proof.locationId,
      equipmentName: proof.name, verifiedAtIso: proof.verifiedAtIso, localNamesModelsAndPlacementPreserved: true } };
  const projected = rows[0].map(row => row.id === machine.id ? { ...row, data: { ...row.data, ...stamp } } : row);
  const resolved = resolveWorkOrderTrailerLink(rows[1], resolveWorkOrderMachineLink(projected, workOrder, { clientId, clientData }), { clientId });
  if (resolved.match?.id !== machine.id || resolved.trailer?.id !== trailerId) return result(resolved.reason);
  const patch = buildWorkOrderMachineLinkPatch(resolved, { linkedAtIso: nowIso, source: "verified_mobile_number_and_reciprocal_topology" });
  const guard = await validateExistingWorkOrderAssetSiteInTransaction(transaction, db, { ...workOrder, ...patch }, { clientId }, { clientData });
  if (!guard.allowed) return result(guard.reason);
  return result("bluefolder_verified_mobile_mapping_persisted", { resolved, patch,
    pendingVerifiedMachine: { ref: machine.ref, data: resolved.match.data, trailer: resolved.trailer },
    writes: canonicalEquipmentId(machine.data.bluefolderEquipmentId) === proof.equipmentId ? [] : [{ ref: machine.ref, data: stamp, merge: true }] });
}

// Plans only; no network or writes. The proof was minted by a bounded live
// BlueFolder lookup outside this transaction and is rechecked against the
// current work-order selection, exact site, all GUID/serial claims and topology.
async function planWorkOrderEquipmentOnboardingInTransaction({ transaction, db, workOrder,
  proof, customerProof = null, clientId = clean(workOrder?.clientId), clientData: suppliedClientData, nowIso = new Date().toISOString() } = {}) {
  const preconditions = equipmentOnboardingPreconditions(workOrder);
  const result = (reason, extra = {}) => ({ reason, patch: {}, writes: [], ...extra });
  if (!preconditions.eligible) return result(preconditions.reason);
  if (!isVerifiedEquipmentProof(proof, { nowMs: Date.parse(nowIso) })) return result("bluefolder_equipment_onboarding_untrusted_or_stale_proof");
  if (proof.equipmentId !== preconditions.equipmentId || proof.customerId !== preconditions.identity.customerId ||
      proof.locationId !== preconditions.identity.customerLocationId || proof.active !== true ||
      !(proof.stationaryScreenPassed === true || (proof.stationaryScreenPassed === false && proof.mobileNumber && proof.customerId === "34579389"))) {
    return result("bluefolder_equipment_onboarding_source_conflict");
  }
  if (!/^[A-Za-z0-9_.:-]{1,180}$/.test(clientId)) return result("bluefolder_equipment_onboarding_client_missing");
  const clientRef = db.collection("Client").doc(clientId);
  let clientData = suppliedClientData;
  if (clientData === undefined) {
    const clientSnapshot = await transaction.get(clientRef);
    clientData = clientSnapshot.exists ? clientSnapshot.data() : null;
  }
  if (!clientData || unavailable(clientData) || !resolveWorkOrderClientLink([{ id: clientId, data: clientData }], workOrder).match) {
    return result("bluefolder_equipment_onboarding_client_not_verified");
  }
  if (!proof.stationaryScreenPassed) return planMobileEquipment({ transaction, db, workOrder, proof, customerProof, clientId, clientData, nowIso });
  let currentResolution = await resolveWorkOrderMachineLinkInTransaction(transaction, db, workOrder, clientId, { clientData });
  // Ambiguity, wrong-site GUID owners and declared mobile/trailer conflicts are
  // review-only. Creating another machine must never route around those guards.
  if (!currentResolution.match && currentResolution.reason !== "bluefolder_equipment_not_mapped") return result(currentResolution.reason);
  const directory = await transaction.get(db.collection("Machine").limit(5001));
  if (directory.docs.length > 5000) return result("bluefolder_equipment_onboarding_directory_bounded");
  const rows = directory.docs.map(doc => ({ id: doc.id, ref: doc.ref, data: doc.data() || {} }));
  if (!currentResolution.match && proof.model) {
    // The selected GUID's current authoritative model can identify a scanner
    // named merely "MR1" without using work-order titles or fuzzy similarity.
    const sourceModelName = `${proof.manufacturer} ${proof.model} ${proof.type}`;
    const sourceModelIdentity = { ...workOrder, bluefolderEquipmentNames: [sourceModelName],
      ...(workOrder.blueFolder ? { blueFolder: { ...workOrder.blueFolder, equipmentNames: [sourceModelName] } } : {}) };
    const sourceModelMatch = resolveWorkOrderMachineLink(rows, sourceModelIdentity, { clientId, clientData });
    if (sourceModelMatch.match) {
      currentResolution = await resolveWorkOrderMachineLinkInTransaction(transaction, db, sourceModelIdentity, clientId, { clientData });
    } else if (sourceModelMatch.reason !== "bluefolder_equipment_not_mapped") return result(sourceModelMatch.reason);
  }
  const guidClaims = rows.filter(row => [row.data.bluefolderEquipmentId, row.data.blueFolderEquipmentId].some(id => canonicalEquipmentId(id) === proof.equipmentId));
  if (guidClaims.some(row => row.id !== currentResolution.match?.id) || guidClaims.length > 1) return result("bluefolder_equipment_onboarding_existing_guid_claim");
  if (proof.serial && rows.some(row => row.id !== currentResolution.match?.id && serialValues(row.data).includes(key(proof.serial)))) {
    return result("bluefolder_equipment_onboarding_existing_serial_claim");
  }
  if (currentResolution.match) {
    const match = currentResolution.match;
    if (currentResolution.trailer || ["trailerId", "trailer", "Trailer", "TrailerId", "trailerRef"].some(field => match.data[field])) {
      return result("bluefolder_equipment_onboarding_mobile_topology_requires_review");
    }
    if (proof.serial && serialValues(match.data).some(value => value !== key(proof.serial))) {
      return result("bluefolder_equipment_onboarding_machine_serial_conflict");
    }
    const stamp = { bluefolderEquipmentId: proof.equipmentId,
      bluefolderEquipmentVerifiedAtIso: proof.verifiedAtIso, bluefolderEquipmentSourceHash: proof.sourceHash,
      bluefolderEquipmentLink: { source: "verified_equipment_get", equipmentId: proof.equipmentId,
        customerId: proof.customerId, locationId: proof.locationId, verifiedAtIso: proof.verifiedAtIso,
        matchReason: currentResolution.reason } };
    const resolved = { ...currentResolution, identity: blueFolderEquipmentIdentity(workOrder),
      match: { ...match, data: { ...match.data, ...stamp } } };
    return result("bluefolder_verified_equipment_mapping_persisted", { resolved,
      pendingVerifiedMachine: { ref: match.ref, data: resolved.match.data },
      patch: buildWorkOrderMachineLinkPatch(resolved, { linkedAtIso: nowIso }),
      writes: canonicalEquipmentId(match.data.bluefolderEquipmentId) === proof.equipmentId ? [] : [{ ref: match.ref, data: stamp, merge: true }] });
  }
  if (guidClaims.length) return result("bluefolder_equipment_onboarding_existing_guid_claim");
  const siteCandidates = rows.filter(row => machineBelongsToClient(row.data, clientData, row.id, clientId));
  // Do not introduce a second asset when the exact source display/model already
  // exists at this site but its missing/conflicting metadata blocked the normal
  // resolver. A like-named scanner at another physical site is not this asset.
  if (siteCandidates.some(row => key(row.data.name) === key(proof.name) ||
      [row.data.Model, row.data.model, row.data.typedModel].some(model => key(model) && key(model) === key(proof.model)))) {
    return result("bluefolder_equipment_onboarding_existing_site_candidate");
  }
  for (const field of ["machines", "Machines"]) {
    if (clientData[field] !== undefined && (!Array.isArray(clientData[field]) || clientData[field].some(value => !referenceId(value)))) {
      return result("bluefolder_equipment_onboarding_client_backlinks_malformed");
    }
  }
  let machineRef;
  for (let attempt = 0; attempt < 32; attempt++) {
    const id = deterministicEquipmentMachineId(proof.equipmentId, attempt);
    const identities = await Promise.all(["Machine", "Client", "Test", "Trailers", "ArchivedItemIds"].map(collection =>
      transaction.get(db.collection(collection).doc(id))));
    if (identities.some(snapshot => snapshot.exists)) continue;
    machineRef = db.collection("Machine").doc(id); break;
  }
  if (!machineRef) return result("bluefolder_equipment_onboarding_id_allocation_exhausted");
  const data = { name: proof.name, ...(proof.manufacturer ? { OEM: proof.manufacturer } : {}),
    ...(proof.model ? { Model: proof.model } : {}), ...(proof.type ? { Modality: proof.type } : {}),
    client: clientRef, clientId, associatedParts: [],
    ...(proof.serial ? { SN: proof.serial } : {}),
    bluefolderEquipmentId: proof.equipmentId, bluefolderCustomerId: proof.customerId, bluefolderLocationId: proof.locationId,
    bluefolderEquipmentSource: "verified_equipment_get", bluefolderEquipmentVerifiedAtIso: proof.verifiedAtIso,
    bluefolderEquipmentSourceHash: proof.sourceHash,
    bluefolderEquipmentSnapshot: { equipmentId: proof.equipmentId, customerId: proof.customerId, locationId: proof.locationId,
      equipName: proof.name, equipType: proof.type, mfrName: proof.manufacturer, modelNo: proof.model,
      serialNo: proof.sourceSerial, active: true },
    createdAt: nowIso, createdBy: "Magmo BlueFolder equipment sync", bluefolderEquipmentWorkOrderId: preconditions.identity.serviceRequestId };
  const clientPatch = { machines: [...(clientData.machines || []), machineRef] };
  if (Array.isArray(clientData.Machines)) clientPatch.Machines = [...clientData.Machines, machineRef];
  const resolved = { reason: "bluefolder_verified_equipment_created", identity: blueFolderEquipmentIdentity(workOrder),
    match: { id: machineRef.id, ref: machineRef, data } };
  return result(resolved.reason, { created: true, resolved, machineCreation: { ref: machineRef, data }, clientPatch,
    patch: buildWorkOrderMachineLinkPatch(resolved, { linkedAtIso: nowIso, source: "bluefolder_verified_equipment_get" }),
    writes: [{ ref: machineRef, data, create: true }, { ref: clientRef, data: clientPatch, merge: true }] });
}

module.exports = { equipmentOnboardingPreconditions, deterministicEquipmentMachineId, planWorkOrderEquipmentOnboardingInTransaction };
