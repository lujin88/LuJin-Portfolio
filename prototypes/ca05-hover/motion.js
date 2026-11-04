// Review-only composition from the approved pixel cutouts; no site integration.
const names=['Surface what matters','Explain with context','Support judgment'];
const layers=[[['01_CHART_CUTOUT.png','chart'],['01_LIGHT_CUTOUT.png','light']],[['02_PANEL_CUTOUT.png','panel']],[['03_BUTTON_01_CUTOUT.png','button1'],['03_BUTTON_02_CUTOUT.png','button2'],['03_BUTTON_03_CUTOUT.png','button3']]];
const grid=document.querySelector('.cards');
names.forEach((name,i)=>{const card=document.createElement('div');card.className='card';card.setAttribute('role','img');card.setAttribute('aria-label',name+' — hover motion preview');card.innerHTML=`<div class="stage"><img class="background" alt="" src="assets/CARD_0${i+1}_BACKGROUND_REPAIRED.png">${layers[i].map(([src,cls])=>`<img class="layer ${cls}" alt="" src="assets/${src}">`).join('')}<img class="original" alt="" src="assets/CARD_0${i+1}_ORIGINAL_NATIVE.png"></div>`;grid.append(card);new ResizeObserver(()=>{card.firstElementChild.style.transform=`scale(${card.clientWidth/448})`}).observe(card)});
const policy=matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
const light=document.querySelector('.light');let activeLight=null;
// Original arc fit from COMPOSE.py, sampled into transform-only WAAPI frames.
const arc=x=>165*(x-320)*(x-370)/5000+134*(x-270)*(x-370)/-2500+118*(x-270)*(x-320)/5000;
function moveLight(enter){const current=getComputedStyle(light).transform;activeLight?.cancel();if(!policy.matches){light.style.transform='none';return}const end=enter?(document.body.dataset.strength==='A'?98:112):0;
const matrix=new DOMMatrix(current==='none'?undefined:current),start=matrix.e,dy=matrix.f,rotation=Math.atan2(matrix.b,matrix.a)*180/Math.PI;
const targetRotation=enter?-33:0;
const frames=Array.from({length:17},(_,i)=>{const t=i/16,dx=start+(end-start)*t;const y=arc(298+dx)-arc(298)+(dy-(arc(298+start)-arc(298)))*(1-t);return{transform:`translate(${dx}px,${y}px) rotate(${rotation+(targetRotation-rotation)*t}deg)`}});
activeLight=light.animate(frames,{duration:enter?520:260,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'});}
const first=grid.firstElementChild;first.addEventListener('pointerenter',()=>moveLight(true));first.addEventListener('pointerleave',()=>moveLight(false));
function updatePolicy(){activeLight?.cancel();light.style.transform='none';document.querySelector('#motion-label').textContent=policy.matches?'Hover each card · Move away to reset':'Static original frames · Motion disabled';}policy.addEventListener('change',updatePolicy);updatePolicy();
document.querySelectorAll('[data-grade]').forEach(button=>button.addEventListener('click',()=>{document.body.dataset.strength=button.dataset.grade;document.querySelector('#grade').textContent=button.dataset.grade==='A'?'A · Medium / 中':'B · Large / 大';document.querySelectorAll('[data-grade]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));activeLight?.cancel();light.style.transform='none'}));
