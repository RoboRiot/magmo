"use strict";
const assert = require("node:assert/strict"), fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto"), cp = require("node:child_process");
const { cert, initializeApp } = require("firebase-admin/app");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const { encodeFirestoreValue } = require("../lib/firestoreBackupCodec.cjs");
const { resolveWorkOrderDestination } = require("../lib/inventory/workOrderAddService.cjs");
const root = path.resolve(__dirname, "..");
const repairId = "work-order-10658-current-bluefolder-warehouse-20260925";
const paths = ["OpsWorkOrders/10658", "Client/AIS94688", "Client/AIS89914", "Client/AIS25097", "Machine/AIS12954"];
const stable = (v) => Array.isArray(v) ? v.map(stable) : v && typeof v === "object" ? Object.fromEntries(Object.keys(v).sort().map(key => [key, stable(v[key])])) : v;
const sha = (v) => crypto.createHash("sha256").update(typeof v === "string" ? v : JSON.stringify(stable(v))).digest("hex");
const populated = (v) => v !== undefined && v !== null && !(typeof v === "string" && !v.trim());
function initializeDatabase() {
  for (const name of [".env.local", ".env"]) {
    const file = path.join(root, name); if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const match = line.trim().match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (!match || process.env[match[1]] != null) continue;
      let value = match[2].trim(); if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
      process.env[match[1]] = value.replace(/\\n/g, "\n");
    }
  }
  assert.equal(process.env.FIREBASE_PROJECT_ID, "magmo-ac10c");
  const account = JSON.parse(fs.readFileSync(path.resolve(root, process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH || process.env.FIREBASE_SERVICE_ACCOUNT_PATH || process.env.GOOGLE_APPLICATION_CREDENTIALS), "utf8"));
  assert.equal(account.project_id, "magmo-ac10c");
  initializeApp({ credential: cert(account), projectId: account.project_id });
  return getFirestore();
}
function freshBlueFolderProof() {
  const code = String.raw`
import json,sys,hashlib
from pathlib import Path
from dotenv import load_dotenv
root=Path(r'C:\Users\Owner\Desktop\warehouse\bluefolder_listener')
assert hashlib.sha256((root/'bluefolder_slack_listener_v2.py').read_bytes()).hexdigest()=='7f28a4c93327ef111b02c6d068cc86bb4ec0561b55dc06a697bcfc5fcc76c71c'
for p in [root/'.env.local',root/'.env',root.parent/'.env.local',root.parent/'.env']:
 if p.exists():load_dotenv(p,override=False)
sys.path.insert(0,str(root))
import bluefolder_slack_listener_v2 as m
client=m.BlueFolderClient(m.SETTINGS)
detail=m.extract_work_order_fields(client.get_work_order_for_status_sync('10658'),m.SETTINGS)
listed=[m.extract_work_order_fields(row,m.SETTINGS) for row in client.list_recent_work_orders()]
listed=[row for row in listed if row.get('id')=='10658']
assert len(listed)==1
keys=['id','number','bluefolder_customer_id','bluefolder_location_id','bluefolder_location_name','bluefolder_address_street','bluefolder_address_city','bluefolder_address_state','bluefolder_address_postal_code','bluefolder_equipment_ids','bluefolder_equipment_names']
for row in [detail,listed[0]]:
 assert row.get('id')=='10658' and row.get('number')=='10658'
 assert row.get('bluefolder_customer_id')=='34579389' and row.get('bluefolder_location_id')=='35057801'
 assert not row.get('bluefolder_equipment_ids') and not row.get('bluefolder_equipment_names')
 assert row.get('bluefolder_address_city')=='Lathrop' and row.get('bluefolder_address_postal_code')=='95330'
print(json.dumps({'checkedAt':m.utc_now_iso(),'directDetail':{k:detail[k] for k in keys if k in detail},'list':{k:listed[0][k] for k in keys if k in listed[0]}}))
`;
  const result = cp.spawnSync("ssh", ["-o", "ConnectTimeout=10", "magmo-server", 'C:/Progra~1/Python314/python.exe -B -c "import sys;exec(sys.stdin.read())"'], { input: code, encoding: "utf8", timeout: 60000, maxBuffer: 1024 * 1024 });
  assert(!result.error && result.status === 0, "Fresh direct/list BlueFolder proof failed; no writes allowed");
  return JSON.parse(result.stdout);
}
const encodeSnapshot = (snapshot) => ({ path: snapshot.ref.path, exists: snapshot.exists, updateTime: snapshot.updateTime?.toDate().toISOString(), updateTimeValue: encodeFirestoreValue(snapshot.updateTime), data: encodeFirestoreValue(snapshot.data()) });
function verifyInputs(snapshots) {
  assert(snapshots.every(s => s.exists), "Reviewed documents must exist");
  const [wo, oldClient, target, canonical, machine] = snapshots.map(s => s.data());
  assert.equal(wo.clientId, "AIS94688");
  if (populated(wo.clientRef)) assert.equal(wo.clientRef?.path, "Client/AIS94688");
  assert.equal(wo.clientLinkSource, "reviewed_recent_work_order_links_20260925");
  assert.equal(wo.recentLinksRepairId, "recent-work-order-site-links-20260925");
  assert.equal(String(wo.number || wo.workOrderId), "10658");
  assert.equal(String(wo.bluefolderCustomerId), "34579389");
  assert.equal(String(wo.bluefolderLocationId), "35057801");
  for (const key of ["machineId", "machineRef", "machineName", "machine", "Machine", "trailerId", "trailerRef", "trailerName", "trailer", "Trailer", "deletedAt", "archivedAt"]) assert(!populated(wo[key]), `Existing protected field: ${key}`);
  assert(wo.deleted !== true && wo.archived !== true);
  for (const value of [wo.bluefolderEquipmentIds, wo.bluefolderEquipmentNames, wo.blueFolder?.equipmentIds, wo.blueFolder?.equipmentNames]) assert(value == null || (Array.isArray(value) && !value.length), "Existing selected equipment");
  for (const [key, expected] of [["customerId", "34579389"], ["customerLocationId", "35057801"]]) if (populated(wo.blueFolder?.[key])) assert.equal(String(wo.blueFolder[key]), expected);
  assert.equal(oldClient.bluefolderCustomerId, "34579389"); assert.equal(oldClient.bluefolderLocationId, "39226291");
  assert.equal(target.bluefolderCustomerId, "34579389"); assert.equal(target.bluefolderLocationId, "35057801");
  assert.equal(target.address?.street, "17410 Murphy Pkwy."); assert.equal(target.address?.city, "Lathrop"); assert.equal(target.address?.state, "CA"); assert.equal(target.address?.postalCode, "95330");
  assert(target.bluefolderLocations.some(site => site.bluefolderLocationId === "35057801" && site.isPrimary === true));
  for (const value of [oldClient, target, canonical, machine]) assert(!value.deletedAt && !value.archivedAt && value.deleted !== true && value.archived !== true && value.bluefolderInactive !== true);
  assert.equal(machine.client?.path, "Client/AIS25097");
  assert(canonical.machines.some(ref => ref.path === "Machine/AIS12954"));
}
function buildPatch(db, target, now) {
  return { clientId: "AIS89914", clientRef: db.doc("Client/AIS89914"), clientName: target.name,
    clientLocation: target.location || target.address.formatted,
    clientLinkSource: "reviewed_warehouse_site_change_20260925", clientLinkMatchReason: "bluefolder_customer_location_exact",
    clientLinkedAtIso: now.toISOString(), warehouseDestinationRepairId: repairId,
    warehouseDestinationRepairedAtIso: now.toISOString(), updatedAt: Timestamp.fromDate(now) };
}
async function main() {
  const mode = process.argv[2] || "--dry-run";
  assert(["--dry-run", "--apply"].includes(mode), "Use --dry-run or --apply <reviewed-plan.json>");
  const manifestPath = path.join(root, "outputs/firestore-backups/2026-09-25-work-order-warehouse-slack-predeploy/manifest.json");
  const manifestBytes = fs.readFileSync(manifestPath), manifest = JSON.parse(manifestBytes);
  assert.equal(manifest.status, "complete"); assert(manifest.documentCount >= 187443);
  const proof = freshBlueFolderProof(), db = initializeDatabase(), refs = paths.map(p => db.doc(p));
  const directory = path.join(root, "outputs/work-order-10658-warehouse-site-20260925", `${mode.slice(2)}-${new Date().toISOString().replace(/[:.]/g, "-")}`);
  fs.mkdirSync(directory, { recursive: true });
  const snapshots = await db.getAll(...refs); verifyInputs(snapshots);
  const before = snapshots.map(encodeSnapshot), now = new Date(), patch = buildPatch(db, snapshots[2].data(), now);
  fs.writeFileSync(path.join(directory, "before.json"), JSON.stringify({ proof, snapshots: before }, null, 2) + "\n", { flag: "wx" });
  const simulated = new Map(snapshots.map(s => [s.ref.path, s]));
  simulated.set(paths[0], { ...snapshots[0], id: "10658", exists: true, data: () => ({ ...snapshots[0].data(), ...patch }) });
  const destination = await resolveWorkOrderDestination({ get: async ref => { assert(simulated.has(ref.path), "Unexpected read"); return simulated.get(ref.path); } }, db, "10658", now.toISOString());
  assert.equal(destination.association.clientId, "AIS25097"); assert.equal(destination.association.machineId, "AIS12954");
  const plan = { repairId, checkedAt: now.toISOString(), backupManifestSha256: sha(manifestBytes.toString()), mode, proof,
    beforeSha256: sha(before), snapshots: before, patch: encodeFirestoreValue(patch), allowedFields: Object.keys(patch).sort(),
    destination: { sourceClientId: destination.workOrder.sourceClientId, clientId: destination.association.clientId, machineId: destination.association.machineId }, writes: mode === "--apply" ? 1 : 0 };
  fs.writeFileSync(path.join(directory, "plan.json"), JSON.stringify(plan, null, 2) + "\n", { flag: "wx" });
  if (mode === "--apply") {
    assert(process.argv[3], "A reviewed dry-run plan is required");
    const approvedPath = path.resolve(process.argv[3]);
    assert(approvedPath.startsWith(path.join(root, "outputs/work-order-10658-warehouse-site-20260925") + path.sep));
    const approved = JSON.parse(fs.readFileSync(approvedPath, "utf8"));
    assert.equal(approved.repairId, repairId); assert.equal(approved.mode, "--dry-run");
    assert.equal(approved.backupManifestSha256, plan.backupManifestSha256);
    assert.equal(approved.beforeSha256, plan.beforeSha256, "Reviewed preimages changed: stop, do not retry writes");
    await db.runTransaction(async tx => {
      const live = await tx.getAll(...refs); verifyInputs(live);
      assert.equal(sha(live.map(encodeSnapshot)), plan.beforeSha256, "Concurrent change: stop without writes");
      tx.update(refs[0], patch, { lastUpdateTime: snapshots[0].updateTime });
    }, { maxAttempts: 1 });
    const afterSnapshots = await db.getAll(...refs), after = afterSnapshots.map(encodeSnapshot);
    fs.writeFileSync(path.join(directory, "after.json"), JSON.stringify(after, null, 2) + "\n", { flag: "wx" });
    const afterData = after[0].data, priorData = before[0].data, encodedPatch = encodeFirestoreValue(patch);
    assert.equal(sha(afterData), sha({ ...priorData, ...encodedPatch }), "Unexpected post-write difference; preserve evidence and stop");
    for (let index = 1; index < paths.length; index++) assert.equal(sha(after[index]), sha(before[index]), "A control document changed concurrently");
    const liveDestination = await resolveWorkOrderDestination({ get: ref => ref.get() }, db, "10658", new Date().toISOString());
    assert.equal(liveDestination.association.clientId, "AIS25097"); assert.equal(liveDestination.association.machineId, "AIS12954");
    fs.writeFileSync(path.join(directory, "verified.json"), JSON.stringify({ repairId, checkedAt: new Date().toISOString(), writes: 1, changedFields: plan.allowedFields,
      clientId: "AIS89914", inventoryClientId: "AIS25097", inventoryMachineId: "AIS12954", workflowHistoryPreserved: true, clientsAndMachinesUnchanged: true, inventoryWrites: 0 }, null, 2) + "\n", { flag: "wx" });
  }
  console.log(JSON.stringify({ mode, directory, planPath: path.join(directory, "plan.json"), beforeSha256: plan.beforeSha256, changedFields: plan.allowedFields, destination: plan.destination, writes: plan.writes }, null, 2));
}
module.exports = { verifyInputs, buildPatch };
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
