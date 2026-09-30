"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict"),{spawnSync}=require("node:child_process");
const T=require("../../ot-collapse-20260928/factory-tools.cjs");
const here=__dirname,root=path.resolve(here,"../../..");
const tests=[
  "test/fast-scan-drain-ui.test.cjs","test/work-order-add-service.test.cjs","test/work-order-add-route.test.cjs",
  "test/work-order-scanner-capture.test.cjs","test/work-order-scanner-routes.test.cjs","test/work-order-add-contract.test.cjs",
  "test/work-order-add-options.test.cjs","test/work-order-add-slack.test.cjs","test/work-order-add-slack-thread.test.cjs","test/work-order-add-slack-route.test.cjs",
];
const env=Object.fromEntries(Object.entries(process.env).filter(([key])=>!/TOKEN|SECRET|PASSWORD|PRIVATE_KEY|FIREBASE_|GOOGLE_APPLICATION_CREDENTIALS|SLACK_/i.test(key)));
const run=(name,inputs,extra={})=>{
  const result=spawnSync(process.execPath,["--test","--test-reporter=tap",...inputs],{cwd:root,env:{...env,...extra},encoding:"utf8",timeout:120000,windowsHide:true});
  fs.writeFileSync(path.join(here,`${name}.tap`),result.stdout+result.stderr);
  assert.equal(result.status,0,result.stdout+result.stderr);
  const pass=Number(result.stdout.match(/^# pass (\d+)$/m)?.[1]);assert(pass>0);assert.match(result.stdout,/^# fail 0$/m);
  return{result:"PASS",passed:pass,failed:0,outputSHA256:T.sha(result.stdout+result.stderr),testHashes:Object.fromEntries(inputs.map(relative=>[relative,T.sha(fs.readFileSync(path.resolve(root,relative)))]))};
};
const result={result:"PASS",checkedAt:new Date().toISOString(),
  compositionReportSHA256:T.sha(fs.readFileSync(path.join(here,"composition-report.json"))),
  sourceSHA256:T.sha(fs.readFileSync(path.join(root,"lib/inventory/workOrderAddSlack.cjs"))),
  packageSHA256:T.sha(fs.readFileSync(path.join(here,"scoped-source/package.json"))),
  lockSHA256:T.sha(fs.readFileSync(path.join(here,"scoped-source/package-lock.json"))),
  source:run("source-tests",tests),
  adcInstalledGraphs:run("adc-installed-tests",["test/storage-adc-compatibility.test.cjs"]),
  adcCandidate:run("adc-candidate-tests",["test/storage-adc-compatibility.test.cjs"],{STORAGE_ADC_CANDIDATE_ROOT:path.join(here,"scoped-source")}),
  compiled:run("compiled-tests",[path.relative(root,path.join(here,"test-compiled-service.test.cjs"))]),
  externalSlackRequests:0,productionDatabaseWrites:0,liveSlackPosts:0,
};
fs.writeFileSync(path.join(here,"compiled-verification.json"),`${JSON.stringify(result,null,2)}\n`);
console.log(JSON.stringify(result,null,2));
