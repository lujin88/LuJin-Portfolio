'use client'
import './one-source.css'
import './bmw-b-lower.css'
import { BMWLowerB } from './BMWLowerB'

function applySelection(root: HTMLElement, button: HTMLButtonElement) {
  if (button.hasAttribute('data-climate') || button.hasAttribute('data-reply')) {
    const themes = root.querySelector<HTMLElement>('.themes')!
    const petrol = root.querySelector<HTMLElement>('[data-rule][aria-pressed=true] b')!.textContent !== 'iX3'
    const phase = themes.dataset.phase || 'off'
    if (phase === 'connecting' && !button.dataset.reply) return
    let next = button.dataset.reply
    if (!next) {
      if (phase === 'running') next = 'off'
      else if (phase === 'confirm' || !petrol) next = 'connecting'
      else next = 'confirm'
    }
    const states: Record<string, string[]> = {
      off: ['Off', 'Select Climate to start the preview.'],
      confirm: ['Confirm', 'Engine run time: 15 minutes. Select Climate to confirm.'],
      connecting: ['Connecting', 'Request sent. Simulate the vehicle response.'],
      running: ['Running', 'Confirmed by the vehicle. Select Climate to stop.'],
      error: ['Didn’t work', 'The car didn’t say why. Select Climate to try again.'],
    }
    themes.dataset.phase = next
    themes.querySelectorAll('[data-state]').forEach((label) => (label.textContent = states[next][0]))
    root.querySelector<HTMLElement>('[data-rule-note]')!.textContent = states[next][1]
    root.querySelector<HTMLElement>('.sim-response')!.hidden = next !== 'connecting'
    return
  }
  const rule = button.dataset.rule
  if (!rule) return
  root.querySelector<HTMLElement>('.themes')!.dataset.phase = 'off'
  root.querySelectorAll('.themes [data-state]').forEach((label) => (label.textContent = 'Off'))
  root.querySelector<HTMLElement>('.sim-response')!.hidden = true
  root.querySelectorAll('[data-rule]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)))
  root.querySelectorAll<HTMLElement>('.themes .tile').forEach((tile) => (tile.hidden = rule === 'Entry omitted'))
  const isNew = button.querySelector('b')!.textContent === '530i'
  root.querySelector<HTMLElement>('[data-command]')!.textContent =
    rule === 'Entry omitted' ? 'Entry omitted' : isNew ? 'New configuration' : rule === 'Climate' ? 'Remote climate' : 'Remote engine start'
  root.querySelector<HTMLElement>('[data-rule-note]')!.textContent =
    rule === 'Entry omitted'
      ? 'The control is hidden for this market.'
      : 'Select Climate to start the preview.'
}

export function BMWOneSource() {
  return (
    <main
      id="top"
      onClick={(event) => {
        const button = (event.target as HTMLElement).closest('button')
        const section = button?.closest<HTMLElement>('#climate-study')
        if (button && section) applySelection(section, button)
      }}
    >
      <div className="bmw-one-source">
        <section id="driver-view" className="bmw-driver">
          <img
            className="backdrop"
            src="/assets/images/bmw-system/ix3-landscape.webp"
            alt="BMW iX3 parked at an alpine overlook at sunset"
          />
          <header>
            <p>BMW Design System</p>
            <h1>Same rules. One source.</h1>
            <p className="hero-story">
              I led a six-person design team and the BMW app design system, working across vehicle capabilities,
              market restrictions, and light and dark modes.
            </p>
            <p className="hero-bridge">
              A look back at what we decided in 2020, and a hypothesis for how I’d run the system with AI today.
            </p>
          </header>
          <div className="composition">
            <div className="product">
              <div
                className="screen vehicle-phone"
                role="img"
                aria-label="Fully charged silver BMW i4 eDrive35. Lock, unlock and headlights in one strip above Status and State of charge."
              >
                <div className="screen-region vehicle-header" style={{ aspectRatio: '376/367' }}>
                  <img
                    aria-hidden="true"
                    alt=""
                    src="/lab/bmw-one-source/assets/i4-silver-backdrop.png"
                    style={{ transform: 'translateY(-0.000000%)' }}
                  />
                </div>
                <div className="vehicle-actions">
                  <span>
                    <svg aria-hidden="true" viewBox="0 0 24 24">
                      <path d="M7 10V7a5 5 0 0 1 10 0v3 M5 10h14v11H5z M12 14v3"></path>
                    </svg>
                  </span>
                  <span>
                    <svg aria-hidden="true" viewBox="0 0 24 24">
                      <path d="M9 10V7a5 5 0 0 1 10 0 M4 10h14v11H4z M11 14v3"></path>
                    </svg>
                  </span>
                  <span>
                    <svg aria-hidden="true" viewBox="0 0 24 24">
                      <path d="M11 5c6-1 11 2 11 7s-5 8-11 7z M2 6h6 M2 10h6 M2 14h6 M2 18h6"></path>
                    </svg>
                  </span>
                </div>
                <div className="screen-region vehicle-status" style={{ aspectRatio: '376/120' }}>
                  <img
                    aria-hidden="true"
                    alt=""
                    src="/lab/bmw-one-source/assets/i4-complete.png"
                    style={{ transform: 'translateY(-45.030675%)' }}
                  />
                </div>
                <div className="screen-region vehicle-lower" style={{ aspectRatio: '376/270' }}>
                  <img
                    aria-hidden="true"
                    alt=""
                    src="/lab/bmw-one-source/assets/i4-complete.png"
                    style={{ transform: 'translateY(-66.871166%)' }}
                  />
                </div>
              </div>
              <nav aria-label="Download My BMW">
                <a href="https://apps.apple.com/ch/app/my-bmw/id1519034860" target="_blank" rel="noopener">
                  <img src="/lab/bmw-one-source/assets/app-store.svg" alt="Download on the App Store" />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=de.bmw.connected.mobile20.row"
                  target="_blank"
                  rel="noopener"
                >
                  <img className="play" src="/lab/bmw-one-source/assets/google-play.png" alt="Get it on Google Play" />
                </a>
              </nav>
            </div>
            <dl>
              <div>
                <dt>2020</dt>
                <dd>Check each model in Excel</dd>
              </div>
              <div>
                <dt>2026 · Proposed</dt>
                <dd>AI finds edge cases. Team decides.</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
      <BMWLowerB />
    </main>
  )
}
