import { expect } from '@playwright/test';
import { test } from '../fixtures/fixturePages'

test('1 Selector types', async ({page, selectorPage}) => {
   await selectorPage.openApp();
   await selectorPage.selTypes('Type');
   expect(await page.frameLocator(process.env.Frame)
   .locator('.custom-drop-down', {hasText: 'Type'}).textContent()).toEqual('TypeTape-line Info★ Pro');

});

test('2 Selector Resources', async ({page, selectorPage}) => {
   await selectorPage.openApp();
   await selectorPage.selTypes('Resource');
  expect(await page.frameLocator(process.env.Frame)
  .locator('.custom-drop-down', {hasText: 'Resource'}).textContent()).toEqual('ResourceMarket Domains');

});

test('3 Selector Themes', async ({page, selectorPage}) => {
   await selectorPage.openApp();
   await selectorPage.selTypes('Theme');
  expect(await page.frameLocator(process.env.Frame)
  .locator('.custom-drop-down', {hasText: 'Theme'}).textContent()).toEqual('ThemeMinimal');

});

test('4 Selector Color schemes', async ({page}) => {

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


test('5 Create selector, Currency, Dropdown, Fixed position, Position - top left', async ({page, selectorPage}) => {
   await selectorPage.openApp();
   await selectorPage.createSelector();
   await selectorPage.selectResourse('Currency');
   await selectorPage.selectPosition('Fixed position', 'Position - top left');
   await selectorPage.changeSlider();
   await selectorPage.display2(3);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('[class="sel-disclosure sel-basic sel-view-all sel-currencies"]').click();
   await page.locator('li[data-code="USD"]').hover({timeout: 5000});
   await expect(page.locator('.sel-item:hover').first()).toHaveCSS('color', 'rgb(32, 34, 35)');
   await page.locator('li[data-code="USD"]').click();
   expect(await page.locator('[class="sel-title sel-uppercase"]').first().getAttribute('data-code')).toEqual('USD');
   await expect(page.locator('[class="sel-title sel-uppercase"]').first()).toHaveText('USD ($)');
   expect(await page.locator('selector-root').getAttribute('data-type')).toEqual('drop-down');
   await expect(page.locator('selector-root')).toHaveClass('needsclick sel-fixed sel-top-left');
   await expect(page.locator('.sel-iconWrapper').first()).toHaveClass('sel-iconWrapper sel-icon-curr');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
   await expect.soft(page.locator('[class="sel-disclosure sel-basic sel-view-all sel-currencies"]')).toHaveScreenshot();

   await expect(page.locator('span.sel-title').first()).toHaveCSS('color', 'rgb(32, 34, 35)');
   await expect(page.locator('.sel-itemsContainer').first()).toHaveCSS('background-color', 'rgb(255, 255, 255)');

});



test('6 Create selector, Currency, Wheel, Cute, Arctic, Fixed position, Position - top right', async ({page, selectorPage}) => {
   await selectorPage.openApp();
   await selectorPage.createSelector();
   await selectorPage.selectResourse('Currency');
   await selectorPage.selectType('Wheel');
   await selectorPage.selectTheme('Cute')
   await selectorPage.selectColor('Arctic')
   await selectorPage.selectPosition('Fixed position', 'Position - top right');
   await selectorPage.displayCurrencyIcon(1);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('selector-root').click();
   await page.waitForTimeout(1000);   
   await page.locator('li[data-code="PLN"]').click();
   await page.waitForTimeout(1000); 
   await page.getByRole('button', { name: 'Done' }).last().click();
   await expect(page.locator('selector-root')).toHaveClass('needsclick sel-fixed sel-top-right');
   expect.soft(await page.locator('[class="sel-item sel-current"]').getAttribute('data-code')).toEqual('PLN');
   expect(await page.locator('selector-root').getAttribute('data-type')).toEqual('wheel');
   await expect(page.locator('.sel-iconWrapper').first()).toHaveClass('sel-iconWrapper');
   await expect(page.locator('.sel-disclosure.sel-cute').first()).toHaveClass('sel-disclosure sel-cute sel-view-all sel-currencies');
   await expect.soft(page.locator('.product-card-wrapper').first()).toContainText('PLN');
   await expect.soft(page.locator('selector-root')).toHaveScreenshot();

   await expect(page.locator('span.sel-title').first()).toHaveCSS('color', 'rgb(65, 0, 1)');
   await expect(page.locator('.sel-wheel-actionsWrapper')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
});



test('7 Create selector, Country (Currency), Modal, Minimal, Wild West, Fixed position, Position - bottom right', async ({page, selectorPage}) => {
   await selectorPage.openApp();
   await selectorPage.createSelector();
   await selectorPage.selectResourse('Country (Currency)');
   await selectorPage.selectType('Modal');
   await selectorPage.selectTheme('Minimal')
   await selectorPage.selectColor('Wild West')
   await selectorPage.selectPosition('Fixed position', 'Position - bottom right');
   await selectorPage.display1(1);
   await selectorPage.display2(1);
   await selectorPage.displayCurrencyFormat(1);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('selector-root').click();
   await page.locator('li[data-code="PL"]').hover();
   await expect(page.locator('.sel-item:hover').first()).toHaveCSS('background-color', 'rgba(150, 51, 28, 0.2)');
   await page.locator('li[data-code="PL"]').click()
   await expect(page.locator('selector-root')).toHaveClass('needsclick sel-fixed sel-bottom-right');
   expect(await page.locator('selector-root').getAttribute('data-type')).toEqual('modal');
   expect(await page.locator('[class="sel-item sel-current"]').getAttribute('data-code')).toEqual('PL');
   const selectorExists = await page.waitForSelector('.sel-iconWrapper', { state: 'visible', timeout: 1000 }).then(() => true).catch(() => false);
   expect(selectorExists).toBeFalsy();
   await expect(page.locator('.sel-item.sel-current').first()).toHaveText('PL (zł)');
   await expect(page.locator('.sel-disclosure.sel-minimal').first()).toHaveClass('sel-disclosure sel-minimal sel-view-names sel-countries');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('zł PLN');
   await expect.soft(page.locator('selector-root')).toHaveScreenshot();

   await expect(page.locator('span.sel-title').first()).toHaveCSS('color', 'rgb(56, 58, 21)');
   await expect(page.locator('.sel-itemsContainer').first()).toHaveCSS('background-color', 'rgb(255, 239, 215)');

});


test('8 Create selector, Country (Currency), Inline, Material, Winter, Fixed position, Position - bottom left', async ({page, selectorPage}) => {
   await selectorPage.openApp();
   await selectorPage.createSelector();
   await selectorPage.selectResourse('Country (Currency)');
   await selectorPage.selectType('Inline');
   await selectorPage.selectTheme('Material')
   await selectorPage.selectColor('Winter')
   await selectorPage.selectPosition('Fixed position', 'Position - bottom left');
   await selectorPage.displayCurrencyFormat(0);
   await selectorPage.saveSelector();
   await selectorPage.openStore();
 
   await page.locator('span[data-code="PL"]').hover();
   await expect(page.locator('.sel-item:hover').first()).toHaveCSS('color', 'rgb(26, 55, 77)');
   await page.locator('span[data-code="PL"]').click();
   await expect(page.locator('selector-root')).toHaveClass('needsclick sel-fixed sel-bottom-left');
   expect(await page.locator('[class="sel-item sel-current"]').getAttribute('data-code')).toEqual('PL');
   expect(await page.locator('selector-root').getAttribute('data-type')).toEqual('inline');
   await expect(page.locator('.sel-iconWrapper').first()).toHaveClass('sel-iconWrapper');
   await expect(page.locator('.sel-item.sel-current').first()).toHaveText('Poland (PLN)');
   await expect(page.locator('.sel-disclosure.sel-material').first()).toHaveClass('sel-disclosure sel-material sel-view-all sel-countries');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('zł PLN');
   await expect.soft(page.locator('.sel-item.sel-current')).toHaveScreenshot();

   await expect(page.locator('span.sel-title').first()).toHaveCSS('color', 'rgba(64, 104, 130, 0.8)');
   await expect(page.locator('.sel-itemsContainer').first()).toHaveCSS('background-color', 'rgb(177, 208, 221)');
});


test('9 Create selector, Country (Currency) S Language, Layered, Basic, Cold, Embedded position, Position - header right', async ({page, selectorPage}) => {
   await selectorPage.openApp();
   await selectorPage.createSelector();
   await selectorPage.selectResourse('Country (Currency) & Language');
   await selectorPage.selectType('Layered');
   await selectorPage.selectColor('Cold')
   await selectorPage.selectPosition('Embedded position', 'Position - header right');
   await selectorPage.display1(5);
   await selectorPage.displayCurrencyFormat(2);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('li[data-code="PL"]').hover();
   await expect(page.locator('.sel-item:hover').first()).toHaveCSS('color', 'rgb(71, 89, 126)');
   await page.locator('li[data-code="PL"]').click();
   await page.locator('li[data-code="uk"]').click();
   expect(await page.locator('[class="sel-item sel-current"]').first().getAttribute('data-code')).toEqual('PL');
   expect(await page.locator('[class="sel-item sel-current"]').last().getAttribute('data-code')).toEqual('uk');
   expect(await page.locator('selector-root').getAttribute('data-type')).toEqual('layered');
   await expect(page.locator('selector-root')).toHaveClass('needsclick sel-embedded sel-header-right');
   await expect(page.locator('[class="sel-item sel-current"]').first()).toHaveText('Poland (PLN zł)');
   await expect(page.locator('[class="sel-item sel-current"]').last()).toHaveText('Українська');
   await expect(page.locator('.sel-disclosure.sel-basic').first()).toHaveClass('sel-disclosure sel-basic sel-view-lang_names_country_all sel-languages_countries_curr');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('zł PLN');
   await expect(page.locator('header')).toContainText('додому');
   await expect.soft(page.locator('selector-root')).toHaveScreenshot();

   await expect(page.locator('span.sel-title').first()).toHaveCSS('color', 'rgba(41, 49, 95, 0.8)');
   await expect(page.locator('.sel-itemsContainer').first()).toHaveCSS('background-color', 'rgb(219, 230, 253)');
});



test('10 Create selector, Language S Currency, Popup, Dark Indigo, Embedded position, Position - header left', async ({page, selectorPage}) => {
   await selectorPage.openApp();
   await selectorPage.createSelector();
   await selectorPage.selectResourse('Language & Currency');
   await selectorPage.selectType('Popup');
   await selectorPage.selectColor('Dark Indigo')
   await selectorPage.selectPosition('Embedded position', 'Position - header left');
   await selectorPage.display1(0);
   await selectorPage.display2(1);
   await selectorPage.displayCurrencyIcon(1);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('[class="sel-firstChild sel-bothChild sel-languages"]').click()
   await page.locator('li[data-code="uk"]').click()
   await page.locator('[class="sel-secondChild sel-bothChild sel-currencies"]').click()
   await page.locator('span[data-code="PLN"]').hover()
   await expect(page.locator('.sel-item:hover').first()).toHaveCSS('color', 'rgb(236, 205, 164)');
   await page.locator('span[data-code="PLN"]').click();
   await expect(page.locator('header')).toContainText('додому');
   expect(await page.locator('selector-root').getAttribute('data-type')).toEqual('popup');
   await expect(page.locator('selector-root')).toHaveClass('needsclick sel-embedded sel-header-left');
   await expect(page.locator('.sel-disclosure.sel-basic').first()).toHaveClass('sel-disclosure sel-basic sel-view-all sel-languages_currencies');
   await expect(page.locator('[class="sel-secondChild sel-bothChild sel-currencies"]').locator('.sel-title').first()).toHaveText('Polish Złoty (zł)');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('zł PLN');
   await expect.soft(page.locator('selector-root')).toHaveScreenshot();

   await expect(page.locator('span.sel-title').first()).toHaveCSS('color', 'rgb(11, 223, 237)');
   await expect(page.locator('.sel-itemsContainer').first()).toHaveCSS('background-color', 'rgb(51, 49, 59)');

});


test('11 Create selector, Country S Language, Cascade, Black & white, Embedded position, Position - header center', async ({page, selectorPage}) => {
   await selectorPage.openApp();
   await selectorPage.createSelector();
   await selectorPage.selectResourse('Country & Language');
   await selectorPage.selectType('Cascade');
   await selectorPage.selectColor('Black & white')
   await selectorPage.selectPosition('Embedded position', 'Position - header center');
   await selectorPage.display1(7);
   await selectorPage.display2(0);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('[class="sel-disclosure-btn sel-view-names sel-top"]').click()
   await page.locator('span[data-code="uk"]').hover()
   await expect(page.locator('.sel-item:hover').first()).toHaveCSS('color', 'rgb(255, 255, 255)');
   await page.locator('span[data-code="uk"]').click()
   await expect(page.locator('header')).toContainText('додому')
   await page.locator('[class="sel-disclosure-btn sel-view-icons sel-iconsOnly sel-top"]').click()
   await page.locator('li[data-code="PL"]').click()
   expect(await page.locator('selector-root').getAttribute('data-type')).toEqual('cascade')
   await expect(page.locator('selector-root')).toHaveClass('needsclick sel-embedded sel-header-center');
   await expect(page.locator('.sel-secondChild .sel-title').first()).toContainText('Українська');
   await expect(page.locator('.sel-disclosure.sel-basic').first()).toHaveClass('sel-disclosure sel-basic sel-view-country_icons_lang_names sel-languages_countries_curr');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('zł PLN');
   await expect.soft(page.locator('selector-root')).toHaveScreenshot();

   await expect(page.locator('.sel-secondChild .sel-title').first()).toHaveCSS('color', 'rgb(245, 245, 245)');
   await expect(page.locator('li.sel-item').first()).toHaveCSS('background-color', 'rgb(18, 18, 18)');
});


test('12 Create selector, Currency, Sidebar, Jungle, Embedded position, Position - footer right', async ({page, selectorPage}) => {
   await selectorPage.openApp();
   await selectorPage.createSelector();
   await selectorPage.selectResourse('Currency');
   await selectorPage.selectType('Sidebar');
   await selectorPage.selectColor('Jungle')
   await selectorPage.selectPosition('Embedded position', 'Position - footer right');
   await selectorPage.display2(2);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('[class="sel-disclosure sel-basic sel-view-all sel-currencies"]').click();
   await page.locator('span[data-code="USD"]').click();
   await page.getByRole('button', { name: 'Apply' }).last().click();
   expect(await page.locator('[class="sel-item sel-current"]').getAttribute('data-code')).toEqual('USD');
   await expect(page.locator('[class="sel-item sel-current"]')).toHaveText('USD');
   expect(await page.locator('selector-root').getAttribute('data-type')).toEqual('sidebar');
   await expect(page.locator('selector-root')).toHaveClass('needsclick sel-embedded sel-footer-right');
   await expect(page.locator('.sel-iconWrapper').first()).toHaveClass('sel-iconWrapper sel-icon-curr');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
   await expect.soft(page.locator('selector-root')).toHaveScreenshot();

   await expect(page.locator('div.sel-icon-curr').first()).toHaveCSS('border-color', 'rgb(59, 16, 17)');
   await expect(page.locator('li.sel-current')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.8)');
   await expect(page.locator('div.sel-disclosure-btn')).toHaveCSS('background-color', 'rgb(81, 146, 89)');

});

test('13 Create selector, Language, Scale, Desert, Embedded position, Position - footer left', async ({page, selectorPage}) => {

   await selectorPage.openApp();
   await selectorPage.createSelector();
   await selectorPage.selectResourse('Language');
   await selectorPage.selectType('Scale');
   await selectorPage.selectColor('Desert')
   await selectorPage.selectPosition('Embedded position', 'Position - footer left');
   await selectorPage.display1(1);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('.sel-item-container').first().hover();
   await page.locator('li[data-title="Українська"]').click();
   await expect(page.locator('header')).toContainText('додому');
   expect(await page.locator('selector-root').getAttribute('data-type')).toEqual('scale');
   expect(await page.locator('.sel-iconWrapper .sel-icon').first().getAttribute('alt')).toEqual('languages icon');
   await expect.soft(page.locator('selector-root')).toHaveScreenshot();

   await expect(page.locator('li.sel-item').first()).toHaveCSS('color', 'rgba(142, 151, 117, 0.8)');
   await expect(page.locator('.sel-blob-container')).toHaveCSS('background-color', 'rgb(250, 242, 218)');


});

test('14 Create selector, Country, Tape-Line, North, Embedded position, Position - footer center', async ({page, selectorPage}) => {
   await selectorPage.openApp();
   await selectorPage.createSelector();
   await selectorPage.selectResourse('Country');
   await selectorPage.selectType('Tape-line');
   await selectorPage.selectColor('North');
   await selectorPage.selectPosition('Embedded position', 'Position - footer center');
   await selectorPage.display1(1);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('[class="sel-item sel-current"]').first().hover();
   await page.locator('li[data-code="US"]').first().click();
   await expect(page.locator('span.sel-title').first()).toHaveClass('sel-title sel-uppercase');
   expect(await page.locator('[class="sel-item sel-current"]').getAttribute('data-code')).toEqual('US');
   expect(await page.locator('selector-root').getAttribute('data-type')).toEqual('meter');
   await expect.soft(page.locator('selector-root')).toHaveScreenshot();

   await expect(page.locator('li.sel-item').first()).toHaveCSS('color', 'rgba(54, 106, 135, 0.8)');
   await expect(page.locator('.sel-blob-container')).toHaveCSS('background-color', 'rgb(255, 255, 255)');

});





// Sunny
// Beet
// Chocolate
// Turquoise