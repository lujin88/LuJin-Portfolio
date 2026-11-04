const fs=require('node:fs');
const {chromium}=require(process.env.PLAYWRIGHT_CORE||'/Users/lu/.buzz/.scratch/tl-1104/node_modules/playwright-core');
const out=process.env.MAN_REVIEW||'/Volumes/Extreme SSD/agent-scratch/man-steep-a-review-20261104';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 try {
 const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',e=>{if(e.type()==='error')errors.push(e.text());});
 const failures=[];page.on('response',r=>{if(r.status()>=400)failures.push([r.url(),r.status()]);});
 await page.goto('http://localhost:4698/prototype.html',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:out+'/AFTER_1440.png'});
 const geometry=await page.evaluate(()=>{const el=document.querySelector('.man-motion');return {top:el.offsetTop,range:el.offsetHeight-document.querySelector('.man-motion-stage').clientHeight};});
 for(const [name,p] of [['SCATTER',0],['SLOGAN',.32],['ASSEMBLED',.94]]){
 await page.evaluate(({top,range,p})=>scrollTo(0,top+range*p),{...geometry,p});await page.waitForTimeout(120);
 await page.screenshot({path:out+'/'+name+'_1440.png'});
 }
 const assembled=await page.evaluate(()=>({progress:document.querySelector('.man-motion').dataset.progress,rects:[...document.querySelectorAll('.man-motion-card')].map(n=>{const r=n.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};})}));
 await page.evaluate(({top,range})=>scrollTo(0,top+range*.32),geometry);await page.waitForTimeout(80);
 await page.screenshot({path:out+'/REVERSE_SLOGAN_1440.png'});
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.man-motion').scrollIntoViewIfNeeded();
 await page.screenshot({path:out+'/REDUCED_1440.png'});
 const reduced=await page.evaluate(()=>({scrubbed:document.querySelector('.man-motion').classList.contains('is-scrubbed'),transforms:[...document.querySelectorAll('.man-motion-card')].map(n=>getComputedStyle(n).transform)}));
 await page.emulateMedia({reducedMotion:'no-preference'});
 const widths=[];
 for(const w of [390,768,1024,1280,1440]){
 await page.setViewportSize({width:w,height:w===390?844:1000});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(100);
 widths.push(await page.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth-innerWidth,logoTop:document.querySelector('.mc-man-logo').getBoundingClientRect().top})));
 if(w===390){await page.screenshot({path:out+'/AFTER_390.png'});await page.locator('.man-motion').scrollIntoViewIfNeeded();await page.screenshot({path:out+'/STATIC_390.png'});}
 }
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:1440,height:1000}});
 const nojsPage=await nojs.newPage();await nojsPage.goto('http://localhost:4698/prototype.html',{waitUntil:'networkidle'});
 if(await nojsPage.locator('.man-motion-card').count()!==4 || await nojsPage.locator('.man-motion').getAttribute('class')!=='man-motion')throw Error('Static fallback failed');
 await nojs.close();
 fs.writeFileSync(out+'/CHECK.json',JSON.stringify({geometry,assembled,reduced,widths,errors,failures},null,2));
 console.log(JSON.stringify({geometry,reduced,widths,errors,failures}));
 if(errors.length||failures.length||widths.some(r=>r.overflow>0)||reduced.scrubbed||reduced.transforms.some(t=>t!=='none'))throw Error('Validation failed');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
