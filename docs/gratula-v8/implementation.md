# Gratula v8 implementation

Authorized in #lu-portfolio thread #8871: Lu #8875, hero choice #8950; PM #8952 and #8961. The PM brief is `OUTBOX/GRATULA_BUILD_1112/brief.md`.

The live hero remains unchanged. Below it, the implementation uses visual's v8.1 layout, a blue-to-navy continuation adapted to the live hero's plain blue paint, and the v8.3.2 background decorations. The earlier mock hero's mirrored `world.png` and shadow are omitted because they describe a different hero. Existing Poppins, `LayerScrollGroup`, CTA destination, and shared `SiteClosing` are reused. No new motion engine or product interactions are introduced.

RSVP copy is copied from `GRATULA_BUILD_1112/copy-proposals.en.json`. Supplier data retains nullable slots, now populated from research #8996 and copy #9019. `suppliers-copy.en.json` includes the two exact PM corrections from #9023. Product-page links, price units, restrictions, lookup date, and non-affiliation disclosure are shown together. Unverified names/prices, distance, recent-check and automatic-update claims are removed from the landing page. The interactive prototype is outside this visual implementation; its existing parking directions and flows are preserved.

Source artwork: `OUTBOX/GRATULA_V8_3_1112/assets/`, supplied by visual. Product screenshot files are copied byte-for-byte; existing `gift.webp`, `party.webp`, and `note.webp` remain at their existing URLs. No new fonts or generated artwork. New screenshots require legal review. The static landing prototype is updated in the same PR.

PR stays `hold` pending PM release disposition and QA/legal/visual QA. Author checks do not constitute any of those approvals.

## Supplier evidence and review

Research packet: `~/.buzz/OUTBOX/GRATULA_BUILD_1112/suppliers-proof.md`, with dated official-page screenshots and hashes in its `suppliers-evidence/` directory. Copy packet: `~/.buzz/OUTBOX/GRATULA_COPY_1112/suppliers-copy.en.json`. PM #9023 approved integrating the packet with two exact wording corrections; those corrections are recorded in the committed JSON.

- [Stocker cake prices](https://gipfeli.ch/torten/thementorten/): pirate cake, CHF 58 for 8 people / CHF 68 for 12 people; two working days’ advance order.
- [Minicity birthday package](https://sihlcity.ch/de/minicity/kindergeburtstag/): CHF 25 per child for two hours, Wednesday window and age/group/holiday restrictions retained. Parents do not attend and cake costs extra.
- [Bazinga magic package](https://bazingaparties.ch/zaubershows-in-zurich/): CHF 700 for up to 25 children. Use the live-page evidence, not the conflicting indexed CHF 630 promotion. No performance duration promised.

These are independent supplier examples, not a combined booking. No supplier contact, reservation or live price synchronization was added. The interactive product demo still contains its previous example data; this PR changes the public landing page and its static design prototype only, as required by the copy handoff.
