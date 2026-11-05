const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { chromium } = require(process.env.PLAYWRIGHT_CORE || '/Users/lu/.buzz/.scratch/tl-1104/node_modules/playwright-core');
const out = __dirname;
const review = process.env.MAN_REVIEW || '/Volumes/Extreme SSD/agent-scratch/man-steep-a-review-20261104';
const site = '/Users/lu/Desktop/portfolio_perfect';
(async () => {
  const browser = await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
    await page.goto('http://localhost:3000/man-truck-bus',{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:path.join(review,'BEFORE_1440.png')});
    const snapshot = await page.evaluate(() => {
      const clone = document.body.cloneNode(true);
      clone.querySelectorAll('script,nextjs-portal,link[rel="preload"]').forEach(n=>n.remove());
      return {
        body:clone.innerHTML,
        bodyClass:document.body.className,
        htmlClass:document.documentElement.className,
        styles:[...document.styleSheets].map(sheet=>({base:sheet.href||location.href,text:[...sheet.cssRules].map(r=>r.cssText).join('\n')})),
        hero:document.querySelector('.mc-cover').outerHTML
      };
    });
    const resources = new Map();
    async function localize(raw, base='http://localhost:3000/') {
      if (!raw || raw.startsWith('data:') || decodeURIComponent(raw).startsWith('#')) return raw;
      const u = new URL(raw,base);
      if (u.origin!=='http://localhost:3000') return raw;
      if(resources.has(u.href)) return resources.get(u.href);
      const ext = path.extname(u.pathname).slice(0,8)||'.bin';
      const name='assets/'+crypto.createHash('sha256').update(u.href).digest('hex').slice(0,14)+ext;
      const response=await page.request.get(u.href);
      if(!response.ok()) throw Error('Resource failed: '+u.pathname+' '+response.status());
      fs.mkdirSync(path.join(out,'assets'),{recursive:true});
      fs.writeFileSync(path.join(out,name),await response.body());
      resources.set(u.href,name);
      return name;
    }
    let css='';
    for(const sheet of snapshot.styles){
      let chunk=sheet.text;
      const matches=[...chunk.matchAll(/url\((?:"([^"]*)"|'([^']*)'|([^)]*))\)/g)];
      for(const m of matches) chunk=chunk.replace(m[0],`url("${await localize(m[1] ?? m[2] ?? m[3],sheet.base)}")`);
      css+=chunk+'\n';
    }
    let body=snapshot.body;
    const matches=[...body.matchAll(/\b(src|poster)="([^"]+)"/g)];
    for(const m of matches) body=body.replace(m[0],`${m[1]}="${await localize(m[2])}"`);
    body=body.replace(/\bsrcset="[^"]*"/g,'');
    // Preserve image links; route other snapshot navigation back to the existing site.
    for(const m of [...body.matchAll(/href="(\/[^"#]*)"/g)]) {
      const val=/\.(webp|png|jpg|svg)$/.test(m[1])?await localize(m[1]):'http://localhost:3000'+m[1];
      body=body.replace(m[0],`href="${val}"`);
    }
    fs.writeFileSync(path.join(out,'snapshot.css'),css.split('\n').map(line=>line.trimEnd()).join('\n'));
    fs.writeFileSync(path.join(out,'source-body.html'),body);
    fs.writeFileSync(path.join(out,'before.html'),`<!doctype html><html lang="en" class="${snapshot.htmlClass}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>MAN · Source snapshot</title><link rel="stylesheet" href="snapshot.css"></head><body class="${snapshot.bodyClass}">${body}</body></html>`);
    const files=['app/man-truck-bus/page.tsx','app/man-truck-bus/case.css','public/assets/man-fleet-uptime/stuttgart-hero.webp'];
    const manifest={capturedAt:new Date().toISOString(),source:'http://localhost:3000/man-truck-bus',...snapshot,styles:undefined,body:undefined,sourceHashes:Object.fromEntries(files.map(f=>[f,crypto.createHash('sha256').update(fs.readFileSync(path.join(site,f))).digest('hex')])),resources:Object.fromEntries(resources)};
    fs.writeFileSync(path.join(out,'SOURCE_MANIFEST.json'),JSON.stringify(manifest,null,2));
    await page.setViewportSize({width:390,height:844});
    await page.screenshot({path:path.join(review,'BEFORE_390.png')});
    console.log(JSON.stringify({resources:resources.size,cssBytes:css.length,bodyBytes:body.length,sourceHashes:manifest.sourceHashes}));
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
