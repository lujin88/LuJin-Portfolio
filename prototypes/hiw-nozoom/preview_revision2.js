// Review adapter only; developer owns production integration.
(() => {
  const stage=document.querySelector('.ad-art-stage');
  const video=stage.querySelector('.hiw-video');
  const arcMask='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1060 654"><rect width="1060" height="654" fill="white"/><path d="M28 193 C190 75 812 72 987 262" fill="none" stroke="black" stroke-width="72" stroke-linecap="round"/><rect x="320" y="0" width="320" height="101" fill="white"/></svg>';
  const style=document.createElement('style');
  style.textContent=`.ai-decides-section .ad-art-stage {mask-image:none;-webkit-mask-image:none;overflow:visible}.ai-decides-section .hiw-video,.ai-decides-section .hiw-r2-still {mask-image:url("data:image/svg+xml,${encodeURIComponent(arcMask)}");-webkit-mask-image:url("data:image/svg+xml,${encodeURIComponent(arcMask)}");mask-mode:luminance;mask-size:100% 100%;mix-blend-mode:lighten}.ai-decides-section .hiw-decide-layer,.hiw-exp-seam__path {display:none!important}.hiw-r2-still{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.ad-art-stage:has(.hiw-video.is-playing) .hiw-r2-still{visibility:hidden}.ai-decides-section .ad-art {opacity:0!important}@media(prefers-reduced-motion:reduce){.hiw-r2-still{visibility:visible!important}}`;
  document.head.append(style);
  const still=document.createElement('img');still.className='hiw-r2-still';still.src='/__hiw_r2_still.png';still.alt='';stage.insertBefore(still,video);
  window.__hiwReview={video,revision:2};
})();
