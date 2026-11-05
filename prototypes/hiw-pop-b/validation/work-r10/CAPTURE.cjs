
if(!process.env.PUBLIC_DIR)throw new Error('PUBLIC_DIR is required');
const fs=require('fs'),assert=require('assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright-core');
const server=require('../../SERVE.cjs');
(async()=>{await new Promise(r=>server.listen(4782,'127.0.0.1',r));const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});const results=[];try{
for(const mode of ['NORMAL','SLOW','REDUCED','MOBILE']){
 const c=await b.newContext({viewport:{width:mode==='MOBILE'?390:1440,height:900},reducedMotion:mode==='REDUCED'?'reduce':'no-preference',recordVideo:{dir:__dirname+'/raw',size:{width:mode==='MOBILE'?390:1440,height:900}}});
 const recordedAt=Date.now();let clipStart=0,clipDuration=2;const p=await c.newPage();p.setDefaultTimeout(20000);const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:4782/index');await p.locator('#how-i-work .ad-art-stage').scrollIntoViewIfNeeded();await p.evaluate(()=>document.fonts.ready);
 if(mode!=='REDUCED'){
 await p.waitForFunction(()=>window.hiwR9?.ready);clipStart=(Date.now()-recordedAt)/1000;clipDuration=mode==='SLOW'?22:11.5;await p.evaluate(rate=>{hiwR9.fade.currentTime=0;hiwR9.fade.playbackRate=rate;hiwR9.fade.play()},mode==='SLOW'?.25:1);
 await p.waitForTimeout(mode==='SLOW'?22500:12000);
 if(mode==='NORMAL'){
 await p.evaluate(()=>hiwR9.fade.pause());
 for(const t of [0,.35,.6,.9,1.2,1.6,2,2.283,3.334,5.25]){
 await p.evaluate(t=>hiwR9.players.forEach(r=>r.scrub('RespondOnce',t)),t);await p.waitForTimeout(120);await p.locator('#how-i-work .ad-art-stage').screenshot({path:__dirname+'/POSE_'+t+'.png'});
 }
 }
 }else await p.waitForTimeout(2000);
 const geometry=await p.locator('#how-i-work .ad-art-stage').boundingBox();results.push({mode,geometry,errors,clipStart,clipDuration});assert.deepEqual(errors,[]);
 const v=p.video();await c.close();await v.saveAs(__dirname+'/'+mode+'.webm');console.log(mode,'complete');fs.writeFileSync(__dirname+'/CHECKS.json',JSON.stringify(results,null,2));
}
}finally{await b.close();await new Promise(r=>server.close(r));}})().catch(e=>{console.error(e);process.exit(1)});
