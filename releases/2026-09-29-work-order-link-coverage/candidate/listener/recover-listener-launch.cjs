"use strict";
// Launch only the already-deployed listener manager outside the verified SSH
// KILL_ON_JOB_CLOSE job. No source/checkpoint/config edits and no other restart.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const apply=process.argv.includes('--apply');assert(process.argv.slice(2).every(a=>a==='--apply'));
const code=String.raw`
import hashlib,importlib.util,json,subprocess,sys
from pathlib import Path
from datetime import datetime,timezone
root=Path(r'C:\Users\Owner\Desktop\warehouse').resolve()
manager_path=root/'warehouse_service_manager.py'
source=root/'bluefolder_listener'/'bluefolder_slack_listener_v2.py'
pythonw=Path(r'C:\Program Files\Python314\pythonw.exe')
assert pythonw.exists()
assert hashlib.sha256(manager_path.read_bytes()).hexdigest()=='da41cddb8693652a369c8ea7422b5f5c61feffa914c358482e2f9e08c6d8665a'
assert hashlib.sha256(source.read_bytes()).hexdigest()=='7d5405af384d7d040b471a63d09091ee94410411130bf4a01054d20a45e0e0e0'
spec=importlib.util.spec_from_file_location('link_launch_recovery',manager_path)
manager=importlib.util.module_from_spec(spec);sys.modules[spec.name]=manager;spec.loader.exec_module(manager)
before=manager.all_statuses()
listener=next(s for s in before if s['key']=='bluefolder_listener')
assert not listener['running'],'Listener already running; do not launch another'
receipt={'apply':__APPLY__,'checkedAt':datetime.now(timezone.utc).isoformat(),'sourceChanged':False,'checkpointStateReplaced':False,'otherServicesRestarted':False,'launchMethod':'CREATE_BREAKAWAY_FROM_JOB hidden pythonw manager start bluefolder_listener'}
def compact(rows):return [{k:s.get(k) for k in ['key','pid','running','healthy','deployed_version','latest_successful_poll']} for s in rows]
receipt['servicesBefore']=compact(before)
if __APPLY__:
    info=subprocess.STARTUPINFO();info.dwFlags|=subprocess.STARTF_USESHOWWINDOW;info.wShowWindow=subprocess.SW_HIDE
    flags=subprocess.CREATE_BREAKAWAY_FROM_JOB|subprocess.CREATE_NO_WINDOW|subprocess.CREATE_NEW_PROCESS_GROUP|subprocess.DETACHED_PROCESS
    proc=subprocess.Popen([str(pythonw),'-B',str(manager_path),'start','bluefolder_listener'],cwd=str(root),stdin=subprocess.DEVNULL,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,creationflags=flags,startupinfo=info)
    receipt['managerLauncherPid']=proc.pid
    receipt['managerExitCode']=proc.wait(timeout=15)
    assert receipt['managerExitCode']==0,'Detached manager start failed'
    after=manager.all_statuses();new=next(s for s in after if s['key']=='bluefolder_listener')
    receipt['servicesAfter']=compact(after)
    assert new['running'],'No running listener after detached manager start'
    receipt['newPid']=new['pid']
    for prior in before:
        if prior['key']!='bluefolder_listener':assert next(s for s in after if s['key']==prior['key'])['pid']==prior['pid'],'Other service PID changed'
print(json.dumps(receipt))
`.replaceAll('__APPLY__',apply?'True':'False');
const result=cp.spawnSync('ssh',['-o','BatchMode=yes','-o','ConnectTimeout=10','magmo-server','C:/Progra~1/Python314/python.exe -B -c "import sys;exec(sys.stdin.read())"'],{input:code,encoding:'utf8',timeout:30000,maxBuffer:2*1024*1024,windowsHide:true});
assert.equal(result.status,0,result.stderr.slice(-2000));const receipt=JSON.parse(result.stdout);
const name=`listener-launch-${apply?'recovery':'dry-run'}-${Date.now()}.json`;fs.writeFileSync(path.join(__dirname,name),JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({receipt:name,...receipt},null,2));
