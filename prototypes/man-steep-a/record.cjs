const fs=require('node:fs');
const {chromium}=require(process.env.PLAYWRIGHT_CORE||'/Users/lu/.buzz/.scratch/tl-1104/node_modules/playwright-core');
const out=process.env.MAN_REVIEW||'/Volumes/Extreme SSD/agent-scratch/man-steep-a-review-20261104';
const mode=process.argv[2]||'normal';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const ctx=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,reducedMotion:mode==='reduced'?'reduce':'no-preference',recordVideo:{dir:out+'/raw',size:{width:1440,height:1000}}});
 try{
 const page=await ctx.newPage();
 await page.goto('http://localhost:4698/prototype.html',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 const client=await ctx.newCDPSession(page);await client.send('Animation.enable');await client.send('Animation.setPlaybackRate',{playbackRate:mode==='slow'?0.25:1});
 const geom=await page.evaluate(()=>{const el=document.querySelector('.man-motion');return{top:el.offsetTop,end:el.offsetTop+el.offsetHeight-innerHeight,after:el.offsetTop+el.offsetHeight};});
 const factor=mode==='slow'?4:1;
 const move=async(y,ms)=>page.evaluate(({y,ms})=>new Promise(resolve=>{const from=scrollY,start=Date.now();function tick(){const p=Math.min(1,(Date.now()-start)/ms);scrollTo(0,from+(y-from)*p);if(p<1)requestAnimationFrame(tick);else resolve();}requestAnimationFrame(tick);}),{y,ms:ms*factor});
 await page.waitForTimeout(700);
 await move(geom.top,2000);
 if(mode==='reduced'){
 await page.waitForTimeout(1200);await move(geom.after+250,3500);
 }else{
 await page.waitForTimeout(600);
 await move(geom.top+(geom.end-geom.top)*.32,2400);await page.waitForTimeout(700);
 await move(geom.top+(geom.end-geom.top)*.94,4500);await page.waitForTimeout(1000);
 await move(geom.after+400,2000);
 }
 await page.waitForTimeout(700);
 const video=page.video();await ctx.close();await video.saveAs(out+'/'+mode.toUpperCase()+'.webm');
 console.log(JSON.stringify({mode,cdpPlaybackRate:mode==='slow'?.25:1,scrollDurationFactor:factor,geometry:geom,path:out+'/'+mode.toUpperCase()+'.webm'}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
