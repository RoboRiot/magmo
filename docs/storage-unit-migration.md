# StorageUnits migration runbook

This migration creates the complete `StorageUnits` directory (`B1` through
`B119`, then `P1` through `P102`) without updating, merging, or deleting any
`Test` document. `P0` is excluded. Every live phase verifies the exact count,
ID membership, full-document fingerprints, containment fingerprints, and
update times of the `Test` collection against the reviewed backup.

The reviewed source backup is:

- Project: `magmo-ac10c`
- Manifest: `outputs/firestore-backups/2026-08-28T01-27-31-301Z-magmo-firestore/manifest.json`
- JSONL SHA-256: `9834d4d88df42973a763215574c68d4d11d131aee48f654cd53b238529563605`
- Backup documents: 150,147 total; 3,336 root `Test` documents
- Warehouse directory: 119 bins and 102 pallets

Run the commands from the repository root in PowerShell. Each hash copied into
a later command is an explicit human review gate; do not substitute a hash from
a different run.

```powershell
$Project = 'magmo-ac10c'
$Manifest = 'outputs/firestore-backups/2026-08-28T01-27-31-301Z-magmo-firestore/manifest.json'
$BackupHash = '9834d4d88df42973a763215574c68d4d11d131aee48f654cd53b238529563605'
$Plan = 'outputs/storage-unit-migration/2026-08-28T01-36-48-350Z-plan.json'

node scripts/plan-storage-unit-migration.mjs --backup-manifest=$Manifest --backup-hash=$BackupHash --project=$Project --expected-count=221 --output=$Plan
```

Review the plan, including all candidates and review reasons, then copy the
printed `planHash` exactly:

```powershell
$PlanHash = '<EXACT PLAN HASH PRINTED BY THE PLANNER>'

node scripts/apply-storage-unit-migration.mjs --plan=$Plan --project=$Project --backup-manifest=$Manifest --backup-hash=$BackupHash --plan-hash=$PlanHash --expected-count=221

$Preimage = 'outputs/storage-unit-migration/storage-units-preimage.json'
node scripts/apply-storage-unit-migration.mjs --plan=$Plan --project=$Project --backup-manifest=$Manifest --backup-hash=$BackupHash --plan-hash=$PlanHash --expected-count=221 --prepare-preimage --preimage=$Preimage
```

The first apply command is live read-only. The second performs live reads and
writes only the local preimage file. Copy its printed SHA-256 exactly, validate
it in another read-only pass, and only then authorize the migration:

```powershell
$PreimageHash = '<EXACT PREIMAGE SHA-256 PRINTED BY PREPARE>'

node scripts/apply-storage-unit-migration.mjs --plan=$Plan --project=$Project --backup-manifest=$Manifest --backup-hash=$BackupHash --plan-hash=$PlanHash --expected-count=221 --preimage=$Preimage --preimage-hash=$PreimageHash

node scripts/apply-storage-unit-migration.mjs --plan=$Plan --project=$Project --backup-manifest=$Manifest --backup-hash=$BackupHash --plan-hash=$PlanHash --expected-count=221 --preimage=$Preimage --preimage-hash=$PreimageHash --apply --confirm=APPLY_STORAGE_UNIT_MIGRATION
```

Apply writes only `StorageUnits` and `MigrationAudit`. It is resumable with the
same plan, hashes, preimage, and run ID. Completion requires all 221 target docs
to match their desired fingerprints and the full `Test` invariants to remain
unchanged.

Rollback is also read-only by default. It restores preexisting `StorageUnits`
documents from the preimage and deletes only those target documents that did
not exist in the preimage:

```powershell
node scripts/restore-storage-unit-migration.mjs --plan=$Plan --preimage=$Preimage --preimage-hash=$PreimageHash --project=$Project --backup-manifest=$Manifest --backup-hash=$BackupHash --plan-hash=$PlanHash --expected-count=221

node scripts/restore-storage-unit-migration.mjs --plan=$Plan --preimage=$Preimage --preimage-hash=$PreimageHash --project=$Project --backup-manifest=$Manifest --backup-hash=$BackupHash --plan-hash=$PlanHash --expected-count=221 --apply --confirm=RESTORE_STORAGE_UNIT_MIGRATION
```

Never apply if the planner, preimage, preflight, or post-verification reports a
project/hash/count mismatch, a changed `Test` fingerprint, or a unit state that
matches neither the reviewed before nor desired after state.
