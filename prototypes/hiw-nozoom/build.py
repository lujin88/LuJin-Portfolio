"""Continuous inverse warp; preserve generated action, correct nonuniform scene dilation."""
import cv2,numpy as np,json,subprocess
from pathlib import Path
D=Path('/Users/lu/.buzz/OUTBOX/HIW_NO_ZOOM_20261103')
a=json.loads((D/'source.json').read_text())['frames'];r=a[0];W,H=1060,654
# Reference-space remap. Above y270 the decorative icons stay in original coordinates;
# below y305 the subject field receives its measured independent X/Y correction.
y,x=np.mgrid[:H,:W].astype(np.float32)
w=np.clip((y-270)/35,0,1);w=w*w*(3-2*w)
c=cv2.VideoCapture(str(D/'ORIGINAL.mp4'))
p=subprocess.Popen(['ffmpeg','-v','error','-f','rawvideo','-pix_fmt','bgr24','-s',f'{W}x{H}','-r','24','-i','-','-an','-c:v','libx264','-crf','16','-pix_fmt','yuv420p','-movflags','+faststart','-map_metadata','-1',str(D/'CANDIDATE_V1.mp4')],stdin=subprocess.PIPE)
transforms=[]
for i,q in enumerate(a):
 ok,f=c.read();assert ok
 sx=(q['w']-1)/(r['w']-1);sy=(q['h']-1)/(r['h']-1)
 mx=x+w*(q['x']+(x-r['x'])*sx-x);my=y+w*(q['y']+(y-r['y'])*sy-y)
 out=cv2.remap(f,mx.astype(np.float32),my.astype(np.float32),cv2.INTER_CUBIC,borderMode=cv2.BORDER_REFLECT_101)
 p.stdin.write(out.tobytes());transforms.append(dict(frame=i,t=i/24,inverse_x=sx,inverse_y=sy,reference=r))
p.stdin.close();assert p.wait()==0
(D/'TRANSFORMS_V1.json').write_text(json.dumps(transforms,indent=2))
