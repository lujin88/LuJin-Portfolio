// Connect the alternating cards using their rendered positions, including wrapping copy.
function drawRibbon(){
 const root=document.querySelector('.panels');let svg=root.querySelector('.flow-ribbon');
 if(!svg){svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('flow-ribbon');svg.setAttribute('aria-hidden','true');root.prepend(svg)}
 const box=root.getBoundingClientRect(),cards=[...root.querySelectorAll('.panel')];
 const points=cards.map((e,i)=>{let r=e.getBoundingClientRect();return {x:i%2?box.width-50:50,y:r.top-box.top+r.height/2}});
 let d=`M ${points[0].x} ${points[0].y}`;
 for(let i=1;i<points.length;i++){let a=points[i-1],b=points[i],mid=(a.y+b.y)/2;d+=` C ${a.x} ${mid}, ${b.x} ${mid}, ${b.x} ${b.y}`}
 svg.setAttribute('viewBox',`0 0 ${box.width} ${box.height}`);svg.innerHTML=`<path d="${d}" fill="none" stroke="currentColor" stroke-width="22"/>`;
}
drawRibbon();window.addEventListener('load',drawRibbon);window.addEventListener('resize',drawRibbon);
