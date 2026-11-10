# MAN Truck & Bus — dispatch hackathon

- Context: a 24-hour MAN hackathon. Team of 3; Lu was the sole product designer.
- What Lu did: MAN stakeholder interviews and the dispatch flow design during the hackathon; afterwards she continued it to 13 screens.
- Recognition: MAN hackathon finalist. Not yet tested with dispatchers.
- All operational data shown in the case study is fictional.

## The problem
A truck can be ready while its shift is still at risk: no driver or no handover keeps a healthy truck in the yard. The concept is for the hour before a truck leaves: what is blocking it, and who to call.

## The design
- A dispatch board where every departure gets a blocker, an owner and a follow-up time.
- It keeps missing records visible instead of showing a fleet-wide percentage that four records can't support.
- It keeps the last vehicle signal and the last human check separate: a signal is not a check, and the depot check records who checked and when.
- A replacement driver can accept or decline the shift; the handover unlocks only after the driver accepts.
- Driving and rest rules are shown when a driver is excluded (for example the 56-hour weekly driving limit), and the data can be corrected.

## How Lu checked it
She prototyped in MagicPath and cross-checked the screens with Claude. One issue she found: the board said "agreement pending" while the driver app already said "Your shift". In the revised flow, the driver gets an offer first, and accepting unlocks the handover.

## What she would test next
Whether 3–5 dispatchers can find the first call to make, the time to confirmed cover, and an on-time baseline before comparing results.
