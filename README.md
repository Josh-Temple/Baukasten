# Baukasten

**Tools for practice and connected reading.**

Baukasten is a deliberately selected collection of learning and reading tools. Visitors browse by task, then open a project to find a first exercise, a short workflow, and relevant conditions for use. Descriptions distinguish implemented features from intended learning benefits.

## Portfolio structure

Projects appear in four groups:

1. **Practise recall** — CIRCUIT, Engrave, and Majoris.
2. **Use English in conversation** — Parla.
3. **Explore history and philosophy** — World History Lab and Noema.
4. **Read connected research** — Lumen.

Status labels describe personal use or development focus, separately from the task groups. They do not represent measured learning outcomes. Lumen is the app name; Commonplace is its repository name. Its existing `lumen-commonplace` project URL is retained.

## Content management

`constants.ts` remains the source of truth for the English content and all project facts, destinations, and screenshots. `localization.js` contains Japanese translations, text-only overrides, and language helpers. The `PROJECTS` array stores each project's group, status, one-line value, audience, problem, approach, first exercise (`firstTask`), workflow (`howItWorks`), optional technical details, verified links, and real screenshot paths. `PORTFOLIO_GROUPS` stores task headings and descriptions; `PROJECT_STATUSES` stores the status definitions used on the About page.

Keep one-line descriptions short enough to scan beside a mobile screenshot. Put important storage or external-service conditions in `trustNote`, near the app action. Describe Lumen as a viewer of a published collection, rather than an in-browser note importer/editor. Parla's conversation takes place in an external AI app. Do not add usage, user-count, validation, or effectiveness claims without evidence. See `docs/CONTENT_REVIEW_2026-10-29.md` for the sources and verification limits of this revision.

Only links whose repository or current deployment can be verified should be added. An unavailable or unverified app must not receive a placeholder CTA. Content is kept in TypeScript: this site intentionally uses no CMS, database, GitHub API synchronization, or external JSON feed.

## Navigation

Project cards and the About page use shareable fragment URLs such as `#/projects/circuit` and `#/about`. Fragment routing is intentional: GitHub Pages does not provide SPA rewrites for clean path-based URLs, but these links survive direct visits, refreshes, and browser Back/Forward navigation. Do not replace them with `/projects/...` URLs without first generating matching static entry pages.

## Languages

Baukasten's gallery, seven project descriptions, and About page are available in English and Japanese. A compact language control is present on all screens. Choose **日本語** or **EN**; the chosen language is saved locally when storage is available and also written into the shareable URL (for example `?lang=ja#/projects/circuit`). A valid `?lang=` parameter takes priority over the saved preference, followed by browser language detection. Existing `#/projects/...` and `#/about` links continue working.

The page's `lang` and description metadata follow the selected language. This client-rendered, hash-routed site does **not** have independently pre-rendered translated project pages: do not assume separate project-level search indexing from language metadata alone. Language switching does not translate the external apps or their screenshots.

When adding a project or changing its user-facing text, update its Japanese translation in `localization.js` and check the coverage tests. Preserve URLs, storage requirements, product limitations and screenshots exactly across languages.

## Local development

**Prerequisite:** Node.js 20 or later (matching the deployment workflow).

Tailwind CSS v3 is compiled with PostCSS during the Vite build. Edit utilities in components and shared visual tokens in `tailwind.config.cjs`; the production site does not load Tailwind from a runtime CDN. Active controls use bundled Lucide SVG icons. Google Fonts remains an optional network-hosted typography resource; controls must remain usable when font requests fail.

```bash
npm install
npm run dev
```

Before opening a PR, verify navigation and the production build:

```bash
npm run typecheck
npm test
npm run build
```

Vite serves the site locally (normally at `http://localhost:3000`). To type-check and create the production bundle:

```bash
npx tsc --noEmit
npm run build
npm run preview
```

## Technology and design

- React 19, TypeScript, Vite, and existing utility CSS
- Mobile-first, bright neutral surfaces, low-saturation accents, generous spacing, and short tactile interactions
- `UI_GUIDELINES.md` is the Baukasten-specific design reference and should be reviewed before UI work
- `docs/web-design/README.md` is the reusable cross-site reference for clarity, content structure, accessibility, responsive behavior, and browser-reading observations

## GitHub Pages deployment

The existing GitHub Actions workflow installs with `npm ci`, builds `dist/`, and deploys it to GitHub Pages when `main` is updated. Vite's relative base keeps assets working beneath the repository Pages path.

## Supporting documentation

The custom-GPT content prompt remains in `docs/GPTS_BAUKASTEN_INPUT_PROMPT.md`; its output must still be fact-checked and adapted to the current `Project` type before publication.
