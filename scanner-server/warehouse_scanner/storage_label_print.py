"""Dedicated 4x6 ZPL labels for Magmo bins and pallets.

The module is deliberately independent from the legacy item-label builder.  A
caller supplies both authentication and printing callbacks, which keeps tests
away from printer hardware and lets the existing combined Flask process remain
the only owner of the Zebra printer and warehouse scanner.
"""

from __future__ import annotations

import math
import re
import textwrap
import threading
import unicodedata
from collections.abc import Callable, Mapping, Sequence
from dataclasses import dataclass
from typing import Any

from flask import Blueprint, Flask, Response, jsonify, request
from werkzeug.exceptions import BadRequest


LABEL_TEMPLATE = "storage-unit-v2"
LABEL_TYPE = "storage_unit"
BARCODE_FORMAT = "CODE128"
MAGMO_STORAGE_ROUTE = "https://magmo.cloud/NewSearch/inventory/storage"

LABEL_WIDTH_DOTS = 820
LABEL_LENGTH_DOTS = 1180
LABEL_DPI = 203
MAX_REQUEST_BYTES = 65_536
MAX_ITEMS = 250
MAX_BINS = 250
MAX_BIN_ITEMS_PER_PAGE = 10
MAX_PALLET_BINS_PER_PAGE = 15
MAX_ITEM_CODE_CHARACTERS = 20

PALLET_VIEW_WIDTH_DOTS = LABEL_LENGTH_DOTS
PALLET_VIEW_HEIGHT_DOTS = LABEL_WIDTH_DOTS
PALLET_GRID_LEFT = 20
PALLET_GRID_TOP = 145
PALLET_GRID_WIDTH = PALLET_VIEW_WIDTH_DOTS - 40
PALLET_GRID_BOTTOM = 672
PALLET_TILE_BARCODE_MODULES = 145

UNIT_ID_PATTERN = re.compile(r"^([BP])([1-9]\d{0,4})$")
ITEM_BARCODE_PATTERN = re.compile(
    rf"^[\x20-\x7e]{{1,{MAX_ITEM_CODE_CHARACTERS}}}$"
)
ITEM_ID_PATTERN = re.compile(r"^[\x20-\x7e]{1,120}$")
CONTROL_CHARACTER_PATTERN = re.compile(r"[\x00-\x1f\x7f]")

PAYLOAD_KEYS = frozenset(
    {
        "template",
        "label_type",
        "storage_unit_type",
        "unit_id",
        "display_number",
        "local_sn",
        "serial_id",
        "qr_value",
        "barcode_value",
        "barcode_format",
        "items",
        "bins",
    }
)
ITEM_KEYS = frozenset({"item_id", "name", "barcode_value", "ais_number"})
BIN_KEYS = frozenset({"unit_id", "display_id", "serial_id"})


class StorageLabelError(Exception):
    """Expected error with a response-safe message and status."""

    def __init__(self, status_code: int, code: str, message: str) -> None:
        super().__init__(message)
        self.status_code = int(status_code)
        self.code = str(code)
        self.message = str(message)


def _fail(status_code: int, code: str, message: str) -> None:
    raise StorageLabelError(status_code, code, message)


@dataclass(frozen=True)
class StorageLabelItem:
    item_id: str
    name: str
    barcode_value: str
    ais_number: str


@dataclass(frozen=True)
class StorageLabelBin:
    unit_id: str
    display_id: str
    serial_id: str


@dataclass(frozen=True)
class StorageLabelPayload:
    unit_id: str
    unit_type: str
    number: int
    display_number: str
    serial_id: str
    qr_url: str
    items: tuple[StorageLabelItem, ...]
    bins: tuple[StorageLabelBin, ...]


def storage_serial(unit_id: str) -> str:
    """Return the deterministic AIS serial for a canonical storage ID."""

    match = UNIT_ID_PATTERN.fullmatch(str(unit_id or ""))
    if not match:
        _fail(400, "invalid_storage_unit", "The storage-unit identifier is invalid.")
    return f"AIS-{match.group(1)}{int(match.group(2)):05d}"


def storage_qr_url(unit_id: str) -> str:
    if not UNIT_ID_PATTERN.fullmatch(str(unit_id or "")):
        _fail(400, "invalid_storage_unit", "The storage-unit identifier is invalid.")
    return f"{MAGMO_STORAGE_ROUTE}/{unit_id}"


def _exact_object(value: Any, keys: frozenset[str], *, code: str, message: str) -> Mapping[str, Any]:
    if not isinstance(value, dict) or frozenset(value) != keys:
        _fail(400, code, message)
    return value


def _clean_text(
    value: Any,
    *,
    maximum: int,
    code: str,
    message: str,
    printable_ascii: bool = False,
) -> str:
    if not isinstance(value, str):
        _fail(400, code, message)
    cleaned = value.strip()
    if not cleaned or len(cleaned) > maximum or CONTROL_CHARACTER_PATTERN.search(cleaned):
        _fail(400, code, message)
    if printable_ascii and any(ord(character) < 32 or ord(character) > 126 for character in cleaned):
        _fail(400, code, message)
    return cleaned


def _parse_item(value: Any) -> StorageLabelItem:
    data = _exact_object(
        value,
        ITEM_KEYS,
        code="invalid_item",
        message="A storage-label item is invalid.",
    )
    item_id = _clean_text(
        data.get("item_id"),
        maximum=120,
        code="invalid_item",
        message="A storage-label item identifier is invalid.",
        printable_ascii=True,
    )
    if not ITEM_ID_PATTERN.fullmatch(item_id) or "/" in item_id or "\\" in item_id:
        _fail(400, "invalid_item", "A storage-label item identifier is invalid.")
    name = _clean_text(
        data.get("name"),
        maximum=160,
        code="invalid_item",
        message="A storage-label item name is invalid.",
    )
    barcode_value = _clean_text(
        data.get("barcode_value"),
        maximum=MAX_ITEM_CODE_CHARACTERS,
        code="invalid_item",
        message="A storage-label item barcode is invalid.",
        printable_ascii=True,
    )
    ais_number = _clean_text(
        data.get("ais_number"),
        maximum=MAX_ITEM_CODE_CHARACTERS,
        code="invalid_item",
        message="A storage-label item AIS number is invalid.",
        printable_ascii=True,
    )
    if not ITEM_BARCODE_PATTERN.fullmatch(barcode_value) or not ITEM_BARCODE_PATTERN.fullmatch(ais_number):
        _fail(400, "invalid_item", "A storage-label item barcode is invalid.")
    return StorageLabelItem(
        item_id=item_id,
        name=name,
        barcode_value=barcode_value,
        ais_number=ais_number,
    )


def _parse_bin(value: Any) -> StorageLabelBin:
    data = _exact_object(
        value,
        BIN_KEYS,
        code="invalid_bin",
        message="A pallet-label bin is invalid.",
    )
    unit_id = _clean_text(
        data.get("unit_id"),
        maximum=7,
        code="invalid_bin",
        message="A pallet-label bin identifier is invalid.",
        printable_ascii=True,
    )
    match = UNIT_ID_PATTERN.fullmatch(unit_id)
    if not match or match.group(1) != "B":
        _fail(400, "invalid_bin", "A pallet-label bin identifier is invalid.")
    display_id = _clean_text(
        data.get("display_id"),
        maximum=7,
        code="invalid_bin",
        message="A pallet-label bin display identifier is invalid.",
        printable_ascii=True,
    )
    serial_id = _clean_text(
        data.get("serial_id"),
        maximum=10,
        code="invalid_bin",
        message="A pallet-label bin serial identifier is invalid.",
        printable_ascii=True,
    )
    if display_id != unit_id or serial_id != storage_serial(unit_id):
        _fail(400, "invalid_bin", "A pallet-label bin is inconsistent.")
    return StorageLabelBin(unit_id=unit_id, display_id=display_id, serial_id=serial_id)


def parse_storage_label_payload(value: Any) -> StorageLabelPayload:
    data = _exact_object(
        value,
        PAYLOAD_KEYS,
        code="invalid_request",
        message="The storage-label request has an invalid schema.",
    )
    if data.get("template") != LABEL_TEMPLATE or data.get("label_type") != LABEL_TYPE:
        _fail(400, "invalid_template", "The storage-label template is invalid.")

    unit_id = _clean_text(
        data.get("unit_id"),
        maximum=7,
        code="invalid_storage_unit",
        message="The storage-unit identifier is invalid.",
        printable_ascii=True,
    )
    match = UNIT_ID_PATTERN.fullmatch(unit_id)
    if not match:
        _fail(400, "invalid_storage_unit", "The storage-unit identifier is invalid.")
    prefix = match.group(1)
    number = int(match.group(2), 10)
    unit_type = "bin" if prefix == "B" else "pallet"
    display_number = str(number)
    serial_id = storage_serial(unit_id)
    qr_url = storage_qr_url(unit_id)

    expected_scalars = {
        "storage_unit_type": unit_type,
        "display_number": display_number,
        "local_sn": serial_id,
        "serial_id": serial_id,
        "qr_value": qr_url,
        "barcode_value": serial_id,
        "barcode_format": BARCODE_FORMAT,
    }
    if any(data.get(key) != expected for key, expected in expected_scalars.items()):
        _fail(400, "inconsistent_storage_unit", "The storage-label identifiers are inconsistent.")

    raw_items = data.get("items")
    raw_bins = data.get("bins")
    if not isinstance(raw_items, list) or len(raw_items) > MAX_ITEMS:
        _fail(400, "invalid_items", "The storage-label item list is invalid.")
    if not isinstance(raw_bins, list) or len(raw_bins) > MAX_BINS:
        _fail(400, "invalid_bins", "The storage-label bin list is invalid.")
    if unit_type == "bin" and raw_bins:
        _fail(400, "invalid_contents", "A bin label cannot contain pallet bins.")
    if unit_type == "pallet" and raw_items:
        _fail(400, "invalid_contents", "A pallet label cannot contain item rows.")

    items = tuple(_parse_item(item) for item in raw_items)
    bins = tuple(_parse_bin(bin_value) for bin_value in raw_bins)
    if len({item.item_id.casefold() for item in items}) != len(items):
        _fail(400, "duplicate_item", "The storage-label item list contains a duplicate.")
    if len({bin_value.unit_id for bin_value in bins}) != len(bins):
        _fail(400, "duplicate_bin", "The pallet-label bin list contains a duplicate.")

    return StorageLabelPayload(
        unit_id=unit_id,
        unit_type=unit_type,
        number=number,
        display_number=display_number,
        serial_id=serial_id,
        qr_url=qr_url,
        items=items,
        bins=bins,
    )


def _ascii_display(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", str(value or ""))
    encoded = normalized.encode("ascii", "replace").decode("ascii")
    return " ".join(encoded.split())


def zpl_escape(value: str) -> str:
    """Escape field data for use after ``^FH\\``.

    The printer's built-in font is ASCII-oriented, so normalized non-ASCII
    characters are represented safely instead of being allowed to alter the
    ZPL command stream.
    """

    return (
        _ascii_display(value)
        .replace("\\", "\\5C")
        .replace("^", "\\5E")
        .replace("~", "\\7E")
    )


def _text_field(
    x: int,
    y: int,
    text: str,
    *,
    height: int,
    width: int | None = None,
    field_width: int | None = None,
    alignment: str = "L",
) -> str:
    font_width = height if width is None else width
    field = f"^FO{x},{y}^A0N,{height},{font_width}"
    if field_width is not None:
        field += f"^FB{field_width},1,0,{alignment},0"
    return f"{field}^FH\\^FD{zpl_escape(text)}^FS"


def _barcode_field(x: int, y: int, value: str, *, height: int, module_width: int = 2) -> str:
    return (
        f"^FO{x},{y}^BY{module_width},2,{height}^BCN,{height},N,N,N"
        f"^FH\\^FD{zpl_escape(value)}^FS"
    )


def _landscape_text_field(
    x: int,
    y: int,
    text: str,
    *,
    height: int,
    width: int | None = None,
    field_width: int | None = None,
    alignment: str = "L",
) -> str:
    """Place upright text on the pallet label after it is turned landscape."""

    font_width = height if width is None else width
    printer_x = PALLET_VIEW_HEIGHT_DOTS - y - height
    field = f"^FO{printer_x},{x}^A0R,{height},{font_width}"
    if field_width is not None:
        field += f"^FB{field_width},1,0,{alignment},0"
    return f"{field}^FH\\^FD{zpl_escape(text)}^FS"


def _landscape_barcode_field(
    x: int,
    y: int,
    value: str,
    *,
    height: int,
    module_width: int = 2,
) -> str:
    """Place a Code 128 barcode horizontally on the landscape-viewed label."""

    printer_x = PALLET_VIEW_HEIGHT_DOTS - y - height
    return (
        f"^FO{printer_x},{x}^BY{module_width},2,{height}^BCR,{height},N,N,N"
        f"^FH\\^FD{zpl_escape(value)}^FS"
    )


def _landscape_box(
    x: int,
    y: int,
    width: int,
    height: int,
    *,
    thickness: int = 2,
) -> str:
    """Map a landscape-viewed rectangle into the printer's portrait coordinates."""

    printer_x = PALLET_VIEW_HEIGHT_DOTS - y - height
    return f"^FO{printer_x},{x}^GB{height},{width},{thickness}^FS"


def _landscape_qr_field(
    x: int,
    y: int,
    value: str,
    *,
    size: int = 132,
    magnification: int = 4,
) -> str:
    """Place the square QR safely; ^BQ itself supports only normal orientation."""

    printer_x = PALLET_VIEW_HEIGHT_DOTS - y - size
    return (
        f"^FO{printer_x},{x}^BQN,2,{magnification}^FH\\"
        f"^FDLA,{zpl_escape(value)}^FS"
    )


def _page_shell(body: Sequence[str]) -> str:
    return "\n".join(
        [
            "^XA",
            f"^PW{LABEL_WIDTH_DOTS}",
            f"^LL{LABEL_LENGTH_DOTS}",
            "^LH0,0",
            "^CI28",
            *body,
            "^PQ1,0,1,N",
            "^XZ",
        ]
    )


def _footer(payload: StorageLabelPayload) -> list[str]:
    return [
        "^FO20,910^GB780,2,2^FS",
        _barcode_field(35, 952, payload.serial_id, height=92, module_width=2),
        _text_field(
            25,
            1056,
            payload.serial_id,
            height=34,
            width=30,
            field_width=500,
            alignment="C",
        ),
        f"^FO590,930^BQN,2,5^FH\\^FDLA,{zpl_escape(payload.qr_url)}^FS",
    ]


def _chunks(values: Sequence[Any], size: int) -> tuple[tuple[Any, ...], ...]:
    if not values:
        return ((),)
    return tuple(tuple(values[index : index + size]) for index in range(0, len(values), size))


def _fit_lines(value: str, *, characters: int, maximum_lines: int = 2) -> tuple[str, ...]:
    text = _ascii_display(value)
    lines = textwrap.wrap(
        text,
        width=max(4, characters),
        break_long_words=True,
        break_on_hyphens=False,
    ) or [text]
    if len(lines) > maximum_lines:
        lines = lines[:maximum_lines]
        final = lines[-1]
        lines[-1] = f"{final[: max(1, characters - 3)].rstrip()}..."
    return tuple(lines)


def _bin_page(
    payload: StorageLabelPayload,
    items: Sequence[StorageLabelItem],
    *,
    page_number: int,
    page_count: int,
) -> str:
    header = f"Bin {payload.display_number}"
    header_font = min(100, max(70, int(760 / max(1.0, len(header) * 0.62))))
    body = [
        _text_field(20, 12, header, height=header_font, field_width=780, alignment="C"),
        "^FO20,154^GB780,2,2^FS",
    ]
    if page_count > 1:
        body.append(
            _text_field(
                650,
                124,
                f"{page_number}/{page_count}",
                height=22,
                width=20,
                field_width=130,
                alignment="R",
            )
        )

    row_count = len(items)
    if not row_count:
        body.append(
            _text_field(20, 485, "NO ITEMS", height=64, field_width=780, alignment="C")
        )
        return _page_shell([*body, *_footer(payload)])

    table_top = 176
    table_bottom = 892
    available_height = table_bottom - table_top
    if row_count <= 5:
        row_height = 134
        block_top = table_top + (available_height - row_height * row_count) // 2
        name_font = 36
        barcode_height = 58
        ais_font = 24
    else:
        row_height = available_height // row_count
        block_top = table_top
        name_font = max(22, min(31, int(row_height * 0.32)))
        barcode_height = max(34, min(54, row_height - 30))
        ais_font = max(18, min(22, row_height - barcode_height - 8))

    wide_barcode_column = max(len(item.barcode_value) for item in items) > 12
    divider_x = 220 if wide_barcode_column else 390
    name_field_width = divider_x - 48
    barcode_x = divider_x + 30
    ais_x = divider_x + 8
    ais_field_width = LABEL_WIDTH_DOTS - ais_x - 20
    if wide_barcode_column and row_count <= 5:
        name_font = min(name_font, 24)
    elif wide_barcode_column:
        name_font = min(name_font, 20)

    body.append(f"^FO{divider_x},{block_top}^GB2,{row_height * row_count},2^FS")
    for index, item in enumerate(items):
        y = block_top + index * row_height
        if index:
            body.append(f"^FO20,{y}^GB780,1,1^FS")
        characters = max(6, int(name_field_width / max(1.0, name_font * 0.58)))
        maximum_name_lines = 3 if row_count <= 5 else 2
        name_lines = _fit_lines(
            item.name,
            characters=characters,
            maximum_lines=maximum_name_lines,
        )
        name_line_height = name_font + 2
        names_height = len(name_lines) * name_line_height
        name_y = y + max(3, (row_height - names_height) // 2)
        for line_index, line in enumerate(name_lines):
            body.append(
                _text_field(
                    28,
                    name_y + line_index * name_line_height,
                    line,
                    height=name_font,
                    width=max(18, name_font - 3),
                    field_width=name_field_width,
                )
            )

        barcode_y = y + max(3, (row_height - barcode_height - ais_font - 6) // 2)
        body.append(
            _barcode_field(
                barcode_x,
                barcode_y,
                item.barcode_value,
                height=barcode_height,
                module_width=2,
            )
        )
        body.append(
            _text_field(
                ais_x,
                barcode_y + barcode_height + 4,
                item.ais_number,
                height=ais_font,
                width=max(15, ais_font - 2),
                field_width=ais_field_width,
                alignment="C",
            )
        )

    return _page_shell([*body, *_footer(payload)])


def _pallet_grid_columns(count: int) -> int:
    if count <= 1:
        return 1
    if count <= 4:
        return 2
    return 3


def _pallet_tile_sizes(rows: int) -> tuple[int, int]:
    if rows <= 1:
        return 96, 80
    if rows == 2:
        return 64, 68
    if rows == 3:
        return 48, 66
    if rows == 4:
        return 38, 60
    return 32, 58


def _pallet_footer(payload: StorageLabelPayload) -> list[str]:
    return [
        _landscape_box(20, 684, 920, 2),
        _landscape_barcode_field(
            65,
            700,
            payload.serial_id,
            height=58,
            module_width=2,
        ),
        _landscape_text_field(
            35,
            764,
            payload.serial_id,
            height=26,
            width=24,
            field_width=500,
            alignment="C",
        ),
        _landscape_qr_field(970, 672, payload.qr_url),
    ]


def _pallet_page(
    payload: StorageLabelPayload,
    bins: Sequence[StorageLabelBin],
    *,
    page_number: int,
    page_count: int,
) -> str:
    display = f"P{payload.display_number}"
    if not bins:
        font = min(410, int(1100 / max(1.0, len(display) * 0.62)))
        y = 125
        body = [
            _landscape_text_field(
                40,
                y,
                display,
                height=font,
                field_width=1100,
                alignment="C",
            )
        ]
        return _page_shell([*body, *_pallet_footer(payload)])

    header_font = min(116, int(1100 / max(1.0, len(display) * 0.62)))
    body = [
        _landscape_text_field(
            20,
            16,
            display,
            height=header_font,
            field_width=1140,
            alignment="C",
        ),
        _landscape_box(20, 140, 1140, 2),
    ]
    if page_count > 1:
        body.append(
            _landscape_text_field(
                1020,
                112,
                f"{page_number}/{page_count}",
                height=22,
                width=20,
                field_width=120,
                alignment="R",
            )
        )

    columns = _pallet_grid_columns(len(bins))
    rows = math.ceil(len(bins) / columns)
    cell_width = PALLET_GRID_WIDTH // columns
    cell_height = (PALLET_GRID_BOTTOM - PALLET_GRID_TOP) // rows
    barcode_module_width = 3 if columns <= 2 else 2
    barcode_width = PALLET_TILE_BARCODE_MODULES * barcode_module_width
    longest = max(len(value.display_id) for value in bins)
    base_font, barcode_height = _pallet_tile_sizes(rows)
    cell_font = min(
        base_font,
        int((cell_width - 24) / max(1.0, longest * 0.62)),
    )
    for index, bin_value in enumerate(bins):
        row, column = divmod(index, columns)
        values_in_row = min(columns, len(bins) - row * columns)
        row_offset = (PALLET_GRID_WIDTH - values_in_row * cell_width) // 2
        x = PALLET_GRID_LEFT + row_offset + column * cell_width
        y = PALLET_GRID_TOP + row * cell_height
        width = cell_width
        height = cell_height if row < rows - 1 else PALLET_GRID_BOTTOM - y
        body.append(_landscape_box(x, y, width, height))
        content_height = cell_font + 5 + barcode_height
        content_y = y + max(3, (height - content_height) // 2)
        body.append(
            _landscape_text_field(
                x,
                content_y,
                bin_value.display_id,
                height=cell_font,
                width=max(20, cell_font - 4),
                field_width=width,
                alignment="C",
            )
        )
        body.append(
            _landscape_barcode_field(
                x + (width - barcode_width) // 2,
                content_y + cell_font + 5,
                bin_value.serial_id,
                height=barcode_height,
                module_width=barcode_module_width,
            )
        )

    return _page_shell([*body, *_pallet_footer(payload)])


def build_storage_label_pages(value: StorageLabelPayload | Mapping[str, Any]) -> tuple[str, ...]:
    payload = value if isinstance(value, StorageLabelPayload) else parse_storage_label_payload(value)
    if payload.unit_type == "bin":
        pages = _chunks(payload.items, MAX_BIN_ITEMS_PER_PAGE)
        return tuple(
            _bin_page(
                payload,
                page,
                page_number=index,
                page_count=len(pages),
            )
            for index, page in enumerate(pages, start=1)
        )
    pages = _chunks(payload.bins, MAX_PALLET_BINS_PER_PAGE)
    return tuple(
        _pallet_page(
            payload,
            page,
            page_number=index,
            page_count=len(pages),
        )
        for index, page in enumerate(pages, start=1)
    )


def _read_json_request(max_bytes: int) -> Any:
    if request.content_length is not None and request.content_length > max_bytes:
        _fail(413, "request_too_large", "The storage-label request is too large.")
    if request.mimetype != "application/json":
        _fail(415, "json_required", "The storage-label endpoint requires application/json.")
    try:
        payload = request.get_json(force=False, silent=False)
    except BadRequest:
        _fail(400, "invalid_json", "The storage-label request contains invalid JSON.")
    return payload


def _authentication_error(error: Exception) -> StorageLabelError:
    status = getattr(error, "status_code", None)
    code = getattr(error, "code", None)
    message = getattr(error, "message", None)
    if isinstance(status, int) and 400 <= status <= 599 and code and message:
        return StorageLabelError(status, str(code), str(message))
    return StorageLabelError(401, "unauthorized", "The storage-label credential is invalid.")


def register_storage_label_routes(
    app: Flask,
    *,
    authorize: Callable[[str | None], Any],
    printer: Callable[[str], Any],
    url_prefix: str = "",
    max_request_bytes: int = MAX_REQUEST_BYTES,
) -> None:
    """Register ``POST /print-storage-label`` on an existing Flask app."""

    if not isinstance(app, Flask):
        raise TypeError("app must be a Flask application")
    if not callable(authorize):
        raise TypeError("authorize must be callable")
    if not callable(printer):
        raise TypeError("printer must be callable")
    prefix = str(url_prefix or "").rstrip("/")
    blueprint = Blueprint(f"storage_label_print_{id(printer):x}", __name__)
    print_lock = threading.Lock()

    @blueprint.after_request
    def _secure_response(response: Response) -> Response:
        response.headers["Cache-Control"] = "no-store, max-age=0"
        response.headers["Pragma"] = "no-cache"
        response.headers["X-Content-Type-Options"] = "nosniff"
        return response

    @blueprint.errorhandler(StorageLabelError)
    def _expected_error(error: StorageLabelError) -> tuple[Response, int]:
        return jsonify({"ok": False, "code": error.code, "error": error.message}), error.status_code

    @blueprint.route("/print-storage-label", methods=["POST"], strict_slashes=True)
    def _print_storage_label() -> tuple[Response, int]:
        try:
            authorize(request.headers.get("Authorization"))
        except Exception as error:
            raise _authentication_error(error) from None

        payload = parse_storage_label_payload(_read_json_request(max_request_bytes))
        pages = build_storage_label_pages(payload)
        printed_pages = 0
        try:
            # A bin can span several physical labels.  Keep the whole job
            # contiguous when Flask handles concurrent print requests.
            with print_lock:
                for zpl in pages:
                    result = printer(zpl)
                    if result is False:
                        raise RuntimeError("The printer rejected the label.")
                    printed_pages += 1
        except Exception:
            return (
                jsonify(
                    {
                        "ok": False,
                        "code": "print_failed",
                        "error": "The storage label could not be printed.",
                        "unitId": payload.unit_id,
                        "pagesPrinted": printed_pages,
                        "pageCount": len(pages),
                    }
                ),
                502,
            )

        return (
            jsonify(
                {
                    "ok": True,
                    "status": "printed",
                    "unitId": payload.unit_id,
                    "serialCode": payload.serial_id,
                    "pagesPrinted": printed_pages,
                    "pageCount": len(pages),
                    "itemCount": len(payload.items),
                    "binCount": len(payload.bins),
                }
            ),
            200,
        )

    app.register_blueprint(blueprint, url_prefix=prefix)


__all__ = [
    "BARCODE_FORMAT",
    "LABEL_DPI",
    "LABEL_LENGTH_DOTS",
    "LABEL_TEMPLATE",
    "LABEL_WIDTH_DOTS",
    "MAGMO_STORAGE_ROUTE",
    "MAX_BIN_ITEMS_PER_PAGE",
    "MAX_ITEM_CODE_CHARACTERS",
    "MAX_PALLET_BINS_PER_PAGE",
    "StorageLabelError",
    "StorageLabelPayload",
    "build_storage_label_pages",
    "parse_storage_label_payload",
    "register_storage_label_routes",
    "storage_qr_url",
    "storage_serial",
    "zpl_escape",
]
