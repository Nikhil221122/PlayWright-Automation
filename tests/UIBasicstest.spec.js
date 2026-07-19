// @ts-check

const {test, expect} = require('@playwright/test');

//JSOn->String-->JS object
const dataSet = JSON.parse(JSON.stringify(require("../utils/UIBasicsTestData.json")));

test('launch browser',async function({browser,page}){

    const context =await browser.newContext(); 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await page.locator("#username").fill(dataSet.username);
    await page.locator("#password").fill(dataSet.password);
    await page.locator("#terms").check();
    await page.locator("#signInBtn").click();
    await expect(page).toHaveTitle("ProtoCommerce");
    console.log(await page.title());
});