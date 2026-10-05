"use strict";

function selectToolWorkOrderIndex(workOrders, currentWorkOrder = "", editingIndex = null) {
  if (!Array.isArray(workOrders) || !workOrders.length) return 0;
  if (Number.isInteger(editingIndex) && editingIndex >= 0 && editingIndex < workOrders.length) return editingIndex;
  const preferred = String(currentWorkOrder || "").trim();
  const linked = preferred ? workOrders.findIndex((entry) => String(entry?.workOrder || "").trim() === preferred) : -1;
  if (linked >= 0) return linked;
  let bestIndex = 0;
  let bestTime = Date.parse(workOrders[0]?.date || "") || 0;
  workOrders.forEach((entry, index) => {
    const parsed = Date.parse(entry?.date || "") || 0;
    if (parsed >= bestTime) { bestIndex = index; bestTime = parsed; }
  });
  return bestIndex;
}

module.exports = { selectToolWorkOrderIndex };
