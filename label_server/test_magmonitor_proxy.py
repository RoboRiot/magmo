from __future__ import annotations

import io
import unittest
from contextlib import redirect_stdout
from unittest.mock import patch

import requests

from label_server import print_bluefolder_combo as service


class FakeResponse:
    def __init__(
        self,
        status_code: int,
        content: bytes,
        content_type: str = "application/json",
    ) -> None:
        self.status_code = status_code
        self.content = content
        self.headers = {"Content-Type": content_type}
        self.text = content.decode("utf-8", errors="replace")


class MagmonitorPublicProxyTests(unittest.TestCase):
    def setUp(self) -> None:
        service.app.config.update(TESTING=True)
        self.client = service.app.test_client()
        self.body = (
            b'{ "schemaVersion": 2, "source": "magmonitor_ge", '
            b'"manufacturer": "GE", "systemName": "AIS41", '
            b'"collectedAt": "2026-08-12T05:00:00Z", '
            b'"metrics": {"reading": 12.500, "count": 735} }'
        )
        self.headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Magmonitor-Key": "test-key-must-not-be-logged",
            "X-Magmonitor-Delivery-ID": "a" * 64,
            "X-Magmonitor-Relay-Version": "1",
        }

    def test_ingest_preserves_exact_body_and_required_headers(self) -> None:
        relay_response = FakeResponse(202, b'{"status":"queued"}')
        with patch.object(
            service.requests, "post", return_value=relay_response
        ) as post:
            response = self.client.post(
                "/api/magmonitor/ingest",
                data=self.body,
                headers=self.headers,
            )

        self.assertEqual(response.status_code, 202)
        self.assertEqual(response.data, b'{"status":"queued"}')
        post.assert_called_once()
        _args, kwargs = post.call_args
        self.assertEqual(kwargs["data"], self.body)
        self.assertEqual(kwargs["headers"], self.headers)
        self.assertEqual(kwargs["timeout"], 4.0)
        self.assertFalse(kwargs["allow_redirects"])

    def test_ingest_passes_through_relay_200(self) -> None:
        relay_response = FakeResponse(200, b'{"status":"accepted"}')
        with patch.object(service.requests, "post", return_value=relay_response):
            response = self.client.post(
                "/api/magmonitor/ingest",
                data=self.body,
                headers=self.headers,
            )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, b'{"status":"accepted"}')

    def test_ingest_rejects_body_larger_than_one_mib_without_forwarding(self) -> None:
        with patch.object(service.requests, "post") as post:
            response = self.client.post(
                "/api/magmonitor/ingest",
                data=b"x" * (service.MAGMONITOR_MAX_BODY_BYTES + 1),
                headers=self.headers,
            )

        self.assertEqual(response.status_code, 413)
        post.assert_not_called()

    def test_ingest_logs_neither_key_nor_full_body(self) -> None:
        output = io.StringIO()
        relay_response = FakeResponse(202, b'{"status":"queued"}')
        with patch.object(service.requests, "post", return_value=relay_response):
            with redirect_stdout(output):
                response = self.client.post(
                    "/api/magmonitor/ingest",
                    data=self.body,
                    headers=self.headers,
                )

        self.assertEqual(response.status_code, 202)
        logged = output.getvalue()
        self.assertIn("delivery_id=" + ("a" * 64), logged)
        self.assertNotIn("test-key-must-not-be-logged", logged)
        self.assertNotIn(self.body.decode("utf-8"), logged)

    def test_ingest_returns_sanitized_503_when_local_relay_is_unavailable(self) -> None:
        output = io.StringIO()
        with patch.object(
            service.requests,
            "post",
            side_effect=requests.ConnectionError("secret diagnostic"),
        ):
            with redirect_stdout(output):
                response = self.client.post(
                    "/api/magmonitor/ingest",
                    data=self.body,
                    headers=self.headers,
                )

        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.get_json()["error"], "Local MAGMO relay is unavailable")
        self.assertNotIn("secret diagnostic", output.getvalue())

    def test_health_proxies_local_relay_health(self) -> None:
        relay_response = FakeResponse(
            200,
            b'{"status":"ok","service":"magmonitor-relay"}',
        )
        with patch.object(
            service.requests, "get", return_value=relay_response
        ) as get:
            response = self.client.get("/api/magmonitor/healthz")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, relay_response.content)
        get.assert_called_once_with(
            service.MAGMONITOR_RELAY_HEALTH_URL,
            timeout=service.MAGMONITOR_LOCAL_TIMEOUT_SECONDS,
            allow_redirects=False,
        )

    def test_existing_print_and_bluefolder_routes_remain_registered(self) -> None:
        rules = {
            (rule.rule, tuple(sorted(rule.methods - {"HEAD", "OPTIONS"})))
            for rule in service.app.url_map.iter_rules()
        }
        self.assertIn(("/print-label", ("POST",)), rules)
        self.assertIn(("/print_multi", ("POST",)), rules)
        self.assertIn(("/bluefolder", ("POST",)), rules)
        self.assertIn(("/storage-scan/start", ("POST",)), rules)
        self.assertIn(("/storage-scan/stop", ("POST",)), rules)

    def test_storage_scan_route_is_registered_and_fails_unauthorized(self) -> None:
        response = self.client.post("/storage-scan/start", json={})

        self.assertEqual(response.status_code, 401)

    def test_storage_bridge_has_no_browser_cors_but_printing_retains_it(self) -> None:
        origin = "https://warehouse-browser.example"
        bridge_response = self.client.post(
            "/storage-scan/start", json={}, headers={"Origin": origin}
        )
        with patch.object(service, "print_label"):
            print_response = self.client.post(
                "/print-label",
                json={"name": "CORS regression", "local_sn": "TEST-CORS-1"},
                headers={"Origin": origin},
            )

        self.assertEqual(bridge_response.status_code, 401)
        self.assertNotIn("Access-Control-Allow-Origin", bridge_response.headers)
        self.assertEqual(print_response.status_code, 200)
        self.assertEqual(print_response.headers["Access-Control-Allow-Origin"], origin)

    def test_scanner_start_delegates_to_the_single_embedded_runtime(self) -> None:
        with patch.object(
            service.scanner_runtime, "start", return_value=True
        ) as start, redirect_stdout(io.StringIO()):
            self.assertTrue(service.start_scanner_input())
        start.assert_called_once_with()

    def test_scanner_stop_closes_the_single_embedded_runtime(self) -> None:
        with patch.object(service.scanner_runtime, "close") as close:
            service.stop_scanner_input()
        close.assert_called_once_with()

    def test_print_label_route_still_builds_and_dispatches_one_label(self) -> None:
        payload = {
            "name": "Scanner bridge regression check",
            "local_sn": "TEST-PRINT-1",
        }
        with patch.object(service, "print_label") as print_label:
            response = self.client.post("/print-label", json=payload)

        self.assertEqual(response.status_code, 200)
        print_label.assert_called_once()
        zpl = print_label.call_args.args[0]
        self.assertIn("^FDTEST-PRINT-1^FS", zpl)
        self.assertTrue(zpl.startswith("^XA\n^PW820\n^LL1180\n^LH0,0\n"))
        self.assertIn("^FO550,990^BQN,2,5", zpl)
        self.assertIn("^FO75,990^A0N,50,50^FDPO number:", zpl)
        self.assertIn("^FO75,1040^BY3^BCN,90,Y,N,N", zpl)
        self.assertNotIn("^FO550,1000^BQN,2,6", zpl)
        self.assertNotIn("^FO75,1080^BY3^BCN,100,Y,N,N", zpl)

    def test_bluefolder_validation_still_rejects_before_network(self) -> None:
        with patch.object(service.requests, "post") as post:
            response = self.client.post("/bluefolder", json={})

        self.assertEqual(response.status_code, 400)
        post.assert_not_called()

    def test_bluefolder_success_path_still_uses_both_existing_calls(self) -> None:
        item_response = FakeResponse(
            200,
            b'<response status="ok"><itemId>regression-item</itemId></response>',
            "text/xml",
        )
        material_response = FakeResponse(
            200,
            b'<response status="ok"></response>',
            "text/xml",
        )
        payload = {"name": "Regression item", "workOrder": "test-work-order"}
        with patch.object(
            service.requests,
            "post",
            side_effect=[item_response, material_response],
        ) as post:
            response = self.client.post("/bluefolder", json=payload)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(post.call_count, 2)


if __name__ == "__main__":
    unittest.main()
