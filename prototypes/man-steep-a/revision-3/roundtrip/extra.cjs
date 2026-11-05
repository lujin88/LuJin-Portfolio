const {chromium}=require('playwright-core');
const fs=require('fs');
(async()=>{
 const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const out=[];const errors=[];
 const snap=p=>p.evaluate(()=>({y:scrollY,p:document.querySelector('.man-motion').dataset.progress,meta:document.querySelector('.mc-meta').getBoundingClientRect().top}));
 const toggle=async(p,value)=>{await p.emulateMedia({reducedMotion:value});await p.waitForFunction(reduce=>(document.querySelector('.man-motion').dataset.progress==='static')===reduce,value==='reduce');await p.waitForTimeout(150)};
 for(const scenario of ['repeated','scroll','scroll_back','resize_back']){
  const p=await b.newPage({viewport:{width:1024,height:768},reducedMotion:'reduce'});
  p.on('pageerror',e=>errors.push(String(e)));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  await p.goto('http://localhost:4848/man-truck-bus',{waitUntil:'load'});await p.waitForTimeout(1000);
  await p.evaluate(()=>scrollTo(0,document.querySelector('.man-motion').getBoundingClientRect().top+scrollY+100));await p.waitForTimeout(200);
  const before=await snap(p);await toggle(p,'no-preference');const mid=await snap(p);
  if(scenario.startsWith('scroll')){await p.mouse.wheel(0,240);await p.waitForTimeout(300);if(scenario==='scroll_back'){await p.evaluate(y=>scrollTo(0,y),mid.y);await p.waitForTimeout(200)}}
  if(scenario==='resize_back'){await p.setViewportSize({width:1440,height:900});await p.waitForTimeout(200);await p.setViewportSize({width:1024,height:768});await p.waitForTimeout(200);await p.evaluate(y=>scrollTo(0,y),mid.y);await p.waitForTimeout(200)}
  const changed=await snap(p);await toggle(p,'reduce');const back=await snap(p);const rounds=[];
  if(scenario==='repeated')for(let i=0;i<4;i++){await toggle(p,'no-preference');await toggle(p,'reduce');rounds.push(await snap(p))}
  const pass=scenario==='repeated'?[back,...rounds].every(s=>Math.abs(s.y-before.y)<1):scenario==='scroll'?Math.abs(back.meta-changed.meta)<1:Math.abs(back.y-before.y)>1;
  out.push({scenario,before,mid,changed,back,rounds,pass});await p.close();
 }
 await b.close();fs.writeFileSync(`${__dirname}/EXTRA.json`,JSON.stringify({out,errors},null,2));if(errors.length||out.some(r=>!r.pass))throw Error('extra regression failed');console.log('4 extra scenarios passed');
})().catch(e=>{console.error(e);process.exit(1)});
