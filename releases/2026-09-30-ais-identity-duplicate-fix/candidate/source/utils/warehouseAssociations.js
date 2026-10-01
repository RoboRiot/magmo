import associatedPartRoles from "../lib/associatedPartRoles.cjs";
import itemEditorOperations from "../lib/items/itemEditorOperations.cjs";
import itemHistory from "../lib/items/itemHistory.cjs";
import itemIdentity from "../lib/items/itemIdentity.cjs";
import { buildWorkOrderTokens, buildGeneralSearchTokens } from "./itemFormShared";

const { getEntityRoleIds } = associatedPartRoles;
const { getItemPhotoStoragePrefixes } = itemEditorOperations;
const { mergeItemHistoryForCommit } = itemHistory;
const { normalizeItemAisValue, getItemAisLookupValues } = itemIdentity;

export const INTERIOR_SOCAL_MACHINE_NAME = "interior socal";
export const INTERIOR_NORCAL_MACHINE_NAME = "interior norcal";
export const INTERIOR_WAREHOUSE_MACHINE_NAMES = new Set([
  INTERIOR_SOCAL_MACHINE_NAME,
  INTERIOR_NORCAL_MACHINE_NAME,
]);
const MACHINE_SUMMARY_FIELDS = [
  "id",
  "name",
  "OEM",
  "oem",
  "Modality",
  "modality",
  "Model",
  "model",
  "client",
  "Client",
  "lastPM",
  "nextPM",
];

export function createMachineDetailHydrationState() {
  return {
    from: { requestId: 0, machineId: "", pending: false, error: "" },
    current: { requestId: 0, machineId: "", pending: false, error: "" },
  };
}

export function summarizeMachineDetailHydration(state = {}) {
  const entries = [state?.from, state?.current].filter(Boolean);
  return {
    pending: entries.some((entry) => entry.pending),
    error: entries.map((entry) => entry.error).find(Boolean) || "",
  };
}

export function findMachineDetailRequestBranch(state = {}, requestId) {
  if (!requestId) return "";
  return ["from", "current"].find(
    (branch) => state?.[branch]?.requestId === requestId
  ) || "";
}

export function buildMachineDetailHydrationSeed({
  fromMachine = null,
  currentMachine = null,
  preferredMachine = null,
} = {}) {
  const normalizedFrom = fromMachine
    ? stripAssociatedPartsFromMachineSnapshot(fromMachine)
    : null;
  const normalizedCurrent = currentMachine
    ? stripAssociatedPartsFromMachineSnapshot(currentMachine)
    : null;
  const normalizedPreferred = preferredMachine
    ? stripAssociatedPartsFromMachineSnapshot(preferredMachine)
    : null;
  const fromId = getRefId(normalizedFrom);
  const currentId = getRefId(normalizedCurrent);
  const preferredId = getRefId(normalizedPreferred);
  const preferredBranch =
    preferredId && preferredId === currentId
      ? "current"
      : preferredId && preferredId === fromId
        ? "from"
        : fromId
          ? "from"
          : currentId
            ? "current"
            : "";
  const mergePreferred = (branch, machine, machineId) => {
    if (!machineId) return null;
    return branch === preferredBranch && normalizedPreferred
      ? { ...machine, ...normalizedPreferred, id: machineId }
      : { ...machine, id: machineId };
  };
  const state = createMachineDetailHydrationState();
  if (fromId) {
    state.from = {
      requestId: 0,
      machineId: fromId,
      pending: false,
      error: "",
      machineData: mergePreferred("from", normalizedFrom, fromId),
    };
  }
  if (currentId) {
    state.current = {
      requestId: 0,
      machineId: currentId,
      pending: false,
      error: "",
      machineData: mergePreferred("current", normalizedCurrent, currentId),
    };
  }
  return {
    state,
    owner: preferredBranch
      ? { branch: preferredBranch, requestId: 0 }
      : { branch: "", requestId: 0 },
  };
}

export function getRefId(ref) {
  if (!ref) return "";
  if (typeof ref === "string") {
    const segments = ref.split("/").filter(Boolean);
    return segments[segments.length - 1] || "";
  }
  if (ref.id) return ref.id;
  if (ref.path) return getRefId(ref.path);
  return "";
}

export function isInteriorSocalMachineData(machineData) {
  const name = String(machineData?.name || "")
    .trim()
    .toLowerCase();
  return name === INTERIOR_SOCAL_MACHINE_NAME;
}

export function isInteriorWarehouseMachineData(machineData) {
  const name = String(machineData?.name || "")
    .trim()
    .toLowerCase();
  return INTERIOR_WAREHOUSE_MACHINE_NAMES.has(name);
}

export function buildMachineSummary(machineData) {
  if (!machineData) return {};
  const summary = {};
  MACHINE_SUMMARY_FIELDS.forEach((key) => {
    if (machineData[key] !== undefined) summary[key] = machineData[key];
  });
  return summary;
}

export function stripAssociatedPartsFromMachineSnapshot(machineData) {
  if (!machineData || typeof machineData !== "object") return machineData;
  if (!Array.isArray(machineData.associatedParts)) return machineData;
  const { associatedParts, ...rest } = machineData;
  return rest;
}

export function stripEmbeddedMachineAssociations(itemData) {
  if (!itemData || typeof itemData !== "object") return itemData;
  const machineFields = [
    "Machine",
    "MachineFrom",
    "MachineCurrent",
    "CurrentMachine",
    "TheMachine",
    "theMachineData",
    "machineData",
    "currentMachineData",
  ];
  let changed = false;
  const cleaned = { ...itemData };

  machineFields.forEach((field) => {
    const value = cleaned[field];
    const stripped = stripAssociatedPartsFromMachineSnapshot(value);
    if (stripped !== value) {
      cleaned[field] = stripped;
      changed = true;
    }
  });

  return changed ? cleaned : itemData;
}

export async function addAssociatedPartToMachine({
  db,
  firebase,
  machineId,
  partId,
  machineData = null,
}) {
  const resolvedMachineId = String(machineId || "").trim();
  const resolvedPartId = String(partId || "").trim();
  if (!resolvedMachineId || !resolvedPartId) return { updated: false };

  const machineRef = db.collection("Machine").doc(resolvedMachineId);
  let resolvedMachineData = machineData;

  if (!resolvedMachineData) {
    const machineDoc = await machineRef.get();
    if (!machineDoc.exists) return { updated: false };
    resolvedMachineData = machineDoc.data() || {};
  }

  await machineRef.update({
    associatedParts: firebase.firestore.FieldValue.arrayUnion(
      db.collection("Test").doc(resolvedPartId)
    ),
  });
  return { updated: true };
}

export async function removeAssociatedPartFromMachine({
  db,
  firebase,
  machineId,
  partId,
}) {
  const resolvedMachineId = String(machineId || "").trim();
  const resolvedPartId = String(partId || "").trim();
  if (!resolvedMachineId || !resolvedPartId) return { updated: false };

  const partRef = db.collection("Test").doc(resolvedPartId);
  await db.collection("Machine").doc(resolvedMachineId).update({
    associatedParts: firebase.firestore.FieldValue.arrayRemove(partRef),
  });
  await db.collection("Machine").doc(resolvedMachineId).update({
    associatedParts: firebase.firestore.FieldValue.arrayRemove(resolvedPartId),
  });

  return { updated: true };
}

export function getAssociatedMachineIdsFromItemData(itemData) {
  if (!itemData || typeof itemData !== "object") return [];
  return Array.from(
    new Set(
      ["from", "current"]
        .flatMap((role) => getEntityRoleIds(itemData, "machine", role))
        .filter((id) => String(id || "").trim())
    )
  );
}

function warehouseAssociationError(code, message, details = {}) {
  const error = new Error(message);
  error.code = `warehouse-associations/${code}`;
  Object.assign(error, details);
  return error;
}

function normalizeRequiredDocumentId(value, label) {
  const id = String(value || "").trim();
  if (!id || id.includes("/")) {
    throw warehouseAssociationError(
      "invalid-argument",
      `${label} must be a non-empty Firestore document ID without slashes.`
    );
  }
  return id;
}

function normalizedItemIdentity(value) {
  // Immutable historical rename receipts and their rules use this older
  // normalization. Creation checks separately treat bare digits as AIS IDs.
  const id = String(value || "").trim();
  const match = id.match(/^AIS[\s_-]*(\d+)$/i);
  return match ? `AIS${match[1]}` : id;
}

function retiredRenameIds(sourceId, targetId, sourceData) {
  const targetIdentity = normalizedItemIdentity(targetId);
  if (normalizedItemIdentity(sourceId) === targetIdentity) {
    throw warehouseAssociationError(
      "same-item-identity",
      "Choose a different Local SN; changing only AIS spacing or capitalization does not create a new identity."
    );
  }
  const ids = new Set();
  for (const value of [sourceId, sourceData.localSN, sourceData.local_sn, sourceData.aisNumber]) {
    const id = typeof value === "string" ? value.trim() : "";
    if (!id || id === "." || id === ".." || /[\\/\u0000-\u001f]/.test(id)) continue;
    const identity = normalizedItemIdentity(id);
    if (identity === targetIdentity) continue;
    ids.add(id);
    ids.add(identity);
  }
  return [...ids].sort();
}

function getRefPath(value) {
  if (!value || typeof value === "string") {
    const path = String(value || "").trim();
    return path.includes("/") ? path.replace(/^\/+|\/+$/g, "") : "";
  }
  return String(value.path || "").replace(/^\/+|\/+$/g, "");
}

function associatedPartEntryEquals(left, right) {
  if (left === right) return true;
  if (typeof left === "string" || typeof right === "string") return false;
  if (typeof left?.isEqual === "function") {
    try {
      if (left.isEqual(right)) return true;
    } catch {
      // Fall through to normalized path equality for compatible reference mocks.
    }
  }
  const leftPath = getRefPath(left);
  const rightPath = getRefPath(right);
  return Boolean(leftPath && rightPath && leftPath === rightPath);
}

function associatedPartArraysEqual(left, right) {
  if (!Array.isArray(left) || left.length !== right.length) return false;
  return left.every((entry, index) => associatedPartEntryEquals(entry, right[index]));
}

/**
 * Rewrites only one item's identities inside a Machine.associatedParts array.
 * Unrelated values retain their original value, order, and duplicates. Every
 * ref/string form of the old and target IDs is removed, then one canonical
 * Test DocumentReference is appended when the machine remains associated.
 */
export function canonicalizeAssociatedPartsForItem({
  associatedParts,
  previousPartId = null,
  partId,
  partRef,
  includePart,
}) {
  const resolvedPartId = normalizeRequiredDocumentId(partId, "partId");
  const idsToReplace = new Set([resolvedPartId]);
  if (previousPartId != null && String(previousPartId).trim()) {
    idsToReplace.add(normalizeRequiredDocumentId(previousPartId, "previousPartId"));
  }
  if (includePart && !partRef) {
    throw warehouseAssociationError(
      "invalid-argument",
      "partRef is required when includePart is true."
    );
  }
  const current = Array.isArray(associatedParts) ? associatedParts : [];
  const next = current.filter((entry) => !idsToReplace.has(getRefId(entry)));
  if (includePart) next.push(partRef);
  return next;
}

/**
 * Atomically commits one Test item and every affected Machine backlink.
 *
 * Operation selection:
 * - previousPartId omitted: create, and partId must not exist.
 * - previousPartId === partId: update, and the item must exist.
 * - previousPartId !== partId: rename, requiring the previous item to exist
 *   and the target item to be absent; the previous item is deleted.
 *
 * nextMachineIds is the authoritative post-commit machine set. This explicit
 * input also supports partial item update payloads containing delete sentinels.
 * During a rename, the live source document is copied first so fields owned by
 * other workflows are preserved. renameFieldsToReplace identifies form-owned
 * fields that must be cleared before the submitted payload is overlaid.
 */
export async function commitItemWithMachineBacklinks({
  db,
  partId,
  previousPartId = null,
  itemData,
  nextMachineIds,
  renameFieldsToReplace = [],
}) {
  if (!db || typeof db.runTransaction !== "function" || typeof db.collection !== "function") {
    throw warehouseAssociationError("invalid-argument", "A Firestore db is required.");
  }
  if (!itemData || typeof itemData !== "object" || Array.isArray(itemData)) {
    throw warehouseAssociationError("invalid-argument", "itemData must be a document object.");
  }
  if (!Array.isArray(nextMachineIds)) {
    throw warehouseAssociationError(
      "invalid-argument",
      "nextMachineIds must be the authoritative post-commit machine ID array."
    );
  }
  if (!Array.isArray(renameFieldsToReplace)) {
    throw warehouseAssociationError(
      "invalid-argument",
      "renameFieldsToReplace must be an array of field names."
    );
  }

  const resolvedRenameFieldsToReplace = Array.from(
    new Set(
      renameFieldsToReplace.map((field) => {
        const normalized = String(field || "").trim();
        if (!normalized || normalized.includes(".")) {
          throw warehouseAssociationError(
            "invalid-argument",
            "renameFieldsToReplace entries must be non-empty top-level field names."
          );
        }
        return normalized;
      })
    )
  );

  const requestedPartId = normalizeRequiredDocumentId(partId, "partId");
  const previousWasSupplied = previousPartId !== null && previousPartId !== undefined;
  const resolvedPreviousPartId = previousWasSupplied
    ? normalizeRequiredDocumentId(previousPartId, "previousPartId")
    : "";
  if (previousWasSupplied && requestedPartId !== resolvedPreviousPartId &&
      normalizeItemAisValue(requestedPartId) === normalizeItemAisValue(resolvedPreviousPartId)) {
    throw warehouseAssociationError("same-item-identity", "Changing only AIS formatting is not an item rename. Keep the existing item ID.");
  }
  const resolvedPartId = requestedPartId === resolvedPreviousPartId
    ? resolvedPreviousPartId
    : normalizeItemAisValue(requestedPartId);
  const operation = !previousWasSupplied
    ? "create"
    : resolvedPreviousPartId === resolvedPartId
      ? "update"
      : "rename";
  const resolvedNextMachineIds = Array.from(
    new Set(
      nextMachineIds.map((id) => normalizeRequiredDocumentId(id, "nextMachineIds entry"))
    )
  ).sort();
  const targetRef = db.collection("Test").doc(resolvedPartId);
  const previousRef = resolvedPreviousPartId
    ? db.collection("Test").doc(resolvedPreviousPartId)
    : null;
  const renameReceiptRef = operation === "rename"
    ? db.collection("ItemRenames").doc(resolvedPreviousPartId)
    : null;

  return db.runTransaction(async (transaction) => {
    // Read all item preconditions first. No transaction write occurs until the
    // previous item, target item, and every affected machine have been read.
    let previousSnapshot;
    let targetSnapshot;
    let renameReceiptSnapshot;
    if (operation === "rename") {
      [previousSnapshot, targetSnapshot, renameReceiptSnapshot] = await Promise.all([
        transaction.get(previousRef),
        transaction.get(targetRef),
        transaction.get(renameReceiptRef),
      ]);
    } else {
      targetSnapshot = await transaction.get(targetRef);
      previousSnapshot = targetSnapshot;
    }

    if (operation === "create" && targetSnapshot.exists) {
      throw warehouseAssociationError(
        "target-exists",
        `Test/${resolvedPartId} already exists.`,
        { partId: resolvedPartId, operation }
      );
    }
    if (operation !== "create" && !previousSnapshot.exists) {
      throw warehouseAssociationError(
        "previous-item-missing",
        `Test/${resolvedPreviousPartId} does not exist.`,
        { partId: resolvedPartId, previousPartId: resolvedPreviousPartId, operation }
      );
    }
    if (operation === "rename" && targetSnapshot.exists) {
      throw warehouseAssociationError(
        "target-exists",
        `Test/${resolvedPartId} already exists.`,
        { partId: resolvedPartId, previousPartId: resolvedPreviousPartId, operation }
      );
    }
    if (operation === "rename" && renameReceiptSnapshot.exists) {
      throw warehouseAssociationError(
        "rename-receipt-exists",
        `Test/${resolvedPreviousPartId} already has a preserved rename record; no item data was changed.`,
        { partId: resolvedPartId, previousPartId: resolvedPreviousPartId, operation }
      );
    }

    // Preflight queries improve error messages, but only transaction reads can
    // make the identity check race-safe. All spellings now write one canonical
    // target; legacy alias documents and retired IDs also reserve that identity.
    // An ordinary update must preserve an existing legacy document as-is, even
    // if another historical document has the same logical serial.
    const identityCandidates = operation === "update"
      ? [resolvedPartId]
      : [...new Set([...getItemAisLookupValues(requestedPartId), ...getItemAisLookupValues(resolvedPartId)])];
    const aliasIds = operation === "update" ? [] : identityCandidates.filter(
      (id) => id !== resolvedPartId && id !== resolvedPreviousPartId
    );
    const [aliasSnapshots, archivedSnapshots] = await Promise.all([
      Promise.all(aliasIds.map((id) => transaction.get(db.collection("Test").doc(id)))),
      Promise.all(identityCandidates.map((id) => transaction.get(db.collection("ArchivedItemIds").doc(id)))),
    ]);
    if (aliasSnapshots.some((snapshot) => snapshot.exists)) {
      throw warehouseAssociationError(
        "target-exists",
        `An item already uses AIS "${normalizeItemAisValue(resolvedPartId)}". No item data was changed.`,
        { partId: resolvedPartId, operation }
      );
    }
    if (archivedSnapshots.some((snapshot) => snapshot.exists)) {
      throw warehouseAssociationError(
        "item-archived",
        "This item ID has been archived or replaced. Choose a different AIS; no item data was changed.",
        { partId: resolvedPartId, operation }
      );
    }

    const previousItemData = previousSnapshot.exists ? previousSnapshot.data() || {} : {};
    const retiredIds = operation === "rename"
      ? retiredRenameIds(resolvedPreviousPartId, resolvedPartId, previousItemData)
      : [];
    const retiredRefs = retiredIds.map((id) => db.collection("ArchivedItemIds").doc(id));
    if (retiredIds.length) {
      const [reservations, liveAliases] = await Promise.all([
        Promise.all(retiredRefs.map((ref) => transaction.get(ref))),
        Promise.all(retiredIds.map((id) => id === resolvedPreviousPartId
          ? Promise.resolve(previousSnapshot)
          : transaction.get(db.collection("Test").doc(id)))),
      ]);
      if (reservations.some((snapshot) => snapshot.exists)) {
        throw warehouseAssociationError(
          "retired-identity-conflict",
          "An existing archive or rename already reserves one of this item's identifiers. No item data was changed."
        );
      }
      if (liveAliases.some((snapshot, index) => snapshot.exists && retiredIds[index] !== resolvedPreviousPartId)) {
        throw warehouseAssociationError(
          "retired-identity-in-use",
          "Another active item uses one of this item's identifiers. Resolve the duplicate before changing its Local SN."
        );
      }
    }
    const previousMachineIds = getAssociatedMachineIdsFromItemData(previousItemData).sort();
    const previousMachineIdSet = new Set(previousMachineIds);
    const nextMachineIdSet = new Set(resolvedNextMachineIds);
    const affectedMachineIds = Array.from(
      new Set([...previousMachineIds, ...resolvedNextMachineIds])
    ).sort();
    const machineRefs = affectedMachineIds.map((machineId) =>
      db.collection("Machine").doc(machineId)
    );
    const machineSnapshots = await Promise.all(
      machineRefs.map((machineRef) => transaction.get(machineRef))
    );

    // Every post-commit association needs a real machine document so that the
    // canonical backlink can be part of this same atomic commit. Missing
    // machines used only by the old item are safe no-op removals.
    const missingAssociatedMachineIds = affectedMachineIds.filter((machineId, index) =>
      nextMachineIdSet.has(machineId) && !machineSnapshots[index].exists
    );
    if (missingAssociatedMachineIds.length) {
      throw warehouseAssociationError(
        "machine-missing",
        `Cannot associate Test/${resolvedPartId}; missing Machine document(s): ${missingAssociatedMachineIds.join(
          ", "
        )}.`,
        {
          partId: resolvedPartId,
          previousPartId: resolvedPreviousPartId || null,
          operation,
          machineIds: missingAssociatedMachineIds,
        }
      );
    }

    const machineUpdates = [];
    const missingRemovedMachineIds = [];
    for (let index = 0; index < affectedMachineIds.length; index += 1) {
      const machineId = affectedMachineIds[index];
      const machineRef = machineRefs[index];
      const machineSnapshot = machineSnapshots[index];
      if (!machineSnapshot.exists) {
        if (previousMachineIdSet.has(machineId) && !nextMachineIdSet.has(machineId)) {
          missingRemovedMachineIds.push(machineId);
        }
        continue;
      }
      const machineData = machineSnapshot.data() || {};
      const currentAssociatedParts = machineData.associatedParts;
      if (currentAssociatedParts !== undefined && !Array.isArray(currentAssociatedParts)) {
        throw warehouseAssociationError(
          "invalid-associated-parts",
          `Machine/${machineId}.associatedParts is not an array; refusing to overwrite it.`,
          { partId: resolvedPartId, operation, machineId }
        );
      }
      const nextAssociatedParts = canonicalizeAssociatedPartsForItem({
        associatedParts: currentAssociatedParts,
        previousPartId: resolvedPreviousPartId || null,
        partId: resolvedPartId,
        partRef: targetRef,
        includePart: nextMachineIdSet.has(machineId),
      });
      if (!associatedPartArraysEqual(currentAssociatedParts, nextAssociatedParts)) {
        machineUpdates.push({ machineId, machineRef, associatedParts: nextAssociatedParts });
      }
    }

    // A rename is a move, not a replacement. Start from the live source so
    // dateCreated, audit history, and fields written by other workflows cannot
    // disappear merely because this form does not know about them.
    const identitySafeItemData = operation === "update" ? itemData : {
      ...itemData,
      localSN: resolvedPartId,
      local_sn: resolvedPartId,
      ...(Object.prototype.hasOwnProperty.call(itemData, "aisNumber") ? { aisNumber: resolvedPartId } : {}),
    };
    const committedItemData = mergeItemHistoryForCommit(previousItemData, identitySafeItemData);
    if (Object.prototype.hasOwnProperty.call(committedItemData, "workOrders")) {
      const searchableItem = { ...previousItemData, ...committedItemData };
      committedItemData.workOrderTokens = buildWorkOrderTokens(searchableItem);
      committedItemData.generalSearchTokens = buildGeneralSearchTokens(searchableItem, resolvedPartId);
    }
    let targetItemData = committedItemData;
    if (operation === "rename") {
      targetItemData = { ...previousItemData };
      resolvedRenameFieldsToReplace.forEach((field) => {
        delete targetItemData[field];
      });
      Object.assign(targetItemData, committedItemData);
      // Retired aliases must not survive as the renamed item's current serial.
      targetItemData.localSN = resolvedPartId;
      targetItemData.local_sn = resolvedPartId;
      if (Object.prototype.hasOwnProperty.call(targetItemData, "aisNumber")) {
        targetItemData.aisNumber = resolvedPartId;
      }
      targetItemData.photoStoragePrefixes = getItemPhotoStoragePrefixes(resolvedPartId, [
        ...getItemPhotoStoragePrefixes(resolvedPreviousPartId, previousItemData.photoStoragePrefixes),
      ]);
    }

    // All reads and validations are complete before the first queued write.
    if (operation === "update") transaction.update(targetRef, committedItemData);
    else transaction.set(targetRef, targetItemData);
    if (operation === "rename") {
      // This immutable preimage is the rule-checked proof for removing the old
      // root. Existing history descendants and photos retain their source path.
      transaction.set(renameReceiptRef, {
        sourceId: resolvedPreviousPartId,
        targetId: resolvedPartId,
        beforeData: previousItemData,
        sourcePath: previousRef.path,
        sourcePhotoPrefix: `Parts/${resolvedPreviousPartId}/`,
        retiredIds,
      });
      for (const retiredRef of retiredRefs) {
        transaction.set(retiredRef, {
          state: "renamed",
          sourceId: resolvedPreviousPartId,
          itemId: resolvedPartId,
        });
      }
      transaction.delete(previousRef);
    }
    for (const machineUpdate of machineUpdates) {
      transaction.set(
        machineUpdate.machineRef,
        { associatedParts: machineUpdate.associatedParts },
        { merge: true }
      );
    }
    const machineWrites = machineUpdates.map((update) => update.machineId);

    return {
      operation,
      partId: resolvedPartId,
      previousPartId: resolvedPreviousPartId || null,
      committedAudit: {
        workOrders: targetItemData.workOrders || previousItemData.workOrders || [],
        workOrderHistory: targetItemData.workOrderHistory || previousItemData.workOrderHistory || [],
        selectionHistory: targetItemData.selectionHistory || previousItemData.selectionHistory || [],
        saveHistory: targetItemData.saveHistory || previousItemData.saveHistory || [],
      },
      // The editor must adopt the identity actually committed before any later
      // upload/link operation can fail, so a retry cannot restore retired data.
      committedIdentity: operation === "rename" ? {
        localSN: targetItemData.localSN,
        local_sn: targetItemData.local_sn,
        ...(Object.prototype.hasOwnProperty.call(targetItemData, "aisNumber")
          ? { aisNumber: targetItemData.aisNumber } : {}),
        photoStoragePrefixes: targetItemData.photoStoragePrefixes,
      } : null,
      previousMachineIds,
      nextMachineIds: resolvedNextMachineIds,
      affectedMachineIds,
      addedMachineIds: resolvedNextMachineIds.filter((id) => !previousMachineIdSet.has(id)),
      removedMachineIds: previousMachineIds.filter((id) => !nextMachineIdSet.has(id)),
      retainedMachineIds: resolvedNextMachineIds.filter((id) => previousMachineIdSet.has(id)),
      machineWrites,
      missingRemovedMachineIds,
    };
  });
}

export async function syncAssociatedPartsForItem({
  db,
  firebase,
  partId,
  previousPartId = null,
  previousItemData = null,
  nextMachineIds = [],
  nextMachineDataById = {},
}) {
  const resolvedPartId = String(partId || "").trim();
  if (!resolvedPartId) return { added: 0, removed: 0 };

  const previousMachineIds = getAssociatedMachineIdsFromItemData(previousItemData);
  const resolvedNextMachineIds = Array.from(
    new Set(
      (nextMachineIds || [])
        .map((id) => String(id || "").trim())
        .filter(Boolean)
    )
  );
  const nextIdSet = new Set(resolvedNextMachineIds);
  const removedMachineIds = previousMachineIds.filter((id) => !nextIdSet.has(id));
  let removed = 0;
  let added = 0;

  const previousResolvedPartId = String(previousPartId || "").trim();
  const oldPartIdChanged =
    previousResolvedPartId && previousResolvedPartId !== resolvedPartId;
  const machinesNeedingOldPartCleanup = oldPartIdChanged
    ? Array.from(new Set([...previousMachineIds, ...resolvedNextMachineIds]))
    : [];

  const removalResults = await Promise.allSettled(
    [...removedMachineIds, ...machinesNeedingOldPartCleanup].map((machineId) =>
      removeAssociatedPartFromMachine({
        db,
        firebase,
        machineId,
        partId: oldPartIdChanged ? previousResolvedPartId : resolvedPartId,
      }).then((result) => {
        if (result.updated) removed += 1;
      })
    )
  );

  const additionResults = await Promise.allSettled(
    resolvedNextMachineIds.map((machineId) =>
      addAssociatedPartToMachine({
        db,
        firebase,
        machineId,
        partId: resolvedPartId,
        machineData: nextMachineDataById[machineId] || null,
      }).then((result) => {
        if (result.updated) added += 1;
      })
    )
  );

  const failures = [...removalResults, ...additionResults].filter(
    (result) => result.status === "rejected"
  );
  if (failures.length) {
    throw new AggregateError(
      failures.map((result) => result.reason),
      `Failed to synchronize ${failures.length} machine backlink operation(s).`
    );
  }

  return { added, removed };
}
