// Review harness only. Product change is motion.css; existing React playback
// remains owned by PoseButton. This mirrors its current hover/tap presentation.
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const pointer = matchMedia('(hover: hover) and (pointer: fine)');
const poses = [...document.querySelectorAll('.pose')];
function reset(button) {
  const video = button.querySelector('video');
  button.dataset.active = '';
  video.pause();
  video.classList.remove('is-playing');
  button.setAttribute('aria-pressed', 'false');
  if (video.readyState) video.currentTime = 0;
}
function start(button, touch = false) {
  if (reduce.matches) return;
  poses.forEach(other => { if (other !== button) reset(other); });
  const video = button.querySelector('video');
  if (!video.getAttribute('src')) video.src = video.dataset.src;
  video.loop = !touch && poses.indexOf(button) !== 3;
  button.dataset.active = touch ? 'tap' : 'hover';
  video.currentTime = 0;
  video.play().catch(() => reset(button));
}
poses.forEach(button => {
  const video = button.querySelector('video');
  button.addEventListener('pointerenter', e => {
    if (e.pointerType !== 'touch' && pointer.matches) start(button);
  });
  button.addEventListener('pointerleave', e => {
    if (e.pointerType !== 'touch') reset(button);
  });
  button.addEventListener('click', () => { if (!pointer.matches) start(button, true); });
  button.addEventListener('focus', () => { if (pointer.matches) start(button); });
  button.addEventListener('blur', () => reset(button));
  video.addEventListener('playing', () => {
    if (reduce.matches || !button.dataset.active) { reset(button); return; }
    video.classList.add('is-playing');
    button.setAttribute('aria-pressed', 'true');
  });
  video.addEventListener('ended', () => {
    if (button.dataset.active !== 'hover') reset(button);
  });
  video.addEventListener('error', () => reset(button));
});
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) reset(entry.target);
}));
poses.forEach(button => observer.observe(button));
document.addEventListener('visibilitychange', () => {
  if (document.hidden) poses.forEach(reset);
});
function syncPreference() {
  document.querySelector('#mode').textContent = reduce.matches ? 'Reduced motion · original stills' : 'Normal motion';
  if (reduce.matches) poses.forEach(reset);
}
reduce.addEventListener('change', syncPreference);
pointer.addEventListener('change', () => poses.forEach(reset));
syncPreference();
document.querySelectorAll('[data-speak]').forEach(button => {
  button.addEventListener('click', () => {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(button.dataset.speak);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  });
});
if (new URLSearchParams(location.search).has('before')) {
  document.querySelector('link[href="motion.css"]').disabled = true;
  document.querySelector('#mode').textContent = 'Before · existing artwork and labels';
}
