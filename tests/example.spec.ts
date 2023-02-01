import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});


const {webkit, chromium, firefox} = require('playwright');

(async () => {
    for (const browserType of [webkit, chromium, firefox]){
        const browser = await browserType.launch();
        const page = await browser.newPage();
        await page.goto('https://www.fozzy.ua/ua/restaurants/');
        await page.screenshot({
            path: `screenshot-${browserType.name()}.png`,
        });
        await browser.close();
        console.log('succes ' + browserType.name())
    }
})();

