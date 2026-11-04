// Review-only wheel input. The page itself never intercepts native scrolling.
const fs=require('node:fs');
const {chromium}=require(process.env.PLAYWRIGHT_CORE||'/Users/lu/.buzz/.scratch/tl-1104/node_modules/playwright-core');
const out=process.env.MAN_REVIEW;
const variant=process.argv[2]||'new';
if(!out)throw Error('Set MAN_REVIEW to an external review directory');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const ctx=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,recordVideo:{dir:out+'/raw',size:{width:1440,height:1000}}});
 try{
  const page=await ctx.newPage();
  const client=await ctx.newCDPSession(page);
  if(variant==='old')for(const file of ['motion.css','motion.js'])await page.route('**/'+file,r=>r.fulfill({body:fs.readFileSync(out+'/OLD_'+file),contentType:file.endsWith('css')?'text/css':'application/javascript'}));
  await page.goto('http://localhost:4698/prototype.html',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  const geometry=await page.evaluate(()=>{const el=document.querySelector('.man-motion'),stage=el.querySelector('.man-motion-stage');return{top:el.offsetTop,range:el.offsetHeight-stage.clientHeight,after:el.offsetTop+el.offsetHeight};});
  await page.evaluate(()=>{window.reviewFrames=[];window.reviewActive=true;const tick=t=>{window.reviewFrames.push({t,y:scrollY,p:document.querySelector('.man-motion').dataset.progress});if(window.reviewActive)requestAnimationFrame(tick);};requestAnimationFrame(tick);});
  // Each pulse accelerates over six events, then decays like trackpad inertia.
  // 420 CSS px / 24 events, nominal 30ms between events + 140ms between pulses.
  const weights=Array.from({length:24},(_,i)=>i<6?(i+1)/6:Math.exp(-(i-5)/5));
  const sum=weights.reduce((a,b)=>a+b,0),inputs=[];
  await page.waitForTimeout(500);
  while(await page.evaluate(()=>scrollY)<geometry.after+300){
   for(const w of weights){const delta=420*w/sum;inputs.push({t:Date.now(),delta});await client.send('Input.dispatchMouseEvent',{type:'mouseWheel',x:720,y:500,deltaX:0,deltaY:delta});await page.waitForTimeout(30);}
   await page.waitForTimeout(140);
  }
  await page.waitForTimeout(500);
  const frames=await page.evaluate(()=>{window.reviewActive=false;return window.reviewFrames;});
  const first=frames.find(f=>f.y>=geometry.top),last=frames.find(f=>f.y>=geometry.top+geometry.range);
  const gaps=frames.slice(1).map((f,i)=>f.t-frames[i].t).sort((a,b)=>a-b);
  const result={variant,geometry,gesture:'synthetic wheel acceleration + inertia; not a physical trackpad recording',pulsePx:420,eventCountPerPulse:24,nominalEventIntervalMs:30,nominalPauseMs:140,pinDurationMs:last.t-first.t,pinAveragePxPerSecond:geometry.range*1000/(last.t-first.t),rafGapP95Ms:gaps[Math.floor(gaps.length*.95)],rafGapMaxMs:gaps.at(-1),inputs,frames};
  fs.writeFileSync(out+'/'+variant.toUpperCase()+'_WHEEL.json',JSON.stringify(result,null,2));
  const video=page.video();await ctx.close();await video.saveAs(out+'/'+variant.toUpperCase()+'_WHEEL.webm');
  console.log(JSON.stringify({...result,inputs:inputs.length,frames:frames.length}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
