"""Offline AST-only test: never imports the live-client script or runs its calls."""
import ast,copy,unittest
from pathlib import Path
source=Path(__file__).with_name('recover-reviewed-fresh-sites-remote.py').read_text()
tree=ast.parse(source)
function=next(node for node in tree.body if isinstance(node,ast.FunctionDef) and node.name=='validate_import_result')
scope={};exec(compile(ast.Module(body=[function],type_ignores=[]),'<guard-only>','exec'),scope)
validate=scope['validate_import_result']
class RemoteGuardTests(unittest.TestCase):
 def test_first_create_selected_only(self):
  target={'id':'10480','expectedClientId':'AIS12854','equipmentIds':['EQ1'],'expectedStatus':'unresolved','expectedIssue':'bluefolder_equipment_not_mapped'}
  result={'created':False,'after':{'clientId':'AIS12854','equipmentLinkStatus':'unresolved','equipmentLinkIssue':'work_order_client_missing'}}
  self.assertTrue(validate(result,target,['10480']))
  for ids,modified in [([],target),(['10480'],{**target,'equipmentIds':[]}),(['10480'],{**target,'expectedStatus':'not_selected','expectedIssue':''})]:
   with self.assertRaises(AssertionError):validate(result,modified,ids)
  for patch in [{'clientId':'OTHER'},{'machineId':'M1'},{'trailerId':'T1'},{'machineId':False},{'machineRef':[]},{'equipmentLinkStatus':'site_unresolved'},{'equipmentLinkIssue':'OTHER'}]:
   changed=copy.deepcopy(result);changed['after'].update(patch)
   with self.assertRaises(AssertionError):validate(changed,target,['10480'])
  with self.assertRaises(AssertionError):validate({**result,'created':True},target,['10480'])
  result['after']['equipmentLinkIssue']='bluefolder_equipment_not_mapped';self.assertFalse(validate(result,target,[]))
if __name__=='__main__':unittest.main()
