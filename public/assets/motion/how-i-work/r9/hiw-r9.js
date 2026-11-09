// How I Work R9 B proposal: 320 frames at 60 fps; final pose holds for 2 seconds.
// Reduced motion loads no .riv and keeps the still; turning it off again resumes the loop.
(function initHiwR9(){
 if(window.__hiwR9Cleanup)window.__hiwR9Cleanup();
 const stage=document.querySelector('#how-i-work .ad-art-stage');if(!stage)return;
 const layers=stage.querySelector('.hiw-plays'),plane=layers.querySelector('.hiw-plane'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const base='/assets/motion/how-i-work/r9/';
 const state=window.hiwR9={ready:false,started:false,failed:false,plays:0,errors:[],players:[]};
 let visible=false,disposed=false,loading=false;
 // A shared WAAPI clock keeps all three canvas layers in the same phase.
 const fade=plane.animate([{opacity:1},{opacity:1}],{duration:5333.3333,iterations:Infinity});
 fade.pause();fade.currentTime=0;state.fade=fade;
 const events=new AbortController();
 // Pause the clock offscreen and in reduced motion; never crossfade the artwork.
 function still(){fade.pause();state.players.forEach(p=>p.pause());layers.classList.remove('is-playing');stage.classList.remove('r7-running');}
 function update(){if(disposed)return;if(!stage.isConnected){cleanup();return;}if(state.failed)return;if(reduce.matches){still();return;}if(!visible||document.hidden){fade.pause();state.players.forEach(p=>p.pause());return;}if(!state.ready){load();return;}if(!state.started){state.started=true;state.plays++;}layers.classList.add('is-playing');stage.classList.add('r7-running');fade.play();}
 async function load(){if(loading||disposed)return;loading=true;rive.RuntimeLoader.setWasmUrl('/assets/motion/how-i-work/r9/vendor/rive.wasm');try{for(const name of ['bear','rabbit','fox']){if(disposed)return;const canvas=document.createElement('canvas');canvas.width=1842;canvas.height=854;plane.append(canvas);await new Promise((resolve,reject)=>{const player=new rive.Rive({src:base+name+'.riv',canvas,autoplay:false,stateMachines:'ReviewAutoplay',layout:new rive.Layout({fit:rive.Fit.Contain}),onLoad:()=>{if(disposed){player.cleanup();resolve();return;}resolve();},onLoadError:reject});state.players.push(player);});}// Keep the original caption static above the animated Fox layer. The deployed
 // Rive files differ from the old #68 prototype, so preserve their motion bytes.
 try{const captionImage=new Image();captionImage.src=base+'original.png';await captionImage.decode();
 if(!disposed){const caption=document.createElement('canvas');caption.width=1842;caption.height=854;caption.className='hiw-static-caption';const ctx=caption.getContext('2d');ctx.drawImage(captionImage,1035,126,325,102,1035,126,325,102);plane.append(caption);}}catch(e){state.errors.push('Static caption: '+String(e));}
 if(!disposed){state.players.forEach(p=>{p.stop();p.play('RespondOnce');p.pause('RespondOnce');p.scrub('RespondOnce',0)});state.ready=true;update();}}catch(e){state.errors.push(String(e));state.failed=true;still();}}
 // Poll on the frame that drives Rive as well as listening for media changes.
 // This keeps the shared clock stopped even if a change callback is delayed.
 let lastReduced=reduce.matches;
 let clockRAF=requestAnimationFrame(function tick(){if(disposed)return;if(reduce.matches!==lastReduced){lastReduced=reduce.matches;update();}if(reduce.matches&&fade.playState!=='paused'){still();}if(state.ready&&!reduce.matches&&fade.playState==='running'){const t=(fade.currentTime%5333.3333)/1000;state.players.forEach(p=>p.scrub('RespondOnce',t));}clockRAF=requestAnimationFrame(tick)});
 const observer=new IntersectionObserver(es=>{visible=es[es.length-1].intersectionRatio>=.3;update();},{threshold:[0,.3]});
 function restore(e){if(e.persisted)initHiwR9();}
 function cleanup(e){cancelAnimationFrame(clockRAF);fade.cancel();disposed=true;observer.disconnect();events.abort();reduce.removeEventListener('change',update);state.players.forEach(p=>p.cleanup());plane.replaceChildren();layers.classList.remove('is-playing');stage.classList.remove('r7-running');if(!e||!e.persisted)window.removeEventListener('pageshow',restore);}
 observer.observe(stage);reduce.addEventListener('change',update);document.addEventListener('visibilitychange',update,{signal:events.signal});window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});window.addEventListener('pageshow',restore);window.__hiwR9Cleanup=cleanup;
})();
