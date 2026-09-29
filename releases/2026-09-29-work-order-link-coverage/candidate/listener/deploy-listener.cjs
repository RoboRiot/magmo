"use strict";
// Scoped live-source replacement. No credentials or checkpoint state are copied off-server.
const fs = require('node:fs'), path = require('node:path'), cp = require('node:child_process');
const crypto = require('node:crypto'), assert = require('node:assert/strict');
const apply = process.argv.includes('--apply');
assert(process.argv.slice(2).every(arg => arg === '--apply'));
const original = fs.readFileSync(path.join(__dirname, 'listener-source.py'));
const candidate = fs.readFileSync(path.join(__dirname, 'listener-candidate.py'));
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const expected = '7f28a4c93327ef111b02c6d068cc86bb4ec0561b55dc06a697bcfc5fcc76c71c';
assert.equal(hash(original), expected);
const candidateHash = hash(candidate);
const code = String.raw`
import ast,base64,hashlib,importlib.util,json,os,subprocess,sys
from pathlib import Path
from datetime import datetime,timezone
APPLY=__APPLY__
EXPECTED='__EXPECTED__'
CANDIDATE_HASH='__CANDIDATE_HASH__'
candidate=base64.b64decode('__CANDIDATE__',validate=True)
root=Path(r'C:\Users\Owner\Desktop\warehouse').resolve()
listener_root=(root/'bluefolder_listener').resolve()
source=(listener_root/'bluefolder_slack_listener_v2.py').resolve()
state_path=(listener_root/'bluefolder_slack_state.json').resolve()
manager_path=(root/'warehouse_service_manager.py').resolve()
assert source.parent==listener_root and listener_root.parent==root
assert hashlib.sha256(candidate).hexdigest()==CANDIDATE_HASH
assert hashlib.sha256(manager_path.read_bytes()).hexdigest()=='da41cddb8693652a369c8ea7422b5f5c61feffa914c358482e2f9e08c6d8665a'
original=source.read_bytes()
assert hashlib.sha256(original).hexdigest()==EXPECTED,'Live source changed; re-review required'
before_ast=ast.parse(original.decode('utf-8-sig'))
after_ast=ast.parse(candidate.decode('utf-8-sig'))
def untouched(tree):
    return [ast.dump(n,include_attributes=False) for n in tree.body
      if not(isinstance(n,ast.FunctionDef) and n.name in {'sync_bluefolder_equipment_updates','equipment_resolution_cache_is_fresh'})
      and not(isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='LISTENER_VERSION' for t in n.targets))]
assert untouched(before_ast)==untouched(after_ast),'Unexpected listener code changes'
compile(after_ast,str(source),'exec')
spec=importlib.util.spec_from_file_location('magmo_link_service_manager',manager_path)
manager=importlib.util.module_from_spec(spec)
sys.modules[spec.name]=manager
spec.loader.exec_module(manager)
def durable_restart():
    # OpenSSH runs in a KILL_ON_JOB_CLOSE job on this host. Detached flags
    # alone do not escape it; launch the manager outside that job explicitly.
    executable=Path(r'C:\Program Files\Python314\pythonw.exe')
    assert executable.exists()
    startup=subprocess.STARTUPINFO()
    startup.dwFlags|=subprocess.STARTF_USESHOWWINDOW
    startup.wShowWindow=subprocess.SW_HIDE
    flags=subprocess.CREATE_BREAKAWAY_FROM_JOB|subprocess.CREATE_NO_WINDOW|subprocess.CREATE_NEW_PROCESS_GROUP|subprocess.DETACHED_PROCESS
    process=subprocess.Popen([str(executable),'-B',str(manager_path),'restart','bluefolder_listener'],cwd=str(root),stdin=subprocess.DEVNULL,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,creationflags=flags,startupinfo=startup)
    assert process.wait(timeout=15)==0,'Durable listener manager restart failed'
    return manager.service_status('bluefolder_listener')
before_status=manager.all_statuses()
service=next(s for s in before_status if s['key']=='bluefolder_listener')
assert service['running'] and service['healthy'],'Listener not healthy; investigate before replacement'
state_bytes=state_path.read_bytes()
state=json.loads(state_bytes.decode('utf-8-sig'))
assert isinstance(state.get('processed_work_order_ids'),dict)
now=datetime.now(timezone.utc)
stamp=now.strftime('%Y%m%dT%H%M%S.%fZ')
receipt={'apply':APPLY,'checkedAt':now.isoformat(),'sourcePath':str(source),
 'beforeSha256':EXPECTED,'candidateSha256':CANDIDATE_HASH,'managerSha256':hashlib.sha256(manager_path.read_bytes()).hexdigest(),
 'priorPid':service['pid'],'recordCountBefore':len(state['processed_work_order_ids']),
 'checkpointStateReplaced':False,'credentialsCopied':False,'otherServicesRestarted':False}
def compact(statuses):
    return [{k:s.get(k) for k in ['key','pid','running','healthy','deployed_version','latest_successful_poll']} for s in statuses]
receipt['servicesBefore']=compact(before_status)
if APPLY:
    backup=(root/'backups'/('work-order-link-coverage-'+stamp)).resolve()
    assert backup.parent==(root/'backups').resolve()
    backup.mkdir(parents=True,exist_ok=False)
    (backup/'bluefolder_slack_listener_v2.py').write_bytes(original)
    (backup/'bluefolder_slack_state.json').write_bytes(state_bytes)
    assert hashlib.sha256((backup/'bluefolder_slack_listener_v2.py').read_bytes()).hexdigest()==EXPECTED
    assert (backup/'bluefolder_slack_state.json').read_bytes()==state_bytes
    receipt['backupDirectory']=str(backup)
    receipt['checkpointBackupSha256']=hashlib.sha256(state_bytes).hexdigest()
    (backup/'before.json').write_text(json.dumps(receipt,indent=2)+'\n',encoding='utf-8')
    temporary=source.with_name(source.name+'.candidate-'+stamp)
    assert temporary.parent==listener_root and not temporary.exists()
    with temporary.open('xb') as stream:
        stream.write(candidate);stream.flush();os.fsync(stream.fileno())
    assert hashlib.sha256(source.read_bytes()).hexdigest()==EXPECTED,'Source changed before replace'
    assert manager.service_status('bluefolder_listener')['pid']==service['pid'],'Service changed before replace'
    os.replace(temporary,source)
    assert hashlib.sha256(source.read_bytes()).hexdigest()==CANDIDATE_HASH
    try:
        started=durable_restart()
        assert started['running'] and started['pid']!=service['pid'],'New listener process did not start'
        receipt['newPid']=started['pid']
        receipt['startupVerified']=True
    except Exception:
        assert hashlib.sha256(source.read_bytes()).hexdigest()==CANDIDATE_HASH,'Concurrent change blocks rollback'
        rollback=source.with_name(source.name+'.rollback-'+stamp)
        with rollback.open('xb') as stream:
            stream.write(original);stream.flush();os.fsync(stream.fileno())
        os.replace(rollback,source)
        restored=durable_restart()
        receipt['rolledBack']=True
        receipt['rollbackRunning']=restored['running']
        (backup/'receipt.json').write_text(json.dumps(receipt,indent=2)+'\n',encoding='utf-8')
        print(json.dumps(receipt));sys.exit(1)
    after_status=manager.all_statuses()
    receipt['servicesAfter']=compact(after_status)
    receipt['unrelatedServicePidsUnchanged']=all(next(s for s in after_status if s['key']==prior['key'])['pid']==prior['pid'] for prior in before_status if prior['key']!='bluefolder_listener')
    after_state=json.loads(state_path.read_text(encoding='utf-8-sig'))
    receipt['priorWorkOrderKeysPreserved']=set(state['processed_work_order_ids']).issubset(after_state.get('processed_work_order_ids',{}))
    receipt['afterSha256']=hashlib.sha256(source.read_bytes()).hexdigest()
    (backup/'receipt.json').write_text(json.dumps(receipt,indent=2)+'\n',encoding='utf-8')
print(json.dumps(receipt))
`.replace('__APPLY__', apply ? 'True' : 'False').replaceAll('__EXPECTED__',expected)
 .replaceAll('__CANDIDATE_HASH__',candidateHash).replace('__CANDIDATE__',candidate.toString('base64'));
const result = cp.spawnSync('ssh', ['-o','BatchMode=yes','-o','ConnectTimeout=10','magmo-server',
 'C:/Progra~1/Python314/python.exe -B -c "import sys;exec(sys.stdin.read())"'],
 { input:code, encoding:'utf8', timeout:45000, maxBuffer:2*1024*1024 });
if (result.error || !result.stdout.trim()) {
  console.error(JSON.stringify({error:'listener_deployment_check_failed',code:result.error?.code,status:result.status,stderr:result.stderr?.slice(-1600)}));
  process.exitCode=1;
} else {
  const receipt=JSON.parse(result.stdout);
  const file=path.join(__dirname, `listener-${apply?'publication':'dry-run'}-${Date.now()}.json`);
  fs.writeFileSync(file,JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});
  console.log(JSON.stringify({receipt:file,...receipt},null,2));
  if(result.status || receipt.rolledBack) process.exitCode=1;
}
