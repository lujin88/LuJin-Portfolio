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
      A look back at what we decided in 2020, and a hypothesis for how I’d run the system with AI today.
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
          AI flags edge cases. Team decides.
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
        We tracked which controls each model and market allowed in Excel. I filtered it row by row: if the law didn’t allow a control, I left the button out.
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
  <p className="chapter-copy preview-note">
    Cars respond slowly, and a car without signal can’t respond at all. We tested how long the app could wait. When a request failed, the car couldn’t say why, so the app could only tell the driver it hadn’t worked.
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
    The hard part
  </p>
  <h2>
    One button.
    <br />
    Many edge cases.
  </h2>
  <p>
    Climate was always one button. Behind it, each model and market needed its own rule, and some edge cases were hard to cover.
  </p>
</aside>
<section id="review-desk" className="showcase desk">
  <header>
    <span className="overline">
      BMW Design System　 /　 Review desk · 2026 proposed
    </span>
  </header>
  <h2 className="chapter-title">
    AI compares.
    <br />
    The team decides.
  </h2>
  <div>
  <p className="chapter-copy review-intro">
    This part is a hypothesis, not something we shipped. I would store the model and market rules as data, linked to the Figma component and its code. AI would compare every case against those rules and collect real examples that no rule covers yet.
  </p>
  <p className="chapter-copy review-intro">
    The team would decide what each case should do. Each decision would become a rule the next review starts from.
  </p>
  </div>
  <div className="desk-body">
    <div className="drift-selector">
      <h3>
        Edge-case report
      </h3>
      <div className="choices">
        <button type="button" data-app="A" aria-pressed="false">
          <b>
            iX3 · Market A
          </b>
          <small>
            Covered by a rule ✓
          </small>
        </button>
        <button type="button" data-app="B" aria-pressed="true">
          <b>
            530i · Market B
          </b>
          <small>
            New model · no rule yet
          </small>
        </button>
        <button type="button" data-app="C" aria-pressed="false">
          <b>
            320i · Market A
          </b>
          <small>
            Request failed · no example yet
          </small>
        </button>
      </div>
    </div>
    <section className="inspect" aria-live="polite">
      <div className="sample">
        <h2>
          In the system
        </h2>
        <div className="tile">
          <b data-output>
            Climate
          </b>
          <small data-state>
            Off
          </small>
        </div>
        One shared Climate control
      </div>
      <div className="sample front" data-drift="patch">
        <h2 data-app-title>
          No rule yet
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
          No rule for this market → Propose a rule
        </div>
        <button type="button" className="confirm">
          Approve rule
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
        Model × market → button shown or hidden
      </span>
    </li>
    <li>
      <div className="step-art" aria-hidden="true" style={{"--slice": "2"} as React.CSSProperties}>
        <img src="/lab/bmw-one-source/assets/review-workflow.webp" alt="" />
      </div>
      <b>
        Edge-case scan
      </b>
      <span>
        Collect real cases no rule covers yet
      </span>
    </li>
    <li>
      <div className="step-art" aria-hidden="true" style={{"--slice": "3"} as React.CSSProperties}>
        <img src="/lab/bmw-one-source/assets/review-workflow.webp" alt="" />
      </div>
      <b>
        Team decides
      </b>
      <span>
        Each new rule goes through a pull request
      </span>
    </li>
  </ol>
  <footer className="team-decides">
    <b>
      Where AI stops
    </b>
    <p className="future-limit">
      Better examples would make each review faster. AI still couldn’t make a car explain why a request failed, so the app would still only say it didn’t work.
    </p>
  </footer>
</section>
<footer className="closing-line">
  In 2020, the system held the components. Now it should hold the rules: every model, every market, every edge case, in one source.
</footer>
  </main>
}
