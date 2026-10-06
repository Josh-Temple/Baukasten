# Web Design Research Findings

Status: Reviewed research notes  
Last reviewed: 2026-10-07  
Scope: Evidence that can inform cross-site design decisions

This file records what the current evidence supports, what it does not support, and how findings should change implementation. It is not a replacement for project-specific user research.

## 1. Start from observed user needs, not stakeholder preference

**Evidence**

GOV.UK Service Manual guidance treats non-user opinions and suggestions as assumptions to be tested. User needs should describe the outcome the user is trying to achieve rather than prescribing a solution.

W3C cognitive accessibility guidance similarly emphasizes clear page purpose, familiar controls, understandable hierarchy, and predictable navigation.

**Implication**

Before adding a feature, page, or navigation item, state the user task and the evidence for it. If evidence is absent, label the need as a hypothesis and test it rather than treating it as established.

**Confidence:** High for the process recommendation.

Sources:
- https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs
- https://www.w3.org/WAI/WCAG2/supplemental/patterns/o1p01-clear-purpose/
- https://www.w3.org/WAI/WCAG2/supplemental/patterns/o2p02-site-structure/

## 2. Descriptive headings are one of the strongest reusable interventions

**Evidence**

WCAG 2.2 Success Criterion 2.4.6 requires headings and labels, when present, to describe topic or purpose at Level AA. W3C supplemental cognitive-accessibility guidance recommends logical sections, clear headings, and visual cues so users can understand structure and locate information.

A 2019 Scientific Reports eye-tracking study using 50 real webpages found that pages with a greater proportion of headers were associated with fewer fixations across adults, children, typical readers, and readers with dyslexia. Because the study analyzed naturally varying webpages rather than experimentally assigning every typographic variable, treat this as supporting evidence rather than a universal causal effect size.

**Implication**

Prefer headings that let a user predict the section content. On long pages, test whether the heading outline alone gives a useful summary of the page.

**Confidence:** High for descriptive headings as a design rule; moderate for claims about eye-movement effects.

Sources:
- https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels
- https://www.w3.org/WAI/WCAG2/supplemental/patterns/o2p03-page-structure/
- https://www.nature.com/articles/s41598-019-49051-x

## 3. Clear hierarchy and consistency reduce orientation work

**Evidence**

WCAG 2.2 navigation guidance is designed to help users find content, determine location, and navigate predictably. Consistent repeated navigation is a Level AA requirement. W3C cognitive-accessibility guidance recommends consistent visual treatment for headings, controls, navigation, and state.

**Implication**

Across a site:
- keep repeated navigation in a consistent relative order;
- keep same-purpose controls visually and behaviorally consistent;
- make current location or progress visible where users can lose context;
- use whitespace, headings, boundaries, or other clear grouping cues rather than relying on subtle visual differences.

**Confidence:** High.

Sources:
- https://www.w3.org/WAI/WCAG22/Understanding/navigable.html
- https://www.w3.org/WAI/WCAG21/Understanding/consistent-navigation
- https://www.w3.org/WAI/WCAG2/supplemental/patterns/o1p03-consistent-design/
- https://www.w3.org/WAI/WCAG2/supplemental/patterns/o1p04-clear-steps/

## 4. Accessibility rules should distinguish mandatory baselines from stronger guidance

Several useful numbers are easy to misstate as universal design laws.

### Target size

WCAG 2.2 Success Criterion 2.5.8 is Level AA. Pointer targets should generally be at least 24 by 24 CSS pixels, with documented exceptions including sufficient spacing around smaller targets.

WCAG 2.2 Success Criterion 2.5.5 uses 44 by 44 CSS pixels, but it is Level AAA. Treat 44 by 44 as a stronger target when practical, not as the minimum AA requirement.

### Reflow

WCAG 2.2 Success Criterion 1.4.10 is Level AA. For vertically scrolling content, information and functionality should remain available without two-dimensional scrolling at a width equivalent to 320 CSS pixels, except content that genuinely requires a two-dimensional layout.

### Focus

WCAG 2.2 Success Criterion 2.4.11 is Level AA. An author-created sticky header, footer, overlay, or other layer must not completely hide the component receiving keyboard focus.

### Text spacing

WCAG 2.2 Success Criterion 1.4.12 is Level AA, but it is often misunderstood. It requires content not to lose information or functionality when users override text spacing to specified values. It does not mean every site author must set those exact spacing values as the default design.

### Long-line guidance

WCAG 2.2 Success Criterion 1.4.8 includes a mechanism for limiting text width to 80 characters or glyphs, or 40 for CJK text, but this criterion is Level AAA. It can inform reading-heavy layouts, but should not be described as an AA requirement or universal optimal line length.

**Confidence:** High.

Sources:
- https://www.w3.org/TR/WCAG22/
- https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/

## 5. Typography evidence supports readability testing, not rigid font rules

**Evidence**

The 2019 Scientific Reports study found that larger font size was associated with shorter fixation duration across reader groups. It also found fewer fixations on pages with more headers. Effects of line spacing were more complex, and the authors note inconsistent findings in the wider literature. Serif, bold, italic, and underline variables did not show reliable effects on the reading measures in that study.

Other controlled HCI experiments have reported benefits from larger text in particular tasks, but exact point-size recommendations do not transfer cleanly across devices, CSS pixels, fonts, languages, and viewing distance.

**Implication**

- avoid unusually small body text;
- prefer a readable default size and allow zoom/text enlargement;
- do not claim that serif or sans-serif is universally more readable;
- do not impose one line-height or line-length number as a universal optimum;
- test the actual content, device sizes, and user groups that matter.

**Confidence:** Moderate for typography effects; high for avoiding overgeneralized font-family claims.

Primary study:
- https://www.nature.com/articles/s41598-019-49051-x

Supporting HCI study:
- https://dl.acm.org/doi/10.1145/2858036.2858204

## 6. Performance is part of usability, but not a substitute for usability testing

**Evidence**

Google's current Core Web Vitals cover loading, interaction responsiveness, and visual stability. Current "good" thresholds are:
- LCP: 2.5 seconds or less;
- INP: 200 milliseconds or less;
- CLS: 0.1 or less.

Google recommends evaluating these at the 75th percentile of page loads, separately for mobile and desktop. Field data reflects real-user conditions that lab tools cannot fully reproduce.

**Implication**

For public sites with sufficient traffic, treat Core Web Vitals as measurable quality signals. Use lab measurements during development and field measurements when available. A site can meet performance thresholds and still be confusing, so do not treat these metrics as a complete usability score.

**Confidence:** High for the metric definitions and thresholds.

Source:
- https://web.dev/articles/vitals

## 7. Chrome Reading Mode favors extractable main content and page structure

**Evidence**

Google Research describes modern Reading Mode content distillation as using accessibility trees derived from the DOM, with node roles, text, position, and relationships used to identify essential content. Earlier Chromium Reader Mode documentation describes DOM-based distillation heuristics that identify article-like core content.

This supports the view that document structure and the browser's ability to identify a coherent main-content region matter. It does not support a simple rule that one hosting provider is inherently compatible and another is not.

**Implication**

For reading-oriented pages:
- expose main text in ordinary semantic HTML;
- use meaningful heading and landmark structure;
- keep the primary article/content region coherent;
- avoid unnecessary competing blocks of similarly weighted text;
- test the deployed page in the actual browser.

**Confidence:** High that structure/content representation is relevant; low for predicting exact eligibility of any individual page without testing.

Sources:
- https://research.google/blog/on-device-content-distillation-with-graph-neural-networks/
- https://chromium.googlesource.com/chromium/src/+/115.0.5790.98/docs/accessibility/browser/reader_mode.md

## 8. Android Chrome "Listen to this page" has a separate readability decision

**Evidence from current Chromium source**

The Android Read Aloud controller:
- checks whether the URL is eligible for a readability request;
- requests page readability through Read Aloud hooks;
- records a server readability result;
- uses the returned readability state to decide whether the page is readable;
- requires a supported page language and feature availability;
- currently caches readability information for up to one hour before rechecking.

The source also shows that the client rejects some URL classes before requesting readability, including non-HTTP(S) pages and certain Google URLs.

**What this changes**

This is stronger evidence than the earlier hosting-only hypothesis. The observed difference between GitHub Pages and Vercel pages may still correlate with some underlying page characteristics, but hosting provider alone is not demonstrated as the cause.

No primary source found in this research wave documents Google Analytics or Search Console registration as an eligibility requirement for "Listen to this page". Likewise, no source documents a normal multi-day waiting period. A client-side readability cache on the order of an hour exists in current Chromium source, but that does not establish how quickly a changed page would become readable on the server side.

**Implication**

Future experiments should focus first on:
- rendered main-content structure;
- amount and coherence of article-like text;
- language detection;
- timing after load;
- controlled same-content deployments;
- repeated tests after the local readability cache window.

Do not spend time on Analytics/Search Console changes solely to influence Read Aloud unless new evidence appears.

**Confidence:** High for the client behavior visible in Chromium source; unknown for the unpublished server-side readability classifier.

Sources:
- https://chromium.googlesource.com/chromium/src/+/refs/heads/main/chrome/browser/readaloud/android/java/src/org/chromium/chrome/browser/readaloud/ReadAloudController.java
- https://chromium.googlesource.com/chromium/src/tools/+/refs/heads/main/metrics/histograms/metadata/readaloud/histograms.xml
- https://support.google.com/chrome/answer/14768725?hl=ja

## 9. Open questions

The following remain research questions rather than settled rules.

1. Which rendered-page features most strongly influence the Android Read Aloud server readability classifier?
2. Does static/server-rendered article HTML outperform client-rendered article content when all visible content is otherwise identical?
3. How sensitive are Reading Mode and Read Aloud to multiple competing content regions?
4. What typography ranges work best for Japanese reading-heavy pages on common Android screens?
5. Which recurring UI problems actually appear across the user's own sites when the checklist is applied systematically?

These should be answered with controlled tests or site audits rather than additional speculative rules.
