# Work-order selected-machine linkage — 2026-09-24

This release preserves the equipment selected on a BlueFolder work order, resolves that equipment to a verified Magmo machine, and refuses inventory scanning or confirmation when a selected machine cannot be linked safely or an automatic link needs review.

The matcher prefers an existing immutable equipment-ID mapping. Its fallback requires one exact normalized machine name within the already verified BlueFolder site; it does not choose between duplicate names, selected multiple machines, conflicting IDs, or unavailable machine records. Automatic links retain the selected equipment-ID evidence, so a later changed or removed selection requires review rather than silently using a stale machine. Manual machine selections remain separate from those automatic stamps.

The listener forwards selected equipment metadata for new imports and performs bounded metadata-only refreshes for existing work orders. Refresh requests set `existingOnly: true`; the API checks existence/deletion inside the transaction so a refresh cannot recreate a deleted work order. Missing equipment fields are distinct from an explicitly empty selection. Existing workflow, assignment, and Slack-dispatch ownership are preserved.

The website release is an overlay on an exact archived production deployment. It is **not** a broad rebuild from this repository and is not a merge of the main development working tree. That working tree contains unrelated unfinished changes, and the existing production deployment contains previously released fixes that must remain intact.

## Files and provenance

- `source/` is the allowlisted source snapshot used to compose this release. Its paths and hashes are recorded in `composition-report.json`; it is not a complete independently buildable website checkout.
- `tools/` records the exact production-snapshot and overlay composition tooling. The tools require the existing authenticated deployment environment and the separately retained production archive. They do not contain credentials.
- `tests/` preserves the scoped JavaScript regression tests. `scripts/` preserves the source-only guarded repair and independent verifier. These are archival copies: restore their original repository-relative paths into a complete compatible working checkout to run them. The repair's fixed identifier allowlist is code, not an export of customer records; its live mapping plan and preimages are excluded.
- `baseline.json` identifies the production function revision and source-archive SHA-256 before this overlay.
- `composition-report.json` records source hashes, generated build identity, modified archive entries, and the verification that unrelated files and existing immutable assets were preserved.
- The listener implementation and its regression tests are maintained under the repository's `scripts/` directory. The preceding commit preserves the exact running listener before this fix.

Database exports, item records, work-order records, migration preimages, runtime state, secrets, and raw production archives are deliberately excluded from Git. Dated database backups and runtime snapshots remain in secured operational storage. Source tracking is not a substitute for a database backup.

## Deployment procedure

1. Read the active Cloud Function revision and source generation. Download that exact generation and re-read the active configuration to ensure it did not change during the snapshot.
2. Verify the baseline archive checksum. Compose only the allowlisted server changes and the Work Order Add client-side explanation from this source snapshot. Preserve every unrelated archive member and all previously served immutable assets.
3. Verify every source hash against `composition-report.json`, parse the generated JavaScript, and run the import, matching, inventory movement, scanner capture, and selector regression tests.
4. Deploy the website/API overlay before enabling a listener that sends the extended equipment metadata. Use a fresh build identity for the new browser asset; do not replace an existing immutable asset with different content.
5. Verify live API health/contract version, function revision, browser asset identity, and work-order destination options.
6. On the warehouse server, check the running listener's exact source hash, retain a dated source/state backup, run the Python regression suite, atomically replace only the listener source, and restart only its managed worker. Do not replace runtime state or unrelated scanner, label-printing, or command-report processes.
7. Any reviewed database correction requires its own verified full dated backup, fresh preimages, and a guarded transaction. Preserve prior item history and work-order movement receipts. Do not infer machine identity from a global model-name match.

Deployment receipts are appended after successful live verification; a source commit by itself is not proof of deployment.

## Rollback

For a website rollback, restore the retained exact pre-release production artifact using the approved deployment workflow and verify its checksum and function health. Do not rebuild an older Git commit over the current production archive or reset the development working tree.

For the listener, recover the prior source blob or dated server backup and verify its SHA-256 before a targeted restart. Preserve the live runtime state. Disable the new metadata refresh before rolling the API back to a version that does not accept its payload.

Database rollback is separate from application rollback. Use the dated verified backup and per-document repair preimages; never overwrite newer inventory edits with an older collection wholesale. Review any intervening edits and preserve all original audit receipts.
