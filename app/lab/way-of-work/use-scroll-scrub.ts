'use client'

import { useLayoutEffect, useRef, type RefObject } from 'react'

const SMOOTHING = 10
const SEEK_EPSILON = 1 / 24
const SETTLE = 0.002

function clamp01(value: number) {
  return value < 0 ? 0 : value > 1 ? 1 : value
}

function motionOk() {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** True when `time` sits inside an already-downloaded range. */
function timeBuffered(video: HTMLVideoElement, time: number) {
  const buffered = video.buffered
  for (let i = 0; i < buffered.length; i += 1) {
    const start = buffered.start(i)
    const end = buffered.end(i)
    if (time >= start && time <= end - 0.04) return true
  }
  return false
}

/**
 * Maps wrapper scroll progress onto a paused video's currentTime.
 * `progressRef` is written every frame. Do not copy it into React state.
 *
 * Jump audit (keep these conclusions next to the code that they describe):
 *
 * 1. Duplicate rAF — NOT the cause once the loop is mount-only.
 *    Parent re-renders do not restart it. Cleanup sets `running = false` and
 *    cancelAnimationFrame. Fast Refresh can otherwise keep a stale loop that
 *    writes to a detached <video>; this hook re-reads videoRef.current every
 *    frame and uses useLayoutEffect so the loop always binds the live node.
 *
 * 2. Wrapper height — NOT the cause.
 *    The track is a fixed 400vh (3600px at 900px viewport). The video is
 *    position:absolute inside a sticky stage, so poster/metadata load cannot
 *    change start/end. measure() only reruns on resize.
 *
 * 3. Fast Refresh — DEV-ONLY false positive, plus a real stale-loop trap.
 *    HMR remounts can reset currentTime. Confirm remaining hitch with
 *    `next start`. Cache-bust the MP4 after re-encodes; Chrome will keep a
 *    2560 B-frame copy otherwise.
 *
 * 4. Multiple scroll writers — NOT the cause.
 *    The old per-section video refs are gone. Only this hook writes
 *    `video.currentTime`. onFrame only paints CSS.
 *
 * 5. Seek vs keyframe interval — THIS WAS THE JUMP.
 *    Source encode had has_b_frames=2 and a 6-frame GOP, so currentTime
 *    snapped to I-frames (~0.25s). Chrome also does not flip video.seeking
 *    synchronously, so overlapping seeks fought. A 2560 all-intra High file
 *    then failed VideoToolbox (NSOSStatus -12909) and froze currentTime.
 *    Fix applied: 1920×1080 Main / level 4.0 all-intra (`-bf 0 -g 1`),
 *    pendingSeek cleared on seeked + 80ms timeout, epsilon = 1/24s.
 *    Do not pause() on `play` during scrub; that aborts in-flight seeks.
 */
export function useScrollScrub(
  videoRef: RefObject<HTMLVideoElement | null>,
  wrapperRef: RefObject<HTMLElement | null>,
  onFrame?: (progress: number) => void,
) {
  const progressRef = useRef(0)
  const onFrameRef = useRef(onFrame)
  onFrameRef.current = onFrame

  useLayoutEffect(() => {
    let frame = 0
    let running = true
    let smoothed = 0
    let last = performance.now()
    let start = 0
    let end = 0
    let pendingSeek = false
    let seekWatch = 0
    let reduced = false
    const attached = new WeakSet<HTMLVideoElement>()

    const releaseSeek = () => {
      pendingSeek = false
      if (seekWatch) window.clearTimeout(seekWatch)
      seekWatch = 0
    }

    const onSeeked = () => releaseSeek()

    const attachVideo = (video: HTMLVideoElement) => {
      if (attached.has(video)) return
      attached.add(video)
      video.autoplay = false
      video.muted = true
      video.playsInline = true
      video.pause()
      video.addEventListener('loadedmetadata', () => video.pause())
      video.addEventListener('seeked', onSeeked)
      video.addEventListener('error', onSeeked)
    }

    const measure = (wrapper: HTMLElement) => {
      const scrollY = window.scrollY
      start = scrollY + wrapper.getBoundingClientRect().top
      end = start + wrapper.offsetHeight - window.innerHeight
    }

    const readProgress = () => {
      const span = end - start
      return span <= 0 ? 0 : clamp01((window.scrollY - start) / span)
    }

    const tick = (now: number) => {
      if (!running) return
      const video = videoRef.current
      const wrapper = wrapperRef.current
      if (!video || !wrapper) {
        frame = requestAnimationFrame(tick)
        return
      }

      attachVideo(video)
      measure(wrapper)

      const progress = reduced ? 0 : readProgress()
      progressRef.current = progress
      onFrameRef.current?.(progress)

      if (reduced) {
        delete video.dataset.synced
        if (video.readyState >= 1 && video.currentTime > SEEK_EPSILON) {
          try {
            video.currentTime = 0
          } catch {
            /* Safari can throw while the element is not ready. */
          }
        }
      } else {
        const duration = video.duration
        if (Number.isFinite(duration) && duration > 0) {
          const target = progress * duration
          const dt = Math.min(0.1, (now - last) / 1000)
          const smoothing = 1 - Math.exp(-dt * SMOOTHING)
          // A fast first scroll can jump seconds ahead of the eased time.
          // Snap instead of easing through every unbuffered frame.
          if (Math.abs(target - smoothed) > 0.35) smoothed = target
          else smoothed += (target - smoothed) * smoothing
          if (Math.abs(target - smoothed) < SETTLE) smoothed = target

          const buffered = timeBuffered(video, smoothed)
          const frameMatches = Math.abs(video.currentTime - smoothed) <= SEEK_EPSILON
          const synced =
            video.readyState >= 2 && !video.seeking && buffered && frameMatches
          if (synced) video.dataset.synced = 'true'
          else delete video.dataset.synced

          // Seeking into a range that is still downloading paints black and
          // blocks later seeks. Leave the poster still in place until the
          // target time is already in `buffered`.
          if (
            buffered &&
            video.readyState >= 2 &&
            !pendingSeek &&
            !frameMatches
          ) {
            pendingSeek = true
            seekWatch = window.setTimeout(releaseSeek, 80)
            try {
              video.currentTime = smoothed
            } catch {
              releaseSeek()
            }
          }
        } else {
          delete video.dataset.synced
        }
      }

      last = now
      frame = requestAnimationFrame(tick)
    }

    reduced = !motionOk()
    last = performance.now()
    frame = requestAnimationFrame(tick)

    const onScroll = () => {
      progressRef.current = reduced ? 0 : readProgress()
    }
    const onResize = () => {
      const wrapper = wrapperRef.current
      if (wrapper) measure(wrapper)
      onScroll()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      if (seekWatch) window.clearTimeout(seekWatch)
      const video = videoRef.current
      if (video) {
        video.removeEventListener('seeked', onSeeked)
        video.removeEventListener('error', onSeeked)
      }
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [videoRef, wrapperRef])

  return progressRef
}
