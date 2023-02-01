import { test, expect } from '@playwright/test';

const {webkit, chromium, firefox} = require('playwright');



test('has title', async ({ page }) => {
  await page.goto('https://www.fozzy.ua/ua/restaurants/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/РЕСТОРАНИ/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://www.fozzy.ua/ua/restaurants/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});


// test('scrrenshot', async () => {
//     for (const browserType of [webkit, chromium, firefox]){
//         const browser = await browserType.launch();
//         const page = await browser.newPage();
//         await page.goto('https://www.fozzy.ua/ua/restaurants/');
//         await page.screenshot({
//             path: `screenshot-${browserType.name()}.png`,
//         });
//         await browser.close();
//         console.log('succes ' + browserType.name())
//     }
// });
