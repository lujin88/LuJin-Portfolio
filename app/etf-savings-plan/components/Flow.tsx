import React, { useEffect, useId, useRef, useState } from 'react';
import { Examples, fund, kid, money } from './Examples';
import { ReturnHistory } from './ReturnHistory';
import './Flow.css';
export type Screen = 'entry' | 'd' | 'e' | 'f' | 'bank' | 'pending' | 'declined' | 'g' | 'h' | 'transfer' | 'first' | 'b' | 'c' | 'm' | 'standing' | 'skipped' | 'receipt' | 'late' | 'stop' | 'stopped' | 'invalid' | 'pause' | 'invest';
const images = {
  calendar: "/assets/etf-savings-plan/calendar.png",
  transfer: "/assets/etf-savings-plan/transfer.webp",
  orbit: "/assets/etf-savings-plan/orbit.webp"
};
function Status() {
  return <div className="ff-status" aria-hidden="true"><b>9:41</b><svg width="60" height="13" viewBox="0 0 60 13"><path fill="currentColor" d="M1 9h3v4H1zm5-3h3v7H6zm5-3h3v10h-3zm5-3h3v13h-3zm7 4q7-7 14 0l-2 2q-5-5-10 0zm4 4q3.5-4 7 0l-3.5 4z" /><rect x="40" y="1" width="17" height="10" rx="3" fill="none" stroke="currentColor" /><rect x="42" y="3" width="13" height="6" rx="1" fill="currentColor" /></svg></div>;
}
function Facts({
  items
}: {
  items: [string, string][];
}) {
  return <dl className="ff-facts">{items.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>;
}
function Row({
  title,
  sub,
  click,
  action
}: {
  title: string;
  sub?: string;
  click: () => void;
  action?: string;
}) {
  return <button className="ff-row" onClick={click}><span><b>{title}</b>{sub && <small>{sub}</small>}</span><i aria-hidden="true">{action || '›'}</i></button>;
}
function SummaryCard({
  label,
  value,
  note,
  badge,
  artwork,
  mark
}: {
  label: string;
  value: string;
  note: string;
  badge?: string;
  artwork: keyof typeof images;
  mark?: string;
}) {
  return <section className="ff-summary">
  <div className="ff-split"><span>Global equity ETF</span>{badge && <span className="ff-state">{badge}</span>}</div>
  <div className="ff-summary-main"><div><small>{label}</small><strong>{value}</strong></div>
   <span className={'ff-object ' + artwork}><img src={images[artwork]} alt="" />{mark && <b aria-hidden="true">{mark}</b>}</span></div>
  <p>{note}</p></section>;
}
// One reference ETF for the prototype. Replace the profile, costs and KID together at fund selection.
const referenceETF = {
  domicile: 'IE' as string,
  annualFundCost: .0021,
  kid,
  fund
};
const stampRate = referenceETF.domicile === 'CH' ? .00075 : .0015;
const tradeBreakdown = (budget: number) => {
  const consideration = Math.round(budget / (1 + stampRate) * 100) / 100;
  return {
    consideration,
    duty: Math.round((budget - consideration) * 100) / 100
  };
};
const newSetup = (screen: Screen) => ['entry', 'd', 'e', 'f', 'bank', 'transfer', 'pending', 'declined', 'g', 'h', 'late', 'first'].includes(screen);
function dateLabel(d: Date) {
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  });
}
function nextTrading(d: Date) {
  const n = new Date(d);
  do {
    n.setUTCDate(n.getUTCDate() + 1);
  } while ([0, 6].includes(n.getUTCDay()));
  return dateLabel(n);
}
export function Flow({
  initial
}: {
  initial: Screen;
}) {
  const instanceId = useId();
  const root = useRef<HTMLDivElement>(null);
  const [page, go] = useState<Screen>(initial),
    [amount, setAmount] = useState(newSetup(initial) ? 100 : 200),
    [setupAmount, setSetupAmount] = useState(200),
    [day, setDay] = useState(25),
    [method, setMethod] = useState<'ebill' | 'standing'>(['standing', 'late', 'h', 'transfer'].includes(initial) ? 'standing' : 'ebill');
  const [down] = useState(initial === 'c' || initial === 'stop' || initial === 'stopped' || initial === 'm' || initial === 'standing' || initial === 'invalid' || initial === 'skipped' || initial === 'pause' || initial === 'invest'),
    [resume, setResume] = useState(''),
    [edit, setEdit] = useState(''),
    [draft, setDraft] = useState(''),
    [notice, setNotice] = useState(''),
    [revisit, showExample] = useState(false),
    [receiptBack, fromReceipt] = useState<Screen>('b'),
    [transferBack, fromTransfer] = useState<Screen>('f'),
    [hasBuys, setHasBuys] = useState(!['entry', 'd', 'e', 'f', 'pending', 'declined', 'g', 'h', 'late', 'bank', 'transfer', 'first'].includes(initial)),
    [kidOk, setKidOk] = useState(true),
    [documentOpen, openDocument] = useState(false);
  useEffect(() => {
    const check = () => setKidOk(navigator.onLine);
    check();
    window.addEventListener('offline', check);
    window.addEventListener('online', check);
    return () => {
      window.removeEventListener('offline', check);
      window.removeEventListener('online', check);
    };
  }, []);
  useEffect(() => {
    root.current?.closest('.demo-viewport')?.scrollTo(0, 0);
    setEdit('');
    setNotice('');
    openDocument(false);
    showExample(false);
  }, [page]);
  const standing = method === 'standing',
    months = hasBuys ? down ? 6 : 5 : 0,
    total = months * 200,
    last = down ? '26 Oct 2026' : '28 Sep 2026',
    manage = () => go(standing ? 'standing' : 'm');
  const cutoff = new Date(Date.UTC(2026, down || !hasBuys ? 10 : 9, 1));
  function collection(on: string) {
    const when = on ? new Date(on + 'T00:00:00Z') : cutoff;
    const d = new Date(Date.UTC(when.getUTCFullYear(), when.getUTCMonth(), day));
    if (d < when) d.setUTCMonth(d.getUTCMonth() + 1);
    return d;
  }
  const next = collection(resume),
    planPage = () => go(hasBuys ? down ? 'c' : 'b' : standing ? 'h' : 'first');
  const [returning, setReturning] = useState(initial === 'invest');
  const [retained, setRetained] = useState(initial === 'invest');
  const [resumeDate, setResumeDate] = useState('');
  const [pauseChoice, setPauseChoice] = useState<number | 'custom' | null>(null);
  const firstDue = collection('');
  const earliest = new Date(standing ? cutoff : firstDue);
  earliest.setUTCDate(earliest.getUTCDate() + 1);
  const iso = (date: Date) => date.toISOString().slice(0, 10);
  const validResume = !!resumeDate && resumeDate >= iso(earliest);
  const afterPause = collection(validResume ? resumeDate : '');
  const skipped = (afterPause.getUTCFullYear() - firstDue.getUTCFullYear()) * 12 + afterPause.getUTCMonth() - firstDue.getUTCMonth();
  function choosePause(value: number | 'custom') {
    setPauseChoice(value);
    if (value === 'custom') {
      setResumeDate('');
      return;
    }
    const until = new Date(standing ? cutoff : firstDue);
    until.setUTCMonth(until.getUTCMonth() + value);
    setResumeDate(iso(until));
  }
  const restart = () => {
    setReturning(true);
    setRetained(retained || hasBuys);
    setHasBuys(false);
    setResume('');
    setMethod('ebill');
    setDay(25);
    amountChange('100');
    go('d');
  };
  const details = (back: Screen) => {
    fromTransfer(back);
    go('transfer');
  };
  const viewReceipt = () => {
    fromReceipt(page);
    go('receipt');
  };
  const step = page === 'd' ? 1 : page === 'e' || page === 'f' ? 2 : 0;
  const back = (label: string, click: () => void) => <button className="ff-back" onClick={click}>‹ &nbsp;{label}</button>;
  const primary = (label: string, click: () => void, disabled = false) => <button className="ff-primary" onClick={click} disabled={disabled}>{label}</button>;
  const [amountText, setAmountText] = useState(newSetup(initial) ? '100' : '200');
  function amountChange(value: string) {
    setAmountText(value);
    if (Number(value) > 0) {
      setAmount(Number(value));
      setSetupAmount(Number(value));
    }
  }
  const amountValid = Number(amountText) >= 10 && Number(amountText) <= 100000 && /^\d+(\.\d{1,2})?$/.test(amountText);
  const overview = <section className="ff-progress"><div className="ff-split"><span>Global equity ETF</span><span className="ff-badge">{resume ? 'Paused' : 'Active'}</span></div><img src={images.orbit} alt="" /><div className="ff-streak"><strong>{months}</strong><div>months in a row<small>May – {down ? 'Oct' : 'Sep'} 2026</small></div></div><div className="ff-metrics"><div><small>Total invested</small><b>{money(total)}</b></div><div><small>Next purchase · est.</small><b>{standing ? 'After funds arrive' : nextTrading(next).replace(' 2026', '')}</b></div></div></section>;
  let body: React.ReactNode, footer: React.ReactNode, nav: React.ReactNode;
  if (page === 'entry') {
    body = <><h1>Invest</h1><section className="ff-entry"><img src={images.orbit} alt="" /><span className="ff-overline">Monthly savings plan</span><h2>A little each month.</h2><p>CHF 100 a month adds up to CHF 6’000 in five years, before gains or losses.</p><ul className="ff-benefits"><li>Commission-free ETF purchases</li><li>See your costs in CHF before you start</li><li>Pause or stop at any time</li></ul>{primary('Try an amount', () => {
          amountChange('100');
          go('d');
        })}</section></>;
  } else if (page === 'd') {
    nav = back('Invest', () => go(returning ? 'invest' : 'entry'));
    body = <><h1>Set up your plan</h1><label className="ff-amount"><span>Monthly amount · minimum CHF 10</span><div>CHF <input aria-label="Monthly amount in CHF" type="number" min="10" max="100000" step=".01" value={amountText} onChange={e => amountChange(e.target.value)} /></div></label><div className="ff-presets" aria-label="Quick amounts">{[10, 50, 100, 200].map(v => <button key={v} aria-pressed={Number(amountText) === v} onClick={() => amountChange(String(v))}>CHF {v}</button>)}</div>{!amountValid && <p role="alert">Enter CHF 10–100’000 with up to two decimals.</p>}<Examples amount={amountValid ? amount : 0} /><div className="ff-fundparam"><small>Fund</small><span>Global equity ETF</span></div></>;
    footer = primary('Continue', () => go('e'), !amountValid);
  } else if (page === 'e' || page === 'f') {
    nav = back('Your plan', () => go('d'));
    body = <div className="ff-review">
      <h1>Review your plan</h1>
      <section className="ff-progress ff-recap">
        <div className="ff-split"><span>Global equity ETF</span><button onClick={() => go('d')}>Edit</button></div>
        <strong className="ff-money">{money(amount)} <small>/ month</small></strong>
      </section>
      <div className="ff-costs">
        <Facts items={[['Est. first-year fund costs', money(amount * 5.5 * referenceETF.annualFundCost, 2)], ['Est. stamp duty per purchase', money(tradeBreakdown(amount).duty, 2)]]} />
        <Row title={kidOk ? 'Fund information (PDF)' : 'Retry fund document'} click={() => kidOk ? openDocument(!documentOpen) : setKidOk(navigator.onLine)} />
        {documentOpen && <section className="ff-pane"><p>{referenceETF.fund} · IE00B6R52259</p>
          <a href={referenceETF.kid} target="_blank" rel="noreferrer">Open issuer PDF ↗</a>
          <button className="ff-link" onClick={() => {
            setKidOk(false);
            openDocument(false);
          }}>Preview document-load failure</button>
        </section>}
        <p className="ff-service-note">We do not assess this investment’s appropriateness or suitability for you.</p>
      </div>
      <fieldset>
        <legend>Payment method</legend>
        {(['ebill', 'standing'] as const).map(key => <label className="ff-radio" key={key}>
          <input type="radio" name={instanceId + "-method"} checked={key === method} onChange={() => setMethod(key)} />
          <span>{key === 'ebill' ? 'eBill Direct Debit' : 'Standing order'}</span>
        </label>)}
      </fieldset>
      {!standing && <label className="ff-select">Monthly collection day
        <select value={day} onChange={e => setDay(Number(e.target.value))}>
          {Array.from({
            length: 28
          }, (_, i) => <option key={i + 1} value={i + 1}>Day {i + 1}</option>)}
        </select>
      </label>}
    </div>;
    footer = primary(standing ? 'View transfer details' : 'Continue to eBill', () => standing ? details('f') : go('bank'), !kidOk);
  } else if (page === 'bank') {
    nav = back('Payment', () => go('f'));
    body = <><div className="ff-overline">Prototype · bank handoff</div><h1>Continue in e-banking</h1><p>Review the debit authorization in your bank’s eBill portal.</p><h2>Preview a bank response</h2><Row title="Approval pending" click={() => go('pending')} /><Row title="Approved" click={() => go('g')} /><Row title="Declined or unavailable" click={() => go('declined')} /></>;
  } else if (page === 'transfer') {
    nav = back('Back', () => go(transferBack));
    body = <><h1>Standing order details</h1><p>In your banking app, choose the account to pay from and a monthly transfer date. Use the details below.</p><Facts items={[['Recipient', 'Your plan cash account'], ['IBAN', 'CH•• •••• •••• •••• •••• •'], ['Monthly amount', money(amount)], ['Frequency', 'Monthly']]} /><p className="ff-note">Preview details · masked account</p></>;
    footer = primary(transferBack === 'f' ? 'I’ve set up the transfer' : 'Done', () => go(transferBack === 'f' ? 'h' : transferBack));
  } else if (['pending', 'declined', 'g', 'h', 'late', 'first'].includes(page)) {
    const waiting = page === 'h' || page === 'late',
      failed = page === 'declined',
      pending = page === 'pending';
    const title = ({
      pending: 'Waiting for bank approval',
      declined: 'Approval didn’t go through',
      g: 'Your plan is set up',
      h: 'Waiting for your first transfer',
      late: 'Your transfer hasn’t arrived',
      first: 'Your first purchase is scheduled'
    } as Record<string, string>)[page];
    body = <><h1>{title}</h1><SummaryCard label={waiting ? 'Expected transfer' : 'Monthly investment'} value={money(amount)} artwork={waiting ? 'transfer' : 'calendar'} mark={waiting ? undefined : failed ? '–' : pending ? '…' : String(day)} badge={waiting ? 'Awaiting funds' : failed ? 'Declined' : pending ? 'Pending' : 'Approved'} note={waiting ? 'Standing order to your plan account.' : 'Monthly collection by eBill Direct Debit.'} />
 {(failed || pending || page === 'late') && <p>{failed ? 'No collection was authorized. Try again or use a standing order.' : pending ? 'We’ll collect the first payment after your bank confirms.' : 'Check the recipient, amount and execution date in your e-banking. We’ll confirm when the money arrives.'}</p>}
 {!failed && <ol className="ff-timeline"><li className="done"><svg className="ff-complete-mark" viewBox="0 0 20 20" aria-hidden="true">
   <circle cx="10" cy="10" r="10" fill="currentColor" />
   <path d="m5.5 10 3 3 6-6" fill="none" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
 </svg>{waiting ? 'Plan created' : pending ? 'Approval requested' : 'Bank approval received'}{pending && <small>Sent to e-banking</small>}</li><li>{waiting ? 'First transfer' : pending ? 'Bank confirmation' : 'First collection'}{!pending && <small>{waiting ? 'Awaiting funds in your plan account' : dateLabel(next) + ' expected'}</small>}</li><li>First ETF purchase<small>Next trading day after funds arrive</small></li></ol>}
 {waiting && <Row title="Show transfer details" click={() => details(page)} />}
 {failed && <Row title="Try eBill again" click={() => go('bank')} />}</>;
    footer = failed ? primary('Use a standing order', () => {
      setMethod('standing');
      details('f');
    }) : pending ? primary('Return to bank approval', () => go('bank')) : page === 'g' ? primary('View my plan', () => go('first')) : waiting ? primary('Manage plan', manage) : primary('Manage plan', manage);
  } else if (page === 'b' || page === 'c') {
    body = <><h1>My savings plan</h1>{overview}<ReturnHistory down={down} />{down && <section className="ff-context"><h2>October update</h2><p>Your investment is CHF 96 below what you’ve put in. Your monthly plan is {resume ? 'paused' : 'active'}.</p><button className="ff-link" aria-expanded={revisit} onClick={() => showExample(!revisit)}>{revisit ? 'Hide setup example' : 'Revisit your setup example'} {revisit ? '−' : '+'}</button>{revisit && <Examples amount={setupAmount} />}</section>}<Row title="Last purchase" sub={last + ' · Global equity ETF'} click={viewReceipt} /></>;
    footer = primary('Manage plan', manage);
  } else if (page === 'receipt') {
    // Example Swiss-dealer trade in an Irish-domiciled ETF. Client half-duty, zero brokerage.
    const price = down ? 113.64 : 121.95;
    const budget = 200;
    const {
      consideration,
      duty
    } = tradeBreakdown(budget);
    const units = (consideration / price).toFixed(6);
    body = <><h1>Purchase complete</h1><SummaryCard label="Units bought" value={units} note={'Bought on ' + last} badge="Bought" artwork="orbit" /><section className="ff-details-card"><h2>Purchase details</h2><Facts items={[['Price per unit', money(price, 2)], ['Amount invested', money(consideration, 2)], ['Swiss stamp duty', money(duty, 2)], ['Total debited', money(budget, 2)]]} /></section></>;
    footer = primary('View my plan', () => go(receiptBack === 'c' ? 'c' : 'b'));
  } else if (page === 'skipped' || page === 'invalid') {
    const expired = page === 'invalid';
    body = <><div className="ff-overline">My savings plan</div><h1>{expired ? 'Reconnect your payment method' : 'This month was skipped'}</h1><SummaryCard label="Collected this month" value="CHF 0" note={expired ? 'Payment authorization inactive.' : 'Collection unsuccessful.'} badge="Skipped" artwork="calendar" mark="–" /><p>{expired ? 'Purchases are skipped each month until a new payment method is in place.' : 'No ETF units were bought. We won’t retry this month.'}</p><Facts items={[['Scheduled collection', money(amount)], ['Next collection', expired ? 'Awaiting payment setup' : dateLabel(next)]]} /><p>{expired ? 'Your existing units stay invested.' : 'You can move your collection day or lower future payments.'}</p></>;
    footer = primary(expired ? 'Set up payment' : 'Manage plan', expired ? () => go('f') : manage);
  } else if (page === 'stop' || page === 'stopped') {
    const stopped = page === 'stopped';
    body = <>{!stopped && back('Manage your plan', manage)}<h1>{stopped ? 'Your plan has stopped' : 'Stop future purchases?'}</h1><SummaryCard label="Last purchase" value={hasBuys ? last : 'None yet'} artwork="calendar" mark={hasBuys ? last.split(' ')[0] : '–'} note={standing ? 'Standing order' : 'eBill Direct Debit'} badge={stopped ? 'Stopped' : undefined} /><p>{hasBuys ? 'Your existing ETF units stay invested. You can sell them separately.' : 'You have not bought any ETF units yet.'}</p><Facts items={[['Future purchases', stopped ? 'None scheduled' : 'Will stop']]} /><p className="ff-note">{standing ? 'Also stop the standing order at your bank. Any later transfers stay as cash in your plan account.' : 'We’ll stop requesting collections for this plan. Check your debit authorization separately in eBill.'}</p></>;
    footer = stopped ? primary('Back to my investments', () => {
      setRetained(retained || hasBuys);
      go('invest');
    }) : <div className="ff-pair"><button onClick={manage}>Keep plan</button><button onClick={() => go('stopped')}>Stop plan</button></div>;
  } else if (page === 'invest') {
    body = <><h1>My investments</h1><section className="ff-details-card"><h2>Your holdings</h2><Facts items={[[retained ? 'Global equity ETF' : 'ETF holdings', retained ? 'Units retained' : 'None yet'], ['Monthly plan', 'Stopped']]} /></section><p>Start a new monthly plan whenever you’re ready.</p></>;
    footer = primary('Set up a new plan', restart);
  } else if (page === 'pause') {
    nav = back('Manage plan', manage);
    const reason = pauseChoice === null ? 'Choose a pause length to continue.' : !resumeDate ? 'Choose a resume date to continue.' : 'Choose ' + dateLabel(earliest) + ' or later.';
    body = <><h1>Pause your plan</h1><p>When should purchases resume?</p><fieldset className="ff-pause-options"><legend>Pause length</legend>{([1, 3, 6, 'custom'] as const).map(v => <label key={v} className="ff-radio"><input type="radio" name="pause" checked={pauseChoice === v} onChange={() => choosePause(v)} /><b>{v === 'custom' ? 'Custom date' : v === 1 ? '1 month' : v + ' months'}</b></label>)}</fieldset>{pauseChoice === 'custom' && <label className="ff-select">Resume automatically on<input type="date" min={iso(earliest)} value={resumeDate} onChange={event => setResumeDate(event.target.value)} /></label>}
 {validResume && <p className="ff-context" role="status">{standing ? 'Purchases resume on ' + dateLabel(new Date(resumeDate + 'T00:00:00Z')) + '. Transfers continue unless you pause them at your bank.' : 'We’ll skip ' + skipped + ' collection' + (skipped === 1 ? '' : 's') + '. Next collection: ' + dateLabel(afterPause) + '.'}</p>}</>;
    footer = <>{!validResume && <p id="pause-help" className="ff-note">{reason}</p>}<button className="ff-primary" disabled={!validResume} aria-describedby={!validResume ? 'pause-help' : undefined} onClick={() => {
        setResume(resumeDate);
        manage();
      }}>Confirm pause</button></>;
  } else {
    nav = back('My savings plan', planPage);
    const save = (kind: string) => {
      if (kind === 'amount') setAmount(+draft);
      if (kind === 'day') setDay(+draft);
      if (kind === 'pause') setResume(draft);
      setEdit('');
      setNotice(kind === 'pause' ? 'Pause saved. Purchases resume automatically.' : 'Updated for future collections.');
    };
    body = <><h1>Manage plan</h1><SummaryCard badge={resume ? 'Paused' : 'Auto-invest on'} label={resume ? 'Purchases resume' : standing ? 'Payment method' : 'Next collection'} value={resume ? dateLabel(new Date(resume + 'T00:00:00Z')) : standing ? 'Standing order' : dateLabel(next).replace(' 2026', '')} artwork={standing ? 'transfer' : 'calendar'} mark={standing ? undefined : String(resume ? new Date(resume + 'T00:00:00Z').getUTCDate() : day)} note={standing ? 'Transfer settings are managed at your bank.' : 'ETF purchase after your money arrives.'} />
 {['amount', 'day', 'pause', 'stop'].map(k => {
        const title = ({
          amount: 'Monthly amount',
          day: standing ? 'Transfer date' : 'Collection day',
          pause: resume ? 'Resume plan' : 'Pause plan',
          stop: 'Stop plan'
        } as Record<string, string>)[k];
        const sub = ({
          amount: standing ? 'Change the standing order at your bank' : money(amount),
          day: standing ? 'Change the schedule at your bank' : 'Day ' + day + ' of each month',
          pause: resume ? 'Restart future purchases' : 'Choose an automatic resume date',
          stop: 'End future purchases'
        } as Record<string, string>)[k];
        return <React.Fragment key={k}><Row title={title} sub={sub} action={k === 'amount' || k === 'day' ? standing ? 'Details' : 'Edit' : undefined} click={() => {
            if (k === 'stop') {
              go('stop');
              return;
            }
            if (k === 'pause' && !resume) {
              setPauseChoice(null);
              setResumeDate('');
              go('pause');
              return;
            }
            setEdit(edit === k ? '' : k);
            setDraft(k === 'amount' ? String(amount) : k === 'day' ? String(day) : '');
            setNotice('');
          }} />{edit === k && <div className="ff-pane">{standing && (k === 'amount' || k === 'day') ? <><h3>Open your e-banking</h3><p>{k === 'day' ? 'Find the standing order to your plan account and change its execution date.' : 'Update the transfer amount in your bank and match the intended monthly purchase amount here.'}</p>{k === 'amount' && <form onSubmit={e => {
                e.preventDefault();
                save(k);
              }}><label>Plan amount after bank update (CHF)<input type="number" required min="10" max="100000" step=".01" value={draft} onChange={e => setDraft(e.target.value)} /></label><button>Save plan amount</button></form>}</> : k === 'pause' && resume ? <><p>Restart purchases when funds next arrive.</p><button onClick={() => {
                setResume('');
                setEdit('');
                setNotice('Plan resumed.');
              }}>Resume now</button></> : <form onSubmit={e => {
              e.preventDefault();
              save(k);
            }}><label>{k === 'day' ? 'Day of the month' : 'Amount in CHF'}<input required type="number" min={k === 'day' ? 1 : 10} max={k === 'day' ? 28 : 100000} step={k === 'amount' ? '.01' : '1'} value={draft} onChange={e => setDraft(e.target.value)} /></label><button>Save change</button></form>}</div>}</React.Fragment>;
      })}<p role="status">{notice}</p></>;
  }
  return <div ref={root} className="ff" data-screen={page}><div className="ff-phone"><Status /><div className="ff-body">{nav}{body}</div><footer>
    {step > 0 && <div className="ff-step-dots" role="img" aria-label={`Step ${step} of 2`}>
      <i data-active={step === 1} /><i data-active={step === 2} />
    </div>}
    {footer}<div className="ff-home" /></footer></div></div>;
}