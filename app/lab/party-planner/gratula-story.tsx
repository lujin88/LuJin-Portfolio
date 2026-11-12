import { LayerScrollGroup } from '@eon/components/motion/layer-scroll-group';
import { prototypeUrl } from './config';
import { suppliers, supplierCopy } from './suppliers';
function SupplierList() {
  return <dl className="supplier-list">{suppliers.map((supplier, index) => (<div key={index} className={supplier ? undefined : 'supplier-empty'} aria-hidden={supplier ? undefined : true}>
    {supplier && <><dt>{supplier.name}<small>{supplier.description}</small></dt>
      <dd>{supplier.price}<br /><a href={supplier.source} target="_blank" rel="noopener noreferrer">{supplier.sourceLabel}</a></dd>
      <dd className="supplier-conditions">{supplier.conditions}</dd></>}
  </div>))}</dl>;
}
/** Below-hero implementation of the approved v8.1 / v8.2 / v8.3.2 design. */
export function GratulaStory() {
  return (<div className="gratula-story night-world">
    <div className="seam-field" aria-hidden="true">
    </div>
    <section className="rsvp-section" aria-labelledby="reminder-title">
      <div className="party-background" aria-hidden="true">
        <img src="/lab/party-planner/party.webp" alt="" />
      </div>
      <img className="ornament left" src="/lab/party-planner/party.webp" alt="" aria-hidden="true" />
      <h2 id="reminder-title">Still waiting? Share the invitation link again.</h2>
      <img className="rsvp-module" src="/lab/party-planner/story/rsvp-module.png" width="690" height="218" alt="3 families haven’t replied yet. A gentle nudge usually does it. Resend link." />
    </section>
    <section className="proof-section" id="one-link">
      <LayerScrollGroup>
        <img className="ornament right" src="/lab/party-planner/note.webp" alt="" aria-hidden="true" />
        <div className="intro">
          <h2>One link. Three things parents need.</h2>
          <p>Everything a guest family needs, from one invitation link.</p>
        </div>
        <div className="guest-grid" data-move="64">
          <article className="guest-feature">
            <span className="feature-name">RSVP · No app</span>
            <h3>Reply without an account</h3>
            <p>No app, no account. Reply from the invite.</p>
            <img src="/lab/party-planner/story/reply-crop.png" width="714" height="434" alt="Real RSVP form, Yes selected and the demo child’s name entered." />
          </article>
          <article className="guest-feature">
            <span className="feature-name">Wishlist · No doubles</span>
            <h3>Claim a gift, once</h3>
            <p>See what’s still open and what’s taken.</p>
            <p>Claimed gifts stay off the list.</p>
            <img className="gift-illustration" src="/lab/party-planner/gift.webp" alt="" />
          </article>
          <article className="guest-feature">
            <span className="feature-name">Privacy · Host only</span>
            <h3>Allergies stay with the host</h3>
            <p>Only the host sees dietary notes and phone numbers.</p>
            <img className="allergy-proof" src="/lab/party-planner/story/allergy-crop.png" width="690" height="172" alt="Real host-only dietary summary: Mia has a nut allergy; Elias is lactose intolerant." />
            <div className="private-copy">
              <strong>Guests never see each other’s details.</strong>
              <p>Guest data is removed after 30 days.</p>
            </div>
          </article>
        </div>
      </LayerScrollGroup>
    </section>
    <section className="proof-section plan-proof" id="plan">
      <LayerScrollGroup>
        <div className="party-background" aria-hidden="true">
          <img src="/lab/party-planner/party.webp" alt="" />
        </div>
        <img className="ornament left" src="/lab/party-planner/party.webp" alt="" aria-hidden="true" />
        <div className="proof-split" data-move="64">
          <div className="story-copy">
            <h2>Four details in. One beautiful plan out.</h2>
            <p>Your party plan</p>
            <dl className="facts">
              <div>
                <dt>Theme</dt>
                <dd>Unicorn</dd>
              </div>
              <div>
                <dt>Age</dt>
                <dd>6</dd>
              </div>
              <div>
                <dt>Budget</dt>
                <dd>CHF 900</dd>
              </div>
              <div>
                <dt>Date</dt>
                <dd>5 December</dd>
              </div>
            </dl>
            <p>The practical details become a plan you can actually use.</p>
          </div>
          <div className="product-stage">
            <div className="device">
              <img src="/lab/party-planner/story/screen-step-2.png" alt="Gratula invitation in the real prototype" width="786" height="1672" />
            </div>
          </div>
        </div>
      </LayerScrollGroup>
    </section>
    <section className="proof-section rsvp-proof" id="rsvp">
      <LayerScrollGroup>
        <img className="ornament right" src="/lab/party-planner/gift.webp" alt="" aria-hidden="true" />
        <div className="proof-split" data-move="64">
          <div className="product-stage">
            <img className="guest-detail" src="/lab/party-planner/story/guest-detail-crop.png" alt="Detail of the real host guest list, including dietary notes and coming responses." width="690" height="793" />
          </div>
          <div className="story-copy">
            <h2>Guest replies, one demo list</h2>
            <p>See who’s coming in the prototype.</p>
            <p>Try an RSVP or add a guest yourself. Both appear in the same demo list.</p>
            <p className="details-label">Demo planning details</p>
            <div className="sync-copy">
              <div>
                <strong>Cake needs</strong>
              </div>
              <div>
                <strong>Party bags</strong>
              </div>
              <div>
                <strong>Venue capacity</strong>
              </div>
              <div>
                <strong>Schedule</strong>
              </div>
            </div>
          </div>
        </div>
      </LayerScrollGroup>
    </section>
    <section className="proof-section local-proof" id="local">
      <LayerScrollGroup>
        <div className="party-background" aria-hidden="true">
          <img src="/lab/party-planner/party.webp" alt="" />
        </div>
        <img className="ornament right" src="/lab/party-planner/party.webp" alt="" aria-hidden="true" />
        <div className="intro">
          <p className="supplier-eyebrow">{supplierCopy.eyebrow}</p>
          <h2>{supplierCopy.title}</h2>
        </div>
        <div className="proof-split" data-move="64">
          <div>
            <h3>{supplierCopy.subtitle}</h3>
            <img className="note" src="/lab/party-planner/note.webp" alt="" />
          </div>
          <div>
            <SupplierList />
            <p className="supplier-disclosure">{supplierCopy.checkedDate}</p>
            <p className="supplier-disclosure">{supplierCopy.disclosure}</p>
          </div>
        </div>
      </LayerScrollGroup>
    </section>
    <section className="finale" id="party-day">
      <div className="party-background" aria-hidden="true">
        <img src="/lab/party-planner/party.webp" alt="" />
      </div>
      <span className="confetti pk cc1" aria-hidden="true">
      </span>
      <span className="confetti yl cc2" aria-hidden="true">
      </span>
      <span className="confetti pk cc3" aria-hidden="true">
      </span>
      <span className="confetti yl cc4" aria-hidden="true">
      </span>
      <span className="confetti bl cc5" aria-hidden="true">
      </span>
      <span className="confetti mt cc6" aria-hidden="true">
      </span>
      <span className="confetti pk cc7" aria-hidden="true">
      </span>
      <span className="confetti yl cc8" aria-hidden="true">
      </span>
      <span className="confetti bl cc9" aria-hidden="true">
      </span>
      <span className="confetti pk cc10" aria-hidden="true">
      </span>
      <span className="confetti mt cc11" aria-hidden="true">
      </span>
      <span className="confetti yl cc12" aria-hidden="true">
      </span>
      <img className="ornament left" src="/lab/party-planner/note.webp" alt="" aria-hidden="true" />
      <h2>Be there for the candles.<br /> We’ll hold the details.</h2>
      <div className="closing-stage">
        <img className="prop" src="/lab/party-planner/party.webp" alt="" />
        <div className="device">
          <img src="/lab/party-planner/story/screen-step-5.png" alt="Gratula party-day screen in the real prototype" width="786" height="1672" />
        </div>
        <img className="prop" src="/lab/party-planner/gift.webp" alt="" />
      </div>
      <p className="map-attribution">Map data ©2026 Google</p>
      <a className="cta" href={prototypeUrl} target="_blank" rel="noopener noreferrer">Start planning</a>
      <p>Happier planning. Brighter childhoods.</p>
    </section>
  </div>);
}
