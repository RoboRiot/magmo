// Exact user-reviewed repair: WO 10659 -> Prohealth NOHO -> Trailer 20.
// Default dry-run. No inventory, location, workflow, model, or name changes.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { BlueFolderClient, extractWorkOrderFields, getBlueFolderSlackSettings } from '../lib/bluefolder/client.js';
const require = createRequire(import.meta.url);
const { encodeFirestoreValue, verifyBackupManifest } = require('../lib/firestoreBackupCodec.cjs');
const { resolveWorkOrderMachineLink, resolveWorkOrderTrailerLink, buildWorkOrderMachineLinkPatch } = require('../lib/ops/workOrderMachineLink.cjs');
const { resolveWorkOrderDestination } = require('../lib/inventory/workOrderAddService.cjs');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const REPAIR_ID = 'work-order-10659-trailer-link-20260924';
const EQ = 'EC91B7DD-18D1-487C-B4E6-9F43EA837248';
const MACHINE = 'AIS82553', TRAILER = 'AIS20', CLIENT = 'AIS78594';
const SOURCE = 'reviewed_trailer20_bluefolder_link_20260924';
const paths = ['OpsWorkOrders/10659', `Machine/${MACHINE}`, `Trailers/${TRAILER}`, `Client/${CLIENT}`];
const normalize = v => String(v || '').trim().toUpperCase();
const sort = v => Array.isArray(v) ? v.map(sort) : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map(k => [k, sort(v[k])])) : v;
const stable = v => JSON.stringify(sort(encodeFirestoreValue(v)));
const typedId = (v, collection) => {
  if (v == null || v === '') return '';
  const p = typeof v === 'string' ? v : v.path;
  assert.equal(typeof p, 'string', 'Malformed typed relationship');
  if (!p.includes('/')) return p;
  assert.equal(p.split('/')[0], collection, 'Wrong relationship collection');
  assert.equal(p.split('/').length, 2, 'Malformed relationship path');
  return p.split('/')[1];
};
export function validateReviewedRecords({ wo, machine, trailer, client, blueFolder, machines }) {
  for (const d of [wo, machine, trailer, client]) assert(d && !d.deleted && !d.deletedAt && !d.archived && !d.archivedAt, 'Missing or inactive target');
  assert.equal(String(blueFolder.id), '10659');
  assert.deepEqual(blueFolder.equipmentIds.map(normalize), [EQ]);
  assert.equal(String(blueFolder.customerId), '34579389');
  assert.equal(String(blueFolder.customerLocationId), '35057812');
  assert.equal(wo.clientId, CLIENT);
  if (wo.clientRef) assert.equal(typedId(wo.clientRef, 'Client'), CLIENT);
  assert.equal(String(wo.bluefolderServiceRequestId || wo.workOrderId), '10659');
  assert.equal(String(wo.bluefolderCustomerId), '34579389');
  assert.equal(String(wo.bluefolderLocationId), '35057812');
  for (const k of ['machineId', 'machineRef']) if (wo[k]) assert.equal(typedId(wo[k], 'Machine'), MACHINE, 'Work order has a different machine');
  for (const k of ['trailerId', 'trailerRef']) if (wo[k]) assert.equal(typedId(wo[k], 'Trailers'), TRAILER, 'Work order has a different trailer');
  if (wo.bluefolderEquipmentIds?.length) assert.deepEqual(wo.bluefolderEquipmentIds.map(normalize), [EQ]);
  assert.equal(`${client.bluefolderCustomerId}:${client.bluefolderLocationId}`, '34579389:35057812');
  assert.equal(machine.name, 'Trailer AIS20 - HDxt 23x');
  assert.equal(trailer.name, 'AIS20 - HDxt 23x');
  for (const k of ['bluefolderEquipmentId', 'blueFolderEquipmentId']) if (machine[k]) assert.equal(normalize(machine[k]), EQ, 'Machine has a different BlueFolder ID');
  for (const row of machines) {
    if ([row.data.bluefolderEquipmentId, row.data.blueFolderEquipmentId].some(v => normalize(v) === EQ)) {
      assert.equal(row.id, MACHINE, 'Duplicate equipment mapping, including archived records');
    }
  }
}
function loadEnv() {
  for (const name of ['.env.local', '.env']) {
    const file = path.join(root, name); if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
      const m = line.trim().match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (!m || process.env[m[1]] != null) continue;
      let v = m[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      process.env[m[1]] = v.replace(/\\n/g, '\n');
    }
  }
}
async function main() {
  const args = process.argv.slice(2); assert(args.every(v => ['--apply', '--dry-run'].includes(v)), 'Unknown argument');
  assert(!(args.includes('--apply') && args.includes('--dry-run')), 'Choose one mode');
  const apply = args.includes('--apply');
  const manifestPath = path.join(root, 'outputs/firestore-backups/2026-09-24-work-order-machine-link-predeploy/manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.equal(manifest.sourceProject, 'magmo-ac10c'); assert.equal(manifest.status, 'complete');
  assert(manifest.completedAt.startsWith('2026-09-24') && ['Test', 'Machine', 'Trailers', 'OpsWorkOrders', 'Client'].every(name => manifest.collectionCounts[name] > 0));
  const backup = await verifyBackupManifest(manifestPath);
  loadEnv(); assert.equal(process.env.FIREBASE_PROJECT_ID, 'magmo-ac10c');
  const account = JSON.parse(fs.readFileSync(path.resolve(root, process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH || process.env.FIREBASE_SERVICE_ACCOUNT_PATH || process.env.GOOGLE_APPLICATION_CREDENTIALS), 'utf8'));
  assert.equal(account.project_id, 'magmo-ac10c');
  if (!getApps().length) initializeApp({ credential: cert(account), projectId: account.project_id });
  const db = getFirestore(), receiptRef = db.doc(`DataRepairReceipts/${REPAIR_ID}`);
  if ((await receiptRef.get()).exists) { console.log(JSON.stringify({ alreadyApplied: true, repairId: REPAIR_ID })); return; }
  const settings = getBlueFolderSlackSettings();
  const blueFolder = extractWorkOrderFields(await new BlueFolderClient(settings).getWorkOrder('10659'), settings);
  const snapshots = await db.getAll(...paths.map(p => db.doc(p)));
  assert(snapshots.every(d => d.exists));
  const baseline = new Map(snapshots.map(s => [s.ref.path, s.data()]));
  const stamp = new Date().toISOString(), output = path.join(root, `outputs/work-order-10659-trailer-link-20260924/${apply ? 'apply' : 'dry-run'}-${stamp.replace(/[:.]/g, '-')}`);
  fs.mkdirSync(output, { recursive: false });
  const save = (name, value) => fs.writeFileSync(path.join(output, name), JSON.stringify(encodeFirestoreValue(value), null, 2), { flag: 'wx' });
  save('preimages.json', { repairId: REPAIR_ID, createdAt: stamp, backup, blueFolder, documents: snapshots.map(s => ({ path: s.ref.path, updateTime: s.updateTime, data: s.data() })) });
  const result = await db.runTransaction(async tx => {
    assert(!(await tx.get(receiptRef)).exists, 'Repair already applied');
    const docs = await Promise.all(paths.map(p => tx.get(db.doc(p))));
    for (const d of docs) assert(d.exists && stable(d.data()) === stable(baseline.get(d.ref.path)), `Target changed after backup: ${d.ref.path}`);
    const machines = (await tx.get(db.collection('Machine'))).docs.map(d => ({ id: d.id, data: d.data(), ref: d.ref }));
    const trailers = (await tx.get(db.collection('Trailers'))).docs.map(d => ({ id: d.id, data: d.data(), ref: d.ref }));
    const [wo, machine, trailer, client] = docs.map(d => d.data());
    validateReviewedRecords({ wo, machine, trailer, client, blueFolder, machines });
    const machinePatch = { bluefolderEquipmentId: EQ, bluefolderEquipmentLink: { source: SOURCE, repairId: REPAIR_ID, verifiedAtIso: stamp, customerId: '34579389', locationId: '35057812', equipmentName: blueFolder.equipmentNames[0], matchReason: 'user_confirmed_trailer20_and_typed_machine_client_chain', note: 'BlueFolder equipment uses an older model label; local machine name/model/location preserved.' } };
    const identity = { ...wo, bluefolderEquipmentIds: [EQ], bluefolderEquipmentNames: blueFolder.equipmentNames };
    const projected = machines.map(row => row.id === MACHINE ? { ...row, data: { ...row.data, ...machinePatch } } : row);
    const resolved = resolveWorkOrderTrailerLink(trailers, resolveWorkOrderMachineLink(projected, identity, { clientId: CLIENT, clientData: client }), { clientId: CLIENT });
    assert.equal(resolved.match?.id, MACHINE, resolved.reason); assert.equal(resolved.trailer?.id, TRAILER, resolved.reason);
    const woPatch = { ...buildWorkOrderMachineLinkPatch(resolved, { source: SOURCE, linkedAtIso: stamp }), bluefolderEquipmentIds: [EQ], bluefolderEquipmentNames: blueFolder.equipmentNames, machineLinkRepairId: REPAIR_ID, connectionsUpdatedAt: Timestamp.fromDate(new Date(stamp)), updatedAt: Timestamp.fromDate(new Date(stamp)), connectionsUpdatedBy: 'Magmo reviewed Trailer 20 link repair' };
    const patches = { [`Machine/${MACHINE}`]: machinePatch, 'OpsWorkOrders/10659': woPatch };
    const summary = { repairId: REPAIR_ID, apply, createdAtIso: stamp, clientId: CLIENT, trailerId: TRAILER, machineId: MACHINE, equipmentId: EQ, documentPaths: Object.keys(patches), inventoryItemsModified: 0, backupManifest: manifestPath, backupSha256: backup.sha256, localNamesModelsAndPlacementPreserved: true };
    // Retries use the exact same intended patches; disk artifacts are emitted after commit.
    if (apply) {
      for (const [p, patch] of Object.entries(patches)) tx.update(db.doc(p), patch);
      tx.create(receiptRef, summary);
    }
    return { summary, patches };
  });
  save('planned-patches.json', result.patches); save('receipt.json', result.summary);
  if (apply) {
    const after = await db.getAll(...paths.map(p => db.doc(p)));
    for (const d of after) assert.equal(stable(d.data()), stable({ ...baseline.get(d.ref.path), ...(result.patches[d.ref.path] || {}) }), `Unexpected post-repair change: ${d.ref.path}`);
    const destination = await db.runTransaction(tx => resolveWorkOrderDestination(tx, db, '10659', new Date().toISOString()));
    assert.equal(destination.association.associationType, 'trailer'); assert.equal(destination.association.clientId, CLIENT); assert.equal(destination.association.trailerId, TRAILER); assert.equal(destination.association.machineId, MACHINE);
    save('verification.json', { checkedAt: new Date().toISOString(), untouchedFieldDifferences: 0, destination, documents: after.map(d => ({ path: d.ref.path, data: d.data() })) });
  }
  console.log(JSON.stringify({ ...result.summary, output }, null, 2));
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(error => { console.error(error.message); process.exitCode = 1; });
