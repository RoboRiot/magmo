# Item location overhaul: backup, migration, and rollback runbook

This runbook is the release gate for changing historical/current item associations. A source-code checkpoint, a verified dated Firestore backup, a reviewed migration plan, and a targeted restore dry run are all required before any migration apply or deployment.

## Recovery boundaries

The local backup is a logical backup of **all Firestore documents and nested subcollections**, including the item, client, trailer, machine, and audit documents stored there. It is deliberately Firestore-only:

- `firestoreIncluded: true`
- `firestoreOnly: true`
- `storageIncluded: false`
- `storageModified: false`
- `authIncluded: false`

The backup reads Firestore and does not modify Firestore, Cloud Storage, or Firebase Authentication. It does not contain item photos/files from Cloud Storage or user accounts from Firebase Authentication. This overhaul must not modify either of those systems. If a future release will modify them, stop and create service-specific backups first.

The full JSONL backup is the disaster-recovery source. The migration's much smaller preimage is the normal, targeted rollback source. Do not bulk-restore the full backup into production to reverse a small migration.

## Create and verify the dated Firestore backup

From the repository root, create a new automatically dated backup directory:

```powershell
node scripts/backup-firestore-local.mjs
```

The command creates `INCOMPLETE` as the first file in a brand-new backup directory. It leaves that marker and every partial artifact in place after any failure. Never delete, rename, overwrite, or reuse such a directory; diagnose it and start a new dated run.

A successful run closes and syncs the JSONL, reopens it as a stream, recomputes its bytes, SHA-256, and record count, writes a manifest with `status: "complete"`, closes that manifest, and only then removes `INCOMPLETE`. The manifest also records the source project, Git branch, Git commit SHA, and a dirty/clean boolean. It does not record credentials, environment values, changed filenames, or file contents.

Independently verify the completed backup before an apply. Replace the placeholder with the path printed by the backup command:

```powershell
node scripts/backup-firestore-local.mjs --verify="outputs/firestore-backups/<dated-run>/manifest.json"
```

Verification initializes no Firebase client and performs no network calls. It streams the JSONL, so the approximately 1.7 GB artifact is not parsed or held in memory. Proceed only when it exits successfully and reports the expected project, `valid: true`, `status: "complete"`, document count, byte count, SHA-256, and Firestore-only scope.

Record these values in the migration/deployment receipt:

- absolute or repository-relative manifest path;
- Firestore project/database identity;
- backup start/completion timestamps;
- JSONL byte count, document count, and SHA-256;
- manifest Git branch, SHA, and dirty indicator.

The backup artifact can contain operational data and must not be committed to Git or uploaded to a public release.

## Migration apply gates

The migration must default to dry run. An apply is blocked unless all of the following are true:

1. The backup verifier passes immediately before apply, its project matches the target project, and no `INCOMPLETE` marker exists.
2. The dated plan is immutable and its supplied SHA-256 matches the reviewed checksum.
3. Every ambiguous legacy association remains review-only. A script must not guess a client, trailer, machine, historical location, or effective date.
4. Preflight rereads every affected document and compares its recorded pre-plan fingerprint/update time. Any changed or missing document aborts the whole apply before the first write.
5. `--prepare-preimage` has completed as a separate local-only operation. It repeats the full live preflight, requires every target to be in its exact before-state with no source migration journal, writes and fsyncs a dated preimage, closes it, and prints its SHA-256. It includes every affected `Test` item and every `Machine` document touched to repair inverse `associatedParts` arrays. It records whether each document existed. The current migration does not write `Client` or `Trailers` documents.
6. Before the first Firestore write, the targeted restore command has completed a no-write dry run against that exact reviewed plan and prepared preimage and reports `readyBeforeApply: true`.
7. Apply is given that exact preimage path and SHA-256, revalidates all project/backup/plan/count/update-time/fingerprint gates, uses Firestore transactions, writes a migration audit record, and produces an apply receipt listing every success/failure. A partial or conflicted run is not marked complete.

Do not use the current web test deployment as a data sandbox unless its Firebase project/database has been independently confirmed to be isolated. Prefer the Firestore emulator or a separate staging project populated with synthetic fixtures.

## Plan, apply, and targeted data restore commands

First create the offline plan from the verified backup. For the six audited legacy records, use `--six --expected-count=6`; for another reviewed scope, replace `--six` with an explicit `--item-ids=ID1,ID2` list and the matching count. Omitting both scopes plans every `Test` item and requires correspondingly broader review.

```powershell
node scripts/plan-item-location-migration.mjs --backup-manifest="outputs/firestore-backups/<dated-run>/manifest.json" --project="<project-id>" --six --expected-count=6
```

Record the printed plan path, backup SHA-256, plan hash, expected apply count, and summary. The planner reads only local backup files and never connects to Firestore.

Next run the exact apply command **without** its apply flags. This performs backup, project, plan, item, machine, update-time, and count preflights against current Firestore but writes nothing:

```powershell
node scripts/apply-item-location-migration.mjs --plan="<plan-path>" --project="<project-id>" --backup-manifest="<manifest-path>" --backup-hash="<backup-sha256>" --plan-hash="<plan-hash>" --expected-count=<count>
```

Review its dry-run summary. Next prepare the targeted rollback artifact as a separate operation. Use a new dated path and preserve the JSON output:

```powershell
node scripts/apply-item-location-migration.mjs --plan="<plan-path>" --project="<project-id>" --backup-manifest="<manifest-path>" --backup-hash="<backup-sha256>" --plan-hash="<plan-hash>" --expected-count=<count> --prepare-preimage --preimage="outputs/item-location-migration/<dated-run>-preimage.json"
```

This mode performs the full live read-only preflight again, requires all targets to match their original update times and fingerprints, refuses an existing source migration journal, writes no Firestore document, creates the preimage with exclusive-create semantics, fsyncs it before close, and prints `preimagePath` and `preimageSha256`. If an exact valid file already exists at the requested path, it is revalidated and safely reused; any mismatch aborts.

Before applying, prove that the targeted restore can consume the exact prepared artifact. This command is read-only:

```powershell
node scripts/restore-item-location-migration.mjs --plan="<plan-path>" --plan-hash="<plan-hash>" --preimage="<preimage-path>" --preimage-hash="<preimage-sha256>" --project="<project-id>" --expected-count=<count>
```

Do not apply unless this pre-apply restore dry run exits successfully and reports `readyBeforeApply: true`, zero items/machines to restore, and no source or restore journal. It verifies the plan/preimage hashes, project, item and machine sets, expected count, original update times, before fingerprints, and derived after fingerprints. Record the JSON summary in the deployment receipt.

Only then run apply with the same common gates plus the exact prepared artifact and both authorization flags. The apply script never creates a preimage:

```powershell
node scripts/apply-item-location-migration.mjs --plan="<plan-path>" --project="<project-id>" --backup-manifest="<manifest-path>" --backup-hash="<backup-sha256>" --plan-hash="<plan-hash>" --expected-count=<count> --preimage="<preimage-path>" --preimage-hash="<preimage-sha256>" --apply --confirm=APPLY_ITEM_LOCATION_MIGRATION
```

The apply path repeats the full live preflight and validates the supplied file and checksum before `MigrationAudit` is its first Firestore write. Its output reports a stable run ID, result path, preimage path, and preimage SHA-256. Preserve all four. A complete result has `status: "complete"` and no post-verification errors. An incomplete result must be treated as an incident and restored/resumed only through its matching journal and artifacts.

After an apply, rerun the same restore command without authorization flags. It should now report the exact items/machines that would be restored. Any unrelated subsequent edit produces a fingerprint conflict and blocks restoration.

Only when an authorized rollback is actually needed, and the post-apply dry run reports the exact expected item/machine counts with no conflict, append the restore authorization flags to the unchanged restore command:

```text
--apply --confirm=RESTORE_ITEM_LOCATION_MIGRATION
```

The restore replaces each existing document with its exact preimage inside a transaction; it does not use merge patches. It restores item references and machine `associatedParts` memberships together, journals progress in `MigrationAudit`, supports an idempotent already-restored result, and verifies every before-fingerprint after writing. The current migration refuses missing target machines rather than creating them, so its restore never performs a speculative document delete.

Save the dated restore result from `outputs/item-location-migration`, then rerun the read-only planner/audit. Confirm zero conflicts, zero post-verification errors, the expected fingerprints, and the correct associations for the concrete AIS17704/AIS23 warehouse case. Never substitute the older trailer-ownership apply script.

If the restore reports any conflict or failure, do not retry blindly and do not attempt a full JSONL import. Preserve all artifacts, stop writes, identify exactly which documents succeeded, and prepare a new reviewed targeted plan from the preimage plus current state.

## Source checkpoint and Git rollback

The pre-overhaul source checkpoint is the annotated local tag `pre-item-location-overhaul-20260826`, pointing to commit `79e69b09daffdd9541047eec286f6560f7cca321` on `codex/item-location-overhaul`. The branch currently has no upstream, so the tag/commit is not a GitHub rollback point until an authorized push succeeds.

The repository contains many unrelated modified and untracked files. A tag can point only to a commit; it cannot preserve dirty or untracked state. For each overhaul checkpoint:

1. Review an explicit allowlist of source, test, migration, and documentation paths. Never use `git add -A`, `git add .`, `git stash -u`, `git clean`, or a hard reset in this worktree.
2. Stage only the reviewed allowlist, inspect the staged diff and secret scan, run focused tests plus the production build, and create a source-only commit.
3. Create an annotated dated tag on the exact tested commit. Do not move or reuse an existing tag.
4. With authorization, explicitly push the named branch and named tag. Confirm their remote SHAs. Because this branch has no upstream, set one deliberately rather than assuming a generic push reached GitHub.
5. Create a post-deploy tag only after the deployment receipt and post-deploy checks are complete.

For a code rollback, keep the dirty primary worktree untouched. Create a separate clean Git worktree at the pre-overhaul tag, run its locked tests/build, and deploy that exact commit. Alternatively, make reviewed revert commits in a separate rollback branch. Do not reset or force-push the active worktree.

Git rollback changes application code only. It does not reverse Firestore data; pair it with the targeted data restore when the migration already wrote data.

## Deployment receipt

Store a dated local JSON receipt for every dry run, apply, deployment, and rollback. The receipt should contain no secrets and should record:

- environment, Firebase project/database, deploy timestamp, and operator;
- exact Git commit SHA and tag, with `dirty: false` for the deployed worktree;
- backup manifest path, JSONL SHA-256, byte count, and document count;
- migration plan path/checksum, preimage path/checksum, apply run ID, and counts;
- exact targeted restore dry-run command and its JSON summary/counts;
- exact test/build commands and exit results;
- exact deploy command, Firebase release/version identifiers, and deployed URL;
- post-deploy read-only audit results and the AIS17704 acceptance result.

A timestamp alone is not a rollback receipt. A recoverable build ties the deployed Firebase release to an immutable Git commit/tag and ties any data write to verified backup, plan, preimage, apply, and restore artifacts.
