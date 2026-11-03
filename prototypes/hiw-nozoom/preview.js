// Disposable browser review adapter. Developer owns integration into the page.
(() => {
  const video = document.querySelector('.hiw-video');
  const arcMask = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1060 654"><rect width="1060" height="654" fill="white"/><path d="M28 193 C190 75 812 72 987 262" fill="none" stroke="black" stroke-width="72" stroke-linecap="round"/><rect x="320" y="0" width="320" height="101" fill="white"/></svg>';
  const style=document.createElement('style');
  style.textContent=`.ai-decides-section .hiw-video { mask-image:url("data:image/svg+xml,${encodeURIComponent(arcMask)}"); -webkit-mask-image:url("data:image/svg+xml,${encodeURIComponent(arcMask)}"); } .ad-art-stage:has(.hiw-video.is-playing) .hiw-decide-layer {display:none} @media(prefers-reduced-motion:reduce){.hiw-decide-layer{display:block}}`;
  document.head.append(style);
  const path = document.querySelector('.hiw-exp-seam__path');
  const native = path.setAttribute.bind(path);
  function geometry() {
    const art=document.querySelector('.ad-art').getBoundingClientRect();
    const seam=document.querySelector('.hiw-exp-seam').getBoundingClientRect();
    const card=document.querySelector('.exp-content[data-index="0"]');
    const bar=card.querySelector('.exp-content__bar');
    const eye=card.querySelector('.exp-content__eyebrow');
    if(innerWidth<=640)return '';
    const br=bar.getBoundingClientRect();
    const sx=art.left+art.width*.55-seam.left,sy=art.bottom+12-seam.top;
    const ex=br.left+br.width/2-seam.left,ey=card.getBoundingClientRect().top+eye.offsetTop-36-seam.top;
    const dy=Math.max(48,ey-sy);
    return `M ${sx} ${sy} C ${sx-dy*.26} ${sy+dy*.3}, ${ex} ${ey-dy*.42}, ${ex} ${ey}`;
  }
  path.setAttribute=function(name,value){return native(name,name==='d'&&value?geometry():value);};
  if(path.getAttribute('d'))path.setAttribute('d',path.getAttribute('d'));
  window.__hiwReview={geometry,video};
})();
