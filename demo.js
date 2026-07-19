 const { chromium } = require('playwright');

(async () => {
    // Launch browser
    const browser = await chromium.launch({
        headless: false
    });

    // Create browser context
    const context = await browser.newContext();

    // Create page
    const page = await context.newPage();

    // Navigate
    await page.goto('https://www.google.com');

    // Search
    await page.locator('textarea[name="q"]').fill('Playwright');

    await page.keyboard.press('Enter');

    // Wait for a few seconds so you can see the results
    await page.waitForTimeout(5000);

    // Close browser
    await browser.close();
})();