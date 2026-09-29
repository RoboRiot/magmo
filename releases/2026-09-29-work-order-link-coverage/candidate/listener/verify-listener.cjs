"use strict";
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),cp=require('node:child_process');
const files=fs.readdirSync(__dirname).filter(n=>/^listener-publication-\d+\.json$/.test(n)).sort();assert(files.length===1);
const before=JSON.parse(fs.readFileSync(path.join(__dirname,files[0])));assert(before.apply&&before.startupVerified&&!before.rolledBack);
const recoveryFiles=fs.readdirSync(__dirname).filter(n=>/^listener-launch-recovery-\d+\.json$/.test(n)).sort();
const recovery=recoveryFiles.length?JSON.parse(fs.readFileSync(path.join(__dirname,recoveryFiles.at(-1)))):null;
if(recovery)assert(recovery.apply&&recovery.managerExitCode===0&&!recovery.sourceChanged);
const code=String.raw`
import ast,hashlib,importlib.util,json,sys
from pathlib import Path
from datetime import datetime,timezone
root=Path(r'C:\Users\Owner\Desktop\warehouse').resolve()
source=root/'bluefolder_listener'/'bluefolder_slack_listener_v2.py'
content=source.read_bytes()
assert hashlib.sha256(content).hexdigest()=='7d5405af384d7d040b471a63d09091ee94410411130bf4a01054d20a45e0e0e0'
tree=ast.parse(content.decode('utf-8-sig'))
version=next(ast.literal_eval(n.value) for n in tree.body if isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='LISTENER_VERSION' for t in n.targets))
assert version=='2026.09.29-bluefolder-link-coverage.1'
spec=importlib.util.spec_from_file_location('link_health_check',root/'warehouse_service_manager.py')
manager=importlib.util.module_from_spec(spec);sys.modules[spec.name]=manager;spec.loader.exec_module(manager)
statuses=manager.all_statuses()
current=next(s for s in statuses if s['key']=='bluefolder_listener')
assert current['running'] and current['healthy'],json.dumps({k:current.get(k) for k in ['key','pid','running','healthy','deployed_version','latest_successful_poll','health_reason']})
assert current.get('deployed_version')==version,json.dumps({k:current.get(k) for k in ['pid','deployed_version','latest_successful_poll']})
now=datetime.now(timezone.utc)
poll=datetime.fromisoformat(current['latest_successful_poll'].replace('Z','+00:00'))
assert 0<=(now-poll).total_seconds()<180,'New listener has no recent successful poll'
state=json.loads((root/'bluefolder_listener'/'bluefolder_slack_state.json').read_text(encoding='utf-8-sig'))
print(json.dumps({'checkedAt':now.isoformat(),'sourceSha256':hashlib.sha256(content).hexdigest(),'version':version,'recordCount':len(state.get('processed_work_order_ids',{})),'services':[{k:s.get(k) for k in ['key','pid','running','healthy','deployed_version','latest_successful_poll']} for s in statuses]}))
`;
const run=cp.spawnSync('ssh',['-o','BatchMode=yes','-o','ConnectTimeout=10','magmo-server','C:/Progra~1/Python314/python.exe -B -c "import sys;exec(sys.stdin.read())"'],{input:code,encoding:'utf8',timeout:30000,maxBuffer:2*1024*1024,windowsHide:true});
assert.equal(run.status,0,run.stderr.slice(-1800));const actual=JSON.parse(run.stdout),listener=actual.services.find(s=>s.key==='bluefolder_listener');
assert.equal(listener.pid,recovery?.newPid||before.newPid);assert(actual.recordCount>=before.recordCountBefore);
for(const s of before.servicesBefore.filter(s=>s.key!=='bluefolder_listener'))assert.equal(actual.services.find(a=>a.key===s.key)?.pid,s.pid,'Unrelated service changed: '+s.key);
assert(Date.parse(listener.latest_successful_poll)>Date.parse(recovery?.checkedAt||before.checkedAt),'Only a pre-deploy heartbeat exists');
const receipt={result:'PASS',...actual,listenerOnlyRestarted:true,checkpointStateReplaced:false,credentialsCopied:false,priorWorkOrderKeysPreserved:before.priorWorkOrderKeysPreserved,publicationReceipt:files[0],...(recovery?{durableLaunchRecoveryReceipt:recoveryFiles.at(-1),survivedSeparateSshSession:true}:{})};
fs.writeFileSync(path.join(__dirname,'listener-live-verification.json'),JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(receipt,null,2));
