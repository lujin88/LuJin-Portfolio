import {useLayoutEffect, useRef, useState} from 'react';
import {Flow, type Screen} from './Flow';

export function LivePhone({initial}:{initial:Screen}) {
  const viewport = useRef<HTMLDivElement>(null);
  const [scale,setScale] = useState(1);
  useLayoutEffect(()=>{
    const node=viewport.current!;
    const resize=()=>{
      if (node.clientWidth) setScale(node.clientWidth/390);
    };
    const observer=new ResizeObserver(resize);
    observer.observe(node);
    resize();
    return ()=>observer.disconnect();
  },[]);
  return <div className="live-phone-viewport demo-viewport" ref={viewport}>
    <div className="live-phone-content" style={{zoom:scale}}>
      <Flow initial={initial}/>
    </div>
  </div>;
}
