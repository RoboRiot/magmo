"use strict";

const { createHash } = require("node:crypto");
const { normalizeBlueFolderWorkOrderIdentity, resolveWorkOrderClientLink } = require("./workOrderClientLink.cjs");
const { resolveWorkOrderSiteLinkInTransaction } = require("./workOrderSiteLink.cjs");
const warehouseContract = require("../inventory/workOrderAddContract.cjs");
const {
  blueFolderEquipmentIdentity, resolveWorkOrderMachineLinkInTransaction,
  buildWorkOrderMachineLinkPatch, validateExistingWorkOrderAssetSiteInTransaction, workOrderMachineLinkNeedsReview,
} = require("./workOrderMachineLink.cjs");

const INCIDENTS = "OpsWorkOrderLinkIncidents";
const OUTBOX = "OpsWorkOrderLinkAlertOutbox";
const VERSION = "2026-09-29.1";
const CHECKPOINT_INTERVAL_MS = 5 * 60 * 1000;
const clean = (value, max = 220) => typeof value === "string" || typeof value === "number"
  ? String(value).replace(/\s+/g, " ").trim().slice(0, max) : "";
const own = (value, key) => Object.prototype.hasOwnProperty.call(value || {}, key);
const digest = value => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const unavailable = value => Boolean(value?.deletedAt || value?.archivedAt || value?.deleted === true || value?.archived === true);

// Do not collapse omitted equipment metadata into an explicit empty selection.
// IDs are authoritative; names alone cannot identify an individual scanner.
function selectedEquipmentEvidence(workOrder = {}) {
  const nested = workOrder.blueFolder && typeof workOrder.blueFolder === "object" && !Array.isArray(workOrder.blueFolder)
    ? workOrder.blueFolder : workOrder;
  const idKey = own(nested, "equipmentIds") ? "equipmentIds" : "bluefolderEquipmentIds";
  const nameKey = own(nested, "equipmentNames") ? "equipmentNames" : "bluefolderEquipmentNames";
  const idsPresent = own(nested, idKey), namesPresent = own(nested, nameKey);
  const values = [...(idsPresent ? [nested[idKey]] : []), ...(namesPresent ? [nested[nameKey]] : [])];
  if (values.some(value => !Array.isArray(value) || value.length > 50 ||
      value.some(entry => typeof entry !== "string" || entry.length > 220))) {
    return { state: "invalid", equipmentIds: [], equipmentNames: [] };
  }
  const identity = blueFolderEquipmentIdentity(workOrder);
  const omitted = (nested.equipmentFieldPresence || workOrder.bluefolderEquipmentFieldPresence) === "omitted";
  return { ...identity, state: !idsPresent || (omitted && !identity.equipmentIds.length) ? "unknown"
    : identity.equipmentIds.length ? "selected" : identity.equipmentNames.length ? "invalid" : "none" };
}

// Preserve only explicitly provided source fields when the non-import creation
// path receives BlueFolder evidence. Slack/lifecycle fields are never copied.
function workOrderBlueFolderEvidencePatch(payload = {}) {
  const nested = payload.blueFolder && typeof payload.blueFolder === "object" && !Array.isArray(payload.blueFolder)
    ? payload.blueFolder : {};
  const patch = {};
  for (const [input, stored, max] of [
    ["serviceRequestId", "bluefolderServiceRequestId", 180],
    ["customerId", "bluefolderCustomerId", 100], ["customerName", "bluefolderCustomerName", 220],
    ["customerLocationId", "bluefolderLocationId", 100], ["customerLocationName", "bluefolderLocationName", 220],
    ["addressStreet", "bluefolderAddressStreet", 250], ["addressCity", "bluefolderAddressCity", 100],
    ["addressState", "bluefolderAddressState", 100], ["addressPostalCode", "bluefolderAddressPostalCode", 30],
    ["addressCountry", "bluefolderAddressCountry", 100],
  ]) {
    if (own(nested, input)) patch[stored] = clean(nested[input], max);
    else if (own(payload, stored)) patch[stored] = clean(payload[stored], max);
  }
  for (const [input, stored] of [["equipmentIds", "bluefolderEquipmentIds"], ["equipmentNames", "bluefolderEquipmentNames"]]) {
    const value = own(nested, input) ? nested[input] : payload[stored];
    if (!own(nested, input) && !own(payload, stored)) continue;
    if (!Array.isArray(value) || value.length > 50 || value.some(entry => typeof entry !== "string" || entry.length > 220)) {
      throw Object.assign(new Error("BlueFolder equipment identity must be an array of at most 50 strings."),
        { code: "bluefolder_equipment_identity_invalid", statusCode: 400 });
    }
    patch[stored] = [...new Set(value.map(entry => clean(entry)).filter(Boolean))];
    if (input === "equipmentIds") patch.bluefolderEquipmentFieldPresence = "present";
  }
  return patch;
}

function publicLinkHealth(value) {
  if (!value || value.version !== VERSION) return null;
  return { version: VERSION, status: clean(value.status, 40), issue: clean(value.issue, 120),
    fingerprint: clean(value.fingerprint, 64), checkedAtIso: clean(value.checkedAtIso, 80),
    equipmentSelection: clean(value.equipmentSelection, 40), source: clean(value.source, 100),
    ...(value.warehouseInterior ? { warehouseInterior: {
      clientId: clean(value.warehouseInterior.clientId, 180), machineId: clean(value.warehouseInterior.machineId, 180),
    } } : {}) };
}

function linkHealthEquipmentStatus(health) {
  if (!health || health.version !== VERSION) return null;
  return { equipmentLinkStatus: health.status, equipmentLinkIssue: health.issue };
}

function typedId(value, collection) {
  if (value === undefined || value === null || value === "") return { id: "", invalid: false };
  let path = "", id = "";
  if (typeof value === "string") { path = value.trim(); if (!path) return { id: "", invalid: false }; }
  else if (value && typeof value === "object" && !Array.isArray(value)) {
    path = typeof value.path === "string" ? value.path : Array.isArray(value._path?.segments) ? value._path.segments.join("/") : "";
    id = typeof value.id === "string" ? value.id : "";
    if (!path && !id) return { id: "", invalid: true };
  } else return { id: "", invalid: true };
  if (/[\\\u0000-\u001f\u007f]/.test(path) || /[\/\\\u0000-\u001f\u007f]/.test(id)) return { id: "", invalid: true };
  if (path.includes("/")) {
    const parts = path.replace(/^\//, "").split("/");
    if (parts.length !== 2 || parts[0] !== collection || !parts[1] || (id && id !== parts[1])) return { id: "", invalid: true };
    id = parts[1];
  } else if (path) {
    if (id && id !== path) return { id: "", invalid: true };
    id = path;
  }
  return { id, invalid: !id || id === "." || id === ".." };
}

function association(value, fields, collection) {
  const parts = fields.map(field => typedId(value[field], collection));
  const ids = [...new Set(parts.map(part => part.id).filter(Boolean))];
  return { id: ids.length === 1 ? ids[0] : "", invalid: ids.length > 1 || parts.some(part => part.invalid), present: ids.length > 0 || parts.some(part => part.invalid) };
}

// Match the inventory workflow's reviewed warehouse endpoints. The BlueFolder
// site stays unchanged: its warehouse Interior belongs to the separate canonical
// inventory client, so attaching that machine directly to the site is invalid.
async function verifiedWarehouseInterior(transaction, db, workOrder, clientId, clientData) {
  const mapping = warehouseContract.warehouseInteriorForClient(clientId);
  if (!mapping || !warehouseContract.warehouseSourceIdentityMatches(workOrder)) return null;
  if (clientData.inactive === true || clientData.bluefolderInactive === true) return null;
  if (clientId === warehouseContract.LAKE_FOREST_BLUEFOLDER_CLIENT_ID &&
      (String(clientData.bluefolderCustomerId || "") !== "34579389" ||
      String(clientData.bluefolderLocationId || "") !== "39226291" ||
      !Array.isArray(clientData.bluefolderLocationAliasKeys) || !clientData.bluefolderLocationAliasKeys.includes("34579389:39226291"))) return null;
  if (clientId === warehouseContract.LATHROP_BLUEFOLDER_CLIENT_ID &&
      (String(clientData.bluefolderCustomerId || "") !== "34579389" ||
      String(clientData.bluefolderLocationId || "") !== "35057801" ||
      clean(clientData.address?.street).toLowerCase().replace(/[\s.]/g, "") !== "17410murphypkwy" ||
      clean(clientData.address?.city).toLowerCase() !== "lathrop" || clean(clientData.address?.state).toUpperCase() !== "CA" ||
      clean(clientData.address?.postalCode) !== "95330")) return null;
  const inventoryClientSnapshot = clientId === mapping.clientId ? null : await transaction.get(db.collection("Client").doc(mapping.clientId));
  const inventoryClient = inventoryClientSnapshot ? inventoryClientSnapshot.data() : clientData;
  const machineSnapshot = await transaction.get(db.collection("Machine").doc(mapping.machineId));
  const machine = machineSnapshot.data();
  if ((inventoryClientSnapshot && !inventoryClientSnapshot.exists) || !machineSnapshot.exists ||
      !inventoryClient || unavailable(inventoryClient) || inventoryClient.inactive || inventoryClient.bluefolderInactive ||
      unavailable(machine) || machine.inactive || machine.bluefolderInactive) return null;
  const owner = association(machine, ["client", "Client", "clientId", "ClientId"], "Client");
  const arrays = [inventoryClient.machines, inventoryClient.Machines].filter(value => value !== undefined);
  if (owner.invalid || owner.id !== mapping.clientId || !arrays.length || arrays.some(value => !Array.isArray(value)) ||
      !arrays.flat().some(value => { const ref = typedId(value, "Machine"); return !ref.invalid && ref.id === mapping.machineId; })) return null;
  return { clientId: mapping.clientId, machineId: mapping.machineId };
}

// Pure incident transition: issue retries reuse the same outbox event, whereas
// a changed issue or a recurrence after resolution gets a distinct occurrence.
function planIncidentTransition({ workOrderId, workOrder, health, previous = {}, nowIso }) {
  const issue = !["resolved", "manual", "not_selected", "deleted"].includes(health.status);
  if (!issue && !previous.workOrderId) return { incident: null, event: null, supersededEventId: "" };
  const previousOpen = previous.status === "open";
  const changed = issue && (!previousOpen || previous.fingerprint !== health.fingerprint || !/^[a-f0-9]{64}$/.test(previous.currentEventId || ""));
  const priorSequence = Number(previous.sequence);
  const sequence = (Number.isSafeInteger(priorSequence) && priorSequence >= 0 ? priorSequence : 0) + (changed ? 1 : 0);
  const eventId = issue ? (changed ? digest([workOrderId, sequence, health.fingerprint]) : previous.currentEventId) : "";
  const incident = { ...previous, version: VERSION, workOrderId, status: issue ? "open" : "resolved",
    fingerprint: health.fingerprint, issue: health.issue, linkStatus: health.status, sequence,
    currentEventId: eventId || "", lastCheckedAtIso: nowIso,
    firstSeenAtIso: previous.firstSeenAtIso || nowIso,
    openedAtIso: changed ? nowIso : previous.openedAtIso || "",
    resolvedAtIso: issue ? "" : previousOpen ? nowIso : previous.resolvedAtIso || nowIso };
  const event = changed ? { version: VERSION, id: eventId, workOrderId, sequence,
    number: clean(workOrder.number || workOrderId, 120), subject: clean(workOrder.subject, 500),
    fingerprint: health.fingerprint, issue: health.issue, linkStatus: health.status,
    recipientScope: "owner_only", deliveryStatus: "pending_recipient_configuration",
    needsDelivery: true,
    incidentStatus: "open", createdAtIso: nowIso, resolvedAtIso: "",
    sourceIdentity: normalizeBlueFolderWorkOrderIdentity(workOrder),
    equipment: selectedEquipmentEvidence(workOrder),
    clientId: clean(workOrder.clientId, 180), machineId: clean(workOrder.machineId, 180), trailerId: clean(workOrder.trailerId, 180),
  } : null;
  return { incident, event, supersededEventId: previousOpen && previous.currentEventId && previous.currentEventId !== eventId ? previous.currentEventId : "" };
}

// All reads, including incident state, precede all returned writes. Callers must
// apply the plan in the SAME transaction, after their own remaining reads.
async function planWorkOrderLinkHealthInTransaction({ transaction, db, workOrderId, workOrder = {},
  nowIso = new Date().toISOString(), source = "work_order_sync", unresolvedReason = "", resolveMissing = true,
  clientData: suppliedClientData, freshCustomerProof = null, pendingMachineCreation = null,
  pendingVerifiedMachine = null, machineResolutionBlockReason = "", suppressNewAlertDelivery = false } = {}) {
  if (!transaction || !db || !/^[A-Za-z0-9_.:-]{1,180}$/.test(workOrderId || "") || !Number.isFinite(Date.parse(nowIso))) {
    throw new Error("A valid work order, transaction, and check time are required.");
  }
  const beforeHealth = publicLinkHealth(workOrder.linkHealth);
  const incidentRef = db.collection(INCIDENTS).doc(workOrderId);
  const previousSnapshot = await transaction.get(incidentRef);
  const previous = previousSnapshot.exists ? previousSnapshot.data() || {} : {};
  const associationPatch = {}, creations = [];
  let effective = { ...workOrder }, clientData = suppliedClientData;
  let reason = clean(unresolvedReason, 120), machineResolution = null;
  let client = association(effective, ["clientId", "clientRef"], "Client");
  const machine = association(effective, ["machineId", "machineRef"], "Machine");
  const trailer = association(effective, ["trailerId", "trailerRef"], "Trailers");
  const identity = normalizeBlueFolderWorkOrderIdentity(effective);
  const equipment = selectedEquipmentEvidence(effective);
  const verification = effective.bluefolderEquipmentVerification;
  const persistedVerificationIssue = verification?.status === "needs_review" && equipment.equipmentIds.length === 1 &&
    clean(verification.equipmentId).toUpperCase() === equipment.equipmentIds[0].toUpperCase() &&
    clean(verification.customerId) === identity.customerId && clean(verification.locationId) === identity.customerLocationId
    ? clean(verification.issue, 120) : "";
  const deleted = unavailable(effective);
  const sourceRequestId = clean(effective.bluefolderServiceRequestId || effective.blueFolder?.serviceRequestId, 180);
  const sourceIdConflict = Boolean(sourceRequestId && sourceRequestId !== workOrderId);

  if (!deleted && !sourceIdConflict && resolveMissing && !client.present) {
    const site = await resolveWorkOrderSiteLinkInTransaction(transaction, db, effective, { linkedAtIso: nowIso, freshCustomerProof });
    reason ||= site.reason || "";
    if (site.patch?.clientId) {
      const guard = await validateExistingWorkOrderAssetSiteInTransaction(transaction, db, effective, site.patch,
        { clientData: site.creation?.data });
      if (guard.allowed) {
        Object.assign(associationPatch, site.patch);
        if (site.creation) { creations.push({ ref: site.creation.ref, data: site.creation.data, create: true }); clientData = site.creation.data; }
        effective = { ...effective, ...site.patch };
        client = association(effective, ["clientId", "clientRef"], "Client");
      } else reason = guard.reason;
    }
  }

  let status = "unresolved", issue = "", warehouseInterior = null;
  if (deleted) { status = "deleted"; }
  else if (sourceIdConflict) { status = "needs_review"; issue = "work_order_bluefolder_identity_conflict"; }
  else if (client.invalid) { status = "site_unresolved"; issue = "existing_client_identity_conflict"; }
  else if (!client.id) { status = "site_unresolved"; issue = reason || "work_order_client_missing"; }
  else {
    if (clientData === undefined) {
      const snapshot = await transaction.get(db.collection("Client").doc(client.id));
      clientData = snapshot.exists ? snapshot.data() || {} : null;
    }
    if (!clientData) { status = "site_unresolved"; issue = reason.startsWith("existing_client_") ? reason : "linked_client_missing"; }
    else if (unavailable(clientData) || clientData.bluefolderInactive === true) { status = "site_unresolved"; issue = "linked_client_unavailable"; }
    else if (!identity.customerId || !identity.customerLocationId) { status = "needs_review"; issue = "bluefolder_site_evidence_missing"; }
    else if (!resolveWorkOrderClientLink([{ id: client.id, data: clientData }], effective).match) {
      status = "site_unresolved"; issue = "linked_client_does_not_match_bluefolder_site";
    } else {
      // The only uncommitted asset accepted here is the exact machine record
      // returned by the server onboarding planner in this same transaction.
      // Its directory/serial conflict reads already participate in transaction
      // retries. Never accept a pending machine or source proof from a request.
      const pending = pendingVerifiedMachine || pendingMachineCreation;
      const pendingOwner = pending ? association(pending.data || {}, ["client", "Client", "clientId", "ClientId"], "Client") : null;
      const pendingTopology = pending?.trailer ? !trailer.invalid && trailer.id === pending.trailer.id &&
        pending.trailer.ref?.path === `Trailers/${trailer.id}` : !trailer.present && !pending?.data?.trailerId && !pending?.data?.trailer;
      const validPending = pending && !machine.invalid && pendingTopology && machine.id === pending.ref?.id &&
        pending.ref?.path === `Machine/${machine.id}` && pendingOwner?.id === client.id && !pendingOwner.invalid &&
        !unavailable(pending.data) &&
        equipment.state === "selected" && equipment.equipmentIds.length === 1 &&
        String(pending.data.bluefolderEquipmentId || "").toUpperCase() === equipment.equipmentIds[0].toUpperCase();
      const assetTransaction = validPending ? { get: target => target.path === pending.ref.path
        ? Promise.resolve({ exists: true, id: pending.ref.id, ref: pending.ref, data: () => pending.data }) : transaction.get(target) } : transaction;
      const assets = await validateExistingWorkOrderAssetSiteInTransaction(assetTransaction, db, effective,
        { clientId: client.id }, { clientData });
      if (!assets.allowed) { status = "needs_review"; issue = assets.reason; }
      else if ((!machine.present && clean(effective.machineName)) || (!trailer.present && clean(effective.trailerName))) {
        status = "needs_review"; issue = "existing_asset_display_name_without_identity";
      }
      else if (workOrderMachineLinkNeedsReview(effective)) { status = "needs_review"; issue = "bluefolder_equipment_selection_changed"; }
      else if (equipment.state === "unknown") {
        // Warehouse interiors are a reviewed exact site default, not guessed
        // scanner identity. An omitted empty source field is safe only here;
        // selected or name-only equipment can never use this fallback.
        if (!machine.present && !trailer.present && !equipment.equipmentIds.length && !equipment.equipmentNames.length) {
          warehouseInterior = await verifiedWarehouseInterior(transaction, db, effective, client.id, clientData);
        }
        if (warehouseInterior) status = "resolved";
        else { status = "needs_review"; issue = "bluefolder_equipment_evidence_missing"; }
      }
      else if (equipment.state === "invalid") { status = "needs_review"; issue = "bluefolder_equipment_identity_invalid"; }
      else if (equipment.state === "none") {
        if (machine.present || trailer.present) status = "not_selected";
        else {
          warehouseInterior = await verifiedWarehouseInterior(transaction, db, effective, client.id, clientData);
          if (warehouseInterior) status = "resolved";
          else { status = "needs_review"; issue = "bluefolder_no_equipment_selected"; }
        }
      }
      else if (equipment.equipmentIds.length !== 1 || equipment.equipmentNames.length > 1) {
        status = "needs_review"; issue = "bluefolder_multiple_equipment_requires_review";
      } else if (machineResolutionBlockReason || persistedVerificationIssue) {
        status = "needs_review"; issue = clean(machineResolutionBlockReason || persistedVerificationIssue, 120);
      } else {
        machineResolution = validPending ? { match: { id: pending.ref.id, ref: pending.ref, data: pending.data },
          identity: blueFolderEquipmentIdentity(effective), ...(pending.trailer ? { trailer: pending.trailer } : {}), reason: "bluefolder_verified_equipment_created" }
          : await resolveWorkOrderMachineLinkInTransaction(transaction, db, effective, client.id, { clientData });
        if (!machineResolution.match) {
          status = "unresolved"; issue = machineResolution.reason || reason || "bluefolder_equipment_not_mapped";
        } else if (machineResolution.match.data?.inactive === true || machineResolution.match.data?.bluefolderInactive === true) {
          status = "needs_review"; issue = "linked_machine_unavailable";
        } else if ((machine.present && machine.id !== machineResolution.match.id) ||
          (trailer.present && trailer.id !== machineResolution.trailer?.id)) {
          status = "needs_review"; issue = "linked_asset_does_not_match_bluefolder_equipment";
        } else if (!machine.present && !trailer.present && resolveMissing) {
          const patch = buildWorkOrderMachineLinkPatch(machineResolution, { linkedAtIso: nowIso, source: "bluefolder_link_health" });
          if (patch.machineId) { Object.assign(associationPatch, patch); effective = { ...effective, ...patch }; status = "resolved"; }
          else { status = "unresolved"; issue = machineResolution.reason || "bluefolder_equipment_not_mapped"; }
        } else if (machine.present || trailer.present) {
          status = effective.machineLinkSource === "manual" || !(effective.machineLinkEquipmentIds || []).length ? "manual" : "resolved";
        } else { status = "unresolved"; issue = "bluefolder_equipment_not_linked"; }
      }
    }
  }

  const fingerprint = digest([VERSION, status, issue, identity.customerId, identity.customerLocationId,
    equipment.state, [...equipment.equipmentIds].sort(), [...equipment.equipmentNames].sort(),
    clean(effective.clientId), clean(effective.machineId), clean(effective.trailerId), warehouseInterior]);
  const checkpointDue = !beforeHealth || beforeHealth.fingerprint !== fingerprint ||
    !Number.isFinite(Date.parse(beforeHealth.checkedAtIso || "")) ||
    Date.parse(nowIso) - Date.parse(beforeHealth.checkedAtIso || "") >= CHECKPOINT_INTERVAL_MS;
  const health = { version: VERSION, status, issue, fingerprint, equipmentSelection: equipment.state,
    checkedAtIso: checkpointDue ? nowIso : beforeHealth.checkedAtIso,
    source: checkpointDue ? clean(source, 100) : beforeHealth.source,
    ...(warehouseInterior ? { warehouseInterior } : {}) };
  const workOrderPatch = { ...associationPatch, ...(checkpointDue ? { linkHealth: health } : {}) };
  const writes = [...creations];
  const transition = planIncidentTransition({ workOrderId, workOrder: effective, health, previous, nowIso });
  // One-time audited historical baselines stay visible privately without
  // unleashing old notifications when the owner later enables delivery.
  // This affects only a newly created event, never a preexisting live alert.
  if (suppressNewAlertDelivery && transition.event) {
    transition.event.deliveryStatus = "historical_baseline";
    transition.event.needsDelivery = false;
  }
  if (transition.incident && (checkpointDue || transition.event || transition.supersededEventId || !previous.workOrderId)) {
    writes.push({ ref: incidentRef, data: transition.incident, merge: true });
  }
  if (transition.supersededEventId) writes.push({ ref: db.collection(OUTBOX).doc(transition.supersededEventId),
    data: { incidentStatus: "resolved", resolvedAtIso: nowIso, needsDelivery: false }, merge: true });
  if (transition.event) writes.push({ ref: db.collection(OUTBOX).doc(transition.event.id), data: transition.event, create: true });
  return { health, workOrderPatch, writes, resolvedWorkOrder: { ...effective, linkHealth: health },
    incidentId: transition.incident ? workOrderId : "", alertEventId: transition.event?.id || "" };
}

function applyWorkOrderLinkHealthWrites(transaction, plan) {
  for (const write of plan.writes || []) {
    if (write.create) transaction.create(write.ref, write.data);
    else transaction.set(write.ref, write.data, { merge: write.merge === true });
  }
}

module.exports = { INCIDENTS, OUTBOX, VERSION, CHECKPOINT_INTERVAL_MS, selectedEquipmentEvidence,
  workOrderBlueFolderEvidencePatch, publicLinkHealth, linkHealthEquipmentStatus, planIncidentTransition,
  planWorkOrderLinkHealthInTransaction, applyWorkOrderLinkHealthWrites };
