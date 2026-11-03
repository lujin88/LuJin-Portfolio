# Weather Aquarium Walk hover preview V2.1

This is a review asset only. No page code references the video. The proposed playback behavior is: play once on hover, hold the last frame, and reset to the original still on pointer leave.

`WALK_HOVER_ONCE_V21.mp4` is 834×1112, 24 fps, 189 frames (7.875 seconds). It keeps raw Dreamina frames 0–188, omitting the final four frames that dissolved to the supplied endpoint. The source still is output frame 0 because the graded raw frame 0 differs from it by more than 2/255. Output frame 1 cuts directly to graded raw frame 1. There is no crossfade, interpolation, reverse playback, or audio. Per-frame brightness correction, H.264 yuv420p encoding, BT.709 matrix/primaries, and sRGB transfer tag follow V2. No new Dreamina generation or credits were used.

QA decoded the MP4 and source to 272×362 RGB. Frame differences are mean absolute RGB channel values out of 255. Brightness values are mean luma differences from the source (0.299R + 0.587G + 0.114B). Background region: x=0–34 across the full height. Figure region: x=35–239, y=35–339.

| Check | V2.1 result |
| --- | ---: |
| First frame vs source | 1.055/255 |
| Frame 0→1 hard cut | 9.161/255 |
| Raw-motion frame 1→2 | 5.521/255 |
| Full-film adjacent-frame median | 2.559/255 |
| End frame 188 vs 187 | 0.399/255 |
| Background brightness delta | −1.874 to +1.675/255 |
| Figure-region brightness delta | −0.910 to +1.657/255 |
| Full-frame brightness delta | −0.843 to +1.158/255 |

`V21_SUMMARY.json` has all first-eight-frame adjacent differences. `V21_BRIGHTNESS_CURVE.json` has all 189 brightness measurements; the corresponding PNG charts background in green, figure region in pink, and full frame in blue, with guide lines at ±2/255. `V21_OPENING_8_FRAMES_FULL_SIZE.png` puts decoded frames 0–7 side by side at native 834×1112 size, left to right. `V21_HALF_SECOND_CONTACT.png` samples frames 0,12,…,180. `V21_END_FRAME.png` is full-size frame 188.

Visual review of the first eight decoded frames found no overlapping eyes or doubled shoes from the V2 blend. **Review concern:** the 0→1 hard cut is visibly larger than normal motion (9.161 vs 2.559/255 median), with an immediate eye and hand change. The raw 1→2 transition is also faster than median. The PM should judge it at playback size before approval. The held endpoint is clear. This clip is not intended to loop.

Source generation: Dreamina task `ef3c5dd0-441b-44e0-98fe-1260a7206703` cost 48 credits in V1. V2.1 costs 0 additional credits. MP4 SHA-256: `60b6fc06392603f8c1d4611e14dd1fbd72d12601b3e678e360e176e8ebd1024c`.
