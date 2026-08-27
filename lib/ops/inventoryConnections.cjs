function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeId(value) {
  return clean(value);
}

function eventTime(entry) {
  return Date.parse(entry?.recordedAtIso || "") || 0;
}

function normalizePartNumber(value) {
  return clean(value)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

/**
 * Extracts an exact, explicitly labelled part number. A compact standalone
 * part number is also accepted, but prose and serial-only text are not.
 */
function extractPartNumber(value) {
  const text = clean(value);
  if (!text) return "";
  const labelled = text.match(
    /(?:^|[\s,;|])(?:P\.?\s*N\.?|PART\s*(?:NO\.?|NUMBER))\s*[:#=-]?\s*([A-Z0-9][A-Z0-9./_-]{2,})/i
  );
  if (labelled?.[1]) return normalizePartNumber(labelled[1]);
  if (/^[A-Z0-9][A-Z0-9./_-]{2,}$/i.test(text) && /[A-Z]/i.test(text)) {
    return normalizePartNumber(text);
  }
  return "";
}

function movementPartNumber(entry) {
  return (
    extractPartNumber(entry?.pnSn) ||
    extractPartNumber(entry?.partNumber) ||
    extractPartNumber(entry?.pn)
  );
}

function isCoreReturn(entry) {
  const text = `${clean(entry?.partName)} ${clean(entry?.description)}`;
  return (
    clean(entry?.disposition).toLowerCase() === "core" ||
    /(?:^|\b)(?:core\s*[-:]?\s*bad|bad\s*[-:]?\s*core|core\s+return)(?:\b|\s*[-:])/i.test(
      text
    )
  );
}

function isInstalledOrUsed(entry) {
  const text = `${clean(entry?.partName)} ${clean(entry?.description)}`;
  return (
    clean(entry?.disposition).toLowerCase() === "used" ||
    /(?:^|\b)(?:installed|used\s+(?:for|on|in)|replacement\s+part)(?:\b|\s*[-:])/i.test(
      text
    )
  );
}

function movementEntries(movements = []) {
  return (Array.isArray(movements) ? movements : []).filter(
    (entry) =>
      entry &&
      entry.id &&
      (entry.direction === "shipping" || entry.direction === "receiving")
  );
}

function buildSwapConnections(
  entries,
  unavailableIds = new Set(),
  mode = "all"
) {
  const entriesById = new Map(
    entries.map((entry) => [normalizeId(entry.id), entry])
  );
  const usedIds = new Set();
  const connections = [];

  const register = (installed, core, source) => {
    if (!installed || !core) return false;
    const installedId = normalizeId(installed.id);
    const coreId = normalizeId(core.id);
    if (
      !installedId ||
      !coreId ||
      installed.direction !== "shipping" ||
      core.direction !== "receiving" ||
      unavailableIds.has(installedId) ||
      unavailableIds.has(coreId) ||
      usedIds.has(installedId) ||
      usedIds.has(coreId)
    ) {
      return false;
    }
    usedIds.add(installedId);
    usedIds.add(coreId);
    connections.push({
      id: `swap:${installedId}:${coreId}`,
      installed,
      core,
      source,
    });
    return true;
  };

  // Explicit movement-to-movement relationships always take precedence.
  if (mode !== "inferred") entries.forEach((entry) => {
    const entryId = normalizeId(entry.id);
    if (
      !entryId ||
      unavailableIds.has(entryId) ||
      usedIds.has(entryId) ||
      !entry.swappedMovementId
    ) return;
    const peer = entriesById.get(normalizeId(entry.swappedMovementId));
    if (
      !peer ||
      peer.direction === entry.direction ||
      unavailableIds.has(normalizeId(peer.id)) ||
      usedIds.has(normalizeId(peer.id))
    ) {
      return;
    }
    const reciprocal =
      normalizeId(peer.swappedMovementId) === entryId;
    const sharedPairId =
      normalizeId(entry.swapPairId) &&
      normalizeId(entry.swapPairId) === normalizeId(peer.swapPairId);
    if (!reciprocal && !sharedPairId) return;
    register(
      entry.direction === "shipping" ? entry : peer,
      entry.direction === "receiving" ? entry : peer,
      "recorded_swap"
    );
  });

  // Explicit inventory cross-references are also safe. These fields describe
  // a replacement/core relationship, not a same-item shipment return.
  if (mode !== "inferred") entries.forEach((entry) => {
    const entryId = normalizeId(entry.id);
    if (!entryId || unavailableIds.has(entryId) || usedIds.has(entryId)) return;
    const relatedItemId =
      entry.direction === "shipping"
        ? normalizeId(entry.coreForItemId)
        : normalizeId(entry.replacementForItemId);
    if (!relatedItemId) return;
    const peers = entries.filter(
      (peer) =>
        peer.direction !== entry.direction &&
        !unavailableIds.has(normalizeId(peer.id)) &&
        !usedIds.has(normalizeId(peer.id)) &&
        normalizeId(peer.itemId) === relatedItemId
    );
    if (peers.length !== 1) return;
    const peer = peers[0];
    register(
      entry.direction === "shipping" ? entry : peer,
      entry.direction === "receiving" ? entry : peer,
      "inventory_cross_reference"
    );
  });

  // Safe fallback: a record explicitly identified as a bad/core return may be
  // paired with one and only one shipped part carrying the exact same PN.
  // Names, descriptions, serials and tracking numbers are never fuzzy-matched.
  const byPartNumber = new Map();
  if (mode !== "explicit") entries.forEach((entry) => {
    if (
      unavailableIds.has(normalizeId(entry.id)) ||
      usedIds.has(normalizeId(entry.id))
    ) return;
    const partNumber = movementPartNumber(entry);
    if (!partNumber) return;
    if (!byPartNumber.has(partNumber)) {
      byPartNumber.set(partNumber, { shipping: [], receiving: [] });
    }
    byPartNumber.get(partNumber)[entry.direction].push(entry);
  });
  byPartNumber.forEach((group) => {
    const cores = group.receiving.filter(isCoreReturn);
    const shipped = group.shipping;
    if (cores.length !== 1 || shipped.length !== 1) return;
    register(shipped[0], cores[0], "exact_part_number");
  });

  connections.sort(
    (left, right) =>
      Math.max(eventTime(right.installed), eventTime(right.core)) -
      Math.max(eventTime(left.installed), eventTime(left.core))
  );
  return { connections, usedIds };
}

function buildReturnConnections(
  entries,
  unavailableIds = new Set(),
  mode = "all"
) {
  const available = entries.filter(
    (entry) =>
      !unavailableIds.has(normalizeId(entry.id)) &&
      (mode === "explicit" ||
        (!isCoreReturn(entry) && !isInstalledOrUsed(entry)))
  );
  const shipping = available.filter((entry) => entry.direction === "shipping");
  const receiving = available.filter((entry) => entry.direction === "receiving");
  const entriesById = new Map(
    available.map((entry) => [normalizeId(entry.id), entry])
  );
  const usedIds = new Set();
  const connections = [];

  const register = (shipment, receipt, source) => {
    const shipmentId = normalizeId(shipment?.id);
    const receiptId = normalizeId(receipt?.id);
    if (
      !shipmentId ||
      !receiptId ||
      usedIds.has(shipmentId) ||
      usedIds.has(receiptId)
    ) {
      return false;
    }
    usedIds.add(shipmentId);
    usedIds.add(receiptId);
    connections.push({
      id: `return:${shipmentId}:${receiptId}`,
      shipping: shipment,
      receiving: receipt,
      source,
    });
    return true;
  };

  available.forEach((entry) => {
    const entryId = normalizeId(entry.id);
    if (!entry.pairedMovementId || usedIds.has(entryId)) return;
    const peer = entriesById.get(normalizeId(entry.pairedMovementId));
    if (!peer || peer.direction === entry.direction || usedIds.has(normalizeId(peer.id))) {
      return;
    }
    const shipment = entry.direction === "shipping" ? entry : peer;
    const receipt = entry.direction === "receiving" ? entry : peer;
    const shipmentItemId = normalizeId(shipment.itemId);
    const receiptItemId = normalizeId(receipt.itemId);
    if (shipmentItemId && receiptItemId && shipmentItemId !== receiptItemId) return;

    const reciprocal = normalizeId(peer.pairedMovementId) === entryId;
    const sharedPairId =
      normalizeId(shipment.pairId) &&
      normalizeId(shipment.pairId) === normalizeId(receipt.pairId);
    if (reciprocal || sharedPairId) register(shipment, receipt, "recorded_pair");
  });

  const unmatchedByItemId = new Map();
  if (mode !== "explicit") available.forEach((entry) => {
    if (usedIds.has(normalizeId(entry.id))) return;
    const itemId = normalizeId(entry.itemId);
    if (!itemId) return;
    if (!unmatchedByItemId.has(itemId)) {
      unmatchedByItemId.set(itemId, { shipping: [], receiving: [] });
    }
    unmatchedByItemId.get(itemId)[entry.direction].push(entry);
  });
  unmatchedByItemId.forEach((group) => {
    if (group.shipping.length === 1 && group.receiving.length === 1) {
      register(group.shipping[0], group.receiving[0], "item_id");
    }
  });

  connections.sort(
    (left, right) =>
      Math.max(eventTime(right.shipping), eventTime(right.receiving)) -
      Math.max(eventTime(left.shipping), eventTime(left.receiving))
  );
  return { connections, usedIds };
}

function buildInventoryConnectionPlan(movements = []) {
  const entries = movementEntries(movements);
  const explicitSwaps = buildSwapConnections(entries, new Set(), "explicit");
  const explicitReturns = buildReturnConnections(
    entries,
    explicitSwaps.usedIds,
    "explicit"
  );
  const reservedAfterExplicit = new Set([
    ...explicitSwaps.usedIds,
    ...explicitReturns.usedIds,
  ]);
  const inferredSwaps = buildSwapConnections(
    entries,
    reservedAfterExplicit,
    "inferred"
  );
  const reservedBeforeReturnFallback = new Set([
    ...reservedAfterExplicit,
    ...inferredSwaps.usedIds,
  ]);
  const fallbackReturns = buildReturnConnections(
    entries,
    reservedBeforeReturnFallback,
    "fallback"
  );
  const swapConnections = [
    ...explicitSwaps.connections,
    ...inferredSwaps.connections,
  ].sort(
    (left, right) =>
      Math.max(eventTime(right.installed), eventTime(right.core)) -
      Math.max(eventTime(left.installed), eventTime(left.core))
  );
  const returnConnections = [
    ...explicitReturns.connections,
    ...fallbackReturns.connections,
  ].sort(
    (left, right) =>
      Math.max(eventTime(right.shipping), eventTime(right.receiving)) -
      Math.max(eventTime(left.shipping), eventTime(left.receiving))
  );
  const connectedIds = new Set([
    ...reservedBeforeReturnFallback,
    ...fallbackReturns.usedIds,
  ]);
  const connectionByMovementId = new Map();

  swapConnections.forEach((connection) => {
    connectionByMovementId.set(normalizeId(connection.installed.id), {
      type: "swap",
      ...connection,
    });
    connectionByMovementId.set(normalizeId(connection.core.id), {
      type: "swap",
      ...connection,
    });
  });
  returnConnections.forEach((connection) => {
    connectionByMovementId.set(normalizeId(connection.shipping.id), {
      type: "return",
      ...connection,
    });
    connectionByMovementId.set(normalizeId(connection.receiving.id), {
      type: "return",
      ...connection,
    });
  });

  return {
    swapConnections,
    returnConnections,
    connectionByMovementId,
    unlinkedShipping: entries.filter(
      (entry) => entry.direction === "shipping" && !connectedIds.has(normalizeId(entry.id))
    ),
    unlinkedReceiving: entries.filter(
      (entry) => entry.direction === "receiving" && !connectedIds.has(normalizeId(entry.id))
    ),
  };
}

module.exports = {
  buildInventoryConnectionPlan,
  extractPartNumber,
  isCoreReturn,
  isInstalledOrUsed,
};
