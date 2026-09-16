# E.ON Solar Lead Generation --- Design System

> **Updated:** 2026-09-10  
> **Update focus:** global section continuity, canonical dark backgrounds, and merged-session spacing.

## Purpose

This document captures the visual language, layout rules, typography,
color system, components, imagery, and storytelling patterns used across
the E.ON solar lead-generation case study.

Use this as the **shared visual reference for future V0 / web
implementation sessions**. The goal is not to reproduce individual
screenshots literally, but to preserve the same design language across
sections.

------------------------------------------------------------------------

# 01 · Design Direction

### Overall character

-   Premium editorial case-study aesthetic
-   Dark, cinematic opening sections paired with bright editorial
    content sections
-   Large, confident typography
-   Strong visual hierarchy with generous whitespace
-   Soft lavender, mint, pale blue, and warm photographic tones
-   Rounded cards with subtle borders
-   Minimal UI chrome
-   Mix of polished product UI and hand-drawn annotation
-   Photography should feel warm, optimistic, realistic, and
    aspirational
-   The experience should feel like a **senior product designer
    portfolio**, not a generic SaaS landing page

### Core principles

1.  **Editorial first** --- typography and storytelling lead the
    composition.
2.  **One visual idea per section** --- avoid overcrowding.
3.  **Soft contrast** --- use dark navy rather than pure black and
    off-white rather than harsh white.
4.  **Rounded but not playful** --- cards have generous radii, but the
    overall tone remains sophisticated.
5.  **Human + system** --- combine customer photography with product/UI
    evidence.
6.  **Use decoration sparingly** --- organic circles, gradients, and
    hand-written notes should support the story rather than compete with
    it.

------------------------------------------------------------------------

# 02 · Color System

## Primary dark

  Token             Approx. value   Usage
  ----------------- --------------- ----------------------------------
  `--navy-950`      `#07151F`       Main dark background
  `--navy-900`      `#0A1822`       Dark section surfaces
  `--navy-800`      `#172735`       Cards / elevated dark surfaces
  `--navy-border`   `#1B3445`       Subtle dividers and card borders

The dark background should read as **deep blue-black**, not pure black.

## Light surfaces

  Token            Approx. value   Usage
  ---------------- --------------- --------------------------
  `--white`        `#FFFFFF`       Primary light background
  `--off-white`    `#F8F8F6`       Editorial sections
  `--soft-white`   `#F3F4FA`       Light cards

## Accent palette

  -----------------------------------------------------------------------
  Token                   Approx. value           Usage
  ----------------------- ----------------------- -----------------------
  `--lavender`            `#C9B5F4`               Primary accent, section
                                                  numbers, highlights

  `--lavender-light`      `#E8E1FF`               Soft card backgrounds

  `--lavender-marker`     `#9284D7`               Strong section-number
                                                  marker / active accent

  `--lavender-marker-soft` `#BEB2F0`              Soft section-number
                                                  marker / secondary accent

  `--lavender-insight`    `#9B90C5`               Muted Key Insight /
                                                  editorial highlight text

  `--mint`                `#B9F4D8`               Positive states,
                                                  metrics, automation

  `--mint-light`          `#E5F9EE`               Positive card surfaces

  `--blue-soft`           `#B9D4FF`               Secondary decorative
                                                  accent

  `--peach`               `#FFDCC3`               Warm secondary accent

  `--eon-red`             `#F32717`               E.ON logo / brand
                                                  accent only
  -----------------------------------------------------------------------

### Color behavior

-   Never use E.ON red as the dominant interface accent.
-   Red is reserved primarily for the E.ON logo / brand recognition.
-   Lavender is the main portfolio accent.
-   Mint communicates success, automation, validation, and positive
    outcomes.
-   Pale blue can be used for secondary decoration.
-   Decorative color fields should remain soft and low contrast.
-   Do not use the base `--lavender` token for every lavender element.
-   Use `--lavender-marker` for section-number circles when the marker needs
    stronger visual presence.
-   Use `--lavender-marker-soft` only for intentionally softer marker
    backgrounds.
-   Section-number numerals must use one consistent, accessible dark-purple
    text color across the entire case study. Do not alternate numeral colors
    between sections.
-   The numeral font family, size, weight, and line-height must remain
    consistent across all section markers.
-   Use `--lavender-insight` for editorial labels such as **Key Insight**;
    it should be visibly quieter than the main lavender accent.
-   Quote text may use a dedicated purple treatment when defined by the
    reference composition; do not automatically reuse the section-marker
    token.
-   Decorative lavender is for backgrounds and atmosphere, not for small
    text that requires strong contrast.
-   Lavender intensity should create hierarchy, not decoration. Avoid
    introducing additional lavender shades unless they have a defined
    semantic role.
-   Accessibility takes priority over subtle color variation. Verify text
    contrast before introducing a new purple tone.

------------------------------------------------------------------------

# 03 · Typography

## Typeface

Use a modern geometric / neo-grotesk sans-serif.

Preferred implementation:

-   `Inter`
-   `Geist Sans`
-   or a visually equivalent modern sans-serif

Avoid serif typography.

## Type hierarchy

### Display / Hero

Large, bold, compact headlines.

-   Weight: `700–800`
-   Line-height: `0.95–1.05`
-   Letter-spacing: `-0.035em` to `-0.055em`
-   Desktop size: approximately `64–88px`
-   Mobile: approximately `42–56px`

Hero headlines may use a line break intentionally.

Example:

> Turning paid\
> traffic into\
> **solar leads.**

Use the accent color selectively on the key phrase rather than
highlighting the whole sentence.

### Section headline

-   Weight: `700–800`
-   Desktop: approximately `52–72px`
-   Line-height: `0.98–1.08`
-   Tight tracking
-   Maximum width: usually `650–850px`

### Large statement

For statements such as:

> The calculator needed data.\
> The customer didn't want to find it.

Use:

-   Weight: `600–700`
-   Size: approximately `52–68px`
-   Strong contrast between bold and regular lines where appropriate

### Body

-   Weight: `400–500`
-   Size: `18–22px`
-   Line-height: `1.45–1.6`
-   Maximum line width: approximately `650–760px`

### Supporting / metadata text

-   Size: `13–16px`
-   Weight: `500–600`
-   Letter spacing: `0.04em` when uppercase

### Eyebrow / section label

Examples:

`01 · THE CHALLENGE`

-   Uppercase
-   Size: `13–16px`
-   Weight: `600`
-   Letter spacing: `0.12–0.18em`
-   Muted white or muted navy depending on section
-   Always paired with a numbered circular marker

------------------------------------------------------------------------

# 04 · Section Number System

Every major case-study section begins with a numbered marker.

### Structure

``` text
[ 01 ]  THE CHALLENGE
```

### Number circle

-   Circular
-   Approximately `44–56px`
-   Use the defined lavender marker hierarchy for the circle background:
    -   `--lavender-marker` (`#9284D7`) for stronger / primary markers
    -   `--lavender-marker-soft` (`#BEB2F0`) for lighter / secondary markers
-   The **numeral itself must use one consistent, accessible dark-purple
    text color across the entire case study**.
-   Do not alternate numeral colors from section to section.
-   Number font family, size, weight, and line-height must remain consistent
    across all markers.
-   Weight: `600–700`
-   Center aligned
-   The numeral must maintain sufficient contrast against its lavender
    circle background. Check the final color pairing for accessibility rather
    than choosing a purple by eye alone.
-   The marker hierarchy may vary through the circle background tone, but the
    numeral treatment must remain fixed.

### Label

-   Uppercase
-   Generous letter spacing
-   Positioned horizontally beside the number
-   Use the same label typography across all sections
-   Muted white or muted navy depending on the section background

### Consistency rule

All section markers are one global component.

Do not create local variations in:
-   numeral color
-   numeral weight
-   numeral size
-   circle diameter
-   label spacing
-   label typography

This creates a consistent visual navigation rhythm across the entire
case study.

------------------------------------------------------------------------

# 04A · Key Insight

Key Insight is a distinct editorial hierarchy and should not use the same
lavender intensity as primary section markers.

### Style

-   Color: `--lavender-insight` (`#9B90C5`)
-   Weight: `600–700`
-   Large editorial heading, typically `40–52px`
-   Keep the color muted and slightly desaturated
-   The supporting insight statement should remain white / near-white on
    dark backgrounds
-   Use this treatment to signal a synthesized design insight, not as a
    generic accent for arbitrary headings

Example:

``` text
Key insight

Interest was there. Confidence wasn't.
```

The **Key Insight** label should feel quieter than the main section marker
while remaining clearly identifiable as a storytelling device.

------------------------------------------------------------------------

# 05 · Layout System

## Container

Use a centered max-width container.

Recommended:

``` css
max-width: 1440px;
margin: 0 auto;
padding-inline: 64px;
```

At very wide screens, preserve generous side margins rather than
allowing content to stretch indefinitely.

### Responsive container

``` text
Desktop: 64–96px horizontal padding
Tablet: 40–56px
Mobile: 20–24px
```

### Content container vs background

The global content container controls the alignment of the primary editorial
content:

-   Section marker
-   Eyebrow
-   Headline
-   Body copy
-   Content cards
-   Primary evidence / UI content

The content container does **not** constrain decorative backgrounds.

Background shapes, oversized circles, gradients, photography, and other
editorial visual artifacts may extend beyond the content container and may
be cropped by the viewport.

When adjacent sections are visually connected, their primary text/content
alignment should remain consistent unless a deliberate editorial composition
requires otherwise.

Do not create a separate local text container for each section simply because
the section was implemented in a separate V0 / Cursor session.

## Grid

Primary desktop layouts use a flexible two-column grid.

Typical ratios:

``` text
45 / 55
40 / 60
50 / 50
```

Do not force every section into the same ratio.

The composition should feel editorial rather than dashboard-like.

## Vertical rhythm

Use generous but **controlled** section spacing.

The case study is one continuous experience, even when sections are implemented in separate V0 sessions. Do not let each section behave like an independent full-page composition.

Recommended baseline:

``` text
Small gap:          16–24px
Component gap:      32–48px
Content gap:        56–80px
Section separation: 80–120px
Hero spacing:       120–180px
```

### Section spacing rules

-   Section spacing is measured **between sections**, not independently added as large top + bottom padding.
-   Avoid duplicated vertical spacing when one section ends with large bottom padding and the next begins with large top padding.
-   Do not use large `min-height` values simply to create whitespace.
-   Full-viewport sections should be used only when the storytelling requires a true cinematic moment.
-   Prefer one clear spacing decision per boundary rather than stacking multiple large margins.
-   Dense sections may use less spacing; major narrative transitions may use more.
-   The page should feel spacious and premium, but never like separate V0 pages stitched together.

### Implementation principle

When combining independently built sections, audit the **adjacent boundary** between every section.

If both sections contribute large top/bottom spacing, reduce the combined value. Shared section/container tokens should control the rhythm wherever possible instead of one-off per-section overrides.

Avoid stacking many small margins. Prefer a clear spacing scale.

------------------------------------------------------------------------

# 06 · Dark Sections

Dark sections are used for:

-   Hero
-   Challenge
-   Journey
-   Design constraint
-   Transitional storytelling

### Background

Use a single canonical section background:

`--navy-950` = `#07151F`

This is the default background for every major dark storytelling section.

`--navy-900` = `#0A1822` is reserved for **elevated dark surfaces, cards, or intentional tonal layers**. It should not be used as an alternative section background.

### Dark section continuity

Adjacent dark sections should visually read as one continuous canvas.

Do not introduce slightly different dark background values between sections. When two dark sections are adjacent, the boundary should come primarily from spacing, content composition, or a subtle divider — not from a change in navy tone.

### Text

-   Primary: white / near-white
-   Secondary: muted blue-grey
-   Highlight: `--lavender-insight` for editorial insights and
    `--lavender-marker` / `--lavender-marker-soft` for section markers
-   Do not use bright lavender for large blocks of secondary text

### Decorative shapes

Use large soft organic circles behind content:

-   Lavender
-   Mint
-   Pale blue

Characteristics:

-   Large
-   Partially cropped by the viewport
-   Very soft edges
-   Low visual contrast
-   Never interfere with readability

Do not add excessive glow or neon effects.

------------------------------------------------------------------------

# 07 · Light Sections

Light sections are used for:

-   Problem
-   Design decisions
-   Testing
-   Results

### Background

Use:

-   `#FFFFFF`
-   `#F8F8F6`
-   very subtle lavender / blue gradients

### Text

Primary:

`#07151F`

Secondary:

`#41556A` approximately

### Visual behavior

Light sections should feel airy and editorial.

Use large blocks of negative space around headlines.

------------------------------------------------------------------------

# 08 · Cards

## General card style

Cards should feel premium and soft.

``` css
border-radius: 24px;
border: 1px solid rgba(...);
```

Recommended radius range:

-   Small cards: `16–20px`
-   Main cards: `24–32px`
-   Large image frames: `24–32px`

Avoid sharp corners.

## Dark card

-   Background: `#122331` or slightly lighter navy
-   Border: subtle blue-grey
-   Text: white
-   Shadow: extremely subtle

## Light card

-   Background: white
-   Border: `rgba(20, 40, 60, 0.08)`
-   Shadow: soft and diffuse

Cards should not look like heavy floating dashboards.

------------------------------------------------------------------------

# 09 · Metric Cards

Used for outcomes such as:

> +300%\
> Lead conversion uplift

### Style

-   Large number
-   Very large typography
-   Short explanatory label
-   Optional icon
-   Soft mint or lavender background
-   Rounded corners

### Number

-   Weight: `700–800`
-   Size: approximately `56–80px`
-   Tight tracking

### Label

-   Size: `14–18px`
-   Medium weight
-   Keep concise

Metric cards should communicate the result within one second.

------------------------------------------------------------------------

# 10 · Image Treatment

Photography is a major part of the visual language.

## Photography direction

Use imagery showing:

-   Realistic homes
-   Solar panels
-   Homeowners
-   Families
-   Customers researching solar
-   Warm natural light
-   Golden-hour / sunrise / sunset environments

The visual tone should be:

-   optimistic
-   warm
-   believable
-   premium
-   human

Avoid generic corporate stock photography.

## Image frames

Use:

``` text
border-radius: 24–32px
overflow: hidden
```

Images should generally be full bleed inside their frame.

Do not apply heavy filters.

------------------------------------------------------------------------

# 11 · Product UI Imagery

Product screenshots are treated as **storytelling artifacts**, not
generic UI mockups.

### Editorial image layering

When a composition combines photography, solar imagery, and product UI,
preserve a clear visual layer hierarchy:

1.  Background / customer photography
2.  Foreground solar / product imagery
3.  Detection or information card
4.  Status badge / micro UI

Foreground UI may overlap the imagery, but should not unnecessarily obscure
the key visual evidence, especially solar panels.

Use the reference composition as the source of truth for relative position,
scale, overlap, and alignment. Do not default to centered placement.

Where a detection card sits over a solar image, keep the card visually
anchored to the lower portion of the image when this preserves the solar
panel area and matches the reference.

If a supplied solar-panel or roof image is a transparent PNG, preserve its
transparency. Do not introduce or regenerate a white background behind it.

Examples include:

-   Solar calculator
-   Roof detection
-   Before / after comparison
-   Data retrieval
-   Validation states

### Treatment

-   Large rounded white cards
-   Soft shadow
-   Slight perspective / rotation when used as editorial artifacts
-   Clear hierarchy
-   Minimal surrounding chrome

UI should be legible enough to understand the design decision without
becoming a full interactive product screen.

------------------------------------------------------------------------

# 12 · Before / After Pattern

The before/after comparison is a key storytelling component.

### Before

Show:

-   manual inputs
-   multiple questions
-   visible effort
-   neutral / muted visual state

### After

Show:

-   automatic detection
-   retrieved information
-   checkmarks
-   reduced effort
-   mint success states

### Visual structure

``` text
BEFORE                  →                  AFTER

Image + manual input                       Image + detected data
Question                                   ✓ Roof size
Question                                   ✓ Roof inclination
Question                                   ✓ Sunlight exposure
```

The contrast should be immediately understandable.

------------------------------------------------------------------------

# 13 · Icons

Use a consistent line-icon style.

Characteristics:

-   Thin / medium stroke
-   Rounded geometry
-   Simple silhouettes
-   No filled 3D icons
-   Consistent optical size

Typical icon concepts:

-   Search
-   Leaf / sustainability
-   Calculator
-   Home
-   Document
-   Cart
-   Roof / dimensions
-   Sun
-   Analytics
-   Globe
-   Users
-   Cursor / interaction
-   Message / feedback

Icons can sit inside soft circular containers.

### Approved visual assets

When an approved image / icon asset exists in the project image library,
reuse the supplied asset rather than recreating or substituting it with a
different icon.

Approved assets are the visual source of truth for:
-   Product / UI imagery
-   Solar / roof imagery
-   Section-specific illustration assets
-   Chart / analytics icons
-   Globe / world icons
-   Other explicitly supplied visual artifacts

Do not redraw, reinterpret, replace, or regenerate an approved asset unless
explicitly requested.

------------------------------------------------------------------------

# 14 · Journey Visualization

The journey uses a horizontal progression:

``` text
Visit → Explore → Calculate → Consider → Apply → Purchase
```

### Step treatment

-   Circular icon container
-   Muted dark / grey default state
-   Selected / key stage uses lavender
-   Thin directional arrows between steps
-   Short label below each icon

### Highlight behavior

The most important stage can be visually emphasized with:

-   Lavender circle
-   Dark icon
-   Slightly larger scale

Avoid making every step equally prominent.

------------------------------------------------------------------------

# 15 · Handwritten Annotation

Handwritten notes are an important editorial device.

Examples:

> Same visitors. More impact.

> Still exploring. Still deciding.

> Finding these details takes time.

> Fewer inputs. Fewer unnecessary questions.

### Style

-   Handwritten / marker-like font
-   Slightly irregular
-   Dark navy or muted blue
-   Occasionally lavender
-   Small directional arrows
-   Used sparingly

### Rule

Handwritten annotations should feel like **designer commentary**, not
decorative stickers.

Maximum approximately 1--3 annotations per major visual composition.

### Handwritten arrows

Arrows should feel hand-drawn and editorial rather than like standard UI
icons or mechanically generated SVG arrows.

-   Thin stroke
-   Slightly irregular
-   Natural curvature
-   Simple, restrained arrowhead
-   Clear visual connection between annotation and target
-   No excessive bends
-   No oversized arrowheads
-   Avoid perfectly geometric / mechanical curves
-   Match the scale, stroke character, and visual weight of the handwritten
    annotation
-   Do not let the arrow compete with the content it points toward

When an annotation points to a specific UI element, the arrow should land
clearly on that element rather than ending ambiguously nearby.

------------------------------------------------------------------------

# 16 · Design Question Callout

Used when introducing the central design challenge.

### Structure

``` text
[ lightbulb icon ]

Design question

How can we get the data
we need without making
the customer do all the work?
```

### Style

-   Dark translucent / elevated card on dark backgrounds
-   Rounded corners: `24px`
-   Lavender icon circle
-   Small eyebrow label
-   Large but readable question
-   Generous internal padding: `40–56px`

The question should feel like a moment of reflection in the case study.

------------------------------------------------------------------------

# 17 · Design Principles Cards

For sections such as:

> We redesigned the experience around three principles.

Use three horizontally aligned cards on desktop.

Example:

``` text
01
Get what we can
automatically

02
Ask what people
can answer easily

03
Show the value,
not just the calculation
```

### Behavior

-   Equal visual weight
-   Clear numbering
-   Short titles
-   Minimal supporting text
-   One card can use lavender as the active / emphasized treatment

On mobile, stack vertically.

------------------------------------------------------------------------

# 18 · Testing Section

Testing sections should combine:

-   Large editorial headline
-   Short explanation
-   Evidence sources
-   Customer quote
-   Product visual / customer photography

### Evidence chips

Examples:

-   Customer research
-   Website analytics
-   Hotjar
-   Sales feedback

Use compact rounded pills / cards with:

-   Icon
-   Short label
-   White background
-   Subtle border

### Quote card

Use a soft lavender card.

Structure:

``` text
“”

It was so much
easier than I expected.

Test user, Germany
```

Quote typography should be larger than the attribution but smaller than
the main section headline.

------------------------------------------------------------------------

# 19 · Results Section

Results should be visually immediate.

### Recommended composition

Large statement on the left:

> Real impact.

Then large outcome cards on the right.

Primary result:

``` text
+300%
Lead conversion uplift
```

Secondary result:

``` text
UK rollout
Adapted and rolled out
to the UK market.
```

### Result card hierarchy

The primary business metric should receive the strongest visual
emphasis.

Use mint for measurable positive impact and lavender for rollout /
scale.

------------------------------------------------------------------------

# 20 · Brand Treatment

E.ON branding should remain recognizable but controlled.

### Logo

-   E.ON red
-   Usually positioned at the beginning of the hero
-   Do not recolor the logo
-   Do not use the red logo repeatedly throughout every section

### Brand balance

The case study should feel like a **designer's portfolio case study
about E.ON**, not an E.ON marketing website.

Therefore:

-   Portfolio visual language \> corporate marketing language
-   E.ON red = brand signal
-   Lavender / mint = portfolio system

------------------------------------------------------------------------

# 21 · Borders & Shadows

## Borders

Use subtle borders rather than strong outlines.

Recommended opacity:

``` text
6–12%
```

Dark background:

``` text
rgba(150, 190, 220, 0.12)
```

Light background:

``` text
rgba(10, 30, 50, 0.08)
```

## Shadows

Use soft, diffuse shadows.

Avoid:

-   hard black shadows
-   excessive elevation
-   dramatic glow
-   glassmorphism everywhere

Suggested:

``` css
box-shadow: 0 20px 60px rgba(5, 20, 30, 0.08);
```

Use shadows primarily for image / UI artifacts.

------------------------------------------------------------------------

# 22 · Gradients & Decorative Backgrounds

Gradients should be soft and atmospheric.

Good:

``` text
dark navy → slightly lighter navy
white → pale lavender
white → pale mint
lavender → transparent
```

Avoid:

-   saturated purple gradients
-   neon effects
-   strong radial glows
-   rainbow gradients

Organic background shapes can be large and cropped.

They should create depth without becoming the main subject.

------------------------------------------------------------------------

# 23 · Motion

Motion should be subtle and editorial.

Recommended:

-   Fade + slight upward reveal for sections
-   Gentle image scale on entry
-   Soft card hover elevation
-   Small movement for decorative shapes
-   Sequential reveal for journey steps

Avoid:

-   aggressive parallax
-   bouncing cards
-   excessive spring animations
-   flashy transitions

Suggested timing:

``` text
Micro interaction: 180–240ms
Card / image transition: 300–500ms
Section reveal: 500–800ms
Stagger: 60–120ms
```

Use ease-out curves.

------------------------------------------------------------------------

# 24 · Responsive Behavior

## Desktop

The reference composition is primarily desktop editorial.

Maintain:

-   large headlines
-   two-column compositions
-   wide image frames
-   generous whitespace
-   horizontal journey

## Tablet

-   Reduce headline sizes
-   Narrow image proportions
-   Reduce horizontal padding
-   Allow some two-column sections to become asymmetric

## Mobile

Stack content intentionally.

Order:

1.  Section label
2.  Headline
3.  Supporting copy
4.  Visual / evidence
5.  Supporting cards

Journey becomes vertical or horizontally scrollable.

Metric cards stack.

Three-principle cards stack.

Do not simply shrink the desktop layout.

------------------------------------------------------------------------

# 25 · Content Rules

### Headlines

Headlines should be:

-   short
-   direct
-   outcome-oriented
-   conversational
-   confident

Good:

> We had the traffic.\
> We didn't have the leads.

> The calculator asked for too much.

> A simpler path to a smarter estimate.

> Testing with real customers.

Avoid long explanatory headlines.

### Body copy

Body copy should explain the **why**, not repeat the headline.

Use short paragraphs.

Bold only the most important phrase.

------------------------------------------------------------------------

# 26 · Section Rhythm

The case study should follow a clear visual rhythm:

``` text
DARK
Hero

DARK
Challenge

DARK
Audience

DARK
Journey

LIGHT
Problem

DARK
Design constraint

LIGHT
Design decisions

LIGHT
Testing

LIGHT
Results
```

This dark/light alternation is part of the storytelling system.

Do not turn every section into the same background.

------------------------------------------------------------------------

# 27 · Visual Priority

When a section contains multiple elements, prioritize them in this
order:

1.  Main story / headline
2.  Key insight
3.  Evidence
4.  Product / customer visual
5.  Supporting annotation
6.  Decorative shapes

Decoration should never compete with the primary message.

------------------------------------------------------------------------

# 28 · Accessibility & Visual Consistency

Accessibility is part of the visual system, not a final QA step.

### Color accessibility

-   Use sufficiently contrasting text colors on both dark and light
    surfaces.
-   Section-number numerals must use the globally defined accessible
    dark-purple treatment.
-   Do not introduce a new purple / lavender text color without checking
    contrast.
-   Decorative colors may be low contrast when they are non-textual and do
    not carry essential information.
-   Never rely on color alone to communicate success, state, or hierarchy;
    pair color with text, icons, shape, or other visual cues where needed.

### Typography accessibility

-   Numerals inside section markers must use the same readable font treatment
    throughout the page.
-   Avoid overly thin weights for small labels or numerals.
-   Preserve sufficient size, line-height, and contrast for supporting text.
-   Do not sacrifice readability to match a screenshot pixel-for-pixel.

### Global consistency audit

Before finalizing a section, check it against the complete case study for:

-   Section-number color and typography
-   Content-container alignment
-   Headline left edge
-   Body-copy left edge
-   Card alignment
-   Image / UI layering
-   Approved icon assets
-   Handwritten annotation style
-   Spacing at adjacent section boundaries

------------------------------------------------------------------------

# 29 · Implementation Rules for V0

When implementing this design system:

-   Preserve the existing content and wording unless explicitly asked to
    change it.
-   Treat each section as part of one continuous visual system.
-   Reuse the same spacing, typography, card radius, section labels, and
    color tokens.
-   Do not invent a new visual language for individual sections.
-   Do not introduce generic SaaS dashboard components.
-   Do not overuse gradients, glass effects, shadows, or animations.
-   Keep photography large and editorial.
-   Keep headlines large and confident.
-   Keep the number marker + uppercase eyebrow consistent.
-   Use one consistent accessible numeral treatment inside section markers.
-   Keep primary content aligned to the shared global container.
-   Remember that the content container does not constrain decorative
    backgrounds.
-   Reuse approved image / icon assets from the project library.
-   Preserve transparent PNG assets as transparent; do not add artificial
    white backgrounds.
-   Maintain clear editorial image layering.
-   Keep handwritten arrows natural, restrained, and clearly connected to
    their targets.
-   Maintain the dark/light section rhythm.
-   Ensure the page feels intentional at 1440--1600px desktop widths.
-   Mobile should be a designed composition, not a compressed desktop
    layout.

### Continuous page rule

The final case study must be treated as **one continuous editorial experience**, regardless of how many V0 sessions were used to build it.

-   Sections may have different compositions, but they share the same global visual tokens.
-   Dark sections use the canonical `--navy-950` background.
-   Light sections use the canonical light surface tokens.
-   Adjacent sections should not introduce accidental color or spacing changes.
-   Do not carry over session-specific page-level padding, `min-height`, or spacer elements without checking their effect on the complete page.
-   Before finalizing a section, review it in the context of the sections immediately before and after it.
-   Prefer shared variables and reusable section primitives over local hardcoded values.

------------------------------------------------------------------------

# 30 · Quick Reference

``` text
STYLE
Premium editorial portfolio
Human + system
Cinematic + optimistic

PRIMARY DARK
#07151F

PRIMARY LIGHT
#FFFFFF / #F8F8F6

ACCENTS
Lavender base          #C9B5F4
Marker strong          #9284D7
Marker soft            #BEB2F0
Key Insight            #9B90C5
Mint                   #B9F4D8
Blue                   #B9D4FF
Peach                  #FFDCC3
E.ON Red               #F32717

TYPE
Modern sans-serif
Inter / Geist Sans
Large bold display type
Tight tracking

RADIUS
16–20px small
24–32px large

CONTAINER
Max ~1440px
64–96px desktop padding
Content alignment only; decorative backgrounds may extend beyond it

SECTION MARKERS
One consistent accessible numeral color
One consistent numeral font treatment
Circle background may use marker hierarchy

SECTION SPACING
80–120px typical
120–180px hero / major transitions

VISUAL LANGUAGE
Rounded cards
Soft borders
Minimal shadows
Organic color shapes
Warm photography
Handwritten annotations
Natural hand-drawn arrows
Simple line icons
Approved visual assets reused as supplied
Transparent PNGs remain transparent

MOTION
Subtle
Editorial
300–800ms
No excessive effects
```

------------------------------------------------------------------------

# 31 · North Star

The final experience should feel like:

**A premium product-design case study that combines strong editorial
storytelling, warm human imagery, polished product evidence, and a
restrained modern visual system.**

It should communicate the transformation clearly:

**Paid traffic → less friction → better solar estimates → more qualified
leads → measurable business impact.**
