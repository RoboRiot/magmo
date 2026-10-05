"""Authenticated, hardware-independent 4x6 tool labels for the shared printer."""

from __future__ import annotations

import re
import textwrap
import threading
import unicodedata
from collections.abc import Callable, Mapping
from typing import Any

from flask import Blueprint, Flask, jsonify, request
from werkzeug.exceptions import BadRequest

LABEL_WIDTH_DOTS = 820
LABEL_LENGTH_DOTS = 1180
TOOL_ID_PATTERN = re.compile(r"^AIS_T\d{5}$")
PAYLOAD_KEYS = frozenset({"template", "label_type", "tool_id", "name", "description", "oem", "model", "modality", "barcode_value", "barcode_format", "qr_value"})
MAX_REQUEST_BYTES = 8192


class ToolLabelError(Exception):
    def __init__(self, status: int, code: str, message: str):
        super().__init__(message)
        self.status_code, self.code, self.message = status, code, message


def parse_tool_label_payload(value: Any) -> dict[str, str]:
    if not isinstance(value, dict) or frozenset(value) != PAYLOAD_KEYS:
        raise ToolLabelError(400, "invalid_tool_label", "The tool-label request is invalid.")
    tool_id = value.get("tool_id")
    if not isinstance(tool_id, str) or not TOOL_ID_PATTERN.fullmatch(tool_id) or tool_id == "AIS_T00000":
        raise ToolLabelError(400, "invalid_tool_id", "The tool identifier is invalid.")
    expected = {"template": "tool-v1", "label_type": "tool", "barcode_format": "CODE128", "barcode_value": tool_id, "qr_value": f"https://magmo.cloud/NewSearch/Tools/{tool_id}"}
    if any(value.get(key) != expected_value for key, expected_value in expected.items()):
        raise ToolLabelError(400, "invalid_tool_identity", "The tool label identity is inconsistent.")
    for key, maximum in (("name", 160), ("description", 600), ("oem", 100), ("model", 100), ("modality", 100)):
        text = value.get(key)
        if not isinstance(text, str) or len(text) > maximum or re.search(r"[\x00-\x1f\x7f]", text) or (key == "name" and not text.strip()):
            raise ToolLabelError(400, "invalid_tool_text", "The tool label text is invalid.")
    return dict(value)


def _display(value: str) -> str:
    return unicodedata.normalize("NFKD", value).encode("ascii", "replace").decode("ascii")


def _escape(value: str) -> str:
    return _display(value).replace("\\", "\\5C").replace("^", "\\5E").replace("~", "\\7E")


def _text(x: int, y: int, value: str, size: int, *, width: int = 744, align: str = "L") -> str:
    return f"^FO{x},{y}^A0N,{size},{size}^FB{width},1,0,{align},0^FH\\^FD{_escape(value)}^FS"


def _lines(value: str, characters: int, maximum: int) -> list[str]:
    lines = textwrap.wrap(_display(value), width=characters, break_long_words=True, break_on_hyphens=False)
    if len(lines) > maximum:
        lines = lines[:maximum]
        lines[-1] = lines[-1][:max(1, characters - 3)].rstrip() + "..."
    return lines


def build_tool_label(value: Mapping[str, Any]) -> str:
    payload = parse_tool_label_payload(value)
    # Tool identity is never truncated. Descriptive text has bounded regions;
    # long descriptions remain fully available through the QR-linked page.
    body = [_text(38, 32, "TOOL", 40), _text(300, 32, payload["tool_id"], 40, width=482, align="R"), "^FO38,98^GB744,3,3^FS"]
    name_size = 86
    while name_size > 24:
        characters = max(12, int(744 / (name_size * 0.62)))
        if len(textwrap.wrap(_display(payload["name"]), width=characters, break_long_words=True, break_on_hyphens=False)) * (name_size + 8) <= 390:
            break
        name_size -= 2
    name_lines = _lines(payload["name"], max(12, int(744 / (name_size * 0.62))), 12)
    for index, line in enumerate(name_lines):
        body.append(_text(38, 132 + index * (name_size + 8), line, name_size))
    y = max(420, 132 + len(name_lines) * (name_size + 8) + 20)
    specs = [(label, payload[key]) for label, key in (("OEM", "oem"), ("MODEL", "model"), ("MODALITY", "modality")) if payload[key]]
    for label, text in specs:
        for line in _lines(f"{label}: {text}", 47, 2):
            body.append(_text(38, y, line, 26))
            y += 31
    if payload["description"] and y <= 820:
        y += 20
        available_lines = max(1, min(7, (868 - y) // 32))
        for line in _lines(payload["description"], 46, available_lines):
            body.append(_text(38, y, line, 27))
            y += 32
    body.extend([
        "^FO38,900^GB744,3,3^FS",
        f"^FO58,948^BY3,2,100^BCN,100,N,N,N^FD{payload['tool_id']}^FS",
        _text(38, 1074, payload["tool_id"], 35, width=485, align="C"),
        # Version-4 QR at 5-dot modules plus 4-module quiet zone fits with
        # generous bottom/right clearance; previous clipped-item layout not reused.
        # Reset ^BY's inherited height: Zebra QR positioning otherwise inherits
        # the preceding 100-dot Code128 height and shifts downward by 100 dots.
        f"^BY2,2,10^FO565,932^BQN,2,5^FDLA,{payload['qr_value']}^FS",
        _text(548, 1122, "SCAN TO OPEN TOOL", 20, width=242, align="C"),
    ])
    return "\n".join(["^XA", f"^PW{LABEL_WIDTH_DOTS}", f"^LL{LABEL_LENGTH_DOTS}", "^LH0,0", "^CI28", *body, "^PQ1,0,1,N", "^XZ"])


def register_tool_label_routes(app: Flask, *, authorize: Callable, printer: Callable) -> None:
    if not isinstance(app, Flask) or not callable(authorize) or not callable(printer):
        raise TypeError("Tool labels require the existing Flask app, authorization and printer callbacks.")
    blueprint = Blueprint("magmo_tool_labels", __name__)
    print_lock = threading.Lock()

    @blueprint.after_request
    def secure_response(response):
        response.headers["Cache-Control"] = "no-store, max-age=0"
        response.headers["X-Content-Type-Options"] = "nosniff"
        return response

    @blueprint.errorhandler(ToolLabelError)
    def expected_error(error):
        return jsonify({"ok": False, "code": error.code, "error": error.message}), error.status_code

    @blueprint.route("/print-tool-label", methods=["POST"], strict_slashes=True)
    def print_tool_label():
        try:
            authorize(request.headers.get("Authorization"))
        except Exception:
            raise ToolLabelError(401, "unauthorized", "The tool-label credential is invalid.") from None
        if request.content_length is not None and request.content_length > MAX_REQUEST_BYTES:
            raise ToolLabelError(413, "request_too_large", "The tool-label request is too large.")
        if request.mimetype != "application/json":
            raise ToolLabelError(415, "json_required", "The tool-label endpoint requires application/json.")
        try:
            value = request.get_json(force=False, silent=False)
        except BadRequest:
            raise ToolLabelError(400, "invalid_json", "The tool-label JSON is invalid.") from None
        payload = parse_tool_label_payload(value)
        label = build_tool_label(payload)
        try:
            with print_lock:
                if printer(label) is False:
                    raise RuntimeError("Print rejected")
        except Exception:
            return jsonify({"ok": False, "code": "print_failed", "error": "The tool label could not be printed."}), 502
        return jsonify({"ok": True, "status": "printed", "toolId": payload["tool_id"], "pagesPrinted": 1}), 200

    app.register_blueprint(blueprint)
