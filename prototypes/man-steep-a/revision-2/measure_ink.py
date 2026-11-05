from pathlib import Path
import subprocess,json
p=Path(__file__).parent/'RUN4';data=json.loads((p/'CHECK.json').read_text());out=[]
for v in data:
 for d in v['dims']:
  if d['width']<=1000:continue
  w=d['width'];h=d['height'];stage=d['stageHeight'];f=p/f"{v['variant']}_{w}x{h}_END.png"
  pix=subprocess.check_output(['ffmpeg','-v','error','-i',str(f),'-f','rawvideo','-pix_fmt','rgb24','-'])
  rows=[]
  for y in range(stage-130,min(stage+70,h)):
   row=pix[(y*w+80)*3:(y*w+w-80)*3];count=sum(1 for i in range(0,len(row),3) if row[i]<150 and row[i+1]<145 and row[i+2]<139)
   if count>12:rows.append(y)
  before=[y for y in rows if y<stage];after=[y for y in rows if y>=stage]
  out.append({'variant':v['variant'],'width':w,'height':h,'lastInk':max(before),'nextInk':min(after),'blankPixelRows':min(after)-max(before)-1})
(p/'INK_GAPS.json').write_text(json.dumps({'method':'Dark text pixels (r<150,g<145,b<139), >12 pixels in a row, x=80..width-80, y=stage-130..stage+70. Blank rows between last note ink and first metadata ink.','measurements':out},indent=2));print(json.dumps(out))
