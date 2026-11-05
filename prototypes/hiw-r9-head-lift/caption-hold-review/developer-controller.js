// How I Work R9 (PR #65, QA 07a9da5) over the static still.
// Lu 2026-11-04/05: faster (2x, 2 s hold), the picture never fades out, last pose holds, then a hard cut to frame 0.
// The .riv ReviewAutoplay cycle is 12 s: still to 0.9 s, characters then DECIDE + caption appear until 4.6 s, still until
// 8.9 s, then it walks back to the start pose (the old JS fade hid that). JS plays it SPEED x and
// restarts the state machine while it is still, HOLD s after the motion ends, so the walk-back never shows.
// Reduced motion loads no .riv and keeps the still; turning it off again resumes the loop.
(function initHiwR9(){
 if(window.__hiwR9Cleanup)window.__hiwR9Cleanup();
 const stage=document.querySelector('#how-i-work .ad-art-stage');if(!stage)return;
 const layers=stage.querySelector('.hiw-plays'),plane=layers.querySelector('.hiw-plane'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const base='/assets/motion/how-i-work/r9/';
 const SPEED=2,HOLD=2,MOTION_END=4.6,RESTART=Math.min(MOTION_END+HOLD*SPEED,8.8);
 const state=window.hiwR9={ready:false,started:false,failed:false,paced:false,plays:0,cycles:0,events:[],errors:[],players:[],speed:SPEED,restartAt:RESTART};
 let visible=false,disposed=false,loading=false;
 const events=new AbortController();
 // Players pause together; Bear's clock restarts all three, so they stay aligned each loop.
 function still(){fallbackStop();state.players.forEach(p=>p.pause());layers.classList.remove('is-playing');stage.classList.remove('r7-running');}
 function update(){if(disposed)return;if(!stage.isConnected){cleanup();return;}if(state.failed)return;if(reduce.matches){still();return;}if(!visible||document.hidden){fallbackStop();state.players.forEach(p=>p.pause());return;}if(!state.ready){load();return;}if(!state.started){state.started=true;state.plays++;}layers.classList.add('is-playing');stage.classList.add('r7-running');state.players.forEach(p=>p.play('ReviewAutoplay'));if(!fbTimer){fbLast=performance.now();fbTimer=setInterval(fallbackTick,100);}}
 // Rive 2.32 (vendored, public/assets/vendor/rive) has no speed option: scale the clock its rAF loop hands to draw
 // (the private this._boundDraw). rivT is the machine's own time; Bear restarts every player once it reaches RESTART.
 // If a Rive update drops or stops calling _boundDraw, state.paced stays false and the wall-clock fallback
 // loops at 1x instead (restart MOTION_END+HOLD s into each cycle), so the walk-back still never shows.
 function pace(player,lead){const draw=player._boundDraw;if(typeof draw!=='function')return;let last=0,v=0;player.rivT=0;player._boundDraw=function(time,onSecond){if(!player.lastRenderTime||!last){last=time;v=v||time;}const dt=(time-last)*SPEED;last=time;v+=dt;const sm=player.animator&&player.animator.stateMachines[0];if(sm&&sm.playing&&player.lastRenderTime){player.rivT+=dt/1000;if(lead&&dt>0)state.paced=true;}draw(v,onSecond);if(lead&&player.rivT>=RESTART&&!disposed)restart();};}
 let fbT=0,fbLast=0,fbTimer=0;
 function fallbackTick(){const now=performance.now();if(!state.paced){fbT+=(now-fbLast)/1000;if(fbT>=MOTION_END+HOLD)restart();}fbLast=now;}
 function fallbackStop(){clearInterval(fbTimer);fbTimer=0;}
 function restart(){fbT=0;state.players.forEach(p=>{p.stop('ReviewAutoplay');p.rivT=0;p.play('ReviewAutoplay');});state.cycles++;}
 async function load(){if(loading||disposed)return;loading=true;rive.RuntimeLoader.setWasmUrl('/assets/vendor/rive/rive.wasm');try{for(const name of ['bear','rabbit','fox']){if(disposed)return;const canvas=document.createElement('canvas');canvas.width=1842;canvas.height=854;plane.append(canvas);await new Promise((resolve,reject)=>{const player=new rive.Rive({src:base+name+'.riv',canvas,autoplay:false,stateMachines:'ReviewAutoplay',layout:new rive.Layout({fit:rive.Fit.Contain}),onLoad:()=>{if(disposed){player.cleanup();resolve();return;}player.on(rive.EventType.RiveEvent,e=>{if(e.data.name==='playback-complete')state.events.push(name);});pace(player,name==='bear');resolve();},onLoadError:reject});state.players.push(player);});}if(!disposed){state.ready=true;update();}}catch(e){state.errors.push(String(e));state.failed=true;still();}}
 const observer=new IntersectionObserver(es=>{visible=es[es.length-1].intersectionRatio>=.3;update();},{threshold:[0,.3]});
 function restore(e){if(e.persisted)initHiwR9();}
 function cleanup(e){disposed=true;fallbackStop();observer.disconnect();events.abort();reduce.removeEventListener('change',update);state.players.forEach(p=>p.cleanup());plane.replaceChildren();layers.classList.remove('is-playing');stage.classList.remove('r7-running');if(!e||!e.persisted)window.removeEventListener('pageshow',restore);}
 observer.observe(stage);reduce.addEventListener('change',update);document.addEventListener('visibilitychange',update,{signal:events.signal});window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});window.addEventListener('pageshow',restore);window.__hiwR9Cleanup=cleanup;
})();
