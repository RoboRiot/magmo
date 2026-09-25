from __future__ import annotations

import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest import mock

import bluefolder_slack_listener_v2 as listener


DISPATCH = "C07EPLKV9JT"


def settings_for(directory: str, **overrides):
    values = {
        "bluefolder_api_token": "test-token",
        "slack_bot_token": "xoxb-test",
        "slack_channel_id": DISPATCH,
        "ops_testing_channel_id": DISPATCH,
        "ops_conversation_channel_id": DISPATCH,
        "ops_ingest_secret": "test-secret",
        "baseline_on_startup": True,
        "state_file": Path(directory) / "state.json",
        "slack_post_log_file": Path(directory) / "posts.jsonl",
        "slack_user_ids": [],
        "require_clickable_mentions": False,
    }
    values.update(overrides)
    return listener.Settings(**values)


def work_order(number: str = "10456", creator: str = "33563483"):
    return {
        "serviceRequestId": number,
        "dateTimeCreated": "2026-08-20T20:00:00+00:00",
        "description": f"Work order {number}",
        "customerName": "Customer",
        "createdByUserId": creator,
        "status": "New",
        "billingStatus": "Not Invoiced",
    }


def tarzana_work_order():
    return {
        **work_order("10654"),
        "description": "Prohealth Tarzana - AQ64 CT will not MPR",
        "customerId": "34579369",
        "customerName": "Prohealth Advanced Imaging",
        "customerLocationId": "35057749",
        "customerLocationName": "Prohealth - Tarzana",
        "customerLocationStreetAddress": "18388 Clark Street Suite 115",
        "customerLocationCity": "Tarzana",
        "customerLocationState": "CA",
        "customerLocationPostalCode": "91356",
        "customerLocationCountry": "United States",
    }


def import_result(
    number: str = "10456", *, created: bool = True, replay: bool = False
):
    before = None if created else {"workOrderId": number, "number": number}
    return {
        "ok": True,
        "eventType": "work_order.imported",
        "created": created,
        "idempotentReplay": replay,
        "before": before,
        "after": {
            "workOrderId": number,
            "number": number,
            "blueFolder": {"serviceRequestId": number},
            "placement": "unassigned",
        },
        "appliedChanges": {"placement": "unassigned"},
        "requestId": f"request-{number}",
        "apiVersion": "2026-08-26.1",
        "idempotencyKey": {"blueFolderServiceRequestId": number},
    }


def parent(number: str, ts: str = "1787355841.733589"):
    return {
        "ts": ts,
        "text": (
            f"#{number}\n<https://advancedimaging.bluefolder.com/service/"
            f"sr.aspx?srid={number}|Work order {number}>"
        ),
        "bot_id": "BTEST",
    }


class FakeBlueFolder:
    def __init__(self, items, assignees=None):
        self.items = list(items)
        self.assignees = list(assignees or [])
        self.write_calls = []

    def list_recent_work_orders(self):
        return list(self.items)

    def assigned_users(self, item):
        return list(self.assignees)


class FakeSlack:
    def __init__(self, *, receipt_parent=None, matches=None):
        self.receipt_parent = receipt_parent
        self.matches = list(matches or [])
        self.posts = []
        self.parent_calls = []
        self.search_calls = []

    def thread_parent(self, channel, thread_ts):
        self.parent_calls.append((channel, thread_ts))
        if isinstance(self.receipt_parent, Exception):
            raise self.receipt_parent
        return dict(self.receipt_parent or {})

    def find_work_order_threads(
        self, channel, number, *, near_ts="", window_seconds=3600
    ):
        self.search_calls.append((channel, number, near_ts, window_seconds))
        return [dict(item) for item in self.matches]

    def post_dispatch_message(self, **payload):
        self.posts.append(dict(payload))
        return DISPATCH, "1787356000.000001"

    def get_permalink(self, channel, ts):
        return (
            "https://advancedimagingparts.slack.com/archives/"
            f"{channel}/p{ts.replace('.', '')}"
        )


class FakeOps:
    supports_assignment_sync = False
    supports_extended_sync = False
    supports_message_sync = True
    supports_bluefolder_import = True

    def __init__(self, context, *, imported=None, import_error=None):
        self.context = context
        self.created = []
        self.imported = []
        self.import_response = imported
        self.import_error = import_error

    def work_order_context(self, number, *, expected_number=""):
        if isinstance(self.context, Exception):
            raise self.context
        return self.context

    def create_work_order(self, work_order_id, record):
        self.created.append((str(work_order_id), dict(record)))
        return {"ok": True}

    def import_work_order(self, work_order_id, record):
        self.imported.append((str(work_order_id), dict(record)))
        if self.import_error is not None:
            raise self.import_error
        if self.import_response is not None:
            return dict(self.import_response)
        return import_result(str(record.get("number") or work_order_id))


class FakeHydrationOps:
    def existing_work_order_records(self):
        return [
            (
                "testing-order",
                {
                    "slack_channel": "C07F6V10PRS",
                    "slack_ts": "100.000001",
                },
            ),
            (
                "dispatch-order",
                {
                    "slack_channel": DISPATCH,
                    "slack_ts": "101.000001",
                },
            ),
        ]


class FakeSyncSlack:
    @staticmethod
    def user_name(user_id, fallback=""):
        return fallback or user_id or "Engineer"


class FakeSyncOps:
    def __init__(self):
        self.settings = SimpleNamespace(
            ops_report_commands_managed_by_done_listener=True
        )
        self.posts = []

    def post_message(self, **payload):
        self.posts.append(dict(payload))

    @staticmethod
    def describe_slack_media(_message):
        return ""


class MagmoOnlyDispatchOwnershipTests(unittest.TestCase):
    def setUp(self):
        self.old_runtime_baseline = listener.RUNTIME_BASELINE_DONE
        listener.RUNTIME_BASELINE_DONE = True

    def tearDown(self):
        listener.RUNTIME_BASELINE_DONE = self.old_runtime_baseline

    @staticmethod
    def state(directory: str):
        state = listener.StateStore(Path(directory) / "state.json")
        state.data["baseline_initialized_at"] = "2026-08-07T00:00:00+00:00"
        state.data["cutover_work_order_number"] = 10374
        state.save()
        return state

    def test_magmo_receipt_is_validated_and_adopted_without_post_or_create(self):
        with tempfile.TemporaryDirectory() as directory:
            state = self.state(directory)
            ts = "1787355841.733589"
            ops = FakeOps(
                {
                    "number": "10456",
                    "slackChannel": DISPATCH,
                    "slackThreadTs": ts,
                    "slackPermalink": (
                        "https://advancedimagingparts.slack.com/archives/"
                        "C07EPLKV9JT/p1787355841733589"
                    ),
                }
            )
            slack = FakeSlack(receipt_parent=parent("10456", ts))
            processed = listener.process_once(
                settings_for(directory),
                state,
                FakeBlueFolder([work_order()]),
                slack,
                ops,
            )
            self.assertEqual(processed, 1)
            self.assertEqual(slack.posts, [])
            self.assertEqual(ops.created, [])
            self.assertEqual(ops.imported, [])
            record = state.data["processed_work_order_ids"]["10456"]
            self.assertEqual(record["dispatch_owner"], "magmo")
            self.assertTrue(record["ops_created_at"])

    def test_invalid_magmo_receipt_fails_closed_without_direct_fallback(self):
        with tempfile.TemporaryDirectory() as directory:
            state = self.state(directory)
            ops = FakeOps(
                {
                    "number": "10456",
                    "slackChannel": DISPATCH,
                    "slackThreadTs": "1787355841.733589",
                }
            )
            slack = FakeSlack(receipt_parent=parent("99999"))
            processed = listener.process_once(
                settings_for(directory),
                state,
                FakeBlueFolder([work_order()]),
                slack,
                ops,
            )
            self.assertEqual(processed, 1)
            self.assertEqual(slack.posts, [])
            self.assertEqual(slack.search_calls, [])
            self.assertEqual(ops.created, [])
            self.assertEqual(ops.imported, [])
            saved = state.data["processed_work_order_ids"]["10456"]
            self.assertEqual(saved["dispatch_owner"], "magmo")

    def test_context_404_imports_bluefolder_order_and_ignores_manual_slack_root(self):
        with tempfile.TemporaryDirectory() as directory:
            state = self.state(directory)
            existing = parent("10456")
            slack = FakeSlack(matches=[existing])
            ops = FakeOps(None)
            processed = listener.process_once(
                settings_for(directory),
                state,
                FakeBlueFolder([work_order()]),
                slack,
                ops,
            )
            self.assertEqual(processed, 1)
            self.assertEqual(slack.posts, [])
            self.assertEqual(slack.search_calls, [])
            self.assertEqual(ops.created, [])
            self.assertEqual(len(ops.imported), 1)
            self.assertEqual(ops.imported[0][0], "10456")
            self.assertNotIn("10456", state.data["pending_magmo_imports"])
            saved = state.data["processed_work_order_ids"]["10456"]
            self.assertEqual(saved["dispatch_owner"], "magmo_pending")
            self.assertTrue(saved["magmo_import_created"])
            self.assertFalse(saved["magmo_import_idempotent_replay"])

    def test_tarzana_import_carries_and_saves_exact_destination_identity(self):
        with tempfile.TemporaryDirectory() as directory:
            state = self.state(directory)
            slack = FakeSlack()
            ops = FakeOps(None)
            processed = listener.process_once(
                settings_for(directory),
                state,
                FakeBlueFolder([tarzana_work_order()]),
                slack,
                ops,
            )
            self.assertEqual(processed, 1)
            self.assertEqual(len(ops.imported), 1)
            imported = ops.imported[0][1]
            self.assertEqual(imported["bluefolder_customer_id"], "34579369")
            self.assertEqual(imported["bluefolder_location_id"], "35057749")
            saved = state.data["processed_work_order_ids"]["10654"]
            self.assertEqual(saved["bluefolder_customer_id"], "34579369")
            self.assertEqual(saved["bluefolder_location_id"], "35057749")
            self.assertEqual(
                saved["bluefolder_location_name"], "Prohealth - Tarzana"
            )
            self.assertEqual(slack.posts, [])

    def test_failed_tarzana_import_keeps_destination_identity_for_retry_audit(self):
        with tempfile.TemporaryDirectory() as directory:
            state = self.state(directory)
            ops = FakeOps(None, import_error=RuntimeError("temporary import failure"))
            processed = listener.process_once(
                settings_for(directory),
                state,
                FakeBlueFolder([tarzana_work_order()]),
                FakeSlack(),
                ops,
            )
            self.assertEqual(processed, 0)
            pending = state.data["pending_magmo_imports"]["10654"]
            self.assertEqual(pending["bluefolder_customer_id"], "34579369")
            self.assertEqual(pending["bluefolder_location_id"], "35057749")

    def test_bluefolder_orders_from_every_creator_import_exactly_once_without_slack(self):
        for creator in ("33563483", "33576640", "999"):
            with self.subTest(creator=creator), tempfile.TemporaryDirectory() as directory:
                state = self.state(directory)
                slack = FakeSlack()
                ops = FakeOps(None)
                bluefolder = FakeBlueFolder([work_order(creator=creator)])
                settings = settings_for(directory)
                self.assertEqual(
                    listener.process_once(settings, state, bluefolder, slack, ops),
                    1,
                )
                self.assertEqual(
                    listener.process_once(settings, state, bluefolder, slack, ops),
                    0,
                )
                self.assertEqual(slack.posts, [])
                self.assertEqual(slack.search_calls, [])
                self.assertEqual(ops.created, [])
                self.assertEqual(len(ops.imported), 1)
                self.assertEqual(bluefolder.write_calls, [])
                self.assertNotIn("10456", state.data["pending_magmo_imports"])
                self.assertFalse(
                    state.data["health"]["slack_root_posting_enabled"]
                )

    def test_failed_import_remains_pending_and_successful_retry_clears_it(self):
        with tempfile.TemporaryDirectory() as directory:
            state = self.state(directory)
            slack = FakeSlack()
            ops = FakeOps(None, import_error=RuntimeError("temporary import failure"))
            settings = settings_for(directory)
            bluefolder = FakeBlueFolder([work_order()])
            self.assertEqual(
                listener.process_once(settings, state, bluefolder, slack, ops), 0
            )
            self.assertIn("10456", state.data["pending_magmo_imports"])
            self.assertNotIn("10456", state.data["processed_work_order_ids"])
            self.assertEqual(slack.posts, [])
            self.assertEqual(slack.search_calls, [])

            ops.import_error = None
            self.assertEqual(
                listener.process_once(settings, state, bluefolder, slack, ops), 1
            )
            self.assertNotIn("10456", state.data["pending_magmo_imports"])
            self.assertEqual(slack.posts, [])
            self.assertEqual(slack.search_calls, [])
            self.assertEqual(ops.created, [])
            self.assertEqual(len(ops.imported), 2)

    def test_http_400_import_is_terminal_and_skipped_on_next_poll(self):
        with tempfile.TemporaryDirectory() as directory:
            state = self.state(directory)
            slack = FakeSlack()
            ops = FakeOps(
                None,
                import_error=listener.MagmoOpsRequestError(
                    400,
                    code="invalid_import",
                    action="Correct the BlueFolder fields before retrying.",
                ),
            )
            settings = settings_for(directory)
            bluefolder = FakeBlueFolder([work_order()])

            self.assertEqual(
                listener.process_once(settings, state, bluefolder, slack, ops), 0
            )
            pending = state.data["pending_magmo_imports"]["10456"]
            self.assertFalse(pending["retryable"])
            self.assertIn("HTTP 400", pending["reason"])
            self.assertEqual(len(ops.imported), 1)

            # An unchanged invalid request remains visible for repair but is
            # not hammered again by the next BlueFolder polling cycle.
            self.assertEqual(
                listener.process_once(settings, state, bluefolder, slack, ops), 0
            )
            self.assertEqual(len(ops.imported), 1)
            self.assertNotIn("10456", state.data["processed_work_order_ids"])
            self.assertEqual(slack.posts, [])
            self.assertEqual(slack.search_calls, [])

    def test_http_401_import_re_raises_and_stops_before_later_items(self):
        with tempfile.TemporaryDirectory() as directory:
            state = self.state(directory)
            slack = FakeSlack()
            ops = FakeOps(
                None,
                import_error=listener.MagmoOpsRequestError(
                    401,
                    code="unauthorized",
                    action="Check the protected Ops credential.",
                ),
            )
            first = work_order("10456")
            first["dateTimeCreated"] = "2026-08-20T20:00:00+00:00"
            later = work_order("10457")
            later["dateTimeCreated"] = "2026-08-20T20:01:00+00:00"

            with self.assertRaises(listener.MagmoOpsRequestError) as raised:
                listener.process_once(
                    settings_for(directory),
                    state,
                    FakeBlueFolder([first, later]),
                    slack,
                    ops,
                )

            self.assertEqual(raised.exception.status_code, 401)
            self.assertEqual([call[0] for call in ops.imported], ["10456"])
            self.assertNotIn("10456", state.data["pending_magmo_imports"])
            self.assertNotIn("10457", state.data["pending_magmo_imports"])
            self.assertNotIn("10456", state.data["processed_work_order_ids"])
            self.assertNotIn("10457", state.data["processed_work_order_ids"])
            self.assertEqual(slack.posts, [])
            self.assertEqual(slack.search_calls, [])

    def test_idempotent_replay_metadata_is_saved_as_authoritative_result(self):
        with tempfile.TemporaryDirectory() as directory:
            state = self.state(directory)
            ops = FakeOps(
                None,
                imported=import_result("10456", created=False, replay=True),
            )
            slack = FakeSlack()
            processed = listener.process_once(
                settings_for(directory),
                state,
                FakeBlueFolder([work_order()]),
                slack,
                ops,
            )
            self.assertEqual(processed, 1)
            saved = state.data["processed_work_order_ids"]["10456"]
            self.assertFalse(saved["magmo_import_created"])
            self.assertTrue(saved["magmo_import_idempotent_replay"])
            self.assertEqual(
                saved["magmo_authoritative_after"]["placement"], "unassigned"
            )
            self.assertEqual(slack.posts, [])
            self.assertEqual(slack.search_calls, [])

    def test_slack_dispatch_posting_methods_are_hard_disabled(self):
        with tempfile.TemporaryDirectory() as directory:
            slack = listener.SlackClient(settings_for(directory))
            with self.assertRaisesRegex(RuntimeError, "Magmo exclusively owns"):
                slack.post_dispatch_message(
                    title_text="Never post",
                    bluefolder_url="https://example.invalid/10456",
                    work_order_number="10456",
                    mention_user_ids=[],
                )
            with self.assertRaisesRegex(RuntimeError, "Magmo exclusively owns"):
                slack._post_raw(
                    "chat.postMessage",
                    {"channel": DISPATCH, "text": "Never post"},
                )

    def test_real_bluefolder_creation_fields_are_extracted(self):
        fields = listener.extract_work_order_fields(
            work_order(), settings_for(tempfile.gettempdir())
        )
        self.assertEqual(fields["created_at"], "2026-08-20T20:00:00Z")
        self.assertEqual(fields["created_by_user_id"], "33563483")
        self.assertEqual(fields["customer"], "Customer")
        self.assertEqual(fields["bluefolder_status"], "New")
        self.assertEqual(fields["bluefolder_billing_status"], "Not Invoiced")

    def test_tarzana_destination_identity_is_extracted_and_normalized(self):
        fields = listener.extract_work_order_fields(
            tarzana_work_order(), settings_for(tempfile.gettempdir())
        )
        self.assertEqual(fields["bluefolder_customer_id"], "34579369")
        self.assertEqual(
            fields["bluefolder_customer_name"], "Prohealth Advanced Imaging"
        )
        self.assertEqual(fields["bluefolder_location_id"], "35057749")
        self.assertEqual(
            fields["bluefolder_location_name"], "Prohealth - Tarzana"
        )
        self.assertEqual(
            fields["bluefolder_address_street"],
            "18388 Clark Street Suite 115",
        )
        self.assertEqual(fields["bluefolder_address_city"], "Tarzana")
        self.assertEqual(fields["bluefolder_address_state"], "CA")
        self.assertEqual(fields["bluefolder_address_postal_code"], "91356")
        self.assertEqual(
            fields["bluefolder_address_country"], "United States"
        )

        record = listener.bluefolder_import_record(fields, [])
        self.assertEqual(record["bluefolder_customer_id"], "34579369")
        self.assertEqual(record["bluefolder_location_id"], "35057749")
        self.assertEqual(
            record["bluefolder_location_name"], "Prohealth - Tarzana"
        )

    def test_ops_context_translates_exact_not_found_response_to_missing(self):
        client = object.__new__(listener.MagmoOpsIngestClient)
        client._request = mock.Mock(
            side_effect=listener.MagmoOpsRequestError(
                404,
                code="work_order_not_found",
                action="Import the BlueFolder work order.",
            )
        )
        self.assertIsNone(client.work_order_context("10456"))

    def test_bluefolder_import_payload_is_exact_and_contains_no_slack_identity(self):
        client = object.__new__(listener.MagmoOpsIngestClient)
        client._request = mock.Mock(return_value=import_result("10456"))
        result = client.import_work_order(
            "10456",
            {
                "service_request_id": "10456",
                "number": "10456",
                "subject": "Customer - scanner service",
                "description": "Scanner will not complete QA.",
                "customer": "Customer",
                "bluefolder_customer_id": "34579369",
                "bluefolder_customer_name": "Prohealth Advanced Imaging",
                "bluefolder_location_id": "35057749",
                "bluefolder_location_name": "Prohealth - Tarzana",
                "bluefolder_address_street": "18388 Clark Street Suite 115",
                "bluefolder_address_city": "Tarzana",
                "bluefolder_address_state": "CA",
                "bluefolder_address_postal_code": "91356",
                "bluefolder_address_country": "United States",
                "bluefolder_url": (
                    "https://advancedimaging.bluefolder.com/service/"
                    "sr.aspx?srid=10456"
                ),
                "created_at": "2026-08-20T20:00:00Z",
                "bluefolder_status": "New",
                "bluefolder_billing_status": "Not Invoiced",
                "bluefolder_date_time_closed": "",
                "bluefolder_workflow_status": "Unassigned",
                "bluefolder_assignees": [
                    {"id": "42", "name": "Engineer", "email": "e@example.com"}
                ],
            },
        )
        self.assertTrue(result["created"])
        self.assertEqual(
            client._request.call_args.args[0],
            {
                "eventType": "work_order.imported",
                "workOrderId": "10456",
                "blueFolder": {
                    "serviceRequestId": "10456",
                    "customerId": "34579369",
                    "customerName": "Prohealth Advanced Imaging",
                    "customerLocationId": "35057749",
                    "customerLocationName": "Prohealth - Tarzana",
                    "addressStreet": "18388 Clark Street Suite 115",
                    "addressCity": "Tarzana",
                    "addressState": "CA",
                    "addressPostalCode": "91356",
                    "addressCountry": "United States",
                },
                "number": "10456",
                "subject": "Customer - scanner service",
                "description": "Scanner will not complete QA.",
                "customer": "Customer",
                "bluefolderUrl": (
                    "https://advancedimaging.bluefolder.com/service/"
                    "sr.aspx?srid=10456"
                ),
                "createdAt": "2026-08-20T20:00:00Z",
                "bluefolderStatus": "New",
                "bluefolderBillingStatus": "Not Invoiced",
                "bluefolderWorkflowStatus": "Unassigned",
                "bluefolderAssignees": [
                    {"id": "42", "name": "Engineer", "email": "e@example.com"}
                ],
            },
        )
        payload = client._request.call_args.args[0]
        for forbidden in (
            "source",
            "actor",
            "commandTs",
            "slackChannel",
            "slackThreadTs",
            "slackPermalink",
        ):
            self.assertNotIn(forbidden, payload)

    def test_bluefolder_import_omits_blank_optional_destination_identity(self):
        client = object.__new__(listener.MagmoOpsIngestClient)
        client._request = mock.Mock(return_value=import_result("10456"))
        client.import_work_order(
            "10456",
            {
                "service_request_id": "10456",
                "number": "10456",
                "bluefolder_customer_id": " ",
                "bluefolder_location_id": "",
            },
        )
        self.assertEqual(
            client._request.call_args.args[0]["blueFolder"],
            {"serviceRequestId": "10456"},
        )

    def test_bluefolder_import_rejects_malformed_authoritative_response(self):
        client = object.__new__(listener.MagmoOpsIngestClient)
        client._request = mock.Mock(
            return_value={
                "ok": True,
                "eventType": "work_order.imported",
                "created": True,
                "idempotentReplay": False,
                "before": None,
                # `after` and `appliedChanges` are mandatory because callers
                # must use Magmo's authoritative placement result.
                "requestId": "request-10456",
                "apiVersion": "2026-08-26.1",
            }
        )
        with self.assertRaisesRegex(RuntimeError, "authoritative changes"):
            client.import_work_order(
                "10456",
                {"service_request_id": "10456", "number": "10456"},
            )

    def test_bluefolder_import_capability_is_fail_closed_and_can_activate(self):
        current_health = {
            "supportedEventTypes": [
                "work_order.command_context",
                "work_order.created",
                "message.created",
            ],
            "bluefolderImport": None,
        }
        self.assertFalse(
            listener.MagmoOpsIngestClient._bluefolder_import_available(
                current_health
            )
        )

        compatible_health = {
            **current_health,
            "supportedEventTypes": [
                *current_health["supportedEventTypes"],
                "work_order.imported",
            ],
            "bluefolderImport": {
                "requiresSlackCoordinates": False,
                "createsSlackPosts": False,
                "preservesAuthoritativeSlackReceipt": True,
                "idempotencyKeyFields": ["blueFolder.serviceRequestId"],
            },
        }
        self.assertTrue(
            listener.MagmoOpsIngestClient._bluefolder_import_available(
                compatible_health
            )
        )

        ambiguous_health = dict(compatible_health)
        ambiguous_health["bluefolderImport"] = None
        with self.assertRaisesRegex(RuntimeError, "without its BlueFolder contract"):
            listener.MagmoOpsIngestClient._bluefolder_import_available(
                ambiguous_health
            )

    def test_all_status_poll_skips_historical_threads_but_keeps_pending_and_new(self):
        with tempfile.TemporaryDirectory() as directory:
            settings = settings_for(directory)
            state = self.state(directory)
            state.data["cutover_work_order_number"] = 10374
            # This legacy state value intentionally has no UTC offset.
            state.set_last_seen_created_at("2026-08-25T00:31:21.11")
            state.mark_pending_magmo_import(
                "10468",
                listener.extract_work_order_fields(
                    {
                        **work_order("10468"),
                        "dateTimeCreated": "2026-08-24T12:00:00",
                    },
                    settings,
                ),
                "waiting for compatible import API",
            )

            items = [
                {
                    **work_order("10380"),
                    "dateTimeCreated": "2026-08-10T12:00:00",
                    "status": "Closed",
                },
                {
                    **work_order("10468"),
                    "dateTimeCreated": "2026-08-24T12:00:00",
                },
                {
                    **work_order("10496"),
                    "dateTimeCreated": "2026-08-27T12:00:00Z",
                },
            ]
            filtered = listener.filter_new_items(items, state, settings)
            numbers = [
                listener.extract_work_order_fields(item, settings)["number"]
                for item in filtered
            ]
            self.assertEqual(numbers, ["10468", "10496"])
            self.assertIsNotNone(listener.parse_dt("2026-08-25T00:31:21.11").tzinfo)

    def test_api_message_payload_preserves_original_slack_identity(self):
        client = object.__new__(listener.MagmoOpsIngestClient)
        captured = []
        client._request = lambda payload: captured.append(payload) or {"ok": True}
        client.post_message(
            work_order_id="10456",
            channel=DISPATCH,
            thread_ts="1787355841.733589",
            message={"ts": "1787356000.000001", "user": "U123"},
            sender_name="Engineer",
            text="Arrived on site",
            candidates=[{"id": "U123", "name": "Engineer"}],
        )
        payload = captured[0]
        self.assertEqual(payload["eventType"], "message.created")
        self.assertEqual(payload["commandTs"], "1787356000.000001")
        self.assertEqual(payload["source"]["channel"], DISPATCH)
        self.assertEqual(payload["source"]["threadTs"], "1787355841.733589")
        self.assertEqual(payload["actor"]["id"], "U123")
        self.assertEqual(payload["senderId"], "U123")
        self.assertIsInstance(payload["senderId"], str)
        self.assertEqual(payload["slackTs"], "1787356000.000001")
        self.assertEqual(payload["text"], "Arrived on site")

    def test_direct_firestore_hydration_ignores_testing_receipts(self):
        with tempfile.TemporaryDirectory() as directory:
            state = self.state(directory)
            hydrated = listener.hydrate_intake_threads_from_ops(
                settings_for(directory), state, FakeHydrationOps()
            )
            self.assertEqual(hydrated, 2)
            records = state.data["processed_work_order_ids"]
            self.assertEqual(records["testing-order"]["slack_channel"], "")
            self.assertEqual(records["dispatch-order"]["slack_channel"], DISPATCH)

    def test_all_report_listener_commands_are_delegated_not_ingested(self):
        ops = FakeSyncOps()
        record = {}
        for index, text in enumerate(
            (
                "!daily",
                "!daily 08/21/2026",
                "!complete",
                "!done",
                "!hours",
                "!monitor 24 hours",
                "!parts",
                "!trailer",
            ),
            start=1,
        ):
            result = listener.sync_ops_slack_message(
                FakeSyncSlack(),
                ops,
                "10456",
                record,
                DISPATCH,
                "1787355841.733589",
                {
                    "ts": f"1787356000.{index:06d}",
                    "user": "U123",
                    "text": text,
                },
            )
            self.assertEqual(result, "report_command_delegated", text)
        self.assertEqual(ops.posts, [])


if __name__ == "__main__":
    unittest.main()
