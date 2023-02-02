import { test, expect, type Page } from '@playwright/test';
const {webkit, chromium, firefox, devices, request} = require('playwright');
const iPhone13Pro = devices['iPhone 11 Pro'];


test('screenshot', async () => {
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
});


test('openPnone', async () => {
    const browser = await webkit.launch({
        headless: false,
    });
    const context = await browser.newContext({
        ...iPhone13Pro, 
    });
    const page = await context.newPage();
    await page.goto('https://www.fozzy.ua/ua/restaurants/');
});


test('openGeolocation', async () => {
    const browser = await chromium.launch({
        headless: false,
    });
    const context = await browser.newContext({
        geolocation:{latitude: 51.508076, longitude: -0.0993827,},
        permissions: ['geolocation'],
    });
    const page = await context.newPage();
    await page.goto('https:/maps.google.com');
});


test('stopAdvertising', async () => {
        const browser = await chromium.launch({
            headless: false,
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        page.on('frameattached', frame => console.log('frames '+ page.frames().length));
        page.on('frameattached', frame => console.log('frames '+ page.frames().length));
        page.on('request', request => console.log(request.method() + ' ' + request.url()));
        page.on('response', response => console.log(response.status() + ' ' + response.url()));
        context.route('**/*', route => {
            if (route.request.frame().parentFrame())
                route.abort();
            else
                route.continue;
        })
        await page.goto('https://www.fozzy.ua/ua/restaurants/');
    });