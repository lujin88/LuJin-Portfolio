/* Production browser regression. Run via harness-core/scripts/test-lock.sh.
 * BASE_URL=http://localhost:4657 OUTPUT_DIR=/tmp/ca05-hover node scripts/test-ca05-hover.cjs
 * PLAYWRIGHT_BROWSERS_PATH=/Users/lu/.buzz/.playwright-browsers for WebKit.
 */
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { chromium, webkit } = require('playwright')
const out = process.env.OUTPUT_DIR || '/tmp/ca05-hover'
const base = process.env.BASE_URL || 'http://localhost:4657'
const results = []
fs.mkdirSync(out, { recursive: true })
const disk = () => { const s = fs.statfsSync(out); assert(s.bavail * s.bsize >= 1024 ** 3, 'STOP: less than 1GiB free') }
async function state(card) {
 return card.evaluate(n => { const v=n.querySelector('video'),i=n.querySelector('img'); return {video:!!v,paused:v?.paused,time:v?.currentTime,duration:v?.duration,videoVisible:v&&getComputedStyle(v).visibility==='visible',imageVisible:getComputedStyle(i).visibility==='visible',pressed:n.getAttribute('aria-pressed'),front:getComputedStyle(n.children[0]).visibility,back:getComputedStyle(n.children[1]).visibility} })
}
async function shot(page,key) {disk();await page.screenshot({path:path.join(out,key+'.png')})}
async function cardsState(page){return Promise.all((await page.locator('#design-principles button').all()).map(state))}
async function exercise(browser,engine,width,mode) {
 disk()
 const key=`${engine}-${width}-${mode}`
 const context=await browser.newContext({viewport:{width,height:900},hasTouch:mode==='touch',reducedMotion:mode==='reduce'?'reduce':'no-preference'})
 const page=await context.newPage(),errors=[],requests=[]
 page.on('pageerror',e=>errors.push(e.message))
 page.on('request',r=>{if(/ca-05-\d+-hover-v4.mp4/.test(r.url()))requests.push(r.url())})
 try {
  await page.goto(base+'/client-advisory',{waitUntil:'networkidle'})
  await page.evaluate(()=>document.fonts.ready)
  const cards=page.locator('#design-principles button')
  assert.equal(await cards.count(),3)
  const card=cards.first()
  await card.scrollIntoViewIfNeeded();await page.waitForTimeout(300)
  await shot(page,key+'-before')
  assert.equal(requests.length,0,'no hover video request before interaction')
  if(mode==='normal') {
   for(let j=0;j<3;j++) {
    const c=cards.nth(j);await page.mouse.move(0,0);await c.hover()
    await page.waitForFunction(n=>{const v=n.querySelector('video');return v&&!v.paused&&v.currentTime>.05&&getComputedStyle(v).visibility==='visible'},await c.elementHandle(),{timeout:10000})
    const playing=await state(c);assert(Math.abs(playing.duration-4.35)<.08,'4.35s clip');assert(!playing.imageVisible)
    if(j===0)await shot(page,key+'-during')
    await page.waitForFunction(n=>{const v=n.querySelector('video');return v?.ended&&getComputedStyle(n.querySelector('img')).visibility==='visible'&&getComputedStyle(v).visibility==='hidden'},await c.elementHandle(),{timeout:7000})
    const ended=await state(c);await page.waitForTimeout(250);assert.equal((await state(c)).time,ended.time,'does not loop')
   }
   await page.mouse.move(0,0);await card.hover();await page.waitForTimeout(300)
   await page.mouse.move(0,0);await page.waitForTimeout(100)
   let s=await state(card);assert(s.paused&&s.imageVisible&&!s.videoVisible,'leave restores static')
   await card.hover();await page.waitForTimeout(250)
   await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(350)
   s=await state(card);assert(s.paused&&s.imageVisible,'offscreen stops')
   await card.hover();await page.waitForTimeout(250)
   // Browser-independent visibility event contract; actual browser tab switching is separately recorded when available.
   await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'))})
   await page.waitForTimeout(100);s=await state(card);assert(s.paused&&s.imageVisible,'hidden document stops')
   await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'))})
   await page.mouse.move(0,0);await card.hover();await page.waitForTimeout(250)
   await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100)
   s=await state(card);assert(s.paused&&s.imageVisible,'dynamic reduced motion stops')
  } else {
   for(const c of await cards.all()) {
    if(mode==='touch')await c.dispatchEvent('pointerenter',{pointerType:'touch'});else await c.hover()
   }
   await page.waitForTimeout(250)
   assert.equal(requests.length,0,'touch/reduce must not fetch hover media')
   assert.equal(await cards.locator('video').count(),0)
  }
  await card.scrollIntoViewIfNeeded();if(mode==='touch')await card.tap();else await card.click();await page.waitForTimeout(750)
  if(mode==='touch')assert.equal(requests.length,0,'touch tap must not fetch hover media')
  let s=await state(card);assert.equal(s.pressed,'true');assert.equal(s.front,'hidden');assert.equal(s.back,'visible')
  await shot(page,key+'-back')
  await card.focus();await page.keyboard.press('Enter');await page.waitForTimeout(750)
  s=await state(card);assert.equal(s.pressed,'false');assert.equal(s.front,'visible');assert.equal(s.back,'hidden')
  await shot(page,key+'-after')
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'overflow')
  assert.deepEqual(errors,[])
  results.push({key,pass:true,requests:requests.length});console.log('PASS',key)
 } catch(error) {results.push({key,pass:false,error:error.message,cards:await cardsState(page)});throw error} finally {await context.close()}
}
async function main(){
 for(const engine of ['chrome','webkit']) {
  const browser=await (engine==='chrome'?chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'}):webkit.launch())
  try {for(const width of [390,700,1440])for(const mode of ['normal','reduce','touch'])await exercise(browser,engine,width,mode)}finally{await browser.close()}
 }
 fs.writeFileSync(path.join(out,'browser-results.json'),JSON.stringify(results,null,2))
}
main().catch(e=>{fs.writeFileSync(path.join(out,'browser-failure.json'),JSON.stringify({error:e.stack,results},null,2));console.error(e);process.exitCode=1})
