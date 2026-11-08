from pathlib import Path
from urllib.parse import quote
import shutil,hashlib,difflib,json
D=Path(__file__).resolve().parent
W=Path('/Users/lu/.buzz/REPOS/LuJin-Portfolio-hiw-nozoom')
L=Path('/Users/lu/Desktop/portfolio_perfect')
mask='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1060 654"><rect width="1060" height="654" fill="white"/><path d="M28 193 C190 75 812 72 987 262" fill="none" stroke="black" stroke-width="72" stroke-linecap="round"/><rect x="320" y="0" width="320" height="101" fill="white"/></svg>'
css='''/* HIW revision 2: same artwork and timing as reviewed in PR #52. */
.ai-decides-section .ad-art-stage {
  mask-image: none;
  -webkit-mask-image: none;
  overflow: visible;
}
.ai-decides-section .hiw-video,
.ai-decides-section .hiw-r2-still {
  mask-image: url("data:image/svg+xml,MASK");
  -webkit-mask-image: url("data:image/svg+xml,MASK");
  mask-mode: luminance;
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
  mix-blend-mode: lighten;
}
.ai-decides-section .hiw-decide-layer,
.hiw-exp-seam__path { display: none !important; }
.ai-decides-section .ad-art { opacity: 0 !important; }
.ai-decides-section .hiw-r2-still {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.ai-decides-section .ad-art-stage:has(.hiw-video.is-playing) .hiw-r2-still {
  visibility: hidden;
}
@media (prefers-reduced-motion: reduce) {
  .ai-decides-section .hiw-r2-still { visibility: visible !important; }
  .ai-decides-section .hiw-video { display: none; }
}
'''.replace('MASK',quote(mask,safe=''))
files={'public/styles/hiw-revision2.css':css.encode(),'public/assets/videos/how-i-work/hiw-revision2-web.mp4':(D/'hiw-revision2-web.mp4').read_bytes(),'public/assets/images/how-i-work/hiw-revision2-still.png':(D/'hiw-revision2-still.png').read_bytes()}
# Build only new scoped artifacts in our existing worktree first.
for rel,data in files.items():
 p=W/rel;assert not p.exists(),p;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(data)
p=L/'public/home.html';before=p.read_bytes();text=before.decode()
assert text.count('</head>')==1
assert text.count('/assets/videos/how-i-work/illustration-v4-stabilized.mp4')==1
assert text.count('    <video class="hiw-video"')==1
text=text.replace('</head>','<link rel="stylesheet" href="/styles/hiw-revision2.css">\n</head>')
text=text.replace('    <video class="hiw-video"','    <img class="hiw-r2-still" src="/assets/images/how-i-work/hiw-revision2-still.png" width="1060" height="654" alt="" aria-hidden="true">\n    <video class="hiw-video"')
text=text.replace('/assets/videos/how-i-work/illustration-v4-stabilized.mp4','/assets/videos/how-i-work/hiw-revision2-web.mp4')
text=text.replace('// How I Work: original SVG remains underneath for reduced motion and failures.','// How I Work: matching still remains underneath for reduced motion and failures.')
backup=D/'HOME_BEFORE.html';assert not backup.exists();backup.write_bytes(before)
(D/'HOME_AFTER.html').write_text(text)
patch=''.join(difflib.unified_diff(before.decode().splitlines(True),text.splitlines(True),fromfile='a/public/home.html',tofile='b/public/home.html'))
(D/'HIW_INTEGRATION.patch').write_text(patch)
# The PM explicitly authorized the running 3000 integration. Preserve unrelated live edits.
for rel,data in files.items():
 q=L/rel;assert not q.exists(),q;q.parent.mkdir(parents=True,exist_ok=True);q.write_bytes(data)
assert p.read_bytes()==before,'home.html changed concurrently; refusing to overwrite'
p.write_text(text)
manifest={rel:hashlib.sha256(data).hexdigest() for rel,data in files.items()}
manifest['public/home.html before']=hashlib.sha256(before).hexdigest();manifest['public/home.html after']=hashlib.sha256(p.read_bytes()).hexdigest()
(D/'INTEGRATION_HASHES.json').write_text(json.dumps(manifest,indent=2))
print(patch);print(json.dumps(manifest,indent=2))
