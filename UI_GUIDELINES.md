# UI / Design Guidelines

This file centralizes Baukasten's UI and design rules in one place.  
Before adding new components or changing existing UI, review this guide first.

## 1. Design Direction

- **Keywords**: `Engineered Play & Logic` / `Toy-like precision` / `Minimal archive`
- **Experience goals**:
  - Use generous spacing and organize information in card-based units.
  - Keep decoration limited to geometric accents (rounded corners, dots, short lines).
  - Keep animation short and prioritize responsive interaction feedback.
- **Tone**:
  - Use bright neutral colors as the base.
  - Use low-saturation accent colors for emphasis.
  - Avoid heavy gradients or glass effects that reduce readability.

## 2. Color Palette

### Core

- `#F0F2F5`: App-wide background
- `#1A1A1A`: Primary text / primary button background
- `#FFFFFF`: Card surfaces / inverted text

### Accent

- `#BD5B5B`: Primary accent (main visual guidance and state emphasis)
- `#5B7A96`: Secondary accent (supporting geometric accents)
- `#DCA258`: Tertiary accent (point highlights)

### Tailwind Neutrals (aligned with current usage)

- `text-slate-900`: Default body text
- `text-slate-400`: Secondary/supporting text
- `border-slate-200`: Dividers and subtle borders
- `bg-slate-100`: Disabled/supporting surfaces

## 3. Typography Rules

- Base font: `font-sans`
- Headings:
  - Prefer heavy weight (`font-black`) with `tracking-tight` to `tracking-tighter`
  - Prefer uppercase styling (`uppercase`) for large headings
- Supporting labels:
  - Use extra-small sizes (`text-[0.5rem]` to `text-[0.65rem]`) + `uppercase` + `tracking-widest`
- Principles:
  - Avoid mixing multiple dominant heading styles on one screen.
  - Keep sufficient contrast with WCAG in mind; avoid overusing low-contrast text.

## 4. Layout / Spacing Rules

- Content width baseline: `max-w-md` (mobile-first baseline)
- Horizontal padding: `px-6`
- Section spacing: `space-y-12` or more
- Cards:
  - Use `rounded-2xl` or larger
  - Use `border border-slate-200` + optional `shadow-sm` / `shadow-toy`
- Sticky navigation:
  - Combine semi-transparent backgrounds with `backdrop-blur`

## 5. Component Rules

- Buttons:
  - Primary action: dark background (`#1A1A1A`) with white text
  - Secondary action: white background with subtle border
  - Use `rounded-xl` or larger; add tactile press feedback (e.g., `active:scale-90`)
- Category tabs:
  - Distinguish active/inactive states with **color + shadow + text color**
- Card lists:
  - Do not over-increase information density; keep one card focused on one key message
- Icons:
  - Use Material Icons and avoid making icons more dominant than the text hierarchy

## 6. Motion / Interaction

- Default transitions: `duration-300` to `duration-500`
- Easing: existing `ease-[cubic-bezier(...)]` patterns can be reused
- Hover/active:
  - Hover should usually be either a color change or slight movement (`-translate-y-1`), not both at once
  - Active should use consistent scale-down feedback (`active:scale-90` / `active:scale-95`)
- Caution:
  - Do not add long-running or always-looping animations

## 7. Implementation Workflow Rules

- If you introduce a new color, add it to this file before using it in code.
- For UI-related PRs, update the following as needed:
  1. The target component(s)
  2. This guide (if design rules are affected)
  3. README descriptions, if relevant
- When in doubt, prioritize readability, consistency, and maintainability.

## 8. Future Extension Notes

- If needed, consolidate design tokens in `tokens.ts` or the Tailwind theme.
- When implementing full dark mode, define color mappings in this guide first and then apply them in code.
