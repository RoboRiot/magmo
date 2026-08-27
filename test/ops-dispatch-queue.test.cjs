const test = require("node:test");
const assert = require("node:assert/strict");

const {
  sortActiveWorkOrders,
  supportModeForWorkOrder,
} = require("../lib/ops/dispatchQueue.cjs");

test("active queue sorts by priority and newest Slack activity within a priority", () => {
  const queue = sortActiveWorkOrders([
    {
      id: "soon-new",
      priorityTier: "needs_scheduled",
      lastActivityAt: "2026-08-19T18:00:00.000Z",
    },
    {
      id: "hard-old",
      priorityTier: "hard_down",
      lastActivityAt: "2026-08-19T10:00:00.000Z",
    },
    {
      id: "asap-old",
      priorityTier: "in_progress",
      lastActivityAt: "2026-08-19T11:00:00.000Z",
    },
    {
      id: "hard-new",
      priorityTier: "hard_down",
      lastActivityAt: "2026-08-19T19:00:00.000Z",
    },
  ]);

  assert.deepEqual(
    queue.map((workOrder) => workOrder.id),
    ["hard-new", "hard-old", "asap-old", "soon-new"]
  );
});

test("support mode maps remote, hybrid, and physical work consistently", () => {
  assert.equal(
    supportModeForWorkOrder({ supportModeReceived: "hybrid" }),
    "hybrid"
  );
  assert.equal(
    supportModeForWorkOrder({ workflowStatus: "remote" }),
    "remote"
  );
  assert.equal(
    supportModeForWorkOrder({
      assignees: [{ workMode: "remote" }, { workMode: "physical" }],
    }),
    "hybrid"
  );
  assert.equal(
    supportModeForWorkOrder({ workflowStatus: "active" }),
    "in_person"
  );
});
