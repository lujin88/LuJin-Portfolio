// ad79: combo (spacing + MAN A), motion ON. Wheel 120px steps down past MAN A then back up.
// Per step: data-progress, max bottom of visible MAN A elements vs top of next block (.mc-meta), console errors.
// At progress 1 + after release: viewport screenshot; pixel blank between note and next content measured separately.
const { chromium } = require('playwright-core');
const [,,port,w,h]=process.argv;
(async()=>{
 const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const p=await b.newPage({viewport:{width:+w,height:+h}});await p.emulateMedia({reducedMotion:'no-preference'});
 const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,200))});p.on('pageerror',e=>errs.push(String(e).slice(0,200)));
 await p.goto(`http://localhost:${port}/${process.env.MAN_ROUTE}`,{waitUntil:'load',timeout:180000});await p.waitForTimeout(1200);
 const info=await p.evaluate(()=>{const s=document.querySelector('.man-motion');const r=s.getBoundingClientRect();return {scrubbed:s.classList.contains('is-scrubbed'),top:Math.round(r.top+scrollY),height:Math.round(r.height),progress:s.dataset.progress}});
 const sample=()=>p.evaluate(()=>{const s=document.querySelector('.man-motion');const meta=document.querySelector('.mc-meta').getBoundingClientRect();
   let mb=-1e9;for(const e of s.querySelectorAll('.man-motion-over,.man-motion-slogan,.man-motion-final,.man-motion-board,.man-motion-card,.man-motion-note')){const c=getComputedStyle(e);if(+c.opacity<0.01||c.visibility==='hidden')continue;const r=e.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)mb=Math.max(mb,r.bottom);}
   const note=s.querySelector('.man-motion-note').getBoundingClientRect();
   return {y:Math.round(scrollY),p:s.dataset.progress,maxBottom:Math.round(mb),metaTop:Math.round(meta.top),overlap:mb>meta.top+0.5,noteBottom:Math.round(note.bottom),noteOp:getComputedStyle(s.querySelector('.man-motion-note')).opacity}});
 const down=[],up=[];
 await p.mouse.move(w/2,h/2);
 const end=info.top+info.height+400;
 while(true){await p.mouse.wheel(0,120);await p.waitForTimeout(90);const s=await sample();down.push(s);if(s.y>=end||down.length>200)break;}
 // final assembled frame: progress 1, stage still sticky
 const range=await p.evaluate(()=>{const s=document.querySelector('.man-motion');const st=s.querySelector('.man-motion-stage');return s.offsetHeight-st.clientHeight});
 if(info.scrubbed){await p.evaluate(y=>scrollTo(0,y),info.top+range);await p.waitForTimeout(400);
  const f=await sample();await p.screenshot({path:`combo_${w}x${h}_assembled.png`});
  // scroll so note and next block are both in view after sticky release
  await p.evaluate(y=>scrollTo(0,y),info.top+range+Math.round(h*0.45));await p.waitForTimeout(400);
  const g=await sample();await p.screenshot({path:`combo_${w}x${h}_release.png`});
  var finals={assembled:f,release:g,blankNoteToMeta_dom:g.metaTop-g.noteBottom};
 } else { await p.evaluate(()=>document.querySelector('.man-motion-note').scrollIntoView({block:'center'}));await p.waitForTimeout(300);const g=await sample();await p.screenshot({path:`combo_${w}x${h}_static.png`});var finals={static:g,blankNoteToMeta_dom:g.metaTop-g.noteBottom}; }
 await p.evaluate(y=>scrollTo(0,y),end);await p.waitForTimeout(300);
 while(true){await p.mouse.wheel(0,-120);await p.waitForTimeout(90);const s=await sample();up.push(s);if(s.y<=0||up.length>200)break;}
 const num=a=>a.filter(s=>s.p!=='static'&&s.p!==undefined).map(s=>+s.p);
 const mono=(a,dir)=>{let bad=0;for(let i=1;i<a.length;i++){if(dir>0?a[i]<a[i-1]-1e-4:a[i]>a[i-1]+1e-4)bad++;}return bad};
 const dn=num(down),un=num(up);
 console.log(JSON.stringify({w:+w,h:+h,info,range,errs,steps:{down:down.length,up:up.length},overlapsDown:down.filter(s=>s.overlap),overlapsUp:up.filter(s=>s.overlap),nonMonoDown:mono(dn,1),nonMonoUp:mono(un,-1),progressDownEnd:dn.at(-1),progressUpEnd:un.at(-1),finals}));
 await b.close();
})().catch(e=>{console.log(JSON.stringify({fatal:String(e).slice(0,300)}));process.exit(1)});
