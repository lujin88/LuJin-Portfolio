(function initAdvisoryOffice(){
 if(window.__advisoryOfficeCleanup) window.__advisoryOfficeCleanup();
 var stage=document.querySelector('.advisory-office');if(!stage)return;
 var video=stage.querySelector('video'),reduce=matchMedia('(prefers-reduced-motion: reduce)'),visible=false,failed=false;
 var events=new AbortController();
 function still(){video.pause();stage.classList.remove('is-playing');}
 function update(){if(!stage.isConnected){cleanup();return;}if(failed||reduce.matches){still();return;}if(!visible||document.hidden){video.pause();return;}if(!video.getAttribute('src'))video.src=video.dataset.src;video.muted=true;var p=video.play();if(p)p.catch(still);}
 var observer=new IntersectionObserver(function(e){visible=e[e.length-1].isIntersecting;update();});
 function restore(e){if(e.persisted)initAdvisoryOffice();}
 function cleanup(e){still();observer.disconnect();events.abort();reduce.removeEventListener('change',update);if(!e||!e.persisted)window.removeEventListener('pageshow',restore);}
 video.addEventListener('playing',function(){if(!reduce.matches&&!failed&&visible&&!document.hidden)stage.classList.add('is-playing');else update();},{signal:events.signal});
 video.addEventListener('error',function(){failed=true;still();},{signal:events.signal});
 document.addEventListener('visibilitychange',update,{signal:events.signal});window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});window.addEventListener('pageshow',restore);reduce.addEventListener('change',update);observer.observe(stage);window.__advisoryOfficeCleanup=cleanup;
})();