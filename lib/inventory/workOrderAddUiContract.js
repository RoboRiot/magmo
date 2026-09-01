export const MOVEMENT_FROM_WORK_ORDER = "from_work_order";
export const MOVEMENT_CURRENT_AT_WORK_ORDER = "current_at_work_order";
export const SOCAL_INTERIOR_LABEL = "SoCal Warehouse Interior";

export function normalizeWorkOrderAddMovementMode(value) {
  const normalized = String(value == null ? "" : value)
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  return [MOVEMENT_FROM_WORK_ORDER, MOVEMENT_CURRENT_AT_WORK_ORDER].includes(
    normalized
  )
    ? normalized
    : "";
}

export function workOrderDestinationLabel(workOrder = {}) {
  const clean = (value) => String(value == null ? "" : value).trim();
  const site = clean(
    workOrder.clientName ||
      workOrder.customer ||
      workOrder.customerName ||
      workOrder.siteName
  );
  const equipment = clean(
    workOrder.trailerName || workOrder.machineName || workOrder.equipmentName
  );
  const location = clean(workOrder.clientLocation || workOrder.location);
  const primary = [site, equipment].filter(Boolean).join(" · ");
  return primary || location || "Work-order destination";
}

export function describeWorkOrderAddMovement(mode, workOrder = {}) {
  const normalized = normalizeWorkOrderAddMovementMode(mode);
  const destination = workOrderDestinationLabel(workOrder);
  if (normalized === MOVEMENT_FROM_WORK_ORDER) {
    return {
      from: destination,
      current: SOCAL_INTERIOR_LABEL,
      shortLabel: "From work order",
    };
  }
  if (normalized === MOVEMENT_CURRENT_AT_WORK_ORDER) {
    return {
      from: SOCAL_INTERIOR_LABEL,
      current: destination,
      shortLabel: "Current at work order",
    };
  }
  return { from: "", current: "", shortLabel: "Direction required" };
}

export function isWorkOrderAddMovementModeLocked({
  editingLocked = false,
  rowCount = 0,
  resolvingCount = 0,
} = {}) {
  return (
    Boolean(editingLocked) ||
    Number(rowCount || 0) > 0 ||
    Number(resolvingCount || 0) > 0
  );
}

export function buildWorkOrderAddConfirmationPayload({
  operationId,
  workOrderId,
  scans,
  expectedMembership,
  movementMode,
}) {
  const normalizedMode = normalizeWorkOrderAddMovementMode(movementMode);
  if (!normalizedMode) {
    throw new Error("Choose whether the inventory is from or current at the work order.");
  }
  return {
    operationId,
    workOrderId,
    scans,
    expectedMembership,
    movementMode: normalizedMode,
  };
}
