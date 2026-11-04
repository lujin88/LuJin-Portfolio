"""R9 sequence: separate original-pixel captions and a rigid fox head turn.
Run BUILD.py, ADD_SEAM_OVERLAP.py, then this file. No raster pixels are rewritten.
"""
from pathlib import Path
import re,base64,math,json,xml.etree.ElementTree as ET
root=Path(__file__).resolve().parent

def pack(values):
 out=[]
 for v in values:
  while v>=128:out.append((v&127)|128);v>>=7
  out.append(v)
 return base64.b64encode(bytes(out)).decode()

def polygon_mesh(points):
 # Ear-clipping a simple CCW polygon, retaining original texture coordinates.
 remaining=list(range(len(points)));tri=[]
 def cross(a,b,c):return (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
 if sum(a[0]*b[1]-b[0]*a[1] for a,b in zip(points,points[1:]+points[:1]))<0:remaining.reverse()
 while len(remaining)>3:
  found=False
  for j,b in enumerate(remaining):
   a=remaining[j-1];c=remaining[(j+1)%len(remaining)]
   if cross(points[a],points[b],points[c])<=0:continue
   def inside(p):return min(cross(points[a],p,points[b])*-1,cross(points[b],p,points[c])*-1,cross(points[c],p,points[a])*-1)>=0
   if any(inside(points[k]) for k in remaining if k not in [a,b,c]):continue
   tri.extend([a,b,c]);remaining.pop(j);found=True;break
  assert found,'non-simple head polygon'
 tri.extend(remaining)
 return pack(tri)

def image_patch(points,cx,cy):
 verts=''.join(f'<MeshVertex x="{x-cx}" y="{y-cy}" u="{x/1842:.10f}" v="{y/854:.10f}"/>' for x,y in points)
 return f'<Image assetId="0:2"><Mesh triangleIndexBytes="{polygon_mesh(points)}">{verts}</Mesh></Image>'

def path(points):return '<PointsPath isClosed="true">'+''.join(f'<StraightVertex x="{x}" y="{y}"/>' for x,y in points)+'</PointsPath>'

def keys(ident,prop,values):
 # Cubic smoothstep, same envelope as the inherited R9 generator.
 vals=''.join(f'<KeyFrameDouble frame="{fr}" value="{v}" interpolationType="cubic"><CubicEaseInterpolator x1="0.333333" y1="0" x2="0.666667" y2="1"/></KeyFrameDouble>' for fr,v in values)
 return f'<KeyedObject objectId="0:{ident}"><KeyedProperty property="{prop}">{vals}</KeyedProperty></KeyedObject>'

# Local source contour, including a small antialias fringe. Bottom is the neck joint.
head=[(1336,581),(1342,565),(1347,552),(1346,536),(1348,523),(1353,520),(1372,539),(1390,536),(1397,523),(1403,518),(1409,527),(1412,546),(1421,553),(1433,558),(1445,557),(1448,565),(1441,579),(1424,591),(1406,599),(1397,612),(1360,612),(1355,602),(1341,596)]
# Do not let the lower neck move independently of the fixed body.
cx,cy=1380,608

for band in ['Rabbit','Bear','Fox']:
 p=root/band/'scene.rml';s=p.read_text()
 if 'SequenceScene' in s:
  tree=ET.fromstring(s);art=tree.find('Artboard');scene=art.find("Node[@name='SequenceScene']")
  for child in list(scene):
   if child.get('name') not in ['DecideOriginalPixels','HumanJudgmentOriginalPixels','OriginalCaptionCover','FoxLooksAtGirl','FoxPreviousPose','FoxSourceHeadCover']:
    art.insert(list(art).index(scene),child)
  art.remove(scene)
  anim=art.find('LinearAnimation')
  for item in list(anim):
   if item.get('objectId') in [f'0:{i}' for i in range(120000,120005)]:anim.remove(item)
  s=ET.tostring(tree,encoding='unicode').replace(' />','/>')
 # Identity cubic equals linear: remove verbose interpolators without changing motion.
 s=s.replace(' interpolationType="cubic"><CubicEaseInterpolator x1="0.333333" y1="0.333333" x2="0.666667" y2="0.666667"/></KeyFrameDouble>','/>')
 # Remove only interior repeated-value samples; endpoints of holds are retained.
 def compact(m):
  body=m.group(0);items=list(re.finditer(r'<KeyFrameDouble frame="(\d+)" value="([^"]+)"/>',body))
  remove={i for i in range(1,len(items)-1) if items[i-1][2]==items[i][2]==items[i+1][2]}
  for i in sorted(remove,reverse=True):body=body[:items[i].start()]+body[items[i].end():]
  return body
 s=re.sub(r'<KeyedProperty property="[xy]">.*?</KeyedProperty>',compact,s)
 s=re.sub(r'(<KeyFrameDouble frame="[^"]+" value="[^"]+")/>',r'\1 interpolationType="linear"/>',s)
 s=s.replace('<StraightVertex x="1230" y="245"/><StraightVertex x="1080" y="245"/>','<StraightVertex x="1230" y="268"/><StraightVertex x="1080" y="265"/>')
 extras='';extra_keys=''
 if band=='Fox':
  # Caption patches use the existing illustration's lettering, size and colour.
  for ident,name,box,cx2,cy2 in [(120001,'DecideOriginalPixels',(1076,130,1350,195),1212,172),(120002,'HumanJudgmentOriginalPixels',(1042,196,1352,226),1197,211)]:
   x1,y1,x2,y2=box;points=[(x1,y1),(x2,y1),(x2,y2),(x1,y2)]
   extras+=f'<Node id="0:{ident}" name="{name}" x="{cx2}" y="{cy2}" opacity="0">{image_patch(points,cx2,cy2)}</Node>'
  extras+='<Shape name="OriginalCaptionCover">'+path([(1035,126),(1360,126),(1360,228),(1035,228)])+'<Fill><SolidColor colorValue="FF080F1A"/></Fill></Shape>'
  extra_keys+=keys(120001,'opacity',[(0,0),(210,0),(228,1),(570,1),(600,0),(720,0)])
  extra_keys+=keys(120001,'y',[(0,180),(210,180),(228,168),(246,172),(570,172),(600,180),(720,180)])
  for prop in ['scaleX','scaleY']:extra_keys+=keys(120001,prop,[(0,.95),(210,.95),(228,1.06),(246,1),(570,1),(600,.95),(720,.95)])
  extra_keys+=keys(120002,'opacity',[(0,0),(252,0),(276,1),(570,1),(600,0),(720,0)])
  # Rigid head silhouette rotates to face the girl. Mirrored endpoint is unit scale.
  extras+=f'<Node id="0:120003" name="FoxLooksAtGirl" x="{cx}" y="{cy}" scaleX="-1" opacity="0">{image_patch(head,cx,cy)}</Node>'
  extras+=f'<Node id="0:120004" name="FoxPreviousPose" x="{cx}" y="{cy}">{image_patch(head,cx,cy)}</Node>'
  extras+='<Shape name="FoxSourceHeadCover">'+path(head)+'<Fill><LinearGradient startX="1330" startY="565" endX="1450" endY="565"><GradientStop position="0" colorValue="FF0D1B32"/><GradientStop position="1" colorValue="FF0C192D"/></LinearGradient></Fill></Shape>'
  extra_keys+=keys(120003,'opacity',[(0,0),(167,0),(169,1),(570,1),(600,0),(720,0)])
  extra_keys+=keys(120004,'opacity',[(0,1),(167,1),(169,0),(570,0),(600,1),(720,1)])
  extra_keys+=keys(120004,'rotation',[(0,0),(150,0),(174,-math.radians(8)),(570,-math.radians(8)),(612,0),(720,0)])
  extra_keys+=keys(120003,'rotation',[(0,0),(150,0),(192,math.radians(12)),(570,math.radians(12)),(612,0),(720,0)])
  # Two rigid original-pixel poses switch over two frames; never squeeze the head to zero width.
 # Fade all illustration content together; reset only while fully invisible.
 start=s.index('<LayoutComponentStyle id="0:90"/>')+len('<LayoutComponentStyle id="0:90"/>')
 end=s.index('<Event id="0:80"')
 s=s[:start]+'<Node id="0:120000" name="SequenceScene">'+extras+s[start:end]+'</Node>'+s[end:]
 # Group opacity is applied to the composited DOM plane. Per-draw Rive opacity
 # would uncover the original arc/head and double alpha at overlapping band edges.
 s=s.replace('</LinearAnimation>',extra_keys+'</LinearAnimation>')
 p.write_text(s)
 print(band,len(s),'bytes',flush=True)
(root/'SEQUENCE.json').write_text(json.dumps({'fps':60,'duration':12,'girl':[1,1.7],'bulb':[1.9,2.3],'fox':[2.5,3.2],'decide':[3.5,3.8,4.1],'caption':[4.2,4.6],'hold':[4.6,9],'fade':[9,9.5],'hiddenReset':[9.5,10.5],'return':[10.5,11],'rest':[11,12],'text':'Human judgment in every step','textSource':'original.png, x1042..1352/y196..226; exact raster type retained; font identity not available'},indent=2)+'\n')
