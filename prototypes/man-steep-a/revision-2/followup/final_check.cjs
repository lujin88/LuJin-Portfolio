const fs=require('fs');const {chromium}=require('/Users/lu/.buzz/.scratch/tl-1104/node_modules/playwright-core');
(async()=>{const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});const rows=[];
try {for(const v of ['A','B'])for(const [w,h] of [[1440,900],[1440,1000],[1024,768],[390,844]]){
 const p=await b.newPage({viewport:{width:w,height:h}}),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await p.goto('http://localhost:4822/'+(v==='A'?'man-truck-bus':'man-review-b'),{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForFunction(()=>document.querySelector('.man-motion')?.dataset.progress);
 const data=await p.evaluate(()=>{const s=document.querySelector('.man-motion'),st=s.querySelector('.man-motion-stage'),sc=s.querySelector('.man-motion-scene'),range=s.offsetHeight-st.clientHeight;return {scene:sc.getBoundingClientRect().height,range,top:s.getBoundingClientRect().top+scrollY,static:s.dataset.progress==='static'}});
 if(data.static)await p.evaluate(()=>document.querySelector('.man-motion-note').scrollIntoView({block:'center'}));else await p.evaluate(y=>scrollTo(0,y),data.top+data.range+Math.round(h*.45));await p.waitForTimeout(150);
 const at=await p.evaluate(()=>({metaTop:Math.round(document.querySelector('.mc-meta').getBoundingClientRect().top),progress:document.querySelector('.man-motion').dataset.progress}));
 await p.screenshot({path:__dirname+'/'+v+`/final_${w}x${h}.png`});rows.push({v,w,h,...data,...at,errors});await p.close();if(errors.length)throw Error(errors.join('\n'));
 }}finally{await b.close();fs.writeFileSync(__dirname+'/FINAL_CHECK.json',JSON.stringify(rows,null,2))}
})().catch(e=>{console.error(e);process.exitCode=1});
