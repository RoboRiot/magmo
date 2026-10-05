"use strict";
const {fs,assert,request,CF,parent,functionName,file,json,sha256,configHash,getFunction,archiveHash,writeReceipt}=require('./cloud-common.cjs');
let receipt,phase='preflight';
(async()=>{
 const original=json('baseline.json'),previous=json('deployment-receipt.json'),report=json('bootstrap-fix-report.json');
 assert.equal(previous.revision,'nextserverwest-00076-duk');assert.equal(previous.artifactSHA256,'92cb67224b83e0cc1838bd67d3db6f98932649877967c5198493f35dae450e04');
 if(process.argv.includes('--status')){
  receipt=json('metadata-deployment-receipt.json');assert(receipt.operation,'Unknown submission outcome: investigate, never resubmit');
  const op=await request(CF+receipt.operation);if(!op.done){console.log(JSON.stringify({state:'DEPLOYING',stages:op.metadata?.stages?.map(({name,state})=>({name,state}))}));return;}
  assert(!op.error);const live=await getFunction();assert.equal(live.state,'ACTIVE');assert.notEqual(live.serviceConfig.revision,previous.revision);assert.equal(configHash(live),original.configHash);assert.equal(await archiveHash(live),receipt.artifactSHA256);
  Object.assign(receipt,{state:'ACTIVE',completedAt:new Date().toISOString(),revision:live.serviceConfig.revision,deployedSource:live.buildConfig.source,deployedUpdateTime:live.updateTime,unrelatedConfigurationPreserved:true});writeReceipt('metadata-deployment-receipt.json',receipt);console.log(JSON.stringify(receipt));return;
 }
 assert(!fs.existsSync(file('metadata-deployment-receipt.json')),'Existing submission journal; use --status');
 const review=json('bootstrap-fix-review.json');assert.equal(report.result,'PASS');assert.equal(review.result,'PASS');assert.equal(review.artifactSHA256,report.artifactSHA256);assert.equal(review.reportSHA256,sha256(fs.readFileSync(file('bootstrap-fix-report.json'))));
 for(const[n,h]of Object.entries(review.toolHashes))assert.equal(sha256(fs.readFileSync(file(n))),h,n);
 const bytes=fs.readFileSync(file('artifact-bootstrap-fixed.zip'));assert.equal(sha256(bytes),report.artifactSHA256);assert.equal(report.originalArtifactSHA256,previous.artifactSHA256);
 const guard=async()=>{const live=await getFunction();assert.equal(live.state,'ACTIVE');assert.equal(live.serviceConfig.revision,previous.revision);assert.equal(live.updateTime,previous.deployedUpdateTime);assert.deepEqual(live.buildConfig.source,previous.deployedSource);assert.equal(configHash(live),original.configHash);assert.equal(await archiveHash(live),previous.artifactSHA256);return live;};
 await guard();if(!process.argv.includes('--apply')){console.log(JSON.stringify({ok:true,readOnly:true,artifactSHA256:report.artifactSHA256,scope:'One URL-encoded Tool HTML script reference only'}));return;}
 const approval=json('bootstrap-fix-approval.json');assert.equal(approval.approved,true);assert.equal(approval.artifactSHA256,report.artifactSHA256);assert.equal(approval.reviewSHA256,sha256(fs.readFileSync(file('bootstrap-fix-review.json'))));assert.equal(approval.toolSHA256,sha256(fs.readFileSync(file('deploy-bootstrap-fix.cjs'))));assert.equal(approval.databaseWritesAllowed,false);
 phase='upload';const upload=await request(CF+`${parent}/functions:generateUploadUrl`,'POST',{});const response=await fetch(upload.uploadUrl,{method:'PUT',headers:{'Content-Type':'application/zip'},body:bytes,signal:AbortSignal.timeout(60000)});assert(response.ok);await guard();
 receipt={state:'SUBMITTING',startedAt:new Date().toISOString(),previousRevision:previous.revision,previousArtifactSHA256:previous.artifactSHA256,originalRevision:original.revision,originalSource:original.source,artifactSHA256:report.artifactSHA256,configHash:original.configHash,buildId:previous.buildId,sourceOnly:true,databaseWrites:0,testSlackPosts:0,testPrintJobs:0,scope:'One URL-encoded Tool HTML script reference only',rollbackArchive:'source.zip'};writeReceipt('metadata-deployment-receipt.json',receipt,true);
 phase='patch';const op=await request(CF+functionName,'PATCH',{name:functionName,buildConfig:{source:{storageSource:upload.storageSource}}},{updateMask:'buildConfig.source'});Object.assign(receipt,{state:'DEPLOYING',operation:op.name});writeReceipt('metadata-deployment-receipt.json',receipt);console.log(JSON.stringify({state:receipt.state,operation:receipt.operation}));
})().catch(e=>{console.error(JSON.stringify({ok:false,phase,error:'bootstrap_fix_guard_or_request_failed',status:e.response?.status||null,detail:e instanceof assert.AssertionError?e.message:undefined,operation:receipt?.operation||null}));process.exitCode=1;});
