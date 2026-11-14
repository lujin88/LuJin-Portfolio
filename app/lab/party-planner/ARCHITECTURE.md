# Gratula page

- `party-planner-page.tsx`: live hero, existing hero artwork, and shared `SiteClosing`.
- `gratula-story.tsx` / `gratula-story.css`: v8 lower-page sections and scoped visual rules. Reuses `LayerScrollGroup`, which handles reduced motion and one-time scroll arrival.
- `suppliers-copy.en.json`: approved English copy with PM #9023 corrections.
- `suppliers.ts`: verified source links and nullable supplier slots. Populate only from approved research and copy; a missing supplier reserves space without exposing a name, price, or claim.
- `config.ts`: existing artwork URLs and the interactive prototype route.
- `public/lab/party-planner/story/`: designer-supplied product screenshots; `screen-step-5.png` is recaptured from the interactive prototype when its location map changes. Map provenance and hashes are recorded in `docs/gratula-v8/assets.md`.
- `public/lab/party-planner/gratula.html`: static landing-page prototype, updated with the page. The separate interactive prototype owns the party-day map image (`MAP_IMG`); parking directions and the rest of its flow remain unchanged.

Hero changes belong in `party-planner-page.tsx` and `party-planner.css`; lower-page changes belong in `gratula-story.*`. Do not put lower-page selectors on the hero or on other routes.
