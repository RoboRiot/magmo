# Executed through SSH stdin with CONFIG supplied by the guarded local runner.
# No daemon/main/StateStore call, state write, Slack call, or BlueFolder mutation.
import sys, json, time, hashlib
from pathlib import Path
from dotenv import load_dotenv

live = Path(r'C:\Users\Owner\Desktop\warehouse\bluefolder_listener')
staged = live.parent / '.warehouse_runtime' / 'deployments' / 'work-order-site-only-retry-20260925' / 'listener'
assert hashlib.sha256((live / 'bluefolder_slack_listener_v2.py').read_bytes()).hexdigest() == CONFIG['baselineSha']
assert hashlib.sha256((staged / 'bluefolder_slack_listener_v2.py').read_bytes()).hexdigest() == CONFIG['candidateSha']
for env in [live / '.env.local', live / '.env', live.parent / '.env.local', live.parent / '.env']:
    if env.exists():
        load_dotenv(env, override=False)
sys.path.insert(0, str(staged))
import bluefolder_slack_listener_v2 as m

def emit(value):
    print(json.dumps(value), flush=True)

bf = m.BlueFolderClient(m.SETTINGS)
body = ('<request><serviceRequestList><listType>full</listType>'
        '<dateRange dateField="dateTimeCreated"><startDate>2026-08-26</startDate>'
        '<endDate>2026-09-26</endDate></dateRange></serviceRequestList></request>')
response = bf._request('POST', m.SETTINGS.bluefolder_work_orders_path,
                       data=body.encode('utf-8'),
                       headers={'Content-Type': 'text/xml', 'Accept': 'text/xml, application/xml, application/json'})
assert not bf._payload_error_message(response), 'BlueFolder list error'
source = [m.extract_work_order_fields(row, m.SETTINGS) for row in bf._extract_collection(response)]
records = []
allowed = {'number', 'service_request_id', 'existing_only', 'bluefolder_customer_id',
           'bluefolder_customer_name', 'bluefolder_location_id', 'bluefolder_location_name',
           'bluefolder_address_street', 'bluefolder_address_city', 'bluefolder_address_state',
           'bluefolder_address_postal_code', 'bluefolder_address_country'}
for target in CONFIG['targets']:
    found = [row for row in source if row['id'] == target['id'] and row['number'] == target['id']]
    assert len(found) == 1, 'Exact source record missing/ambiguous: ' + target['id']
    fields = found[0]
    assert fields.get('bluefolder_customer_id') == target['customerId']
    assert fields.get('bluefolder_location_id') == target['locationId']
    assert 'bluefolder_equipment_ids' not in fields and 'bluefolder_equipment_names' not in fields
    record = m.equipment_sync_record(m.bluefolder_import_record(fields, []))
    assert record['existing_only'] is True and set(record) <= allowed
    assert 'bluefolder_equipment_ids' not in record and 'bluefolder_equipment_names' not in record
    records.append(record)
emit({'kind': 'freshSource', 'checkedAt': m.utc_now_iso(), 'records': records,
      'sourceRows': len(source), 'equipmentOmitted': True})
if not CONFIG['apply']:
    sys.exit(0)

# Exact source evidence reviewed immediately before this invocation must be stable.
assert records == CONFIG['records'], 'Source changed since preflight'
ops = m.MagmoOpsIngestClient(m.SETTINGS)
assert ops.supports_bluefolder_import
for target, record in zip(CONFIG['targets'], records):
    # One attempt per work order; the client uses the bounded deadline and does
    # not retry ambiguous acknowledgements. A partial failure stops this run.
    ops._equipment_refresh_deadline = time.monotonic() + 20
    context, _ = m.fetch_authoritative_work_order_context(ops, target['id'], target['id'])
    assert context and not context.get('deleted') and not m.ops_record_is_deleted(context)
    assert not any(context.get(key) for key in ('clientId', 'machineId', 'machineName', 'trailerId', 'trailerName'))
    result = ops.import_work_order(target['id'], record)
    emit({'kind': 'httpResult', 'workOrderId': target['id'], 'checkedAt': m.utc_now_iso(), 'result': result})
    assert result['created'] is False
    after = result['after']
    assert after['clientId'] == target['expectedClientId']
    assert not after.get('machineId') and not after.get('trailerId')
    assert after['equipmentLinkStatus'] == 'not_selected' and not after['equipmentLinkIssue']
emit({'kind': 'complete', 'checkedAt': m.utc_now_iso(), 'count': len(records),
      'daemonStateWritten': False, 'listenerLoopStarted': False,
      'noSlackWrites': True, 'noBlueFolderWrites': True})
