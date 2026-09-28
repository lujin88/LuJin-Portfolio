import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CA_SESSIONS, findCaSession } from './sessions'
import styles from './session-frame.module.css'

export const dynamicParams = false

export function generateStaticParams() {
  return CA_SESSIONS.map((session) => ({ slug: session.slug }))
}

export default async function CaSessionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const session = findCaSession(slug)
  if (!session) notFound()

  const Session = session.Component

  return (
    <main>
      <nav className={styles.bar} aria-label="Client Advisory sessions">
        <Link href="/lab">Lab</Link>
        {CA_SESSIONS.map((item) => (
          <Link
            key={item.slug}
            href={`/ca/${item.slug}`}
            aria-current={item.slug === slug ? 'page' : undefined}
          >
            {item.index} {item.title}
          </Link>
        ))}
        <Link className={styles.full} href={`/client-advisory#${session.caseHash}`}>
          In the full case
        </Link>
      </nav>
      <Session />
    </main>
  )
}
