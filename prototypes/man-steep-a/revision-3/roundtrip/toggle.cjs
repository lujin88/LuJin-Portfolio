// ad79 PR #69 (43929ae): reduced-motion toggle anchoring. Usage: node toggle.cjs <port> <tag> <w> <h>
// For each case: state before toggle, after reduce ON (wait for data-progress=static), after reduce OFF (wait for numeric progress).
// Records scrollY, section/stage/next-block (.mc-meta) screen tops, progress, card transforms; screenshots.
const { chromium } = require('playwright-core');const fs=require('fs');
const [,,port,tag,W,H]=process.argv;const w=+W,h=+H;const D=`${__dirname}/${tag}`;fs.mkdirSync(D,{recursive:true});
const URL=`http://localhost:${port}${process.env.MAN_ROUTE || "/man-truck-bus"}`;const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const snap=p=>p.evaluate(()=>{const s=document.querySelector('.man-motion');const st=s.querySelector('.man-motion-stage');const m=document.querySelector('.mc-meta');
 const vis=[...s.querySelectorAll('.man-motion-card,.man-motion-final,.man-motion-board,.man-motion-note,.man-motion-slogan')].map(e=>({c:e.className.split(' ')[0].replace('man-motion-',''),t:Math.round(e.getBoundingClientRect().top),op:getComputedStyle(e).opacity}));
 return {y:Math.round(scrollY*100)/100,p:s.dataset.progress,scrubbed:s.classList.contains('is-scrubbed'),secTop:Math.round(s.getBoundingClientRect().top*100)/100,secH:Math.round(s.offsetHeight),stageTop:Math.round(st.getBoundingClientRect().top*100)/100,metaTop:Math.round(m.getBoundingClientRect().top*1000)/1000,
  t:[...s.querySelectorAll('.man-motion-card')].map(c=>c.style.transform),vis}});
async function waitP(p,want){for(let i=0;i<100;i++){const v=await p.evaluate(()=>document.querySelector('.man-motion').dataset.progress);if(want==='static'?v==='static':v!=='static')return i*20;await sleep(20);}return -1}
(async()=>{
 const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});const res=[];const errs=[];
 const fresh=async(reduce=false,hash='')=>{const ctx=await b.newContext({viewport:{width:w,height:h},reducedMotion:reduce?'reduce':'no-preference'});const p=await ctx.newPage();
  p.on('pageerror',e=>errs.push(String(e).slice(0,200)));p.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,200))});
  await p.goto(URL+hash,{waitUntil:'load',timeout:180000});await sleep(1000);return p};
 const geo=p=>p.evaluate(()=>{const s=document.querySelector('.man-motion');const st=s.querySelector('.man-motion-stage');return {top:s.getBoundingClientRect().top+scrollY,range:s.offsetHeight-st.offsetHeight,secH:s.offsetHeight,stageH:st.offsetHeight}});
 const round=async(p,name,startReduce)=>{const r={name};r.before=await snap(p);await p.screenshot({path:`${D}/${name}_0before.png`});
  await p.emulateMedia({reducedMotion:startReduce?'no-preference':'reduce'});r.wait1=await waitP(p,startReduce?'num':'static');await sleep(120);r.mid=await snap(p);await p.screenshot({path:`${D}/${name}_1toggled.png`});
  await p.emulateMedia({reducedMotion:startReduce?'reduce':'no-preference'});r.wait2=await waitP(p,startReduce?'static':'num');await sleep(120);r.back=await snap(p);await p.screenshot({path:`${D}/${name}_2back.png`});
  // after round trip, wheel one step down and up to check continuity
  await p.mouse.move(w/2,h/2);await p.mouse.wheel(0,120);await sleep(250);r.wheelDown=await snap(p);await p.mouse.wheel(0,-120);await sleep(250);r.wheelUp=await snap(p);
  res.push(r);};
 // 1. in the sticky stage at 25/50/85%
 for(const f of [.25,.5,.85]){const p=await fresh();const g=await geo(p);await p.evaluate(y=>scrollTo(0,y),Math.round(g.top+g.range*f));await sleep(400);await round(p,`sticky${f*100}`,false);await p.context().close();}
 // 2. past the stage: stage released with note + My role visible; section bottom above viewport; deep in next section
 {const p=await fresh();const g=await geo(p);
  for(const [name,y] of [['released45',g.top+g.range+Math.round(h*.45)],['sectionAbove',g.top+g.secH+40],['deepNext',g.top+g.secH+900]]){await p.evaluate(y=>scrollTo(0,y),y);await sleep(400);await round(p,name,false);}
  await p.context().close();}
 // 3. static reading, then animation ON (page loaded with reduce)
 {const p=await fresh(true);const g=await geo(p);
  for(const [name,dy] of [['static_top0',0],['static_in100',100],['static_in300',300],['static_in600',600],['static_below',g.secH+60]]){await p.evaluate(y=>scrollTo(0,y),Math.round(g.top+dy));await sleep(400);await round(p,name,true);}
  await p.context().close();}
 // 4a. static mode resize then toggle (page loaded with reduce, read into section, resize, toggle)
 {const p=await fresh(true);const g=await geo(p);await p.evaluate(y=>scrollTo(0,y),Math.round(g.top+200));await sleep(300);
  for(const [rw,rh] of [[1024,768],[1440,1000],[w,h]]){await p.setViewportSize({width:rw,height:rh});await sleep(500);}
  await round(p,'static_resized',true);await p.context().close();}
 // 4b. anchor jump into the section (#man-motion-title) then toggle; keyboard PageDown into the section then toggle
 {const p=await fresh(false,'#man-motion-title');await sleep(400);await round(p,'anchor',false);await p.context().close();}
 {const p=await fresh();const g=await geo(p);await p.evaluate(y=>scrollTo(0,y),Math.max(0,Math.round(g.top-h*.9)));await sleep(300);await p.mouse.click(5,h-5);
  for(let i=0;i<2;i++){await p.keyboard.press('PageDown');await sleep(500);}await round(p,'pagedown',false);await p.context().close();}
 fs.writeFileSync(`${D}/toggle.json`,JSON.stringify({w,h,res,errs},null,1));console.log(JSON.stringify({tag,n:res.length,errs:errs.length}));await b.close();
})().catch(e=>{console.log(JSON.stringify({fatal:String(e).slice(0,400)}));process.exit(1)});
