const {chromium} = require(process.env.PLAYWRIGHT_PATH || '/Users/lu/.buzz/.scratch/tl-1104/node_modules/playwright-core');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const frameQuality=require('./frame-quality.cjs');
assert.equal(process.env.TEST_LOCK_HELD,'1');
assert.ok(require('node:os').loadavg()[1]<30,'PM 9c836aed requires five-minute load below30 before capture');
const out = process.env.REVIEW_OUT;
assert.ok(out,'Set REVIEW_OUT to a new evidence directory');
fs.mkdirSync(out,{recursive:true});
const url = 'http://127.0.0.1:4687/motion-r8/scene.html';
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
  await cdp.send('Page.startScreencast',{format:'jpeg',quality:92,maxWidth:1440,maxHeight:900,everyNthFrame:1});
  return async (activeWindows=[]) => {
    const end=Date.now()/1000;
    await cdp.send('Page.stopScreencast'); cdp.off('Page.screencastFrame',listener);
    assert.deepEqual(errors,[]); assert.ok(frames.length>=1);
    const list=frames.flatMap((f,i)=>[`file '${f.filename}'`,`duration ${Math.max(.001,(frames[i+1]?.time??end)-f.time).toFixed(6)}`]);
    list.push(`file '${frames.at(-1).filename}'`);
    fs.writeFileSync(path.join(dir,'frames.txt'),list.join('\n')+'\n');
    fs.writeFileSync(path.join(dir,'timestamps.json'),JSON.stringify(frames));
    const quality=frameQuality(frames,activeWindows);
    fs.writeFileSync(path.join(dir,'FRAME_QUALITY.json'),JSON.stringify(quality,null,2));
    execFileSync('ffmpeg',['-n','-threads','1','-f','concat','-safe','0','-i',path.join(dir,'frames.txt'),'-an','-vf','fps=30','-c:v','libx264','-threads','2','-preset','fast','-crf','18','-pix_fmt','yuv420p','-map_metadata','-1','-movflags','+faststart',path.join(out,`${name}.mp4`)],{stdio:'ignore'});
    return {frames:frames.length,method:'Timestamped Chrome screencast',file:`${name}.mp4`,quality};
  };
}
(async()=>{
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 try {
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,reducedMotion:'no-preference'});
  const page=await context.newPage(), errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url.replace('motion-r8','motion-r7'),{waitUntil:'networkidle'});
  await page.waitForSelector('html[data-r7-ready="true"]');
  await page.locator('[data-word="sun"]').hover(); await wait(1000);
  const rays=()=>page.locator('[data-word="sun"] .r7-art > g > path').evaluateAll(ns=>ns.map(n=>getComputedStyle(n).transform));
  const r7First=await rays();await wait(500);assert.deepEqual(await rays(),r7First);
  await page.screenshot({path:path.join(out,'R7_SUN_ACTIVE.png')});
  await page.evaluate(()=>{
   const marks={perch:[[1,50,45]],church:[[2,50,55]],sun:[[3,48,2],[4,80,36]],rain:[[5,52,75],[6,50,34]],coat:[[7,53,66]],hat:[[8,52,56]]};
   for(const [word,items] of Object.entries(marks)) {
    const art=document.querySelector(`[data-word="${word}"] .vocab-art`);
    for(const [n,x,y] of items) {
     const el=document.createElement('span');el.textContent=n;
     el.style.cssText=`position:absolute;left:${x}%;top:${y}%;width:25px;height:25px;border-radius:50%;background:#153d32;color:white;border:2px solid white;display:grid;place-items:center;font:bold 14px Arial;z-index:9;pointer-events:none`;
     art.append(el);
    }
   }
   const nine=document.createElement('span');nine.textContent='9';nine.style.cssText='position:absolute;left:78px;top:472px;width:22px;height:22px;border-radius:50%;background:#153d32;color:white;text-align:center;font:bold 14px/22px Arial;pointer-events:none';document.body.append(nine);
   document.querySelector('.review-note').textContent='R7 原视频对应实现 · “线”候选编号（尚未确认 Lu 指哪一项）';
   const notes=[['1 · 鱼的条纹／鳍纹','条纹随鱼身轻抬；尾鳍随尾巴摆。纹理没有独立形变。'],['2 · 教堂窗框／屋顶边线','建筑整张固定，只新增的白鸽飞行。'],['3 · 太阳外圈细光线','700ms 淡入后停住；R7 没有位移或循环。'],['4 · 太阳原图粗花瓣光芒','烘焙在原图里，与太阳本体一起保持固定。'],['5 · 雨滴边缘','悬停雨卡时五颗原图雨滴下落；未另画细雨线。'],['6 · 云层轮廓','云朵保留在静态原图上，与下落雨滴分层。'],['7 · 雨衣缝线／拉链','帽兜部分随折叠；衣身、前领与缝线固定。'],['8 · 红帽白色针织纹','随整顶帽子上抬；没有针织纹单独运动。'],['9 · 喇叭图标线／页面分隔线','六卡共用控件保持固定；不是插画动效层。']];
   document.querySelector('.motion-section').outerHTML='<section style="padding:35px 24px;display:grid;grid-template-columns:repeat(3,1fr);gap:22px 30px;font-family:Arial,sans-serif">'+notes.map(([a,b])=>`<div><b style="font-size:17px">${a}</b><p style="font-size:14px;line-height:1.55;margin-top:8px;color:#465b50">${b}</p></div>`).join('')+'</section>';
  });
  await page.screenshot({path:path.join(out,'NUMBERED_CANDIDATES.png')});
  report.r7RayTransformsStatic=true;
  for (const option of (process.env.REVIEW_OPTIONS||'A,B').split(',')) {
   // Navigation preserves the physical pointer position. Leave the old card
   // before the new document installs its pointerenter listener.
   await page.mouse.move(4,4);
   // The preceding option ends in reduced mode. Explicitly restore normal
   // motion before the next option's hover assertion.
   await page.emulateMedia({reducedMotion:'no-preference'});
   await page.goto(`${url}?option=${option}`,{waitUntil:'networkidle'});
   await page.waitForSelector('html[data-r8-ready="true"]');
   const card=page.locator('[data-word="sun"]');
   const before=await snapshot(page,'sun'), bounds=await card.boundingBox();
   await page.screenshot({path:path.join(out,`${option}_STILL.png`)});
   await card.hover();await wait(1000);const t1=await page.evaluate(()=>waR8.inspect());
   await wait(350);const t2=await page.evaluate(()=>waR8.inspect());
   assert.equal(t1.length,12);assert.notDeepEqual(t1.map(x=>x.transform),t2.map(x=>x.transform));
   assert.deepEqual(await card.boundingBox(),bounds);
   await page.screenshot({path:path.join(out,`${option}_ACTIVE.png`)});
   await page.mouse.move(4,4);await wait(900);
   const restore=pixelDifference(before,await snapshot(page,'sun'));assert.ok(restore.max<=1);
   await card.hover();await wait(200);await page.mouse.move(4,4);await wait(80);await card.hover();await wait(200);
   await page.emulateMedia({reducedMotion:'reduce'});await wait(300);
   assert.ok((await page.evaluate(()=>waR8.inspect())).every(x=>!x.running));
   assert.equal((await state(page,'sun')).phase,'idle');
   await page.mouse.move(4,4);await page.emulateMedia({reducedMotion:'no-preference'});
   const cdp=await context.newCDPSession(page);
   for(const mode of ['NORMAL','SLOW','REDUCED']) {
    // Recreate the document after cropped pixel checks, then explicitly enter.
    // This also keeps each recording independent of the prior media mode.
    await page.mouse.move(4,4);await wait(700);
    await page.emulateMedia({reducedMotion:mode==='REDUCED'?'reduce':'no-preference'});
    await page.goto(`${url}?option=${option}`,{waitUntil:'networkidle'});
    await page.waitForSelector('html[data-r8-ready="true"]');
    await cdp.send('Animation.enable');await cdp.send('Animation.setPlaybackRate',{playbackRate:mode==='SLOW'?.25:1});
    await page.locator('#mode').evaluate((n,t)=>n.textContent=t,`Proposal ${option} · ${mode==='SLOW'?'4x slow':mode==='REDUCED'?'Reduced motion':'Normal speed'} · hover / hold / leave`);
    const stop=await record(cdp,`${option}_${mode}`);
    await wait(700);await card.hover();const movingStart=Date.now()/1000;
    await wait(mode==='SLOW'?12000:5600);const movingEnd=Date.now()/1000;
    await page.mouse.move(4,4);await wait(mode==='SLOW'?2000:1200);
    const movie=await stop(mode==='REDUCED'?[]:[[movingStart,movingEnd]]);report.runs.push({option,mode,restore,movie});
    fs.writeFileSync(path.join(out,'RESULTS_IN_PROGRESS.json'),JSON.stringify(report,null,2));
   }
   await cdp.detach();
  }
  assert.deepEqual(errors,[]);report.errors=errors;
  report.headAfter=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();assert.equal(report.headAfter,report.head);
  fs.writeFileSync(path.join(out,'RESULTS.json'),JSON.stringify(report,null,2));
  assert.ok(report.runs.every(r=>r.movie.quality.status!=='load-affected'),'Load-affected recording: repeat once; not deliverable');
  await context.close();console.log('R7 audit, A/B normal/slow/reduced, rapid reentry, live reduced and still restoration: PASS');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
