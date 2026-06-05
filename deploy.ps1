Write-Host "=== Building Next.js ==="
npm run build

Write-Host "=== Syncing server env for Firebase Functions ==="
$rootEnvPath = ".env.local"
$functionsEnvPath = "functions\.env"
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
  "BLUEFOLDER_STATUS_CHECK_REQUIRED",
  "BLUEFOLDER_ALLOW_UNVERIFIED_STATUS",
  "SLACK_BOT_TOKEN",
  "SLACK_CHANNEL_ID",
  "SLACK_CHANNEL_NAME",
  "SLACK_USER_IDS",
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

if (Test-Path $rootEnvPath) {
  $rootEnv = @{}
  Get-Content $rootEnvPath | ForEach-Object {
    if ($_ -match '^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$') {
      $rootEnv[$Matches[1]] = $Matches[2]
    }
  }

  $functionLines = @()
  if (Test-Path $functionsEnvPath) {
    $functionLines = @(Get-Content $functionsEnvPath)
  }

  foreach ($key in $keysToSync) {
    if (-not $rootEnv.ContainsKey($key)) {
      continue
    }

    $line = "$key=$($rootEnv[$key])"
    $updated = $false
    for ($i = 0; $i -lt $functionLines.Count; $i++) {
      if ($functionLines[$i] -match "^\s*$([regex]::Escape($key))\s*=") {
        $functionLines[$i] = $line
        $updated = $true
        break
      }
    }

    if (-not $updated) {
      $functionLines += $line
    }
  }

  Set-Content -Path $functionsEnvPath -Value $functionLines
} else {
  Write-Warning "$rootEnvPath not found; skipping Monday env sync."
}

Write-Host "=== Removing old SSR build from functions/.next ==="
Remove-Item -Recurse -Force "functions\.next"

Write-Host "=== Copying fresh .next build into functions/.next ==="
Copy-Item -Recurse ".next" "functions\.next"

Write-Host "=== Deploying to Firebase ==="
firebase deploy
