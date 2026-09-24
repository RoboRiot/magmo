import json
import tempfile
import unittest
from pathlib import Path
from unittest import mock

import bluefolder_slack_listener_v2 as listener


class BlueFolderCloseStatusTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.state = listener.StateStore(Path(self.tmp.name) / "state.json")
        self.record = {
            "number": "10660", "service_request_id": "9910660",
            "ops_work_order_id": "magmo-660", "ops_created_at": "2026-09-01T00:00:00Z",
            "ops_workflow_status": "done", "ops_status": "completed",
        }
        self.state.data["processed_work_order_ids"] = {"9910660": self.record}
        self.settings = listener.Settings(ops_track_assignments=False)
        self.bluefolder = mock.Mock()
        self.ops = mock.Mock(supports_bluefolder_status_sync=True)
        self.ops.work_order_context.return_value = {
            "workOrderId": "magmo-660", "number": "10660", "workflowStatus": "done",
            "blueFolder": {"serviceRequestId": "9910660"},
        }
        self.ops.sync_bluefolder_closed_status.return_value = {
            "ok": True, "eventType": "work_order.bluefolder_status", "created": False,
            "workOrderId": "magmo-660", "blueFolder": {"serviceRequestId": "9910660"},
            "statusChanged": True, "reason": "applied", "requestId": "test-only",
            "after": {"workflowStatus": "closed", "status": "closed"},
            "appliedChanges": {"workflowStatus": "closed"},
        }

    def item(self, status="Closed", closed_at="2026-09-24T15:00:00Z"):
        return {"id": "9910660", "number": "10660", "status": status, "dateTimeClosed": closed_at}

    def observe(self, *items):
        return listener.observe_bluefolder_close_statuses(self.settings, self.state, self.bluefolder, self.ops, list(items))

    def queue(self):
        self.observe(self.item("In Progress", ""))
        self.assertEqual(self.observe(self.item()), 1)
        self.bluefolder.get_work_order_for_status_sync.return_value = self.item()
        return self.state.data["bluefolder_close_sync"]["pending"]["9910660"]

    def flush(self):
        return listener.flush_bluefolder_close_statuses(self.settings, self.state, self.bluefolder, self.ops)

    def test_existing_closed_is_review_only(self):
        self.observe(self.item())
        self.observe(self.item())
        sync = self.state.data["bluefolder_close_sync"]
        self.assertEqual(len(sync["historical_review"]), 1)
        self.assertEqual(sync["pending"], {})
        self.assertEqual(self.flush(), 0)
        self.ops.sync_bluefolder_closed_status.assert_not_called()

    def test_done_and_missing_slack_receipt_are_eligible(self):
        entry = self.queue()
        self.assertEqual(entry["payload"]["workOrderId"], "magmo-660")
        self.assertEqual(self.flush(), 1)
        self.assertEqual(self.record["ops_workflow_status"], "closed")
        self.ops.import_work_order.assert_not_called()
        self.ops.create_work_order.assert_not_called()
        self.bluefolder.get_work_order_for_status_sync.assert_called_once_with("9910660")

    def test_stale_closed_date_does_not_mean_closed(self):
        self.observe(self.item("Open"))
        self.assertEqual(self.state.data["bluefolder_close_sync"]["pending"], {})

    def test_current_magmo_closed_is_not_queued(self):
        self.record["ops_workflow_status"] = "closed"
        self.observe(self.item("Open", ""))
        self.assertEqual(self.observe(self.item()), 0)

    def test_current_magmo_deleted_is_not_queued(self):
        self.record["ops_deleted_at"] = "2026-09-20T00:00:00Z"
        self.observe(self.item("Open", ""))
        self.assertEqual(self.observe(self.item()), 0)

    def test_historical_outside_list_uses_detail_read_without_receipt(self):
        self.bluefolder.get_work_order_for_status_sync.return_value = self.item("Open", "")
        self.observe()
        self.bluefolder.get_work_order_for_status_sync.return_value = self.item()
        self.assertEqual(self.observe(), 1)

    def test_wrong_detail_id_never_checkpoints(self):
        self.bluefolder.get_work_order_for_status_sync.return_value = {"id": "wrong", "status": "Closed"}
        self.observe()
        self.assertEqual(self.state.data["bluefolder_close_sync"]["observations"], {})

    def test_missing_capability_never_writes(self):
        self.queue()
        self.ops.supports_bluefolder_status_sync = False
        self.assertEqual(self.flush(), 0)
        self.ops.sync_bluefolder_closed_status.assert_not_called()

    def test_disabled_and_dry_run_never_write(self):
        self.queue()
        self.settings.dry_run = True
        self.assertEqual(self.flush(), 0)
        self.settings.dry_run = False
        self.settings.bluefolder_close_sync_enabled = False
        self.assertEqual(self.flush(), 0)
        self.ops.sync_bluefolder_closed_status.assert_not_called()

    def test_network_failure_keeps_exact_durable_payload_for_retry(self):
        entry = self.queue()
        original = json.loads(json.dumps(entry["payload"]))
        self.ops.sync_bluefolder_closed_status.side_effect = RuntimeError("offline")
        self.assertEqual(self.flush(), 0)
        self.assertEqual(self.state.data["bluefolder_close_sync"]["pending"]["9910660"]["payload"], original)
        persisted = json.loads(self.state.path.read_text())
        self.assertIn("9910660", persisted["bluefolder_close_sync"]["pending"])
        self.ops.sync_bluefolder_closed_status.side_effect = None
        entry.pop("last_checked_at")
        self.assertEqual(self.flush(), 1)
        self.assertEqual(self.ops.sync_bluefolder_closed_status.call_count, 2)
        self.assertEqual(self.flush(), 0)

    def test_bluefolder_reopen_cancels_unsent_close(self):
        self.queue()
        self.bluefolder.get_work_order_for_status_sync.return_value = self.item("Open")
        self.assertEqual(self.flush(), 0)
        self.assertEqual(self.state.data["bluefolder_close_sync"]["pending"], {})
        self.ops.sync_bluefolder_closed_status.assert_not_called()

    def test_mismatched_magmo_identity_is_not_sent(self):
        self.queue()
        self.ops.work_order_context.return_value["blueFolder"]["serviceRequestId"] = "other"
        self.assertEqual(self.flush(), 0)
        self.ops.sync_bluefolder_closed_status.assert_not_called()

    def test_saved_thread_waits_for_final_successful_scan(self):
        entry = self.queue()
        self.ops.work_order_context.return_value.update({
            "slackChannel": "C07EPLKV9JT", "slackThreadTs": "1780000000.123456",
        })
        self.assertEqual(self.flush(), 0)
        self.ops.sync_bluefolder_closed_status.assert_not_called()
        self.state.data["ops_thread_state"]["C07EPLKV9JT:1780000000.123456"] = {
            "last_successful_scan_at": listener.utc_now_iso(), "last_message_ts": "1780000001.123456",
        }
        entry.pop("last_checked_at")
        self.assertEqual(self.flush(), 1)
        self.assertEqual(self.state.data["ops_thread_state"]["C07EPLKV9JT:1780000000.123456"]["last_message_ts"], "1780000001.123456")

    def test_manual_reopen_protection_ack_does_not_fake_closed(self):
        self.queue()
        self.ops.sync_bluefolder_closed_status.return_value.update({
            "reason": "manual_reopen_protected", "statusChanged": False,
            "after": {"workflowStatus": "active", "status": "active"}, "appliedChanges": {},
        })
        self.assertEqual(self.flush(), 1)
        self.assertEqual(self.record["ops_workflow_status"], "active")
        self.assertNotIn("ops_closed_at", self.record)

    def test_capability_requires_all_no_side_effect_guarantees(self):
        fields = {"statusOnly": True, "createsSlackPosts": False, "writesSlack": False, "writesBlueFolder": False, "deletesMessages": False, "modifiesHours": False, "createsWorkOrders": False}
        health = {"supportedEventTypes": ["work_order.bluefolder_status"], "bluefolderStatusSync": fields}
        self.assertTrue(listener.MagmoOpsIngestClient._bluefolder_status_available(health))
        for key in list(fields):
            invalid = {**health, "bluefolderStatusSync": {k:v for k,v in fields.items() if k != key}}
            self.assertFalse(listener.MagmoOpsIngestClient._bluefolder_status_available(invalid))

    def test_invalid_ack_cannot_clear_queue(self):
        client = object.__new__(listener.MagmoOpsIngestClient)
        client.supports_bluefolder_status_sync = True
        client._request = mock.Mock(return_value={"ok": True, "eventType": "work_order.bluefolder_status"})
        with self.assertRaises(RuntimeError):
            client.sync_bluefolder_closed_status(self.queue()["payload"])

    def test_newer_closed_timestamp_detects_reclosure_between_polls(self):
        self.observe(self.item())
        self.assertEqual(self.observe(self.item(closed_at="2026-09-24T16:00:00Z")), 1)
        self.assertEqual(self.state.data["bluefolder_close_sync"]["historical_review"], {})

    def test_fresh_close_is_reconsidered_after_late_magmo_reopen_hydration(self):
        self.observe(self.item("Open", ""))
        self.state.data["bluefolder_close_sync"]["started_at"] = "2026-09-24T00:00:00Z"
        self.record["ops_workflow_status"] = "closed"
        self.assertEqual(self.observe(self.item()), 0)
        self.record["ops_workflow_status"] = "active"
        self.assertEqual(self.observe(self.item()), 1)

    def test_partial_dispatch_receipt_never_bypasses_final_scan(self):
        self.queue()
        self.ops.work_order_context.return_value["slackChannel"] = "C07EPLKV9JT"
        self.assertEqual(self.flush(), 0)
        self.ops.sync_bluefolder_closed_status.assert_not_called()

    def test_local_exact_thread_still_needs_final_scan_when_context_has_no_receipt(self):
        entry = self.queue()
        self.record.update({
            "ops_conversation_channel": "C07EPLKV9JT", "ops_conversation_ts": "1780000000.123456",
            "ops_conversation_verified_identity": "10660:9910660:C07EPLKV9JT:1780000000.123456",
        })
        self.assertEqual(self.flush(), 0)
        self.ops.sync_bluefolder_closed_status.assert_not_called()
        self.state.data["ops_thread_state"]["C07EPLKV9JT:1780000000.123456"] = {"last_successful_scan_at":listener.utc_now_iso()}
        entry.pop("last_checked_at")
        self.assertEqual(self.flush(), 1)

    def test_unverified_local_thread_holds_status_change(self):
        self.queue()
        self.record.update({"slack_channel":"C07EPLKV9JT","slack_ts":"1780000000.123456"})
        self.assertEqual(self.flush(), 0)
        self.ops.sync_bluefolder_closed_status.assert_not_called()

    def test_bluefolder_observation_never_stops_evidence_before_magmo_ack(self):
        self.assertFalse(listener.ops_record_is_closed({"bluefolder_date_time_closed":"2026-09-24T16:00:00Z", "bluefolder_workflow_stage":"closed"}))

    def test_detail_read_uses_only_xml_get_endpoint_and_exact_id(self):
        client = object.__new__(listener.BlueFolderClient)
        client.settings = self.settings
        response = mock.Mock()
        response.headers = {"Content-Type": "text/xml"}
        response.text = '<response status="ok"><serviceRequest><serviceRequestId>9910660</serviceRequestId><status>Closed</status></serviceRequest></response>'
        response.json.side_effect = ValueError()
        client._request = mock.Mock(return_value=response)
        row = client.get_work_order_for_status_sync("9910660")
        self.assertEqual(row["serviceRequestId"], "9910660")
        args, kwargs = client._request.call_args
        self.assertEqual(args, ("POST", "/serviceRequests/get.aspx"))
        self.assertIn(b'<serviceRequestId>9910660</serviceRequestId>', kwargs['data'])

    def test_detail_read_rejects_source_error_or_other_identity(self):
        client = object.__new__(listener.BlueFolderClient)
        client.settings = self.settings
        response = mock.Mock()
        response.headers = {"Content-Type": "text/xml"}
        response.json.side_effect = ValueError()
        client._request = mock.Mock(return_value=response)
        for xml in [
            '<response status="fail"><error>Invalid request</error></response>',
            '<response status="ok"><serviceRequest><serviceRequestId>9910661</serviceRequestId><status>Closed</status></serviceRequest></response>',
        ]:
            response.text = xml
            with self.assertRaises(RuntimeError):
                client.get_work_order_for_status_sync("9910660")


if __name__ == "__main__":
    unittest.main()
