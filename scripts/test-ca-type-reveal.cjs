/* Run against an already running root app through harness-core/scripts/test-lock.sh.
 * BASE_URL=http://localhost:4620 TEST_ARTIFACT_DIR=/tmp/ca-check node scripts/test-ca-type-reveal.cjs
 */
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { chromium, webkit } = require('playwright')

const baseURL = process.env.BASE_URL || 'http://localhost:4620'
const artifactDir = process.env.TEST_ARTIFACT_DIR
const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const blocksSelector = '#session-03-research [data-copy-reveal]'
const measurements = []

function near(actual, expected, label) {
  assert.ok(Math.abs(parseFloat(actual) - expected) < 0.06, `${label}: ${actual}, expected ${expected}`)
}
function scale(width, mobile, desktop) {
  return mobile + (desktop - mobile) * Math.max(0, Math.min(1, (width - 720) / 304))
}
async function open(browser, { width = 1440, language = 'en', javaScriptEnabled = true, reducedMotion = 'no-preference' } = {}) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, javaScriptEnabled, reducedMotion })
  if (javaScriptEnabled) await context.addInitScript(lang => localStorage.setItem('site-lang', lang), language)
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(`${baseURL}/client-advisory`, { waitUntil: 'domcontentloaded' })
  await page.evaluate(() => document.fonts.ready)
  if (javaScriptEnabled) {
    await page.waitForFunction(lang => document.documentElement.lang === lang, language)
    if (reducedMotion === 'no-preference') await page.locator('#session-03-research [class*="copyReady"]').waitFor()
  }
  return { context, page, errors }
}
async function blockStyles(page) {
  return page.locator(blocksSelector).evaluateAll(nodes => nodes.map(node => {
    const style = getComputedStyle(node)
    return { index: node.dataset.copyReveal, opacity: Number(style.opacity), transform: style.transform, delay: style.transitionDelay, duration: style.transitionDuration, property: style.transitionProperty, visible: node.className.includes('copyVisible') }
  }))
}
async function checkType(page, width) {
  for (const [selector, mobileSize, desktopSize, mobileLine, desktopLine, weight] of [
    ['.ca-main .ca-h1', 40, 60, 44, 64, '700'],
    ['.ca-main .ca-h2', 40, 40, 44, 44, '600'],
    ['.ca-main .ca-h3, .ca-main [class*="cardTitle"]', 24, 28, 29, 33.6, '600'],
  ]) {
    const values = await page.locator(selector).evaluateAll(nodes => nodes.map(node => {
      const style = getComputedStyle(node)
      return { text: node.textContent.trim().slice(0, 60), size: style.fontSize, line: style.lineHeight, weight: style.fontWeight }
    }))
    assert.ok(values.length, `${selector} exists`)
    for (const value of values) {
      near(value.size, scale(width, mobileSize, desktopSize), `${width} ${value.text} size`)
      near(value.line, scale(width, mobileLine, desktopLine), `${width} ${value.text} line`)
      assert.equal(value.weight, weight, `${value.text} weight`)
    }
  }
  const closing = await page.locator('#closing-statement').evaluate(node => {
    const style = getComputedStyle(node)
    return { size: style.fontSize, line: style.lineHeight, weight: style.fontWeight }
  })
  near(closing.size, scale(width, 18, 22), 'closing lead size')
  near(closing.line, scale(width, 27, 33), 'closing lead line')
  assert.equal(closing.weight, '400', 'closing remains paragraph weight')
  if (width === 1440) {
    const heading = await page.locator('#session-04-heading').evaluate(node => ({
      height: node.getBoundingClientRect().height,
      line: parseFloat(getComputedStyle(node).lineHeight),
    }))
    assert.ok(heading.height <= heading.line * 2 + 1, 'desktop 04 title fits two lines')
  }
  if (width === 1025) {
    const diagramWidth = await page.locator('#session-04 .s04-scene').evaluate(node => node.getBoundingClientRect().width)
    const expectedDiagramWidth = (width - 2 * 64) * 0.57 * 0.96
    assert.ok(Math.abs(diagramWidth - expectedDiagramWidth) < 1, `1025: preserve main's 64px gutters and 57% diagram column, got ${diagramWidth}`)
    const headingContained = await page.locator('#session-04 h2').evaluate(node => {
      const bounds = node.getBoundingClientRect()
      const text = document.createRange()
      text.selectNodeContents(node)
      return [...text.getClientRects()].every(rect => rect.left >= bounds.left - 1 && rect.right <= bounds.right + 1)
    })
    assert.ok(headingContained, '1025: heading text stays in its column in both languages')
    const splitWords = await page.locator('#session-04 h2').evaluate(node => {
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT)
      const split = []
      while (walker.nextNode()) {
        const text = walker.currentNode
        for (const match of text.textContent.matchAll(/\S+/g)) {
          const range = document.createRange()
          range.setStart(text, match.index)
          range.setEnd(text, match.index + match[0].length)
          const lines = new Set([...range.getClientRects()].map(rect => Math.round(rect.top)))
          if (lines.size > 1) split.push(match[0])
        }
      }
      return split
    })
    if (await page.locator('#session-04 h2').getAttribute('lang') !== 'de') {
      assert.deepEqual(splitWords, [], '1025: English title words stay whole')
    }
  }
  const clippedCharacters = await page.locator('#session-04 h2').evaluate(node => {
    const bounds = node.getBoundingClientRect()
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT)
    const clipped = []
    while (walker.nextNode()) {
      const text = walker.currentNode
      for (let i = 0; i < text.length; i++) {
        if (/\s/.test(text.textContent[i])) continue
        const range = document.createRange()
        range.setStart(text, i)
        range.setEnd(text, i + 1)
        if ([...range.getClientRects()].some(rect => rect.left < bounds.left - 1 || rect.right > bounds.right + 1)) {
          clipped.push(text.textContent[i])
        }
      }
    }
    return clipped
  })
  assert.deepEqual(clippedCharacters, [], `${width}: every title character stays within its column`)
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${width}: horizontal overflow`)
}
async function checkStatic(browser, options) {
  const { page, context, errors } = await open(browser, options)
  try {
    const styles = await blockStyles(page)
    assert.equal(styles.length, 5)
    for (const block of styles) {
      assert.equal(block.opacity, 1, `${JSON.stringify(options)} block ${block.index} visible`)
      assert.equal(block.transform, 'none', `${JSON.stringify(options)} no reveal offset`)
    }
    await checkType(page, options.width)
    assert.deepEqual(errors, [])
    measurements.push({ ...options, staticBlocks: styles })
  } finally { await context.close() }
}

async function main() {
  if (artifactDir) fs.mkdirSync(artifactDir, { recursive: true })
  const engine = process.env.BROWSER || 'chromium'
  const browser = engine === 'webkit'
    ? await webkit.launch({ headless: true })
    : await chromium.launch({ executablePath: chrome, headless: true })
  try {
    if (process.env.TITLES_ONLY === '1') {
      for (const language of ['en', 'de']) {
        for (const width of [390, 700, 850, 1024, 1025, 1440]) {
          const { page, context, errors } = await open(browser, { width, language, reducedMotion: 'reduce' })
          try {
            await checkType(page, width)
            assert.deepEqual(errors, [])
            if (artifactDir && width === 1025) {
              await page.locator('#session-04').screenshot({ path: path.join(artifactDir, `${engine}-${language}-1025.png`) })
            }
          } finally { await context.close() }
        }
      }
      console.log(`PASS: ${engine} EN/DE titles at six widths; 1025 diagram width, containment and whole words`)
      return
    }
    for (const language of ['en', 'de']) {
      const { page, context, errors } = await open(browser, { language })
      try {
        const initial = await blockStyles(page)
        assert.equal(initial.length, 5)
        initial.forEach((block, index) => {
          assert.equal(block.opacity, 0, `offscreen block ${index} starts hidden after hydration`)
          assert.equal(block.visible, false)
        })
        const samples = await page.evaluate(async selector => {
          const nodes = [...document.querySelectorAll(selector)]
          window.scrollTo({ top: scrollY + nodes[0].getBoundingClientRect().top - 120, behavior: 'instant' })
          const result = []
          const started = performance.now()
          while (performance.now() - started < 1450) {
            result.push({ ms: performance.now() - started, opacity: nodes.map(node => Number(getComputedStyle(node).opacity)) })
            await new Promise(resolve => setTimeout(resolve, 40))
          }
          return result
        }, blocksSelector)
        const final = await blockStyles(page)
        final.forEach((block, index) => {
          assert.equal(block.opacity, 1)
          assert.equal(block.visible, true)
          near(parseFloat(block.delay) * 1000, index * 120, 'paragraph delay')
          assert.ok(block.duration.split(',').every(value => parseFloat(value) === 0.7), '700ms text duration')
          assert.equal(block.property, 'opacity, transform')
        })
        const starts = initial.map((_, index) => samples.find(sample => sample.opacity[index] > 0.01)?.ms)
        if (artifactDir) fs.writeFileSync(path.join(artifactDir, `timing-${language}.json`), JSON.stringify({ starts, samples }, null, 2))
        assert.ok(starts.every(time => time !== undefined), 'all paragraphs animate')
        for (let index = 1; index < starts.length; index++) assert.ok(starts[index] > starts[index - 1], `paragraphs begin in reading order: ${language} ${JSON.stringify(starts)}`)
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))
        await page.waitForTimeout(100)
        await page.locator('#session-03-heading').evaluate(node => scrollTo({ top: scrollY + node.getBoundingClientRect().top - 120, behavior: 'instant' }))
        for (const block of await blockStyles(page)) assert.equal(block.opacity, 1, 'no replay on return scroll')
        await page.emulateMedia({ reducedMotion: 'reduce' })
        for (const block of await blockStyles(page)) assert.equal(block.transform, 'none', 'live reduced-motion toggle')
        await page.emulateMedia({ reducedMotion: 'no-preference' })
        const quotePositions = []
        for (const width of [390, 700, 850, 1024, 1025, 1440]) {
          await page.setViewportSize({ width, height: 900 })
          await checkType(page, width)
          quotePositions.push({ width, x: await page.locator('#session-03-research blockquote').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().x)) })
          if (width < 1024) {
          assert.ok(await page.locator('#session-03-research blockquote').evaluateAll(nodes => nodes.every(node => node.getClientRects().length === 0)), 'main keeps mobile/tablet research quotes hidden')
        }
        }
        assert.deepEqual(errors, [])
        measurements.push({ language, starts, samples, quotePositions })
      } finally { await context.close() }
    }
    for (const width of [390, 700, 1440]) {
      await checkStatic(browser, { width, reducedMotion: 'reduce' })
      await checkStatic(browser, { width, javaScriptEnabled: false })
    }
    if (artifactDir) fs.writeFileSync(path.join(artifactDir, 'regression.json'), JSON.stringify(measurements, null, 2))
    console.log('PASS: EN/DE type scale (390/700/850/1024/1025/1440), 1025 diagram width, paragraph order/timing/once, reduced motion, no JavaScript, resize and overflow')
  } finally { await browser.close() }
}
main().catch(error => { console.error(error.stack); process.exitCode = 1 })
