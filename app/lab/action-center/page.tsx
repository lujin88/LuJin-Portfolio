import Image from 'next/image'
import Link from 'next/link'

import styles from './action-center.module.css'

const assetRoot = '/assets/images/lab/action-center'

export default function ActionCenterPage() {
  return (
    <main className={styles.page}>
      <section
        className={styles.hero}
        aria-label="Action Center dashboard preview"
      >
        <Image
          className={styles.heroImage}
          src={`${assetRoot}/monitor-hero-8k-v2.png`}
          alt="A tablet showing the Action Center beside a coding display, framed by colorful paper-cut artwork."
          width={7680}
          height={4320}
          priority
          sizes="100vw"
        />
      </section>

      <section
        className={styles.story}
        id="story"
        aria-labelledby="action-center-story-title"
      >
        <Image
          className={`${styles.paperCut} ${styles.paperCutLeft}`}
          src={`${assetRoot}/paper-circles-blue-ivory.png`}
          alt=""
          width={816}
          height={768}
          aria-hidden="true"
        />
        <Image
          className={`${styles.paperCut} ${styles.paperCutRight}`}
          src={`${assetRoot}/paper-circles-trio.png`}
          alt=""
          width={1024}
          height={672}
          aria-hidden="true"
        />

        <div className={styles.storyGrid}>
          <header>
            <p className={styles.eyebrow}>The why</p>
            <h1 id="action-center-story-title">
              Too many agents.
              <br />
              One place to stay oriented.
            </h1>
          </header>

          <div className={styles.storyCopy}>
            <p>
              With several agents running in the background, I would hear an
              alert—but not know which one needed me.
            </p>
            <p>
              Codex, Claude, and Cursor are part of my everyday workflow. This
              dashboard keeps their status, actions, and usage in one focused
              view.
            </p>
            <Link className={styles.workflowLink} href="/lab/way-of-work">
              <span>View my workflow</span>
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
