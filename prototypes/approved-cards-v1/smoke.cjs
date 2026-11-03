const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright'),fs=require('fs'),path=require('path'),assert=require('assert/strict'),sharp=require(process.env.SHARP_MODULE || 'sharp');
const out=process.argv[2];if(!out)throw new Error('Pass the export output directory');
(async()=>{const b=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});const checks={};try{
for(const scene of ['solar','dolphin']){
const p=await b.newPage({viewport:scene==='solar'?{width:864,height:540}:{width:864,height:600}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto('http://127.0.0.1:4658/PREVIEW.html?capture&scene='+scene);await p.waitForFunction(()=>window.review);
for(const [name,t] of [['FIRST',0],['MOUTH',scene==='solar'?3:1.18],['LAST',scene==='solar'?8-1/24:12-1/24]]){
const url=await p.evaluate(t=>{review.setTime(t);return document.querySelector('canvas').toDataURL()},t);
const actual=await sharp(Buffer.from(url.split(',')[1],'base64')).raw().toBuffer();const expected=await sharp(path.join(out,scene+'_'+name+'.png')).raw().toBuffer();assert.equal(Buffer.compare(actual,expected),0,scene+name);
}
await p.evaluate(()=>{const gl=document.querySelector('canvas').getContext('webgl'),draw=gl.drawArrays.bind(gl);window.drawCount=0;gl.drawArrays=(...args)=>{drawCount++;return draw(...args)};review.play();});await p.waitForFunction(()=>drawCount>0);
await p.evaluate(()=>{review.pause();drawCount=0});await p.waitForTimeout(150);assert.equal(await p.evaluate(()=>drawCount),0,'paused no draws');
await p.emulateMedia({reducedMotion:'reduce'});await p.waitForFunction(()=>matchMedia('(prefers-reduced-motion: reduce)').matches&&review.state().time===0);const state=await p.evaluate(()=>review.state());assert.equal(state.time,0);assert.equal(state.amount,0);
await p.emulateMedia({reducedMotion:'no-preference'});
await p.waitForFunction(()=>!matchMedia('(prefers-reduced-motion: reduce)').matches);
await p.evaluate(()=>new Promise(resolve=>{const canvas=document.querySelector('canvas');const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting){observer.disconnect();requestAnimationFrame(resolve);}});observer.observe(canvas);review.play();canvas.style.transform='translateX(200vw)';}));
const a=await p.evaluate(()=>{const time=review.state().time;drawCount=0;return time;});
await p.evaluate(()=>new Promise(resolve=>{let frames=0;function tick(){if(++frames===30)resolve();else requestAnimationFrame(tick);}requestAnimationFrame(tick);}));
assert.equal(await p.evaluate(()=>drawCount),0,'offscreen no draws for 30 animation frames');const z=await p.evaluate(()=>review.state().time);assert.equal(a,z,'offscreen pauses');
assert.deepEqual(errors,[]);checks[scene]={http:true,finalSourceMatchesExport:true,pauseStopsDraws:true,reducedToggle:true,offscreenPauses:true,errors};await p.close();
}
const cards=await b.newPage({viewport:{width:1000,height:700}});
await cards.goto('http://127.0.0.1:4658/REVIEW.html');
for(const f of cards.frames().slice(1)){await f.waitForFunction(()=>window.review);await f.evaluate(()=>review.setTime(3));}
const widths=await cards.locator('iframe').evaluateAll(xs=>xs.map(x=>x.getBoundingClientRect().width));assert.deepEqual(widths,[448,448]);
await cards.screenshot({path:path.join(out,'REVIEW_448_CARDS.png')});await cards.close();checks.reviewPage={cardWidths:widths};
fs.writeFileSync(path.join(out,'SMOKE.json'),JSON.stringify(checks,null,2));console.log(checks);
}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
