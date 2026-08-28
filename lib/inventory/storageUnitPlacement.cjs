"use strict";

const crypto = require("node:crypto");
const storageUnitContract = require("./storageUnitContract.cjs");
const storageUnitDetail = require("./storageUnitDetail.cjs");

const STORAGE_UNIT_COLLECTION = "StorageUnits";
const TEST_COLLECTION = "Test";
const ITEM_HISTORY_COLLECTION = "StoragePlacementHistory";
const UNIT_HISTORY_COLLECTION = "StoragePlacementHistory";
const SKU_FIELDS = Object.freeze(["id", "localSN", "local_sn", "sku", "aisNumber"]);
const MAX_SCAN_CODE_LENGTH = 200;
const MAX_SELECTED_EVENTS = 100;
const MAX_CONFIRM_WRITES = 400;

class StoragePlacementError extends Error {
  constructor(code, message, statusCode = 400, details = undefined) {
    super(message);
    this.name = "StoragePlacementError";
    this.code = code;
    this.statusCode = statusCode;
    if (details !== undefined) this.details = details;
  }
}

function clean(value, maxLength = 500) {
  return String(value == null ? "" : value).trim().slice(0, maxLength);
}

function sha256Text(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex");
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function normalizeSkuCode(value) {
  const trimmed = clean(value, MAX_SCAN_CODE_LENGTH);
  if (!trimmed || /[\u0000-\u001f\u007f]/.test(trimmed)) return "";
  const aisMatch = trimmed.match(/^AIS[\s_-]*(\d+)$/i);
  if (aisMatch) return `AIS${aisMatch[1]}`;
  return trimmed.toUpperCase();
}

function getSkuLookupValues(value) {
  const trimmed = clean(value, MAX_SCAN_CODE_LENGTH);
  const normalized = normalizeSkuCode(trimmed);
  if (!trimmed || !normalized) return [];
  const values = new Set([trimmed]);
  const aisMatch = trimmed.match(/^AIS[\s_-]*(\d+)$/i);
  if (aisMatch) {
    const digits = aisMatch[1];
    for (const candidate of [
      `AIS${digits}`,
      `ais${digits}`,
      `AIS ${digits}`,
      `AIS-${digits}`,
      `AIS_${digits}`,
    ]) {
      values.add(candidate);
    }
  } else {
    values.add(trimmed.toUpperCase());
    values.add(trimmed.toLowerCase());
  }
  return Array.from(values).slice(0, 10);
}

function itemIdentityValues(id, data = {}) {
  return unique([
    clean(id, MAX_SCAN_CODE_LENGTH),
    ...SKU_FIELDS.map((field) => clean(data?.[field], MAX_SCAN_CODE_LENGTH)),
  ]);
}

function hasMatchingIdentity(id, data, normalizedCode) {
  return itemIdentityValues(id, data).some(
    (value) => normalizeSkuCode(value) === normalizedCode
  );
}

function safePreviewValues(value, maxEntries = 8) {
  const values = Array.isArray(value) ? value : value == null ? [] : [value];
  return unique(values.map((entry) => clean(entry, 160))).slice(0, maxEntries);
}

function sanitizeItemPreview(id, data = {}) {
  return {
    id: clean(id, 200),
    localSN: clean(data.localSN || data.local_sn || id, 200),
    name: clean(data.name, 300),
    pn: safePreviewValues(data.pn ?? data.partNumber),
    sn: safePreviewValues(data.sn ?? data.serialNumber),
    hidden: data.visible === false || data.attached === true,
  };
}

function resolution(status, values = {}) {
  return {
    status,
    kind: values.kind || null,
    code: clean(values.code, MAX_SCAN_CODE_LENGTH),
    canonicalCode: clean(values.canonicalCode, MAX_SCAN_CODE_LENGTH),
    ...(values.itemId ? { itemId: clean(values.itemId, 200) } : {}),
    ...(values.storageUnitId
      ? { storageUnitId: storageUnitContract.normalizeStorageUnitId(values.storageUnitId) }
      : {}),
    ...(values.preview ? { preview: values.preview } : {}),
    message: clean(values.message, 500),
  };
}

async function readReference(referenceOrQuery, transaction) {
  return transaction
    ? transaction.get(referenceOrQuery)
    : referenceOrQuery.get();
}

function docsFromSnapshot(snapshot) {
  if (!snapshot) return [];
  if (Array.isArray(snapshot.docs)) return snapshot.docs;
  return snapshot.exists === undefined ? [] : [snapshot];
}

async function resolveItemScan({ db, rawCode, transaction }) {
  const code = clean(rawCode, MAX_SCAN_CODE_LENGTH);
  const normalizedCode = normalizeSkuCode(code);
  const lookupValues = getSkuLookupValues(code);
  if (!normalizedCode || !lookupValues.length) {
    return resolution("invalid", {
      code,
      message: "Scan a complete item SKU or storage-unit code.",
    });
  }

  const candidates = new Map();
  const collection = db.collection(TEST_COLLECTION);
  for (const documentId of lookupValues) {
    const snapshot = await readReference(collection.doc(documentId), transaction);
    if (snapshot.exists) candidates.set(snapshot.id, snapshot);
  }
  for (const field of SKU_FIELDS) {
    const query = lookupValues.length === 1
      ? collection.where(field, "==", lookupValues[0]).limit(10)
      : collection.where(field, "in", lookupValues).limit(10);
    const snapshot = await readReference(query, transaction);
    for (const document of docsFromSnapshot(snapshot)) {
      candidates.set(document.id, document);
    }
  }

  const matches = Array.from(candidates.values()).filter((snapshot) =>
    hasMatchingIdentity(snapshot.id, snapshot.data() || {}, normalizedCode)
  );
  if (matches.length === 0) {
    return resolution("unknown", {
      code,
      canonicalCode: normalizedCode,
      message: "No inventory item matches this exact SKU.",
    });
  }
  if (matches.length > 1) {
    return resolution("ambiguous", {
      code,
      canonicalCode: normalizedCode,
      message: `This SKU matches ${matches.length} inventory items and cannot be placed safely.`,
    });
  }
  const match = matches[0];
  return resolution("resolved", {
    kind: "item",
    code,
    canonicalCode: match.id,
    itemId: match.id,
    preview: sanitizeItemPreview(match.id, match.data() || {}),
    message: "Item ready to stage.",
  });
}

function targetAllowsScannedKind(target, scanned) {
  if (!target) return true;
  if (target.type === "bin") return scanned.type === "item";
  if (target.type === "pallet") {
    return scanned.type === "item" || scanned.type === "bin";
  }
  return false;
}

async function resolveStorageUnitScan({
  db,
  rawCode,
  targetUnitId = "",
  transaction = null,
} = {}) {
  if (!db || typeof db.collection !== "function") {
    throw new TypeError("A Firestore database is required.");
  }
  const rawText = String(rawCode == null ? "" : rawCode).trim();
  const code = clean(rawText, MAX_SCAN_CODE_LENGTH);
  if (
    !code ||
    rawText.length > MAX_SCAN_CODE_LENGTH ||
    /[\u0000-\u001f\u007f]/.test(rawText)
  ) {
    return resolution("invalid", {
      code,
      message: "Scan a complete item SKU or storage-unit code.",
    });
  }
  const target = targetUnitId
    ? storageUnitContract.parseStorageUnitId(targetUnitId)
    : null;
  if (targetUnitId && !target) {
    return resolution("invalid", {
      code,
      message: "The target storage unit is invalid.",
    });
  }

  const reservedUnit = storageUnitContract.parseStorageUnitId(code, { allowZero: true });
  if (reservedUnit?.number === 0) {
    return resolution("invalid", {
      kind: reservedUnit.type,
      code,
      canonicalCode: reservedUnit.id,
      storageUnitId: reservedUnit.id,
      message: "Storage-unit zero is reserved and cannot receive inventory.",
    });
  }
  const scannedUnit = storageUnitContract.parseStorageUnitId(code);
  if (scannedUnit) {
    if (!targetAllowsScannedKind(target, { type: scannedUnit.type })) {
      return resolution("invalid", {
        kind: scannedUnit.type,
        code,
        canonicalCode: scannedUnit.id,
        storageUnitId: scannedUnit.id,
        message: target?.type === "bin"
          ? "Bins accept item scans only."
          : "Pallets may accept items or bins, not another pallet.",
      });
    }
    const snapshot = await readReference(
      db.collection(STORAGE_UNIT_COLLECTION).doc(scannedUnit.id),
      transaction
    );
    if (!snapshot.exists) {
      return resolution("unknown", {
        kind: scannedUnit.type,
        code,
        canonicalCode: scannedUnit.id,
        storageUnitId: scannedUnit.id,
        message: `${scannedUnit.id} is not present in StorageUnits.`,
      });
    }
    const data = snapshot.data() || {};
    const storedCode = storageUnitContract.normalizeStorageUnitId(
      data.code || snapshot.id
    );
    const storedKind = clean(data.kind || data.type, 20).toLowerCase();
    if (storedCode !== scannedUnit.id || (storedKind && storedKind !== scannedUnit.type)) {
      return resolution("ambiguous", {
        kind: scannedUnit.type,
        code,
        canonicalCode: scannedUnit.id,
        storageUnitId: scannedUnit.id,
        message: `${scannedUnit.id} has conflicting stored identity fields.`,
      });
    }
    return resolution("resolved", {
      kind: scannedUnit.type,
      code,
      canonicalCode: scannedUnit.id,
      storageUnitId: scannedUnit.id,
      preview: {
        id: scannedUnit.id,
        name: clean(data.name, 300) || `${scannedUnit.type === "bin" ? "Bin" : "Pallet"} ${scannedUnit.number}`,
        displayNumber: clean(data.displayNumber, 40) || String(scannedUnit.number),
      },
      message: `${scannedUnit.id} ready to stage.`,
    });
  }

  const itemResult = await resolveItemScan({ db, rawCode: code, transaction });
  if (
    itemResult.status === "resolved" &&
    target &&
    !targetAllowsScannedKind(target, { type: "item" })
  ) {
    return resolution("invalid", {
      code,
      canonicalCode: itemResult.canonicalCode,
      message: "This item cannot be placed in the selected storage unit.",
    });
  }
  return itemResult;
}

async function resolveStorageScanCode(db, rawCode, options = {}) {
  return resolveStorageUnitScan({
    db,
    rawCode,
    targetUnitId: options.targetUnitId || "",
    transaction: options.transaction || null,
  });
}

function referenceId(value) {
  if (!value) return "";
  if (typeof value === "string" || typeof value === "number") {
    const pieces = clean(value, 500).split("/").filter(Boolean);
    return pieces.at(-1) || "";
  }
  if (value.id) return clean(value.id, 200);
  if (value.path) {
    return clean(value.path, 500).split("/").filter(Boolean).at(-1) || "";
  }
  return "";
}

function canonicalCurrentLocation(data = {}) {
  const current = data.newLocalCurrent && typeof data.newLocalCurrent === "object"
    ? data.newLocalCurrent
    : {};
  return {
    ...current,
    region: current.region ?? data.region ?? data.Region ?? "",
    section: current.section ?? data.section ?? data.Section ?? null,
    bin: current.bin ?? data.bin ?? data.Bin ?? "",
    pallet: current.pallet ?? data.pallet ?? data.Pallet ?? "",
  };
}

function normalizeContainerId(value, prefix) {
  const leaf = referenceId(value);
  const match = leaf.match(new RegExp(`^(?:${prefix}[\\s_-]*)?(\\d+)$`, "i"));
  if (!match) return "";
  const number = Number(match[1]);
  return Number.isSafeInteger(number) && number > 0 ? `${prefix}${number}` : "";
}

function confirmedUnitLocation(data = {}) {
  if (clean(data.locationStatus, 40).toLowerCase() !== "confirmed") return null;
  const canonical = storageUnitDetail.normalizeWarehouseLocation(data.warehouseLocation);
  if (!canonical.complete) return null;
  const locations = storageUnitDetail.uniqueCompleteLocations([
    data.warehouseLocation,
    ...(Array.isArray(data.locationCandidates) ? data.locationCandidates : []),
  ]);
  if (locations.length !== 1 || locations[0].key !== canonical.key) return null;
  return {
    region: canonical.region,
    section: { ...canonical.section },
  };
}

function confirmedParentPalletId(data = {}) {
  if (clean(data.parentStatus, 40).toLowerCase() !== "confirmed") return "";
  const parsed = storageUnitContract.parseStorageUnitId(data.parentPalletId);
  return parsed?.type === "pallet" ? parsed.id : "";
}

function formatCurrentLocation(value = {}) {
  const parts = [];
  if (value.region) parts.push(String(value.region));
  if (value.section?.letter && value.section?.number !== "") {
    parts.push(`${value.section.letter}${value.section.number}`);
  }
  if (value.bin) parts.push(`B${value.bin}`);
  if (value.pallet) parts.push(`P${value.pallet}`);
  return parts.join("–");
}

function buildNextItemPlacement({ itemData, target, sourceBinId = "" }) {
  const previousNewLocalCurrent = Object.prototype.hasOwnProperty.call(
    itemData,
    "newLocalCurrent"
  )
    ? itemData.newLocalCurrent
    : null;
  const before = canonicalCurrentLocation(itemData);
  const next = { ...before };
  const verifiedLocation = confirmedUnitLocation(target.data);
  if (verifiedLocation) {
    next.region = verifiedLocation.region;
    next.section = { ...verifiedLocation.section };
  }
  if (target.kind === "bin") {
    next.bin = target.number;
    const parentPalletId = confirmedParentPalletId(target.data);
    next.pallet = parentPalletId
      ? storageUnitContract.parseStorageUnitId(parentPalletId).number
      : "";
  } else if (sourceBinId) {
    next.bin = storageUnitContract.parseStorageUnitId(sourceBinId).number;
    next.pallet = target.number;
  } else {
    next.bin = "";
    next.pallet = target.number;
  }
  if (!next.region) delete next.region;
  if (!next.section?.letter || next.section?.number === "" || next.section?.number == null) {
    delete next.section;
  } else {
    next.section = {
      letter: clean(next.section.letter, 20).toUpperCase(),
      number: next.section.number,
    };
  }
  return {
    before,
    previousNewLocalCurrent,
    after: next,
    locationVerified: Boolean(verifiedLocation),
    localLocCurrent: formatCurrentLocation(next),
  };
}

function placementConfirmationKey(sessionId, eventIds) {
  return sha256Text(
    JSON.stringify({
      sessionId: clean(sessionId, 200),
      eventIds: [...eventIds].map((value) => clean(value, 300)).sort(),
    })
  );
}

function validateSelectedEventIds(eventIds) {
  if (!Array.isArray(eventIds) || eventIds.length === 0) {
    throw new StoragePlacementError(
      "empty_selection",
      "Select at least one staged scan before confirming."
    );
  }
  if (eventIds.length > MAX_SELECTED_EVENTS) {
    throw new StoragePlacementError(
      "too_many_events",
      `A confirmation may include at most ${MAX_SELECTED_EVENTS} staged scans.`
    );
  }
  const normalized = eventIds.map((value) => clean(value, 300));
  if (normalized.some((value) => !value || /[\u0000-\u001f\u007f]/.test(value))) {
    throw new StoragePlacementError("invalid_event_id", "A selected scan event ID is invalid.");
  }
  if (new Set(normalized).size !== normalized.length) {
    throw new StoragePlacementError(
      "duplicate_event",
      "The same staged scan cannot be confirmed twice."
    );
  }
  return normalized.sort();
}

function buildPlacementPlan({
  targetUnit,
  stagedEntries,
  directItemsById,
  binItemsById,
  stagedBinDataById,
}) {
  const parsedTarget = storageUnitContract.parseStorageUnitId(targetUnit?.id);
  if (!parsedTarget) {
    throw new StoragePlacementError("invalid_target", "The target storage unit is invalid.");
  }
  const target = {
    id: parsedTarget.id,
    kind: parsedTarget.type,
    number: parsedTarget.number,
    data: targetUnit.data || {},
  };
  const stagedItemIds = new Set();
  const stagedBinIds = new Set();
  const itemSources = new Map();

  for (const entry of stagedEntries) {
    if (entry.kind === "item") {
      if (stagedItemIds.has(entry.itemId)) {
        throw new StoragePlacementError(
          "duplicate_item",
          `${entry.itemId} appears more than once in the staged selection.`
        );
      }
      if (itemSources.has(entry.itemId)) {
        throw new StoragePlacementError(
          "conflicting_staged_membership",
          `${entry.itemId} is staged directly and/or through a staged bin.`
        );
      }
      stagedItemIds.add(entry.itemId);
      itemSources.set(entry.itemId, { eventId: entry.eventId, sourceBinId: "" });
    } else if (entry.kind === "bin") {
      if (target.kind !== "pallet") {
        throw new StoragePlacementError("bin_target_rule", "Bins accept item scans only.");
      }
      if (stagedBinIds.has(entry.storageUnitId)) {
        throw new StoragePlacementError(
          "duplicate_bin",
          `${entry.storageUnitId} appears more than once in the staged selection.`
        );
      }
      stagedBinIds.add(entry.storageUnitId);
      for (const item of binItemsById.get(entry.storageUnitId) || []) {
        if (itemSources.has(item.id)) {
          throw new StoragePlacementError(
            "conflicting_staged_membership",
            `${item.id} is staged directly and/or through more than one staged bin.`
          );
        }
        itemSources.set(item.id, {
          eventId: entry.eventId,
          sourceBinId: entry.storageUnitId,
        });
      }
    } else {
      throw new StoragePlacementError(
        "invalid_staged_kind",
        "Only resolved items and eligible bins can be confirmed."
      );
    }
  }

  const itemPlacements = [];
  for (const [itemId, source] of itemSources) {
    const item = source.sourceBinId
      ? (binItemsById.get(source.sourceBinId) || []).find((entry) => entry.id === itemId)
      : directItemsById.get(itemId);
    if (!item) {
      throw new StoragePlacementError(
        "item_changed",
        `${itemId} is no longer available for the staged placement.`,
        409
      );
    }
    itemPlacements.push({
      itemId,
      itemData: item.data || {},
      eventId: source.eventId,
      sourceBinId: source.sourceBinId,
      ...buildNextItemPlacement({
        itemData: item.data || {},
        target,
        sourceBinId: source.sourceBinId,
      }),
    });
  }
  itemPlacements.sort((left, right) =>
    left.itemId.localeCompare(right.itemId, "en", { numeric: true })
  );

  const movedBins = Array.from(stagedBinIds)
    .map((id) => {
      const data = stagedBinDataById.get(id);
      if (!data) {
        throw new StoragePlacementError(
          "bin_changed",
          `${id} is no longer available for placement.`,
          409
        );
      }
      return { id, data };
    })
    .sort((left, right) => left.id.localeCompare(right.id, "en", { numeric: true }));

  const estimatedWrites = itemPlacements.length * 2 + movedBins.length * 2 + 4;
  if (estimatedWrites > MAX_CONFIRM_WRITES) {
    throw new StoragePlacementError(
      "write_limit",
      `This placement requires ${estimatedWrites} writes; the safe limit is ${MAX_CONFIRM_WRITES}.`,
      409,
      { estimatedWrites, maxWrites: MAX_CONFIRM_WRITES }
    );
  }
  return {
    target,
    itemPlacements,
    movedBins,
    estimatedWrites,
    locationVerified: Boolean(confirmedUnitLocation(target.data)),
  };
}

function eventResolutionMatches(stored = {}, current = {}) {
  if (stored.status !== "resolved" || current.status !== "resolved") return false;
  if (stored.kind !== current.kind) return false;
  if (stored.kind === "item") {
    return Boolean(stored.itemId) && stored.itemId === current.itemId;
  }
  return (
    Boolean(stored.storageUnitId) &&
    stored.storageUnitId === current.storageUnitId
  );
}

function storageUnitSnapshotMatches(snapshot, expectedId, expectedKind) {
  if (!snapshot?.exists) return false;
  const parsed = storageUnitContract.parseStorageUnitId(expectedId);
  if (!parsed || parsed.type !== expectedKind || snapshot.id !== parsed.id) return false;
  const data = snapshot.data() || {};
  const storedCode = storageUnitContract.normalizeStorageUnitId(data.code || snapshot.id);
  const storedKind = clean(data.kind || data.type, 20).toLowerCase();
  return storedCode === parsed.id && (!storedKind || storedKind === expectedKind);
}

function itemSnapshotMatchesEvent(snapshot, storedResolution, rawCode) {
  if (!snapshot?.exists) return false;
  const expectedItemId = clean(storedResolution?.itemId, 200);
  const normalizedCode = normalizeSkuCode(rawCode);
  return Boolean(
    expectedItemId &&
      normalizedCode &&
      snapshot.id === expectedItemId &&
      hasMatchingIdentity(snapshot.id, snapshot.data() || {}, normalizedCode)
  );
}

function removeResolvedReviewReasons(reasons, { locationResolved = false } = {}) {
  const removed = new Set([
    "conflicting_parent_pallets",
    "excluded_parent_pallet_zero",
  ]);
  if (locationResolved) {
    removed.add("conflicting_warehouse_locations");
    removed.add("incomplete_warehouse_location_evidence");
  }
  return unique((Array.isArray(reasons) ? reasons : []).map((value) => clean(value, 100)))
    .filter((value) => !removed.has(value));
}

async function queryItemsInBin(transaction, db, binId) {
  const parsed = storageUnitContract.parseStorageUnitId(binId);
  if (!parsed || parsed.type !== "bin") {
    throw new StoragePlacementError("invalid_bin", "A staged bin is invalid.");
  }
  const values = [parsed.number, String(parsed.number)];
  const collection = db.collection(TEST_COLLECTION);
  const queries = [
    collection.where("newLocalCurrent.bin", "in", values),
    collection.where("bin", "in", values),
    collection.where("Bin", "in", values),
  ];
  const snapshots = [];
  for (const query of queries) snapshots.push(await transaction.get(query));
  const documents = new Map();
  for (const snapshot of snapshots) {
    for (const document of snapshot.docs || []) documents.set(document.id, document);
  }
  return Array.from(documents.values())
    .filter((document) => {
      const location = canonicalCurrentLocation(document.data() || {});
      return normalizeContainerId(location.bin, "B") === parsed.id;
    })
    .map((document) => ({ id: document.id, data: document.data() || {}, snapshot: document }))
    .sort((left, right) => left.id.localeCompare(right.id, "en", { numeric: true }));
}

function timestampToMillis(value) {
  if (!value) return 0;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (typeof value.toDate === "function") return value.toDate().getTime();
  if (typeof value.seconds === "number") {
    return value.seconds * 1000 + Math.floor(Number(value.nanoseconds || 0) / 1e6);
  }
  const millis = value instanceof Date ? value.getTime() : Date.parse(value);
  return Number.isFinite(millis) ? millis : 0;
}

async function confirmStorageUnitPlacement({
  db,
  sessionId,
  eventIds,
  authUser,
  nowMs = Date.now(),
  FieldValue,
  sessionHelpers: suppliedSessionHelpers,
} = {}) {
  if (!db || typeof db.runTransaction !== "function") {
    throw new StoragePlacementError(
      "database_unavailable",
      "The inventory database is unavailable.",
      503
    );
  }
  if (!FieldValue || typeof FieldValue.delete !== "function") {
    throw new TypeError("Firestore FieldValue helpers are required.");
  }
  const sessionHelpers = suppliedSessionHelpers || require("./storageUnitScanSessions.cjs");
  const safeSessionId = sessionHelpers.cleanSessionId(sessionId);
  if (!safeSessionId) {
    throw new StoragePlacementError("invalid_session_id", "A valid scan session is required.");
  }
  const selectedEventIds = validateSelectedEventIds(eventIds);
  const confirmationKey = placementConfirmationKey(safeSessionId, selectedEventIds);
  const sessionRef = sessionHelpers.storageScanSessionRef(db, safeSessionId);
  const controlRef = sessionHelpers.storageScanControlRef(db);
  const now = new Date(nowMs);

  const transactionResult = await db.runTransaction(async (transaction) => {
    const sessionSnapshot = await transaction.get(sessionRef);
    if (!sessionSnapshot.exists) {
      throw new StoragePlacementError(
        "session_not_found",
        "The scan session could not be found.",
        404
      );
    }
    const session = sessionSnapshot.data() || {};
    if (typeof sessionHelpers.assertSessionOwner === "function") {
      sessionHelpers.assertSessionOwner(session, authUser);
    } else if (!authUser?.uid || clean(session.createdBy?.uid, 128) !== clean(authUser.uid, 128)) {
      throw new StoragePlacementError(
        "session_not_found",
        "The scan session could not be found.",
        404
      );
    }

    if (clean(session.status, 30).toLowerCase() === "confirmed") {
      if (
        session.confirmationSelectionHash === confirmationKey &&
        session.confirmationResult &&
        typeof session.confirmationResult === "object"
      ) {
        return {
          ...session.confirmationResult,
          alreadyConfirmed: true,
          newlyConfirmed: false,
        };
      }
      throw new StoragePlacementError(
        "session_confirmed",
        "This scan session was already confirmed with a different selection.",
        409
      );
    }
    if (typeof sessionHelpers.assertOpenAndUnexpired === "function") {
      sessionHelpers.assertOpenAndUnexpired(session, nowMs);
    } else if (
      !sessionHelpers.isOpenScanStatus(session.status) ||
      timestampToMillis(session.expiresAt) <= nowMs
    ) {
      throw new StoragePlacementError(
        "session_not_open",
        "The scan session is not open for confirmation.",
        409
      );
    }

    const targetParsed = storageUnitContract.parseStorageUnitId(session.unitId);
    if (!targetParsed) {
      throw new StoragePlacementError("invalid_target", "The session target is invalid.", 409);
    }
    const targetRef = db.collection(STORAGE_UNIT_COLLECTION).doc(targetParsed.id);
    const controlSnapshot = await transaction.get(controlRef);
    if (clean(controlSnapshot.data()?.activeSessionId, 100) !== safeSessionId) {
      throw new StoragePlacementError(
        "session_lock_lost",
        "The scanner lock no longer belongs to this session.",
        409
      );
    }
    const targetSnapshot = await transaction.get(targetRef);
    if (!targetSnapshot.exists) {
      throw new StoragePlacementError(
        "unit_not_found",
        "The target storage unit could not be found.",
        404
      );
    }
    const recordedTargetKind = clean(session.unitType, 20).toLowerCase();
    if (
      (recordedTargetKind && recordedTargetKind !== targetParsed.type) ||
      !storageUnitSnapshotMatches(targetSnapshot, targetParsed.id, targetParsed.type)
    ) {
      throw new StoragePlacementError(
        "invalid_target",
        "The session target has conflicting storage-unit identity fields.",
        409
      );
    }

    const eventRefs = selectedEventIds.map((eventId) =>
      sessionHelpers.storageScanEventRef(sessionRef, eventId)
    );
    const eventSnapshots = [];
    for (const eventRef of eventRefs) eventSnapshots.push(await transaction.get(eventRef));
    const stagedEntries = [];
    const directItemsById = new Map();
    const stagedBinDataById = new Map();
    for (let index = 0; index < selectedEventIds.length; index += 1) {
      const eventId = selectedEventIds[index];
      const snapshot = eventSnapshots[index];
      if (!snapshot.exists || clean(snapshot.data()?.eventId, 300) !== eventId) {
        throw new StoragePlacementError(
          "event_not_found",
          `Selected event ${eventId} does not belong to this session.`,
          404
        );
      }
      const event = snapshot.data() || {};
      const storedResolution = sessionHelpers.sanitizeResolution(event.resolution || {});
      if (storedResolution.status !== "resolved") {
        throw new StoragePlacementError(
          "unresolved_event",
          `Selected event ${eventId} is ${storedResolution.status} and cannot be confirmed.`,
          409
        );
      }
      if (storedResolution.kind === "item") {
        const itemId = clean(storedResolution.itemId, 200);
        if (!itemId) {
          throw new StoragePlacementError(
            "resolution_changed",
            `Selected event ${eventId} no longer resolves to the staged record.`,
            409
          );
        }
        let item = directItemsById.get(itemId);
        if (!item) {
          const itemSnapshot = await transaction.get(
            db.collection(TEST_COLLECTION).doc(itemId)
          );
          item = {
            id: itemId,
            data: itemSnapshot.exists ? itemSnapshot.data() || {} : {},
            snapshot: itemSnapshot,
          };
          directItemsById.set(itemId, item);
        }
        if (!itemSnapshotMatchesEvent(item.snapshot, storedResolution, event.code)) {
          throw new StoragePlacementError(
            "resolution_changed",
            `Selected event ${eventId} no longer resolves to the staged record.`,
            409
          );
        }
        stagedEntries.push({
          eventId,
          kind: "item",
          itemId,
          storageUnitId: "",
          code: itemId,
        });
        continue;
      }

      if (storedResolution.kind !== "bin" || targetParsed.type !== "pallet") {
        throw new StoragePlacementError(
          "invalid_staged_kind",
          targetParsed.type === "bin"
            ? "Bins accept item scans only."
            : "Pallets may accept resolved items or bins, not another pallet.",
          409
        );
      }
      const binId = storageUnitContract.normalizeStorageUnitId(
        storedResolution.storageUnitId
      );
      const parsedBin = storageUnitContract.parseStorageUnitId(binId);
      if (!parsedBin || parsedBin.type !== "bin") {
        throw new StoragePlacementError(
          "resolution_changed",
          `Selected event ${eventId} no longer resolves to the staged record.`,
          409
        );
      }
      let binSnapshotEntry = stagedBinDataById.get(binId);
      if (!binSnapshotEntry) {
        const binSnapshot = await transaction.get(
          db.collection(STORAGE_UNIT_COLLECTION).doc(binId)
        );
        binSnapshotEntry = {
          data: binSnapshot.exists ? binSnapshot.data() || {} : {},
          snapshot: binSnapshot,
        };
        stagedBinDataById.set(binId, binSnapshotEntry);
      }
      if (
        !storageUnitSnapshotMatches(binSnapshotEntry.snapshot, binId, "bin")
      ) {
        throw new StoragePlacementError(
          "resolution_changed",
          `Selected event ${eventId} no longer resolves to the staged record.`,
          409
        );
      }
      stagedEntries.push({
        eventId,
        kind: "bin",
        itemId: "",
        storageUnitId: binId,
        code: binId,
      });
    }

    const stagedBinIds = unique(
      stagedEntries.filter((entry) => entry.kind === "bin").map((entry) => entry.storageUnitId)
    );
    const binItemsById = new Map();
    for (const binId of stagedBinIds) {
      binItemsById.set(binId, await queryItemsInBin(transaction, db, binId));
    }

    const stagedBinDocumentsById = new Map(
      Array.from(stagedBinDataById, ([id, entry]) => [id, entry.data])
    );

    const plan = buildPlacementPlan({
      targetUnit: { id: targetParsed.id, data: targetSnapshot.data() || {} },
      stagedEntries,
      directItemsById,
      binItemsById,
      stagedBinDataById: stagedBinDocumentsById,
    });

    const itemHistoryRefs = plan.itemPlacements.map((placement) =>
      db
        .collection(TEST_COLLECTION)
        .doc(placement.itemId)
        .collection(ITEM_HISTORY_COLLECTION)
        .doc(confirmationKey)
    );
    const binHistoryRefs = plan.movedBins.map((bin) =>
      db
        .collection(STORAGE_UNIT_COLLECTION)
        .doc(bin.id)
        .collection(UNIT_HISTORY_COLLECTION)
        .doc(confirmationKey)
    );
    const targetHistoryRef = targetRef
      .collection(UNIT_HISTORY_COLLECTION)
      .doc(confirmationKey);
    const historySnapshots = [];
    for (const ref of [...itemHistoryRefs, ...binHistoryRefs, targetHistoryRef]) {
      historySnapshots.push(await transaction.get(ref));
    }
    if (historySnapshots.some((snapshot) => snapshot.exists)) {
      throw new StoragePlacementError(
        "history_conflict",
        "A placement history entry already exists for this unconfirmed session.",
        409
      );
    }

    const actor = {
      uid: clean(authUser.uid, 128),
      email: clean(authUser.email, 180).toLowerCase(),
    };
    for (let index = 0; index < plan.itemPlacements.length; index += 1) {
      const placement = plan.itemPlacements[index];
      const itemRef = db.collection(TEST_COLLECTION).doc(placement.itemId);
      const itemUpdate = {
        newLocalCurrent: placement.after,
        region: placement.after.region || "",
        section: placement.after.section || FieldValue.delete(),
        bin: placement.after.bin,
        pallet: placement.after.pallet,
        localLocCurrent: placement.localLocCurrent,
        lastEdited: actor.email,
        lastStoragePlacement: {
          schemaVersion: 1,
          sessionId: safeSessionId,
          confirmationKey,
          targetUnitId: plan.target.id,
          sourceBinId: placement.sourceBinId || null,
          eventId: placement.eventId,
          locationVerified: placement.locationVerified,
          placedBy: actor,
          placedAt: now,
        },
      };
      transaction.update(itemRef, itemUpdate);
      transaction.create(itemHistoryRefs[index], {
        schemaVersion: 1,
        type: "storage-unit-scan-placement",
        sessionId: safeSessionId,
        confirmationKey,
        eventId: placement.eventId,
        itemId: placement.itemId,
        targetUnitId: plan.target.id,
        sourceBinId: placement.sourceBinId || null,
        beforeNewLocalCurrent: placement.previousNewLocalCurrent,
        afterNewLocalCurrent: placement.after,
        beforeLocalLocCurrent: clean(placement.itemData.localLocCurrent, 500),
        afterLocalLocCurrent: placement.localLocCurrent,
        locationVerified: placement.locationVerified,
        placedBy: actor,
        placedAt: now,
      });
    }

    const targetLocation = confirmedUnitLocation(plan.target.data);
    for (let index = 0; index < plan.movedBins.length; index += 1) {
      const bin = plan.movedBins[index];
      const binRef = db.collection(STORAGE_UNIT_COLLECTION).doc(bin.id);
      const containedItemCount = (binItemsById.get(bin.id) || []).length;
      const reviewReasons = removeResolvedReviewReasons(bin.data.reviewReasons, {
        locationResolved: Boolean(targetLocation),
      });
      const binUpdate = {
        parentPalletId: plan.target.id,
        parentStatus: "confirmed",
        parentCandidates: [{ parentPalletId: plan.target.id, itemCount: containedItemCount }],
        reviewReasons,
        reviewRequired: reviewReasons.length > 0,
        lastStoragePlacement: {
          schemaVersion: 1,
          sessionId: safeSessionId,
          confirmationKey,
          targetUnitId: plan.target.id,
          containedItemCount,
          locationVerified: Boolean(targetLocation),
          placedBy: actor,
          placedAt: now,
        },
      };
      if (targetLocation) {
        binUpdate.warehouseLocation = targetLocation;
        binUpdate.locationStatus = "confirmed";
        binUpdate.locationCandidates = [
          { warehouseLocation: targetLocation, itemCount: containedItemCount },
        ];
      }
      transaction.update(binRef, binUpdate);
      transaction.create(binHistoryRefs[index], {
        schemaVersion: 1,
        type: "storage-bin-parent-placement",
        sessionId: safeSessionId,
        confirmationKey,
        binId: bin.id,
        targetPalletId: plan.target.id,
        previousParentPalletId: clean(bin.data.parentPalletId, 100) || null,
        previousParentStatus: clean(bin.data.parentStatus, 40) || null,
        previousParentCandidates: Array.isArray(bin.data.parentCandidates)
          ? bin.data.parentCandidates
          : [],
        previousWarehouseLocation: bin.data.warehouseLocation || null,
        nextWarehouseLocation: targetLocation || bin.data.warehouseLocation || null,
        locationVerified: Boolean(targetLocation),
        containedItemCount,
        placedBy: actor,
        placedAt: now,
      });
    }

    const confirmationResult = {
      ok: true,
      status: "confirmed",
      sessionId: safeSessionId,
      unitId: plan.target.id,
      unitType: plan.target.kind,
      confirmationKey,
      selectedEventCount: selectedEventIds.length,
      placedItemCount: plan.itemPlacements.length,
      placedBinCount: plan.movedBins.length,
      locationVerified: plan.locationVerified,
      locationUnverifiedItemCount: plan.itemPlacements.filter(
        (placement) => !placement.locationVerified
      ).length,
      itemIds: plan.itemPlacements.map((placement) => placement.itemId),
      binIds: plan.movedBins.map((bin) => bin.id),
      estimatedWrites: plan.estimatedWrites,
      alreadyConfirmed: false,
    };
    transaction.update(targetRef, {
      lastStoragePlacement: {
        schemaVersion: 1,
        sessionId: safeSessionId,
        confirmationKey,
        selectedEventCount: selectedEventIds.length,
        placedItemCount: plan.itemPlacements.length,
        placedBinCount: plan.movedBins.length,
        locationVerified: plan.locationVerified,
        placedBy: actor,
        placedAt: now,
      },
    });
    transaction.create(targetHistoryRef, {
      schemaVersion: 1,
      type: "storage-unit-scan-confirmation",
      ...confirmationResult,
      placedBy: actor,
      placedAt: now,
    });
    transaction.set(
      sessionRef,
      {
        status: "confirmed",
        completedAt: now,
        updatedAt: now,
        bridgeStopStatus: "pending",
        confirmationSelectionHash: confirmationKey,
        confirmedEventIds: selectedEventIds,
        confirmationResult,
      },
      { merge: true }
    );
    sessionHelpers.releaseStorageScanControl(
      transaction,
      db,
      safeSessionId,
      now,
      controlSnapshot
    );
    return { ...confirmationResult, newlyConfirmed: true };
  });
  return transactionResult;
}

module.exports = {
  ITEM_HISTORY_COLLECTION,
  MAX_CONFIRM_WRITES,
  MAX_SCAN_CODE_LENGTH,
  MAX_SELECTED_EVENTS,
  SKU_FIELDS,
  STORAGE_UNIT_COLLECTION,
  StoragePlacementError,
  TEST_COLLECTION,
  UNIT_HISTORY_COLLECTION,
  buildNextItemPlacement,
  buildPlacementPlan,
  canonicalCurrentLocation,
  confirmedParentPalletId,
  confirmedUnitLocation,
  confirmStorageUnitPlacement,
  eventResolutionMatches,
  formatCurrentLocation,
  getSkuLookupValues,
  hasMatchingIdentity,
  itemSnapshotMatchesEvent,
  itemIdentityValues,
  normalizeSkuCode,
  placementConfirmationKey,
  queryItemsInBin,
  resolveStorageScanCode,
  resolveStorageUnitScan,
  sanitizeItemPreview,
  sha256Text,
  storageUnitSnapshotMatches,
  validateSelectedEventIds,
};
