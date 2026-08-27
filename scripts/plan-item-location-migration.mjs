import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const {
  AUTHORITATIVE_BRANCH_OVERRIDES,
  associatedPartIds,
  buildLocationIndexes,
  computePlanHash,
  documentFingerprint,
  encodeFirestoreValue,
  machineStructuralFingerprint,
  planItemLocation,
} = require("../lib/inventory/itemLocationContract.cjs");
const { verifyBackupManifest } = require("../lib/firestoreBackupCodec.cjs");

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDirectory, "..");
const args = process.argv.slice(2);

function argumentValue(name) {
  const prefix = `--${name}=`;
  return args.find((argument) => argument.startsWith(prefix))?.slice(prefix.length) || "";
}

function usage(exitCode = 0) {
  console.log(`Usage: node scripts/plan-item-location-migration.mjs [options]

Builds a deterministic item-location migration plan entirely from a completed,
checksum-verified logical Firestore backup. It never connects to Firestore and
never writes external data.

Required:
  --backup-manifest=PATH    manifest.json from backup-firestore-local.mjs
  --project=PROJECT_ID      Expected Firebase project (for example magmo-ac10c)

Scope (choose zero or one; zero means every Test item):
  --six                     Plan the six audited AIS TRAILERS records
  --item-ids=ID1,ID2        Plan an explicit comma-separated item set

Optional:
  --output=PATH             Output JSON path (default: dated outputs directory)
  --expected-count=N        Refuse if the requested item count differs
  --help                    Show this help
`);
  process.exit(exitCode);
}

if (args.includes("--help")) usage(0);
const manifestArgument = argumentValue("backup-manifest");
const expectedProject = argumentValue("project").trim();
if (!manifestArgument || !expectedProject) usage(1);
if (args.includes("--six") && argumentValue("item-ids")) {
  throw new Error("Use either --six or --item-ids, not both.");
}

const expectedCountArgument = argumentValue("expected-count");
const expectedCount = expectedCountArgument ? Number(expectedCountArgument) : null;
if (expectedCountArgument && (!Number.isInteger(expectedCount) || expectedCount < 0)) {
  throw new Error("--expected-count must be a non-negative integer.");
}

const sixIds = Object.keys(AUTHORITATIVE_BRANCH_OVERRIDES).sort((left, right) =>
  left.localeCompare(right, "en", { numeric: true })
);
const requestedIds = args.includes("--six")
  ? sixIds
  : argumentValue("item-ids")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
const requestedIdSet = requestedIds.length ? new Set(requestedIds) : null;
if (expectedCount != null && requestedIds.length && requestedIds.length !== expectedCount) {
  throw new Error(
    `Requested ${requestedIds.length} unique positions but --expected-count=${expectedCount}.`
  );
}
if (requestedIds.length !== new Set(requestedIds).size) {
  throw new Error("--item-ids contains duplicates.");
}

const manifestPath = path.resolve(repoRoot, manifestArgument);
const backupVerification = await verifyBackupManifest(manifestPath);
const manifest = JSON.parse(await fsPromises.readFile(manifestPath, "utf8"));
if (manifest.sourceProject !== expectedProject) {
  throw new Error(
    `Backup project ${manifest.sourceProject || "(missing)"} does not match --project=${expectedProject}.`
  );
}
const documentPath = backupVerification.documentPath;
const actualBackupSha256 = backupVerification.sha256;

const clients = [];
const machines = [];
const trailers = [];
const items = [];
let parsedDocumentCount = 0;
const input = fs.createReadStream(documentPath, { encoding: "utf8" });
const lines = readline.createInterface({ input, crlfDelay: Infinity });
for await (const line of lines) {
  if (!line.trim()) continue;
  parsedDocumentCount += 1;
  const record = JSON.parse(line);
  const segments = String(record.path || "").split("/").filter(Boolean);
  if (segments.length !== 2) continue;
  const [collection, id] = segments;
  const entry = {
    id,
    data: record.data || {},
    createTime: record.createTime || "",
    updateTime: record.updateTime || "",
  };
  if (collection === "Client") clients.push(entry);
  else if (collection === "Machine") machines.push(entry);
  else if (collection === "Trailers") trailers.push(entry);
  else if (collection === "Test" && (!requestedIdSet || requestedIdSet.has(id))) items.push(entry);
}
if (parsedDocumentCount !== manifest.documentCount) {
  throw new Error(
    `Backup document count mismatch: manifest=${manifest.documentCount}, parsed=${parsedDocumentCount}.`
  );
}
if (requestedIdSet) {
  const found = new Set(items.map((item) => item.id));
  const missing = requestedIds.filter((id) => !found.has(id));
  if (missing.length) throw new Error(`Requested Test records are missing: ${missing.join(", ")}`);
}
if (expectedCount != null && items.length !== expectedCount) {
  throw new Error(`Planned item count ${items.length} does not match --expected-count=${expectedCount}.`);
}

const indexes = buildLocationIndexes({ clients, machines, trailers });
const plannedItems = items
  .map((item) => planItemLocation({ ...item, indexes }))
  .sort((left, right) => left.id.localeCompare(right.id, "en", { numeric: true }));
const affectedMachineIds = Array.from(
  new Set(
    plannedItems
      .filter((item) => item.status === "change")
      .flatMap((item) => [...item.machineBacklinks.add, ...item.machineBacklinks.remove])
  )
).sort();
const machineEntryMap = new Map(machines.map((machine) => [machine.id, machine]));
const machinePreconditions = affectedMachineIds.map((id) => {
  const entry = machineEntryMap.get(id);
  return {
    id,
    exists: Boolean(entry),
    updateTime: entry?.updateTime || "",
    documentFingerprint: entry ? documentFingerprint(entry.data) : "",
    structuralFingerprint: entry ? machineStructuralFingerprint(entry.data) : "",
    associatedPartIds: entry ? associatedPartIds(entry.data) : [],
  };
});

const countStatus = (status) => plannedItems.filter((item) => item.status === status).length;
const plan = {
  format: "magmo-item-location-migration-plan",
  formatVersion: 1,
  readOnly: true,
  createdAt: new Date().toISOString(),
  sourceProject: manifest.sourceProject,
  backup: {
    manifestPath,
    documentPath,
    createdAt: manifest.createdAt,
    documentCount: manifest.documentCount,
    bytes: backupVerification.bytes,
    sha256: actualBackupSha256,
    verified: true,
  },
  requestedItemIds: requestedIds,
  expectedApplyCount: countStatus("change"),
  summary: {
    plannedItemCount: plannedItems.length,
    changeCount: countStatus("change"),
    correctCount: countStatus("correct"),
    reviewRequiredCount: countStatus("review"),
    noAssociationCount: countStatus("none"),
    affectedMachineCount: affectedMachineIds.length,
  },
  machinePreconditions,
  items: plannedItems,
};
plan.planHash = computePlanHash(plan);

const outputArgument = argumentValue("output");
const outputDirectory = path.join(repoRoot, "outputs", "item-location-migration");
const outputPath = outputArgument
  ? path.resolve(repoRoot, outputArgument)
  : path.join(
      outputDirectory,
      `${new Date().toISOString().replace(/[:.]/g, "-")}-plan.json`
    );
await fsPromises.mkdir(path.dirname(outputPath), { recursive: true });
await fsPromises.writeFile(outputPath, `${JSON.stringify(plan, null, 2)}\n`, {
  encoding: "utf8",
  flag: "wx",
});

console.log(
  JSON.stringify(
    {
      dryRun: true,
      sourceProject: plan.sourceProject,
      outputPath,
      backupSha256: actualBackupSha256,
      planHash: plan.planHash,
      expectedApplyCount: plan.expectedApplyCount,
      summary: plan.summary,
    },
    null,
    2
  )
);
