import './original.css'

const IMG = '/assets/images/bmw-system/original/'
const HERO = '/assets/images/bmw-system/i4-alpine-sunset.webp'

type Item = { icon: string; title: string; sub?: React.ReactNode; body?: React.ReactNode[]; img?: { src: string; w: number; h: number; alt: string; wide?: boolean; caption?: string } }

function Head({ icon, title, sub }: Pick<Item, 'icon' | 'title' | 'sub'>) {
  return (
    <>
      <div className="bo-item-head">
        <img src={IMG + icon} alt="" width="45" height="45" loading="lazy" />
        <h3>{title}</h3>
      </div>
      {sub && <p className="bo-sub">{sub}</p>}
    </>
  )
}

function Fig({ img }: { img: NonNullable<Item['img']> }) {
  return (
    <figure className="bo-figure">
      <img className={img.wide ? 'bo-fig wide' : 'bo-fig'} src={IMG + img.src} width={img.w} height={img.h} alt={img.alt} loading="lazy" />
      {img.caption && <figcaption>{img.caption}</figcaption>}
    </figure>
  )
}

function Block(item: Item) {
  return (
    <div className="bo-item">
      <Head {...item} />
      {item.img && <Fig img={item.img} />}
      {item.body?.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  )
}

/* Original layout: item A | image | item B, then the body text under all three. */
function Trio({ a, b }: { a: Item; b: Item }) {
  return (
    <div className="bo-trio">
      <div className="bo-item bo-trio-a"><Head {...a} /></div>
      {a.img && <Fig img={a.img} />}
      <div className="bo-item bo-trio-b"><Head {...b} /></div>
      <div className="bo-trio-body">{b.body?.map((p, i) => <p key={i}>{p}</p>)}</div>
    </div>
  )
}

function Section({ n, icon, title, id, children }: { n: number; icon: string; title: string; id: string; children: React.ReactNode }) {
  return (
    <section className="bo-section" aria-labelledby={id}>
      <div className="bo-section-head">
        <img src={IMG + icon} alt="" width="44" height="44" loading="lazy" />
        <h2 id={id}><span>{n}</span>{title}</h2>
      </div>
      <div className="bo-items">{children}</div>
    </section>
  )
}

export function BMWOriginal() {
  return (
    <main className="bmw-original" id="top">
      <header className="bo-title">
        <h1>System Design <br />Management</h1>
      </header>
      <img className="bo-hero" src={HERO} width="1600" height="900" alt="" fetchPriority="high" />

      <div className="bo-width">
        <h2 className="bo-collab">Cross-team Collaboration</h2>
        <dl className="bo-meta">
          <div><dt>Project Date</dt><dd>2018 - 2020 , München</dd></div>
          <div><dt>Clients</dt><dd>Giant Automotive Enterprise</dd></div>
          <div><dt>My Role</dt><dd>Project Management, Design System, UX, UI Design</dd></div>
        </dl>

        <section className="bo-block" aria-labelledby="bo-challenges">
          <h2 id="bo-challenges" className="bo-label">Challenges</h2>
          <p className="bo-lead">HMW deliver an implementable design file in a consistent brand design language?</p>
          <ul className="bo-pillars">
            {[['icn-sync.png', 'SYNC'], ['icn-system.png', 'SYSTEM'], ['icn-accessibility.png', 'ACCESSIBILITY'], ['icn-prototype.png', 'ITERATION']].map(([s, l]) => (
              <li key={l}><img src={IMG + s} alt="" width="80" height="80" loading="lazy" /><span>{l}</span></li>
            ))}
          </ul>
        </section>

        <section className="bo-block" aria-labelledby="bo-background">
          <h2 id="bo-background" className="bo-label">Background</h2>
          <p>Due to the confidential reason, here only shows how I support clients to create an <strong>easy-to-track design system</strong> and collaborate with different stakeholders in an around 400 people team (including design, development, PO, Service owners, functional owners).</p>
          <p>This 1,5 years project&apos;s goal is to develop a new app interacting with the vehicle(s). We have around 40 designers, located in <strong>3 continents</strong> with <strong>10 hours time difference</strong>. As the team leader from my 10 people team, my role covers project management, Design System, UX, UI Design as well as arranging monthly Usability test.</p>
        </section>

        <Section n={1} id="bo-sync" icon="icn-sync-whole-blue.png" title="Sync">
          <Trio
            a={{ icon: 'icn-meeting.png', title: 'Daily & Weekly', sub: 'Real-time sync different topics in time by blocking the daily and weekly.', img: { src: 'confluence.png', w: 752, h: 864, alt: 'Confluence page structure' } }}
            b={{ icon: 'icn-table-of-content.png', title: 'Table of Content', sub: 'Use number tracking in the JIRA and Confluence.', body: [
              'Team knowledge sharing is one of the most challengings topics among 400 people. In order to provide an easy handover and understandable knowledge. Besides frequent dailies, weeklies with different teams and stakeholders, I propose to use numbers tracking every single widget in JIRA and Confluence. The widget can show or hide due to the personalization of the App in the future. So far it is running quite well, we can call out a specific topic with the number during the remote meeting.',
              'Design is far ahead of the development. To show the remote development team a clear picture, all the development-ready widgets are called the "Current". Future functions are listed under "Vision". Relevant design processes are documented under the "Background" page. We tested with new joiners, developer. This structure is clear and self-explanatory.',
            ] }}
          />
        </Section>

        <Section n={2} id="bo-system" icon="icn-system-whole-blue.png" title="System">
          <Block icon="icn-library.png" title="Up-to-date Design Library" sub="GitHub Atomic Design Library, consistency of Molecules" img={{ src: 'design-library.gif', w: 1000, h: 500, alt: 'Design library, animated', wide: true }} body={[
            'When the project starts, there is no design system. Each designer is designing their own widget. I found out this issue in the early stage and raise it up during the alignment meeting.',
            'The UI pattern is in charge of the UI department from the client-side. In the early stage, I collected proposed and request UI widgets from the team and sync with the UI library team every week to ensure all the new widgets are using the same style and use properly.',
            'With the time pass by, we start using Camilo to switch UX theme to UI theming and share the Design file via Abstract with the development team.',
          ]} />
          <Block icon="icn-deliverables-blue.png" title="Intuitive Deliverables" sub="Information Architecture, Logic Diagram, Widget Matrix, UX flow, Copy..." img={{ src: 'logic-diagram.png', w: 2610, h: 896, alt: 'Logic Diagram Sample', wide: true, caption: 'Logic Diagram Sample' }} body={[
            'This giant App has to assist all types of cars, some were built decades ago. During the design, the request is considering all the edge cases of every single module. Besides document the UX flow in a constructal way, I propose to have a logic diagram for each widget. This helps to provide an overview of each widget for all the participants. PO, functional owners all agree this is an intuitive way to document.',
          ]} />
        </Section>

        <Section n={3} id="bo-accessibility" icon="icn-accessibility-whole-blue.png" title="Accessibility">
          <Trio
            a={{ icon: 'icn-awareness.png', title: 'Awake Awareness', sub: 'Coaching the team to have the accessibility awareness from begining', img: { src: 'w3c.png', w: 752, h: 902, alt: 'W3C accessibility guidelines' } }}
            b={{ icon: 'icn-checklist.png', title: 'Accessibility Check List', sub: 'Use WCAG (Web Content Accessibility Guidelines) as a reference guideline', body: [
              'More and more companies like Microsoft, Google put effort into integrating accessibility topics in the early design phase. Accessibility is still a quite new topic in German enterprise. Together with our accessibility expert, we integrate accessibility tickets into JIRA system and present guidelines, show how to check the accessibility issues in design during the meeting.',
              'Our clients and other teams starting using our guidelines to review their design to provide a better scalable product to the whole world.',
            ] }}
          />
        </Section>

        <Section n={4} id="bo-iteration" icon="icn-prototype-whole-blue.png" title="Iteration">
          <Trio
            a={{ icon: 'icn-review.png', title: 'Continuous Improvement', sub: 'Pair design, Usability test, Rainbow Chart, Synthesis, Design review', img: { src: 'modal.png', w: 376, h: 453, alt: 'Modal' } }}
            b={{ icon: 'icn-tech-review.png', title: 'Tech Review', sub: 'Sync with dev in the pre-planing phase to make sure the technical feasibility.', body: [
              'User-centric design is my pursue. Besides the frequent informal usability test, pair design, I supported recruiting the premium car owners, align with different teams for testing topics, arrange prototyping, venue and observation room every month. After the usability test, we use the rainbow chart, affinity diagram to synthesis the user findings and tracking the usability improvement with JIRA ticket in the following sprints.',
              'Before the development team starts planing, I had several sync meetings with them. Therefore both sides understand the situation much better. Design is modified based on the new technical input.',
              <>As the <strong>result</strong>, one of the core features, digital key, is launched together with Apple WWDC 2020. The clients appreciate our team collaboration and the iteration improvement I proposed along with the project.</>,
            ] }}
          />
        </Section>
      </div>
    </main>
  )
}
