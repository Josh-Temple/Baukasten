# HANDOFF

## Session Summary

- Added a reusable prompt document for building a custom GPT that converts app descriptions into Baukasten `PROJECTS` entries.
- Linked the new prompt document from `README.md` for easier discovery.
- Kept implementation code unchanged (documentation-only update).

## Current Repository State

- New documentation file: `docs/GPTS_BAUKASTEN_INPUT_PROMPT.md`.
- `README.md` now includes a section that points to the GPT prompt template.

## What Was Verified

- Repository diff reviewed for doc-only changes.
- Markdown files checked for readability and copy-paste usability of the prompt.

## Suggested Next Steps

1. Paste the prompt into a custom GPT's Instructions field.
2. Test with 2-3 sample app briefs and confirm output can be copied directly into `constants.ts`.
3. If needed, tune defaults (e.g., `category`, `trustNote`, screenshot naming convention).

## Notes for the Next Session

- If `Project` type fields change in `types.ts`, update `docs/GPTS_BAUKASTEN_INPUT_PROMPT.md` accordingly.
- Keep `README.md` and `HANDOFF.md` in sync whenever onboarding/documentation workflow changes.
