# BlueFolder equipment resolution retry — 2026-09-25

The candidate is copied from the exact active warehouse listener, not the unrelated dirty workspace monolith. Only equipment-resolution acknowledgement/retry, bounded recovery requests, and local observability are changed. It does not alter the existing closed-status-only or split Slack ownership lanes.

- Baseline version: `2026.09.24-bluefolder-machine-link.1`
- Baseline SHA256: `81df567ea140cba4551b3b205c1cf9ac151df6cee24982b1275cec1a9426bccc`
- Candidate version: `2026.09.25-bluefolder-equipment-retry.1`
- Candidate SHA256: `d9f9fa8c6ef543a9d5062f3a8c2a3cafd043644519aea4b9354d2989e07a148f`

An accepted equipment metadata import no longer marks a selected machine as linked unless the authoritative response confirms resolution. Unresolved, missing-site, and stale automatic selections remain retryable with 1/2/4/8/16/30-minute capped backoff. Manual associations remain preserved; changed or removed automatic selections require review. Legacy false-success checkpoints are rechecked rather than trusted. Recovery remains metadata-only and `existingOnly`; it does not create or resurrect work orders or write inventory records.

The recovery scheduler handles at most six records with a 20-second poll budget and single-attempt requests capped at 10 seconds. Its first cursor starts with the newest creation date; subsequent cursor progress is persistent and fair. Local logs warn on first unresolved result/reason change and log recovery. State health records status counts, pending count, and last unresolved reason. No extra Slack posts are sent.

## Verification

Run in `listener`:

```
py -3.13 -B -m unittest test_bluefolder_equipment_retry test_bluefolder_equipment_link test_bluefolder_destination_link test_bluefolder_close_status test_split_dispatch_ownership test_bluefolder_listener test_confirmed_tombstones
py -3.13 -B test_dispatch_root_formatting_20260921.py bluefolder_slack_listener_v2.py
```

95 module tests plus 12 AST formatting tests pass. The same 107 tests passed in server staging, without replacing live source or touching live state.

## Guarded deployment and rollback

`stage-listener.cjs` copies only source, tests, and installer tooling into the dated server staging directory and runs preflight. `deploy-listener.cjs --apply <verified-app-revision>` is only authorized after root confirms the app's structured equipment statuses are deployed. The installer requires the reviewed PID 1172, exact old and new source hashes, healthy recent heartbeat, existing API capabilities, and completed verified Firestore backup manifest hash. An exclusive deployment file lock prevents simultaneous installations.

The installer makes timestamped copies of active source and listener state, atomically replaces the source, and asks the existing service manager to restart only `bluefolder_listener` in a hidden process. It never overwrites live state or copies environment credentials. It verifies fresh heartbeat, unchanged report-worker PIDs, and non-regressing Slack thread checkpoints. It automatically restores the old source if installation verification fails and the source is still the known candidate.

`verify-listener.ps1 -BackupPath <dated-backup>` independently verifies source/version, heartbeat, status-only capability, worker/checkpoint preservation, and equipment observability. It reports WO10677's actual daemon state without presenting an old checkpoint as a new acknowledgement. `audit-listener-readonly.cjs` reads the same evidence without mutations. No separate listener worker is launched and live state is not edited to force queue progress.

The first normal recovery cycle processed the newest record, WO10678, and correctly retained `site_unresolved / work_order_client_missing` as retryable. WO10677 remained in the fair historical queue. Root separately authorized one `existingOnly` metadata-only smoke through the deployed client/API; its actual HTTP response was `resolved`, client `AIS79109`, machine `AIS32820`. Before/after snapshots proved all workflow, asset, history, and inventory-movement fields unchanged. Only four import-bookkeeping fields changed: `bluefolderImportFingerprint`, `bluefolderImportUpdatedAt`, `bluefolderImportUpdatedAtIso`, and `updatedAt`. The sanitized receipt explicitly identifies this as a single metadata-only smoke, not a daemon acknowledgement.

`rollback-listener.ps1 -BackupPath <dated-backup>` is a dry-run by default; adding `-Apply` restores only the verified previous source and restarts the same managed listener. It explicitly does not roll back state/checkpoints or the database. Protect source/state backups and raw operational snapshots; do not commit them or any environment files to Git.
