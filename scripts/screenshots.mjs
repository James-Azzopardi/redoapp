import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const url = process.argv[2] || 'http://localhost:4321';

const sizes = [
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
];

await mkdir('screenshots', { recursive: true });

const browser = await chromium.launch();

try {
  for (const viewport of sizes) {
    const page = await browser.newPage({ viewport });

    await page.goto(url, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);

    // Allow client-side scripts to initialise.
    await page.waitForTimeout(1000);

    // Scroll in overlapping steps to trigger reveals and lazy images.
    // Limit the loop in case the website has infinite scrolling.
    for (let step = 0; step < 100; step++) {
      const atBottom = await page.evaluate(() => {
        const root = document.scrollingElement;
        return window.scrollY + window.innerHeight >= root.scrollHeight - 2;
      });

      if (atBottom) break;

      await page.evaluate(() => {
        window.scrollBy({
          top: Math.floor(window.innerHeight * 0.7),
          behavior: 'instant',
        });
      });

      await page.waitForTimeout(500);
    }

    // Let the final section finish revealing.
    await page.waitForTimeout(1000);

    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });

    await page.waitForTimeout(500);

    const path = `screenshots/home-${viewport.width}x${viewport.height}.jpg`;

    await page.screenshot({
      path,
      fullPage: true,
      animations: 'disabled',
    });

    console.log(`Saved ${path}`);
    await page.close();
  }
} finally {
  await browser.close();
}
