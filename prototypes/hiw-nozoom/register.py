"""Registration trial: align source drawing with first-frame geometry, retaining color/expression changes."""
import cv2,numpy as np,subprocess
from pathlib import Path
D=Path('/Users/lu/.buzz/OUTBOX/HIW_NO_ZOOM_20261103');c=cv2.VideoCapture(str(D/'ORIGINAL.mp4'))
ok,ref=c.read();assert ok;g=cv2.cvtColor(ref,cv2.COLOR_BGR2GRAY);H,W=g.shape;y,x=np.mgrid[:H,:W].astype(np.float32)
c.set(1,0);dis=cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM);dis.setUseSpatialPropagation(True)
p=subprocess.Popen(['ffmpeg','-v','error','-f','rawvideo','-pix_fmt','bgr24','-s',f'{W}x{H}','-r','24','-i','-','-an','-c:v','libx264','-crf','14','-pix_fmt','yuv420p','-movflags','+faststart','-map_metadata','-1',str(D/'REGISTERED.mp4')],stdin=subprocess.PIPE)
i=0
while True:
 ok,f=c.read()
 if not ok:break
 flow=dis.calc(g,cv2.cvtColor(f,cv2.COLOR_BGR2GRAY),None);flow=cv2.GaussianBlur(flow,(0,0),1.5)
 out=cv2.remap(f,x+flow[:,:,0],y+flow[:,:,1],cv2.INTER_CUBIC,borderMode=cv2.BORDER_REFLECT_101)
 if i in [0,24,32,48,72,96]:cv2.imwrite(str(D/f'REGISTERED_{i:03}.png'),out)
 p.stdin.write(out.tobytes());i+=1
p.stdin.close();assert p.wait()==0
