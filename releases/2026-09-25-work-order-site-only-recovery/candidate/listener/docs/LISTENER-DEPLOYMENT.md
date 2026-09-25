# Site-only destination recovery — 2026-09-25

The listener is based on a fresh copy of the exact production source, not the unrelated dirty workspace monolith.

- Baseline: `2026.09.25-bluefolder-equipment-retry.1`, SHA256 `d9f9fa8c6ef543a9d5062f3a8c2a3cafd043644519aea4b9354d2989e07a148f`
- Candidate: `2026.09.25-bluefolder-destination-retry.1`, SHA256 `7f28a4c93327ef111b02c6d068cc86bb4ec0561b55dc06a697bcfc5fcc76c71c`

WO10658 exposed a recovery gap: BlueFolder supplied stable customer and location IDs but omitted equipment fields, so the equipment-only recovery lane skipped its missing client. The minimal correction admits stable customer/site identity even when equipment is omitted. Names alone remain insufficient. The historical helper and checkpoint names remain compatible.

Omitted equipment stays omitted in the payload and does not clear existing selections. Explicit empty equipment arrays stay explicit. Metadata-only requests retain the transactional `existingOnly` guard, never replay workflow or Slack fields, and do not change inventory. A terminal checkpoint is skipped only when its saved authoritative response still proves a valid destination. Missing-client results keep bounded exponential retries, not false success.

The existing six-record batch limit, 20-second recovery budget, backoff, persistent fair cursor, tombstones, manual-asset protection, status-only closure sync, and split Slack ownership are unchanged. No client or asset is guessed from a work-order title.

## Tests

Run in `listener`:

```
py -3.13 -B -m unittest test_bluefolder_site_only_retry test_bluefolder_equipment_retry test_bluefolder_equipment_link test_bluefolder_destination_link test_bluefolder_close_status test_split_dispatch_ownership test_bluefolder_listener test_confirmed_tombstones
py -3.13 -B test_dispatch_root_formatting_20260921.py bluefolder_slack_listener_v2.py
```

105 module tests and 12 AST formatting tests pass (117 total), including ten new site-only regressions. The same 117 tests passed in server staging without replacing runtime source or state.

## Deployment order

1. Complete and verify the dated Firestore backup and review bounded database repairs separately.
2. Deploy and verify the app's existing-asset/site guard; do not deploy the listener first.
3. After explicit root GO, run `node deploy-listener.cjs --apply <verified-app-revision> <verified-manifest-sha256>`. The runner verifies the completed backup manifest and active app revision. The server installer pins baseline/candidate hashes and reviewed PID13284, reruns117 tests, makes timestamped source/state copies, then atomically replaces only listener source and uses the existing hidden service-manager restart.
4. Run `node verify-server.cjs`. Verify fresh heartbeat/poll, command-worker PIDs, non-regressing thread checkpoints, status-only capability, and actual destination statuses. Do not change live state to accelerate a particular work order or start a duplicate listener.

Rollback is source-only: `rollback-listener.ps1 -BackupPath <dated-backup>` previews, and `-Apply` restores only the exact verified baseline source and restarts the same service. It never restores state/checkpoints or changes the database. Do not commit credentials, live state, raw snapshots, full API responses, or operational logs.
