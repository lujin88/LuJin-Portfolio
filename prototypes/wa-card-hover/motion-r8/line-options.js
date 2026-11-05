// Review-only alternatives. Keep the recorded R7 implementation unchanged.
import '../motion-r7/motion.js';

const option = new URL(location.href).searchParams.get('option') === 'B' ? 'B' : 'A';
const card = document.querySelector('[data-word="sun"]');
const rays = [...card.querySelectorAll('.r7-art > g > path')];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const fine = matchMedia('(hover: hover) and (pointer: fine)');
const animations = new Map();
let generation = 0;
const identity = 'translate(0px, 0px)';
document.querySelector('#mode').textContent = option === 'A'
  ? 'Proposal A · rays breathe together · hover Sun'
  : 'Proposal B · staggered outward rays · hover Sun';

function reset() {
  generation++;
  animations.forEach(a => a.cancel());
  animations.clear();
}

function enter(event) {
  if (event.pointerType !== 'mouse' || reduced.matches || !fine.matches || document.hidden) return;
  const starts = rays.map(node => ({transform: getComputedStyle(node).transform, opacity: getComputedStyle(node).opacity}));
  reset();
  rays.forEach((node, i) => {
    const angle = (i * 30 - 90) * Math.PI / 180;
    const outward = `translate(${Math.cos(angle) * 36}px, ${Math.sin(angle) * 36}px)`;
    const frames = option === 'A'
      ? [starts[i], {transform: outward, opacity: .6}, starts[i]]
      : [starts[i], {transform: outward, opacity: .35, offset: .45},
          {transform: identity, opacity: .35, offset: .72}, starts[i]];
    const animation = node.animate(frames, {
      duration: option === 'A' ? 1600 : 1800,
      delay: option === 'A' ? 0 : i * 100,
      iterations: Infinity, easing: 'ease-in-out', fill: 'both'
    });
    animations.set(node, animation);
  });
}

async function leave() {
  const current = rays.map(node => ({transform: getComputedStyle(node).transform, opacity: getComputedStyle(node).opacity}));
  reset();
  const token = generation;
  if (reduced.matches || !fine.matches) return;
  const returns = rays.map((node, i) => {
    const a = node.animate([current[i], {transform: identity, opacity: 1}],
      {duration: 250, easing: 'ease-out', fill: 'forwards'});
    animations.set(node, a);
    return a.finished;
  });
  try { await Promise.all(returns); } catch { return; }
  if (token === generation) reset();
}

card.addEventListener('pointerenter', enter);
card.addEventListener('pointerleave', leave);
reduced.addEventListener('change', reset);
fine.addEventListener('change', reset);
document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
new IntersectionObserver(entries => { if (!entries[0].isIntersecting) reset(); }).observe(card);
window.waR8 = {option, inspect: () => rays.map(node => ({
  transform: getComputedStyle(node).transform,
  opacity: getComputedStyle(node).opacity,
  running: animations.get(node)?.playState === 'running'
}))};
document.documentElement.dataset.r8Ready = 'true';
