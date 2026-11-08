"""Second pass removes one threshold-sampling outlier and bakes DECIDE into media."""
from pathlib import Path
import cv2,numpy as np,subprocess,json
D=Path('/Users/lu/.buzz/OUTBOX/HIW_NO_ZOOM_20261103');W,H=1060,654
c=cv2.VideoCapture(str(D/'CANDIDATE_V1.mp4'));frames=[]
while True:
 ok,f=c.read()
 if not ok:break
 frames.append(f)
base=frames[0].copy(); y,x=np.mgrid[:H,:W].astype(np.float32)
def ease(z):
 # CSS cubic-bezier(0.23,1,0.32,1), inverted via bisection.
 z=np.clip(z,0,1);a,b=0.,1.
 for _ in range(24):
  t=(a+b)/2;v=3*(1-t)**2*t*.23+3*(1-t)*t*t*.32+t**3
  if v<z:a=t
  else:b=t
 t=(a+b)/2
 return 3*(1-t)**2*t+3*(1-t)*t*t+t**3
p=subprocess.Popen(['ffmpeg','-v','error','-f','rawvideo','-pix_fmt','bgr24','-s',f'{W}x{H}','-r','24','-i','-','-an','-c:v','libx264','-crf','14','-pix_fmt','yuv420p','-movflags','+faststart','-map_metadata','-1',str(D/'AFTER.mp4')],stdin=subprocess.PIPE)
# Keep a fixed title plate; a legible dim resting title brightens with the decision.
for i,f in enumerate(frames):
 if i==5:
  w=np.clip((y-270)/35,0,1);w=w*w*(3-2*w)
  my=y+w*(309+(y-308)*326/328-y)
  f=cv2.remap(f,x,my.astype(np.float32),cv2.INTER_CUBIC,borderMode=cv2.BORDER_REFLECT_101)
 t=i/24
 # Only original title/ray strokes change luminance; subtitle stays static.
 f[:100]=base[:100]
 for x0,y0,x1,y1,delay,rest in [(420,22,580,62,0,.45),(350,0,401,61,.10,.25),(585,0,630,61,.20,.25)]:
  enter=ease((t-.30-delay)/.55);leave=ease((t-3.0-delay)/.55);alpha=rest+(1-rest)*enter*(1-leave)
  patch=base[y0:y1,x0:x1].astype(float);bg=np.array([25,15,3.])
  f[y0:y1,x0:x1]=np.clip(bg+(patch-bg)*alpha,0,255).astype(np.uint8)
 if i==0:first=f.copy();cv2.imwrite(str(D/'STILL.png'),base)
 if i==len(frames)-1:f=first.copy()
 p.stdin.write(f.tobytes())
p.stdin.close();assert p.wait()==0
