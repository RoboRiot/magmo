# Magmo warehouse scanner server

This package replaces the legacy global keyboard listener with a device-bound
scanner bridge. It supports the normal Magmo item lookup behavior and the new
staged Scan In workflow for bins and pallets, plus callback-based capture during
Work Order Add, without treating fast human typing as scanner input.

The bridge is intentionally fail-closed:

- Input is accepted only from an explicitly calibrated HID device path **or**
  an explicitly selected serial port.
- Standalone CLI startup fails if neither source is configured or both are
  configured. Embedded print-server mode keeps its existing routes alive but
  reports the authenticated scanner controls as unavailable (HTTP 503).
- Learning mode never creates a browser opener, Flask bridge, or network client.
- Only one process may own the scanner. Never run the legacy
  `warehouse_scanner.py` global hook or any separate global scan-to-page opener
  beside this service. Idle page opening is part of this unified bridge.
- Scan In events are staged in Magmo. Inventory is not changed until the user
  presses **Confirm** in Magmo.

## Files and responsibilities

- `warehouse_scanner/device_input.py` owns device-specific HID/serial capture.
- `warehouse_scanner/storage_scan_bridge.py` owns authenticated start/drain/stop
  sessions, callback buffering/draining, expiry, retry, and safe idle navigation.
- `warehouse_scanner/storage_label_print.py` owns the dedicated 4×6 bin and
  pallet ZPL format and the authenticated `/print-storage-label` route.
- `warehouse_scanner/warehouse_scanner.py` provides discovery, calibration,
  runtime lifecycle, and a production Waitress entry point.

The complete web/server protocol is also documented in
`../docs/storage-unit-scanner-handoff.md`.

## Install

Use a dedicated virtual environment on the Windows machine physically connected
to the scanner:

```powershell
cd C:\path\to\magmo\scanner-server
py -3 -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

Do not copy the old Firebase service-account JSON into this directory. The
scanner bridge needs no Firebase Admin credential.

## Discover and calibrate the physical scanner

Connect the scanner, then list supported interfaces:

```powershell
.\.venv\Scripts\python.exe -m warehouse_scanner.warehouse_scanner --list-devices
```

For an HID/keyboard-wedge scanner, choose a physical label whose exact value is
known. Learning accepts that exact value only after it is scanned at least twice
from the same device; arbitrary fast typing and a single accidental input are
rejected. Learning never opens Magmo and never sends network traffic:

```powershell
.\.venv\Scripts\python.exe -m warehouse_scanner.warehouse_scanner --learn-device "KNOWN-LABEL-VALUE"
```

If the label value should not remain in shell history, omit it and enter it at
the private prompt:

```powershell
.\.venv\Scripts\python.exe -m warehouse_scanner.warehouse_scanner --learn-device
```

Copy the resulting `SCANNER_DEVICE_MATCH=...` line into the service's private
environment. Re-run calibration after replacing the scanner, moving it to an
interface that changes its device identity, or reinstalling a driver that
changes the HID path.

For a scanner intentionally configured as USB serial, use `--list-devices` and
set `SCANNER_SERIAL_PORT` to its explicit port, for example `COM7`. Never select
a serial port by position and never assume an unrelated existing COM port is the
scanner. Do not set `SCANNER_DEVICE_MATCH` at the same time.

Optional input controls:

```dotenv
SCANNER_MAX_CODE_LENGTH=180
SCANNER_SERIAL_BAUD=9600
SCANNER_IDLE_FLUSH_MS=180
SCANNER_FRAME_TERMINATORS=ENTER,TAB
```

`SCANNER_IDLE_FLUSH_MS=0` disables suffix-free idle flushing. A nonzero idle
flush is safe here only because input has already been restricted to the exact
scanner device or serial port; it is never used as evidence that ordinary fast
typing came from a scanner.

## Private service environment

Create a private dotenv file outside source control, for example
`C:\ProgramData\MagmoScanner\scanner.env`, and limit its Windows ACL to the
service account and administrators. Do not use a command-line token, commit the
file, paste it into tickets, or log its contents.

Required bridge values:

```dotenv
STORAGE_SCAN_BRIDGE_TOKEN=<copy privately from Magmo's ignored .env.local>
SCANNER_DEVICE_MATCH=<exact learned HID match>
```

Use `SCANNER_SERIAL_PORT=<explicit COM port>` instead of
`SCANNER_DEVICE_MATCH` for serial mode. The shared token must exactly match
`STORAGE_SCAN_BRIDGE_TOKEN` in Magmo's private environment and must contain at
least 32 characters.

Do not put callback URLs or callback bearer capabilities in this file. Magmo
supplies a short-lived callback URL and one-time session capability in each
authenticated start request. The bridge keeps those values in memory only and
must never log start bodies, callback headers, raw scan codes, or tokens.

## Register routes in the one port-5000 process

The print API and scanner bridge must share one Flask process. Do not start a
second Flask development server on port 5000. In a legacy combined entry point,
reuse its existing embedded runtime; never call `build_embedded_runtime` a
second time or register the scan routes twice. Insert only the storage-label
route registration after the existing `print_label` function is defined and
before Waitress starts serving. For the existing combo server, the insertion is:

```python
from warehouse_scanner.storage_label_print import register_storage_label_routes

register_storage_label_routes(
    app,
    authorize=storage_scan_bridge.authorize,
    printer=print_label,
)
```

The warehouse combo entry point constructs `scanner_runtime` once and exposes
its bridge as `storage_scan_bridge`. Reuse those existing objects. Only a server
that has no embedded runtime at all should build one, exactly once, using
`build_embedded_runtime`.

Run `register_storage_label_routes` exactly once and only after the existing
`print_label` function is defined. Its callback must raise an exception or
return `False` if RAW printing fails; it must not swallow a printer error and
report success. The dedicated
storage-label route does not call the legacy item-label parser, so a bin or
pallet print never asks for or requires an item `name`.

Register exactly once. Do not enable Flask's debug reloader: it creates a second
process and can duplicate the device hook. Serve the combined `app` with a
single Waitress process.

`build_embedded_runtime` deliberately preserves the existing print service when
scanner selection is missing or the selected device cannot be opened. It still
registers the authenticated start/drain/stop routes and keeps the bridge marked not
ready, so Magmo receives a sanitized `503 scanner_input_unavailable` response
instead of a misleading route-level 404. Once the device issue is fixed,
restart the combined service so the input starts before readiness is enabled.
Missing bridge-token configuration remains a hard startup error because it is
not safe to expose control routes without their credential.

The package CLI remains strict and exits when the input configuration/device is
unavailable. It is appropriate only when this package is itself the sole owner
of the complete port-5000 app:

```powershell
.\.venv\Scripts\python.exe -m warehouse_scanner.warehouse_scanner `
  --env-file C:\ProgramData\MagmoScanner\scanner.env `
  --host 127.0.0.1 `
  --port 5000
```

Binding loopback is sufficient when ngrok runs on the same Windows machine and
avoids exposing an unauthenticated LAN socket. The public scanner-control routes still
require the shared Bearer token using timing-safe comparison.

## Session behavior

Magmo calls these routes through the configured fixed ngrok origin:

- `POST /storage-scan/start`
- `POST /storage-scan/drain`
- `POST /storage-scan/stop`
- `POST /work-order-scan/start`
- `POST /work-order-scan/drain`
- `POST /work-order-scan/stop`
- `POST /print-storage-label`

While no capture session is active, a scan from the calibrated physical device
may open only a canonical `https://magmo.cloud` item, bin, or pallet page. The
bridge rejects arbitrary scanned URLs. While a session is active, scans never
open a browser—even when a callback fails. They are delivered to the per-session
Magmo callback and retried idempotently with the same event ID. Device input
only enqueues the callback; up to two callback deliveries run separately, so a
fast burst is retained instead of blocking the scanner on HTTP or Firestore.

Before Magmo confirms a storage or Work Order list, it calls the corresponding
`/drain` route. Drain immediately stops accepting new frames for that session,
keeps queued callbacks alive, and reports `pendingEventCount` until `drained` is
true. Magmo then resolves its bounded lookup queue and saves only the fresh,
complete list. Stop releases the scanner lease after that handoff.

Magmo temporarily recognizes a 404 `scanner_drain_unsupported` response and
performs three final settle polls for an older bridge. That compatibility path
cannot guarantee burst completeness. Rapid scanning is not operationally ready
until this server exposes both drain routes and returns `drained=true`.

A Work Order Add session shares that same exclusive lease and callback queue as
storage Scan In. Magmo's authenticated start signal must include the exact
Work Order callback URL, its one-time bearer capability, and its expiry:

```json
{
  "schemaVersion": 1,
  "sessionId": "work_order_capture_2cY7Hm_Iw0O",
  "target": { "type": "work-order-add", "workOrderId": "10490" },
  "callback": {
    "url": "https://magmo.cloud/api/items/work-order-add/scan-sessions/work_order_capture_2cY7Hm_Iw0O/events",
    "bearerToken": "one-time-per-session-capability",
    "expiresAt": "2026-09-01T17:05:00.000Z"
  }
}
```

Every completed frame from the configured HID **or serial/COM** scanner is sent
to that callback. Work Order capture does not depend on the scanner typing into
a focused browser field. Confirm drains the queue before stopping; cancel,
failure, or local expiry stops immediately. Stop scrubs the callback capability
and restores normal idle page opening.

Start is idempotent only when the session ID, target, callback URL/capability,
and expiry match the active lease; changed settings or another active session
are rejected. Stop applies only to its matching active session. Expiry clears
the callback capability locally. Neither the bridge token nor callback token is
sent to the browser or written to Firestore in plaintext.

## Dedicated storage labels

`POST /print-storage-label` requires the same private bridge Bearer token and
an exact `storage-unit-v2` JSON payload generated by Magmo. The printer module
uses the existing ZD621 203-dpi 4×6-inch envelope (`^PW820`, `^LL1180`).

- Bins print `Bin N` at the top, then current item names with each item's Code
  128 serial barcode and AIS number. One to five rows use the normal size, six
  to ten scale down, and larger bins continue on additional labels (ten rows
  per label) without dropping contents.
- Pallets print in landscape orientation while retaining the printer-safe
  portrait media envelope. The label has a large `P[number]` heading and a
  centered grid of linked bins; every bin tile includes its own Code 128
  `AIS-B#####` barcode beneath `B[number]`. Up to 15 bins fit on one label and
  larger pallets continue on additional labels.
- Every page prints the storage serial (`AIS-B#####` or `AIS-P#####`) as a Code
  128 barcode at bottom left and a phone-scannable QR for the Magmo storage page
  at bottom right.

Magmo derives the item/bin list server-side from current Firestore membership;
the browser sends only `{ "unitId": "B47" }` to Magmo and cannot substitute
label contents.

## Start, restart, and Windows service setup

Production on `AIS-Warehouse` uses
`C:\Users\Owner\Desktop\warehouse`, commit
`18424caf253f90c98883454f9bf824d0ace82983`, and rollback tag
`storage-label-fast-scan-deploy-20260904-v2`. The dated pre-cutover backup is
`C:\Users\Owner\Desktop\warehouse\maintenance_backups\20260904T111000-pre-storage-label-fast-scan`
(manifest SHA-256
`030AC3A9A6B4D1DDF65A80AFDB3BFE693DCE15A439C825370D4D41DB0BCC5ABC`).

After integrating the scanner routes into the combined app:

1. Stop the legacy global-hook listener and its Flask debug process.
2. Confirm no second process owns the scanner or port 5000.
3. Start the combined Waitress service in the logged-on warehouse user's
   interactive Windows session with the private environment injected. Windows
   Raw Input cannot acquire the scanner from an SSH/service session 0.
4. Start the fixed-domain ngrok tunnel to `http://127.0.0.1:5000`.
5. Keep the existing hidden Startup-folder launcher/supervisor, with the app
   starting before ngrok. For maintenance over SSH, use a temporary Task
   Scheduler action with the logged-on user's `InteractiveToken`, confirm the
   child process is in the console session, then remove that exact temporary
   task. Do not leave a scanner-owning process in session 0.

For a restart, stop ngrok first so new requests cannot reach a half-stopped app,
stop the Waitress service, start Waitress and wait for local readiness, then
start ngrok. Do not kill only the device-input thread or launch a temporary
legacy listener during maintenance.

## Verification checklist

Deployment status (2026-09-04): the remote Python suite, combined-service health
check, authentication guards, credential parity, and authenticated public
storage and Work Order start/drain/stop controls passed. The physical ten-scan
burst, ordinary-keyboard/idle-scanner behavior, and actual bin/pallet label
prints remain operator acceptance checks.

Perform these checks after installation, device replacement, or restart:

1. `--list-devices` shows the intended interface and normal startup rejects an
   empty, ambiguous, or dual HID/serial configuration.
2. With no session active, quickly type text containing digits on the regular
   keyboard. No Magmo window opens and no callback is sent.
3. Scan a known item with the calibrated scanner. Its canonical Magmo page opens
   once; a scanned arbitrary URL does not open.
4. An unauthenticated or wrong-token request to start, drain, stop, and storage
   print receives
   `401`; never include the real token in a command saved to shell history.
5. Open a bin's **Scan In** modal. Start succeeds, each physical scan appears
   once in the staged list, and no browser window opens.
6. Remove a staged scan and press **Cancel**. Inventory remains unchanged.
7. Start again, stage a controlled item, and press **Confirm**. The item and
   destination show the same placement and history in Magmo.
8. For a pallet, verify an item and a bin are distinguished; previewing a bin
   shows its contents before confirmation.
9. Open Work Order Add and explicitly enable scanner capture. Verify each HID or
   serial scanner read appears once in the Work Order staged list and opens no
   item page. Cancel/stop capture, then verify the next idle scanner read opens
   its one canonical Magmo page again.
10. Restart the service and ngrok, then repeat fast typing and one controlled
    Scan In cycle to verify persistence and single ownership.
11. Scan a burst of at least ten disposable test labels faster than their
    previews can load. Verify every row appears once, Confirm waits for drain,
    and no read opens a browser tab during the active/draining session.
12. Print one populated bin and one pallet. Verify no name prompt appears, all
    expected pages print, and both footer barcodes and QRs open the right record.

Use a disposable/test inventory record for the confirmation check. Never test
confirmation with an unknown production item.

## Troubleshooting

- **Startup refused:** confirm exactly one of `SCANNER_DEVICE_MATCH` and
  `SCANNER_SERIAL_PORT` is configured, the private token is present, and the
  selected device is connected.
- **Scanner was replaced:** run learning again; do not broaden the HID match to
  include every keyboard.
- **Magmo reports bridge failure:** verify Waitress first, then ngrok, then that
  the fixed ngrok origin routes to this one port-5000 process.
- **Print works but Scan In returns 404:** the legacy print-only process is still
  running or `register_storage_scan_routes(app, bridge)` was not called.
- **Item labels print but storage labels return 404:** copy
  `storage_label_print.py` and register `register_storage_label_routes` in the
  same combined Flask process after `print_label` is defined.
- **Duplicate scans:** verify only one scanner process exists and the Flask
  debug reloader is disabled. Do not change event IDs during callback retries.
- **Browser opens during an active capture:** stop the service and investigate;
  storage and Work Order sessions must never invoke the browser opener, even
  after callback errors.
