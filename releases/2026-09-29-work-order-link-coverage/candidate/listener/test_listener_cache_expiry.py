import ast
import copy
import datetime as dt
import pathlib
import types
import typing
import unittest

ROOT = pathlib.Path(__file__).parent
BASE = ast.parse((ROOT / 'listener-source.py').read_text(encoding='utf-8-sig'))
CANDIDATE = ast.parse((ROOT / 'listener-candidate.py').read_text(encoding='utf-8-sig'))
NOW = 1790703000

def parse_dt(value):
    try:
        parsed = dt.datetime.fromisoformat(value.replace('Z', '+00:00'))
        return parsed.replace(tzinfo=dt.timezone.utc) if parsed.tzinfo is None else parsed
    except (ValueError, TypeError):
        return None

def iso(offset):
    return dt.datetime.fromtimestamp(NOW + offset, dt.timezone.utc).isoformat()

def load():
    names = {'equipment_resolution_cache_is_fresh', 'sync_bluefolder_equipment_updates'}
    module = ast.Module(body=[node for node in CANDIDATE.body if isinstance(node, ast.FunctionDef) and node.name in names], type_ignores=[])
    calls = []
    env = dict(Dict=typing.Dict, Any=typing.Any, List=typing.List, Settings=object, StateStore=object,
        parse_dt=parse_dt, time=types.SimpleNamespace(time=lambda: NOW, monotonic=lambda: 1),
        EQUIPMENT_RESOLUTION_TERMINAL={'resolved','manual','not_selected'},
        ops_record_is_deleted=lambda value: bool(value.get('deleted')),
        extract_work_order_fields=lambda value, settings: value,
        bluefolder_import_record=lambda fields, _: fields,
        equipment_sync_record=lambda value: value,
        equipment_sync_fingerprint=lambda value: 'fp',
        equipment_destination_resolution=lambda after, record: ((after or {}).get('equipmentLinkStatus','unresolved'), ''),
        fetch_authoritative_work_order_context=lambda ops, sid, number: ({'deleted': False}, None),
        remember_equipment_sync=lambda saved, record, result: calls.append(record['id']),
        update_equipment_resolution_pending=lambda *args: None,
        update_equipment_resolution_health=lambda *args: None)
    exec(compile(module, '<scoped-live-listener>', 'exec'), env)
    return env, calls

class CacheTests(unittest.TestCase):
    def test_ast_scope_preserves_every_other_live_node(self):
        def untouched(tree):
            return [ast.dump(node, include_attributes=False) for node in tree.body
                if not (isinstance(node, ast.FunctionDef) and node.name in {'sync_bluefolder_equipment_updates','equipment_resolution_cache_is_fresh'})
                and not (isinstance(node, ast.Assign) and any(isinstance(target,ast.Name) and target.id=='LISTENER_VERSION' for target in node.targets))]
        self.assertEqual(untouched(BASE), untouched(CANDIDATE))
        compile(CANDIDATE, 'listener-candidate.py', 'exec')

    def test_timestamp_boundaries(self):
        env,_=load(); fresh=env['equipment_resolution_cache_is_fresh']
        for offset, expected in [(0,True),(-21599,True),(-21600,False),(-21601,False),(1,False)]:
            self.assertEqual(fresh({'last_attempt_at':iso(offset)}, NOW), expected)
        for value in ['', 'not-a-date', None]:
            self.assertFalse(fresh({'last_attempt_at':value}, NOW))

    def run_sync(self, resolution=None, legacy=False, pending=None, dry_run=False, deleted=False):
        env,calls=load()
        saved={'number':'10698','ops_work_order_id':'10698','deleted':deleted,
            'bluefolder_equipment_authoritative_after':{'equipmentLinkStatus':'resolved'}}
        if resolution is not None: saved['bluefolder_equipment_resolution']=resolution
        if legacy:
            saved['bluefolder_equipment_synced_fingerprint']='fp'
            saved['magmo_authoritative_after']={'equipmentLinkStatus':'resolved'}
        state=types.SimpleNamespace(data={'processed_work_order_ids':{'10698':saved},
            'bluefolder_equipment_sync_pending':{'10698':pending} if pending else {}}, save=lambda:None)
        ops=types.SimpleNamespace(supports_bluefolder_import=True,
            import_work_order=lambda *args:{}, work_order_context=lambda *args:{})
        settings=types.SimpleNamespace(dry_run=dry_run,bluefolder_equipment_sync_budget_seconds=20,bluefolder_equipment_sync_batch=6)
        result=env['sync_bluefolder_equipment_updates'](settings,state,[{'id':'10698','number':'10698','created_at':iso(-10)}],ops)
        self.assertFalse(hasattr(ops, '_equipment_refresh_deadline'))
        return result,calls

    def test_fresh_verified_checkpoint_skips(self):
        result,calls=self.run_sync({'fingerprint':'fp','status':'resolved','last_attempt_at':iso(-10)})
        self.assertEqual((result,calls),(0,[]))

    def test_expired_or_bad_checkpoint_revalidates(self):
        for timestamp in [iso(-21600),'invalid',iso(60),'']:
            result,calls=self.run_sync({'fingerprint':'fp','status':'resolved','last_attempt_at':timestamp})
            self.assertEqual((result,calls),(1,['10698']))

    def test_old_http_acknowledgement_is_not_proof(self):
        self.assertEqual(self.run_sync(legacy=True),(1,['10698']))

    def test_fingerprint_change_revalidates_immediately(self):
        self.assertEqual(self.run_sync({'fingerprint':'old','status':'resolved','last_attempt_at':iso(-10)}),(1,['10698']))

    def test_failed_request_retries_after_backoff_even_after_previous_400(self):
        for retryable in [True,False]:
            self.assertEqual(self.run_sync(pending={'fingerprint':'fp','retryable':retryable,'next_retry_at':iso(-1)}),(1,['10698']))
            self.assertEqual(self.run_sync(pending={'fingerprint':'fp','retryable':retryable,'next_retry_at':iso(60)}),(0,[]))

    def test_dry_run_and_deleted_work_orders_never_import(self):
        self.assertEqual(self.run_sync(dry_run=True),(0,[]))
        self.assertEqual(self.run_sync(deleted=True),(0,[]))

if __name__ == '__main__': unittest.main()
