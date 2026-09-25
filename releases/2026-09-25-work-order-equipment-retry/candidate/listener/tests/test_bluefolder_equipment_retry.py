from __future__ import annotations

import copy
import tempfile
import unittest
from pathlib import Path
from unittest import mock

import requests

import bluefolder_slack_listener_v2 as listener
import test_split_dispatch_ownership as ownership
from test_split_dispatch_ownership import (
    FakeBlueFolder, FakeOps, FakeSlack,
    import_result, settings_for, work_order,
)


EQUIPMENT_ID = "09859C69-CD50-4277-BB40-60A696300768"


def torrance_order(number="10677"):
    return {
        **work_order(number),
        "description": "Prohealth Torrance - MRI need to fix two large flex coils",
        "customerId": "34579369",
        "customerLocationId": "35203706",
        "customerName": "Prohealth Advanced Imaging",
        "customerLocationName": "Prohealth - Torrance",
        "equipmentToService": {"equipmentItem": {"equipmentId": EQUIPMENT_ID, "equipName": "Espree"}},
    }


def response(status="unresolved", **after):
    result = import_result("10677")
    result["after"] = {
        "clientId": "AIS79109", "machineId": "", "trailerId": "",
        "equipmentLinkStatus": status,
        "equipmentLinkIssue": "bluefolder_equipment_not_mapped" if status == "unresolved" else "",
        **after,
    }
    return result


class EquipmentResolutionRetryTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.state = ownership.MagmoOnlyDispatchOwnershipTests.state(self.directory.name)
        self.settings = settings_for(self.directory.name, bluefolder_equipment_sync_batch=6)
        self.context = {"workOrderId": "10677", "number": "10677", "blueFolder": {"serviceRequestId": "10677"}}
        self.ops = FakeOps(self.context, imported=response())
        self.item = torrance_order()
        self.saved = {
            "number": "10677", "service_request_id": "10677", "ops_created_at": "original",
            "subject": "preserved subject", "slack_ts": "123.456", "dispatch_owner": "magmo",
            "ops_workflow_status": "done", "magmo_authoritative_after": {"clientId": "AIS79109", "machineId": "", "trailerId": ""},
        }
        self.state.data["processed_work_order_ids"]["10677"] = self.saved
        self.clock = mock.patch.object(listener.time, "time", return_value=1790359200.0).start()
        self.addCleanup(mock.patch.stopall)

    def record(self, item=None):
        fields = listener.extract_work_order_fields(item or self.item, self.settings)
        return listener.equipment_sync_record(listener.bluefolder_import_record(fields, []))

    def sync(self, items=None):
        return listener.sync_bluefolder_equipment_updates(self.settings, self.state, items or [self.item], self.ops)

    def advance(self, number="10677"):
        pending = self.state.data["bluefolder_equipment_sync_pending"][number]
        self.clock.return_value = listener.parse_dt(pending["next_retry_at"]).timestamp() + 0.01

    def test_10677_legacy_false_sync_recovers_when_espree_mapping_arrives(self):
        fingerprint = listener.equipment_sync_fingerprint(self.record())
        self.saved["bluefolder_equipment_synced_fingerprint"] = fingerprint
        original = copy.deepcopy(self.saved)
        with self.assertLogs(level="WARNING") as logs:
            self.assertEqual(self.sync(), 1)
        self.assertIn("10677 equipment destination unresolved", logs.output[0])
        self.assertEqual(self.saved["bluefolder_equipment_acknowledged_fingerprint"], fingerprint)
        self.assertNotIn("bluefolder_equipment_synced_fingerprint", self.saved)
        self.assertEqual(self.saved["bluefolder_equipment_resolution"]["retry_delay_seconds"], 60)
        self.assertEqual(self.sync(), 0)
        self.ops.import_response = response("resolved", machineId="AIS32820", machineLinkEquipmentIds=[EQUIPMENT_ID])
        self.advance()
        with self.assertLogs(level="INFO") as logs:
            self.assertEqual(self.sync(), 1)
        self.assertIn("10677 equipment destination recovered", "\n".join(logs.output))
        self.assertEqual(self.saved["bluefolder_equipment_synced_fingerprint"], fingerprint)
        self.assertEqual(self.saved["bluefolder_equipment_authoritative_after"]["machineId"], "AIS32820")
        for key in ("subject", "slack_ts", "dispatch_owner", "ops_workflow_status", "magmo_authoritative_after"):
            self.assertEqual(self.saved[key], original[key])
        self.assertEqual(self.state.data["bluefolder_equipment_sync_pending"], {})
        self.state = listener.StateStore(self.state.path)
        self.assertEqual(self.sync(), 0)
        self.assertEqual(len(self.ops.imported), 2)
        self.assertEqual(self.ops.created, [])

    def test_legacy_absent_after_retries_but_proven_machine_can_skip(self):
        fingerprint = listener.equipment_sync_fingerprint(self.record())
        for after in (None, {}, {"clientId": "AIS79109", "machineId": "AIS32820"}):
            saved = {"number": "10677", "ops_created_at": "old", "bluefolder_equipment_synced_fingerprint": fingerprint}
            if after is not None:
                saved["magmo_authoritative_after"] = after
            self.state.data["processed_work_order_ids"]["10677"] = saved
            self.state.data["bluefolder_equipment_sync_pending"] = {}
            self.assertEqual(self.sync(), 0 if after and after.get("machineId") else 1)

    def test_permanent_unresolved_backoff_cap_and_non_spam_observability(self):
        with mock.patch.object(listener.logging, "warning") as warning:
            for expected in (60, 120, 240, 480, 960, 1800, 1800):
                self.assertEqual(self.sync(), 1)
                pending = self.state.data["bluefolder_equipment_sync_pending"]["10677"]
                self.assertEqual(pending["retry_delay_seconds"], expected)
                self.assertEqual(self.sync(), 0)
                self.advance()
            self.assertEqual(warning.call_count, 1)
            self.ops.import_response = response("needs_review", equipmentLinkIssue="selected_equipment_changed")
            self.assertEqual(self.sync(), 1)
            self.assertEqual(warning.call_count, 2)
        health = self.state.data["health"]["bluefolder_equipment_sync"]
        self.assertEqual(health["unresolved_count"], 1)
        self.assertEqual(health["pending_retry_count"], 1)
        self.assertEqual(health["status_counts"]["needs_review"], 1)
        self.assertEqual(health["last_unresolved_reason"], "selected_equipment_changed")
        self.assertIs(health["metadata_acknowledgement_is_resolution"], False)

    def test_selected_equipment_missing_client_stays_pending(self):
        self.ops.import_response = response("site_unresolved", clientId="", equipmentLinkIssue="client_link_missing")
        self.assertEqual(self.sync(), 1)
        self.assertEqual(self.saved["bluefolder_equipment_resolution"]["status"], "site_unresolved")
        self.assertNotIn("bluefolder_equipment_synced_fingerprint", self.saved)

    def test_manual_trailer_preserved_without_rebinding_or_slack(self):
        self.ops.import_response = response("manual", trailerId="AIS20", machineLinkSource="manual")
        self.assertEqual(self.sync(), 1)
        self.assertEqual(self.sync(), 0)
        record = self.ops.imported[0][1]
        self.assertTrue(record["existing_only"])
        self.assertFalse(set(record) & {"machineId", "trailerId", "machine_id", "trailer_id", "subject", "status", "slack_ts"})
        self.assertEqual(self.saved["bluefolder_equipment_authoritative_after"]["trailerId"], "AIS20")
        self.assertEqual(self.saved["bluefolder_equipment_resolution"]["status"], "manual")
        self.assertEqual(self.ops.created, [])

    def test_selection_change_bypasses_previous_backoff_and_resets_attempt(self):
        self.assertEqual(self.sync(), 1)
        changed = {**self.item, "equipmentToService": {"equipmentItem": {"equipmentId": "different", "equipName": "Other"}}}
        self.ops.import_response = response("needs_review", machineId="AIS32820", equipmentLinkIssue="selected_equipment_changed")
        self.assertEqual(self.sync([changed]), 1)
        pending = self.state.data["bluefolder_equipment_sync_pending"]["10677"]
        self.assertEqual(pending["attempts"], 1)
        self.assertEqual(pending["retry_delay_seconds"], 60)
        removed = {**self.item, "equipmentToService": []}
        self.assertEqual(self.sync([removed]), 1)
        self.assertEqual(self.saved["bluefolder_equipment_resolution"]["status"], "needs_review")
        self.assertEqual(self.ops.imported[-1][1]["bluefolder_equipment_ids"], [])
        self.assertNotIn("bluefolder_equipment_synced_fingerprint", self.saved)

    def test_resolution_requires_actual_authoritative_evidence(self):
        cases = [
            ({}, "unresolved"),
            ({"equipmentLinkStatus": "resolved", "machineId": "M"}, "site_unresolved"),
            ({"equipmentLinkStatus": "resolved", "clientId": "C"}, "unresolved"),
            ({"equipmentLinkStatus": "not_selected", "clientId": "C"}, "unresolved"),
            ({"equipmentLinkStatus": "future_unknown", "clientId": "C", "machineId": "M"}, "unresolved"),
            ({"clientId": "C", "machineId": "M", "machineLinkEquipmentIds": ["old"]}, "needs_review"),
        ]
        for after, expected in cases:
            with self.subTest(after=after):
                self.assertEqual(listener.equipment_destination_resolution(after, self.record())[0], expected)
        self.assertEqual(listener.equipment_destination_resolution(
            {"clientId": "C", "machineId": "M", "machineLinkEquipmentIds": [EQUIPMENT_ID.lower()]}, self.record()
        )[0], "resolved")
        empty_record = self.record({**self.item, "equipmentToService": []})
        self.assertEqual(listener.equipment_destination_resolution(
            {"equipmentLinkStatus": "not_selected", "clientId": ""}, empty_record
        ), ("site_unresolved", "missing_client"))
        self.assertEqual(listener.equipment_destination_resolution(
            {"equipmentLinkStatus": "not_selected", "clientId": "AIS79109"}, empty_record
        ), ("not_selected", ""))

    def test_new_magmo_owned_ack_has_pending_status_and_no_duplicate_slack(self):
        self.state.data["processed_work_order_ids"] = {}
        slack = FakeSlack()
        with mock.patch.object(listener, "RUNTIME_BASELINE_DONE", True):
            self.assertEqual(listener.process_once(self.settings, self.state, FakeBlueFolder([self.item]), slack, self.ops), 1)
            self.assertEqual(listener.process_once(self.settings, self.state, FakeBlueFolder([self.item]), slack, self.ops), 0)
        saved = self.state.data["processed_work_order_ids"]["10677"]
        self.assertEqual(saved["bluefolder_equipment_resolution"]["status"], "unresolved")
        self.assertEqual(self.state.data["health"]["bluefolder_equipment_sync"]["unresolved_count"], 1)
        self.assertEqual(len(self.ops.imported), 1)
        self.assertEqual(slack.posts, [])
        self.assertEqual(self.ops.created, [])

    def test_initial_full_import_ack_is_pending_not_falsely_synced(self):
        self.state.data["processed_work_order_ids"] = {}
        listener.record_successful_bluefolder_import(self.state, "10677", self.record(), response())
        self.assertIn("10677", self.state.data["bluefolder_equipment_sync_pending"])
        self.assertEqual(self.state.data["health"]["bluefolder_equipment_sync"]["unresolved_count"], 1)

    def test_max_six_fairness_survives_changed_due_set(self):
        items = []
        self.settings.bluefolder_equipment_sync_batch = 99
        self.ops.work_order_context = lambda number, **kwargs: {"workOrderId": number, "number": number}
        for number in range(10677, 10691):
            item = torrance_order(str(number))
            items.append(item)
            self.state.data["processed_work_order_ids"][str(number)] = {"number": str(number), "ops_created_at": "old"}
        self.assertEqual(self.sync(items), 6)
        self.assertEqual([row[0] for row in self.ops.imported], [str(n) for n in range(10677, 10683)])
        self.advance()
        self.assertEqual(self.sync(items), 6)
        self.assertEqual([row[0] for row in self.ops.imported[6:]], [str(n) for n in range(10683, 10689)])
        self.assertEqual(self.sync(items), 6)
        self.assertEqual([row[0] for row in self.ops.imported[12:14]], ["10689", "10690"])

    def test_initial_newest_priority_then_fair_cursor_persists_across_restart(self):
        self.settings.bluefolder_equipment_sync_batch = 2
        self.ops.work_order_context = lambda number, **kwargs: {"workOrderId": number, "number": number}
        items = [torrance_order(str(n)) for n in range(10677, 10682)]
        items[3]["dateTimeCreated"] = "2026-09-25T16:43:37Z"
        for item in items:
            number = item["serviceRequestId"]
            self.state.data["processed_work_order_ids"][number] = {"number": number, "ops_created_at": "old"}
        self.assertEqual(self.sync(items), 2)
        self.assertEqual([row[0] for row in self.ops.imported], ["10680", "10681"])
        self.state = listener.StateStore(self.state.path)
        self.assertEqual(self.state.data["bluefolder_equipment_sync_last_id"], "10681")
        self.assertEqual(self.sync(items), 2)
        self.assertEqual([row[0] for row in self.ops.imported[2:]], ["10677", "10678"])

    def test_batch_wall_budget_and_deadline_cleanup(self):
        item2 = torrance_order("10678")
        self.state.data["processed_work_order_ids"]["10678"] = {"number": "10678", "ops_created_at": "old"}
        with mock.patch.object(listener.time, "monotonic", side_effect=[100, 100, 121]):
            self.assertEqual(self.sync([self.item, item2]), 1)
        self.assertFalse(hasattr(self.ops, "_equipment_refresh_deadline"))
        self.assertEqual(len(self.ops.imported), 1)
        self.advance()
        self.ops._equipment_refresh_deadline = 777
        self.ops.import_error = listener.MagmoOpsRequestError(403)
        with self.assertRaises(listener.MagmoOpsRequestError):
            self.sync()
        self.assertEqual(self.ops._equipment_refresh_deadline, 777)


class BoundedEquipmentRequestTests(unittest.TestCase):
    def setUp(self):
        self.client = object.__new__(listener.MagmoOpsIngestClient)
        self.client.settings = settings_for("unused")
        self.client.secret = "test-only"
        self.client.url = "https://example.invalid/ops"
        self.payload = {"eventType": "work_order.command_context", "workOrderId": "10677"}

    def test_refresh_single_attempt_and_timeout_budget(self):
        self.client._equipment_refresh_deadline = 110
        with mock.patch.object(listener.time, "monotonic", return_value=100), mock.patch.object(
            listener.requests, "post", side_effect=requests.Timeout("test")
        ) as post, mock.patch.object(listener.time, "sleep") as sleep:
            with self.assertRaises(requests.Timeout):
                self.client._request(self.payload)
        self.assertEqual(post.call_count, 1)
        timeout = post.call_args.kwargs["timeout"]
        self.assertEqual(sum(timeout), 10)
        self.assertLessEqual(timeout[0], 3)
        sleep.assert_not_called()

    def test_expired_budget_sends_no_http(self):
        self.client._equipment_refresh_deadline = 99
        with mock.patch.object(listener.time, "monotonic", return_value=100), mock.patch.object(listener.requests, "post") as post:
            with self.assertRaises(requests.Timeout):
                self.client._request(self.payload)
        post.assert_not_called()

    def test_bounded_503_has_no_internal_retry_and_regular_lane_retains_three(self):
        fail = mock.Mock(status_code=503, headers={})
        fail.json.return_value = {"error": "unavailable"}
        with mock.patch.object(listener.requests, "post", return_value=fail) as post, mock.patch.object(listener.time, "sleep") as sleep:
            with self.assertRaises(listener.MagmoOpsRequestError):
                self.client._request(self.payload)
            self.assertEqual(post.call_count, 3)
            self.assertEqual(sleep.call_count, 2)
            post.reset_mock()
            sleep.reset_mock()
            self.client._equipment_refresh_deadline = 110
            with mock.patch.object(listener.time, "monotonic", return_value=100), self.assertRaises(listener.MagmoOpsRequestError):
                self.client._request(self.payload)
            self.assertEqual(post.call_count, 1)
            sleep.assert_not_called()


if __name__ == "__main__":
    unittest.main()
