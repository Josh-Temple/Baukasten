# HANDOFF

## Current focus

Help visitors choose a tool by task and understand how to start. Keep claims aligned with current product sources. Do not expand the site into a CMS or automatically list every repository.

## Current content (2026-10-29)

- Seven curated projects, grouped by recall, conversation, exploration, and reading. Status is separate from the visitor's task.
- Every project has a short description, first exercise, and three-step workflow in `constants.ts`. `firstTask` and `howItWorks` are required by the `Project` type.
- Storage/backup conditions and Parla's use of a separate AI app are visible near the main action.
- Lumen is the reader-facing app name; Commonplace is the repository. Keep the existing `#/projects/lumen-commonplace` link working.
- Existing app/repository links and screenshot assets remain in use. No project or destination was newly added in this revision.
- About, metadata, README, and the content-generation prompt match the current data model. Unsupported completed-validation/effectiveness language has been removed.
- Active-page navigation/actions use bundled Lucide SVGs, so failed external font requests cannot display icon names or expand buttons. Browser checks explicitly block those requests.
- `docs/CONTENT_REVIEW_2026-10-29.md` records source evidence, editorial decisions, and verification limits.

## Verification and next work

Run typecheck, navigation tests, build, and `tests/browser-visual.mjs` after content/layout changes. Visual CI includes `constants.ts` and `types.ts` so content-only changes receive browser checks.

Descriptions were checked against current repository READMEs, and CIRCUIT's workflow against its `App.tsx`. These are implementation descriptions, not independent evidence of learning effectiveness or current personal-use frequency. Preserve that distinction. Fresh external destination checks and real-device observations must be recorded separately from local browser checks.
