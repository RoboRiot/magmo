"use strict";
// Local-only exact-archive packaging. Independent and root byte reviews must
// bind the immutable composition; this tool never uploads or deploys anything.
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict"),cp=require("node:child_process");
const{sha,walk}=require("../../ot-collapse-20260928/factory-tools.cjs");
const here=__dirname,root=path.resolve(here,"../../.."),file=name=>path.join(here,name),json=name=>JSON.parse(fs.readFileSync(file(name),"utf8"));
const report=json("composition-report.json"),reportHash=sha(fs.readFileSync(file("composition-report.json"))),frozen=json("frozen-inputs.json"),compiled=json("compiled-verification.json");
assert.equal(report.sourceDirectory,"candidate");const candidate=file(report.sourceDirectory),artifact=file("artifact.zip");
const receipts=["compiled-verification.json","source-verification.json","independent-artifact-review.json","root-independent-verification.json"];
for(const name of receipts){const receipt=json(name);assert.equal(receipt.result||receipt.status,"PASS",name);if(name!=="source-verification.json")assert.equal(receipt.compositionReportSHA256,reportHash,name);}
assert(compiled.tests.passed>=86);assert.equal(compiled.tests.failed,0);
for(const field of["actualCompiledImporter","actualCompiledUpsert","actualCompiledManualLinks","actualCompiledCron","actualCompiledOwnerInbox","actualLiveBlueFolderClient"])assert.equal(compiled[field],true,field);
for(const field of["productionNetworkRequests","databaseWrites","slackPosts"])assert.equal(compiled[field],0,field);
assert.equal(frozen.compositionReportSHA256,reportHash);assert.equal(frozen.baselineArchiveSHA256,report.baselineArchiveSHA256);
for(const[relative,expected]of Object.entries({...frozen.sourceHashes,...compiled.testHashes}))assert.equal(sha(fs.readFileSync(path.join(root,relative))),expected,"Frozen source/test drift: "+relative);
assert.equal(sha(fs.readFileSync(file("source.zip"))),report.baselineArchiveSHA256);
assert.equal(report.baselineRevision,"nextserverwest-00069-geb");assert.equal(report.noDeletedFiles,true);assert.equal(report.unrelatedFilesPreserved,true);assert.equal(report.runtimeConfigChanged,false);assert.equal(report.noStaticChanges,true);assert.equal(report.compiledConsumers.length,10);
const inventory=json("candidate-files.json"),files=walk(candidate).map(name=>{assert(!fs.lstatSync(name).isSymbolicLink());return path.relative(candidate,name).replaceAll("\\","/");}).sort();
assert.deepEqual(files,inventory.map(entry=>entry.path).sort());assert.equal(files.length,report.candidateFileCount);
for(const entry of inventory)assert.equal(sha(fs.readFileSync(path.join(candidate,entry.path))),entry.sha256,entry.path);
assert(!fs.existsSync(artifact),"Never overwrite an immutable ZIP");assert(!fs.existsSync(file("package-gates.json")),"Package already finalized");
cp.execFileSync("tar",["-a","-cf",artifact,"-C",candidate,"."],{stdio:"pipe"});
const names=cp.execFileSync("tar",["-tf",artifact],{encoding:"utf8"}).trim().split(/\r?\n/).filter(name=>!name.endsWith("/")).map(name=>name.replace(/^\.\//,""));
assert.equal(new Set(names).size,names.length);assert.deepEqual(names.sort(),files);assert(names.every(name=>!path.isAbsolute(name)&&!name.split("/").includes("..")));
const check=fs.mkdtempSync(file("zip-verification-"));cp.execFileSync("tar",["-xf",artifact,"-C",check],{stdio:"pipe"});
assert.deepEqual(walk(check).map(name=>path.relative(check,name).replaceAll("\\","/")).sort(),files);
for(const entry of inventory)assert.equal(sha(fs.readFileSync(path.join(check,entry.path))),entry.sha256,"ZIP mismatch: "+entry.path);
const gates={result:"PASS",packagedAt:new Date().toISOString(),artifactSHA256:sha(fs.readFileSync(artifact)),artifactBytes:fs.statSync(artifact).size,compositionReportSHA256:reportHash,baselineRevision:report.baselineRevision,baselineArchiveSHA256:report.baselineArchiveSHA256,candidateBuildId:report.unchangedBuildId,noDeletedFiles:true,unchangedFilesVerified:true,compiledTestsPassed:true,compiledTestCount:compiled.tests.passed,independentReviewPassed:true,zipEntriesVerified:files.length,sourceOnly:true,runtimeConfigurationPreserved:true,staticAssetsPreserved:report.immutableStaticAssetsPreserved,receiptHashes:Object.fromEntries(receipts.map(name=>[name,sha(fs.readFileSync(file(name)))])),frozenInputsSHA256:sha(fs.readFileSync(file("frozen-inputs.json"))),candidateInventorySHA256:sha(fs.readFileSync(file("candidate-files.json")))};
fs.writeFileSync(file("package-gates.json"),JSON.stringify(gates,null,2)+"\n",{flag:"wx"});console.log(JSON.stringify(gates,null,2));
