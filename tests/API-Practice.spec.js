const { test, expect, request } = require('@playwright/test');
const loginPayload = { userEmail: "nikhil@nikhil.com", userPassword: "Nikhil@0777" };
let token;
test.beforeAll('LoginAPI', async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        }
    );
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();

    token = await loginResponseJson.token;
    console.log(token);
})

test('@API create order', async ({ page }) => {

    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
    await page.locator(".card-body").first().waitFor();
    const products =  page.locator(".card-body");
    for(let i=0 ;i<await products.count();++i)
    {
         const reqprod = await products.nth(i).locator("b").textContent();
         if (reqprod === "ZARA COAT 3"){
            await products.nth(i).getByRole('button', {name : ' Add To Cart'}).click();
         }
    }

    await page.click('[routerlink="/dashboard/cart"]');
    await page.locator("div li").first().waitFor();
   await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();

})