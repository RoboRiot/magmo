export function normalizeAuditEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function buildSaveHistoryEntry(email, savedAt = new Date()) {
  return {
    savedAt: savedAt.toISOString(),
    savedByEmail: normalizeAuditEmail(email) || "unknown",
  };
}

export function appendSaveHistory(history, email, savedAt = new Date()) {
  const entries = Array.isArray(history) ? history : [];
  return [...entries, buildSaveHistoryEntry(email, savedAt)].slice(-100);
}

export function appendSubmitterToDescription(description, email) {
  const submitterEmail = normalizeAuditEmail(email) || "unknown";
  const baseDescription = String(description || "").trim();

  return [baseDescription, `From ${submitterEmail}`].filter(Boolean).join("\n");
}
