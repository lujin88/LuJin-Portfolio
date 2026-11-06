import React, { useState } from 'react';

// Illustrative month-end snapshots of the same CHF 200 monthly plan.
const snapshots = [{
  month: 'May',
  paid: 200,
  value: 202
}, {
  month: 'Jun',
  paid: 400,
  value: 394
}, {
  month: 'Jul',
  paid: 600,
  value: 612
}, {
  month: 'Aug',
  paid: 800,
  value: 808
}, {
  month: 'Sep',
  paid: 1000,
  value: 1024
}, {
  month: 'Oct',
  paid: 1200,
  value: 1104
}];
const formatCHF = (n: number) => 'CHF ' + new Intl.NumberFormat('de-CH', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(n);
const returnPct = (row: typeof snapshots[number]) => 100 * (row.value - row.paid) / row.paid;
const sign = (n: number) => n < 0 ? '−' : n > 0 ? '+' : '';
const rangeLabel = (n: number) => sign(n) + Math.abs(n) + '%';
export function ReturnHistory({
  down
}: {
  down: boolean;
}) {
  const history = down ? snapshots : snapshots.slice(0, -1);
  const [selected, setSelected] = useState(history.length - 1);
  const current = history[selected];
  const gain = current.value - current.paid;
  const low = down ? -10 : -4,
    high = down ? 5 : 4;
  const y = (n: number) => 13 + (high - n) * 84 / (high - low);
  const x = (i: number) => 12 + 254 * i / (history.length - 1);
  const line = history.map((r, i) => x(i) + ',' + y(returnPct(r))).join(' ');
  return <section className="rh-card" aria-label="Plan return history">
    <h2>Investment value · {current.month} 2026</h2>
    <div className="rh-result" aria-live="polite"><strong>{formatCHF(current.value)}</strong><span>{'CHF ' + Math.abs(gain) + ' ' + (gain < 0 ? 'below' : 'above') + ' total invested'} ({sign(gain)}{Math.abs(returnPct(current)).toFixed(2)}%)</span></div>
    <div className="rh-plot">
      <svg viewBox="0 0 308 110" width="100%" role="img" aria-label="Cumulative gain or loss by month, relative to total contributions. Zero percent means breaking even.">
        {[high, 0, low].map(t => <g key={t}>
          <line x1="12" x2="266" y1={y(t)} y2={y(t)} stroke={t === 0 ? '#879ac0' : '#d4def1'} strokeDasharray={t === 0 ? '4 4' : undefined} />
          <text x="275" y={y(t) + 4} fill="#526383" fontSize="11">{rangeLabel(t)}</text>
        </g>)}
        <polyline points={line} stroke="#4357ce" strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round" fill="none" />
        {history.map((r, i) => <circle key={r.month} cx={x(i)} cy={y(returnPct(r))} r={i === selected ? 4.5 : 2.2} fill="white" stroke="#4357ce" strokeWidth={i === selected ? 2.5 : 1.5} />)}
        {history.map((r, i) => <rect key={r.month} x={x(i) - 20} y="0" width={i === history.length - 1 ? 38 : x(i + 1) - x(i)} height="110" fill="transparent" onClick={() => setSelected(i)} />)}
      </svg>
      <div className="rh-months" aria-label="Inspect a month">{history.map((r, i) => <button key={r.month} style={{
          left: x(i) / 308 * 100 + "%"
        }} aria-label={'Show return for ' + r.month + ' 2026'} aria-pressed={i === selected} onClick={() => setSelected(i)}>{r.month}</button>)}</div>
    </div>
  </section>;
}