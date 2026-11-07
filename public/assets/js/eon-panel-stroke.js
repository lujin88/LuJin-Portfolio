/* E.ON home card: panel-array outline drawn over the card video.
   Driven by the video's currentTime (no own timer), so it pauses, resumes
   and loops with the clip. Coordinates are B_EXT.png pixels (3060x2126);
   the SVG uses the same bottom-left cover crop as the video.
   Timeline (s): outline 0.5-1.7, columns 1.7-3.2, brighten 3.2-3.6,
   hold to 3.9, back to the plain clip by 4.5. 4.5-7.04 stays still. */
(function initEonPanelStroke(){
 var svg=document.querySelector('#omni-model .eon-panel-stroke');
 if(!svg||svg.__eonStroke)return;svg.__eonStroke=true;
 var video=svg.parentElement&&svg.parentElement.querySelector('video');if(!video)return;
 var NS='http://www.w3.org/2000/svg';
 // Measured on B.png (rectified grid fit, median residual <0.5px), y + 976.
 var V=[[[449.1,1066.8],[796.2,1520.9]],[[606.7,1106.5],[947.5,1536.9]],[[747.0,1141.9],[1083.3,1551.3]],[[874.6,1174.1],[1204.9,1564.1]],[[990.8,1203.4],[1314.1,1575.7]],[[1096.9,1230.1],[1413.3,1586.2]],[[1193.1,1254.4],[1504.7,1595.8]],[[1280.8,1276.5],[1588.2,1604.7]]];
 var H=[[[449.1,1066.8],[1280.8,1276.5]],[[530.8,1173.7],[1351.4,1351.9]],[[616.1,1285.3],[1426.0,1431.5]],[[704.7,1401.2],[1504.6,1515.4]],[[796.2,1520.9],[1588.2,1604.7]]];
 function meet(a,b){var x1=a[0][0],y1=a[0][1],x2=a[1][0],y2=a[1][1],x3=b[0][0],y3=b[0][1],x4=b[1][0],y4=b[1][1];var d=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);var t=((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/d;return [x1+t*(x2-x1),y1+t*(y2-y1)];}
 var cols=V.length-1;
 // grid[k][j]: row line k meets column line j
 var grid=H.map(function(h){return V.map(function(v){return meet(h,v);});});
 var ring=[grid[0][0],grid[0][cols],grid[H.length-1][cols],grid[H.length-1][0],grid[0][0]];
 var lens=[],total=0;for(var i=0;i<4;i++){var l=Math.hypot(ring[i+1][0]-ring[i][0],ring[i+1][1]-ring[i][1]);lens.push(l);total+=l;}
 function el(name,attrs){var e=document.createElementNS(NS,name);for(var k in attrs)e.setAttribute(k,attrs[k]);svg.appendChild(e);return e;}
 function pts(list){return list.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' ');}
 var fill=el('polygon',{'class':'eon-stroke-fill',points:pts(ring.slice(0,4))});
 var lines=el('g',{'class':'eon-stroke-lines'});
 function child(name,attrs){var e=document.createElementNS(NS,name);for(var k in attrs)e.setAttribute(k,attrs[k]);e.setAttribute('vector-effect','non-scaling-stroke');lines.appendChild(e);return e;}
 var outline=child('polyline',{points:''});
 var rows=[];for(var k=1;k<H.length-1;k++)rows.push({k:k,el:child('polyline',{points:''})});
 var verts=[];for(var j=1;j<cols;j++)verts.push({j:j,el:child('line',{x1:grid[0][j][0],y1:grid[0][j][1],x2:grid[H.length-1][j][0],y2:grid[H.length-1][j][1],opacity:0})});
 var clamp=function(x){return x<0?0:x>1?1:x;};
 var ease=function(x){return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;};
 var lerp=function(a,b,t){return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];};
 function render(t){
  var groupOp=t<0.5||t>=4.5?0:t<3.9?1:1-ease(clamp((t-3.9)/0.6));
  lines.setAttribute('opacity',groupOp.toFixed(3));
  var fillOp=t<3.2?0:t<3.6?ease((t-3.2)/0.4):t<3.9?1:1-ease(clamp((t-3.9)/0.6));
  fill.setAttribute('opacity',(0.16*fillOp).toFixed(3));
  if(groupOp===0){outline.setAttribute('points','');rows.forEach(function(r){r.el.setAttribute('points','');});verts.forEach(function(v){v.el.setAttribute('opacity',0);});return;}
  // 1. outline walks the four edges
  var d=ease(clamp((t-0.5)/1.2))*total,list=[ring[0]];
  for(var i=0;i<4&&d>0;i++){if(d>=lens[i]){list.push(ring[i+1]);d-=lens[i];}else{list.push(lerp(ring[i],ring[i+1],d/lens[i]));d=0;}}
  outline.setAttribute('points',list.length>1?pts(list):'');
  // 2. columns light left to right
  var s=clamp((t-1.7)/1.5)*cols,full=Math.floor(s),frac=s-full;
  rows.forEach(function(r){var g=grid[r.k];if(s<=0){r.el.setAttribute('points','');return;}var l=g.slice(0,Math.min(full,cols)+1);if(full<cols)l.push(lerp(g[full],g[full+1],frac));r.el.setAttribute('points',pts(l));});
  verts.forEach(function(v){v.el.setAttribute('opacity',clamp((s-v.j+0.3)/0.3).toFixed(3));});
 }
 var raf=0;
 function tick(){raf=0;render(video.currentTime||0);if(!video.paused&&!video.ended)raf=requestAnimationFrame(tick);}
 function kick(){if(!raf)raf=requestAnimationFrame(tick);}
 ['playing','play','seeked','timeupdate','pause'].forEach(function(e){video.addEventListener(e,kick);});
 render(0);
})();
