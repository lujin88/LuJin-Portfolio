// Review-only quality gate. 30fps output gives a 33.33ms frame budget.
// Count only declared moving intervals; Chrome can omit unchanged still frames.
module.exports=function frameQuality(frames,windows){
 const budget=1/30,intervals=[];
 for(const [start,end] of windows){
  const times=[start,...frames.map(f=>f.time).filter(t=>t>start&&t<end),end];
  for(let i=1;i<times.length;i++)intervals.push(times[i]-times[i-1]);
 }
 const gaps=intervals.filter(dt=>dt>budget*1.5);
 const missing=intervals.reduce((n,dt)=>n+Math.max(0,Math.round(dt/budget)-1),0);
 const expected=Math.round(windows.reduce((sum,[start,end])=>sum+end-start,0)/budget);
 const dropRate=expected?missing/expected:0;
 const stallRate=intervals.length?gaps.length/intervals.length:0;
 return {targetFps:30,activeWindows:windows,intervals:intervals.length,expected,missing,
  maxGapMs:1000*Math.max(0,...intervals),dropRate,stallRate,
  status:windows.length===0?'static':dropRate>.05||stallRate>.05?'load-affected':'pass'};
};
