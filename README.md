# Baukasten

**Small learning and thinking tools, built through repeated personal use and real-world validation.**

Baukasten is a deliberately selected portfolio, not a technical-demo archive or an automatic list of repositories. Each project addresses a recurring problem, supports a clear task, has evidence of use, and states its current status honestly.

## Portfolio structure

Projects appear in four groups:

1. **Tools I use regularly** — tools shaped by recurring problems in personal learning practice.
2. **Currently validating** — products tested with real users before major features are added.
3. **Learning systems** — larger environments for understanding relationships, causes, and ideas.
4. **Knowledge infrastructure** — systems that turn research into connected, reusable knowledge.

The current selection is CIRCUIT, Engrave, Majoris, Parla, World History Lab, Noema, and Lumen / Commonplace.

## Content management

`constants.ts` remains the single source of truth. The `PROJECTS` array stores each project's group, status, one-line value, audience, problem, approach, optional workflow and technical details, verified links, and real screenshot paths. `PORTFOLIO_GROUPS` stores group headings and descriptions.

Only links whose repository or current deployment can be verified should be added. An unavailable or unverified app must not receive a placeholder CTA. Content is kept in TypeScript: this site intentionally uses no CMS, database, GitHub API synchronization, or external JSON feed.

## Local development

**Prerequisite:** Node.js 20 or later (matching the deployment workflow).

```bash
npm install
npm run dev
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
- `UI_GUIDELINES.md` is the design reference and should be reviewed before UI work

## GitHub Pages deployment

The existing GitHub Actions workflow installs with `npm ci`, builds `dist/`, and deploys it to GitHub Pages when `main` is updated. Vite's relative base keeps assets working beneath the repository Pages path.

## Supporting documentation

The custom-GPT content prompt remains in `docs/GPTS_BAUKASTEN_INPUT_PROMPT.md`; its output must still be fact-checked and adapted to the current `Project` type before publication.
