// Fixed, reviewed repair; dry-run by default. Never moves inventory or changes workflow.
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
const { resolveWorkOrderClientLink } = require('../lib/ops/workOrderClientLink.cjs');
const { resolveWorkOrderMachineLink, resolveWorkOrderTrailerLink, buildWorkOrderMachineLinkPatch } = require('../lib/ops/workOrderMachineLink.cjs');
const { resolveWorkOrderDestination } = require('../lib/inventory/workOrderAddService.cjs');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const REPAIR_ID = 'torrance-equipment-link-20260925';
export const EQ = '09859C69-CD50-4277-BB40-60A696300768';
export const MACHINE = 'AIS32820', CLIENT = 'AIS79109';
// WO 10202 has no selected equipment in live BlueFolder; retain its site-only link.
export const ORDER_IDS = ['9837', '10456', '10677'];
const SOURCE = 'reviewed_torrance_equipment_link_20260925';
const manifestPath = path.join(root, 'outputs/firestore-backups/2026-09-25-work-order-equipment-retry-predeploy/manifest.json');
const normalize = value => String(value || '').trim().toUpperCase();
const sort = v => Array.isArray(v) ? v.map(sort) : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map(k => [k, sort(v[k])])) : v;
const stable = v => JSON.stringify(sort(encodeFirestoreValue(v)));
const typedId = (v, collection) => {
 if (v == null || v === '') return '';
 const p = typeof v === 'string' ? v : v.path;
 assert.equal(typeof p, 'string', 'Malformed typed reference');
 if (!p.includes('/')) return p;
 assert.equal(p.split('/')[0], collection, 'Wrong relationship collection');
 assert.equal(p.split('/').length, 2, 'Malformed relationship path');
 return p.split('/')[1];
};
export function validateReviewedMapping({ machine, client, machines }) {
 assert(machine && client && !machine.deletedAt && !machine.deleted && !machine.archivedAt && !machine.archived);
 assert(!client.deletedAt && !client.deleted && !client.archivedAt && !client.archived && client.bluefolderInactive !== true);
 assert.equal(machine.name, 'Siemens espree MR', 'Machine identity changed');
 assert.equal(normalize(machine.Model), 'ESPREE', 'Reviewed model changed');
 assert.equal(normalize(machine.OEM), 'SIEMENS', 'Reviewed manufacturer changed');
 assert(['MR','MRI'].includes(normalize(machine.Modality)), 'Reviewed modality changed');
 assert.equal(String(client.name).trim(), 'Prohealth - Torrance', 'Client identity changed');
 assert(!machine.trailer && !machine.trailerId, 'Standalone machine now has a trailer');
 const links = [...new Set(['client', 'Client', 'clientId', 'ClientId'].map(k => typedId(machine[k], 'Client')).filter(Boolean))];
 assert.deepEqual(links, [CLIENT], 'Machine client relationship changed');
 for (const k of ['bluefolderEquipmentId', 'blueFolderEquipmentId']) if (machine[k]) assert.equal(normalize(machine[k]), EQ, 'Different machine equipment mapping');
 for (const row of machines) if ([row.data.bluefolderEquipmentId,row.data.blueFolderEquipmentId].some(v => normalize(v) === EQ)) assert.equal(row.id, MACHINE, 'Duplicate equipment mapping, including archived records');
}
export function validateReviewedOrder(id, wo, bf, client) {
 assert(ORDER_IDS.includes(id), 'Work order outside fixed scope');
 assert(wo && !wo.deleted && !wo.deletedAt && !wo.archived && !wo.archivedAt, 'Unavailable work order');
 assert.equal(String(bf.id), id, 'BlueFolder work order changed');
 assert.deepEqual(bf.equipmentIds.map(normalize), [EQ], 'Different selected equipment');
 assert.equal(String(bf.customerId), '34579369'); assert.equal(String(bf.customerLocationId), '35203706');
 assert.equal(wo.clientId, CLIENT);
 if (wo.clientRef) assert.equal(typedId(wo.clientRef, 'Client'), CLIENT);
 assert.equal(String(wo.bluefolderServiceRequestId || wo.workOrderId), id);
 assert.equal(String(wo.bluefolderCustomerId), '34579369'); assert.equal(String(wo.bluefolderLocationId), '35203706');
 for (const field of ['machineId', 'machineRef', 'trailerId', 'trailerRef']) assert(!wo[field], `Existing explicit asset in ${id}; preserve it`);
 if (wo.bluefolderEquipmentIds?.length) assert.deepEqual(wo.bluefolderEquipmentIds.map(normalize), [EQ]);
 const identity = { blueFolder: { ...bf, serviceRequestId: bf.id, customerName: bf.customer } };
 assert.equal(resolveWorkOrderClientLink([{ id: CLIENT, data: client }], identity).match?.id, CLIENT, 'Site identity is not verified');
 return identity;
}
function loadEnv() {
 for (const name of ['.env.local', '.env']) {
  const file = path.join(root, name); if (!fs.existsSync(file)) continue;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
   const m = line.trim().match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/); if (!m || process.env[m[1]] != null) continue;
   let v = m[2].trim(); if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
   process.env[m[1]] = v.replace(/\\n/g, '\n');
  }
 }
}
async function main() {
 const args = process.argv.slice(2); assert(args.every(v => ['--apply','--dry-run'].includes(v)), 'Unknown option');
 const apply = args.includes('--apply'); assert(!(apply && args.includes('--dry-run')));
 let backup = null;
 if (apply) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.equal(manifest.sourceProject, 'magmo-ac10c'); assert.equal(manifest.status, 'complete');
  assert(manifest.completedAt.startsWith('2026-09-25') && ['Test','Client','Machine','OpsWorkOrders'].every(k => manifest.collectionCounts[k] > 0));
  backup = await verifyBackupManifest(manifestPath);
 }
 loadEnv(); assert.equal(process.env.FIREBASE_PROJECT_ID, 'magmo-ac10c');
 const account = JSON.parse(fs.readFileSync(path.resolve(root, process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH || process.env.FIREBASE_SERVICE_ACCOUNT_PATH || process.env.GOOGLE_APPLICATION_CREDENTIALS), 'utf8'));
 assert.equal(account.project_id, 'magmo-ac10c'); if (!getApps().length) initializeApp({ credential: cert(account), projectId: account.project_id });
 const db = getFirestore(), receiptRef = db.doc(`DataRepairReceipts/${REPAIR_ID}`);
 if ((await receiptRef.get()).exists) { console.log(JSON.stringify({ alreadyApplied:true, repairId:REPAIR_ID })); return; }
 const settings = getBlueFolderSlackSettings(), bfClient = new BlueFolderClient(settings);
 const blueFolder = Object.fromEntries(await Promise.all(ORDER_IDS.map(async id => [id, extractWorkOrderFields(await bfClient.getWorkOrder(id), settings)])));
 const paths = [`Machine/${MACHINE}`, `Client/${CLIENT}`, ...ORDER_IDS.map(id => `OpsWorkOrders/${id}`)];
 const snapshots = await db.getAll(...paths.map(p => db.doc(p))); assert(snapshots.every(s => s.exists));
 const baseline = new Map(snapshots.map(s => [s.ref.path,s.data()]));
 const stamp = new Date().toISOString(), dir = path.join(root, 'outputs/work-order-equipment-retry-20260925'); fs.mkdirSync(dir, {recursive:true});
 const output = path.join(dir, `${apply?'apply':'dry-run'}-${stamp.replace(/[:.]/g,'-')}`); fs.mkdirSync(output);
 const save = (name,value) => fs.writeFileSync(path.join(output,name),JSON.stringify(encodeFirestoreValue(value),null,2),{flag:'wx'});
 save('preimages.json',{repairId:REPAIR_ID,createdAt:stamp,backup,blueFolder,documents:snapshots.map(s=>({path:s.ref.path,updateTime:s.updateTime,data:s.data()}))});
 const result = await db.runTransaction(async tx => {
  assert(!(await tx.get(receiptRef)).exists, 'Already applied');
  const docs = await Promise.all(paths.map(p => tx.get(db.doc(p))));
  for (const d of docs) assert(d.exists && stable(d.data()) === stable(baseline.get(d.ref.path)), `Changed after preimage: ${d.ref.path}`);
  const machines = (await tx.get(db.collection('Machine'))).docs.map(d=>({id:d.id,data:d.data(),ref:d.ref}));
  const trailers = (await tx.get(db.collection('Trailers'))).docs.map(d=>({id:d.id,data:d.data(),ref:d.ref}));
  const machine=docs[0].data(),client=docs[1].data(); validateReviewedMapping({machine,client,machines});
  const machinePatch={bluefolderEquipmentId:EQ,bluefolderEquipmentLink:{source:SOURCE,repairId:REPAIR_ID,verifiedAtIso:stamp,customerId:'34579369',locationId:'35203706',equipmentName:'Espree',matchReason:'reviewed_unique_machine_at_exact_site_manufacturer_modality_name_variation'},updatedAt:Timestamp.fromDate(new Date(stamp))};
  const projected=machines.map(row=>row.id===MACHINE?{...row,data:{...row.data,...machinePatch}}:row);
  const patches={[`Machine/${MACHINE}`]:machinePatch};
  for(const id of ORDER_IDS){
   const wo=baseline.get(`OpsWorkOrders/${id}`),identity=validateReviewedOrder(id,wo,blueFolder[id],client);
   const resolved=resolveWorkOrderTrailerLink(trailers,resolveWorkOrderMachineLink(projected,identity,{clientId:CLIENT,clientData:client}),{clientId:CLIENT});
   assert.equal(resolved.match?.id,MACHINE,resolved.reason);assert(!resolved.trailer,'Unexpected trailer relationship');
   patches[`OpsWorkOrders/${id}`]={...buildWorkOrderMachineLinkPatch(resolved,{source:SOURCE,linkedAtIso:stamp}),bluefolderEquipmentIds:[EQ],bluefolderEquipmentNames:blueFolder[id].equipmentNames,machineLinkRepairId:REPAIR_ID,connectionsUpdatedAt:Timestamp.fromDate(new Date(stamp)),connectionsUpdatedBy:'Magmo reviewed equipment repair',updatedAt:Timestamp.fromDate(new Date(stamp))};
  }
  const summary={repairId:REPAIR_ID,apply,createdAtIso:stamp,clientId:CLIENT,machineId:MACHINE,equipmentId:EQ,workOrderIds:ORDER_IDS,documentPaths:Object.keys(patches),inventoryItemsModified:0,existingHistoryNamesModelsLocationsWorkflowPreserved:true,backupManifest:backup?manifestPath:null,backupSha256:backup?.sha256||null};
  if(apply){for(const [p,patch]of Object.entries(patches))tx.update(db.doc(p),patch);tx.create(receiptRef,summary);}
  return{summary,patches};
 });
 save('planned-patches.json',result.patches);save('receipt.json',result.summary);
 if(apply){
  const after=await db.getAll(...paths.map(p=>db.doc(p)));
  for(const d of after)assert.equal(stable(d.data()),stable({...baseline.get(d.ref.path),...(result.patches[d.ref.path]||{})}),`Unexpected post-repair change: ${d.ref.path}`);
  const destinations=[];
  for(const id of ORDER_IDS){const value=await db.runTransaction(tx=>resolveWorkOrderDestination(tx,db,id,new Date().toISOString()));assert.equal(value.association.clientId,CLIENT);assert.equal(value.association.machineId,MACHINE);assert.equal(value.association.associationType,'machine');destinations.push(value);}
  save('verification.json',{checkedAt:new Date().toISOString(),untouchedFieldDifferences:0,destinations,documents:after.map(d=>({path:d.ref.path,data:d.data()}))});
 }
 console.log(JSON.stringify({...result.summary,output},null,2));
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(error=>{console.error(error.message);process.exitCode=1;});
