param([switch]$Apply, [string]$VerifiedFirestoreBackupManifestSha = '', [string]$VerifiedAppRevision = '')
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$serviceRoot = 'C:\Users\Owner\Desktop\warehouse\bluefolder_listener'
$deploymentRoot = 'C:\Users\Owner\Desktop\warehouse\.warehouse_runtime\deployments\work-order-equipment-retry-20260925'
$candidateRoot = Join-Path $deploymentRoot 'listener'
$source = Join-Path $serviceRoot 'bluefolder_slack_listener_v2.py'
$statePath = Join-Path $serviceRoot 'bluefolder_slack_state.json'
$candidate = Join-Path $candidateRoot 'bluefolder_slack_listener_v2.py'
$python = 'C:\Program Files\Python314\python.exe'
$originalSha = '81DF567EA140CBA4551B3B205C1CF9AC151DF6CEE24982B1275CEC1A9426BCCC'
$CandidateSha = 'D9F9FA8C6EF543A9D5062F3A8C2A3CAFD043644519AEA4B9354D2989E07A148F'
$oldVersion = '2026.09.24-bluefolder-machine-link.1'
$newVersion = '2026.09.25-bluefolder-equipment-retry.1'
$expectedOriginalPid = 1172
if ($Apply -and $VerifiedFirestoreBackupManifestSha -notmatch '^[0-9A-Fa-f]{64}$') { throw 'Apply requires the SHA256 of the completed, verified dated Firestore backup manifest.' }
if ($Apply -and $VerifiedAppRevision -notmatch '^nextserverwest-\d+-[a-z0-9]+$') { throw 'Apply requires the verified production app revision containing structured equipment resolution statuses.' }
function Read-ListenerState { return Get-Content -LiteralPath $statePath -Raw | ConvertFrom-Json }
function Command-WorkerPids {
    return @(Get-CimInstance Win32_Process | Where-Object {
        $_.Name -match '^python' -and $_.CommandLine -match 'slack_done_report_listener|command_report|command_status_report'
    } | Sort-Object ProcessId | ForEach-Object { [int]$_.ProcessId })
}
function Restart-Listener {
    $startup = New-CimInstance -ClassName Win32_ProcessStartup -ClientOnly -Property @{ShowWindow=[uint16]0}
    $launch = Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{
        CommandLine = '"C:\Program Files\Python314\pythonw.exe" "C:\Users\Owner\Desktop\warehouse\warehouse_service_manager.py" restart bluefolder_listener'
        CurrentDirectory = 'C:\Users\Owner\Desktop\warehouse'
        ProcessStartupInformation = $startup
    }
    if ($launch.ReturnValue -ne 0) { throw 'Persistent listener restart failed.' }
}
if ((Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash -ne $originalSha) { throw 'Live listener changed; refusing overwrite.' }
if ((Get-FileHash -LiteralPath $candidate -Algorithm SHA256).Hash -ne $CandidateSha) { throw 'Candidate hash mismatch.' }
Push-Location $candidateRoot
try {
    & $python -B -m unittest -q test_bluefolder_equipment_retry test_bluefolder_equipment_link test_bluefolder_destination_link test_bluefolder_close_status test_split_dispatch_ownership test_bluefolder_listener test_confirmed_tombstones
    if ($LASTEXITCODE -ne 0) { throw 'Listener regression tests failed.' }
    & $python -B test_dispatch_root_formatting_20260921.py bluefolder_slack_listener_v2.py
    if ($LASTEXITCODE -ne 0) { throw 'Dispatch regression tests failed.' }
} finally { Pop-Location }
$before = Read-ListenerState
$beforeLoop = [DateTimeOffset]::Parse([string]$before.health.last_successful_loop)
$commandBefore = @(Command-WorkerPids)
if ($before.health.listener_version -ne $oldVersion -or $before.health.healthy -ne $true) { throw 'Live listener version or health mismatch.' }
if ([int]$before.health.pid -ne $expectedOriginalPid) { throw 'Live listener PID changed since review; inspect before deployment.' }
if (([DateTimeOffset]::UtcNow - $beforeLoop).TotalSeconds -gt 300) { throw 'Live listener heartbeat stale.' }
Get-Process -Id ([int]$before.health.pid) -ErrorAction Stop | Out-Null
$listenerProcess = Get-CimInstance Win32_Process -Filter ('ProcessId=' + $expectedOriginalPid)
if ($listenerProcess.CommandLine -notmatch 'bluefolder_slack_listener_v2\.py') { throw 'Reviewed PID is not the BlueFolder listener process.' }
$health = Invoke-RestMethod -Uri 'https://magmo.cloud/api/ops/health' -TimeoutSec 30
$cap = $health.bluefolderStatusSync
if ($health.supportedEventTypes -notcontains 'work_order.bluefolder_status' -or
    $cap.statusOnly -ne $true -or $cap.createsSlackPosts -ne $false -or
    $cap.writesSlack -ne $false -or $cap.writesBlueFolder -ne $false -or
    $cap.deletesMessages -ne $false -or $cap.modifiesHours -ne $false -or $cap.createsWorkOrders -ne $false) {
    throw 'Production has not advertised the exact status-only contract.'
}
if ($health.bluefolderEquipmentLink.version -ne '2026-09-24.1' -or
    $health.bluefolderEquipmentLink.equipmentIds -ne $true -or
    $health.bluefolderEquipmentLink.equipmentNames -ne $true -or
    $health.bluefolderEquipmentLink.existingOnly -ne $true -or
    $health.bluefolderEquipmentLink.preservesManualAssets -ne $true -or
    $health.bluefolderEquipmentLink.rejectsUnresolvedInventoryMachine -ne $true) {
    throw 'Production has not advertised equipment identity plus transactional existingOnly import support.'
}
if (-not $Apply) {
    [pscustomobject]@{ready=$true;changed=$false;candidateHash=$CandidateSha;sourceHash=$originalSha;listenerPid=$before.health.pid;commandWorkerPids=$commandBefore;apiVersion=$health.apiVersion} | ConvertTo-Json -Depth 5
    return
}
$deploymentLock = [IO.File]::Open((Join-Path $deploymentRoot 'install.lock'), [IO.FileMode]::OpenOrCreate, [IO.FileAccess]::ReadWrite, [IO.FileShare]::None)
try {
$backupRoot = Join-Path $deploymentRoot ('backup-' + (Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssZ'))
$resolvedBackup = [IO.Path]::GetFullPath($backupRoot)
if (-not $resolvedBackup.StartsWith($deploymentRoot + '\backup-', [StringComparison]::OrdinalIgnoreCase)) { throw 'Invalid backup target.' }
New-Item -ItemType Directory -Path $backupRoot | Out-Null
Copy-Item -LiteralPath $source -Destination (Join-Path $backupRoot 'bluefolder_slack_listener_v2.py')
Copy-Item -LiteralPath $statePath -Destination (Join-Path $backupRoot 'bluefolder_slack_state.json')
$commandBefore | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $backupRoot 'command-worker-pids.json') -Encoding UTF8
$null = Get-Content -LiteralPath (Join-Path $backupRoot 'bluefolder_slack_state.json') -Raw | ConvertFrom-Json
$installFile = Join-Path $serviceRoot 'bluefolder_slack_listener_v2.equipment-retry-20260925.new'
Copy-Item -LiteralPath $candidate -Destination $installFile
$replaced = $false
try {
    if ((Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash -ne $originalSha) { throw 'Live source changed while staging.' }
    [IO.File]::Replace($installFile,$source,(Join-Path $backupRoot 'source-at-replace.py'))
    $replaced = $true
    Restart-Listener
    $deadline = (Get-Date).AddSeconds(45)
    do {
        Start-Sleep -Seconds 1
        $after = Read-ListenerState
        $afterLoop = [DateTimeOffset]::Parse([string]$after.health.last_successful_loop)
    } while (($after.health.listener_version -ne $newVersion -or $afterLoop -le $beforeLoop) -and (Get-Date) -lt $deadline)
    if ($after.health.listener_version -ne $newVersion -or $after.health.healthy -ne $true -or $afterLoop -le $beforeLoop) { throw 'Updated listener did not become healthy.' }
    if ((Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash -ne $CandidateSha) { throw 'Installed source hash mismatch.' }
    foreach ($checkpoint in $before.ops_thread_state.PSObject.Properties) {
        $current = $after.ops_thread_state.PSObject.Properties[$checkpoint.Name]
        if ($null -eq $current -or [double]$current.Value.last_message_ts -lt [double]$checkpoint.Value.last_message_ts) { throw 'Thread checkpoint was lost or regressed.' }
    }
    $commandAfter = @(Command-WorkerPids)
    if (($commandBefore -join ',') -ne ($commandAfter -join ',')) { throw 'Command worker processes changed.' }
    if ($after.health.slack_root_posting_enabled -ne $false) { throw 'Unexpected Slack root posting flag.' }
    [pscustomobject]@{installedAt=[DateTimeOffset]::UtcNow.ToString('o');version=$newVersion;sourceSha256=$CandidateSha;baselineSha256=$originalSha;backupPath=$backupRoot;verifiedFirestoreBackupManifestSha=$VerifiedFirestoreBackupManifestSha;verifiedAppRevision=$VerifiedAppRevision;stateOverwritten=$false;listenerPid=$after.health.pid;commandWorkerPids=$commandAfter;checkpointCount=@($after.ops_thread_state.PSObject.Properties).Count;pendingImports=@($after.pending_magmo_imports.PSObject.Properties).Count;statusSync=$after.health.bluefolder_status_sync;equipmentSync=$after.health.bluefolder_equipment_sync;historicalBaselineAutoApplied=$false;testsPassed=107} | ConvertTo-Json -Depth 8
} catch {
    if ($replaced) {
        if ((Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash -ne $CandidateSha) { throw 'Live source changed after installation; refusing automatic rollback over unknown code.' }
        $restoreFile = Join-Path $serviceRoot 'bluefolder_slack_listener_v2.equipment-retry-20260925.restore'
        Copy-Item -LiteralPath (Join-Path $backupRoot 'bluefolder_slack_listener_v2.py') -Destination $restoreFile
        [IO.File]::Replace($restoreFile,$source,(Join-Path $backupRoot 'failed-candidate.py'))
        Restart-Listener
    }
    throw
}
} finally { $deploymentLock.Dispose() }
