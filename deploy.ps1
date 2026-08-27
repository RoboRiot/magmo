param([switch]$DryRun)

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "scripts\deploy-environment.ps1") `
  -Environment production `
  -DryRun:$DryRun
