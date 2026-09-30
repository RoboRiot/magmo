"use strict";
const fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process"),assert=require("node:assert/strict");
const T=require("../../ot-collapse-20260928/factory-tools.cjs");
const here=__dirname,file=n=>path.join(here,n),json=n=>JSON.parse(fs.readFileSync(file(n),"utf8"));
const report=json("composition-report.json"),reportHash=T.sha(fs.readFileSync(file("composition-report.json")));
const compiled=json("compiled-verification.json"),independent=json("independent-composition-review.json"),runtime=json("dependency-runtime-verification.json"),deps=json("dependency-review.json"),baseline=json("baseline.json");
const candidate=file("scoped-source"),artifact=file("artifact.zip"),inventory=json("candidate-files.json");
assert(process.argv.includes("--root-reviewed"),"Root packaging review required");
assert.equal(baseline.revision,"nextserverwest-00071-zot");
assert.equal(T.sha(fs.readFileSync(file("source.zip"))),baseline.archiveSHA256);
assert.equal(report.baselineArchiveSHA256,baseline.archiveSHA256);
assert.equal(compiled.result,"PASS");assert.equal(compiled.source.passed,151);assert.equal(compiled.compiled.passed,44);
assert.equal(compiled.adcInstalledGraphs.passed,2);assert.equal(compiled.adcCandidate.passed,1);
assert.equal(compiled.compositionReportSHA256,reportHash);
assert.equal(independent.pass,true);assert.equal(independent.compositionReportSHA256,reportHash);
assert.equal(independent.factoryReverseMappedToExactSourceAst,true);
assert.deepEqual(independent.changedFactoryIds,[99397]);
assert.equal(runtime.pass,true);assert.equal(runtime.actualSdkVerification.ok,true);
assert.equal(runtime.actualSdkVerification.forbiddenNetworkAttempts,0);
assert.equal(runtime.actualSdkVerification.realCredentialsUsed,false);
for(const receipt of [compiled,independent,runtime]){
  assert.equal(receipt.packageSHA256,T.sha(fs.readFileSync(path.join(candidate,"package.json"))));
  assert.equal(receipt.lockSHA256,T.sha(fs.readFileSync(path.join(candidate,"package-lock.json"))));
}
assert.deepEqual(deps.audits.baseline.totals,deps.audits.candidate.totals);
assert.deepEqual(deps.audits.baseline.vulnerabilities,deps.audits.candidate.vulnerabilities);
assert.deepEqual(report.modified,[".next/server/pages/api/items/work-order-add/slack.js","package-lock.json","package.json"]);
assert.equal(report.unrelatedFilesPreserved,true);assert.equal(report.runtimeConfigChanged,false);
assert.equal(report.noDeletedFiles,true);assert.equal(report.frontendAssetsUnchanged,true);
function files(directory,prefix=""){
  return fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry=>{
    if(!prefix&&entry.name==="node_modules")return[];
    const name=prefix+entry.name,target=path.join(directory,entry.name);
    assert(!fs.lstatSync(target).isSymbolicLink(),`Unexpected symlink ${name}`);
    return entry.isDirectory()?files(target,`${name}/`):[name];
  });
}
const names=files(candidate).sort();
assert.equal(names.length,540);assert.deepEqual(names,inventory.map(e=>e.path).sort());
for(const entry of inventory)assert.equal(T.sha(fs.readFileSync(path.join(candidate,entry.path))),entry.sha256,entry.path);
assert(!fs.existsSync(artifact));assert(!fs.existsSync(file("package-gates.json")));
fs.writeFileSync(file("zip-files.txt"),names.join("\n")+"\n");
cp.execFileSync("tar",["-a","-cf",artifact,"-C",candidate,"-T",file("zip-files.txt")],{stdio:"pipe"});
const archived=cp.execFileSync("tar",["-tf",artifact],{encoding:"utf8"}).trim().split(/\r?\n/).map(n=>n.replace(/^\.\//,""));
assert.equal(new Set(archived).size,archived.length);assert.deepEqual(archived.sort(),names);
const verify=fs.mkdtempSync(file("zip-verification-"));cp.execFileSync("tar",["-xf",artifact,"-C",verify],{stdio:"pipe"});
for(const entry of inventory)assert.equal(T.sha(fs.readFileSync(path.join(verify,entry.path))),entry.sha256,entry.path);
const receipts=["compiled-verification.json","independent-composition-review.json","dependency-runtime-verification.json","dependency-review.json"];
const gates={result:"PASS",packagedAt:new Date().toISOString(),rootReviewed:true,artifactSHA256:T.sha(fs.readFileSync(artifact)),artifactBytes:fs.statSync(artifact).size,
  compositionReportSHA256:reportHash,baselineRevision:baseline.revision,baselineArchiveSHA256:baseline.archiveSHA256,
  changedFactoryIds:[99397],modified:report.modified,noDeletedFiles:true,unchangedFilesVerified:true,compiledTestsPassed:true,
  sourceTests:151,compiledTests:44,adcGraphTests:3,independentReviewPassed:true,zipEntriesVerified:names.length,sourceOnly:true,runtimeConfigurationPreserved:true,
  receiptHashes:Object.fromEntries(receipts.map(n=>[n,T.sha(fs.readFileSync(file(n)))])),candidateInventorySHA256:T.sha(fs.readFileSync(file("candidate-files.json")))};
fs.writeFileSync(file("package-gates.json"),`${JSON.stringify(gates,null,2)}\n`,{flag:"wx"});
console.log(JSON.stringify(gates,null,2));
