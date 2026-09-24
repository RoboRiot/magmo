#Requires -Version 7.0
param([switch]$RootReviewed, [switch]$VerifyExisting)
$ErrorActionPreference = 'Stop'
if (-not $RootReviewed) { throw 'Root code/artifact review is required before packaging.' }
$taskWorkspace = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..'))
$taskReport = Get-Content -Raw -LiteralPath (Join-Path $PSScriptRoot 'composition-report.json') | ConvertFrom-Json
$taskCandidate = Join-Path $PSScriptRoot $taskReport.sourceDirectory
$taskArtifact = Join-Path $PSScriptRoot 'artifact.zip'
$taskArtifactExists = Test-Path -LiteralPath $taskArtifact
if ($taskArtifactExists -and -not $VerifyExisting) { throw 'Never overwrite an existing reviewed artifact. Use -VerifyExisting to verify it without modifying it.' }
Push-Location $taskWorkspace
try {
  $taskTestOutput = (& node --test tmp/work-order-machine-link-20260924/verify-artifact.test.cjs 2>&1 | Out-String)
  if ($LASTEXITCODE -ne 0 -or $taskTestOutput -notmatch '# fail 0' -or $taskTestOutput -notmatch '# pass (\d+)') { throw 'Exact-artifact verification failed.' }
  $taskTestCount = [int]$Matches[1]
  if ($taskTestCount -lt 60) { throw 'Expected at least sixty exact-artifact checks.' }
} finally { Pop-Location }
foreach ($taskEntry in $taskReport.entries) {
  if ((Get-FileHash -LiteralPath (Join-Path $taskCandidate $taskEntry.path) -Algorithm SHA256).Hash.ToLowerInvariant() -ne $taskEntry.after) { throw "Candidate changed: $($taskEntry.path)" }
}
foreach ($taskInput in $taskReport.sourceHashes.PSObject.Properties) {
  if ((Get-FileHash -LiteralPath (Join-Path $taskWorkspace $taskInput.Name) -Algorithm SHA256).Hash.ToLowerInvariant() -ne $taskInput.Value) { throw "Reviewed source changed: $($taskInput.Name)" }
}
Add-Type -AssemblyName System.IO.Compression.FileSystem
if (-not $taskArtifactExists) { [IO.Compression.ZipFile]::CreateFromDirectory($taskCandidate, $taskArtifact, [IO.Compression.CompressionLevel]::Optimal, $false) }
$taskZip = [IO.Compression.ZipFile]::OpenRead($taskArtifact)
try {
  $taskFiles = @(Get-ChildItem -LiteralPath $taskCandidate -Recurse -File -Force)
  $taskEntries = @($taskZip.Entries | Where-Object { -not $_.FullName.EndsWith('/') })
  if ($taskFiles.Count -ne $taskEntries.Count) { throw 'ZIP omitted candidate files.' }
  foreach ($taskFile in $taskFiles) {
    $taskCandidatePrefix = $taskCandidate.TrimEnd('\', '/') + [IO.Path]::DirectorySeparatorChar
    if (-not $taskFile.FullName.StartsWith($taskCandidatePrefix, [StringComparison]::OrdinalIgnoreCase)) { throw 'Candidate file escaped its reviewed directory.' }
    $taskRelative = $taskFile.FullName.Substring($taskCandidatePrefix.Length).Replace('\', '/')
    $taskZipEntry = $taskZip.GetEntry($taskRelative)
    if ($null -eq $taskZipEntry) { throw "ZIP entry missing: $taskRelative" }
    $taskStream = $taskZipEntry.Open()
    $taskHasher = [Security.Cryptography.SHA256]::Create()
    try { $taskHash = [BitConverter]::ToString($taskHasher.ComputeHash($taskStream)).Replace('-', '').ToLowerInvariant() }
    finally { $taskStream.Dispose(); $taskHasher.Dispose() }
    if ($taskHash -ne (Get-FileHash -LiteralPath $taskFile.FullName -Algorithm SHA256).Hash.ToLowerInvariant()) { throw "ZIP entry differs: $taskRelative" }
  }
} finally { $taskZip.Dispose() }
$taskGates = @{ ok = $true; rootReviewed = $true; exactArtifactTestsPassed = $true; exactArtifactTestCount = $taskTestCount; zipEntriesVerified = $taskFiles.Count; packagedAt = [DateTime]::UtcNow.ToString('o'); artifactSHA256 = (Get-FileHash -LiteralPath $taskArtifact -Algorithm SHA256).Hash.ToLowerInvariant() }
[IO.File]::WriteAllText((Join-Path $PSScriptRoot 'package-gates.json'), ($taskGates | ConvertTo-Json), [Text.UTF8Encoding]::new($false))
$taskGates | ConvertTo-Json
