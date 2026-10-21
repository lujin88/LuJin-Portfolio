import Link from 'next/link'

import { Icon } from '../../components/icon'
import { SiteClosing } from '../../components/site-closing'
import styles from './agent-monitor.module.css'

const NEEDS = [
  ['Claude', 'Update the solar hero motion', 'Waiting on you'],
  ['Codex', 'Review the advisor empty state', 'Permission'],
  ['Cursor', 'Check the token budget', 'Ready'],
]

const LIVE = [
  ['Claude', 'Drafting the landing narrative'],
  ['Codex', 'Mapping the research flow'],
  ['Cursor', 'Checking component states'],
]

const TEAM = [
  ['Avery', 'UX Research', '#f0b429'],
  ['Nova', 'Code Review', '#7ea2ff'],
  ['Sol', 'Storyteller', '#e07a4c'],
  ['Mira', 'Visual UX', '#d45d7a'],
  ['Jules', 'Visual Design', '#6f8f72'],
  ['Vesper', 'Video', '#8b6cc1'],
  ['Pia', 'Project Manager', '#3d6b8a'],
]

export default function AgentMonitorPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="monitor-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Self-built tools / Everyday practice</p>
          <h1 id="monitor-title">Two tools behind my AI workflow.</h1>
          <p className={styles.lede}>
            I built two independent tools to support how I work with AI: one
            keeps usage and permissions visible, the other coordinates a team
            of specialist agents.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/lab/way-of-work">
              Explore my AI design workflow
              <Icon name="arrow-right-line" />
            </Link>
            <a className={styles.secondary} href="#tools">
              See the tools
            </a>
          </div>
        </div>
        <div className={styles.stage} aria-hidden="true">
          <span className={styles.blobSand} />
          <span className={styles.blobClay} />
          <span className={styles.blobNavy} />
          <div className={`${styles.device} ${styles.laptop}`}>
            <MonitorScreen />
          </div>
          <div className={`${styles.device} ${styles.monitor}`}>
            <TeamScreen />
          </div>
        </div>
      </section>

      <section className={styles.facts} aria-label="Project facts">
        <p><span>My role</span>Design &amp; development</p>
        <p><span>Context</span>Personal workflow tools</p>
        <p><span>Focus</span>Visibility &amp; coordination</p>
      </section>

      <section className={styles.split} id="tools" aria-labelledby="monitor-tool">
        <div>
          <p className={styles.kicker}>Tool 01 / Agent Monitor</p>
          <h2 id="monitor-tool">Usage and permissions. In one view.</h2>
          <p>
            Working across several AI tools made it hard to track usage and
            respond to access requests. So I built one overview: I can see
            what&apos;s being used and grant permission without opening each tool.
          </p>
          <ul className={styles.features}>
            <li>
              <Icon name="search-line" />
              <strong>Track usage</strong>
              <span>See usage and remaining limits across AI tools.</span>
            </li>
            <li>
              <Icon name="shield-check-line" />
              <strong>Grant permission</strong>
              <span>Respond to access requests from one place.</span>
            </li>
            <li>
              <Icon name="layout-grid-line" />
              <strong>Keep an overview</strong>
              <span>Know which agents are running and which need attention.</span>
            </li>
          </ul>
        </div>
        <div className={styles.panel} aria-hidden="true">
          <MonitorScreen />
        </div>
      </section>

      <section className={styles.split} aria-labelledby="team-tool">
        <div>
          <p className={styles.kicker}>Tool 02 / AI Team</p>
          <h2 id="team-tool">Different AI strengths. A team built around them.</h2>
          <p>
            API costs add up, and I already pay for AI subscriptions. So I&apos;m
            exploring how to get more out of them by giving each tool a clear
            role and matching it to the work it does best.
          </p>
          <h3>I set the direction. The team carries the work forward.</h3>
          <p>
            I start with the overall idea and define what success looks like.
            When the agents hit a problem or need validation, they come back
            to me.
          </p>
          <p className={styles.callout}>
            <strong>Goal: keep projects moving.</strong>
          </p>
        </div>
        <div className={styles.stack}>
          <div className={styles.panel} aria-hidden="true">
            <TeamScreen />
          </div>
          <aside className={styles.harness}>
            <p className={styles.kicker}>A harness for the team. A PM for the project.</p>
            <div>
              <h3>Harness Agent</h3>
              <p>Shares the brief, context, and constraints. The team works from one source.</p>
            </div>
            <div>
              <h3>Project Manager</h3>
              <p>Breaks the project into tasks, assigns the work, and reports back at handoff.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.workflow} aria-labelledby="workflow-support">
        <div className={styles.workflowMark} aria-hidden="true" />
        <div>
          <h2 id="workflow-support">See the workflow these tools support.</h2>
          <p>
            My AI design workflow explains the broader approach. These two tools
            help me apply it day to day, while Obsidian connects my ideas and
            working knowledge.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/lab/way-of-work">
              Explore my AI design workflow
              <Icon name="arrow-right-line" />
            </Link>
            <Link className={styles.secondary} href="/#model-series">
              All projects
            </Link>
          </div>
        </div>
      </section>

      <SiteClosing className={styles.closing} />
    </main>
  )
}

function MonitorScreen() {
  return (
    <div className={styles.screen}>
      <header>
        <strong>Agent Monitor</strong>
        <span>Live</span>
      </header>
      <div className={styles.cols}>
        <section>
          <h3>Needs your action</h3>
          {NEEDS.map(([tool, task, state]) => (
            <p key={task}><b>{tool}</b><span>{task}</span><em>{state}</em></p>
          ))}
        </section>
        <section>
          <h3>Ready to review</h3>
          <p><b>Claude</b><span>Landing copy is ready</span><em>Review</em></p>
          <p><b>Codex</b><span>Flow map is ready</span><em>Review</em></p>
        </section>
      </div>
      <section className={styles.live}>
        <h3>Live activity</h3>
        {LIVE.map(([tool, task]) => (
          <p key={tool}><b>{tool}</b><span>{task}</span></p>
        ))}
      </section>
      <footer>
        <span>Usage &amp; limits</span>
        <span>Claude 62%</span>
        <span>Codex 41%</span>
        <span>Cursor 28%</span>
      </footer>
    </div>
  )
}

function TeamScreen() {
  return (
    <div className={styles.teamScreen}>
      <header>
        <strong>AI Team</strong>
        <span>7 waiting</span>
      </header>
      <ul>
        {TEAM.map(([name, role, color]) => (
          <li key={name}>
            <i style={{ background: color }} />
            <b>{name}</b>
            <span>{role}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
