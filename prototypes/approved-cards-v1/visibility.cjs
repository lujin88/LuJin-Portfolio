// Native 448px RGB comparison: a pixel changes when max(|dR|,|dG|,|dB|) > threshold.
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const sharp=require(process.env.SHARP_MODULE||'sharp');
const out=process.argv[2];if(!out)throw Error('Pass a fresh output directory');fs.mkdirSync(out,{recursive:true});
function diff(a,b){let gt8=0,gt24=0,gt48=0,max=0,sum=0;for(let i=0;i<a.length;i+=3){let p=0;for(let c=0;c<3;c++){const d=Math.abs(a[i+c]-b[i+c]);p=Math.max(p,d);sum+=d;}gt8+=p>8;gt24+=p>24;gt48+=p>48;max=Math.max(max,p);}return {gt8,gt24,gt48,pct8:100*gt8/(a.length/3),pct24:100*gt24/(a.length/3),max,mae:sum/a.length};}
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--renderer-process-limit=1']});try{
 const page=await browser.newPage({viewport:{width:448,height:280},deviceScaleFactor:1});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4658/PREVIEW.html?capture&scene=solar');await page.waitForFunction(()=>window.review);
 async function shot(t){const url=await page.evaluate(t=>{review.setTime(t);return document.querySelector('canvas').toDataURL()},t);const png=Buffer.from(url.split(',')[1],'base64');return {png,raw:await sharp(png).removeAlpha().raw().toBuffer()};}
 const first=await shot(0);let prev=first,peak=first,peakFrame=0,peakCount=0;const frames=[];
 for(let i=0;i<192;i++){const s=await shot(i/24),d=diff(first.raw,s.raw),adjacent=diff(prev.raw,s.raw);frames.push({frame:i,t:i/24,...d,adjacent});if(d.gt8>peakCount){peakCount=d.gt8;peak=s;peakFrame=i;}if(i>=144)assert.equal(d.max,0,'hold matches original');if(i>0&&i<144)assert(adjacent.max>0,'no frozen active frame '+i);prev=s;}
 const staticRegions={};for(const [name,region]of Object.entries({sky:{left:0,top:0,width:448,height:72},panels:{left:0,top:72,width:150,height:65},window:{left:110,top:159,width:48,height:46}})){const a=await sharp(first.png).extract(region).removeAlpha().raw().toBuffer(),b=await sharp(peak.png).extract(region).removeAlpha().raw().toBuffer();staticRegions[name]=diff(a,b);assert.equal(staticRegions[name].max,0);}
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(diff(first.raw,(await shot(2)).raw).max,0);assert.deepEqual(errors,[]);
 fs.writeFileSync(path.join(out,'solar448_FIRST.png'),first.png);fs.writeFileSync(path.join(out,'solar448_PEAK.png'),peak.png);
 await sharp({create:{width:896,height:280,channels:3,background:'#000'}}).composite([{input:first.png,left:0,top:0},{input:peak.png,left:448,top:0}]).png().toFile(path.join(out,'solar448_FIRST_PEAK.png'));
 const report={method:'448x280 native canvas RGB; max channel absolute difference per pixel; peak selected by >8 count across all 192 frames',peakFrame,peak:frames[peakFrame],staticRegions,activeAdjacentChangedFrames:frames.slice(1,144).filter(x=>x.adjacent.max>0).length,holdFrames:48,reducedExact:true,errors,frames};
 fs.writeFileSync(path.join(out,'VISIBILITY.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({...report,frames:undefined},null,2));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
