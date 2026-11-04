// Restore real-time 30 fps from CDP timestamps; PNG concat demuxer otherwise
// quantizes short frame durations to its default 25 fps time base.
const fs=require('node:fs'),path=require('node:path'),{spawn}=require('node:child_process');
async function encode(dir, video, durationMs, crop){
 const frames=JSON.parse(fs.readFileSync(path.join(dir,'timestamps.json'))),count=Math.round((durationMs/1000+2)*30);
 const args=['-n','-v','error','-f','image2pipe','-framerate','30','-vcodec','png','-i','pipe:0','-an','-vf',`crop=${crop.width}:${crop.height}:${crop.x}:${crop.y}`,'-c:v','libx264','-threads','2','-preset','fast','-crf','0','-pix_fmt','yuv420p','-color_trc','iec61966-2-1','-map_metadata','-1','-fflags','+bitexact','-flags:v','+bitexact','-metadata:s:v','encoder=','-movflags','+faststart',video];
 const process=spawn('ffmpeg',args,{stdio:['pipe','inherit','inherit']});
 const finished=new Promise((resolve,reject)=>{process.on('error',reject);process.on('exit',code=>code===0?resolve():reject(Error(`ffmpeg exit ${code}`)));});
 let j=0;
 for(let i=0;i<count;i++){
  const time=frames[0].time+(i/30)*10;
  while(j+1<frames.length&&frames[j+1].time<=time)j++;
  if(!process.stdin.write(fs.readFileSync(path.join(dir,frames[i>=Math.round(durationMs/1000*30)?frames.length-1:j].name))))await new Promise(resolve=>process.stdin.once('drain',resolve));
 }
 process.stdin.end();await finished;
 return {frames:count,durationSeconds:count/30};
}
module.exports={encode};
