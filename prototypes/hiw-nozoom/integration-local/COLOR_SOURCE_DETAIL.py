import numpy as np,json
from PIL import Image
from pathlib import Path
D=Path(__file__).resolve().parent
ref=np.asarray(Image.open(D.parent/'HIW_NO_ZOOM_20261103/REVISION_2/RENDER_FINAL/STILL.png').convert('RGB')).astype(float)
mask=(ref.max(2)-ref.min(2)>50)
for dy,dx in [(-1,0),(1,0),(0,-1),(0,1)]:mask &= (np.abs(ref-np.roll(ref,(dy,dx),(0,1))).max(2)<3)
result={'chromatic_flat_pixel_count':int(mask.sum()),'chromatic_flat_definition':'RGB span >50; all four adjacent pixels differ by <3 in each channel','source_candidates':[]}
for p in sorted(D.glob('SOURCE_*.png')):
 a=np.asarray(Image.open(p)).astype(float)
 result['source_candidates'].append(dict(file=p.name,rgb_mae=np.abs(a-ref)[mask].mean(0).tolist(),rgb_mean_delta=(a-ref)[mask].mean(0).tolist()))
original=np.asarray(Image.open(D/'SOURCE_bt601_tv.png')).astype(float);final=np.asarray(Image.open(D/'hiw-revision2-still.png')).astype(float)
result['original_decoded_vs_source_rgb_mean_delta']=(original-ref).mean((0,1)).tolist()
result['transcode_added_rgb_mean_delta']=(final-original).mean((0,1)).tolist()
result['final_vs_source_rgb_mean_delta']=(final-ref).mean((0,1)).tolist()
result['choice']='bt601 / tv: lowest aggregate chromatic flat error (1.519 vs 2.206 for bt709/tv; both pc candidates >13).'
(D/'SOURCE_COLOR_DETAIL.json').write_text(json.dumps(result,indent=2));print(json.dumps(result,indent=2))
