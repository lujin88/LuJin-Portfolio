// ad79: probe the hidden .man-motion-scene used for stage height (R3 follow-up 819376b).
// Per viewport: scene height vs CSS formula vs board.offsetTop/.38 (old source), range, a11y tree, scroll-height impact.
// Then: fonts blocked vs loaded (same transform at same scroll), live resize vs fresh load, keyframe samples.
const { chromium } = require('playwright-core');
const [,,port,mode]=process.argv;
const exe='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL=`http://localhost:${port}${process.env.MAN_ROUTE || "/man-truck-bus"}`;
const probe=()=>{const s=document.querySelector('.man-motion');const sc=s.querySelector('.man-motion-scene');const st=s.querySelector('.man-motion-stage');const bd=s.querySelector('.man-motion-board');
 const cs=getComputedStyle(sc);const r=sc.getBoundingClientRect();
 return {inner:[innerWidth,innerHeight],scrubbed:s.classList.contains('is-scrubbed'),sceneH:r.height,sceneW:r.width,sceneDisplay:cs.display,sceneVis:cs.visibility,ariaHidden:sc.getAttribute('aria-hidden'),
  formula:Math.min(1000,Math.max(680,innerHeight)),boardTopOver38:bd.offsetTop/.38,stageH:st.offsetHeight,range:s.offsetHeight-st.offsetHeight,secH:s.offsetHeight,docH:document.documentElement.scrollHeight,
  fontsStatus:document.fonts.status}};
const cardT=()=>[...document.querySelectorAll('.man-motion-card')].map(c=>c.style.transform);
async function at(p,top,range,frac){await p.evaluate(y=>scrollTo(0,y),Math.round(top+range*frac));await p.waitForTimeout(250);return p.evaluate(()=>({p:document.querySelector('.man-motion').dataset.progress,t:[...document.querySelectorAll('.man-motion-card')].map(c=>c.style.transform),fin:document.querySelector('.man-motion-final').style.opacity,board:document.querySelector('.man-motion-board').style.opacity,note:document.querySelector('.man-motion-note').style.opacity,slogan:(document.querySelector('.man-motion-slogan')||{}).style?.opacity??null}))}
(async()=>{
 const b=await chromium.launch({executablePath:exe});const out={};
 const errs=[];
 const open=async(w,h,opts={})=>{const ctx=await b.newContext({viewport:{width:w,height:h},reducedMotion:'no-preference'});const p=await ctx.newPage();
  p.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,200))});p.on('pageerror',e=>errs.push(String(e).slice(0,200)));
  if(opts.blockFonts)await p.route(/\.(woff2?|ttf|otf)(\?|$)/,r=>r.abort());
  await p.goto(URL,{waitUntil:'load',timeout:180000});await p.waitForTimeout(1000);return {ctx,p}};
 // 1. per-viewport geometry + keyframe samples + a11y + scroll-height impact
 out.vp={};
 for(const [w,h] of [[1440,900],[1440,1000],[1024,768],[1280,600],[1920,1200],[1001,800],[1000,800],[390,844]]){
  const {ctx,p}=await open(w,h);const g=await p.evaluate(probe);
  const top=await p.evaluate(()=>document.querySelector('.man-motion').getBoundingClientRect().top+scrollY);
  // scroll-height impact: hide scene and compare docH and section height
  const noScene=await p.evaluate(()=>{const sc=document.querySelector('.man-motion-scene');const a=[document.documentElement.scrollHeight,document.querySelector('.man-motion').offsetHeight];sc.style.setProperty('display','none','important');const b=[document.documentElement.scrollHeight,document.querySelector('.man-motion').offsetHeight];sc.style.removeProperty('display');return {with:a,without:b}});
  const cdp=await ctx.newCDPSession(p);const ax=await cdp.send('Accessibility.getFullAXTree');
  const sceneInAx=await p.evaluate(()=>{const sc=document.querySelector('.man-motion-scene');return !!sc});
  const be=await cdp.send('DOM.getDocument',{depth:-1});const q=await cdp.send('DOM.querySelector',{nodeId:be.root.nodeId,selector:'.man-motion-scene'});
  const axn=await cdp.send('Accessibility.getPartialAXTree',{nodeId:q.nodeId,fetchRelatives:false});
  const samples={};if(g.scrubbed)for(const f of [0,.25,.5,.75,.9,1])samples[f]=await at(p,top,g.range,f);
  out.vp[`${w}x${h}`]={...g,top,noScene,sceneAx:axn.nodes.map(n=>({role:n.role?.value,ignored:n.ignored,name:n.name?.value})),samples};
  await ctx.close();
 }
 // 2. fonts blocked vs loaded at 1440x900, same scroll fraction
 const fl={};
 for(const blk of [false,true]){const {ctx,p}=await open(1440,900,{blockFonts:blk});const g=await p.evaluate(probe);const top=await p.evaluate(()=>document.querySelector('.man-motion').getBoundingClientRect().top+scrollY);
  fl[blk?'blocked':'loaded']={fonts:g.fontsStatus,sceneH:g.sceneH,stageH:g.stageH,range:g.range,top,s50:await at(p,top,g.range,.5),s90:await at(p,top,g.range,.9)};await ctx.close();}
 out.fonts=fl;
 // 3. live resize mid-scroll: 1440x900 -> 1440x1000 -> 1024x768 -> 1440x900, compare to fresh load at same fraction
 const rz=[];{const {ctx,p}=await open(1440,900);
  for(const [w,h] of [[1440,1000],[1024,768],[1440,700],[1440,900]]){await p.setViewportSize({width:w,height:h});await p.waitForTimeout(600);
   const g=await p.evaluate(probe);const top=await p.evaluate(()=>document.querySelector('.man-motion').getBoundingClientRect().top+scrollY);const live=await at(p,top,g.range,.5);
   const f=await open(w,h);const g2=await f.p.evaluate(probe);const top2=await f.p.evaluate(()=>document.querySelector('.man-motion').getBoundingClientRect().top+scrollY);const fresh=await at(f.p,top2,g2.range,.5);await f.ctx.close();
   rz.push({vp:`${w}x${h}`,live:{sceneH:g.sceneH,range:g.range,p:live.p,t0:live.t[0]},fresh:{sceneH:g2.sceneH,range:g2.range,p:fresh.p,t0:fresh.t[0]},sameTransforms:JSON.stringify(live.t)===JSON.stringify(fresh.t)});}
  await ctx.close();}
 out.resize=rz;out.errs=errs;
 console.log(JSON.stringify(out));await b.close();
})().catch(e=>{console.log(JSON.stringify({fatal:String(e).slice(0,400)}));process.exit(1)});
