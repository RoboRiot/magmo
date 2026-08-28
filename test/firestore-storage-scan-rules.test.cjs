const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const rules = fs.readFileSync(
  path.join(__dirname, "..", "firestore.rules"),
  "utf8"
);
const catchAll = rules.match(
  /match \/\{collection\}\/\{document=\*\*\}\s*\{([\s\S]*?)\n\s*\}/
)?.[1] || "";

test("browser clients cannot read or forge storage scan sessions", () => {
  assert.match(
    rules,
    /match \/StorageUnitScanSessions\/\{document=\*\*\}\s*\{\s*allow read, write: if false;/
  );
  assert.match(catchAll, /allow read:[\s\S]*?collection != "StorageUnitScanSessions"/);
  assert.match(
    catchAll,
    /allow create, update, delete:[\s\S]*?collection != "StorageUnitScanSessions"/
  );
});

test("reserved storage scan control records are also excluded from the catch-all", () => {
  assert.match(
    rules,
    /match \/StorageUnitScanControls\/\{document=\*\*\}\s*\{\s*allow read, write: if false;/
  );
  assert.match(
    catchAll,
    /allow read:[\s\S]*?collection != "StorageUnitScanControls";/
  );
  assert.match(
    catchAll,
    /allow create, update, delete:[\s\S]*?collection != "StorageUnitScanControls";/
  );
});
