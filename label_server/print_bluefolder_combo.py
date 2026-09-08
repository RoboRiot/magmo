from flask import Flask, Response, request, jsonify
from flask_cors import CORS
from datetime import datetime
import atexit
import json
import requests
import xml.etree.ElementTree as ET
import win32print
import win32ui
import textwrap
import os
from pathlib import Path
import sys
import time
from werkzeug.exceptions import RequestEntityTooLarge


WAREHOUSE_ROOT = Path(__file__).resolve().parent.parent
if str(WAREHOUSE_ROOT) not in sys.path:
    sys.path.insert(0, str(WAREHOUSE_ROOT))

SCANNER_SERVER_ROOT = WAREHOUSE_ROOT / "scanner-server"
if str(SCANNER_SERVER_ROOT) not in sys.path:
    # Keep the commit-pinned scanner-server package ahead of the retired local
    # scanner module so this combined process has exactly one implementation.
    sys.path.insert(0, str(SCANNER_SERVER_ROOT))

from warehouse_scanner.storage_label_print import register_storage_label_routes
from warehouse_scanner.warehouse_scanner import build_embedded_runtime

app = Flask(__name__)
# Browser callers retain the legacy cross-origin routes. The authenticated
# storage bridge is server-to-server only and deliberately receives no CORS
# headers.
CORS(
    app,
    resources={
        r"/api/magmonitor/.*": {"origins": "*"},
        r"/print_multi": {"origins": "*"},
        r"/print-label": {"origins": "*"},
        r"/bluefolder": {"origins": "*"},
    },
)

# Preserve the already-protected private JSON in place. Only the bridge token
# and the calibrated exact HID path are projected into the commit-pinned
# scanner runtime, in memory; unrelated process secrets are never forwarded.
_local_app_data = os.environ.get("LOCALAPPDATA")
SCANNER_PRIVATE_CONFIG_PATH = (
    Path(_local_app_data) / "Magmo" / "warehouse_scanner_private.json"
    if _local_app_data
    else Path.home() / "AppData" / "Local" / "Magmo" / "warehouse_scanner_private.json"
)
_local_app_data = None


def _load_scanner_runtime_environment():
    with SCANNER_PRIVATE_CONFIG_PATH.open("r", encoding="utf-8") as stream:
        document = json.load(stream)
    if not isinstance(document, dict) or document.get("schemaVersion") != 1:
        raise RuntimeError("Private scanner configuration is invalid.")

    token = document.get("bridgeToken")
    if (
        not isinstance(token, str)
        or not 32 <= len(token) <= 512
        or any(character.isspace() for character in token)
        or any(ord(character) < 32 or ord(character) == 127 for character in token)
    ):
        raise RuntimeError("Private scanner bridge credential is invalid.")

    scanner = document.get("scanner")
    if not isinstance(scanner, dict):
        raise RuntimeError("Private scanner calibration is missing.")
    device_path = scanner.get("rawInputDevicePath")
    if (
        not isinstance(device_path, str)
        or not device_path
        or device_path.strip() != device_path
        or ";" in device_path
        or "\x00" in device_path
        or device_path.casefold() in {"*", "?", "all", "any", "keyboard"}
    ):
        raise RuntimeError("Private scanner calibration is not an exact HID path.")

    runtime_environment = {
        "STORAGE_SCAN_BRIDGE_TOKEN": token,
        "SCANNER_DEVICE_MATCH": f"exact:{device_path}",
    }
    document.clear()
    token = None
    device_path = None
    return runtime_environment


_scanner_runtime_environment = _load_scanner_runtime_environment()
scanner_runtime = build_embedded_runtime(app, environ=_scanner_runtime_environment)
_scanner_runtime_environment.clear()
_scanner_runtime_environment = None
storage_scan_bridge = scanner_runtime.bridge


def start_scanner_input():
    """Start the commit-pinned scanner runtime exactly once in this process."""
    started = scanner_runtime.start()
    if started:
        print("Exact-device Raw Input scanner listener started.", flush=True)
    else:
        print("Exact-device Raw Input scanner listener is unavailable.", flush=True)
    return started


def stop_scanner_input():
    """Stop scanner capture and scrub any in-memory session capability."""
    scanner_runtime.close()


atexit.register(stop_scanner_input)

# Printer name for the print-label endpoint.
PRINTER_NAME = "ZDesigner ZD621-203dpi ZPL"

# BlueFolder API credentials and endpoints.
API_TOKEN = os.environ.get("BLUEFOLDER_API_TOKEN", "")
ITEMS_URL = "https://app.bluefolder.com/api/2.0/items/add.aspx"
MATERIALS_URL = "https://app.bluefolder.com/api/2.0/serviceRequests/addMaterial.aspx"
HEADERS = {"Content-Type": "text/xml"}
ITEM_URL_BASE = "https://magmo.cloud/NewSearch/item/"

# MAGMO telemetry enters through the existing ngrok/Werkzeug service, then is
# handed to the local durable store-and-forward relay. These limits and timeouts
# apply only to the MAGMO proxy routes; the existing label routes are unchanged.
MAGMONITOR_RELAY_URL = os.environ.get(
    "MAGMONITOR_LOCAL_RELAY_URL",
    "http://192.168.32.31:8090/api/magmonitor/ingest",
).strip()
MAGMONITOR_RELAY_HEALTH_URL = os.environ.get(
    "MAGMONITOR_LOCAL_RELAY_HEALTH_URL",
    "http://192.168.32.31:8090/healthz",
).strip()
MAGMONITOR_MAX_BODY_BYTES = 1024 * 1024
MAGMONITOR_LOCAL_TIMEOUT_SECONDS = 4.0
MAGMONITOR_FORWARDED_HEADERS = (
    "Content-Type",
    "Accept",
    "X-Magmonitor-Key",
    "X-Magmonitor-Delivery-ID",
    "X-Magmonitor-Relay-Version",
)


def build_item_url(local_sn):
    """Return the canonical item URL encoded by every label QR code."""
    return f"{ITEM_URL_BASE}{local_sn}"


def _magmonitor_response(upstream_response):
    """Return the relay response without exposing or reshaping its body."""
    content_type = upstream_response.headers.get(
        "Content-Type", "application/json"
    )
    return Response(
        upstream_response.content,
        status=upstream_response.status_code,
        content_type=content_type,
    )


@app.route("/api/magmonitor/ingest", methods=["POST"])
def handle_magmonitor_ingest():
    """Bound and pass exact telemetry bytes to the local durable relay."""
    started = time.monotonic()
    delivery_id = request.headers.get("X-Magmonitor-Delivery-ID", "")
    content_length = request.content_length
    if content_length is not None and content_length > MAGMONITOR_MAX_BODY_BYTES:
        print(
            f"[{datetime.now()}] MAGMO proxy rejected oversized request "
            f"delivery_id={delivery_id} status=413",
            flush=True,
        )
        return jsonify({"error": "Request body exceeds 1 MiB"}), 413

    # Flask/Werkzeug enforces this while reading streamed/chunked bodies, so a
    # missing or misleading Content-Length cannot bypass the route limit.
    request.max_content_length = MAGMONITOR_MAX_BODY_BYTES
    try:
        body = request.get_data(cache=False, as_text=False)
    except RequestEntityTooLarge:
        print(
            f"[{datetime.now()}] MAGMO proxy rejected oversized request "
            f"delivery_id={delivery_id} status=413",
            flush=True,
        )
        return jsonify({"error": "Request body exceeds 1 MiB"}), 413
    if len(body) > MAGMONITOR_MAX_BODY_BYTES:
        return jsonify({"error": "Request body exceeds 1 MiB"}), 413

    forwarded_headers = {
        name: request.headers[name]
        for name in MAGMONITOR_FORWARDED_HEADERS
        if name in request.headers
    }
    try:
        relay_response = requests.post(
            MAGMONITOR_RELAY_URL,
            data=body,
            headers=forwarded_headers,
            timeout=MAGMONITOR_LOCAL_TIMEOUT_SECONDS,
            allow_redirects=False,
        )
    except requests.RequestException as exc:
        duration_ms = int((time.monotonic() - started) * 1000)
        print(
            f"[{datetime.now()}] MAGMO proxy relay unavailable "
            f"delivery_id={delivery_id} status=503 duration_ms={duration_ms} "
            f"error_type={type(exc).__name__}",
            flush=True,
        )
        return jsonify({"error": "Local MAGMO relay is unavailable"}), 503

    duration_ms = int((time.monotonic() - started) * 1000)
    print(
        f"[{datetime.now()}] MAGMO proxy completed "
        f"delivery_id={delivery_id} status={relay_response.status_code} "
        f"duration_ms={duration_ms}",
        flush=True,
    )
    return _magmonitor_response(relay_response)


@app.route("/api/magmonitor/healthz", methods=["GET"])
def handle_magmonitor_health():
    """Report whether the existing public service can reach the local relay."""
    started = time.monotonic()
    try:
        relay_response = requests.get(
            MAGMONITOR_RELAY_HEALTH_URL,
            timeout=MAGMONITOR_LOCAL_TIMEOUT_SECONDS,
            allow_redirects=False,
        )
    except requests.RequestException as exc:
        duration_ms = int((time.monotonic() - started) * 1000)
        print(
            f"[{datetime.now()}] MAGMO proxy health failed status=503 "
            f"duration_ms={duration_ms} error_type={type(exc).__name__}",
            flush=True,
        )
        return jsonify(
            {
                "status": "unavailable",
                "service": "magmonitor-public-proxy",
            }
        ), 503

    duration_ms = int((time.monotonic() - started) * 1000)
    print(
        f"[{datetime.now()}] MAGMO proxy health "
        f"status={relay_response.status_code} duration_ms={duration_ms}",
        flush=True,
    )
    return _magmonitor_response(relay_response)

def print_label(zpl_data):
    printer_handle = None
    document_started = False
    page_started = False
    try:
        printer_handle = win32print.OpenPrinter(PRINTER_NAME)
        win32print.StartDocPrinter(printer_handle, 1, ("ZPL Label", None, "RAW"))
        document_started = True
        win32print.StartPagePrinter(printer_handle)
        page_started = True
        win32print.WritePrinter(printer_handle, zpl_data.encode('utf-8'))
        win32print.EndPagePrinter(printer_handle)
        page_started = False
        win32print.EndDocPrinter(printer_handle)
        document_started = False
        print("Label sent to printer successfully.", flush=True)
        return True
    except Exception as e:
        print("Error printing label:", type(e).__name__, flush=True)
        raise
    finally:
        if printer_handle is not None:
            if page_started:
                try:
                    win32print.EndPagePrinter(printer_handle)
                except Exception:
                    pass
            if document_started:
                try:
                    win32print.EndDocPrinter(printer_handle)
                except Exception:
                    pass
            try:
                win32print.ClosePrinter(printer_handle)
            except Exception:
                pass


register_storage_label_routes(
    app,
    authorize=storage_scan_bridge.authorize,
    printer=print_label,
)

def create_multi_zpl(item, case_number, total):
    """
    Create a ZPL label for a single item using the multi-item label format.
    - item: dict with keys 'name', 'date', 'poNumber', 'local_sn', 'description'
    - case_number: sequential number for this item (1-based)
    - total: total number of items to print
    """
    # Use the same canonical URL as the regular-print label.
    qr_url = build_item_url(item["local_sn"])

    zpl = f"""
^XA
^PW820
^LL1180
^LH0,0

^FO0,30^FB820,3,0,C,0
^A0N,75,75
^FD{item['name']}^FS

^FO30,280^A0N,30,30^FDFrom: {item.get('client', '')}^FS
^FO30,320^A0N,50,50^FDArrival Date: {item['date']}^FS
^FO30,380^A0N,50,50^FDPO: {item['poNumber']}^FS
^FO30,440^A0N,50,50^FDOEM: {item.get('OEM', '')}^FS
^FO30,500^A0N,50,50^FDModality: {item.get('modality', '')}^FS
^FO30,560^A0N,50,50^FDModel: {item.get('model', '')}^FS

^FO550,360^BQN,2,8
^FDLA,{qr_url}^FS

^FO30,640^A0N,50,50^FB800,10,0,L,0
^FD{item['description']}^FS

^FO275,850^A0N,200,200^FD{case_number}/{total}^FS

^FO240,1050^BY3
^BCN,120,Y,N,N
^FD{item['local_sn']}^FS

^XZ
"""
    return zpl

# Hard-coded test mode variables:
TEST_PRINT_MULTI = False   # If True, only one label (the one at TEST_INDEX_MULTI) is printed.
TEST_INDEX_MULTI = 7     # 1-based index of the item to print in test mode.

@app.route("/print_multi", methods=["POST"])
def handle_print_multi():
    try:
        data = request.get_json()
        items = data.get("items")

        if not items or not isinstance(items, list):
            return jsonify({"error": "Missing or invalid items list"}), 400

        if TEST_PRINT_MULTI:
            if TEST_INDEX_MULTI < 1 or TEST_INDEX_MULTI > len(items):
                return jsonify({"error": "Index out of range."}), 400

            total = len(items)  # Only one label will be printed.
            # Convert 1-based index to 0-based.
            item = items[TEST_INDEX_MULTI - 1]
            name = item.get("name")
            date_str = item.get("arrival_date", "")
            po = item.get("poNumber", "")
            local_sn = item.get("local_sn") or item.get("localSN") or item.get("id")
            description = item.get("description") or (
                item.get("descriptions")[0].get("description")
                if item.get("descriptions") and len(item.get("descriptions")) > 0 else ""
            )
            # Include OEM, modality, and model even if they are empty
            OEM = item.get("OEM", "")
            modality = item.get("modality", "")
            model = item.get("model", "")
            # client: item.get("clientName", "")
            client = item.get("client", "")
            zpl = create_multi_zpl({
                "name": name,
                "date": date_str,
                "poNumber": po,
                "local_sn": local_sn,
                "description": description,
                "OEM": OEM,
                "modality": modality,
                "model": model,
                "client": client
            }, TEST_INDEX_MULTI, total)
            print(f"Test printing label for item {TEST_INDEX_MULTI} (only one printed)")
            print_label(zpl)
        else:
            total = len(items)
            for idx, item in enumerate(items, start=1):
                name = item.get("name")
                date_str = item.get("arrival_date", "")
                po = item.get("poNumber", "")
                local_sn = item.get("local_sn") or item.get("localSN") or item.get("id")
                description = item.get("description") or (
                    item.get("descriptions")[0].get("description")
                    if item.get("descriptions") and len(item.get("descriptions")) > 0 else ""
                )
                # Include OEM, modality, and model even if they are empty
                OEM = item.get("OEM", "")
                modality = item.get("modality", "")
                model = item.get("model", "")
                # client: item.get("clientName", "")
                client = item.get("client", "")
                zpl = create_multi_zpl({
                    "name": name,
                    "date": date_str,
                    "poNumber": po,
                    "local_sn": local_sn,
                    "description": description,
                    "OEM": OEM,        # default OEM value
                    "modality": modality,   # default modality value
                    "model": model,
                    "client": client      # default model value
                }, idx, total)

                print(f"Printing label for item {idx}/{total}")
                print_label(zpl)
        return jsonify({"status": "Labels printed."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Function to create ZPL string for a single label.
def create_zpl(data):
    if not data.get("name"):
        raise ValueError("Missing name")

    # 1) PN & SN processing
    pn_raw   = data.get("pn", "")
    pn_value = "\\&".join(pn_raw) if isinstance(pn_raw, list) else pn_raw
    sn_raw   = data.get("sn", "")
    sn_value = "\\&".join(sn_raw) if isinstance(sn_raw, list) else sn_raw

    # 2) Description logic (unchanged)
    descs     = data.get("descriptions", [])
    desc_text = ""
    if descs:
        try:
            latest_desc = max(
                descs,
                key=lambda d: datetime.strptime(d.get("date","1900-01-01"), "%Y-%m-%d")
            )
        except:
            latest_desc = descs[-1]
        desc_text = f"{latest_desc.get('date','')}: {latest_desc.get('description','')}"
    desc_lines = textwrap.wrap(desc_text, width=35)[:5]
    desc_field = ""
    for i, line in enumerate(desc_lines):
        y = 730 + i * 50
        desc_field += f"^FO25,{y}^A0N,50,50^FD{line}^FS\n"

    # 3) Other fields
    name      = data.get("name","")
    date_str  = data.get("date","")
    wo        = data.get("wo","")
    client    = data.get("client","")
    status    = data.get("status","")
    local_sn  = data.get("local_sn","")
    po        = data.get("poNumber","")
    qr_data   = build_item_url(local_sn)

    # 4) Estimate how many lines ZPL will actually use
    #    (75-dot font, 800-dot field ⇒ about 10 chars/line, no mid-word breaks)
    wrapped = textwrap.wrap(
        name,
        width=10,
        break_long_words=False,
        break_on_hyphens=False
    )
    num_lines = min(len(wrapped), 3)

    # 5) Layout constants
    title_y     = 30
    line_height = 75

    # 6) Build ZPL
    zpl = "^XA\n^PW820\n^LL1180\n^LH0,0\n"
    # 6a) Title: auto-wrapped up to 3 lines at 800px
    zpl += (
        f"^FO0,{title_y}"
        f"^FB800,3,0,C,0"
        f"^A0N,{line_height},{line_height}"
        f"^FD{name}^FS\n"
    )

    # 6b) PN: if title <3 lines → line 3; if title=3 lines → line 4
    pn_line_index = 2 if num_lines < 3 else 3
    pn_y = title_y + pn_line_index * line_height
    zpl += f"^FO25,{pn_y}^FB700,2,0,L,100^A0N,60,60^FDPN: {pn_value}^FS\n"

    # 6c) SN: always two lines below PN (i.e. blank line in between)
    sn_y = pn_y + 2 * line_height - 20
    zpl += f"^FO25,{sn_y}^FB700,2,0,L,100^A0N,60,60^FDSN: {sn_value}^FS\n\n"

    # 6d) Rest unchanged
    zpl += f"^FO0,500^FB790,1,0,C,0^A0N,60,60^FDDate: {date_str}^FS\n"
    zpl += f"^FO75,570^A0N,60,60^FDWO: {wo}^FS\n"
    zpl += f"^FO330,570^A0N,60,60^FD||^FS\n"
    zpl += f"^FO410,570^A0N,60,60^FDStatus: {status}^FS\n"
    # Keep the footer symbols and their scan-clear margins above the tear edge.
    zpl += f"^FO550,990^BQN,2,5^FDLA,{qr_data}^FS\n"
    zpl += f"^FO25,650^A0N,50,50^FDClient: {client}^FS\n\n"
    zpl += desc_field
    zpl += f"^FO75,990^A0N,50,50^FDPO number: {po}^FS\n"
    zpl += f"^FO75,1040^BY3^BCN,90,Y,N,N^FD{local_sn}^FS\n"
    zpl += "^XZ\n"

    return zpl


# Endpoint for printing labels.
@app.route("/print-label", methods=["POST"])
def handle_print_label():
    try:
        data = request.get_json()
        if not data or not data.get("name"):
            return jsonify({"error": "Missing name"}), 400
        zpl = create_zpl(data)
        print("Printing label with the following ZPL:")
        print(zpl)
        print_label(zpl)
        return jsonify({"status": "Label printed successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint for BlueFolder API functionality.
@app.route("/bluefolder", methods=["POST"])
def handle_bluefolder():
    try:
        data = request.get_json()
        if not data or not data.get("name"):
            return jsonify({"error": "Missing name"}), 400
        print(f"[{datetime.now()}] Received BlueFolder request: {data}")

        # Use a constant item name "Service Item" per requirement.
        unique_name = "Service Item"

        # --- Step 1: Create a new material item in BlueFolder ---
        item_payload = f"""
<request>
  <itemAdd>
    <itemType>materials</itemType>
    <itemName>{unique_name}</itemName>
    <description>Service Item</description>
    <accountName></accountName>
    <isFlatRate>false</isFlatRate>
    <mfrDescription></mfrDescription>
    <mfrItemNo></mfrItemNo>
    <mfrName>BlueFolderTestManufacturer</mfrName>
    <notes>Service item</notes>
    <taxableDefault>true</taxableDefault>
    <unitCost>0.00</unitCost>
    <unitPrice>0.00</unitPrice>
    <unitListPrice>0.00</unitListPrice>
  </itemAdd>
</request>
"""
        print(f"[{datetime.now()}] Creating new material item in BlueFolder...")
        item_response = requests.post(ITEMS_URL, data=item_payload, headers=HEADERS, auth=(API_TOKEN, 'x'))
        print("Response from Items API:")
        print(item_response.text)

        try:
            item_xml = ET.fromstring(item_response.text)
        except Exception as e:
            error_details = f"Error parsing Items API XML: {e}"
            print(f"[{datetime.now()}] {error_details}")
            return jsonify({"error": error_details}), 500

        # If creation fails due to duplicate item, log and move on.
        if item_xml.attrib.get("status") != "ok":
            if "another item that has the same" in item_response.text:
                print(f"[{datetime.now()}] Service Item already exists. Continuing with existing item.")
                # We set item_id to a default value.
                item_id = "Service Item"
            else:
                print(f"[{datetime.now()}] Failed to create material item: {item_response.text}")
                return jsonify({"error": "Failed to create material item", "response": item_response.text}), 500
        else:
            item_id_elem = item_xml.find("itemId")
            item_id = item_id_elem.text if item_id_elem is not None else None

        # --- Step 2: Add the new material item to the work order ---
        service_request_id = data.get("workOrder")
        if not service_request_id:
            return jsonify({"error": "Missing workOrder field for BlueFolder"}), 400

        now_str = datetime.now().strftime("%Y.%m.%d %I:%M %p")
        comment = (
            f"Name: {data['name']}\n"
            f"PN: {data.get('pn', '')}\n"
            f"SN: {data.get('sn', '')}\n"
            f"Status: {data.get('status', '')}\n"
            f"Local SN: {data.get('localsn', '')}\n"
            f"Description: {data.get('description', '')}"
        )
        material_payload = f"""
<request>
  <serviceRequestAddMaterial>
    <serviceRequestId>{service_request_id}</serviceRequestId>
    <dateUsed>{now_str}</dateUsed>
    <quantity>1</quantity>
    <billingStatus>billable</billingStatus>
    <itemNo>{unique_name}</itemNo>
    <itemDescription>Service Item</itemDescription>
    <itemUnitCost>0.00</itemUnitCost>
    <itemUnitPrice>0.00</itemUnitPrice>
    <comment>{comment}</comment>
    <commentIsPublic>false</commentIsPublic>
    <taxable>true</taxable>
  </serviceRequestAddMaterial>
</request>
"""
        print(f"[{datetime.now()}] Adding material to work order {service_request_id}...")
        material_response = requests.post(MATERIALS_URL, data=material_payload, headers=HEADERS, auth=(API_TOKEN, 'x'))
        print("Response from Service Request API:")
        print(material_response.text)

        try:
            material_xml = ET.fromstring(material_response.text)
        except Exception as e:
            error_details = f"Error parsing Materials API XML: {e}"
            print(f"[{datetime.now()}] {error_details}")
            return jsonify({"error": error_details}), 500

        if material_xml.attrib.get("status") != "ok":
            print(f"[{datetime.now()}] Failed to add material to work order: {material_response.text}")
            return jsonify({"error": "Failed to add material to work order", "response": material_response.text}), 500

        print(f"[{datetime.now()}] BlueFolder service item added successfully!")
        return jsonify({
            "itemId": item_id,
            "itemResponse": item_response.text,
            "materialResponse": material_response.text,
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print(f"[{datetime.now()}] Starting combined server on port 5000...", flush=True)
    start_scanner_input()
    # Run one production process so the scanner device and printer remain
    # single-owner resources while HTTP callbacks can be handled concurrently.
    try:
        from waitress import serve

        serve(
            app,
            host="0.0.0.0",
            port=5000,
            threads=8,
            clear_untrusted_proxy_headers=True,
        )
    finally:
        stop_scanner_input()
