# Baukasten content review — 2026-10-29

## Purpose and scope

Help a first-time visitor choose one of the existing seven tools, understand a concrete first action, and see conditions that affect use before opening it. This is an editorial and information-architecture revision of the existing English-language site. It does not expand the portfolio or add product features.

Base: `9f8141d1a58c72be49c96563025ffe5e5a3e54d4`.

## Editorial decisions

- Replace creator/development-stage grouping with task-based groups: recall; English conversation; history and philosophy; connected research. Retain the existing status labels separately.
- Shorten gallery summaries to describe actions rather than promise outcomes. Explain the Major System instead of requiring visitors to know “peg recall”.
- Add a suggested first exercise and a three-step workflow to all seven project pages. Exercises are editorial suggestions supported by existing features, not reports of a user study.
- Make browser storage/backup conditions visible for CIRCUIT, Engrave, Majoris, and Noema. Describe Parla's separate AI app and World History Lab's varying unit/mode coverage.
- Rename the displayed “Lumen / Commonplace” to “Lumen”, matching its README. Preserve the existing project ID and fragment URL. Describe it as a viewer of published linked material, rather than implying in-browser note ingestion/editing.
- Remove blanket “real-world validation”, “tested with real users”, and collection-wide “has evidence of real use” claims. The current files do not establish completed user validation or learning-effectiveness results.
- Replace the non-actionable “End of collection” with an About link. Update metadata, README, HANDOFF, and the generator prompt to match current content and types.
- Keep the existing seven selections, public app/repository destinations, screenshots, fragment navigation, visual tokens, and build-time CSS.
- Rendered review found external Material Icons requests failing and exposing literal icon names. This expanded controls and clipped the back action on narrow screens. Replace active-page icon-font spans with bundled Lucide SVGs from the existing dependency; remove the icon-font request. Test the site with external font requests explicitly blocked.
- The 320px rendered review also found brand text colliding with About despite a passing page-overflow check. Reduce the brand size below 360px, permit word wrapping, and add a regression that measures actual title text against the action bounds.

## Source evidence

Freshly retrieved repository files are the basis for feature descriptions. These are first-party implementation descriptions; README statements alone do not establish live deployment parity, learning outcomes, or actual current usage frequency. Existing personal-use and development statuses are retained as creator-provided labels, not independently revalidated findings.

| Project | Retrieved source | File blob SHA |
| --- | --- | --- |
| CIRCUIT | [README.md](https://github.com/Josh-Temple/CIRCUIT/blob/main/README.md) | `59646a6b8359355bf2967e086470b94514801f0b` |
| Engrave | [README.md](https://github.com/Josh-Temple/Engrave/blob/main/README.md) | `ff52de9aa7c14e886fcfa40fa5342556adde8054` |
| Majoris | [README.md](https://github.com/Josh-Temple/Majoris/blob/main/README.md) | `f9bcc19e14bbde03aa95d922107c01b59daf10ac` |
| Parla | [README.md](https://github.com/Josh-Temple/Parla/blob/main/README.md) | `244381cdc2315b254e917306b04a7b977f6ee784` |
| world-history-lab | [README.md](https://github.com/Josh-Temple/world-history-lab/blob/main/README.md) | `f3a611e8b49c477e25138da1101be1dec272357c` |
| Noema | [README.md](https://github.com/Josh-Temple/Noema/blob/main/README.md) | `08680f3a5c08e192b327d82f8f39712ab4a6cbf5` |
| Commonplace | [README.md](https://github.com/Josh-Temple/Commonplace/blob/main/README.md) | `c4d4a1a1f0f0f0ca9a511a6ea6be4040df19ea65` |

CIRCUIT's session → results → missed-problem review flow was also read in [App.tsx](https://github.com/Josh-Temple/CIRCUIT/blob/main/App.tsx), blob `1c03189d75c05687f69e0e774a68a611880067d6`.

Specific boundaries:
- Engrave's card and review data are browser-local. Its optional remote-audio configuration prevents a blanket claim that every possible audio file always stays local.
- Parla provides phrase recall and prompts; actual AI conversation happens outside Parla.
- World History Lab's README contains historical updates as well as known audit gaps. No content-count, full-coverage, or independent-validation claim is introduced.
- Noema supports theme/comparison reading, optional understanding checks, local saved items, and recent reading.
- Commonplace's README explicitly identifies the app as Lumen and describes a published Markdown-based viewer. The portfolio does not promise a browser note editor/importer.

## Verification

Local typecheck, the four existing navigation tests, the production build, and the Chromium browser suite passed. Browser coverage includes six widths (320, 360, 390, 768, 1024, 1280 CSS pixels), all seven project routes, home, About, screenshot decoding, and browser Back navigation. Every project has a visible first exercise and workflow. Thirty screenshots cover home, CIRCUIT, Engrave, Lumen, and About across the six widths. Font requests are explicitly blocked to verify fallback rendering. Content-only changes now trigger the visual CI workflow.

Rendered review includes the mobile and desktop home pages, the narrow Engrave detail page, and the desktop Lumen detail page. This is a same-session implementation review, not an independent usability study. The final clean-install/CI outcome is recorded in the pull request checks.

External app destinations are unchanged. They match the fresh README production URLs. A live-read attempt through the search service returned unavailable for all eight requested destinations, including Baukasten; that attempt is not evidence of an outage or a successful live check. Record any subsequent live check separately. Real Android interaction, cross-device backup/restore, offline behavior, and external-tool learning outcomes are outside this portfolio change.

## Quality criteria

The review uses the existing Baukasten design guide, `docs/web-design/PRINCIPLES.md`, and the user's UI quality checklist. Acceptance depends on readable task descriptions, visible next actions, preserved project URLs, usable narrow-screen layouts, and accurate source boundaries. It does not claim a complete accessibility-conformance audit.

