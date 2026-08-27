"use strict";

const OPS_SEARCH_TAB_ORDER = Object.freeze([
  "unassigned",
  "remote",
  "active",
  "scheduled",
  "on_hold",
  "inactive",
  "service_complete",
  "done",
  "closed",
]);

function bestOpsSearchTab(tabCounts = {}) {
  const best = OPS_SEARCH_TAB_ORDER.reduce((current, candidate) =>
    Number(tabCounts[candidate] || 0) > Number(tabCounts[current] || 0)
      ? candidate
      : current
  );
  return Number(tabCounts[best] || 0) > 0 ? best : "";
}

function buildOpsSearchResultKey(query, filteredByTab = {}) {
  const normalizedQuery = String(query || "").trim().toLowerCase();
  if (!normalizedQuery) return "";
  const resultSets = OPS_SEARCH_TAB_ORDER.map((stage) => {
    const ids = (Array.isArray(filteredByTab[stage])
      ? filteredByTab[stage]
      : []
    )
      .map((workOrder) =>
        String(workOrder?.id || workOrder?.number || "").trim().toLowerCase()
      )
      .filter(Boolean)
      .sort();
    return `${stage}:${ids.join(",")}`;
  });
  return `${normalizedQuery}|${resultSets.join("|")}`;
}

module.exports = {
  OPS_SEARCH_TAB_ORDER,
  bestOpsSearchTab,
  buildOpsSearchResultKey,
};
