# Gratula page

- `party-planner-page.tsx`: live hero, existing hero artwork, and shared `SiteClosing`.
- `gratula-story.tsx` / `gratula-story.css`: v8 lower-page sections and scoped visual rules. Reuses `LayerScrollGroup`, which handles reduced motion and one-time scroll arrival.
- `suppliers-copy.en.json`: approved English copy with PM #9023 corrections.
- `suppliers.ts`: verified source links and nullable supplier slots. Populate only from approved research and copy; a missing supplier reserves space without exposing a name, price, or claim.
- `config.ts`: existing artwork URLs and the interactive prototype route.
- `public/lab/party-planner/story/`: unchanged designer-supplied product screenshots.
- `public/lab/party-planner/gratula.html`: static landing-page prototype, updated with the page. The separate interactive prototype and its parking directions remain unchanged.

Hero changes belong in `party-planner-page.tsx` and `party-planner.css`; lower-page changes belong in `gratula-story.*`. Do not put lower-page selectors on the hero or on other routes.
