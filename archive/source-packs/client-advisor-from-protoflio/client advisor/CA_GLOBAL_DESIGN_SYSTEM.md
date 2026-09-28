# Client Advisory Case Study --- Global Design System

**Purpose:** Global visual baseline for the complete Client Advisory
case study (01--09).

This document is the source of truth for visual consistency across all
independently built page/session implementations.

------------------------------------------------------------------------

## 0. Core Principle

The case study should feel like **one designed narrative, not a
collection of independent V0 sessions**.

### Preserve

-   Existing visual direction
-   Dark navy / midnight background
-   Restrained electric-blue accent
-   Editorial typography
-   Large, cinematic visuals
-   Minimal UI
-   Generous negative space
-   Existing content and imagery

### Do not

-   Redesign individual sections unnecessarily
-   Introduce new visual styles per session
-   Add gradients or glassmorphism for decoration
-   Increase glow intensity just to make elements feel more "AI"
-   Change copy unless explicitly requested
-   Create different typography systems for individual sessions

**Rule: Normalize, don't redesign.**

------------------------------------------------------------------------

# 1. Global Layout

## 1.1 Page width

Use one consistent content container across all sessions.

-   Desktop max-width: **1280px**
-   Preferred working width: **1200--1280px**
-   Horizontal page padding: **48--64px**
-   Content should align to the same left/right edges across sessions.

Do not allow each session to invent its own container width.

## 1.2 Grid

Primary layouts:

### Editorial split

-   50 / 50 for balanced text + visual
-   45 / 55 when the visual needs more presence
-   40 / 60 when the image is the dominant storytelling element

### Full-width visual

Use when the visual itself is the narrative.

### Text-led section

Use a constrained text column rather than stretching paragraphs across
the entire viewport.

## 1.3 Vertical rhythm

Use a consistent spacing scale:

-   8px
-   16px
-   24px
-   32px
-   48px
-   64px
-   80px
-   96px
-   128px

Avoid arbitrary values unless required by an existing composition.

------------------------------------------------------------------------

# 2. Section Structure

A typical section follows:

``` text
Eyebrow
Headline
Supporting text
Primary visual / interaction
Optional detail
```

Not every section needs every element.

## Section height

Do not make sections taller simply to create visual drama.

Prefer: - content-driven height - intentional vertical centering -
generous but controlled whitespace

When one column is much shorter than the other, vertically center the
shorter content rather than adding empty blocks.

------------------------------------------------------------------------

# 3. Typography

## Typeface

Use the existing case-study typeface consistently.

**Primary font: Poppins**

Do not introduce another display font for individual sections.

## Desktop scale

  Role                      Size     Weight   Line height
  ------------------- ---------- ---------- -------------
  Display / Hero        56--72px   600--700    0.98--1.08
  Section Heading       40--52px        600    1.05--1.12
  Secondary Heading     28--32px        600          1.15
  Card Heading          20--24px        600           1.2
  Body Large            18--20px        400     1.45--1.6
  Body                  15--16px        400     1.5--1.65
  Caption               12--13px   400--500           1.4
  Eyebrow               10--12px        500           1.3

### Typography rules

-   Keep headline sizing consistent across equivalent sessions.
-   Do not make a heading larger just because a section has less
    content.
-   Avoid excessive all-caps.
-   Use letter spacing only for eyebrows, labels, and metadata.
-   Keep paragraph measure readable: approximately **45--70 characters
    per line**.
-   Do not use oversized body text to fill empty space.

------------------------------------------------------------------------

# 4. Eyebrows / Metadata

Example:

``` text
06  |  THE CONCEPT
```

Treatment: - 10--12px - Medium weight - Uppercase - Letter spacing:
approximately 0.16--0.20em - Muted light-blue/grey - Numeric index
slightly stronger than the category label

All session eyebrows should share the same position, scale, spacing and
treatment.

------------------------------------------------------------------------

# 5. Color System

The visual language is based on a restrained dark navy environment.

## Background

### Primary

`#06101F` --- deep navy

### Secondary

`#0A1729` --- slightly lighter navy

Use subtle tonal variation between sections rather than obvious color
changes.

## Text

### Primary

`#F3F6FA`

### Secondary

`#A9B8CC`

### Muted

`#71839A`

Text contrast should remain comfortable without making every element
pure white.

## Accent

### Electric blue

`#2F7CFF`

Use sparingly for: - active states - data paths - key UI highlights -
small indicators - selected states

### Supporting accent

A very restrained warm accent may be used where existing product/UI
content requires it, but it should not compete with the blue system.

------------------------------------------------------------------------

# 6. Background Treatment

The background should feel deep, atmospheric and technical.

Use: - dark navy - extremely subtle tonal gradients - soft blue
atmospheric glow - faint technical lines / patterns where already
established

Avoid: - large obvious gradients - bright blue backgrounds - excessive
neon - decorative glow behind every component - unrelated background
treatments between sessions

### Global rule

**The background supports the content. It should never become the
content.**

------------------------------------------------------------------------

# 7. Blue Glow & Light Effects

Blue light is a storytelling device, not a default decoration.

Use glow primarily for: - system flows - AI/data pathways - active
interaction - focal points - transition moments

### Glow intensity

Prefer: - soft - low-opacity - broad - partially blurred

Avoid: - sharp neon halos - heavy bloom - strong glow around every
card - different glow styles in different sessions

All glow treatments should feel like they belong to the same lighting
environment.

------------------------------------------------------------------------

# 8. Images & Visuals

## Image scale

Hero visuals should have enough scale to communicate immediately.

Do not: - unnecessarily shrink large visuals - add decorative frames
around every image - force every image into the same aspect ratio

## Image treatment

Prefer: - clean edges - subtle radius when already established -
restrained shadow - minimal border - natural image contrast

The image should remain the primary visual object.

## Image + text balance

When a visual occupies approximately 50--60% of a section, the text
column should not be forced to match its height with artificial spacing.

------------------------------------------------------------------------

# 9. Cards

Cards should feel like part of the same system.

Treatment: - subtle dark-navy surface - low-contrast border - small
radius - restrained blue interaction state - minimal shadow

Avoid: - glassmorphism - strong blur - bright borders - excessive
rounded corners - multiple competing card styles

Cards should support hierarchy, not dominate it.

------------------------------------------------------------------------

# 10. Dividers & Lines

Use thin lines to create structure.

Preferred: - 1px - low contrast - navy/blue-grey

Use dividers to: - separate accordion items - establish hierarchy -
connect content - structure dense information

Avoid decorative lines without a structural purpose.

------------------------------------------------------------------------

# 11. Expand / Accordion Pattern

Expand interactions should use one consistent treatment throughout the
case study.

### Collapsed

``` text
Section title                              +
──────────────────────────────────────────
```

### Expanded

``` text
Section title                              −

Supporting content
Supporting content
Supporting content
```

Rules: - Same title size across equivalent accordion levels. - Same
horizontal alignment. - Same divider treatment. - Same icon treatment. -
Same animation behavior. - Do not create a different accordion design
for individual sessions.

### Hierarchy

A parent section should contain its related content.

Example:

``` text
The case for less                         +

    Why less
    Supporting paragraph

    Buying + in practice
    Supporting content
```

Do not turn related content into separate top-level sessions.

------------------------------------------------------------------------

# 12. Interaction States

Keep interactions subtle.

## Default

Low-contrast, calm.

## Hover

Small increase in: - text brightness - border visibility - blue accent

## Active / Expanded

Clear but restrained.

Do not introduce dramatic animations.

------------------------------------------------------------------------

# 13. Animation

Animation should communicate: - transition - hierarchy - interaction -
flow

Prefer: - 200--500ms - ease-out / ease-in-out - subtle opacity - small
transform - smooth accordion height transition

Avoid: - bouncing - excessive parallax - continuous motion - animation
that delays reading

------------------------------------------------------------------------

# 14. Content Hierarchy

The case study should communicate a clear editorial hierarchy:

``` text
01–09 narrative
    ↓
Section eyebrow
    ↓
Main statement
    ↓
Evidence / explanation
    ↓
Visual / interaction
```

Do not allow every heading to have equal visual weight.

A useful hierarchy is:

**Display → Section Heading → Secondary Heading → Body → Caption**

------------------------------------------------------------------------

# 15. Cross-Session Consistency Checklist

Before considering a session complete, verify:

### Typography

-   [ ] Same font
-   [ ] Same H1 scale
-   [ ] Same H2/H3 hierarchy
-   [ ] Same body size
-   [ ] Same eyebrow treatment
-   [ ] Same line-height logic

### Layout

-   [ ] Same container width
-   [ ] Same horizontal margins
-   [ ] Same section alignment
-   [ ] Consistent vertical rhythm
-   [ ] No artificial section height

### Color

-   [ ] Same primary background
-   [ ] Same secondary background
-   [ ] Same text hierarchy
-   [ ] Same blue accent
-   [ ] Same border opacity

### Visuals

-   [ ] Consistent image treatment
-   [ ] Consistent card treatment
-   [ ] Consistent glow intensity
-   [ ] Consistent corner radius
-   [ ] Consistent shadow language

### Interaction

-   [ ] Same accordion treatment
-   [ ] Same expand icon
-   [ ] Same transition behavior
-   [ ] Same hover language

------------------------------------------------------------------------

# 16. Non-Redesign Rule

When reviewing an existing session:

### Allowed

-   Normalize font sizes
-   Normalize line heights
-   Normalize spacing
-   Align containers
-   Normalize colors
-   Reduce excessive glow
-   Normalize borders/radius
-   Fix inconsistent accordion hierarchy
-   Correct visual alignment

### Not allowed

-   Rewrite content
-   Remove content
-   Replace imagery
-   Invent new components
-   Introduce new visual styles
-   Change the overall layout without a clear consistency reason
-   Add decorative elements simply to fill empty space

**If an existing design is already visually strong, preserve it.**

------------------------------------------------------------------------

# 17. Global Review Process

For a global review, work in this order:

### Phase 1 --- Audit

Review all sessions and identify inconsistencies.

**Do not modify files during the audit.**

### Phase 2 --- Normalize

Apply this design system consistently across sessions.

### Phase 3 --- Visual QA

Review the complete 01--09 case study as one continuous page.

### Phase 4 --- Local refinement

Only after global consistency is achieved, make small section-specific
improvements.

------------------------------------------------------------------------

# 18. Cursor Instruction

When using this document with Cursor, always use:

> **Normalize, don't redesign.**

Cursor should treat this file as the global visual source of truth for
the Client Advisory case study.

If a local implementation conflicts with this system, prefer the global
system unless the local treatment is clearly intentional and essential
to the storytelling.

------------------------------------------------------------------------

## Final Design Direction

**Dark. Editorial. Precise. Atmospheric. Restrained.**

The visual system should make the case study feel like one coherent
product-design story:

> **Less searching. More advising.**

Technology should feel sophisticated through **clarity and restraint**,
not through visual effects.
