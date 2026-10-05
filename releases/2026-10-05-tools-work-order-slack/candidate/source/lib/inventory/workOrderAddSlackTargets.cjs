"use strict";

// Only the confirmation's server-written manifest may choose what reaches
// Slack. Contents still move in Magmo; a container contributes one Slack row.
function confirmedSlackTarget(result, id) {
  const invalid = () => {
    const error = new Error("This record is not in the successfully saved Slack list.");
    Object.assign(error, { code: "confirmed_item_required", statusCode: 409 });
    throw error;
  };
  if (!Array.isArray(result?.items) || result.items.length !== result.itemCount) invalid();
  if (!Object.hasOwn(result, "slackTargets")) {
    const item = result.items.find((entry) => entry.id === id);
    if (!item) invalid();
    return { ...item, kind: "item", itemIds: [id] };
  }
  if (!Array.isArray(result.slackTargets) || !result.slackTargets.length) invalid();
  const ids = new Set();
  for (const target of result.slackTargets) {
    if (!target || typeof target.id !== "string" || ids.has(target.id) ||
        !["item", "tool", "bin", "pallet"].includes(target.kind)) invalid();
    ids.add(target.id);
  }
  const target = result.slackTargets.find((entry) => entry.id === id);
  if (!target) invalid();
  const container = target.kind === "bin" || target.kind === "pallet";
  const itemIds = container ? target.itemIds : [target.id];
  if (!Array.isArray(itemIds) || !itemIds.length || new Set(itemIds).size !== itemIds.length) invalid();
  for (const memberId of itemIds) {
    const moved = result.items.find((entry) => entry.id === memberId);
    if (!moved || (moved.kind || "item") !== (target.kind === "tool" ? "tool" : "item")) invalid();
  }
  return { ...target, itemIds };
}

function slackListForTarget(target, movementMode) {
  return target.kind === "tool" ? "tools" : movementMode === "from_work_order" ? "receiving" : "shipping";
}

module.exports = { confirmedSlackTarget, slackListForTarget };
