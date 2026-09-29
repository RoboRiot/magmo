"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const{sha,read,walk,factories,loaderChunks}=require("../../ot-collapse-20260928/factory-tools.cjs");
const here=__dirname,root=path.resolve(here,"../../.."),name=process.argv[2];assert(/^draft-source-v\d+$/.test(name));
const draft=JSON.parse(read(path.join(here,name+"-report.json"))),baseline=JSON.parse(read(path.join(here,"baseline.json"))),source=path.join(here,"source"),candidate=path.join(here,name);
assert(!fs.existsSync(path.join(here,"composition-report.json")),"Never overwrite a frozen report");
for(const[relative,expected]of Object.entries(draft.sourceHashes))assert.equal(sha(fs.readFileSync(path.join(root,relative))),expected,"Source drift: "+relative);
const before=JSON.parse(read(path.join(here,"baseline-files.json"))),beforeByName=new Map(before.map(file=>[file.path,file]));
const after=walk(candidate).map(file=>({path:path.relative(candidate,file).replaceAll("\\","/"),bytes:fs.statSync(file).size,sha256:sha(fs.readFileSync(file))})).sort((a,b)=>a.path.localeCompare(b.path));
assert(before.every(file=>after.some(item=>item.path===file.path)),"Deleting baseline files is forbidden");
const changed=after.filter(file=>beforeByName.has(file.path)&&file.sha256!==beforeByName.get(file.path).sha256).map(file=>file.path),added=after.filter(file=>!beforeByName.has(file.path)).map(file=>file.path);
assert.deepEqual(changed.sort(),draft.changed.sort());assert.deepEqual(added.sort(),draft.added.sort());
const staticFiles=before.filter(file=>file.path.startsWith(".next/static/"));for(const file of staticFiles)assert.equal(after.find(item=>item.path===file.path).sha256,file.sha256);
const forbidden=[];for(const file of after){if(/(^|\/)(?:\.env(?:\..*)?|.*(?:service-account|credential).*\.json)$/i.test(file.path))forbidden.push(file.path);if(added.includes(file.path)){const text=read(path.join(candidate,file.path));assert(!text.includes("-----BEGIN PRIVATE KEY-----"));assert(!/xox[bp]-\d{8,}/.test(text));assert(!text.includes(root));}}
assert.deepEqual(forbidden,[]);
const serviceGraph=JSON.parse(read(path.join(here,"shared-service-graph.json")));
for(const consumer of serviceGraph.consumers){const relative=".next/server/"+consumer.file;assert.equal(sha(fs.readFileSync(path.join(source,relative))),sha(fs.readFileSync(path.join(candidate,relative))));assert(loaderChunks(read(path.join(candidate,relative))).includes(8806));}
const entries=[...changed,...added].map(relative=>({path:relative,before:beforeByName.get(relative)?.sha256||null,after:after.find(file=>file.path===relative).sha256}));
const report={...draft,draftOnly:false,sourceDirectory:name,baselineRevision:baseline.revision,baselineArchiveSHA256:baseline.archiveSHA256,baselineConfigHash:baseline.configHash,noDeletedFiles:true,unrelatedFilesPreserved:true,runtimeConfigChanged:false,noStaticChanges:true,immutableStaticAssetsPreserved:staticFiles.length,compiledConsumers:serviceGraph.consumers.map(item=>item.file),entries,baselineFileCount:before.length,candidateFileCount:after.length,unchangedBuildId:read(path.join(candidate,".next/BUILD_ID")).trim(),forbiddenNames:forbidden,productionMutations:0,finalizedAt:new Date().toISOString()};
fs.writeFileSync(path.join(here,"candidate-files.json"),JSON.stringify(after,null,2)+"\n",{flag:"wx"});fs.writeFileSync(path.join(here,"composition-report.json"),JSON.stringify(report,null,2)+"\n",{flag:"wx"});
fs.writeFileSync(path.join(here,"frozen-inputs.json"),JSON.stringify({frozenAt:report.finalizedAt,sourceHashes:draft.sourceHashes,baselineArchiveSHA256:baseline.archiveSHA256,compositionReportSHA256:sha(fs.readFileSync(path.join(here,"composition-report.json")))},null,2)+"\n",{flag:"wx"});
console.log(JSON.stringify({compositionReportSHA256:sha(fs.readFileSync(path.join(here,"composition-report.json"))),sourceDirectory:name,changed,addedCount:added.length,baselineFileCount:before.length,candidateFileCount:after.length,staticAssetsPreserved:staticFiles.length,sharedConsumers:serviceGraph.consumers.length},null,2));
