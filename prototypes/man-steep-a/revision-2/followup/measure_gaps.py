from pathlib import Path
import subprocess,json
root=Path(__file__).parent
results=[]
for v in ['A','B']:
 for p in sorted((root/v).glob('combo_scroll_*.json')):
  if not p.stat().st_size:continue
  d=json.loads(p.read_text());f=d['finals'];mode='release' if 'release' in f else 'static';w=d['w'];h=d['h']
  shot=root/v/f"combo_{w}x{h}_{mode}.png"
  pix=subprocess.check_output(['ffmpeg','-v','error','-i',str(shot),'-f','rawvideo','-pix_fmt','rgb24','-'])
  def blank(y):
   start=y*w*3;c=pix[start:start+3]
   return all(all(abs(pix[start+x*3+k]-c[k])<=3 for k in range(3)) for x in range(0,w,2))
  y=f[mode]['metaTop']-1
  assert blank(y),(v,w,h,y)
  a=b=y
  while a>0 and blank(a-1):a-=1
  while b<h-1 and blank(b+1):b+=1
  results.append(dict(variant=v,width=w,height=h,blankRows=b+1-a,firstBlank=a,lastBlank=b,source=str(shot),errors=d['errs'],reversals=d['nonMonoDown']+d['nonMonoUp'],overlaps=len(d['overlapsDown'])+len(d['overlapsUp']),range=d['range']))
result={'method':'QA ad79 algorithm: every second x across the full row; RGB channels within +/-3 of the first pixel; contiguous blank band at the metadata boundary.','measurements':results}
(root/'GAPS.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
