"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict"),test=require("node:test"),parser=require("@babel/parser"),traverse=require("@babel/traverse").default;
const {read,getFactory}=require("../../ot-collapse-20260928/factory-tools.cjs");
const root=path.resolve(__dirname,"../../.."),out=path.join(__dirname,process.env.WO_LINK_DRAFT||"candidate");
function packagedLoad(relative,mocks={},env=process.env){
  const moduleCache=new Map(),fakeProcess={env,cwd:()=>out};
  function native(request,parent){
    if(Object.hasOwn(mocks,request))return mocks[request];
    if(!request.startsWith(".")&&!path.isAbsolute(request))return require(request);
    let file=path.isAbsolute(request)?path.normalize(request):path.resolve(path.dirname(parent),request);if(!path.extname(file))file+=".js";
    assert(file.startsWith(out+path.sep),"Unexpected helper escape");
    if(file.endsWith(path.join("lib","ops","workOrderLinkServer.js"))&&mocks["../../../lib/ops/workOrderLinkServer"])return()=>mocks["../../../lib/ops/workOrderLinkServer"];
    if(moduleCache.has(file))return moduleCache.get(file).exports;
    const module={exports:{}};moduleCache.set(file,module);
    new Function("module","exports","require","process","fetch",read(file))(module,module.exports,dep=>native(dep,file),fakeProcess,()=>{throw Error("Unexpected external request")});return module.exports;
  }
  const file=path.join(out,"work-order-link",relative);
  if(!relative.startsWith("pages/api/")){
    const exported=native(file,file);return typeof exported==="function"&&relative.endsWith(".js")?exported(mocks):exported;
  }
  const cron=relative.includes("/cron/"),numeric={14276:mocks["firebase-admin/auth"]||{},52771:mocks["../../../context/FirebaseAdmin"],81067:mocks["../../../utils/apiAuth"],55511:require("node:crypto"),60028:{Wi:mocks["../../../lib/magmonitor/healthServer"]?.runMagmonitorHealthAlerts},75005:{A:mocks["../../../lib/magmonitor/notifications"]?.deliverMagmonitorAlerts},11055:{X:mocks["../../../lib/ops/engineerNotifications"]?.deliverEngineerNotifications},78806:{JZ:()=>{throw Error("Unexpected importer")}},13801:mocks["../../../lib/magmonitor/notificationContract.cjs"]};
  const code=getFactory(read(path.join(out,".next/server",relative)),cron?29899:9009292),loaded={exports:{}},pending=[];
  const load=id=>{assert(Object.hasOwn(numeric,id),"Unexpected compiled dependency "+id);return numeric[id];};
  load.d=(target,getters)=>{for(const[k,get]of Object.entries(getters))Object.defineProperty(target,k,{enumerable:true,get});};load.r=()=>{};load.a=(_m,callback)=>pending.push(callback(values=>values,error=>{if(error)throw error;}));
  new Function("require","process",`return (${code});`)(request=>native(request,file),fakeProcess)(loaded,loaded.exports,load);
  return {default:async(...args)=>{await Promise.all(pending);return loaded.exports.default(...args);},config:loaded.exports.config};
}
const filename=path.join(root,"test/work-order-link-independent-review.test.cjs"),original=read(filename);let node;
traverse(parser.parse(original),{FunctionDeclaration(p){if(p.node.id.name==="load")node=p.node;}});assert(node);
const updated=original.slice(0,node.start)+"const load=packagedLoad;"+original.slice(node.end);
new Function("require","__dirname","packagedLoad",updated)(request=>{
  if(request.startsWith("../lib/")){const candidate=path.join(out,"work-order-link",request.slice(3));if(fs.existsSync(candidate))return require(candidate);}
  return require(request.startsWith(".")?path.resolve(path.dirname(filename),request):request);
},path.dirname(filename),packagedLoad);
test("new API appears in both routing manifests and reuses exact owner-only route config",()=>{
  const pages=JSON.parse(read(path.join(out,".next/server/pages-manifest.json"))),routes=JSON.parse(read(path.join(out,".next/routes-manifest.json")));
  assert.equal(pages["/api/ops/work-order-link-alerts"],"pages/api/ops/work-order-link-alerts.js");assert.equal(routes.staticRoutes.filter(r=>r.page==="/api/ops/work-order-link-alerts").length,1);
  const route=packagedLoad("pages/api/ops/work-order-link-alerts.js",{"firebase-admin/auth":{},"../../../context/FirebaseAdmin":{},"../../../utils/apiAuth":{}});assert.equal(route.config.api.bodyParser.sizeLimit,"8kb");
});
