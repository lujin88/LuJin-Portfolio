"""Crop browser recordings, clean metadata, and verify unchanged decoded frames."""
import pathlib,subprocess,sys,json,hashlib
out=pathlib.Path(sys.argv[1]);helper=pathlib.Path(__file__).with_name('share-media.py')
reports=json.loads((out/'BROWSER.json').read_text())
for mode in ['NORMAL','SEAM_4X','REDUCED']:
 r=next(r for r in reports if r.get('mode')==mode);b=r['card']
 crop='crop='+':'.join(str(round(b[k])) for k in ['width','height','x','y'])
 vf=crop+',format=gbrp,scale=out_color_matrix=bt709:out_range=tv:flags=accurate_rnd+full_chroma_int,format=yuv420p,setparams=color_primaries=bt709:color_trc=iec61966-2-1:colorspace=bt709:range=tv'
 subprocess.run(['ffmpeg','-v','error','-n','-i',str(out/(mode+'_BROWSER.webm')),'-an','-vf',vf,'-c:v','libx264','-crf','18','-threads','2','-movflags','+faststart+write_colr',str(out/(mode+'_CARD_REVIEW.mp4'))],check=True)
pairs=[('AI_PET_ZH_FR_DE_LOCAL_V6.mp4','AI_PET_ZH_FR_DE_LOCAL_V6_SHARE.mp4')]+[(m+'_CARD_REVIEW.mp4',m+'_CARD_SHARE.mp4') for m in ['NORMAL','SEAM_4X','REDUCED']]
r={}
def hashes(p):
 data=subprocess.check_output(['ffmpeg','-v','error','-i',str(p),'-map','0:v:0','-f','framemd5','-']).decode()
 return [line.split(',')[-1].strip() for line in data.splitlines() if not line.startswith('#')]
for source,target in pairs:
 subprocess.run([sys.executable,str(helper),str(out/source),str(out/target)],check=True)
 a,b=hashes(out/source),hashes(out/target);assert a==b
 r[target]={'decoded_frames_equal':True,'frames':len(a),'bytes':(out/target).stat().st_size,'sha256':hashlib.sha256((out/target).read_bytes()).hexdigest()}
(out/'SHARE_VERIFICATION.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r))
