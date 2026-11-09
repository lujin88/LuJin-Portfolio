import { useEffect, useRef } from 'react';
import './FluidBackground.css';
export function FluidBackground() {
  const wash = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = wash.current;
    if (!element) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    function paint() {
      frame = 0;
      if (!element) return;
      const root = document.documentElement;
      const progress = reduceMotion.matches ? 0 : Math.max(0, Math.min(1, window.scrollY / Math.max(1, root.scrollHeight - window.innerHeight)));
      element.style.setProperty('--fluid-p', progress.toFixed(4));
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(paint);
    }
    paint();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduceMotion.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduceMotion.removeEventListener('change', schedule);
    };
  }, []);
  return <div className="fluid-bg" aria-hidden="true">
    <div className="fluid-bg-field">
      <div className="fluid-bg-wash" ref={wash} />
      <div className="fluid-bg-veil" />
    </div>
  </div>;
}
