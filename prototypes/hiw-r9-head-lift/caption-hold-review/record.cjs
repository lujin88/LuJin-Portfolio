const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const frameQuality=require('./frame-quality.cjs');
const out=process.env.REVIEW_OUT;
async function record(cdp, name) {
  const dir = path.join(out,name); fs.mkdirSync(dir,{recursive:true});
  const frames=[], errors=[];
  const listener = event => {
    try {
      const filename=`frame-${String(frames.length).padStart(6,'0')}.jpg`;
      fs.writeFileSync(path.join(dir,filename),Buffer.from(event.data,'base64'));
      frames.push({filename,time:event.metadata.timestamp});
    } catch(e) { errors.push(e.message); }
    cdp.send('Page.screencastFrameAck',{sessionId:event.sessionId}).catch(e=>errors.push(e.message));
  };
  cdp.on('Page.screencastFrame',listener);
  await cdp.send('Page.startScreencast',{format:'jpeg',quality:92,maxWidth:1440,maxHeight:900,everyNthFrame:1});
  return async (activeWindows=[]) => {
    const end=Date.now()/1000;
    await cdp.send('Page.stopScreencast'); cdp.off('Page.screencastFrame',listener);
    assert.deepEqual(errors,[]); assert.ok(frames.length>=1);
    const list=frames.flatMap((f,i)=>[`file '${f.filename}'`,`duration ${Math.max(.001,(frames[i+1]?.time??end)-f.time).toFixed(6)}`]);
    list.push(`file '${frames.at(-1).filename}'`);
    fs.writeFileSync(path.join(dir,'frames.txt'),list.join('\n')+'\n');
    fs.writeFileSync(path.join(dir,'timestamps.json'),JSON.stringify(frames));
    const quality=frameQuality(frames,activeWindows);
    fs.writeFileSync(path.join(dir,'FRAME_QUALITY.json'),JSON.stringify(quality,null,2));
    execFileSync('ffmpeg',['-n','-threads','1','-f','concat','-safe','0','-i',path.join(dir,'frames.txt'),'-an','-vf','fps=30','-c:v','libx264','-threads','2','-preset','fast','-crf','18','-pix_fmt','yuv420p','-map_metadata','-1','-movflags','+faststart',path.join(out,`${name}.mp4`)],{stdio:'ignore'});
    return {frames:frames.length,method:'Timestamped Chrome screencast',file:`${name}.mp4`,quality};
  };
}
module.exports=record;
