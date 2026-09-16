import styles from './session-04-the-shift.module.css'

type Stage = {
  id: 'signal' | 'context' | 'act'
  title: string
  question: string
  icon: React.ReactNode
  node: { desktop: [number, number]; mobile: [number, number] }
  label: { desktop: [number, number]; mobile: [number, number] }
}

function SignalIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" />
      <circle cx="20" cy="20" r="6" />
      <circle cx="20" cy="20" r="1.6" fill="currentColor" stroke="none" />
      <path d="M20 8v3M20 29v3M8 20h3M29 20h3" strokeLinecap="round" />
    </svg>
  )
}

function ContextIcon() {
  return (
    <svg viewBox="0 0 52 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="19" cy="20" r="18.5" />
      <circle cx="33" cy="20" r="18.5" />
    </svg>
  )
}

function ActIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" />
      <path d="M13 20h13M21 14.5l5.5 5.5-5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const stages: Stage[] = [
  {
    id: 'signal',
    title: 'Signal',
    question: 'What matters?',
    icon: <SignalIcon />,
    node: { desktop: [44, 42], mobile: [15, 42] },
    label: { desktop: [48.3, 34.5], mobile: [4, 6] },
  },
  {
    id: 'context',
    title: 'Context',
    question: 'Why does it matter?',
    icon: <ContextIcon />,
    node: { desktop: [64, 45], mobile: [50, 45] },
    label: { desktop: [63.3, 52], mobile: [36, 56] },
  },
  {
    id: 'act',
    title: 'Act',
    question: 'What happens next?',
    icon: <ActIcon />,
    node: { desktop: [79.3, 57], mobile: [85, 57] },
    label: { desktop: [83.6, 44.5], mobile: [62, 2] },
  },
]

const desktopPaths = {
  main: 'M 150 -40 C 330 60, 380 290, 440 420 C 480 510, 500 585, 555 590 C 605 592, 620 478, 640 450 C 700 380, 830 220, 1040 90',
  branch: 'M 640 450 C 690 470, 730 570, 793 570 C 855 570, 930 760, 1040 960',
}

const mobilePaths = {
  main: 'M -40 320 C 60 260, 120 360, 150 420 C 190 500, 260 560, 330 560 C 420 560, 470 470, 500 450 C 560 410, 720 250, 1040 150',
  branch: 'M 500 450 C 580 480, 700 580, 850 570 C 930 565, 980 720, 1040 880',
}

function CurveSvg({ paths, className, id }: { paths: typeof desktopPaths; className: string; id: string }) {
  return (
    <svg
      className={`${styles.curve} ${className}`}
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-stroke`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="0">
          <stop offset="0" stopColor="#3f8cff" stopOpacity="0" />
          <stop offset="0.18" stopColor="#3f8cff" stopOpacity="0.55" />
          <stop offset="0.7" stopColor="#4a97ff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#3f8cff" stopOpacity="0.1" />
        </linearGradient>
        <filter id={`${id}-blur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <g filter={`url(#${id}-blur)`} opacity="0.45">
        <path d={paths.main} className={styles.curveGlow} stroke={`url(#${id}-stroke)`} />
        <path d={paths.branch} className={styles.curveGlow} stroke={`url(#${id}-stroke)`} />
      </g>
      <path d={paths.main} className={styles.curveLine} stroke={`url(#${id}-stroke)`} />
      <path d={paths.branch} className={styles.curveLine} stroke={`url(#${id}-stroke)`} />
    </svg>
  )
}

export function Session04TheShift() {
  return (
    <section
      id="session-04"
      aria-labelledby="session-04-heading"
      className={`${styles.section} font-[family-name:var(--font-poppins)]`}
    >
      <div className={styles.atmosphere} aria-hidden="true" />

      <div className={styles.copy}>
        <p className="ca-eyebrow">
          <span className="ca-eyebrow-index">04</span>
          <span className="ca-eyebrow-rule" aria-hidden="true" />
          <span>The Shift</span>
        </p>

        <h2 id="session-04-heading" className={styles.headline}>
          From information retrieval
          <br />
          to decision support.
        </h2>

        <p className={styles.body}>
          The research reframed the question. Not &ldquo;How do we help advisors search faster?&rdquo; &mdash; but{' '}
          <strong className={styles.bodyStrong}>
            &ldquo;How does AI help advisors recognise what matters, understand why, and know what to do next?&rdquo;
          </strong>
        </p>

        <p className={styles.closing}>
          This shifted AI&apos;s role &mdash; from finding information to supporting better decisions.
        </p>
      </div>

      <div className={styles.visual}>
        <h3 className="sr-only">Signal → Context → Act</h3>

        <CurveSvg id="s04-desktop" paths={desktopPaths} className={styles.curveDesktop} />
        <CurveSvg id="s04-mobile" paths={mobilePaths} className={styles.curveMobile} />

        {stages.map((stage) => (
          <span
            key={`${stage.id}-node`}
            className={styles.node}
            aria-hidden="true"
            style={
              {
                '--x-desktop': `${stage.node.desktop[0]}%`,
                '--y-desktop': `${stage.node.desktop[1]}%`,
                '--x-mobile': `${stage.node.mobile[0]}%`,
                '--y-mobile': `${stage.node.mobile[1]}%`,
              } as React.CSSProperties
            }
          />
        ))}

        <ul className={styles.stages}>
          {stages.map((stage) => (
            <li
              key={stage.id}
              className={styles.stage}
              style={
                {
                  '--x-desktop': `${stage.label.desktop[0]}%`,
                  '--y-desktop': `${stage.label.desktop[1]}%`,
                  '--x-mobile': `${stage.label.mobile[0]}%`,
                  '--y-mobile': `${stage.label.mobile[1]}%`,
                } as React.CSSProperties
              }
            >
              <span className={`${styles.icon} ${stage.id === 'context' ? styles.iconWide : ''}`}>
                {stage.icon}
              </span>
              <span className={styles.stageTitle}>{stage.title}</span>
              <span className={styles.stageQuestion}>{stage.question}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
