const fs=require('fs');const {chromium}=require('/Users/lu/.buzz/.scratch/tl-1104/node_modules/playwright-core');
const out=__dirname;
(async()=>{const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});const results=[];
try{for(const v of ['A','B'])for(const [w,h] of [[1440,900],[1024,768],[390,844]]){
const ctx=await b.newContext({viewport:{width:w,height:h}}),p=await ctx.newPage(),errors=[];
p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
await p.goto('http://localhost:4822/man-reduced-'+v.toLowerCase(),{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForFunction(()=>!!document.querySelector('.man-motion')?.dataset.progress);
const read=()=>p.evaluate(()=>{const s=document.querySelector('.man-motion'),st=s.querySelector('.man-motion-stage'),r=s.getBoundingClientRect(),t=st.getBoundingClientRect();return {y:scrollY,sectionTop:r.top,top:r.top+scrollY,bottom:r.bottom,height:r.height,stageTop:t.top,stageBottom:t.bottom,metaTop:document.querySelector('.mc-meta').getBoundingClientRect().top,range:s.offsetHeight-st.offsetHeight,progress:s.dataset.progress,inline:[...s.querySelectorAll('.man-motion-card')].some(c=>c.style.transform||c.style.opacity)}});
const settle=()=>p.waitForTimeout(180);
const toggle=async(mode)=>{await p.emulateMedia({reducedMotion:mode});await p.waitForFunction(({mode,wide})=>matchMedia('(prefers-reduced-motion: reduce)').matches===(mode==='reduce') && (document.querySelector('.man-motion').dataset.progress==='static')===(mode==='reduce'||!wide),{mode,wide:w>1000},{timeout:5000});await p.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));return read()};
for(const progress of (w>1000?[.25,.5,.85]:[.5])){
 await toggle('no-preference');const start=await read();await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),start.top+(w>1000?start.range*progress:100));await settle();const before=await read();
 const reduced=await toggle('reduce');if(progress===.85)await p.screenshot({path:out+`/${v}_${w}_reduced85.png`});
 const restored=await toggle('no-preference');const row={v,w,h,progress,before,reduced,restored};results.push(row);
 if(Math.abs(before.stageTop-reduced.stageTop)>1||reduced.inline||reduced.stageBottom<=0||Math.abs(before.y-restored.y)>1)throw Error('round trip '+JSON.stringify(row));
}
// Below the section: compensate height so the metadata remains at the same screen coordinate.
await toggle('no-preference');let s=await read();await p.evaluate(y=>scrollTo(0,y),s.top+s.height+100);await settle();const below=await read();const belowReduced=await toggle('reduce');const belowRestored=await toggle('no-preference');results.push({v,w,kind:'below',before:below,reduced:belowReduced,restored:belowRestored});
if(Math.abs(below.metaTop-belowReduced.metaTop)>1||Math.abs(below.metaTop-belowRestored.metaTop)>1)throw Error('downstream shift '+v+w);
// Above the section: preferences must not move the reader.
await p.evaluate(()=>scrollTo(0,0));await settle();const above=await read();const aboveReduced=await toggle('reduce');const aboveRestored=await toggle('no-preference');results.push({v,w,kind:'above',before:above,reduced:aboveReduced,restored:aboveRestored});if(aboveReduced.y!==0||aboveRestored.y!==0)throw Error('above moved');
// Scroll while static, then re-enable: preserve the visible stage offset at the assembled frame.
if(w>1000){await toggle('reduce');s=await read();await p.evaluate(y=>scrollTo(0,y),s.top+100);await settle();const before=await read();const after=await toggle('no-preference');results.push({v,w,kind:'static-scroll',before,after});if(Math.abs(before.metaTop-after.metaTop)>1)throw Error('static reading offset');}
if(w>1000){s=await read();await p.evaluate(y=>scrollTo(0,y),s.top+s.height-100);await settle();const before=await read();const reduced=await toggle('reduce');const restored=await toggle('no-preference');results.push({v,w,kind:'released-tail',before,reduced,restored});if(Math.abs(before.stageBottom-reduced.stageBottom)>1||Math.abs(before.y-restored.y)>1||reduced.stageBottom<=0)throw Error('released tail');}
if(errors.length)throw Error(errors.join('\n'));console.log(v,w,'passed',errors);await ctx.close();
}}finally{fs.writeFileSync(out+'/CHECK.json',JSON.stringify(results,null,2));await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
