const scene = document.querySelector('.scene');
const track = document.querySelector('.track');
const cursor = document.querySelector('.cursor');
const images = [...scene.querySelectorAll('img')];
const names = ['Spring', 'Summer', 'Autumn', 'Winter'];
let position = 0;
let drag = null;

function render(value) {
  position = Math.max(0, Math.min(1, value));
  const index = Math.min(3, Math.floor(position * 4));
  images.forEach((image, i) => image.classList.toggle('active', i === index));
  cursor.style.transform = `translateX(${position * 100}%)`;
  scene.setAttribute('aria-valuenow', Math.round(position * 100));
  scene.setAttribute('aria-valuetext', names[index]);
}
function update(event) {
  const rect = track.getBoundingClientRect();
  render((event.clientX - rect.left) / rect.width);
}
scene.addEventListener('pointerdown', event => {
  if (!event.isPrimary || event.button !== 0) return;
  drag = { id: event.pointerId, x: event.clientX, y: event.clientY, horizontal: false };
  scene.setPointerCapture(event.pointerId);
});
scene.addEventListener('pointermove', event => {
  if (!drag || event.pointerId !== drag.id) return;
  if (!drag.horizontal) {
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    if (Math.hypot(dx, dy) < 6) return;
    if (Math.abs(dy) > Math.abs(dx)) { drag = null; return; }
    drag.horizontal = true;
  }
  update(event);
});
scene.addEventListener('pointerup', event => {
  if (drag?.id === event.pointerId) update(event);
  drag = null;
  if (scene.hasPointerCapture(event.pointerId)) scene.releasePointerCapture(event.pointerId);
});
scene.addEventListener('pointercancel', () => { drag = null; });
scene.addEventListener('lostpointercapture', () => { drag = null; });
scene.addEventListener('keydown', event => {
  const values = { ArrowRight: position + 1 / 3, ArrowUp: position + 1 / 3,
    ArrowLeft: position - 1 / 3, ArrowDown: position - 1 / 3, Home: 0, End: 1 };
  if (event.key in values) { event.preventDefault(); render(values[event.key]); }
});
