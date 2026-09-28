import Image from 'next/image'

import { screenWallpaperSrc } from './config'
import styles from './off-we-go.module.css'

const chips = ['Next holiday', 'Beach break', 'Ski trip'] as const

export function LaptopHomeUi() {
  return (
    <div className={styles.home}>
      <Image
        src={screenWallpaperSrc}
        alt=""
        fill
        sizes="50vw"
        className={styles.homeWallpaper}
        priority
      />
      <div aria-hidden="true" className={styles.homeScrim} />

      <div className={styles.homeInner}>
        <div className={styles.homeBar}>
          <svg viewBox="0 0 36 22" className={styles.homeMark} fill="none" aria-hidden="true">
            <path
              d="M2.4 19.2 11.2 4.6 18 13.4 24.8 4.6 33.6 19.2"
              stroke="currentColor"
              strokeWidth="2.15"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <i className="ri-settings-3-line" aria-hidden="true" />
        </div>

        <div className={styles.homeStack}>
          <p className={styles.homeHello}>Good afternoon, Lu!</p>
          <h2 className={styles.homeTitle}>Where would you like to go?</h2>
          <p className={styles.homeLede}>Tell me a little. We will plan it step by step.</p>

          <div className={styles.homeSearch}>
            <i className="ri-search-line" aria-hidden="true" />
            <span>For example: a warm, easy family trip in the next school break</span>
            <em>Start planning</em>
          </div>

          <div className={styles.homeChips}>
            {chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>

          <div className={styles.homeCards}>
            <div>
              <p>Continue last trip</p>
              <small>卢加诺, 瑞士 · 20/09, 16:34</small>
            </div>
            <div>
              <p>My family & preferences</p>
              <small>6 members saved</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
