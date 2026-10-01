"use strict";
const fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process"),assert=require("node:assert/strict");
const T=require("./factory-utils.cjs"),here=__dirname;
const run=cp.spawnSync(process.execPath,["--test",path.join(here,"test-compiled-shipment.cjs")],{encoding:"utf8",windowsHide:true});
fs.writeFileSync(path.join(here,"compiled-shipment-v2.tap"),run.stdout+run.stderr);assert.equal(run.status,0);assert.match(run.stdout,/# pass 12\b/);assert.match(run.stdout,/# fail 0\b/);
const report={result:"PASS",verifiedAt:new Date().toISOString(),candidate:"scoped-source-v2",serviceFactoryId:51585,testsPassed:12,testsFailed:0,actualDeployedServiceAndContractFactories:true,sourceTestSHA256:T.sha(fs.readFileSync(path.resolve(here,"../../../test/shipment-system-service.test.cjs"))),compiledChunkSHA256:T.sha(fs.readFileSync(path.join(here,"scoped-source-v2/.next/server/chunks/4895.js"))),logSHA256:T.sha(fs.readFileSync(path.join(here,"compiled-shipment-v2.tap"))),productionMutations:0};fs.writeFileSync(path.join(here,"compiled-shipment-verification-v2.json"),JSON.stringify(report,null,2)+"\n");console.log(JSON.stringify(report));
