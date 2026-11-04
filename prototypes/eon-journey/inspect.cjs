const {chromium}=require('/Users/lu/.buzz/.scratch/tl-1104/node_modules/playwright-core');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),os=require('node:os');
assert.equal(process.env.TEST_LOCK_HELD,'1');assert.ok(os.loadavg()[1]<=10);
const out=fs.mkdtempSync('/Users/lu/.buzz/OUTBOX/EON_JOURNEY_AB_20261104/INSPECT_');
(async()=>{const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{const results=[];for(const mode of ['A','B'])for(const kind of (process.env.DESKTOP_ONLY?['DESKTOP']:['DESKTOP','MOBILE','REDUCED'])){
 const page=await browser.newPage({viewport:{width:kind==='MOBILE'?390:1440,height:1000},reducedMotion:kind==='REDUCED'?'reduce':'no-preference'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:4691/EON?journey=${mode}`,{waitUntil:'networkidle'});
 await page.locator('[data-journey-sequence][data-ready="true"]').waitFor();await page.evaluate(()=>document.fonts.ready);
 const section=page.locator('[data-journey-section]'),seq=page.locator('[data-journey-sequence]');
 await seq.scrollIntoViewIfNeeded();await seq.locator(':scope[data-started="true"]').waitFor();
 await page.addStyleTag({content:'[data-site-header] { visibility:hidden !important; }'});
 const frame=async time=>{await section.evaluate((el,t)=>{el.getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=t;});},time);await section.screenshot({path:path.join(out,`${mode}_${kind}_${time}.png`)});};
 if(kind==='DESKTOP'){await frame(0);await frame(mode==='A'?1450:1000);}
 await frame(5000);
 const state=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,steps:[...document.querySelectorAll('[data-journey-step]')].map(e=>({text:e.innerText,rect:e.getBoundingClientRect().toJSON()})),animations:document.querySelector('[data-journey-section]').getAnimations({subtree:true}).map(a=>({name:a.animationName,state:a.playState,time:a.currentTime}))}));
 assert.ok(state.scrollWidth<=state.width);assert.equal(state.steps.length,6);assert.deepEqual(errors,[]);
 if(kind==='MOBILE')assert.ok(state.steps[2].rect.right<=390,'Calculate remains visible at 390');
 results.push({mode,kind,state,errors});await page.close();
}fs.writeFileSync(path.join(out,'RESULTS.json'),JSON.stringify(results,null,2));console.log(out);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
