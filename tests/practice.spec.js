const { test, expect } = require('@playwright/test');

test('End To End Test', async ({ page }) => {

    const productName = 'ZARA COAT 3';

    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill("nikhil@nikhil.com");
    await page.locator("#userPassword").fill("Nikhil@0777");
    await page.getByRole("button", { name: "login" }).click();
    await page.locator(".card-body").first().waitFor();
    const count = await page.locator(".card-body").count();
    const products = page.locator(".card-body");

    for (let i; i < count; ++i) {
        if (products.nth(i).locator("b").textContent === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
      await page.locator("[routerlink*='cart']").click();
      await page.pause();
});

