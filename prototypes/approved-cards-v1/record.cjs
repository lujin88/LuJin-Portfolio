const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),{spawn}=require('child_process'),{once}=require('events');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const sharp=require(process.env.SHARP_MODULE || 'sharp');
const source=path.join(__dirname,'PREVIEW.html');
const out=process.argv[2]; if(!out)throw new Error('Pass a new output directory');fs.mkdirSync(out,{recursive:true});const checks={};
async function raw(buffer){return sharp(buffer).removeAlpha().raw().toBuffer();}
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--allow-file-access-from-files','--renderer-process-limit=1']});try{
for(const scene of ['solar','solar448','dolphin']){
 const solar=scene.startsWith('solar');
 const viewport=scene==='solar'?{width:864,height:540}:scene==='solar448'?{width:448,height:280}:{width:864,height:600};
 const context=await browser.newContext({viewport,deviceScaleFactor:1});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('file://'+source+'?capture&scene='+(solar?'solar':'dolphin'));await page.waitForFunction(()=>window.review);
 const duration=await page.evaluate(()=>review.duration);
 async function shot(t,name){const result=await page.evaluate(t=>{const state=review.setTime(t);return {state,url:document.querySelector('canvas').toDataURL()};},t);const png=Buffer.from(result.url.split(',')[1],'base64');if(name)fs.writeFileSync(path.join(out,scene+'_'+name+'.png'),png);return {png,raw:await raw(png),state:result.state};}
 const first=await shot(0,'FIRST'),last=await shot(duration-1/24,'LAST'),hold=await shot(duration-2,'HOLD_START'),seam=await shot(duration,'RESTART'),peak=await shot(solar?3:1.18,'MOUTH');
 for(const [name,s] of Object.entries({last,hold,seam}))assert.equal(Buffer.compare(first.raw,s.raw),0,name);
 assert.notEqual(Buffer.compare(first.raw,peak.raw),0,'motion exists');
 if(scene==='dolphin'){await shot(4.18,'FR');await shot(7.18,'DE');}
 checks[scene]={viewport,duration,firstLastMaxDifference:0,holdSeconds:2,seamMaxDifference:0,errors};
 await page.emulateMedia({reducedMotion:'reduce'});const reduced=await shot(4,'REDUCED');assert.equal(Buffer.compare(first.raw,reduced.raw),0);checks[scene].reducedExact=true;
 await page.emulateMedia({reducedMotion:'no-preference'});
 const target=path.join(out,scene+'_NORMAL.mp4');const enc=spawn('/opt/homebrew/bin/ffmpeg',['-v','error','-threads','2','-f','image2pipe','-framerate','24','-i','-','-an','-c:v','libx264','-threads','2','-preset','fast','-crf','17','-vf','scale=in_range=full:out_range=tv:out_color_matrix=bt709:flags=accurate_rnd+full_chroma_int,format=yuv420p,setparams=color_primaries=bt709:color_trc=iec61966-2-1:colorspace=bt709:range=tv','-color_range','tv','-colorspace','bt709','-color_primaries','bt709','-color_trc','iec61966-2-1','-force_key_frames',`expr:eq(n,0)+eq(n,${(duration-2)*24})`,'-x264-params','keyint=9999:min-keyint=1:scenecut=0','-pix_fmt','yuv420p','-movflags','+faststart+write_colr','-map_metadata','-1',target]);
 let err='';enc.stderr.on('data',d=>err+=d);const done=once(enc,'close');
 for(let frame=0;frame<duration*24;frame++){
  const {png,raw:bytes}=await shot(frame/24);
  if(frame>=(duration-2)*24)assert.equal(Buffer.compare(first.raw,bytes),0,'hold frame');
  if(!enc.stdin.write(png))await once(enc.stdin,'drain');
 }
 enc.stdin.end();const [code]=await done;assert.equal(code,0,err);
 checks[scene].checkedFrames=duration*24;checks[scene].all48HoldFramesExact=true;
 await context.close();console.log(scene,JSON.stringify(checks[scene]));
}
fs.writeFileSync(path.join(out,'CHECKS.json'),JSON.stringify(checks,null,2));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
