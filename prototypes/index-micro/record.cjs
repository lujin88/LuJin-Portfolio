const fs = require('fs');
const path = require('path');
const assert = require('assert');
const playwrightRoot = process.env.PLAYWRIGHT_ROOT || '/Users/lu/.buzz/.scratch/wa-tv-check/node_modules';
require(playwrightRoot+'/playwright-core/lib/server/registry/index.js').registry.findExecutable('ffmpeg').executablePathOrDie=()=>'/opt/homebrew/bin/ffmpeg';
const {chromium} = require(playwrightRoot+'/playwright');
const out = process.env.MICRO_OUT || '/Users/lu/.buzz/OUTBOX/INDEX_MICRO_MOTION_20261103';
const scene = process.argv[2] || 'advisor';
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  const results=[];
  try {
    for(const mode of ['before','after','slow','reduced']) {
      const ctx=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:mode==='reduced'?'reduce':'no-preference',recordVideo:{dir:out,size:{width:1440,height:900}}});
      const page=await ctx.newPage(), errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      await page.goto('file://'+path.join(__dirname,'PREVIEW.html')+'?capture&scene='+scene+(mode==='before'?'&before':''));
      await page.waitForFunction(()=>[...document.images].filter(i=>!i.closest('[hidden]')).every(i=>i.complete&&i.naturalWidth>0));
      await page.evaluate(()=>window.micro.setTime(0));
      const prefix=path.join(out,scene.toUpperCase()+'_'+mode.toUpperCase());
      await page.screenshot({path:prefix+'_START_1440.png'});
      if(mode==='after'){
        for(const t of [2000,2042,3000,6000,7999,8000]){
          await page.evaluate(t=>window.micro.setTime(t),t);
          await page.screenshot({path:prefix+'_'+t+'_1440.png'});
        }
        await page.evaluate(()=>window.micro.replay());
        await page.waitForTimeout(10000);
      } else if(mode==='slow'){
        const cd=await ctx.newCDPSession(page);
        await cd.send('Animation.enable');
        await cd.send('Animation.setPlaybackRate',{playbackRate:.25});
        await page.evaluate(()=>{window.micro.setTime(6000);window.micro.animations.forEach(a=>a.play());});
        await page.waitForTimeout(17000);
      } else { await page.waitForTimeout(2000); }
      const state=await page.evaluate(()=>({scene:window.micro.scene,overflow:document.documentElement.scrollWidth>innerWidth,layerDisplay:getComputedStyle(document.querySelector('article:not([hidden]) .micro-layer')).display,animations:window.micro.animations.map(a=>({state:a.playState,time:a.currentTime})),image:document.querySelector('article:not([hidden]) img').getAttribute('src')}));
      assert(!state.overflow);assert.equal(errors.length,0);
      if(mode==='reduced')assert.equal(state.layerDisplay,'none');
      results.push({mode,state,errors});
      const video=page.video();await ctx.close();fs.renameSync(await video.path(),prefix+'_1440.webm');
    }
  }finally{await browser.close();}
  fs.writeFileSync(path.join(out,scene.toUpperCase()+'_BROWSER.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify(results));
})().catch(e=>{console.error(e);process.exitCode=1;});
