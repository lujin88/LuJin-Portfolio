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
    // Only existing photo pixels are relit or shifted. The foreground is excluded.
    layer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
      <defs>
        <filter id="relight" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncR type="linear" slope="1.85"/><feFuncG type="linear" slope="1.85"/><feFuncB type="linear" slope="1.85"/></feComponentTransfer></filter>
        <filter id="dim" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncR type="linear" slope=".38"/><feFuncG type="linear" slope=".38"/><feFuncB type="linear" slope=".38"/></feComponentTransfer></filter>
        <filter id="soft"><feGaussianBlur stdDeviation="7"/></filter>
        <mask id="city"><path fill="white" filter="url(#soft)" d="M110 141H140V173H110Z M193 169H225V202H193Z M158 171H189V204H158Z M65 135H88V170H65Z"/></mask>
        <mask id="water"><path fill="white" filter="url(#soft)" d="M82 209H218V238H169V322H82Z M530 310H746V451H634L610 410L530 357Z"/></mask>
      </defs>
      <g mask="url(#city)"><image class="micro-light city-bright" href="assets/ADVISOR_BEFORE.jpg" width="1280" height="720" filter="url(#relight)"/><image class="micro-light city-dim" href="assets/ADVISOR_BEFORE.jpg" width="1280" height="720" filter="url(#dim)"/></g>
      <g mask="url(#water)"><image class="micro-light water" href="assets/ADVISOR_BEFORE.jpg" width="1280" height="720"/></g>
    </svg>`;
    const add=(selector,frames)=>animations.push(layer.querySelector(selector).animate(frames,{duration:8000,iterations:Infinity}));
    add('.city-bright', [{opacity:0,offset:0},{opacity:.9,offset:.075},{opacity:0,offset:.18},{opacity:0,offset:.38},{opacity:.7,offset:.46},{opacity:0,offset:.6},{opacity:0,offset:1}]);
    add('.city-dim', [{opacity:0,offset:0},{opacity:0,offset:.1},{opacity:.85,offset:.24},{opacity:0,offset:.38},{opacity:0,offset:.5},{opacity:.65,offset:.6},{opacity:0,offset:.75},{opacity:0,offset:1}]);
    add('.water', [
      {opacity:0,transform:'translate(-20px,0)',offset:0},
      {opacity:1,transform:'translate(28px,9px)',offset:.085},
      {opacity:.9,transform:'translate(-14px,17px)',offset:.24},
      {opacity:1,transform:'translate(24px,5px)',offset:.4},
      {opacity:.85,transform:'translate(-12px,20px)',offset:.57},
      {opacity:0,transform:'translate(20px,0)',offset:.75},
      {opacity:0,transform:'translate(-20px,0)',offset:1}
    ]);
  } else {
    layer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
      <defs>
        <clipPath id="panels"><path d="M191 351L574 395L660 484L270 463Z"/></clipPath>
        <clipPath id="pool"><path d="M124 619L540 591L614 603L184 650Z"/></clipPath>
        <linearGradient id="sheen"><stop stop-color="#d2e0ef" stop-opacity="0"/><stop offset=".5" stop-color="#d2e0ef" stop-opacity=".48"/><stop offset="1" stop-color="#d2e0ef" stop-opacity="0"/></linearGradient>
        <radialGradient id="warm"><stop stop-color="#ffdc9e" stop-opacity=".3"/><stop offset="1" stop-color="#ffdc9e" stop-opacity="0"/></radialGradient>
      </defs>
      <g clip-path="url(#panels)"><path class="micro-light sheen" fill="url(#sheen)" d="M-230 0H-110L30 480H-90Z"/></g>
      <g clip-path="url(#pool)"><g class="micro-light ripple" fill="none" stroke="#ead4ad" stroke-width="3"><path d="M90 626Q330 594 650 604M120 638Q350 610 650 616M90 612Q330 588 650 592"/></g></g>
      <ellipse class="micro-light warmth" fill="url(#warm)" cx="433" cy="550" rx="160" ry="38"/>
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
      {opacity:.9,transform:'translate(18px,4px)',offset:.25},
      {opacity:.7,transform:'translate(40px,10px)',offset:.5},
      {opacity:0,transform:'translate(65px,18px)',offset:.7},
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
