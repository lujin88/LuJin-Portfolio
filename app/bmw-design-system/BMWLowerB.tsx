'use client'

import { LayerScrollGroup } from '@eon/components/motion/layer-scroll-group'

const APP_SCREEN = '/lab/bmw-one-source/assets/i4-complete.png'
const REVIEW_FLOW = '/lab/bmw-one-source/assets/review-workflow.webp'

function FanIcon({ compact }: { compact?: boolean }) {
  return (
    <svg
      style={compact ? undefined : { width: 56, height: 56, display: 'inline-block' }}
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path transform="rotate(0 16 16)" d="M14 14C9 6 15 1 20 3c4 2 3 6-1 7-2 1-3 2-3 4" />
        <path transform="rotate(90 16 16)" d="M14 14C9 6 15 1 20 3c4 2 3 6-1 7-2 1-3 2-3 4" />
        <path transform="rotate(180 16 16)" d="M14 14C9 6 15 1 20 3c4 2 3 6-1 7-2 1-3 2-3 4" />
        <path transform="rotate(270 16 16)" d="M14 14C9 6 15 1 20 3c4 2 3 6-1 7-2 1-3 2-3 4" />
        <circle cx="16" cy="16" r="2.6" />
      </g>
    </svg>
  )
}

export function BMWLowerB() {
  return (
    <div className="bmw-lower-b v3 b">
      <LayerScrollGroup as="section" className="pad role-band">
        <div data-move="96">
          <h2>
            My role,
            <br />
            and the scope.
          </h2>
        </div>
        <div>
          <p>
            I led a six-person team that designed the new My BMW app and its design system, for iOS and Android. The
            rules had to cover every model back to 2000, starting with the US and European markets; other markets
            adapted them later. The app launched after I left.
          </p>
          <div className="facts">
            <div>
              <b>6 people</b>
              <span>Team I led</span>
            </div>
            <div>
              <b>iOS + Android</b>
              <span>App & design system</span>
            </div>
            <div>
              <b>Since 2000</b>
              <span>Models covered</span>
            </div>
          </div>
          <p className="caption">
            The system covered the whole app, in light and dark mode: vehicle status, remote controls, charging,
            services and bookings, notifications, news and marketing, in-app purchases, vehicle setup and settings.
          </p>
        </div>
      </LayerScrollGroup>

      <LayerScrollGroup as="section" className="pad lead">
        <div data-move="96">
          <div className="rubric">Inside the design system</div>
          <h2>
            One control.
            <br />
            More than <span className="keep-words">one layer.</span>
          </h2>
          <p>A design system has to carry the appearance, the state and the rules that make the component available.</p>
        </div>
      </LayerScrollGroup>

      <section className="anatomy">
        <div className="notes">
          <div>
            <h3>Appearance</h3>
            <p>Light and dark belong to the same system.</p>
          </div>
          <div>
            <h3>Availability</h3>
            <p>Model and market determine what the driver can use.</p>
          </div>
        </div>
        <LayerScrollGroup className="layers">
          <div className="layer back" data-move="32">
            <h3 style={{ marginTop: 0, fontSize: 21 }}>Model × market</h3>
          </div>
          <div className="layer middle" data-move="48">
            <small>Appearance</small>
            <h3>Light / dark</h3>
          </div>
          <div className="layer front" data-move="64">
            <span className="fan">
              <FanIcon />
            </span>
            <h3>Climate</h3>
            <div className="bottom">Request sent · waiting for vehicle</div>
          </div>
        </LayerScrollGroup>
        <div className="notes">
          <div>
            <h3>State</h3>
            <p>Sending, waiting, success and failure are different.</p>
          </div>
          <div>
            <h3>The limit</h3>
            <p>No explanation from the car means no explanation from AI.</p>
          </div>
        </div>
      </section>
      <p className="anatomy-caption">Component anatomy · illustrative recreation, not an original specification.</p>

      <section className="pad demo-section" id="climate-study">
        <LayerScrollGroup className="heading">
          <div data-move="96">
            <h2>
              See the app.
              <br />
              Try the rule.
            </h2>
            <p>Where can a control appear? What happens after a tap? The component preview lets you explore both.</p>
          </div>
        </LayerScrollGroup>
        <div className="preview-grid">
          <div className="rule-controls">
            <h3>Choose a model & market</h3>
            <div className="rules-table">
              <div className="rule-labels">
                <span>Model</span>
                <span>Market</span>
                <span>Control</span>
              </div>
              <button type="button" data-rule="Climate" aria-pressed="false">
                <b>iX3</b>
                <span>Market A</span>
                <span>Climate</span>
              </button>
              <button type="button" data-rule="Engine start" aria-pressed="false">
                <b>320i</b>
                <span>Market A</span>
                <span>Engine start</span>
              </button>
              <button type="button" data-rule="Entry omitted" aria-pressed="false">
                <b>320d</b>
                <span>Market C</span>
                <span>Hidden</span>
              </button>
              <button type="button" data-rule="Climate" aria-pressed="true">
                <b>530i</b>
                <span>Market B</span>
                <span>Check</span>
              </button>
            </div>
            <p className="rules-caption">Illustrative recreation · not the original spreadsheet · markets anonymised.</p>
          </div>
          <figure>
            <img
              className="phone"
              src={APP_SCREEN}
              alt="Existing My BMW app screen showing vehicle status and remote controls"
            />
            <figcaption className="app-caption">
              Existing app image for product context; not evidence of the exact 2020 interface.
            </figcaption>
          </figure>
          <div>
            <h3>Try Climate</h3>
            <div className="themes" data-phase="off">
              <button type="button" data-climate className="tile" aria-label="Try Climate in light mode">
                <span className="tile-top">
                  <span className="tile-fan">
                    <FanIcon compact />
                  </span>
                  <small className="tile-badge" data-state>
                    Off
                  </small>
                </span>
                <b>Climate</b>
              </button>
              <button type="button" data-climate className="tile dark" aria-label="Try Climate in dark mode">
                <span className="tile-top">
                  <span className="tile-fan">
                    <FanIcon compact />
                  </span>
                  <small className="tile-badge" data-state>
                    Off
                  </small>
                </span>
                <b>Climate</b>
              </button>
            </div>
            <div className="sim-response" hidden>
              <button type="button" data-reply="running">
                Car confirms
              </button>
              <button type="button" data-reply="error">
                Request fails
              </button>
            </div>
            <div className="rule-result" aria-live="polite" aria-atomic="true">
              <b data-command>New configuration</b>
              <small data-rule-note>Select Climate to start the preview.</small>
            </div>
            <p className="rules-caption">Interactive recreation · simulated vehicle responses; no real vehicle connection.</p>
          </div>
        </div>
      </section>

      <LayerScrollGroup as="section" className="pad review-flow">
        <div className="artifact" data-move="64">
          <img src={REVIEW_FLOW} alt="Existing magnifier inspecting component variants" />
        </div>
        <div data-move="96">
          <div className="rubric">Today · A proposal</div>
          <h2>
            Make the missing
            <br />
            rule visible.
          </h2>
          <p>This is a hypothesis, not something we shipped. AI would compare the rules and flag gaps for the team to review.</p>
          <div className="review-path">
            <span>Component</span>→<span>Rule</span>→<span>Team review</span>
          </div>
          <p>The decision stays with the team. The new rule stays with the component.</p>
        </div>
      </LayerScrollGroup>

      <LayerScrollGroup as="section" className="pad transfer">
        <div data-move="96">
          <h2>
            Could this work
            <br />
            in your product?
          </h2>
          <p>Map where one component follows different rules. Keep those rules alongside it. Build a review loop: AI flags gaps, people decide.</p>
        </div>
        <div>
          <div className="mapping">
            <div>
              <b>Automotive</b>
              <span>Model × market</span>
            </div>
            <div>
              <b>Banking</b>
              <span>Product × jurisdiction × client type</span>
            </div>
            <div>
              <b>SaaS</b>
              <span>Plan × permission</span>
            </div>
          </div>
          <p className="caption">Transfer examples, not claims about systems I shipped.</p>
          <p className="closing">
            The component shows the decision.
            <br />
            The system should carry the rule.
          </p>
        </div>
      </LayerScrollGroup>

      <aside className="dark-conclusion">
        In 2020, the system held the components. Now it should hold the rules: every model, every market, every edge
        case, in one source.
      </aside>
    </div>
  )
}
