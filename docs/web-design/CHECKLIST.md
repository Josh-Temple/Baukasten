# Web Design Review Checklist

Use this after implementation or before publishing a meaningful UI change.

Default result for each relevant item:

- **PASS** — verified and acceptable.
- **NEEDS_FIX** — a concrete problem exists.
- **UNVERIFIED** — the required rendered state or evidence was not checked.

Do not mark a visual item PASS from source code alone when the rendered result has not been inspected.

## Purpose and first view

- [ ] The page's main purpose is understandable from the first view.
- [ ] The primary user action or next step is clear.
- [ ] Secondary features do not compete with the main task.
- [ ] Headings describe the actual content rather than relying on vague promotional language.
- [ ] The page does not require a long introduction before useful information appears.

## Information architecture

- [ ] The reading order is clear.
- [ ] Related information is grouped together.
- [ ] Heading levels are logical.
- [ ] Navigation labels are predictable and specific.
- [ ] The user can tell where they are and how to move to the next relevant area.
- [ ] Important information is not hidden only to make the layout look cleaner.

## Writing and content

- [ ] Each section has one clear purpose.
- [ ] Paragraphs are not unnecessarily long.
- [ ] Conditions, limits, and caveats are placed near the claims they qualify.
- [ ] Labels and buttons describe the action they perform.
- [ ] Lists or tables are used when they improve comparison rather than merely decorate the page.
- [ ] Empty filler copy and repeated explanations have been removed.

## Visual hierarchy

- [ ] Typography, spacing, and position establish hierarchy before color or effects.
- [ ] The most important content is visually prominent without becoming overwhelming.
- [ ] Decorative elements do not compete with content.
- [ ] Repeated components use consistent spacing, radius, border, and button treatment.
- [ ] The design does not depend on putting every section inside a card.
- [ ] Text line length remains comfortable on reading-heavy pages.

## Interaction and state

- [ ] Buttons, links, tabs, and inputs are recognizable as interactive.
- [ ] Primary and secondary actions are distinguishable.
- [ ] Keyboard focus is visible.
- [ ] Main actions are usable without hover.
- [ ] Relevant loading, empty, disabled, error, success, and selected states are understandable.
- [ ] Interaction feedback is immediate enough to show that an action was accepted.

## Responsive behavior

- [ ] The main task works at a narrow mobile width.
- [ ] Content reflows rather than being clipped or forcing unnecessary horizontal scrolling.
- [ ] Long text does not break the layout.
- [ ] Enlarged text / browser zoom does not make the main content unusable.
- [ ] Touch targets are not crowded.
- [ ] The visual order does not contradict the DOM/source order.
- [ ] Wide screens use space intentionally rather than simply stretching mobile content.

## Accessibility

- [ ] Native semantic elements are used where practical.
- [ ] Main functionality is keyboard accessible.
- [ ] Focus order is logical.
- [ ] Text and important controls have sufficient contrast.
- [ ] Meaning is not communicated by color alone.
- [ ] Images that carry meaning have appropriate text alternatives.
- [ ] Form fields have understandable labels and errors.
- [ ] Motion does not block reading or operation, and reduced motion is considered when relevant.
- [ ] Accessibility requirements are not weakened merely for visual style.

## Browser reading and read-aloud

Evaluate this section only when long-form reading or read-aloud use matters.

- [ ] Main text uses a coherent semantic document structure.
- [ ] Essential text is present in normal HTML content rather than only in visual rendering.
- [ ] Chrome Reading mode was tested on the deployed page.
- [ ] Chrome "Listen to this page" / read-aloud was tested on the deployed page.
- [ ] Results are recorded as observations rather than generalized from one page.
- [ ] Hosting-provider or indexing explanations are not asserted without controlled evidence.

## Rendered verification

- [ ] The deployed or production-equivalent page was opened in a real browser.
- [ ] At least one representative mobile view was checked.
- [ ] At least one representative wider view was checked.
- [ ] Relevant long-content and failure states were checked.
- [ ] Any untested state is explicitly marked UNVERIFIED.

## Review output

Record only findings that matter.

**Result:** PASS / NEEDS_FIX / UNVERIFIED

**Blocking issues**
- 

**Non-blocking observations**
- 

**Unverified items**
- 

**Next action**
- 
