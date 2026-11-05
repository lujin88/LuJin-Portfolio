const fs=require('fs'),assert=require('assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright-core');
const server=require('./SERVE.cjs');
(async()=>{
 await new Promise(r=>server.listen(4777,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 const results=[];
 try {
  for(const width of [1440,390]) {
   const page=await browser.newPage({viewport:{width,height:900}});const errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.goto('http://127.0.0.1:4777/index');
   await page.locator('#how-i-work .ad-art-stage').scrollIntoViewIfNeeded();
   await page.waitForFunction(()=>hiwR9.ready&&hiwR9.fade.playState==='running');
   const cycles=[];
   for(let i=0;i<5;i++) {
    await page.evaluate(()=>{
     window.pauseProbe={};
     matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',function changed(e){
      if(!e.matches)return;
      pauseProbe.start=performance.now();
      function sample(){if(hiwR9.fade.playState==='paused'){pauseProbe.ms=performance.now()-pauseProbe.start;pauseProbe.time=hiwR9.fade.currentTime;}else requestAnimationFrame(sample);}
      sample();
     },{once:true});
    });
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.waitForFunction(()=>Number.isFinite(pauseProbe.ms),null,{timeout:1000});
    const probe=await page.evaluate(()=>pauseProbe);assert.ok(probe.ms<=100,JSON.stringify(probe));
    await page.waitForTimeout(150);
    assert.equal(await page.evaluate(()=>hiwR9.fade.currentTime),probe.time);
    cycles.push(probe.ms);
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.waitForFunction(()=>hiwR9.fade.playState==='running');
    await page.waitForTimeout(120);
   }
   if(width===1440){
    await page.evaluate(()=>hiwR9.fade.pause());
    for(const t of [.2,.35,.85]){
     await page.evaluate(t=>hiwR9.players.forEach(p=>p.scrub('RespondOnce',t)),t);
     await page.waitForTimeout(100);
     await page.locator('#how-i-work .ad-art-stage').screenshot({path:__dirname+'/FIX_'+String(t)+'.png'});
    }
   }
   assert.deepEqual(errors,[]);results.push({width,stopLatencyMs:cycles,stableWhileReduced:true,errors});await page.close();
  }
  fs.writeFileSync(__dirname+'/FIX_CHECK.json',JSON.stringify(results,null,2));console.log(results);
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exit(1)});
