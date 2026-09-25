# Pre-recovery production baseline — 2026-09-25

This directory records the exact production identities immediately before the
site-only recovery deployment. It is rollback provenance, not a standalone
website or listener package.

The website baseline is active revision `nextserverwest-00059-vak`, source
generation `1790360606589691`, full archive SHA-256
`f12adcb6fa2a4abcbd7c3de24671dcdeae9bb48924b452450026188d1b7d9427`,
and build ID `wo-machine-link-31372590b5701129`. The full rollback archive is
retained outside Git at
`C:\Users\mack2\Desktop\code\tmp\work-order-existing-asset-site-guard-20260925\source.zip`.
Use that archive and the guarded external rollback workflow; this source
snapshot is not a byte-equivalent rebuild.

The listener baseline is the exact prior production source, version
`2026.09.25-bluefolder-equipment-retry.1`, SHA-256
`d9f9fa8c6ef543a9d5062f3a8c2a3cafd043644519aea4b9354d2989e07a148f`.
Its exact dated server copy is recorded in the candidate deployment receipt.
Rollback restores source only and preserves runtime state and Firestore.

No credentials, raw database records, preimages, full ZIP archives, compiled
chunks, listener state, environment files, logs, or locks are stored here.
