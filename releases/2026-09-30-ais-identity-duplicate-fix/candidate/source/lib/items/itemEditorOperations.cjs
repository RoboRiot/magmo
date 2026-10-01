const { getItemAisLookupValues } = require("./itemIdentity.cjs");

// A synchronous lock covers the complete operation, including preparation and
// follow-up work, so a second click cannot start another write or print.
function createItemOperationController(onChange = () => {}) {
  let active = null;

  return {
    isBusy: () => active !== null,
    run(kind, message, perform) {
      if (active) return Promise.resolve(null);
      const operation = { kind, message };
      active = operation;
      onChange({ ...operation });
      const report = (nextMessage) => {
        if (active !== operation) return;
        operation.message = nextMessage;
        onChange({ ...operation });
      };
      return Promise.resolve()
        .then(() => perform(report))
        .finally(() => {
          if (active === operation) {
            active = null;
            onChange(null);
          }
        });
    },
  };
}

async function isArchivedItemId(db, itemId, options = {}) {
  const id = String(itemId || "").trim();
  if (!id) return false;
  const ids = options.exactOnly ? [id] : getItemAisLookupValues(id);
  const snapshots = await Promise.all(
    ids.map((candidate) => db.collection("ArchivedItemIds").doc(candidate).get())
  );
  return snapshots.some((snapshot) => snapshot.exists);
}

function getItemPhotoStoragePrefixes(itemId, priorPrefixes = []) {
  const prefixes = [`Parts/${String(itemId || "").trim()}/`, ...(Array.isArray(priorPrefixes) ? priorPrefixes : [])];
  const result = new Set();
  for (const value of prefixes) {
    const match = typeof value === "string" ? value.trim().match(/^Parts\/([^/\\\u0000-\u001f]+)\/?$/) : null;
    if (!match || match[1] === "." || match[1] === "..") continue;
    result.add(`Parts/${match[1]}/`);
  }
  return [...result];
}

async function findAvailableLocalSerialNumber({
  generateCandidate,
  exists,
  excludedIds = [],
  maxAttempts = 10,
}) {
  const excluded = new Set(
    excludedIds.map((value) => String(value || "").trim().toUpperCase())
  );
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const candidate = String(generateCandidate() || "").trim();
    if (!candidate || excluded.has(candidate.toUpperCase())) continue;
    if (!(await exists(candidate))) return candidate;
  }
  throw new Error("Could not generate an unused Local SN. Please try again.");
}

module.exports = {
  createItemOperationController,
  findAvailableLocalSerialNumber,
  getItemPhotoStoragePrefixes,
  isArchivedItemId,
};
