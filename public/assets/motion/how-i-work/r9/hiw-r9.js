// How I Work R9 (PR #65, QA 07a9da5): ordered 12 s loop over the static still.
// Reduced motion loads no .riv and keeps the still; turning it off again resumes the loop.
(function initHiwR9(){
 if(window.__hiwR9Cleanup)window.__hiwR9Cleanup();
 const stage=document.querySelector('#how-i-work .ad-art-stage');if(!stage)return;
 const layers=stage.querySelector('.hiw-plays'),plane=layers.querySelector('.hiw-plane'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const base='/assets/motion/how-i-work/r9/';
 const state=window.hiwR9={ready:false,started:false,failed:false,plays:0,events:[],errors:[],players:[]};
 let visible=false,disposed=false,loading=false;
 // Fade the fully composited illustration once; fading each Rive drawable exposes mattes.
 const fade=plane.animate([{opacity:1,offset:0},{opacity:1,offset:.75,easing:'cubic-bezier(.333333,0,.666667,1)'},{opacity:0,offset:9.5/12},{opacity:0,offset:10.5/12,easing:'cubic-bezier(.333333,0,.666667,1)'},{opacity:1,offset:11/12},{opacity:1,offset:1}],{duration:12000,iterations:Infinity});
 fade.pause();fade.currentTime=0;state.fade=fade;
 const events=new AbortController();
 // Fade and players pause together, so resuming keeps them aligned; the Bear event realigns each loop.
 function still(){fade.pause();state.players.forEach(p=>p.pause());layers.classList.remove('is-playing');stage.classList.remove('r7-running');}
 function update(){if(disposed)return;if(!stage.isConnected){cleanup();return;}if(state.failed)return;if(reduce.matches){still();return;}if(!visible||document.hidden){fade.pause();state.players.forEach(p=>p.pause());return;}if(!state.ready){load();return;}if(!state.started){state.started=true;state.plays++;}layers.classList.add('is-playing');stage.classList.add('r7-running');state.players.forEach(p=>p.play('ReviewAutoplay'));fade.play();}
 async function load(){if(loading||disposed)return;loading=true;rive.RuntimeLoader.setWasmUrl('/assets/vendor/rive/rive.wasm');try{for(const name of ['bear','rabbit','fox']){if(disposed)return;const canvas=document.createElement('canvas');canvas.width=1842;canvas.height=854;plane.append(canvas);await new Promise((resolve,reject)=>{const player=new rive.Rive({src:base+name+'.riv',canvas,autoplay:false,stateMachines:'ReviewAutoplay',layout:new rive.Layout({fit:rive.Fit.Contain}),onLoad:()=>{if(disposed){player.cleanup();resolve();return;}player.on(rive.EventType.RiveEvent,e=>{if(e.data.name==='playback-complete'){if(name==='bear')fade.currentTime=0;state.events.push(name);state.cycles=Math.floor(state.events.length/3);}});resolve();},onLoadError:reject});state.players.push(player);});}if(!disposed){state.ready=true;update();}}catch(e){state.errors.push(String(e));state.failed=true;still();}}
 const observer=new IntersectionObserver(es=>{visible=es[es.length-1].intersectionRatio>=.3;update();},{threshold:[0,.3]});
 function restore(e){if(e.persisted)initHiwR9();}
 function cleanup(e){fade.cancel();disposed=true;observer.disconnect();events.abort();reduce.removeEventListener('change',update);state.players.forEach(p=>p.cleanup());plane.replaceChildren();layers.classList.remove('is-playing');stage.classList.remove('r7-running');if(!e||!e.persisted)window.removeEventListener('pageshow',restore);}
 observer.observe(stage);reduce.addEventListener('change',update);document.addEventListener('visibilitychange',update,{signal:events.signal});window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});window.addEventListener('pageshow',restore);window.__hiwR9Cleanup=cleanup;
})();
