# Catalog snapshots (Phase 0 baseline)

Immutable exports of `src/data/products.ts` for Firestore seeding, parity checks, and rollback reference.

## Files

| Pattern | Contents |
|---------|----------|
| `catalog-YYYY-MM-DD.json` | `categories`, `allProducts`, `stats`, `exportedAt`, `gitCommit` |
| `image-manifest-YYYY-MM-DD.json` | Unique `image` paths, `exists` on disk, `sizeBytes`, summary counts |

Snapshot filenames use **UTC** calendar date (`YYYY-MM-DD` from `toISOString().slice(0, 10)`).

Re-running `npm run catalog:snapshot` on the same UTC day **overwrites** that day’s files.

## Commands

```bash
npm run catalog:snapshot   # export catalog + image manifest
npm run catalog:parity     # default: --source=file (products.ts vs snapshot)
npm run catalog:parity -- --snapshot=snapshots/catalog-2026-10-19.json
npm run catalog:parity -- --check-images   # file source only: missing public/ images (informational)
npm run catalog:parity -- --source=firestore   # Phase 2: staging Firestore vs snapshot (needs Admin creds)
```

Parity v1 uses **strict** field equality (no whitespace normalization).

## Firebase staging (Phase 1–2)

1. Seed: `npm run catalog:seed` (staging credentials).
2. **Phase 2 gate:** `npm run catalog:parity -- --source=firestore` must **PASS** before any Firestore cutover.
3. **Phase 4 production:** see [`docs/firebase-setup.md`](../docs/firebase-setup.md) §9 (seed prod with `catalog:seed:production`, parity with prod creds, then Vercel Production `CATALOG_SOURCE=firestore` manually).

Setup and credentials: [`docs/firebase-setup.md`](../docs/firebase-setup.md).

## Rollback

Each catalog snapshot records `gitCommit` at export time. To restore the file-based catalog: redeploy that commit. Future work will add `CATALOG_SOURCE=file` to switch sources without a full redeploy (not implemented in Phase 0).
