"use strict";
// Run only after root GO, verified app guard deployment, and a completed backup.
const cp=require("node:child_process"),fs=require("node:fs"),path=require("node:path"),crypto=require("node:crypto"),assert=require("node:assert/strict");
const {request}=require("../ops-reliability-20260922/cloud.cjs");
const [, , action, appRevision, expectedManifestSha]=process.argv;
if(action!=="--apply" || !/^nextserverwest-\d+-[a-z0-9]+$/.test(appRevision||"") || !/^[0-9a-f]{64}$/i.test(expectedManifestSha||"")) throw Error("Usage after root GO: node deploy-listener.cjs --apply <verified-app-revision> <verified-manifest-sha256>");
(async()=>{
 const manifestPath=path.resolve(__dirname,"../../outputs/firestore-backups/2026-09-25-site-only-recovery-predeploy/manifest.json");
 const bytes=fs.readFileSync(manifestPath),manifest=JSON.parse(bytes);
 assert.equal(manifest.status,"complete");assert.equal(manifest.verification?.checksumRecomputed,true);assert.equal(manifest.verification?.documentCountRecounted,true);
 const sha=crypto.createHash("sha256").update(bytes).digest("hex");assert.equal(sha,expectedManifestSha.toLowerCase(),"Backup manifest changed since review");
 const fn=await request("https://cloudfunctions.googleapis.com/v2/projects/magmo-ac10c/locations/us-west2/functions/nextServerWest");
 assert.equal(fn.state,"ACTIVE");assert.equal(fn.serviceConfig.revision,appRevision,"Reviewed application revision is no longer active");
 const remote="C:/Users/Owner/Desktop/warehouse/.warehouse_runtime/deployments/work-order-site-only-retry-20260925";
 const result=cp.spawnSync("ssh",["-o","ConnectTimeout=10","magmo-server",`powershell.exe -NoProfile -NonInteractive -ExecutionPolicy Bypass -File ${remote}/install-listener.ps1 -Apply -VerifiedFirestoreBackupManifestSha ${sha} -VerifiedAppRevision ${appRevision}`],{encoding:"utf8",timeout:120000,maxBuffer:2*1024*1024});
 fs.writeFileSync(path.join(__dirname,"listener-deployment-output.txt"),result.stdout||"");fs.writeFileSync(path.join(__dirname,"listener-deployment-tests.txt"),result.stderr||"");
 if(result.error||result.status!==0)throw Error("Listener install failed; inspect before retry. "+(result.stderr||result.error?.code).slice(-1200));
 const receipt=JSON.parse(result.stdout);fs.writeFileSync(path.join(__dirname,"listener-deployment-receipt.json"),JSON.stringify(receipt,null,2)+"\n");console.log(JSON.stringify(receipt,null,2));
})().catch(error=>{console.error(JSON.stringify({error:error.message}));process.exitCode=1;});
