import Image from 'next/image'
import Link from 'next/link'

import { SiteClosing } from '../../components/site-closing'
import styles from './action-center.module.css'

const assetRoot = '/assets/images/lab/action-center'

export default function ActionCenterPage() {
  return (
    <main className={styles.page}>
      <section
        className={styles.hero}
        aria-labelledby="action-center-story-title"
      >
        <Image
          className={styles.heroImage}
          src={`${assetRoot}/monitor-hero-bg.png`}
          alt="A tablet showing the Action Center beside a coding display, framed by colorful paper-cut artwork."
          width={7680}
          height={4320}
          priority
          quality={100}
          unoptimized
          sizes="100vw"
        />

        <div className={styles.story} id="story">
          <div className={styles.storyCard}>
            <header>
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
              <Link
                className={styles.workflowLink}
                href="/lab/way-of-work"
                prefetch
                aria-label="View My Workflow — Way of Work"
              >
                <span>View My Workflow</span>
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteClosing className={styles.closing} />
    </main>
  )
}
