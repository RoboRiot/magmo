param(
  [ValidateSet('Inspect','Stage','VerifyStage','Apply','Verify','Rollback')][string]$Mode = 'Inspect',
  [string]$ApprovedManifestSha256 = ''
)
$ErrorActionPreference = 'Stop'
$warehouseRoot = [IO.Path]::GetFullPath('C:\Users\Owner\Desktop\warehouse')
$releaseRoot = Join-Path $warehouseRoot 'maintenance_staging\20261005-tool-label'
$incomingRoot = Join-Path $releaseRoot 'candidate'
$stageRoot = Join-Path $releaseRoot 'runtime-stage'
$backupRoot = Join-Path $warehouseRoot 'maintenance_backups\20261005T160908-pre-tool-label'
$manifestPath = Join-Path $incomingRoot 'manifest.json'
$journalPath = Join-Path $releaseRoot 'deployment-journal.json'
$receiptPath = Join-Path $releaseRoot 'staged-test-receipt.json'
$pythonExe = 'C:\Program Files\Python314\python.exe'
$pythonWindowlessExe = 'C:\Program Files\Python314\pythonw.exe'
$manager = Join-Path $warehouseRoot 'warehouse_service_manager.py'
$privateConfig = Join-Path $env:LOCALAPPDATA 'Magmo\warehouse_scanner_private.json'
$environmentFile = Join-Path $warehouseRoot '.env'
$printerName = 'ZDesigner ZD621-203dpi ZPL'

function Assert-Contained([string]$Child,[string]$Parent) {
  $resolvedChild = [IO.Path]::GetFullPath($Child)
  $resolvedParent = [IO.Path]::GetFullPath($Parent).TrimEnd('\') + '\'
  if (-not $resolvedChild.StartsWith($resolvedParent,[StringComparison]::OrdinalIgnoreCase)) { throw 'Path escaped approved directory.' }
}
function Hash([string]$Path) { return (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash.ToLowerInvariant() }
function Assert-Hash([string]$Path,[string]$Expected) {
  if (-not (Test-Path -LiteralPath $Path -PathType Leaf) -or (Hash $Path) -ne $Expected.ToLowerInvariant()) { throw ('Hash precondition failed: ' + $Path) }
}
function Copy-Verified([string]$Source,[string]$Destination) {
  New-Item -ItemType Directory -Path ([IO.Path]::GetDirectoryName($Destination)) -Force | Out-Null
  Copy-Item -LiteralPath $Source -Destination $Destination -Force
  Assert-Hash $Destination (Hash $Source)
}
function Invoke-Manager([string]$Action,[string]$Service) {
  & $pythonExe $manager $Action $Service
  if ($LASTEXITCODE -ne 0) { throw "Service manager failed: $Action $Service" }
}
function Test-PrintRuntimeStopped {
  $state = Get-Content -LiteralPath (Join-Path $warehouseRoot '.warehouse_runtime\processes.json') -Raw | ConvertFrom-Json
  $servicePid = [int]$state.services.bluefolder_print.pid
  $process = if ($servicePid -gt 0) { Get-CimInstance Win32_Process -Filter ("ProcessId = " + $servicePid) -ErrorAction SilentlyContinue } else { $null }
  $listener = Get-NetTCPConnection -State Listen -LocalPort 5000 -ErrorAction SilentlyContinue
  return (-not $process -and -not $listener)
}
function Start-Interactive([string]$Service) {
  $consoleUser = [string](Get-CimInstance Win32_ComputerSystem).UserName
  $console = Get-Process -Name explorer -ErrorAction SilentlyContinue | Where-Object {$_.SessionId -gt 0} | Select-Object -First 1
  if (-not $consoleUser -or -not $console) { throw 'An interactive warehouse session is required.' }
  $taskName = 'MagmoRemoteStart-tool-label-' + [Guid]::NewGuid().ToString('N')
  if (-not (Test-Path -LiteralPath $pythonWindowlessExe -PathType Leaf)) { throw 'Windowless Python launcher is required for maintenance startup.' }
  $action = New-ScheduledTaskAction -Execute $pythonWindowlessExe -Argument ('"' + $manager + '" start ' + $Service) -WorkingDirectory $warehouseRoot
  $principal = New-ScheduledTaskPrincipal -UserId $consoleUser -LogonType Interactive -RunLevel Limited
  $settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit (New-TimeSpan -Minutes 5) -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
  Register-ScheduledTask -TaskName $taskName -Action $action -Principal $principal -Settings $settings | Out-Null
  try {
    Start-ScheduledTask -TaskName $taskName
    $deadline = [DateTime]::UtcNow.AddSeconds(30)
    do {
      Start-Sleep -Milliseconds 400
      $state = Get-Content -LiteralPath (Join-Path $warehouseRoot '.warehouse_runtime\processes.json') -Raw | ConvertFrom-Json
      $servicePid = [int]$state.services.$Service.pid
      $process = Get-CimInstance Win32_Process -Filter ("ProcessId = " + $servicePid) -ErrorAction SilentlyContinue
      $ready = $process -and [int]$process.SessionId -eq [int]$console.SessionId
      if ($ready -and $Service -eq 'bluefolder_print') {
        $ready = [bool](Get-NetTCPConnection -State Listen -LocalPort 5000 -ErrorAction SilentlyContinue | Where-Object {$_.OwningProcess -eq $servicePid})
      }
    } while (-not $ready -and [DateTime]::UtcNow -lt $deadline)
    if (-not $ready) { throw "$Service failed interactive startup." }
  } finally { Unregister-ScheduledTask -TaskName $taskName -Confirm:$false }
}
function Status([string]$Url,[string]$Method='GET',[hashtable]$Headers=@{}) {
  try {
    $parameters = @{Uri=$Url;Method=$Method;Headers=$Headers;TimeoutSec=15;UseBasicParsing=$true;DisableKeepAlive=$true}
    if ($Method -eq 'POST') { $parameters.ContentType='application/json';$parameters.Body='{}' }
    return [int](Invoke-WebRequest @parameters).StatusCode
  } catch {
    if ($_.Exception.Response -and $_.Exception.Response.StatusCode) { return [int]$_.Exception.Response.StatusCode }
    throw
  }
}
function Assert-Idle {
  # A fresh, never-started session cannot own another capture. The existing
  # drain API returns stale_stop/409 if *any* capture is active; it never drains
  # or cancels that other capture. With no capture it reports pending=0.
  $privateDocument = Get-Content -LiteralPath $privateConfig -Raw | ConvertFrom-Json
  $headers = @{Authorization=('Bearer ' + [string]$privateDocument.bridgeToken)}
  $privateDocument = $null
  $probeId = 'maintenance_probe_' + [Guid]::NewGuid().ToString('N')
  $body = @{schemaVersion=1;sessionId=$probeId;unitId='B99999';reason='cancelled'} | ConvertTo-Json -Compress
  try {
    $response = Invoke-WebRequest -UseBasicParsing -DisableKeepAlive -Uri 'http://127.0.0.1:5000/storage-scan/drain' -Method POST -Headers $headers -ContentType 'application/json' -Body $body -TimeoutSec 10
    $result = $response.Content | ConvertFrom-Json
    if (-not $result.alreadyStopped -or -not $result.drained -or [int]$result.pendingEventCount -ne 0) { throw 'Scanner is active or cannot prove drained.' }
  } catch { throw 'Scanner idle check failed. Do not interrupt an active capture; retry after clerks finish.' }
  finally { $headers.Authorization=$null;$headers=$null }
  if (@(Get-PrintJob -PrinterName $printerName -ErrorAction Stop).Count -ne 0) { throw 'Printer has queued jobs. Retry when the queue is empty.' }
}
function Assert-Protected($BackupManifest) {
  foreach ($property in $manifest.preserve.PSObject.Properties) { Assert-Hash (Join-Path $warehouseRoot $property.Name) ([string]$property.Value) }
  if ($BackupManifest) {
    Assert-Hash $privateConfig ([string]$BackupManifest.privateConfigHash)
    Assert-Hash $environmentFile ([string]$BackupManifest.environmentHash)
  }
}
function Verify-Runtime {
  $state = Get-Content -LiteralPath (Join-Path $warehouseRoot '.warehouse_runtime\processes.json') -Raw | ConvertFrom-Json
  $servicePid=[int]$state.services.bluefolder_print.pid
  $process=Get-CimInstance Win32_Process -Filter ("ProcessId = " + $servicePid)
  if ([int]$process.SessionId -le 0 -or -not(Get-NetTCPConnection -LocalPort 5000 -State Listen | Where-Object {$_.OwningProcess -eq $servicePid})) { throw 'Scanner runtime ownership/session mismatch.' }
  if ((Status 'http://127.0.0.1:5000/api/magmonitor/healthz') -ne 200) { throw 'Health check failed.' }
  foreach ($route in @('/storage-scan/start','/storage-scan/drain','/storage-scan/stop','/work-order-scan/start','/work-order-scan/drain','/work-order-scan/stop','/print-storage-label','/print-tool-label')) {
    if ((Status ('http://127.0.0.1:5000'+$route) 'POST') -ne 401) { throw ('Authorization guard failed: '+$route) }
  }
  foreach ($route in @('/print-label','/print_multi','/bluefolder')) { if ((Status ('http://127.0.0.1:5000'+$route) 'POST') -ne 400) { throw ('Legacy validation failed: '+$route) } }
  $privateDocument=Get-Content -LiteralPath $privateConfig -Raw | ConvertFrom-Json
  $headers=@{Authorization=('Bearer '+[string]$privateDocument.bridgeToken)};$privateDocument=$null
  try { if ((Status 'http://127.0.0.1:5000/print-tool-label' 'POST' $headers) -ne 400) { throw 'Authenticated tool print validation failed.' } }
  finally { $headers.Authorization=$null;$headers=$null }
  Assert-Idle
}

Assert-Contained $releaseRoot (Join-Path $warehouseRoot 'maintenance_staging')
Assert-Contained $stageRoot $releaseRoot
Assert-Contained $backupRoot (Join-Path $warehouseRoot 'maintenance_backups')
$manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
$manifestHash = Hash $manifestPath
if ($manifest.remoteRoot -ne $warehouseRoot) { throw 'Wrong server workspace.' }
foreach ($property in $manifest.files.PSObject.Properties) {
  $file=Join-Path $incomingRoot $property.Name; Assert-Contained $file $incomingRoot; Assert-Hash $file ([string]$property.Value)
}
Assert-Protected $null

if ($Mode -in @('Inspect','Stage','VerifyStage','Apply')) {
  foreach ($property in $manifest.before.PSObject.Properties) { Assert-Hash (Join-Path $warehouseRoot $property.Name) ([string]$property.Value) }
  if (Test-Path -LiteralPath (Join-Path $warehouseRoot 'scanner-server\warehouse_scanner\tool_label_print.py')) { throw 'Unexpected existing tool-label module; do not overwrite.' }
}
if ($Mode -eq 'Inspect') {
  Assert-Idle
  [pscustomobject]@{ok=$true;mode=$Mode;manifestSha256=$manifestHash;runtimeFiles=$manifest.runtimeFiles;preservedStorageFormat=$true;printerQueue=0} | ConvertTo-Json -Depth 4
  exit
}
if ($Mode -in @('Stage','VerifyStage')) {
 if ($Mode -eq 'Stage') {
  if (Test-Path -LiteralPath $backupRoot) { throw 'Dated backup already exists; inspect and do not overwrite it.' }
  New-Item -ItemType Directory -Path $backupRoot | Out-Null
  foreach ($property in $manifest.before.PSObject.Properties) { Copy-Verified (Join-Path $warehouseRoot $property.Name) (Join-Path $backupRoot $property.Name) }
  $backupManifest=@{createdAt=[DateTime]::UtcNow.ToString('o');candidateManifestSha256=$manifestHash;before=$manifest.before;privateConfigHash=(Hash $privateConfig);environmentHash=(Hash $environmentFile)}
  $backupManifest | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $backupRoot 'manifest.json') -Encoding UTF8
  if (Test-Path -LiteralPath $stageRoot) { throw 'Runtime stage already exists; do not overwrite.' }
  New-Item -ItemType Directory -Path $stageRoot | Out-Null
  # Source only. No dotenv, private JSON, credential, binary or log is copied.
  foreach ($directory in @('label_server','scanner-server\warehouse_scanner','scanner-server\tests')) {
    $sourceRoot=Join-Path $warehouseRoot $directory
    foreach ($file in Get-ChildItem -LiteralPath $sourceRoot -File -Filter '*.py' -Recurse) {
      $relative=$file.FullName.Substring($warehouseRoot.Length+1)
      Copy-Verified $file.FullName (Join-Path $stageRoot $relative)
    }
  }
  foreach ($file in Get-ChildItem -LiteralPath $warehouseRoot -File -Filter '*.py') { Copy-Verified $file.FullName (Join-Path $stageRoot $file.Name) }
  foreach ($property in $manifest.files.PSObject.Properties) { Copy-Verified (Join-Path $incomingRoot $property.Name) (Join-Path $stageRoot $property.Name) }
 } else {
  $backupManifest=Get-Content -LiteralPath (Join-Path $backupRoot 'manifest.json') -Raw | ConvertFrom-Json
  if ($backupManifest.candidateManifestSha256 -ne $manifestHash) { throw 'Staged backup does not match candidate.' }
  foreach ($property in $manifest.before.PSObject.Properties) { Assert-Hash (Join-Path $backupRoot $property.Name) ([string]$property.Value) }
  foreach ($property in $manifest.files.PSObject.Properties) { Assert-Hash (Join-Path $stageRoot $property.Name) ([string]$property.Value) }
 }
  foreach ($file in Get-ChildItem -LiteralPath (Join-Path $warehouseRoot 'scanner-server') -File -Filter '*.py') { Copy-Verified $file.FullName (Join-Path $stageRoot ('scanner-server\'+$file.Name)) }
  Push-Location $stageRoot
  try {
    & $pythonExe -m unittest label_server.test_magmonitor_proxy label_server.test_storage_scan_bridge
    if ($LASTEXITCODE -ne 0) { throw 'Isolated combined-server tests failed.' }
    & $pythonExe -m unittest discover -s 'scanner-server\tests'
    if ($LASTEXITCODE -ne 0) { throw 'Isolated scanner/tool-label tests failed.' }
  } finally { Pop-Location }
  Assert-Protected ([pscustomobject]$backupManifest)
  @{passed=$true;manifestSha256=$manifestHash;verifiedAt=[DateTime]::UtcNow.ToString('o');runtimeFiles=$manifest.runtimeFiles} | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $receiptPath -Encoding UTF8
  [pscustomobject]@{ok=$true;mode=$Mode;backupRoot=$backupRoot;manifestSha256=$manifestHash;productionUnchanged=$true} | ConvertTo-Json
  exit
}

$backupManifest=Get-Content -LiteralPath (Join-Path $backupRoot 'manifest.json') -Raw | ConvertFrom-Json
Assert-Protected $backupManifest
foreach ($property in $manifest.before.PSObject.Properties) { Assert-Hash (Join-Path $backupRoot $property.Name) ([string]$property.Value) }
if ($Mode -eq 'Verify') {
  foreach ($relative in $manifest.runtimeFiles) { Assert-Hash (Join-Path $warehouseRoot $relative) ([string]$manifest.files.$relative) }
  Verify-Runtime
  $tunnels=Invoke-RestMethod -Uri 'http://127.0.0.1:4040/api/tunnels' -TimeoutSec 10
  $publicUrl=[string]($tunnels.tunnels | Where-Object {$_.public_url -like 'https://*'} | Select-Object -First 1).public_url
  if (-not $publicUrl -or (Status ($publicUrl.TrimEnd('/')+'/api/magmonitor/healthz')) -ne 200) { throw 'Public tunnel health check failed.' }
  if ((Status ($publicUrl.TrimEnd('/')+'/print-tool-label') 'POST') -ne 401) { throw 'Public tool-label authentication check failed.' }
  [pscustomobject]@{ok=$true;mode=$Mode;manifestSha256=$manifestHash;printerQueue=0;publicToolAuthStatus=401;publicHealthStatus=200;privateConfigurationUnchanged=$true} | ConvertTo-Json
  exit
}
if ($ApprovedManifestSha256.ToLowerInvariant() -ne $manifestHash) { throw 'Apply or rollback requires exact independently approved manifest hash.' }
if ($Mode -eq 'Apply') {
  if (Test-Path -LiteralPath $journalPath) { throw 'Deployment journal exists. Inspect before any retry.' }
  $receipt=Get-Content -LiteralPath $receiptPath -Raw | ConvertFrom-Json
  if (-not $receipt.passed -or $receipt.manifestSha256 -ne $manifestHash) { throw 'Candidate-specific staged tests missing.' }
  foreach ($relative in $manifest.runtimeFiles) { Assert-Hash (Join-Path $stageRoot $relative) ([string]$manifest.files.$relative) }
} else {
  foreach ($relative in $manifest.runtimeFiles) { Assert-Hash (Join-Path $warehouseRoot $relative) ([string]$manifest.files.$relative) }
}
Assert-Idle
$tunnelStopped=$false;$runtimeStopped=$false;$filesChanged=$false
try {
  $tunnelStopped=$true;Invoke-Manager 'stop' 'ngrok'
  Assert-Idle
  Start-Sleep -Seconds 2
  if (@(Get-NetTCPConnection -State Established -LocalPort 5000 -ErrorAction SilentlyContinue).Count -ne 0) { throw 'Requests are still in flight; cutover aborted.' }
  Assert-Idle
  if ($Mode -eq 'Apply') {
    @{state='cutover-started';manifestSha256=$manifestHash;startedAt=[DateTime]::UtcNow.ToString('o')} | ConvertTo-Json | Set-Content -LiteralPath $journalPath -Encoding UTF8
  }
  $runtimeStopped=$true;Invoke-Manager 'stop' 'bluefolder_print'
  if (-not (Test-PrintRuntimeStopped)) { throw 'Printer runtime has not fully stopped; no active source will be overwritten.' }
  if ($Mode -eq 'Apply') {
    foreach ($relative in $manifest.runtimeFiles) { Copy-Verified (Join-Path $stageRoot $relative) (Join-Path $warehouseRoot $relative) }
  } else {
    foreach ($property in $manifest.before.PSObject.Properties) { Copy-Verified (Join-Path $backupRoot $property.Name) (Join-Path $warehouseRoot $property.Name) }
    # Preserve the newly added module as recovery evidence, without deleting it.
    Move-Item -LiteralPath (Join-Path $warehouseRoot 'scanner-server\warehouse_scanner\tool_label_print.py') -Destination (Join-Path $backupRoot 'tool_label_print.rolled-back.py')
  }
  $filesChanged=$true
  Start-Interactive 'bluefolder_print';$runtimeStopped=$false
  if ($Mode -eq 'Apply') { Verify-Runtime }
  elseif ((Status 'http://127.0.0.1:5000/api/magmonitor/healthz') -ne 200) { throw 'Rollback runtime health check failed.' }
  Assert-Protected $backupManifest
  Start-Interactive 'ngrok';$tunnelStopped=$false
  @{state=($(if($Mode -eq 'Apply'){'active'}else{'rolled-back'}));manifestSha256=$manifestHash;finishedAt=[DateTime]::UtcNow.ToString('o')} | ConvertTo-Json | Set-Content -LiteralPath $journalPath -Encoding UTF8
  [pscustomobject]@{ok=$true;mode=$Mode;backupRoot=$backupRoot;manifestSha256=$manifestHash;privateConfigurationUnchanged=$true;realPrintJobs=0} | ConvertTo-Json
} catch {
  if ($Mode -eq 'Rollback' -and ($runtimeStopped -or $filesChanged)) {
    # Do not re-expose a stopped or partially restored runtime. The dated
    # backup and exact candidate remain available for deliberate recovery.
    throw 'Rollback did not finish after printer stop was attempted. Tunnel remains stopped; inspect the preserved backup/candidate before resuming.'
  }
  if ($Mode -eq 'Apply' -and ($runtimeStopped -or $filesChanged)) {
    try { Invoke-Manager 'stop' 'bluefolder_print' } catch {}
    if (Test-PrintRuntimeStopped) {
      foreach ($property in $manifest.before.PSObject.Properties) { Copy-Verified (Join-Path $backupRoot $property.Name) (Join-Path $warehouseRoot $property.Name) }
      $newModule=Join-Path $warehouseRoot 'scanner-server\warehouse_scanner\tool_label_print.py'
      if (Test-Path -LiteralPath $newModule) { Move-Item -LiteralPath $newModule -Destination (Join-Path $backupRoot ('tool_label_print.failed-'+[Guid]::NewGuid().ToString('N')+'.py')) }
      Start-Interactive 'bluefolder_print'
    } elseif ($filesChanged) {
      throw 'Recovery could not confirm that the printer process stopped. No rollback files were copied; tunnel remains stopped for safe inspection.'
    }
  }
  if ($tunnelStopped) { Start-Interactive 'ngrok' }
  throw
}
