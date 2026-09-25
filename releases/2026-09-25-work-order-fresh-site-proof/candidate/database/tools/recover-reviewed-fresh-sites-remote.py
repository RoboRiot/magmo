# Supplied CONFIG from the guarded local runner. Live client only; no daemon/state.
import json,sys,time,hashlib
from pathlib import Path
from dotenv import load_dotenv
def validate_import_result(result,target,pending_client_order_ids):
 assert result['created'] is False
 after=result['after'];assert after.get('clientId')==target['expectedClientId']
 for field in ('machineId','machineRef','trailerId','trailerRef'):
  value=after.get(field);assert value is None or (isinstance(value,str) and not value.strip())
 assert after.get('equipmentLinkStatus')==target['expectedStatus']
 transient=(after.get('equipmentLinkIssue')=='work_order_client_missing' and target['expectedStatus']=='unresolved' and bool(target['equipmentIds']) and target['id'] in pending_client_order_ids)
 assert transient or after.get('equipmentLinkIssue')==target['expectedIssue']
 return transient
root=Path(r'C:\Users\Owner\Desktop\warehouse\bluefolder_listener')
assert hashlib.sha256((root/'bluefolder_slack_listener_v2.py').read_bytes()).hexdigest()==CONFIG['sourceSha']
for p in [root/'.env.local',root/'.env',root.parent/'.env.local',root.parent/'.env']:
 if p.exists():load_dotenv(p,override=False)
sys.path.insert(0,str(root))
import bluefolder_slack_listener_v2 as m
def emit(value):print(json.dumps(value),flush=True)
bf=m.BlueFolderClient(m.SETTINGS)
body='<request><serviceRequestList><listType>full</listType><dateRange dateField="dateTimeCreated"><startDate>2026-08-26</startDate><endDate>2026-09-26</endDate></dateRange></serviceRequestList></request>'
response=bf._request('POST',m.SETTINGS.bluefolder_work_orders_path,data=body.encode(),headers={'Content-Type':'text/xml','Accept':'text/xml, application/xml, application/json'})
assert not bf._payload_error_message(response)
rows=[m.extract_work_order_fields(row,m.SETTINGS) for row in bf._extract_collection(response)]
records=[]
for t in CONFIG['targets']:
 found=[r for r in rows if r['id']==t['id'] and r['number']==t['id']];assert len(found)==1
 fields=found[0];assert fields.get('bluefolder_customer_id')==t['customerId'];assert fields.get('bluefolder_location_id')==t['locationId']
 assert sorted(v.upper() for v in fields.get('bluefolder_equipment_ids',[]))==sorted(v.upper() for v in t['equipmentIds'])
 assert sorted(fields.get('bluefolder_equipment_names',[]))==sorted(t['equipmentNames'])
 record=m.equipment_sync_record(m.bluefolder_import_record(fields,[]))
 # Existing selection was separately proven equal; omission cannot rewrite it.
 record.pop('bluefolder_equipment_ids',None);record.pop('bluefolder_equipment_names',None)
 assert record['existing_only'] is True
 records.append(record)
emit({'kind':'freshSource','checkedAt':m.utc_now_iso(),'records':records,'sourceRows':len(rows),'equipmentFieldsOmitted':True,'selectedEquipmentVerified':True})
if not CONFIG['apply']:sys.exit(0)
assert records==CONFIG['records'],'Source changed since preflight'
ops=m.MagmoOpsIngestClient(m.SETTINGS);assert ops.supports_bluefolder_import
for t,record in zip(CONFIG['targets'],records):
 ops._equipment_refresh_deadline=time.monotonic()+20
 context,_=m.fetch_authoritative_work_order_context(ops,t['id'],t['id']);assert context and not context.get('deleted') and not m.ops_record_is_deleted(context)
 result=ops.import_work_order(t['id'],record)
 emit({'kind':'httpResult','workOrderId':t['id'],'checkedAt':m.utc_now_iso(),'result':result})
 validate_import_result(result,t,CONFIG['pendingClientOrderIds'])
emit({'kind':'complete','checkedAt':m.utc_now_iso(),'count':len(records),'daemonStateWritten':False,'listenerLoopStarted':False,'noSlackWrites':True,'noBlueFolderWrites':True})
