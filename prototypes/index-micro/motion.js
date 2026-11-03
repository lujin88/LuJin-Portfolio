/* Review prototype only. No production page imports this file. */
(() => {
  const params = new URLSearchParams(location.search);
  const scene = params.get('scene') === 'solar' ? 'solar' : 'advisor';
  const article = document.getElementById(scene === 'solar' ? 'omni-model' : 'model-series');
  document.querySelectorAll('article').forEach(el => { el.hidden = el !== article; });
  if (params.has('capture')) document.body.classList.add('capture');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let before = params.has('before');
  let visible = true;
  const animations = [];
  const img = article.querySelector('.home-case-image');
  const layer = document.createElement('div');
  layer.className = 'micro-layer';
  layer.setAttribute('aria-hidden', 'true');
  img.after(layer);
  if (scene === 'advisor') {
    layer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
      <defs><radialGradient id="light"><stop stop-color="#ffe1b3" stop-opacity=".85"/><stop offset=".35" stop-color="#ffd6a1" stop-opacity=".4"/><stop offset="1" stop-color="#ffd6a1" stop-opacity="0"/></radialGradient></defs>
      <g class="micro-light lights-a"><ellipse fill="url(#light)" cx="126" cy="156" rx="19" ry="22"/><ellipse fill="url(#light)" cx="210" cy="187" rx="24" ry="25"/><ellipse fill="url(#light)" cx="552" cy="272" rx="18" ry="28"/></g>
      <g class="micro-light lights-b"><ellipse fill="url(#light)" cx="174" cy="183" rx="18" ry="20"/><ellipse fill="url(#light)" cx="600" cy="164" rx="23" ry="24"/></g>
      <g class="micro-light water"><ellipse fill="url(#light)" cx="210" cy="245" rx="11" ry="54"/><ellipse fill="url(#light)" cx="126" cy="238" rx="9" ry="47"/><ellipse fill="url(#light)" cx="553" cy="330" rx="12" ry="58"/></g>
    </svg>`;
    const recipe = [
      ['.lights-a', [0, .18, .8, .25, 0, 0], [0, .12, .32, .53, .75, 1]],
      ['.lights-b', [0, 0, .65, .15, 0, 0], [0, .2, .44, .62, .75, 1]],
      ['.water', [0, .16, .6, .2, 0, 0], [0, .15, .38, .58, .75, 1]],
    ];
    recipe.forEach(([selector, values, offsets]) => {
      const frames = values.map((opacity, i) => ({opacity, offset: offsets[i],easing:'cubic-bezier(0.77,0,0.175,1)'}));
      const a = layer.querySelector(selector).animate(frames, {duration:8000, iterations:Infinity});
      animations.push(a);
    });
    animations.push(layer.querySelector('.water').animate([
      {transform:'translateY(0)',offset:0}, {transform:'translateY(4px)',offset:.35},
      {transform:'translateY(0)',offset:.75}, {transform:'translateY(0)',offset:1}
    ].map(f=>({...f,easing:'cubic-bezier(0.77,0,0.175,1)'})),{duration:8000,iterations:Infinity}));
  } else {
    layer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
      <defs>
        <clipPath id="panels"><path d="M0 163L132 209L505 359L0 279Z"/></clipPath>
        <clipPath id="pool"><path d="M318 586L649 541L800 549L508 631Z"/></clipPath>
        <linearGradient id="sheen"><stop stop-color="#d2e0ef" stop-opacity="0"/><stop offset=".5" stop-color="#d2e0ef" stop-opacity=".24"/><stop offset="1" stop-color="#d2e0ef" stop-opacity="0"/></linearGradient>
        <radialGradient id="warm"><stop stop-color="#ffdc9e" stop-opacity=".12"/><stop offset="1" stop-color="#ffdc9e" stop-opacity="0"/></radialGradient>
      </defs>
      <g clip-path="url(#panels)"><path class="micro-light sheen" fill="url(#sheen)" d="M-230 0H-110L30 480H-90Z"/></g>
      <g clip-path="url(#pool)"><g class="micro-light ripple" fill="none" stroke="#ead4ad" stroke-width="1.3"><path d="M300 598Q460 579 700 578M350 609Q540 582 750 574M300 580Q490 556 740 562"/></g></g>
      <ellipse class="micro-light warmth" fill="url(#warm)" cx="414" cy="476" rx="65" ry="80"/>
    </svg>`;
    function add(selector, frames) {
      animations.push(layer.querySelector(selector).animate(frames.map(f=>({...f,easing:'cubic-bezier(0.77,0,0.175,1)'})),{duration:8000,iterations:Infinity}));
    }
    add('.sheen',[
      {opacity:0,transform:'translateX(0)',offset:0},
      {opacity:1,transform:'translateX(200px)',offset:.15},
      {opacity:1,transform:'translateX(620px)',offset:.5},
      {opacity:0,transform:'translateX(850px)',offset:.7},
      {opacity:0,transform:'translateX(0)',offset:.75},
      {opacity:0,transform:'translateX(0)',offset:1}
    ]);
    add('.ripple',[
      {opacity:0,transform:'translateY(0)',offset:0},
      {opacity:.38,transform:'translateY(3px)',offset:.25},
      {opacity:.25,transform:'translateY(6px)',offset:.5},
      {opacity:0,transform:'translateY(9px)',offset:.7},
      {opacity:0,transform:'translateY(0)',offset:.75},
      {opacity:0,transform:'translateY(0)',offset:1}
    ]);
    add('.warmth',[{opacity:0,offset:0},{opacity:.7,offset:.35},{opacity:0,offset:.75},{opacity:0,offset:1}]);
  }
  function fit() {
    const svg = layer.querySelector('svg');
    if (!svg) return;
    const r = img.getBoundingClientRect(), scale = Math.max(r.width/1280,r.height/720);
    Object.assign(svg.style,{width:1280*scale+'px',height:720*scale+'px',left:(r.width-1280*scale)*.35+'px',top:(r.height-720*scale)/2+'px'});
  }
  function update() {
    const active = !before && !reduced.matches && !document.hidden && visible;
    layer.style.display = before || reduced.matches ? 'none' : '';
    if(scene==='solar')img.src=before?'assets/SOLAR_BEFORE.jpg':'assets/SOLAR_AFTER.png';
    animations.forEach(a => active ? a.play() : a.pause());
  }
  window.micro = {animations,scene,setTime(ms){animations.forEach(a=>{a.pause();a.currentTime=ms;});},replay(){animations.forEach(a=>{a.currentTime=0;});update();},setBefore(value){before=value;update();}};
  document.getElementById('toggle').onclick=()=>{before=!before;update();};
  document.getElementById('replay').onclick=()=>window.micro.replay();
  reduced.addEventListener('change',update);
  document.addEventListener('visibilitychange',update);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();}).observe(article);
  new ResizeObserver(fit).observe(img);
  fit();update();
})();
