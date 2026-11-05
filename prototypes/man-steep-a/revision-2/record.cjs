const fs=require('fs');const {chromium}=require(process.env.PLAYWRIGHT_CORE||'/Users/lu/.buzz/.scratch/tl-1104/node_modules/playwright-core');
const out=process.env.MAN_REVIEW||__dirname;
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 try{
 for(const variant of ['A','B'])for(const [width,height] of [[1440,900],[1024,768],[390,844]])for(const direction of ['DOWN','UP']){
  const name=`${variant}_${width}_${direction}`;
  const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,recordVideo:{dir:out+'/raw',size:{width,height}}});
  const page=await ctx.newPage();const errors=[],bad=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('response',r=>{if(r.status()>=400)bad.push({url:r.url(),status:r.status()})});
  await page.goto('http://localhost:4822/'+(variant==='A'?'man-truck-bus':'man-review-b'),{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForFunction(()=>!!document.querySelector('.man-motion')?.dataset.progress);
  const end=await page.evaluate(()=>document.documentElement.scrollHeight-innerHeight);
  if(direction==='UP'){await page.evaluate(end=>scrollTo({top:end,behavior:'instant'}),end);await page.waitForTimeout(250)}
  await page.evaluate(()=>{window.samples=[];window.sampling=true;function tick(t){const s=document.querySelector('.man-motion'),m=document.querySelector('.mc-meta').getBoundingClientRect();const cards=[...document.querySelectorAll('.man-motion-card')].map(e=>e.getBoundingClientRect().bottom);window.samples.push({t,y:scrollY,p:s.dataset.progress,metaTop:m.top,cardBottom:Math.max(...cards)});if(window.sampling)requestAnimationFrame(tick)}requestAnimationFrame(tick)});
  await page.waitForTimeout(300);
  for(let n=0;n<Math.ceil(end/100)+2;n++){await page.mouse.wheel(0,direction==='DOWN'?100:-100);await page.waitForTimeout(160)}
  await page.waitForTimeout(400);
  const samples=await page.evaluate(()=>{window.sampling=false;return window.samples});
  const active=samples.filter(s=>s.p!=='static');let backwards=0;for(let i=1;i<active.length;i++){let d=Number(active[i].p)-Number(active[i-1].p);if(direction==='DOWN'?d<-.0001:d>.0001)backwards++}
  const overlap=samples.filter(s=>s.cardBottom>s.metaTop+.5).length;
  const video=page.video();await ctx.close();await video.saveAs(out+'/'+name+'.webm');
  const result={name,width,height,direction,input:'Playwright synthetic native wheel; 100 CSS px every 160ms; normal playback',errors,bad,backwards,overlap,samples};fs.writeFileSync(out+'/'+name+'.json',JSON.stringify(result));console.log(JSON.stringify({...result,samples:samples.length}));
  if(errors.length||bad.length||backwards||overlap)throw Error('Recording validation failed: '+name);
 }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
