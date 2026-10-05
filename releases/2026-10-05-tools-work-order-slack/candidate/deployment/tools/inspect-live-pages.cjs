"use strict";
(async()=>{for(const p of ['/NewSearch/mainSearch','/NewSearch/Tools/AIS_T00001']){
const r=await fetch('https://magmo.cloud'+p,{headers:{'Cache-Control':'no-cache'}}),h=await r.text();
console.log(JSON.stringify({path:p,status:r.status,build:h.match(/tools-work-order-[a-f0-9]+/)?.[0],pages:[...h.matchAll(/src="([^"]+)"/g)].map(x=>x[1]).filter(x=>x.includes('pages/'))}));
}})().catch(()=>{console.error('Read-only page inspection failed');process.exitCode=1;});
