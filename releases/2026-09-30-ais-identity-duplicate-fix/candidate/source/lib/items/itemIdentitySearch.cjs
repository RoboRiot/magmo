const { normalizeItemAisValue, getItemAisLookupValues } = require("./itemIdentity.cjs");

function aisSearchPrefix(value) {
  const normalized = normalizeItemAisValue(value);
  return /^AIS\d+$/.test(normalized) ? normalized : "";
}

function itemMatchesAisSearch(item, value) {
  const prefix = aisSearchPrefix(value);
  if (!prefix) return false;
  return [item?.id, item?.localSN, item?.local_sn, item?.aisNumber].some(
    (identity) => normalizeItemAisValue(identity).startsWith(prefix)
  );
}

// Keep historical alternate spellings discoverable without merging records.
// Prefix matches use the canonical document path; exact aliases also include
// bare-digit documents and legacy serial fields under otherwise unrelated IDs.
function buildItemAisSearchQueries({ collection, documentId, value, cursor = null, limit = null }) {
  const prefix = aisSearchPrefix(value);
  if (!prefix) return [];
  const aliases = getItemAisLookupValues(value);
  let prefixQuery = collection.orderBy(documentId);
  prefixQuery = cursor && String(cursor.id || cursor) >= prefix
    ? prefixQuery.startAfter(cursor)
    : prefixQuery.startAt(prefix);
  prefixQuery = prefixQuery.endAt(`${prefix}\uf8ff`);
  const queries = [prefixQuery];
  for (const field of [documentId, "localSN", "local_sn", "aisNumber"]) {
    // Firestore 'in' supports these bounded legacy spellings; a raw unusual
    // spelling may add a tenth entry to the nine normal lookup values.
    for (let offset = 0; offset < aliases.length; offset += 10) {
      let query = collection.where(field, "in", aliases.slice(offset, offset + 10)).orderBy(documentId);
      if (cursor) query = query.startAfter(cursor);
      queries.push(query);
    }
  }
  return limit == null ? queries : queries.map((query) => query.limit(limit));
}

function mergeItemIdentitySnapshots(snapshots) {
  const byDocumentId = new Map();
  for (const snapshot of snapshots) {
    for (const document of snapshot.docs) byDocumentId.set(document.id, document);
  }
  // Match Firestore document-ID ordering, not locale-dependent natural order.
  return [...byDocumentId.values()].sort((left, right) =>
    left.id < right.id ? -1 : left.id > right.id ? 1 : 0
  );
}

module.exports = { aisSearchPrefix, itemMatchesAisSearch, buildItemAisSearchQueries, mergeItemIdentitySnapshots };
