const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/Users/lu/.buzz/.scratch/tl-1104/node_modules/playwright-core');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
assert.equal(process.env.TEST_LOCK_HELD,'1');
const out = process.env.REVIEW_OUT || '/Users/lu/.buzz/OUTBOX/WA_HOVER_R6_KEYFRAMES_20261104';
fs.mkdirSync(out,{recursive:true});
const cases = [
  ['church-a','church','Church A · Warm windows','Original glass warms; quatrefoil turns 16°'],
  ['church-b','church','Church B · Bell + fine sound arcs','New vector bell inside the existing tower opening'],
  ['church-c','church','Church C · One dove','New vector dove; architecture stays still'],
  ['hood-01','coat','01 · Raincoat hood folds down','Original hood folds behind the fixed front collar'],
  ['hat-02','hat','02 · Knit hat lifts + pompom tilts','Original red hat rises; pompom tilts separately'],
  ['fish','perch','Fish · Tail stroke','Tail turns 16°; body rises only 1.5 CSS px'],
  ['sun','sun','Sun · Rays appear','New fine rays; original sun and shadow remain fixed'],
  ['rain','rain','Rain · Drops fall','Original drops move independently; cloud stays still']
];
const uri = file => 'data:image/png;base64,'+fs.readFileSync(file).toString('base64');
(async()=>{
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 try {
  const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/preview.js',r=>r.fulfill({body:'',contentType:'application/javascript'}));
  await page.goto('http://127.0.0.1:4687/scene.html',{waitUntil:'networkidle'});
  await page.evaluate(async()=>{document.querySelector('link[href="motion.css"]').remove();await document.fonts.ready;});
  const palette=await page.evaluate(async()=>{
   const sample=async(name,points)=>{const img=new Image();img.src=`assets/vocab-${name}.webp`;await img.decode();const c=document.createElement('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;const ctx=c.getContext('2d');ctx.drawImage(img,0,0);return points.map(([x,y])=>({x,y,rgba:Array.from(ctx.getImageData(x,y,1,1).data)}));};
   return {sun:await sample('sun',[[740,470],[800,600]]),church:await sample('church',[[914,127],[915,76],[915,300],[1000,850],[906,650]]),hat:await sample('hat',[[930,640]])};
  });
  fs.writeFileSync(path.join(out,'PALETTE.json'),JSON.stringify(palette,null,2));
  const boundary=await page.evaluate(async()=>{
   const img=new Image();img.src='assets/vocab-hat.webp';await img.decode();const c=document.createElement('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;const ctx=c.getContext('2d');ctx.drawImage(img,0,0);const {data}=ctx.getImageData(0,0,c.width,c.height);const points=[];
   for(let x=0;x<c.width;x+=2){let last=0;for(let y=0;y<c.height;y++)if(data[(y*c.width+x)*4+3]>=240)last=y;points.push([x,Math.min(last+3,c.height)]);}
   return {threshold:240,padding:3,step:2,points};
  });
  fs.writeFileSync(path.join(out,'HAT_BOUNDARY.json'),JSON.stringify(boundary));
  if(process.env.PREPARE_ONLY==='1')return;
  const records=[];
  for(const [id,word,title,note] of cases){
   const card=page.locator(`[data-word="${word}"]`),img=card.locator('img');
   await card.scrollIntoViewIfNeeded();
   const rect=await card.boundingBox(),art=await img.boundingBox();
   const clip={x:Math.floor(rect.x-16),y:Math.floor(rect.y-24),width:Math.ceil(rect.width+32),height:Math.ceil(rect.height+48)};
   await img.evaluate(async(el,src)=>{el.src=src;await el.decode();},`assets/vocab-${word}.webp`);
   const before=path.join(out,`${id}-still.png`);await page.screenshot({path:before,clip});
   const labelRect=await card.locator('.vocab-row').boundingBox();
   const labelClip={x:Math.ceil(labelRect.x),y:Math.ceil(labelRect.y),width:Math.floor(labelRect.width),height:Math.floor(labelRect.height)};
   const labelBefore=await page.screenshot({clip:labelClip});
   const dims={sun:[1314,1197],rain:[1377,1142],coat:[1312,1199]};
   const regions={sun:[270,1065,750,45],rain:[200,140,1000,530],coat:[230,500,850,540]};
   let fixedClip,fixedBefore;
   if(regions[word]){
    const [w,h]=dims[word],scale=Math.min(art.width/w,art.height/h),[x,y,rw,rh]=regions[word];
    fixedClip={x:Math.ceil(art.x+(art.width-w*scale)/2+x*scale),y:Math.ceil(art.y+(art.height-h*scale)/2+y*scale),width:Math.floor(rw*scale),height:Math.floor(rh*scale)};
    fixedBefore=await page.screenshot({clip:fixedClip});
   }
   await img.evaluate(async(el,{src,word,art})=>{
    const markup=await(await fetch(src)).text();const doc=new DOMParser().parseFromString(markup,'image/svg+xml');const svg=document.importNode(doc.documentElement,true);
    svg.style.cssText=`width:${art.width}px;height:${art.height}px;overflow:visible;grid-area:1/1;min-width:0`;
    // Keep the unchanged native image region in its original rendering path.
    // Otherwise SVG resampling subtly changes the baked shadow at card size.
    const cuts={coat:[1312,1199,450,'top'],sun:[1314,1197,1015,'top'],rain:[1377,1142,690,'bottom']};
    if(cuts[word]){
     const [w,h,y,side]=cuts[word],scale=Math.min(art.width/w,art.height/h),cut=(art.height-h*scale)/2+y*scale;
     el.style.gridArea='1/1';
     if(side==='top'){el.style.clipPath=`inset(${cut}px 0 0 0)`;svg.style.clipPath=`inset(-64px -32px ${art.height-cut}px -32px)`;}
     else{el.style.clipPath=`inset(0 0 ${art.height-cut}px 0)`;svg.style.clipPath=`inset(${cut}px -32px 0 -32px)`;}
    }else{el.style.display='none';svg.style.clipPath='inset(-64px -32px 0 -32px)';}
    el.parentElement.appendChild(svg);await Promise.all(Array.from(svg.querySelectorAll('image')).map(node=>new Promise((resolve,reject)=>{const im=new Image();im.onload=resolve;im.onerror=reject;im.src=node.getAttribute('href');})));
   },{src:`keyframes-r6/${id}-peak.svg`,word,art});
   const after=path.join(out,`${id}-peak.png`);await page.screenshot({path:after,clip});
   assert.deepEqual(await card.boundingBox(),rect);
   const labelAfter=await page.screenshot({clip:labelClip});
   const labelRowIdentical=Buffer.compare(labelAfter,labelBefore)===0;
   if(!labelRowIdentical){fs.writeFileSync(path.join(out,`${id}-row-before.png`),labelBefore);fs.writeFileSync(path.join(out,`${id}-row-after.png`),labelAfter);}
   assert.ok(labelRowIdentical,`${id}: label row pixels changed`);
   const fixedRegionIdentical=fixedBefore?Buffer.compare(fixedBefore,await page.screenshot({clip:fixedClip}))===0:null;
   records.push({id,word,title,note,rect,art,clip,before,after,labelRowIdentical,fixedClip,fixedRegionIdentical});
   await img.evaluate(async(el,src)=>{el.parentElement.querySelector(':scope > svg')?.remove();el.style.display='';el.style.clipPath='';el.style.gridArea='';el.src=src;await el.decode();},`assets/vocab-${word}.webp`);
  }
  assert.deepEqual(errors,[]);
  const font=fs.readFileSync(path.join(__dirname,'../assets/a218039a3287bcfd-s.p.43zbiuwnnoiok.woff2')).toString('base64');
  const css=`@font-face{font-family:Poppins;src:url(data:font/woff2;base64,${font})}*{box-sizing:border-box}body{margin:0;padding:24px;background:#edf3e7;color:#0a0a0a;font:12px Poppins,sans-serif}h1{font-size:19px;margin:0 0 6px}p{margin:0 0 8px;color:#61707a;font-size:11px}.pair{display:flex;gap:16px}figure{margin:0}figcaption{padding:12px 16px 0;font-size:10px;color:#61707a}img{display:block;max-width:none}footer{padding-top:8px;border-top:1px solid #d8d4cb;font-size:10px;color:#61707a}`;
  for(const r of records){
   const html=`<!doctype html><meta charset="utf-8"><style>${css}</style><h1>${r.title}</h1><p>${r.note}</p><div class="pair"><figure><figcaption>STILL</figcaption><img src="${uri(r.before)}"></figure><figure><figcaption>PROPOSED PEAK</figcaption><img src="${uri(r.after)}"></figure></div><footer>1440 viewport · DPR 1 · Native crops, no resizing · Static proposal, timing not reviewed</footer>`;
   fs.writeFileSync(path.join(out,`${r.id}.html`),html);
   await page.setViewportSize({width:48+r.clip.width*2+16,height:420});
   await page.setContent(html);await page.evaluate(()=>document.fonts.ready);
   await page.screenshot({path:path.join(out,`${r.id}-comparison.png`),clip:{x:0,y:0,width:48+r.clip.width*2+16,height:Math.ceil(await page.locator('body').evaluate(el=>el.getBoundingClientRect().height))}});
  }
  fs.writeFileSync(path.join(out,'CAPTURE.json'),JSON.stringify({viewport:{width:1440,height:1000},deviceScaleFactor:1,records,errors,staticOnly:true},null,2));
  console.log(JSON.stringify({out,cases:records.length,errors}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
