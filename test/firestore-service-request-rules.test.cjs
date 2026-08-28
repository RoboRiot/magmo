const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const rules = fs.readFileSync(
  path.join(__dirname, "..", "firestore.rules"),
  "utf8"
);

test("browser clients cannot forge service-request approvals or lifecycle state", () => {
  assert.match(
    rules,
    /match \/ServiceRequests\/\{document\}\s*\{[\s\S]*?allow create, update, delete: if false;/
  );
  assert.match(
    rules,
    /match \/\{collection\}\/\{document=\*\*\}\s*\{[\s\S]*?collection != "ServiceRequests"[\s\S]*?;/
  );
});
