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