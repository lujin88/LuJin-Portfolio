'use client'
import './one-source.css'
import './bmw-b-lower.css'
import { BMWLowerB } from './BMWLowerB'
import { useTranslation } from '@i18n/use-translation'

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
  const { t } = useTranslation()
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
  {/* Hero C, phone option A (visual OUTBOX/BMW_C_PHONE_AB_20261108): car scene, the real default app screen, copy from messages. */}
  <img className="backdrop" src="/assets/images/bmw-system/i4-alpine-sunset.webp" alt={t('bmw.hero.backdropAlt')} />
  <header>
    <p>
      {t('bmw.hero.eyebrow')}
    </p>
    <h1>
      {t('bmw.hero.title')}
    </h1>
    <p className="hero-story">
      {t('bmw.hero.story')}
    </p>
    <p className="hero-bridge">
      {t('bmw.hero.bridge')}
    </p>
  </header>
  <div className="screen" role="img" aria-label={t('bmw.hero.phoneLabel')}>
    <img aria-hidden="true" alt="" src="/assets/images/bmw-system/i4-services-600.webp" width={600} height={1304} />
  </div>
  <nav aria-label={t('bmw.hero.downloadLabel')}>
    <a href="https://apps.apple.com/ch/app/my-bmw/id1519034860" target="_blank" rel="noopener">
      <img src="/lab/bmw-one-source/assets/app-store.svg" alt={t('bmw.hero.downloadApple')} />
    </a>
    <a href="https://play.google.com/store/apps/details?id=de.bmw.connected.mobile20.row" target="_blank" rel="noopener">
      <img className="play" src="/lab/bmw-one-source/assets/google-play.png" alt={t('bmw.hero.downloadGoogle')} />
    </a>
  </nav>
  <dl className="hero-meta">
    <div>
      <dt>{t('bmw.hero.roleLabel')}</dt>
      <dd>{t('bmw.hero.role')}</dd>
    </div>
    <div>
      <dt>{t('bmw.hero.teamLabel')}</dt>
      <dd>{t('bmw.hero.team')}</dd>
    </div>
    <div>
      <dt>{t('bmw.hero.scopeLabel')}</dt>
      <dd>{t('bmw.hero.scope')}</dd>
    </div>
  </dl>
</section>
      </div>
      <BMWLowerB />
    </main>
  )
}
