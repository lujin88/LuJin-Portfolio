# 7 — Design Decisions

**A simpler path to a smarter estimate.**

We use the customer's location to retrieve key home details upfront — fewer inputs, fewer unnecessary questions.

| Before — Manual input | After — We found your roof |
|---|---|
| Roof size? | Roof size ✓ |
| Roof inclination? | Roof inclination ✓ |
| Sunlight exposure? | Sunlight exposure ✓ |

With location authorization, Google Maps data resolves all three fields automatically. Coverage was built for Germany first — once the approach proved out, the UK team localized it for their own market.

Customers who decline to share their location can still enter the details manually — the estimate is only as accurate as what they provide.

Three of the five original fields were solved this way. The other two needed a different fix.
