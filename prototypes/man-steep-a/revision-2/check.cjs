const fs=require('fs'),assert=require('assert');
const {chromium}=require(process.env.PLAYWRIGHT_CORE||'/Users/lu/.buzz/.scratch/tl-1104/node_modules/playwright-core');
const out=process.env.MAN_REVIEW||__dirname;
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const results=[];
 try{
 for(const variant of ['A','B']){
  const route=variant==='A'?'man-truck-bus':'man-review-b';
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  const errors=[],bad=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('response',r=>{if(r.status()>=400)bad.push({url:r.url(),status:r.status()})});
  await page.goto('http://localhost:4822/'+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForSelector('.man-motion.is-scrubbed');
  const dims=[];
  for(const [width,height] of [[1440,900],[1440,1000],[1024,768],[390,844]]){
   await page.setViewportSize({width,height});await page.waitForTimeout(120);
   const g=await page.evaluate(()=>{let s=document.querySelector('.man-motion'),st=s.querySelector('.man-motion-stage');return {top:s.offsetTop,range:s.offsetHeight-st.offsetHeight}});
   if(width>1000){await page.evaluate(g=>scrollTo(0,g.top+g.range),g);}else await page.locator('.man-motion-note').scrollIntoViewIfNeeded();
   await page.waitForTimeout(150);
   const d=await page.evaluate(()=>{let s=document.querySelector('.man-motion'),note=s.querySelector('.man-motion-note').getBoundingClientRect(),meta=document.querySelector('.mc-meta dt').getBoundingClientRect();return {width:innerWidth,height:innerHeight,stageHeight:s.querySelector('.man-motion-stage').offsetHeight,gap:meta.top-note.bottom,progress:s.dataset.progress,overflow:document.documentElement.scrollWidth-innerWidth,titles:[...document.querySelectorAll('h2')].filter(x=>x.textContent.startsWith('A truck can be ready.')).length}});
   dims.push(d);await page.screenshot({caret:'initial',path:out+'/'+variant+'_'+width+'x'+height+'_END.png'});
   if(width>1000)assert(d.gap<=150,'gap '+JSON.stringify(d));assert.equal(d.overflow,0);assert.equal(d.titles,1);
  }
  await page.setViewportSize({width:1440,height:900});
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(80);
  const reduced=await page.evaluate(()=>({mode:document.querySelector('.man-motion').dataset.progress,transforms:[...document.querySelectorAll('.man-motion-card')].map(e=>getComputedStyle(e).transform)}));
  assert.equal(reduced.mode,'static');assert(reduced.transforms.every(x=>x==='none'));
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.evaluate(()=>scrollTo(0,0));
  const link=page.locator('a[href="/index"]').first();await link.click();await page.waitForURL('**/index');await page.waitForTimeout(1000);
  const index={url:page.url(),title:await page.title()};await page.goBack({waitUntil:'networkidle'});await page.waitForSelector('.man-motion.is-scrubbed');
  await page.evaluate(()=>{let s=document.querySelector('.man-motion');scrollTo(0,s.offsetTop+s.offsetHeight-s.querySelector('.man-motion-stage').offsetHeight)});await page.waitForTimeout(150);
  const returned=await page.locator('.man-motion').getAttribute('data-progress');
  const item={variant,dims,reduced,index,returned,errors,bad};results.push(item);console.log(JSON.stringify(item));
  await page.close();
 }
 const ctx=await browser.newContext({javaScriptEnabled:false});const page=await ctx.newPage();await page.goto('http://localhost:4822/man-truck-bus');assert.equal(await page.locator('.man-motion-card').count(),4);await ctx.close();
 }finally{fs.writeFileSync(out+'/CHECK.json',JSON.stringify(results,null,2));await browser.close()}
 if(results.some(r=>r.errors.length||r.bad.length))throw Error('Console/network failures recorded');
})().catch(e=>{console.error(e);process.exitCode=1});
