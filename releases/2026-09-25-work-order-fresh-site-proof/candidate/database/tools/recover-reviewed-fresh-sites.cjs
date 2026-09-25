"use strict";
// Default: read-only preflight. Apply is separately root-authorized after API guard
// fresh-customer-proof API deployment/full backup. The healthy daemon is untouched.
const fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process"),crypto=require("node:crypto"),assert=require("node:assert/strict");
const {request}=require("../ops-reliability-20260922/cloud.cjs");
const g=require("./nested-site-recovery-guards.cjs");
const fg=require("./fresh-site-recovery-guards.cjs");
const CANDIDATE="7f28a4c93327ef111b02c6d068cc86bb4ec0561b55dc06a697bcfc5fcc76c71c";
const PROOF_SHA="772e5275877bd18e1faf43539cf83e3d2e097e63018a233930b02044107c4ee2";
const MANIFEST_SHA="5144876dba6ca86c5ae8b84e051b9c10f9e60e0ade8afaca424e0cafe54d67cc";
const hash=bytes=>crypto.createHash("sha256").update(bytes).digest("hex");
const [, , mode="--dry-run", revision,apiReceiptPath,apiReceiptSha]=process.argv;
assert(["--dry-run","--apply"].includes(mode),"Use --dry-run or explicitly approved --apply <verified-app-revision> <deployment-receipt-path> <approved-receipt-sha256>");
let approvedApiReceipt=null;
if(mode==="--apply"||apiReceiptPath){assert(/^nextserverwest-\d+-[a-z0-9]+$/.test(revision||""),"Verified fresh-proof API revision required");assert(/^[a-f0-9]{64}$/.test(apiReceiptSha||""),"Root-reviewed API receipt SHA256 required");const bytes=fs.readFileSync(path.resolve(apiReceiptPath));assert.equal(hash(bytes),apiReceiptSha,"Root-reviewed API receipt changed");approvedApiReceipt=fg.assertApiReceipt(JSON.parse(bytes),revision);}
const project="https://firestore.googleapis.com/v1/projects/magmo-ac10c/databases/(default)/documents";
const proofPath=path.resolve(__dirname,"../../outputs/work-order-site-only-recovery-20260925/reviewed-fresh-site-targets.json");
const proofBytes=fs.readFileSync(proofPath);assert.equal(hash(proofBytes),PROOF_SHA,"Reviewed target set changed");
const proof=JSON.parse(proofBytes),targets=proof.targets;
assert.equal(targets.length,8);assert.equal(new Set(targets.map(t=>t.id)).size,8);assert.equal(proof.siteCount,5);assert.equal(new Set(targets.map(t=>t.expectedClientId)).size,5);
const output=path.resolve(__dirname,"../../outputs/work-order-site-only-recovery-20260925/fresh-site-"+mode.slice(2)+"-"+new Date().toISOString().replaceAll(":","-"));
fs.mkdirSync(output,{recursive:true});
const save=(name,value)=>fs.writeFileSync(path.join(output,name),JSON.stringify(value,null,2)+"\n");
async function clients(){let docs=[],pageToken;do{const result=await request(project+"/Client","GET",undefined,{pageSize:1000,...(pageToken?{pageToken}:{})});docs.push(...(result.documents||[]));pageToken=result.nextPageToken;}while(pageToken);return docs;}
async function orders(){return Promise.all(targets.map(t=>request(project+"/OpsWorkOrders/"+t.id)));}
function configHash(fn){const service=structuredClone(fn.serviceConfig),build=structuredClone(fn.buildConfig);for(const key of["revision","uri","service"])delete service[key];for(const key of["source","sourceProvenance","build"])delete build[key];return g.sha({service,build,labels:fn.labels});}
async function activeRevision(){const fn=await request("https://cloudfunctions.googleapis.com/v2/projects/magmo-ac10c/locations/us-west2/functions/nextServerWest");assert.equal(fn.state,"ACTIVE");if(approvedApiReceipt){assert.equal(fn.serviceConfig.revision,revision,"Reviewed API revision drifted");assert.deepEqual(fn.buildConfig.source,approvedApiReceipt.deployedSource,"Reviewed API source generation drifted");assert.equal(configHash(fn),approvedApiReceipt.configHash,"Reviewed API configuration drifted");assert.equal(fn.buildConfig.runtime,"nodejs22");assert.equal(fn.buildConfig.entryPoint,"nextServerWest");}return fn.serviceConfig.revision;}
async function remote(apply,records=[],pendingClientOrderIds=[]){
 const config={apply,records,targets,sourceSha:CANDIDATE,pendingClientOrderIds};
 const code="import json\nCONFIG=json.loads("+JSON.stringify(JSON.stringify(config))+")\n"+fs.readFileSync(path.join(__dirname,"recover-reviewed-fresh-sites-remote.py"),"utf8");
 const name=apply?"http-results.ndjson":"fresh-source.ndjson";
 return await new Promise((resolve,reject)=>{
  const child=cp.spawn("ssh",["-o","ConnectTimeout=10","magmo-server",'C:/Progra~1/Python314/python.exe -B -c "import sys;exec(sys.stdin.read())"'],{stdio:["pipe","pipe","pipe"]});
  let stdout="",stderr="";const timer=setTimeout(()=>child.kill(),apply?240000:60000);
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
 beforeOrders.forEach((doc,i)=>fg.assertOrder(doc,targets[i]));
 save("before-parent-clients.json",beforeClients.filter(d=>proof.sites.some(s=>s.parentClientId===g.id(d))));
 const freshCustomerProof=await import("./verify-fresh-customer-proof.mjs");await freshCustomerProof.verifyFreshCustomerProof(proof);
 for(const site of proof.sites){const existing=beforeClients.find(d=>g.id(d)===site.expectedClientId);if(existing)fg.assertLeaf(existing,site);}
 const source=await remote(false);const records=source.find(row=>row.kind==="freshSource")?.records;assert.equal(records?.length,8);records.forEach((record,i)=>g.payloadFromRecord(record,targets[i]));
 const plan=await fg.planClients(beforeClients,proof,records);assert(plan.creations.size<=5);save("creation-plan.json",{plans:plan.plans,creations:Object.fromEntries(plan.creations)});
 const pendingClientOrderIds=plan.plans.filter(p=>p.createsClient&&targets.find(t=>t.id===p.id).equipmentIds.length>0).map(p=>p.id);
 const apiEvidence=approvedApiReceipt?{apiDeploymentReceiptSha256:apiReceiptSha,apiArtifactSha256:approvedApiReceipt.artifactSHA256,apiSourceGeneration:approvedApiReceipt.deployedSource.storageSource.generation,apiConfigurationSha256:approvedApiReceipt.configHash}:{};
 const preflight={checkedAt:new Date().toISOString(),mode,readOnly:mode==="--dry-run",apiRevision:active,...apiEvidence,proofSha256:PROOF_SHA,backupManifestSha256:MANIFEST_SHA,liveListenerSha256:CANDIDATE,workOrderCount:8,expectedNewClients:plan.creations.size,expectedExistingLeaves:5-plan.creations.size,existingClientCount:beforeClients.length,equipmentFieldsOmitted:true,storedSelectionsExact:true,expectedUnresolvedMachineOrders:6,expectedSiteOnlyOrders:2,pendingClientOrderIds,existingOnly:true,parentCacheWrites:false,plans:plan.plans};save("preflight.json",preflight);
 if(mode==="--dry-run"){fs.writeFileSync(path.join(__dirname,"fresh-site-preflight.json"),JSON.stringify(preflight,null,2)+"\n");console.log(JSON.stringify({...preflight,protectedEvidenceDirectory:output},null,2));return;}
 await activeRevision();
 // Re-read the entire bounded preimage immediately before the first write.
 const [guardOrders,guardClients]=await Promise.all([orders(),clients()]);assert.equal(g.sha(guardOrders),g.sha(beforeOrders),"Work orders changed during preflight");assert.equal(g.sha(guardClients),g.sha(beforeClients),"Client directory changed during preflight");
 let result,error;
 try{result=await remote(true,records,pendingClientOrderIds);}catch(caught){error=caught;}
 // Always capture after-images, including partial acknowledgement failures.
 const [afterOrders,afterClients]=await Promise.all([orders(),clients()]);save("after-orders.json",afterOrders);save("after-clients.json",afterClients);
 if(error)throw error;
 const http=result.filter(row=>row.kind==="httpResult");assert.equal(http.length,8);assert.equal(result.at(-1).kind,"complete");
 assert.deepEqual(http.map(row=>row.workOrderId),targets.map(t=>t.id));const transientAckIds=http.filter((row,i)=>fg.assertImportResult(row.result,targets[i],pendingClientOrderIds).transientPendingClientAck).map(row=>row.workOrderId);
 const verifiedOrders=afterOrders.map((doc,i)=>fg.verifyOrder(beforeOrders[i],doc,targets[i]));const verifiedClients=g.verifyClients(beforeClients,afterClients,plan.creations);
 for(const site of proof.sites)fg.assertLeaf(afterClients.find(d=>g.id(d)===site.expectedClientId),site);
 const inventoryDestinations=await fg.verifyInventoryDestinations(afterOrders,afterClients,targets);
 const receipt={checkedAt:new Date().toISOString(),apiRevision:active,...apiEvidence,backupManifestSha256:MANIFEST_SHA,proofSha256:PROOF_SHA,liveListenerSha256:CANDIDATE,workOrderCount:8,...verifiedClients,orders:verifiedOrders,inventoryDestinations,pendingClientOrderIds,transientAckIds,httpResults:http.map(row=>({workOrderId:row.workOrderId,requestId:row.result.requestId,created:row.result.created,idempotentReplay:row.result.idempotentReplay,clientId:row.result.after.clientId,equipmentLinkStatus:row.result.after.equipmentLinkStatus,equipmentLinkIssue:row.result.after.equipmentLinkIssue})),existingOnly:true,equipmentFieldsOmitted:true,selectedEquipmentPreserved:true,parentCacheWrites:false,daemonStateWritten:false,listenerLoopStarted:false,noSlackWrites:true,noBlueFolderWrites:true,noItemWrites:true};
 save("receipt.json",receipt);fs.writeFileSync(path.join(__dirname,"fresh-site-recovery-receipt.json"),JSON.stringify(receipt,null,2)+"\n");console.log(JSON.stringify({...receipt,protectedEvidenceDirectory:output},null,2));
})().catch(error=>{console.error(JSON.stringify({error:error.message,protectedEvidenceDirectory:output,noAutomaticRetry:true}));process.exitCode=1;});
