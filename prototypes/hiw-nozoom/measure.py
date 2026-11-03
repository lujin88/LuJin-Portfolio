import cv2, numpy as np, json, sys
from pathlib import Path
D=Path('/Users/lu/.buzz/OUTBOX/HIW_NO_ZOOM_20261103')
src='/Users/lu/Desktop/portfolio_perfect/public/assets/videos/how-i-work/illustration-v4-loop.mp4'
prefix=sys.argv[2] if len(sys.argv)>2 else "before"
src=sys.argv[1] if len(sys.argv)>1 else src
cap=cv2.VideoCapture(src);fps=cap.get(cv2.CAP_PROP_FPS);frames=[]
while True:
 ok,f=cap.read()
 if not ok:break
 frames.append(f)
# Fixed spatial exclusion zones remove decorative icons/arrows, not moving subject extents.
region=np.zeros(frames[0].shape[:2],np.uint8)
cv2.fillPoly(region,[np.array([[350,300],[520,300],[575,350],[630,375],[740,375],[740,440],[1015,455],[1015,650],[15,650],[15,465],[180,430],[180,330]])],255)
rows=[]
for i,f in enumerate(frames):
 bright=(f.max(axis=2)>110).astype(np.uint8)*255
 mask=cv2.bitwise_and(bright,region)
 # Reject isolated compression specks, preserve thin tabletop.
 n,labels,stats,cents=cv2.connectedComponentsWithStats(mask)
 good=np.zeros_like(mask)
 for j in range(1,n):
  if stats[j,cv2.CC_STAT_AREA]>=12:good[labels==j]=255
 ys,xs=np.where(good>0);x0,x1,y0,y1=int(xs.min()),int(xs.max()),int(ys.min()),int(ys.max())
 rows.append(dict(frame=i,t=i/fps,x=x0,y=y0,w=x1-x0+1,h=y1-y0+1,cx=(x0+x1)/2,cy=(y0+y1)/2))
 if i in [0,6,12,24,36,48,60,72,84,96]:
  preview=f.copy();cv2.rectangle(preview,(x0,y0),(x1,y1),(0,220,255),2);cv2.putText(preview,f'{i/fps:.2f}s {x1-x0+1} x {y1-y0+1}',(30,35),cv2.FONT_HERSHEY_SIMPLEX,.8,(255,255,255),2);cv2.imwrite(str(D/f'{prefix}-box-{i:03}.png'),preview)
r0=rows[0]
for r in rows:r.update(sx=r['w']/r0['w'],sy=r['h']/r0['h'],dx=r['cx']-r0['cx'],dy=r['cy']-r0['cy'])
(D/(prefix+'.json')).write_text(json.dumps(dict(fps=fps,frames=rows,roi=region.shape),indent=2))
print('fps',fps,'n',len(rows),'reference',r0)
for k in ['sx','sy','dx','dy']:print(k,min(r[k] for r in rows),max(r[k] for r in rows))
print('samples',json.dumps(rows[::6]))
