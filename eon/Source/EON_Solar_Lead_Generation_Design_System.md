# E.ON Solar Lead Generation --- Design System

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
-   Lavender or pale lavender background
-   Dark navy / white number depending on background
-   Center aligned
-   Weight: `600–700`

### Label

-   Uppercase
-   Generous letter spacing
-   Positioned horizontally beside the number

This creates a consistent visual navigation rhythm across the entire
case study.

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

Use generous section spacing.

Recommended:

``` text
Small gap:      16–24px
Component gap: 32–48px
Content gap:    56–80px
Section gap:    120–180px
Hero spacing:   160–220px
```

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

Use deep navy:

`#07151F` / `#0A1822`

### Text

-   Primary: white / near-white
-   Secondary: muted blue-grey
-   Highlight: lavender

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

# 28 · Implementation Rules for V0

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
-   Maintain the dark/light section rhythm.
-   Ensure the page feels intentional at 1440--1600px desktop widths.
-   Mobile should be a designed composition, not a compressed desktop
    layout.

------------------------------------------------------------------------

# 29 · Quick Reference

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
Lavender  #C9B5F4
Mint      #B9F4D8
Blue      #B9D4FF
Peach     #FFDCC3
E.ON Red  #F32717

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

SECTION SPACING
120–180px

VISUAL LANGUAGE
Rounded cards
Soft borders
Minimal shadows
Organic color shapes
Warm photography
Handwritten annotations
Simple line icons

MOTION
Subtle
Editorial
300–800ms
No excessive effects
```

------------------------------------------------------------------------

# 30 · North Star

The final experience should feel like:

**A premium product-design case study that combines strong editorial
storytelling, warm human imagery, polished product evidence, and a
restrained modern visual system.**

It should communicate the transformation clearly:

**Paid traffic → less friction → better solar estimates → more qualified
leads → measurable business impact.**
