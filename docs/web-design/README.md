# Reusable Web Design Knowledge

Status: Working reference  
Scope: Cross-site guidance for websites and small web apps

This directory stores reusable knowledge for making sites easier to understand and use. It is deliberately separate from Baukasten's own visual system in `UI_GUIDELINES.md`.

## What belongs here

- principles that transfer across multiple sites
- review criteria that can be applied after implementation
- official standards and implementation guidance
- repeated observations from real devices and browsers
- hypotheses that are clearly marked as unverified

## What does not belong here

- project-specific product strategy
- a second source of truth for another repository's code or current state
- exact design tokens for unrelated sites
- one-off aesthetic preferences presented as general rules
- browser behavior inferred from a single observation

## Evidence levels

Keep these categories separate.

1. **Standard / official specification** — e.g. WCAG and browser documentation.
2. **Official implementation guidance** — e.g. W3C, web.dev, GOV.UK guidance.
3. **Local observation** — behavior reproduced on an actual site/device.
4. **Hypothesis** — a possible explanation that still needs a controlled test.

Do not promote a local observation or hypothesis into a general rule without additional evidence.

## Files

- `PRINCIPLES.md` — reusable design and content principles.
- `CHECKLIST.md` — practical review checklist for implemented sites.
- `BROWSER_READING_OBSERVATIONS.md` — Chrome reading/read-aloud observations and open hypotheses.
- `SOURCES.md` — external references used by this knowledge set.

## Recommended workflow

Before implementation:

1. Read `PRINCIPLES.md`.
2. Read the target repository's own design rules and product constraints.
3. Decide the page's main user task and information order before styling.

After implementation:

1. Review the rendered site, not only the source code.
2. Run `CHECKLIST.md`.
3. Record important browser/device findings as observations.
4. Promote a finding into a reusable principle only when the evidence supports it.

## Relationship to Baukasten

Baukasten is both a portfolio site and a useful reference implementation. Its visual identity remains governed by `UI_GUIDELINES.md`. The material in this directory is intentionally more general so it can be reused by other repositories without copying Baukasten's look and feel.
