import { useEffect, useRef } from 'react';
import './OpeningPhones.css';
import { LivePhone } from './LivePhone';
export function OpeningPhones() {
  const sequence = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = sequence.current;
    if (!element) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    function paint() {
      frame = 0;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const pinTop = parseFloat(getComputedStyle(element.firstElementChild!).top) || 0;
      const distance = Math.max(1, rect.height - element.firstElementChild!.clientHeight);
      const progress = Math.max(0, Math.min(1, (pinTop - rect.top) / distance));
      const remainingTilt = reduceMotion.matches ? 0 : 1 - progress * progress * (3 - 2 * progress);
      element.style.setProperty('--spread-progress', remainingTilt.toFixed(4));
      element.style.setProperty('--tilt', (remainingTilt * 14).toFixed(3) + 'deg');
      element.style.setProperty('--turn', (remainingTilt * 19).toFixed(3) + 'deg');
      element.style.setProperty('--pitch', (remainingTilt * 8).toFixed(3) + 'deg');
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(paint);
    }
    paint();
    window.addEventListener('scroll', schedule, {
      passive: true,
      capture: true
    });
    window.addEventListener('resize', schedule);
    reduceMotion.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule, true);
      window.removeEventListener('resize', schedule);
      reduceMotion.removeEventListener('change', schedule);
    };
  }, []);
  return <div className="opening-sequence" ref={sequence}>
    <div className="opening-pin">
      <div className="opening-text">
        <h1 id="case-title">From interested<br />to sticking with it</h1>
        <p className="case-intro">Most savings plans help you start. I designed this Swiss one for the months after. You see costs in francs before you start, including stamp duty, and pay by eBill or standing order.</p>
      </div>
      <div className="opening-pair">
        {(['d', 'e'] as const).map(key => <div className="opening-handset" key={key}>
          <LivePhone initial={key}/>
        </div>)}
      </div>
    </div>
  </div>;
}