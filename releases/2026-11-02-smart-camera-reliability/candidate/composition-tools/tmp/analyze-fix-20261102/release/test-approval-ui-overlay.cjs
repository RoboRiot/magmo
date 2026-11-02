"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const F = require("../../ot-collapse-20260928/factory-tools.cjs");
const here = __dirname;
const receipt = JSON.parse(fs.readFileSync(path.join(here, "approval-ui-overlay/receipt.json"), "utf8"));
const file = receipt.changes[0].file;
function visit(node, match) {
  if (!node || typeof node !== "object") return null;
  if (match(node)) return node;
  for (const child of Array.isArray(node) ? node : Object.values(node.props || {})) {
    const found = visit(child, match); if (found) return found;
  }
  return null;
}
async function exercise(source, pending) {
  let frame, cursor;
  const hooks = {
    useState(initial) { const active = frame, index = cursor++; if (!(index in active)) active[index] = typeof initial === "function" ? initial() : initial; return [active[index], (value) => { active[index] = typeof value === "function" ? value(active[index]) : value; }]; },
    useEffect() {}, useCallback: (fn) => fn, useRef: (value) => ({ current: value }),
  };
  const jsx = (type, props) => ({ type, props });
  const request = { id: "synthetic-request", requestId: "synthetic-request", itemId: "AIS-SYNTHETIC", itemName: "Synthetic item", status: "pending", changes: [{ field: "name", before: "Before", after: "After" }] };
  const apiResult = { ok: true, request: { ...request, status: "approved" }, visionIndex: { ok: !pending, itemId: request.itemId }, ...(pending ? { warning: "Approved and saved; Smart Camera indexing is pending." } : {}) };
  let approvals = 0;
  const modules = {
    37876: { jsx, jsxs: jsx, Fragment: "Fragment" }, 14232: hooks,
    65400: { A: "Button" }, 4328: { A: "Alert" }, 20169: { A: "Spinner" }, 48230: "Link",
    89099: { useRouter: () => ({ query: {} }) }, 18638: { A: () => ({ authUser: { uid: "synthetic-user" } }) },
    1527: { h: async (input) => { if (input?.action === "approve") { approvals++; return apiResult; } return { requests: [], pendingCount: 0, canReview: true }; } },
    6209: { A: { Check: "Check", Control: "Control", Label: "Label", Group: "Group", Select: "Select" } },
    22754: { FIELD_LABELS: { name: "Name" } }, 6621: {},
  };
  const requireModule = (id) => { assert.ok(Object.hasOwn(modules, id), `Unexpected live dependency ${id}`); return modules[id]; };
  requireModule.r = () => {};
  requireModule.d = (exports, definitions) => { for (const [name, get] of Object.entries(definitions)) Object.defineProperty(exports, name, { get }); };
  requireModule.n = (value) => () => value;
  const module = { exports: {} };
  new Function(`return (${F.getFactory(source, 33159)})`)()(module, module.exports, requireModule);
  function render(component, props, state) { frame = state; cursor = 0; const tree = component(props); frame = null; return tree; }
  const notificationState = { 0: [request], 1: true, 2: 1, 3: request.id };
  const tree = render(module.exports.default, {}, notificationState);
  const review = visit(tree, (node) => typeof node.type === "function" && node.props?.onReviewed);
  assert.ok(review, "actual compiled notifications contains its review component");
  const reviewTree = render(review.type, review.props, {});
  const approve = visit(reviewTree, (node) => node.type === "Button" && node.props?.children?.includes("Approve selected changes"));
  assert.ok(approve); await approve.props.onClick();
  assert.equal(approvals, 1, "one approval request; no resubmission on index failure");
  const updated = render(module.exports.default, {}, notificationState);
  const warning = visit(updated, (node) => node.type === "Alert" && node.props?.variant === "warning");
  const link = visit(updated, (node) => node.type === "Link" && node.props?.children === "Open saved item");
  return { warning: Boolean(warning), link: link?.props?.href || "", approvals };
}
(async () => {
  const baseline = fs.readFileSync(path.join(here, "source", file), "utf8");
  const patched = fs.readFileSync(path.join(here, "approval-ui-overlay", file), "utf8");
  const before = await exercise(baseline, true); assert.equal(before.warning, false);
  const pending = await exercise(patched, true); assert.equal(pending.warning, true); assert.equal(pending.link, "/NewSearch/item/AIS-SYNTHETIC");
  const complete = await exercise(patched, false); assert.equal(complete.warning, false); assert.equal(complete.link, "");
  const result = { verificationMode: "isolated-compiled-module-synthetic-fixtures", before, pending, complete,
    file, sha256: F.sha(patched), externalWrites: 0, notDeploymentEvidence: true };
  fs.writeFileSync(path.join(here, "approval-ui-overlay/behavior-test.json"), JSON.stringify(result, null, 2) + "\n");
  console.log(JSON.stringify(result));
})().catch((error) => { console.error(error); process.exitCode = 1; });
