from pathlib import Path
import xml.etree.ElementTree as E
import shutil,copy,subprocess,base64,gzip,math
out=Path(__file__).parent
src=out/'inputs'
for name in ['Bear','Rabbit','Fox']:
 d=out/name;d.mkdir(exist_ok=True)

 r=E.ElementTree(E.fromstring(gzip.decompress((src/(name+'.rml.gz')).read_bytes())));a=r.getroot().find('Artboard');an=a.find('LinearAnimation');scene=a.find('Node')
 # Increase existing mesh deformation without scaling the illustration or its layout.
 for ko in an.findall('KeyedObject'):
  for kp in ko.findall('KeyedProperty'):
   ks=kp.findall('KeyFrameDouble')
   if kp.get('property') in ['x','y'] and ks and int(ko.get('objectId').split(':')[1])<90000:
    base=float(ks[0].get('value'))
    for k in ks:k.set('value',str(base+1.35*(float(k.get('value'))-base)))
 if name=='Fox':
  original_children=list(scene)
  def keys(id,prop,vals):
   for ko in list(an):
    if ko.tag=='KeyedObject' and ko.get('objectId')==id:
     for kp in list(ko):
      if kp.get('property')==prop:ko.remove(kp)
   ko=E.SubElement(an,'KeyedObject',objectId=id);kp=E.SubElement(ko,'KeyedProperty',property=prop)
   for frame,value in vals:E.SubElement(kp,'KeyFrameDouble',frame=str(frame),value=str(value),interpolationType='linear')
  def cover(x1,y1,x2,y2):
   s=E.SubElement(scene,'Shape');p=E.SubElement(s,'PointsPath',isClosed='true')
   for x,y in [(x1,y1),(x2,y1),(x2,y2),(x1,y2)]:E.SubElement(p,'StraightVertex',x=str(x),y=str(y))
   E.SubElement(E.SubElement(s,'Fill'),'SolidColor',colorValue='FF080F1A')
  def raster(id,box):
   x1,y1,x2,y2=box;cx=(x1+x2)/2;cy=(y1+y2)/2
   n=E.SubElement(scene,'Node',id=id,x=str(cx),y=str(cy));m=E.SubElement(E.SubElement(n,'Image',assetId='0:2'),'Mesh',triangleIndexBytes='AwABAQID')
   for x,y in [(x1,y1),(x2,y1),(x2,y2),(x1,y2)]:E.SubElement(m,'MeshVertex',x=str(x-cx),y=str(y-cy),u=str(x/1842),v=str(y/854))
   return n,cy
  def arrow_sprite(id,box):
   # Keep the cloud behind the arrow stationary. Only bright stroke pixels
   # belong to the animated sprite; the old rectangular crop moved its backdrop.
   raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(d/'original.png'),'-f','rawvideo','-pix_fmt','rgb24','-'])
   def pixel(x,y):
    i=(y*1842+x)*3;return tuple(raw[i:i+3])
   x1,y1,x2,y2=box;cx=(x1+x2)/2;cy=(y1+y2)/2
   # Clear the full stroke and its antialiasing, including the arrow tip.
   cover(x1-16,y1,x2,590)
   # Restore one continuous cloud contour. Per-row stroke covers previously
   # chose the flat backdrop when a scanline crossed the cloud, leaving bars.
   sh=E.SubElement(scene,'Shape');pa=E.SubElement(sh,'PointsPath',isClosed='true')
   contour=[(813,537),(805,541),(799,545),(793,549),(788,553),
            (783,557),(779,561),(775,565),(771,569),(768,573),
            (765,577),(763,581),(761,585),(759,589),(759,590),(813,590)]
   for xx,yy in contour:E.SubElement(pa,'StraightVertex',x=str(xx),y=str(yy))
   E.SubElement(E.SubElement(sh,'Fill'),'SolidColor',colorValue='FF0D1A2F')
   node=E.SubElement(scene,'Node',id=id,x=str(cx),y=str(cy))
   mesh=E.SubElement(E.SubElement(node,'Image',assetId='0:2'),'Mesh')
   indices=[];vertex_count=0
   for y in range(y1,y2):
    x=x1
    while x<x2:
     if pixel(x,y)[2]<65:x+=1;continue
     start=x
     while x<x2 and pixel(x,y)[2]>=65:x+=1
     indices.extend(vertex_count+j for j in [3,0,1,1,2,3]);vertex_count+=4
     for xx,yy in [(start,y),(x,y),(x,y+1),(start,y+1)]:E.SubElement(mesh,'MeshVertex',x=str(xx-cx),y=str(yy-cy),u=str(xx/1842),v=str(yy/854))
   encoded=bytearray()
   for value in indices:
    while value>=128:encoded.append((value&127)|128);value>>=7
    encoded.append(value)
   mesh.set('triangleIndexBytes',base64.b64encode(encoded).decode())
   scene.remove(node);scene.append(node)
   return node,cy
  # Hide inherited caption drawables; reconstruct at the top of the compositor.
  for id in ['0:120001','0:120002']:keys(id,'opacity',[(0,0),(720,0)])
  regions=[(732,433,813,583),(828,380,925,458),(983,383,1072,454),(1298,375,1411,485),(1434,381,1532,493),(1644,464,1758,578),(1496,510,1608,576),(1212,736,1340,775)]
  for i,box in enumerate(regions):
   id=f'0:{200000+i}'
   if i==0:n,cy=arrow_sprite(id,box)
   else:cover(*box);n,cy=raster(id,box)
   start=12+i*19
   for prop in ['scaleX','scaleY']:keys(id,prop,[(0,.82),(start,.82),(start+10,1.12),(start+19,1),(720,1)])
   keys(id,'opacity',[(0,0),(start,0),(start+1,1),(720,1)])
   keys(id,'y',[(0,cy+22),(start,cy+22),(start+10,cy-9),(start+19,cy),(720,cy)])
  cover(1035,126,1360,228)
  n,cy=raster('0:210000',(1076,130,1344,195))
  for p in ['scaleX','scaleY']:keys('0:210000',p,[(0,.82),(210,.82),(221,1.18),(235,1),(720,1)])
  keys('0:210000','opacity',[(0,0),(210,0),(211,1),(720,1)])
  keys('0:210000','y',[(0,cy+30),(210,cy+30),(221,cy-12),(235,cy),(720,cy)])
  # Preserve original lettering: reveal image strips, rather than substitute a font.
  glyphs=[(1054,1066),(1069,1078),(1081,1096),(1098,1107),(1110,1119),(1125,1129),(1132,1141),(1143,1153),(1156,1166),(1168,1183),(1185,1195),(1198,1207),(1209,1214),(1222,1224),(1227,1236),(1244,1254),(1256,1265),(1267,1276),(1279,1284),(1286,1295),(1303,1311),(1313,1319),(1321,1330),(1333,1342)]
  for i,(left,right) in enumerate(glyphs):
   x1=1050 if i==0 else (glyphs[i-1][1]+left)/2
   x2=1346 if i==23 else (right+glyphs[i+1][0])/2
   id=f'0:{220000+i}';raster(id,(x1,197,x2,224));t=245+round(i*60/23)
   keys(id,'opacity',[(0,0),(t,0),(t+1,1),(720,1)])
  additions=[e for e in scene if e not in original_children]
  scene[:]=list(reversed(additions))+original_children
 # Compress the active sequence, then keep a genuinely static 120-frame hold.
 for kp in an.iter('KeyedProperty'):
  frames=sorted(kp.findall('KeyFrameDouble'),key=lambda k:int(k.get('frame')))
  if not frames:continue
  final=float(frames[-1].get('value'))
  for left,right in zip(frames,frames[1:]):
   lf,rf=int(left.get('frame')),int(right.get('frame'))
   if lf<=307<=rf:
    ratio=(307-lf)/(rf-lf)
    final=float(left.get('value'))*(1-ratio)+float(right.get('value'))*ratio
    break
  by_frame={}
  for k in frames:
   kp.remove(k)
   f=int(k.get('frame'))
   if f<=307:
    k.set('frame',str(round(f*.65)));by_frame[int(k.get('frame'))]=k
  for f in [200,320]:
   by_frame[f]=E.Element('KeyFrameDouble',frame=str(f),value=str(final),interpolationType='linear')
  for f,k in sorted(by_frame.items()):kp.append(k)
 # Local, smoothly weighted mesh gestures preserve the original artwork.
 # Apply to each composited layer so overlapping copies cannot ghost.
 keyed={ko.get('objectId'):ko for ko in an.findall('KeyedObject')}
 def weight(x,y,cx,cy,rx,ry):
  q=((x-cx)/rx)**2+((y-cy)/ry)**2
  return max(0,1-q)**2
 def gesture(x,y,f):
  # Three distinct work beats follow the progressing line; all settle before text.
  def pulse(start,end,cycles):
   t=(f-start)/(end-start)
   return math.sin(cycles*math.pi*t)**2 if 0<t<1 else 0
  bear=pulse(8,72,3);rabbit=pulse(42,112,2)
  b=weight(x,y,818,684,32,28)*min(1,max(0,(704-y)/8))
  r=weight(x,y,1008,624,45,30)*min(1,max(0,(642-y)/8))
  return 8*b*bear+6*r*rabbit, -18*b*bear-16*r*rabbit
 changed=0
 for v in a.iter('MeshVertex'):
  vid=v.get('id')
  if not vid:continue
  x,y=float(v.get('x')),float(v.get('y'))
  gx,gy=float(v.get('u'))*1842,float(v.get('v'))*854
  if max(sum(abs(n) for n in gesture(gx,gy,f)) for f in range(0,150,4))<.05:continue
  ko=keyed.get(vid)
  if ko is None:ko=E.SubElement(an,'KeyedObject',objectId=vid)
  for axis,base in [('x',x),('y',y)]:
   for old in list(ko):
    if old.get('property')==axis:ko.remove(old)
   kp=E.SubElement(ko,'KeyedProperty',property=axis)
   for f in list(range(0,151,3))+[200,320]:
    offset=gesture(gx,gy,f)[0 if axis=='x' else 1]
    E.SubElement(kp,'KeyFrameDouble',frame=str(f),value=str(base+offset),interpolationType='linear')
  changed+=1
 if name=='Fox':
  # Keep the existing right-facing head and nod toward the laptop while its line arrives.
  keys('0:120003','opacity',[(0,0),(320,0)])
  keys('0:120004','opacity',[(0,1),(320,1)])
  keys('0:120004','rotation',[(0,0),(72,0),(84,.22),(96,0),(108,.22),(120,0),(200,0),(320,0)])
 an.set('duration','320')
 print(name,'local gesture vertices',changed,'duration',an.get('duration'))
 r.write(d/'scene.rml',encoding='unicode')
