export const INTERIOR_SOCAL_MACHINE_NAME = "interior socal";
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

async function clearInteriorSocalAssociatedParts(db, firebase, machineRef) {
  try {
    await machineRef.set(
      {
        associatedParts: firebase.firestore.FieldValue.delete(),
        skipAssociatedParts: true,
        associatedPartsSkippedReason: "interior-socal-warehouse",
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Failed to clear Interior SoCal associatedParts:", error);
  }
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

  if (!isInteriorSocalMachineData(resolvedMachineData)) {
    const machineDoc = await machineRef.get();
    if (!machineDoc.exists) return { updated: false };
    resolvedMachineData = machineDoc.data() || {};
  }

  if (isInteriorSocalMachineData(resolvedMachineData)) {
    await clearInteriorSocalAssociatedParts(db, firebase, machineRef);
    return { updated: false, skipped: true };
  }

  await machineRef.update({
    associatedParts: firebase.firestore.FieldValue.arrayUnion(
      db.collection("Test").doc(resolvedPartId)
    ),
  });
  return { updated: true };
}
