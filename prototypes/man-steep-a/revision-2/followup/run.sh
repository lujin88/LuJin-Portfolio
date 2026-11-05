#!/bin/bash
set -e
export NODE_PATH=/Users/lu/.buzz/.scratch/tl-1104/node_modules
export PLAYWRIGHT_BROWSERS_PATH=/Users/lu/.buzz/.scratch/man-249a-r2-tools
D=/Users/lu/.buzz/OUTBOX/MAN_R2_FOLLOWUP_20261105_249a
for v in A B; do
 cd "$D/$v"
 if [ "$v" = A ]; then export MAN_ROUTE=man-truck-bus; else export MAN_ROUTE=man-review-b; fi
 for vp in 1440x900 1440x1000 1024x768 390x844; do
 node "$D/combo_scroll.cjs" 4822 "${vp%x*}" "${vp#*x}" > "combo_scroll_$vp.json"
 done
done
MAN_REVIEW="$D" node "$D/record.cjs"
