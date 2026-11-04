"""Extend two mesh edges by one existing five-pixel neighbour column.
Run after BUILD.py. Copies original UVs and keyframes; never stretches a band.
"""
from pathlib import Path
import base64, re, json
ROOT=Path(__file__).resolve().parent

def attrs(tag): return dict(re.findall(r'(\w+)="([^"]*)"',tag))
def unpack(text):
 out=[];v=shift=0
 for b in base64.b64decode(text):
  v|=(b&127)<<shift
  if b&128:shift+=7
  else:out.append(v);v=shift=0
 return out

def pack(values):
 out=[]
 for v in values:
  while v>=128:out.append((v&127)|128);v>>=7
  out.append(v)
 return base64.b64encode(bytes(out)).decode()

# Bear is left unchanged. Its edge vertices supply both neighbours.
donor=(ROOT/'Bear/scene.rml').read_text()
dverts=[(t,attrs(t)) for t in re.findall(r'<MeshVertex\b[^>]*/>',donor)]
keys={}
for m in re.finditer(r'<KeyedObject objectId="([^"]+)">.*?</KeyedObject>',donor):keys.setdefault(m[1],[]).append(m[0])
report=[]
for name,edge,new_x,side in [('Rabbit',119,124,'right'),('Fox',399,394,'left')]:
 path=ROOT/name/'scene.rml';s=path.read_text()
 verts=[(t,attrs(t)) for t in re.findall(r'<MeshVertex\b[^>]*/>',s)]
 if any(float(a['x'])==new_x for _,a in verts):
  print(name,'overlap already present');continue
 old_by_y={float(a['y']):i for i,(_,a) in enumerate(verts) if float(a['x'])==edge}
 borrowed=sorted([(t,a) for t,a in dverts if float(a['x'])==new_x],key=lambda item:float(item[1]['y']))
 assert len(borrowed)==len(old_by_y)==159
 triangles=re.search(r'triangleIndexBytes="([^"]+)"',s);idx=unpack(triangles[1])
 used=[int(v) for v in re.findall(r'\bid="0:(\d+)"',s)];next_id=max(used)+1
 added=[];added_keys=[];rows=[]
 for i,(tag,a) in enumerate(borrowed):
  ident=f'0:{next_id+i}';added.append(tag.replace('id="'+a['id']+'"','id="'+ident+'"'))
  for key in keys.get(a['id'],[]):added_keys.append(key.replace('objectId="'+a['id']+'"','objectId="'+ident+'"'))
  rows.append((old_by_y[float(a['y'])],len(verts)+i))
 for (o,n),(ob,nb) in zip(rows,rows[1:]):
  idx.extend([o,n,nb,o,nb,ob] if side=='right' else [n,o,ob,n,ob,nb])
 s=s[:triangles.start(1)]+pack(idx)+s[triangles.end(1):]
 s=s.replace('</Mesh>',''.join(added)+'</Mesh>',1)
 s=s.replace('</LinearAnimation>',''.join(added_keys)+'</LinearAnimation>',1)
 path.write_text(s)
 report.append({'band':name,'addedVertices':len(added),'addedTriangles':(len(rows)-1)*2,'addedKeyedObjects':len(added_keys),'overlapSourcePixels':5,'originalVerticesAndKeysUnchanged':True})
(ROOT/'SEAM_OVERLAP.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report))
