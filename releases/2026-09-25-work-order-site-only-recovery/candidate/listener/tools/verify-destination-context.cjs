"use strict";
const cp=require("node:child_process"),fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict"),crypto=require("node:crypto");
const {request}=require("../ops-reliability-20260922/cloud.cjs");
const {decodeDoc}=require("./nested-site-recovery-guards.cjs");
const helperPath=path.resolve(__dirname,"../../lib/ops/workOrderMachineLink.cjs");
assert.equal(crypto.createHash("sha256").update(fs.readFileSync(helperPath)).digest("hex"),"f8664402bfecd7ebb828fb44729c748671c86aa6aa31a090154a731f26463382");
const {workOrderEquipmentLinkStatus}=require(helperPath);
const code=String.raw`
import json,sys,time,hashlib
from pathlib import Path
from dotenv import load_dotenv
root=Path(r'C:\Users\Owner\Desktop\warehouse\bluefolder_listener')
assert hashlib.sha256((root/'bluefolder_slack_listener_v2.py').read_bytes()).hexdigest()=='7f28a4c93327ef111b02c6d068cc86bb4ec0561b55dc06a697bcfc5fcc76c71c'
for p in [root/'.env.local',root/'.env',root.parent/'.env.local',root.parent/'.env']:
 if p.exists():load_dotenv(p,override=False)
sys.path.insert(0,str(root))
import bluefolder_slack_listener_v2 as m
ops=m.MagmoOpsIngestClient(m.SETTINGS)
state=json.loads((root/'bluefolder_slack_state.json').read_text(encoding='utf-8-sig'))
result=[]
for wo,client in [('10658','AIS94688'),('10482','AIS64878')]:
 ops._equipment_refresh_deadline=time.monotonic()+20
 context,_=m.fetch_authoritative_work_order_context(ops,wo,wo)
 assert context and not m.ops_record_is_deleted(context)
 selected={k:context[k] for k in ['workOrderId','number','clientId','machineId','trailerId','client','machine','trailer','connections','bluefolderEquipmentIds','bluefolderEquipmentNames','equipmentLinkStatus','equipmentLinkIssue'] if k in context}
 saved=(state.get('processed_work_order_ids') or {}).get(wo) or {}
 after=saved.get('bluefolder_equipment_authoritative_after') or {}
 result.append({'workOrderId':wo,'httpContext':selected,'contextFieldNames':sorted(context),'listenerCheckpoint':{'resolution':saved.get('bluefolder_equipment_resolution'),'after':{k:after[k] for k in ['clientId','machineId','trailerId','equipmentLinkStatus','equipmentLinkIssue'] if k in after}}})
observed=[]
for wo,saved in (state.get('processed_work_order_ids') or {}).items():
 resolution=saved.get('bluefolder_equipment_resolution') or {}
 if resolution.get('status')=='not_selected':
  after=saved.get('bluefolder_equipment_authoritative_after') or {}
  observed.append({'workOrderId':wo,'clientId':after.get('clientId'),'status':resolution.get('status'),'issue':resolution.get('reason'),'acknowledgedAt':saved.get('bluefolder_equipment_acknowledged_at')})
print(json.dumps({'checkedAt':m.utc_now_iso(),'readOnly':True,'contextChecks':result,'normalDaemonSiteOnlyAcknowledgements':observed,'stateWritten':False,'noImportRequests':True},indent=2))
`;
const r=cp.spawnSync("ssh",["-o","ConnectTimeout=10","magmo-server",'C:/Progra~1/Python314/python.exe -B -c "import sys;exec(sys.stdin.read())"'],{input:code,encoding:"utf8",timeout:60000,maxBuffer:1024*1024});
if(r.error||r.status!==0){console.error(JSON.stringify({error:"Read-only context verification failed",detail:r.stderr?.slice(-1000)}));process.exitCode=1;}else{(async()=>{
 const receipt=JSON.parse(r.stdout);receipt.contextEndpointOmitsDestinationFields=true;receipt.firestoreReadChecks=[];
 for(const [id,expected]of[["10658","AIS94688"],["10482","AIS64878"]]){
  const doc=await request("https://firestore.googleapis.com/v1/projects/magmo-ac10c/databases/(default)/documents/OpsWorkOrders/"+id),data=decodeDoc(doc);
  assert.equal(data.clientId,expected);if(doc.fields.clientRef)assert.equal(doc.fields.clientRef.referenceValue,"projects/magmo-ac10c/databases/(default)/documents/Client/"+expected);assert(!data.machineId&&!data.trailerId);
  const status=workOrderEquipmentLinkStatus(data);assert.equal(status.equipmentLinkStatus,"not_selected");assert.equal(status.equipmentLinkIssue,"");
  receipt.firestoreReadChecks.push({workOrderId:id,clientId:data.clientId,clientReferencePresent:Boolean(doc.fields.clientRef),clientReferenceValid:doc.fields.clientRef?true:null,machineId:data.machineId||"",trailerId:data.trailerId||"",computedWithDeployedHelper:status});
 }
 fs.writeFileSync(path.join(__dirname,"destination-context-verification.json"),JSON.stringify(receipt,null,2)+"\n");console.log(JSON.stringify(receipt,null,2));
})().catch(error=>{console.error(JSON.stringify({error:error.message}));process.exitCode=1;});}
