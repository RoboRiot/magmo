# Pre-retry production baseline — 2026-09-25

This directory records the exact production identities immediately before the
bounded BlueFolder equipment retry release. It is rollback provenance, not a
standalone deployable website or listener package.

The website baseline is active revision `nextserverwest-00058-mex`, source
generation `1790292582304947`, with verified full artifact SHA-256
`1f3ef2ce160bf1ec0f8d391942799f85f4a266e64b7782453cf616ce27b69e87`.
That release added the nested-site helper preserved here byte-for-byte. The
composition, deployment, and live-verification receipts are retained under
`receipts/`.

The composition run recorded the exact `lib/ops/workOrders.js` SHA-256 as
`70d8f9509ff5f3488a0ebc1f36273d025a1eeecfb9348f6502e31b7c208917e2`,
but did not retain that raw source file. It is deliberately not reconstructed
from compiled output or replaced with a different checkout. A website rollback
must use the separately secured, verified full production archive whose hash is
recorded in `baseline-manifest.json`. At verification time that archive was at
`C:\Users\mack2\Desktop\code\tmp\work-order-equipment-link-20260925\source.zip`.
It is deliberately excluded from Git; rebuilding this Git commit is not a valid
production rollback.

The listener snapshot is a fresh exact copy from the running server before this
release. Its SHA-256 is
`81df567ea140cba4551b3b205c1cf9ac151df6cee24982b1275cec1a9426bccc`.
A listener rollback must compare the live source and runtime state first, then
restore only this source file through the guarded server workflow.

No credentials, environment files, database records, preimages, production
ZIPs, compiled chunks, logs, locks, or listener runtime state are stored here.
