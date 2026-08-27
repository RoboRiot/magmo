function cleanText(value, maxLength = 240) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function normalizeSearchText(value) {
  return cleanText(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Produce the minimum record required by the client-directory UI.
 * Keeping this explicit prevents contacts, machine references, billing data,
 * and other Client document fields from being embedded in SSR HTML or an API
 * response.
 */
function serializeClientListDocument(clientDoc) {
  if (!clientDoc || clientDoc.exists === false) return null;
  const id = cleanText(clientDoc.id, 180);
  if (!id) return null;

  const data =
    typeof clientDoc.data === "function" ? clientDoc.data() || {} : {};
  return {
    id,
    name: cleanText(data.name ?? data.Name, 300),
  };
}

function sortClientListRecords(records) {
  return [...(Array.isArray(records) ? records : [])].sort((left, right) => {
    const nameComparison = cleanText(left?.name).localeCompare(
      cleanText(right?.name),
      "en",
      { sensitivity: "base", numeric: true }
    );
    if (nameComparison) return nameComparison;

    return cleanText(left?.id).localeCompare(cleanText(right?.id), "en", {
      sensitivity: "base",
      numeric: true,
    });
  });
}

function filterClientListRecords(records, searchTerm) {
  const query = normalizeSearchText(searchTerm);
  const source = Array.isArray(records) ? records : [];
  if (!query) return [...source];

  return source.filter((client) => {
    const searchable = `${normalizeSearchText(client?.name)} ${normalizeSearchText(
      client?.id
    )}`.trim();
    return searchable.includes(query);
  });
}

function buildClientList(records) {
  return sortClientListRecords(
    (Array.isArray(records) ? records : [])
      .map(serializeClientListDocument)
      .filter(Boolean)
  );
}

module.exports = {
  buildClientList,
  cleanText,
  filterClientListRecords,
  normalizeSearchText,
  serializeClientListDocument,
  sortClientListRecords,
};
