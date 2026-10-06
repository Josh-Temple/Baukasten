# Sources

Last checked: 2026-10-07

This file lists external references used to support the reusable guidance in this directory. Prefer primary standards and official implementation guidance. Source type and limits matter: a WCAG success criterion, an explanatory guide, an empirical study, and browser source code answer different questions.

## Accessibility standards

### W3C — Web Content Accessibility Guidelines (WCAG) 2.2
https://www.w3.org/TR/WCAG22/

Use for:
- normative success criteria
- conformance levels A / AA / AAA
- reflow, target size, focus, text spacing, contrast, navigation, and related requirements

Limit:
- WCAG is an accessibility standard, not a complete usability or visual-design system.

### W3C — WCAG 2 Overview
https://www.w3.org/WAI/standards-guidelines/wcag/

Use for:
- WCAG structure and conformance
- current-version guidance
- relationship between normative criteria and supporting documents

### W3C — What's New in WCAG 2.2
https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/

Use for:
- criteria added in WCAG 2.2
- Focus Not Obscured, Dragging Movements, Target Size (Minimum), and other new criteria

### W3C — Understanding SC 2.4.6: Headings and Labels
https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels

Use for:
- descriptive headings and labels
- orientation and navigation benefits
- distinction between descriptive content and semantic markup

## Cognitive accessibility and information structure

### W3C — Use a Clear and Understandable Page Structure
https://www.w3.org/WAI/WCAG2/supplemental/patterns/o2p03-page-structure/

Use for:
- logical sections
- visible grouping
- headings and hierarchy
- cognitive-accessibility rationale

Limit:
- supplemental guidance, not a WCAG conformance criterion by itself.

### W3C — Make the Site Hierarchy Easy to Understand and Navigate
https://www.w3.org/WAI/WCAG2/supplemental/patterns/o2p02-site-structure/

Use for:
- predictable site structure
- navigation hierarchy
- helping users understand location and relationships

### W3C — Use a Consistent Visual Design
https://www.w3.org/WAI/WCAG2/supplemental/patterns/o1p03-consistent-design/

Use for:
- consistent presentation of controls and information
- reducing cognitive effort across repeated interactions

## User needs and content design

### GOV.UK Service Manual — Learning about users and their needs
https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs

Use for:
- starting design from the outcome users need
- distinguishing user evidence from stakeholder assumptions
- continuing research through discovery, alpha, beta, and live

### GOV.UK Publishing — Understand content design
https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/plan-manage-content/understand-content-design/

Use for:
- starting from user needs
- helping users find information or complete tasks
- maintaining content rather than publishing for its own sake

## Implementation guidance

### web.dev — Accessibility for web developers
https://web.dev/articles/a11y-tips-for-web-dev

Use for:
- native controls
- keyboard focus
- avoiding unnecessary custom interactive elements

### web.dev — Accessible responsive design
https://web.dev/articles/accessible-responsive-design

Use for:
- responsive reflow
- zoom
- flexible layout
- source order vs visual order
- touch target considerations

### web.dev — Semantics and screen readers
https://web.dev/articles/semantics-and-screen-readers

Use for:
- semantic HTML
- accessibility tree
- roles, names, values, and states

## Performance

### web.dev — Web Vitals
https://web.dev/articles/vitals

Use for:
- current Core Web Vitals
- LCP, INP, and CLS "good" thresholds
- 75th-percentile field-measurement guidance
- distinction between field and lab measurement

Limit:
- these metrics cover loading, responsiveness, and visual stability; they do not constitute a complete usability score.

## Empirical readability research

### Scientific Reports — Investigating Effects of Typographic Variables on Webpage Reading Through Eye Movements
https://www.nature.com/articles/s41598-019-49051-x

Use for:
- empirical relationship between real-page typographic variables and eye movements
- evidence concerning font size and headers
- evidence that some commonly asserted font-style rules are not universal

Limit:
- observational modeling across naturally varying real webpages cannot establish every variable as a universal causal rule.

### CHI 2016 — Make It Big!: The Effect of Font Size and Line Spacing on Online Readability
https://dl.acm.org/doi/10.1145/2858036.2858204

Use for:
- controlled evidence that font size and line spacing can affect online reading and comprehension

Limit:
- exact tested point sizes and the Wikipedia/Arial setup should not be generalized into one cross-device typography rule.

## Chrome reading features

### Google Chrome Help — Use "Listen to this page" mode
https://support.google.com/chrome/answer/14768725?hl=ja

Use for:
- documented Android Chrome read-aloud behavior
- explicit limitation that the feature is unavailable on some websites
- playback behavior including continued playback across tabs and screen lock when supported

### Google Chrome Help — Use Reading mode
https://support.google.com/chrome/answer/14218344?co=GENIE.Platform%3DAndroid&hl=ja

Use for:
- documented Android Reading mode behavior
- explicit possibility that Reading mode is unavailable on a page

### Google Research — On-device content distillation with graph neural networks
https://research.google/blog/on-device-content-distillation-with-graph-neural-networks/

Use for:
- modern Reading Mode content-distillation approach
- use of accessibility-tree structure, roles, text, and position
- evidence that content extraction depends on page/content representation rather than visual appearance alone

Limit:
- this research does not document the Android "Listen to this page" server-side readability classifier.

### Chromium — Reader Mode on Desktop Platforms
https://chromium.googlesource.com/chromium/src/+/115.0.5790.98/docs/accessibility/browser/reader_mode.md

Use for:
- historical DOM Distiller integration and distillability concepts
- fully rendered DOM/content extraction behavior

Limit:
- older implementation documentation; do not assume every detail describes the current Android Reading Mode implementation.

### Chromium — Android ReadAloudController
https://chromium.googlesource.com/chromium/src/+/refs/heads/main/chrome/browser/readaloud/android/java/src/org/chromium/chrome/browser/readaloud/ReadAloudController.java

Use for:
- client-side Read Aloud URL eligibility
- page readability request/response flow
- language and feature-availability checks
- readability-result caching behavior

Limit:
- implementation details can change and the server-side readability classifier is not exposed here.

### Chromium — Read Aloud metrics
https://chromium.googlesource.com/chromium/src/+/refs/heads/main/tools/metrics/histograms/metadata/readaloud/histograms.xml

Use for:
- confirmation that Chromium records page readability and server-side readability results

## Evidence handling

- External guidance should not be treated as proof that a particular deployed page works.
- Normative WCAG requirements should be labeled with their conformance level where a numeric threshold is reused.
- Peer-reviewed studies should retain their population, task, and design limitations.
- Browser source code is strong evidence about current client behavior, but version-sensitive implementation details should not be treated as permanent product promises.
- For page-specific claims, verify the rendered site and record the result in `BROWSER_READING_OBSERVATIONS.md` or the relevant project repository.
