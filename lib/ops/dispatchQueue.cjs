const DEFAULT_PRIORITY_ORDER = {
  hard_down: 0,
  in_progress: 1,
  needs_scheduled: 2,
  anytime: 3,
};

function supportModeForWorkOrder(workOrder = {}) {
  const storedMode = String(
    workOrder.supportModeReceived || workOrder.workMode || ""
  )
    .trim()
    .toLowerCase();
  if (["hybrid", "mixed"].includes(storedMode)) return "hybrid";
  if (["in_person", "physical", "in-person"].includes(storedMode)) {
    return "in_person";
  }
  if (storedMode === "remote" || workOrder.workflowStatus === "remote") {
    return "remote";
  }

  const assigneeModes = new Set(
    (Array.isArray(workOrder.assignees) ? workOrder.assignees : [])
      .map((person) => String(person?.workMode || "").trim().toLowerCase())
      .filter(Boolean)
  );
  if (assigneeModes.has("remote") && assigneeModes.has("physical")) {
    return "hybrid";
  }
  if (assigneeModes.has("remote")) return "remote";
  if (assigneeModes.has("physical")) return "in_person";

  // A physical Active record may predate work-mode tracking. Keep it visible
  // in the Active queue instead of silently dropping it from every sub-tab.
  return workOrder.workflowStatus === "active" ? "in_person" : "";
}

function sortActiveWorkOrders(items = [], tierOptions = []) {
  const configuredOrder = new Map(
    (Array.isArray(tierOptions) ? tierOptions : []).map((tier, index) => [
      tier.id,
      Number.isFinite(Number(tier.order)) ? Number(tier.order) : index,
    ])
  );
  const priorityOrder = (workOrder) => {
    const tier = String(workOrder?.priorityTier || "needs_scheduled");
    if (configuredOrder.has(tier)) return configuredOrder.get(tier);
    if (Number.isFinite(Number(workOrder?.priorityOrder))) {
      return Number(workOrder.priorityOrder);
    }
    return DEFAULT_PRIORITY_ORDER[tier] ?? 2;
  };
  const activityTime = (workOrder) => {
    const timestamp = Date.parse(workOrder?.lastActivityAt || "");
    return Number.isFinite(timestamp) ? timestamp : 0;
  };

  return [...(Array.isArray(items) ? items : [])].sort(
    (left, right) =>
      priorityOrder(left) - priorityOrder(right) ||
      activityTime(right) - activityTime(left) ||
      String(left?.number || left?.id || "").localeCompare(
        String(right?.number || right?.id || ""),
        undefined,
        { numeric: true, sensitivity: "base" }
      )
  );
}

module.exports = {
  sortActiveWorkOrders,
  supportModeForWorkOrder,
};
