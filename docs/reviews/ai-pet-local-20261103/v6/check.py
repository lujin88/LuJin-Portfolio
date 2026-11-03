import pathlib,json,subprocess,struct,sys
import cv2,numpy as np
from PIL import Image,ImageDraw
out=pathlib.Path(sys.argv[1]);file=out/'AI_PET_ZH_FR_DE_LOCAL_V6.mp4'
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-of','json',str(file)]));s=probe['streams'][0]
raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(file),'-f','rawvideo','-pix_fmt','rgb24','-']);frames=np.frombuffer(raw,np.uint8).reshape(-1,622,896,3)
small=np.array([cv2.resize(f,(432,300),interpolation=cv2.INTER_AREA) for f in frames]).astype(np.float32)
adj=np.abs(np.diff(small,axis=0)).mean(axis=(1,2,3));luma=frames.mean(axis=(1,2))@np.array([.2126,.7152,.0722]);poster=np.array(Image.open(out/'POSTER.png').convert('RGB'),np.float32)
data=file.read_bytes();pos=data.index(b'colrnclx');colr=struct.unpack('>HHHB',data[pos+8:pos+15])
headers=subprocess.run(['ffmpeg','-i',str(file),'-c','copy','-bsf:v','trace_headers','-f','null','-'],capture_output=True,text=True).stderr
keys=['video_full_range_flag','colour_primaries','transfer_characteristics','matrix_coefficients'];sps={key:next(line.split('=')[-1].strip() for line in headers.splitlines() if key in line) for key in keys}
r=dict(file=file.name,bytes=len(data),frames=len(frames),fps=s['r_frame_rate'],size=[s['width'],s['height']],audio_streams=sum(v['codec_type']=='audio' for v in probe['streams']),colr=colr,sps=sps,card_size=[432,300],adjacent_median=float(np.median(adj)),hold_entry_mae=float(np.abs(small[143]-small[144]).mean()),loop_mae=float(np.abs(small[-1]-small[0]).mean()),hold_max_difference=int(np.max(np.abs(frames[144:].astype(int)-frames[0].astype(int)))),max_adjacent_mean_luma_delta=float(np.max(np.abs(np.diff(luma)))),max_mean_luma_drift=float(np.max(np.abs(luma-luma[0]))),poster_rgb_mean_signed=(frames[0]-poster).mean(axis=(0,1)).tolist(),poster_rgb_mean_absolute=np.abs(frames[0]-poster).mean(axis=(0,1)).tolist(),peak_vs_first_card_mae=max(float(np.abs(f-small[0]).mean()) for f in small),console_max_difference=int(np.max(np.abs(frames[:,380:].astype(int)-frames[0,380:].astype(int)))))
(out/'DECODED_MEASUREMENTS.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r))
assert r['loop_mae']<=r['adjacent_median'] and r['hold_entry_mae']<=r['adjacent_median'];assert r['hold_max_difference']==0;assert r['max_adjacent_mean_luma_delta']<=2;assert r['audio_streams']==0;assert colr==(1,13,1,0)
canvas=Image.new('RGB',(432*4,326*2),'#f8f6f3');d=ImageDraw.Draw(canvas)
for k,i in enumerate([0,30,54,83,108,132,144,191]):
 canvas.paste(Image.fromarray(frames[i]).resize((432,300)),((k%4)*432,(k//4)*326));d.text(((k%4)*432+10,(k//4)*326+304),f'{i/24:.3f} s',fill='black')
canvas.save(out/'CONTACT_SHEET.png')
