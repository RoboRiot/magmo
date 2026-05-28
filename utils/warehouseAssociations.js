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

export function getRefId(ref) {
  if (!ref) return "";
  if (typeof ref === "string") return ref;
  if (ref.id) return ref.id;
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
  const machineFields = [
    "Machine",
    "MachineFrom",
    "CurrentMachine",
    "MachineCurrent",
  ];
  return Array.from(
    new Set(
      machineFields
        .map((field) => getRefId(itemData[field]))
        .filter((id) => String(id || "").trim())
    )
  );
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

  await Promise.all(
    [...removedMachineIds, ...machinesNeedingOldPartCleanup].map((machineId) =>
      removeAssociatedPartFromMachine({
        db,
        firebase,
        machineId,
        partId: oldPartIdChanged ? previousResolvedPartId : resolvedPartId,
      })
        .then((result) => {
          if (result.updated) removed += 1;
        })
        .catch((error) => {
          console.error("Error removing associated part from machine:", error);
        })
    )
  );

  await Promise.all(
    resolvedNextMachineIds.map((machineId) =>
      addAssociatedPartToMachine({
        db,
        firebase,
        machineId,
        partId: resolvedPartId,
        machineData: nextMachineDataById[machineId] || null,
      })
        .then((result) => {
          if (result.updated) added += 1;
        })
        .catch((error) => {
          console.error("Error adding associated part to machine:", error);
        })
    )
  );

  return { added, removed };
}
