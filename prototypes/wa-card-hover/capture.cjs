const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/Users/lu/.buzz/REPOS/Weather-Aquarium/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const out = path.resolve(process.env.REVIEW_OUT || '/Users/lu/.buzz/OUTBOX/WA_CARD_HOVER_20261104');
const url = process.env.REVIEW_URL || 'http://127.0.0.1:4687/scene.html';
fs.mkdirSync(out, { recursive: true });
const report = { head: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), runs: [] };
const idle = ms => new Promise(resolve => setTimeout(resolve, ms));
const transform = locator => locator.evaluate(el => getComputedStyle(el).transform);
(async () => {
  const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
  try {
    for (const mode of ['NORMAL', 'SLOW', 'REDUCED', 'TOUCH_390']) {
      const touch = mode === 'TOUCH_390';
      const reduced = mode === 'REDUCED';
      const slow = mode === 'SLOW';
      const size = touch ? { width: 390, height: 844 } : { width: 1440, height: 900 };
      const context = await browser.newContext({ viewport: size, hasTouch: touch, isMobile: touch,
        reducedMotion: reduced ? 'reduce' : 'no-preference', recordVideo: { dir: path.join(out, 'raw'), size } });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const cdp = await context.newCDPSession(page);
      if (slow) {
        await cdp.send('Animation.enable');
        await cdp.send('Animation.setPlaybackRate', { playbackRate: 0.25 });
        await page.locator('#mode').evaluate(el => { el.textContent = '4× slow · CSS transitions'; });
      }
      await page.screenshot({ path: path.join(out, `${mode}_BEFORE.png`), fullPage: true });
      const matrices = [];
      const cards = page.locator('.vocab-item');
      for (let i = 0; i < 6; i++) {
        const card = cards.nth(i);
        await card.scrollIntoViewIfNeeded();
        if (touch) await card.locator('img').tap();
        else await card.hover();
        await idle(slow ? 1650 : 550);
        const matrix = await transform(card.locator('img'));
        matrices.push(matrix);
        if (touch || reduced) assert.equal(matrix, 'none', `${mode} vocabulary ${i} must stay still`);
        else assert.notEqual(matrix, 'none', `${mode} vocabulary ${i} must move`);
        if (i === 2 || i === 5) await page.screenshot({ path: path.join(out, `${mode}_VOCAB_${i + 1}.png`) });
        await idle(slow ? 600 : 300);
        if (!touch) await page.mouse.move(2, 2);
        await idle(slow ? 950 : 300);
        assert.equal(await transform(card.locator('img')), 'none', 'Hover exit must return to still');
      }
      if (!touch && !reduced) assert.equal(new Set(matrices).size, 6, 'All six gestures must be distinct');
      await page.locator('#motion').scrollIntoViewIfNeeded();
      const poses = page.locator('.pose');
      for (let i = 0; i < 4; i++) {
        const pose = poses.nth(i);
        await pose.scrollIntoViewIfNeeded();
        if (touch) await pose.tap();
        else await pose.hover();
        await idle(slow ? 1700 : 750);
        const label = pose.locator(':scope > span:last-child');
        const matrix = await transform(label);
        if (touch || reduced) assert.equal(matrix, 'none', 'Touch/reduced label remains still');
        else assert.equal(matrix, 'matrix(1, 0, 0, 1, 0, -4)');
        if (reduced) assert.equal(await pose.locator('video').evaluate(v => v.paused), true);
        else await pose.locator('video.is-playing').waitFor({ timeout: 10000 });
        await page.screenshot({ path: path.join(out, `${mode}_POSE_${i + 1}.png`) });
        await idle(slow ? 1000 : 700);
        if (!touch) {
          await page.mouse.move(2, 2);
          await idle(slow ? 950 : 300);
          assert.equal(await transform(label), 'none');
          assert.equal(await pose.locator('video').evaluate(v => v.paused), true);
        }
      }
      if (mode === 'NORMAL') {
        await cards.first().scrollIntoViewIfNeeded();
        await cards.first().hover();
        await idle(80);
        await page.mouse.move(2, 2);
        await idle(300);
        assert.equal(await transform(cards.first().locator('img')), 'none', 'Interrupted hover returns');
        await cards.first().hover();
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await idle(100);
        assert.equal(await transform(cards.first().locator('img')), 'none', 'Live reduce cancels motion');
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        await page.mouse.move(2, 2);
        await poses.first().focus();
        await idle(400);
        assert.equal(await transform(poses.first().locator(':scope > span:last-child')), 'none', 'Keyboard does not add label motion');
      }
      const geometry = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth }));
      assert.ok(geometry.scrollWidth <= geometry.width, 'No horizontal page overflow');
      assert.deepEqual(errors, []);
      report.runs.push({ mode, matrices, geometry, errors, pass: true });
      const video = page.video();
      await context.close();
      const raw = await video.path();
      execFileSync('ffmpeg', ['-y', '-i', raw, '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '22',
        '-pix_fmt', 'yuv420p', '-map_metadata', '-1', '-fflags', '+bitexact', '-flags:v', '+bitexact',
        '-movflags', '+faststart', path.join(out, `WA_HOVER_${mode}.mp4`)], { stdio: 'ignore' });
      console.log(`${mode}: passed`);
    }
    fs.writeFileSync(path.join(out, 'RESULTS.json'), JSON.stringify(report, null, 2));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
