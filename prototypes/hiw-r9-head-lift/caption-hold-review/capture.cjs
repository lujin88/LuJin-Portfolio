const {chromium}=require(process.env.PLAYWRIGHT_PATH||'/Users/lu/.buzz/.scratch/tl-1104/node_modules/playwright-core');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const record=require('./record.cjs');
assert.equal(process.env.TEST_LOCK_HELD,'1');
assert.ok(os.loadavg()[1]<30,'PM 9c836aed requires five-minute load below30 before capture');
const out=process.env.REVIEW_OUT;assert.ok(out);
fs.mkdirSync(out,{recursive:true});
const report={head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),runs:[]};
const url='http://127.0.0.1:4696/index';
async function sample(page,cycles){
 return page.evaluate(cycles=>new Promise((resolve,reject)=>{
  const s=window.hiwR9,canvas=document.querySelectorAll('.hiw-plane canvas')[2];
  const crop=document.createElement('canvas');crop.width=310;crop.height=96;
  const ctx=crop.getContext('2d',{willReadFrequently:true});
  const read=()=>{
   ctx.clearRect(0,0,310,96);
   ctx.drawImage(canvas,1042*canvas.width/1842,130*canvas.height/854,310*canvas.width/1842,96*canvas.height/854,0,0,310,96);
   return ctx.getImageData(0,0,310,96).data;
  };
  const initial=new Uint8ClampedArray(read());
  let bright=0;for(let i=0;i<initial.length;i+=4)if(initial[i]>140&&initial[i+1]>140&&initial[i+2]>140&&initial[i+3]>200)bright++;
  if(bright<20){reject(new Error('Caption crop contains no visible lettering'));return;}
  let maxDiff=0,samples=0,previous=s.cycles,doneAt=0,activeStart=null;
  const activeWindows=[];
  const first=s.cycles,marks=[],start=performance.now();
  function tick(){
   const t=performance.now(),pixels=read();samples++;
   const epoch=(performance.timeOrigin+t)/1000;
   const moving=s.players[0].rivT>=.9&&s.players[0].rivT<=4.6;
   if(moving&&activeStart===null)activeStart=epoch;
   if(!moving&&activeStart!==null){activeWindows.push([activeStart,epoch]);activeStart=null;}
   for(let i=0;i<pixels.length;i++)maxDiff=Math.max(maxDiff,Math.abs(pixels[i]-initial[i]));
   if(s.cycles!==previous){marks.push({cycle:s.cycles,ms:t-start});previous=s.cycles;}
   if(s.cycles>=first+cycles&&!doneAt)doneAt=t;
   if(doneAt&&t-doneAt>250){if(activeStart!==null)activeWindows.push([activeStart,epoch]);resolve({samples,maxDiff,bright,marks,activeWindows,errors:s.errors,speed:s.speed,paced:s.paced});return;}
   if(t-start>90000){reject(new Error('Three cycles did not finish within90s: '+JSON.stringify({cycles:s.cycles,first,speed:s.speed,rivT:s.players.map(p=>p.rivT),paced:s.paced,hidden:document.hidden})));return;}
   requestAnimationFrame(tick);
  }tick();
 }),cycles);
}
(async()=>{
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 try{
  for(const [name,width,reduced,slow] of [['NORMAL_1440',1440,false,false],['NORMAL_390',390,false,false],['SLOW_1440',1440,false,true],['REDUCED_1440',1440,true,false]]){
   if(process.env.REVIEW_MODES&&!process.env.REVIEW_MODES.split(',').includes(name))continue;
   const context=await browser.newContext({viewport:{width,height:width===390?844:900},deviceScaleFactor:1,reducedMotion:reduced?'reduce':'no-preference'});
   if(slow)await context.route('**/hiwx/hiw-r9.js',async route=>{
    const source=fs.readFileSync(path.join(__dirname,'developer-controller.js'),'utf8');
    assert.ok(source.includes('const SPEED=2,HOLD=2,'));
    await route.fulfill({contentType:'text/javascript',body:source.replace('const SPEED=2,HOLD=2,','const SPEED=.5,HOLD=8,')});
   });
   const page=await context.newPage(),errors=[],requests=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('request',r=>{if(r.url().endsWith('.riv'))requests.push(r.url());});
   await page.goto(url,{waitUntil:'load',timeout:120000});
   await page.locator('#how-i-work .ad-art-stage').scrollIntoViewIfNeeded();
   await page.waitForFunction(()=>window.hiwR9&& (matchMedia('(prefers-reduced-motion: reduce)').matches||hiwR9.ready),null,{timeout:60000});
   const cdp=await context.newCDPSession(page);
   // Rive drawFrame also uses document.timeline.currentTime; changing that
   // clock through CDP conflicts with the developer's virtual _boundDraw clock.
   // Slow the Rive source clock once via the route above; keep CDP time normal.
   await cdp.send('Animation.enable');await cdp.send('Animation.setPlaybackRate',{playbackRate:1});
   const stop=await record(cdp,name);
   let check;
   if(reduced){
    await page.waitForTimeout(2000);
    assert.deepEqual(requests,[]);
    check=await page.evaluate(()=>({playing:document.querySelector('.hiw-plays').classList.contains('is-playing'),errors:hiwR9.errors}));
    assert.equal(check.playing,false);
   }else{
    await page.waitForFunction(()=>hiwR9.paced&&hiwR9.players[2].rivT>.2);
    check=await sample(page,3);assert.ok(check.maxDiff<=1,JSON.stringify(check));assert.deepEqual(check.errors,[]);assert.ok(check.marks.length>=3);
   }
   const movie=await stop(check.activeWindows||[]);
   await page.screenshot({path:path.join(out,name+'.png')});
   assert.deepEqual(errors,[]);
   report.runs.push({name,width,reduced,slow,check,movie,errors,requests});
   fs.writeFileSync(path.join(out,'RESULTS_IN_PROGRESS.json'),JSON.stringify(report,null,2));
   await context.close();
  }
  report.headAfter=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();assert.equal(report.headAfter,report.head);
  fs.writeFileSync(path.join(out,'RESULTS.json'),JSON.stringify(report,null,2));
  assert.ok(report.runs.every(r=>r.movie.quality.status!=='load-affected'),'Load-affected recording: repeat once; not deliverable');
  console.log('PASS: three-cycle caption pixels, normal1440/390, slow and reduced');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
