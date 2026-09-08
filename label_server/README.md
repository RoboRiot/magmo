# Warehouse combined label service

`print_bluefolder_combo.py` is the production combined scanner, BlueFolder, and
label-printing entry point used at
`C:\Users\Owner\Desktop\warehouse\label_server\print_bluefolder_combo.py`.

The regular item label explicitly uses an 820 × 1180-dot 4 × 6 layout. Its
footer keeps the PO text, Code 128 serial, and phone QR above the Zebra tear
edge. The QR encodes the canonical Magmo item URL; the barcode encodes the item
AIS number.

Run the combined-service regression tests from the warehouse root with:

```powershell
& "C:\Program Files\Python314\python.exe" -m unittest `
  label_server.test_magmonitor_proxy `
  label_server.test_storage_scan_bridge
```

The 2026-09-08 production cutover rollback is stored on the warehouse server at
`C:\Users\Owner\Desktop\warehouse\maintenance_backups\20260908T163639-pre-regular-label-qr-clearance`.
