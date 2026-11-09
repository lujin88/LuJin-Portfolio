import {useLayoutEffect, useRef, useState} from 'react';
import {Flow, type Screen} from './Flow';

export function LivePhone({initial}:{initial:Screen}) {
  const viewport = useRef<HTMLDivElement>(null);
  // null when CSS does the scaling (OpeningPhones.css); otherwise measured here.
  const [scale,setScale] = useState<number|null>(null);
  useLayoutEffect(()=>{
    const node=viewport.current!;
    if (CSS.supports('zoom','tan(atan2(100cqw, 390px))')) return;
    const resize=()=>{
      if (node.clientWidth) setScale(node.clientWidth/390);
    };
    const observer=new ResizeObserver(resize);
    observer.observe(node);
    resize();
    return ()=>observer.disconnect();
  },[]);
  return <div className="live-phone-viewport demo-viewport" ref={viewport}>
    <div className="live-phone-content" style={scale===null ? undefined : {zoom:scale}}>
      <Flow initial={initial}/>
    </div>
  </div>;
}
