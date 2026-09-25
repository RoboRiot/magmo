// Only BlueFolder getCustomer reads; no mutations or import calls.
import fs from"node:fs";import path from"node:path";import assert from"node:assert/strict";import{createRequire}from"node:module";
import{BlueFolderClient,getBlueFolderSlackSettings}from"../../lib/bluefolder/client.js";
const require=createRequire(import.meta.url),{normalizeBlueFolderCustomer}=require("../../lib/ops/clientDirectory.cjs"),{stable}=require("./nested-site-recovery-guards.cjs");
export async function verifyFreshCustomerProof(proof){
 const root=path.resolve(import.meta.dirname,"../..");
 for(const name of[".env.local",".env"]){const p=path.join(root,name);if(!fs.existsSync(p))continue;for(const line of fs.readFileSync(p,"utf8").split(/\r?\n/)){const m=line.trim().match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);if(!m||process.env[m[1]]!=null)continue;let v=m[2].trim();if((v.startsWith('"')&&v.endsWith('"'))||(v.startsWith("'")&&v.endsWith("'")))v=v.slice(1,-1);process.env[m[1]]=v.replace(/\\n/g,"\n");}}
 const bf=new BlueFolderClient(getBlueFolderSlackSettings()),cache=new Map();
 for(const s of proof.sites){if(!cache.has(s.customerId))cache.set(s.customerId,normalizeBlueFolderCustomer(await bf.getCustomer(s.customerId)));const c=cache.get(s.customerId);assert.equal(c.bluefolderCustomerId,s.customerId);assert.equal(c.name,s.customerName);assert(!c.inactive);const matches=c.locations.filter(l=>l.bluefolderLocationId===s.locationId);assert.equal(matches.length,1);assert.equal(matches[0].isPrimary,false);assert.deepEqual(stable(matches[0]),stable(s.location),"Fresh selected location no longer equals reviewed proof");}
 assert.equal(cache.size,4);return{customerReads:4,sitesVerified:5};
}
