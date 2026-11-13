(function initAdvisoryOffice(){
 if(window.__advisoryOfficeCleanup) window.__advisoryOfficeCleanup();
 var all=[];document.querySelectorAll('.advisory-office').forEach(function(stage){all.push(initStage(stage));});
 window.__advisoryOfficeCleanup=function(e){all.forEach(function(c){c(e);});};
 function initStage(stage){
 var video=stage.querySelector('video'),reduce=matchMedia('(prefers-reduced-motion: reduce)'),visible=false,failed=false;
 if(!video)return function(){};
 var playOnce=video&&video.hasAttribute('data-play-once'),finished=false;
 if(playOnce)video.loop=false;
 var events=new AbortController();
 function shown(){return parseFloat(getComputedStyle(stage).opacity)>0;}
 var queued=false;function onScroll(){if(queued)return;queued=true;requestAnimationFrame(function(){requestAnimationFrame(function(){queued=false;update();});});}
 // <source> errors fire on the source, not the video. Listen on the last one only
 // once it has a src (at init after a bfcache restore, else right after update() sets
 // every src and calls load()): WebKit also fires error on
 // src-less sources during the earlier selection pass (currentSrc still empty then).
 // A real "every source failed" has currentSrc = the last URL tried and NETWORK_NO_SOURCE
 // (measured in WebKit, Chrome and Firefox).
 function watchSources(){var last=video.querySelector('source:last-of-type');if(!last)return;last.addEventListener('error',function(){if(!video.currentSrc||video.networkState!==HTMLMediaElement.NETWORK_NO_SOURCE)return;failed=true;still();},{signal:events.signal});}
 function still(){video.pause();stage.classList.remove('is-playing');}
 function update(){if(!stage.isConnected){cleanup();return;}if(failed||reduce.matches){still();return;}if(playOnce&&finished){if(!visible||document.hidden||!shown()){video.pause();return;}stage.classList.add('is-playing');return;}if(!visible||document.hidden||!shown()){video.pause();return;}if(video.dataset.src&&!video.getAttribute('src'))video.src=video.dataset.src;var srcs=video.querySelectorAll('source[data-src]:not([src])');if(srcs.length){srcs.forEach(function(s){s.src=s.dataset.src;});video.load();watchSources();}if(playOnce&&(finished||video.ended))return;video.muted=true;var p=video.play();if(p)p.catch(still);}
 var observer=new IntersectionObserver(function(e){visible=e[e.length-1].isIntersecting;update();});
 function restore(e){if(e.persisted)initAdvisoryOffice();}
 function cleanup(e){still();observer.disconnect();events.abort();reduce.removeEventListener('change',update);if(!e||!e.persisted)window.removeEventListener('pageshow',restore);}
 video.addEventListener('ended',function(){if(playOnce){finished=true;stage.classList.add('is-playing');}},{signal:events.signal});
 video.addEventListener('playing',function(){if(!reduce.matches&&!failed&&visible&&!document.hidden&&shown())stage.classList.add('is-playing');else update();},{signal:events.signal});
 video.addEventListener('error',function(){failed=true;still();},{signal:events.signal});
 document.addEventListener('visibilitychange',update,{signal:events.signal});window.addEventListener('scroll',onScroll,{passive:true,signal:events.signal});window.addEventListener('resize',onScroll,{passive:true,signal:events.signal});window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});window.addEventListener('pageshow',restore);reduce.addEventListener('change',update);if(video.querySelector('source:last-of-type[src]'))watchSources();observer.observe(stage);return cleanup;
 }
})();
