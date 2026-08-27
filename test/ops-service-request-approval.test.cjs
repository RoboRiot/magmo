const test = require("node:test");
const assert = require("node:assert/strict");

const {
  hasOverseerApproval,
  normalizeOverseerApprovals,
  requireOverseerApproval,
  setOwnOverseerApproval,
} = require("../lib/ops/serviceRequestApproval.cjs");

const igor = {
  uid: "firebase-igor",
  email: "isavchenko@advancedimagingparts.com",
  name: "Igor Savchenko",
};
const sean = {
  uid: "firebase-sean",
  email: "sean@advancedimagingparts.com",
  name: "Sean Wang",
};

test("each admin approval is preserved by verified identity", () => {
  const one = setOwnOverseerApproval([], igor, true, "2026-08-20T10:00:00.000Z");
  const two = setOwnOverseerApproval(one, sean, true, "2026-08-20T10:01:00.000Z");
  assert.deepEqual(two, [
    {
      approverId: "firebase-igor",
      email: "isavchenko@advancedimagingparts.com",
      name: "Igor Savchenko",
      approvedAt: "2026-08-20T10:00:00.000Z",
    },
    {
      approverId: "firebase-sean",
      email: "sean@advancedimagingparts.com",
      name: "Sean Wang",
      approvedAt: "2026-08-20T10:01:00.000Z",
    },
  ]);
  assert.equal(hasOverseerApproval(two), true);
});

test("an admin can remove only their own approval", () => {
  const approvals = [
    ...setOwnOverseerApproval([], igor, true, "2026-08-20T10:00:00.000Z"),
    ...setOwnOverseerApproval([], sean, true, "2026-08-20T10:01:00.000Z"),
  ];
  const remaining = setOwnOverseerApproval(approvals, igor, false);
  assert.equal(remaining.length, 1);
  assert.equal(remaining[0].approverId, "firebase-sean");
});

test("re-approving replaces the caller record instead of duplicating it", () => {
  const initial = setOwnOverseerApproval(
    [],
    igor,
    true,
    "2026-08-20T10:00:00.000Z"
  );
  const refreshed = setOwnOverseerApproval(
    initial,
    { ...igor, name: "Igor S." },
    true,
    "2026-08-20T11:00:00.000Z"
  );
  assert.equal(refreshed.length, 1);
  assert.equal(refreshed[0].name, "Igor S.");
  assert.equal(refreshed[0].approvedAt, "2026-08-20T11:00:00.000Z");
});

test("acceptance guard checks the current approval list", () => {
  assert.throws(
    () => requireOverseerApproval([]),
    /overseer approval before this request can be added/i
  );
  const approved = setOwnOverseerApproval([], igor, true);
  assert.equal(requireOverseerApproval(approved), true);
  const removed = setOwnOverseerApproval(approved, igor, false);
  assert.throws(() => requireOverseerApproval(removed), /overseer approval/i);
});

test("malformed or duplicate stored approvals are sanitized", () => {
  assert.deepEqual(
    normalizeOverseerApprovals([
      null,
      { approverId: "same", email: "A@EXAMPLE.COM", name: "Old" },
      {
        approverId: "same",
        email: "a@example.com",
        name: "Current",
        approvedAt: "2026-08-20T12:00:00.000Z",
      },
      { name: "No verified identity" },
    ]),
    [
      {
        approverId: "same",
        email: "a@example.com",
        name: "Current",
        approvedAt: "2026-08-20T12:00:00.000Z",
      },
    ]
  );
});

test("unverified callers cannot create an approval", () => {
  assert.throws(
    () => setOwnOverseerApproval([], { email: "admin@example.com" }, true),
    /verified Magmo user/i
  );
});
