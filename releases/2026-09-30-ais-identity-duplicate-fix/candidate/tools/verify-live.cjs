"use strict";
const {fs,path,assert,request,file,json,sha256,getFunction,configHash,archiveHash,writeReceipt}=require("./cloud-common.cjs");
(async()=>{
 const baseline=json("baseline.json"),receipt=json("deployment-receipt.json"),report=json("composition-report-v2.json");assert.equal(receipt.state,"ACTIVE");
 const live=await getFunction();assert.equal(live.state,"ACTIVE");assert.equal(live.serviceConfig.revision,receipt.revision);assert.equal(live.updateTime,receipt.deployedUpdateTime);assert.equal(configHash(live),baseline.configHash);assert.equal(await archiveHash(live),receipt.artifactSHA256);
 const candidate=file("scoped-source-v2/.next"),manifest=JSON.parse(fs.readFileSync(path.join(candidate,"build-manifest.json"),"utf8"));
 assert.equal(fs.readFileSync(path.join(candidate,"BUILD_ID"),"utf8").trim(),report.buildId);
 const assets=new Set([`static/${report.buildId}/_buildManifest.js`,`static/${baseline.buildId}/_buildManifest.js`]);
 for(const entry of report.routes){for(const asset of manifest.pages[entry.route])assets.add(asset);assets.add(entry.oldPage);}
 const assetChecks=await Promise.all([...assets].map(async(asset)=>{const response=await fetch(`https://magmo.cloud/_next/${asset.split("/").map(encodeURIComponent).join("/")}`,{signal:AbortSignal.timeout(60000)});assert.equal(response.status,200,`Missing live asset ${asset}`);const actual=sha256(Buffer.from(await response.arrayBuffer()));assert.equal(actual,sha256(fs.readFileSync(path.join(candidate,asset))),`Live asset mismatch ${asset}`);return{asset,status:200,sha256:actual};}));
 const pages=await Promise.all(["/NewSearch/AddItem/NewItem","/NewSearch/mainSearch","/NewSearch/inventory/inventoryManage"].map(async(route)=>{const response=await fetch("https://magmo.cloud"+route,{headers:{"Cache-Control":"no-cache"},signal:AbortSignal.timeout(60000)});assert.equal(response.status,200);const html=await response.text();assert(html.includes(report.buildId),`Stale HTML ${route}`);const expected=report.routes.find(r=>r.route===route);assert(html.includes(path.basename(expected.newPage)),`Wrong page asset ${route}`);return{route,status:200,buildId:report.buildId};}));
 const probes=await Promise.all([
  ["/api/ops/health",200],
  ["/api/items/work-order-add/options",401],
  ["/api/items/work-order-add/confirm",405],
  ["/api/items/work-order-add/slack",405],
  ["/api/shipments/systems",405],
  ["/api/shipments/systems/MagmoReadOnlyProbe20260930/items",405],
  ["/api/items/photo-history?itemId=MagmoReadOnlyProbe20260930",401],
 ].map(async([route,status])=>{const response=await fetch("https://magmo.cloud"+route,{redirect:"manual",signal:AbortSignal.timeout(60000)});assert.equal(response.status,status,`Unexpected status ${route}`);await response.arrayBuffer();return{route,status};}));
 const rulesReceipt=json("rules-deployment-receipt.json"),plan=json("rules-plan-v2.json");assert.equal(rulesReceipt.state,"ACTIVE");
 const rulesRelease=await request("https://firebaserules.googleapis.com/v1/projects/magmo-ac10c/releases/cloud.firestore");assert.equal(rulesRelease.rulesetName,rulesReceipt.createdRuleset);const rules=await request("https://firebaserules.googleapis.com/v1/"+rulesRelease.rulesetName);assert.equal(sha256(rules.source.files[0].content),plan.afterSHA256);
 const result={result:"PASS",verifiedAt:new Date().toISOString(),revision:receipt.revision,buildId:report.buildId,exactArtifactSHA256:receipt.artifactSHA256,configurationPreserved:true,assets:assetChecks,pages,probes,ruleset:rulesRelease.rulesetName,rulesSHA256:plan.afterSHA256,databaseWrites:0,slackPosts:0};writeReceipt("live-verification.json",result);console.log(JSON.stringify({result:result.result,revision:result.revision,buildId:result.buildId,assetsVerified:assetChecks.length,pagesVerified:pages.length,probesVerified:probes.length,databaseWrites:0,slackPosts:0}));
})().catch(error=>{console.error(JSON.stringify({ok:false,error:"live_verification_failed",status:error.response?.status||null,detail:error instanceof assert.AssertionError?error.message:undefined}));process.exitCode=1;});
