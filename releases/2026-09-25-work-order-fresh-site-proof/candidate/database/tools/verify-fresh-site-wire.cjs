"use strict";
// Four read-only customers/get.aspx calls. Raw XML/auth stay in process memory.
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict"),crypto=require("node:crypto");
const{parseStringPromise}=require("xml2js");
const root=path.resolve(__dirname,"../.."),helper=path.join(root,"lib/ops/blueFolderCustomerLookup.cjs");
const sha=bytes=>crypto.createHash("sha256").update(bytes).digest("hex");
const expectedHash=process.argv[2];assert(/^[a-f0-9]{64}$/.test(expectedHash||""),"Frozen helper SHA256 required");assert.equal(sha(fs.readFileSync(helper)),expectedHash);
for(const name of[".env.local",".env"]){const p=path.join(root,name);if(!fs.existsSync(p))continue;for(const line of fs.readFileSync(p,"utf8").split(/\r?\n/)){const m=line.trim().match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);if(!m||process.env[m[1]]!=null)continue;let v=m[2].trim();if((v.startsWith('"')&&v.endsWith('"'))||(v.startsWith("'")&&v.endsWith("'")))v=v.slice(1,-1);process.env[m[1]]=v.replace(/\\n/g,"\n");}}
const proofBytes=fs.readFileSync(path.join(root,"outputs/work-order-site-only-recovery-20260925/reviewed-fresh-site-targets.json"));assert.equal(sha(proofBytes),"772e5275877bd18e1faf43539cf83e3d2e097e63018a233930b02044107c4ee2");const proof=JSON.parse(proofBytes);
const{createBlueFolderCustomerLookup}=require(helper),{stable}=require("./nested-site-recovery-guards.cjs");
const allowed=new Set(proof.sites.map(s=>s.customerId)),rawCache=new Map();let reads=0;
function collect(node,key,out=[]){if(Array.isArray(node)){node.forEach(v=>collect(v,key,out));return out;}if(!node||typeof node!=="object")return out;for(const[k,v]of Object.entries(node)){if(k.toLowerCase()===key.toLowerCase())out.push(...(Array.isArray(v)?v:[v]));if(v&&typeof v==="object")collect(v,key,out);}return out;}
function value(node,keys){const entries=[...Object.entries(node?.$||{}),...Object.entries(node||{})];const found=entries.find(([key])=>keys.includes(key.toLowerCase()));const v=found?.[1];return typeof v==="object"?String(v?._??v?.text??""):String(v??"");}
const lookup=createBlueFolderCustomerLookup({fetchImpl:async(url,options)=>{
 assert.equal(options.method,"POST");assert.equal(options.redirect,"error");assert.equal(new URL(url).protocol,"https:");assert(new URL(url).pathname.endsWith("/customers/get.aspx"));const id=String(options.body).match(/^<request><customerId>(\d+)<\/customerId><\/request>$/)?.[1];assert(allowed.has(id));
 if(!rawCache.has(id)){const response=await fetch(url,options);assert(response.ok,"BlueFolder read failed");const raw=await response.text();assert(Buffer.byteLength(raw)<=512*1024,"Oversized wire response");rawCache.set(id,raw);reads++;}return new Response(rawCache.get(id),{status:200,headers:{"Content-Type":"text/xml"}});
}});
(async()=>{
 const rows=[];
 for(const site of proof.sites){
  const result=await lookup(site.customerId,site.locationId);assert(result.ok,result.reason);assert.equal(result.proof.customerId,site.customerId);assert.equal(result.proof.customerName,site.customerName);assert.equal(result.proof.active,true);assert.deepEqual(stable(result.proof.location),stable(site.location));
  const parsed=await parseStringPromise(rawCache.get(site.customerId),{explicitArray:false,trim:true});const customers=collect(parsed,"customer");assert.equal(customers.length,1);const rawCustomer=customers[0],locations=collect(rawCustomer,"location"),selected=locations.filter(l=>value(l,["id","customerlocationid","locationid"])===site.locationId);assert.equal(selected.length,1);
  rows.push({customerId:site.customerId,locationId:site.locationId,ok:result.ok,reason:result.reason,rawInactive:value(rawCustomer,["inactive","isinactive"]),rawActive:value(rawCustomer,["active","isactive"]),rawSelectedIsPrimary:value(selected[0],["isprimary","primary"]),normalizedActive:result.proof.active,normalizedIsPrimary:result.proof.location.isPrimary,normalizedLocationId:result.proof.location.bluefolderLocationId,normalizedCountry:result.proof.location.country,reviewedLocationExact:true});
 }
 assert.equal(reads,4);assert.equal(rows.length,5);assert.equal(sha(fs.readFileSync(helper)),expectedHash,"Helper changed during verification");
 const receipt={checkedAt:new Date().toISOString(),readOnly:true,helperSha256:expectedHash,customerReads:reads,selectedLocations:rows.length,actualXmlParserVerified:true,rawResponsesSaved:false,credentialsTransferred:false,rows};const out=path.join(__dirname,"fresh-site-wire-verification.json");fs.writeFileSync(out,JSON.stringify(receipt,null,2)+"\n");console.log(JSON.stringify(receipt,null,2));
})().catch(error=>{console.error(JSON.stringify({ok:false,readOnly:true,error:error.message}));process.exitCode=1;});
