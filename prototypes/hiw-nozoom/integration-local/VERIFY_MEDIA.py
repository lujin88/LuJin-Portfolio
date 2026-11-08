import subprocess,sys,json,struct
import numpy as np
from pathlib import Path
p=Path(sys.argv[1]);r=subprocess.Popen(['ffmpeg','-v','error','-threads','2','-i',str(p),'-f','rawvideo','-pix_fmt','rgb24','-'],stdout=subprocess.PIPE)
first=prev=cut=None;adj=[];hold=[];n=0;peak=None
while True:
 b=r.stdout.read(1060*654*3)
 if not b:break
 a=np.frombuffer(b,dtype=np.uint8).reshape(654,1060,3).astype(np.int16)
 if n==0:first=a
 if prev is not None:adj.append(float(np.abs(a-prev).mean()))
 if n==60:peak=float(np.abs(a[:65,345:635]-first[:65,345:635]).mean())
 if n==143:cut=a
 if n>=144:hold.append(float(np.abs(a-cut).mean()))
 prev=a;n+=1
assert r.wait()==0
blob=p.read_bytes();i=blob.find(b'colrnclx');colr=struct.unpack('>HHHB',blob[i+8:i+15]) if i>=0 else None
active=[a for a in adj[:143] if a>.005]
result=dict(file=p.name,bytes=p.stat().st_size,frames=n,duration=n/24,seam_mae=float(np.abs(prev-first).mean()),cut_to_first=float(np.abs(cut-first).mean()),hold_max_mae=max(hold),hold_adjacent_max=max(adj[143:]),adjacent_max=max(adj),active_adjacent_median=float(np.median(active)),decide_peak=peak,colr=colr)
p.with_suffix('.json').write_text(json.dumps(result,indent=2));print(json.dumps(result,indent=2))
