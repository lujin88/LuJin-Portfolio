// Weather Aquarium card on /index follows the visitor's local season:
// months 3-5 spring, 6-8 summer, 9-11 autumn, 12-2 winter (getMonth, local
// time, never UTC). Each clip ends on its still, so plain `loop` gives the
// hold + hard cut.
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
  var clips = { spring: false, summer: false, autumn: false, winter: false };
  v.dataset.season = season;
  v.poster = '/assets/images/home-motion/wa-season-' + season + '.webp';
  if (!clips[season]) return;
  var base = '/assets/videos/home/wa-season-' + season;
  v.dataset.src = base + '.mp4';
  // mp4 fails -> try webm once; webm fails too -> drop the source, poster stays.
  v.addEventListener('error', function () {
    if (v.dataset.src === base + '.mp4') {
      v.dataset.src = base + '.webm';
      v.src = v.dataset.src;
      v.play().catch(function () {});
    } else {
      delete v.dataset.src;
      v.removeAttribute('src');
      v.load();
    }
  });
})();
