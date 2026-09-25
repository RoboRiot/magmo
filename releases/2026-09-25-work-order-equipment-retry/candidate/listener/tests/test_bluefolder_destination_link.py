from __future__ import annotations

import unittest
from types import SimpleNamespace
from unittest import mock

import bluefolder_slack_listener_v2 as listener


def tarzana_work_order():
    return {
        "serviceRequestId": "10654",
        "dateTimeCreated": "2026-09-23T16:00:00+00:00",
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


def settings():
    return SimpleNamespace(
        bluefolder_base_url="https://example.invalid/api/2.0",
        bluefolder_work_order_url_template=(
            "https://example.invalid/service/sr.aspx?srid={id}"
        ),
    )


def import_result():
    return {
        "ok": True,
        "eventType": "work_order.imported",
        "created": True,
        "idempotentReplay": False,
        "before": None,
        "after": {
            "workOrderId": "10654",
            "number": "10654",
            "blueFolder": {"serviceRequestId": "10654"},
        },
        "appliedChanges": {"clientId": "AIS76854"},
        "requestId": "request-10654",
        "apiVersion": "2026-09-16.1",
        "idempotencyKey": {"blueFolderServiceRequestId": "10654"},
    }


class BlueFolderDestinationLinkTests(unittest.TestCase):
    def test_tarzana_identity_survives_extraction_and_normalization(self):
        fields = listener.extract_work_order_fields(tarzana_work_order(), settings())
        self.assertEqual(fields["bluefolder_customer_id"], "34579369")
        self.assertEqual(fields["bluefolder_location_id"], "35057749")
        self.assertEqual(
            fields["bluefolder_location_name"], "Prohealth - Tarzana"
        )
        record = listener.bluefolder_import_record(fields, [])
        self.assertEqual(record["bluefolder_customer_id"], "34579369")
        self.assertEqual(record["bluefolder_location_id"], "35057749")

    def test_import_sends_only_allowed_destination_identity(self):
        fields = listener.extract_work_order_fields(tarzana_work_order(), settings())
        record = listener.bluefolder_import_record(fields, [])
        client = object.__new__(listener.MagmoOpsIngestClient)
        client._request = mock.Mock(return_value=import_result())

        client.import_work_order("10654", record)

        payload = client._request.call_args.args[0]
        self.assertEqual(
            payload["blueFolder"],
            {
                "serviceRequestId": "10654",
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
        )
        for forbidden in (
            "clientId",
            "source",
            "actor",
            "commandTs",
            "slackChannel",
            "slackThreadTs",
            "slackPermalink",
        ):
            self.assertNotIn(forbidden, payload)

    def test_blank_optional_identity_is_omitted(self):
        client = object.__new__(listener.MagmoOpsIngestClient)
        client._request = mock.Mock(return_value=import_result())
        client.import_work_order(
            "10654",
            {
                "service_request_id": "10654",
                "number": "10654",
                "bluefolder_location_id": " ",
            },
        )
        self.assertEqual(
            client._request.call_args.args[0]["blueFolder"],
            {"serviceRequestId": "10654"},
        )


if __name__ == "__main__":
    unittest.main()
