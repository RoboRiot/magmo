function getRefId(ref) {
  if (!ref) return null;
  if (typeof ref === "string") {
    return ref.split("/").filter(Boolean).pop() || ref;
  }
  if (ref.id) return ref.id;
  return null;
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

function getMachineField(data, key) {
  const lower = key.toLowerCase();
  return (
    data?.machineData?.[key] ??
    data?.machineData?.[lower] ??
    data?.currentMachineData?.[key] ??
    data?.currentMachineData?.[lower] ??
    data?.TheMachine?.[key] ??
    data?.TheMachine?.[lower] ??
    data?.theMachineData?.[key] ??
    data?.theMachineData?.[lower] ??
    data?.[key] ??
    data?.[lower] ??
    ""
  );
}

async function resolveClientName(db, data, machineData) {
  if (data?.clientName) return data.clientName;
  if (typeof data?.client === "string") return data.client;

  const directClient =
    (await resolveDocData(db, "Client", data?.client)) ||
    (await resolveDocData(db, "Client", data?.ClientFrom)) ||
    (await resolveDocData(db, "Client", data?.clientFromId)) ||
    (await resolveDocData(db, "Client", data?.ClientCurrent)) ||
    (await resolveDocData(db, "Client", data?.clientCurrentId));
  if (directClient?.name) return directClient.name;

  const machineClientName =
    data?.machineData?.Client ||
    data?.currentMachineData?.Client ||
    machineData?.Client ||
    "";
  if (machineClientName) return machineClientName;

  const machineClient =
    (await resolveDocData(db, "Client", machineData?.client)) ||
    (await resolveDocData(db, "Client", data?.machineData?.client));
  return machineClient?.name || "";
}

export async function resolveAssociatedPartForPrint(db, part) {
  if (!part) return null;
  let data = part;

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
      data?.TheMachine ||
        data?.machineData ||
        data?.Machine ||
        data?.MachineFrom ||
        data?.CurrentMachine ||
        data?.MachineCurrent
    );
    const hasClientSource = Boolean(
      data?.clientName ||
        data?.client ||
        data?.ClientFrom ||
        data?.clientFromId
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

    const machineRef =
      data?.MachineFrom ||
      data?.Machine ||
      data?.CurrentMachine ||
      data?.MachineCurrent;
    let machineData = data?.TheMachine || data?.machineData || null;
    const needsMachineData = !(
      getMachineField({ ...data, machineData }, "OEM") ||
      getMachineField({ ...data, machineData }, "Modality") ||
      getMachineField({ ...data, machineData }, "Model")
    );

    if (needsMachineData && machineRef) {
      const machineDoc = await resolveDocData(db, "Machine", machineRef);
      if (machineDoc) {
        machineData = machineDoc;
        data = { ...data, machineData: machineDoc };
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
      OEM: getMachineField(data, "OEM") || "",
      modality: getMachineField(data, "Modality") || "",
      model: getMachineField(data, "Model") || "",
      local_sn:
        data?.local_sn || data?.localSN || data?.localsn || data?.id || "",
      client: (await resolveClientName(db, data, machineData)) || "",
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
      client: data?.clientName || "",
      description: data?.description || "",
    };
  }
}
