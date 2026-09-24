// Independent read-only verifier for the dated, narrow machine-link repair.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {cert,getApps,initializeApp} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';
import {serializeWorkOrderAddOption} from '../lib/inventory/workOrderAddOptions.js';
const require=createRequire(import.meta.url);
const {encodeFirestoreValue}=require('../lib/firestoreBackupCodec.cjs');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2);
const arg=name=>{const inline=args.find(x=>x.startsWith(name+'='));const i=args.indexOf(name);return inline?inline.slice(name.length+1):i>=0?args[i+1]:'';};
const REPAIR_ID='bluefolder-machine-link-repair-20260924';
function sorted(value){return Array.isArray(value)?value.map(sorted):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(k=>[k,sorted(value[k])])):value;}
const equal=(a,b)=>JSON.stringify(sorted(a))===JSON.stringify(sorted(b));
for(const file of ['.env.local','.env']){
 const full=path.join(root,file);if(!fs.existsSync(full))continue;
 for(const raw of fs.readFileSync(full,'utf8').split(/\r?\n/)){
  const match=raw.trim().match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);if(!match||process.env[match[1]]!=null)continue;
  let value=match[2].trim();if((value.startsWith('"')&&value.endsWith('"'))||(value.startsWith("'")&&value.endsWith("'")))value=value.slice(1,-1);
  process.env[match[1]]=value.replace(/\\n/g,'\n');
 }
}
const projectId=String(process.env.FIREBASE_PROJECT_ID||'').trim();
if(projectId!=='magmo-ac10c')throw new Error('Unexpected Firebase project');
const credentialValue=String(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH||process.env.FIREBASE_SERVICE_ACCOUNT_PATH||process.env.GOOGLE_APPLICATION_CREDENTIALS||'').trim();
const credentialPath=path.isAbsolute(credentialValue)?credentialValue:path.resolve(root,credentialValue);
const serviceAccount=JSON.parse(fs.readFileSync(credentialPath,'utf8'));
if(serviceAccount.project_id!==projectId)throw new Error('Credential project mismatch');
if(!getApps().length)initializeApp({credential:cert(serviceAccount),projectId});
const db=getFirestore();
const controlPath=path.resolve(root,arg('--control')||'outputs/work-order-machine-link-20260924/control-before-machine-repair.json');
if(args.includes('--capture-control')){
 if(fs.existsSync(controlPath))throw new Error('Control baseline already exists; refusing to replace it');
 const snapshot=await db.doc('Test/AIS21032').get();if(!snapshot.exists)throw new Error('Protected item missing');
 const data=snapshot.data();
 if(data.associationCurrent?.machineId!=='AIS82553'||data.associationCurrent?.trailerId!=='AIS20')throw new Error('Protected item no longer has the expected manual correction');
 fs.mkdirSync(path.dirname(controlPath),{recursive:true});fs.writeFileSync(controlPath,JSON.stringify({createdAt:new Date().toISOString(),path:snapshot.ref.path,updateTime:encodeFirestoreValue(snapshot.updateTime),data:encodeFirestoreValue(data)},null,2),{flag:'wx'});
 console.log(JSON.stringify({captured:true,controlPath,itemId:snapshot.id}));
}else{
 const directory=arg('--repair-directory');if(!directory)throw new Error('Provide --repair-directory for the applied repair');
 const dir=path.resolve(root,directory);
 const preimage=JSON.parse(fs.readFileSync(path.join(dir,'preimages.json'),'utf8'));
 const planned=JSON.parse(fs.readFileSync(path.join(dir,'planned-patches.json'),'utf8'));
 const receipt=JSON.parse(fs.readFileSync(path.join(dir,'receipt.json'),'utf8'));
 const control=JSON.parse(fs.readFileSync(controlPath,'utf8'));
 if(receipt.mode!=='apply'||receipt.repairId!==REPAIR_ID||!receipt.backupSha256)throw new Error('Not a backed-up, applied repair receipt');
 if(preimage.planSha256!==receipt.planSha256||planned.summary.planSha256!==receipt.planSha256)throw new Error('Plan fingerprint mismatch');
 const expected=new Map(preimage.documents.map(d=>[d.path,d.data]));
 const patchedKeys=new Map();
 for(const [id,patch] of planned.machines){const p='Machine/'+id;expected.set(p,{...expected.get(p),...patch});patchedKeys.set(p,new Set(Object.keys(patch)));}
 for(const [id,patch] of planned.workOrders){const p='OpsWorkOrders/'+id;expected.set(p,{...expected.get(p),...patch});patchedKeys.set(p,new Set(Object.keys(patch)));}
 for(const [id,entry] of planned.items){const p='Test/'+id;expected.set(p,{...expected.get(p),...entry.patch});patchedKeys.set(p,new Set(Object.keys(entry.patch)));expected.set(`${p}/WorkOrderAddHistory/${REPAIR_ID}`,entry.audit);}
 expected.set(control.path,control.data);
 const paths=[...expected.keys()];
 const snapshots=await db.getAll(...paths.map(p=>db.doc(p)));
 const actual=new Map(snapshots.map(s=>[s.ref.path,encodeFirestoreValue(s.data())]));
 const failures=[],unrelatedFieldDifferences=[];
 for(const p of paths){
  const want=expected.get(p),got=actual.get(p);
  if(!got){failures.push(`${p}:missing`);continue;}
  for(const key of new Set([...Object.keys(want),...Object.keys(got)])){
   if(!equal(want[key],got[key])){
    failures.push(`${p}:${key}`);
    if(!patchedKeys.get(p)?.has(key))unrelatedFieldDifferences.push(`${p}:${key}`);
   }
  }
 }
 const itemChecks=[];
 for(const [id,{patch,audit}]of planned.items){
  const p='Test/'+id,before=preimage.documents.find(d=>d.path===p).data,after=actual.get(p);
  const selectionPreserved=equal(after?.selectionHistory?.slice(0,before.selectionHistory?.length||0),before.selectionHistory||[]);
  const savePreserved=equal(after?.saveHistory?.slice(0,before.saveHistory?.length||0),before.saveHistory||[]);
  if(!selectionPreserved||!savePreserved)failures.push(`${p}:history-prefix`);
  const machineId=patch.machineCurrentId;
  const parts=actual.get('Machine/'+machineId)?.associatedParts||[];
  const backlinks=parts.filter(r=>r?.__firestoreType==='reference'&&r.path===p).length;
  if(backlinks!==1)failures.push(`${p}:machine-backlink-count-${backlinks}`);
  itemChecks.push({itemId:id,machineId,selectionHistoryPrefixPreserved:selectionPreserved,saveHistoryPrefixPreserved:savePreserved,backlinkCount:backlinks,currentClientId:after?.associationCurrent?.clientId,currentType:after?.associationCurrent?.associationType,effectiveAtPreserved:after?.associationCurrent?.effectiveAt===before.associationCurrent.effectiveAt,originalOperationId:audit.originalOperationId});
 }
 const workOrderOptions=snapshots.filter(s=>s.ref.parent.id==='OpsWorkOrders').map(s=>serializeWorkOrderAddOption(s));
 for(const option of workOrderOptions)if(!option.destinationLinked||option.destinationType!=='machine'||!option.machineId)failures.push(`OpsWorkOrders/${option.id}:selector-not-machine-linked`);
 for(const option of workOrderOptions){const data=actual.get('OpsWorkOrders/'+option.id);if(!Array.isArray(data.machineLinkEquipmentIds)||data.machineLinkEquipmentIds.length!==1||!equal(data.machineLinkEquipmentIds,data.bluefolderEquipmentIds))failures.push(`OpsWorkOrders/${option.id}:automatic-equipment-stamp-missing-or-mismatched`);}
 const globalReceipt=await db.doc('DataRepairReceipts/'+REPAIR_ID).get();
 if(!globalReceipt.exists||globalReceipt.data()?.planSha256!==receipt.planSha256)failures.push('global-repair-receipt-mismatch');
 const result={verified:failures.length===0,verifiedAt:new Date().toISOString(),repairId:REPAIR_ID,checkedDocuments:paths.length,checkedAllUnrelatedFields:true,failures,unrelatedFieldDifferences,machineCount:planned.machines.length,workOrderCount:workOrderOptions.length,itemChecks,protectedItemAIS21032Unchanged:equal(actual.get(control.path),control.data),workOrderOptions:workOrderOptions.map(o=>({id:o.id,clientId:o.clientId,machineId:o.machineId,machineName:o.machineName,destinationLinked:o.destinationLinked}))};
 const out=path.join(dir,`independent-verification-${new Date().toISOString().replace(/[:.]/g,'-')}.json`);
 fs.writeFileSync(out,JSON.stringify(result,null,2),{flag:'wx'});console.log(JSON.stringify({...result,output:out},null,2));
 if(failures.length)process.exitCode=1;
}
