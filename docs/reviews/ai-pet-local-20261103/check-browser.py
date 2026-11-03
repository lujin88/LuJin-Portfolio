import json,pathlib,sys
import numpy as np
from PIL import Image
p=pathlib.Path(sys.argv[1]);r={}
def load(name):return np.array(Image.open(p/name).convert('RGB'),np.float32)
for engine in ['chromium','webkit']:
 first=load(engine+'_VIDEO_0.png');poster=load(engine+'_POSTER.png');two=load(engine+'_VIDEO_2.png');end=load(engine+'_VIDEO_7.958.png');hold=load(engine+'_VIDEO_6.png')
 diff=first-poster
 r[engine]={'poster_rgb_mean_signed':diff.mean(axis=(0,1)).tolist(),'poster_rgb_mean_absolute':np.abs(diff).mean(axis=(0,1)).tolist(),'t2_vs_t0_mae':float(np.abs(two-first).mean()),'t6_vs_t0_mae':float(np.abs(hold-first).mean()),'last_vs_t0_mae':float(np.abs(end-first).mean())}
 assert max(r[engine]['poster_rgb_mean_absolute'])<=2
 assert r[engine]['t2_vs_t0_mae']>0.2
 assert r[engine]['last_vs_t0_mae']==0
(p/'BROWSER_PIXEL_CHECK.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r))
