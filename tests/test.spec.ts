import { test, expect } from '@playwright/test';
import {MyPageObjects} from '../page objects/pageObjects'

// test.beforeEach(async({page}) => {
//  await page.goto('https://admin.shopify.com');
//  await page.waitForLoadState("domcontentloaded");
//  await page.locator('input#account_email').click();
//  await page.locator('input#account_email').fill('mykola.fedasiuk@devit.group');
//  await page.getByRole('button',  { name: 'Continue with email' }).click();
//  await page.getByRole('textbox', { name: 'Password' }).fill('dkSJ79sHB56');
//  await page.getByRole('button',  { name: 'Log in' }).click();
//  await page.waitForLoadState("domcontentloaded");

// })

test('1 Selector types', async ({ page }) => {
const pageObjects = new MyPageObjects(page);
await pageObjects.openApp();
await pageObjects.selTypes('Type');

   expect(await page.frameLocator(process.env.Frame)
   .locator('.custom-drop-down', {hasText: 'Type'}).textContent()).toEqual('TypeTape-line Info★ Pro');

});

test('2 Selector Resource', async ({ page }) => {
   const pageObjects = new MyPageObjects(page);
   await pageObjects.openApp();
   await pageObjects.selTypes('Resource');

  expect(await page.frameLocator(process.env.Frame)
  .locator('.custom-drop-down', {hasText: 'Resource'}).textContent()).toEqual('ResourceMarket Domains');

});

test('3 Selector Theme', async ({ page }) => {
   const pageObjects = new MyPageObjects(page);
   await pageObjects.openApp();
   await pageObjects.selTypes('Theme');

  expect(await page.frameLocator(process.env.Frame)
  .locator('.custom-drop-down', {hasText: 'Theme'}).textContent()).toEqual('ThemeMinimal');

});

test('4 Selector Color scheme', async ({ page }) => {

await page.goto(process.env.AppUrl);
await page.waitForLoadState('networkidle');
await page.waitForTimeout(10000);
await page.frameLocator(process.env.Frame)
.locator('.Polaris-Button__Content', {hasText: 'Create selector'}).click();
await page.frameLocator(process.env.Frame)
.locator('[class="container__aa6ed1916c93fc44b35f drop-down"]').locator('.header__c9ffa2ffd1581821c7eb').first().click();

await page.frameLocator(process.env.Frame)
.locator('.positionCheckboxContainer__b0c9e7e54d9e4684f2ff').nth(1).click();

  await page.frameLocator(process.env.Frame)
  .locator('.SelectColorsSchemes', {hasText: 'Color scheme'}).locator('.Polaris-Connected').click();
  const allSelectorColorScheme = page.frameLocator(process.env.Frame)
  .locator('.Polaris-Listbox-Option');
  for (const selCol of await allSelectorColorScheme.all()) {
     await selCol.click()
     await page.frameLocator(process.env.Frame)
     .locator('.SelectColorsSchemes', {hasText: 'Color scheme'}).locator('.Polaris-Connected').click();
  };
 await expect(page.frameLocator(process.env.Frame)
  .locator('.SelectColorsSchemes', {hasText: 'Color scheme'}).locator('.Polaris-Connected').locator('input')).toHaveValue('Turquoise');

});


test('5 Create selector', async ({ page }) => {
   const pageObjects = new MyPageObjects(page);
   await pageObjects.openApp();
   await pageObjects.createSelector('Language', 'Dropdown', 'Basic', 'Basic', 'Fixed position', 'Position - top left')

   await page.goto('https://qafm30-11.myshopify.com/');
   await page.getByLabel('Enter store password').fill('123');
   await page.getByRole('button', { name: 'Enter' }).click();
   await page.locator('selector-root').click()
   await page.locator('.sel-item', {hasText: 'Українська'}).click()
   await expect(page.locator('header')).toContainText('додому')
   expect(await page.locator('selector-root').getAttribute('data-type')).toEqual('drop-down')




});



