function text(value, maxLength = 240) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function emailName(value) {
  const local = text(value, 180).split("@")[0] || "";
  return local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizeApprover(actor = {}) {
  const approverId = text(
    actor.approverId || actor.uid || actor.id,
    180
  );
  const email = text(actor.email, 180).toLowerCase();
  const name = text(
    actor.name || actor.displayName || emailName(email) || "Magmo admin",
    180
  );
  return { approverId, email, name };
}

function approvalKey(entry = {}) {
  const approver = normalizeApprover(entry);
  return approver.approverId || approver.email;
}

function normalizeOverseerApprovals(value) {
  const entries = Array.isArray(value) ? value : [];
  const byIdentity = new Map();
  entries.forEach((entry) => {
    if (!entry || typeof entry !== "object") return;
    const approver = normalizeApprover(entry);
    const key = approvalKey(approver);
    if (!key) return;
    byIdentity.set(key, {
      ...approver,
      approvedAt: text(entry.approvedAt || entry.approvedAtIso, 80),
    });
  });
  return Array.from(byIdentity.values()).sort((left, right) =>
    String(left.approvedAt || "").localeCompare(String(right.approvedAt || ""))
  );
}

function setOwnOverseerApproval(
  existing,
  actor,
  approved,
  approvedAt = new Date().toISOString()
) {
  const approver = normalizeApprover(actor);
  if (!approver.approverId) {
    throw new Error("A verified Magmo user is required to approve this request.");
  }
  const current = normalizeOverseerApprovals(existing).filter((entry) => {
    if (entry.approverId === approver.approverId) return false;
    return !(approver.email && entry.email === approver.email);
  });
  if (approved) {
    current.push({
      ...approver,
      approvedAt: text(approvedAt, 80) || new Date().toISOString(),
    });
  }
  return normalizeOverseerApprovals(current);
}

function hasOverseerApproval(value) {
  return normalizeOverseerApprovals(value).length > 0;
}

function requireOverseerApproval(value) {
  if (!hasOverseerApproval(value)) {
    throw new Error(
      "An Ops admin must provide overseer approval before this request can be added."
    );
  }
  return true;
}

module.exports = {
  hasOverseerApproval,
  normalizeApprover,
  normalizeOverseerApprovals,
  requireOverseerApproval,
  setOwnOverseerApproval,
};
