import associatedPartRoles from "../lib/associatedPartRoles.cjs";

const {
  firstEntityRoleValue,
  normalizeRole,
  referenceId,
  selectRoleMachineSnapshot,
} = associatedPartRoles;

function getRefId(ref) {
  return referenceId(ref) || null;
}

async function resolveDocData(db, collection, refOrId) {
  if (!refOrId) return null;
  try {
    if (typeof refOrId.get === "function") {
      const doc = await refOrId.get();
      return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }
    const id = getRefId(refOrId);
    if (!id) return null;
    const doc = await db.collection(collection).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  } catch (error) {
    console.error(`Error fetching ${collection} doc:`, error);
    return null;
  }
}

function formatDateForPrint(input) {
  if (!input) return "";
  if (input.seconds) {
    const date = new Date(input.seconds * 1000);
    return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString();
  }
  if (typeof input.toDate === "function") {
    const date = input.toDate();
    return date instanceof Date && !Number.isNaN(date.getTime())
      ? date.toLocaleDateString()
      : "";
  }
  if (input instanceof Date) {
    return Number.isNaN(input.getTime()) ? "" : input.toLocaleDateString();
  }
  if (typeof input === "number") {
    const date = new Date(input);
    return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString();
  }
  if (typeof input === "string") {
    const trimmed = input.trim();
    if (!trimmed) return "";
    const date = new Date(trimmed);
    return Number.isNaN(date.getTime()) ? trimmed : date.toLocaleDateString();
  }
  return "";
}

function pickLatestDescription(data) {
  const descriptions = Array.isArray(data?.descriptions)
    ? data.descriptions
    : [];
  if (!descriptions.length) return data?.description || "";

  let latest = descriptions[0];
  for (const entry of descriptions) {
    if (!entry) continue;
    if (!latest) {
      latest = entry;
      continue;
    }
    const entryDate = new Date(entry.date || 0);
    const latestDate = new Date(latest.date || 0);
    if (!Number.isNaN(entryDate.getTime()) && entryDate > latestDate) {
      latest = entry;
    }
  }
  return latest?.description || data?.description || "";
}

function getMachineField(data, machineData, key, role) {
  const lower = key.toLowerCase();
  return (
    machineData?.[key] ??
    machineData?.[lower] ??
    (role === "from" ? data?.[key] : undefined) ??
    (role === "from" ? data?.[lower] : undefined) ??
    ""
  );
}

function getEmbeddedMachineData(data, role) {
  return selectRoleMachineSnapshot(data, role);
}

async function resolveClientName(db, data, machineData, role) {
  const directName =
    role === "current"
      ? data?.clientCurrentName || data?.currentClientName
      : data?.clientFromName || data?.fromClientName;
  if (directName) return directName;

  const directClient = await resolveDocData(
    db,
    "Client",
    firstEntityRoleValue(data, "client", role)
  );
  if (directClient?.name) return directClient.name;

  const machineClientName = machineData?.Client || machineData?.clientName || "";
  if (machineClientName) return machineClientName;

  const machineClient =
    (await resolveDocData(db, "Client", machineData?.client)) || null;
  if (machineClient?.name) return machineClient.name;

  if (role === "from") {
    if (data?.clientName) return data.clientName;
    if (typeof data?.client === "string") return data.client;
    const legacyClient = await resolveDocData(db, "Client", data?.client);
    if (legacyClient?.name) return legacyClient.name;
  }
  return "";
}

export async function resolveAssociatedPartForPrint(db, part, options = {}) {
  if (!part) return null;
  let data = part;
  const role = normalizeRole(
    typeof options === "string" ? options : options?.role
  );

  try {
    const hasArrival = Boolean(
      data?.arrival_date || data?.arrivalDate || data?.date
    );
    const hasPo = Boolean(data?.poNumber || data?.po_number || data?.po);
    const hasDescriptions = Boolean(
      data?.description ||
        (Array.isArray(data?.descriptions) && data.descriptions.length)
    );
    const hasMachineSource = Boolean(
      getEmbeddedMachineData(data, role) ||
        firstEntityRoleValue(data, "machine", role)
    );
    const hasClientSource = Boolean(
      firstEntityRoleValue(data, "client", role) ||
        (role === "current"
          ? data?.clientCurrentName || data?.currentClientName
          : data?.clientFromName || data?.fromClientName) ||
        (role === "from" ? data?.clientName || data?.client : null)
    );

    if (
      data?.id &&
      (!hasArrival ||
        !hasPo ||
        !hasDescriptions ||
        !hasMachineSource ||
        !hasClientSource)
    ) {
      const partDoc = await resolveDocData(db, "Test", data.id);
      if (partDoc) data = { ...data, ...partDoc };
    }

    const machineRef = firstEntityRoleValue(data, "machine", role);
    let machineData = getEmbeddedMachineData(data, role);
    const needsMachineData = Boolean(machineRef) && (
      !machineData ||
      ["OEM", "Modality", "Model"].some(
        (field) => !getMachineField(data, machineData, field, role)
      )
    );

    if (needsMachineData && machineRef) {
      const machineDoc = await resolveDocData(db, "Machine", machineRef);
      if (machineDoc) {
        machineData = { ...machineDoc, ...(machineData || {}) };
      }
    }

    const arrivalRaw =
      data?.arrival_date ||
      data?.arrivalDate ||
      data?.date ||
      data?.arrival ||
      "";

    return {
      name: data?.name || data?.itemName || "",
      arrival_date: formatDateForPrint(arrivalRaw),
      poNumber: data?.poNumber || data?.po_number || data?.po || "",
      OEM: getMachineField(data, machineData, "OEM", role) || "",
      modality: getMachineField(data, machineData, "Modality", role) || "",
      model: getMachineField(data, machineData, "Model", role) || "",
      local_sn:
        data?.local_sn || data?.localSN || data?.localsn || data?.id || "",
      client: (await resolveClientName(db, data, machineData, role)) || "",
      description: pickLatestDescription(data) || "",
    };
  } catch (error) {
    console.error("Error preparing item for print:", error);
    return {
      name: data?.name || data?.itemName || "",
      arrival_date: formatDateForPrint(
        data?.arrival_date || data?.arrivalDate || data?.date || ""
      ),
      poNumber: data?.poNumber || data?.po_number || data?.po || "",
      OEM: "",
      modality: "",
      model: "",
      local_sn: data?.local_sn || data?.localSN || data?.id || "",
      client: role === "from" ? data?.clientName || "" : "",
      description: data?.description || "",
    };
  }
}
