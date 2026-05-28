import firebase from "../context/Firebase";

function getRefId(ref) {
  if (!ref) return "";
  if (typeof ref === "string") return ref;
  if (ref.id) return ref.id;
  return "";
}

function toDisplayValue(value) {
  if (Array.isArray(value)) {
    return value.filter((entry) => entry != null && entry !== "").join(", ");
  }
  return value ?? "";
}

export function formatPartDate(input) {
  let date;

  if (input && input.seconds) {
    date = new Date(input.seconds * 1000);
  } else if (typeof input?.toDate === "function") {
    date = input.toDate();
  } else if (typeof input === "string") {
    date = new Date(input);
  } else if (typeof input === "number") {
    date = new Date(input);
  } else if (input instanceof Date) {
    date = input;
  } else {
    return "N/A";
  }

  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleDateString();
}

function getPartMachineIds(data) {
  const modernIds = [data?.MachineFrom, data?.MachineCurrent]
    .map(getRefId)
    .filter(Boolean);
  if (modernIds.length) return modernIds;

  return [data?.Machine, data?.CurrentMachine].map(getRefId).filter(Boolean);
}

async function resolvePartDoc(db, refOrId) {
  if (!refOrId) return null;
  if (typeof refOrId.get === "function") {
    return refOrId.get();
  }

  const directId = getRefId(refOrId);
  if (directId) {
    return db.collection("Test").doc(directId).get();
  }

  const path = typeof refOrId?.path === "string" ? refOrId.path : "";
  if (path) {
    return db.doc(path).get();
  }

  return null;
}

export async function fetchAssociatedPartsForMachine(machineId) {
  const resolvedMachineId = String(machineId || "").trim();
  if (!resolvedMachineId) return [];

  const db = firebase.firestore();
  const machineDoc = await db.collection("Machine").doc(resolvedMachineId).get();
  if (!machineDoc.exists) return [];

  const machineData = machineDoc.data() || {};

  const associatedRefs = Array.isArray(machineData.associatedParts)
    ? machineData.associatedParts
    : [];
  if (!associatedRefs.length) return [];

  const partDocs = await Promise.all(
    associatedRefs.map((refOrId) => resolvePartDoc(db, refOrId))
  );

  return partDocs
    .filter((doc) => doc?.exists)
    .filter((doc) => {
      const data = doc.data() || {};
      const machineIds = getPartMachineIds(data);
      return machineIds.length === 0 || machineIds.includes(resolvedMachineId);
    })
    .map((doc) => {
      const data = doc.data() || {};
      return {
        id: doc.id,
        name: String(data.name || data.itemName || "").trim(),
        pn: toDisplayValue(data.pn),
        sn: toDisplayValue(data.sn),
        date: data.date || data.arrival_date || data.arrivalDate || "",
      };
    });
}
