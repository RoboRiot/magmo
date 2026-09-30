"use strict";
const { fs, path, assert, file, json, sha256, configHash, getFunction, archiveHash, writeReceipt } = require("./cloud-common.cjs");
(async () => {
  const deployed = json("deployment-receipt.json"), baseline = json("baseline.json"), report = json("composition-report.json");
  assert.equal(deployed.state, "ACTIVE");
  assert(!fs.existsSync(file("live-verification.json")), "Preserve existing verification");
  const before = await getFunction();
  assert.equal(before.state, "ACTIVE");
  assert.equal(before.serviceConfig.revision, deployed.revision);
  assert.equal(before.updateTime, deployed.deployedUpdateTime);
  assert.deepEqual(before.buildConfig.source, deployed.deployedSource);
  assert.equal(configHash(before), baseline.configHash);
  assert.equal(await archiveHash(before), deployed.artifactSHA256);
  const checks = [];
  async function read(relative, method = "GET") {
    const response = await fetch(`https://magmo.cloud${relative}`, {
      method, cache: "no-store", signal: AbortSignal.timeout(30000),
      ...(method === "POST" ? {headers:{"Content-Type":"application/json"},body:"{}"} : {}),
    });
    const data = Buffer.from(await response.arrayBuffer());
    checks.push({path:relative,method,status:response.status});
    return {response,data};
  }
  assert.equal((await read("/api/ops/health")).response.status,200);
  const page = await read("/NewSearch/mainSearch");
  assert.equal(page.response.status,200);
  assert(page.data.toString().includes(baseline.buildId));
  const candidate = path.join(file("scoped-source"),".next");
  const manifest = JSON.parse(fs.readFileSync(path.join(candidate,"build-manifest.json"),"utf8"));
  const assets = [...new Set([...(manifest.pages["/_app"]||[]),...(manifest.pages["/NewSearch/mainSearch"]||[])])];
  const assetChecks=[];
  for(const asset of assets){
    const downloaded=await read(`/_next/${asset}`);
    assert.equal(downloaded.response.status,200);
    const expected=sha256(fs.readFileSync(path.join(candidate,asset)));
    assert.equal(sha256(downloaded.data),expected);
    assetChecks.push({path:asset,sha256:expected});
  }
  for(const [route,method,status] of [
    ["/api/items/work-order-add/options","GET",401],
    ["/api/items/work-order-add/confirm","GET",405],
    ["/api/items/work-order-add/slack","GET",405],
    ["/api/items/work-order-add/slack","POST",401],
    ["/api/ops/work-orders","GET",401],
    ["/api/ops/work-order-link-alerts","GET",401],
  ]) assert.equal((await read(route,method)).response.status,status,route);
  const after=await getFunction();
  assert.equal(after.updateTime,before.updateTime);
  assert.deepEqual(after.buildConfig.source,before.buildConfig.source);
  assert.equal(configHash(after),baseline.configHash);
  const result={result:"PASS",checkedAt:new Date().toISOString(),revision:deployed.revision,source:deployed.deployedSource,
    buildId:baseline.buildId,artifactSHA256:deployed.artifactSHA256,compositionReportSHA256:sha256(fs.readFileSync(file("composition-report.json"))),
    configHash:baseline.configHash,checks,assets:assetChecks,authenticatedApplicationRequests:0,databaseWrites:0,liveSlackPosts:0,configurationPreserved:true};
  writeReceipt("live-verification.json",result,true);
  console.log(JSON.stringify(result,null,2));
})().catch(error=>{console.error(JSON.stringify({error:"live_verification_failed",status:error.response?.status||null,detail:error instanceof assert.AssertionError?error.message:undefined}));process.exitCode=1;});
