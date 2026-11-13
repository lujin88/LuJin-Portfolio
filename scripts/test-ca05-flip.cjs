/* Run against a production preview through harness-core/scripts/test-lock.sh.
 * BASE_URL=http://localhost:4648 OUTPUT_DIR=/tmp/ca05-flip node scripts/test-ca05-flip.cjs
 * WebKit requires PLAYWRIGHT_BROWSERS_PATH=/Users/lu/.buzz/.playwright-browsers.
 */
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { chromium, webkit } = require('playwright')

const outputDir = process.env.OUTPUT_DIR || fs.mkdtempSync(path.join(os.tmpdir(), 'ca05-flip-'))
const baseURL = process.env.BASE_URL || 'http://localhost:4648'
const chromePath = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const results = []
fs.mkdirSync(outputDir, { recursive: true })

async function sample(card) {
  return card.evaluate(node => {
    const style = getComputedStyle(node)
    const cosine = style.transform === 'none' ? 1 : new DOMMatrixReadOnly(style.transform).m11
    return {
      pressed: node.getAttribute('aria-pressed'),
      cosine,
      front: getComputedStyle(node.children[0]).visibility,
      back: getComputedStyle(node.children[1]).visibility,
      running: node.getAnimations().filter(animation => animation.playState === 'running').length,
      duration: style.transitionDuration,
    }
  })
}

function assertFacing(state, label) {
  assert.equal(state.front, state.cosine < 0 ? 'hidden' : 'visible', `${label}: front`)
  assert.equal(state.back, state.cosine < 0 ? 'visible' : 'hidden', `${label}: back`)
}

async function open(browser, language, motion, width = 390) {
  const context = await browser.newContext({ viewport: { width, height: 844 }, reducedMotion: motion })
  await context.addInitScript(lang => localStorage.setItem('site-lang', lang), language)
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(`${baseURL}/client-advisory`, { waitUntil: 'networkidle' })
  await page.waitForFunction(lang => document.documentElement.lang === lang, language)
  await page.evaluate(() => document.fonts.ready)
  await page.locator('#s05-headline').scrollIntoViewIfNeeded()
  await page.evaluate(() => window.scrollBy(0, document.querySelector('#s05-headline').getBoundingClientRect().top - 100))
  await page.waitForTimeout(300)
  return { context, page, errors }
}

async function screenshot(page, name) {
  await page.screenshot({ path: path.join(outputDir, `${name}.png`) })
}

async function exerciseCards(browser, engine, language, motion) {
  const { context, page, errors } = await open(browser, language, motion)
  const key = `${engine}-${language}-${motion}`
  const cards = page.locator('#design-principles button')
  const states = []
  const settle = motion === 'reduce' ? 50 : 740
  try {
    assert.equal(await cards.count(), 3)
    await screenshot(page, `${key}-front`)
    for (let index = 0; index < 3; index++) {
      const card = cards.nth(index)
      assertFacing(await sample(card), `${key}/${index}/initial`)
      await card.evaluate(node => node.click())
      await page.waitForTimeout(settle)
      let state = await sample(card)
      assertFacing(state, `${key}/${index}/back`)
      assert.equal(state.pressed, 'true')
      if (motion === 'reduce') assert.equal(state.running, 0)
      states.push(state)
      await card.evaluate(node => node.click())
      await page.waitForTimeout(settle)
      state = await sample(card)
      assertFacing(state, `${key}/${index}/return`)
      assert.equal(state.pressed, 'false')
    }

    const first = cards.first()
    await first.focus()
    await page.keyboard.press('Space')
    await page.waitForTimeout(settle)
    assert.equal((await sample(first)).pressed, 'true')
    assertFacing(await sample(first), `${key}/space`)
    await page.keyboard.press('Enter')
    await page.waitForTimeout(settle)
    assert.equal((await sample(first)).pressed, 'false')
    assertFacing(await sample(first), `${key}/enter`)

    await first.evaluate(node => node.click())
    if (motion === 'no-preference') {
      const start = Date.now()
      for (const targetMs of [40, 160, 480]) {
        await page.waitForTimeout(Math.max(0, targetMs - (Date.now() - start)))
        const state = await sample(first)
        assertFacing(state, `${key}/frame${targetMs}`)
        states.push({ targetMs, actualMs: Date.now() - start, ...state })
        // Capture follows the sample; the screenshot is not an exact-time animation frame.
        await screenshot(page, `${key}-flip-${targetMs}`)
      }
      await page.waitForTimeout(740)
      assertFacing(await sample(first), `${key}/settled`)
      await screenshot(page, `${key}-back`)
      // Reverse twice before the transition completes, then settle on the front.
      await first.evaluate(node => node.click())
      await page.waitForTimeout(70)
      await first.evaluate(node => node.click())
      await page.waitForTimeout(50)
      await first.evaluate(node => node.click())
      await page.waitForTimeout(740)
      const state = await sample(first)
      assertFacing(state, `${key}/rapid-reverse`)
      assert.equal(state.pressed, 'false')
      states.push(state)
    } else {
      await page.waitForTimeout(50)
      assertFacing(await sample(first), `${key}/reduced-back`)
      await screenshot(page, `${key}-back`)
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
    assert.equal(overflow, false, `${key}: horizontal overflow`)
    assert.deepEqual(errors, [], `${key}: page errors`)
    results.push({ key, states, errors, overflow })
  } finally {
    await context.close()
  }
}

async function checkLayout(browser, engine, width) {
  const { context, page, errors } = await open(browser, 'en', 'reduce', width)
  try {
    await screenshot(page, `${engine}-${width}-layout`)
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
    for (const card of await page.locator('#design-principles button').all()) {
      assertFacing(await sample(card), `${engine}/${width}`)
    }
    assert.deepEqual(errors, [])
    results.push({ engine, width, layout: 'pass' })
  } finally {
    await context.close()
  }
}

async function main() {
  for (const engine of ['webkit', 'chrome']) {
    const browser = await (engine === 'webkit'
      ? webkit.launch()
      : chromium.launch({ executablePath: chromePath }))
    try {
      for (const language of ['en', 'de']) {
        for (const motion of ['no-preference', 'reduce']) {
          await exerciseCards(browser, engine, language, motion)
        }
      }
      for (const width of [700, 1440]) await checkLayout(browser, engine, width)
    } finally {
      await browser.close()
    }
  }
  fs.writeFileSync(path.join(outputDir, 'results.json'), JSON.stringify(results, null, 2))
  console.log(`PASS: eight browser/language/motion combinations, three cards, keyboard, reversal, sampled animation, 700/1440 layouts. Evidence: ${outputDir}`)
}

main().catch(error => {
  fs.writeFileSync(path.join(outputDir, 'failure.json'), JSON.stringify({ error: error.stack, results }, null, 2))
  console.error(error)
  process.exit(1)
})
