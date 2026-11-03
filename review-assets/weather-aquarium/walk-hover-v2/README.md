# Weather Aquarium Walk hover preview

This is an asset review only. The site does not reference the video. Proposed behavior, approved by Lu per the project manager: play once on hover, hold on the final frame, and return to the still image on pointer leave.

`walk-hover-v2.mp4` is 834×1112, 24 fps, 189 frames (7.875 s), video only. It keeps generated frames 0–188 from an eight-second Dreamina Seedance 2.0 Mini source and omits the last four frames, which dissolved back to the supplied endpoint. The source still is the first output frame; a four-frame easing transition enters the generated walk. Per-frame brightness correction matches the source still. The file is H.264 yuv420p, TV range, BT.709 matrix/primaries, sRGB transfer (`iec61966-2-1`). No additional generation or credits were used for this edit.

QA used both video and source decoded to 272×362 RGB. Differences below are mean absolute RGB channel values or mean luma (0.299R + 0.587G + 0.114B), out of 255. Background was measured at x=0–34 across the full height; the figure region was x=35–239, y=35–339.

| Check | Result |
| --- | ---: |
| First frame vs source | 1.06 |
| First→second frame | 2.91 (adjacent median 2.55) |
| Final frame vs preceding frame | 0.399 |
| Background luma delta over all frames | −1.872 to +1.678 |
| Figure-region luma delta over all frames | −0.917 to +1.650 |
| Full-frame luma delta over all frames | −0.847 to +1.166 |

The contact sheet samples every 0.5 seconds from frame 0 through 180, left to right and top to bottom. The large endpoint image is frame 188 and is sharp, with no visible end-frame ghosting. The brightness chart plots background in green, figure region in pink, full frame in blue, with gray guide lines at ±2/255. `brightness-curve.json` contains every frame's measurement.

**Review concern:** frames 2–3 show mild double contours during the very brief source-to-generated transition. `opening-16-frames.jpg` shows this at one frame per tile. Inspect at playback speed before approving. The generated expression and hands change during the walk. This video is not intended to loop; no playback code has been changed.

Source generation: Dreamina task `ef3c5dd0-441b-44e0-98fe-1260a7206703`, which cost 48 credits in the previous attempt. This edit cost 0. Video SHA-256: `bbfda366076f1969ad25e6e02bf4b3af2029e67f364e48e60edf7c538d2bfa99`.
