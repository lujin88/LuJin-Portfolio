"""Fixed-camera alternative built only from approved original pixels.
All head rotations use a unit-scale matrix, with a fixed-edge spatial taper.
No generative frame geometry is retained. This changes the movement, so review first.
"""
import cv2,numpy as np,subprocess,json,math,os
from pathlib import Path
D=Path(os.environ.get('HIW_REVIEW_DIR',str(Path(__file__).parent/'output')));D.mkdir(parents=True,exist_ok=True)
base=cv2.imread(str(Path(__file__).parent/'SOURCE.png'));H,W=base.shape[:2]
y,x=np.mgrid[:H,:W].astype(np.float32)
def ease(z):
 z=np.clip(z,0,1);a,b=0.,1.
 for _ in range(24):
  t=(a+b)/2;v=3*(1-t)**2*t*.77+3*(1-t)*t*t*.175+t**3
  if v<z:a=t
  else:b=t
 t=(a+b)/2;return 3*(1-t)*t*t+t**3
specs=[dict(name='Bear',box=[80,412,236,550],pivot=[171,520],deg=-4,start=.3,peak=.95,end=2.1),dict(name='Rabbit',box=[196,314,317,517],pivot=[269,495],deg=3,start=.45,peak=1.1,end=2.25),dict(name='Human',box=[306,290,609,512],pivot=[443,475],deg=-2.5,start=.65,peak=1.4,end=2.7),dict(name='Fox',box=[598,372,740,514],pivot=[663,495],deg=-4,start=.8,peak=1.5,end=2.85),dict(name='Dinosaur',box=[776,442,929,558],pivot=[848,538],deg=3,start=.95,peak=1.65,end=3.0)]
p=subprocess.Popen(['ffmpeg','-v','error','-f','rawvideo','-pix_fmt','bgr24','-s',f'{W}x{H}','-r','24','-i','-','-an','-c:v','libx264','-crf','0','-preset','fast','-threads','2','-g','1','-pix_fmt','yuv420p','-movflags','+faststart','-map_metadata','-1',str(D/'EXTENDED_SOURCE.mp4')],stdin=subprocess.PIPE)
matrices=[]
for i in range(240):
 t=i/24/1.8;mx=x.copy();my=y.copy();record=dict(frame=i,seconds=t,characters=[])
 for s in specs:
  a=ease((t-s['start'])/(s['peak']-s['start']))*(1-ease((t-s['peak']-.2)/(s['end']-s['peak']-.2)))
  angle=math.radians(s['deg'])*a;cx,cy=s['pivot'];l,top,r,b=s['box']
  # Long lower taper fixes neck/shoulders and leaves the laptop untouched.
  w=np.minimum.reduce([np.clip((x-l)/22,0,1),np.clip((r-x)/22,0,1),np.clip((y-top)/16,0,1),np.clip((b-y)/48,0,1)]);w=w*w*(3-2*w)
  if s['name']=='Human':
   q=np.clip((x-535)/30,0,1);q=q*q*(3-2*q);v=np.clip((y-345)/30,0,1);v=v*v*(3-2*v);w*=1-q*(1-v)
  rx=cx+np.cos(angle)*(x-cx)+np.sin(angle)*(y-cy);ry=cy-np.sin(angle)*(x-cx)+np.cos(angle)*(y-cy)
  mx+=(rx-x)*w;my+=(ry-y)*w
  record['characters'].append(dict(name=s['name'],rotation_degrees=s['deg']*a,scale_x=1,scale_y=1,determinant=1))
 f=cv2.remap(base,mx,my,cv2.INTER_CUBIC,borderMode=cv2.BORDER_REFLECT_101)
 # Preserve source colors: brighten existing bulb/ray pixels, no new hue or silhouette.
 glow=ease((t-.65)/.6)*(1-ease((t-2.3)/.7));region=f[168:284,350:476].astype(float)
 bright=np.clip((region.max(axis=2)-100)/80,0,1)[:,:,None]
 f[168:284,350:476]=np.clip(region*(1+.28*glow*bright),0,255).astype(np.uint8)
 # Translate and rotate the original DECIDE word; rays and subtitle stay fixed.
 # This is a deterministic pixel animation, not a regenerated illustration.
 lift=ease((t-.5)/.65)*(1-ease((t-2.5)/.8))
 title=base[0:65,410:585].copy()
 matrix=cv2.getRotationMatrix2D((87,36),-3*lift,1)
 matrix[1,2]-=9*lift
 # Use the same dark source background for uncovered title pixels.
 moved=cv2.warpAffine(title,matrix,(175,65),flags=cv2.INTER_CUBIC,borderMode=cv2.BORDER_CONSTANT,borderValue=tuple(int(v) for v in base[0,340]))
 f[0:65,410:585]=moved
 if i in [0,24,48,72,120,143,144,239]:cv2.imwrite(str(D/f'EXTENDED_{i:03}.png'),f)
 record['seconds']=i/24
 record['title']={'rotation_degrees':-3*lift,'translate_y':-9*lift,'scale':1}
 p.stdin.write(f.tobytes());matrices.append(record)
p.stdin.close();assert p.wait()==0
(D/'EXTENDED_MATRICES.json').write_text(json.dumps(matrices,indent=2));(D/'REVISION_SPEC.json').write_text(json.dumps(specs,indent=2))

# Use the last frame before the 6s trim boundary, then hold it for 2s.
subprocess.run(['ffmpeg','-v','error','-i',str(D/'EXTENDED_SOURCE.mp4'),'-vf','trim=end_frame=144,setpts=PTS-STARTPTS,tpad=stop_mode=clone:stop_duration=2','-an','-c:v','libx264','-qp','18','-preset','slow','-threads','2','-g','1','-pix_fmt','yuv420p','-movflags','+faststart','-map_metadata','-1',str(D/'HIW_REVISION_2_FINAL.mp4')],check=True)
cv2.imwrite(str(D/'STILL.png'),base)
