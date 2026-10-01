# New Item fixed AIS prefix — 2026-10-01

Live verification passed for revision `nextserverwest-00075-rod`, build `newitem-ais-prefix-2d70e4e4fd80c199`: 24 assets, the New Item page, and 2 read-only API probes passed. Runtime configuration, Firestore rules, and Hosting were unchanged. The deployed source generation is `1790869540632509`, archive SHA-256 `8f7046a9121d8076cf4be67701cd2612ff5084c7bbd25a776c8ac09606ee63fb`.

This small UI release displays a fixed, non-editable `AIS` prefix beside New Item's Local SN field. Users enter the numeric portion; pasting a complete AIS value also works. Leading zeros remain intact. Clearing the field still uses the existing unused-ID generator. The duplicate-protection and save transaction code are unchanged.

The deployment replaces only the Local SN JSX expression in NewItem's existing production page factory. Required build identity/asset metadata is updated, and the old asset remains available. No helper modules, server logic, CSS, Firestore rules, runtime configuration, inventory records, or Slack behavior change.

## Provenance and QA

The fresh baseline is production revision `nextserverwest-00074-gax`, build `ais-identity-fbe50eab4b16a8e4`, source generation `1790813711063943`, archive SHA-256 `4163f16a210b8221dd371e7ccf120a4b5063e54adac7d4d83cc08edde447aff1`. It is the verified prior release, recorded at commit `b39e3b57f92ffe0b71f7fb1ce9145baef9abc238` and tag `magmo-ais-identity-fix-20260930`.

The full NewItem source snapshot is provenance only, not a complete build or a claim that the entire source file was redeployed. The exact reversible expression replacement and final artifact hashes define this release. Tests evaluate the actual JSX expressions and exercise the compiled page through credential-free, loopback-only browser fixtures. The prior release's database safeguards are reused without modification.

Shared review tooling and the original browser harness are already preserved under `../2026-09-30-ais-identity-duplicate-fix/candidate`: `tool-dependencies/factory-tools.cjs`, `tools/factory-utils.cjs`, and `browser-harnesses/tmp/ais-duplicate-newitem-browser-20260930.cjs`. They are referenced by hash rather than duplicated here. Tools and tests retain their reviewed original workspace-relative paths; reproduce that layout before use.

## Rollback and safety

Rollback must use the exact baseline production source archive, not a rebuilt checkout. The archive remains outside Git at `tmp/newitem-ais-prefix-20261001/deployment/source.zip`, and is recoverable from bucket `gcf-v2-sources-177857525147-us-west2`, object `nextServerWest/function-source.zip`, generation `1790813711063943`. Verify the SHA-256 above. The guarded rollback tool requires separate authorization for `--apply`, refuses to overwrite a newer deployment, and restores application source only. There is no database or rules rollback for this UI-only release.

This record excludes database backups/documents, credentials, private configuration, screenshots, compiled archives, and unrelated source. Final live and release approval receipts must pass before publication. A new dated tag is created only after approval; prior tags are never moved.
