const {webkit, chromium, firefox, devices, request} = require('playwright');
const iPhone13Pro = devices['iPhone 11 Pro'];



(async () => {
    const browser = await webkit.launch({
        headless: false,
    });
    const context = await browser.newContext({
        ...iPhone13Pro, 
    });
    const page = await context.newPage();
    await page.goto('https://www.fozzy.ua/ua/restaurants/');
})();



(async () => {
    const browser = await chromium.launch({
        headless: false,
    });
    const context = await browser.newContext({
        geolocation:{latitude: 51.508076, longitude: -0.0993827,},
        permissions: ['geolocation'],
    });
    const page = await context.newPage();
    await page.goto('https:/maps.google.com');
})();




(async () => {
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
    })();