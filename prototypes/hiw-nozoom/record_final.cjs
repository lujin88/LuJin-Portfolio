require('/Users/lu/.buzz/.scratch/wa-tv-check/node_modules/playwright-core/lib/server/registry/index.js').registry.findExecutable('ffmpeg').executablePathOrDie=()=>'/opt/homebrew/bin/ffmpeg';
const {chromium}=require('/Users/lu/.buzz/.scratch/wa-tv-check/node_modules/playwright');
const fs=require('fs'),assert=require('assert'),path=require('path');
const ROOT='/Users/lu/.buzz/OUTBOX/HIW_NO_ZOOM_20261103',D=ROOT+'/REVIEW_FINAL';
(async()=>{const b=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});const results=[];
try {for(const mode of ['before','after','slow','reduced']){
 const ctx=await b.newContext({viewport:{width:1440,height:1000},reducedMotion:mode==='reduced'?'reduce':'no-preference',recordVideo:{dir:D,size:{width:1440,height:1000}}});
 const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));

 await p.route('**/illustration-v4-stabilized.mp4',r=>r.fulfill({path:ROOT+(mode==='before'?'/BEFORE.mp4':'/CONTROLLED_V2.mp4'),contentType:'video/mp4'}));
 await p.route('http://localhost:3000/__hiw_review',r=>r.fulfill({path:ROOT+'/REVIEW.html',contentType:'text/html'})); console.log(mode+' loading'); await p.goto('http://localhost:3000/__hiw_review',{waitUntil:'domcontentloaded'});await p.locator('#how-i-work').waitFor({timeout:30000});console.log(mode+' ready');await p.waitForTimeout(1500);
 await p.locator('#how-i-work').evaluate(e=>window.scrollTo({top:e.getBoundingClientRect().top+scrollY-50,behavior:'instant'}));await p.waitForTimeout(800);
 if(mode!=='before')await p.addScriptTag({path:__dirname+'/preview.js'});
 if(mode!=='reduced'){
  await p.waitForFunction(()=>document.querySelector('.hiw-video').readyState>=2);
  await p.locator('.hiw-video').evaluate(async v=>{v.pause();v.currentTime=0;await Promise.race([new Promise(r=>v.addEventListener('seeked',r,{once:true})),new Promise(r=>setTimeout(r,1500))]);await v.play()});
 }
 if(mode==='slow'){const cd=await ctx.newCDPSession(p);await cd.send('Animation.enable');await cd.send('Animation.setPlaybackRate',{playbackRate:.25});await p.locator('.hiw-video').evaluate(v=>v.playbackRate=.25);}
 const captureStart=Date.now(); await p.waitForTimeout(mode==='slow'?17000:8500);
 await p.screenshot({timeout:30000,path:D+'/'+mode.toUpperCase()+'_1440.png'});
 const state=await p.evaluate(()=>{const v=document.querySelector('.hiw-video'),r=v.getBoundingClientRect();return{width:r.width,height:r.height,paused:v.paused,display:getComputedStyle(v).display,currentTime:v.currentTime,path:document.querySelector('.hiw-exp-seam__path').getAttribute('d'),overflow:document.documentElement.scrollWidth>innerWidth}});
 assert(!state.overflow);assert.equal(errors.length,0);if(mode==='reduced'){assert(state.paused);assert.equal(state.display,'none')}
 // Record the continuation into the first timeline stem in the same capture.
 if(mode==='before'||mode==='after'){
   const start=await p.evaluate(()=>scrollY);
   for(let i=1;i<=100;i++){await p.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),start+i*12);await p.waitForTimeout(35);}
   await p.waitForTimeout(800);await p.screenshot({timeout:30000,path:D+'/'+mode.toUpperCase()+'_JOIN_1440.png'}); console.log(mode+' join '+await p.evaluate(()=>{const path=document.querySelector('.hiw-exp-seam__path'),svg=path.ownerSVGElement,p=path.getPointAtLength(path.getTotalLength()),m=path.getScreenCTM(),end=new DOMPoint(p.x,p.y).matrixTransform(m),bar=document.querySelector('.exp-content[data-index="0"] .exp-content__bar').getBoundingClientRect();return JSON.stringify({stem:document.querySelector('.exp-content[data-index="0"]').dataset.stem,end:{x:end.x,y:end.y},barTop:bar.top,barX:bar.left+bar.width/2,opacity:getComputedStyle(path).opacity})}));
 }
 console.log(mode+' captured');const captureSeconds=(Date.now()-captureStart)/1000;results.push({mode,state,errors,captureSeconds});const recording=p.video();await ctx.close();fs.renameSync(await recording.path(),D+'/'+mode.toUpperCase()+'_1440.webm');
}}finally{await b.close()}fs.writeFileSync(D+'/BROWSER.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));})().catch(e=>{console.error(e);process.exitCode=1});
