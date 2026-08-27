import React from 'react'
import firebase from "../context/Firebase";
import { stripEmbeddedMachineAssociations } from "./warehouseAssociations";
import associatedPartRoles from "../lib/associatedPartRoles.cjs";

const {
  getEntityRoleIds,
  getStoredClientId: resolveStoredClientId,
} = associatedPartRoles;

const MACHINE_LIST_FIELDS = [
  "OEM",
  "oem",
  "Modality",
  "modality",
  "Model",
  "model",
  "client",
  "name",
  "local",
  "location",
];
const CLIENT_MACHINE_IDS_CACHE_TTL_MS = 5 * 60 * 1000;
const clientMachineIdsCache = new Map();

function sanitizeMachineDataForList(data) {
  if (!data) return null;
  const sanitized = {};
  MACHINE_LIST_FIELDS.forEach((key) => {
    if (data[key] !== undefined) sanitized[key] = data[key];
  });
  return sanitized;
}

function getDocumentId(value) {
  if (!value) return null;
  if (typeof value === "string") {
    const segments = value.split("/").filter(Boolean);
    return segments[segments.length - 1] || null;
  }
  if (value.id) return value.id;
  if (value.path) return getDocumentId(value.path);
  return null;
}

function getStoredMachineId(item, type) {
  return getEntityRoleIds(item, "machine", type)[0] || null;
}

export function getStoredClientId(item, type) {
  return resolveStoredClientId(item, type) || null;
}

export async function fetchPartsWithMachineData() {
  const db = firebase.firestore();
  const partsSnapshot = await db.collection("Test").get();
  const parts = await Promise.all(
    partsSnapshot.docs.map(async (partDoc) => {
      const partData = stripEmbeddedMachineAssociations(partDoc.data() || {});
      partData.id = partDoc.id; // Add document ID here
      const getRefId = (ref) => {
        return getDocumentId(ref);
      };
      partData.clientFromId = getStoredClientId(partData, "from");
      partData.clientCurrentId = getStoredClientId(partData, "current");
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

      const machineRef = getStoredMachineId(partData, "from");
      const currentMachineRef = getStoredMachineId(partData, "current");

      partData.machineFromId = machineRef;
      partData.machineCurrentId = currentMachineRef;
      partData.currentMachineId = currentMachineRef;

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
  pageOffset = 0,
  startAfterDoc = null,
  visibleOnly = false,
  filterFn = null,
  needsMachineData = true,
  search = null,
  queryOverride = null,
  queryOverrideLabel = "",
  allowLegacyScanFallback = true,
  signal = null,
  selectedClientFrom = null,
  selectedClientCurrent = null,
  debugLabel = "",
  onDebug = null,
} = {}) {
  const db = firebase.firestore();
  const limit = pageSize + 1;
  const normalizedPageOffset = Math.max(0, Number(pageOffset) || 0);
  const startedAt = Date.now();
  const throwIfAborted = () => {
    if (!signal?.aborted) return;
    const error = new Error("Inventory search cancelled.");
    error.name = "AbortError";
    throw error;
  };
  throwIfAborted();
  let scannedDocs = 0;
  let scannedBatches = 0;
  let machineQueryCount = 0;
  let clientPrefilterRejected = 0;
  let visibleRejected = 0;
  let filterRejected = 0;
  const acceptedDocIds = [];
  const corruptDocs = [];
  const batchDebug = [];
  const initialSearchRaw = (search?.raw || "").toString().trim();
  const hasSearchRequest = Boolean(initialSearchRaw);
  const scanBatchLimit = Math.max(
    limit,
    Math.min(250, Math.max(pageSize * 8, hasSearchRequest ? 250 : 0))
  );
  const clientPrefilterTarget = Math.max(
    limit * 4,
    normalizedPageOffset + limit,
    100
  );
  const clientMachineQueryBudget = 12;

  const getRefId = (ref) => {
    return getDocumentId(ref);
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

  emitDebug("request:start", {
    pageSize,
    pageOffset: normalizedPageOffset,
    startAfterId: startAfterDoc?.id || null,
    visibleOnly,
    needsMachineData,
    selectedClientFrom,
    selectedClientCurrent,
    searchType: search?.type || null,
    searchRaw: search?.raw || "",
    queryOverrideLabel,
  });

  const fetchMachineIdsForClient = async (clientId, type) => {
    if (!clientId) return null;

    const machineLookupStartedAt = Date.now();
    emitDebug("client-machine-ids:start", { type, clientId });
    const cacheKey = String(clientId);
    const cached = clientMachineIdsCache.get(cacheKey);
    if (
      cached &&
      Date.now() - Number(cached.at || 0) < CLIENT_MACHINE_IDS_CACHE_TTL_MS
    ) {
      emitDebug("client-machine-ids:cache-hit", {
        type,
        clientId,
        machineIdCount: cached.ids.length,
        phaseElapsedMs: Date.now() - machineLookupStartedAt,
      });
      return new Set(cached.ids);
    }

    const ids = new Set();
    const clientRef = db.collection("Client").doc(clientId);
    const queries = [
      db.collection("Machine").where("client", "==", clientRef),
      db.collection("Machine").where("client", "==", clientId),
    ];

    for (let queryIndex = 0; queryIndex < queries.length; queryIndex += 1) {
      const queryStartedAt = Date.now();
      const query = queries[queryIndex];
      const snap = await query.get();
      snap.forEach((docSnap) => ids.add(docSnap.id));
      emitDebug("client-machine-ids:query-done", {
        type,
        clientId,
        queryIndex,
        size: snap.size,
        idsSoFar: ids.size,
        queryElapsedMs: Date.now() - queryStartedAt,
      });
    }

    emitDebug("client-machine-ids:done", {
      type,
      clientId,
      machineIdCount: ids.size,
      phaseElapsedMs: Date.now() - machineLookupStartedAt,
    });
    clientMachineIdsCache.set(cacheKey, {
      ids: Array.from(ids),
      at: Date.now(),
    });
    return ids;
  };

  let clientFromMachineIds = null;
  let clientCurrentMachineIds = null;

  const getMachineIdsForClient = async (type) => {
    if (type === "from") {
      if (clientFromMachineIds == null) {
        clientFromMachineIds = await fetchMachineIdsForClient(
          selectedClientFrom,
          type
        );
      }
      return clientFromMachineIds;
    }
    if (clientCurrentMachineIds == null) {
      clientCurrentMachineIds = await fetchMachineIdsForClient(
        selectedClientCurrent,
        type
      );
    }
    return clientCurrentMachineIds;
  };

  const rawMatchesClientSelection = (raw, type) => {
    const selectedClient =
      type === "from" ? selectedClientFrom : selectedClientCurrent;
    if (!selectedClient) return true;

    const directClientId = getStoredClientId(raw, type);
    // An explicit item-level client is the historical/current snapshot for
    // this branch. Never let the machine's newer client override a mismatch.
    if (directClientId) return directClientId === selectedClient;

    const machineId = getStoredMachineId(raw, type);
    const machineIds =
      type === "from" ? clientFromMachineIds : clientCurrentMachineIds;
    return Boolean(machineId && machineIds?.has(machineId));
  };

  const rawMatchesClientSelections = (raw) =>
    rawMatchesClientSelection(raw, "from") &&
    rawMatchesClientSelection(raw, "current");

  const fetchMachineMap = async (ids) => {
    if (!ids.length) return {};

    const phaseStartedAt = Date.now();
    const uniqueIds = Array.from(new Set(ids.filter(Boolean)));
    if (!uniqueIds.length) return {};
    emitDebug("machine-map:start", {
      requestedIds: ids.length,
      uniqueIds: uniqueIds.length,
      cachedIds: uniqueIds.length - uniqueIds.filter((id) => !machineCache.has(id)).length,
    });

    const missingIds = uniqueIds.filter((id) => !machineCache.has(id));
    for (let i = 0; i < missingIds.length; i += 10) {
      const chunkStartedAt = Date.now();
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
        machineCache.set(docSnap.id, sanitizeMachineDataForList(machineData));
      });

      // Cache misses too, so we don't re-query the same non-existent ids.
      chunk.forEach((id) => {
        if (!found.has(id)) machineCache.set(id, null);
      });
      emitDebug("machine-map:chunk-done", {
        chunkIndex: Math.floor(i / 10),
        chunkSize: chunk.length,
        foundCount: found.size,
        queryElapsedMs: Date.now() - chunkStartedAt,
      });
    }

    const out = {};
    uniqueIds.forEach((id) => {
      const data = machineCache.get(id);
      if (data) out[id] = data;
    });
    emitDebug("machine-map:done", {
      requestedIds: ids.length,
      uniqueIds: uniqueIds.length,
      missingIds: missingIds.length,
      resolvedIds: Object.keys(out).length,
      phaseElapsedMs: Date.now() - phaseStartedAt,
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
    partData.clientFromId = getStoredClientId(partData, "from");
    partData.clientCurrentId = getStoredClientId(partData, "current");

    const machineId = getStoredMachineId(partData, "from");
    const currentMachineId = getStoredMachineId(partData, "current");

    partData.machineFromId = machineId;
    partData.machineCurrentId = currentMachineId;
    partData.currentMachineId = currentMachineId;

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

  const getClientQueryMatches = async ({ type, clientId }) => {
    if (!clientId) return null;

    const phaseStartedAt = Date.now();
    emitDebug("client-query-matches:start", {
      type,
      clientId,
      startAfterId: startAfterDoc?.id || null,
      clientPrefilterTarget,
    });
    const directFields =
      type === "from"
        ? ["ClientFrom", "clientFromId"]
        : ["ClientCurrent", "clientCurrentId"];
    const clientRef = db.collection("Client").doc(clientId);
    const docMap = new Map();
    const directQueries = [];
    const startAfterId = startAfterDoc?.id || null;
    const pageQueryLimit = clientPrefilterTarget;
    const applyPageWindow = (query, queryLimit = pageQueryLimit) => {
      let nextQuery = query.orderBy(firebase.firestore.FieldPath.documentId());
      if (startAfterId) nextQuery = nextQuery.startAfter(startAfterId);
      return nextQuery.limit(queryLimit);
    };

    directFields.forEach((field) => {
      directQueries.push(
        applyPageWindow(db.collection("Test").where(field, "==", clientRef))
      );
      directQueries.push(
        applyPageWindow(db.collection("Test").where(field, "==", clientId))
      );
    });

    for (let queryIndex = 0; queryIndex < directQueries.length; queryIndex += 1) {
      const queryStartedAt = Date.now();
      const query = directQueries[queryIndex];
      scannedBatches += 1;
      const snap = await query.get();
      scannedDocs += snap.size;
      snap.forEach((docSnap) => {
        docMap.set(docSnap.id, docSnap);
      });
      emitDebug("client-direct-query:done", {
        type,
        clientId,
        queryIndex,
        size: snap.size,
        docMapSize: docMap.size,
        firstDocId: snap.docs[0]?.id || null,
        lastDocId: snap.docs[snap.docs.length - 1]?.id || null,
        queryElapsedMs: Date.now() - queryStartedAt,
      });
    }

    if (docMap.size >= clientPrefilterTarget) {
      emitDebug("client-query-matches:done", {
        type,
        clientId,
        mode: "direct",
        docMapSize: docMap.size,
        phaseElapsedMs: Date.now() - phaseStartedAt,
      });
      return docMap;
    }

    const machineFields =
      type === "from"
        ? ["Machine", "MachineFrom"]
        : ["CurrentMachine", "MachineCurrent"];
    const machineQueries = [];
    const machineIds = await getMachineIdsForClient(type);
    const machineIdList = Array.from(machineIds || []);
    const machineRefs = machineIdList.map((id) => db.collection("Machine").doc(id));
    for (const field of machineFields) {
      for (let i = 0; i < machineRefs.length; i += 10) {
        machineQueries.push(
          applyPageWindow(
            db.collection("Test").where(field, "in", machineRefs.slice(i, i + 10))
          )
        );
      }
      for (let i = 0; i < machineIdList.length; i += 10) {
        machineQueries.push(
          applyPageWindow(
            db.collection("Test").where(field, "in", machineIdList.slice(i, i + 10))
          )
        );
      }
    }
    emitDebug("client-machine-queries:built", {
      type,
      clientId,
      machineIdCount: machineIdList.length,
      machineQueriesAvailable: machineQueries.length,
      docMapSize: docMap.size,
    });

    let machineQueriesUsed = 0;
    for (const query of machineQueries) {
      if (docMap.size >= clientPrefilterTarget) break;
      if (machineQueriesUsed >= clientMachineQueryBudget) {
        batchDebug.push({
          event: "client-prefilter-budget-exhausted",
          type,
          clientId,
          directMatches: docMap.size,
          machineQueriesUsed,
          machineQueriesAvailable: machineQueries.length,
        });
        break;
      }
      machineQueriesUsed += 1;
      const queryStartedAt = Date.now();
      scannedBatches += 1;
      const snap = await query.get();
      scannedDocs += snap.size;
      snap.forEach((docSnap) => {
        docMap.set(docSnap.id, docSnap);
      });
      emitDebug("client-machine-query:done", {
        type,
        clientId,
        queryIndex: machineQueriesUsed - 1,
        size: snap.size,
        docMapSize: docMap.size,
        firstDocId: snap.docs[0]?.id || null,
        lastDocId: snap.docs[snap.docs.length - 1]?.id || null,
        queryElapsedMs: Date.now() - queryStartedAt,
      });
    }

    emitDebug("client-query-matches:done", {
      type,
      clientId,
      mode: "direct-plus-machine",
      docMapSize: docMap.size,
      machineQueriesUsed,
      phaseElapsedMs: Date.now() - phaseStartedAt,
    });
    return docMap;
  };

  const fetchClientPrefilterDocs = async () => {
    if (!selectedClientFrom && !selectedClientCurrent) return null;

    const phaseStartedAt = Date.now();
    emitDebug("client-prefilter:start", {
      selectedClientFrom,
      selectedClientCurrent,
      startAfterId: startAfterDoc?.id || null,
    });
    const [fromMatches, currentMatches] = await Promise.all([
      getClientQueryMatches({
        type: "from",
        clientId: selectedClientFrom,
      }),
      getClientQueryMatches({
        type: "current",
        clientId: selectedClientCurrent,
      }),
    ]);

    let docMap = fromMatches || currentMatches || new Map();
    if (fromMatches && currentMatches) {
      docMap = new Map(
        [...fromMatches].filter(([id]) => currentMatches.has(id))
      );
    }

    const docs = [...docMap.values()].sort((a, b) => a.id.localeCompare(b.id));
    emitDebug("client-prefilter:done", {
      fromMatchCount: fromMatches?.size || 0,
      currentMatchCount: currentMatches?.size || 0,
      mergedCount: docs.length,
      firstDocId: docs[0]?.id || null,
      lastDocId: docs[docs.length - 1]?.id || null,
      phaseElapsedMs: Date.now() - phaseStartedAt,
    });
    return docs;
  };

  const clientPrefilterDocs = hasSearchRequest
    ? null
    : await fetchClientPrefilterDocs();
  if (!clientPrefilterDocs && (selectedClientFrom || selectedClientCurrent)) {
    await Promise.all([
      selectedClientFrom ? getMachineIdsForClient("from") : Promise.resolve(null),
      selectedClientCurrent
        ? getMachineIdsForClient("current")
        : Promise.resolve(null),
    ]);
  }

  if (clientPrefilterDocs) {
    activeSearchMode = "client-query";
    emitDebug("client-page:start", {
      candidateDocs: clientPrefilterDocs.length,
      startAfterId: startAfterDoc?.id || null,
    });
    const startAfterId = startAfterDoc?.id || null;
    const startIndex = startAfterId
      ? clientPrefilterDocs.findIndex((docSnap) => docSnap.id === startAfterId) + 1
      : 0;
    const visibleDocs = clientPrefilterDocs.slice(Math.max(0, startIndex));
    const matchedDocs = [];
    const targetMatchCount = normalizedPageOffset + pageSize + 1;
    const candidateWindowSize = Math.max(
      targetMatchCount,
      Math.min(180, Math.max(pageSize * 4, targetMatchCount))
    );

    for (
      let offset = 0;
      offset < visibleDocs.length && matchedDocs.length < targetMatchCount;
      offset += candidateWindowSize
    ) {
      const windowStartedAt = Date.now();
      const windowDocs = visibleDocs.slice(offset, offset + candidateWindowSize);
      const machineIds = new Set();
      const currentMachineIds = new Set();

      windowDocs.forEach((docSnap) => {
        try {
          const raw = docSnap.data() || {};
          if (visibleOnly && raw.visible === false) return;
          const machineId = getStoredMachineId(raw, "from");
          const currentMachineId = getStoredMachineId(raw, "current");
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
      emitDebug("client-page:machine-maps-done", {
        offset,
        windowDocs: windowDocs.length,
        machineIds: machineIds.size,
        currentMachineIds: currentMachineIds.size,
        machineMapSize: Object.keys(machineMap).length,
        currentMachineMapSize: Object.keys(currentMachineMap).length,
      });

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
          if (matchedDocs.length >= targetMatchCount) break;
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
      emitDebug("client-page:window-done", {
        offset,
        windowDocs: windowDocs.length,
        matchedDocs: matchedDocs.length,
        visibleRejected,
        clientPrefilterRejected,
        filterRejected,
        phaseElapsedMs: Date.now() - windowStartedAt,
      });
    }

    const pageMatches = matchedDocs.slice(
      normalizedPageOffset,
      normalizedPageOffset + pageSize
    );
    pageMatches.forEach(({ docSnap }) => acceptedDocIds.push(docSnap.id));
    const hasExtraMatch =
      matchedDocs.length > normalizedPageOffset + pageSize;

    return {
      parts: pageMatches.map(({ built }) => built),
      lastDoc: pageMatches.length
        ? pageMatches[pageMatches.length - 1].docSnap
        : null,
      hasNextPage: hasExtraMatch,
      debug: {
        ...buildDebug(),
        clientCandidateDocs: clientPrefilterDocs.length,
        clientRemainingDocs: visibleDocs.length,
        pageOffset: normalizedPageOffset,
      },
    };
  }

  const searchRaw = initialSearchRaw;
  const searchLower = (search?.lower || "").toString().trim();
  const normalizeSearchType = (value) => {
    const normalized = String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
    switch (normalized) {
      case "general":
        return "General";
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

  const buildSearchQuery = () => {
    if (queryOverride) {
      return {
        mode: "query",
        query: queryOverride,
        fallback: null,
        allowScanFallback: false,
      };
    }
    if (!hasSearch || !searchType) {
      return { mode: "scan", query: null, fallback: null, allowScanFallback: false };
    }
    const col = db.collection("Test");

    switch (searchType) {
      case "SKU":
        return { mode: "sku", query: null, fallback: null, allowScanFallback: false };
      case "General": {
        const terms = searchLower.split(/[^a-z0-9]+/).filter(Boolean);
        const primaryToken = [...new Set(terms)].sort((a, b) => {
          if (b.length !== a.length) return b.length - a.length;
          return a.localeCompare(b);
        })[0];
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
          query: col.where(
            "generalSearchTokens",
            "array-contains",
            primaryToken
          ),
          // This catches exact legacy name tokens while the full search index
          // is being backfilled. If both token paths miss, scan legacy docs so
          // older inventory is still searchable.
          fallback: () =>
            col.where("nameTokens", "array-contains", primaryToken),
          allowScanFallback: allowLegacyScanFallback,
        };
      }
      case "Name": {
        const terms = searchLower.split(/[^a-z0-9]+/).filter(Boolean);
        const primaryToken = [...new Set(terms)].sort((a, b) => {
          if (b.length !== a.length) return b.length - a.length;
          return a.localeCompare(b);
        })[0];
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
          query: col.where("nameTokens", "array-contains", primaryToken),
          fallback: null,
          allowScanFallback: allowLegacyScanFallback,
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
          // Legacy items may not have workOrderTokens yet, so fall through to
          // a scan when indexed token queries do not find the item.
          allowScanFallback: allowLegacyScanFallback,
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
      case "Date":
        // Creation dates exist in more than one legacy field and type.
        return { mode: "scan", query: null, fallback: null, allowScanFallback: false };
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
    throwIfAborted();
    const docs = [];
    const digits = searchRaw.replace(/^ais/i, "").replace(/\D/g, "").slice(0, 5);
    const skuPrefix = `AIS${digits}`;
    let skuQuery = db
      .collection("Test")
      .orderBy(firebase.firestore.FieldPath.documentId());
    skuQuery = startAfterDoc
      ? skuQuery.startAfter(startAfterDoc)
      : skuQuery.startAt(skuPrefix);
    skuQuery = skuQuery.endAt(`${skuPrefix}\uf8ff`);
    const skuSnap = await skuQuery
      .limit(normalizedPageOffset + limit)
      .get();
    throwIfAborted();
    skuSnap.forEach((doc) => docs.push(doc));
    scannedDocs += docs.length;
    scannedBatches += 1;

    let machineMap = {};
    let currentMachineMap = {};
    if (needsMachineData && docs.length) {
      const machineIds = new Set();
      const currentMachineIds = new Set();
      for (const docSnap of docs) {
        const raw = docSnap.data();
        const machineId = getStoredMachineId(raw, "from");
        const currentMachineId = getStoredMachineId(raw, "current");
        if (machineId) machineIds.add(machineId);
        if (currentMachineId) currentMachineIds.add(currentMachineId);
      }
      [machineMap, currentMachineMap] = await Promise.all([
        fetchMachineMap([...machineIds]),
        fetchMachineMap([...currentMachineIds]),
      ]);
    }

    const builtEntries = docs
      .map((docSnap) => ({
        docSnap,
        item: buildPart(docSnap, machineMap, currentMachineMap),
      }))
      .filter(({ item }) => (!visibleOnly || item?.visible !== false))
      .filter(({ item }) => (filterFn ? filterFn(item) : true));
    const pageEntries = builtEntries.slice(
      normalizedPageOffset,
      normalizedPageOffset + pageSize
    );

    return {
      parts: pageEntries.map(({ item }) => item),
      lastDoc: pageEntries.length
        ? pageEntries[pageEntries.length - 1].docSnap
        : null,
      hasNextPage: builtEntries.length > normalizedPageOffset + pageSize,
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
  let skippedMatches = 0;
  const matchedDocIds = new Set();
  const scanBaseQuery = db
    .collection("Test")
    .orderBy(firebase.firestore.FieldPath.documentId());

  while (true) {
    throwIfAborted();
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
    throwIfAborted();
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
        const machineId = getStoredMachineId(raw, "from");
        const currentMachineId = getStoredMachineId(raw, "current");
        if (machineId) machineIds.add(machineId);
        if (currentMachineId) currentMachineIds.add(currentMachineId);
      }

      [machineMap, currentMachineMap] = await Promise.all([
        fetchMachineMap([...machineIds]),
        fetchMachineMap([...currentMachineIds]),
      ]);
    }

    for (let i = 0; i < snap.docs.length; i++) {
      throwIfAborted();
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

      if (matchedDocIds.has(doc.id)) {
        continue;
      }
      matchedDocIds.add(doc.id);

      if (skippedMatches < normalizedPageOffset) {
        skippedMatches += 1;
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
        const machineRefs = [
          ...(Array.isArray(client.machines) ? client.machines : []),
          ...(Array.isArray(client.Machines) ? client.Machines : []),
        ];
        if (!machineRefs.length) return null;

        const machineDocs = await Promise.all(
          machineRefs
            .filter((machineRef) => machineRef && typeof machineRef.get === "function")
            .map((machineRef) => machineRef.get())
        );

        const hasMatch = machineDocs.some((machineDoc) => {
          if (!machineDoc?.exists) return false;
          const rawMachineData = machineDoc.data() || {};
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

export async function fetchMachinesForClient(clientId) {
  if (!clientId) return [];

  const db = firebase.firestore();
  const clientRef = db.collection("Client").doc(clientId);
  const machineDocs = new Map();
  const addSnapshot = (snapshot) => {
    snapshot?.docs?.forEach((doc) => machineDocs.set(doc.id, doc));
  };

  const [clientResult, referenceQueryResult, idQueryResult] =
    await Promise.allSettled([
      clientRef.get(),
      db.collection("Machine").where("client", "==", clientRef).get(),
      db.collection("Machine").where("client", "==", clientId).get(),
    ]);

  const primaryFailure = [
    clientResult,
    referenceQueryResult,
    idQueryResult,
  ].find((result) => result.status === "rejected");
  if (primaryFailure) {
    throw primaryFailure.reason || new Error("Machine lookup failed.");
  }

  if (referenceQueryResult.status === "fulfilled") {
    addSnapshot(referenceQueryResult.value);
  }
  if (idQueryResult.status === "fulfilled") {
    addSnapshot(idQueryResult.value);
  }

  if (clientResult.status === "fulfilled" && clientResult.value.exists) {
    const clientData = clientResult.value.data() || {};
    const machineRefs = Array.from(
      new Map(
        [
          ...(Array.isArray(clientData.machines) ? clientData.machines : []),
          ...(Array.isArray(clientData.Machines) ? clientData.Machines : []),
        ].map((machineRef) => {
          const rawId =
            typeof machineRef === "string"
              ? machineRef
              : machineRef?.id || machineRef?.path || "";
          const segments = String(rawId).split("/").filter(Boolean);
          return [segments[segments.length - 1] || rawId, machineRef];
        })
      ).values()
    );
    const linkedMachineResults = await Promise.allSettled(
      machineRefs.map((machineRef) => {
        if (typeof machineRef?.get === "function") return machineRef.get();
        const rawLinkedMachineId =
          typeof machineRef === "string"
            ? machineRef
            : machineRef?.id || machineRef?.path;
        const linkedMachineId = String(rawLinkedMachineId || "")
          .split("/")
          .filter(Boolean)
          .pop();
        return linkedMachineId
          ? db.collection("Machine").doc(linkedMachineId).get()
          : Promise.resolve(null);
      })
    );

    const linkedFailure = linkedMachineResults.find(
      (result) => result.status === "rejected"
    );
    if (linkedFailure) {
      throw linkedFailure.reason || new Error("Linked machine lookup failed.");
    }

    linkedMachineResults.forEach((result) => {
      if (
        result.status === "fulfilled" &&
        result.value?.exists &&
        result.value.id
      ) {
        machineDocs.set(result.value.id, result.value);
      }
    });
  }

  return [...machineDocs.values()]
    .map((doc) => {
      const data = sanitizeMachineDataForList(doc.data() || {}) || {};
      const generatedName = [data.OEM, data.Modality, data.Model]
        .filter(Boolean)
        .join(" ");
      return {
        id: doc.id,
        ...data,
        name: data.name || generatedName || doc.id,
      };
    })
    .sort((a, b) => {
      const nameComparison = String(a.name || "").localeCompare(
        String(b.name || ""),
        undefined,
        { sensitivity: "base" }
      );
      return nameComparison || a.id.localeCompare(b.id);
    });
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
