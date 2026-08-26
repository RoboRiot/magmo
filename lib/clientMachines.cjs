function extractDocumentId(value, collectionName) {
  if (!value) return "";

  if (typeof value === "object") {
    if (typeof value.id === "string" && value.id.trim()) {
      return value.id.trim();
    }
    if (typeof value.path === "string" && value.path.trim()) {
      return extractDocumentId(value.path, collectionName);
    }
    const internalSegments = value?._path?.segments;
    if (Array.isArray(internalSegments) && internalSegments.length) {
      return extractDocumentId(internalSegments.join("/"), collectionName);
    }
  }

  if (typeof value !== "string") return "";
  const pathSegments = value.trim().split("/").filter(Boolean);
  if (!pathSegments.length) return "";

  const collectionIndex = collectionName
    ? pathSegments.lastIndexOf(collectionName)
    : -1;
  if (collectionIndex >= 0) {
    return String(pathSegments[collectionIndex + 1] || "").trim();
  }

  return pathSegments.length === 1 ? pathSegments[0] : "";
}

function serializeFirestoreDate(value) {
  if (!value) return null;
  if (typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string" || typeof value === "number") return value;
  return null;
}

function serializeMachineDocument(machineDoc) {
  if (!machineDoc?.exists) return null;
  const machineData = machineDoc.data() || {};
  return {
    id: machineDoc.id,
    name: machineData.name || "",
    local: machineData.local || "",
    OEM: machineData.OEM || machineData.oem || "",
    Modality: machineData.Modality || machineData.modality || "",
    Model: machineData.Model || machineData.model || "",
    lastPM: serializeFirestoreDate(machineData.lastPM),
    nextPM: serializeFirestoreDate(machineData.nextPM),
  };
}

function sortMachineRecords(records) {
  return [...(Array.isArray(records) ? records : [])].sort((left, right) => {
    const nameComparison = String(left?.name || "").localeCompare(
      String(right?.name || ""),
      "en",
      { sensitivity: "base", numeric: true }
    );
    if (nameComparison) return nameComparison;
    return String(left?.id || "").localeCompare(String(right?.id || ""), "en", {
      sensitivity: "base",
      numeric: true,
    });
  });
}

module.exports = {
  extractDocumentId,
  serializeFirestoreDate,
  serializeMachineDocument,
  sortMachineRecords,
};
