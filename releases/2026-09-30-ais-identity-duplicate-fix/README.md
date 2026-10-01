# AIS identity safeguard release — 2026-09-30

Live verification passed for application revision `nextserverwest-00074-gax`, build `ais-identity-fbe50eab4b16a8e4`. This record contains sanitized source snapshots, tests, release tools, exact rules, and hash-bound evidence. It does not contain production database records, backup contents, credentials, private runtime configuration, screenshots, or deployment ZIPs.

## Scope and cause

Bare numeric AIS input previously remained a different Firestore document ID from its `AIS`-prefixed form. Exact-path duplicate checks therefore missed the existing identity, while prefixed SKU searches could hide the numeric record. The fix canonicalizes new identities, protects create/rename transactions against existing and retired aliases, rejects stale-client noncanonical creation in Firestore rules, and searches canonical and legacy identities without merging distinct documents. Ordinary legacy edits and historical rename/archive receipt semantics remain intact. The server-side shipment creation path uses the same safeguards.

This deployment did not delete, rename, merge, repair, or otherwise write inventory records. Existing ambiguous records must be reviewed separately; a successful deployment is not authorization to clean them up.

## Exact provenance

- Approved deployment ZIP SHA-256: `4163f16a210b8221dd371e7ccf120a4b5063e54adac7d4d83cc08edde447aff1`.
- Production source generation: `1790813711063943` in `gcf-v2-sources-177857525147-us-west2`, object `nextServerWest/function-source.zip`.
- Composition report SHA-256: `0f2dc1bdc50db9799b248a852a14acdd75d4c42133c9d5d7a54053c38c0559f4`.
- Published rules SHA-256: `ea0411223d929c3e2147ff156a67b90ef79e4764e6a8615954cec84e6a055337`; ruleset `9fbba28a-e360-401c-8d83-aa7948cc08c0`.
- Git parent `bdc164e0d7ffcb9d0979dfcb0a6bc73c9aafca3f` is only the prior release-record checkpoint. It is **not** claimed to reconstruct the production baseline revision `nextserverwest-00073-vim`.

The deployed candidate was composed over the exact saved production build, not by deploying the dirty development checkout. Only the four relevant page factories, their private helper closure, the shipment service factory, and required build/asset metadata changed. Original static assets were retained. Other server code, Slack/work-order behavior, photos/history UI components, runtime packages, and runtime configuration were preserved and verified.

`candidate/source` holds the eleven exact-byte inputs frozen for compiler v5. These are provenance snapshots, not a complete independently buildable checkout, and not a claim that each entire source file was deployed. The composition reports and inverse-byte proofs define the actual deployment scope. `source-provenance.json` binds each snapshot and evidence file to its original hash. `.gitattributes` prevents Git from rewriting the recorded line endings.

The first composition was rejected before deployment because two existing UI-component module IDs were incorrectly treated as helper IDs. Its rejected artifact hash is recorded in `package-gates.json`; the rejected artifact is neither included nor releasable. Corrected v2 preserves the photo/history component imports and wires the actual guarded warehouse and editor-operation helpers.

## Verification

The hash-bound receipts record 8 actual compiled NewItem browser cases, 12 existing editor/photo/history browser cases, 12 compiled shipment tests, 24 compiled search checks, and 17 real Firestore-emulator checks. The final ZIP was independently decompressed and all 555 entries hashed. Live verification checked 34 assets, 3 pages, 7 read-only API probes, exact deployed archive/rules hashes, and unchanged configuration. Browser and emulator tests used synthetic data and loopback-only infrastructure; no test Slack posts or production database writes occurred.

The actual NewItem harness, editor wrapper, and original editor harness are included under `candidate/browser-harnesses`. They retain their original relative-path assumptions. Reproduce them in the original workspace layout with the recorded deployment archive, matching dependencies, and the documented `--artifact` argument; do not run copied tools blindly from this record directory. `candidate/tools` likewise preserves the exact reviewed tools rather than silently rewriting their paths or approval checks. `candidate/tool-dependencies` contains their small source dependencies, including a loader for an already authenticated local Firebase CLI session, **not credentials**. Compile/QA dependencies, the original source archive, and private authorization/configuration files are deliberately excluded.

## Backup and rollback

The dated Firestore logical backup remains outside Git at `outputs/firestore-backups/2026-09-30-ais-duplicate-prechange`. Its manifest hash is `b930b2708c5e3362f36271dc01c5143a5f645a618994389e21e7b644b4cb24cb`; its data-file hash is `1fe112d9e4ab4b80261fbdd72aafb69e9df894c56c6aa4afe014a249c586eac0`. It covers 195,267 documents across 1,101 collection paths. This was a logical backup during concurrent activity, not an atomic point-in-time export; targeted preimages supplement it. It does not back up Storage files or Auth.

Application rollback is pinned to the original production source generation `1790798667770957`, same bucket/object as above, archive SHA-256 `aa11589ca9646673033a0bb6431e03d14197da605860f405365830a42c4acc14`, originating revision `nextserverwest-00073-vim`. The saved original archive is `tmp/ais-duplicate-fix-20260930/deployment/source.zip`, outside Git. Verify its hash before use. Do not substitute a build from the prior Git checkpoint.

In the original deployment directory, `node rollback.cjs` and `node rollback-rules.cjs` are read-only preflights. An actual rollback requires separately reviewed `rollback-approval.json` and an explicit `--apply`. Each refuses to overwrite a later deployment/rules release, journals submission once, and uses `--status` to resume an uncertain operation. Application rollback changes source only: it does not restore rules or database contents. Rules rollback separately targets ruleset `39fd0c80-5269-49f3-b90d-1af5de77f3b8`, SHA-256 `44c113e893551ae7da25eb6845b74573821afd29a4c4fc6d391b9009c32e1203`. No rollback or data restore was performed for this release.

Use a new dated tag for the reviewed release commit; never move an earlier tag. Committing or pushing this record requires explicit root approval after review of the staged file/hash manifest.
