import { useEffect, useRef } from 'react';
import './OpeningPhones.css';
import { LivePhone } from './LivePhone';
export function OpeningPhones() {
  const sequence = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = sequence.current;
    if (!element) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Phones (<=600px): no sticky stage or 66svh runway (OpeningPhones.css). The
    // spread is driven by the page's natural scroll until the pair is 24px under
    // the site header, then stays settled (motion MOTION_ETF_MOBILE_1109/PLAN.md).
    const phone = window.matchMedia('(max-width: 600px)');
    let settled = false;
    let frame = 0;
    function progressOnPhone(el: HTMLDivElement) {
      const pair = el.querySelector<HTMLElement>('.opening-pair');
      if (!pair) return 1;
      const header = document.querySelector('[data-site-header]');
      const headerBottom = header ? header.getBoundingClientRect().bottom : 64;
      const sequenceTop = el.getBoundingClientRect().top + window.scrollY;
      const pairTop = pair.getBoundingClientRect().top + window.scrollY;
      const travel = pairTop - sequenceTop - (headerBottom + 24);
      if (travel <= 0) return 1;
      return Math.max(0, Math.min(1, (window.scrollY - sequenceTop) / travel));
    }
    function paint() {
      frame = 0;
      if (!element) return;
      let progress: number;
      if (phone.matches) {
        // Reduced motion settles the pair for good: switching back must not replay the spread.
        if (reduceMotion.matches) settled = true;
        progress = settled ? 1 : progressOnPhone(element);
        if (progress >= 1) settled = true;
      } else {
        const rect = element.getBoundingClientRect();
        const pinTop = parseFloat(getComputedStyle(element.firstElementChild!).top) || 0;
        const distance = Math.max(1, rect.height - element.firstElementChild!.clientHeight);
        progress = Math.max(0, Math.min(1, (pinTop - rect.top) / distance));
      }
      const remainingTilt = reduceMotion.matches ? 0 : 1 - progress * progress * (3 - 2 * progress);
      element.style.setProperty('--spread-progress', remainingTilt.toFixed(4));
      element.style.setProperty('--tilt', (remainingTilt * 14).toFixed(3) + 'deg');
      element.style.setProperty('--turn', (remainingTilt * 19).toFixed(3) + 'deg');
      element.style.setProperty('--pitch', (remainingTilt * 8).toFixed(3) + 'deg');
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(paint);
    }
    // Touching or tabbing into a live phone settles the pair at once, so the
    // shell never moves while someone is using the demo.
    function settle() {
      if (!phone.matches || settled) return;
      settled = true;
      schedule();
    }
    paint();
    window.addEventListener('scroll', schedule, {
      passive: true,
      capture: true
    });
    window.addEventListener('resize', schedule);
    reduceMotion.addEventListener('change', schedule);
    phone.addEventListener('change', schedule);
    element.addEventListener('pointerdown', settle);
    element.addEventListener('focusin', settle);
    const resize = new ResizeObserver(schedule);
    resize.observe(element);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule, true);
      window.removeEventListener('resize', schedule);
      reduceMotion.removeEventListener('change', schedule);
      phone.removeEventListener('change', schedule);
      element.removeEventListener('pointerdown', settle);
      element.removeEventListener('focusin', settle);
      resize.disconnect();
    };
  }, []);
  return <div className="opening-sequence" ref={sequence}>
    <div className="opening-pin">
      <div className="opening-text">
        <h1 data-type="display" id="case-title">From interested<br />to sticking with it</h1>
        <p data-type="lead" className="case-intro">Most savings plans help you start. I designed this Swiss one for the months after. You see costs in francs before you start, including stamp duty, and pay by eBill or standing order.</p>
      </div>
      <div className="opening-pair">
        {(['d', 'e'] as const).map(key => <div className="opening-handset" key={key}>
          <LivePhone initial={key}/>
        </div>)}
      </div>
    </div>
  </div>;
}