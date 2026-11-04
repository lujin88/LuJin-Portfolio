const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/Users/lu/.buzz/.scratch/tl-1104/node_modules/playwright-core');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const os = require('node:os');
assert.equal(process.env.TEST_LOCK_HELD, '1');
assert.ok(os.loadavg()[1] <= 10, '5-minute load exceeds 10');
const root = process.env.REVIEW_COMPARE_OUT || '/Users/lu/.buzz/OUTBOX/WA_CARD_HOVER_20261104';
fs.mkdirSync(root, { recursive: true });
const out = fs.mkdtempSync(path.join(root, 'R5_COMPARE_'));
const wait = ms => new Promise(r => setTimeout(r, ms));
const details = [
  ['Perch', 'x +24px / rotate -8° / scale 1.00'],
  ['Church', 'y -12px / rotate 0° / scale 1.06'],
  ['Sun', 'y -8px / rotate +26° / scale 1.04'],
  ['Rain', 'y +14px / rotate -5° / scale 1.00'],
  ['Coat', 'x/y 0px / rotate -10° / scale 1.00'],
  ['Hat', 'y -16px / rotate +10° / scale 1.00'],
  ...['Idle', 'Wave', 'Get dressed', 'Walk & explore'].map(n => [n, 'Label y -12px / rotate 0° / scale 1.00'])
];
(async () => {
  const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
    await page.goto(process.env.REVIEW_URL || 'http://127.0.0.1:4687/scene.html', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('DOM.enable');
    await cdp.send('CSS.enable');
    const { root: doc } = await cdp.send('DOM.getDocument');
    const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: doc.nodeId, selector: '.vocab-label' });
    const fonts = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
    assert.ok(fonts.fonts.some(f => /Poppins/.test(f.familyName) && f.isCustomFont));
    const records = [];
    for (let i = 0; i < details.length; i++) {
      const isPose = i >= 6;
      const card = page.locator(isPose ? '.pose' : '.vocab-item').nth(isPose ? i - 6 : i);
      await page.mouse.move(1, 1);
      await card.scrollIntoViewIfNeeded();
      await wait(260);
      const rect = await card.boundingBox();
      const clip = { x: Math.floor(rect.x - 16), y: Math.floor(rect.y - 20), width: Math.ceil(rect.width + 32), height: Math.ceil(rect.height + 40) };
      const still = path.join(out, `${i + 1}_STILL.png`);
      await page.screenshot({ path: still, clip });
      await card.hover();
      await wait(400);
      if (isPose) {
        await card.locator('video.is-playing').waitFor();
        await card.locator('video').evaluate(async video => {
          video.pause();
          await new Promise(resolve => {
            video.addEventListener('seeked', resolve, { once: true });
            video.currentTime = 0.75;
          });
        });
      }
      const target = card.locator(isPose ? ':scope > span:last-child' : 'img');
      const matrix = await target.evaluate(el => getComputedStyle(el).transform);
      assert.notEqual(matrix, 'none');
      const peak = path.join(out, `${i + 1}_PEAK.png`);
      await page.screenshot({ path: peak, clip });
      const bounds = await target.boundingBox();
      const duration = await target.evaluate(el => getComputedStyle(el).transitionDuration);
      assert.equal(duration, '0.2s');
      records.push({ name: details[i][0], amplitude: details[i][1], clip, bounds, matrix, duration, still, peak });
    }
    const data = p => 'data:image/png;base64,' + fs.readFileSync(p).toString('base64');
    const html = `<!doctype html><meta charset="utf-8"><title>WA hover R5 comparison</title>
      <style>@font-face{font-family:Poppins;src:url(data:font/woff2;base64,${fs.readFileSync(path.join(__dirname,'assets/a218039a3287bcfd-s.p.43zbiuwnnoiok.woff2')).toString('base64')})}
      *{box-sizing:border-box}body{margin:0;padding:32px;background:#edf3e7;color:#0a0a0a;font:14px Poppins,sans-serif}h1{font-size:26px;margin:0 0 8px}p{margin:6px 0;color:#61707a}.grid{display:grid;grid-template-columns:repeat(2,560px);gap:24px;margin-top:24px}.card{border-top:1px solid #d8d4cb;padding:16px 0 0}h2{font-size:18px;margin:0 0 6px}.pair{display:flex;gap:12px;align-items:flex-start;margin-top:12px}figure{margin:0}figcaption{font-size:12px;margin:0 0 8px;color:#61707a}img{display:block;max-width:none}.amp{font-size:13px;min-height:22px}.note{font-size:11px;min-height:18px}</style>
      <h1>Weather Aquarium — hover R5</h1><p>1440px source viewport / 1 CSS px = 1 image px / native crops, no resizing</p>
      <p>Left: still · Right: hover endpoint · 200ms · Poppins loaded</p>
      <p>Character: label at peak; existing video sampled at 0.75s. No new character animation.</p>
      <div class="grid">${records.map((r,i) => `<section class="card"><h2>${String(i+1).padStart(2,'0')} / ${r.name}</h2><div class="amp">${r.amplitude}</div><p class="note">${i>=6?'Label peak + existing video at 0.75s':'Artwork only; speech button and label stay fixed'}</p><div class="pair"><figure><figcaption>STILL / x 0 · y 0 · rotate 0 · scale 1</figcaption><img src="${data(r.still)}" width="${r.clip.width}" height="${r.clip.height}"></figure><figure><figcaption>HOVER / ${r.clip.width} × ${r.clip.height}px crop</figcaption><img src="${data(r.peak)}" width="${r.clip.width}" height="${r.clip.height}"></figure></div></section>`).join('')}</div>`;
    fs.writeFileSync(path.join(out,'COMPARISON.html'),html);
    await page.setViewportSize({width:1208,height:900});
    await page.setContent(html);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(out,'WA_HOVER_R5_STILL_VS_PEAK.png'),fullPage:true });
    fs.writeFileSync(path.join(out,'RESULTS.json'),JSON.stringify({fonts,records},null,2));
    console.log(JSON.stringify({out,fonts,checks:records.length}));
  } finally { await browser.close(); }
})().catch(e => { console.error(e);process.exitCode=1; });
