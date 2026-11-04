"""Build Rive mesh animation using unmodified source pixels; no raster editing."""
from pathlib import Path
import math,json,base64,shutil
import numpy as np
root=Path(__file__).resolve().parent
source=root/'original.png'
if not source.exists(): shutil.copyfile(root.parent/'how-original-ear-fix/original.png',source)
def smooth(v):
 v=max(0,min(1,v));return v*v*(3-2*v)
def win(v,a,b,c,d):return smooth((v-a)/(b-a))*smooth((d-v)/(d-c))
def box(x,y,b):return win(x,*b[:4])*win(y,*b[4:])
def rotate(x,y,cx,cy,deg):
 a=math.radians(deg);xx=x-cx;yy=y-cy
 return xx*math.cos(a)-yy*math.sin(a)-xx,xx*math.sin(a)+yy*math.cos(a)-yy
# Local original-pixel displacement fields. Uniform central zones preserve face proportions.
def fields(x,y):
 f={}
 w=box(x,y,[1020,1090,1250,1340,250,440,625,727]);dx,dy=rotate(x,y,1170,624,16)
 w*=1-box(x,y,[1040,1065,1210,1245,250,280,410,438])
 f['person']=(w*dx/.6,w*(dy-32)/.6)
 w=box(x,y,[1060,1090,1185,1215,280,308,411,438]);f['bulb']=(w*(x-1136)*.22,w*((y-358)*.22-7))
 w=box(x,y,[1290,1336,1445,1495,470,515,593,685]);dx,dy=rotate(x,y,1380,625,-14);f['fox']=(w*(dx-12)/.6,w*(dy-18)/.6)
 w=box(x,y,[1460,1505,1620,1675,555,590,654,735]);dx,dy=rotate(x,y,1565,697,-14);f['checklist']=(w*(dx-12)/.6,w*(dy-22)/.6)
 w=box(x,y,[1608,1623,1658,1683,635,665,704,729]);f['tail']=(0,0)
 w=box(x,y,[900,934,1026,1065,420,465,600,660]);dx,dy=rotate(x,y,986,615,14);f['rabbit']=(w*(dx+7)/.6,w*(dy-12)/.6)
 w=box(x,y,[795,827,942,980,520,565,632,715]);dx,dy=rotate(x,y,890,650,14);f['bear']=(w*(dx+10)/.6,w*(dy-16)/.6)
 for i,(cx,cy,b) in enumerate([(876,418,[808,828,922,947,365,384,452,475]),(1354,429,[1280,1305,1407,1433,355,378,477,497]),(1701,521,[1627,1650,1756,1778,450,472,573,596])]):
  w=box(x,y,b);dx,dy=rotate(x,y,cx,cy,(-2 if i==1 else 2));f['card'+str(i)]=(0,0)

 w=box(x,y,[1050,1080,1345,1375,0,120,188,200]);f['decide']=(w*(x-1212)*.12,w*((y-172)*.12-72))
 return f
peaks={'person':(60,102,570,612),'bulb':(114,138,540,570),'decide':(210,228,540,570),'fox':(150,192,570,612),'checklist':(192,222,570,612),'tail':(0,1,2,3),'rabbit':(168,198,570,612),'bear':(180,210,570,612),'card0':(0,1,2,3),'card1':(0,1,2,3),'card2':(0,1,2,3)}
def envelope(frame,k):
 a,b,c,d=peaks[k]
 if frame<=a or frame>=d:return 0
 if frame<b:return smooth((frame-a)/(b-a))
 if frame<=c:
  if k in ["bulb","decide"] and frame < b+18:return 1 + .16*(1-(frame-b)/18)
  return 1
 return 1-smooth((frame-c)/(d-c))
frames=sorted(set([0,60,72,78,84,92,96,108,120,138,144,150,156,162,168,174,186,198,216,228,240,252,264,270,288,300,330,345,360,378,390,396,408,420,450,480,498,504,510,516,522,540,600,660,720]))
frames=sorted(set(frames+list(range(60,277,6))+[102,114,138,150,192,210,222,228,246,252,276,540,570,600,612,630,660]))
xs=list(range(720,1781,5));ys=list(range(0,791,5))
xy=np.array([(x,y) for y in ys for x in xs],dtype=float)
animal_params={
 'bear':(890,650,14,5,-14),
 'rabbit':(986,615,14,5,4),
 'fox':(1380,625,0,0,0),
 'checklist':(1565,697,-14,-10,-12),
}
head_polygons={
 'bear':[(834,596),(844,578),(853,569),(867,579),(886,572),(915,576),(926,569),(940,576),(950,599),(945,627),(936,645),(843,646)],
 'rabbit':[(951,601),(949,569),(958,542),(943,515),(938,489),(944,481),(954,484),(966,495),(980,529),(987,542),(992,499),(994,474),(1003,465),(1012,470),(1017,485),(1013,526),(1008,542),(1024,555),(1029,578),(1017,599)],
 'fox':[(1328,580),(1342,550),(1344,518),(1355,518),(1372,536),(1390,534),(1401,518),(1412,516),(1418,546),(1432,555),(1448,556),(1450,575),(1427,590),(1409,596),(1397,604),(1342,605)],
 'checklist':[(1516,620),(1530,615),(1530,602),(1542,596),(1559,599),(1568,589),(1578,598),(1590,596),(1606,611),(1612,629),(1612,650),(1566,654),(1536,651),(1511,643)],
}
prop_polygons=[
 # Rabbit overhead arrow is a fixed prop, including a raster-filter margin.
 [(980,380),(1075,380),(1075,455),(980,455)],
 [(820,375),(930,375),(930,465),(820,465)],
 [(1280,355),(1433,355),(1433,497),(1280,497)],
 [(1627,450),(1778,450),(1778,596),(1627,596)],
 [(1393,600),(1492,600),(1477,662),(1377,662)],
 [(906,642),(1112,642),(1140,764),(925,764)],
 [(813,649),(858,649),(858,712),(813,712)],
 [(1509,658),(1557,651),(1602,722),(1525,734)],
]
def inside(poly):
 x=xy[:,0];y=xy[:,1];out=np.zeros(len(xy),dtype=bool)
 for (ax,ay),(bx,by) in zip(poly,poly[1:]+poly[:1]):
  if by==ay:continue
  out^=((ay>y)!=(by>y))&(x<(bx-ax)*(y-ay)/(by-ay)+ax)
 return out
# Keep a ten-pixel margin around raster contours rigid, including antialiased ears.
cores={}
for k,p in head_polygons.items():
 mask=inside(p).reshape(len(ys),len(xs)); padded=np.pad(mask,2)
 expanded=np.logical_or.reduce([padded[dy:dy+len(ys),dx:dx+len(xs)] for dy in range(5) for dx in range(5) if (dx-2)**2+(dy-2)**2<=4])
 cores[k]=(expanded.ravel() & (xy[:,1]<550)) | (mask.ravel() & (xy[:,1]>=550)) if k=='rabbit' else mask.ravel()
all_cores=np.logical_or.reduce(list(cores.values()))
props=np.logical_or.reduce([inside(p) for p in prop_polygons])
props|=(xy[:,0]>=1100)&(xy[:,0]<=1300)&(xy[:,1]>=420)&(xy[:,1]<550)
props|=(xy[:,0]>=1060)&(xy[:,0]<=1300)&(xy[:,1]>=550)&(xy[:,1]<=740)
cores={k:v&~props for k,v in cores.items()}
cores['bear']&=xy[:,1]<640
cores['checklist']&=xy[:,1]<650
all_cores=np.logical_or.reduce(list(cores.values()))
# Resolve only a local background halo around each head; the rest remains fixed.
active=np.zeros(len(xy),dtype=bool)
for p in head_polygons.values():
 pts=np.array(p);lo=pts.min(0)-65;hi=pts.max(0)+65
 active|=(xy[:,0]>lo[0])&(xy[:,0]<hi[0])&(xy[:,1]>lo[1])&(xy[:,1]<hi[1])
fixed=(~active)|props|all_cores
H,W=len(ys),len(xs);fixed=fixed.reshape(H,W)
# Three harmonic coordinate fields per rigid head: weight, local x, local y.
basis=np.zeros((H,W,12),dtype=float)
for i,(k,mask) in enumerate(cores.items()):
 cx,cy,*_=animal_params[k]
 flat=basis.reshape(-1,12);flat[mask,3*i]=1;flat[mask,3*i+1]=(xy[mask,0]-cx)/100;flat[mask,3*i+2]=(xy[mask,1]-cy)/100
values=basis.copy();parity=np.indices((H,W)).sum(0)%2;free=~fixed
for iteration in range(900):
 old=basis.copy() if iteration%25==0 else None
 for color in [0,1]:
  avg=(basis[:-2,1:-1]+basis[2:,1:-1]+basis[1:-1,:-2]+basis[1:-1,2:])/4
  mask=free[1:-1,1:-1]&(parity[1:-1,1:-1]==color)
  block=basis[1:-1,1:-1];block[mask]+=1.6*(avg[mask]-block[mask])
 if old is not None and np.max(abs(basis-old))<1e-7:break
fixed_fields={k:np.array([fields(x,y)[k] for x,y in xy]) for k in ['person','bulb','decide']}
arrow_fixed=inside([(980,380),(1075,380),(1075,455),(980,455)])
for field in fixed_fields.values():field[arrow_fixed]=0
# R9: independent rigid head/hand flow. The R8 animal basis remains unchanged.
person_poly=[(1096,481),(1105,460),(1120,451),(1138,447),(1147,437),(1170,433),(1195,436),(1215,445),(1233,460),(1245,480),(1253,520),(1225,550),(1190,563),(1190,615),(1150,632),(1142,602),(1128,581),(1100,564),(1092,535)]
person_core=inside(person_poly)
person_active=(xy[:,0]>1040)&(xy[:,0]<1370)&(xy[:,1]>285)&(xy[:,1]<735)
person_prop_polygons=prop_polygons.copy()
person_prop_polygons[2]=[(1295,372),(1407,372),(1407,482),(1295,482)]
person_props=np.logical_or.reduce([inside(p) for p in person_prop_polygons])|all_cores
person_props|=inside([(1095,292),(1188,292),(1203,358),(1168,365),(1157,416),(1115,416),(1100,370),(1065,362),(1065,337),(1095,337)])
# Integrate a smooth spatial velocity field: no linear blend across narrow gaps.
omega=math.radians(14);tx,ty=0,-20
swept=np.zeros(len(xy),dtype=bool)
for step in range(21):
 e=step/20;a=omega*e;co=math.cos(a);si=math.sin(a)
 # Exact affine rigid flow of omega*J*(p-center) + translation.
 dx=(tx*math.sin(a)+ty*(math.cos(a)-1))/omega
 dy=(tx*(1-math.cos(a))+ty*math.sin(a))/omega
 poly=[(1160+(x-1160)*co-(y-535)*si+dx,535+(x-1160)*si+(y-535)*co+dy) for x,y in person_poly]
 swept|=inside(poly)
assert not np.any(swept&person_props),'rigid swept contour intersects fixed props'
pf=((~person_active)|person_props|swept).reshape(H,W)
velocity=np.zeros((H,W,2));vf=velocity.reshape(-1,2)
vf[swept,0]=-omega*(xy[swept,1]-535)+tx
vf[swept,1]=omega*(xy[swept,0]-1160)+ty
for iteration in range(1200):
 old=velocity.copy() if iteration%25==0 else None
 for color in [0,1]:
  avg=(velocity[:-2,1:-1]+velocity[2:,1:-1]+velocity[1:-1,:-2]+velocity[1:-1,2:])/4
  mask=(~pf[1:-1,1:-1])&(parity[1:-1,1:-1]==color)
  block=velocity[1:-1,1:-1];block[mask]+=1.6*(avg[mask]-block[mask])
 if old is not None and np.max(abs(velocity-old))<1e-7:break
def sample_velocity(p):
 gx=np.clip((p[:,0]-xs[0])/5,0,W-1.000001);gy=np.clip((p[:,1]-ys[0])/5,0,H-1.000001)
 ix=gx.astype(int);iy=gy.astype(int);fx=(gx-ix)[:,None];fy=(gy-iy)[:,None]
 return (1-fy)*((1-fx)*velocity[iy,ix]+fx*velocity[iy,ix+1])+fy*((1-fx)*velocity[iy+1,ix]+fx*velocity[iy+1,ix+1])
person_flow={}
for e in sorted(set(envelope(fr,'person') for fr in frames)):
 p=xy.copy();steps=max(1,math.ceil(e*100));dt=e/steps
 for step in range(steps):
  v=sample_velocity(p);mid=sample_velocity(p+v*dt/2);p+=mid*dt
 person_flow[e]=p-xy

positions={}
flat=basis.reshape(-1,12)
for fr in frames:
 p=xy.copy()
 for i,(k,(cx,cy,deg,tx,ty)) in enumerate(animal_params.items()):
  e=envelope(fr,k);a=math.radians(deg)*e;co=math.cos(a);si=math.sin(a);weight=flat[:,3*i];lx=flat[:,3*i+1]*100;ly=flat[:,3*i+2]*100
  p[:,0]+=(co-1)*lx-si*ly+tx*e*weight
  p[:,1]+=si*lx+(co-1)*ly+ty*e*weight
 for k,field in fixed_fields.items():
  if k not in ['person','decide']:p+=.6*field*envelope(fr,k)
 p+=person_flow[envelope(fr,'person')]
 positions[fr]=p
# Preserve orientation in the background transition mesh while keeping all
# character-core and prop vertices exactly at their specified positions.
i=np.arange(H*W).reshape(H,W)
triangles=np.stack([np.stack([i[:-1,:-1],i[:-1,1:],i[1:,1:]],axis=-1),np.stack([i[:-1,:-1],i[1:,1:],i[1:,:-1]],axis=-1)],axis=-2).reshape(-1,3)
free_vertices=((~fixed).ravel()|person_active)&~person_core&~person_props;projection_report=[]
for fr,p in positions.items():
 initial=p.copy();unfixable=0
 for iteration in range(500):
  q=p[triangles];u=q[:,1]-q[:,0];v=q[:,2]-q[:,0];area=u[:,0]*v[:,1]-u[:,1]*v[:,0]
  bad=np.where(area<.75)[0]
  if not len(bad):break
  ids=triangles[bad];q=q[bad];m=free_vertices[ids]
  grad=np.stack([np.stack([q[:,1,1]-q[:,2,1],q[:,2,0]-q[:,1,0]],axis=-1),np.stack([q[:,2,1]-q[:,0,1],q[:,0,0]-q[:,2,0]],axis=-1),np.stack([q[:,0,1]-q[:,1,1],q[:,1,0]-q[:,0,0]],axis=-1)],axis=1)*m[:,:,None]
  denom=np.sum(grad*grad,axis=(1,2));unfixable=int((denom<1e-12).sum())
  if unfixable:raise ValueError(f'conflicting fixed constraints at {fr}: {ids[denom<1e-12].tolist()}')
  correction=(.85-area[bad])/denom
  delta=grad*correction[:,None,None]
  sums=np.zeros_like(p);counts=np.zeros(len(p));np.add.at(sums,ids.reshape(-1),delta.reshape(-1,2));np.add.at(counts,ids.reshape(-1),m.reshape(-1))
  moved=counts>0;p[moved]+=sums[moved]/counts[moved,None]
 print('projected',fr,iteration,flush=True)
 projection_report.append({'frame':fr,'iterations':iteration,'maxBackgroundCorrectionPx':float(np.linalg.norm(p-initial,axis=1).max())})
report=[]

for name,lo,hi in [('Rabbit',720,1040),('Bear',1040,1320),('Fox',1320,1780)]:
 d=root/name;d.mkdir(exist_ok=True)
 shutil.copyfile(source,d/'original.png')
 xx=[x for x in xs if lo<=x<=hi];n=len(xx);verts=[];keys=[];tri=[]
 for j,y in enumerate(ys):
  for i,x in enumerate(xx):
   idx=j*n+i;ident=f'0:{idx+100}';verts.append(f'<MeshVertex id="{ident}" x="{x-921}" y="{y-427}" u="{x/1842:.9f}" v="{y/854:.9f}"/>')
   global_idx=j*len(xs)+xs.index(x)
   for axis,base in [(0,x-921),(1,y-427)]:
    values=[positions[fr][global_idx,axis]-[921,427][axis] for fr in frames]
    if max(abs(v-base) for v in values)<.0001:continue
    kfs=''.join(f'<KeyFrameDouble frame="{fr}" value="{v:.6f}" interpolationType="cubic"><CubicEaseInterpolator x1="0.333333" y1="0.333333" x2="0.666667" y2="0.666667"/></KeyFrameDouble>' for fr,v in zip(frames,values))
    keys.append(f'<KeyedObject objectId="{ident}"><KeyedProperty property="{["x","y"][axis]}">{kfs}</KeyedProperty></KeyedObject>')
   if j<len(ys)-1 and i<n-1:tri.extend([idx,idx+1,idx+n+1,idx,idx+n+1,idx+n])
 raw=[]
 for v in tri:
  while v>=128:raw.append((v&127)|128);v>>=7
  raw.append(v)
 sm='<StateMachine id="0:4" name="ReviewAutoplay"><StateMachineLayer name="OneShot"><EntryState><StateTransition stateToId="0:6"/></EntryState><AnimationState id="0:6" animationId="0:5"/></StateMachineLayer></StateMachine>'
 mesh=f'<Image x="921" y="427" assetId="0:2"><Mesh triangleIndexBytes="{base64.b64encode(bytes(raw)).decode()}">{"".join(verts)}</Mesh></Image>'
 light=''
 if name=='Bear':
  light='<Shape id="0:90000" name="BulbGlow" x="1136" y="354" opacity="0" blendModeValue="screen"><Ellipse width="166" height="166"/><Fill><RadialGradient startX="0" startY="0" endX="83" endY="0"><GradientStop position="0" colorValue="A0FEFEFE"/><GradientStop position="0.4" colorValue="50FEFEFE"/><GradientStop position="1" colorValue="00FEFEFE"/></RadialGradient></Fill></Shape>'
  kfs=''.join(f'<KeyFrameDouble frame="{fr}" value="{envelope(fr,"bulb"):.6f}"/>' for fr in frames)
  keys.append(f'<KeyedObject objectId="0:90000"><KeyedProperty property="opacity">{kfs}</KeyedProperty></KeyedObject>')
 if False: # Replaced by separate original-pixel title layers in SEQUENCE_LAYERS.py.
  rays=[(1104,141,1112,151),(1086,160,1098,163),(1087,185,1101,180),(1326,141,1317,151),(1338,162,1326,166),(1338,186,1328,182)]
  paths=''.join(f'<PointsPath><StraightVertex x="{x1-1212}" y="{y1-172}"/><StraightVertex x="{x2-1212}" y="{y2-172}"/></PointsPath>' for x1,y1,x2,y2 in rays)
  light+=f'<Node id="0:91000" name="DecideRayFlash" x="1212" y="172" opacity="0"><Shape blendModeValue="screen">{paths}<Stroke thickness="3" cap="round"><SolidColor colorValue="FFA0BFF0"/></Stroke></Shape></Node>'
  pulse=[(0,0),(138,0),(150,1),(162,0),(168,.7),(180,0),(720,0)]
  for prop,values in [('opacity',pulse),('scaleX',[(fr,1+.072*envelope(fr,'decide')) for fr in frames]),('scaleY',[(fr,1+.072*envelope(fr,'decide')) for fr in frames]),('y',[(fr,172-43.2*envelope(fr,'decide')) for fr in frames])]:
   kfs=''.join(f'<KeyFrameDouble frame="{fr}" value="{v:.6f}"/>' for fr,v in values)
   keys.append(f'<KeyedObject objectId="0:91000"><KeyedProperty property="{prop}">{kfs}</KeyedProperty></KeyedObject>')
 matte='<Shape name="ArcAndFourDotsRemoval"><PointsPath isClosed="true"><StraightVertex x="730" y="228"/><StraightVertex x="1720" y="228"/><StraightVertex x="1720" y="420"/><StraightVertex x="1670" y="420"/><StraightVertex x="1590" y="344"/><StraightVertex x="1480" y="310"/><StraightVertex x="1360" y="295"/><StraightVertex x="1230" y="268"/><StraightVertex x="1080" y="265"/><StraightVertex x="950" y="299"/><StraightVertex x="850" y="322"/><StraightVertex x="800" y="355"/><StraightVertex x="730" y="355"/></PointsPath><Fill><SolidColor colorValue="FF080F1A"/></Fill></Shape>' if name=='Fox' else ''
 r=f'<Rive version="1" kind="fragment"><Artboard id="0:1" name="{name}" width="1842" height="854" styleId="0:90" defaultStateMachineId="0:4"><LayoutComponentStyle id="0:90"/>{matte}{light}{mesh}<Event id="0:80" name="playback-complete"/>{sm}<LinearAnimation id="0:5" name="RespondOnce" fps="60" duration="720" loopValue="loop">{"".join(keys)}<KeyedObject objectId="0:80"><KeyedProperty property="trigger"><KeyFrameCallback frame="720"/></KeyedProperty></KeyedObject></LinearAnimation></Artboard><ImageAsset id="0:2" file="original.png" name="OriginalPixels"/></Rive>'
 (d/'scene.rml').write_text(r);(d/'rive.yaml').write_text(f'name: {name.lower()}\n')
 report.append(dict(name=name,vertices=len(verts),triangles=len(tri)//3))
(root/'SPEC.json').write_text(json.dumps({'timeline':peaks,'meshes':report,'animalFlow':animal_params,'integration':'harmonic coordinates, rigid head contours, fixed props, background orientation constraints','projection':projection_report,'decide_source_settled_rise':43.2},indent=2));print(report)
