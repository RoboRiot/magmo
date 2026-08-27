export function normalizeTrailerProvenance(value = {}) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const requestedType = String(value.sourceType || value.type || "").toLowerCase();
  const sourceType = ["ai", "manual"].includes(requestedType)
    ? requestedType
    : "legacy";
  return {
    sourceType,
    label: String(
      value.label ||
        (sourceType === "ai"
          ? "Magmo AI"
          : sourceType === "manual"
            ? "Manual"
            : "Earlier record")
    ).trim(),
    actorId: String(value.actorId || "").trim(),
    actorName: String(value.actorName || value.changedBy || "").trim(),
    changedAtIso: String(value.changedAtIso || "").trim(),
    evidence: String(value.evidence || "").trim(),
    auditId: String(value.auditId || "").trim(),
    slackChannelId: String(value.slackChannelId || "").trim(),
    slackThreadTs: String(value.slackThreadTs || "").trim(),
    slackMessageTs: String(value.slackMessageTs || "").trim(),
  };
}

export function manualTrailerProvenance(user, evidence = "Edited in Magmo") {
  const actorName = String(
    user?.displayName || user?.email || user?.uid || "Magmo user"
  ).trim();
  return {
    sourceType: "manual",
    label: "Manual",
    actorId: String(user?.uid || "").trim(),
    actorName,
    changedAtIso: new Date().toISOString(),
    evidence: String(evidence || "Edited in Magmo").trim(),
    auditId: "",
    slackChannelId: "",
    slackThreadTs: "",
    slackMessageTs: "",
  };
}

export function trailerProvenanceDisplay(value = {}) {
  const provenance = normalizeTrailerProvenance(value);
  if (!provenance) {
    return { label: "Earlier record", sourceType: "legacy", title: "" };
  }
  const label =
    provenance.sourceType === "ai"
      ? "Magmo AI"
      : provenance.sourceType === "manual"
        ? "Manual"
        : "Earlier record";
  const details = [
    provenance.actorName,
    provenance.changedAtIso
      ? new Date(provenance.changedAtIso).toLocaleString()
      : "",
    provenance.evidence,
  ].filter(Boolean);
  return {
    label,
    sourceType: provenance.sourceType,
    title: details.join(" — "),
  };
}
