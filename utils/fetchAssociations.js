import React from 'react'
import firebase from "../context/Firebase";
import {
  isInteriorSocalMachineData,
  stripEmbeddedMachineAssociations,
} from "./warehouseAssociations";

const MACHINE_LIST_FIELDS = ["OEM", "Modality", "Model", "client", "name"];

function sanitizeMachineDataForList(data) {
  if (!data) return null;
  const sanitized = {};
  MACHINE_LIST_FIELDS.forEach((key) => {
    if (data[key] !== undefined) sanitized[key] = data[key];
  });
  return sanitized;
}

export async function fetchPartsWithMachineData() {
  const db = firebase.firestore();
  const partsSnapshot = await db.collection("Test").get();
  const parts = await Promise.all(
    partsSnapshot.docs.map(async (partDoc) => {
      const partData = stripEmbeddedMachineAssociations(partDoc.data() || {});
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
          if (!doc.exists) return null;
          const data = doc.data() || {};
          return sanitizeMachineDataForList(data);
        }
        if (typeof ref === "string") {
          const doc = await db.collection("Machine").doc(ref).get();
          if (!doc.exists) return null;
          const data = doc.data() || {};
          return sanitizeMachineDataForList(data);
        }
        if (ref?.id) {
          const doc = await db.collection("Machine").doc(ref.id).get();
          if (!doc.exists) return null;
          const data = doc.data() || {};
          return sanitizeMachineDataForList(data);
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
  selectedClientFrom = null,
  selectedClientCurrent = null,
  debugLabel = "",
  onDebug = null,
} = {}) {
  const db = firebase.firestore();
  const limit = pageSize + 1;
  const startedAt = Date.now();
  let scannedDocs = 0;
  let scannedBatches = 0;
  let machineQueryCount = 0;
  let clientPrefilterRejected = 0;
  let visibleRejected = 0;
  let filterRejected = 0;
  const acceptedDocIds = [];
  const corruptDocs = [];
  const batchDebug = [];
  const scanBatchLimit = Math.max(limit, Math.min(250, pageSize * 8));

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
  const machineCache = new Map();

  const emitDebug = (event, payload = {}) => {
    if (typeof onDebug !== "function") return;
    try {
      onDebug({
        event,
        label: debugLabel,
        elapsedMs: Date.now() - startedAt,
        scannedDocs,
        scannedBatches,
        acceptedCount: acceptedDocIds.length,
        ...payload,
      });
    } catch {
      // Debug hooks should never affect the search path.
    }
  };

  const fetchMachineIdsForClient = async (clientId) => {
    if (!clientId) return null;

    const ids = new Set();
    const clientRef = db.collection("Client").doc(clientId);
    const queries = [
      db.collection("Machine").where("client", "==", clientRef),
      db.collection("Machine").where("client", "==", clientId),
    ];

    for (const query of queries) {
      const snap = await query.get();
      snap.forEach((docSnap) => ids.add(docSnap.id));
    }

    return ids;
  };

  const [clientFromMachineIds, clientCurrentMachineIds] = await Promise.all([
    fetchMachineIdsForClient(selectedClientFrom),
    fetchMachineIdsForClient(selectedClientCurrent),
  ]);

  const rawMatchesClientSelection = (raw, type) => {
    const selectedClient =
      type === "from" ? selectedClientFrom : selectedClientCurrent;
    if (!selectedClient) return true;

    const directClientRef =
      type === "from"
        ? raw?.ClientFrom ?? raw?.clientFromId
        : raw?.ClientCurrent ?? raw?.clientCurrentId;
    const directClientId = getRefId(directClientRef);
    if (directClientId === selectedClient) return true;

    const machineRef =
      type === "from"
        ? raw?.Machine || raw?.MachineFrom
        : raw?.CurrentMachine || raw?.MachineCurrent;
    const machineId = getRefId(machineRef);
    const machineIds =
      type === "from" ? clientFromMachineIds : clientCurrentMachineIds;
    return Boolean(machineId && machineIds?.has(machineId));
  };

  const rawMatchesClientSelections = (raw) =>
    rawMatchesClientSelection(raw, "from") &&
    rawMatchesClientSelection(raw, "current");

  const fetchMachineMap = async (ids) => {
    if (!ids.length) return {};

    const uniqueIds = Array.from(new Set(ids.filter(Boolean)));
    if (!uniqueIds.length) return {};

    const missingIds = uniqueIds.filter((id) => !machineCache.has(id));
    for (let i = 0; i < missingIds.length; i += 10) {
      const chunk = missingIds.slice(i, i + 10);
      machineQueryCount += 1;
      const snap = await withMachineSelect(
        db
          .collection("Machine")
          .where(firebase.firestore.FieldPath.documentId(), "in", chunk)
      ).get();

      const found = new Set();
      snap.forEach((docSnap) => {
        found.add(docSnap.id);
        const machineData = docSnap.data() || {};
        if (isInteriorSocalMachineData(machineData)) {
          docSnap.ref
            .set(
              {
                associatedParts: firebase.firestore.FieldValue.delete(),
                skipAssociatedParts: true,
                associatedPartsSkippedReason: "interior-socal-warehouse",
              },
              { merge: true }
            )
            .catch((error) => {
              console.error(
                "Failed to clear Interior SoCal associatedParts:",
                error
              );
            });
        }
        machineCache.set(docSnap.id, sanitizeMachineDataForList(machineData));
      });

      // Cache misses too, so we don't re-query the same non-existent ids.
      chunk.forEach((id) => {
        if (!found.has(id)) machineCache.set(id, null);
      });
    }

    const out = {};
    uniqueIds.forEach((id) => {
      const data = machineCache.get(id);
      if (data) out[id] = data;
    });
    return out;
  };

  let activeSearchMode = "scan";
  const buildDebug = () => ({
    label: debugLabel,
    searchMode: activeSearchMode,
    scannedDocs,
    scannedBatches,
    machineQueryCount,
    clientPrefilterRejected,
    visibleRejected,
    filterRejected,
    acceptedDocIds,
    corruptDocs,
    batchDebug,
    scanBatchLimit:
      activeSearchMode === "scan" || activeSearchMode === "scan-fallback"
        ? scanBatchLimit
        : limit,
    elapsedMs: Date.now() - startedAt,
  });

  const buildPart = (partDoc, machineMap, currentMachineMap) => {
    const rawPartData = partDoc.data() || {};
    const partData = stripEmbeddedMachineAssociations(rawPartData);
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

  const getClientQueryMatches = async ({ type, clientId, machineIds }) => {
    if (!clientId) return null;

    const directFields =
      type === "from"
        ? ["ClientFrom", "clientFromId"]
        : ["ClientCurrent", "clientCurrentId"];
    const machineFields =
      type === "from"
        ? ["Machine", "MachineFrom"]
        : ["CurrentMachine", "MachineCurrent"];
    const clientRef = db.collection("Client").doc(clientId);
    const docMap = new Map();
    const queries = [];

    directFields.forEach((field) => {
      queries.push(db.collection("Test").where(field, "==", clientRef));
      queries.push(db.collection("Test").where(field, "==", clientId));
    });

    const machineIdList = Array.from(machineIds || []);
    const machineRefs = machineIdList.map((id) => db.collection("Machine").doc(id));
    for (const field of machineFields) {
      for (let i = 0; i < machineRefs.length; i += 10) {
        queries.push(
          db.collection("Test").where(field, "in", machineRefs.slice(i, i + 10))
        );
      }
      for (let i = 0; i < machineIdList.length; i += 10) {
        queries.push(
          db.collection("Test").where(field, "in", machineIdList.slice(i, i + 10))
        );
      }
    }

    for (const query of queries) {
      scannedBatches += 1;
      const snap = await query.get();
      scannedDocs += snap.size;
      snap.forEach((docSnap) => {
        docMap.set(docSnap.id, docSnap);
      });
    }

    return docMap;
  };

  const fetchClientPrefilterDocs = async () => {
    if (!selectedClientFrom && !selectedClientCurrent) return null;

    const [fromMatches, currentMatches] = await Promise.all([
      getClientQueryMatches({
        type: "from",
        clientId: selectedClientFrom,
        machineIds: clientFromMachineIds,
      }),
      getClientQueryMatches({
        type: "current",
        clientId: selectedClientCurrent,
        machineIds: clientCurrentMachineIds,
      }),
    ]);

    let docMap = fromMatches || currentMatches || new Map();
    if (fromMatches && currentMatches) {
      docMap = new Map(
        [...fromMatches].filter(([id]) => currentMatches.has(id))
      );
    }

    return [...docMap.values()].sort((a, b) => a.id.localeCompare(b.id));
  };

  const clientPrefilterDocs = await fetchClientPrefilterDocs();

  if (clientPrefilterDocs) {
    activeSearchMode = "client-query";
    const startAfterId = startAfterDoc?.id || null;
    const startIndex = startAfterId
      ? clientPrefilterDocs.findIndex((docSnap) => docSnap.id === startAfterId) + 1
      : 0;
    const visibleDocs = clientPrefilterDocs.slice(Math.max(0, startIndex));
    const matchedDocs = [];
    const candidateWindowSize = Math.max(limit, Math.min(100, pageSize * 4));

    for (
      let offset = 0;
      offset < visibleDocs.length && matchedDocs.length <= pageSize;
      offset += candidateWindowSize
    ) {
      const windowDocs = visibleDocs.slice(offset, offset + candidateWindowSize);
      const machineIds = new Set();
      const currentMachineIds = new Set();

      windowDocs.forEach((docSnap) => {
        try {
          const raw = docSnap.data() || {};
          if (visibleOnly && raw.visible === false) return;
          const machineId = getRefId(raw.Machine || raw.MachineFrom);
          const currentMachineId = getRefId(
            raw.CurrentMachine || raw.MachineCurrent
          );
          if (machineId) machineIds.add(machineId);
          if (currentMachineId) currentMachineIds.add(currentMachineId);
        } catch (error) {
          corruptDocs.push({
            id: docSnap.id,
            stage: "client-query-read-before-machine-fetch",
            message: error?.message || String(error),
          });
        }
      });

      let machineMap = {};
      let currentMachineMap = {};
      if (needsMachineData) {
        [machineMap, currentMachineMap] = await Promise.all([
          fetchMachineMap([...machineIds]),
          fetchMachineMap([...currentMachineIds]),
        ]);
      }

      for (const docSnap of windowDocs) {
        let raw;
        try {
          raw = docSnap.data() || {};
          if (visibleOnly && raw.visible === false) {
            visibleRejected += 1;
            continue;
          }
          if (!rawMatchesClientSelections(raw)) {
            clientPrefilterRejected += 1;
            continue;
          }
          const built = buildPart(docSnap, machineMap, currentMachineMap);
          if (filterFn && !filterFn(built)) {
            filterRejected += 1;
            continue;
          }
          matchedDocs.push({ docSnap, built });
          if (matchedDocs.length > pageSize) break;
        } catch (error) {
          corruptDocs.push({
            id: docSnap.id,
            stage: "client-query-build-or-filter",
            message: error?.message || String(error),
            machineId: getRefId(raw?.Machine || raw?.MachineFrom) || null,
            currentMachineId:
              getRefId(raw?.CurrentMachine || raw?.MachineCurrent) || null,
          });
        }
      }
    }

    const pageMatches = matchedDocs.slice(0, pageSize);
    pageMatches.forEach(({ docSnap }) => acceptedDocIds.push(docSnap.id));

    return {
      parts: pageMatches.map(({ built }) => built),
      lastDoc: pageMatches.length
        ? pageMatches[pageMatches.length - 1].docSnap
        : null,
      hasNextPage: matchedDocs.length > pageSize,
      debug: {
        ...buildDebug(),
        clientCandidateDocs: clientPrefilterDocs.length,
        clientRemainingDocs: visibleDocs.length,
      },
    };
  }

  const searchRaw = (search?.raw || "").toString().trim();
  const searchLower = (search?.lower || "").toString().trim();
  const normalizeSearchType = (value) => {
    const normalized = String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
    switch (normalized) {
      case "name":
        return "Name";
      case "date":
        return "Date";
      case "work order":
      case "workorder":
        return "Work Order";
      case "product number":
      case "productnumber":
        return "Product Number";
      case "serial number":
      case "serialnumber":
        return "Serial Number";
      case "description":
        return "Description";
      case "sku":
        return "SKU";
      default:
        return null;
    }
  };
  const searchType = normalizeSearchType(search?.type);
  const hasSearch = Boolean(searchRaw);

  const toTitleCase = (text) =>
    text
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const buildSearchQuery = () => {
    if (!hasSearch || !searchType) {
      return { mode: "scan", query: null, fallback: null, allowScanFallback: false };
    }
    const col = db.collection("Test");

    switch (searchType) {
      case "SKU":
        return { mode: "sku", query: null, fallback: null, allowScanFallback: false };
      case "Name": {
        const terms = searchLower
          ? searchLower.split(/[^a-z0-9]+/).filter(Boolean)
          : [];
        const uniqueTerms = Array.from(new Set(terms));
        const queryTerms = uniqueTerms.length
          ? uniqueTerms
          : searchLower
          ? [searchLower]
          : [];
        const rankedTerms = [...queryTerms].sort((a, b) => {
          if (b.length !== a.length) return b.length - a.length;
          return a.localeCompare(b);
        });
        const primaryToken = rankedTerms[0] || null;
        const fallbackTokens = rankedTerms.slice(0, 10);
        if (!primaryToken) {
          return {
            mode: "scan",
            query: null,
            fallback: null,
            allowScanFallback: false,
          };
        }
        const titleFallback =
          searchRaw && searchRaw === searchRaw.toLowerCase()
            ? toTitleCase(searchRaw)
            : null;
        const prefixQuery = (value) =>
          col.orderBy("name").startAt(value).endAt(`${value}\uf8ff`);

        return {
          mode: "query",
          query: col.where("nameTokens", "array-contains", primaryToken),
          fallback: fallbackTokens.length > 1
            ? () => col.where("nameTokens", "array-contains-any", fallbackTokens)
            : titleFallback
            ? () => prefixQuery(titleFallback)
            : () => prefixQuery(searchRaw),
          allowScanFallback: false,
        };
      }
      case "Work Order": {
        const normalizedSearch = searchLower.replace(/\s+/g, " ").trim();
        const compactSearch = normalizedSearch.replace(/[^a-z0-9]+/g, "");
        const splitTokens = compactSearch
          ? compactSearch.match(/[a-z]+|\d+/g) || []
          : normalizedSearch
          .split(/[^a-z0-9]+/)
          .map((token) => token.trim())
          .filter(Boolean);
        const candidateTokens = Array.from(
          new Set(
            [compactSearch, normalizedSearch, ...splitTokens].filter(
              (token) => Boolean(token) && token.length >= 2
            )
          )
        );
        const rankedTokens = [...candidateTokens].sort((a, b) => {
          if (b.length !== a.length) return b.length - a.length;
          return a.localeCompare(b);
        });
        const primaryToken =
          (compactSearch && compactSearch.length >= 2 && compactSearch) ||
          rankedTokens[0] ||
          null;
        const fallbackTokens = rankedTokens
          .filter((token) => token !== primaryToken)
          .filter((token) => token.length >= 3)
          .slice(0, 8);
        if (!primaryToken) {
          return {
            mode: "scan",
            query: null,
            fallback: null,
            allowScanFallback: false,
          };
        }
        return {
          mode: "query",
          query: col.where("workOrderTokens", "array-contains", primaryToken),
          fallback:
            fallbackTokens.length > 1
              ? () =>
                  col.where("workOrderTokens", "array-contains-any", fallbackTokens)
              : fallbackTokens.length === 1
              ? () => col.where("workOrderTokens", "array-contains", fallbackTokens[0])
              : null,
          // Avoid expensive full scans on the interactive search path.
          allowScanFallback: false,
        };
      }
      case "Product Number":
        return {
          mode: "query",
          query: col.where("pn", "array-contains", searchRaw),
          fallback: () => col.where("pn", "==", searchRaw),
          allowScanFallback: false,
        };
      case "Serial Number":
        return {
          mode: "query",
          query: col.where("sn", "array-contains", searchRaw),
          fallback: () => col.where("sn", "==", searchRaw),
          allowScanFallback: false,
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
          allowScanFallback: false,
        };
      }
      default:
        return { mode: "scan", query: null, fallback: null, allowScanFallback: false };
    }
  };

  const {
    mode: searchMode,
    query: searchQuery,
    fallback: searchFallback,
    allowScanFallback,
  } = buildSearchQuery();
  activeSearchMode = searchMode;

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
    scannedDocs += docs.length;
    scannedBatches += 1;

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
      debug: buildDebug(),
    };
  }

  let parts = [];
  let cursor = startAfterDoc || null;
  let lastDoc = null;
  let pageLastDoc = null;
  let hasNextPage = false;
  let filled = false;
  let usedFallback = false;
  let usingScanFallback = searchMode === "scan";
  const scanBaseQuery = db
    .collection("Test")
    .orderBy(firebase.firestore.FieldPath.documentId());

  while (true) {
    scannedBatches += 1;
    let query = usingScanFallback ? scanBaseQuery : searchQuery || scanBaseQuery;
    if (!usingScanFallback && searchMode === "query" && usedFallback && searchFallback) {
      query = searchFallback();
    }
    if (cursor) query = query.startAfter(cursor);
    const batchLimit = usingScanFallback ? scanBatchLimit : limit;
    query = query.limit(batchLimit);

    emitDebug("batch:start", {
      batchLimit,
      cursorId: cursor?.id || null,
      usingScanFallback,
      usedFallback,
    });

    const snap = await query.get();
    if (snap.empty) {
      if (
        !usingScanFallback &&
        searchMode === "query" &&
        searchFallback &&
        !cursor &&
        !usedFallback
      ) {
        usedFallback = true;
        continue;
      }
      if (
        !usingScanFallback &&
        searchMode === "query" &&
        allowScanFallback &&
        !startAfterDoc
      ) {
        usingScanFallback = true;
        activeSearchMode = "scan-fallback";
        cursor = null;
        usedFallback = false;
        continue;
      }
      hasNextPage = false;
      break;
    }

    const batchDocs = snap.docs;
    scannedDocs += batchDocs.length;
    const batchInfo = {
      index: scannedBatches,
      size: snap.size,
      firstDocId: batchDocs[0]?.id || null,
      lastDocId: batchDocs[batchDocs.length - 1]?.id || null,
      acceptedBefore: parts.length,
      acceptedAfter: parts.length,
      clientPrefilterRejectedBefore: clientPrefilterRejected,
      clientPrefilterRejectedAfter: clientPrefilterRejected,
      visibleRejectedBefore: visibleRejected,
      visibleRejectedAfter: visibleRejected,
      filterRejectedBefore: filterRejected,
      filterRejectedAfter: filterRejected,
    };
    let machineMap = {};
    let currentMachineMap = {};

    if (needsMachineData) {
      const machineIds = new Set();
      const currentMachineIds = new Set();
      for (const doc of batchDocs) {
        let raw;
        try {
          raw = doc.data() || {};
        } catch (error) {
          corruptDocs.push({
            id: doc.id,
            stage: "read-before-machine-fetch",
            message: error?.message || String(error),
          });
          continue;
        }
        if (visibleOnly && raw.visible === false) {
          visibleRejected += 1;
          continue;
        }
        if (!rawMatchesClientSelections(raw)) {
          clientPrefilterRejected += 1;
          continue;
        }
        const machineId = getRefId(raw.Machine || raw.MachineFrom);
        const currentMachineId = getRefId(
          raw.CurrentMachine || raw.MachineCurrent
        );
        if (machineId) machineIds.add(machineId);
        if (currentMachineId) currentMachineIds.add(currentMachineId);
      }

      [machineMap, currentMachineMap] = await Promise.all([
        fetchMachineMap([...machineIds]),
        fetchMachineMap([...currentMachineIds]),
      ]);
    }

    for (let i = 0; i < snap.docs.length; i++) {
      const doc = batchDocs[i];
      cursor = doc;

      let raw;
      let built;
      try {
        raw = doc.data() || {};
        if (visibleOnly && raw.visible === false) {
          visibleRejected += 1;
          continue; // skip hidden items but keep advancing the cursor
        }
        if (!rawMatchesClientSelections(raw)) {
          clientPrefilterRejected += 1;
          continue;
        }

        built = buildPart(doc, machineMap, currentMachineMap);
        if (filterFn && !filterFn(built)) {
          filterRejected += 1;
          continue;
        }
      } catch (error) {
        corruptDocs.push({
          id: doc.id,
          stage: "build-or-filter",
          message: error?.message || String(error),
          machineId: getRefId(raw?.Machine || raw?.MachineFrom) || null,
          currentMachineId:
            getRefId(raw?.CurrentMachine || raw?.MachineCurrent) || null,
        });
        continue;
      }

      if (!filled) {
        parts.push(built);
        acceptedDocIds.push(doc.id);
        if (parts.length === pageSize) {
          filled = true;
          pageLastDoc = doc;
        }
        continue;
      }

      // We already filled the page and found an extra matching item.
      hasNextPage = true;
      return { parts, lastDoc: pageLastDoc, hasNextPage, debug: buildDebug() };
    }

    batchInfo.acceptedAfter = parts.length;
    batchInfo.clientPrefilterRejectedAfter = clientPrefilterRejected;
    batchInfo.visibleRejectedAfter = visibleRejected;
    batchInfo.filterRejectedAfter = filterRejected;
    batchDebug.push(batchInfo);
    emitDebug("batch:done", batchInfo);

    if (filled) {
      return {
        parts,
        lastDoc: pageLastDoc,
        hasNextPage: snap.size === batchLimit,
        debug: {
          ...buildDebug(),
          hasNextPageIsOptimistic: snap.size === batchLimit,
          stoppedAfterPageFilled: true,
        },
      };
    }

    // We exhausted this batch without filling the page.
    if (snap.size < batchLimit) {
      hasNextPage = false;
      break;
    }

    // There might be more docs; continue scanning for visible items.
    hasNextPage = true;
  }

  lastDoc = pageLastDoc || (parts.length ? cursor : null);
  return {
    parts,
    lastDoc,
    hasNextPage: filled ? hasNextPage : false,
    debug: buildDebug(),
  };
}

export async function fetchClients(selectedOEM, selectedModality) {
  const normalizeText = (value) => {
    if (value == null) return "";
    return String(value).toLowerCase().trim();
  };

  const fieldMatchesSelection = (value, selected) => {
    if (!selected) return false;
    if (Array.isArray(value)) {
      return value.some((entry) => fieldMatchesSelection(entry, selected));
    }
    return normalizeText(value) === normalizeText(selected);
  };

  const db = firebase.firestore();
  const clientsSnapshot = await db.collection("Client").get();
  const clients = clientsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Filter clients based on OEM and Modality if selected
  if (selectedOEM || selectedModality) {
    const filtered = await Promise.all(
      clients.map(async (client) => {
        const machineRefs = Array.isArray(client.machines) ? client.machines : [];
        if (!machineRefs.length) return null;

        const machineDocs = await Promise.all(
          machineRefs
            .filter((machineRef) => machineRef && typeof machineRef.get === "function")
            .map((machineRef) => machineRef.get())
        );

        const hasMatch = machineDocs.some((machineDoc) => {
          if (!machineDoc?.exists) return false;
          const rawMachineData = machineDoc.data() || {};
          if (isInteriorSocalMachineData(rawMachineData)) {
            machineDoc.ref
              .set(
                {
                  associatedParts: firebase.firestore.FieldValue.delete(),
                  skipAssociatedParts: true,
                  associatedPartsSkippedReason: "interior-socal-warehouse",
                },
                { merge: true }
              )
              .catch((error) => {
                console.error(
                  "Failed to clear Interior SoCal associatedParts:",
                  error
                );
              });
          }
          const machineData = sanitizeMachineDataForList(rawMachineData) || {};
          if (
            selectedOEM &&
            fieldMatchesSelection(machineData.OEM ?? machineData.oem, selectedOEM)
          ) {
            return true;
          }
          if (
            selectedModality &&
            fieldMatchesSelection(
              machineData.Modality ?? machineData.modality,
              selectedModality
            )
          ) {
            return true;
          }
          return false;
        });

        return hasMatch ? client : null;
      })
    );

    return filtered.filter(Boolean);
  }

  return clients;
}

export async function fetchModels(
  selectedOEM,
  selectedModality,
  selectedClient
) {
  const normalizeText = (value) => {
    if (value == null) return "";
    return String(value).toLowerCase().trim();
  };

  const fieldMatchesSelection = (value, selected) => {
    if (!selected) return true;
    if (Array.isArray(value)) {
      return value.some((entry) => fieldMatchesSelection(entry, selected));
    }
    return normalizeText(value) === normalizeText(selected);
  };

  const db = firebase.firestore();
  const machinesSnapshot = await db.collection("Machine").get();
  const models = new Set();
  const clientCache = new Map();

  const getClientByRef = async (clientRef) => {
    if (!clientRef) return null;
    const clientId =
      typeof clientRef === "string" ? clientRef : clientRef?.id || null;
    if (!clientId) return null;
    if (clientCache.has(clientId)) return clientCache.get(clientId);

    let clientDoc = null;
    if (typeof clientRef?.get === "function") {
      clientDoc = await clientRef.get();
    } else if (typeof clientRef === "string") {
      clientDoc = await db.collection("Client").doc(clientRef).get();
    }
    const payload = clientDoc?.exists
      ? { id: clientDoc.id, ...(clientDoc.data() || {}) }
      : null;
    clientCache.set(clientId, payload);
    return payload;
  };

  await Promise.all(
    machinesSnapshot.docs.map(async (machineDoc) => {
      const rawMachineData = machineDoc.data() || {};
      if (isInteriorSocalMachineData(rawMachineData)) {
        machineDoc.ref
          .set(
            {
              associatedParts: firebase.firestore.FieldValue.delete(),
              skipAssociatedParts: true,
              associatedPartsSkippedReason: "interior-socal-warehouse",
            },
            { merge: true }
          )
          .catch((error) => {
            console.error("Failed to clear Interior SoCal associatedParts:", error);
          });
      }
      const machineData = sanitizeMachineDataForList(rawMachineData) || {};
      let isValid = true;

      if (!fieldMatchesSelection(machineData.OEM ?? machineData.oem, selectedOEM))
        isValid = false;
      if (
        !fieldMatchesSelection(
          machineData.Modality ?? machineData.modality,
          selectedModality
        )
      )
        isValid = false;
      if (selectedClient && machineData.client) {
        const clientData = await getClientByRef(machineData.client);
        if (!clientData) {
          isValid = false;
        } else {
          const clientName = clientData.name;
          const clientId = clientData.id;
          if (selectedClient !== clientName && selectedClient !== clientId) {
            isValid = false;
          }
        }
      }

      if (isValid) {
        const modelValue = machineData.Model ?? machineData.model;
        if (Array.isArray(modelValue)) {
          modelValue.forEach((entry) => entry && models.add(entry));
        } else if (modelValue) {
          models.add(modelValue);
        }
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
