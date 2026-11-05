'use client'
import type React from 'react'
import './one-source.css'

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
      error: ['Component issue', 'The vehicle reported a fault. Select Climate to retry.']
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
    button.textContent=app==='C'?'Replacement proposed':'Approved as variant';
    root.querySelector<HTMLElement>('.callout')!.textContent=app==='C'?'Replace with main component · pull request proposed':'Variant approved for a pull request';
    return;
  }
  const app=button.dataset.app;
  if(app) {
    root.dataset.app=app;
    root.querySelectorAll('[data-app]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    root.querySelector<HTMLElement>('[data-app-title]')!.textContent='App '+app+(app==='A'?' · Matches spec':app==='B'?' · Local patch':' · Fork');
    root.querySelector<HTMLElement>('.sample.front')!.dataset.drift=app==='A'?'match':app==='B'?'patch':'missing';
    const action=root.querySelector<HTMLButtonElement>('.confirm')!;
    const reviewed=root.dataset['reviewed'+app]==='true';
    action.hidden=app==='A';
    action.disabled=reviewed;
    action.textContent=app==='C'?(reviewed?'Replacement proposed':'Replace with main component'):(reviewed?'Approved as variant':'Approve as variant');
    root.querySelector<HTMLElement>('.callout')!.textContent=app==='A'?'Matches spec ✓':app==='B'?(reviewed?'Variant approved for a pull request':'Custom padding → Propose as variant'):(reviewed?'Replace with main component · pull request proposed':'Error state missing → Replace with main component');
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
  return <main className="bmw-one-source" id="top" onClick={event => {
    const button = (event.target as HTMLElement).closest('button')
    const section = button?.closest<HTMLElement>('.showcase')
    if (button && section) applySelection(section, button)
  }}>
<section id="driver-view" className="bmw-driver">
  <img className="backdrop" src="/assets/images/bmw-system/ix3-landscape.webp" alt="BMW iX3 parked at an alpine overlook at sunset" />
  <header>
    <p>
      BMW Design System
    </p>
    <h1>
      Same rules. One source.
    </h1>
    <p className="hero-story">
      I led a six-person design team and the BMW app design system, working across vehicle capabilities, market restrictions, and light and dark modes.
    </p>
    <p className="hero-bridge">
      A look back at the decisions we made, and how I would evolve the system with AI today.
    </p>
  </header>
  <div className="composition">
    <div className="product">
      <div className="screen vehicle-phone" role="img" aria-label="Fully charged silver BMW i4 eDrive35. Lock, unlock and headlights in one strip above Status and State of charge.">
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
      </div>
      <nav aria-label="Download My BMW">
        <a href="https://apps.apple.com/ch/app/my-bmw/id1519034860" target="_blank" rel="noopener">
          <img src="/lab/bmw-one-source/assets/app-store.svg" alt="Download on the App Store" />
        </a>
        <a href="https://play.google.com/store/apps/details?id=de.bmw.connected.mobile20.row" target="_blank" rel="noopener">
          <img className="play" src="/lab/bmw-one-source/assets/google-play.png" alt="Get it on Google Play" />
        </a>
      </nav>
    </div>
    <dl>
      <div>
        <dt>
          2020
        </dt>
        <dd>
          Check each model in Excel
        </dd>
      </div>
      <div>
        <dt>
          2026 · Proposed
        </dt>
        <dd>
          Generate variants for team review
        </dd>
      </div>
    </dl>
  </div>
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
      2020 · Model × market
    </small>
  </header>
  <div className="columns">
    <div>
      <h2 className="chapter-title">
        Every model.
        <br />
        Every market.
      </h2>
      <p className="chapter-copy">
        We checked each vehicle and market in Excel to decide which controls a driver could use. Where remote engine start was restricted, we omitted the feature.
      </p>
      <p className="chapter-copy">
        A request could reach the server while the car was out of signal. Without a reply from the car, the app stayed on Connecting. The wait was a pain point.
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
    </div>
    <div className="phone vehicle-phone" role="img" aria-label="Fully charged silver BMW i4 eDrive35. Lock, unlock and headlights in one strip above Status and State of charge.">
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
    </div>
  </div>
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
        Component issue
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
    The system over time
  </p>
  <h2>
    A shared design.
    <br />
    Different implementations.
  </h2>
  <p>
    Over time, more apps shipped and more developers patched components locally. The same Climate control ended up built several ways, so a design could no longer go straight to code.
  </p>
</aside>
<section id="review-desk" className="showcase desk">
  <header>
    <span className="overline">
      BMW Design System　 /　 Review desk · 2026 proposed
    </span>
  </header>
  <h2 className="chapter-title">
    Bring every patch
    <br />
    back to the system.
  </h2>
  <p className="chapter-copy review-intro">
    I would link the Figma component to code, store model and market rules as data, and ask an agent to compare local implementations against the spec. The team would decide which patches become shared variants and which are retired.
  </p>
  <div className="desk-body">
    <div className="drift-selector">
      <h3>
        Drift report
      </h3>
      <div className="choices">
        <button type="button" data-app="A" aria-pressed="false">
          <b>
            App A
          </b>
          <small>
            Matches spec ✓
          </small>
        </button>
        <button type="button" data-app="B" aria-pressed="true">
          <b>
            App B
          </b>
          <small>
            Local patch · custom padding
          </small>
        </button>
        <button type="button" data-app="C" aria-pressed="false">
          <b>
            App C
          </b>
          <small>
            Fork · Error state missing
          </small>
        </button>
      </div>
    </div>
    <section className="inspect" aria-live="polite">
      <div className="sample">
        <h2>
          Main component
        </h2>
        <div className="tile">
          <b data-output>
            Climate
          </b>
          <small data-state>
            Off
          </small>
        </div>
        Light
      </div>
      <div className="sample front" data-drift="patch">
        <h2 data-app-title>
          App B · Local patch
        </h2>
        <div className="tile dark">
          <b data-output>
            Climate
          </b>
          <small data-state>
            Off
          </small>
        </div>
        <div className="callout">
          Custom padding → Propose as variant
        </div>
        <button type="button" className="confirm">
          Approve as variant
        </button>
      </div>
    </section>
  </div>
  <ol className="proposed-flow" aria-label="Proposed design system workflow">
    <li>
      <div className="step-art" aria-hidden="true" style={{"--slice": "0"} as React.CSSProperties}>
        <img src="/lab/bmw-one-source/assets/review-workflow.webp" alt="" />
      </div>
      <b>
        One component, linked
      </b>
      <span>
        Figma ↔ code via Code Connect
      </span>
    </li>
    <li>
      <div className="step-art" aria-hidden="true" style={{"--slice": "1"} as React.CSSProperties}>
        <img src="/lab/bmw-one-source/assets/review-workflow.webp" alt="" />
      </div>
      <b>
        Rules as data
      </b>
      <span>
        Model × market → command
      </span>
    </li>
    <li>
      <div className="step-art" aria-hidden="true" style={{"--slice": "2"} as React.CSSProperties}>
        <img src="/lab/bmw-one-source/assets/review-workflow.webp" alt="" />
      </div>
      <b>
        Drift scan
      </b>
      <span>
        Compare each local copy to the spec
      </span>
    </li>
    <li>
      <div className="step-art" aria-hidden="true" style={{"--slice": "3"} as React.CSSProperties}>
        <img src="/lab/bmw-one-source/assets/review-workflow.webp" alt="" />
      </div>
      <b>
        Merge or retire
      </b>
      <span>
        Review each patch through a pull request
      </span>
    </li>
  </ol>
  <footer className="team-decides">
    <b>
      What the team still decides
    </b>
    <p>
      The variants — which patch becomes part of the system.
    </p>
    <p className="future-limit">
      The proposal would help us scale component review. An unreachable car would still need to reply before the app could confirm it was running.
    </p>
  </footer>
</section>
<footer className="closing-line">
  In 2020, the system held the components. Now it has to hold the rules, and every patch has to come back to it.
</footer>
  </main>
}
