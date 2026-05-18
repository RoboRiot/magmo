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
  "INFLOW_COMPANY_ID"
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
