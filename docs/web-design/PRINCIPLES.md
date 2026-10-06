# Web Design Principles

These principles are intended for websites and small web apps where clarity, readability, and ease of use matter more than visual novelty.

## 1. Start from the user's task

A page should be designed around what the user needs to understand or do.

- Make the primary purpose of the page inferable from the first view.
- Prefer concrete descriptions of what the site enables over abstract slogans.
- Do not make secondary features compete visually with the main task.
- If a page has several important tasks, make their relationship explicit instead of presenting equal-weight actions everywhere.

A useful test is: **Can a first-time visitor explain what this page is for and what they can do next without reading every paragraph?**

## 2. Build information hierarchy before decoration

Establish the reading and interaction order with structure first.

- Use heading levels, position, spacing, and typography to express hierarchy.
- The most important item should not depend only on color, shadow, or animation.
- Keep related information visually close.
- Separate unrelated sections with enough space that scanning remains easy.
- Do not wrap every block in a card merely to create structure.

If the hierarchy stops working when color and decoration are mentally removed, the underlying structure is probably too weak.

## 3. Design content for scanning

People often scan a page before reading it closely.

- Use headings that communicate the content of the section.
- Keep paragraphs focused on one main point.
- Put conditions and important caveats near the statement they qualify.
- Prefer concrete nouns and verbs to promotional abstractions.
- Use lists when they make relationships or choices easier to compare.
- Avoid introductory copy that delays the user's first useful information.

For task-oriented pages, content design starts from the user need rather than from what the publisher wants to say.

## 4. Make actions and state understandable

Interactive elements should make both possible actions and current state visible.

- Use native interactive elements where possible.
- Make buttons, links, tabs, and inputs visually recognizable.
- Distinguish primary and secondary actions.
- Provide feedback for loading, success, error, selected, disabled, and empty states when those states can occur.
- Do not rely on hover alone for essential information.
- Avoid hiding important actions behind unfamiliar gestures or icon-only controls without a clear label.

## 5. Design mobile layouts as real layouts

A narrow screen is not just a smaller desktop.

- Make the main task work in a single-column mobile layout first when practical.
- Let content reflow instead of depending on fixed widths.
- Avoid disconnecting the visual order from the DOM/source order.
- Preserve user zoom and text resizing.
- Keep touch targets separated enough to reduce accidental activation.
- Test long Japanese text, long English text, narrow screens, and enlarged text rather than only ideal sample content.

Responsive behavior should follow the content and task, not a list of device models.

## 6. Use semantic HTML and accessible interaction

Accessibility is part of the structure, not a later visual adjustment.

- Prefer native elements such as `button`, `a`, `input`, `select`, and semantic landmarks over custom `div` controls.
- Ensure keyboard users can reach and operate the main functions.
- Keep focus order logical and make focus visible.
- Do not communicate status or meaning only with color.
- Maintain sufficient contrast for text and important controls.
- Keep headings and landmarks meaningful for non-visual navigation.
- Treat WCAG 2.2 as the baseline standards reference for accessibility review.

Custom controls carry an accessibility cost. Use them only when native controls cannot express the required behavior.

## 7. Use motion to explain or confirm, not to decorate continuously

Motion should support comprehension or interaction feedback.

- Keep common transitions short.
- Prefer one clear motion cue over several simultaneous effects.
- Avoid long-running or looping animation unless it has a clear purpose.
- Do not let animation move essential information away from the user.
- Respect reduced-motion preferences where motion could be distracting or uncomfortable.

The absence of motion is preferable to motion that weakens reading or control.

## 8. Treat reading and read-aloud compatibility as testable behavior

Document-like pages may be consumed through browser reading or read-aloud features.

- Use a coherent heading structure and semantic main content.
- Keep the article or primary text in ordinary document flow where possible.
- Avoid making essential text depend on canvas rendering or purely visual layout.
- Test the actual deployed page in the target browser when reading or read-aloud support matters.
- Do not infer compatibility from visual similarity or hosting provider alone.

Browser reading features are partly browser-controlled and may not be available on every page even when the page appears readable.

## 9. Prefer progressive enhancement and graceful failure

The core purpose of a page should survive partial failure where practical.

- Important content should not disappear merely because a decorative script fails.
- Navigation and primary actions should have understandable fallback behavior.
- Avoid unnecessary client-side complexity for static or document-like content.
- Treat network, loading, empty, and error states as part of the experience.

## 10. Verify the rendered result

Source code can confirm structure, but not the whole user experience.

Review the actual page in a browser and, when relevant:

- mobile width
- desktop width
- keyboard-only navigation
- increased text size / zoom
- long content
- empty and error states
- reduced motion
- Chrome Reading mode / read-aloud behavior
- real device performance

When something has not been rendered or tested, mark it as unverified rather than assuming it works.
