import subprocess,json
from pathlib import Path
import numpy as np
from PIL import Image
D=Path('/Users/lu/.buzz/OUTBOX/HIW_INTEGRATION_20261103')
S=Path('/Users/lu/.buzz/OUTBOX/HIW_NO_ZOOM_20261103/REVISION_2/RENDER_FINAL')
ref=np.asarray(Image.open(S/'STILL.png').convert('RGB')).astype(float)
# Flat patches: bottom margin and right margin, no outlines/subjects.
mask=np.zeros(ref.shape[:2],bool);mask[600:640,20:1040]=True;mask[300:560,1030:1050]=True
result=[]
for matrix in ['bt601','bt709']:
 for rng in ['tv','pc']:
  f=D/f'SOURCE_{matrix}_{rng}.png'
  subprocess.run(['ffmpeg','-v','error','-threads','2','-i',str(S/'HIW_REVISION_2_FINAL.mp4'),'-vf',f'scale=in_color_matrix={matrix}:in_range={rng}:flags=accurate_rnd+full_chroma_int,format=rgb24','-frames:v','1',str(f)],check=True)
  a=np.asarray(Image.open(f)).astype(float)
  result.append(dict(matrix=matrix,range=rng,flat_rgb_mae=np.abs(a-ref)[mask].mean(0).tolist(),full_rgb_mae=np.abs(a-ref).mean((0,1)).tolist(),source_flat_rgb=ref[mask].mean(0).tolist()))
(D/'SOURCE_COLOR.json').write_text(json.dumps(result,indent=2));print(json.dumps(result,indent=2))
