from __future__ import annotations

import copy
import re
import sys
import unittest
from pathlib import Path


SCANNER_SERVER_ROOT = Path(__file__).resolve().parents[1]
if str(SCANNER_SERVER_ROOT) not in sys.path:
    sys.path.insert(0, str(SCANNER_SERVER_ROOT))

from flask import Flask

from warehouse_scanner.storage_label_print import (
    LABEL_LENGTH_DOTS,
    LABEL_WIDTH_DOTS,
    MAX_ITEM_CODE_CHARACTERS,
    MAX_PALLET_BINS_PER_PAGE,
    StorageLabelError,
    build_storage_label_pages,
    parse_storage_label_payload,
    register_storage_label_routes,
    storage_serial,
    zpl_escape,
)


TOKEN = "test-storage-label-token"


def item(number: int, *, name: str | None = None) -> dict[str, str]:
    return {
        "item_id": f"item-{number}",
        "name": name or f"Infusion pump assembly {number}",
        "barcode_value": f"CODE{number:05d}",
        "ais_number": f"AIS{number:05d}",
    }


def bin_entry(number: int) -> dict[str, str]:
    return {
        "unit_id": f"B{number}",
        "display_id": f"B{number}",
        "serial_id": f"AIS-B{number:05d}",
    }


def label_payload(
    unit_id: str = "B47",
    *,
    items: list[dict[str, str]] | None = None,
    bins: list[dict[str, str]] | None = None,
) -> dict[str, object]:
    prefix = unit_id[0]
    number = int(unit_id[1:])
    serial = f"AIS-{prefix}{number:05d}"
    return {
        "template": "storage-unit-v2",
        "label_type": "storage_unit",
        "storage_unit_type": "bin" if prefix == "B" else "pallet",
        "unit_id": unit_id,
        "display_number": str(number),
        "local_sn": serial,
        "serial_id": serial,
        "qr_value": f"https://magmo.cloud/NewSearch/inventory/storage/{unit_id}",
        "barcode_value": serial,
        "barcode_format": "CODE128",
        "items": list(items or []),
        "bins": list(bins or []),
    }


class StorageLabelPayloadTests(unittest.TestCase):
    def test_parses_exact_consistent_bin_payload(self) -> None:
        parsed = parse_storage_label_payload(label_payload(items=[item(1)]))

        self.assertEqual(parsed.unit_id, "B47")
        self.assertEqual(parsed.unit_type, "bin")
        self.assertEqual(parsed.serial_id, "AIS-B00047")
        self.assertEqual(parsed.items[0].ais_number, "AIS00001")
        self.assertEqual(parsed.bins, ())

    def test_rejects_extra_missing_or_inconsistent_fields(self) -> None:
        candidates = []
        extra = label_payload()
        extra["zpl"] = "^XA^XZ"
        candidates.append(extra)
        missing = label_payload()
        del missing["barcode_format"]
        candidates.append(missing)
        wrong_serial = label_payload()
        wrong_serial["local_sn"] = "B47"
        candidates.append(wrong_serial)
        wrong_url = label_payload()
        wrong_url["qr_value"] = "https://example.invalid/B47"
        candidates.append(wrong_url)
        noncanonical = label_payload()
        noncanonical["unit_id"] = "B047"
        candidates.append(noncanonical)

        for candidate in candidates:
            with self.subTest(candidate=candidate):
                with self.assertRaises(StorageLabelError):
                    parse_storage_label_payload(candidate)

    def test_rejects_wrong_contents_duplicates_and_out_of_range_ids(self) -> None:
        with self.assertRaises(StorageLabelError):
            parse_storage_label_payload(label_payload(items=[item(1)], bins=[bin_entry(1)]))
        with self.assertRaises(StorageLabelError):
            parse_storage_label_payload(label_payload(items=[item(1), item(1)]))
        with self.assertRaises(StorageLabelError):
            parse_storage_label_payload(label_payload("P5", items=[item(1)]))
        with self.assertRaises(StorageLabelError):
            parse_storage_label_payload(label_payload("P5", bins=[bin_entry(2), bin_entry(2)]))
        with self.assertRaises(StorageLabelError):
            storage_serial("B100000")

    def test_rejects_control_characters_and_document_paths(self) -> None:
        bad_name = label_payload(items=[item(1, name="Pump\nassembly")])
        with self.assertRaises(StorageLabelError):
            parse_storage_label_payload(bad_name)

        bad_id = label_payload(items=[item(1)])
        bad_id["items"][0]["item_id"] = "Test/AIS10001"  # type: ignore[index]
        with self.assertRaises(StorageLabelError):
            parse_storage_label_payload(bad_id)


class StorageLabelZplTests(unittest.TestCase):
    def test_bin_uses_current_4x6_envelope_and_required_sections(self) -> None:
        pages = build_storage_label_pages(label_payload(items=[item(index) for index in range(1, 6)]))

        self.assertEqual(len(pages), 1)
        zpl = pages[0]
        self.assertIn(f"^PW{LABEL_WIDTH_DOTS}", zpl)
        self.assertIn(f"^LL{LABEL_LENGTH_DOTS}", zpl)
        self.assertIn("Bin 47", zpl)
        self.assertIn("Infusion pump", zpl)
        self.assertIn("^A0N,36,33", zpl)
        self.assertIn("CODE00001", zpl)
        self.assertIn("AIS00001", zpl)
        self.assertIn("AIS-B00047", zpl)
        self.assertIn("LA,https://magmo.cloud/NewSearch/inventory/storage/B47", zpl)
        self.assertEqual(zpl.count("^XA"), 1)
        self.assertEqual(zpl.count("^XZ"), 1)

    def test_short_bin_lists_use_available_third_name_line(self) -> None:
        pages = build_storage_label_pages(
            label_payload(items=[item(1, name="MRI Gradient Amplifier Assembly")])
        )

        self.assertIn("^FDMRI Gradient^FS", pages[0])
        self.assertIn("^FDAmplifier^FS", pages[0])
        self.assertIn("^FDAssembly^FS", pages[0])

    def test_twenty_character_barcode_gets_wide_two_dot_column(self) -> None:
        long_code = "ABCDEFGHIJKLMNOPQRST"
        long_item = item(1)
        long_item["barcode_value"] = long_code
        pages = build_storage_label_pages(label_payload(items=[long_item]))

        self.assertEqual(len(long_code), MAX_ITEM_CODE_CHARACTERS)
        self.assertIn("^FO220,467^GB2,134,2^FS", pages[0])
        self.assertIn(
            f"^FO250,490^BY2,2,58^BCN,58,N,N,N^FH\\^FD{long_code}^FS",
            pages[0],
        )

        too_long = item(2)
        too_long["barcode_value"] = "X" * (MAX_ITEM_CODE_CHARACTERS + 1)
        with self.assertRaises(StorageLabelError):
            build_storage_label_pages(label_payload(items=[too_long]))

    def test_bin_scales_six_to_ten_and_paginates_above_ten(self) -> None:
        compressed = build_storage_label_pages(
            label_payload(items=[item(index) for index in range(1, 11)])
        )
        paged = build_storage_label_pages(
            label_payload(items=[item(index) for index in range(1, 41)])
        )

        self.assertEqual(len(compressed), 1)
        self.assertIn("^A0N,22,19", compressed[0])
        self.assertEqual(len(paged), 4)
        for page_number, zpl in enumerate(paged, start=1):
            self.assertIn(f"{page_number}/4", zpl)
            self.assertIn("AIS-B00047", zpl)
            self.assertIn("LA,https://magmo.cloud/NewSearch/inventory/storage/B47", zpl)
        combined = "\n".join(paged)
        for index in range(1, 41):
            self.assertEqual(combined.count(f"CODE{index:05d}"), 1)
            self.assertEqual(combined.count(f"AIS{index:05d}"), 1)

    def test_dynamic_text_cannot_inject_zpl_commands(self) -> None:
        malicious = item(1, name="Valve ^XZ ~JA \\ printer")
        malicious["barcode_value"] = "AIS^XA~JA\\1"
        pages = build_storage_label_pages(label_payload(items=[malicious]))
        zpl = pages[0]

        self.assertEqual(zpl.count("^XA"), 1)
        self.assertEqual(zpl.count("^XZ"), 1)
        self.assertNotIn("~JA", zpl)
        self.assertIn("\\5EXZ", zpl)
        self.assertIn("\\7EJA", zpl)
        self.assertIn("\\5C", zpl)
        self.assertEqual(zpl_escape("^~\\"), "\\5E\\7E\\5C")

    def test_pallet_has_large_identifier_bin_grid_and_footer(self) -> None:
        pages = build_storage_label_pages(
            label_payload("P65", bins=[bin_entry(index) for index in range(1, 14)])
        )

        self.assertEqual(len(pages), 1)
        zpl = pages[0]
        self.assertIn(f"^PW{LABEL_WIDTH_DOTS}", zpl)
        self.assertIn(f"^LL{LABEL_LENGTH_DOTS}", zpl)
        self.assertNotIn("^PW1180", zpl)
        self.assertIn("P65", zpl)
        self.assertIn("^A0R,116,116", zpl)
        self.assertEqual(zpl.count("^BCR"), 14)
        for index in range(1, 14):
            self.assertIn(f"^FDB{index}^FS", zpl)
            self.assertIn(f"^FDAIS-B{index:05d}^FS", zpl)
        self.assertIn("^FO148,400^GB107,380,2^FS", zpl)
        self.assertIn("AIS-P00065", zpl)
        self.assertIn("^BQN,2,4", zpl)
        self.assertIn("^FO16,970^BQN,2,4", zpl)
        self.assertIn("^FO134,20^GB2,920,2^FS", zpl)
        self.assertIn("LA,https://magmo.cloud/NewSearch/inventory/storage/P65", zpl)

    def test_sparse_pallets_use_wider_three_dot_bin_barcodes(self) -> None:
        zpl = build_storage_label_pages(
            label_payload("P65", bins=[bin_entry(47), bin_entry(48), bin_entry(49)])
        )[0]

        self.assertEqual(zpl.count("^BY3"), 3)
        for index in range(47, 50):
            self.assertIn(f"^FDAIS-B{index:05d}^FS", zpl)

    def test_pallet_uses_three_by_five_page_then_paginates(self) -> None:
        full_page = build_storage_label_pages(
            label_payload(
                "P9",
                bins=[bin_entry(index) for index in range(1, MAX_PALLET_BINS_PER_PAGE + 1)],
            )
        )
        paged = build_storage_label_pages(
            label_payload(
                "P9",
                bins=[bin_entry(index) for index in range(1, MAX_PALLET_BINS_PER_PAGE + 2)],
            )
        )

        self.assertEqual(MAX_PALLET_BINS_PER_PAGE, 15)
        self.assertEqual(len(full_page), 1)
        self.assertEqual(full_page[0].count("^BCR"), 16)
        self.assertEqual(len(paged), 2)
        self.assertIn("1/2", paged[0])
        self.assertIn("2/2", paged[1])
        self.assertIn("^FO148,20^GB527,1140,2^FS", paged[1])
        combined = "\n".join(paged)
        for index in range(1, MAX_PALLET_BINS_PER_PAGE + 2):
            self.assertEqual(combined.count(f"^FDB{index}^FS"), 1)
            self.assertEqual(combined.count(f"^FDAIS-B{index:05d}^FS"), 1)

    def test_maximum_bin_identifier_stays_inside_landscape_barcode_tiles(self) -> None:
        bins = [bin_entry(index) for index in range(1, MAX_PALLET_BINS_PER_PAGE)]
        bins.append(bin_entry(99999))
        zpl = build_storage_label_pages(label_payload("P99999", bins=bins))[0]

        self.assertIn("^FDB99999^FS", zpl)
        self.assertIn("^FDAIS-B99999^FS", zpl)
        self.assertIn("^BY2,2,58^BCR,58,N,N,N", zpl)
        origins = re.findall(r"\^FO(-?\d+),(-?\d+)", zpl)
        self.assertTrue(origins)
        for raw_x, raw_y in origins:
            with self.subTest(origin=(raw_x, raw_y)):
                self.assertGreaterEqual(int(raw_x), 0)
                self.assertLessEqual(int(raw_x), LABEL_WIDTH_DOTS)
                self.assertGreaterEqual(int(raw_y), 0)
                self.assertLessEqual(int(raw_y), LABEL_LENGTH_DOTS)


class StorageLabelRouteTests(unittest.TestCase):
    def make_app(self, *, fail_page: int | None = None):
        app = Flask(__name__)
        printed: list[str] = []

        class AuthError(Exception):
            status_code = 401
            code = "unauthorized"
            message = "Unauthorized"

        def authorize(header: str | None) -> None:
            if header != f"Bearer {TOKEN}":
                raise AuthError()

        def printer(zpl: str) -> None:
            if fail_page is not None and len(printed) + 1 == fail_page:
                raise RuntimeError("synthetic printer failure that must not leak")
            printed.append(zpl)

        register_storage_label_routes(app, authorize=authorize, printer=printer)
        return app, printed

    def test_route_authenticates_before_parsing_or_printing(self) -> None:
        app, printed = self.make_app()
        response = app.test_client().post("/print-storage-label", json={"anything": "goes"})

        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.get_json()["code"], "unauthorized")
        self.assertEqual(printed, [])
        self.assertEqual(response.headers["Cache-Control"], "no-store, max-age=0")

    def test_route_prints_every_page_and_returns_only_summary(self) -> None:
        app, printed = self.make_app()
        payload = label_payload(items=[item(index) for index in range(1, 12)])
        response = app.test_client().post(
            "/print-storage-label",
            json=payload,
            headers={"Authorization": f"Bearer {TOKEN}"},
        )

        self.assertEqual(response.status_code, 200)
        result = response.get_json()
        self.assertEqual(result["pagesPrinted"], 2)
        self.assertEqual(result["pageCount"], 2)
        self.assertEqual(result["itemCount"], 11)
        self.assertEqual(result["serialCode"], "AIS-B00047")
        self.assertNotIn("zpl", result)
        self.assertEqual(len(printed), 2)

    def test_route_rejects_non_json_and_exact_schema_violations_without_printing(self) -> None:
        app, printed = self.make_app()
        client = app.test_client()
        non_json = client.post(
            "/print-storage-label",
            data="not json",
            headers={"Authorization": f"Bearer {TOKEN}"},
        )
        payload = label_payload()
        payload["unexpected"] = True
        invalid = client.post(
            "/print-storage-label",
            json=payload,
            headers={"Authorization": f"Bearer {TOKEN}"},
        )

        self.assertEqual(non_json.status_code, 415)
        self.assertEqual(invalid.status_code, 400)
        self.assertEqual(printed, [])

    def test_route_reports_partial_print_without_leaking_exception(self) -> None:
        app, printed = self.make_app(fail_page=2)
        response = app.test_client().post(
            "/print-storage-label",
            json=label_payload(items=[item(index) for index in range(1, 12)]),
            headers={"Authorization": f"Bearer {TOKEN}"},
        )

        self.assertEqual(response.status_code, 502)
        result = response.get_json()
        self.assertEqual(result["code"], "print_failed")
        self.assertEqual(result["pagesPrinted"], 1)
        self.assertEqual(result["pageCount"], 2)
        self.assertNotIn("synthetic", str(result))
        self.assertEqual(len(printed), 1)


if __name__ == "__main__":
    unittest.main()
