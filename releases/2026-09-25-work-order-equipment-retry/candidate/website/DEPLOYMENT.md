# Guarded BlueFolder equipment-link release

This release starts from the exact active `nextServerWest` production source archive (`nextserverwest-00058-mex`) rather than rebuilding the dirty root tree. It overlays only `machine-link/workOrderMachineLink.cjs` and `.next/server/chunks/8806.js`. The existing nested-site helper, browser build, runtime, entry point, configuration, and all other source files remain byte-identical.

The matcher keeps exact canonical BlueFolder equipment IDs authoritative. Its fallback is limited to one active machine at the already verified client whose structured model matches after deterministic edge-token normalization. It never uses substring, edit-distance, subject, or trailer-name matching. Conflicting manufacturer/modality/model aliases and duplicate candidates fail closed. Import responses now include response-only `after.equipmentLinkStatus` and `after.equipmentLinkIssue`; no persisted schema is added.

After root review, use these commands from the repository root:

1. `node --test tmp/work-order-equipment-link-20260925/verify-artifact.test.cjs`
2. `node tmp/work-order-equipment-link-20260925/package.cjs --root-reviewed`
3. `node tmp/work-order-equipment-link-20260925/deploy.cjs` (read-only preflight)
4. `node tmp/work-order-equipment-link-20260925/deploy.cjs --apply` (single explicit source-only submission)
5. `node tmp/work-order-equipment-link-20260925/deploy.cjs --status` (repeat only while the recorded operation is pending)
6. `node tmp/work-order-equipment-link-20260925/verify-live.cjs` (read-only checks for deployed bytes/config, computes work order 10677's status with the deployed helper against its saved metadata, and confirms work order 10659 is still linked to AIS20; the listener verifies the actual HTTP import response separately)

Keep `source.zip` as the immutable rollback archive. Rollback is also guarded and source-only: run `node tmp/work-order-equipment-link-20260925/rollback.cjs` to inspect the plan, then `rollback.cjs --apply` only if rollback is authorized, followed by `rollback.cjs --status`. Deployment and rollback refuse stale baselines and refuse to repeat once a receipt exists. Protected cloud credentials are loaded by the existing helper and never printed.
