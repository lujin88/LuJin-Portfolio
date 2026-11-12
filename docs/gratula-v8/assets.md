# Designer screenshot provenance

Source: visual’s `OUTBOX/GRATULA_V8_3_1112/assets/`, except the recaptured party-day screen and Google Maps source described below. Other designer copies remain byte-identical. Legal re-review pending.

| File | SHA-256 |
| --- | --- |
| `allergy-crop.png` | `c3c75697fdf43714490fc1f1e7726082e88f25f0022fa910d7f2d63f4c8d30f4` |
| `guest-detail-crop.png` | `b47cacc159c1c9d7471bcd675e108fe7d590de132eb5b9f47215e779db1965a5` |
| `reply-crop.png` | `29b3948a81585fb152e8525496dd8b23a544d1a0ffacb0a11c371ea786db15c9` |
| `rsvp-module.png` | `73bcaedc8927a9e3a02a933675171df4d9b5c8154de5d80d872fb07ee9be1707` |
| `screen-step-2.png` | `1729b508bf3985c83b1dcea903633d037e0c35e80185cf02fac96d20bb70f76a` |
| `screen-step-5.png` | `094751a33b23669046803df90638ccf02c7a5cd3a4a4f5fb159eb093b081e1dd` |

The before/after screenshots in `screenshots/` were captured from the existing live portfolio and this branch’s 4622 preview on 12 November 2026. They contain the portfolio’s public page and demo data. They are review evidence, not additional product artwork.

## Party-day map replacement — 13 November 2026

Authorized by Lu #10175 and PM #10182 in #lu-portfolio; replaces the embedded map of unverified origin in `party-planner-clickable-prototype.html` (`MAP_IMG`).

- Source: Google Maps web page, <https://www.google.com/maps/@47.3587,8.5328,16z?hl=en>.
- Captured: 13 November 2026, approximately 00:37 Europe/Zurich (native wide-viewport recapture requested by legal #10381 and PM #10384).
- Area: Seestrasse, Zürich, near Museum Rietberg and Belvoirpark; center 47.3587, 8.5328, zoom 16. This is an illustrative neighborhood map, not a verified location pin for the prototype’s demo address.
- Attribution retained verbatim in the raster: **Google Maps**, **Map data ©2026 Google**. Switzerland, Terms, Privacy, Send Product Feedback and the 100 m scale also remain visible.
- Capture: ordinary roadmap at **690 × 360 CSS px, DPR 2 (1380 × 720 PNG)**. Search/account/traffic/category/navigation overlays were hidden for the map-only screenshot; the native map canvas, Google Maps logo, footer and scale remain visible. **No translation, resizing, recoloring or redrawing of the logo was applied.** Its bounding rectangle is checked against the original, unmodified page before saving. The wider viewport gives the footer one line at its native position, below the complete logo. No image generation, API key, paid service or new terms acceptance was used; the cookie choice was Reject all.
- This replaces the 00:31 capture rejected by legal: that version translated the logo upward 13 CSS px and covered Belvoirpark. It is no longer the product asset.
- File: `public/lab/party-planner/story/google-maps-seestrasse.png`, served locally; opening the prototype makes no Google Maps request. The existing click-through opens Google Maps only when activated.
- Display: `object-fit: contain` preserves the complete screenshot; bottom corners are square to keep footer text intact.
- Original source-page captures and the unchanged previous phone screenshot are retained locally in `/Users/lu/.buzz/OUTBOX/GRATULA_GOOGLE_MAP_1113/` for audit. They are not additional site artwork.
- `screen-step-5.png` and current `screenshots/after-*.png` are recaptured from this branch. `before-live-1440.png` remains historical before evidence, not an approved map source.
- Legal must re-review the actual replacement and its attribution; this provenance record is not legal approval.

| Additional file | SHA-256 |
| --- | --- |
| `google-maps-seestrasse.png` | `6b55f7bb710898772db7579b7945bb2418a3fc06cf052810406a042d565409d7` |

The capture entry point is `/Users/lu/.buzz/capture-gratula-google-map.mjs`; source recapture, DOM attribution bounds, and the verified phone/page capture script are in the OUTBOX above (`recapture-native-wide.cjs`, `map-native-wide-bounds.json`, `capture-and-check.cjs`); `wide-native-page.png` preserves the page before overlays are hidden. The OUTBOX `screen-step-5.png` is now copied directly from the generated product asset, rather than the obsolete welcome-screen capture.

The recapture fixture matches the existing screenshot’s five confirmed and three waiting guests (one seeded declined demo guest is marked confirmed only in the capture session). Application demo defaults are unchanged.
