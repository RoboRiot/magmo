param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("production", "test")]
  [string]$Environment,

  [switch]$DryRun
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$projectId = "magmo-ac10c"
$isTest = $Environment -eq "test"
$hostingTarget = if ($isTest) { "test" } else { "production" }
$functionName = if ($isTest) { "nextServerTestWest" } else { "nextServerWest" }
$repoRoot = Split-Path -Parent $PSScriptRoot
$rootEnvPath = Join-Path $repoRoot ".env.local"
$testEnvPath = Join-Path $repoRoot ".env.test.local"
$functionsEnvPath = Join-Path $repoRoot "functions\.env"
$functionsBuildPath = Join-Path $repoRoot "functions\.next"
$nextBuildPath = Join-Path $repoRoot ".next"

$keysToSync = @(
  "MONDAY_API_TOKEN",
  "MONDAY_TOKEN",
  "MONDAY_TRAILER_WORKSPACE_ID",
  "MONDAY_WORKSPACE_ID",
  "MONDAY_TRAILER_WORKSPACE_NAME",
  "INFLOW_API_KEY",
  "INFLOW_COMPANY_ID",
  "BLUEFOLDER_API_TOKEN",
  "BLUEFOLDER_TOKEN",
  "BLUEFOLDER_ACCESS_TOKEN",
  "BLUEFOLDER_BASE_URL",
  "BLUEFOLDER_WORK_ORDERS_PATH",
  "BLUEFOLDER_WORK_ORDER_DETAIL_PATH",
  "BLUEFOLDER_LIST_STATUS",
  "BLUEFOLDER_WORK_ORDER_URL_TEMPLATE",
  "BLUEFOLDER_LINK_FIELD_LABEL",
  "BLUEFOLDER_STATUS_CHECK_REQUIRED",
  "BLUEFOLDER_ALLOW_UNVERIFIED_STATUS",
  "BLUEFOLDER_SLACK_CRON_SECRET",
  "CRON_SECRET",
  "DRY_RUN",
  "BASELINE_ON_STARTUP",
  "ENABLE_BLUEFOLDER",
  "REQUIRE_CLICKABLE_MENTIONS",
  "SLACK_BOT_TOKEN",
  "SLACK_CHANNEL_ID",
  "SLACK_CHANNEL_NAME",
  "SLACK_USER_IDS",
  "SLACK_USER_NAME_MAP",
  "SLACK_MENTION_TEXT",
  "SLACK_SIGNING_SECRET",
  "SLACK_LIST_TASKS_ID",
  "SLACK_LIST_TASKS_TITLE_COL",
  "SLACK_LIST_TASKS_DESCRIPTION_COL",
  "SLACK_LIST_SHIPPING_ID",
  "SLACK_LIST_SHIPPING_TITLE_COL",
  "SLACK_LIST_SHIPPING_DESCRIPTION_COL",
  "SLACK_LIST_SHIPPING_PNSN_COL",
  "SLACK_LIST_SHIPPING_WO_COL",
  "SLACK_LIST_SHIPPING_LOCALSN_COL",
  "SLACK_LIST_SHIPPING_TRACKING_COL",
  "SLACK_LIST_SHIPPING_PHOTOS_COL",
  "SLACK_LIST_SHIPPING_DATE_COL",
  "SLACK_LIST_RECEIVING_ID",
  "SLACK_LIST_RECEIVING_TITLE_COL",
  "SLACK_LIST_RECEIVING_DESCRIPTION_COL",
  "SLACK_LIST_RECEIVING_PNSN_COL",
  "SLACK_LIST_RECEIVING_WO_COL",
  "SLACK_LIST_RECEIVING_LOCALSN_COL",
  "SLACK_LIST_RECEIVING_TRACKING_COL",
  "SLACK_LIST_RECEIVING_PHOTOS_COL",
  "SLACK_LIST_RECEIVING_DATE_COL",
  "SLACK_LIST_TOOLS_ID",
  "SLACK_LIST_TOOLS_TITLE_COL",
  "SLACK_LIST_TOOLS_WO_COL",
  "SLACK_LIST_TOOLS_PHOTOS_COL",
  "OPENAI_API_KEY",
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "FIREBASE_WEB_API_KEY",
  "FIREBASE_DATABASE_URL",
  "OPENAI_SERVICE_REPORT_MODEL",
  "GOOGLE_MAPS_ROUTES_API_KEY",
  "OPS_INGEST_SECRET",
  "OPS_ENVIRONMENT",
  "OPS_INGEST_MODE",
  "OPS_INGEST_WRITE_ENABLED",
  "OPS_DEPLOY_VERSION",
  "MAGMONITOR_INGEST_KEY",
  "MAGMONITOR_DEVICE_SESSION_TTL_SECONDS",
  "MAGMONITOR_INGEST_MIN_INTERVAL_MS",
  "OPS_ASSIGNMENT_MODEL",
  "OPS_DEFAULT_OVERSIGHT_SLACK_ID",
  "OPS_DEFAULT_OVERSIGHT_NAME",
  "OPS_DEFAULT_OVERSIGHT_EMAIL",
  "OPS_ASSIGNMENT_MAX_OUTPUT_TOKENS",
  "OPS_ASSIGNMENT_REASONING_EFFORT",
  "OPS_OPENAI_TIMEOUT_MS",
  "OPS_TESTING_CHANNEL_ID",
  "OPS_DISPATCH_CHANNEL_ID",
  "OPS_DISPATCH_CHANNEL_NAME",
  "OPS_CONVERSATION_CHANNEL_ID",
  "OPS_THREAD_LOOKUP_WINDOW_SECONDS",
  "OPS_THREAD_LOOKUP_RETRY_SECONDS",
  "OPS_PARENT_SCAN_SECONDS",
  "OPS_MESSAGE_POLL_SECONDS",
  "OPS_THREAD_SCAN_BATCH",
  "TRAILER_MONITOR_SECRET",
  "TRAILER_MONITOR_URL",
  "TRAILER_MONITOR_MODEL",
  "TRAILER_MONITOR_MIN_CONFIDENCE",
  "TRAILER_MONITOR_INITIAL_LOOKBACK_DAYS",
  "TRAILER_MONITOR_MAX_OUTPUT_TOKENS",
  "TRAILER_MONITOR_REASONING_EFFORT",
  "ASK_MAGMO_MODEL",
  "ASK_MAGMO_REASONING_EFFORT",
  "ASK_MAGMO_VERBOSITY",
  "ASK_MAGMO_WEB_SEARCH_ENABLED",
  "ASK_MAGMO_WEB_SEARCH_CONTEXT_SIZE",
  "ASK_MAGMO_TOP_K",
  "ASK_MAGMO_PAGE_SIZE",
  "ASK_MAGMO_CANDIDATE_POOL_SIZE",
  "ASK_MAGMO_MAX_CONTEXT_CHARS",
  "ASK_MAGMO_MAX_CHUNK_CONTEXT_CHARS",
  "ASK_MAGMO_TIMEOUT_MS",
  "ASK_MAGMO_OPENAI_TIMEOUT_MS",
  "ASK_MAGMO_PREFILTER_INDEX_TTL_MS",
  "ASK_MAGMO_PREFILTER_INDEX_MAX_SCOPES",
  "ASK_MAGMO_EMBEDDING_FETCH_BATCH_SIZE"
)

$testIsolatedKeys = @(
  $keysToSync |
    Where-Object {
      $_ -like "SLACK_*" -or
      $_ -eq "OPS_INGEST_SECRET" -or
      $_ -eq "OPS_TESTING_CHANNEL_ID" -or
      $_ -eq "OPS_DISPATCH_CHANNEL_ID" -or
      $_ -eq "OPS_DISPATCH_CHANNEL_NAME" -or
      $_ -eq "OPS_CONVERSATION_CHANNEL_ID"
    }
)

function Read-EnvFile {
  param([Parameter(Mandatory = $true)][string]$Path)

  $values = @{}
  if (-not (Test-Path -LiteralPath $Path)) {
    return $values
  }

  foreach ($line in Get-Content -LiteralPath $Path) {
    if ($line -match '^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$') {
      $values[$Matches[1]] = $Matches[2]
    }
  }
  return $values
}

function ConvertFrom-EnvValue {
  param([AllowEmptyString()][string]$Value)

  $trimmed = $Value.Trim()
  if ($trimmed.Length -ge 2) {
    $first = $trimmed.Substring(0, 1)
    $last = $trimmed.Substring($trimmed.Length - 1, 1)
    if (($first -eq '"' -and $last -eq '"') -or ($first -eq "'" -and $last -eq "'")) {
      return $trimmed.Substring(1, $trimmed.Length - 2)
    }
  }
  return $trimmed
}

function Invoke-CheckedCommand {
  param(
    [Parameter(Mandatory = $true)][string]$Command,
    [Parameter(ValueFromRemainingArguments = $true)][string[]]$Arguments
  )

  & $Command @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "$Command failed with exit code $LASTEXITCODE."
  }
}

if (-not (Test-Path -LiteralPath $rootEnvPath)) {
  throw ".env.local was not found. Production credentials and shared service settings are required."
}

$baseEnv = Read-EnvFile -Path $rootEnvPath
$effectiveEnv = @{}
foreach ($key in $baseEnv.Keys) {
  $effectiveEnv[$key] = $baseEnv[$key]
}

if ($isTest) {
  if (-not (Test-Path -LiteralPath $testEnvPath)) {
    throw ".env.test.local was not found. Copy .env.test.example to .env.test.local and add the magmo-test Slack credentials."
  }

  $testEnv = Read-EnvFile -Path $testEnvPath
  foreach ($key in $testIsolatedKeys) {
    $effectiveEnv.Remove($key)
  }
  foreach ($key in $testEnv.Keys) {
    $effectiveEnv[$key] = $testEnv[$key]
    [Environment]::SetEnvironmentVariable(
      $key,
      (ConvertFrom-EnvValue -Value $testEnv[$key]),
      [EnvironmentVariableTarget]::Process
    )
  }

  $testPublicDefaults = @{
    "NEXT_PUBLIC_DEPLOY_ENV" = "test"
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" = "magmo-ac10c.firebaseapp.com"
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID" = "magmo-ac10c"
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET" = "magmo-ac10c.appspot.com"
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" = "177857525147"
    "NEXT_PUBLIC_FIREBASE_APP_ID" = "1:177857525147:web:0ca1075fafba2647b1dd3e"
    "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID" = "G-VP2W1H3978"
  }
  foreach ($key in $testPublicDefaults.Keys) {
    if (-not $testEnv.ContainsKey($key)) {
      [Environment]::SetEnvironmentVariable(
        $key,
        $testPublicDefaults[$key],
        [EnvironmentVariableTarget]::Process
      )
    }
  }

  foreach ($requiredKey in @("OPS_INGEST_SECRET")) {
    if (
      -not $testEnv.ContainsKey($requiredKey) -or
      [string]::IsNullOrWhiteSpace((ConvertFrom-EnvValue -Value $testEnv[$requiredKey]))
    ) {
      throw ".env.test.local must define $requiredKey for the read-only staging API."
    }
  }
  if (
    $baseEnv.ContainsKey("OPS_INGEST_SECRET") -and
    (ConvertFrom-EnvValue -Value $baseEnv["OPS_INGEST_SECRET"]) -eq
      (ConvertFrom-EnvValue -Value $testEnv["OPS_INGEST_SECRET"])
  ) {
    throw ".env.test.local must use an Ops ingest credential different from production."
  }
}

$effectiveEnv["OPS_ENVIRONMENT"] = if ($isTest) { "staging" } else { "production" }
$effectiveEnv["OPS_INGEST_MODE"] = if ($isTest) { "read_only" } else { "read_write" }
$effectiveEnv["OPS_INGEST_WRITE_ENABLED"] = if ($isTest) { "false" } else { "true" }
$effectiveEnv["OPS_DEPLOY_VERSION"] = "local-" + (Get-Date).ToUniversalTime().ToString("yyyyMMddTHHmmssZ")

Push-Location $repoRoot
try {
  $label = if ($isTest) { "TEST" } else { "PRODUCTION" }
  Write-Host "=== $label build ==="
  Invoke-CheckedCommand "npm.cmd" "run" "build"

  Write-Host "=== Syncing $Environment server environment ==="
  $functionLines = @()
  if (Test-Path -LiteralPath $functionsEnvPath) {
    $functionLines = @(Get-Content -LiteralPath $functionsEnvPath)
  }

  $keysToRemove = @($keysToSync) + @("FIREBASE_PROJECT_ID")
  $escapedKeys = @($keysToRemove | ForEach-Object { [regex]::Escape($_) })
  $keyPattern = '^\s*(?:' + ($escapedKeys -join '|') + ')\s*='
  $functionLines = @($functionLines | Where-Object { $_ -notmatch $keyPattern })
  foreach ($key in $keysToSync) {
    if ($effectiveEnv.ContainsKey($key)) {
      $functionLines += "$key=$($effectiveEnv[$key])"
    }
  }
  Set-Content -LiteralPath $functionsEnvPath -Value $functionLines

  Write-Host "=== Preparing Firebase server artifact ==="
  if (Test-Path -LiteralPath $functionsBuildPath) {
    Remove-Item -LiteralPath $functionsBuildPath -Recurse -Force
  }
  Copy-Item -LiteralPath $nextBuildPath -Destination $functionsBuildPath -Recurse

  foreach ($directory in @("cache", "dev", "diagnostics", "types")) {
    $target = Join-Path $functionsBuildPath $directory
    if (Test-Path -LiteralPath $target) {
      Remove-Item -LiteralPath $target -Recurse -Force
    }
  }

  Invoke-CheckedCommand "node.exe" "scripts\verify-firebase-build.js"

  $deployOnly = if ($isTest) {
    "functions:$functionName,hosting:$hostingTarget,database"
  } else {
    "functions:$functionName,functions:trailerSlackMonitorSchedule,hosting:$hostingTarget,database"
  }
  $firebaseArguments = @(
    "deploy",
    "--project",
    $projectId,
    "--only",
    $deployOnly,
    "--non-interactive"
  )
  if ($DryRun) {
    $firebaseArguments += "--dry-run"
  }

  $deployLabel = if ($DryRun) { "Validating" } else { "Deploying" }
  Write-Host "=== $deployLabel $Environment ($deployOnly) ==="
  Invoke-CheckedCommand "firebase.cmd" @firebaseArguments

  if ($DryRun) {
    Write-Host "=== Dry run complete; no code was published ==="
  } elseif ($isTest) {
    Write-Host "=== Test bay: https://magmo-test.web.app ==="
  } else {
    Write-Host "=== Production: https://magmo.cloud ==="
  }
} finally {
  Pop-Location
}
