# Website rollback baseline

This release starts from the exact production source archive for revision
`nextserverwest-00061-rej`, source generation `1790369259300423`, with archive
SHA-256
`075a5c40481f4e9f8b83261995cecd8be22c435d8ba89badf40f27cf97e9ae77`.
The captured runtime-configuration SHA-256 is
`de4d951c93305fd1ae8a781baae316a87b52f5e8825a907a736c0f427eb147fc`.

The production ZIP is intentionally excluded from Git. It is retained at
`C:\Users\mack2\Desktop\code\tmp\work-order-warehouse-slack-20260925\deployment\source.zip`.
Use that exact archive with the reviewed source-only rollback guard; do not
rebuild this Git record and treat the result as equivalent. Rollback does not
restore Firestore data, inventory history, or Slack records.

The JSON inventories in this directory are hash-only provenance for the active
baseline. They contain no credentials or production data export.
