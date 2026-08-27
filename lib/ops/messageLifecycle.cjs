function isClosedMessageIngestionBoundary(workflowStage) {
  return String(workflowStage || "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_") === "closed";
}

module.exports = { isClosedMessageIngestionBoundary };
