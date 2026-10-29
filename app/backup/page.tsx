import type { Metadata } from 'next'

import { HtmlChrome } from '../html-chrome'
import styles from './backup.module.css'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — Kept pages',
  },
  description: 'Pages kept off the main navigation until they are removed together.',
}

const PAGES = [
  {
    href: '/backup/ai-design-process',
    title: 'AI Design Process',
    note: 'The previous AI Design Process page.',
  },
  {
    href: '/about',
    title: 'About',
    note: 'Still opens. It is no longer in the header.',
  },
  {
    href: '/wip',
    title: 'Work in progress',
    note: 'Kept, and not linked from the main navigation.',
  },
  {
    href: '/ai-workflow-case',
    title: 'AI Design Workflow',
    note: 'Case page kept beside the live process site.',
  },
  {
    href: '/lab/agent-monitor',
    title: 'Agent Monitor',
    note: 'Playground project kept off the menu.',
  },
  {
    href: '/backup/way-of-work',
    title: 'Way of Work',
    note: 'The earlier scroll page, before the playbook replaced it.',
  },
  {
    href: '/lab/off-we-go',
    title: 'Off We Go',
    note: 'Playground project kept off the menu.',
  },
] as const

export default function BackupPage() {
  return (
    <HtmlChrome activeHref="/backup" backgroundColor="#070b16">
      <main className={styles.page}>
        <div className={styles.intro}>
          <p className={styles.kicker}>Backup</p>
          <h1>Kept pages</h1>
          <p>
            These pages are off the main site. They stay here until it is clear they are unused, and then they can be removed together.
          </p>
        </div>
        <ul className={styles.list}>
          {PAGES.map((page) => (
            <li key={page.href}>
              <a href={page.href}>
                <strong>{page.title}</strong>
                <span>{page.note}</span>
                <span className={styles.path}>{page.href}</span>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </HtmlChrome>
  )
}
