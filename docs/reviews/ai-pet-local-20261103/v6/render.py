"""Deterministic local texture deformation. No generated frames, crossfade or reversal."""
import argparse, json, math, pathlib, subprocess
import cv2
import numpy as np
from PIL import Image
p=argparse.ArgumentParser();p.add_argument('--measure-only',action='store_true');p.add_argument('--out',type=pathlib.Path,required=True);a=p.parse_args();a.out.mkdir(parents=True,exist_ok=True)
source=pathlib.Path(__file__).with_name('FRAME0.png')
im=np.array(Image.open(source).convert('RGB'));h,w=im.shape[:2]
y,x=np.mgrid[0:h,0:w].astype(np.float32)
def smooth(v):
 v=np.clip(v,0,1);return v*v*(3-2*v)
def ellipse(cx,cy,rx,ry,inner=.65):
 r=np.sqrt(((x-cx)/rx)**2+((y-cy)/ry)**2);return smooth((1-r)/(1-inner))
def pulse(t,start,end):
 if t<=start or t>=end:return 0.
 return math.sin(math.pi*(t-start)/(end-start))**2
# All support ends above the console; no button/background-wide transform.
head=ellipse(443,216,167,166,.70)*smooth((357-y)/32)
left=ellipse(320,324,63,49,.60)*smooth((367-y)/12)
right=ellipse(558,322,47,48,.60)*smooth((367-y)/12)
tail=ellipse(599,261,54,43,.60)
frames=[];luma=[];params=[]
for i in range(192):
 t=i/24
 tilt=math.radians(2.8)*(pulse(t,.2,2.6)-.65*pulse(t,2.7,5.7))
 nod=5*pulse(t,1.6,3.3)
 wave=13*pulse(t,2.6,4.15)-5*pulse(t,4.15,5.55)
 tail_wave=7*pulse(t,.7,2.4)-6*pulse(t,3.0,5.2)
 dx=head*(-(y-325)*math.sin(tilt)+(x-443)*(math.cos(tilt)-1))
 dy=head*((x-443)*math.sin(tilt)+(y-325)*(math.cos(tilt)-1)+nod)
 dy+=left*(-wave)+right*(-.4*wave)+tail*(-tail_wave)
 dx+=left*(-.20*wave)+tail*(.35*tail_wave)
 frame=cv2.remap(im,x-dx,y-dy,cv2.INTER_CUBIC,borderMode=cv2.BORDER_REFLECT_101) if np.any(dx) or np.any(dy) else im.copy()
 frames.append(frame);luma.append(float(np.mean(frame@np.array([.2126,.7152,.0722]))));params.append(dict(frame=i,t=t,tilt_degrees=math.degrees(tilt),nod_px=nod,fin_px=wave))
 if i in [0,30,54,83,108,132,144,191]:Image.fromarray(frame).save(a.out/f'SOURCE_{i:03}.png')
Image.fromarray(im).save(a.out/'POSTER.png')
# Explicit RGB -> 709 matrix / limited-range YUV, with sRGB transfer in both layers.
vf='scale=out_color_matrix=bt709:out_range=tv:flags=accurate_rnd+full_chroma_int,format=yuv420p,setparams=color_primaries=bt709:color_trc=iec61966-2-1:colorspace=bt709:range=tv'
cmd=['ffmpeg','-v','error','-n','-f','rawvideo','-pix_fmt','rgb24','-s',f'{w}x{h}','-r','24','-i','-','-an','-vf',vf,'-c:v','libx264','-preset','medium','-qp','18','-g','1','-threads','2','-colorspace','bt709','-color_primaries','bt709','-color_trc','iec61966-2-1','-color_range','tv','-movflags','+faststart+write_colr',str(a.out/'AI_PET_ZH_FR_DE_LOCAL_V6.mp4')]
if not a.measure_only:
 proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
 for frame in frames:proc.stdin.write(frame.tobytes())
 proc.stdin.close();assert proc.wait()==0
adj=[float(np.abs(frames[i].astype(float)-frames[i-1]).mean()) for i in range(1,len(frames))]
report=dict(source=str(source),size=[w,h],fps=24,duration=8,hold=[6,8],source_adjacent_median=float(np.median(adj)),source_hold_entry_mae=float(np.abs(frames[143].astype(float)-frames[144]).mean()),source_loop_mae=float(np.abs(frames[-1].astype(float)-frames[0]).mean()),max_adjacent_mean_luma_delta=float(np.max(np.abs(np.diff(luma)))),max_mean_luma_drift=float(np.max(np.abs(np.array(luma)-luma[0]))),parameters=params)
(a.out/'SOURCE_MEASUREMENTS.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k!='parameters'}))
