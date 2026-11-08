import React, { useId, useState } from 'react';
export const kid = 'https://www.ishares.com/ch/professionals/en/literature/kiid/eu_priips-ishares-msci-acwi-ucits-etf-usd-acc-ch-ie00b6r52259-en.pdf?siteEntryPassthrough=true&switchLocale=y';
export const fund = 'iShares MSCI ACWI UCITS ETF USD (Acc)';
export const money = (n: number, d = 0) => 'CHF ' + new Intl.NumberFormat('en-US', {
  minimumFractionDigits: d,
  maximumFractionDigits: d
}).format(n).replace(/,/g, "’");
const cases = [{
  label: 'Lower',
  color: '#ebccff',
  dash: '4 3',
  rates: [0, 0, 0, -.25, 0]
}, {
  label: 'Middle',
  color: '#ffffff',
  dash: '3 4',
  rates: [.03, .03, .03, .03, .03]
}, {
  label: 'Higher',
  color: '#bcecff',
  dash: '',
  rates: [0, 0, 0, .25, 0]
}];
function simulate(amount: number, rates: number[]) {
  let balance = 0,
    price = 1,
    peak = 1,
    drawdown = 0;
  const values = [0];
  for (let i = 0; i < 60; i++) {
    const factor = Math.pow(1 + rates[Math.floor(i / 12)], 1 / 12);
    price *= factor;
    peak = Math.max(price, peak);
    drawdown = Math.max(drawdown, 1 - price / peak);
    balance = balance * factor + amount;
    values.push(balance);
  }
  return {
    balance,
    drawdown,
    values
  };
}
export function Examples({
  amount
}: {
  amount: number;
}) {
  const paths = cases.map(c => ({
    ...c,
    ...simulate(amount, c.rates)
  }));
  const [month, setMonth] = useState(60);
  const id = useId();
  const scale = Math.max(1, ...paths.flatMap(p => p.values));
  const x = (m: number) => 7 + 286 * m / 60;
  const y = (v: number) => 121 - 108 * v / scale;
  const points = (p: typeof paths[number]) => p.values.map((v, i) => x(i) + ',' + y(v)).join(' ');
  const inspect = (event: React.PointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - bounds.left) * 300 / bounds.width;
    setMonth(Math.min(60, Math.max(0, Math.round((position - 7) * 60 / 286))));
  };
  return <section className="ff-model">
 <div className="ff-projection"><div className="ff-caption"><span>5-year illustration</span></div>
 <h2>Possible plan value</h2><p>{money(month * amount)} contributed {month === 60 ? 'over 5 years' : month === 0 ? 'today' : 'by month ' + month}</p>
 <svg viewBox="0 0 300 133" role="slider" tabIndex={0} aria-label="Explore three plan values by month" aria-valuemin={0} aria-valuemax={60} aria-valuenow={month} aria-valuetext={paths.map(p => p.label + ' ' + money(p.values[month])).join(', ')} onPointerDown={e => {
        e.currentTarget.setPointerCapture(e.pointerId);
        inspect(e);
      }} onPointerMove={e => {
        if (e.buttons === 1) inspect(e);
      }} onKeyDown={e => {
        if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
          e.preventDefault();
          setMonth(e.key === 'End' ? 60 : e.key === 'Home' ? 0 : Math.max(0, Math.min(60, month + (e.key === 'ArrowRight' ? 1 : -1))));
        }
      }}>
 <defs><linearGradient id={id} x1="0" x2="0" y1="0" y2="1"><stop stopColor="#c2eaff" stopOpacity=".38" /><stop offset="1" stopColor="#b7cbff" stopOpacity=".03" /></linearGradient></defs>
 {[22, 71, 121].map(v => <path key={v} d={'M7 ' + v + 'H293'} stroke="#fff" strokeOpacity=".14" />)}
 <polygon points={points(paths[2]) + ' 293,121 7,121'} fill={'url(#' + id + ')'} />
 {paths.map(p => <polyline key={p.label} points={points(p)} fill="none" stroke={p.color} strokeWidth="2.15" strokeDasharray={p.dash} strokeLinejoin="round" />)}
 {month !== 60 && <path d={'M' + x(month) + ' 5V121'} stroke="#fff" strokeOpacity=".6" strokeDasharray="2 3" />}
 {paths.map(p => <circle key={p.label} cx={x(month)} cy={y(p.values[month])} r="3.4" fill={p.color} stroke="#5061c6" strokeWidth="1" />)}</svg>
 <div className="ff-axis"><span>Today</span><span>Year 5</span></div>
 <div className="ff-outcomes">{paths.map(p => <div key={p.label}><span><i style={{
              background: p.color
            }} />{p.label}</span><b>{money(p.values[month])}</b></div>)}</div></div>
 <p className="ff-downside">Lower example: a {Math.round(paths[0].drawdown * 100)}% fall from peak.</p>
 <details><summary>How it’s calculated</summary><p>These are hypothetical paths. The middle example assumes 3% annual growth after fund costs throughout. In the lower and higher examples, the price falls or rises 25% in year four and stays flat in the other years. Actual losses could be larger. The change is spread evenly across 12 months. Each contribution is added at month end.</p><p>Price changes are assumed net of fund costs. No personal taxes, trading fees or currency movements are modeled. The examples have no assigned probabilities. Only the five-year horizon comes from the fund document.</p><a href={kid} target="_blank" rel="noreferrer">Read the fund’s KID ↗</a></details></section>;
}