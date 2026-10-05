"use strict";
const {fs,assert,request,CF,parent,functionName,file,json,sha256,configHash,getFunction,archiveHash,checkBaseline,writeReceipt}=require('./cloud-common.cjs');
let phase='preflight',receipt;
(async()=>{
 const baseline=json('baseline.json');assert.equal(baseline.revision,'nextserverwest-00075-rod');assert.equal(baseline.archiveSHA256,'8f7046a9121d8076cf4be67701cd2612ff5084c7bbd25a776c8ac09606ee63fb');assert.equal(sha256(fs.readFileSync(file('source.zip'))),baseline.archiveSHA256);
 if(process.argv.includes('--status')){
  receipt=json('deployment-receipt.json');assert(receipt.operation,'Uncertain submission; never resubmit');const op=await request(CF+receipt.operation);
  if(!op.done){console.log(JSON.stringify({state:'DEPLOYING',stages:op.metadata?.stages?.map(({name,state})=>({name,state}))}));return;}
  assert(!op.error,'Cloud operation failed; inspect existing operation');const live=await getFunction();assert.equal(live.state,'ACTIVE');assert.notEqual(live.serviceConfig.revision,baseline.revision);assert.equal(configHash(live),baseline.configHash);assert.equal(await archiveHash(live),receipt.artifactSHA256);
  Object.assign(receipt,{state:'ACTIVE',completedAt:new Date().toISOString(),revision:live.serviceConfig.revision,deployedSource:live.buildConfig.source,deployedUpdateTime:live.updateTime,unrelatedConfigurationPreserved:true});writeReceipt('deployment-receipt.json',receipt);console.log(JSON.stringify(receipt));return;
 }
 assert(!fs.existsSync(file('deployment-receipt.json')),'Existing submission journal: use --status only');
 const report=json('composition-report.json'),gates=json('package-gates.json'),approval=json('root-approval.json'),bytes=fs.readFileSync(file('artifact.zip')),artifactSHA256=sha256(bytes),reportSHA256=sha256(fs.readFileSync(file('composition-report.json')));
 assert.equal(gates.result,'PASS');assert.equal(gates.artifactSHA256,artifactSHA256);assert.equal(gates.compositionReportSHA256,reportSHA256);assert(gates.compiledTestsPassed&&gates.independentReviewPassed&&gates.backupVerified&&gates.scopedSourceOnly);
 assert(approval.sourceOnlyApproved&&approval.databaseWritesAllowed===false&&approval.testSlackPostsAllowed===false&&approval.testPrintJobsAllowed===false);assert.equal(approval.artifactSHA256,artifactSHA256);assert.equal(approval.compositionReportSHA256,reportSHA256);assert.equal(approval.packageGatesSHA256,sha256(fs.readFileSync(file('package-gates.json'))));assert.equal(approval.baselineArchiveSHA256,baseline.archiveSHA256);assert.equal(approval.configHash,baseline.configHash);
 for(const n of ['deploy.cjs','cloud-common.cjs','rollback.cjs','verify-live.cjs'])assert.equal(approval.toolHashes[n],sha256(fs.readFileSync(file(n))),n);
 for(const[n,h]of Object.entries(gates.receiptHashes))assert.equal(sha256(fs.readFileSync(file(n))),h,n);
 assert(report.noDeletedFiles&&report.unrelatedFilesPreserved&&report.allOldStaticAssetsPreserved&&report.productionPackageGraphPreserved);assert.equal(report.runtimeConfigChanged,false);assert.deepEqual(report.newDependencies,[]);
 const before=await getFunction();checkBaseline(before,baseline);assert.equal(await archiveHash(before),baseline.archiveSHA256);
 if(!process.argv.includes('--apply')){console.log(JSON.stringify({ok:true,readOnly:true,artifactSHA256,buildId:report.buildId,baselineRevision:baseline.revision}));return;}
 const rules=await request('https://firebaserules.googleapis.com/v1/projects/magmo-ac10c/releases/cloud.firestore'),rulesReceipt=json('rules-deployment-receipt.json');assert.equal(rulesReceipt.state,'ACTIVE');assert.equal(rules.rulesetName,rulesReceipt.createdRuleset);
 assert.equal(json('server-deployment-verification.json').ok,true,'Verified printer server required before app cutover');
 phase='upload';const upload=await request(CF+`${parent}/functions:generateUploadUrl`,'POST',{});const sent=await fetch(upload.uploadUrl,{method:'PUT',headers:{'Content-Type':'application/zip'},body:bytes,signal:AbortSignal.timeout(60000)});assert(sent.ok);
 const latest=await getFunction();checkBaseline(latest,baseline);assert.equal(await archiveHash(latest),baseline.archiveSHA256);
 receipt={state:'SUBMITTING',startedAt:new Date().toISOString(),originalRevision:baseline.revision,originalSource:baseline.source,originalUpdateTime:baseline.updateTime,uploadedSource:upload.storageSource,artifactSHA256,compositionReportSHA256:reportSHA256,configHash:baseline.configHash,buildId:report.buildId,sourceOnly:true,rollbackArchive:'source.zip',databaseWrites:0,testSlackPosts:0,testPrintJobs:0,scope:'Typed tool scanning; scan-root Slack summaries; exact-ID tool deduplication; tool labels'};writeReceipt('deployment-receipt.json',receipt,true);
 phase='patch';const op=await request(CF+functionName,'PATCH',{name:functionName,buildConfig:{source:{storageSource:upload.storageSource}}},{updateMask:'buildConfig.source'});Object.assign(receipt,{state:'DEPLOYING',operation:op.name});writeReceipt('deployment-receipt.json',receipt);console.log(JSON.stringify({state:receipt.state,operation:receipt.operation}));
})().catch(e=>{console.error(JSON.stringify({ok:false,phase,error:'deployment_guard_or_request_failed',status:e.response?.status||null,detail:e instanceof assert.AssertionError?e.message:undefined,operation:receipt?.operation||null}));process.exitCode=1;});
