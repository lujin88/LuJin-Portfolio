// Isolated SVG / WAAPI review. No production component or Rive input changes.
// All raster masks and the dove silhouette come from the approved R6 SVGs.
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const fine = matchMedia('(hover: hover) and (pointer: fine)');
const ease = getComputedStyle(document.documentElement).getPropertyValue('--ease').trim() || 'cubic-bezier(.22,1,.36,1)';
const files = { perch: 'fish', church: 'church-c', sun: 'sun', rain: 'rain', coat: 'hood-01', hat: 'hat-02' };
const controllers = [];
const group = (svg, selector) => svg.querySelector(selector);
const clearTransform = node => { node.removeAttribute('transform'); };

async function install(card) {
  const word = card.dataset.word;
  const img = card.querySelector('.vocab-art > img');
  await img.decode();
  let markup = await (await fetch(`keyframes-r6/${files[word]}-peak.svg`)).text();
  // Every inline SVG has a private ID namespace (source, masks, gradients).
  markup = markup.replace(/id="([^"]+)"/g, `id="r7-${word}-$1"`)
    .replace(/href="#([^"]+)"/g, `href="#r7-${word}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#r7-${word}-$1)`);
  const svg = new DOMParser().parseFromString(markup, 'image/svg+xml').documentElement;
  svg.classList.add('r7-art');
  svg.setAttribute('aria-hidden', 'true');
  const parts = {};
  if (word === 'perch') {
    parts.body = group(svg, ':scope > g'); clearTransform(parts.body);
    parts.tail = group(parts.body, ':scope > g'); clearTransform(parts.tail);
    parts.tail.style.transformOrigin = '310px 515px';
  } else if (word === 'sun') {
    svg.querySelector(':scope > use').remove(); // Native sun and shadow never change.
    parts.rays = group(svg, ':scope > g'); parts.rays.setAttribute('opacity', '1');
    parts.rays.style.opacity = '0';
  } else if (word === 'coat') {
    parts.hood = group(svg, ':scope > g'); clearTransform(parts.hood);
  } else if (word === 'hat') {
    parts.body = group(svg, ':scope > g'); clearTransform(parts.body);
    parts.pompom = group(parts.body, ':scope > g'); clearTransform(parts.pompom);
    parts.pompom.style.transformOrigin = '818px 309px';
  } else if (word === 'rain') {
    svg.querySelector(':scope > use').remove(); // Native cloud remains above the cut.
    parts.drops = [...svg.querySelectorAll(':scope > g')];
    parts.drops.forEach(clearTransform);
  } else if (word === 'church') {
    svg.querySelector(':scope > use').remove();
    parts.dove = group(svg, ':scope > g'); clearTransform(parts.dove);
    parts.dove.style.transform = 'translate(953px, 204px) rotate(0deg) scale(1.25)';
    parts.wing = parts.dove.querySelectorAll('path')[1];
    parts.wing.style.transformOrigin = '13px -8px';
  }
  img.parentElement.append(svg);
  const size = () => {
    const rect = img.getBoundingClientRect(), box = img.parentElement.getBoundingClientRect();
    Object.assign(svg.style, {width: `${rect.width}px`, height: `${rect.height}px`, left: `${rect.x-box.x}px`, top: `${rect.y-box.y}px`});
    if (word === 'rain' || word === 'coat') {
      const vb = svg.viewBox.baseVal, scale = Math.min(rect.width / vb.width, rect.height / vb.height);
      const cut = (rect.height - vb.height * scale)/2 + (word === 'rain' ? 690 : 450)*scale;
      card.style.setProperty('--r7-native-cut', word === 'rain' ? `inset(0 0 ${rect.height-cut}px 0)` : `inset(${cut}px 0 0 0)`);
      card.style.setProperty('--r7-layer-cut', word === 'rain' ? `inset(${cut}px -32px -24px -32px)` : `inset(-64px -32px ${rect.height-cut}px -32px)`);
    }
  };
  new ResizeObserver(size).observe(img); size();
  const animations = new Map();
  let hovered = false, generation = 0, emissions = 0, completedFlights = 0;
  const run = (node, keyframes, duration, options = {}) => {
    const old = animations.get(node);
    old?.cancel();
    const anim = node.animate(keyframes, {duration, easing: ease, fill: 'forwards', ...options});
    animations.set(node, anim);
    return anim;
  };
  const retarget = (node, transform, duration) => {
    const current = getComputedStyle(node).transform;
    return run(node, [{transform: current}, {transform}], duration);
  };
  function reset() {
    hovered = false; generation++;
    animations.forEach(a => a.cancel()); animations.clear();
    card.dataset.playing = 'false'; card.dataset.phase = 'idle';
  }
  async function rainBatch(token) {
    let first = true;
    const ys = [0, -75, -25, -130, -90];
    const xs = [-35, 30, 15, -10, 30];
    while (token === generation) {
      const batch = parts.drops.map((node, index) => {
        emissions++;
        return run(node, [
          {transform: `translate(0px, ${first ? 0 : ys[index]}px)`, opacity: first ? 1 : 0, offset: 0},
          {transform: `translate(${xs[index]*.15}px, ${first ? 45 : ys[index]+65}px)`, opacity: 1, offset: .18},
          {transform: `translate(${xs[index]*.85}px, 175px)`, opacity: 1, offset: .76},
          {transform: `translate(${xs[index]}px, 255px)`, opacity: 0, offset: 1}
        ], 1050 + index*85, {easing: 'linear', delay: index*90});
      });
      try { await Promise.all(batch.map(a=>a.finished)); } catch { return; }
      if (token !== generation) return;
      if (!hovered) { reset(); return; }
      first = false;
    }
  }
  function start() {
    if (reduced.matches || !fine.matches || document.hidden || hovered) return;
    // Re-entering during drain keeps the current drops; it does not jump back.
    if (word === 'rain' && card.dataset.phase === 'draining') {
      hovered = true; card.dataset.phase = 'hover'; return;
    }
    hovered = true; const token = ++generation;
    card.dataset.playing = 'true'; card.dataset.phase = 'hover';
    if (word === 'perch') {
      retarget(parts.body, 'translateY(-12px)', 550);
      const from = getComputedStyle(parts.tail).transform;
      run(parts.tail, [{transform: from}, {transform: 'rotate(16deg)'}, {transform: 'rotate(0deg)'}, {transform: 'rotate(-10deg)'}, {transform: from}], 1800, {iterations: Infinity, easing: 'ease-in-out'});
    } else if (word === 'sun') {
      run(parts.rays, [{opacity: getComputedStyle(parts.rays).opacity}, {opacity: .76}], 700);
    } else if (word === 'coat') {
      retarget(parts.hood, 'translateY(326px) scaleY(.26)', 650);
    } else if (word === 'hat') {
      retarget(parts.body, 'translateY(-92px)', 650);
      const from = getComputedStyle(parts.pompom).transform;
      run(parts.pompom, [{transform: from}, {transform: 'rotate(-4deg)'}, {transform: 'rotate(2deg)'}, {transform: 'rotate(-1deg)'}, {transform: 'rotate(0deg)'}], 1150, {easing: 'ease-in-out'});
    } else if (word === 'rain') {
      rainBatch(token);
    } else if (word === 'church') {
      const home = 'translate(953px, 204px) rotate(0deg) scale(1.25)';
      const from = getComputedStyle(parts.dove).transform;
      run(parts.dove, [
        {transform: from, offset: 0},
        {transform: 'translate(1048px, 192px) rotate(-12deg) scale(1.25)', offset: .22},
        {transform: 'translate(1115px, 102px) rotate(-22deg) scale(1.25)', offset: .43},
        {transform: 'translate(1030px, 45px) rotate(-12deg) scale(1.25)', offset: .65},
        {transform: 'translate(964px, 108px) rotate(8deg) scale(1.25)', offset: .82},
        {transform: home, offset: 1}
      ], 2800, {easing: 'ease-in-out'}).finished.then(() => { completedFlights++; }).catch(() => {});
      run(parts.wing, [{transform:'rotate(0deg) scaleY(1)'},{transform:'rotate(-12deg) scaleY(.6)'},{transform:'rotate(0deg) scaleY(1)'}], 560, {iterations:5, easing:'ease-in-out'});
    }
  }
  async function leave() {
    if (!hovered) return;
    hovered = false;
    if (word === 'rain') { card.dataset.phase = 'draining'; return; }
    const token = ++generation;
    card.dataset.phase = 'returning';
    const returning = [];
    if (word === 'perch') {
      returning.push(retarget(parts.body, 'translateY(0px)', 400), retarget(parts.tail, 'rotate(0deg)', 400));
    } else if (word === 'sun') {
      returning.push(run(parts.rays, [{opacity: getComputedStyle(parts.rays).opacity}, {opacity: 0}], 400));
    } else if (word === 'coat') {
      returning.push(retarget(parts.hood, 'translateY(0px) scaleY(1)', 400));
    } else if (word === 'hat') {
      returning.push(retarget(parts.body, 'translateY(0px)', 400), retarget(parts.pompom, 'rotate(0deg)', 400));
    } else if (word === 'church') {
      // Finish the selected closed flight on leave; never teleport to the perch.
      returning.push(animations.get(parts.dove), animations.get(parts.wing));
    }
    try { await Promise.all(returning.filter(Boolean).map(a => a.finished)); } catch { return; }
    if (token === generation && !hovered) reset();
  }
  card.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') start(); });
  card.addEventListener('pointerleave', leave);
  const controller = {word, reset, leave, inspect: () => ({word, hovered, phase:card.dataset.phase || 'idle', emissions, completedFlights,
    transforms: Object.fromEntries(Object.entries(parts).filter(([,n])=>!Array.isArray(n)).map(([key,node])=>[key,getComputedStyle(node).transform])),
    running: [...animations.values()].filter(a=>a.playState==='running').length})};
  controllers.push(controller);
  new IntersectionObserver(entries => { if (!entries[0].isIntersecting) reset(); }).observe(card);
}
function sync() {
  controllers.forEach(c => c.reset());
  document.querySelector('#mode').textContent = reduced.matches ? 'Reduced motion · original stills' : 'R7 · hover to explore';
}
reduced.addEventListener('change', sync);
fine.addEventListener('change', sync);
document.addEventListener('visibilitychange', () => { if (document.hidden) controllers.forEach(c=>c.reset()); });
await Promise.all([...document.querySelectorAll('.vocab-item')].map(install));
sync();
window.waR7 = {inspect: () => controllers.map(c=>c.inspect())};
document.documentElement.dataset.r7Ready = 'true';
