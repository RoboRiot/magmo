"""Offline regression tests using the current server's real listener module."""
import copy
import unittest
from types import SimpleNamespace
from unittest import mock

import bluefolder_slack_listener_v2 as listener

DISPATCH = "C07EPLKV9JT"
ROOT = "1787353249.442979"
DELETED_AT = "2026-08-21T20:58:08.307Z"


class MemoryState:
    def __init__(self, record=None):
        self.data = {
            "processed_work_order_ids": {"10455": record or {
                "number": "10455", "service_request_id": "10455",
                "ops_work_order_id": "10455", "ops_created_at": "2026-08-21T00:00:00Z",
                "discovered_from_existing_magmo": True, "ops_workflow_status": "done",
                "slack_channel": DISPATCH, "slack_ts": ROOT,
            }},
            "ops_thread_state": {f"{DISPATCH}:{ROOT}": {"last_message_ts": "1787353300.000001"}},
            "pending_magmo_imports": {},
        }
        self.saves = 0

    def save(self):
        self.saves += 1


def context(**extra):
    return {
        "workOrderId": "10455", "number": "10455", "blueFolder": {"serviceRequestId": "10455"},
        "workflowStatus": "done", "latestIngestedSlackTs": "1787353300.000001",
        "slackChannel": DISPATCH, "slackThreadTs": ROOT,
        "deleted": False, "deletedAt": None, **extra,
    }


class ConfirmedTombstoneTests(unittest.TestCase):
    def setUp(self):
        self.state = MemoryState()
        self.settings = SimpleNamespace(ops_api_context_refresh_batch=20, ops_conversation_channel_id=DISPATCH)
        self.ops = mock.Mock(spec=["work_order_context"])

    def hydrate(self, response):
        self.ops.work_order_context.return_value = response
        return listener.hydrate_work_order_contexts_from_ops_api(self.settings, self.state, self.ops)

    def saved(self):
        return self.state.data["processed_work_order_ids"]["10455"]

    def test_confirmed_deleted_stops_evidence_but_keeps_read_only_context_rotation(self):
        cursors = copy.deepcopy(self.state.data["ops_thread_state"])
        self.hydrate(context(deleted=True, deletedAt=DELETED_AT))
        self.assertTrue(listener.ops_record_is_deleted(self.saved()))
        self.assertEqual(self.saved()["ops_monitoring_suppressed_reason"], "magmo_confirmed_deleted")
        self.assertEqual(listener.ops_work_order_records(self.settings, self.state), [])
        self.assertEqual(len(listener._api_context_candidates(self.state)), 1)
        self.assertEqual(self.state.data["ops_thread_state"], cursors)
        self.hydrate(context(deleted=True, deletedAt=DELETED_AT))
        self.assertEqual(len(self.saved()["ops_monitoring_audit"]), 1)

    def test_authoritative_restore_resumes_done_without_rewinding_cursor(self):
        self.hydrate(context(deleted=True, deletedAt=DELETED_AT))
        cursors = copy.deepcopy(self.state.data["ops_thread_state"])
        self.hydrate(context(deleted=False))
        self.assertFalse(listener.ops_record_is_deleted(self.saved()))
        self.assertEqual(len(listener.ops_work_order_records(self.settings, self.state)), 1)
        self.assertNotIn("ops_monitoring_suppressed_reason", self.saved())
        self.assertEqual([row["action"] for row in self.saved()["ops_monitoring_audit"]], ["suppressed", "restored"])
        self.assertEqual(self.state.data["ops_thread_state"], cursors)

    def test_older_api_missing_field_cannot_erase_saved_tombstone(self):
        self.hydrate(context(deleted=True, deletedAt=DELETED_AT))
        old_response = context()
        old_response.pop("deleted")
        old_response.pop("deletedAt")
        self.hydrate(old_response)
        self.assertTrue(listener.ops_record_is_deleted(self.saved()))
        self.assertEqual(listener.ops_work_order_records(self.settings, self.state), [])

    def test_missing_import_not_marked_confirmed_deleted_and_stays_pending(self):
        self.state = MemoryState(record={"number": "10455", "service_request_id": "10455", "baseline": True})
        self.state.data["ops_context_candidates"] = {"10455": {"number": "10455", "service_request_id": "10455"}}
        self.state.data["pending_magmo_imports"] = {"10455": {"number": "10455", "retryable": True}}
        self.hydrate(None)
        self.assertFalse(listener.ops_record_is_deleted(self.saved()))
        self.assertNotIn("ops_tombstone_source", self.saved())
        self.assertTrue(self.state.data["pending_magmo_imports"]["10455"]["retryable"])
        self.assertEqual(len(listener._api_context_candidates(self.state)), 1)

    def test_identity_mismatch_never_suppresses_another_order(self):
        for override in ({"workOrderId": "10456"}, {"number": "10456"}, {"blueFolder": {"serviceRequestId": "10456"}}):
            with self.subTest(override=override):
                self.hydrate(context(deleted=True, deletedAt=DELETED_AT, **override))
                self.assertNotIn("ops_deleted_at", self.saved())
                self.assertNotIn("ops_tombstone_source", self.saved())

    def test_invalid_timestamp_is_not_valid_tombstone_proof(self):
        self.hydrate(context(deleted=True, deletedAt="not-a-timestamp"))
        self.assertFalse(listener.ops_record_is_deleted(self.saved()))
        self.assertIn("Invalid Magmo tombstone", self.saved()["ops_context_refresh_error"])

    def test_done_service_complete_remain_monitored_closed_does_not(self):
        for status, expected in (("done", 1), ("service_complete", 1), ("active", 1), ("closed", 0)):
            with self.subTest(status=status):
                self.hydrate(context(workflowStatus=status))
                self.assertEqual(len(listener.ops_work_order_records(self.settings, self.state)), expected)

    def test_testing_channel_is_never_adopted_on_restore(self):
        self.hydrate(context(deleted=True, deletedAt=DELETED_AT))
        self.hydrate(context(slackChannel="C07F6V10PRS"))
        self.assertEqual(self.saved()["slack_channel"], DISPATCH)
        self.assertNotEqual(self.saved().get("ops_conversation_channel"), "C07F6V10PRS")


if __name__ == "__main__":
    unittest.main()
