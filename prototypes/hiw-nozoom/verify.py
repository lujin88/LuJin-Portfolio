import cv2,numpy as np,json,csv,hashlib
from pathlib import Path
D=Path('/Users/lu/.buzz/OUTBOX/HIW_NO_ZOOM_20261103')
ref=json.loads((D/'source.json').read_text())['frames'][0]
summary={};allrows=[]
for name in ['before','after','controlled_v2']:
 rows=json.loads((D/(name+'.json')).read_text())['frames']
 for i,r in enumerate(rows):
  prev=rows[max(0,i-1)]
  allrows.append(dict(version=name,frame=i,seconds=r['t'],width=r['w'],height=r['h'],width_pct=100*(r['w']/ref['w']-1),height_pct=100*(r['h']/ref['h']-1),adjacent_width_pct=100*(r['w']/prev['w']-1),adjacent_height_pct=100*(r['h']/prev['h']-1),equivalent_scale_pct=100*((r['w']*r['h']/(ref['w']*ref['h']))**.5-1)))
 subset=[r for r in allrows if r['version']==name]
 summary[name]={k:[min(r[k] for r in subset),max(r[k] for r in subset)] for k in ['width_pct','height_pct','adjacent_width_pct','adjacent_height_pct','equivalent_scale_pct']}
 cap=cv2.VideoCapture(str(D/(name.upper()+'.mp4')));frames=[]
 while True:
  ok,f=cap.read()
  if not ok:break
  frames.append(f)
 summary[name]['first_last_mean_abs_pixel_delta']=float(np.abs(frames[0].astype(float)-frames[-1]).mean())
 summary[name]['first_last_psnr']=float(cv2.PSNR(frames[0],frames[-1]))
 # Independent tracking of laptop corners: Lucas-Kanade + RANSAC similarity.
 gray=cv2.cvtColor(frames[0],cv2.COLOR_BGR2GRAY);mask=np.zeros(gray.shape,np.uint8);mask[510:635,180:490]=255
 points=cv2.goodFeaturesToTrack(gray,maxCorners=80,qualityLevel=.03,minDistance=7,mask=mask)
 tracking=[]
 for i,f in enumerate(frames):
  dst,status,err=cv2.calcOpticalFlowPyrLK(gray,cv2.cvtColor(f,cv2.COLOR_BGR2GRAY),points,None,winSize=(31,31),maxLevel=3)
  good=(status[:,0]==1)&(err[:,0]<25)
  m,inliers=cv2.estimateAffinePartial2D(points[good],dst[good],method=cv2.RANSAC,ransacReprojThreshold=1.5)
  scale=float(np.hypot(m[0,0],m[0,1]));tracking.append(dict(frame=i,scale_pct=(scale-1)*100,inliers=int(inliers.sum()),tracked=int(good.sum())))
 summary[name]['laptop_tracking_scale_pct']=[min(r['scale_pct'] for r in tracking),max(r['scale_pct'] for r in tracking)]
 (D/(name.upper()+'_LAPTOP_TRACKING.json')).write_text(json.dumps(tracking,indent=2))
 samples=[]
 for i in [0,12,24,32,48,72,96]:
  f=frames[i].copy();cv2.putText(f,f'{i/24:.2f}s',(15,34),0,.8,(255,255,255),2);samples.append(cv2.resize(f,(530,327)))
 cv2.imwrite(str(D/(name.upper()+'_STRIP.jpg')),np.hstack(samples))
with open(D/'FRAME_SCALE.csv','w') as f:
 w=csv.DictWriter(f,fieldnames=list(allrows[0]),lineterminator='\n');w.writeheader();w.writerows(allrows)
summary['measurement']='Bright subject/table envelope, original frame 0 reference 904x329. Independent tracking measures laptop deformation, not camera ground truth.'
summary['files']={n:dict(sha256=hashlib.sha256((D/n).read_bytes()).hexdigest(),bytes=(D/n).stat().st_size) for n in ['ORIGINAL.mp4','BEFORE.mp4','AFTER.mp4']}
(D/'VERIFICATION_V2.json').write_text(json.dumps(summary,indent=2));print(json.dumps(summary,indent=2))
