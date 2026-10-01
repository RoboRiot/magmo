$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$reviewRoot = $PSScriptRoot
$manifestPath = Join-Path $reviewRoot 'candidate-files-v2.json'
$candidateManifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
$expected = @{}
foreach ($entry in $candidateManifest) { $expected[$entry.path] = $entry }
$archivePath = Join-Path $reviewRoot 'artifact-v2.zip'
$archiveHashBefore = (Get-FileHash -LiteralPath $archivePath -Algorithm SHA256).Hash.ToLowerInvariant()
$archive = [System.IO.Compression.ZipFile]::OpenRead($archivePath)
$verifiedPaths = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
try {
  foreach ($entry in $archive.Entries) {
    $entryName = $entry.FullName
    if ($entryName.EndsWith('/')) { throw "Unexpected directory archive entry: $entryName" }
    if ($entryName.StartsWith('/') -or $entryName.Contains('\') -or $entryName.Split('/') -contains '..') { throw "Unsafe archive path: $entryName" }
    if (-not $expected.ContainsKey($entryName)) { throw "Unexpected archive entry: $entryName" }
    if (-not $verifiedPaths.Add($entryName)) { throw "Duplicate archive entry: $entryName" }
    if ($entry.Length -ne $expected[$entryName].bytes) { throw "Length mismatch: $entryName" }
    $entryStream = $entry.Open()
    $entryHasher = [System.Security.Cryptography.SHA256]::Create()
    try { $entryHash = [Convert]::ToHexString($entryHasher.ComputeHash($entryStream)).ToLowerInvariant() }
    finally { $entryStream.Dispose(); $entryHasher.Dispose() }
    if ($entryHash -ne $expected[$entryName].sha256) { throw "SHA256 mismatch: $entryName" }
  }
}
finally { $archive.Dispose() }
if ($verifiedPaths.Count -ne $expected.Count) { throw 'Missing archive entries' }
$archiveHashAfter = (Get-FileHash -LiteralPath $archivePath -Algorithm SHA256).Hash.ToLowerInvariant()
if ($archiveHashBefore -ne $archiveHashAfter) { throw 'Archive changed during review' }
$sourceReport = Get-Content -LiteralPath (Join-Path $reviewRoot 'independent-final-review.json') -Raw | ConvertFrom-Json
$compositionHash = (Get-FileHash -LiteralPath (Join-Path $reviewRoot 'composition-report-v2.json') -Algorithm SHA256).Hash.ToLowerInvariant()
$manifestHash = (Get-FileHash -LiteralPath $manifestPath -Algorithm SHA256).Hash.ToLowerInvariant()
if ($sourceReport.compositionReportSHA256 -ne $compositionHash -or $sourceReport.candidateFileManifestSHA256 -ne $manifestHash) { throw 'Scope receipt binding mismatch' }
$result = [ordered]@{
  checkedAt = [DateTime]::UtcNow.ToString('o')
  status = 'passed'
  buildId = $sourceReport.buildId
  artifactSHA256 = $archiveHashAfter
  artifactBytes = (Get-Item -LiteralPath $archivePath).Length
  independentlyDecompressedAndSHA256VerifiedEntries = $verifiedPaths.Count
  compositionReportSHA256 = $compositionHash
  candidateFileManifestSHA256 = $manifestHash
  independentScopeReviewSHA256 = (Get-FileHash -LiteralPath (Join-Path $reviewRoot 'independent-final-review.json') -Algorithm SHA256).Hash.ToLowerInvariant()
  compiledSearchReviewSHA256 = (Get-FileHash -LiteralPath (Join-Path $reviewRoot 'finalsearch-candidate-verification.json') -Algorithm SHA256).Hash.ToLowerInvariant()
  baselineSourceArchiveSHA256 = $sourceReport.baselineArchiveSHA256
  rulesSHA256 = $sourceReport.rulesSHA256
  productionWrites = 0
}
$reportPath = Join-Path $reviewRoot 'independent-package-review.json'
if (Test-Path -LiteralPath $reportPath) { throw 'Preserve previous review report' }
$resultJson = $result | ConvertTo-Json -Depth 5
[IO.File]::WriteAllText($reportPath, $resultJson + "`n", [Text.UTF8Encoding]::new($false))
$resultJson
