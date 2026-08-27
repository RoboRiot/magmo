import associatedPartRoles from "../lib/associatedPartRoles.cjs";

const { getEntityRoleIds } = associatedPartRoles;

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

  const resolvedPartId = normalizeRequiredDocumentId(partId, "partId");
  const previousWasSupplied = previousPartId !== null && previousPartId !== undefined;
  const resolvedPreviousPartId = previousWasSupplied
    ? normalizeRequiredDocumentId(previousPartId, "previousPartId")
    : "";
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

  return db.runTransaction(async (transaction) => {
    // Read all item preconditions first. No transaction write occurs until the
    // previous item, target item, and every affected machine have been read.
    let previousSnapshot;
    let targetSnapshot;
    if (operation === "rename") {
      [previousSnapshot, targetSnapshot] = await Promise.all([
        transaction.get(previousRef),
        transaction.get(targetRef),
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

    const previousItemData = previousSnapshot.exists ? previousSnapshot.data() || {} : {};
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
    let targetItemData = itemData;
    if (operation === "rename") {
      targetItemData = { ...previousItemData };
      resolvedRenameFieldsToReplace.forEach((field) => {
        delete targetItemData[field];
      });
      Object.assign(targetItemData, itemData);
    }

    // All reads and validations are complete before the first queued write.
    if (operation === "update") transaction.update(targetRef, itemData);
    else transaction.set(targetRef, targetItemData);
    if (operation === "rename") transaction.delete(previousRef);
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
