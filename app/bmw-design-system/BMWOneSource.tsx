'use client'
import type React from 'react'
import './one-source.css'
import { useTranslation } from '@i18n/use-translation'

function applySelection(root:HTMLElement, button:HTMLButtonElement) {

  if (button.hasAttribute('data-climate') || button.hasAttribute('data-reply')) {
    const themes = root.querySelector<HTMLElement>('.themes')!;
    const petrol = root.querySelector<HTMLElement>('[data-rule][aria-pressed=true] b')!.textContent !== 'iX3';
    const phase = themes.dataset.phase || 'off';
    if (phase === 'connecting' && !button.dataset.reply) return;
    let next = button.dataset.reply;
    if (!next) {
      if (phase === 'running') next = 'off';
      else if (phase === 'confirm' || !petrol) next = 'connecting';
      else next = 'confirm';
    }
    const states:Record<string,string[]> = {
      off: ['Off', 'Select Climate to start the preview.'],
      confirm: ['Confirm', 'Engine run time: 15 minutes. Select Climate to confirm.'],
      connecting: ['Connecting', 'Request sent. Simulate the vehicle response.'],
      running: ['Running', 'Confirmed by the vehicle. Select Climate to stop.'],
      error: ['Didn’t work', 'The car didn’t say why. Select Climate to try again.']
    };
    themes.dataset.phase = next;
    themes.querySelectorAll('[data-state]').forEach(label => label.textContent = states[next][0]);
    root.querySelector<HTMLElement>('[data-rule-note]')!.textContent = states[next][1];
    root.querySelector<HTMLElement>('.sim-response')!.hidden = next !== 'connecting';
    return;
  }
  if (button.classList.contains('confirm')) {
    const app=root.dataset.app || 'B';
    root.dataset['reviewed'+app]='true';
    button.disabled=true;
    button.textContent=app==='C'?'Example added':'Rule approved';
    root.querySelector<HTMLElement>('.callout')!.textContent=app==='C'?'Example added · the team reviews it next':'Rule approved for a pull request';
    return;
  }
  const app=button.dataset.app;
  if(app) {
    root.dataset.app=app;
    root.querySelectorAll('[data-app]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    root.querySelector<HTMLElement>('[data-app-title]')!.textContent=app==='A'?'Covered':app==='B'?'No rule yet':'Request failed';
    root.querySelector<HTMLElement>('.sample.front')!.dataset.drift=app==='A'?'match':app==='B'?'patch':'missing';
    const action=root.querySelector<HTMLButtonElement>('.confirm')!;
    const reviewed=root.dataset['reviewed'+app]==='true';
    action.hidden=app==='A';
    action.disabled=reviewed;
    action.textContent=app==='C'?(reviewed?'Example added':'Add example to review'):(reviewed?'Rule approved':'Approve rule');
    root.querySelector<HTMLElement>('.callout')!.textContent=app==='A'?'Matches the rules ✓':app==='B'?(reviewed?'Rule approved for a pull request':'No rule for this market → Propose a rule'):(reviewed?'Example added · the team reviews it next':'No example of this failure → Add it to the review');
    return;
  }
  const rule=button.dataset.rule;
  if(!rule) return;
  root.querySelector<HTMLElement>('.themes')!.dataset.phase='off';
  root.querySelectorAll('.themes [data-state]').forEach(label => label.textContent='Off');
  root.querySelector<HTMLElement>('.sim-response')!.hidden=true;
  root.querySelectorAll('[data-rule]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  root.querySelectorAll<HTMLElement>('.themes .tile').forEach(tile=>tile.hidden=rule==='Entry omitted');
  const isNew=button.querySelector('b')!.textContent==='530i';
  root.querySelector<HTMLElement>('[data-command]')!.textContent=rule==='Entry omitted'?'Entry omitted':isNew?'New configuration':rule==='Climate'?'Remote climate':'Remote engine start';
  root.querySelector<HTMLElement>('[data-rule-note]')!.textContent=rule==='Entry omitted'?'The control is hidden for this market.':isNew?'Select Climate to start the preview.':rule==='Climate'?'Select Climate to start the preview.':'Select Climate to start the preview.';
}

export function BMWOneSource() {
  const { t } = useTranslation()
  return <main className="bmw-one-source" id="top" onClick={event => {
    const button = (event.target as HTMLElement).closest('button')
    const section = button?.closest<HTMLElement>('.showcase')
    if (button && section) applySelection(section, button)
  }}>
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
  <dl>
    <div>
      <dt>
        {t('bmw.hero.thenYear')}
      </dt>
      <dd>
        {t('bmw.hero.then')}
      </dd>
    </div>
    <div>
      <dt>
        {t('bmw.hero.nowYear')}
      </dt>
      <dd>
        {t('bmw.hero.now')}
      </dd>
    </div>
  </dl>
</section>
<section className="bmw-delivery" aria-labelledby="bmw-delivery-title">
  <div className="delivery-grid">
    <h2 className="chapter-title" id="bmw-delivery-title">
      Shared ways
      <br />
      of working.
    </h2>
    <div>
      <p className="chapter-copy">
        The work brought together the design system, accessibility guidelines and monthly usability tests across teams. Other teams adopted the accessibility guidelines.
      </p>
      <p className="chapter-copy">
        BMW announced Digital Key for iPhone at Apple WWDC 2020.
      </p>
    </div>
  </div>
  <p className="scope-line">
    1.5 years · A programme of around 400 people
    <br />
    Around 40 designers working across 3 continents
  </p>
</section>
<section id="rule-matrix" className="showcase">
  <header>
    <span>
      <b>
        BMW
      </b>
      Design System
    </span>
    <small>
      Inside the design system · illustrative recreation
    </small>
  </header>
  <div className="columns">
    <div>
      <h2 data-type="h2" className="chapter-title">
        From system
        <br />
        to app.
      </h2>
      <p className="chapter-copy">
        Where can a control appear? What happens after a tap? This recreated example makes both visible.
      </p>
      <div className="book">
        <div className="line labels">
          <b>
            Model
          </b>
          <b>
            Market
          </b>
          <b>
            Control
          </b>
        </div>
        <button className="line" type="button" data-rule="Climate" aria-pressed="false">
          <b>
            iX3
          </b>
          <span>
            Market A
          </span>
          <span>
            Climate
          </span>
        </button>
        <button className="line" type="button" data-rule="Engine start" aria-pressed="false">
          <b>
            320i
          </b>
          <span>
            Market A
          </span>
          <span>
            Engine start
          </span>
        </button>
        <button className="line" type="button" data-rule="Entry omitted" aria-pressed="false">
          <b>
            320d
          </b>
          <span>
            Market C
          </span>
          <span>
            Hidden
          </span>
        </button>
        <button className="line" type="button" data-rule="Climate" aria-pressed="true">
          <b>
            530i
          </b>
          <span>
            Market B
          </span>
          <span>
            Check
          </span>
        </button>
      </div>
      <p className="matrix-note rules-caption">
        Illustrative recreation · not the original spreadsheet · markets anonymised.
      </p>
    </div>
    <figure className="phone vehicle-phone" role="img" aria-label="My BMW app overview: vehicle status and remote controls.">
      <div className="screen-region vehicle-header" style={{"aspectRatio": "376/367"}}>
        <img aria-hidden="true" alt="" src="/lab/bmw-one-source/assets/i4-silver-backdrop.png" style={{"transform": "translateY(-0.000000%)"}} />
      </div>
      <div className="vehicle-actions">
        <span>
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M7 10V7a5 5 0 0 1 10 0v3 M5 10h14v11H5z M12 14v3">
            </path>
          </svg>
        </span>
        <span>
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M9 10V7a5 5 0 0 1 10 0 M4 10h14v11H4z M11 14v3">
            </path>
          </svg>
        </span>
        <span>
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M11 5c6-1 11 2 11 7s-5 8-11 7z M2 6h6 M2 10h6 M2 14h6 M2 18h6">
            </path>
          </svg>
        </span>
      </div>
      <div className="screen-region vehicle-status" style={{"aspectRatio": "376/120"}}>
        <img aria-hidden="true" alt="" src="/lab/bmw-one-source/assets/i4-complete.png" style={{"transform": "translateY(-45.030675%)"}} />
      </div>
      <div className="screen-region vehicle-lower" style={{"aspectRatio": "376/270"}}>
        <img aria-hidden="true" alt="" src="/lab/bmw-one-source/assets/i4-complete.png" style={{"transform": "translateY(-66.871166%)"}} />
      </div>
    </figure>
  </div>
  <p className="chapter-copy preview-note">
    The interface can only show what the vehicle reports. Sending, waiting, success and failure are different states.
  </p>
  <footer className="summary">
    <b>
      Component preview
    </b>
    <section className="themes">
      <button type="button" className="tile" data-climate aria-label="Try Climate in light mode">
        <b data-output>
          Climate
        </b>
        <small data-state>
          Off
        </small>
      </button>
      <button type="button" className="tile dark" data-climate aria-label="Try Climate in dark mode">
        <b data-output>
          Climate
        </b>
        <small data-state>
          Off
        </small>
      </button>
    </section>
    <div className="sim-response" hidden>
      <button type="button" data-reply="running">
        Car confirms
      </button>
      <button type="button" data-reply="error">
        Request fails
      </button>
    </div>
    <div className="rule-result" aria-live="polite" aria-atomic="true">
      <b data-command>
        New configuration
      </b>
      <small data-rule-note>
        Select Climate to start the preview.
      </small>
    </div>
  </footer>
</section>
<aside className="system-gap">
  <p className="overline">
    Inside the design system · illustrative recreation
  </p>
  <h2 data-type="h2">
    One control.
    <br />
    Many layers.
  </h2>
  <p>
    A design system has to carry the appearance, the state and the rules that make the component available.
  </p>
</aside>
<footer className="closing-line closing-real">
  The work was as much about how teams worked together as the components they shared.
</footer>
  </main>
}
