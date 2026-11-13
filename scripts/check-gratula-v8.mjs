// Run through harness-core/scripts/test-lock.sh. BASE_URL points to this branch's preview.
import assert from 'node:assert/strict'
import { chromium } from 'playwright'

const base = process.env.BASE_URL || 'http://localhost:4622'
const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
})

try {
  for (const width of [390, 700, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    for (const route of ['/lab/party-planner', '/lab/party-planner/gratula.html']) {
      await page.goto(new URL(route, base).href, { waitUntil: 'domcontentloaded' })
      await page.locator('.gratula-story').waitFor()
      await page.evaluate(() => document.fonts.ready)
      await page.locator('.gratula-story img').evaluateAll(images =>
        Promise.all(images.map(image => image.decode().catch(() => {}))),
      )
      const state = await page.evaluate(() => {
        const story = document.querySelector('.gratula-story')
        const proof = story.querySelector('.proof-section')
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          background: getComputedStyle(proof).backgroundColor,
          cardBackground: getComputedStyle(story.querySelector('.guest-feature')).backgroundColor,
          broken: [...story.querySelectorAll('img')].filter(image => !image.naturalWidth).length,
          forbidden: /Host only|Only the host|Guest data is removed after 30 days|Guests never see|Within 10 km|checked recently|update automatically|Everything stays current|Sweet Moments|Magic Marco/.test(story.textContent),
          privacy: story.querySelector('.guest-feature:last-child').textContent,
          privacyAlt: story.querySelector('.allergy-proof').alt,
          slots: story.querySelectorAll('.supplier-list > div').length,
          suppliers: [...story.querySelectorAll('.supplier-list dt')].map(item => item.firstChild.textContent),
          prices: [...story.querySelectorAll('.supplier-list > div > dd:first-of-type')].map(item => item.firstChild.textContent),
          sources: [...story.querySelectorAll('.supplier-list a')].map(link => link.href),
          disclosure: story.querySelector('#local').textContent,
          decorationWidth: getComputedStyle(story.querySelector('#local .party-background img')).width,
          emptySlotsExposeText: [...story.querySelectorAll('.supplier-empty')].some(slot => slot.textContent.trim()),
          cta: story.querySelector('.cta').getAttribute('href'),
          moving: [...story.querySelectorAll('[data-move]')].some(layer => layer.style.transform && layer.style.transform !== 'none'),
        }
      })
      assert.equal(state.overflow, false, `${width} ${route}: overflow`)
      assert.equal(state.background, 'rgba(0, 0, 0, 0)', `${width} ${route}: opaque section breaks continuous background`)
      assert.match(state.cardBackground, /0\.06\)/, `${width} ${route}: card paint`)
      assert.equal(state.broken, 0, `${width} ${route}: broken artwork`)
      assert.equal(state.forbidden, false, `${width} ${route}: unverified claims`)
      assert.match(state.privacy, /Privacy · Design intent/)
      assert.match(state.privacy, /host and invited co-editors/)
      assert.match(state.privacy, /guests view their own reply/)
      assert.match(state.privacy, /guest replies 30 days after the party date/)
      assert.equal(state.privacyAlt, 'Example dietary notes in the prototype guest list.')
      assert.equal(state.slots, 3)
      assert.deepEqual(state.suppliers, ['Bäckerei Conditorei Stocker', 'Sihlcity Minicity', 'Bazinga Parties Zürich'])
      assert.deepEqual(state.prices, ['CHF 58 for 8 people · CHF 68 for 12 people', 'CHF 25 per child · 2 hours', 'CHF 700 per package'])
      assert.deepEqual(state.sources, ['https://gipfeli.ch/torten/thementorten/', 'https://sihlcity.ch/de/minicity/kindergeburtstag/', 'https://bazingaparties.ch/zaubershows-in-zurich/'])
      assert.match(state.disclosure, /Not affiliated with or endorsed by these suppliers/)
      assert.match(state.disclosure, /12 November 2026/)
      assert.match(state.disclosure, /2-hour party on Wednesdays, between 14:00 and 17:30/)
      assert.equal(state.decorationWidth, width > 1100 ? '240px' : '256px')
      assert.equal(state.emptySlotsExposeText, false)
      assert.equal(state.cta, '/lab/party-planner/prototype')
      assert.equal(state.moving, false, `${width} ${route}: reduced motion`)
      assert.deepEqual(errors, [])
    }
    await page.close()
    console.log(`${width}: page and static prototype passed`)
  }
} finally {
  await browser.close()
}
