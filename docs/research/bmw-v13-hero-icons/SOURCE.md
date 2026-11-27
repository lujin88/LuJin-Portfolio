# Hero store icon removal — 2026-11-21

Request #15062 / QA #15061, thread #14997, PR #224.
Source: hero.webp from git commit 7703358. The original hero provenance is still unresolved. This edit does not establish rights to the car or phone interface.

Imagegen was used to erase only the Apple and Google Play symbols. Only two masked rectangles from that generated edit were composited into the decoded original: x1210 y833 40×42 and x1350 y833 44×42. All other original pixels were retained. Lossless WebP export keeps decoded RGB values intact.

Validation: 0 changed pixels outside mask; 3499 changed pixels inside mask; 1536×1024. See verification.json and mask.json. Both button borders remain. No separate mobile hero asset exists at 7703358; mobile CSS uses this same asset with cropping.

Deliver hero-no-store-icons-v1.webp as replacement for public/assets/images/bmw-system/v13/hero.webp. PNG is the lossless master. before-after-detail.png shows left original, right edited. No production code changed; developer/QA validate in page after integration.
