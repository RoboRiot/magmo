param([Parameter(Mandatory=$true)][string]$BackupPath,[switch]$Apply)
$ErrorActionPreference='Stop'
$ProgressPreference='SilentlyContinue'
$serviceRoot='C:\Users\Owner\Desktop\warehouse\bluefolder_listener'
$deploymentRoot='C:\Users\Owner\Desktop\warehouse\.warehouse_runtime\deployments\work-order-equipment-retry-20260925'
$source=Join-Path $serviceRoot 'bluefolder_slack_listener_v2.py'
$statePath=Join-Path $serviceRoot 'bluefolder_slack_state.json'
$baselineSha='81DF567EA140CBA4551B3B205C1CF9AC151DF6CEE24982B1275CEC1A9426BCCC'
$candidateSha='D9F9FA8C6EF543A9D5062F3A8C2A3CAFD043644519AEA4B9354D2989E07A148F'
$resolved=[IO.Path]::GetFullPath($BackupPath)
if (-not $resolved.StartsWith($deploymentRoot+'\backup-',[StringComparison]::OrdinalIgnoreCase)) { throw 'Backup path is outside this deployment.' }
$backupSource=Join-Path $resolved 'bluefolder_slack_listener_v2.py'
if ((Get-FileHash -LiteralPath $backupSource -Algorithm SHA256).Hash -ne $baselineSha) { throw 'Rollback source hash mismatch.' }
if ((Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash -ne $candidateSha) { throw 'Live source is not this candidate; refusing to overwrite another build.' }
$before=Get-Content -LiteralPath $statePath -Raw | ConvertFrom-Json
$beforeLoop=[DateTimeOffset]::Parse([string]$before.health.last_successful_loop)
$workersBefore=@(Get-CimInstance Win32_Process | Where-Object {$_.Name -match '^python' -and $_.CommandLine -match 'slack_done_report_listener|command_report|command_status_report'} | Sort-Object ProcessId | ForEach-Object {[int]$_.ProcessId})
if (-not $Apply) {
    [pscustomobject]@{ready=$true;changed=$false;rollbackSourceSha256=$baselineSha;liveSourceSha256=$candidateSha;stateWillBeRestored=$false;databaseWillBeChanged=$false} | ConvertTo-Json
    return
}
$restoreFile=Join-Path $serviceRoot 'bluefolder_slack_listener_v2.equipment-retry-20260925.rollback'
$savedCandidate=Join-Path $resolved ('rolled-back-candidate-'+[DateTimeOffset]::UtcNow.ToString('yyyyMMddTHHmmssZ')+'.py')
Copy-Item -LiteralPath $backupSource -Destination $restoreFile
if ((Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash -ne $candidateSha) { throw 'Live source changed during rollback staging.' }
[IO.File]::Replace($restoreFile,$source,$savedCandidate)
$startup=New-CimInstance -ClassName Win32_ProcessStartup -ClientOnly -Property @{ShowWindow=[uint16]0}
$launch=Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{
    CommandLine='"C:\Program Files\Python314\pythonw.exe" "C:\Users\Owner\Desktop\warehouse\warehouse_service_manager.py" restart bluefolder_listener'
    CurrentDirectory='C:\Users\Owner\Desktop\warehouse'
    ProcessStartupInformation=$startup
}
if ($launch.ReturnValue -ne 0) { throw 'Rollback source restored, but persistent listener restart failed.' }
$deadline=(Get-Date).AddSeconds(45)
do {
    Start-Sleep -Seconds 1
    $after=Get-Content -LiteralPath $statePath -Raw | ConvertFrom-Json
    $afterLoop=[DateTimeOffset]::Parse([string]$after.health.last_successful_loop)
} while (($after.health.listener_version -ne '2026.09.24-bluefolder-machine-link.1' -or $afterLoop -le $beforeLoop) -and (Get-Date) -lt $deadline)
if ($after.health.listener_version -ne '2026.09.24-bluefolder-machine-link.1' -or $after.health.healthy -ne $true -or $afterLoop -le $beforeLoop) { throw 'Rollback listener did not become healthy within verification window.' }
foreach ($checkpoint in $before.ops_thread_state.PSObject.Properties) {
    $current=$after.ops_thread_state.PSObject.Properties[$checkpoint.Name]
    if ($null -eq $current -or [double]$current.Value.last_message_ts -lt [double]$checkpoint.Value.last_message_ts) { throw 'Thread checkpoint was lost or regressed during rollback.' }
}
$workersAfter=@(Get-CimInstance Win32_Process | Where-Object {$_.Name -match '^python' -and $_.CommandLine -match 'slack_done_report_listener|command_report|command_status_report'} | Sort-Object ProcessId | ForEach-Object {[int]$_.ProcessId})
if (($workersBefore -join ',') -ne ($workersAfter -join ',')) { throw 'Unrelated command worker process set changed.' }
[pscustomobject]@{rolledBack=$true;changed=$true;checkedAt=[DateTimeOffset]::UtcNow.ToString('o');sourceSha256=(Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash;listenerVersion=$after.health.listener_version;listenerPid=$after.health.pid;stateRestored=$false;databaseChanged=$false;commandWorkerPids=$workersAfter} | ConvertTo-Json -Depth 5
