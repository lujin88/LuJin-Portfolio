'use client'
import { useEffect, useRef } from 'react'
import './field-notes.css'
import { SiteClosing } from '../../components/site-closing'
import { Icon } from '../../components/remix-icon'

const hero = '/lab/way-of-work/field-notes/worktable.webp'
const selecting = '/lab/way-of-work/field-notes/selection-still-v20.webp'
const scoring = '/lab/way-of-work/field-notes/score.webp'
const handoff = '/lab/way-of-work/field-notes/handoff.webp'
const rulebox = '/lab/way-of-work/field-notes/rulebox-ink.webp'
const heroLoop = '/lab/way-of-work/field-notes/worktable-loop.webp'
const selectionLoop = '/lab/way-of-work/field-notes/selection-loop-v22.webp'
const scoreLoop = '/lab/way-of-work/field-notes/score-loop-v21.webp'
const handoffLoop = '/lab/way-of-work/field-notes/handoff-loop-v21.webp'
const rabbitMotion = '/lab/way-of-work/field-notes/archive-loop-v20.webp'
const sceneLoops = [heroLoop, selectionLoop, scoreLoop, handoffLoop]

// The masks carve the animated props out of the original hand drawings.
// Coordinates for the cut-outs, gestures and pen all use the same 800-unit width.
const scenes = [
  {
    name:'worktable', art:hero, sourceHeight:465, height:431, entrySide:1,
    alt:'A long-haired designer lifts a note between her fingers while a rabbit sorts papers and a bear works at a laptop.',
    erase:'M0 320H77V364H0Z M469 76L521 62L526 106Q511 101 505 105Q498 112 508 119L472 131Z',
    eraseLine:'M-4 337C58 325 55 399 121 421C166 438 212 434 224 408C234 386 206 393 201 413C190 445 237 454 297 436C371 415 413 402 464 447',
    wash:'M474 80L518 68L521 107Q501 103 508 118L476 126Z',
    colour:'#dbe8fa',
    // The wrist turns into the pinched slip; the flick leaving its upper edge
    // travels above the hair before dropping towards the next pair of hands.
    stroke:`M 597 171 C 566 171 551 187 528 178
      C 538 168 549 153 549 142 C 550 128 541 115 530 111
      Q 519 105 511 106 C 502 106 502 113 509 117
      L 476 125 Q 478 103 474 80 L 517 68 L 521 105
      Q 524 99 519 80 L 517 68 Q 500 72 474 80
      C 449 84 448 51 421 36 C 380 12 322 15 287 22 C 217 30 165 12 102 24 C 48 35 18 69 16 119`,
    // Each detail arrives as the main pen reaches its own prop.
    detail:'M494 90l6 5 10 -13',detailAt:.62
  },{
    name:'selection',art:selecting,sourceHeight:394,height:394,entrySide:-1,
    alt:'The designer and rabbit reach out with notes. The slip in her fingers leads into the few notes kept on the board.',
    erase:'M671 15H746V64H671Z M531 51H741V338H531Z M388 94L432 85L445 132L399 144L392 129Q404 119 398 110L389 111Z',
    eraseLine:'',
    wash:'M391 100L430 89L441 130L399 141L394 122Z M597 95L658 96L655 149L597 147Z M596 167L657 168L658 217L598 218Z M599 239L659 238L658 290L600 288Z',
    colour:'#c2daf4',
    stroke:`M 110 44 C 191 1 300 13 348 57 C 369 76 363 105 379 103
      Q 385 98 392 98 Q 397 97 398 101 Q 398 105 389 108
      L 391 100 L 430 89 L 441 129 L 400 141 L 395 124
      Q 408 136 430 123 C 474 96 506 101 535 110
      Q 560 119 598 117 L 598 96 L 655 97 L 655 148 L 598 146 L 598 117
      C 580 143 576 177 599 192 L 599 167 L 656 168 L 657 218 L 600 218 L 599 193
      C 585 213 582 248 601 262 L 600 239 L 658 239 L 658 290 L 600 288 L 601 262
      Q 600 287 624 300 C 644 311 649 326 649 348`,
    detail:'M620 95q1 -11 9 -10q8 1 6 11q-2 7 -8 7q-7 -1 -7 -8 M620 166q1 -10 8 -10q9 1 7 10q-2 8 -8 8q-6 -1 -7 -8 M620 238q0 -10 9 -10q8 1 7 10q-1 9 -8 8q-7 0 -8 -8',detailAt:.74
  },{
    name:'judgement',art:scoring,sourceHeight:375,height:375,entrySide:1,
    alt:'A bear, rabbit and fox review the work. The designer points at the open rulebook and moves her hand to the next item.',
    erase: 'M356 319L368 315L400 321L526 315L530 374L354 374Z',
    eraseLine: '',
    wash: '',
    colour:'#dce8f3',
    stroke: `M 157 354 C 215 354 257 326 302 313
      C 344 301 400 298 432 310 Q 442 314 444 315
      C 453 326 429 351 405 361 C 361 380 304 382 247 384`,
    detail: '',detailAt:.77
  },{
    name:'handoff',art:handoff,sourceHeight:340,height:340,entrySide:-1,
    alt:'The designer holds out a rules sheet. Its corner opens into the frame around a blue car.',
    erase:'M382 67L758 66L759 310L382 310Z',
    // Restore the detailed vehicle inside the area cleared for the animated frame.
    keep:'M416 259L415 228L428 201L474 186L519 154Q539 143 580 145Q619 143 650 159L685 186L713 192L728 211L730 264L697 265Q689 282 666 283L643 282Q627 277 622 264L520 265Q508 283 487 283Q464 284 452 264Z',
    eraseLine:'M358 159Q412 146 437 180',
    wash:'M404 90L743 90L742 292L403 294Z',colour:'#e5ebe3',
    stroke: `M 103 28 C 161 2 213 19 251 52
      C 290 87 309 94 345 93 C 370 92 386 92 405 92
      Q 564 91 741 91 L 741 292 Q 565 295 404 294
      L 405 92 C 405 143 404 242 404 281
      Q 404 294 419 294 C 476 294 579 292 619 297 Q 662 301 688 309`,
    detail:'M397 84l16 0 0 16 -16 0Z M734 84l15 0 0 15 -15 0Z M734 285l16 0 0 16 -16 0Z M397 286l15 0 0 15 -15 0Z',detailAt:.86
  }
]

const chapters = [
  {
    id:'idea', label:'From idea to live', title:'AI pushes back. I decide.',
    context:'Before any screen, I write the core task in one sentence. AI cuts every feature that doesn\'t serve it and argues against my key ideas.',
    decision:'For Gratula, a kids\' party planner, guest headcounts left the RSVP. Yes or no plus an allergy note was enough.'
  },
  {
    id:'team', label:'Running an agent team', title:'Agents iterate. I sign off.',
    context:'One agent frames the problem, one designs, one scores the result against my rules. A low score means another round. No design ships until I\'ve reviewed it.',
    decision:'What I change in review goes back into the rules.'
  },
  {
    id:'handoff', label:'Handing off to engineering', title:'I hand over more than screens.',
    context:'Before handover, I check accessibility and work through fixes with QA. With the PO, I define the KPIs and the tracking events that measure them.',
    decision:'On the BMW app in 2020, market and model rules lived in a spreadsheet, outside the system. Now my rules live in one place my agents read.'
  }
]

function Scene({index}:{index:number}){
  const scene=scenes[index]
  const mask='ww-paper-'+scene.name
  return <svg className={'ww-drawing '+(index===0?'ww-hero-art':'ww-art')}
    width={800} height={scene.height} viewBox={`0 0 800 ${scene.height}`}
    data-contour={scene.stroke} data-side={scene.entrySide} role="img" aria-label={scene.alt}>
    <defs><mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="800" height={scene.height}>
      <rect width="800" height={scene.height} fill="white"/>
      <path d={scene.erase} fill="black"/>
      <path d={scene.eraseLine} fill="none" stroke="black" strokeWidth={index===0?14:10} strokeLinecap="round"/>
      {scene.keep&&<path d={scene.keep} fill="white"/>}
    </mask></defs>
    <path d={scene.wash} fill={scene.colour} className="ww-wash"/>
    <image className="ww-ensemble" href={scene.art} data-still={scene.art} data-motion={sceneLoops[index]} width="800" height={scene.sourceHeight} preserveAspectRatio="none" mask={'url(#'+mask+')'}/>
    <path d={scene.detail} data-detail={scene.detailAt} className="ww-detail"/>
  </svg>
}

// This function also drives the portable HTML preview.
function mountDrawing(page:HTMLElement) {
  const svg=page.querySelector<SVGSVGElement>('.ww-trail')!
  const ink=svg.querySelector<SVGPathElement>('.ww-ink')!
  const pen=svg.querySelector('circle')!
  const drawings=Array.from(page.querySelectorAll<SVGSVGElement>('[data-contour]'))
  const accents=drawings.map(scene=>Array.from(scene.querySelectorAll<SVGPathElement>('[data-detail]')))
  const archive = page.querySelector<HTMLImageElement>('.ww-archive')!
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)')

  const ensembles = drawings.map(scene => scene.querySelector<SVGImageElement>('.ww-ensemble')!)
  const visibleScenes = new Set<Element>()
  function syncScenes() {
    ensembles.forEach((image, i) => {
      const url = visibleScenes.has(drawings[i]) && !reduced.matches ? image.dataset.motion! : image.dataset.still!
      if (image.getAttribute('href') !== url) image.setAttribute('href', url)
    })
    const archiveUrl = visibleScenes.has(archive) && !reduced.matches ? archive.dataset.motion! : archive.dataset.still!
    if (archive.getAttribute('src') !== archiveUrl) archive.setAttribute('src', archiveUrl)
  }
  const visibility = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) visibleScenes.add(entry.target)
      else visibleScenes.delete(entry.target)
    }
    syncScenes()
  })
  drawings.forEach(scene => visibility.observe(scene))
  visibility.observe(archive)
  reduced.addEventListener('change', syncScenes)

  let length=0, frame=0, inkHead=0, inkTime=0
  const stations:{scroll:number;dist:number}[]=[]
  const ranges:{start:number;end:number}[]=[]
  const clamp=(n:number)=>Math.max(0,Math.min(1,n))
  const point=(x:number,y:number)=>x.toFixed(2)+' '+y.toFixed(2)
  function draw() {
    frame=0
    if(!length) return
    const scroll=Math.max(0,-page.getBoundingClientRect().top)
    const next=stations.findIndex(s=>s.scroll>scroll)
    let dist=length
    if(next>0){
      const a=stations[next-1],b=stations[next]
      dist=a.dist+(b.dist-a.dist)*clamp((scroll-a.scroll)/(b.scroll-a.scroll))
    }else if(next===0) dist=0
    const now=performance.now()
    const elapsed=inkTime?Math.min(64,now-inkTime):16
    inkTime=now
    const delta=dist-inkHead
    if(reduced.matches||Math.abs(delta)<.4||Math.abs(delta)>innerHeight){
      inkHead=reduced.matches?length:dist
    }else{
      inkHead+=delta*(1-Math.exp(-elapsed/66))
      frame=requestAnimationFrame(draw)
    }
    dist=inkHead
    ink.style.strokeDashoffset=String(length-dist)
    const pos=ink.getPointAtLength(dist)
    pen.setAttribute('cx',String(pos.x));pen.setAttribute('cy',String(pos.y))
    pen.style.opacity=dist<length-.1?'1':'0'
    ranges.forEach(({start,end},i)=>{
      const fraction=clamp((dist-start)/(end-start))
      drawings[i].style.setProperty('--wash',String(.56+.44*fraction))
      drawings[i].style.setProperty('--cast',String((i===0?.92:.66)+(i===0?.08:.34)*clamp(fraction*3)))
      accents[i].forEach(el=>{
        el.style.opacity=String(clamp((fraction-Number(el.dataset.detail))/.12))
      })
    })
  }
  function build(){
    const rect=page.getBoundingClientRect(),w=rect.width,vh=innerHeight
    const box=(el:Element)=>{
      const b=el.getBoundingClientRect()
      return {x:b.left-rect.left,y:b.top-rect.top,w:b.width,h:b.height}
    }
    const word=box(page.querySelector('.ww-word')!),book=box(page.querySelector('.ww-archive')!)
    svg.setAttribute('viewBox',`0 0 ${w} ${rect.height}`)
    stations.length=0;ranges.length=0
    let x=word.x,y=word.y+word.h*.99,exitX=x,exitY=y
    let d='M '+point(x,y)
    stations.push({scroll:0,dist:0})
    const station=(scroll:number)=>{
      ink.setAttribute('d',d)
      const dist=ink.getTotalLength()
      stations.push({scroll:Math.max(stations[stations.length-1].scroll+1,scroll),dist})
      return dist
    }
    d+=' Q '+point(x+word.w*.48,y-3)+' '+point(x+word.w,y)
    x+=word.w;station(46)
    drawings.forEach((scene,i)=>{
      const b=box(scene),k=b.w/scene.viewBox.baseVal.width
      const commands=scene.dataset.contour!.match(/[MLQC][^MLQC]*/g)!
      const coords=(command:string)=>command.slice(1).trim().split(/[\s,]+/).map(Number)
      const [sx,sy]=coords(commands[0])
      const entryX=b.x+sx*k,entryY=b.y+sy*k
      const [nx,ny]=coords(commands[1])
      const span=Math.hypot(nx-sx,ny-sy)||1
      const approach=point(entryX-(nx-sx)/span*30,entryY-(ny-sy)/span*30)
      const side=Number(scene.dataset.side),onRight=side>0
      const gutter=onRight?w*.956:w*.044
      if(i===0){
        const bend=Math.min(w*.966,Math.max(x,entryX)+w*.085)
        const turnY=y+(entryY-y)*.47, handle=(entryY-y)*.24
        d+=' C '+point(x+(bend-x)*.76,y)+' '+point(bend,turnY-handle)+' '+point(bend,turnY)
        d+=' C '+point(bend,turnY+handle)+' '+approach+' '+point(entryX,entryY)
      }else if(i===2){
        const targetCopy = box(page.querySelector('#ww-team .ww-copy')!)
        if (window.matchMedia('(max-width:719px)').matches) {
          const sourceCopy = box(page.querySelector('#ww-idea .ww-copy')!)
          const sourceArt = box(drawings[i - 1])
          const lane = Math.max(12, targetCopy.x - 18)
          const gapTop = Math.max(sourceArt.y + sourceArt.h, sourceCopy.y + sourceCopy.h, y)
          const crossing = gapTop + Math.max(16, (targetCopy.y - gapTop) * .48)
          const outY = Math.min(crossing - 5, y + Math.max(18, (crossing - y) * .75))
          d += ' C ' + point(x, outY) + ' ' + point(lane, crossing - 12) + ' ' + point(lane, crossing + 12)
          const turn = Math.min(48, (entryY - crossing) * .22)
          const underBear = point(lane, entryY)
          d += ' C ' + point(lane, entryY - turn) + ' ' + underBear + ' ' + point(entryX, entryY)
        } else {
          // One uninterrupted curve, tangent to the card exit and the book entry.
          const clearEdge = targetCopy.x + targetCopy.w + 14
          const reach = Math.max(0, Math.min(entryX - clearEdge, b.w * .32))
          const towardBook = point(entryX - (nx - sx) / span * reach, entryY - (ny - sy) / span * reach)
          d += ' C ' + point(x, y + (entryY - y) * .55) + ' ' + towardBook + ' ' + point(entryX, entryY)
        }
      }else if(window.matchMedia('(max-width:719px)').matches){
        const previous=box(drawings[i-1])
        const copy=box(scene.closest('section')!.querySelector('.ww-copy')!)
        const lane=onRight?copy.x+copy.w+18:copy.x-18
        const turnY=(previous.y+previous.h+copy.y)/2
        // Leaving the hero, turn into the lane at once so the curve stays clear of the centred intro.
        const lead=i===1?point(lane,y):point(exitX,exitY)
        d+=' C '+lead+' '+point(lane,turnY-10)+' '+point(lane,turnY+10)
        d+=' L '+point(lane,copy.y+copy.h+8)
        d+=' C '+point(lane,entryY-18)+' '+approach+' '+point(entryX,entryY)
      }else if(i===3){
        const prev=box(page.querySelector('#ww-team .ww-copy')!)
        const next=box(page.querySelector('#ww-handoff .ww-copy')!)
        const safeY=(Math.max(y,prev.y+prev.h)+Math.min(b.y,next.y))/2
        const midX=(x+entryX)/2
        d+=' C '+point(exitX,exitY)+' '+point(x,safeY)+' '+point(midX,safeY)
        d+=' C '+point(entryX,safeY)+' '+approach+' '+point(entryX,entryY)
      }else{
        const run=entryY-y
        const midY=y+run*.48
        const handle=Math.min(Math.abs(run)*.33,w<720?90:185)
        const lane=w<720?gutter:Math.max(15,Math.min(w-15,entryX+side*b.w*.15))
        d+=' C '+point(exitX,exitY)+' '+point(lane,midY-handle)+' '+point(lane,midY)
        d+=' C '+point(lane,midY+handle)+' '+approach+' '+point(entryX,entryY)
      }
      const start=station(Math.max(i===0?100:0,b.y-vh*.68))
      for(const cmd of commands.slice(1)){
        const numbers=coords(cmd)
        d+=' '+cmd[0]
        for(let j=0;j<numbers.length;j+=2){
          x=b.x+numbers[j]*k;y=b.y+numbers[j+1]*k
          d+=' '+point(x,y)
        }
      }
      const last=coords(commands[commands.length-1])
      const dx=last[last.length-2]-last[last.length-4],dy=last[last.length-1]-last[last.length-3]
      const reach=Math.min(75,b.w*.18)/(Math.hypot(dx,dy)||1)
      exitX=x+dx*reach;exitY=y+dy*reach
      const end=station(Math.max(stations[stations.length-1].scroll+(i===0?120:140),b.y+b.h-vh*.31))
      ranges.push({start,end})
    })
    // Follow the archive lid in its illustration's original 1536 × 1024 coordinates.
    const lidPoint = (u: number, v: number) =>
      point(book.x + u * book.w / 1536, book.y + v * book.h / 1024)
    d += ' C ' + point(exitX, exitY) + ' ' + lidPoint(977, 179) + ' ' + lidPoint(626, 241)
    station(book.y + book.h * .25 - vh * .64)
    d += ' C ' + lidPoint(506, 261) + ' ' + lidPoint(346, 285) + ' ' + lidPoint(258, 300)
    d += ' C ' + lidPoint(209, 308) + ' ' + lidPoint(179, 352) + ' ' + lidPoint(194, 402)
    d += ' Q ' + lidPoint(226, 506) + ' ' + lidPoint(260, 610)
    length = station(book.y + book.h * .57 - vh * .29)
    const maxScroll=Math.max(1,rect.height-vh-1)
    const scale=Math.min(1,maxScroll/stations[stations.length-1].scroll)
    stations.forEach(s=>{s.scroll*=scale})
    cancelAnimationFrame(frame);frame=0
    ink.style.strokeDasharray=String(length)
    draw()
  }
  const schedule=()=>{if(!frame) frame=requestAnimationFrame(draw)}
  // ResizeObserver delivers an initial callback on observe(); calling build() here too computed the path twice.
  const observer=new ResizeObserver(build);observer.observe(page)
  window.addEventListener('resize',build);window.addEventListener('scroll',schedule,{passive:true,capture:true})
  reduced.addEventListener('change',schedule)
  return ()=>{visibility.disconnect(); reduced.removeEventListener('change', syncScenes); observer.disconnect();cancelAnimationFrame(frame);window.removeEventListener('resize',build);window.removeEventListener('scroll',schedule,true);reduced.removeEventListener('change',schedule)}
}

export function WayOfWork({portfolio=false}:{portfolio?:boolean}){
  const ref=useRef<HTMLElement>(null)
  useEffect(()=>{if(ref.current) return mountDrawing(ref.current)},[])
  const base=portfolio?'':'http://localhost:3000'
  return <>
  <main ref={ref} className={'ww-page'+(portfolio?' ww-portfolio':'')} id="ww-top">
    <svg className="ww-trail" aria-hidden="true"><path className="ww-ink"/><circle r="2.6"/></svg>
    {!portfolio&&<nav className="ww-nav" aria-label="Portfolio"><a href={base+'/index'} target="_blank" rel="noreferrer">Lu Jin</a><div><a href={base+'/index'} target="_blank" rel="noreferrer">Work</a><a href="#ww-top" aria-current="page">Lab</a><a href={base+'/about'} target="_blank" rel="noreferrer">About</a></div></nav>}
    <header className="ww-hero">
      <h1>Making is fast now.<br/>Judging is the <span className="ww-word">work.</span></h1>
      <Scene index={0}/>
      <p className="ww-intro">I turn my judgement into rules my agents follow. Where the rules don&apos;t reach, I decide.</p>
    </header>
    {chapters.map((c,i)=><section className={'ww-chapter ww-c'+i} id={'ww-'+c.id} key={c.id}>
      <div className="ww-copy">
        <div className="ww-label"><b>0{i+1}</b>{c.label}</div>
        <h2>{c.title}</h2>
        <p>{c.context}</p>
        <p>{c.decision}</p>
        {c.id === 'team' ? (
          <a
            className="ww-case-btn pill-btn"
            href={portfolio ? '/lab/tools' : `${base}/lab/tools`}
          >
            <span>Explore my agent tools</span>
            <Icon name="arrow-right-up-line" className="ww-case-icon" />
          </a>
        ) : null}
      </div>
      <figure><Scene index={i+1}/>
      </figure></section>)}
    <section className="ww-finale" aria-labelledby="ww-finale-title">
      <img className="ww-archive" src={rulebox} data-still={rulebox} data-motion={rabbitMotion} width={1536} height={1024}
        alt="The rabbit files a checked rule card in a blue index box." />
      <div className="ww-finale-copy">
        <p className="ww-finale-kicker">In 2020, the system held the components.</p>
        <h2 id="ww-finale-title">Now it should hold the rules.</h2>
        <a className="ww-case-btn pill-btn" href={base+'/bmw-design-system'} target={portfolio?undefined:'_blank'} rel="noreferrer"><span>Explore the BMW case</span><Icon name="arrow-right-up-line" className="ww-case-icon" /></a>
      </div>
    </section>
    </main>
  {portfolio&&<SiteClosing className="ww-closing" />}
  </>
}
