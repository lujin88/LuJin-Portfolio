(() => {
  const section = document.querySelector('.man-motion');
  if (!section) return;
  const stage = section.querySelector('.man-motion-stage');
  const cards = [...section.querySelectorAll('.man-motion-card')];
  const slogan = section.querySelector('.man-motion-slogan');
  const final = section.querySelector('.man-motion-final');
  const board = section.querySelector('.man-motion-board');
  const note = section.querySelector('.man-motion-note');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const wide = matchMedia('(min-width: 1001px)');
  const animated = [...cards,slogan,final,board,note];
  let active = false;
  let scheduled = 0;
  let geometry;
  const clamp = n => Math.max(0,Math.min(1,n));
  // Scroll progress is direct and reversible: no delayed spring or scroll hijacking.
  // The on-screen movement curve is animate's ease-in-out token (.77,0,.175,1).
  function ease(x) {
    let lo=0,hi=1,t=x;
    for(let i=0;i<12;i++) {
      const value=3*(1-t)*(1-t)*t*.77+3*(1-t)*t*t*.175+t*t*t;
      if(value<x)lo=t;else hi=t;
      t=(lo+hi)/2;
    }
    return 3*(1-t)*t*t+t*t*t;
  }
  const between=(p,a,b)=>clamp((p-a)/(b-a));
  function measure() {
    const rect=section.getBoundingClientRect();
    const width=stage.clientWidth;
    const height=stage.clientHeight;
    const scale=Math.min(1,(width-36-36)/1061);
    const sizes=[280,247,330,212];
    const targetX=sizes.map((_,i)=>18+sizes.slice(0,i).reduce((n,v)=>n+v*scale+12,0));
    geometry={top:rect.top+scrollY,range:section.offsetHeight-height,width,height,scale,targetX};
    render();
  }
  function render() {
    scheduled=0;
    if(!active||!geometry)return;
    const {top,range,width,height,scale,targetX}=geometry;
    const p=clamp((scrollY-top)/range);
    const gather=ease(between(p,.43,.82));
    const positions=[
      [0,height*.14,-3],
      [width-280,height*.11,3],
      [width*.08,height*.67,-2],
      [width-250,height*.65,3]
    ];
    cards.forEach((card,i)=>{
      const [x,y,angle]=positions[i];
      const targetY=height*.38+67;
      const shiftX=x+(targetX[i]-x)*gather;
      const shiftY=y+(targetY-y)*gather;
      card.style.transform=`translate3d(${shiftX}px,${shiftY}px,0) rotate(${angle*(1-gather)}deg) scale(${1+(scale-1)*gather})`;
    });
    slogan.style.opacity=String(between(p,.09,.25)*(1-between(p,.40,.53)));
    slogan.style.transform=`translate3d(0,${16*(1-between(p,.09,.25))}px,0)`;
    final.style.opacity=String(between(p,.64,.81));
    board.style.opacity=String(between(p,.72,.86));
    note.style.opacity=String(between(p,.79,.9));
    section.dataset.progress=p.toFixed(4);
  }
  function queue(){if(active&&!scheduled)scheduled=requestAnimationFrame(render);}
  function configure(){
    active=!reduce.matches&&wide.matches;
    section.classList.toggle('is-scrubbed',active);
    if(scheduled)cancelAnimationFrame(scheduled);
    scheduled=0;
    for(const el of animated){el.style.removeProperty('transform');el.style.removeProperty('opacity');}
    if(active)measure();else section.dataset.progress='static';
  }
  addEventListener('scroll',queue,{passive:true});
  addEventListener('resize',()=>active?measure():configure());
  reduce.addEventListener('change',configure);
  wide.addEventListener('change',configure);
  configure();
})();
