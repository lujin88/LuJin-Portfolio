// Review-only replacement for the rejected ray proposals (Scranton #640).
// No generated rays, production wiring, keyboard or touch animation.
const card = document.querySelector('[data-word="sun"]');
const art = card.querySelector('.vocab-art');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const fine = matchMedia('(hover: hover) and (pointer: fine)');
const tokens = getComputedStyle(document.documentElement);
const duration = parseFloat(tokens.getPropertyValue('--duration-interaction')) || 320;
const ease = tokens.getPropertyValue('--ease').trim() || 'cubic-bezier(.22,1,.36,1)';
let motion;
let played = false;
const reset = () => { motion?.cancel(); motion = undefined; };
document.querySelector('#mode').textContent = 'Sun · one small hop · no added rays';
card.addEventListener('pointerenter', event => {
  if (event.pointerType !== 'mouse' || !fine.matches || reduced.matches || document.hidden || played) return;
  played = true;
  reset();
  motion = art.animate([
    {transform: 'translateY(0px)', easing: ease},
    {transform: 'translateY(-6px)', offset: .5, easing: ease},
    {transform: 'translateY(0px)'}
  ], {duration, iterations: 1, fill: 'none'});
});
// Finish the short hop on leave; avoid snapping mid-air. Re-entry never stacks.
card.addEventListener('pointerleave', () => { played = false; });
const stop = () => { reset(); played = false; };
reduced.addEventListener('change', stop);
fine.addEventListener('change', stop);
document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
new IntersectionObserver(entries => { if (!entries[0].isIntersecting) stop(); }).observe(card);
window.waR8 = {inspect: () => ({running: motion?.playState === 'running', transform: getComputedStyle(art).transform, rays:card.querySelectorAll('.r7-art').length})};
document.documentElement.dataset.r8Ready = 'true';
