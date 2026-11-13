# Gratula row 29 — privacy wording review

2026-11-13 · Legal & Privacy · #9932 / #10305 / #10306. Not legal advice.

Conclusion: the 11 A/B pairs in COPY_OPTIONS.md are acceptable as portfolio descriptions of design intent, subject to the contextual conditions below. Prefer A for its explicit design framing. This is a wording review, not a production privacy certification or a PR HEAD sign-off. No product copy was changed.

Reviewed: /Users/lu/.buzz/OUTBOX/GRATULA_PRIVACY_COPY_ROW29_1112/COPY_OPTIONS.md; dev's GRATULA_RETENTION_EVIDENCE_ROW29_1112/EVIDENCE.md; the existing [source review](2026-11-12-gratula-row29-claims-review.md). This pass did not rerun source hashes, access tests, deletion jobs or browser checks. The source review's findings are historical evidence, not new test results.

Sources checked online this pass: [FDPIC duty to provide information](https://www.edoeb.admin.ch/en/duty-to-provide-information) (clear, accessible information about processing and recipients); [European Commission GDPR principles](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr_en) (transparency, storage limitation and accountability, where GDPR applies). Neither source establishes a universal 30-day requirement for this product.

| Item | Finding | Basis | Required treatment | Blocks release? |
| --- | --- | --- | --- | --- |
| privacy.chip / heading | A and B frame the card as design work. | Draft; FDPIC transparency guidance above. | Keep this framing visibly adjacent to access and retention labels; do not duplicate Privacy in the B eyebrow. | No wording blocker within this context. |
| privacy.body / access_label / detail | Both versions remove unsupported phone claims, name host plus invited co-editors, and preserve the guest's own-reply access. | Existing source review: can_edit_party and rsvp_json; FDPIC guidance. | Do not reuse the short label as a standalone verified access guarantee. | No wording blocker for design intent; actual access remains unverified in production. |
| privacy.retention_label / retention | Both describe planned removal of replies 30 days after the party date; neither claims completed deletion. A is clearer about design intent. | Existing source review: b9_retention; Commission storage-limitation guidance. | Preserve replies, party-date starting point and design framing. Do not extend to photos, logs, backups or all copies, or replace calendar days with 720 hours. | No wording blocker; unconditional production deletion claims remain blocked pending deployment and scheduler evidence. |
| privacy.guest_separation | Both qualify family separation as intended design. | Existing source review and dev evidence; FDPIC transparency guidance. | Keep the qualification; do not certify all deployed interfaces from these snippets. | No wording blocker within portfolio context. |
| privacy.image_alt | Both remove the claim of real host-only data and describe prototype examples. | Draft and existing source review. | Confirm the actual image uses example data; changing alt text cannot anonymise a screenshot. | Asset check still required before implementation approval. |
| prototype.privacy.faq / hint | Both state design context and co-editor access; FAQ preserves own-reply access and identifies example data. | Draft, dev evidence that linked prototype is a demo; FDPIC guidance. | Keep the FAQ within the example-data prototype; do not transplant it into a live service's privacy notice. | No wording blocker within that boundary. |
| Implementation consistency | Source draft was mapped to main e1a7147 and PR #175 baseline 79de05c, not a final implementation HEAD. Embedded screenshot text was not audited. | COPY_OPTIONS.md implementation notes. | On the chosen final HEAD, check page, static HTML, prototype FAQ/hint, alt and screenshot text together. | Final implementation sign-off pending. |

PM handoff: wording review complete; A recommended, B also acceptable under these conditions. Independent cross-provider copy review and native-language review remain separate and are not fulfilled by this legal pass. PM collects Lu's choice after 08:00 per #10306; no overnight mention. Then development implements the selected text and supplies a final diff/screenshots for review. Production version, scheduler execution and access evidence remain missing if a live-service guarantee is desired. No finding here establishes an actual data leak or failed deletion job.

Scope excludes Impressum, cookie configuration, full privacy-policy compliance and CA06 asset clearance. PR: none for this report; no merge, deployment or changes to port 3000.

## Follow-up — #10594 / thread #9932

Re-read the existing dev EVIDENCE.md and copy revision REVISION_10550.md; checked the revised guest_separation.A in both copy.en.json and COPY_OPTIONS.md. The exact sentence, “In this design, families can't see each other's replies.”, retains the design-intent qualification and remains within the wording clearance above. This is not a new production access test. No new scheduler/deployment evidence was supplied in the reviewed material.

Status: legal source-evidence and draft-wording review complete; waiting for PM/Lu selection after 08:00 and the implementation HEAD. Only a requested production guarantee remains blocked on deployment version, access checks and successful scheduler/deletion evidence. Do not keep this review marked actively running while waiting for those inputs. Prior source links and limits above apply; no finding of an actual leak or failed deletion.
