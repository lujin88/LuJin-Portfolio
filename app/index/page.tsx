import { isAskLuEnabled } from '../../lib/ask-lu'
import { HtmlIsland } from '../html-island'
import { readPublicHtmlPage } from '../read-public-html'

/**
 * First-frame posters for the home page videos, so each panel paints a frame
 * immediately instead of an empty box while the MP4 buffers.
 *
 * Applied here instead of in public/home.html only to avoid colliding with
 * open edits to that file; once those land, these can move into the <video>
 * tags directly and this transform can be dropped.
 */
const HOME_VIDEO_POSTERS: Record<string, string> = {
  '/assets/videos/home/hero.mp4': '/assets/images/posters/home-hero.webp',
  '/assets/videos/client-advisory/CA-office-call-loop.mp4':
    '/assets/images/posters/ca-office-call-loop.webp',
  '/assets/videos/eon/solar-calculator-hero.mp4':
    '/assets/images/posters/eon-solar-calculator-hero.webp',
}

function withVideoPosters(html: string) {
  return html.replace(/<video\b[^>]*>/g, (tag) => {
    const src = /\ssrc="([^"]+)"/.exec(tag)?.[1]?.split('?')[0]
    const poster =
      src &&
      Object.entries(HOME_VIDEO_POSTERS).find(([path]) => src.endsWith(path))?.[1]
    if (!poster || /\sposter=/.test(tag)) return tag
    return tag
      .replace(/\spreload="auto"/, ' preload="metadata"')
      .replace(/^<video\b/, `<video poster="${poster}"`)
  })
}

/** Drops the Ask Lu button and chat panel unless the feature is switched on. */
function withAskLu(html: string) {
  if (isAskLuEnabled()) return html
  return html.replace(/<!-- ask-lu:start -->[\s\S]*?<!-- ask-lu:end -->/, '')
}

export default async function IndexPage() {
  const { head, body } = await readPublicHtmlPage('home.html')
  return <HtmlIsland head={head} body={withAskLu(withVideoPosters(body))} />
}
