from __future__ import annotations

import copy
import tempfile
import unittest
from unittest import mock

import requests

import bluefolder_slack_listener_v2 as listener
import test_split_dispatch_ownership as ownership
from test_split_dispatch_ownership import FakeBlueFolder, FakeOps, FakeSlack, import_result, settings_for, work_order


def lake_forest_order():
    return {
        **work_order("10658"),
        "description": "LF ships parts to Lathrop for repair",
        "dateTimeCreated": "2026-09-22T22:35:51.627000Z",
        "customerId": "34579389",
        "customerName": "Advanced Imaging Services",
        "customerLocationId": "39226291",
        "customerLocationName": "AIS - Lake Forest",
        "customerLocationStreetAddress": "25742 Atlantic Ocean Drive",
        "customerLocationCity": "Lake Forest",
        "customerLocationState": "CA",
        "customerLocationPostalCode": "92630",
    }


def result(status="site_unresolved", **after):
    response = import_result("10658")
    response["after"] = {
        "workOrderId": "10658", "number": "10658", "clientId": "", "machineId": "", "trailerId": "",
        "equipmentLinkStatus": status,
        "equipmentLinkIssue": "work_order_client_missing" if status == "site_unresolved" else "",
        **after,
    }
    return response


class SiteOnlyDestinationRetryTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.state = ownership.MagmoOnlyDispatchOwnershipTests.state(self.tmp.name)
        self.settings = settings_for(self.tmp.name)
        self.item = lake_forest_order()
        self.context = {"workOrderId": "10658", "number": "10658", "blueFolder": {"serviceRequestId": "10658"}}
        self.ops = FakeOps(self.context, imported=result())
        self.saved = {
            "number": "10658", "service_request_id": "10658", "ops_created_at": "old",
            "magmo_authoritative_after": {"clientId": "", "machineId": "", "trailerId": ""},
            "slack_ts": "100.123", "dispatch_owner": "magmo", "subject": self.item["description"],
            "ops_workflow_status": "done", "assignmentHistory": [{"kept": True}],
        }
        self.state.data["processed_work_order_ids"]["10658"] = self.saved
        patch = mock.patch.object(listener.time, "time", return_value=1790366400.0)
        self.clock = patch.start()
        self.addCleanup(patch.stop)

    def record(self, item=None):
        fields = listener.extract_work_order_fields(item or self.item, self.settings)
        return listener.equipment_sync_record(listener.bluefolder_import_record(fields, []))

    def sync(self, items=None):
        return listener.sync_bluefolder_equipment_updates(self.settings, self.state, items or [self.item], self.ops)

    def advance(self):
        pending = self.state.data["bluefolder_equipment_sync_pending"]["10658"]
        self.clock.return_value = listener.parse_dt(pending["next_retry_at"]).timestamp() + 0.01

    def test_actual_10658_omitted_equipment_xml_has_destination_metadata(self):
        response = requests.Response()
        response._content = b'''<response><serviceRequests><serviceRequest>
        <serviceRequestId>10658</serviceRequestId><customerId>34579389</customerId>
        <customerLocationId>39226291</customerLocationId>
        <description>LF ships parts to Lathrop for repair</description>
        </serviceRequest></serviceRequests></response>'''
        row = listener.BlueFolderClient._extract_collection(listener.BlueFolderClient._parse_payload(response))[0]
        record = self.record(row)
        self.assertEqual(record["bluefolder_customer_id"], "34579389")
        self.assertEqual(record["bluefolder_location_id"], "39226291")
        self.assertTrue(record["existing_only"])
        self.assertNotIn("bluefolder_equipment_ids", record)
        self.assertNotIn("bluefolder_equipment_names", record)
        self.assertTrue(listener.equipment_sync_fingerprint(record))

    def test_10658_missing_client_recovers_after_mapping_without_source_change(self):
        before = copy.deepcopy(self.saved)
        record_before = self.record()
        self.assertEqual(self.sync(), 1)
        self.assertEqual(self.saved["bluefolder_equipment_resolution"]["status"], "site_unresolved")
        self.assertNotIn("bluefolder_equipment_synced_fingerprint", self.saved)
        self.assertEqual(self.sync(), 0)
        self.advance()
        self.ops.import_response = result("not_selected", clientId="AIS94688")
        self.assertEqual(self.sync(), 1)
        self.assertEqual(self.saved["bluefolder_equipment_resolution"]["status"], "not_selected")
        self.assertEqual(self.saved["bluefolder_equipment_authoritative_after"]["clientId"], "AIS94688")
        self.assertEqual(self.record(), record_before)
        self.assertEqual(self.state.data["bluefolder_equipment_sync_pending"], {})
        for key in before:
            self.assertEqual(self.saved[key], before[key])
        self.state = listener.StateStore(self.state.path)
        self.assertEqual(self.sync(), 0)
        self.assertEqual(len(self.ops.imported), 2)
        self.assertEqual(self.ops.created, [])

    def test_new_full_import_site_only_retains_retry_until_client_resolves(self):
        self.state.data["processed_work_order_ids"] = {}
        self.ops.context = None
        slack = FakeSlack()
        with mock.patch.object(listener, "RUNTIME_BASELINE_DONE", True):
            self.assertEqual(listener.process_once(self.settings, self.state, FakeBlueFolder([self.item]), slack, self.ops), 1)
            saved = self.state.data["processed_work_order_ids"]["10658"]
            self.assertEqual(saved["bluefolder_equipment_resolution"]["status"], "site_unresolved")
            self.assertNotIn("bluefolder_equipment_ids", saved)
            self.ops.context = self.context
            self.ops.import_response = result("not_selected", clientId="AIS94688")
            self.advance()
            self.assertEqual(listener.process_once(self.settings, self.state, FakeBlueFolder([self.item]), slack, self.ops), 0)
        self.assertEqual(saved["bluefolder_equipment_resolution"]["status"], "not_selected")
        self.assertEqual(len(self.ops.imported), 2)
        self.assertEqual(slack.posts, [])
        self.assertEqual(self.ops.created, [])

    def test_new_magmo_owned_site_only_metadata_is_sent_and_recovers(self):
        self.state.data["processed_work_order_ids"] = {}
        slack = FakeSlack()
        with mock.patch.object(listener, "RUNTIME_BASELINE_DONE", True):
            self.assertEqual(listener.process_once(self.settings, self.state, FakeBlueFolder([self.item]), slack, self.ops), 1)
            self.assertEqual(len(self.ops.imported), 1)
            record = self.ops.imported[0][1]
            self.assertTrue(record["existing_only"])
            self.assertNotIn("subject", record)
            self.assertNotIn("bluefolder_equipment_ids", record)
            self.advance()
            self.ops.import_response = result("not_selected", clientId="AIS94688")
            self.assertEqual(listener.process_once(self.settings, self.state, FakeBlueFolder([self.item]), slack, self.ops), 0)
        self.assertEqual(self.state.data["processed_work_order_ids"]["10658"]["bluefolder_equipment_resolution"]["status"], "not_selected")
        self.assertEqual(len(self.ops.imported), 2)
        self.assertEqual(slack.posts, [])
        self.assertEqual(self.ops.created, [])

    def test_terminal_legacy_marker_cannot_hide_missing_client(self):
        for with_resolution in (False, True):
            with self.subTest(with_resolution=with_resolution):
                fingerprint = listener.equipment_sync_fingerprint(self.record())
                saved = {"number": "10658", "ops_created_at": "old", "bluefolder_equipment_synced_fingerprint": fingerprint,
                         "magmo_authoritative_after": {"equipmentLinkStatus": "not_selected", "clientId": ""}}
                if with_resolution:
                    saved["bluefolder_equipment_resolution"] = {"fingerprint": fingerprint, "status": "not_selected"}
                    saved["bluefolder_equipment_authoritative_after"] = {"equipmentLinkStatus": "not_selected", "clientId": ""}
                self.state.data["processed_work_order_ids"]["10658"] = saved
                self.state.data["bluefolder_equipment_sync_pending"] = {}
                self.assertEqual(self.sync(), 1)
                self.assertEqual(saved["bluefolder_equipment_resolution"]["status"], "site_unresolved")

    def test_manual_asset_with_missing_client_is_not_overwritten_or_called_resolved(self):
        self.saved["bluefolder_equipment_ids"] = ["previous-selected-equipment"]
        self.saved["bluefolder_equipment_names"] = ["Previous manual machine"]
        self.ops.import_response = result("site_unresolved", machineId="manual-machine")
        self.assertEqual(self.sync(), 1)
        self.assertEqual(self.saved["bluefolder_equipment_resolution"]["status"], "site_unresolved")
        self.assertEqual(self.saved["bluefolder_equipment_ids"], ["previous-selected-equipment"])
        self.assertEqual(self.saved["bluefolder_equipment_names"], ["Previous manual machine"])
        self.advance()
        self.ops.import_response = result("manual", clientId="AIS94688", machineId="manual-machine")
        self.assertEqual(self.sync(), 1)
        self.assertEqual(self.saved["bluefolder_equipment_authoritative_after"]["machineId"], "manual-machine")
        record = self.ops.imported[-1][1]
        self.assertNotIn("bluefolder_equipment_ids", record)
        self.assertNotIn("bluefolder_equipment_names", record)
        self.assertFalse(set(record) & {"clientId", "machineId", "trailerId", "subject", "slack_ts", "bluefolder_status"})

    def test_absent_equipment_stays_absent_and_explicit_empty_stays_explicit(self):
        absent = self.record()
        empty = self.record({**self.item, "equipmentToService": []})
        self.assertNotEqual(listener.equipment_sync_fingerprint(absent), listener.equipment_sync_fingerprint(empty))
        for record in (absent, empty):
            client = object.__new__(listener.MagmoOpsIngestClient)
            client._request = mock.Mock(return_value=result("not_selected", clientId="AIS94688"))
            client.import_work_order("10658", record)
            payload = client._request.call_args.args[0]
            self.assertEqual(set(payload), {"eventType", "workOrderId", "number", "blueFolder", "existingOnly"})
            self.assertTrue(payload["existingOnly"])
            if record is absent:
                self.assertNotIn("equipmentIds", payload["blueFolder"])
                self.assertNotIn("equipmentNames", payload["blueFolder"])
            else:
                self.assertEqual(payload["blueFolder"]["equipmentIds"], [])
                self.assertEqual(payload["blueFolder"]["equipmentNames"], [])

    def test_names_only_without_stable_identity_or_equipment_still_skipped(self):
        row = {key: value for key, value in self.item.items() if key not in {"customerId", "customerLocationId"}}
        self.assertEqual(self.record(row), {})
        self.assertEqual(self.sync([row]), 0)
        self.assertEqual(self.ops.imported, [])
        self.assertEqual(listener.equipment_sync_record({"number": "10658", "bluefolder_customer_id": "   "}), {})

    def test_either_stable_customer_or_site_identity_is_eligible(self):
        for absent_key in ("customerId", "customerLocationId"):
            with self.subTest(absent_key=absent_key):
                row = {key: value for key, value in self.item.items() if key != absent_key}
                self.assertTrue(self.record(row))
                self.assertTrue(listener.equipment_sync_fingerprint(self.record(row)))

    def test_site_only_missing_deleted_and_baseline_records_are_not_created(self):
        self.ops.context = None
        self.assertEqual(self.sync(), 0)
        self.assertEqual(self.ops.imported, [])
        self.advance()
        self.ops.context = {**self.context, "deleted": True}
        self.assertEqual(self.sync(), 0)
        self.assertEqual(self.ops.imported, [])
        self.ops.context = self.context
        for marker in ("ops_deleted_at", "deletedAt", "ops_missing_from_magmo"):
            self.saved[marker] = "deleted"
            self.assertEqual(self.sync(), 0)
            del self.saved[marker]
        self.saved.pop("ops_created_at")
        self.assertEqual(self.sync(), 0)


if __name__ == "__main__":
    unittest.main()
