const {chromium} = require(process.env.PLAYWRIGHT_PATH || '/Users/lu/.buzz/.scratch/tl-1104/node_modules/playwright-core');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
assert.equal(process.env.TEST_LOCK_HELD,'1');
const out = process.env.REVIEW_OUT;
assert.ok(out,'Set REVIEW_OUT to a new evidence directory');
fs.mkdirSync(out,{recursive:true});
const url = 'http://127.0.0.1:4687/motion-r7/scene.html';
const wait = ms => new Promise(resolve=>setTimeout(resolve,ms));
const report = {head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(), runs:[]};
const state = (page,word) => page.evaluate(word=>waR7.inspect().find(c=>c.word===word),word);
const snapshot = async (page,word) => {
  const r=await page.locator(`[data-word="${word}"]`).boundingBox();
  return page.screenshot({clip:{x:Math.floor(r.x),y:Math.floor(r.y),width:Math.ceil(r.width),height:Math.ceil(r.height)}});
};
function pixelDifference(a,b) {
  const decode=input=>execFileSync('ffmpeg',['-v','error','-threads','1','-f','image2pipe','-vcodec','png','-i','pipe:0','-f','rawvideo','-pix_fmt','rgb24','pipe:1'],{input,maxBuffer:2e6});
  const x=decode(a),y=decode(b);assert.equal(x.length,y.length);
  let max=0,changedChannels=0;
  for(let i=0;i<x.length;i++){const d=Math.abs(x[i]-y[i]);max=Math.max(max,d);if(d)changedChannels++;}
  return {max,changedChannels,totalChannels:x.length};
}
async function record(cdp, name) {
  const dir = path.join(out,name); fs.mkdirSync(dir,{recursive:true});
  const frames=[], errors=[];
  const listener = event => {
    try {
      const filename=`frame-${String(frames.length).padStart(6,'0')}.jpg`;
      fs.writeFileSync(path.join(dir,filename),Buffer.from(event.data,'base64'));
      frames.push({filename,time:event.metadata.timestamp});
    } catch(e) { errors.push(e.message); }
    cdp.send('Page.screencastFrameAck',{sessionId:event.sessionId}).catch(e=>errors.push(e.message));
  };
  cdp.on('Page.screencastFrame',listener);
  await cdp.send('Page.startScreencast',{format:'jpeg',quality:92,maxWidth:1440,maxHeight:900,everyNthFrame:2});
  return async () => {
    const end=Date.now()/1000;
    await cdp.send('Page.stopScreencast'); cdp.off('Page.screencastFrame',listener);
    assert.deepEqual(errors,[]); assert.ok(frames.length>1);
    const list=frames.flatMap((f,i)=>[`file '${f.filename}'`,`duration ${Math.max(.001,(frames[i+1]?.time??end)-f.time).toFixed(6)}`]);
    list.push(`file '${frames.at(-1).filename}'`);
    fs.writeFileSync(path.join(dir,'frames.txt'),list.join('\n')+'\n');
    fs.writeFileSync(path.join(dir,'timestamps.json'),JSON.stringify(frames));
    execFileSync('ffmpeg',['-n','-threads','1','-f','concat','-safe','0','-i',path.join(dir,'frames.txt'),'-an','-vf','fps=30','-c:v','libx264','-threads','2','-preset','fast','-crf','18','-pix_fmt','yuv420p','-map_metadata','-1','-movflags','+faststart',path.join(out,`${name}.mp4`)],{stdio:'ignore'});
    return {frames:frames.length,method:'Timestamped Chrome screencast',file:`${name}.mp4`};
  };
}
(async()=>{
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 try {
  for (const mode of (process.env.REVIEW_MODES || 'CHECK,NORMAL,SLOW,REDUCED,TOUCH').split(',')) {
   const touch=mode==='TOUCH', reduced=mode==='REDUCED', slow=mode==='SLOW', check=mode==='CHECK';
   const context=await browser.newContext({viewport:touch?{width:390,height:844}:{width:1440,height:900},deviceScaleFactor:1,hasTouch:touch,isMobile:touch,reducedMotion:reduced?'reduce':'no-preference'});
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(url,{waitUntil:'networkidle'});
   await page.waitForSelector('html[data-r7-ready="true"]');
   await page.evaluate(()=>document.fonts.ready);
   const cdp=await context.newCDPSession(page);
   if(slow) {await cdp.send('Animation.enable');await cdp.send('Animation.setPlaybackRate',{playbackRate:.25});await page.locator('#mode').evaluate(n=>n.textContent='4× slow · same animation');}
   await page.screenshot({path:path.join(out,`${mode}_STILL.png`)});
   const endRecording=(!check&&!touch)?await record(cdp,mode):null;
   const result={mode,cards:[]};
   for (const word of ['perch','church','sun','rain','coat','hat']) {
    const card=page.locator(`[data-word="${word}"]`);
    await card.scrollIntoViewIfNeeded();
    const bounds=await card.boundingBox(),rowBounds=await card.locator('.vocab-row').boundingBox();
    const rowShot=()=>page.screenshot({clip:{x:Math.floor(rowBounds.x),y:Math.floor(rowBounds.y),width:Math.ceil(rowBounds.width),height:Math.ceil(rowBounds.height)}});
    const before=endRecording?null:await snapshot(page,word);
    const rowBefore=endRecording?null:await rowShot();
    if(before)fs.writeFileSync(path.join(out,`${mode}_${word}_BEFORE.png`),before);
    if(!touch)await page.locator('#mode').evaluate((n,t)=>n.textContent=t,`${mode} · ${word} · hover`);
    if(touch) await card.locator('img').tap(); else await card.hover();
    const multiplier=slow?4:1;
    await wait((check?850:3200)*multiplier);
    const during=await state(page,word);
    if(reduced||touch) {assert.equal(during.phase,'idle');assert.equal(during.running,0);if(before)assert.ok(pixelDifference(before,await snapshot(page,word)).max<=1);}
    else {assert.equal(during.phase,'hover');assert.equal(during.hovered,true);if(before)assert.notEqual(Buffer.compare(before,await snapshot(page,word)),0);}
    assert.deepEqual(await card.boundingBox(),bounds);
    assert.deepEqual(await card.locator('.vocab-row').boundingBox(),rowBounds);
    const rowPixels=rowBefore?pixelDifference(rowBefore,await rowShot()):null;
    if(rowPixels)assert.ok(rowPixels.max<=1,`${word}: label pixels changed`);
    if(!endRecording)await page.screenshot({path:path.join(out,`${mode}_${word}_ACTIVE.png`)});
    if(word==='church'&&!check&&!reduced&&!touch) {
      assert.ok(during.completedFlights>=1);
      assert.equal(during.transforms.dove,'matrix(1.25, 0, 0, 1.25, 953, 204)');
    }
    await page.mouse.move(4,4);
    if(!touch)await page.locator('#mode').evaluate((n,t)=>n.textContent=t,`${mode} · ${word} · return to still`);
    if(word==='rain'&&!reduced&&!touch) {
      const drain=await state(page,word);assert.equal(drain.phase,'draining');
      await wait(200*multiplier);assert.equal((await state(page,word)).emissions,drain.emissions,'Leave must stop emission');
    }
    await wait((word==='church'?3000:2000)*multiplier);
    const after=await state(page,word);assert.equal(after.phase,'idle');assert.equal(after.running,0);
    let restorePixels=null;
    if(before){
      const afterPixels=await snapshot(page,word);fs.writeFileSync(path.join(out,`${mode}_${word}_AFTER.png`),afterPixels);
      restorePixels=pixelDifference(before,afterPixels);
      assert.ok(restorePixels.max<=1,`${word}: original still must return within 1/255 raster rounding`);
    }
    result.cards.push({word,during,after,restorePixels,rowPixels,cardBoundsUnchanged:true,rowBoundsUnchanged:true});
   }
   if(check) {
    for(const word of ['perch','church','sun','rain','coat','hat']) {
      const card=page.locator(`[data-word="${word}"]`);
      await card.hover();await wait(130);await page.mouse.move(4,4);await wait(100);
      await card.hover();await wait(600);await page.mouse.move(4,4);await wait(3200);
      assert.equal((await state(page,word)).phase,'idle',`${word}: interrupted/reentered exit`);
    }
    await page.locator('[data-word="rain"]').hover();await wait(100);
    await page.emulateMedia({reducedMotion:'reduce'});await wait(250);
    assert.ok((await page.evaluate(()=>waR7.inspect())).every(c=>c.phase==='idle'&&c.running===0));
    await page.emulateMedia({reducedMotion:'no-preference'});await page.mouse.move(4,4);
    await page.locator('[data-word="hat"] button').focus();await wait(500);
    assert.equal((await state(page,'hat')).phase,'idle');
    // The untouched R5 label behavior remains in the same stylesheet.
    await page.locator('.pose').first().hover();await wait(300);
    assert.equal(await page.locator('.pose > span:last-child').first().evaluate(n=>getComputedStyle(n).transform),'matrix(1, 0, 0, 1, 0, -12)');
    await page.mouse.move(4,4);
    result.interruptedReentry=true;result.liveReduced=true;result.keyboardStill=true;result.r5LabelPreserved=true;
   }
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);
   await wait(1000);
   if(endRecording)result.recording=await endRecording();
   result.errors=errors;report.runs.push(result);
   fs.writeFileSync(path.join(out,'RESULTS.json'),JSON.stringify(report,null,2));
   await context.close();console.log(`${mode}: PASS`);
  }
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
