// Reviewed association-only repair. Dry-run by default; never moves inventory.
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
const { resolveWorkOrderClientLink, buildWorkOrderClientLinkPatch } = require('../lib/ops/workOrderClientLink.cjs');
const { resolveWorkOrderMachineLink, resolveWorkOrderTrailerLink, buildWorkOrderMachineLinkPatch } = require('../lib/ops/workOrderMachineLink.cjs');
const { resolveWorkOrderDestination } = require('../lib/inventory/workOrderAddService.cjs');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const REPAIR_ID = 'recent-work-order-site-links-20260925';
export const CUTOFF = '2026-08-26T07:00:00.000Z';
export const ALLOWED_PATCH_KEYS = Object.freeze([
 'clientId','clientRef','clientName','clientLocation','clientLinkSource','clientLinkMatchReason','clientLinkedAtIso',
 'bluefolderCustomerId','bluefolderLocationId','bluefolderCustomerName','bluefolderLocationName',
 'machineId','machineRef','machineName','machineLinkSource','machineLinkMatchReason','machineLinkEquipmentIds','machineLinkedAtIso',
 'trailerId','trailerRef','trailerName','bluefolderEquipmentIds','bluefolderEquipmentNames',
 'recentLinksRepairId','connectionsUpdatedBy','connectionsUpdatedAt','updatedAt',
]);
const SOURCE = 'reviewed_recent_work_order_links_20260925';
const reviewPath = path.join(root, 'outputs/work-order-site-only-recovery-20260925/reviewed-targets.json');
const manifestPath = path.join(root, 'outputs/firestore-backups/2026-09-25-site-only-recovery-predeploy/manifest.json');
const norm = v => String(v ?? '').trim();
const eqIds = values => [...new Set((values || []).map(v => norm(v).toUpperCase()))].sort();
const sort = v => Array.isArray(v) ? v.map(sort) : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map(k => [k, sort(v[k])])) : v;
const stable = v => JSON.stringify(sort(encodeFirestoreValue(v)));
const unavailable = d => !d || Boolean(d.deletedAt || d.archivedAt || d.deleted === true || d.archived === true || d.bluefolderInactive === true);
const refPath = v => typeof v === 'string' ? v.replace(/^\//, '') : v?.path;
export function validateReview(review) {
 assert.equal(review.repairId, REPAIR_ID); assert.equal(review.cutoff, CUTOFF);
 assert(Array.isArray(review.targets) && review.targets.length > 0 && review.targets.length <= 120);
 assert.equal(new Set(review.targets.map(t => t.id)).size, review.targets.length);
 for (const target of review.targets) {
  assert(/^\d+$/.test(target.id)); assert(/^AIS\d+$/.test(target.clientId));
  assert(target.customerId && target.locationId && Array.isArray(target.equipmentIds));
  assert(!target.machineId || /^AIS\d+$/.test(target.machineId));
  assert(!target.trailerId || /^AIS\d+$/.test(target.trailerId));
 }
}
export function planReviewedLink({ target, wo, bf, clients, machines, trailers, nowIso }) {
 assert(!unavailable(wo), 'Unavailable work order');
 const created = Date.parse(wo.createdAtIso || wo.bluefolderCreatedAt || '');
 assert(Number.isFinite(created) && created >= Date.parse(CUTOFF) && created <= Date.parse(nowIso), 'Outside reviewed recent range');
 assert.equal(norm(wo.bluefolderServiceRequestId || wo.workOrderId || wo.id || target.id), target.id);
 if (wo.number != null && wo.number !== '') assert.equal(norm(wo.number), target.id, 'Stored work order number differs');
 assert.equal(norm(bf.id), target.id); assert.equal(norm(bf.number), target.id);
 assert.equal(norm(bf.customerId), target.customerId); assert.equal(norm(bf.customerLocationId), target.locationId);
 assert.deepEqual(eqIds(bf.equipmentIds), eqIds(target.equipmentIds), 'Live selected equipment changed');
 // Existing explicit assets are never repaired by this script. Preserve for review.
 for (const key of ['machineId', 'machineRef', 'trailerId', 'trailerRef']) assert(wo[key] == null || wo[key] === '', `Existing asset ${key}: preserve`);
 if (wo.clientId) assert.equal(wo.clientId, target.clientId, 'Existing client differs');
 if (wo.clientRef) assert.equal(refPath(wo.clientRef), `Client/${target.clientId}`, 'Existing client reference differs');
 for (const [key, expected] of [['bluefolderCustomerId',target.customerId],['bluefolderLocationId',target.locationId]]) {
  if (norm(wo[key])) assert.equal(norm(wo[key]), expected, `Stored ${key} differs`);
 }
 if (wo.bluefolderEquipmentIds?.length) assert.deepEqual(eqIds(wo.bluefolderEquipmentIds), eqIds(bf.equipmentIds), 'Stored selected equipment differs');
 const identity = { blueFolder: { ...bf, serviceRequestId: bf.id, customerName: bf.customer } };
 const site = resolveWorkOrderClientLink(clients, identity);
 assert.equal(site.match?.id, target.clientId, `Site not uniquely verified: ${site.reason}`);
 assert(!unavailable(site.match.data), 'Site unavailable');
 const mappedCustomer = norm(site.match.data.bluefolderCustomerId || site.match.data.blueFolderCustomerId);
 assert(!mappedCustomer || mappedCustomer === target.customerId || site.reason === 'bluefolder_location_alias', 'Unreviewed customer conflict');
 let assetPatch = {};
 if (bf.equipmentIds.length || bf.equipmentNames.length) {
  const asset = resolveWorkOrderTrailerLink(trailers, resolveWorkOrderMachineLink(machines, identity, { clientId:target.clientId, clientData:site.match.data }), { clientId:target.clientId });
  assert.equal(asset.match?.id, target.machineId, `Equipment not uniquely verified: ${asset.reason}`);
  assert(target.machineId, 'Selected equipment requires a reviewed machine');
  assert.equal(asset.trailer?.id || '', target.trailerId || '', 'Trailer changed');
  assetPatch = buildWorkOrderMachineLinkPatch(asset, { linkedAtIso:nowIso, source:SOURCE });
  assert.equal(assetPatch.machineId, target.machineId);
 } else { assert(!target.machineId && !target.trailerId, 'No selected equipment for proposed asset'); }
 const patch = wo.clientId ? {} : buildWorkOrderClientLinkPatch(site, { clientRef:site.match.ref, source:SOURCE, linkedAtIso:nowIso });
 if (assetPatch.machineId) Object.assign(patch, assetPatch, { bluefolderEquipmentIds:[...bf.equipmentIds], bluefolderEquipmentNames:[...bf.equipmentNames] });
 assert(patch.clientId || patch.machineId, 'No missing association to repair');
 Object.assign(patch, { recentLinksRepairId:REPAIR_ID, connectionsUpdatedBy:'Magmo reviewed recent work-order link repair', connectionsUpdatedAt:Timestamp.fromDate(new Date(nowIso)), updatedAt:Timestamp.fromDate(new Date(nowIso)) });
 for (const key of Object.keys(patch)) assert(ALLOWED_PATCH_KEYS.includes(key), `Unexpected association patch key: ${key}`);
 return patch;
}
function loadEnv() {
 for (const name of ['.env.local','.env']) {
  const file = path.join(root,name); if (!fs.existsSync(file)) continue;
  for (const line of fs.readFileSync(file,'utf8').split(/\r?\n/)) {
   const m = line.trim().match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/); if (!m || process.env[m[1]] != null) continue;
   let v=m[2].trim(); if ((v.startsWith('"')&&v.endsWith('"'))||(v.startsWith("'")&&v.endsWith("'"))) v=v.slice(1,-1);
   process.env[m[1]]=v.replace(/\\n/g,'\n');
  }
 }
}
async function main() {
 const args=process.argv.slice(2); assert(args.every(a=>['--apply','--dry-run'].includes(a))); const apply=args.includes('--apply'); assert(!(apply&&args.includes('--dry-run')));
 const reviewed=JSON.parse(fs.readFileSync(reviewPath,'utf8')); validateReview(reviewed);
 let backup=null;
 if(apply) {
  const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8')); assert.equal(manifest.sourceProject,'magmo-ac10c'); assert.equal(manifest.status,'complete');
  assert(manifest.completedAt.startsWith('2026-09-25') && ['Test','Client','Machine','OpsWorkOrders'].every(k=>manifest.collectionCounts[k]>0));
  backup=await verifyBackupManifest(manifestPath);
 }
 loadEnv(); assert.equal(process.env.FIREBASE_PROJECT_ID,'magmo-ac10c');
 const account=JSON.parse(fs.readFileSync(path.resolve(root,process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH||process.env.FIREBASE_SERVICE_ACCOUNT_PATH||process.env.GOOGLE_APPLICATION_CREDENTIALS),'utf8'));
 assert.equal(account.project_id,'magmo-ac10c'); if(!getApps().length)initializeApp({credential:cert(account),projectId:account.project_id});
 const db=getFirestore(),receipt=db.doc(`DataRepairReceipts/${REPAIR_ID}`);
 const priorReceipt=await receipt.get();
 if(priorReceipt.exists){assert.equal(priorReceipt.data().repairId,REPAIR_ID);assert.deepEqual(priorReceipt.data().workOrderIds,reviewed.targets.map(t=>t.id));console.log(JSON.stringify({alreadyApplied:true,repairId:REPAIR_ID}));return;}
 const settings=getBlueFolderSlackSettings(),bfClient=new BlueFolderClient(settings),fresh={};
 // Keep source API traffic bounded while the normal listener continues running.
 for(const target of reviewed.targets)fresh[target.id]=extractWorkOrderFields(await bfClient.getWorkOrder(target.id),settings);
 const stamp=new Date().toISOString(), snapshots=await db.getAll(...reviewed.targets.map(t=>db.doc(`OpsWorkOrders/${t.id}`)));
 assert(snapshots.every(d=>d.exists)); const baseline=new Map(snapshots.map(d=>[d.id,d.data()]));
 const output=path.join(root,'outputs/work-order-site-only-recovery-20260925',`${apply?'apply':'dry-run'}-${stamp.replace(/[:.]/g,'-')}`);fs.mkdirSync(output,{recursive:true});
 const save=(name,value)=>fs.writeFileSync(path.join(output,name),JSON.stringify(encodeFirestoreValue(value),null,2),{flag:'wx'});
 save('preimages.json',{repairId:REPAIR_ID,stamp,reviewed,backup,blueFolder:fresh,documents:snapshots.map(d=>({path:d.ref.path,updateTime:d.updateTime,data:d.data()}))});
 const result=await db.runTransaction(async tx=>{
  assert(!(await tx.get(receipt)).exists,'Repair already applied');
  const docs=await Promise.all(reviewed.targets.map(t=>tx.get(db.doc(`OpsWorkOrders/${t.id}`))));
  for(const d of docs)assert(d.exists&&stable(d.data())===stable(baseline.get(d.id)),`Changed after preimage: ${d.id}`);
  const rows=async name=>(await tx.get(db.collection(name))).docs.map(d=>({id:d.id,data:d.data(),ref:d.ref}));
  const clients=await rows('Client'),machines=await rows('Machine'),trailers=await rows('Trailers');
  const patches={};
  for(const target of reviewed.targets)patches[target.id]=planReviewedLink({target,wo:baseline.get(target.id),bf:fresh[target.id],clients,machines,trailers,nowIso:stamp});
  const summary={repairId:REPAIR_ID,apply,createdAtIso:stamp,cutoff:CUTOFF,workOrderIds:reviewed.targets.map(t=>t.id),workOrdersPatched:reviewed.targets.length,inventoryItemsModified:0,directoryDocumentsModified:0,workflowAndHistoryPreserved:true,backupManifest:backup?manifestPath:null,backupSha256:backup?.sha256||null};
  if(apply){for(const[id,patch]of Object.entries(patches))tx.update(db.doc(`OpsWorkOrders/${id}`),patch);tx.create(receipt,summary);}
  return{summary,patches};
 });
 save('planned-patches.json',result.patches);save('receipt.json',result.summary);
 if(apply){
  const after=await db.getAll(...reviewed.targets.map(t=>db.doc(`OpsWorkOrders/${t.id}`)));
  for(const d of after)assert.equal(stable(d.data()),stable({...baseline.get(d.id),...result.patches[d.id]}),`Unexpected post-repair change ${d.id}`);
  const destinations=[];
  for(const target of reviewed.targets){const value=await db.runTransaction(tx=>resolveWorkOrderDestination(tx,db,target.id,stamp));assert.equal(value.association.clientId,target.clientId);assert.equal(value.association.machineId||'',target.machineId||'');assert.equal(value.association.trailerId||'',target.trailerId||'');destinations.push({workOrderId:target.id,association:value.association});}
  save('verification.json',{checkedAt:new Date().toISOString(),untouchedFieldDifferences:0,destinations,documents:after.map(d=>({path:d.ref.path,data:d.data()}))});
 }
 console.log(JSON.stringify({...result.summary,output},null,2));
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(error=>{console.error(error.message);process.exitCode=1;});
