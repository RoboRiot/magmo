import copy
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from flask import Flask
from warehouse_scanner.tool_label_print import build_tool_label, parse_tool_label_payload, register_tool_label_routes, ToolLabelError


def sample():
    return {"template": "tool-v1", "label_type": "tool", "tool_id": "AIS_T00047", "name": "Digital Multimeter Kit", "description": "Meter, test leads and carrying case.", "oem": "Fluke", "model": "87V", "modality": "Service", "barcode_value": "AIS_T00047", "barcode_format": "CODE128", "qr_value": "https://magmo.cloud/NewSearch/Tools/AIS_T00047"}


class ToolLabelTests(unittest.TestCase):
    def client(self, printer=None):
        self.jobs = []
        app = Flask(__name__)
        def authorize(header):
            if header != "Bearer synthetic-test-token":
                raise ValueError("secret must not escape")
        register_tool_label_routes(app, authorize=authorize, printer=printer or self.jobs.append)
        return app.test_client()

    def test_fixed_identity_barcode_qr_and_safe_label_envelope(self):
        zpl = build_tool_label(sample())
        self.assertIn("^PW820\n^LL1180\n^LH0,0", zpl)
        self.assertIn("^FO58,948^BY3,2,100^BCN,100,N,N,N^FDAIS_T00047^FS", zpl)
        self.assertIn("^BY2,2,10^FO565,932^BQN,2,5^FDLA,https://magmo.cloud/NewSearch/Tools/AIS_T00047^FS", zpl)
        self.assertEqual(zpl.count("^XA"), 1)
        self.assertEqual(zpl.count("^XZ"), 1)
        self.assertLess(932 + (33 + 8) * 5, 1180)

    def test_injection_text_cannot_add_zpl_commands(self):
        payload = sample()
        payload["name"] = "Test ^XZ ~JA \\ tool"
        zpl = build_tool_label(payload)
        self.assertEqual(zpl.count("^XZ"), 1)
        self.assertNotIn("~JA", zpl)
        self.assertIn("\\5E", zpl)

    def test_identity_or_url_substitution_rejected(self):
        for key, value in (("barcode_value", "AIS33551"), ("qr_value", "https://attacker.example"), ("tool_id", "AIS_T00000"), ("template", "storage-unit-v2"), ("name", "")):
            payload = sample(); payload[key] = value
            with self.subTest(key=key), self.assertRaises(ToolLabelError):
                parse_tool_label_payload(payload)

    def test_extra_keys_and_noncanonical_ids_rejected(self):
        for update in ({"extra": "value"}, {"tool_id": "ais_t00047"}, {"tool_id": "AIS_T47"}, {"description": "line\nbreak"}):
            with self.subTest(update=update), self.assertRaises(ToolLabelError):
                parse_tool_label_payload({**sample(), **update})

    def test_authentication_precedes_payload_and_no_job(self):
        response = self.client().post("/print-tool-label", json=sample())
        self.assertEqual(response.status_code, 401)
        self.assertEqual(self.jobs, [])
        self.assertNotIn("secret", response.get_data(as_text=True))

    def test_valid_request_prints_once(self):
        response = self.client().post("/print-tool-label", json=sample(), headers={"Authorization": "Bearer synthetic-test-token"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json["toolId"], "AIS_T00047")
        self.assertEqual(len(self.jobs), 1)
        self.assertIn("no-store", response.headers["Cache-Control"])

    def test_print_error_is_not_reported_as_success(self):
        for printer in (lambda _: False, lambda _: (_ for _ in ()).throw(RuntimeError("private-printer-detail"))):
            response = self.client(printer).post("/print-tool-label", json=sample(), headers={"Authorization": "Bearer synthetic-test-token"})
            self.assertEqual(response.status_code, 502)
            self.assertNotIn("private-printer-detail", response.get_data(as_text=True))

    def test_request_guards(self):
        client = self.client()
        headers = {"Authorization": "Bearer synthetic-test-token"}
        self.assertEqual(client.get("/print-tool-label").status_code, 405)
        self.assertEqual(client.post("/print-tool-label", data="text", headers=headers).status_code, 415)
        self.assertEqual(client.post("/print-tool-label", data="{", content_type="application/json", headers=headers).status_code, 400)
        self.assertEqual(client.post("/print-tool-label", data="x" * 8193, content_type="application/json", headers=headers).status_code, 413)
        self.assertEqual(self.jobs, [])


if __name__ == "__main__":
    unittest.main()
