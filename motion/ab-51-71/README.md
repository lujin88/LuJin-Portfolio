# Motion review media — 2026-11-08

Review assets only. Do not merge this backup branch into main. Static captures are illustrative frames, not timing acceptance. GIFs are reduced-resolution viewing copies, not performance evidence. Existing PR QA/reduced-motion evidence remains authoritative.

## Sources

| PR | source | interpretation |
| --- | --- | --- |
| #51 | `6b7b053dfb0fd5860cec13d2fbd7c8e10fad17ca` | Current version / revision evidence |
| #55 | `ab1414036c2e26c3f6e0aca4e613cdb77fb9d5ec` | Current version / revision evidence |
| #60 | `cd8253cdf86f49b653f1ab830c198a42ba344e48` | Current version / revision evidence |
| #62 | `1b520a8d71dc5271379595242c3335599060ea35` | A/B alternatives |
| #63 | `273c4285d61ae3725c1202c728678459f6cf9df8` | Current version / revision evidence |
| #65 | `07a9da5972eff0a22c56a3153df924fb41f895d3` | Current version / revision evidence |
| #67 | `c41049cd7f4959f55d6e3d0e23f1ff18d1ba8627` | A/B alternatives |
| #68 | `b9c281790e61dddcae69fe033d60c705087c1549` | Current version / revision evidence |
| #69 | `25ac03da8f1cd65f8e15879cc29d9bb48fa146e3` | Current version / revision evidence |
| #71 | `0a00ef2cc2cbf88f467be0068fa930fd6e7be2b5` | Current version / revision evidence |
| #52 | e3bca16 working-tree revision2 video | Current fixed-composition loop |
| #64 | 483b5cd / production 2026-11-08 | Before: live site, after: local validated build. Scroll/cursor positions differ; circle comparison only. |

Screenshots: Chrome 1440 viewport, local isolated prototype servers. Capture lock 14:25:42 load 7.81/10.96/11.82 →14:26:23 load 13.14/11.87/12.11, exit 0. #64 evidence and #69 screenshots preserved from their original validated captures. #51 contact sheet preserved from original V2.1 source. #52 source MP4 converted to GIF.

#61 has no recovered mobile A/B image. Visual owns #56/#59/#66 in visual/.

GIF capture lock: 14:27:05 load 10.57/11.49/11.97 →14:28:05 load 12.25/11.68/11.99, exit 0. No new application code. Dependency manifests match the main worktree byte-for-byte; pnpm install --frozen-lockfile --ignore-scripts passed there immediately before asset push.
