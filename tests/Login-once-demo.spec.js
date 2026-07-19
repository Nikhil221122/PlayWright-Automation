// @ts-check

const { test, expect } = require('@playwright/test');


// test('launch browser', async function ({ browser, page }) {

//     const context = await browser.newContext();
//     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
//     // console.log(await page.title());
//      await page.locator("#userEmail").fill("nikhil@nikhil.com");
//     await page.locator("#userPassword").fill("Nikhil@0777");
//     await page.locator("#login").click();
//     await page.locator(".card-body").first().waitFor();

//     await page.context().storageState({ path: "state.json" });
// });

test.use({
    storageState: 'state.json'
});


test('create order', async ({ page }) => {


    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
    await page.locator(".card-body").first().waitFor();
    const products = page.locator(".card-body");
    for (let i = 0; i < await products.count(); ++i) {
        const reqprod = await products.nth(i).locator("b").textContent();
        if (reqprod === "ZARA COAT 3") {
            await products.nth(i).getByRole('button', { name: ' Add To Cart' }).click();
        }
    }

    await page.click('[routerlink="/dashboard/cart"]');
    await page.locator("div li").first().waitFor();
    await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();

})