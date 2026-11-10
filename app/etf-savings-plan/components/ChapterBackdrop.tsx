import { useEffect, useRef } from 'react';
import './ChapterBackdrop.css';
/* One colour layer per chapter, in page order. Each layer reads its own chapter's top:
   opacity = clamp((0.8 * vh - top) / (0.6 * vh), 0, 1), so it fades in while the chapter's top
   travels from 80% to 20% of the viewport. No layer depends on which chapter is "current", so
   there is no jump at a boundary and scrolling back reverses it exactly (motion v2, visual QA
   #4749). Same formula under reduced motion: it is a colour change, not movement. */
export function ChapterBackdrop({ chapterIds }: { chapterIds: string[] }) {
  const field = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = field.current;
    if (!element) return;
    const layers = Array.from(element.children) as HTMLElement[];
    const chapters = chapterIds.map(id => document.getElementById(id));
    let frame = 0;
    function paint() {
      frame = 0;
      const vh = window.innerHeight;
      layers.forEach((layer, i) => {
        const chapter = chapters[i];
        if (!chapter) return;
        const top = chapter.getBoundingClientRect().top;
        layer.style.opacity = Math.max(0, Math.min(1, (vh * 0.8 - top) / (vh * 0.6))).toFixed(4);
      });
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(paint);
    }
    paint();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    // Chapter tops also move when the page reflows (fonts, the live phones mounting).
    const resize = new ResizeObserver(schedule);
    if (element.parentElement?.parentElement) resize.observe(element.parentElement.parentElement);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      resize.disconnect();
    };
  }, [chapterIds]);
  return <div className="chapter-backdrop" aria-hidden="true">
    <div className="chapter-backdrop-field" ref={field}>{chapterIds.map(id => <i key={id} />)}</div>
  </div>;
}
