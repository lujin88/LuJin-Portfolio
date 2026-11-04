const fs=require('node:fs');
const path=require('node:path');
const root=__dirname;
const manifest=JSON.parse(fs.readFileSync(path.join(root,'SOURCE_MANIFEST.json'),'utf8'));
const dispatch=manifest.resources['http://localhost:3000/assets/man-fleet-uptime/dispatch.webp'];
if(!dispatch)throw Error('Missing source dispatch screenshot');
const fields=[
 ['Departure / commitment',28,258,'10:00 · TGX · 042. Munich to Stuttgart. Original 042, vehicle checked. ETA 12:30. Customer limit 13:00.'],
 ['Blocking this shift',330,225,'Driver cover needed. No assigned driver.'],
 ['Next action / owner',634,308,'Next 09:10, in 10 minutes. Contact a candidate and verify full shift. Max H.'],
 ['Contact',966,190,'Sofia Keller. Not contacted.']
];
const cards=fields.map(([label,x,w,alt])=>`<div class="man-motion-card" style="width:${w+22}px"><span class="man-motion-card-label">${label}</span><div class="man-motion-crop" style="width:${w}px;height:95px"><img src="${dispatch}" width="1440" height="960" alt="${alt}" style="left:-${x}px"></div></div>`).join('\n');
const section=`<section class="man-motion" aria-labelledby="man-motion-title">
 <div class="man-motion-stage">
  <p class="man-motion-over">10:00 to Stuttgart</p>
  <h2 class="man-motion-slogan" id="man-motion-title">A truck can be ready.<br><em>Its shift can still be at risk.</em></h2>
  <h3 class="man-motion-final">One shift, one shared record.</h3>
  <div class="man-motion-assembly">
   <div class="man-motion-board"><div class="man-motion-board-heading"><span>10:00 · TGX · 042</span><small>Munich → Stuttgart</small></div></div>
   <div class="man-motion-cards">${cards}</div>
  </div>
  <p class="man-motion-note">Fictional operations data from the case study. Four fields from the same dispatch record.</p>
 </div>
</section>`;
let body=fs.readFileSync(path.join(root,'source-body.html'),'utf8');
const marker='<div class="mc-width">';
if(!body.includes(marker))throw Error('Source insertion point not found');
body=body.replace(marker,section+marker);
fs.writeFileSync(path.join(root,'prototype.html'),`<!doctype html><html lang="en" class="${manifest.htmlClass}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>MAN · Scroll prototype A</title><link rel="icon" href="data:,"><link rel="stylesheet" href="snapshot.css"><link rel="stylesheet" href="motion.css"><script src="motion.js" defer></script></head><body class="${manifest.bodyClass}">${body}</body></html>`);
console.log('Built prototype.html from '+manifest.capturedAt);
