// Review-only expanding line ripple, requested by Lu #1131 / PM #1134.
const card=document.querySelector('[data-word="sun"]'),art=card.querySelector('.vocab-art'),poster=art.querySelector('img');
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover: hover) and (pointer: fine)');
const tokens=getComputedStyle(document.documentElement),duration=parseFloat(tokens.getPropertyValue('--duration-reveal')),ease=tokens.getPropertyValue('--ease').trim();
const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
svg.setAttribute('viewBox','0 0 1344 1200');svg.setAttribute('aria-hidden','true');svg.classList.add('sun-ripple');
svg.innerHTML='<circle cx="656" cy="610" r="440" fill="none" stroke="#dda33c" stroke-width="6" style="transform-origin:656px 610px;opacity:0"/>';
art.append(svg);
const css=document.createElement('style');css.textContent='.wa-page .vocab-item[data-word="sun"] .vocab-art{position:relative}.sun-ripple{position:absolute;pointer-events:none;overflow:visible}';document.head.append(css);
function align(){const p=poster.getBoundingClientRect(),a=art.getBoundingClientRect();Object.assign(svg.style,{left:`${p.left-a.left}px`,top:`${p.top-a.top}px`,width:`${p.width}px`,height:`${p.height}px`})}new ResizeObserver(align).observe(poster);poster.addEventListener('load',align);align();
let animation=null;const stop=()=>{animation?.cancel();animation=null};
card.addEventListener('pointerenter',e=>{if(e.pointerType!=='mouse'||!fine.matches||reduced.matches||document.hidden)return;stop();align();animation=svg.firstElementChild.animate([{transform:'scale(1)',opacity:0},{transform:'scale(1.04)',opacity:.65,offset:.15},{transform:'scale(1.25)',opacity:0}],{duration,easing:ease,iterations:Infinity});});
card.addEventListener('pointerleave',stop);reduced.addEventListener('change',stop);fine.addEventListener('change',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});new IntersectionObserver(es=>{if(!es[0].isIntersecting)stop()}).observe(card);
window.waR8={inspect:()=>({running:animation?.playState==='running',core:getComputedStyle(poster).transform,opacity:getComputedStyle(svg.firstElementChild).opacity}),seek:t=>{if(animation){animation.pause();animation.currentTime=t}}};document.querySelector('#mode').textContent='Sun fixed · expanding line ripple while hovered';document.documentElement.dataset.r8Ready='true';
