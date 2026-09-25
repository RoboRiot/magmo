"use strict";
// Default: read-only preflight. Apply is separately root-authorized after API guard
// deployment/full backup, before restarting the site-only recovery daemon.
const fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process"),crypto=require("node:crypto"),assert=require("node:assert/strict");
const {request}=require("../ops-reliability-20260922/cloud.cjs");
const g=require("./nested-site-recovery-guards.cjs");
const BASELINE="d9f9fa8c6ef543a9d5062f3a8c2a3cafd043644519aea4b9354d2989e07a148f";
const CANDIDATE="7f28a4c93327ef111b02c6d068cc86bb4ec0561b55dc06a697bcfc5fcc76c71c";
const PROOF_SHA="8368119f835fc4a44b73699422fa869ce5ec93aad985d69d73c37a1357999012";
const MANIFEST_SHA="5144876dba6ca86c5ae8b84e051b9c10f9e60e0ade8afaca424e0cafe54d67cc";
const hash=bytes=>crypto.createHash("sha256").update(bytes).digest("hex");
const [, , mode="--dry-run", revision]=process.argv;
assert(["--dry-run","--apply"].includes(mode),"Use --dry-run or explicitly approved --apply <verified-app-revision>");
if(mode==="--apply")assert(/^nextserverwest-\d+-[a-z0-9]+$/.test(revision||""),"Verified API guard revision required");
const project="https://firestore.googleapis.com/v1/projects/magmo-ac10c/databases/(default)/documents";
const proofPath=path.resolve(__dirname,"../../outputs/work-order-site-only-recovery-20260925/reviewed-nested-site-targets.json");
const proofBytes=fs.readFileSync(proofPath);assert.equal(hash(proofBytes),PROOF_SHA,"Reviewed target set changed");
const proof=JSON.parse(proofBytes),targets=proof.targets;
assert.equal(targets.length,19);assert.equal(new Set(targets.map(t=>t.id)).size,19);assert.equal(proof.expectedNewClients,14);assert.equal(new Set(targets.map(t=>t.expectedClientId)).size,14);
const output=path.resolve(__dirname,"../../outputs/work-order-site-only-recovery-20260925/nested-site-"+mode.slice(2)+"-"+new Date().toISOString().replaceAll(":","-"));
fs.mkdirSync(output,{recursive:true});
const save=(name,value)=>fs.writeFileSync(path.join(output,name),JSON.stringify(value,null,2)+"\n");
async function clients(){let docs=[],pageToken;do{const result=await request(project+"/Client","GET",undefined,{pageSize:1000,...(pageToken?{pageToken}:{})});docs.push(...(result.documents||[]));pageToken=result.nextPageToken;}while(pageToken);return docs;}
async function orders(){return Promise.all(targets.map(t=>request(project+"/OpsWorkOrders/"+t.id)));}
async function activeRevision(){const fn=await request("https://cloudfunctions.googleapis.com/v2/projects/magmo-ac10c/locations/us-west2/functions/nextServerWest");assert.equal(fn.state,"ACTIVE");if(mode==="--apply")assert.equal(fn.serviceConfig.revision,revision,"Reviewed API revision drifted");return fn.serviceConfig.revision;}
async function remote(apply,records=[]){
 const config={apply,records,targets,baselineSha:BASELINE,candidateSha:CANDIDATE};
 const code="import json\nCONFIG=json.loads("+JSON.stringify(JSON.stringify(config))+")\n"+fs.readFileSync(path.join(__dirname,"recover-reviewed-nested-sites-remote.py"),"utf8");
 const name=apply?"http-results.ndjson":"fresh-source.ndjson";
 return await new Promise((resolve,reject)=>{
  const child=cp.spawn("ssh",["-o","ConnectTimeout=10","magmo-server",'C:/Progra~1/Python314/python.exe -B -c "import sys;exec(sys.stdin.read())"'],{stdio:["pipe","pipe","pipe"]});
  let stdout="",stderr="";const timer=setTimeout(()=>child.kill(),apply?480000:60000);
  child.stdout.on("data",data=>{stdout+=data;fs.appendFileSync(path.join(output,name),data);});
  child.stderr.on("data",data=>{stderr+=data;});
  child.on("error",error=>{clearTimeout(timer);reject(error);});
  child.on("close",code=>{clearTimeout(timer);if(code!==0){fs.writeFileSync(path.join(output,"remote-failure.txt"),stderr);return reject(Error("Remote bounded "+(apply?"apply":"read")+" stopped; inspect protected evidence before any retry"));}try{resolve(stdout.trim().split(/\r?\n/).filter(Boolean).map(line=>JSON.parse(line)));}catch{reject(Error("Invalid bounded-run receipt; do not retry apply"));}});
  child.stdin.end(code);
 });
}
(async()=>{
 const active=await activeRevision();
 if(mode==="--apply"){
  const bytes=fs.readFileSync(path.resolve(__dirname,"../../outputs/firestore-backups/2026-09-25-site-only-recovery-predeploy/manifest.json"));assert.equal(hash(bytes),MANIFEST_SHA);
  const manifest=JSON.parse(bytes);assert.equal(manifest.status,"complete");assert.equal(manifest.verification?.checksumRecomputed,true);assert.equal(manifest.verification?.documentCountRecounted,true);
 }
 const [beforeOrders,beforeClients]=await Promise.all([orders(),clients()]);save("before-orders.json",beforeOrders);save("before-clients.json",beforeClients);
 beforeOrders.forEach((doc,i)=>g.assertSafeOrder(doc,targets[i]));
 assert(targets.every(t=>!beforeClients.some(doc=>g.id(doc)===t.expectedClientId)),"Expected new Client already exists; stop and re-review");
 const source=await remote(false);const records=source.find(row=>row.kind==="freshSource")?.records;assert.equal(records?.length,19);records.forEach((record,i)=>g.payloadFromRecord(record,targets[i]));
 const plan=await g.planSites(beforeClients,targets,records);assert.equal(plan.creations.size,14);save("creation-plan.json",{plans:plan.plans,creations:Object.fromEntries(plan.creations)});
 const preflight={checkedAt:new Date().toISOString(),mode,readOnly:mode==="--dry-run",apiRevision:active,proofSha256:PROOF_SHA,backupManifestSha256:MANIFEST_SHA,baselineListenerSha256:BASELINE,stagedListenerSha256:CANDIDATE,workOrderCount:19,expectedNewClients:14,existingClientCount:beforeClients.length,equipmentFieldsOmitted:true,existingOnly:true,plans:plan.plans};save("preflight.json",preflight);
 if(mode==="--dry-run"){fs.writeFileSync(path.join(__dirname,"nested-site-preflight.json"),JSON.stringify(preflight,null,2)+"\n");console.log(JSON.stringify({...preflight,protectedEvidenceDirectory:output},null,2));return;}
 await activeRevision();
 // Re-read the entire bounded preimage immediately before the first write.
 const [guardOrders,guardClients]=await Promise.all([orders(),clients()]);assert.equal(g.sha(guardOrders),g.sha(beforeOrders),"Work orders changed during preflight");assert.equal(g.sha(guardClients),g.sha(beforeClients),"Client directory changed during preflight");
 let result,error;
 try{result=await remote(true,records);}catch(caught){error=caught;}
 // Always capture after-images, including partial acknowledgement failures.
 const [afterOrders,afterClients]=await Promise.all([orders(),clients()]);save("after-orders.json",afterOrders);save("after-clients.json",afterClients);
 if(error)throw error;
 const http=result.filter(row=>row.kind==="httpResult");assert.equal(http.length,19);assert.equal(result.at(-1).kind,"complete");
 const verifiedOrders=afterOrders.map((doc,i)=>g.verifyOrder(beforeOrders[i],doc,targets[i]));const verifiedClients=g.verifyClients(beforeClients,afterClients,plan.creations);
 const receipt={checkedAt:new Date().toISOString(),apiRevision:active,backupManifestSha256:MANIFEST_SHA,proofSha256:PROOF_SHA,stagedListenerSha256:CANDIDATE,workOrderCount:19,...verifiedClients,orders:verifiedOrders,httpResults:http.map(row=>({workOrderId:row.workOrderId,requestId:row.result.requestId,created:row.result.created,idempotentReplay:row.result.idempotentReplay,clientId:row.result.after.clientId,equipmentLinkStatus:row.result.after.equipmentLinkStatus,equipmentLinkIssue:row.result.after.equipmentLinkIssue})),existingOnly:true,equipmentFieldsOmitted:true,daemonStateWritten:false,listenerLoopStarted:false,noSlackWrites:true,noBlueFolderWrites:true,noItemWrites:true};
 save("receipt.json",receipt);fs.writeFileSync(path.join(__dirname,"nested-site-recovery-receipt.json"),JSON.stringify(receipt,null,2)+"\n");console.log(JSON.stringify({...receipt,protectedEvidenceDirectory:output},null,2));
})().catch(error=>{console.error(JSON.stringify({error:error.message,protectedEvidenceDirectory:output,noAutomaticRetry:true}));process.exitCode=1;});
