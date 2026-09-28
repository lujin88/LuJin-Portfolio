# Claude Working Scroll Effect --- Code Extraction

## Purpose

This document contains the working scroll effect extracted from the
Claude implementation in `index.html`.

Use this as the **technical source of truth** when reproducing the same
scroll interaction in v0.

The effect is the combination of:

1.  A tall outer wrapper (`.pin-wrap`) that creates the scroll distance.
2.  A sticky inner section (`.pin-sticky`) that remains fixed in the
    viewport.
3.  Vanilla JavaScript that converts scroll progress into discrete
    accordion states.
4.  CSS transitions that animate the active accordion body open/closed.

No Framer Motion, GSAP, ScrollTrigger, or IntersectionObserver is
required for this effect.

------------------------------------------------------------------------

# 1. Exact Working Mechanism

## Pin

The outer wrapper is approximately `360vh` for three accordion items.

``` css
.pin-wrap {
  position: relative;
}

.pin-sticky {
  position: sticky !important;
  top: 0 !important;
  will-change: transform;
}
```

The actual section uses:

``` html
<div id="model-series" class="pin-wrap" style="height:360vh;">
  <section class="pin-sticky h-screen min-h-[680px] w-full flex items-center">
    ...
  </section>
</div>
```

The sticky section stays in the viewport while the outer wrapper
continues to scroll.

For three states:

``` text
progress 0.000 → 0.333 = state 0
progress 0.333 → 0.666 = state 1
progress 0.666 → 1.000 = state 2
```

------------------------------------------------------------------------

# 2. Working HTML Structure

``` html
<div id="model-series" class="pin-wrap" style="height:360vh;">
  <section class="pin-sticky h-screen min-h-[680px] w-full flex items-center bg-ink px-6">
    <div class="mx-auto max-w-[1440px] w-full">

      <h2 class="text-center text-[1.9rem] md:text-4xl font-semibold text-text1 mb-16 md:mb-20">
        AI-powered advisor
        <span class="font-sans font-semibold">workflow optimization</span>
      </h2>

      <div class="grid lg:grid-cols-[minmax(0,43fr)_minmax(0,57fr)] gap-12 lg:gap-20 items-center">

        <div class="flex flex-col">

          <div class="accordion my-auto" data-group="1">

            <button class="accordion-item is-active" data-index="0" type="button">
              <span class="accordion-bar"></span>

              <span class="flex-1">

                <span class="accordion-title block">
                  My role — lead service designer
                </span>

                <span class="accordion-body-wrap">
                  <span class="accordion-body-inner block">
                    <p class="accordion-body">
                      Mapped end-to-end advisor workflows, identified key friction points,
                      and translated insights into information architecture, user flows,
                      and wireframes. Contributed to advisor interviews to uncover daily
                      needs, priorities, and opportunities for AI.
                    </p>
                  </span>
                </span>

              </span>
            </button>


            <button class="accordion-item" data-index="1" type="button">
              <span class="accordion-bar"></span>

              <span class="flex-1">

                <span class="accordion-title block">
                  From friction to AI
                </span>

                <span class="accordion-body-wrap">
                  <span class="accordion-body-inner block">
                    <p class="accordion-body">
                      Embedded AI into existing workflows to help advisors prioritize
                      tasks, surface relevant information, and respond to clients at
                      the right moment. When a client calls, AI can also surface who
                      they are and what they may need — giving advisors the right
                      context immediately, without adding another tool.
                    </p>
                  </span>
                </span>

              </span>
            </button>


            <button class="accordion-item" data-index="2" type="button">
              <span class="accordion-bar"></span>

              <span class="flex-1">

                <span class="accordion-title block">
                  Designed for 500+ advisors
                </span>

                <span class="accordion-body-wrap">
                  <span class="accordion-body-inner block">
                    <p class="accordion-body">
                      The concept could save an estimated 10–15 minutes per workflow,
                      reducing time spent searching, synthesising information, and
                      switching between systems.
                    </p>
                  </span>
                </span>

              </span>
            </button>

          </div>

          <div class="mt-12 md:mt-14 text-left">
            <a href="#" class="pill-btn">
              Explore Now
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </a>
          </div>

        </div>


        <div class="relative rounded-2xl overflow-hidden media-panel aspect-[16/9]">

          <video
            class="absolute inset-0 w-full h-full object-cover"
            src="References/Client%20advisory/Client%20advsior%20hero.mp4"
            autoplay
            loop
            muted
            playsinline
            preload="auto"
            disablepictureinpicture
            aria-hidden="true"
          ></video>

        </div>

      </div>
    </div>
  </section>
</div>
```

Important: the right-side video in this specific implementation is
**static**. It does not change when the accordion step changes.

------------------------------------------------------------------------

# 3. Working Accordion CSS

``` css
.accordion-item {
  display: flex;
  align-items: stretch;
  gap: 1.25rem;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: default;
  padding: 1.1rem 0;
}

.accordion-bar {
  flex: 0 0 2px;
  width: 2px;
  border-radius: 2px;
  background: transparent;
  transition: background-color 400ms ease;
}

.accordion-item.is-active .accordion-bar {
  background: var(--color-text-1);
}

.accordion-title {
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-text-3);
  transition: color 400ms ease;
}

.accordion-item.is-active .accordion-title {
  color: var(--color-text-1);
}

.pin-wrap .accordion-item {
  cursor: default;
}

.pin-wrap .accordion-item:not(.is-active):hover .accordion-title {
  color: var(--color-text-3);
}

.accordion-body-wrap {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition:
    grid-template-rows 450ms cubic-bezier(0.22,1,0.36,1),
    opacity 350ms ease;
}

.accordion-item.is-active .accordion-body-wrap {
  grid-template-rows: 1fr;
  opacity: 1;
}

.accordion-body-inner {
  overflow: hidden;
}

.accordion-body {
  margin-top: 0.85rem;
  color: var(--color-text-2);
  line-height: 1.75;
  font-size: 0.95rem;
  font-weight: 400;
}
```

The critical part is:

``` css
.accordion-body-wrap {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition:
    grid-template-rows 450ms cubic-bezier(0.22,1,0.36,1),
    opacity 350ms ease;
}

.accordion-item.is-active .accordion-body-wrap {
  grid-template-rows: 1fr;
  opacity: 1;
}

.accordion-body-inner {
  overflow: hidden;
}
```

This creates the smooth open/close animation without JavaScript
calculating the content height.

------------------------------------------------------------------------

# 4. Working Scroll JavaScript

This is the core of the effect.

``` js
(function () {
  const reduceMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) return;

  const clamp = (v, min, max) =>
    Math.max(min, Math.min(max, v));

  const groups = Array.from(
    document.querySelectorAll('.pin-wrap')
  ).map((wrap) => ({
    wrap,
    items: Array.from(
      wrap.querySelectorAll('.accordion-item[data-index]')
    ),
    medias: Array.from(
      wrap.querySelectorAll('.scroll-media[data-index]')
    ),
    last: -1,
  }));

  let ticking = false;

  function update() {
    const vh = window.innerHeight;

    const progresses = groups.map((g) => {
      const r = g.wrap.getBoundingClientRect();
      const scrollable = r.height - vh;

      return scrollable > 0
        ? clamp(-r.top / scrollable, 0, 1)
        : 0;
    });

    groups.forEach((g, gi) => {
      if (!g.items.length) return;

      const count = g.items.length;

      const activeIndex = Math.min(
        count - 1,
        Math.floor(progresses[gi] * count)
      );

      if (activeIndex === g.last) return;

      g.last = activeIndex;

      g.items.forEach((item) => {
        item.classList.toggle(
          'is-active',
          Number(item.dataset.index) === activeIndex
        );
      });

      g.medias.forEach((img) => {
        img.style.opacity =
          Number(img.dataset.index) === activeIndex
            ? '1'
            : '0';
      });
    });

    ticking = false;
  }

  function onScrollOrResize() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener(
    'scroll',
    onScrollOrResize,
    { passive: true }
  );

  window.addEventListener(
    'resize',
    onScrollOrResize
  );

  window.addEventListener(
    'load',
    update
  );

  update();
})();
```

------------------------------------------------------------------------

# 5. How the Scroll Trigger Works

The JS does NOT animate continuously between states.

It calculates a normalized scroll progress:

``` js
const r = g.wrap.getBoundingClientRect();

const scrollable = r.height - vh;

const progress =
  scrollable > 0
    ? clamp(-r.top / scrollable, 0, 1)
    : 0;
```

Then it converts progress into a discrete index:

``` js
const count = g.items.length;

const activeIndex = Math.min(
  count - 1,
  Math.floor(progress * count)
);
```

For three items:

``` text
0.000 – 0.332 → item 0
0.333 – 0.665 → item 1
0.666 – 1.000 → item 2
```

Only when the index changes does the script update the DOM:

``` js
if (activeIndex === g.last) return;

g.last = activeIndex;
```

Then:

``` js
g.items.forEach((item) => {
  item.classList.toggle(
    'is-active',
    Number(item.dataset.index) === activeIndex
  );
});
```

The CSS then performs the visual animation.

------------------------------------------------------------------------

# 6. Sticky CSS

The required pin CSS is:

``` css
.pin-wrap {
  position: relative;
}

.pin-sticky {
  position: sticky !important;
  top: 0 !important;
  will-change: transform;
}
```

For the actual section:

``` html
<div class="pin-wrap" style="height:360vh;">
  <section class="pin-sticky" style="height:100vh;">
    ...
  </section>
</div>
```

The outer wrapper provides the scroll budget.

For three items, the working implementation uses:

``` text
360vh
```

The rule is approximately:

``` text
N items → (N + 1) × 100vh
```

Examples:

``` text
3 items → 360vh
4 items → 480vh
5 items → 600vh
```

------------------------------------------------------------------------

# 7. Critical Sticky Guardrails

These conditions are important.

No ancestor of `.pin-wrap` should have:

``` css
overflow: hidden;
overflow: clip;
overflow: auto;
overflow: scroll;
```

Also avoid on ancestors:

``` css
transform: ...;
filter: ...;
perspective: ...;
will-change: transform;
```

These can prevent `position: sticky` from behaving correctly.

The normal page scroll container should remain:

``` text
html / body
```

Do not introduce an additional scrolling container around the effect.

------------------------------------------------------------------------

# 8. Initial State

The first accordion item must start active:

``` html
<button
  class="accordion-item is-active"
  data-index="0"
  type="button"
>
```

The other items start without `is-active`:

``` html
<button
  class="accordion-item"
  data-index="1"
  type="button"
>
```

``` html
<button
  class="accordion-item"
  data-index="2"
  type="button"
>
```

This prevents a flash before the first scroll calculation.

Every item needs a contiguous `data-index`:

``` text
0
1
2
...
```

The JS derives the number of steps automatically from:

``` js
.accordion-item[data-index]
```

------------------------------------------------------------------------

# 9. Reduced Motion

The original implementation disables the scroll-driven effect when the
user prefers reduced motion:

``` css
@media (prefers-reduced-motion: reduce) {
  .pin-wrap {
    height: auto !important;
  }

  .pin-sticky {
    position: relative;
    height: auto !important;
  }
}
```

And the JS exits immediately:

``` js
const reduceMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) return;
```

------------------------------------------------------------------------

# 10. Important Implementation Notes for v0

When porting this effect into an existing v0 page:

-   Do NOT redesign the section from scratch.
-   Keep the existing visual layout, typography, spacing, colors,
    imagery/video, and content unless explicitly instructed otherwise.
-   Replace only the scroll interaction mechanism with this proven
    implementation.
-   The existing v0 section should remain the **visual/layout source of
    truth**.
-   This MD is the **technical interaction source of truth**.
-   Do not replace this implementation with Framer Motion, GSAP,
    ScrollTrigger, or another animation library unless there is a
    specific technical reason.
-   Do not simulate the effect with arbitrary `whileInView`,
    `IntersectionObserver`, or independent viewport animations.
-   The intended behaviour is specifically: **sticky section + scroll
    progress + discrete active accordion state + CSS transition**.

------------------------------------------------------------------------

# 11. Optional Per-Step Media

The generic engine also supports changing images/videos by step.

Each media element can have:

``` html
.scroll-media[data-index="0"]
.scroll-media[data-index="1"]
.scroll-media[data-index="2"]
```

The JS already contains:

``` js
g.medias.forEach((img) => {
  img.style.opacity =
    Number(img.dataset.index) === activeIndex
      ? '1'
      : '0';
});
```

However, the specific working `model-series` implementation does NOT use
this.

Its right-side video is one static looping video.

Therefore, if reproducing `model-series`, do not introduce unnecessary
media swapping.

------------------------------------------------------------------------

# 12. Final Behaviour to Reproduce

The exact intended interaction is:

1.  User scrolls into the section.
2.  The section reaches the top of the viewport.
3.  The entire section becomes sticky.
4.  The section remains visually fixed while the wrapper continues
    consuming scroll distance.
5.  At first, item 0 is active and its body is open.
6.  As the user continues scrolling, item 1 becomes active.
7.  Item 0 closes while item 1 opens with a smooth CSS transition.
8.  Continuing to scroll activates item 2.
9.  Item 1 closes while item 2 opens.
10. After the wrapper is exhausted, the sticky section releases and the
    page continues scrolling normally.
11. Scrolling upward reverses the states in the same way: item 2 → item
    1 → item 0.
12. The interaction is driven by actual page scroll position, not by
    click.
13. The right-side video remains static in the specific `model-series`
    implementation.

------------------------------------------------------------------------

# 13. Minimal Drop-In Core

If only the essential mechanic is needed, these are the critical pieces.

### HTML

``` html
<div class="pin-wrap" style="height:360vh;">
  <section class="pin-sticky" style="height:100vh;">

    <div class="accordion">

      <button
        class="accordion-item is-active"
        data-index="0"
        type="button"
      >
        <span class="accordion-bar"></span>
        <span>
          <span class="accordion-title">Step 1</span>
          <span class="accordion-body-wrap">
            <span class="accordion-body-inner">
              <span class="accordion-body">Content 1</span>
            </span>
          </span>
        </span>
      </button>

      <button
        class="accordion-item"
        data-index="1"
        type="button"
      >
        <span class="accordion-bar"></span>
        <span>
          <span class="accordion-title">Step 2</span>
          <span class="accordion-body-wrap">
            <span class="accordion-body-inner">
              <span class="accordion-body">Content 2</span>
            </span>
          </span>
        </span>
      </button>

      <button
        class="accordion-item"
        data-index="2"
        type="button"
      >
        <span class="accordion-bar"></span>
        <span>
          <span class="accordion-title">Step 3</span>
          <span class="accordion-body-wrap">
            <span class="accordion-body-inner">
              <span class="accordion-body">Content 3</span>
            </span>
          </span>
        </span>
      </button>

    </div>

  </section>
</div>
```

### CSS

``` css
.pin-wrap {
  position: relative;
}

.pin-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
}

.accordion-body-wrap {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition:
    grid-template-rows 450ms cubic-bezier(0.22,1,0.36,1),
    opacity 350ms ease;
}

.accordion-item.is-active .accordion-body-wrap {
  grid-template-rows: 1fr;
  opacity: 1;
}

.accordion-body-inner {
  overflow: hidden;
}
```

### JavaScript

``` js
(function () {
  const reduceMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) return;

  const clamp = (v, min, max) =>
    Math.max(min, Math.min(max, v));

  const groups = Array.from(
    document.querySelectorAll('.pin-wrap')
  ).map((wrap) => ({
    wrap,
    items: Array.from(
      wrap.querySelectorAll('.accordion-item[data-index]')
    ),
    medias: Array.from(
      wrap.querySelectorAll('.scroll-media[data-index]')
    ),
    last: -1,
  }));

  let ticking = false;

  function update() {
    const vh = window.innerHeight;

    const progresses = groups.map((g) => {
      const r = g.wrap.getBoundingClientRect();
      const scrollable = r.height - vh;

      return scrollable > 0
        ? clamp(-r.top / scrollable, 0, 1)
        : 0;
    });

    groups.forEach((g, gi) => {
      if (!g.items.length) return;

      const count = g.items.length;

      const activeIndex = Math.min(
        count - 1,
        Math.floor(progresses[gi] * count)
      );

      if (activeIndex === g.last) return;

      g.last = activeIndex;

      g.items.forEach((item) => {
        item.classList.toggle(
          'is-active',
          Number(item.dataset.index) === activeIndex
        );
      });

      g.medias.forEach((img) => {
        img.style.opacity =
          Number(img.dataset.index) === activeIndex
            ? '1'
            : '0';
      });
    });

    ticking = false;
  }

  function onScrollOrResize() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener(
    'scroll',
    onScrollOrResize,
    { passive: true }
  );

  window.addEventListener(
    'resize',
    onScrollOrResize
  );

  window.addEventListener(
    'load',
    update
  );

  update();
})();
```

------------------------------------------------------------------------

# 14. Source Extraction Summary

The Claude implementation was inspected without modifying the original
page.

The working effect was found around:

``` text
#model-series
```

The original implementation also contains another mirrored `.pin-wrap`
instance below it (`#omni-model`). Both are driven by the same generic
scroll engine.

The key implementation facts are:

``` text
Outer wrapper:       .pin-wrap
Wrapper height:      360vh for 3 states
Sticky element:      .pin-sticky
Sticky position:     top: 0
Sticky height:       100vh
State elements:      .accordion-item[data-index]
Initial state:       data-index="0" + .is-active
Scroll calculation:  getBoundingClientRect()
Progress:            0 → 1
State mapping:       Math.floor(progress * count)
Animation:            CSS grid 0fr → 1fr + opacity
Frame throttling:    requestAnimationFrame
Dependencies:        none
```

This is the implementation that successfully produced the desired Claude
scroll effect.
