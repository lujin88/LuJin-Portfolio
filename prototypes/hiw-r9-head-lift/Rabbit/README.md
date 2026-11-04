# Rabbit — R9 ordered loop

Binary: `build/rabbit.riv`, **1,616,172 bytes**. Editable source: `scene.rml`; raster asset `original.png` is unchanged. Generator order: `../BUILD.py`, `../ADD_SEAM_OVERLAP.py`, `../SEQUENCE_LAYERS.py`.

State machine **ReviewAutoplay**. Inputs **none**: names/types/allowed values/triggers are not applicable. Entry starts the sole animation state **RespondOnce**, without a blended transition. Animation is 60 fps, 720 frames, a 12-second loop; event **playback-complete** fires at its boundary. No added states or developer-facing inputs.

| Source time | Action |
|---|---|
| 0.00–1.00 s | Initial pose; DECIDE and subtitle hidden |
| 1.00–1.70 s | Girl raises her head and supporting hand |
| 1.90–2.30 s | Bulb brightens |
| 2.50–3.20 s | Fox turns from right toward the girl on the left |
| 3.50–3.80 s | DECIDE enters once; settles by 4.10 s |
| 4.20–4.60 s | Original subtitle appears |
| 4.60–9.00 s | Hold the completed composition |
| 9.00–9.50 s | Entire composited illustration fades out |
| 9.50–10.50 s | Hidden reset to the initial poses |
| 10.50–11.00 s | Initial composition fades back in, captions hidden |
| 11.00–12.00 s | Rest, then repeat without a visible boundary |

The 9.0–11.0-second fade/reset/reveal is coordinated by the preview controller’s single compositor opacity; this `.riv` alone does not fade all bands as one group. See the parent README before integrating. The static reduced-motion fallback lives in `../home.html` and loads no `.riv`.

Band contents retain inherited naming: Rabbit = bear+rabbit; Bear = girl+bulb; Fox = fox+crocodile+caption layers+source covers. Transparent outside the raster band; the inherited dark illustration background remains inside. No watermark was visible in the final inspected browser frames; production separation/integration is pending.

Build: `rive . --once --format=json` after the three generation steps. Normal/slow/reduced review media and the exact tested-source manifest are in the parent PR and shared `OUTBOX/HIW_R9_SEQUENCE_20261104/FINAL_R4/`. No mobile gesture or audio.
