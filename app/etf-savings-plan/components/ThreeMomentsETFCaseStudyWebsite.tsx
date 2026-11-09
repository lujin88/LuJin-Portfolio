import { useEffect, useRef, useState } from 'react';
import './Moment.css';
import { OpeningPhones } from './OpeningPhones';
import { LivePhone } from './LivePhone';
const moments = [{
  id: 'before-starting',
  kind: 'setup',
  label: 'Before starting',
  heading: '“Could I lose money?” Yes, and here’s how much.',
  body: 'At CHF 100 a month, five years of contributions add up to CHF 6’000. A lower outcome of CHF 4’955 makes the risk tangible before the first payment.',
  screen: 'd' as const
}, {
  id: 'down-month',
  kind: 'down',
  label: 'In a down month',
  heading: 'Show progress, not today’s price.',
  body: 'Now consider a CHF 200 monthly plan. After six payments, the investor has put in CHF 1’200. The overview leads with those six months and shows the loss alongside them: CHF 96, or 8%.',
  screen: 'c' as const
}, {
  id: 'wanting-to-stop',
  kind: 'manage',
  label: 'Wanting to stop',
  heading: 'Stopping is as easy as pausing.',
  body: 'A down month may prompt a change of plan. The investor can adjust the amount or date, pause, or stop. Stopping ends future purchases. The ETF units they already own stay invested.',
  screen: 'm' as const
}];
function Phone({index}:{index:number}) {
  return <div className="story-handset"><LivePhone initial={moments[index].screen}/></div>;
}
export const ThreeMomentsETFCaseStudyWebsite = () => {
  const [active, setActive] = useState(0);
  const story = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const chapters = Array.from(story.current?.querySelectorAll('article') ?? []);
    let frame = 0;
    function sync() {
      const readingLine = window.innerHeight * 0.44;
      let current = 0;
      chapters.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= readingLine) current = i;
      });
      setActive(current);
      frame = 0;
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(sync);
    }
    const observer = new ResizeObserver(schedule);
    if (story.current) observer.observe(story.current);
    sync();
    window.addEventListener('scroll', schedule, {
      passive: true,
      capture: true
    });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule, true);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  return <div className="case-site" id="top">
<main><section className="case-opening" aria-labelledby="case-title">
    <OpeningPhones />
  </section>

  <div className="story" ref={story}>
    <div className="story-copy">{moments.map((moment, index) => <article key={moment.id} id={moment.id} aria-labelledby={moment.id + '-heading'}>
        <p className="eyebrow">{moment.label}</p>
        <h2 id={moment.id + '-heading'}>{moment.heading}</h2>
        {index === 0 && <p className="research">Among 2,005 Swiss investors, 44% used a fund savings plan and 9% used one with ETFs. <a href="https://www.hslu.ch/-/media/campus/common/files/dokumente/w/ifz/studien/etf-anlegerstudie-schweiz-2025.pdf?sc_lang=de-ch" target="_blank" rel="noreferrer">HSLU study, 2025 ↗</a></p>}
        <p className="story-text">{moment.body}</p>
        <div className="inline-phone"><Phone index={index} /></div>
        {index === 2 && <p className="research closing">I’d measure how many plans are still running after six months and test whether people understand what happens to their holdings when they stop.</p>}
      </article>)}</div>
    <div className="shared-phone">{moments.map((moment,index)=><div className="story-live-slot" hidden={active!==index} key={moment.id}><Phone index={index}/></div>)}</div>
  </div>

</main></div>;
};