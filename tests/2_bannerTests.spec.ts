import { expect } from '@playwright/test';
import { test } from '../fixtures/fixturePages';


///???
test('38 Display when necessary, Language, Banner, Basic, Position - top center', async ({ openBanner, page, selectorPage, bannerPage }) => {
   await selectorPage.selectType('Banner');
   await selectorPage.changeSizeSlider(50);
   await bannerPage.selectPosition('Position - top center');
   await bannerPage.selectAnimationStyle('fade');
   await selectorPage.fontSettings(2, 'Arial', 'normal', 0);
   await selectorPage.fontSettings(1, 'Arial', 'normal', 60);
   await selectorPage.fontSettings(0, 'Arial', 'normal', -50);
   await bannerPage.displayOption('Display when necessary');
   await selectorPage.selectResourse('Language');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect.soft(page.locator('.adt-main')).toHaveScreenshot();
   await expect(page.locator('div.adt-top-static')).toBeVisible();
   await expect(page.locator('.adt-disclosure-btn')).toHaveAttribute('data-code', 'en');
   await page.locator('.adt-disclosure-btn').click();
   await page.locator('li[data-code="uk"]').hover();
   await expect(page.locator('.adt-item:hover').first()).toHaveCSS('color', 'rgb(32, 34, 35)');
   await bannerPage.checkFontSettings('18.26px', '400', 'Arial', "\"Arial\"");
   await page.locator('li[data-code="uk"]').click();
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('header')).toContainText('додому');
   const bannerExists = await page.waitForSelector('.adt-main', { state: 'visible', timeout: 1000 }).then(() => true).catch(() => false);
   expect(bannerExists).toBeFalsy();
   await page.goto('https://qafm30-11.myshopify.com');
   await expect(page.locator('.adt-disclosure-btn')).toHaveAttribute('data-code', 'en');
   await expect(page.locator('.adt-description')).toHaveCSS('color', 'rgb(32, 34, 35)');
   await expect(page.locator('div.adt-backdrop')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('header')).toContainText('Home');

});


test('39 Remember choice, Currency, Banner, Arctic, Position - bottom center', async ({ openBanner, page, selectorPage, bannerPage }) => {
   await selectorPage.selectType('Banner');
   await selectorPage.changeSizeSlider(100);
   await selectorPage.selectColor('Arctic');
   await bannerPage.selectPosition('Position - bottom center');
   await bannerPage.selectAnimationStyle('slide');
   await selectorPage.fontSettings(2, 'Arial Black', 'bold', 80);
   await selectorPage.fontSettings(1, 'Arial Black', 'bold', 80);
   await selectorPage.fontSettings(0, 'Arial Black', 'bold', 80);
   await bannerPage.displayOption('Remember choice');
   await selectorPage.selectResourse('Currency');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect.soft(page.locator('.adt-main')).toHaveScreenshot({ maxDiffPixels: 65 });
   await expect(page.locator('div.adt-bottom-center')).toBeVisible();
   await expect(page.locator('.adt-disclosure-btn')).toHaveAttribute('data-code', 'UAH');
   await expect(page.locator('.adt-description')).toHaveCSS('color', 'rgb(65, 0, 1)');
   await expect(page.locator('div.adt-backdrop')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
   await page.locator('.adt-disclosure-btn').click();
   await page.waitForTimeout(500)
   await page.locator('li[data-code="PLN"]').hover();
   await page.waitForTimeout(500)
   await expect(page.locator('.adt-item:hover').first()).toHaveCSS('color', 'rgb(1, 125, 125)');
   await bannerPage.checkFontSettings('9.24px', '700', 'Arial Black', "\"Arial Black\"");
   await page.locator('li[data-code="PLN"]').click();
   await page.waitForTimeout(500)
   await page.locator('.adt-changeBtn').click();
   await page.waitForTimeout(500);
   await page.waitForLoadState('load');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
   const bannerExists = await page.waitForSelector('.adt-main', { state: 'visible', timeout: 1000 }).then(() => true).catch(() => false);
   expect(bannerExists).toBeFalsy();
   await page.goto('https://qafm30-11.myshopify.com');
   await page.waitForLoadState('load');
   expect(bannerExists).toBeFalsy();
   await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');

});


test('40 Display once, Language & Currency, Popup, Wild West, Position - top left', async ({ openBanner, page, selectorPage, bannerPage }) => {
   await selectorPage.selectType('Popup');
   await selectorPage.selectColor('Wild West');
   await bannerPage.selectPosition('Position - top left');
   await selectorPage.changeSizeSlider(-50);
   await bannerPage.selectAnimationStyle('fade');
   await selectorPage.fontSettings(2, 'Comic Sans', 'italic', -50);
   await selectorPage.fontSettings(1, 'Comic Sans', 'italic', -60);
   await selectorPage.fontSettings(0, 'Comic Sans', 'italic', -60);
   await bannerPage.displayOption('Display once');
   await selectorPage.selectResourse('Language & Currency');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect.soft(page.locator('.adt-main')).toHaveScreenshot({ maxDiffPixels: 65 });
   await expect(page.locator('div.adt-top-left')).toBeVisible();
   await expect(page.locator('.adt-description')).toHaveCSS('color', 'rgb(56, 58, 21)');
   await expect(page.locator('div.adt-backdrop')).toHaveCSS('background-color', 'rgb(255, 239, 215)');
   await expect(page.locator('.adt-disclosure-btn[data-resource="languages"]')).toHaveAttribute('data-code', 'en');
   await page.locator('.adt-disclosure-btn[data-resource="languages"]').click();
   await page.waitForTimeout(500);
   await page.locator('li[data-code="uk"]').click();
   await page.locator('.adt-disclosure-btn[data-resource="currencies"]').click();
   await page.locator('li[data-code="PLN"]').hover();
   await page.waitForTimeout(500);
   await expect(page.locator('.adt-item:hover').first()).toHaveCSS('color', 'rgb(150, 51, 28)');
   await expect(page.locator('.adt-item:hover .adt-itemText')).toHaveCSS('font-style', 'italic');
   await bannerPage.checkFontSettings('30.42px', '400', 'Comic Sans', "\"Comic Sans\"");
   await page.locator('li[data-code="PLN"]').click();
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
   await expect(page.locator('header')).toContainText('додому');
   const bannerExists = await page.waitForSelector('.adt-main', { state: 'visible', timeout: 1000 }).then(() => true).catch(() => false);
   expect(bannerExists).toBeFalsy();
   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await page.waitForLoadState('load');
   expect(bannerExists).toBeFalsy();
   await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');

});


test('41 Display for everyone, Country & Language, Popup, Winter, Position - top right', async ({ openBanner, page, selectorPage, bannerPage }) => {
   await selectorPage.selectType('Popup');
   await selectorPage.selectColor('Winter');
   await bannerPage.selectPosition('Position - top right');
   await selectorPage.changeSizeSlider(-50);
   await bannerPage.selectAnimationStyle('slide');
   await selectorPage.fontSettings(2, 'Courier New', 'boldItalic', -50);
   await selectorPage.fontSettings(1, 'Courier New', 'boldItalic', -30);
   await selectorPage.fontSettings(0, 'Courier New', 'boldItalic', -30);
   await bannerPage.displayOption('Display for everyone');
   await selectorPage.selectResourse('Country & Language');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect.soft(page.locator('div.adt-top-right')).toHaveScreenshot({ maxDiffPixels: 65 });
   await expect(page.locator('div.adt-top-right')).toBeVisible();
   await expect(page.locator('.adt-description')).toHaveCSS('color', 'rgb(64, 104, 130)');
   await expect(page.locator('div.adt-backdrop')).toHaveCSS('background-color', 'rgb(177, 208, 221)');
   await expect(page.locator('.adt-disclosure-btn[data-resource="countries"]')).toHaveAttribute('data-code', 'UA');
   await page.locator('.adt-disclosure-btn[data-resource="countries"]').click();
   await page.waitForTimeout(500);
   await page.locator('li[data-code="PL"]').click();
   await page.locator('.adt-disclosure-btn[data-resource="languages"]').click();
   await page.locator('li[data-code="uk"]').hover();
   await page.waitForTimeout(500);
   await expect(page.locator('.adt-item:hover').first()).toHaveCSS('color', 'rgb(26, 55, 77)');
   await expect(page.locator('.adt-item:hover .adt-itemText')).toHaveCSS('font-style', 'italic');
   await bannerPage.checkFontSettings('30.42px', '700', 'Courier New', "\"Courier New\"");
   await page.locator('li[data-code="uk"]').click();
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
   await expect(page.locator('header')).toContainText('додому');
   await expect(page.locator('.adt-main')).not.toBeVisible();
   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await page.waitForLoadState('load');
   await page.waitForTimeout(500);
   await expect(page.locator('.adt-main')).not.toBeVisible();
   await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');;

});


test('42 Display when necessary, Country (Currency), Box, Dark Indigo', async ({ openBanner, page, selectorPage, bannerPage }) => {
   await bannerPage.displayOption('Display when necessary');
   await selectorPage.selectResourse('Country (Currency)');
   await selectorPage.selectType('Box');
   await selectorPage.selectColor('Dark Indigo')
   await selectorPage.changeSizeSlider(-50);
   await bannerPage.selectAnimationStyle('slide');
   await selectorPage.fontSettings(2, 'Charcoal', 'boldItalic', 50);
   await selectorPage.fontSettings(1, 'Charcoal', 'boldItalic', 50);
   await selectorPage.fontSettings(0, 'Charcoal', 'boldItalic', 50);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect.soft(page.locator('div.adt-center-center')).toHaveScreenshot();
   await expect(page.locator('.adt-item').first()).toHaveAttribute('data-code', 'UA');
   await page.locator('li[data-code="PL"]').hover();
   await expect(page.locator('.adt-item:hover').first()).toHaveCSS('color', 'rgb(236, 205, 164)');
   await expect(page.locator('.adt-item:hover .adt-itemText')).toHaveCSS('font-style', 'italic');
   await bannerPage.checkFontSettings('19.89px', '700', 'Charcoal', "\"Charcoal\"");
   await page.locator('li[data-code="PL"]').click();
   await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
   await expect(page.locator('.adt-container')).not.toBeVisible();
   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect(page.locator('.adt-description')).toHaveCSS('color', 'rgb(11, 223, 237)');
   await expect(page.locator('.adt-container')).toHaveCSS('background-color', 'rgb(51, 49, 59)');
   await page.locator('.adt-close').click();
   await page.waitForTimeout(500);
   await expect(page.locator('.adt-container')).not.toBeVisible();
   await page.locator('[aria-describedby="HeaderCountryLabel"]').click()
   await page.locator('.disclosure__item', { hasText: 'PLN' }).nth(1).click();
   await page.locator('[aria-describedby="HeaderLanguageLabel"]').click()
   await page.locator('.disclosure__item', { hasText: 'Українська' }).nth(1).click();
   await page.waitForLoadState('load');
   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect(page.locator('.adt-item').first()).toHaveAttribute('data-code', 'UA');

});


test('43 Remember choice, Language, Box, Black & white', async ({ openBanner, page, selectorPage, bannerPage }) => {
   await bannerPage.displayOption('Remember choice');
   await selectorPage.selectResourse('Language');
   await selectorPage.selectType('Box');
   await selectorPage.selectColor('Black & white');
   await selectorPage.changeSizeSlider(-70);
   await bannerPage.selectAnimationStyle('fade');
   await selectorPage.fontSettings(2, 'Times', 'bold', 60);
   await selectorPage.fontSettings(1, 'Times', 'bold', 60);
   await selectorPage.fontSettings(0, 'Times', 'bold', 60);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect.soft(page.locator('div.adt-center-center')).toHaveScreenshot();
   await expect(page.locator('.adt-description')).toHaveCSS('color', 'rgb(245, 245, 245)');
   await expect(page.locator('.adt-container')).toHaveCSS('background-color', 'rgb(18, 18, 18)');
   await expect(page.locator('.adt-item').first()).toHaveAttribute('data-code', 'en');
   await page.locator('li[data-code="uk"]').hover();
   await expect(page.locator('.adt-item:hover').first()).toHaveCSS('color', 'rgb(255, 255, 255)');
   await bannerPage.checkFontSettings('19.84px', '700', 'Times', "\"Times\"");
   await page.locator('li[data-code="uk"]').click();
   await expect(page.locator('header')).toContainText('додому');
   await expect(page.locator('.adt-container')).not.toBeVisible();
   await page.goto('https://qafm30-11.myshopify.com/');
   await page.waitForLoadState('load');
   await page.waitForTimeout(500);
   await expect(page.locator('.adt-container')).not.toBeVisible();
   await expect(page.locator('header')).toContainText('додому');

});


test('44 Display once, Country & Language, Modal, Cold', async ({ openBanner, page, selectorPage, bannerPage }) => {
   await bannerPage.displayOption('Display once');
   await selectorPage.selectResourse('Country & Language');
   await selectorPage.selectType('Modal');
   await selectorPage.selectColor('Cold')
   await selectorPage.changeSizeSlider(-50);
   await bannerPage.selectAnimationStyle('fade');
   await selectorPage.fontSettings(2, 'Verdana', 'bold', -50);
   await selectorPage.fontSettings(1, 'Verdana', 'bold', 40);
   await selectorPage.fontSettings(0, 'Verdana', 'bold', 40);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect.soft(page.locator('.adt-main')).toHaveScreenshot({ maxDiffPixels: 65 });
   await expect(page.locator('div.adt-center-center')).toBeVisible();
   await expect(page.locator('.adt-description')).toHaveCSS('color', 'rgb(41, 49, 95)');
   await expect(page.locator('div.adt-backdrop')).toHaveCSS('background-color', 'rgb(219, 230, 253)');
   await expect(page.locator('.adt-disclosure-btn[data-resource="countries"]')).toHaveAttribute('data-code', 'UA');
   await expect(page.locator('.adt-disclosure-btn[data-resource="languages"]')).toHaveAttribute('data-code', 'en');
   await page.locator('.adt-disclosure-btn[data-resource="languages"]').click();
   await page.locator('li[data-code="uk"]').click();
   await page.locator('.adt-disclosure-btn[data-resource="countries"]').click();
   await page.locator('li[data-code="PL"]').hover();
   await expect(async () => {
      await expect(page.locator('.adt-item:hover').first()).toHaveCSS('color', 'rgb(71, 89, 126)');
      await bannerPage.checkFontSettings('30.42px', '700', 'Verdana', "\"Verdana\"");
   }).toPass({timeout: 15000});
   await page.locator('li[data-code="PL"]').click();
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
   await expect(page.locator('header')).toContainText('додому');
   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect(async () => {
      await expect(page.locator('.adt-main')).not.toBeVisible();
      await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
      await expect(page.locator('header')).toContainText('Home');
   }).toPass({timeout: 15000});

});


test('45 Display for everyone, Country (Currency) & Language, Modal, Jungle', async ({ openBanner, page, selectorPage, bannerPage }) => {
   await bannerPage.displayOption('Display for everyone');
   await selectorPage.selectResourse('Country (Currency) & Language');
   await selectorPage.selectType('Modal');
   await selectorPage.selectColor('Jungle')
   await selectorPage.changeSizeSlider(-50);
   await bannerPage.selectAnimationStyle('slide');
   await selectorPage.fontSettings(2, 'Helvetica', 'normal', 80);
   await selectorPage.fontSettings(1, 'Helvetica', 'normal', 80);
   await selectorPage.fontSettings(0, 'Helvetica', 'normal', 80);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect.soft(page.locator('.adt-main')).toHaveScreenshot({ maxDiffPixels: 65 });
   await expect(page.locator('div.adt-center-center')).toBeVisible();
   await expect(page.locator('.adt-description')).toHaveCSS('color', 'rgb(59, 16, 17)');
   await expect(page.locator('div.adt-backdrop')).toHaveCSS('background-color', 'rgb(81, 146, 89)');
   await expect(page.locator('.adt-disclosure-btn[data-resource="countries"]')).toHaveAttribute('data-code', 'UA');
   await expect(page.locator('.adt-disclosure-btn[data-resource="languages"]')).toHaveAttribute('data-code', 'en');
   await page.locator('.adt-disclosure-btn[data-resource="countries"]').click();
   await page.waitForTimeout(500);
   await page.locator('li[data-code="PL"]').click();
   await page.locator('.adt-disclosure-btn[data-resource="languages"]').click();
   await page.locator('li[data-code="uk"]').hover();
   await page.waitForTimeout(500);
   await expect(page.locator('.adt-item:hover').first()).toHaveCSS('color', 'rgb(0, 0, 0)');
   await bannerPage.checkFontSettings('16.38px', '400', 'Helvetica', "\"Helvetica\"");
   await page.locator('li[data-code="uk"]').click();
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
   await expect(page.locator('header')).toContainText('додому');
   await expect(page.locator('.adt-main')).not.toBeVisible();
   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect(async () => {
      await expect(page.locator('.adt-main')).not.toBeVisible();
      await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');;
   }).toPass({timeout: 15000});
});



test('46 Display when necessary, Language & Currency, Page, Desert, Position - center left', async ({ openBanner, page, selectorPage, bannerPage }) => {

   await selectorPage.selectType('Page');
   await selectorPage.selectColor('Desert')
   await bannerPage.selectPosition('Position - center left');
   await selectorPage.changeSizeSlider(-50);
   await bannerPage.selectAnimationStyle('slide');
   await selectorPage.fontSettings(2, 'Lucida Console', 'normal', 90);
   await selectorPage.fontSettings(1, 'Lucida Console', 'normal', 90);
   await selectorPage.fontSettings(0, 'Lucida Console', 'normal', 90);
   await bannerPage.displayOption('Display when necessary');
   await selectorPage.selectResourse('Language & Currency');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect.soft(page.locator('.adt-main')).toHaveScreenshot();
   await expect(page.locator('div.adt-center-left')).toBeVisible();
   await page.locator('.adt-disclosure-btn[data-resource="currencies"]').click();
   await page.locator('li[data-code="PLN"]').click();
   await page.locator('.adt-disclosure-btn[data-resource="languages"]').click();
   await page.locator('li[data-code="uk"]').hover();
   await page.waitForTimeout(500);
   await expect(page.locator('.adt-item:hover').first()).toHaveCSS('color', 'rgb(226, 143, 131)');
   await bannerPage.checkFontSettings('15.21px', '400', 'Lucida Console', "\"Lucida Console\"");
   await page.locator('li[data-code="uk"]').click();
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('header')).toContainText('додому');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
   await page.goto('https://qafm30-11.myshopify.com');
   await expect(page.locator('.adt-disclosure-btn[data-resource="currencies"]')).toHaveAttribute('data-code', 'UAH');
   await expect(page.locator('.adt-disclosure-btn[data-resource="languages"]')).toHaveAttribute('data-code', 'en');
   await expect(page.locator('.adt-description')).toHaveCSS('color', 'rgb(142, 151, 117)');
   await expect(page.locator('div.adt-backdrop')).toHaveCSS('background-color', 'rgb(250, 242, 218)');
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('header')).toContainText('Home');

});


test('47 Remember choice, Country & Language, Page, North, Position - center center', async ({ openBanner, page, selectorPage, bannerPage }) => {

   await selectorPage.selectType('Page');
   await selectorPage.selectColor('North');
   await bannerPage.selectPosition('Position - center center');
   await selectorPage.changeSizeSlider(-50);
   await bannerPage.selectAnimationStyle('fade');
   await selectorPage.fontSettings(2, ' Lucida Grande', 'bold', -50);
   await selectorPage.fontSettings(1, ' Lucida Grande', 'bold', -50);
   await selectorPage.fontSettings(0, ' Lucida Grande', 'bold', -40);
   await bannerPage.displayOption('Remember choice');
   await selectorPage.selectResourse('Country & Language');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect.soft(page.locator('.adt-main')).toHaveScreenshot({ maxDiffPixels: 65 });
   await expect(page.locator('div.adt-center-center')).toBeVisible();
   await expect(page.locator('.adt-description')).toHaveCSS('color', 'rgb(54, 106, 135)');
   await expect(page.locator('div.adt-backdrop')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
   await expect(page.locator('.adt-disclosure-btn[data-resource="countries"]')).toHaveAttribute('data-code', 'UA');
   await expect(page.locator('.adt-disclosure-btn[data-resource="languages"]')).toHaveAttribute('data-code', 'en');
   await page.locator('.adt-disclosure-btn[data-resource="countries"]').click();
   await page.locator('li[data-code="PL"]').click();
   await page.locator('.adt-disclosure-btn[data-resource="languages"]').click();
   await page.locator('li[data-code="uk"]').hover();
   await page.waitForTimeout(500);
   await expect(page.locator('.adt-item:hover').first()).toHaveCSS('color', 'rgb(47, 135, 135)');
   await bannerPage.checkFontSettings('30.42px', '700', 'Lucida Grande', "\"Lucida Grande\"");
   await page.locator('li[data-code="uk"]').click();
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
   await expect(page.locator('header')).toContainText('додому');
   await expect(page.locator('.adt-main')).not.toBeVisible();
   await page.goto('https://qafm30-11.myshopify.com/');
   await page.waitForLoadState('load');
   await page.waitForTimeout(500);
   await expect(page.locator('.adt-main')).not.toBeVisible();
   await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
   await expect(page.locator('header')).toContainText('додому');

});


test('48 Display once, Country (Currency) & Language, Page, Sunny, Position - center right', async ({ openBanner, page, selectorPage, bannerPage }) => {

   await selectorPage.selectType('Page');
   await selectorPage.selectColor('Sunny');
   await bannerPage.selectPosition('Position - center right');
   await selectorPage.changeSizeSlider(-50);
   await bannerPage.selectAnimationStyle('fade');
   await selectorPage.fontSettings(2, 'Palatino Linotype', 'italic', 20);
   await selectorPage.fontSettings(1, 'Palatino Linotype', 'italic', 20);
   await selectorPage.fontSettings(0, 'Palatino Linotype', 'italic', 30);
   await bannerPage.displayOption('Display once');
   await selectorPage.selectResourse('Country (Currency) & Language');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect.soft(page.locator('.adt-main')).toHaveScreenshot({ maxDiffPixels: 65 });
   await expect(page.locator('div.adt-center-right')).toBeVisible();
   await expect(page.locator('.adt-description')).toHaveCSS('color', 'rgb(10, 1, 1)');
   await expect(page.locator('div.adt-backdrop')).toHaveCSS('background-color', 'rgb(255, 225, 98)');
   await expect(page.locator('.adt-disclosure-btn[data-resource="countries"]')).toHaveAttribute('data-code', 'UA');
   await expect(page.locator('.adt-disclosure-btn[data-resource="languages"]')).toHaveAttribute('data-code', 'en');
   await page.locator('.adt-disclosure-btn[data-resource="languages"]').click();
   await page.locator('li[data-code="uk"]').click();
   await page.locator('.adt-disclosure-btn[data-resource="countries"]').click();
   await page.locator('li[data-code="PL"]').hover();
   await page.waitForTimeout(500);
   await expect(page.locator('.adt-item:hover').first()).toHaveCSS('color', 'rgb(74, 69, 108)');
   await expect(page.locator('.adt-item:hover .adt-itemText').first()).toHaveCSS('font-style', 'italic');
   await bannerPage.checkFontSettings('23.4px', '400', 'Palatino Linotype', "\"Palatino Linotype\"");
   await page.locator('li[data-code="PL"]').click();
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
   await expect(page.locator('header')).toContainText('додому');

   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect(async () => {
      await expect(page.locator('.adt-main')).not.toBeVisible();
      await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
      await expect(page.locator('header')).toContainText('Home');
  }).toPass({timeout: 15000});

});


test('49 Display for everyone, Language, Page, Beet, Position - bottom left', async ({ openBanner, page, selectorPage, bannerPage }) => {

   await selectorPage.selectType('Page');
   await selectorPage.selectColor('Beet')
   await bannerPage.selectPosition('Position - bottom left');
   await selectorPage.changeSizeSlider(-50);
   await bannerPage.selectAnimationStyle('slide');
   await selectorPage.fontSettings(2, ' Lucida Sans Unicode', 'bold', 30);
   await selectorPage.fontSettings(1, ' Lucida Sans Unicode', 'bold', 40);
   await selectorPage.fontSettings(0, ' Lucida Sans Unicode', 'bold', 40);
   await bannerPage.displayOption('Display for everyone');
   await selectorPage.selectResourse('Language');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect.soft(page.locator('.adt-main')).toHaveScreenshot({ maxDiffPixels: 65 });
   await expect(page.locator('div.adt-bottom-left')).toBeVisible();
   await expect(page.locator('.adt-description')).toHaveCSS('color', 'rgb(255, 255, 255)');
   await expect(page.locator('div.adt-backdrop')).toHaveCSS('background-color', 'rgb(120, 28, 104)');
   await expect(page.locator('.adt-disclosure-btn')).toHaveAttribute('data-code', 'en');
   await page.locator('.adt-disclosure-btn').click();
   await page.locator('li[data-code="uk"]').hover();
   await page.waitForTimeout(500);
   await expect(page.locator('.adt-item:hover').first()).toHaveCSS('color', 'rgb(255, 255, 255)');
   await bannerPage.checkFontSettings('22.23px', '700', 'Lucida Sans Unicode', "\"Lucida Sans Unicode\"");
   await page.locator('li[data-code="uk"]').click();
   await page.waitForTimeout(500);
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('header')).toContainText('додому');
   await expect(page.locator('.adt-main')).not.toBeVisible();
   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect(async () => {
      await expect(page.locator('.adt-main')).not.toBeVisible();
      await expect(page.locator('header')).toContainText('Home');   
  }).toPass({timeout: 15000});
});

///??????????????
test('50 Remember choice, Currency, Popup, Chocolate, Position - bottom right', async ({ openBanner, page, selectorPage, bannerPage }) => {

   await selectorPage.selectType('Popup');
   await selectorPage.selectColor('Chocolate');
   await bannerPage.selectPosition('Position - bottom right');
   await selectorPage.changeSizeSlider(50);
   await bannerPage.selectAnimationStyle('fade');
   await selectorPage.fontSettings(2, 'Georgia', 'normal', 40);
   await selectorPage.fontSettings(1, 'Georgia', 'normal', 40);
   await selectorPage.fontSettings(0, 'Georgia', 'normal', 50);
   await bannerPage.displayOption('Remember choice');
   await selectorPage.selectResourse('Currency');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect.soft(page.locator('.adt-main')).toHaveScreenshot({ maxDiffPixels: 65 });
   await expect(page.locator('div.adt-bottom-right')).toBeVisible();
   await expect(page.locator('.adt-disclosure-btn')).toHaveAttribute('data-code', 'UAH');
   await expect(page.locator('.adt-description')).toHaveCSS('color', 'rgb(255, 255, 255)');
   await expect(page.locator('div.adt-backdrop')).toHaveCSS('background-color', 'rgb(92, 56, 56)');
   await page.locator('.adt-disclosure-btn').click();
   await page.waitForTimeout(500)
   await page.locator('li[data-code="PLN"]').hover();
   await page.waitForTimeout(500)
   await expect(page.locator('.adt-item:hover').first()).toHaveCSS('color', 'rgb(236, 225, 225)');
   await bannerPage.checkFontSettings('14.94px', '400', 'Georgia', "\"Georgia\"");
   await page.locator('li[data-code="PLN"]').click();
   await page.waitForTimeout(500)
   await page.locator('.adt-changeBtn').click();
   await expect(async () => {
      await expect(page.locator('.adt-main')).not.toBeVisible();
      await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
   }).toPass({timeout: 15000});
   await page.goto('https://qafm30-11.myshopify.com');
   await expect(async () => {
      await expect(page.locator('.adt-main')).not.toBeVisible();
      await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
   }).toPass({timeout: 15000});

});


test('51 Display when necessary, Country, Popup, Turquoise, Position - center center', async ({ openBanner, page, selectorPage, bannerPage }) => {

   await selectorPage.selectType('Popup');
   await selectorPage.selectColor('Turquoise');
   await bannerPage.selectPosition('Position - center center');
   await selectorPage.changeSizeSlider(-50);
   await bannerPage.selectAnimationStyle('slide');
   await selectorPage.fontSettings(2, 'Impact', 'normal', -20);
   await selectorPage.fontSettings(1, 'Impact', 'normal', -30);
   await selectorPage.fontSettings(0, 'Impact', 'normal', -30);
   await bannerPage.displayOption('Display when necessary');
   await selectorPage.selectResourse('Country');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect.soft(page.locator('.adt-main')).toHaveScreenshot();
   await expect(page.locator('div.adt-center-center')).toBeVisible();
   await expect(page.locator('.adt-disclosure-btn')).toHaveAttribute('data-code', 'UA');
   await expect(page.locator('.adt-description')).toHaveCSS('color', 'rgb(10, 11, 0)');
   await expect(page.locator('div.adt-backdrop')).toHaveCSS('background-color', 'rgb(40, 255, 191)');
   await page.locator('.adt-disclosure-btn').click();
   await page.locator('li[data-code="PL"]').hover();
   await expect(page.locator('.adt-item:hover').first()).toHaveCSS('color', 'rgb(10, 88, 88)');
   await bannerPage.checkFontSettings('26.91px', '400', 'Impact', "\"Impact\"");
   await page.locator('li[data-code="PL"]').click();
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
   await page.goto('https://qafm30-11.myshopify.com/en-ja');
   await expect(page.locator('.adt-disclosure-btn')).toHaveAttribute('data-code', 'UA');
   await page.locator('.adt-close').click();
   await expect(async () => {
      await expect(page.locator('.adt-main')).not.toBeVisible();
   }).toPass({timeout: 15000});

});


test('52 change bunner color by paste,', async ({ openBanner, page, selectorPage, bannerPage }) => {

   await selectorPage.changeSizeSlider(-50);
   await selectorPage.setColorPaste('Text', 'Accent', 'Background');
   await selectorPage.fontSettings(2, 'Custom', 'normal', -40, 'Garamond',)
   await selectorPage.fontSettings(1, 'Custom', 'normal', -40, 'Garamond',)
   await selectorPage.fontSettings(0, 'Custom', 'normal', -30, 'Garamond');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect.soft(page.locator('.adt-main')).toHaveScreenshot({ maxDiffPixels: 65 });
   await expect(page.locator('.adt-description')).toHaveCSS('color', 'rgb(255, 40, 47)');
   await expect(page.locator('div.adt-backdrop')).toHaveCSS('background-color', 'rgb(108, 255, 40)');
   await expect(page.locator('.adt-disclosure-btn[data-resource="countries"]')).toHaveAttribute('data-code', 'UA');
   await expect(page.locator('.adt-disclosure-btn[data-resource="languages"]')).toHaveAttribute('data-code', 'en');
   await page.locator('.adt-disclosure-btn[data-resource="countries"]').click();
   await page.waitForTimeout(500);
   await page.locator('li[data-code="PL"]').click();
   await page.locator('.adt-disclosure-btn[data-resource="languages"]').click();
   await page.locator('li[data-code="uk"]').hover();
   await page.waitForTimeout(500);
   await expect(page.locator('.adt-item:hover').first()).toHaveCSS('color', 'rgb(40, 47, 255)');
   await bannerPage.checkFontSettings('29.25px', '400', 'Garamond', "\"Garamond\"");
   await page.locator('li[data-code="uk"]').click();
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
   await expect(page.locator('header')).toContainText('додому');

});

test('53 change bunner color by sliders,', async ({ openBanner, page, selectorPage, bannerPage }) => {
   await bannerPage.displayOption('Display once');
   await selectorPage.selectResourse('Country');
   await selectorPage.selectType('Popup');
   await bannerPage.selectPosition('Position - center center');
   await selectorPage.changeSizeSlider(50);
   await selectorPage.selectColor('Winter')
   await selectorPage.setColorSliders('Text');
   await selectorPage.setColorSliders2('Accent');
   await selectorPage.setColorSliders3('Background');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect.soft(page.locator('.adt-main')).toHaveScreenshot({ maxDiffPixels: 65 });
   await expect(page.locator('div.adt-center-center')).toBeVisible();
   await expect.soft(page.locator('.adt-description')).toHaveCSS('color', 'rgb(174, 210, 38)');
   await expect(page.locator('div.adt-backdrop')).toHaveCSS('background-color', 'rgb(222, 65, 65)');
   await expect(page.locator('.adt-disclosure-btn')).toHaveAttribute('data-code', 'UA');
   await page.locator('.adt-disclosure-btn').click();
   await page.locator('li[data-code="PL"]').hover();
   await page.waitForTimeout(500);
   await expect.soft(page.locator('.adt-item:hover').first()).toHaveCSS('color', 'rgb(158, 78, 34)');
   await page.locator('li[data-code="PL"]').click();
   await page.locator('.adt-close').click();
   await expect(async () => {
      await expect(page.locator('.adt-main')).not.toBeVisible();
   }).toPass({timeout: 15000});
   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect(async () => {
      await expect(page.locator('.adt-main')).not.toBeVisible();
   }).toPass({timeout: 15000});
});



test('54 Banner cant be closed, Show flag, borders', async ({ openBanner, page, selectorPage, bannerPage }) => {

   await selectorPage.selectType('Banner');
   await selectorPage.changeSizeSlider(50);
   await bannerPage.borderradius('Border radius', '22')
   await bannerPage.borderradius('Input button radius', '22')
   await bannerPage.borderradius('Primary button radius', '22')
   await bannerPage.borderStyle('Border style', 'Solid')
   await bannerPage.borderStyle('Input button style', 'Solid')
   await bannerPage.borderStyle('Primary button style', 'Solid')
   await bannerPage.borderWidth('Border width', '22')
   await bannerPage.borderWidth('Input button width', '22')
   await bannerPage.borderWidth('Primary button width', '22')
   await selectorPage.setColorPaste('Border color', 'Input button color', 'Primary button color');
   await bannerPage.themeCheckbox('Show flag', 'false');
   await bannerPage.themeCheckbox('Banner can be closed', 'false');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect.soft(page.locator('.adt-container')).toHaveScreenshot({ maxDiffPixels: 65 });
   await bannerPage.checkMainBorderSettings('.adt-container', 'solid', 'rgb(255, 40, 47)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px');
   await bannerPage.checkPrimaryButtonBorderSettings('solid', 'rgb(40, 47, 255)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px', '22px', '22px');
   await bannerPage.checkSecondaryButtonBorderSettings('solid', 'rgb(108, 255, 40)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px', '22px', '22px');
   await expect(page.locator('.adt-flag')).not.toBeVisible();
   await expect(page.locator('.adt-close')).not.toBeVisible();
   await page.locator('.product-card-wrapper').first().click({ force: true });
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('header')).toContainText('Home');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');;

});

test('55 Popup cant be closed, Show flag, borders', async ({ openBanner, page, selectorPage, bannerPage }) => {
   await selectorPage.selectType('Popup');
   await selectorPage.changeSizeSlider(50);
   await bannerPage.borderradius('Border radius', '22')
   await bannerPage.borderradius('Input button radius', '22')
   await bannerPage.borderradius('Primary button radius', '22')
   await bannerPage.borderStyle('Border style', 'Dashed')
   await bannerPage.borderStyle('Input button style', 'Dashed')
   await bannerPage.borderStyle('Primary button style', 'Dashed')
   await bannerPage.borderWidth('Border width', '22')
   await bannerPage.borderWidth('Input button width', '22')
   await bannerPage.borderWidth('Primary button width', '22')
   await selectorPage.setColorSliders('Border color');
   await selectorPage.setColorSliders2('Input button color');
   await selectorPage.setColorSliders3('Primary button color');
   await bannerPage.themeCheckbox('Show flag', 'false');
   await bannerPage.themeCheckbox('Banner can be closed', 'false');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect.soft(page.locator('.adt-container')).toHaveScreenshot({ maxDiffPixels: 65 });
   await bannerPage.checkMainBorderSettings('.adt-container', 'dashed', 'rgba(107, 115, 69, 0.184)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px');
   await bannerPage.checkPrimaryButtonBorderSettings('dashed', 'rgba(115, 97, 91, 0.184)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px', '22px', '22px');
   await bannerPage.checkSecondaryButtonBorderSettings('dashed', 'rgb(35, 14, 14)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px', '22px', '22px');
   await expect(page.locator('.adt-flag')).not.toBeVisible();
   await expect(page.locator('.adt-close')).not.toBeVisible();
   await page.locator('.product-card-wrapper').first().click({ force: true });
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('header')).toContainText('Home');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');;

});
///???????????????????????sceeen
test('56 Box banner cant be closed', async ({ openBanner, page, selectorPage, bannerPage }) => {

   await selectorPage.selectType('Box');
   await selectorPage.changeSizeSlider(50);
   await bannerPage.borderradius('Border radius', '22')
   await bannerPage.borderStyle('Border style', 'Dotted')
   await bannerPage.borderWidth('Border width', '22')
   await selectorPage.setColorSliders('Border color');
   await bannerPage.themeCheckbox('Banner can be closed', 'false');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect.soft(page.locator('.adt-container')).toHaveScreenshot({ maxDiffPixels: 65 });
   await bannerPage.checkMainBorderSettings('.adt-container', 'dotted', 'rgba(107, 115, 69, 0.184)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px');
   await expect(page.locator('.adt-close')).not.toBeVisible();
   await page.locator('.product-card-wrapper').first().click({ force: true });
   await expect(page.locator('.adt-item').first()).toHaveAttribute('data-code', 'en');
   await page.locator('li[data-code="uk"]').click();
   await expect(page.locator('header')).toContainText('додому');

});


test('57 Modal cant be closed, Show flag', async ({ openBanner, page, selectorPage, bannerPage }) => {
   await selectorPage.selectType('Modal');
   await selectorPage.changeSizeSlider(50);
   await bannerPage.borderradius('Border radius', '22')
   await bannerPage.borderradius('Input button radius', '22')
   await bannerPage.borderradius('Primary button radius', '22')
   await bannerPage.borderStyle('Border style', 'Double')
   await bannerPage.borderStyle('Input button style', 'Double')
   await bannerPage.borderStyle('Primary button style', 'Double')
   await bannerPage.borderWidth('Border width', '22')
   await bannerPage.borderWidth('Input button width', '22')
   await bannerPage.borderWidth('Primary button width', '22')
   await selectorPage.setColorPaste('Border color', 'Input button color', 'Primary button color');
   await bannerPage.themeCheckbox('Show flag', 'false');
   await bannerPage.themeCheckbox('Banner can be closed', 'false');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect.soft(page.locator('.adt-container')).toHaveScreenshot({ maxDiffPixels: 65 });
   await bannerPage.checkMainBorderSettings('.adt-container', 'double', 'rgb(255, 40, 47)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px');
   await bannerPage.checkPrimaryButtonBorderSettings('double', 'rgb(40, 47, 255)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px', '22px', '22px');
   await bannerPage.checkSecondaryButtonBorderSettings('double', 'rgb(108, 255, 40)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px', '22px', '22px');
   await expect(page.locator('.adt-flag')).not.toBeVisible();
   await expect(page.locator('.adt-close')).not.toBeVisible();
   await page.locator('.product-card-wrapper').first().click({ force: true });
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('header')).toContainText('Home');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');;

});

test('58 Page banner cant be closed, Show flag', async ({ openBanner, page, selectorPage, bannerPage }) => {

   await selectorPage.selectType('Page');
   await bannerPage.borderradius('Border radius', '22')
   await bannerPage.borderradius('Input button radius', '22')
   await bannerPage.borderradius('Primary button radius', '22')
   await bannerPage.borderStyle('Border style', 'Groove')
   await bannerPage.borderStyle('Input button style', 'Groove')
   await bannerPage.borderStyle('Primary button style', 'Groove')
   await bannerPage.borderWidth('Border width', '22')
   await bannerPage.borderWidth('Input button width', '22')
   await bannerPage.borderWidth('Primary button width', '22')
   await selectorPage.setColorSliders('Border color');
   await selectorPage.setColorSliders2('Input button color');
   await selectorPage.setColorSliders3('Primary button color');
   await bannerPage.themeCheckbox('Show flag', 'false');
   await bannerPage.themeCheckbox('Banner can be closed', 'false');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect.soft(page.locator('.adt-container')).toHaveScreenshot({ maxDiffPixels: 65 });
   await bannerPage.checkMainBorderSettings('.adt-container', 'groove', 'rgba(107, 115, 69, 0.184)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px');
   await bannerPage.checkPrimaryButtonBorderSettings('groove', 'rgba(115, 97, 91, 0.184)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px', '22px', '22px');
   await bannerPage.checkSecondaryButtonBorderSettings('groove', 'rgb(35, 14, 14)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px', '22px', '22px');
   await expect(page.locator('.adt-flag')).not.toBeVisible();
   await expect(page.locator('.adt-close')).not.toBeVisible();
   await page.locator('.product-card-wrapper').first().click({ force: true });
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('header')).toContainText('Home');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');;

});

///змінити значення слайдерів?
test('59 CustomCSS, Disablestylesisolation', async ({ openBanner, page, selectorPage, bannerPage }) => {

   await bannerPage.borderradius('Border radius', '22')
   await bannerPage.borderradius('Input button radius', '22')
   await bannerPage.borderradius('Primary button radius', '22')
   await bannerPage.borderStyle('Border style', 'Inset')
   await bannerPage.borderStyle('Input button style', 'Inset')
   await bannerPage.borderStyle('Primary button style', 'Inset')
   await bannerPage.borderWidth('Border width', '22')
   await bannerPage.borderWidth('Input button width', '22')
   await bannerPage.borderWidth('Primary button width', '22')
   await selectorPage.setColorSliders('Border color');
   await selectorPage.setColorSliders2('Input button color');
   await selectorPage.setColorSliders3('Primary button color');
   await bannerPage.themeCheckbox('Disable styles isolation', 'true');
   await bannerPage.CustomCSS();
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect.soft(page.locator('.adt-container')).toHaveScreenshot({ maxDiffPixels: 65 });
   await bannerPage.checkMainBorderSettings('.adt-container', 'inset', 'rgba(107, 115, 69, 0.184)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px');
   await bannerPage.checkPrimaryButtonBorderSettings('inset', 'rgba(115, 97, 91, 0.184)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px', '22px', '22px');
   await bannerPage.checkSecondaryButtonBorderSettings('inset', 'rgb(35, 14, 14)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px', '22px', '22px');
   await expect(page.locator('.adt-countries .adt-disclosure-btn .adt-disclosure-btnText'))
      .toHaveCSS('color', 'rgb(0, 128, 0)');
   await expect(page.locator('.adt-countries .adt-disclosure-btn .adt-disclosure-btnText'))
      .toHaveCSS('font-size', '33px');
   await page.locator('.adt-disclosure-btn[data-resource="countries"]').click();
   await page.waitForTimeout(500);
   await page.locator('li[data-code="PL"]').click();
   await page.locator('.adt-disclosure-btn[data-resource="languages"]').click();
   await page.waitForTimeout(500);
   await page.locator('li[data-code="uk"]').click();
   await page.locator('.adt-changeBtn').click();
   await page.waitForLoadState('load');
   await expect(page.locator('header')).toContainText('додому');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
   await page.goto('https://qafm30-11.myshopify.com');
   await expect(page.locator('.adt-disclosure-btn[data-resource="countries"]')).toHaveAttribute('data-code', 'UA');
   await expect(page.locator('.adt-disclosure-btn[data-resource="languages"]')).toHaveAttribute('data-code', 'en');
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('header')).toContainText('Home');

});


test('60 Visibility - Include Custom urls', async ({ openBanner, page, selectorPage, bannerPage }) => {

   await selectorPage.setVisibilityParams('Custom urls', 'include', '/pages/contact');
   await bannerPage.borderradius('Border radius', '22')
   await bannerPage.borderradius('Input button radius', '22')
   await bannerPage.borderradius('Primary button radius', '22')
   await bannerPage.borderStyle('Border style', 'Outset')
   await bannerPage.borderStyle('Input button style', 'Outset')
   await bannerPage.borderStyle('Primary button style', 'Outset')
   await bannerPage.borderWidth('Border width', '22')
   await bannerPage.borderWidth('Input button width', '22')
   await bannerPage.borderWidth('Primary button width', '22')
   await selectorPage.setColorPaste('Border color', 'Input button color', 'Primary button color');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.waitForLoadState('load');
   await page.waitForTimeout(500);
   await expect(page.locator('.adt-container')).not.toBeVisible();
   await page.goto('https://qafm30-11.myshopify.com/pages/contact');
   await expect.soft(page.locator('.adt-container')).toHaveScreenshot({ maxDiffPixels: 65 });
   await bannerPage.checkMainBorderSettings('.adt-container', 'outset', 'rgb(255, 40, 47)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px');
   await bannerPage.checkPrimaryButtonBorderSettings('outset', 'rgb(40, 47, 255)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px', '22px', '22px');
   await bannerPage.checkSecondaryButtonBorderSettings('outset', 'rgb(108, 255, 40)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px', '22px', '22px');
   await page.locator('.adt-disclosure-btn[data-resource="languages"]').click();
   await page.locator('li[data-code="uk"]').click();
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('header')).toContainText('додому');

});


test('61 Visibility - Include Custom urls', async ({ openBanner, page, selectorPage, bannerPage }) => {
   await selectorPage.setVisibilityParams('Custom urls', 'include', 'https://qafm30-11.myshopify.com');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('.adt-disclosure-btn[data-resource="languages"]').click();
   await page.locator('li[data-code="uk"]').click();
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('header')).toContainText('додому');
   await page.goto('https://qafm30-11.myshopify.com/pages/contact');
   await expect(async () => {
      await expect(page.locator('.adt-main')).not.toBeVisible();
  }).toPass({timeout: 15000});

});


test('62 Visibility - exclude Custom urls', async ({ openBanner, page, selectorPage, bannerPage }) => {

   await selectorPage.setVisibilityParams('Custom urls', 'exclude', '/pages/contact');
   await bannerPage.borderradius('Border radius', '22')
   await bannerPage.borderradius('Input button radius', '22')
   await bannerPage.borderradius('Primary button radius', '22')
   await bannerPage.borderStyle('Border style', 'Ridge')
   await bannerPage.borderStyle('Input button style', 'Ridge')
   await bannerPage.borderStyle('Primary button style', 'Ridge')
   await bannerPage.borderWidth('Border width', '22')
   await bannerPage.borderWidth('Input button width', '22')
   await bannerPage.borderWidth('Primary button width', '22')
   await selectorPage.setColorPaste('Border color', 'Input button color', 'Primary button color');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect.soft(page.locator('.adt-container')).toHaveScreenshot({ maxDiffPixels: 65 });
   await bannerPage.checkMainBorderSettings('.adt-container', 'ridge', 'rgb(255, 40, 47)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px');
   await bannerPage.checkPrimaryButtonBorderSettings('ridge', 'rgb(40, 47, 255)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px', '22px', '22px');
   await bannerPage.checkSecondaryButtonBorderSettings('ridge', 'rgb(108, 255, 40)', '22px',
      '22px', '22px', '22px', '22px', '22px', '22px', '22px', '22px');
   await page.locator('.adt-disclosure-btn[data-resource="languages"]').click();
   await page.locator('li[data-code="uk"]').click();
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('header')).toContainText('додому');
   await page.goto('https://qafm30-11.myshopify.com/pages/contact');
   await expect(async () => {
      await expect(page.locator('.adt-main')).not.toBeVisible();
   }).toPass({timeout: 15000});

});


test('63 Visibility - exclude Custom urls', async ({ openBanner, page, selectorPage, bannerPage }) => {
   await selectorPage.setVisibilityParams('Custom urls', 'exclude', 'https://qafm30-11.myshopify.com');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect(async () => {
      await expect(page.locator('.adt-main')).not.toBeVisible();
   }).toPass({timeout: 15000});
   await page.goto('https://qafm30-11.myshopify.com/pages/contact');
   await page.locator('.adt-disclosure-btn[data-resource="languages"]').click();
   await page.locator('li[data-code="uk"]').click();
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('header')).toContainText('додому');
});


test('64 Visibility - Include Countries', async ({ openBanner, page, selectorPage, bannerPage }) => {
   await selectorPage.setVisibilityParams('Countries', 'include', 'ukraine');
   await bannerPage.borderradiusMixed('Border radius', '22', '7', '15', '25')
   await bannerPage.borderradiusMixed('Input button radius', '22', '7', '15', '25')
   await bannerPage.borderradiusMixed('Primary button radius', '22', '7', '15', '25')
   await bannerPage.borderStyle('Border style', 'Outset')
   await bannerPage.borderStyle('Input button style', 'Outset')
   await bannerPage.borderStyle('Primary button style', 'Outset')
   await bannerPage.borderWidthMixed('Border width', '22', '7', '15', '25')
   await bannerPage.borderWidthMixed('Input button width', '22', '7', '15', '25')
   await bannerPage.borderWidthMixed('Primary button width', '22', '7', '15', '25')
   await selectorPage.setColorPaste('Border color', 'Input button color', 'Primary button color');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect.soft(page.locator('.adt-container')).toHaveScreenshot({ maxDiffPixels: 65 });
   await bannerPage.checkMainBorderSettings('.adt-container', 'outset', 'rgb(255, 40, 47)',
      '15px', '25px', '22px', '7px', '15px', '7px', '22px 7px 25px 15px');
   await bannerPage.checkPrimaryButtonBorderSettings('outset', 'rgb(40, 47, 255)', '15px',
      '25px', '22px', '7px', '15px', '7px', '22px', '25px', '22px 7px 25px 15px');
   await bannerPage.checkSecondaryButtonBorderSettings('outset', 'rgb(108, 255, 40)', '22px', '7px',
      '15px', '25px', '22px', '7px', '25px', '15px', '22px 7px 25px 15px');
   await page.locator('.adt-disclosure-btn[data-resource="languages"]').click();
   await page.locator('li[data-code="uk"]').click();
   await page.locator('.adt-changeBtn').click();
   await expect(page.locator('header')).toContainText('додому');

});


test('65 Visibility - Include Countries', async ({ openBanner, page, selectorPage, bannerPage }) => {
   await selectorPage.setVisibilityParams('Countries', 'include', 'poland');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect(async () => {
      await expect(page.locator('.adt-main')).not.toBeVisible();
   }).toPass({timeout: 15000});

});


test('66 Visibility - exclude Countries', async ({ openBanner, page, selectorPage, bannerPage }) => {
   await selectorPage.setVisibilityParams('Countries', 'exclude', 'poland');
   await bannerPage.borderradiusMixed('Border radius', '22', '7', '15', '25')
   await bannerPage.borderradiusMixed('Input button radius', '22', '7', '15', '25')
   await bannerPage.borderradiusMixed('Primary button radius', '22', '7', '15', '25')
   await bannerPage.borderStyle('Border style', 'Ridge')
   await bannerPage.borderStyle('Input button style', 'Ridge')
   await bannerPage.borderStyle('Primary button style', 'Ridge')
   await bannerPage.borderWidthMixed('Border width', '22', '7', '15', '25')
   await bannerPage.borderWidthMixed('Input button width', '22', '7', '15', '25')
   await bannerPage.borderWidthMixed('Primary button width', '22', '7', '15', '25')
   await selectorPage.setColorPaste('Border color', 'Input button color', 'Primary button color');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect.soft(page.locator('.adt-container')).toHaveScreenshot({ maxDiffPixels: 65 });
   await bannerPage.checkMainBorderSettings('.adt-container', 'ridge', 'rgb(255, 40, 47)',
      '15px', '25px', '22px', '7px', '15px', '7px', '22px 7px 25px 15px');
   await bannerPage.checkPrimaryButtonBorderSettings('ridge', 'rgb(40, 47, 255)', '15px',
      '25px', '22px', '7px', '15px', '7px', '22px', '25px', '22px 7px 25px 15px');
   await bannerPage.checkSecondaryButtonBorderSettings('ridge', 'rgb(108, 255, 40)', '22px', '7px',
      '15px', '25px', '22px', '7px', '25px', '15px', '22px 7px 25px 15px');
   await page.locator('.adt-disclosure-btn[data-resource="languages"]').click();
   await page.locator('li[data-code="uk"]').click();
   await page.locator('.adt-changeBtn').click();
   await expect(async () => {
      await expect(page.locator('header')).toContainText('додому');
  }).toPass({timeout: 15000});

});


test('67 Visibility - exclude Countries', async ({ openBanner, page, selectorPage, bannerPage }) => {
   await selectorPage.setVisibilityParams('Countries', 'exclude', 'ukraine');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect(async () => {
      await expect(page.locator('.adt-main')).not.toBeVisible();
   }).toPass({timeout: 15000});

});


test('68 change images, Banner', async ({ openBanner, page, selectorPage, bannerPage }) => {

   await selectorPage.selectType('Banner');
   await bannerPage.cnangeImage('Background image');
   await bannerPage.cnangeImage('Side image');
   await bannerPage.editImage('Background image');
   await bannerPage.changeGrayscaleBlur('Grayscale', 80);
   await bannerPage.changeGrayscaleBlur('Blur', 80);
   await bannerPage.focalPoint();
   await bannerPage.closeImageEditor();
   await bannerPage.editImage('Side image');
   await bannerPage.changeGrayscaleBlur('Grayscale', 80);
   await bannerPage.changeGrayscaleBlur('Blur', 80);
   await bannerPage.focalPoint();
   await bannerPage.closeImageEditor();
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect.soft(page.locator('.adt-container')).toHaveScreenshot({ maxDiffPixels: 65 });
   await expect(page.locator('.adt-disclosure-btn[data-resource="countries"]')).toHaveAttribute('data-code', 'UA');
   await expect(page.locator('.adt-disclosure-btn[data-resource="languages"]')).toHaveAttribute('data-code', 'en');
   await page.locator('.adt-close').click();
   await expect(async () => {
      await expect(page.locator('.adt-main')).not.toBeVisible();
   }).toPass({timeout: 15000});

});


test('69 replace images, Popup', async ({ openBanner, page, selectorPage, bannerPage }) => {

   await selectorPage.selectType('Popup');
   await bannerPage.selectPosition('Position - top left');
   await bannerPage.cnangeImage('Background image');
   await bannerPage.cnangeImage('Side image');
   await bannerPage.replaceImage('Background image');
   await bannerPage.replaceImage('Side image');
   await bannerPage.editImage('Background image');
   await bannerPage.changeGrayscaleBlur('Grayscale', -70);
   await bannerPage.changeGrayscaleBlur('Blur', 100);
   await bannerPage.focalPoint();
   await bannerPage.closeImageEditor();
   await bannerPage.editImage('Side image');
   await bannerPage.changeGrayscaleBlur('Grayscale', -70);
   await bannerPage.changeGrayscaleBlur('Blur', 100);
   await bannerPage.focalPoint();
   await bannerPage.closeImageEditor();
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.waitForTimeout(1000)
   await expect.soft(page.locator('.adt-container')).toHaveScreenshot({ maxDiffPixels: 65 });
   await expect(page.locator('div.adt-top-left')).toBeVisible();
   await expect(page.locator('.adt-disclosure-btn[data-resource="countries"]')).toHaveAttribute('data-code', 'UA');
   await expect(page.locator('.adt-disclosure-btn[data-resource="languages"]')).toHaveAttribute('data-code', 'en');
   await page.locator('.adt-disclosure-btn[data-resource="countries"]').click();
   await page.waitForTimeout(500);
   await expect.soft(page.locator('.adt-itemsList').first()).toHaveScreenshot({ maxDiffPixels: 65 });
   await page.waitForTimeout(500);
   await page.locator('.adt-close').click();
   await expect(async () => {
      await expect(page.locator('.adt-main')).not.toBeVisible();
   }).toPass({timeout: 15000});

});

test('70 change images, Box', async ({ openBanner, page, selectorPage, bannerPage }) => {

   await selectorPage.selectType('Box');
   await bannerPage.cnangeImage('Background image');
   await bannerPage.editImage('Background image');
   await bannerPage.changeGrayscaleBlur('Grayscale', 70);
   await bannerPage.changeGrayscaleBlur('Blur', 70);
   await bannerPage.focalPoint();
   await bannerPage.closeImageEditor();
   await expect.soft(page.frameLocator("#AppFrameMain iframe").frameLocator('iframe[src*="/sdk/iframe.html"]').locator('.adt-container')).toHaveScreenshot();
   await bannerPage.removeImage('Background image');
   await selectorPage.saveSelector();
   await selectorPage.openStore();
   await page.waitForTimeout(200)
   await expect.soft(page.locator('.adt-container')).toHaveScreenshot();
   await expect(page.locator('.adt-item').first()).toHaveAttribute('data-code', 'en');
   await page.locator('.adt-close').click();
   await expect(async () => {
      await expect(page.locator('.adt-container')).not.toBeVisible();
   }).toPass({timeout: 15000});

});


test('71 change images, Modal', async ({ openBanner, page, selectorPage, bannerPage }) => {

   await selectorPage.selectType('Modal');
   await bannerPage.cnangeImage('Background image');
   await bannerPage.cnangeImage('Side image');
   await bannerPage.editImage('Background image');
   await bannerPage.changeGrayscaleBlur('Grayscale', -70);
   await bannerPage.changeGrayscaleBlur('Blur', 100);
   await bannerPage.focalPoint();
   await bannerPage.closeImageEditor();
   await bannerPage.editImage('Side image');
   await bannerPage.changeGrayscaleBlur('Grayscale', -70);
   await bannerPage.changeGrayscaleBlur('Blur', 100);
   await bannerPage.focalPoint();
   await bannerPage.closeImageEditor();
   await bannerPage.changeSIdeImagePosition('Left');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await page.waitForLoadState('load');
   await expect.soft(page.locator('.adt-main')).toHaveScreenshot({ maxDiffPixels: 65 });
   await expect(page.locator('.adt-disclosure-btn[data-resource="countries"]')).toHaveAttribute('data-code', 'UA');
   await expect(page.locator('.adt-disclosure-btn[data-resource="languages"]')).toHaveAttribute('data-code', 'en');
   await page.locator('.adt-close').click();
   await expect(async () => {
      await expect(page.locator('.adt-main')).not.toBeVisible();
   }).toPass({timeout: 15000});

});


test('72 change images, Page', async ({ openBanner, page, selectorPage, bannerPage }) => {

   await selectorPage.selectType('Page');
   await selectorPage.changeSizeSlider(50);
   await bannerPage.cnangeImage('Background image');
   await bannerPage.cnangeImage('Side image');
   await bannerPage.replaceImage('Page image');
   await bannerPage.editImage('Background image');
   await bannerPage.changeGrayscaleBlur('Grayscale', -70);
   await bannerPage.changeGrayscaleBlur('Blur', 100);
   await bannerPage.focalPoint();
   await bannerPage.closeImageEditor();
   await bannerPage.editImage('Page image');
   await bannerPage.changeGrayscaleBlur('Grayscale', -70);
   await bannerPage.changeGrayscaleBlur('Blur', 100);
   await bannerPage.focalPoint();
   await bannerPage.closeImageEditor();
   await bannerPage.editImage('Side image');
   await bannerPage.changeGrayscaleBlur('Grayscale', -70);
   await bannerPage.changeGrayscaleBlur('Blur', 100);
   await bannerPage.focalPoint();
   await bannerPage.closeImageEditor();
   await bannerPage.changeSIdeImagePosition('Left');
   await bannerPage.changeSIdeImagePosition('Right');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.goto('https://qafm30-11.myshopify.com/en-en');
   await expect.soft(page.locator('.adt-modal-overlay.overlay-page-type')).toHaveScreenshot({ maxDiffPixels: 65 });
   await expect(page.locator('.adt-disclosure-btn[data-resource="countries"]')).toHaveAttribute('data-code', 'UA');
   await expect(page.locator('.adt-disclosure-btn[data-resource="languages"]')).toHaveAttribute('data-code', 'en');
   await page.locator('.adt-close').click();
   await expect(async () => {
      await expect(page.locator('.adt-main')).not.toBeVisible();
   }).toPass({timeout: 15000});
});


