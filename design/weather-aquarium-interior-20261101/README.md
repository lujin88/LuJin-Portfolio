# Weather Aquarium interior crops

Four 864×600 PNGs, plus a 3456×600 comparison ordered spring, summer, autumn, winter.

Source: existing 2608×1558 captures in `.scratch/wa-four-seasons-20261031.1uskxp/shots-consistent/`, captured from Weather Aquarium commit `7df7ad1d18a5dfa3866a770f67a07b237e9abe79`. Original delivery: `OUTBOX/WEATHER_AQUARIUM_FOUR_SEASONS_FINAL_V2_20261031/`.

Identical crop for every season: x=390, y=312, width=1008, height=700. Resize uniformly by 6/7 to 864×600. The crop is inside the scene canvas (x=370.5, y=134.890625, width=1867, height=1120). Available width is sufficient; shortfall is 0 px. No generated imagery, stretching, repainting, or new scene elements.

`HOME_AUTUMN_1440.png` shows the autumn asset temporarily substituted into the first Playground card at localhost:3000/home.html (the homepage body consumed by `/index`), 1440×900. `HOME_BEFORE_1440.png` is the same page before substitution. `HOME_EVIDENCE.json` records card positions. The live local page may differ from repository main; this is a placement preview, not evidence of deployment or integration.

Only review assets are delivered. The developer still needs to replace the production card image after review. No page source, design system, or Rive files changed.

Browser capture log: `[test-lock] 开始 15:52:05 负载 254.33 105.15 47.18 排队 0 秒`; `[test-lock] 结束 15:52:23 负载 200.33 102.55 47.60 退出码 0`. An earlier `/index` capture timed out; the completed preview uses the existing homepage HTML route.
