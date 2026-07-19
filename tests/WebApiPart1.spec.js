const { test, expect, request } = require('@playwright/test');

const loginPayload = { userEmail: "nikhil@nikhil.com", userPassword: "Nikhil@0777" };
const orderPayload = { orders: [{ country: "Indonesia", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let token;
let orderId;
test.beforeAll('@API', async () => {

    // Login Api
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        });

    // console.log(loginResponse.status());
    // console.log(await loginResponse.text());
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = await loginResponseJson.token;
    console.log(token);

    // Create Order API
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                Authorization: token,
                "content-type": 'application/json'
            },
        }
    )
    const orderResponseJson = await orderResponse.json();

    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0];
});

test.beforeEach(() => {

});



test('@API Client App Login', async ({ page }) => {

    // const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");


    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token
    );
    await page.goto("https://rahulshettyacademy.com/client");
    // await page.locator("#userEmail").fill(email);
    // await page.locator("#userPassword").fill("Iamking@000");
    // await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    // await page.pause();

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    // await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});
