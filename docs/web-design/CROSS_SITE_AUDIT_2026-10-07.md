# Cross-Site Web Design Audit — 2026-10-07

Status: Research audit  
Scope: Representative entry pages and reading surfaces across the user's current sites  
Method: Repository source review plus deployed-page text retrieval where accessible. No visual screenshot inspection was available in this pass, so visual appearance and exact responsive rendering remain UNVERIFIED unless already documented by the destination repository.

## Sites reviewed

| Site | Representative surface | Delivery | Main use |
|---|---|---|---|
| Instant Radio | home/player | static HTML, GitHub Pages + Vercel | paste text and listen |
| RSVP Learning | RSVP home + Learn/Listen structure | static/PWA | personal learning and listening |
| Studio Lab | public home | Jekyll/GitHub Pages | public research and portfolio |
| Systematic Trading Research | research UI | static HTML + client data, GitHub Pages | research-state exploration |
| 介護ルール | /databases | Next.js/Vercel | search and navigate regulatory evidence |
| World History Lab | home | static/PWA, Vercel | choose and continue learning modes |
| GrokMath | home + unit index | Next.js/Vercel | open curriculum units and lessons |
| Baukasten | portfolio home | React/Vite/GitHub Pages | browse selected projects |

This is not a full accessibility conformance audit. It is a comparative usability and information-structure review using the reusable checklist in this directory.

## Executive findings

1. The strongest entry pages explain the user's task before explaining the implementation.
2. A clear primary path can be weakened again by presenting too many secondary choices immediately afterward.
3. Document-oriented semantic HTML is consistently easier to extract and reason about than app shells, but Chrome Read Aloud eligibility cannot be predicted from that structure alone.
4. The best current reference pages separate purpose, limits, primary action, and deeper detail in that order.
5. Several sites would benefit from explicitly treating the home page as an orientation surface rather than a feature inventory or implementation status page.

## Site-by-site findings

### 1. 介護ルール — \`/databases\`

**Overall:** Strong reference implementation for an evidence-heavy task.

**What works**

- Opens with the concrete purpose: users can inspect four classes of regulatory material without first choosing a service.
- States an important limitation immediately after the lead: each database has a different public scope and unverified areas are not presented as verified.
- Provides a primary cross-database search before the detailed database catalogue.
- Uses descriptive section headings and link labels.
- Uses server-rendered semantic structure (\`article\`, headings, form, labels, links), so core content exists independently of client interaction.

**Potential improvement**

- The page contains several important boundary explanations. Their presence is justified, but future visual review should check that warnings do not receive the same visual weight as the primary search task.
- The global site header/navigation should be checked for keyboard bypass/skip-link support because the navigation repeats across pages.

**Result:** PASS for information structure; rendered accessibility details partly UNVERIFIED.

### 2. Studio Lab — public home

**Overall:** Strong reference implementation for research communication.

**What works**

- First screen states what the site contains: selected case studies/research with methods, results, limits, and negative findings.
- Evidence and limitation language is integrated into the content rather than placed only in a disclaimer.
- Layout template includes a skip link, semantic navigation, language metadata, canonical links, and language alternatives.
- Mobile navigation reduces the number of immediately exposed destinations by grouping secondary items under “More/その他”.

**Potential improvement**

- The public information architecture now contains many top-level destinations. Continue checking whether each deserves persistent navigation or whether some belong under a smaller number of audience-oriented entry points.

**Result:** PASS for structure and accessibility-oriented markup; visual hierarchy UNVERIFIED in this pass.

### 3. Instant Radio — home/player

**Overall:** Clear task-oriented utility with minor orientation noise.

**What works**

- The lead explains the actual action and benefit: paste text and listen without waiting for generated audio.
- Primary action (“キューに追加”) is visually differentiated in source CSS.
- Form controls have labels; important icon buttons have accessible names.
- Mobile CSS gives queue actions larger touch areas and collapses multi-column settings.
- Privacy and browser limitations are stated near the interaction rather than hidden in a separate legal page.

**Potential improvement**

- The Japanese interface mixes prominent English section labels (“Add something to listen to”, “Player”, “Queue”). For a Japanese-first surface, Japanese task labels would reduce language switching without changing the product.
- The first action block exposes “add”, “paste”, “sample”, and “Chrome read-aloud test” together. The Chrome experiment is useful for development but competes with the normal user path. Consider placing experiments behind a smaller secondary link or developer section.
- The home page is an app surface, not a reading document. Do not optimize the main player page for Chrome Read Aloud at the expense of the core paste→play workflow.

**Result:** PASS with small clarity improvements.

### 4. RSVP Learning

**Overall:** Good separation between app interaction and reading-oriented content.

**What works**

- The RSVP player uses explicit accessible labels for icon-heavy controls.
- Learn content has a strong reusable reading template: \`main\`/\`article\`, static initial text, meaningful headings, bounded reading width, generous line height, and small controls.
- Learn rules explicitly avoid turning Chrome Read Aloud into a required path.
- The Learn template separates audio-friendly prose from complex visual structures and location-dependent wording.

**Potential improvement**

- The RSVP player itself is optimized for a returning personal user and does not explain its purpose in the first view. That is acceptable while private/personal, but would need an onboarding/orientation layer before public release.
- The Listen index has almost no static orientation text; its list is populated dynamically. If exposed beyond personal use, add a short visible heading and purpose statement before the dynamic list.

**Result:** PASS for current personal-use scope; public onboarding would NEED_FIX.

### 5. Systematic Trading Research

**Overall:** Strong research hierarchy, with progressive-enhancement risk.

**What works**

- Clear semantic sections separate current state, evidence, diagnostics, data boundaries, history, and authority.
- The page repeatedly distinguishes canonical evidence from the derived view.
- Mobile CSS collapses complex grids into linear content.
- Reduced-motion preference disables smooth scrolling.
- Local observation shows Android Chrome Read Aloud succeeds on the existing top URL.

**Potential improvement**

- Most substantive values are injected by JavaScript. If the data script fails, the user sees headings and explanatory boundaries but not the research state itself.
- For a public evidence page, consider generating the same content into static HTML at build time while keeping the current data source canonical. That would improve graceful failure, sharing, indexing, and machine-readable extraction without changing the visual design.
- The sticky header plus in-page navigation should be included in future keyboard-focus/scroll-padding verification.

**Result:** PASS for information hierarchy; NEEDS_FIX for graceful failure if static build generation is practical.

### 6. World History Lab

**Overall:** Strong first path, then excessive option exposure.

**What works**

- “Start here” gives a three-step learning sequence.
- Progress and a primary “Start Learning” action appear before the full tool catalogue.
- The current CSS intentionally reduced card nesting and uses divider-led hierarchy.
- Links and buttons have explicit focus-visible treatment.
- The primary button is full width on narrow screens.

**Main issue**

After a strong guided entry, the page presents a very large catalogue of modes across Start, Practice, Connections, and additional categories. This makes the home page perform two jobs at once:
1. guide the learner to the next useful action;
2. act as a complete tool directory.

Those goals conflict for a learner who does not already understand the mode taxonomy.

**Recommendation**

Keep the current guided path and progress summary. Collapse the full inventory behind one secondary “Explore all learning modes” route or progressively reveal advanced/experimental modes. The home page should answer “what should I do now?” before “what has been built?”

**Result:** NEEDS_FIX for choice overload on the home entry surface.

### 7. GrokMath

**Overall:** Highest-priority clarity issue in this audit.

**Main issue**

The first-view copy describes implementation status:

- installable PWA;
- manifest;
- app icons;
- offline service worker;
- source files in \`content/\`;
- “lightweight launch surface”.

These are developer/project facts, not the learner's goal. “Start Learning” appears only after a technical “PWA Highlights” section.

This reverses the desired information order.

**Recommendation**

The home page should lead with the learning promise and next action, for example:
- what mathematics the learner can study;
- where to start;
- how units progress;
- resume/continue state if available.

Move PWA/offline implementation information to About, README, or a small secondary note.

The unit index itself is structurally clear and simple.

**Result:** NEEDS_FIX, high priority.

### 8. Baukasten

**Overall:** Strong portfolio grouping with one interaction limitation.

**What works**

- Clear site identity and one-sentence explanation.
- Projects are grouped by use/state rather than presented as one undifferentiated repository list.
- Cards use semantic \`article\` elements; screenshot buttons have accessible labels and explicit focus-visible styles.
- The design has deliberately reduced unverified/placeholder calls to action.

**Potential improvement**

- Opening a project detail is currently attached to the screenshot button rather than the project title/card as a whole. A user scanning text may reasonably expect the title to be the primary project link. Consider making the project title an explicit link/button to the detail view as well.
- Because the app is entirely client-rendered from an empty root element, its public content has a stronger JavaScript dependency than the document-oriented sites. This is acceptable for a portfolio app, but static generation would improve graceful failure and machine readability if the project later prioritizes search/reading extraction.

**Result:** PASS with non-blocking interaction improvements.

## Recurring patterns across the sites

### A. Purpose-first copy is a reliable differentiator

The clearest pages — 介護ルール, Studio Lab, Instant Radio — begin with what the visitor can understand or do. GrokMath is the clearest counterexample because implementation details precede the learning task.

**Reusable rule:** Home-page copy should describe the user's outcome before architecture, framework, hosting, PWA, or repository implementation.

### B. “Complete catalogue” and “guided entry” should usually be separate layers

World History Lab demonstrates the tension most strongly. A directory is useful for experienced users; a guided next action is useful for learners. Putting both at equal depth increases decision cost.

**Reusable rule:** Put the primary next action first; move exhaustive feature inventories one level deeper unless exploration is itself the main task.

### C. Reading-oriented surfaces benefit from document structure even when the app does not

RSVP Learn, Studio Lab, 介護ルール, and the static sections of Systematic Trading use conventional headings and content flow effectively. App shells such as RSVP Player or Baukasten have different goals and should not be forced into article patterns.

**Reusable rule:** Design reading surfaces as documents and interaction surfaces as applications. Do not optimize every page for the same browser extraction behavior.

### D. Static meaningful content improves graceful failure

Systematic Trading and Baukasten rely more heavily on client rendering than the document-oriented surfaces.

**Reusable rule:** Where a page's primary value is reading published information, prefer server-rendered, static, or build-generated meaningful HTML when practical. Use client rendering for interaction, not merely because the project uses JavaScript.

This is a robustness recommendation, not a proven Chrome Read Aloud eligibility rule.

### E. Accessibility work is strongest where it is explicit in shared templates

Studio Lab's skip link/navigation template, RSVP Learn's article template, World History Lab's focus-visible rules, and Baukasten's button focus styles show that accessibility is more reliable when encoded in shared templates rather than remembered page by page.

**Reusable rule:** Put accessibility defaults in shared layout/components and test exceptions.

## Priority actions

1. **GrokMath:** rewrite the home-page hierarchy around learning, not PWA implementation.
2. **World History Lab:** separate the guided home path from the complete mode directory.
3. **Systematic Trading:** evaluate build-time/static rendering of current derived content.
4. **Instant Radio:** move the Chrome experiment out of the main action cluster and normalize Japanese-first labels.
5. **Baukasten:** make project titles explicit detail-entry controls in addition to screenshots.
6. **Cross-site:** add skip-link/repeated-navigation verification to sites with persistent headers.

## Limits

- This pass did not include screenshot-based visual inspection.
- Runtime keyboard behavior, focus trapping, actual 320 CSS px reflow, text-spacing overrides, contrast calculations, and Core Web Vitals were not re-measured here.
- Deployed-page text was retrieved for public entry pages where available, but that is not equivalent to a full browser usability test.
- Chrome Read Aloud results are based on the user's real-device observations plus Chromium implementation research; the Google server-side readability classifier remains unpublished.
