import React from 'react'
import firebase from "../context/Firebase";

export async function fetchPartsWithMachineData() {
  const db = firebase.firestore();
  const partsSnapshot = await db.collection("Test").get();
  const parts = await Promise.all(
    partsSnapshot.docs.map(async (partDoc) => {
      const partData = partDoc.data();
      partData.id = partDoc.id; // Add document ID here
      const getRefId = (ref) => {
        if (!ref) return null;
        if (typeof ref === "string") return ref;
        if (ref instanceof firebase.firestore.DocumentReference) return ref.id;
        if (ref.id) return ref.id;
        return null;
      };
      partData.clientFromId =
        getRefId(partData?.ClientFrom) ?? partData?.clientFromId ?? null;
      partData.clientCurrentId =
        getRefId(partData?.ClientCurrent) ?? partData?.clientCurrentId ?? null;
      // console.log(partData);
      const fetchMachineData = async (ref) => {
        if (!ref) return null;
        if (typeof ref.get === "function") {
          const doc = await ref.get();
          return doc.exists ? doc.data() : null;
        }
        if (typeof ref === "string") {
          const doc = await db.collection("Machine").doc(ref).get();
          return doc.exists ? doc.data() : null;
        }
        if (ref?.id) {
          const doc = await db.collection("Machine").doc(ref.id).get();
          return doc.exists ? doc.data() : null;
        }
        return null;
      };

      const machineRef = partData.Machine || partData.MachineFrom;
      const currentMachineRef =
        partData.CurrentMachine || partData.MachineCurrent;

      const machineData = await fetchMachineData(machineRef);
      partData.machineData = machineData || {};
      if (machineData?.client) {
        const clientRef = machineData.client;
        const clientId = getRefId(clientRef);
        if (clientId && !partData.clientFromId) {
          partData.clientFromId = clientId;
        }
        if (typeof clientRef?.get === "function") {
          const clientDoc = await clientRef.get();
          partData.machineData.Client = clientDoc.exists
            ? clientDoc.data().name
            : "";
        }
      }

      const currentMachineData = await fetchMachineData(currentMachineRef);
      partData.currentMachineData = currentMachineData || {};
      if (currentMachineData?.client) {
        const clientRef = currentMachineData.client;
        const clientId = getRefId(clientRef);
        if (clientId && !partData.clientCurrentId) {
          partData.clientCurrentId = clientId;
        }
        if (typeof clientRef?.get === "function") {
          const clientDoc = await clientRef.get();
          partData.currentMachineData.Client = clientDoc.exists
            ? clientDoc.data().name
            : "";
        }
      }
      return partData;
    })
  );
  return parts;
}

// Paginated version for faster list views (e.g., mainSearch).
// Uses documentId order for stable pagination.
export async function fetchPartsWithMachineDataPage({
  pageSize = 25,
  startAfterDoc = null,
  visibleOnly = false,
  filterFn = null,
  needsMachineData = true,
  search = null,
} = {}) {
  const db = firebase.firestore();
  const limit = pageSize + 1;

  const getRefId = (ref) => {
    if (!ref) return null;
    if (typeof ref === "string") return ref;
    if (ref instanceof firebase.firestore.DocumentReference) return ref.id;
    if (ref.id) return ref.id;
    return null;
  };

  const MACHINE_SELECT_FIELDS = ["OEM", "Modality", "Model", "client", "name"];
  const withMachineSelect = (query) =>
    typeof query.select === "function"
      ? query.select(...MACHINE_SELECT_FIELDS)
      : query;

  const buildPart = (partDoc, machineMap, currentMachineMap) => {
    const partData = partDoc.data();
    partData.id = partDoc.id; // Add document ID here
    partData.clientFromId =
      getRefId(partData?.ClientFrom) ?? partData?.clientFromId ?? null;
    partData.clientCurrentId =
      getRefId(partData?.ClientCurrent) ?? partData?.clientCurrentId ?? null;

    const machineRef = partData.Machine || partData.MachineFrom;
    const currentMachineRef =
      partData.CurrentMachine || partData.MachineCurrent;

    const machineId = getRefId(machineRef);
    const currentMachineId = getRefId(currentMachineRef);

    const machineData = machineId ? machineMap[machineId] : null;
    const currentMachineData = currentMachineId
      ? currentMachineMap[currentMachineId]
      : null;

    partData.machineData = machineData || {};
    partData.currentMachineData = currentMachineData || {};

    if (!partData.clientFromId && machineData?.client) {
      partData.clientFromId = getRefId(machineData.client);
    }
    if (!partData.clientCurrentId && currentMachineData?.client) {
      partData.clientCurrentId = getRefId(currentMachineData.client);
    }

    return partData;
  };

  const searchRaw = (search?.raw || "").toString().trim();
  const searchLower = (search?.lower || "").toString().trim();
  const searchType = search?.type || null;
  const hasSearch = Boolean(searchRaw);

  const toTitleCase = (text) =>
    text
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const buildSearchQuery = () => {
    if (!hasSearch || !searchType) return { mode: "scan", query: null };
    const col = db.collection("Test");

    switch (searchType) {
      case "SKU":
        return { mode: "sku", query: null };
      case "Name": {
        const titleFallback =
          searchRaw && searchRaw === searchRaw.toLowerCase()
            ? toTitleCase(searchRaw)
            : null;
        const terms = searchLower ? searchLower.split(/\s+/).filter(Boolean) : [];
        const tokens = [...terms];
        if (searchLower && !tokens.includes(searchLower)) tokens.push(searchLower);
        if (!tokens.length) return { mode: "scan", query: null };

        const prefixQuery = (value) =>
          col.orderBy("name").startAt(value).endAt(`${value}\uf8ff`);

        return {
          mode: "query",
          query:
            tokens.length === 1
              ? col.where("nameTokens", "array-contains", tokens[0])
              : col.where(
                  "nameTokens",
                  "array-contains-any",
                  tokens.slice(0, 10)
                ),
          fallback: titleFallback
            ? () => prefixQuery(titleFallback)
            : () => prefixQuery(searchRaw),
        };
      }
      case "Product Number":
        return {
          mode: "query",
          query: col.where("pn", "array-contains", searchRaw),
          fallback: () => col.where("pn", "==", searchRaw),
        };
      case "Serial Number":
        return {
          mode: "query",
          query: col.where("sn", "array-contains", searchRaw),
          fallback: () => col.where("sn", "==", searchRaw),
        };
      case "Date": {
        const asDate = (() => {
          try {
            const d = new Date(searchRaw);
            return isNaN(d.getTime()) ? null : d;
          } catch {
            return null;
          }
        })();
        return {
          mode: "query",
          query: col.where("date", "==", searchRaw),
          fallback: asDate ? () => col.where("date", "==", asDate) : null,
        };
      }
      default:
        return { mode: "scan", query: null };
    }
  };

  const { mode: searchMode, query: searchQuery, fallback: searchFallback } =
    buildSearchQuery();

  if (searchMode === "sku" && hasSearch) {
    const docs = [];
    const rawUpper = searchRaw.toUpperCase();
    let doc = await db.collection("Test").doc(searchRaw).get();
    if (!doc.exists && rawUpper !== searchRaw) {
      doc = await db.collection("Test").doc(rawUpper).get();
    }
    if (doc.exists) docs.push(doc);

    const localValues =
      rawUpper !== searchRaw ? [searchRaw, rawUpper] : [searchRaw];
    const localSnap = await db
      .collection("Test")
      .where("localSN", "in", localValues)
      .limit(limit)
      .get();
    localSnap.forEach((d) => {
      if (!docs.find((existing) => existing.id === d.id)) {
        docs.push(d);
      }
    });

    let machineMap = {};
    let currentMachineMap = {};
    if (needsMachineData && docs.length) {
      const machineIds = new Set();
      const currentMachineIds = new Set();
      for (const docSnap of docs) {
        const raw = docSnap.data();
        const machineId = getRefId(raw.Machine || raw.MachineFrom);
        const currentMachineId = getRefId(
          raw.CurrentMachine || raw.MachineCurrent
        );
        if (machineId) machineIds.add(machineId);
        if (currentMachineId) currentMachineIds.add(currentMachineId);
      }
      const fetchMachineMap = async (ids) => {
        if (!ids.length) return {};
        const out = {};
        const chunks = [];
        for (let i = 0; i < ids.length; i += 10) {
          chunks.push(ids.slice(i, i + 10));
        }
        for (const chunk of chunks) {
          const snap = await withMachineSelect(
            db
              .collection("Machine")
              .where(firebase.firestore.FieldPath.documentId(), "in", chunk)
          ).get();
          snap.forEach((docSnap) => {
            out[docSnap.id] = docSnap.data() || {};
          });
        }
        return out;
      };
      [machineMap, currentMachineMap] = await Promise.all([
        fetchMachineMap([...machineIds]),
        fetchMachineMap([...currentMachineIds]),
      ]);
    }

    const built = docs
      .map((docSnap) => buildPart(docSnap, machineMap, currentMachineMap))
      .filter((item) => (!visibleOnly || item?.visible !== false))
      .filter((item) => (filterFn ? filterFn(item) : true))
      .slice(0, pageSize);

    return {
      parts: built,
      lastDoc: built.length ? docs[built.length - 1] : null,
      hasNextPage: false,
    };
  }

  let parts = [];
  let cursor = startAfterDoc || null;
  let lastDoc = null;
  let pageLastDoc = null;
  let hasNextPage = false;
  let filled = false;
  let usedFallback = false;
  const scanBaseQuery = db
    .collection("Test")
    .orderBy(firebase.firestore.FieldPath.documentId());

  while (true) {
    let query = searchQuery || scanBaseQuery;
    if (searchMode === "query" && usedFallback && searchFallback) {
      query = searchFallback();
    }
    if (cursor) query = query.startAfter(cursor);
    query = query.limit(limit);

    const snap = await query.get();
    if (snap.empty) {
      if (searchMode === "query" && searchFallback && !cursor && !usedFallback) {
        usedFallback = true;
        continue;
      }
      hasNextPage = false;
      break;
    }

    const batchDocs = snap.docs;
    let machineMap = {};
    let currentMachineMap = {};

    if (needsMachineData) {
      const machineIds = new Set();
      const currentMachineIds = new Set();
      for (const doc of batchDocs) {
        const raw = doc.data();
        if (visibleOnly && raw.visible === false) {
          continue;
        }
        const machineId = getRefId(raw.Machine || raw.MachineFrom);
        const currentMachineId = getRefId(
          raw.CurrentMachine || raw.MachineCurrent
        );
        if (machineId) machineIds.add(machineId);
        if (currentMachineId) currentMachineIds.add(currentMachineId);
      }

        const fetchMachineMap = async (ids) => {
          if (!ids.length) return {};
          const out = {};
          const chunks = [];
          for (let i = 0; i < ids.length; i += 10) {
            chunks.push(ids.slice(i, i + 10));
          }
          for (const chunk of chunks) {
            const snap = await withMachineSelect(
              db
                .collection("Machine")
                .where(firebase.firestore.FieldPath.documentId(), "in", chunk)
            ).get();
            snap.forEach((doc) => {
              out[doc.id] = doc.data() || {};
            });
          }
        return out;
      };

      [machineMap, currentMachineMap] = await Promise.all([
        fetchMachineMap([...machineIds]),
        fetchMachineMap([...currentMachineIds]),
      ]);
    }

    for (let i = 0; i < snap.docs.length; i++) {
      const doc = batchDocs[i];
      cursor = doc;

      const raw = doc.data();
      if (visibleOnly && raw.visible === false) {
        continue; // skip hidden items but keep advancing the cursor
      }

      const built = buildPart(doc, machineMap, currentMachineMap);
      if (filterFn && !filterFn(built)) {
        continue;
      }

      if (!filled) {
        parts.push(built);
        if (parts.length === pageSize) {
          filled = true;
          pageLastDoc = doc;
        }
        continue;
      }

      // We already filled the page and found an extra matching item.
      hasNextPage = true;
      return { parts, lastDoc: pageLastDoc, hasNextPage };
    }

    // We exhausted this batch without filling the page.
    if (snap.size < limit) {
      hasNextPage = false;
      break;
    }

    // There might be more docs; continue scanning for visible items.
    hasNextPage = true;
  }

  lastDoc = pageLastDoc || (parts.length ? cursor : null);
  return { parts, lastDoc, hasNextPage: filled ? hasNextPage : false };
}

export async function fetchClients(selectedOEM, selectedModality) {
  const db = firebase.firestore();
  const clientsSnapshot = await db.collection("Client").get();
  const clients = clientsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Filter clients based on OEM and Modality if selected
  if (selectedOEM || selectedModality) {
    const filteredClients = [];
    for (const client of clients) {
      let match = true;
      if (selectedOEM || selectedModality) {
        for (const machineRef of client.machines) {
          const machineDoc = await machineRef.get();
          const machineData = machineDoc.data();
          if (
            (selectedOEM && machineData.OEM === selectedOEM) ||
            (selectedModality && machineData.Modality === selectedModality)
          ) {
            match = true;
            break;
          } else {
            match = false;
          }
        }
      }
      if (match) {
        filteredClients.push(client);
      }
    }
    return filteredClients;
  }

  return clients;
}

export async function fetchModels(
  selectedOEM,
  selectedModality,
  selectedClient
) {
  const db = firebase.firestore();
  const machinesSnapshot = await db.collection("Machine").get();
  const models = new Set();

  await Promise.all(
    machinesSnapshot.docs.map(async (machineDoc) => {
      const machineData = machineDoc.data();
      let isValid = true;

      if (selectedOEM && machineData.OEM !== selectedOEM) isValid = false;
      if (selectedModality && machineData.Modality !== selectedModality)
        isValid = false;
      if (selectedClient && machineData.client) {
        let clientDoc = null;
        if (typeof machineData.client?.get === "function") {
          clientDoc = await machineData.client.get();
        } else if (typeof machineData.client === "string") {
          clientDoc = await db.collection("Client").doc(machineData.client).get();
        }
        if (!clientDoc || !clientDoc.exists) {
          isValid = false;
        } else {
          const clientName = clientDoc.data().name;
          const clientId = clientDoc.id;
          if (selectedClient !== clientName && selectedClient !== clientId) {
            isValid = false;
          }
        }
      }

      if (isValid) {
        models.add(machineData.Model);
      }
    })
  );

  return Array.from(models);
}

export function formatDate(timestamp) {
  if (!timestamp) return "";
  let date;
  if (timestamp.toDate) {
    date = timestamp.toDate();
  } else if (typeof timestamp === "string" || typeof timestamp === "number") {
    date = new Date(timestamp);
  } else {
    return ""; // handle unexpected formats
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
