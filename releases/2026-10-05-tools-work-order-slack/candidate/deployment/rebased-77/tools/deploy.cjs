"use strict";
const {fs,assert,request,CF,parent,functionName,file,json,sha256,configHash,getFunction,archiveHash,writeReceipt}=require('./cloud.cjs');
let phase='preflight',receipt;
(async()=>{
 const baseline=json('baseline.json'),report=json('package-report.json');
 assert.equal(baseline.revision,'nextserverwest-00077-puh');assert.equal(baseline.archiveSHA256,'6c8768b805303aab52528f3cf4279626deca2f4223b027c0aeaffb0a025f83c0');
 if(process.argv.includes('--status')){
  receipt=json('deployment-receipt.json');assert(receipt.operation,'Unknown submission outcome: investigate, never resubmit');
  const op=await request(CF+receipt.operation);if(!op.done){console.log(JSON.stringify({state:'DEPLOYING',stages:op.metadata?.stages?.map(({name,state})=>({name,state}))}));return;}
  assert(!op.error);const live=await getFunction();assert.equal(live.state,'ACTIVE');assert.notEqual(live.serviceConfig.revision,baseline.revision);assert.equal(configHash(live),baseline.configHash);assert.equal(await archiveHash(live),receipt.artifactSHA256);
  Object.assign(receipt,{state:'ACTIVE',completedAt:new Date().toISOString(),revision:live.serviceConfig.revision,deployedSource:live.buildConfig.source,deployedUpdateTime:live.updateTime,unrelatedConfigurationPreserved:true});writeReceipt('deployment-receipt.json',receipt);console.log(JSON.stringify(receipt));return;
 }
 assert(!fs.existsSync(file('deployment-receipt.json')),'Existing submission journal: use --status');
 const review=json('review.json');assert.equal(report.result,'PASS');assert.equal(report.changed,1);assert.equal(review.result,'PASS');assert.equal(review.artifactSHA256,report.artifactSHA256);assert.equal(review.reportSHA256,sha256(fs.readFileSync(file('package-report.json'))));
 for(const[n,h]of Object.entries(review.toolHashes))assert.equal(sha256(fs.readFileSync(file(n))),h,n);
 const bytes=fs.readFileSync(file('artifact.zip'));assert.equal(sha256(bytes),report.artifactSHA256);assert.equal(sha256(fs.readFileSync(file('source.zip'))),baseline.archiveSHA256);
 const guard=async()=>{const live=await getFunction();assert.equal(live.state,'ACTIVE');assert.equal(live.serviceConfig.revision,baseline.revision);assert.equal(live.updateTime,baseline.updateTime);assert.deepEqual(live.buildConfig.source,baseline.source);assert.equal(configHash(live),baseline.configHash);assert.equal(await archiveHash(live),baseline.archiveSHA256);return live;};
 await guard();if(!process.argv.includes('--apply')){console.log(JSON.stringify({ok:true,readOnly:true,baselineRevision:baseline.revision,artifactSHA256:report.artifactSHA256,scope:'One URL-encoded Tool HTML script reference; all Ops changes preserved'}));return;}
 const approval=json('approval.json');assert.equal(approval.approved,true);assert.equal(approval.artifactSHA256,report.artifactSHA256);assert.equal(approval.reviewSHA256,sha256(fs.readFileSync(file('review.json'))));assert.equal(approval.toolSHA256,sha256(fs.readFileSync(file('deploy.cjs'))));assert.equal(approval.databaseWritesAllowed,false);
 phase='upload';const upload=await request(CF+`${parent}/functions:generateUploadUrl`,'POST',{});const response=await fetch(upload.uploadUrl,{method:'PUT',headers:{'Content-Type':'application/zip'},body:bytes,signal:AbortSignal.timeout(60000)});assert(response.ok);await guard();
 receipt={state:'SUBMITTING',startedAt:new Date().toISOString(),baselineRevision:baseline.revision,baselineArchiveSHA256:baseline.archiveSHA256,baselineSource:baseline.source,artifactSHA256:report.artifactSHA256,configHash:baseline.configHash,buildId:baseline.buildId,sourceOnly:true,databaseWrites:0,testSlackPosts:0,testPrintJobs:0,scope:'One Tool HTML bootstrap reference; preserve Ops77 and tool/scan76 code',rollbackArchive:'source.zip'};writeReceipt('deployment-receipt.json',receipt,true);
 phase='patch';const op=await request(CF+functionName,'PATCH',{name:functionName,buildConfig:{source:{storageSource:upload.storageSource}}},{updateMask:'buildConfig.source'});Object.assign(receipt,{state:'DEPLOYING',operation:op.name});writeReceipt('deployment-receipt.json',receipt);console.log(JSON.stringify({state:receipt.state,operation:receipt.operation}));
})().catch(e=>{console.error(JSON.stringify({ok:false,phase,error:'deployment_guard_or_request_failed',status:e.response?.status||null,detail:e instanceof assert.AssertionError?e.message:undefined,operation:receipt?.operation||null}));process.exitCode=1;});
