const fs=require('fs'),{spawn}=require('child_process');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try {
 const page=await browser.newPage();
 if (!process.argv[2]) throw new Error('Usage: node scripts/export-ca05-hover.cjs /absolute/path/to/v4-faster');
 await page.goto(require('url').pathToFileURL(require('path').join(process.argv[2], 'review.html')).href);
 await page.waitForFunction(()=>window.v3Ready,null,{timeout:120000});
 const dest=require('path').resolve(__dirname,'../public/assets/videos/client-advisory');fs.mkdirSync(dest,{recursive:true});
 for(const id of ['05-01','05-02','05-03']){
 const dims=await page.evaluate(id=>({width:sourceCanvases[id].width,height:sourceCanvases[id].height}),id);
 const output=`${dest}/ca-${id}-hover-v4.mp4`;
 const ff=spawn(process.env.FFMPEG || 'ffmpeg',['-hide_banner','-loglevel','error','-y','-f','image2pipe','-framerate','20','-i','pipe:0','-vf','scale=trunc(iw/2)*2:trunc(ih/2)*2','-c:v','libx264','-crf','14','-pix_fmt','yuv420p','-movflags','+faststart','-an',output]);
 let errors='';ff.stderr.on('data',x=>errors+=x);const done=new Promise((resolve,reject)=>ff.on('close',c=>c?reject(Error(errors)):resolve()));
 for(let i=0;i<87;i++){
 const b64=await page.evaluate(({id,t})=>renderMotion(id,t).toDataURL('image/png').split(',')[1],{id,t:i/20});
 if(!ff.stdin.write(Buffer.from(b64,'base64')))await new Promise(r=>ff.stdin.once('drain',r));
 }
 ff.stdin.end();await done;console.log(id,dims,fs.statSync(output).size);
 }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
