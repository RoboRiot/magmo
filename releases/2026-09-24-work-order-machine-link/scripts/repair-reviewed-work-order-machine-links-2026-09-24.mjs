// Narrow, dated repair. Dry-run is the default; no fuzzy or model matching.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

const require=createRequire(import.meta.url);
const { verifyBackupManifest, encodeFirestoreValue }=require('../lib/firestoreBackupCodec.cjs');
const { LEGACY_ASSOCIATION_FIELDS, canonicalizeAssociatedPartsForItem }=require('../lib/inventory/workOrderAddContract.cjs');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const REPAIR_ID='bluefolder-machine-link-repair-20260924';
const SOURCE='reviewed_bluefolder_machine_link_repair_20260924';
const ACTOR={uid:'system:bluefolder-machine-link-repair',email:'system@magmo.internal',name:'Magmo BlueFolder machine-link repair'};
const EXPECTED_MACHINE_IDS=['AIS16893','AIS21467','AIS54785','AIS69280','AIS74011'];
const EXPECTED_WORK_ORDER_IDS=['10243','10257','10327','10364','10377','10473','10493','10663','10664'];
const EXPECTED_ITEM_IDS=['AIS36635','AIS36645'];
const REVIEWED_MAPPING_TUPLES={
 AIS74011:['AIS11878','FC8B1213-BB9E-4862-BB9C-12496600C747','34833309','35469410',['10243']],
 AIS21467:['AIS50849','2C24CED2-EADE-4942-9D52-808A6FD39E91','34617567','35126130',['10257','10364','10377','10664']],
 AIS16893:['AIS34628','FD96B03A-1BEB-48A0-A08E-F8620172D319','38353831','39519515',['10327','10493']],
 AIS54785:['AIS38726','3056C9E0-B750-4AB7-8B52-BECC2AA5F14B','34593435','35081782',['10473']],
 AIS69280:['AIS59864','8BFD8555-A2BC-4041-B56B-24E845B014C8','34842390','35481992',['10663']],
};
const clean=v=>String(v??'').trim();
const norm=v=>clean(v).normalize('NFKC').toLowerCase().replace(/\s+/g,' ');
const refPath=v=>typeof v?.path==='string'?v.path:typeof v?.$ref==='string'?v.$ref:'';
const referenceId=v=>refPath(v).split('/').at(-1)||clean(v);
const stable=v=>JSON.stringify(sortObject(encodeFirestoreValue(v)));
function sortObject(v){return Array.isArray(v)?v.map(sortObject):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sortObject(v[k])])):v;}
function assert(ok,message){if(!ok)throw new Error(message);}
function sameIds(actual,expected,label){assert(stable([...actual].sort())===stable([...expected].sort()),`${label} differs from the reviewed, fixed repair scope`);}
function configuration(data){
 const fields=[...LEGACY_ASSOCIATION_FIELDS,'associationFrom','associationCurrent','fromAssociationType','currentAssociationType','clientFromId','machineFromId','trailerFromId','clientCurrentId','machineCurrentId','trailerCurrentId','ClientFrom','MachineFrom','TrailerFrom','ClientCurrent','MachineCurrent','TrailerCurrent','newLocalFrom','localLocFrom','newLocalCurrent','localLocCurrent','region','Region','section','Section','bin','Bin','pallet','Pallet','workOrder','workOrders','movementDateType','movementDate','arrivalDate','departureDate','arrival_date','departure_date'];
 return Object.fromEntries([...new Set(fields)].map(k=>[k,Object.hasOwn(data,k)?data[k]:null]));
}
function historyFields(config){
 const result={};
 for(const [prefix,suffix] of [['from','From'],['current','Current']]){
  const a=config['association'+suffix]||{};
  result[prefix+'AssociationType']=a.associationType||'site';
  for(const kind of ['Client','Machine','Trailer']){
   result[prefix+kind+'Id']=a[kind.toLowerCase()+'Id']||'';
   result[prefix+kind+'Name']=a[kind.toLowerCase()+'NameSnapshot']||'';
  }
  result[prefix+'LocalLocation']=config['newLocal'+suffix]||{};
  result[prefix+'LocalLocationText']=config['localLoc'+suffix]||'';
 }
 return result;
}

export function buildItemMachineRepair({itemId,itemData,originalAudit,mapping,nowIso,machineRef}){
 assert(EXPECTED_ITEM_IDS.includes(itemId),'Item outside fixed repair scope');
 assert(mapping.machineId==='AIS21467'&&mapping.clientId==='AIS50849','Unexpected repair destination');
 assert(originalAudit?.workOrderId==='10664'&&originalAudit?.movementMode==='current_at_work_order','Original work-order receipt mismatch');
 assert(originalAudit?.operationId==='d9b82454-b138-4a35-a360-fc0c352ba026','Original operation mismatch');
 assert(!itemData.deleted&&!itemData.deletedAt,'Deleted item cannot be repaired');
 const branch=itemData.associationCurrent;
 assert(branch?.associationType==='site'&&branch.clientId===mapping.clientId&&!branch.machineId&&!branch.trailerId,'Item no longer has the expected site-only current association');
 assert(stable(branch)===stable(originalAudit.afterConfiguration?.associationCurrent),'Item current branch has changed since the original work-order confirmation');
 assert(referenceId(itemData.ClientCurrent)===mapping.clientId&&itemData.clientCurrentId===mapping.clientId,'Item current-client fields disagree');
 assert(['MachineCurrent','machineCurrentId','CurrentMachine','currentMachine','currentMachineId','TrailerCurrent','trailerCurrentId','currentTrailer','trailerCurrent','currentTrailerId'].every(k=>!itemData[k]),'Item has a later machine or trailer selection');
 for(const field of ['selectionHistory','saveHistory','workOrders'])assert(itemData[field]===undefined||Array.isArray(itemData[field]),`Malformed ${field}; preserving record without writing`);
 assert((itemData.workOrders||[]).some(w=>clean(w?.workOrder||w?.number||w)==='10664'),'Original work order is no longer assigned to item');
 const beforeConfiguration=configuration(itemData);
 const nextAssociation={...branch,associationType:'machine',machineId:mapping.machineId,machineNameSnapshot:mapping.machineName,resolutionSource:SOURCE,machineLinkedAtIso:nowIso,machineLinkRepairId:REPAIR_ID};
 const patch={associationCurrent:nextAssociation,currentAssociationType:'machine',MachineCurrent:machineRef,machineCurrentId:mapping.machineId};
 const afterConfiguration=configuration({...itemData,...patch});
 const common={schemaVersion:1,action:'work_order_machine_link_repair',label:'Restored BlueFolder-selected machine for work order 10664',operationId:REPAIR_ID,originalOperationId:originalAudit.operationId,workOrder:'10664',savedAt:nowIso,savedByEmail:ACTOR.email,actor:ACTOR,movementMode:'current_at_work_order',movementDateType:itemData.movementDateType||'',movementDate:itemData.movementDate||'',arrivalDate:itemData.arrival_date||itemData.arrivalDate||'',departureDate:itemData.departure_date||itemData.departureDate||'',beforeConfiguration,afterConfiguration};
 const beforeEntry={...common,...historyFields(beforeConfiguration),historyType:'prior_configuration_snapshot',transitionKind:'prior_configuration',transitionIndex:0,transitionCount:1};
 const afterEntry={...common,...historyFields(afterConfiguration),historyType:'resulting_configuration',transitionKind:'machine_link_correction',transitionIndex:1,transitionCount:1};
 patch.selectionHistory=[...(itemData.selectionHistory||[]),beforeEntry,afterEntry];
 patch.saveHistory=[...(itemData.saveHistory||[]),{...common,itemName:itemData.name||'',workOrderAssignmentAdded:false,workOrderAssignmentDate:null}];
 patch.updatedAt=Timestamp.fromDate(new Date(nowIso));
 patch.lastEdited=ACTOR.email;
 const audit={schemaVersion:2,type:'work-order-machine-link-repair',action:common.action,label:common.label,operationId:REPAIR_ID,originalOperationId:originalAudit.operationId,itemId,workOrderId:'10664',workOrderNumber:'10664',actor:ACTOR,occurredAt:nowIso,movementMode:'current_at_work_order',beforeConfiguration,afterConfiguration,selectionHistoryEntriesAdded:2,workOrderAssignmentAdded:false,createdAt:Timestamp.fromDate(new Date(nowIso)),createdBy:ACTOR};
 return {patch,audit};
}

export function validatePlan(plan){
 sameIds(plan.machineMappings.map(x=>x.machineId),EXPECTED_MACHINE_IDS,'Machine set');
 sameIds(plan.workOrderCandidates.map(x=>x.workOrderId),EXPECTED_WORK_ORDER_IDS,'Work-order set');
 sameIds(plan.itemRepairs.filter(x=>x.status==='candidate_missing_machine').map(x=>x.itemId),EXPECTED_ITEM_IDS,'Item set');
 assert(!plan.conflictingMappings.length,'Conflicting machine mappings');
 for(const m of plan.machineMappings){
  assert(m.evidence==='unique_exact_site_and_name'&&norm(m.machineName)===norm(m.equipmentName),'Mapping lacks reviewed exact-name evidence');
  assert(/^[A-F\d-]{36}$/i.test(m.bluefolderEquipmentId),'Invalid equipment ID');
  const expected=REVIEWED_MAPPING_TUPLES[m.machineId];
  assert(stable([m.clientId,m.bluefolderEquipmentId,m.bluefolderCustomerId,m.bluefolderLocationId,[...m.workOrderIds].sort()])===stable(expected),`Reviewed mapping identity changed: ${m.machineId}`);
 }
 for(const row of plan.workOrderCandidates){const tuple=REVIEWED_MAPPING_TUPLES[row.machineId];assert(tuple&&tuple[0]===row.clientId&&tuple[4].includes(row.workOrderId)&&row.equipmentIds.length===1&&row.equipmentIds[0]===tuple[1],`Work-order mapping changed: ${row.workOrderId}`);}
}

function loadEnv(){for(const file of ['.env.local','.env']){
 const full=path.join(root,file);if(!fs.existsSync(full))continue;
 for(const raw of fs.readFileSync(full,'utf8').split(/\r?\n/)){
  const match=raw.trim().match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);if(!match||process.env[match[1]]!=null)continue;
  let value=match[2].trim();if((value.startsWith('"')&&value.endsWith('"'))||(value.startsWith("'")&&value.endsWith("'")))value=value.slice(1,-1);
  process.env[match[1]]=value.replace(/\\n/g,'\n');
 }
}}
function option(args,name){const index=args.indexOf(name);const inline=args.find(a=>a.startsWith(name+'='));assert(!(index>=0&&inline),`Duplicate ${name}`);return inline?inline.slice(name.length+1):index>=0?args[index+1]:'';}

async function main(){
 const args=process.argv.slice(2);const apply=args.includes('--apply');
 for(let i=0;i<args.length;i++){const name=args[i].split('=')[0];assert(['--apply','--dry-run','--backup-manifest','--plan','--output'].includes(name),`Unknown option ${name}`);if(!args[i].includes('=')&&!['--apply','--dry-run'].includes(name))i++;}
 assert(!(apply&&args.includes('--dry-run')),'Choose apply or dry-run');
 const planPath=path.resolve(root,option(args,'--plan')||'outputs/work-order-machine-link-20260924/reviewed-mapping-plan.json');
 const planText=fs.readFileSync(planPath,'utf8');const plan=JSON.parse(planText);validatePlan(plan);
 const planSha256=crypto.createHash('sha256').update(planText).digest('hex');
 let backupReceipt=null;
 const backupPath=option(args,'--backup-manifest');
 if(apply)assert(backupPath,'--apply requires a completed full --backup-manifest');
 if(backupPath){
  backupReceipt=await verifyBackupManifest(path.resolve(root,backupPath));
  const manifest=JSON.parse(fs.readFileSync(backupReceipt.manifestPath,'utf8'));
  assert(manifest.sourceProject==='magmo-ac10c','Backup project mismatch');
  assert(Object.hasOwn(manifest.collectionCounts,'Test')&&Object.hasOwn(manifest.collectionCounts,'Machine')&&Object.hasOwn(manifest.collectionCounts,'OpsWorkOrders'),'Backup lacks required collections');
  assert(new Date(manifest.completedAt||manifest.completedAtIso||manifest.finishedAt||0).getTime()>=new Date('2026-09-24T00:00:00Z').getTime(),'Backup must be dated 2026-09-24 or later');
 }
 loadEnv();
 const projectId=clean(process.env.FIREBASE_PROJECT_ID);assert(projectId==='magmo-ac10c','Unexpected Firebase project');
 const value=clean(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH||process.env.FIREBASE_SERVICE_ACCOUNT_PATH||process.env.GOOGLE_APPLICATION_CREDENTIALS);
 const credentialPath=path.isAbsolute(value)?value:path.resolve(root,value);const serviceAccount=JSON.parse(fs.readFileSync(credentialPath,'utf8'));
 assert(serviceAccount.project_id===projectId,'Credential project mismatch');
 if(!getApps().length)initializeApp({credential:cert(serviceAccount),projectId});const db=getFirestore();
 const repairRef=db.collection('DataRepairReceipts').doc(REPAIR_ID);
 const existing=await repairRef.get();if(existing.exists){console.log(JSON.stringify({alreadyApplied:true,repairId:REPAIR_ID,receipt:encodeFirestoreValue(existing.data())}));return;}
 const paths=[...EXPECTED_MACHINE_IDS.map(id=>'Machine/'+id),...EXPECTED_WORK_ORDER_IDS.map(id=>'OpsWorkOrders/'+id),...EXPECTED_ITEM_IDS.map(id=>'Test/'+id),...EXPECTED_ITEM_IDS.map(id=>`Test/${id}/WorkOrderAddHistory/d9b82454-b138-4a35-a360-fc0c352ba026`),...new Set(plan.machineMappings.map(m=>'Client/'+m.clientId))];
 const refs=paths.map(p=>db.doc(p)),snapshots=await db.getAll(...refs);
 assert(snapshots.every(s=>s.exists),'One or more repair targets no longer exist');
 const baseline=new Map(snapshots.map(s=>[s.ref.path,s.data()]));
 const stamp=new Date().toISOString().replace(/[:.]/g,'-');
 const output=path.resolve(root,option(args,'--output')||`outputs/work-order-machine-link-20260924/repair-${apply?'apply':'dry-run'}-${stamp}`);
 assert(!fs.existsSync(output),'Output directory exists; use a new dated directory');fs.mkdirSync(output,{recursive:true});
 const preimage={createdAt:new Date().toISOString(),repairId:REPAIR_ID,projectId,planPath,planSha256,backupReceipt,documents:snapshots.map(s=>({path:s.ref.path,updateTime:encodeFirestoreValue(s.updateTime),data:encodeFirestoreValue(s.data())}))};
 fs.writeFileSync(path.join(output,'preimages.json'),JSON.stringify(preimage,null,2),{flag:'wx'});
 const nowIso=new Date().toISOString();
 const result=await db.runTransaction(async tx=>{
  const receipt=await tx.get(repairRef);assert(!receipt.exists,'Repair already applied by another process');
  const current=await Promise.all(refs.map(ref=>tx.get(ref)));
  const live=new Map(current.map(s=>[s.ref.path,s.data()]));
  for(const s of current)assert(s.exists&&stable(s.data())===stable(baseline.get(s.ref.path)),`Live data changed since the preimage for ${s.ref.path}; rerun with a fresh output path`);
  const repairAudits=await Promise.all(EXPECTED_ITEM_IDS.map(id=>tx.get(db.doc(`Test/${id}/WorkOrderAddHistory/${REPAIR_ID}`))));
  assert(repairAudits.every(s=>!s.exists),'Repair item audit already exists');
  const machinePatches=new Map(),workOrderPatches=new Map(),itemPatches=new Map();
  for(const m of plan.machineMappings){
   const d=live.get('Machine/'+m.machineId),c=live.get('Client/'+m.clientId);
   const ids=[...new Set([d.client,d.Client,d.clientId,d.ClientId].filter(Boolean).map(referenceId))];
   assert(ids.length===1&&ids[0]===m.clientId,`Machine client changed: ${m.machineId}`);
   assert(norm(d.name)===norm(m.machineName),`Machine name changed: ${m.machineId}`);
   const key=`${m.bluefolderCustomerId}:${m.bluefolderLocationId}`;
   assert(`${c.bluefolderCustomerId}:${c.bluefolderLocationId}`===key||(c.bluefolderLocationAliasKeys||[]).includes(key),`Client BF identity changed: ${m.clientId}`);
   assert(!d.bluefolderEquipmentId||norm(d.bluefolderEquipmentId)===norm(m.bluefolderEquipmentId),`Machine already linked elsewhere: ${m.machineId}`);
   assert(!d.blueFolderEquipmentId||norm(d.blueFolderEquipmentId)===norm(m.bluefolderEquipmentId),`Machine alias already linked elsewhere: ${m.machineId}`);
   const mapped=await tx.get(db.collection('Machine').where('bluefolderEquipmentId','==',m.bluefolderEquipmentId));
   const mappedAlias=await tx.get(db.collection('Machine').where('blueFolderEquipmentId','==',m.bluefolderEquipmentId));
   assert([...mapped.docs,...mappedAlias.docs].every(s=>s.id===m.machineId),`Equipment ID mapped elsewhere: ${m.bluefolderEquipmentId}`);
   machinePatches.set(m.machineId,{bluefolderEquipmentId:m.bluefolderEquipmentId,bluefolderEquipmentLink:{source:SOURCE,repairId:REPAIR_ID,verifiedAtIso:nowIso,customerId:m.bluefolderCustomerId,locationId:m.bluefolderLocationId,equipmentName:m.equipmentName,matchReason:m.evidence},updatedAt:Timestamp.fromDate(new Date(nowIso))});
  }
  for(const row of plan.workOrderCandidates){
   const d=live.get('OpsWorkOrders/'+row.workOrderId),m=plan.machineMappings.find(m=>m.machineId===row.machineId);
   assert(!d.machineId&&!d.machineRef&&!d.trailerId,`Work order acquired an explicit asset: ${row.workOrderId}`);
   assert(d.clientId===row.clientId,`Work-order client changed: ${row.workOrderId}`);
   assert(!d.clientRef||referenceId(d.clientRef)===row.clientId,`Work-order client ref conflicts: ${row.workOrderId}`);
   assert(clean(d.bluefolderServiceRequestId||d.workOrderId)===row.workOrderId,`Work-order BF ID changed: ${row.workOrderId}`);
   assert(clean(d.bluefolderCustomerId)===m.bluefolderCustomerId&&clean(d.bluefolderLocationId)===m.bluefolderLocationId,`Work-order BF location changed: ${row.workOrderId}`);
   workOrderPatches.set(row.workOrderId,{machineId:m.machineId,machineName:m.machineName,machineRef:db.doc('Machine/'+m.machineId),bluefolderEquipmentIds:[m.bluefolderEquipmentId],bluefolderEquipmentNames:[m.equipmentName],machineLinkEquipmentIds:[m.bluefolderEquipmentId],machineLinkSource:SOURCE,machineLinkMatchReason:'reviewed_exact_equipment_name_at_client',machineLinkedAtIso:nowIso,machineLinkRepairId:REPAIR_ID,connectionsUpdatedAt:Timestamp.fromDate(new Date(nowIso)),connectionsUpdatedBy:ACTOR.name,updatedAt:Timestamp.fromDate(new Date(nowIso))});
  }
  const ramin=plan.machineMappings.find(m=>m.machineId==='AIS21467');
  for(const id of EXPECTED_ITEM_IDS){
   const data=live.get('Test/'+id),originalAudit=live.get(`Test/${id}/WorkOrderAddHistory/d9b82454-b138-4a35-a360-fc0c352ba026`);
   itemPatches.set(id,buildItemMachineRepair({itemId:id,itemData:data,originalAudit,mapping:ramin,nowIso,machineRef:db.doc('Machine/'+ramin.machineId)}));
  }
  const machine=live.get('Machine/'+ramin.machineId);
  if(machine.skipAssociatedParts!==true){
   let parts=machine.associatedParts;
   for(const id of EXPECTED_ITEM_IDS)parts=canonicalizeAssociatedPartsForItem({associatedParts:parts,partId:id,partRef:db.doc('Test/'+id),includePart:true});
   machinePatches.get(ramin.machineId).associatedParts=parts;
  }
  const summary={repairId:REPAIR_ID,mode:apply?'apply':'dry-run',projectId,createdAtIso:nowIso,planSha256,backupManifest:backupReceipt?.manifestPath||null,backupSha256:backupReceipt?.sha256||null,machineCount:machinePatches.size,workOrderCount:workOrderPatches.size,itemCount:itemPatches.size,machineIds:[...machinePatches.keys()],workOrderIds:[...workOrderPatches.keys()],itemIds:[...itemPatches.keys()],previousHistoryPreserved:true,originalOperationReceiptsPreserved:true};
  fs.writeFileSync(path.join(output,'planned-patches.json'),JSON.stringify(encodeFirestoreValue({summary,machines:[...machinePatches],workOrders:[...workOrderPatches],items:[...itemPatches]}),null,2));
  if(apply){
   for(const [id,patch]of machinePatches)tx.update(db.doc('Machine/'+id),patch);
   for(const [id,patch]of workOrderPatches)tx.update(db.doc('OpsWorkOrders/'+id),patch);
   for(const [id,{patch,audit}]of itemPatches){tx.update(db.doc('Test/'+id),patch);tx.create(db.doc(`Test/${id}/WorkOrderAddHistory/${REPAIR_ID}`),audit);}
   tx.create(repairRef,{...summary,createdAt:Timestamp.fromDate(new Date(nowIso)),createdBy:ACTOR});
  }
  return summary;
 });
 fs.writeFileSync(path.join(output,'receipt.json'),JSON.stringify(result,null,2),{flag:'wx'});
 console.log(JSON.stringify({...result,output},null,2));
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(error=>{console.error(error.message);process.exitCode=1;});
