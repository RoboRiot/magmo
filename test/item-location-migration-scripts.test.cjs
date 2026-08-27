const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const repoRoot = path.resolve(__dirname, "..");
const fixture = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "fixtures", "item-location-six-records.json"),
    "utf8"
  )
);

function writeVerifiedFixtureBackup(directory) {
  const records = [];
  for (const [collection, entries] of [
    ["Client", fixture.clients],
    ["Machine", fixture.machines],
    ["Trailers", fixture.trailers],
    ["Test", fixture.items],
  ]) {
    for (const entry of entries) {
      records.push({
        path: `${collection}/${entry.id}`,
        createTime: entry.createTime || "2026-08-26T00:00:00.000Z",
        updateTime: entry.updateTime || "2026-08-26T00:00:00.000Z",
        readTime: "2026-08-26T22:00:00.000Z",
        data: entry.data || Object.fromEntries(
          Object.entries(entry).filter(([key]) => key !== "id")
        ),
      });
    }
  }
  const jsonl = `${records.map((record) => JSON.stringify(record)).join("\n")}\n`;
  const documentPath = path.join(directory, "firestore-documents.jsonl");
  fs.writeFileSync(documentPath, jsonl);
  const collectionCounts = {
    Client: fixture.clients.length,
    Machine: fixture.machines.length,
    Test: fixture.items.length,
    Trailers: fixture.trailers.length,
  };
  const manifest = {
    format: "magmo-firestore-jsonl-backup",
    formatVersion: 1,
    status: "complete",
    sourceProject: "fixture-project",
    createdAt: "2026-08-26T22:00:00.000Z",
    documentCount: records.length,
    collectionCount: Object.keys(collectionCounts).length,
    collectionCounts,
    scope: {
      firestoreIncluded: true,
      firestoreOnly: true,
      storageIncluded: false,
      storageModified: false,
      authIncluded: false,
    },
    git: { available: false, branch: null, sha: null, dirty: null },
    verification: {
      artifactClosedBeforeInspection: true,
      byteCountRechecked: true,
      checksumRecomputed: true,
      documentCountRecounted: true,
      artifactStableDuringInspection: true,
    },
    files: {
      "firestore-documents.jsonl": {
        bytes: Buffer.byteLength(jsonl),
        sha256: crypto.createHash("sha256").update(jsonl).digest("hex"),
      },
    },
  };
  const manifestPath = path.join(directory, "manifest.json");
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  return manifestPath;
}

test("offline planner produces a checksum-bound six-record plan", (t) => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "item-location-plan-"));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const manifestPath = writeVerifiedFixtureBackup(directory);
  const outputPath = path.join(directory, "plan.json");
  const result = spawnSync(
    process.execPath,
    [
      "scripts/plan-item-location-migration.mjs",
      `--backup-manifest=${manifestPath}`,
      "--project=fixture-project",
      "--six",
      "--expected-count=6",
      `--output=${outputPath}`,
    ],
    { cwd: repoRoot, encoding: "utf8", windowsHide: true }
  );
  assert.equal(result.status, 0, result.stderr || result.stdout);
  const plan = JSON.parse(fs.readFileSync(outputPath, "utf8"));
  assert.equal(plan.readOnly, true);
  assert.equal(plan.sourceProject, "fixture-project");
  assert.equal(plan.summary.plannedItemCount, 6);
  assert.equal(plan.summary.changeCount, 6);
  assert.equal(plan.summary.reviewRequiredCount, 0);
  assert.equal(plan.expectedApplyCount, 6);
  assert.match(plan.planHash, /^[a-f0-9]{64}$/);
  assert.equal(plan.backup.verified, true);
  assert.match(result.stdout, /"dryRun": true/);
});

test("apply and restore scripts document prepare-before-apply gates", () => {
  const applyHelp = spawnSync(
    process.execPath,
    ["scripts/apply-item-location-migration.mjs", "--help"],
    { cwd: repoRoot, encoding: "utf8", windowsHide: true }
  );
  const restoreHelp = spawnSync(
    process.execPath,
    ["scripts/restore-item-location-migration.mjs", "--help"],
    { cwd: repoRoot, encoding: "utf8", windowsHide: true }
  );
  assert.equal(applyHelp.status, 0, applyHelp.stderr);
  assert.equal(restoreHelp.status, 0, restoreHelp.stderr);
  assert.match(applyHelp.stdout, /--prepare-preimage/);
  assert.match(applyHelp.stdout, /--preimage=PATH/);
  assert.match(applyHelp.stdout, /--preimage-hash=SHA256/);
  assert.match(applyHelp.stdout, /--confirm=APPLY_ITEM_LOCATION_MIGRATION/);
  assert.match(restoreHelp.stdout, /--confirm=RESTORE_ITEM_LOCATION_MIGRATION/);
  assert.match(applyHelp.stdout, /zero Firestore writes/);
  assert.match(restoreHelp.stdout, /readyBeforeApply: true/);
  assert.match(restoreHelp.stdout, /Without --apply/);
});

test("apply authorization refuses to run without the exact prepared artifact gates", () => {
  const result = spawnSync(
    process.execPath,
    [
      "scripts/apply-item-location-migration.mjs",
      "--plan=missing-plan.json",
      "--project=fixture-project",
      "--backup-manifest=missing-manifest.json",
      `--backup-hash=${"b".repeat(64)}`,
      `--plan-hash=${"p".repeat(64)}`,
      "--expected-count=6",
      "--apply",
      "--confirm=APPLY_ITEM_LOCATION_MIGRATION",
    ],
    { cwd: repoRoot, encoding: "utf8", windowsHide: true }
  );
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /requires exact --preimage and --preimage-hash gates/);
  assert.doesNotMatch(result.stderr, /missing-plan/);
});

test("rollback runbook requires preparation and restore-readiness before apply", () => {
  const runbook = fs.readFileSync(
    path.join(repoRoot, "docs", "ITEM_LOCATION_OVERHAUL_ROLLBACK.md"),
    "utf8"
  );
  const prepareIndex = runbook.indexOf("--prepare-preimage --preimage=");
  const readinessIndex = runbook.indexOf("readyBeforeApply: true", prepareIndex);
  const applyIndex = runbook.indexOf(
    "--preimage-hash=\"<preimage-sha256>\" --apply --confirm=APPLY_ITEM_LOCATION_MIGRATION",
    readinessIndex
  );
  assert.ok(prepareIndex >= 0, "runbook has an explicit prepare command");
  assert.ok(readinessIndex > prepareIndex, "restore readiness follows preparation");
  assert.ok(applyIndex > readinessIndex, "Firestore apply follows restore readiness");
  assert.match(runbook, /apply script never creates a preimage/i);
});
