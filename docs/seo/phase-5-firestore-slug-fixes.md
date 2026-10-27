# Phase 5 — Firestore slug fixes (production)

Apply in **Admin → Products** when `CATALOG_SOURCE=firestore`. Revalidate/publish after edits so catalog projection and PDP cache refresh.

| Document ID | Name | Slug |
|-------------|------|------|
| `WEIGHING_SCALES_Electronic_weighing_scales_asss_jpg` | Animal Scale | `animal-scale` |
| `WEIGHING_SCALES_Electronic_weighing_scales_pallet_scale_1734x2048` | Pallet Scale | `pallet-scale` |

Optional: add a one-line description on Pallet Scale if still empty.

301s for legacy URLs are in `scripts/redirects.json` (`animal-scale-https-…`, `pallet-scale-https-…`).
