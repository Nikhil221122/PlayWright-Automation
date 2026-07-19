const { test, expect } = require('@playwright/test');

test('Locators test', async ({ browser }) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    const page3 = await context.newPage();
    const page4 = await context.newPage();
    const page5 = await context.newPage();
    await page1.bringToFront();
    await page1.goto("https://www.youtube.com/");

    await page2.bringToFront();
    await page2.goto("https://github.com");

    await page3.bringToFront();
    await page3.goto("https://playwright.dev");

    await page4.bringToFront();
    await page4.goto("https://rahulshettyacademy.com");

    await page5.bringToFront();
    await page5.goto("https://www.codewithharry.com/");

    await page1.bringToFront();
    const tabBtns = page1.locator(".yt-simple-endpoint");
    await tabBtns.first().waitFor();
    console.log(await tabBtns.count());

    await page2.bringToFront();
    await expect.soft(page2.getByRole('heading', { name: 'Home' })).toBeVisible();
    await page3.bringToFront();


})