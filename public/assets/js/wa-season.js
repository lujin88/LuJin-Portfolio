// Weather Aquarium card on /index follows the visitor's local season:
// months 3-5 spring, 6-8 summer, 9-11 autumn, 12-2 winter (getMonth, local
// time, never UTC). Each clip's last frame is cut to match its first, so plain
// `loop` hard-cuts back to the start with no hold.
//
// app/layout.tsx sets <html data-wa-season> inline in <head> on every full
// page load, and CSS paints that season's still behind the empty <video>
// before first paint. This file runs later through the island activator
// (after hydration, and on client-side navigations) and sets poster, and
// data-src for seasons whose clip has shipped; the shared card-video script
// further down home.html plays it. The month mapping below is only a fallback
// and must match WA_SEASON_EARLY in app/layout.tsx.
(function () {
  var root = document.documentElement;
  var season = root.dataset.waSeason;
  if (!season) {
    var m = new Date().getMonth();
    season = m >= 2 && m <= 4 ? 'spring' : m >= 5 && m <= 7 ? 'summer' : m >= 8 && m <= 10 ? 'autumn' : 'winter';
    root.dataset.waSeason = season;
  }
  var v = document.getElementById('wa-season-video');
  if (!v || v.dataset.season) return;
  var clips = { spring: false, summer: false, autumn: true, winter: false };
  v.dataset.season = season;
  v.poster = '/assets/images/home-motion/wa-season-' + season + '.webp';
  if (!clips[season]) return;
  var base = '/assets/videos/home/wa-season-' + season;
  // Same order as <source> webm, then mp4: WebM (VP9) where the browser says it
  // can play it, otherwise the H.264 High 4:2:0 mp4 (Safari / iOS). data-src
  // keeps the shared card script's lazy load; on a decode/network error the
  // next format is tried once, then the source is dropped and the poster stays.
  var webm = v.canPlayType('video/webm; codecs="vp9"') !== '';
  var order = webm ? [base + '.webm', base + '.mp4'] : [base + '.mp4'];
  v.dataset.src = order[0];
  v.addEventListener('error', function () {
    var next = order[order.indexOf(v.dataset.src) + 1];
    if (next) {
      v.dataset.src = next;
      v.src = next;
      v.play().catch(function () {});
    } else {
      delete v.dataset.src;
      v.removeAttribute('src');
      v.load();
    }
  });
})();
