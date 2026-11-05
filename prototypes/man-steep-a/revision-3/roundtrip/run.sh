#!/bin/bash
set -euo pipefail
export NODE_PATH=/Users/lu/.buzz/.scratch/tl-1104/node_modules
D=/Users/lu/.buzz/OUTBOX/MAN_R69_ROUNDTRIP_20261105_249a
cd "$D"
MAN_ROUTE=/man-before-b node toggle.cjs 4848 BEFORE_B_1024x768 1024 768
MAN_ROUTE=/man-truck-bus node toggle.cjs 4848 B_1024x768 1024 768
MAN_ROUTE=/man-regression-a node toggle.cjs 4848 A_1024x768 1024 768
MAN_ROUTE=/man-regression-a node toggle.cjs 4848 A_1440x900 1440 900
node extra.cjs
for variant in A BEFORE_A; do
 mkdir -p "$D/reg$variant"
 cd "$D/reg$variant"
 if [ "$variant" = A ]; then export MAN_ROUTE=/man-regression-a; else export MAN_ROUTE=/man-before-a; fi
 for vp in 1440x900 1440x1000 1024x768; do node "$D/combo_scroll.cjs" 4848 "${vp%x*}" "${vp#*x}" > "combo_scroll_$vp.json"; done
 node "$D/scene_probe.cjs" 4848 > scene_probe.json
 done
