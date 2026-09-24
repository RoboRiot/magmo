param([string]$BackupPath='')
$CandidateSha='81DF567EA140CBA4551B3B205C1CF9AC151DF6CEE24982B1275CEC1A9426BCCC'
$ErrorActionPreference='Stop'
$ProgressPreference='SilentlyContinue'
$serviceRoot='C:\Users\Owner\Desktop\warehouse\bluefolder_listener'
$deploymentRoot='C:\Users\Owner\Desktop\warehouse\.warehouse_runtime\deployments\work-order-machine-link-20260924'
$source=Join-Path $serviceRoot 'bluefolder_slack_listener_v2.py'
$state=Get-Content -LiteralPath (Join-Path $serviceRoot 'bluefolder_slack_state.json') -Raw | ConvertFrom-Json
$now=[DateTimeOffset]::UtcNow
$loop=[DateTimeOffset]::Parse([string]$state.health.last_successful_loop)
$poll=[DateTimeOffset]::Parse([string]$state.health.latest_successful_bluefolder_poll)
$missing=@()
$regressed=@()
$workersSame=$true
$workers=@(Get-CimInstance Win32_Process | Where-Object {$_.Name -match '^python' -and $_.CommandLine -match 'slack_done_report_listener|command_report|command_status_report'} | Sort-Object ProcessId | ForEach-Object {[int]$_.ProcessId})
if ($BackupPath) {
    $resolved=[IO.Path]::GetFullPath($BackupPath)
    if (-not $resolved.StartsWith($deploymentRoot+'\backup-',[StringComparison]::OrdinalIgnoreCase)) { throw 'Backup path outside scoped deployment.' }
    $before=Get-Content -LiteralPath (Join-Path $resolved 'bluefolder_slack_state.json') -Raw | ConvertFrom-Json
    foreach ($checkpoint in $before.ops_thread_state.PSObject.Properties) {
        $current=$state.ops_thread_state.PSObject.Properties[$checkpoint.Name]
        if ($null -eq $current) { $missing += $checkpoint.Name }
        elseif ([double]$current.Value.last_message_ts -lt [double]$checkpoint.Value.last_message_ts) { $regressed += $checkpoint.Name }
    }
    # Windows PowerShell 5.1 emits a parsed JSON array as one pipeline object.
    # Flatten it explicitly before joining so [18088,19252] is not compared as
    # the single string "System.Object[]" against the live integer sequence.
    $parsedWorkers=Get-Content -LiteralPath (Join-Path $resolved 'command-worker-pids.json') -Raw | ConvertFrom-Json
    $beforeWorkers=@($parsedWorkers | ForEach-Object {[int]$_} | Sort-Object)
    $workersSame=($workers -join ',') -eq ($beforeWorkers -join ',')
}
$checks=[ordered]@{
    sourceHash=((Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash -eq $CandidateSha)
    version=($state.health.listener_version -eq '2026.09.24-bluefolder-machine-link.1')
    healthy=($state.health.healthy -eq $true)
    heartbeatFresh=(($now-$loop).TotalSeconds -lt 300)
    bluefolderPollFresh=(($now-$poll).TotalSeconds -lt 300)
    slackPostingDisabled=($state.health.slack_root_posting_enabled -eq $false)
    statusCapability=($state.health.bluefolder_status_sync.capability_available -eq $true)
    statusOnly=($state.health.bluefolder_status_sync.status_only -eq $true)
    historicalBaselinePresent=([bool]$state.bluefolder_close_sync.started_at)
    checkpointsPreserved=($missing.Count -eq 0 -and $regressed.Count -eq 0)
    commandWorkersUnchanged=$workersSame
}
$acknowledgedCount=0
if ($null -ne $state.bluefolder_close_sync.acknowledged) { $acknowledgedCount=@($state.bluefolder_close_sync.acknowledged.PSObject.Properties).Count }
$failed=@($checks.Keys | Where-Object {-not $checks[$_]})
if ($failed.Count) { throw ('Verification failed: '+($failed -join ', ')) }
$equipmentSynced=@($state.processed_work_order_ids.PSObject.Properties | Where-Object {$_.Value.bluefolder_equipment_synced_fingerprint}).Count
$equipmentPending=0
if ($null -ne $state.bluefolder_equipment_sync_pending) { $equipmentPending=@($state.bluefolder_equipment_sync_pending.PSObject.Properties).Count }
[pscustomobject]@{verified=$true;readOnly=$true;checkedAt=$now.ToString('o');checks=$checks;sourceSha256=$CandidateSha;listenerPid=$state.health.pid;version=$state.health.listener_version;commandWorkerPids=$workers;lastSuccessfulLoop=$state.health.last_successful_loop;lastSuccessfulBluefolderPoll=$state.health.latest_successful_bluefolder_poll;pendingImports=@($state.pending_magmo_imports.PSObject.Properties).Count;checkpointCount=@($state.ops_thread_state.PSObject.Properties).Count;statusSync=$state.health.bluefolder_status_sync;observedCount=@($state.bluefolder_close_sync.observations.PSObject.Properties).Count;historicalReviewCount=@($state.bluefolder_close_sync.historical_review.PSObject.Properties).Count;acknowledgedCount=$acknowledgedCount;equipmentSyncedCount=$equipmentSynced;equipmentPendingCount=$equipmentPending} | ConvertTo-Json -Depth 8
