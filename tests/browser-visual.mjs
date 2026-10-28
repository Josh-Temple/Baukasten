import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { chromium } from 'playwright';

const port = 4173;
const base = `http://127.0.0.1:${port}/`;
const captureDir = path.resolve('visual-qa');
const viewports = [320, 360, 390, 768, 1024, 1280];
const routes = [
  { hash: '', name: 'home', heading: 'BAUKASTEN' },
  { hash: '#/projects/circuit', name: 'circuit', heading: 'CIRCUIT' },
  { hash: '#/projects/engrave', name: 'engrave', heading: 'Engrave' },
  { hash: '#/projects/lumen-commonplace', name: 'lumen', heading: 'Lumen' },
  { hash: '#/about', name: 'about', heading: 'Why Baukasten exists' },
];

await mkdir(captureDir, { recursive: true });

async function verifyImages(page) {
  const brokenImages = await page.locator('main img').evaluateAll(async elements => {
    const results = await Promise.all(elements.map(async image => {
      image.loading = 'eager';
      try {
        await image.decode();
        return null;
      } catch {
        return image.getAttribute('src');
      }
    }));
    return results.filter(Boolean);
  });
  assert.deepEqual(brokenImages, [], 'published screenshots must load');
}

const server = spawn(process.execPath, [
  'node_modules/vite/bin/vite.js',
  'preview',
  '--host', '127.0.0.1',
  '--port', String(port),
  '--strictPort',
], { stdio: ['ignore', 'pipe', 'pipe'] });

server.stderr.on('data', data => process.stderr.write(data));
let browser;

try {
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (server.exitCode !== null) throw new Error('Vite preview exited early');
    try {
      const response = await fetch(base);
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {
      // Wait for preview server startup.
    }
    await sleep(250);
  }
  assert.ok(ready, 'preview server did not start');
  const productionHtml = await (await fetch(base)).text();
  assert.ok(!productionHtml.includes('cdn.tailwindcss.com'), 'production must not depend on Tailwind CDN');
  assert.ok(!productionHtml.includes('type="importmap"'), 'unused runtime import map must be removed');
  assert.match(productionHtml, /assets\/[^"']+\.css/, 'Vite must emit a static CSS bundle');

  browser = await chromium.launch({ headless: true });

  for (const width of viewports) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    // Controls must remain legible when external typography resources fail.
    await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, route => route.abort());

    for (const route of routes) {
      await page.goto(base + route.hash, { waitUntil: 'domcontentloaded' });
      await page.getByRole('heading', { name: route.heading, exact: true }).waitFor();
      await page.evaluate(() => document.fonts.ready);
      await verifyImages(page);

      if (route.name === 'home') {
        const overlap = await page.evaluate(() => {
          const title = document.querySelector('h1');
          const about = document.querySelector('a[aria-label="About Baukasten"]');
          const range = document.createRange();
          range.selectNodeContents(title);
          const text = range.getBoundingClientRect();
          const action = about.getBoundingClientRect();
          return text.left < action.right && text.right > action.left
            && text.top < action.bottom && text.bottom > action.top;
        });
        assert.equal(overlap, false, `site title overlaps About action at ${width}px`);
      }

      const bodyBackground = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
      assert.equal(bodyBackground, 'rgb(240, 242, 245)', 'compiled utilities must style the page');

      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      assert.ok(
        dimensions.scrollWidth <= dimensions.clientWidth + 1,
        `${route.name} overflow at ${width}px: ${JSON.stringify(dimensions)}`,
      );

      await page.screenshot({
        path: path.join(captureDir, `${route.name}-${width}.png`),
        fullPage: true,
        animations: 'disabled',
      });
    }

    // Every currently published project uses the same detail layout, but
    // their title lengths and screenshots differ; verify all of them.
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    await page.getByRole('heading', { name: 'BAUKASTEN', exact: true }).waitFor();
    const projectLinks = await page.locator('main a[href^="#/projects/"]').evaluateAll(
      elements => elements.map(element => element.getAttribute('href')).filter(Boolean),
    );
    assert.equal(projectLinks.length, 7, 'all seven curated projects should be reachable');

    for (const href of projectLinks) {
      await page.goto(base + href, { waitUntil: 'domcontentloaded' });
      await page.locator('main h1').waitFor();
      await page.getByRole('heading', { name: 'Try this first', exact: true }).waitFor();
      await page.getByRole('heading', { name: 'How it works', exact: true }).waitFor();
      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      assert.equal(overflow, false, `project page ${href} overflows at ${width}px`);
      await verifyImages(page);
    }

    if (width === 390) {
      await page.goto(base, { waitUntil: 'domcontentloaded' });
      await page.getByRole('link', { name: 'CIRCUIT', exact: true }).click();
      await page.getByRole('heading', { name: 'CIRCUIT', exact: true }).waitFor();
      assert.equal(new URL(page.url()).hash, '#/projects/circuit');
      await page.goBack();
      await page.getByRole('heading', { name: 'BAUKASTEN', exact: true }).waitFor();
      for (const name of ['Practise recall', 'Use English in conversation', 'Explore history and philosophy', 'Read connected research']) {
        await page.getByRole('heading', { name, exact: true }).waitFor();
      }
      await page.getByRole('link', { name: 'About Baukasten' }).click();
      await page.getByRole('heading', { name: 'Why Baukasten exists' }).waitFor();
      await page.goBack();
      await page.getByRole('heading', { name: 'BAUKASTEN', exact: true }).waitFor();
    }

    await page.close();
  }

  console.log('Visual smoke passed: task groups, first exercises, workflows, every project, home and About across six viewport widths.');
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
