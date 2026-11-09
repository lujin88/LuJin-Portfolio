# Playground — personal projects

These are Lu's own side projects, built with AI tools (Claude, Cursor, v0). They are not client or employer work.

<!-- Hidden until Lu confirms these can be public. Delete this line and the closing arrow to publish.

## Hand Zoo
- A camera game for kids: hand gestures turn into animals on screen; two players can combine gestures
- Runs in the browser (GitHub Pages)
- TODO(Lu): link, and confirm you want this public

## Paper World
- Kids colour printed animal templates, scan them, and their drawings come alive in an ocean or farm scene
- TODO(Lu): status and link, and confirm you want this public
-->

## Weather Aquarium — weather world for kids (iPad)
- A 2.5D weather world for iPad that helps children understand the day and discover new words.
- Set by Lake Zurich. The scene changes with the season outside, and special days (Easter, Swiss National Day on 1 August, Christmas) get their own small story.
- Every object can become a word: children tap an object to hear it in Chinese, English, German or French.
- The character is animated in Rive with reusable states: idle, waving, getting dressed, walking and exploring.
- The weather panel in the screenshots shows sample data in exploration mode, not live weather.

## Diandian (AI Pet) — AI dolphin companion
- A little AI dolphin for young children: they can call it from a phone, or wake it by turning a knob on a small device on the desk.
- Voice runs through a separate speech service. Pronunciation did not come across cleanly on the hardware, so that path needed its own workaround.
- It can listen, tell stories, share a meal and learn a few words of German and French with the child.
- Parent mode: a small animation studio where kids choose Diandian's expressions and movements on a computer, preview them, and send them to the device.
- Status: the current prototype sends animations to a phone; the hand-off to the hardware is shown on the site as a concept preview.

## Gratula — kids' birthday party planner
- Turns four details (theme, age, budget, date) into one plan for a child's birthday: invitations, RSVPs, local suppliers and the party-day schedule.
- Guest families reply from the invitation link, with no app and no account. A shared wishlist prevents duplicate gifts.
- Privacy: designed so that only the host sees dietary notes and phone numbers, guests never see each other's details, and guest data is removed after 30 days.
- Suggests a few checked local options near Zurich (cake, venue, entertainer) within 10 km, instead of many open tabs.
- Design decision: guest headcounts were dropped from the RSVP. Yes or no plus an allergy note was enough.
- Status: working prototype that can be opened from the case study page.

## This chat
"Ask Lu" itself is a Playground project: a Next.js route on Vercel that answers from a small set of Markdown files Lu maintains.
