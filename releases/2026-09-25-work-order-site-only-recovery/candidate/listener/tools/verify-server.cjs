"use strict";
const cp=require("node:child_process"),fs=require("node:fs"),path=require("node:path");
const receipt=JSON.parse(fs.readFileSync(path.join(__dirname,"listener-deployment-receipt.json"),"utf8"));
const backup=receipt.backupPath.replaceAll("\\","/");
if(!/^C:\/Users\/Owner\/Desktop\/warehouse\/\.warehouse_runtime\/deployments\/work-order-site-only-retry-20260925\/backup-\d{8}T\d{6}Z$/.test(backup))throw Error("Invalid scoped backup receipt");
const remote="C:/Users/Owner/Desktop/warehouse/.warehouse_runtime/deployments/work-order-site-only-retry-20260925";
const r=cp.spawnSync("ssh",["-o","ConnectTimeout=10","magmo-server",`powershell.exe -NoProfile -NonInteractive -ExecutionPolicy Bypass -File ${remote}/verify-listener.ps1 -BackupPath ${backup}`],{encoding:"utf8",timeout:45000,maxBuffer:2*1024*1024});
if(r.error||r.status!==0){console.error(JSON.stringify({error:"server_verification_failed",code:r.error?.code,status:r.status,detail:r.stderr?.slice(-1500)}));process.exitCode=1;}
else{const verified=JSON.parse(r.stdout);fs.writeFileSync(path.join(__dirname,"listener-live-verification.json"),JSON.stringify(verified,null,2)+"\n");console.log(JSON.stringify(verified,null,2));}
