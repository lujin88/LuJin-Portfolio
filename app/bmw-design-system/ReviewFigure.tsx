import React from 'react'
import './review-figure.css'

const artwork: Record<string, string> = {
  'review-change.webp': '/assets/images/bmw-system/review-change.webp',
  'review-scope.webp': '/assets/images/bmw-system/review-scope.webp',
  'review-themes.webp': '/assets/images/bmw-system/review-themes.webp',
}

export function FutureReview() {
  return <section id="handoff" className="system-outlook" aria-labelledby="outlook-title">
    <div className="outlook-intro">
      <div><span className="outlook-date">2026 perspective</span>
        <h2 id="outlook-title">One rule across<br/>vehicle models.</h2>
      </div>
      <p>We used to check models one by one in Excel. Today, I’d have an agent flag every model affected by a rule change and bring the list to the team for review.</p>
    </div>
    <figure className="outlook-example">
      <figcaption><b>Remote Engine Start</b><span>Example market change</span></figcaption>
      <ol className="outlook-objects">
        {[
          ['review-change.webp', 'Detect the change', 'The market rule changes from permitted to restricted.'],
          ['review-scope.webp', 'Confirm the scope', 'The team checks the source and approves the affected models.'],
          ['review-themes.webp', 'Update the component', 'Omit the control for those models in both light and dark mode.']
        ].map(([file, title, caption]) => (
          <li key={file}>
            <img className="outlook-object" src={artwork[file]} alt="" loading="lazy"/>
            <div><h3>{title}</h3><p>{caption}</p></div>
          </li>
        ))}
      </ol>
    </figure>
  </section>
}
