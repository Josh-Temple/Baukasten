<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1BAds6u7fqDXIX3hmwYJeJ6UMmtsHJGpR

## Run Locally

**Prerequisites:**  Node.js

This project runs without configuring a Gemini API key.


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

1. Build the site:
   `npm run build`
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. Push to `main` to trigger the workflow and publish the `dist/` build.
