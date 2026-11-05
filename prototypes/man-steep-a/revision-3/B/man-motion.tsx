'use client'

import { useEffect, useRef } from 'react'
import './man-motion.css'

const fields = [
  { label: 'Departure / commitment', x: 28, width: 258, alt: '10:00 · TGX · 042. Munich to Stuttgart. Original 042, vehicle checked. ETA 12:30. Customer limit 13:00.' },
  { label: 'Blocking this shift', x: 330, width: 225, alt: 'Driver cover needed. No assigned driver.' },
  { label: 'Next action / owner', x: 634, width: 308, alt: 'Next 09:10, in 10 minutes. Contact a candidate and verify full shift. Max H.' },
  { label: 'Contact', x: 966, width: 190, alt: 'Sofia Keller. Not contacted.' },
]

export function ManMotion() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
  if (!sectionRef.current) return;
  const section = sectionRef.current;
  const stage = section.querySelector<HTMLElement>('.man-motion-stage')!;
  const scene = section.querySelector<HTMLElement>('.man-motion-scene')!;
  const cards = [...section.querySelectorAll<HTMLElement>('.man-motion-card')];
  const slogan = section.querySelector<HTMLElement>('.man-motion-slogan')!;
  const final = section.querySelector<HTMLElement>('.man-motion-final')!;
  const board = section.querySelector<HTMLElement>('.man-motion-board')!;
  const note = section.querySelector<HTMLElement>('.man-motion-note')!;
  if (!stage || !scene || !slogan || !final || !board || !note) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const wide = matchMedia('(min-width: 1001px)');
  const animated = [...cards,slogan,final,board,note];
  let active = false;
  let resumeProgress = 0;
  let scheduled = 0;
  let geometry: { top: number; range: number; width: number; height: number; scale: number; targetX: number[] } | undefined;
  let disposed = false;
  const clamp = (n: number) => Math.max(0,Math.min(1,n));
  // Scroll progress is direct and reversible: no delayed spring or scroll hijacking.
  // The on-screen movement curve is animate's ease-in-out token (.77,0,.175,1).
  function ease(x: number) {
    let lo=0,hi=1,t=x;
    for(let i=0;i<12;i++) {
      const value=3*(1-t)*(1-t)*t*.77+3*(1-t)*t*t*.175+t*t*t;
      if(value<x)lo=t;else hi=t;
      t=(lo+hi)/2;
    }
    return 3*(1-t)*t*t+t*t*t;
  }
  const between=(p: number,a: number,b: number)=>clamp((p-a)/(b-a));
  function measure() {
    const rect=section.getBoundingClientRect();
    const width=stage.clientWidth;
    // Read the CSS scene size directly; trimming the stage does not change these coordinates.
    const height=scene.getBoundingClientRect().height;
    const scale=Math.min(1,(width-36-36)/1061);
    const sizes=[280,247,330,212];
    const targetX=sizes.map((_,i)=>18+sizes.slice(0,i).reduce((n,v)=>n+v*scale+12,0));
    geometry={top:rect.top+scrollY,range:section.offsetHeight-stage.offsetHeight,width,height,scale,targetX};
    render();
  }
  function render() {
    scheduled=0;
    if(!active||!geometry)return;
    const {top,range,width,height,scale,targetX}=geometry;
    const p=clamp((scrollY-top)/range);
    const gather=ease(between(p,.35,.98));
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
    slogan.style.opacity=String(between(p,.08,.26)*(1-between(p,.32,.44)));
    slogan.style.transform=`translate3d(0,${16*(1-between(p,.08,.26))}px,0)`;
    final.style.opacity=String(between(p,.75,.94));
    board.style.opacity=String(between(p,.80,.96));
    note.style.opacity=String(between(p,.92,1));
    section.dataset.progress=p.toFixed(4);
  }
  function queue(){if(active&&!scheduled)scheduled=requestAnimationFrame(render);}
  function configure(preservePosition = false){
    const wasActive = active;
    const before = section.getBoundingClientRect();
    const stageBefore = stage.getBoundingClientRect();
    const previousY = scrollY;
    const sectionTop = before.top + previousY;
    if (preservePosition && wasActive && geometry) {
      resumeProgress = clamp((previousY - geometry.top) / geometry.range);
    }
    active=!reduce.matches&&wide.matches;
    section.classList.toggle('is-scrubbed',active);
    if(scheduled)cancelAnimationFrame(scheduled);
    scheduled=0;
    for(const el of animated){el.style.removeProperty('transform');el.style.removeProperty('opacity');}
    if(active)measure();else section.dataset.progress='static';
    if (!preservePosition || wasActive === active) return;

    let targetY = previousY;
    if (before.bottom <= 0 || stageBefore.top < -1) {
      // Preserve the lower content boundary once the reader is leaving the stage.
      // A static stage can be taller than the sticky stage, so anchoring its own
      // bottom edge is not always possible; the following content is stable instead.
      targetY += section.getBoundingClientRect().height - before.height;
    } else if (before.top <= 0) {
      // Keep the visible sticky surface in place; a direct round trip resumes its progress.
      targetY = sectionTop + (active && geometry ? resumeProgress * geometry.range : 0);
    }
    // No animation: a motion preference change must not cause a smooth page scroll.
    scrollTo({ top: targetY, behavior: 'instant' });
    if (active) measure();
  }
  addEventListener('scroll',queue,{passive:true});
  const resize = () => active ? measure() : configure();
  addEventListener('resize',resize);
  const reducedChange = () => configure(true);
  const wideChange = () => configure();
  reduce.addEventListener('change',reducedChange);
  wide.addEventListener('change',wideChange);
  const observer = new ResizeObserver(resize);
  observer.observe(section.parentElement ?? section);
  configure();
  void document.fonts.ready.then(() => { if (!disposed && active) measure(); });
  return () => {
    disposed = true;
    active = false;
    if (scheduled) cancelAnimationFrame(scheduled);
    removeEventListener('scroll',queue);
    removeEventListener('resize',resize);
    reduce.removeEventListener('change',reducedChange);
    wide.removeEventListener('change',wideChange);
    observer.disconnect();
    section.classList.remove('is-scrubbed');
    for (const el of animated) {
      el.style.removeProperty('transform');
      el.style.removeProperty('opacity');
    }
  };
  }, [])

  return (
    <section ref={sectionRef} className="man-motion" aria-labelledby="man-motion-title">
      <div className="man-motion-stage">
        <div className="man-motion-scene" aria-hidden="true" />
        <p className="man-motion-over">10:00 to Stuttgart</p>
        <h2 className="man-motion-slogan" id="man-motion-title">A truck can be ready.<br /><em>Its shift can still be at risk.</em></h2>
        <h3 className="man-motion-final">One shift, one shared record.</h3>
        <div className="man-motion-assembly">
          <div className="man-motion-board"><div className="man-motion-board-heading"><span>10:00 · TGX · 042</span><small>Munich → Stuttgart</small></div></div>
          <div className="man-motion-cards">
            {fields.map(field => (
              <div key={field.label} className="man-motion-card" style={{ width: field.width + 22 }}>
                <span className="man-motion-card-label">{field.label}</span>
                <div className="man-motion-crop" style={{ width: field.width, height: 95 }}>
                  <img src="/assets/man-fleet-uptime/dispatch.webp" width="1440" height="960" alt={field.alt} style={{ left: -field.x }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="man-motion-note">Fictional operations data from the case study. Four fields from the same dispatch record.</p>
      </div>
    </section>
  )
}
