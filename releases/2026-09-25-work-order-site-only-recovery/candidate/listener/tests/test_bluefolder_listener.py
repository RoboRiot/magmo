from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path
from unittest import mock

import bluefolder_slack_listener_v2 as listener
from slack_part_references import SlackPartReferenceResolver


class CutoverSafetyTests(unittest.TestCase):
    def _state(self, payload):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        path = Path(temporary.name) / "state.json"
        path.write_text(json.dumps(payload), encoding="utf-8")
        return listener.StateStore(path)

    def test_cutover_blocks_historical_item_even_under_alternate_id(self):
        state = self._state(
            {
                "baseline_initialized_at": "2026-08-07T17:42:05+00:00",
                "cutover_work_order_number": 10374,
                "processed_work_order_ids": {},
                "last_seen_created_at": None,
            }
        )
        settings = listener.Settings(ops_track_assignments=False)
        items = [
            {
                "serviceRequestId": "internal-old-id",
                "serviceRequestNumber": "10374",
                "dateCreated": "2026-08-07T18:00:00+00:00",
            },
            {
                "serviceRequestId": "internal-new-id",
                "serviceRequestNumber": "10375",
                "dateCreated": "2026-08-07T19:00:00+00:00",
            },
        ]

        candidates = listener.filter_new_items(items, state, settings)

        self.assertEqual(len(candidates), 1)
        self.assertEqual(candidates[0]["serviceRequestNumber"], "10375")

    def test_pending_ops_retry_skips_everything_at_or_below_cutover(self):
        state = self._state(
            {
                "baseline_initialized_at": "2026-08-07T17:42:05+00:00",
                "cutover_work_order_number": 10374,
                "processed_work_order_ids": {
                    "10374": {
                        "number": "10374",
                        "slack_channel": "C07EPLKV9JT",
                        "slack_ts": "1000000000.000001",
                        "processed_at": "2026-08-07T18:00:00+00:00",
                    },
                    "10375": {
                        "number": "10375",
                        "slack_channel": "C07EPLKV9JT",
                        "slack_ts": "1000000001.000001",
                        "processed_at": "2026-08-07T19:00:00+00:00",
                    },
                },
            }
        )
        settings = listener.Settings(
            ops_track_assignments=False,
            ops_testing_channel_id="",
            ops_conversation_channel_id="",
        )
        ops = mock.Mock()

        listener.sync_pending_work_orders(settings, state, ops)

        ops.create_work_order.assert_called_once()
        self.assertEqual(ops.create_work_order.call_args.args[0], "10375")


class OpsIngestPayloadTests(unittest.TestCase):
    def test_create_uses_original_slack_identity_for_idempotency(self):
        client = object.__new__(listener.MagmoOpsIngestClient)
        client._request = mock.Mock(return_value={"ok": True})
        client.create_work_order(
            "internal-id",
            {
                "number": "10375",
                "subject": "Customer - service request",
                "slack_channel": "C07EPLKV9JT",
                "slack_ts": "1800000000.000001",
            },
        )

        payload = client._request.call_args.args[0]
        self.assertEqual(payload["eventType"], "work_order.created")
        self.assertEqual(payload["workOrderId"], "10375")
        self.assertEqual(payload["commandTs"], "1800000000.000001")
        self.assertEqual(payload["source"]["channel"], "C07EPLKV9JT")
        self.assertEqual(payload["source"]["threadTs"], "1800000000.000001")
        self.assertEqual(payload["source"]["command"], "work_order.created")
        self.assertTrue(payload["actor"]["id"])


class PartReferenceTests(unittest.TestCase):
    def test_primary_part_name_removes_purchase_source_details(self):
        resolver = SlackPartReferenceResolver(
            lambda _list_id, _record_id: {
                "item": {
                    "fields": [
                        {
                            "column_id": "primary",
                            "text": "Gradient amplifier purchased from Vendor Name",
                        }
                    ]
                },
                "list": {
                    "list_metadata": {
                        "schema": [
                            {"id": "primary", "is_primary_column": True}
                        ]
                    }
                },
            }
        )
        result = resolver.expand(
            "Installed https://example.slack.com/lists/F12345678?record_id=RecABC123"
        )
        self.assertEqual(result, "Installed Gradient amplifier")

    def test_unresolved_record_never_leaks_opaque_record_id(self):
        resolver = SlackPartReferenceResolver(lambda *_args: {})
        result = resolver.expand(
            "Used https://example.slack.com/lists/F12345678?record_id=RecABC123"
        )
        self.assertEqual(result, "Used linked part")
        self.assertNotIn("RecABC123", result)


if __name__ == "__main__":
    unittest.main()
