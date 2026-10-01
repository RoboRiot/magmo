"use strict";
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm"),Module=require("node:module"),assert=require("node:assert/strict");
const T=require("./factory-utils.cjs"),here=__dirname,root=path.resolve(here,"../../..");
const server=path.join(here,"scoped-source-v2/.next/server"),route=T.read(path.join(server,"pages/api/shipments/systems.js"));
const codes=[route,...T.loaderChunks(route).map(id=>T.read(path.join(server,`chunks/${id}.js`)))],factories=new Map(codes.flatMap(code=>T.factories(code).map(f=>[f.id,f.source]))),cache=new Map();
function req(id){if(id===77598)return require("node:crypto");if(cache.has(id))return cache.get(id).exports;assert(factories.has(id),`Unexpected compiled service dependency ${id}`);const m={exports:{}};cache.set(id,m);vm.runInThisContext(`(${factories.get(id)})`)(m,m.exports,req);return m.exports;}
req.d=(exports,defs)=>{for(const[name,value]of Object.entries(defs))Object.defineProperty(exports,name,{get:value,enumerable:true});};req.n=value=>()=>value?.__esModule?value.default:value;
const testPath=path.join(root,"test/shipment-system-service.test.cjs"),code=fs.readFileSync(testPath,"utf8"),m=new Module(testPath,module),ordinaryRequire=Module.createRequire(testPath);
m.filename=testPath;m.paths=Module._nodeModulePaths(path.dirname(testPath));m.require=id=>id==="../lib/inventory/shipmentSystemService.cjs"?req(51585):id==="../lib/inventory/shipmentSystemContract.cjs"?req(88898):ordinaryRequire(id);m._compile(code,testPath);
