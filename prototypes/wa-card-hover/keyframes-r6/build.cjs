// Static selection frames only. No runtime state or product integration.
// Original raster pixels are referenced through complementary masks.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const sizes = {perch:[1536,1024],church:[1334,1179],sun:[1314,1197],rain:[1377,1142],coat:[1312,1199],hat:[1374,1145]};
const hashes = {};
const palette = JSON.parse(fs.readFileSync(path.join(__dirname,'palette-samples.json')));
const rgb = sample => '#'+sample.rgba.slice(0,3).map(v=>v.toString(16).padStart(2,'0')).join('');
const gold=rgb(palette.sun[0]), amber=rgb(palette.sun[1]);
const ochre=rgb(palette.church[0]), paleGold=rgb(palette.church[1]);
const slate=rgb(palette.church[2]), ivory=rgb(palette.church[3]), featherShade=rgb(palette.church[4]);
function scene(name, draw) {
  const [w,h] = sizes[name];
  const data = fs.readFileSync(path.join(__dirname,`../assets/vocab-${name}.webp`));
  hashes[name] = crypto.createHash('sha256').update(data).digest('hex');
  const source = `<image id="source" width="${w}" height="${h}" href="data:image/webp;base64,${data.toString('base64')}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><defs>${source}</defs>${draw(w,h)}</svg>`;
}
const use = (attrs='') => `<use href="#source" ${attrs}/>`;
function split(d,w,h) {
  return `<defs><clipPath id="piece"><path d="${d}"/></clipPath><mask id="rest" maskUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}"><path fill="white" d="M0 0H${w}V${h}H0Z"/><path fill="black" d="${d}"/></mask></defs>`;
}
const frames = {};
frames['fish-peak'] = scene('perch',(w,h) => {
  const d='M0 0H330V1024H0Z';
  return split(d,w,h)+`<defs><clipPath id="tail-overlap"><path d="M0 0H400V1024H0Z"/></clipPath></defs><g transform="translate(0 -12)"><g transform="rotate(16 310 515)">${use('clip-path="url(#tail-overlap)"')}</g>${use('mask="url(#rest)"')}</g>`;
});
frames['sun-peak'] = scene('sun',() => {
  // Gold is sampled from the original sun; rounded strokes, no replacement sun.
  const rays = Array.from({length:12},(_,i)=> {
    const a=(i*30-90)*Math.PI/180, r1=510,r2=573;
    const x1=657+Math.cos(a)*r1, y1=590+Math.sin(a)*r1;
    const x2=657+Math.cos(a)*r2, y2=590+Math.sin(a)*r2;
    return `<path d="M${x1} ${y1}L${x2} ${y2}"/>`;
  }).join('');
  return `<defs><clipPath id="rays-zone"><path d="M0 0H1314V1010H0Z"/></clipPath></defs><g clip-path="url(#rays-zone)" stroke="${gold}" stroke-width="17" stroke-linecap="round" opacity=".76">${rays}</g>${use()}`;
});
frames['rain-peak'] = scene('rain',() => {
  const drops=[['M452 690H495L531 800L520 872H388V790Z',-35,70],['M688 708H738L771 829L753 894H623V804Z',30,170],['M960 690H1004L1043 819L1015 869H892V790Z',15,85],['M554 829H597L628 938L613 998H490V916Z',-10,-110],['M842 840H882L923 971L901 1021H773V947Z',30,-50]];
  return `<defs><clipPath id="cloud"><path d="M0 0H1377V690H0Z"/></clipPath>${drops.map(([d],i)=>`<clipPath id="drop${i}"><path d="${d}"/></clipPath>`).join('')}</defs>${use('clip-path="url(#cloud)"')}${drops.map((d,i)=>`<g transform="translate(${d[1]} ${d[2]})">${use(`clip-path="url(#drop${i})"`)}</g>`).join('')}`;
});
frames['hood-01-peak'] = scene('coat',(w,h) => {
  const d='M0 0H1312V440H925L895 413L856 374L816 325L760 302L640 289L539 304L505 331L481 371L440 417L396 440H0Z';
  // Rear hood folds towards the neck; front collar remains in the fixed layer.
  return split(d,w,h)+`<g transform="translate(0 326) scale(1 .26)">${use('clip-path="url(#piece)"')}</g>${use('mask="url(#rest)"')}`;
});
frames['hat-02-peak'] = scene('hat',(w,h) => {
  const d='M0 0H1374V435H1035L1006 400L959 368L902 337L850 314L800 296L744 281L681 284L624 300L592 315H0Z';
  const boundary=JSON.parse(fs.readFileSync(path.join(__dirname,'hat-boundary.json'))).points;
  const body=`M0 0H${w}V15`+boundary.toReversed().map(([x,y])=>`L${x} ${Math.min(y+12,h)}`).join('')+'Z';
  return split(d,w,h)+`<defs><clipPath id="hat-body"><path d="${body}"/></clipPath><mask id="hat-shadow" maskUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}"><rect y="1045" width="${w}" height="${h-1045}" fill="white"/><path d="${body}" fill="black"/></mask></defs>${use('mask="url(#hat-shadow)"')}<g transform="translate(0 -92)"><g transform="rotate(-4 818 309)">${use('clip-path="url(#piece)"')}</g><g clip-path="url(#hat-body)">${use('mask="url(#rest)"')}</g></g>`;
});
frames['church-a-peak'] = scene('church',(w,h) => {
  const d='M761 750A28 28 0 1 0 705 750A28 28 0 1 0 761 750Z';
  const windows=['M309 998V954Q310 932 320 918Q329 930 329 952V998Z','M416 995V916Q418 886 430 877Q442 891 442 915V994Z','M505 987V909Q508 877 519 864Q530 880 531 909V986Z','M664 986V903Q666 873 677 859Q691 875 690 904V986Z','M965 773V746Q965 734 973 725Q979 736 979 748V774Z','M968 991V971Q969 960 975 951Q981 962 981 973V992Z'];
  return split(d,w,h)+use('mask="url(#rest)"')+`<g transform="rotate(16 733 750)">${use('clip-path="url(#piece)"')}</g><g fill="${gold}" opacity=".78">${windows.map(d=>`<path d="${d}"/>`).join('')}</g>`;
});
frames['church-b-peak'] = scene('church',() => use()+`
  <defs><linearGradient id="bellGold"><stop stop-color="${gold}"/><stop offset=".5" stop-color="${paleGold}"/><stop offset="1" stop-color="${amber}"/></linearGradient></defs>
  <g transform="rotate(-13 860 504)" fill="url(#bellGold)" stroke="${ochre}" stroke-width="3"><path d="M846 517Q847 504 860 504Q873 504 874 517L878 543Q879 548 884 553H837Q843 548 843 541Z"/><circle cx="860" cy="556" r="5"/></g>
  <g fill="none" stroke="${ochre}" stroke-width="6" stroke-linecap="round" opacity=".8"><path d="M805 112Q775 157 800 202M1021 112Q1051 157 1026 202"/><path d="M765 93Q723 157 761 221M1061 93Q1103 157 1065 221"/></g>`);
frames['church-c-peak'] = scene('church',() => use()+`
  <defs><linearGradient id="feather" x2="0" y2="1"><stop stop-color="${ivory}"/><stop offset="1" stop-color="${featherShade}"/></linearGradient></defs>
  <g transform="translate(1048 192) rotate(-12) scale(1.25)" stroke="${slate}" stroke-opacity=".65" stroke-width="2.5" stroke-linejoin="round"><path fill="url(#feather)" d="M0 0Q-34 -16 -48 -65Q-19 -51 17 -17Q38 -20 50 -7Q56 1 45 8Q20 24 -4 13L-26 34L-21 11Q-47 13 -65 -1Q-30 1 0 0Z"/><path fill="${ivory}" d="M7 -6Q4 -42 25 -63Q29 -35 26 -11"/><path fill="${gold}" stroke="none" d="M50 -5L61 0L49 4Z"/><circle cx="44" cy="-3" r="2" fill="${slate}" stroke="none"/></g>`);
for (const [name,svg] of Object.entries(frames)) fs.writeFileSync(path.join(__dirname,`${name}.svg`),svg);
fs.writeFileSync(path.join(__dirname,'sources.json'),JSON.stringify({originalWebpSha256:hashes,frames:Object.keys(frames),newElements:{sun:'12 round-ended gold ray strokes, top/side field only to protect ground shadow',rain:'No new drops: five original raster drops isolated and translated',churchA:'Warm gold overlays confined to original blue glass; original quatrefoil patch rotated',churchB:'New small vector bell and two pairs of thin sound arcs; source tower has louvers, no exposed bell',churchC:'New single vector dove silhouette with two feather tones, gold beak and small eye'},status:'Static proposals only; timing, hover exit and loops not implemented'},null,2));
console.log(`Wrote ${Object.keys(frames).length} editable SVG keyframes`);
