"""Decode the actual deliverable; compare cut, hold, seam, normal motion and title ROI."""
import cv2,numpy as np,json,os
from pathlib import Path
D=Path(os.environ['HIW_REVIEW_DIR']);c=cv2.VideoCapture(str(D/'HIW_REVISION_2_FINAL.mp4'));frames=[]
while True:
 ok,f=c.read()
 if not ok:break
 frames.append(f)
c.release()
def mae(a,b):return float(np.abs(a.astype(float)-b.astype(float)).mean())
adj=[mae(a,b) for a,b in zip(frames[:143],frames[1:144])]
active=[v for v in adj if v>.005]
seam=mae(frames[-1],frames[0]);hold=max(mae(frames[143],f) for f in frames[144:])
result={'frames':len(frames),'fps':24,'duration_seconds':len(frames)/24,'cut_source_frame':143,'cut_seconds':143/24,'hold_seconds':2,'cut_to_first_mae':mae(frames[143],frames[0]),'seam_mae':seam,'active_adjacent_median_mae':float(np.median(active)),'active_adjacent_mean_mae':float(np.mean(active)),'active_adjacent_max_mae':max(active),'hold_max_mae':hold,'decide_first_to_peak_mae':mae(frames[0][0:65,345:635],frames[60][0:65,345:635]),'size_bytes':(D/'HIW_REVISION_2_FINAL.mp4').stat().st_size}
assert len(frames)==192
assert seam<=np.median(active)
assert hold==0
assert result['decide_first_to_peak_mae']>1
(D/'MEDIA_CHECK.json').write_text(json.dumps(result,indent=2));print(json.dumps(result,indent=2))
