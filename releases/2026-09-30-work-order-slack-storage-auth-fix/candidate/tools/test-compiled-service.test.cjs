"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict"),test=require("node:test"),{createRequire}=require("node:module"),{spawnSync}=require("node:child_process");
const T=require("../../ot-collapse-20260928/factory-tools.cjs");
const here=__dirname,root=path.resolve(here,"../../.."),candidate=path.join(here,"scoped-source"),api=".next/server/pages/api/items/work-order-add/slack.js";
for(const key of Object.keys(process.env))if(/TOKEN|SECRET|PASSWORD|PRIVATE_KEY|FIREBASE_|GOOGLE_APPLICATION_CREDENTIALS|SLACK_/i.test(key))delete process.env[key];
globalThis.fetch=async()=>{throw Error("Ambient external network disabled");};
const routeCode=T.read(path.join(candidate,api)),factories=new Map();
for(const relative of [api,...T.loaderChunks(routeCode).map(id=>`.next/server/chunks/${id}.js`)]){
  const filename=path.join(candidate,relative);
  for(const{id,source}of T.factories(T.read(filename)))factories.set(id,new Function("require",`return (${source});`)(createRequire(filename)));
}
const cache=new Map();
function webpackRequire(id){
  if(cache.has(id))return cache.get(id).exports;
  const factory=factories.get(id);assert.equal(typeof factory,"function",`Missing module ${id}`);
  const module={exports:{}};cache.set(id,module);factory(module,module.exports,webpackRequire);return module.exports;
}
webpackRequire.d=(e,d)=>{for(const[key,get]of Object.entries(d))Object.defineProperty(e,key,{enumerable:true,get});};
webpackRequire.r=e=>Object.defineProperty(e,"__esModule",{value:true});
webpackRequire.n=value=>()=>value?.__esModule?value.default:value;
webpackRequire.o=(value,key)=>Object.hasOwn(value,key);
const compiledService=webpackRequire(99397),compiledThread=webpackRequire(97306);
for(const relative of ["test/work-order-add-slack.test.cjs","test/work-order-add-slack-thread.test.cjs"]){
  const filename=path.join(root,relative),localRequire=createRequire(filename),sourceCode=T.read(filename);
  const intercepted=request=>request==="../lib/inventory/workOrderAddSlack.cjs"?compiledService:request==="../lib/inventory/workOrderAddSlackThread.cjs"?compiledThread:localRequire(request);
  new Function("require","module","exports","__filename","__dirname",sourceCode)(intercepted,{exports:{}},{},filename,path.dirname(filename));
}
test("exact production route cold-loads through its preserved actual webpack runtime without credentials",()=>{
  const env=Object.fromEntries(Object.entries(process.env).filter(([key])=>!/TOKEN|SECRET|PASSWORD|PRIVATE_KEY|FIREBASE_|GOOGLE_APPLICATION_CREDENTIALS|SLACK_/i.test(key)));
  const script=`global.fetch=async()=>{throw Error('External network forbidden')};Promise.resolve(require(${JSON.stringify(path.join(candidate,api))})).then(x=>{if(!x)throw Error('Missing route');console.log('COLD_LOAD_PASS')}).catch(e=>{console.error(e.message);process.exitCode=1});`;
  const result=spawnSync(process.execPath,["-e",script],{cwd:candidate,env,encoding:"utf8",timeout:30000,windowsHide:true});
  assert.equal(result.status,0,result.stderr);assert.match(result.stdout,/COLD_LOAD_PASS/);
});
test("only three deployment files and Slack service factory change; all 537 other production files are exact",()=>{
  const report=JSON.parse(T.read(path.join(here,"composition-report.json")));
  const before=JSON.parse(T.read(path.join(here,"baseline-files.json")));
  const after=JSON.parse(T.read(path.join(here,"candidate-files.json")));
  assert.equal(before.length,540);assert.equal(after.length,540);
  assert.deepEqual(report.modified,[api,"package-lock.json","package.json"]);
  for(const f of before){const bytes=fs.readFileSync(path.join(candidate,f.path));assert.equal(T.sha(bytes),after.find(x=>x.path===f.path).sha256);if(!report.modified.includes(f.path))assert.equal(T.sha(bytes),f.sha256);}
  const old=new Map(T.factories(T.read(path.join(here,"source",api))).map(x=>[x.id,x.source]));
  const current=new Map(T.factories(routeCode).map(x=>[x.id,x.source]));
  assert.deepEqual([...current.keys()],[...old.keys()]);
  for(const[id,f]of old)if(id!==99397)assert.equal(current.get(id),f);
  assert.deepEqual(T.loaderChunks(routeCode),[5030,4354,1572]);
});
