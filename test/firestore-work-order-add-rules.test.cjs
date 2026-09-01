const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const rules = fs.readFileSync(
  path.join(__dirname, "..", "firestore.rules"),
  "utf8"
);
const catchAll =
  rules.match(
    /match \/\{collection\}\/\{document=\*\*\}\s*\{([\s\S]*?)\n\s*\}/
  )?.[1] || "";

test("browser clients cannot forge work-order-add operation receipts", () => {
  assert.match(
    rules,
    /match \/InventoryWorkOrderAddOperations\/\{document=\*\*\}\s*\{\s*allow read, write: if false;/
  );
  assert.match(
    catchAll,
    /allow read:[\s\S]*?collection != "InventoryWorkOrderAddOperations"/
  );
  assert.match(
    catchAll,
    /allow create, update, delete:[\s\S]*?collection != "InventoryWorkOrderAddOperations"/
  );
});

test("browser clients cannot read or forge Work Order scanner sessions or events", () => {
  assert.match(
    rules,
    /match \/WorkOrderAddScanSessions\/\{document=\*\*\}\s*\{\s*allow read, write: if false;/
  );
  const exclusions = catchAll.match(
    /collection != "WorkOrderAddScanSessions"/g
  ) || [];
  assert.equal(
    exclusions.length,
    2,
    "the catch-all must exclude WorkOrderAddScanSessions from reads and writes"
  );
});

test("ordinary items remain editable but work-order-add audit rows are server-owned", () => {
  assert.match(
    rules,
    /match \/Test\/\{itemId\}\s*\{[\s\S]*?allow create, update, delete: if internalUser\(\);/
  );
  assert.match(
    rules,
    /match \/WorkOrderAddHistory\/\{operationId\}\s*\{[\s\S]*?allow read: if approvedUser\(\);[\s\S]*?allow create, update, delete: if false;/
  );
  assert.match(
    rules,
    /match \/\{subcollection\}\/\{document=\*\*\}\s*\{[\s\S]*?subcollection != "WorkOrderAddHistory";/
  );
  assert.match(catchAll, /allow read:[\s\S]*?collection != "Test"/);
  assert.match(
    catchAll,
    /allow create, update, delete:[\s\S]*?collection != "Test"/
  );
});
