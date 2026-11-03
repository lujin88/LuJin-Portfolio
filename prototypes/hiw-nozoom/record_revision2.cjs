// Uses an archived full-page snapshot and browser-only responses; writes nothing to port 3000.
const fs=require('fs'),assert=require('node:assert/strict'),path=require('path');
const PW=process.env.HIW_PLAYWRIGHT_ROOT||'/Users/lu/.buzz/.scratch/wa-tv-check/node_modules';
require(PW+'/playwright-core/lib/server/registry/index.js').registry.findExecutable('ffmpeg').executablePathOrDie=()=>'/opt/homebrew/bin/ffmpeg';
const {chromium}=require(PW+'/playwright');
const ROOT=process.env.HIW_ROOT||'/Users/lu/.buzz/OUTBOX/HIW_NO_ZOOM_20261103',D=ROOT+'/REVISION_2/RENDER_FINAL',CAP=D+'/CAPTURE_BLOB';fs.mkdirSync(CAP,{recursive:true});
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});const results=[];
try{for(const mode of ['after','seam_slow','reduced']){
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:mode==='reduced'?'reduce':'no-preference',recordVideo:{dir:CAP,size:{width:1440,height:1000}}});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/illustration-v4-stabilized.mp4',r=>r.fulfill({path:D+'/HIW_REVISION_2_FINAL.mp4',contentType:'video/mp4'}));
 await page.route('**/__hiw_r2_still.png',r=>r.fulfill({path:D+'/STILL.png',contentType:'image/png'}));
 await page.route('http://localhost:3000/__hiw_r2',r=>r.fulfill({path:ROOT+'/REVIEW.html',contentType:'text/html'}));
 await page.goto('http://localhost:3000/__hiw_r2',{waitUntil:'domcontentloaded'});
 console.log(mode+' page loaded');await page.locator('#how-i-work').waitFor();await page.addScriptTag({path:__dirname+'/preview_revision2.js'});
 await page.locator('#how-i-work').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY-10,behavior:'instant'}));
 await page.waitForTimeout(1000);await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,3000))]));
 if(mode!=='reduced'){
  await page.locator('.hiw-video').evaluate(async v=>{v.pause();const response=await fetch(v.dataset.src);const blob=await response.blob();v.src=URL.createObjectURL(blob);v.load();await v.play();});
  await page.waitForFunction(()=>(()=>{const v=document.querySelector('.hiw-video');return v.readyState>=2&&v.seekable.length>0&&v.seekable.end(0)>=7.99})(),null,{timeout:15000});
  if(mode==='seam_slow'){const cdp=await context.newCDPSession(page);await cdp.send('Animation.enable');await cdp.send('Animation.setPlaybackRate',{playbackRate:.25});}
  await page.locator('.hiw-video').evaluate(async(v,slow)=>{v.pause();v.currentTime=slow?5.5:0;v.playbackRate=slow?.25:1;await Promise.race([new Promise(r=>v.addEventListener('seeked',r,{once:true})),new Promise(r=>setTimeout(r,1000))]);window.__r2CaptureStarted=performance.now();window.__r2CaptureTime=v.currentTime;if(slow&&Math.abs(v.currentTime-5.5)>.1)throw Error('Seam seek failed: '+v.currentTime);await v.play();},mode==='seam_slow');
 }
 await page.waitForTimeout(mode==='seam_slow'?14000:10000);
 await page.screenshot({path:CAP+'/'+mode.toUpperCase()+'_1440.png'});
 const state=await page.evaluate(()=>{const v=document.querySelector('.hiw-video'),s=document.querySelector('.ad-art-stage');return {duration:v.duration,currentTime:v.currentTime,rate:v.playbackRate,startTime:window.__r2CaptureTime,captureStartNavigationSeconds:window.__r2CaptureStarted/1000,paused:v.paused,display:getComputedStyle(v).display,overflow:document.documentElement.scrollWidth>innerWidth,stageMask:getComputedStyle(s).maskImage,lineDisplay:getComputedStyle(document.querySelector('.hiw-exp-seam__path')).display,stillVisibility:getComputedStyle(document.querySelector('.hiw-r2-still')).visibility,recordElapsed:(performance.now()-window.__r2CaptureStarted)/1000};});
 assert.equal(errors.length,0);assert(!state.overflow);assert.equal(state.lineDisplay,'none');assert.equal(state.stageMask,'none');
 if(mode==='reduced'){assert(state.paused);assert.equal(state.display,'none');assert.equal(state.stillVisibility,'visible');}
 else{assert.equal(state.duration,8);assert(state.recordElapsed>8);if(mode==='seam_slow'){assert.equal(state.rate,.25);assert(Math.abs(state.startTime-5.5)<.1);}}
 if(mode==='after'){
  // Capture first/peak/still at the same viewport and exact video timestamps.
  for(const [label,time] of [['FIRST',0],['DECIDE_PEAK',2.5],['HOLD',7]]){
   await page.locator('.hiw-video').evaluate(async(v,t)=>{v.pause();v.currentTime=t;await Promise.race([new Promise(r=>v.addEventListener('seeked',r,{once:true})),new Promise(r=>setTimeout(r,1000))]);if(Math.abs(v.currentTime-t)>.05)throw Error('Frame seek failed '+t+' -> '+v.currentTime);v.classList.add('is-playing');v.style.opacity='1';},time);
   await page.waitForTimeout(100);
   await page.screenshot({path:CAP+'/'+label+'_1440.png'});console.log(label+' '+JSON.stringify(await page.locator('.hiw-video').evaluate(v=>({time:v.currentTime,opacity:getComputedStyle(v).opacity,playing:v.className}))));
  }
  await page.locator('.exp-content[data-index="0"]').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY-450,behavior:'instant'}));
  await page.waitForTimeout(250);await page.screenshot({path:CAP+'/NO_RIGHT_LINE_1440.png'});
 }
 results.push({mode,state,errors});const recording=page.video();await context.close();fs.renameSync(await recording.path(),CAP+'/'+mode.toUpperCase()+'_1440.webm');console.log(mode+' captured');
}}finally{await browser.close();}
fs.writeFileSync(CAP+'/BROWSER.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));})().catch(e=>{console.error(e);process.exitCode=1});
