const fs=require('fs');
const sharp=require(process.env.SHARP_PATH||'/Users/lu/Desktop/portfolio_perfect/node_modules/sharp');
const out=process.env.MICRO_OUT||'/Users/lu/.buzz/OUTBOX/INDEX_MICRO_MOTION_20261103';
const scene=(process.argv[2]||'advisor').toUpperCase();
async function load(name){return sharp(out+'/'+name).removeAlpha().raw().toBuffer();}
function diff(a,b,roi){
  let sum=0,max=0,changed=0,roiMax=0;
  for(let i=0;i<a.length;i+=3){let different=false;
    const x=(i/3)%1440,y=Math.floor(i/3/1440);
    for(let k=0;k<3;k++){const d=Math.abs(a[i+k]-b[i+k]);sum+=d;max=Math.max(max,d);different||=d>0;
      if(roi&&x>=roi[0]&&x<roi[2]&&y>=roi[1]&&y<roi[3])roiMax=Math.max(roiMax,d);
    }if(different)changed++;
  }return{mae:sum/a.length,max,changed_pixels:changed,roi_max:roiMax};
}
(async()=>{
  const start=await load(scene+'_AFTER_START_1440.png'),report={};
  for(const t of [3000,6000,7999,8000])report[t]=diff(start,await load(scene+'_AFTER_'+t+'_1440.png'),scene==='ADVISOR'?[280,140,550,450]:null);
  if(fs.existsSync(out+'/'+scene+'_AFTER_2042_1440.png'))report.normal_adjacent_42ms=diff(await load(scene+'_AFTER_2000_1440.png'),await load(scene+'_AFTER_2042_1440.png'));
  report.reduced_vs_loop_baseline=diff(start,await load(scene+'_REDUCED_START_1440.png'));
  if(scene==='ADVISOR')report.reduced_vs_original=diff(await load(scene+'_BEFORE_START_1440.png'),await load(scene+'_REDUCED_START_1440.png'));
  const browser=JSON.parse(fs.readFileSync(out+'/'+scene+'_BROWSER.json','utf8'));
  const reduced=browser.find(r=>r.mode==='reduced').state;
  if(reduced.layerDisplay!=='none'||reduced.animations.some(a=>a.state!=='paused'))throw Error('Reduced motion is not static');
  if([6000,7999,8000].some(t=>report[t].max!==0))throw Error('Seam differs');
  if(scene==='ADVISOR'&&report[3000].roi_max!==0)throw Error('Face ROI changed');
  fs.writeFileSync(out+'/'+scene+'_PIXEL_CHECK.json',JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report));
})().catch(e=>{console.error(e);process.exitCode=1});
