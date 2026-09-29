"use strict";
const { deliverWorkOrderLinkAlerts } = require("./lib/ops/workOrderLinkAlertDelivery.cjs");
const { linkHealthEquipmentStatus, planWorkOrderLinkHealthInTransaction, applyWorkOrderLinkHealthWrites, workOrderBlueFolderEvidencePatch } = require("./lib/ops/workOrderLinkHealth.cjs");
const { workOrderEquipmentLinkStatus, resolveWorkOrderMachineLinkInTransaction, validateExistingWorkOrderAssetSiteInTransaction, hasSelectedBlueFolderEquipment, buildWorkOrderMachineLinkPatch } = require("./lib/ops/workOrderMachineLink.cjs");
const { getWorkOrderSource } = require("./lib/ops/workOrderSourceLookup.cjs");
const { assessFreshSiteLookupInTransaction, resolveWorkOrderSiteLinkInTransaction, freshSiteLookupPreconditions } = require("./lib/ops/workOrderSiteLink.cjs");
const { getVerifiedBlueFolderLocation } = require("./lib/ops/blueFolderCustomerLookup.cjs");
const { equipmentOnboardingPreconditions, planWorkOrderEquipmentOnboardingInTransaction } = require("./lib/ops/workOrderEquipmentOnboarding.cjs");
const { getVerifiedBlueFolderEquipment } = require("./lib/ops/blueFolderEquipmentLookup.cjs");
module.exports = function createWorkOrderLinkService(dependencies) {
const { cleanText, requireDb, normalizeId, workOrderRef, referenceId, trailerClientId, trailerMachineId, clientName, clientLocation, trailerName, FieldValue, serializeWorkOrder, ACTIVE_STATUSES, normalizeWorkOrderSubject, buildDispatchEvidenceResolutionPatch, normalizeAssignees, defaultOpsOversightManagers, mergeAssignees, normalizePriorityTier, normalizePriorityLabel, normalizePriorityOrder, initialAssignmentEntry, timestampToIso, PRIORITY_TIERS, GENERATED_PRIORITY_PATTERN, PRIORITY_TIER_LABELS, PRIORITY_TIER_ORDER, buildBlueFolderImportPatch, buildBlueFolderLifecycleCorrection, buildWorkflowTransitionUpdate, initialBlueFolderWorkflowStage } = dependencies;
async function deliverNewWorkOrderLinkAlert(db, eventId) {
  if (!eventId) return;
  try {
    // Owner configuration is checked before Auth/Slack. Delivery happens only
    // after the data transaction commits and cannot undo a successful import.
    await deliverWorkOrderLinkAlerts({ db, ids: [eventId], limit: 1,
      auth: { getUser: uid => require("firebase-admin/auth").getAuth().getUser(uid) } });
  } catch (error) {
    console.warn("[Ops][link-alert] Deferred owner-only delivery", {
      code: cleanText(error?.code || "delivery_deferred", 100),
    });
  }
}

function withEquipmentLinkResolution(workOrder, rawWorkOrder = {}, reason = "") {
  if (!workOrder || typeof workOrder !== "object") return workOrder;
  return {
    ...workOrder,
    ...(linkHealthEquipmentStatus(rawWorkOrder.linkHealth) ||
      workOrderEquipmentLinkStatus(rawWorkOrder, { unresolvedReason: cleanText(reason, 120) })),
  };
}

async function updateOpsConnections({
  workOrderId,
  clientId,
  machineId = "",
  trailerId = "",
  changedBy = "Magmo admin",
}) {
  const db = requireDb();
  const normalizedClientId = normalizeId(clientId);
  if (!normalizedClientId) {
    throw new Error("Select a Client DB record for this work order.");
  }
  const normalizedMachineId = normalizeId(machineId);
  const normalizedTrailerId = normalizeId(trailerId);
  const ref = workOrderRef(workOrderId);
  const linkAlertEventId = await db.runTransaction(async (transaction) => {
  const [clientSnapshot, machineSnapshot, trailerSnapshot, snapshot] = await Promise.all([
    transaction.get(db.collection("Client").doc(normalizedClientId)),
    normalizedMachineId
      ? transaction.get(db.collection("Machine").doc(normalizedMachineId))
      : Promise.resolve(null),
    normalizedTrailerId
      ? transaction.get(db.collection("Trailers").doc(normalizedTrailerId))
      : Promise.resolve(null),
    transaction.get(ref),
  ]);
  if (!snapshot.exists) throw new Error("This Ops work order does not exist.");
  if (!clientSnapshot.exists) throw new Error("Select a valid Client DB record.");
  const clientData = clientSnapshot.data() || {};
  const clientMachineIds = new Set(
    (Array.isArray(clientData.machines) ? clientData.machines : [])
      .map(referenceId)
      .filter(Boolean)
  );
  if (normalizedMachineId) {
    if (!machineSnapshot?.exists) throw new Error("Select a valid machine record.");
    const directClientId = referenceId(
      machineSnapshot.data()?.client || machineSnapshot.data()?.Client
    );
    if (
      directClientId !== normalizedClientId &&
      !clientMachineIds.has(normalizedMachineId)
    ) {
      throw new Error("The selected machine is not linked to that client.");
    }
  }
  let trailerData = null;
  if (normalizedTrailerId) {
    if (!trailerSnapshot?.exists || trailerSnapshot.id === "layout_meta") {
      throw new Error("Select a valid trailer record.");
    }
    trailerData = trailerSnapshot.data() || {};
    if (trailerClientId(trailerData) !== normalizedClientId) {
      throw new Error("The selected trailer is not linked to that client.");
    }
    const attachedMachineId = trailerMachineId(trailerData);
    if (
      attachedMachineId &&
      normalizedMachineId &&
      attachedMachineId !== normalizedMachineId
    ) {
      throw new Error(
        "The selected machine does not match the machine attached to that trailer."
      );
    }
  }
  const update = {
    clientId: normalizedClientId,
    clientName: clientName(clientData, clientSnapshot.id),
    clientLocation: clientLocation(clientData),
    clientRef: clientSnapshot.ref,
    machineId: normalizedMachineId,
    machineName: machineSnapshot?.exists
      ? cleanText(machineSnapshot.data()?.name || machineSnapshot.id, 220)
      : "",
    machineRef: machineSnapshot?.exists ? machineSnapshot.ref : null,
    machineLinkSource: "manual",
    machineLinkEquipmentIds: [],
    trailerId: normalizedTrailerId,
    trailerName: normalizedTrailerId
      ? trailerName({ id: trailerSnapshot.id, ...trailerData })
      : "",
    trailerRef: normalizedTrailerId ? trailerSnapshot.ref : null,
    connectionsUpdatedBy: cleanText(changedBy, 180),
    connectionsUpdatedAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };
  const linkPlan = await planWorkOrderLinkHealthInTransaction({
    transaction, db, workOrderId: ref.id, workOrder: { ...snapshot.data(), ...update },
    source: "manual_connection_update", clientData, resolveMissing: false,
  });
  Object.assign(update, linkPlan.workOrderPatch);
  applyWorkOrderLinkHealthWrites(transaction, linkPlan);
  transaction.set(ref, update, { merge: true });
  return linkPlan.alertEventId;
  });
  await deliverNewWorkOrderLinkAlert(db, linkAlertEventId);
  return serializeWorkOrder(await ref.get());
}

async function upsertOpsWorkOrder(payload = {}) {
  const workOrderId = normalizeId(payload.workOrderId || payload.id);
  if (!workOrderId) throw new Error("A valid work order ID is required.");
  let sourceEvidence = workOrderBlueFolderEvidencePatch(payload);
  if (sourceEvidence.bluefolderServiceRequestId && sourceEvidence.bluefolderServiceRequestId !== workOrderId) {
    throw new Error("The BlueFolder service-request identity does not match this work order.");
  }
  // Creation from service requests/Slack may omit equipment. Fetch the actual
  // immutable BlueFolder request outside the transaction before recording its
  // health; network failures never discard the requested local work-order save.
  const sourceLookup = await getWorkOrderSource(workOrderId);
  const hydratedSource = sourceLookup?.ok ? sourceLookup.payload : null;
  if (hydratedSource) sourceEvidence = { ...sourceEvidence, ...workOrderBlueFolderEvidencePatch(hydratedSource) };
  const ref = workOrderRef(workOrderId);
  const nowIso = new Date().toISOString();

  const linkAlertEventId = await requireDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const existing = snapshot.exists ? snapshot.data() || {} : {};
    if (sourceEvidence.bluefolderServiceRequestId && existing.bluefolderServiceRequestId &&
        existing.bluefolderServiceRequestId !== sourceEvidence.bluefolderServiceRequestId) {
      throw new Error("The stored BlueFolder service-request identity cannot be replaced.");
    }
    const isCompleted = !ACTIVE_STATUSES.has(
      String(existing.status || "active").toLowerCase()
    );
    const update = {
      ...sourceEvidence,
      workOrderId,
      number: cleanText(payload.number || workOrderId, 120),
      subject: normalizeWorkOrderSubject(
        payload.subject || "Untitled work order",
        payload.number || workOrderId
      ),
      description: cleanText(payload.description, 1800),
      customer: cleanText(payload.customer, 220),
      bluefolderUrl: cleanText(payload.bluefolderUrl, 1200),
      createdAtIso: cleanText(payload.createdAt, 80),
      lastActivityAtIso: nowIso,
      lastActivityAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    // Repeated BlueFolder polling must not erase an already-canonical Slack
    // thread when an older worker omits one or more Slack fields.
    if (cleanText(payload.slackPermalink, 1200)) {
      update.slackPermalink = cleanText(payload.slackPermalink, 1200);
    }
    if (cleanText(payload.slackChannel, 120)) {
      update.slackChannel = cleanText(payload.slackChannel, 120);
    }
    if (cleanText(payload.slackThreadTs, 120)) {
      update.slackThreadTs = cleanText(payload.slackThreadTs, 120);
    }
    if (payload.dispatchReceipt && typeof payload.dispatchReceipt === "object") {
      update.dispatchReceipt = {
        workOrderId: cleanText(payload.dispatchReceipt.workOrderId, 180),
        dispatchStatus: cleanText(payload.dispatchReceipt.dispatchStatus, 40),
        slackChannel: cleanText(payload.dispatchReceipt.slackChannel, 120),
        slackThreadTs: cleanText(payload.dispatchReceipt.slackThreadTs, 120),
        slackPermalink: cleanText(payload.dispatchReceipt.slackPermalink, 1200),
        dispatchedAt: cleanText(payload.dispatchReceipt.dispatchedAt, 80),
        dispatchedBy: cleanText(payload.dispatchReceipt.dispatchedBy, 180),
      };
    }
    if (payload.dispatchStatus != null) {
      update.dispatchStatus = cleanText(payload.dispatchStatus, 40);
    }
    if (payload.dispatchedAt != null) {
      update.dispatchedAt = cleanText(payload.dispatchedAt, 80);
    }
    if (payload.dispatchedBy != null) {
      update.dispatchedBy = cleanText(payload.dispatchedBy, 180);
    }
    if (update.slackChannel && update.slackThreadTs) {
      Object.assign(
        update,
        buildDispatchEvidenceResolutionPatch({
          workOrder: existing,
          slackChannel: update.slackChannel,
          slackThreadTs: update.slackThreadTs,
          slackPermalink: update.slackPermalink || existing.slackPermalink || "",
          resolvedAtIso: nowIso,
        })
      );
    }
    if (payload.intakeServiceRequestId != null) {
      update.intakeServiceRequestId = cleanText(
        payload.intakeServiceRequestId,
        180
      );
    }
    if (payload.clientId != null) {
      update.clientId = cleanText(payload.clientId, 180);
    }
    if (payload.clientName != null) {
      update.clientName = cleanText(payload.clientName, 220);
    }
    if (payload.clientLocation != null) {
      update.clientLocation = cleanText(payload.clientLocation, 500);
    }
    if (payload.machineId != null) {
      update.machineId = cleanText(payload.machineId, 180);
    }
    if (payload.machineName != null) {
      update.machineName = cleanText(payload.machineName, 220);
    }
    if (payload.trailerId != null) {
      update.trailerId = cleanText(payload.trailerId, 180);
    }
    if (payload.trailerName != null) {
      update.trailerName = cleanText(payload.trailerName, 220);
    }
    if (!snapshot.exists || existing.deletedAt) {
      const bluefolderAssignees = normalizeAssignees(
        payload.bluefolderAssignees
      );
      const acceptedAssignees = normalizeAssignees(payload.assignees);
      const acceptedRemoteAssignees = normalizeAssignees(
        payload.remoteAssignees
      );
      const acceptedDispatchAssignees = normalizeAssignees(
        payload.dispatchAssignees
      );
      const acceptedOversightManagers = defaultOpsOversightManagers(
        payload.oversightManagers
      );
      const assignmentMode = cleanText(
        payload.assignmentMode,
        30
      ).toLowerCase();
      const remoteRequested =
        (assignmentMode === "remote" || assignmentMode === "mixed") &&
        (acceptedRemoteAssignees.length > 0 ||
          (assignmentMode === "remote" && acceptedAssignees.length > 0));
      const initialAssignees = acceptedAssignees.length
        ? mergeAssignees(bluefolderAssignees, acceptedAssignees)
        : bluefolderAssignees.length
        ? bluefolderAssignees
        : [];
      const startsAssigned =
        bluefolderAssignees.length > 0 || acceptedDispatchAssignees.length > 0;
      Object.assign(update, {
        deletedAt: FieldValue.delete(),
        deletedBy: FieldValue.delete(),
        status: "active",
        workflowStatus: bluefolderAssignees.length
          ? "active"
          : remoteRequested
          ? "remote"
          : startsAssigned
          ? "active"
          : "unassigned",
        workflowStageStartedAt: FieldValue.serverTimestamp(),
        workflowStageStartedAtIso: nowIso,
        workflowStageHistory: [],
        priorityTier: normalizePriorityTier(payload.priorityTier),
        priorityLabel: normalizePriorityLabel(payload.priorityTier),
        priorityGenerated: false,
        priorityOrder: normalizePriorityOrder(payload.priorityTier),
        priorityReason: "Awaiting initial AI operational-category review.",
        priorityContext: "",
        priorityConfidence: 0,
        prioritySource: "initial",
        priorityHistory: [],
        priorityInferenceVersion: 0,
        remoteWorkActive: remoteRequested,
        remoteWorkReason: remoteRequested
          ? "Remote ownership was selected while approving the service request."
          : "",
        remoteWorkConfidence: remoteRequested ? 1 : 0,
        remoteInferenceVersion: remoteRequested ? 1 : 0,
        priorityRank: Date.now(),
        assignees: initialAssignees,
        bluefolderAssignees,
        oversightManagers: acceptedOversightManagers,
        oversightSummary: acceptedOversightManagers.length
          ? `Manager oversight: ${acceptedOversightManagers
              .map((entry) => entry.name)
              .join(", ")}.`
          : "No oversight manager selected.",
        assignmentSummary:
          remoteRequested && bluefolderAssignees.length
            ? `Accepted with dispatch and remote support by ${initialAssignees
                .map((entry) => entry.name)
                .join(", ")}.`
            : remoteRequested
          ? `Accepted for remote support by ${initialAssignees
              .map((entry) => entry.name)
              .join(", ")}.`
          : startsAssigned
          ? `Accepted and assigned to ${initialAssignees
              .map((entry) => entry.name)
              .join(", ")}.`
          : "No remote or physical worker is assigned yet.",
        assignmentDecisionReason:
          remoteRequested && bluefolderAssignees.length
            ? "Remote support and BlueFolder dispatch assignments were confirmed while accepting the service request."
            : remoteRequested
            ? "Remote ownership was confirmed while accepting the service request; no BlueFolder dispatch assignment was created."
            : startsAssigned
            ? "Assignment was confirmed while accepting the website service request."
            : "Assignment begins only when someone is confirmed for remote or physical work.",
        assignmentHistory: [initialAssignmentEntry(initialAssignees, nowIso)],
        participants: [],
        participationSummary: "No participation recorded yet.",
        participationDecisionReason: "",
        participationHistory: [],
        messageCount: 0,
        analysisInputTokens: 0,
        analysisOutputTokens: 0,
        createdAt: FieldValue.serverTimestamp(),
      });
    } else {
      if (!Array.isArray(existing.assignmentHistory)) {
        update.assignmentHistory = [
          initialAssignmentEntry(
            normalizeAssignees(existing.assignees),
            timestampToIso(existing.createdAt) || existing.createdAtIso || nowIso
          ),
        ];
      }
      if (
        !PRIORITY_TIERS.has(String(existing.priorityTier || "").toLowerCase()) &&
        !GENERATED_PRIORITY_PATTERN.test(
          String(existing.priorityTier || "").toLowerCase()
        )
      ) {
        update.priorityTier = "needs_scheduled";
        update.priorityLabel = PRIORITY_TIER_LABELS.needs_scheduled;
        update.priorityGenerated = false;
        update.priorityOrder = PRIORITY_TIER_ORDER.needs_scheduled;
      }
      if (!cleanText(existing.workflowStatus, 40)) {
        update.workflowStatus = normalizeAssignees(
          existing.bluefolderAssignees
        ).length
          ? "active"
          : Boolean(existing.remoteWorkActive)
          ? "remote"
          : "unassigned";
      }
      if (
        !timestampToIso(existing.workflowStageStartedAt) &&
        !cleanText(existing.workflowStageStartedAtIso, 80)
      ) {
        update.workflowStageStartedAt = FieldValue.serverTimestamp();
        update.workflowStageStartedAtIso = nowIso;
      }
    }
    if (snapshot.exists && isCompleted) {
      delete update.lastActivityAtIso;
      delete update.lastActivityAt;
    }
    const effective = { ...existing, ...update };
    // A recovery explicitly removes the tombstone; do not pass FieldValue's
    // delete sentinel to the pure availability check as if it were a date.
    if (!snapshot.exists || existing.deletedAt) { delete effective.deletedAt; delete effective.deletedBy; }
    const linkPlan = await planWorkOrderLinkHealthInTransaction({
      transaction, db: requireDb(), workOrderId, workOrder: effective, nowIso,
      source: existing.deletedAt ? "work_order_recovery" : "work_order_upsert",
      // The import below applies verified directory creation and GUID stamps.
      // Do not preempt it by adding a weaker name-only machine here.
      resolveMissing: !hydratedSource,
    });
    Object.assign(update, linkPlan.workOrderPatch);
    applyWorkOrderLinkHealthWrites(transaction, linkPlan);
    transaction.set(ref, update, { merge: true });
    return linkPlan.alertEventId;
  });

  if (hydratedSource) {
    try { await importOpsBlueFolderWorkOrder(hydratedSource); }
    catch (error) { console.warn("[Ops][link-health] Source reconciliation deferred", { code: cleanText(error?.code || "source_reconciliation_deferred", 100) }); }
  }
  await deliverNewWorkOrderLinkAlert(requireDb(), linkAlertEventId);
  const snapshot = await ref.get();
  return serializeWorkOrder(snapshot);
}

async function importOpsBlueFolderWorkOrder(payload = {}) {
  const serviceRequestId = normalizeId(
    payload?.blueFolder?.serviceRequestId || payload.workOrderId
  );
  if (!serviceRequestId) {
    throw new Error("A valid BlueFolder service-request ID is required.");
  }
  const ref = workOrderRef(serviceRequestId);
  const nowIso = new Date().toISOString();
  const db = requireDb();
  const importPayload = {
    ...payload,
    blueFolder: {
      ...(payload.blueFolder &&
      typeof payload.blueFolder === "object" &&
      !Array.isArray(payload.blueFolder)
        ? payload.blueFolder
        : {}),
      serviceRequestId,
    },
  };

  // BlueFolder is queried only after a read-only eligibility transaction and
  // before the write transaction. Firestore retries can therefore never repeat
  // the external request, and a lookup failure cannot block ordinary metadata
  // intake or create any Client/asset association.
  let freshCustomerProof = null;
  let freshSiteLookupIssue = "";
  const freshSiteEligibility = await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const existing = snapshot.exists ? snapshot.data() || {} : {};
    if (existing.deletedAt) {
      return { eligible: false, reason: "work_order_deleted" };
    }
    if (payload.existingOnly === true && !snapshot.exists) {
      return { eligible: false, reason: "work_order_not_found" };
    }
    // Validate the public import contract before any authenticated network
    // request. In particular, proof-like request fields remain unsupported.
    buildBlueFolderImportPatch(existing, importPayload);
    return assessFreshSiteLookupInTransaction(
      transaction,
      db,
      existing,
      importPayload
    );
  });
  if (freshSiteEligibility.eligible) {
    let lookup;
    try {
      lookup = await getVerifiedBlueFolderLocation(
        freshSiteEligibility.identity.customerId,
        freshSiteEligibility.identity.customerLocationId
      );
    } catch {
      lookup = { ok: false, reason: "bluefolder_customer_lookup_unavailable" };
    }
    if (lookup?.ok && lookup.proof) freshCustomerProof = lookup.proof;
    else freshSiteLookupIssue = cleanText(
      lookup?.reason || "bluefolder_customer_lookup_unavailable",
      120
    );
  }

  // A source-backed missing scanner may be created, but only after a bounded
  // direct BlueFolder equipment lookup outside every Firestore transaction.
  // The final transaction repeats all site/GUID/serial checks before writing.
  const equipmentEligibility = await db.runTransaction(async transaction => {
    const snapshot = await transaction.get(ref);
    if ((snapshot.exists && snapshot.data()?.deletedAt) || (payload.existingOnly === true && !snapshot.exists)) return null;
    const existing = snapshot.exists ? snapshot.data() || {} : {};
    const plan = buildBlueFolderImportPatch(existing, importPayload);
    let effective = { ...existing, ...plan.patch }, suppliedClientData;
    const preconditions = equipmentOnboardingPreconditions(effective);
    if (!preconditions.eligible) return null;
    if (!normalizeId(effective.clientId)) {
      const site = await resolveWorkOrderSiteLinkInTransaction(transaction, db, effective, { linkedAtIso: nowIso, freshCustomerProof });
      effective = { ...effective, ...site.patch }; suppliedClientData = site.creation?.data;
    }
    if (!normalizeId(effective.clientId)) return null;
    const match = await resolveWorkOrderMachineLinkInTransaction(transaction, db, effective, normalizeId(effective.clientId), { clientData: suppliedClientData });
    return ["bluefolder_equipment_not_mapped", "bluefolder_equipment_exact_name_at_client", "bluefolder_equipment_exact_model_at_client"].includes(match.reason)
      ? preconditions : null;
  });
  let freshEquipmentProof = null, freshEquipmentLookupIssue = "";
  if (equipmentEligibility?.eligible) {
    let lookup;
    try { lookup = await getVerifiedBlueFolderEquipment(equipmentEligibility.equipmentId); }
    catch { lookup = { ok: false, reason: "bluefolder_equipment_lookup_unavailable" }; }
    if (lookup?.ok && lookup.proof) freshEquipmentProof = lookup.proof;
    else freshEquipmentLookupIssue = cleanText(lookup?.reason || "bluefolder_equipment_lookup_unavailable", 120);
  }
  let mobileCustomerProof = null;
  if (freshEquipmentProof?.mobileNumber) {
    try {
      const lookup = await getVerifiedBlueFolderLocation(freshEquipmentProof.customerId, freshEquipmentProof.locationId);
      if (lookup?.ok) mobileCustomerProof = lookup.proof;
    } catch { /* Durable source-review issue is emitted by the planner. */ }
  }

  const result = await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const existing = snapshot.exists ? snapshot.data() || {} : {};
    if (existing.deletedAt || (payload.existingOnly === true && !snapshot.exists)) {
      const error = new Error(existing.deletedAt
        ? "The work order was deleted; BlueFolder metadata cannot restore it."
        : "The work order no longer exists; metadata refresh cannot create it.");
      error.code = existing.deletedAt ? "work_order_deleted" : "work_order_not_found";
      error.statusCode = existing.deletedAt ? 409 : 404;
      throw error;
    }
    const before = snapshot.exists ? serializeWorkOrder(snapshot) : null;
    let resolvedClientPatch = {};
    let siteCreation = null;
    let clientLinkResolutionReason = "";
    let protectedExistingAsset = false;
    if (!normalizeId(existing.clientId)) {
      const finalFreshPreconditions = freshCustomerProof
        ? freshSiteLookupPreconditions(existing, importPayload)
        : null;
      const siteLink = await resolveWorkOrderSiteLinkInTransaction(
        transaction,
        db,
        importPayload,
        {
          linkedAtIso: nowIso,
          freshCustomerProof: finalFreshPreconditions?.eligible
            ? freshCustomerProof
            : null,
        }
      );
      resolvedClientPatch = siteLink.patch;
      siteCreation = siteLink.creation;
      if (!resolvedClientPatch.clientId && (freshCustomerProof || freshSiteLookupIssue)) {
        clientLinkResolutionReason =
          (siteLink.reason === "bluefolder_nested_site_not_verified"
            ? freshSiteLookupIssue
            : "") ||
          (!finalFreshPreconditions?.eligible && finalFreshPreconditions?.reason) ||
          siteLink.reason;
      }
      if (resolvedClientPatch.clientId) {
        const assetSiteGuard = await validateExistingWorkOrderAssetSiteInTransaction(
          transaction,
          db,
          existing,
          resolvedClientPatch,
          { clientData: siteCreation?.data }
        );
        protectedExistingAsset = assetSiteGuard.hasExistingAsset;
        if (!assetSiteGuard.allowed) {
          clientLinkResolutionReason = assetSiteGuard.reason;
          resolvedClientPatch = {};
          siteCreation = null;
        }
      }
    }

    const plan = buildBlueFolderImportPatch(existing, importPayload);
    let resolvedMachinePatch = {};
    let resolvedMachine = null;
    const effectiveWorkOrder = { ...existing, ...plan.patch, ...resolvedClientPatch };
    let onboarding = null;
    // Keep manually linked assets; only fill a missing machine using the actual
    // BlueFolder equipment selection, never the work-order title or model alone.
    if (!protectedExistingAsset && !normalizeId(effectiveWorkOrder.machineId) && !normalizeId(effectiveWorkOrder.trailerId) &&
        !effectiveWorkOrder.machineRef && !effectiveWorkOrder.trailerRef &&
        !cleanText(effectiveWorkOrder.machineName, 220) && !cleanText(effectiveWorkOrder.trailerName, 220) &&
        hasSelectedBlueFolderEquipment(effectiveWorkOrder)) {
      resolvedMachine = await resolveWorkOrderMachineLinkInTransaction(
        transaction, db, effectiveWorkOrder, normalizeId(effectiveWorkOrder.clientId),
        { clientData: siteCreation?.data }
      );
      resolvedMachinePatch = buildWorkOrderMachineLinkPatch(resolvedMachine, { linkedAtIso: nowIso });
    }
    const finalEquipmentEligibility = equipmentOnboardingPreconditions(effectiveWorkOrder);
    if (freshEquipmentProof && finalEquipmentEligibility.eligible) {
      onboarding = await planWorkOrderEquipmentOnboardingInTransaction({ transaction, db,
        workOrder: effectiveWorkOrder, proof: freshEquipmentProof,
        customerProof: mobileCustomerProof,
        clientId: normalizeId(effectiveWorkOrder.clientId), clientData: siteCreation?.data, nowIso });
      resolvedMachinePatch = onboarding.patch;
    }
    // A live source conflict/lookup failure cannot fall through to a weaker
    // name-only match, including the health planner's independent healing.
    const machineResolutionBlockReason = equipmentEligibility?.eligible && finalEquipmentEligibility.eligible && !onboarding?.patch.machineId
      ? (onboarding?.reason || freshEquipmentLookupIssue || "bluefolder_equipment_lookup_unavailable") : "";
    if (machineResolutionBlockReason) resolvedMachinePatch = {};
    const verificationPatch = equipmentEligibility?.eligible && finalEquipmentEligibility.eligible ? {
      bluefolderEquipmentVerification: {
        status: machineResolutionBlockReason ? "needs_review" : "verified",
        equipmentId: finalEquipmentEligibility.equipmentId,
        customerId: finalEquipmentEligibility.identity.customerId,
        locationId: finalEquipmentEligibility.identity.customerLocationId,
        issue: machineResolutionBlockReason, checkedAtIso: nowIso,
      },
    } : {};
    const created = !snapshot.exists;
    const lifecycleCorrection = created
      ? { patch: {}, targetStage: "", applied: false }
      : buildBlueFolderLifecycleCorrection(existing, payload);
    const linkPlan = await planWorkOrderLinkHealthInTransaction({
      transaction, db, workOrderId: serviceRequestId,
      workOrder: { ...effectiveWorkOrder, ...resolvedMachinePatch, ...verificationPatch }, nowIso,
      source: "bluefolder_import", clientData: siteCreation?.data,
      unresolvedReason: clientLinkResolutionReason || onboarding?.reason || freshEquipmentLookupIssue || resolvedMachine?.reason || "",
      pendingMachineCreation: onboarding?.machineCreation,
      pendingVerifiedMachine: onboarding?.pendingVerifiedMachine,
      machineResolutionBlockReason,
    });

    if (!created && plan.idempotentReplay && !lifecycleCorrection.applied &&
        !resolvedClientPatch.clientId && !resolvedMachinePatch.machineId &&
        !Object.keys(linkPlan.workOrderPatch).length && !linkPlan.writes.length) {
      return {
        before,
        after: withEquipmentLinkResolution(
          before, linkPlan.resolvedWorkOrder,
          clientLinkResolutionReason || resolvedMachine?.reason
        ),
        created: false,
        idempotentReplay: true,
        serviceRequestId,
      };
    }

    const update = { ...plan.patch, ...verificationPatch };
    if (resolvedMachinePatch.machineId && !normalizeId(existing.machineId)) {
      Object.assign(update, resolvedMachinePatch);
    }
    if (resolvedClientPatch.clientId && !normalizeId(existing.clientId)) {
      Object.assign(update, resolvedClientPatch, {
        connectionsUpdatedBy: "BlueFolder exact site identity",
        connectionsUpdatedAt: FieldValue.serverTimestamp(),
      });
    }
    if (lifecycleCorrection.applied) {
      if (lifecycleCorrection.patch.workflowStatus) {
        Object.assign(
          update,
          buildWorkflowTransitionUpdate(existing, lifecycleCorrection.targetStage, {
            changedBy: "BlueFolder",
            source: "bluefolder_import",
            reason: "BlueFolder lifecycle advanced during an idempotent import refresh.",
            nowIso,
          })
        );
      }
      Object.assign(update, lifecycleCorrection.patch);
    }
    if (Object.prototype.hasOwnProperty.call(update, "bluefolderAssignees")) {
      const bluefolderAssignees = normalizeAssignees(update.bluefolderAssignees);
      update.bluefolderAssignees = bluefolderAssignees;
      if (created) {
        update.assignees = bluefolderAssignees;
      } else if (bluefolderAssignees.length) {
        const mergedAssignees = mergeAssignees(
          normalizeAssignees(existing.assignees),
          bluefolderAssignees
        );
        if (JSON.stringify(mergedAssignees) !== JSON.stringify(existing.assignees || [])) {
          update.assignees = mergedAssignees;
        }
      }
    }

    if (created) {
      const initialAssignees = normalizeAssignees(update.assignees);
      // Derive lifecycle placement only while creating the Magmo record. Later
      // BlueFolder refreshes must not overwrite a terminal or manually moved
      // Magmo stage.
      const initialStage = initialBlueFolderWorkflowStage({
        bluefolderWorkflowStatus: update.bluefolderWorkflowStatus,
        bluefolderStatus: update.bluefolderStatus,
        bluefolderDateTimeClosed: update.bluefolderDateTimeClosed,
        hasAssignees: initialAssignees.length > 0,
      });
      const terminal = new Set(["done", "closed"]).has(initialStage);
      Object.assign(update, {
        number: cleanText(update.number || serviceRequestId, 120),
        subject: cleanText(update.subject || "Untitled work order", 500),
        description: cleanText(update.description, 1800),
        customer: cleanText(update.customer, 220),
        status: terminal ? "completed" : "active",
        workflowStatus: initialStage,
        workflowStageStartedAt: FieldValue.serverTimestamp(),
        workflowStageStartedAtIso: nowIso,
        workflowStageHistory: [],
        priorityTier: normalizePriorityTier(payload.priorityTier),
        priorityLabel: normalizePriorityLabel(payload.priorityTier),
        priorityGenerated: false,
        priorityOrder: normalizePriorityOrder(payload.priorityTier),
        priorityReason: "Awaiting initial Magmo operational-category review.",
        priorityContext: "",
        priorityConfidence: 0,
        prioritySource: "bluefolder_import",
        priorityHistory: [],
        priorityInferenceVersion: 0,
        remoteWorkActive: false,
        remoteWorkReason: "",
        remoteWorkConfidence: 0,
        remoteInferenceVersion: 0,
        priorityRank: Date.now(),
        oversightManagers: defaultOpsOversightManagers(payload.oversightManagers),
        assignmentSummary: initialAssignees.length
          ? `Imported BlueFolder dispatch assignment: ${initialAssignees
              .map((entry) => entry.name)
              .filter(Boolean)
              .join(", ")}.`
          : "No remote or physical worker is assigned yet.",
        assignmentDecisionReason: initialAssignees.length
          ? "BlueFolder Assigned To identifies the dispatched physical engineer."
          : "The BlueFolder work order was imported without a dispatch assignment.",
        assignmentHistory: [initialAssignmentEntry(initialAssignees, nowIso)],
        participants: [],
        participationSummary: "No participation recorded yet.",
        participationDecisionReason: "",
        participationHistory: [],
        messageCount: 0,
        analysisInputTokens: 0,
        analysisOutputTokens: 0,
        createdAt: FieldValue.serverTimestamp(),
        lastActivityAt: FieldValue.serverTimestamp(),
        lastActivityAtIso: nowIso,
        bluefolderImportedAt: FieldValue.serverTimestamp(),
        bluefolderImportedAtIso: nowIso,
      });
    }
    Object.assign(update, {
      bluefolderImportUpdatedAt: FieldValue.serverTimestamp(),
      bluefolderImportUpdatedAtIso: nowIso,
      updatedAt: FieldValue.serverTimestamp(),
    });
    if (siteCreation) transaction.create(siteCreation.ref, { ...siteCreation.data, ...(onboarding?.clientPatch || {}) });
    if (onboarding) for (const write of onboarding.writes) {
      if (siteCreation && write.ref.path === siteCreation.ref.path) continue;
      if (write.create) transaction.create(write.ref, write.data);
      else transaction.set(write.ref, write.data, { merge: true });
    }
    Object.assign(update, linkPlan.workOrderPatch);
    applyWorkOrderLinkHealthWrites(transaction, linkPlan);
    transaction.set(ref, update, { merge: true });
    return {
      before,
      after: null,
      created,
      idempotentReplay: false,
      serviceRequestId,
      equipmentLinkResolutionReason: clientLinkResolutionReason || resolvedMachine?.reason || "",
      linkAlertEventId: linkPlan.alertEventId,
    };
  });

  await deliverNewWorkOrderLinkAlert(db, result.linkAlertEventId);
  if (result.idempotentReplay) return result;
  const afterSnapshot = await ref.get();
  const after = withEquipmentLinkResolution(
    serializeWorkOrder(afterSnapshot), afterSnapshot.data() || {}, result.equipmentLinkResolutionReason
  );
  const { equipmentLinkResolutionReason: _privateResolutionReason, linkAlertEventId: _privateLinkAlert, ...response } = result;
  return { ...response, after };
}
return { updateOpsConnections, upsertOpsWorkOrder, importOpsBlueFolderWorkOrder };
};
