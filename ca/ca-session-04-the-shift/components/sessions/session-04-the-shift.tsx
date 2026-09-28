import { Poppins } from 'next/font/google'
import Image from 'next/image'
import styles from './session-04-the-shift.module.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] })

const concepts = [
  {
    id: 'signal',
    title: 'Signal',
    question: 'What matters?',
    src: '/icons/signal-icon.png',
    width: 512,
    height: 400,
  },
  {
    id: 'context',
    title: 'Context',
    question: 'Why does it matter?',
    src: '/icons/context-icon.png',
    width: 512,
    height: 283,
  },
  {
    id: 'act',
    title: 'Act',
    question: 'What happens next?',
    src: '/icons/act-icon.png',
    width: 512,
    height: 374,
  },
] as const

export function Session04TheShift() {
  return (
    <section
      id="session-04"
      aria-labelledby="session-04-heading"
      className={`${poppins.className} ${styles.section}`}
    >
      <div className={styles.atmosphere} aria-hidden="true" />

      <div className={styles.layout}>
        <div className={styles.copy}>
          <p className={styles.label}>
            <span className={styles.labelNumber}>04</span>
            <span className={styles.labelDivider} aria-hidden="true" />
            <span className={styles.labelTitle}>The Shift</span>
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

        <ul
          className={styles.stage}
          aria-label="Signal, Context, Act"
        >
          {concepts.map((concept) => (
            <li key={concept.id} className={styles.concept}>
              <span className={styles.icon}>
                <Image
                  src={concept.src}
                  alt=""
                  width={concept.width}
                  height={concept.height}
                  className={styles.iconImg}
                />
              </span>
              <span className={styles.conceptTitle}>{concept.title}</span>
              <span className={styles.conceptQuestion}>{concept.question}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
