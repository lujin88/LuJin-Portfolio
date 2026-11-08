#!/bin/bash
# Usage: bash ENCODE_WEB.sh /absolute/HIW_REVISION_2_FINAL.mp4 /absolute/new-output-dir
set -euo pipefail
hiw_source=$1
hiw_output=$2
hiw_scripts=$(cd "$(dirname "$0")" && pwd)
if [ -e "$hiw_output" ]; then echo 'Use a new output directory; refusing to overwrite.' >&2; exit 1; fi
mkdir -p "$hiw_output"
cp "$hiw_scripts/ENCODE_FINAL.py" "$hiw_output/ENCODE_FINAL.py"
ffmpeg -v error -threads 2 -i "$hiw_source" \
  -vf 'scale=in_color_matrix=bt601:in_range=tv:flags=accurate_rnd+full_chroma_int,format=gbrp,scale=out_color_matrix=bt709:out_range=tv:flags=accurate_rnd+full_chroma_int,format=yuv420p,setparams=color_primaries=bt709:color_trc=iec61966-2-1:colorspace=bt709:range=tv' \
  -c:v libx264 -qp 0 -preset slow -threads 2 -g 240 \
  -colorspace bt709 -color_primaries bt709 -color_trc iec61966-2-1 -color_range tv \
  -movflags +faststart+write_colr -an -map_metadata -1 "$hiw_output/HIW_R2_LOSSLESS.mp4"
ffmpeg -v error -threads 2 -i "$hiw_output/HIW_R2_LOSSLESS.mp4" \
  -c:v libx264 -qp 18 -preset slow -threads 2 -bf 0 -g 240 -force_key_frames 'expr:eq(n,143)' \
  -x264-params 'ipratio=1:pbratio=1:scenecut=0' -pix_fmt yuv420p \
  -colorspace bt709 -color_primaries bt709 -color_trc iec61966-2-1 -color_range tv \
  -movflags +faststart+write_colr -an -map_metadata -1 "$hiw_output/HIW_R2_QP18.mp4"
python3 "$hiw_output/ENCODE_FINAL.py"
ffmpeg -v error -threads 2 -i "$hiw_output/hiw-revision2-web.mp4" \
  -vf 'scale=in_color_matrix=bt709:in_range=tv:flags=accurate_rnd+full_chroma_int,format=rgb24' \
  -frames:v 1 "$hiw_output/hiw-revision2-still.png"
