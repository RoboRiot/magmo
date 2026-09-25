"use strict";
const cp = require("node:child_process");
const code = String.raw`
import hashlib, json
from pathlib import Path
from datetime import datetime, timezone
root=Path(r'C:\Users\Owner\Desktop\warehouse\bluefolder_listener')
state=json.loads((root/'bluefolder_slack_state.json').read_text(encoding='utf-8-sig'))
records=state.get('processed_work_order_ids') or {}
unproven=[]
for key,row in records.items():
    if not isinstance(row,dict):continue
    if any(row.get(k) for k in ['ops_deleted_at','deletedAt','ops_missing_from_magmo']):continue
    if not row.get('bluefolder_equipment_ids') and not row.get('bluefolder_equipment_names'):continue
    if not any(row.get(k) for k in ['ops_created_at','magmo_imported_at','ops_work_order_id']):continue
    after=row.get('magmo_authoritative_after') or {}
    if not after.get('clientId') or not (after.get('machineId') or after.get('trailerId')):
        unproven.append(str(key))
target=records.get('10677') or {}
safe_keys=['bluefolder_equipment_resolution','bluefolder_equipment_authoritative_after','bluefolder_equipment_synced_fingerprint','bluefolder_equipment_acknowledged_fingerprint','bluefolder_equipment_acknowledged_at']
health=state.get('health') or {}
print(json.dumps({'readOnly':True,'checkedAt':datetime.now(timezone.utc).isoformat(),
 'sourceSha256':hashlib.sha256((root/'bluefolder_slack_listener_v2.py').read_bytes()).hexdigest(),
 'health':{k:health.get(k) for k in ['listener_version','pid','healthy','last_successful_loop','latest_successful_bluefolder_poll','bluefolder_equipment_sync','bluefolder_status_sync','slack_root_posting_enabled']},
 'legacyUnprovenSelectedCount':len(unproven),'legacyUnproven10677Index':sorted(unproven).index('10677') if '10677' in unproven else None,
 'equipmentCursor':state.get('bluefolder_equipment_sync_last_id'),'workOrder10677':{k:target[k] for k in safe_keys if k in target}},indent=2))
`;
const result=cp.spawnSync("ssh",["-o","ConnectTimeout=10","magmo-server",'C:/Progra~1/Python314/python.exe -B -c "import sys;exec(sys.stdin.read())"'],{input:code,encoding:"utf8",timeout:30000,maxBuffer:1024*1024});
if(result.error||result.status!==0){console.error(JSON.stringify({error:"readonly_listener_audit_failed",code:result.error?.code,status:result.status,stderr:result.stderr?.slice(-1200)}));process.exitCode=1;}
else process.stdout.write(result.stdout);
