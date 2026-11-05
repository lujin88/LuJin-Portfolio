import json
from pathlib import Path
root=Path(__file__).parent
summary={'roundtrips':{},'regression':{}}
for tag in ['BEFORE_B_1024x768','B_1024x768','A_1024x768','A_1440x900']:
 data=json.loads((root/tag/'toggle.json').read_text())
 rows=[{'name':r['name'],'beforeY':r['before']['y'],'midY':r['mid']['y'],'backY':r['back']['y'],'driftY':round(r['back']['y']-r['before']['y'],4),'metaDrift':round(r['back']['metaTop']-r['before']['metaTop'],4),'beforeProgress':r['before']['p'],'midProgress':r['mid']['p'],'backProgress':r['back']['p']} for r in data['res']]
 summary['roundtrips'][tag]={'rows':rows,'errors':data['errs'],'maxYDrift':max(abs(r['driftY']) for r in rows),'maxMetaDrift':max(abs(r['metaDrift']) for r in rows)}
 assert len(rows)==14 and not data['errs']
 for case in data['res']:
  assert case['wait1']>=0 and case['wait2']>=0
  assert (case['before']['p']=='static') != (case['mid']['p']=='static')
  assert case['before']['p']==case['back']['p']
 if not tag.startswith('BEFORE'):assert all(abs(r['driftY'])<=1 and abs(r['metaDrift'])<=1 for r in rows)
for f in (root/'regA').glob('*.json'):
 a=json.loads(f.read_text());b=json.loads((root/'regBEFORE_A'/f.name).read_text())
 if f.name.startswith('combo'):
  fields=['info','range','errs','overlapsDown','overlapsUp','nonMonoDown','nonMonoUp','progressDownEnd','progressUpEnd','finals']
  a={k:a[k] for k in fields};b={k:b[k] for k in fields}
 summary['regression'][f.name]={'identical':a==b}
 assert a==b,(f.name,'regression mismatch')
extra=json.loads((root/'EXTRA.json').read_text());assert all(r['pass'] for r in extra['out']) and not extra['errors']
summary['extra']=extra
(root/'SUMMARY.json').write_text(json.dumps(summary,indent=2)+'\n')
print(json.dumps({k:{'maxYDrift':v['maxYDrift'],'maxMetaDrift':v['maxMetaDrift']} for k,v in summary['roundtrips'].items()},indent=2))
print(summary['regression'])
