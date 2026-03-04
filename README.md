<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Baukasten

A project gallery site built with React + Vite.  
It includes a card list, category filters, and a detail view, and you can update the showcased content by editing only the data in `constants.ts`.

## Key Features

- Project card gallery
- Category filtering (All / Tool / App, etc.)
- Project detail pages (overview, challenges, approach, screenshots)
- Information page (Info View)
- GitHub Pages deployment support

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS (utility-class based)

## Setup (Local Development)

**Prerequisites:** Node.js

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the development server

   ```bash
   npm run dev
   ```

3. Open in your browser

   ```
   http://localhost:5173
   ```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
```

## How to Update Content

Projects are managed in the `PROJECTS` array inside `constants.ts`.

- Add a new project: append a new object to `PROJECTS`
- Add a new category: set a new `category` value (navigation updates automatically)
- Add card images/screenshots: place assets under `public/screenshots/...` and reference them via `cardImage` / `screenshots`

## Directory Structure (Main Parts)

```text
.
├─ App.tsx
├─ constants.ts
├─ components/
├─ public/
│  └─ screenshots/
├─ index.tsx
└─ README.md
```

## GitHub Pages Deployment

1. Build the site

   ```bash
   npm run build
   ```

2. Open **Settings → Pages** in GitHub
3. Select **GitHub Actions** under **Build and deployment**
4. Push to `main` to publish `dist/`

## Notes

- The current implementation runs without any required API key configuration.
- `constants.ts` may include names of external services in project descriptions, but this README remains platform-agnostic.

## UI / Design Guide

- UI/design rules, direction, and color palette are centralized in `UI_GUIDELINES.md`.
- Check that document before adding new UI or modifying existing UI.
