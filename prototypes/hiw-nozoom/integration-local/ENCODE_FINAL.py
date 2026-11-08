import subprocess
from pathlib import Path
D=Path(__file__).resolve().parent
size=1060*654*3//2
hold=subprocess.check_output(['ffmpeg','-v','error','-threads','2','-i',str(D/'HIW_R2_QP18.mp4'),'-vf','select=eq(n\\,143)','-frames:v','1','-f','rawvideo','-pix_fmt','yuv420p','-'])
assert len(hold)==size
src=subprocess.Popen(['ffmpeg','-v','error','-threads','2','-i',str(D/'HIW_R2_LOSSLESS.mp4'),'-f','rawvideo','-pix_fmt','yuv420p','-'],stdout=subprocess.PIPE)
out=subprocess.Popen(['ffmpeg','-v','error','-f','rawvideo','-pix_fmt','yuv420p','-s','1060x654','-r','24','-i','-','-vf','setparams=color_primaries=bt709:color_trc=iec61966-2-1:colorspace=bt709:range=tv','-c:v','libx264','-qp','18','-preset','slow','-threads','2','-bf','0','-g','240','-force_key_frames','expr:eq(n,143)','-x264-params','ipratio=1:pbratio=1:scenecut=0','-pix_fmt','yuv420p','-colorspace','bt709','-color_primaries','bt709','-color_trc','iec61966-2-1','-color_range','tv','-movflags','+faststart+write_colr','-an','-map_metadata','-1',str(D/'hiw-revision2-web.mp4')],stdin=subprocess.PIPE)
for n in range(192):
 b=src.stdout.read(size);assert len(b)==size
 out.stdin.write(hold if n>=144 else b)
out.stdin.close();assert out.wait()==0;assert src.wait()==0
