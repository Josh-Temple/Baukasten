# Sources

Last checked: 2026-10-07

This file lists external references used to support the reusable guidance in this directory. Prefer primary standards and official implementation guidance.

## Accessibility standards

### W3C — WCAG 2 Overview
https://www.w3.org/WAI/standards-guidelines/wcag/

Use for:
- WCAG structure and conformance
- perceivable / operable / understandable / robust principles
- current WCAG 2.2 reference

### W3C — What's New in WCAG 2.2
https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/

Use for:
- changes introduced in WCAG 2.2
- additional success criteria and rationale

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

## Content design

### GOV.UK — Understand content design
https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/plan-manage-content/understand-content-design/

Use for:
- starting from user needs
- helping users find information or complete tasks
- maintaining content rather than publishing for its own sake

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

## Evidence handling

External guidance should not be treated as proof that a particular deployed page works. For page-specific claims, verify the rendered site and record the result in `BROWSER_READING_OBSERVATIONS.md` or the relevant project repository.
