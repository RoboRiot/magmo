from __future__ import annotations

import tempfile
import unittest
from pathlib import Path
from unittest import mock

import requests

import bluefolder_slack_listener_v2 as listener
import test_split_dispatch_ownership as ownership
from test_bluefolder_destination_link import import_result, settings, tarzana_work_order
from test_split_dispatch_ownership import (
    FakeBlueFolder, FakeOps, FakeSlack, settings_for,
)


class BlueFolderEquipmentLinkTests(unittest.TestCase):
    def fields(self, **equipment):
        return listener.extract_work_order_fields(
            {**tarzana_work_order(), **equipment}, settings()
        )

    def payload(self, fields):
        client = object.__new__(listener.MagmoOpsIngestClient)
        client._request = mock.Mock(return_value=import_result())
        record = listener.bluefolder_import_record(fields, [])
        client.import_work_order("10654", record)
        return record, client._request.call_args.args[0]

    def test_nested_selected_equipment_survives_xml_extraction_and_api(self):
        response = requests.Response()
        response.status_code = 200
        response._content = b'''<response status="ok"><serviceRequests>
        <serviceRequest><serviceRequestId>10654</serviceRequestId>
          <customerId>customer-1</customerId><customerLocationId>site-1</customerLocationId>
          <equipmentToService><equipmentItem><equipmentId>11</equipmentId><equipName>AQ64 CT</equipName></equipmentItem>
          <equipmentItem><equipmentId>12</equipmentId><equipName>MRI</equipName></equipmentItem></equipmentToService>
        </serviceRequest></serviceRequests></response>'''
        rows = listener.BlueFolderClient._extract_collection(
            listener.BlueFolderClient._parse_payload(response)
        )
        self.assertEqual(len(rows), 1)
        fields = listener.extract_work_order_fields(rows[0], settings())
        record, payload = self.payload(fields)
        self.assertEqual(record["bluefolder_equipment_ids"], ["11", "12"])
        self.assertEqual(payload["blueFolder"]["equipmentIds"], ["11", "12"])
        self.assertEqual(payload["blueFolder"]["equipmentNames"], ["AQ64 CT", "MRI"])
        self.assertEqual(payload["blueFolder"]["customerLocationId"], "site-1")
        self.assertNotIn("machineId", payload)

    def test_case_variants_arrays_and_duplicates_keep_all_unique_ids(self):
        fields = self.fields(
            equipmentId=" 11 ",
            EQUIPMENTTOSERVICE={"EquipmentItem": [
                {"EquipmentID": "11", "Name": "AQ64 CT"},
                {"equipment_id": ["12", "13"], "equipmentName": "MRI"},
            ]},
        )
        self.assertEqual(fields["bluefolder_equipment_ids"], ["11", "12", "13"])
        self.assertEqual(fields["bluefolder_equipment_names"], ["AQ64 CT", "MRI"])

    def test_generic_customer_or_assignment_ids_are_not_equipment(self):
        fields = self.fields(assignments=[{"id": "wrong", "name": "Person"}],
                             other={"equipmentId": "unrelated"})
        _, payload = self.payload(fields)
        self.assertNotIn("equipmentIds", payload["blueFolder"])
        self.assertNotIn("equipmentNames", payload["blueFolder"])

    def test_missing_selection_is_omitted_but_explicit_empty_is_forwarded(self):
        fields = self.fields()
        record, payload = self.payload(fields)
        self.assertNotIn("bluefolder_equipment_ids", record)
        self.assertNotIn("equipmentIds", payload["blueFolder"])
        record, payload = self.payload(self.fields(equipmentToService=[]))
        self.assertEqual(record["bluefolder_equipment_ids"], [])
        self.assertEqual(payload["blueFolder"]["equipmentIds"], [])
        self.assertEqual(payload["blueFolder"]["equipmentNames"], [])

    def test_flat_selection_supported_without_names(self):
        _, payload = self.payload(self.fields(equipmentIds=["11", "12"]))
        self.assertEqual(payload["blueFolder"]["equipmentIds"], ["11", "12"])
        self.assertNotIn("equipmentNames", payload["blueFolder"])

    def test_metadata_only_api_request_has_transactional_existing_only_guard(self):
        fields = self.fields(equipmentId="11")
        record = listener.equipment_sync_record(listener.bluefolder_import_record(fields, []))
        client = object.__new__(listener.MagmoOpsIngestClient)
        client._request = mock.Mock(return_value=import_result())
        client.import_work_order("10654", record)
        payload = client._request.call_args.args[0]
        self.assertIs(payload["existingOnly"], True)
        self.assertEqual(set(payload), {"eventType", "workOrderId", "blueFolder", "number", "existingOnly"})
        _, initial_payload = self.payload(fields)
        self.assertNotIn("existingOnly", initial_payload)

    def test_xml_attributes_and_empty_equipment_container(self):
        for xml, expected in (
            ('<equipmentToService><equipmentItem equipmentId="11" equipName="AQ64 CT" /></equipmentToService>', ["11"]),
            ('<equipmentItem equipmentId="11" /><equipmentItem equipmentId="12" />', ["11", "12"]),
            ('<equipmentToService />', []),
        ):
            response = requests.Response()
            response._content = (
                '<response><serviceRequest><serviceRequestId>10654</serviceRequestId>'
                + xml + '</serviceRequest></response>'
            ).encode()
            row = listener.BlueFolderClient._extract_collection(
                listener.BlueFolderClient._parse_payload(response)
            )[0]
            self.assertEqual(
                listener.extract_work_order_fields(row, settings())["bluefolder_equipment_ids"],
                expected,
            )

    def test_pending_and_success_state_preserve_equipment_and_legacy_markers(self):
        with tempfile.TemporaryDirectory() as directory:
            state = listener.StateStore(Path(directory) / "state.json")
            state.mark_processed("10654", {"baseline": True, "bluefolder_equipment_ids": ["old"]})
            fields = self.fields(equipmentId="11", equipName="AQ64 CT")
            state.mark_pending_magmo_import("10654", fields, "test retry")
            self.assertEqual(state.data["pending_magmo_imports"]["10654"]["bluefolder_equipment_ids"], ["11"])
            record, _ = self.payload(fields)
            listener.record_successful_bluefolder_import(state, "10654", record, import_result())
            saved = state.data["processed_work_order_ids"]["10654"]
            self.assertTrue(saved["baseline"])
            self.assertEqual(saved["bluefolder_equipment_ids"], ["11"])
            self.assertEqual(saved["bluefolder_equipment_names"], ["AQ64 CT"])
            legacy_record, _ = self.payload(self.fields())
            listener.record_successful_bluefolder_import(state, "10654", legacy_record, import_result())
            self.assertEqual(state.data["processed_work_order_ids"]["10654"]["bluefolder_equipment_ids"], ["11"])


class BlueFolderEquipmentRefreshTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.state = ownership.MagmoOnlyDispatchOwnershipTests.state(self.tmp.name)
        self.settings = settings_for(self.tmp.name, bluefolder_equipment_sync_batch=2)
        self.context = {"workOrderId": "10654", "number": "10654", "blueFolder": {"serviceRequestId": "10654"}}
        response = import_result()
        response["after"].update({"clientId": "C1", "machineId": "M1", "equipmentLinkStatus": "resolved"})
        self.ops = FakeOps(self.context, imported=response)
        clock_patch = mock.patch.object(listener.time, "time", return_value=1790356800.0)
        self.clock = clock_patch.start()
        self.addCleanup(clock_patch.stop)
        self.item = {**tarzana_work_order(), "equipmentToService": {"equipmentItem": {"equipmentId": "11", "equipName": "AQ64 CT"}}}
        self.saved = {
            "number": "10654", "service_request_id": "10654", "ops_created_at": "old",
            "slack_ts": "111.111", "dispatch_owner": "magmo", "ops_workflow_status": "done",
            "subject": "saved subject", "baseline": True,
        }
        self.state.data["processed_work_order_ids"]["10654"] = self.saved

    def sync(self, items=None):
        return listener.sync_bluefolder_equipment_updates(self.settings, self.state, items or [self.item], self.ops)

    def advance_retry(self):
        next_retry = self.state.data["bluefolder_equipment_sync_pending"]["10654"]["next_retry_at"]
        self.clock.return_value = listener.parse_dt(next_retry).timestamp() + 0.01

    def test_refresh_only_imports_identity_and_is_idempotent_across_restart(self):
        self.assertEqual(self.sync(), 1)
        record = self.ops.imported[0][1]
        self.assertEqual(record["bluefolder_equipment_ids"], ["11"])
        self.assertEqual(record["bluefolder_location_id"], "35057749")
        for forbidden in ("subject", "description", "bluefolder_status", "bluefolder_assignees", "slack_ts", "created_at"):
            self.assertNotIn(forbidden, record)
        for key, value in {"slack_ts": "111.111", "ops_workflow_status": "done", "subject": "saved subject", "baseline": True}.items():
            self.assertEqual(self.saved[key], value)
        self.state = listener.StateStore(self.state.path)
        self.assertEqual(self.sync(), 0)
        self.assertEqual(len(self.ops.imported), 1)
        changed = {**self.item, "equipmentToService": {"equipmentItem": {"equipmentId": "12"}}}
        self.assertEqual(self.sync([changed]), 1)
        self.assertEqual(self.ops.imported[-1][1]["bluefolder_equipment_ids"], ["12"])

    def test_refresh_skips_absent_evidence_baselines_and_tombstones(self):
        self.assertEqual(self.sync([tarzana_work_order()]), 0)
        for marker in ("ops_deleted_at", "deletedAt", "ops_missing_from_magmo"):
            self.saved[marker] = "deleted"
            self.assertEqual(self.sync(), 0)
            del self.saved[marker]
        self.saved.pop("ops_created_at")
        self.assertEqual(self.sync(), 0)
        self.assertEqual(self.ops.imported, [])

    def test_refresh_does_not_recreate_missing_or_deleted_magmo_record(self):
        for context in (None, {**self.context, "deleted": True}):
            self.ops.context = context
            self.assertEqual(self.sync(), 0)
        self.assertEqual(self.ops.imported, [])
        self.assertTrue(self.state.data["bluefolder_equipment_sync_pending"]["10654"]["retryable"])

    def test_refresh_retries_failures_without_accepting_fingerprint(self):
        self.ops.import_error = RuntimeError("temporary failure")
        self.assertEqual(self.sync(), 0)
        self.assertNotIn("bluefolder_equipment_synced_fingerprint", self.saved)
        self.state = listener.StateStore(self.state.path)
        self.ops.import_error = None
        self.assertEqual(self.sync(), 0)
        self.advance_retry()
        self.assertEqual(self.sync(), 1)
        self.assertEqual(self.state.data["bluefolder_equipment_sync_pending"], {})

    def test_equipment_order_change_is_not_an_identity_change(self):
        first = {**self.item, "equipmentToService": [], "equipmentIds": ["11", "12"]}
        second = {**self.item, "equipmentToService": [], "equipmentIds": ["12", "11"]}
        self.assertEqual(self.sync([first]), 1)
        self.assertEqual(self.sync([second]), 0)

    def test_invalid_refresh_is_not_retried_unchanged(self):
        self.ops.import_error = listener.MagmoOpsRequestError(400, code="invalid_import")
        self.assertEqual(self.sync(), 0)
        self.assertEqual(self.sync(), 0)
        self.assertEqual(len(self.ops.imported), 1)
        self.ops.import_error = None
        changed = {**self.item, "equipmentToService": []}
        self.assertEqual(self.sync([changed]), 1)
        self.assertEqual(self.ops.imported[-1][1]["bluefolder_equipment_ids"], [])

    def test_concurrently_missing_order_retry_stays_existing_only(self):
        self.ops.import_error = listener.MagmoOpsRequestError(404, code="work_order_not_found")
        self.assertEqual(self.sync(), 0)
        self.assertTrue(self.state.data["bluefolder_equipment_sync_pending"]["10654"]["retryable"])
        self.assertIs(self.ops.imported[-1][1]["existing_only"], True)
        self.ops.import_error = None
        self.assertEqual(self.sync(), 0)
        self.advance_retry()
        self.assertEqual(self.sync(), 1)

    def test_batch_bound_and_dry_run(self):
        self.settings.dry_run = True
        self.assertEqual(self.sync(), 0)
        self.settings.dry_run = False
        items = []
        for number in ("10654", "10655", "10656"):
            items.append({**self.item, "serviceRequestId": number})
            self.state.data["processed_work_order_ids"][number] = {**self.saved, "number": number, "service_request_id": number}
        self.ops.work_order_context = lambda number, **kwargs: {"workOrderId": number, "number": number, "blueFolder": {"serviceRequestId": number}}
        self.assertEqual(self.sync(items), 2)
        self.assertEqual(self.sync(items), 1)
        self.assertEqual(len(self.ops.imported), 3)

    def test_new_magmo_owned_intake_refreshes_equipment_without_posting(self):
        self.state.data["processed_work_order_ids"] = {}
        slack = FakeSlack()
        with mock.patch.object(listener, "RUNTIME_BASELINE_DONE", True):
            self.assertEqual(listener.process_once(self.settings, self.state, FakeBlueFolder([self.item]), slack, self.ops), 1)
            self.assertEqual(listener.process_once(self.settings, self.state, FakeBlueFolder([self.item]), slack, self.ops), 0)
        self.assertEqual(len(self.ops.imported), 1)
        self.assertNotIn("subject", self.ops.imported[0][1])
        self.assertEqual(slack.posts, [])
        self.assertEqual(self.ops.created, [])
        self.assertTrue(self.state.data["processed_work_order_ids"]["10654"]["bluefolder_equipment_synced_fingerprint"])

    def test_new_magmo_owned_refresh_failure_is_durable_and_retried(self):
        self.state.data["processed_work_order_ids"] = {}
        self.ops.import_error = RuntimeError("temporary failure")
        with mock.patch.object(listener, "RUNTIME_BASELINE_DONE", True):
            self.assertEqual(listener.process_once(self.settings, self.state, FakeBlueFolder([self.item]), FakeSlack(), self.ops), 0)
            self.assertNotIn("10654", self.state.data["processed_work_order_ids"])
            self.assertEqual(self.state.data["pending_magmo_imports"]["10654"]["bluefolder_equipment_ids"], ["11"])
            self.ops.import_error = None
            self.assertEqual(listener.process_once(self.settings, self.state, FakeBlueFolder([self.item]), FakeSlack(), self.ops), 1)


if __name__ == "__main__":
    unittest.main()
