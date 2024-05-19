import { expect } from '@playwright/test';
import { test } from '../fixtures/fixturePages';


test('73 Redirect markets, Redirect when necessary', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect when necessary');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Always redirect to market\'s default language');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
    await expect(page.locator('header')).toContainText('додому');
    await page.locator('[aria-describedby="HeaderCountryLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'PLN' }).nth(1).click();
    await page.locator('[aria-describedby="HeaderLanguageLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'English' }).nth(1).click();
    await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
    await expect(page.locator('header')).toContainText('Home');
    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
    await expect(page.locator('header')).toContainText('додому');

});


test('74 Redirect markets, Forced redirect', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.addQueryParam('22', '33');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
    await expect(page.locator('header')).toContainText('Hogar');
    await page.locator('[aria-describedby="HeaderCountryLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'PLN' }).nth(1).click();
    await page.locator('[aria-describedby="HeaderLanguageLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'English' }).nth(1).click();
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    await page.reload();
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
    await expect(page.locator('header')).toContainText('Home');
    expect(page.url()).toContain('?22=33');

});


test('75 Redirect markets, Redirect once', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect once');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
    await expect(page.locator('header')).toContainText('Hogar');
    await page.locator('[aria-describedby="HeaderCountryLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'PLN' }).nth(1).click();
    await page.locator('[aria-describedby="HeaderLanguageLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'English' }).nth(1).click();
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    await page.reload();
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
    await expect(page.locator('header')).toContainText('Home');

});

test('76 Redirect language, Redirect when necessary', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect when necessary');
    await selectorPage.addQueryParam('22', '33');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
    await expect(page.locator('header')).toContainText('Home');
    await page.locator('[aria-describedby="HeaderCountryLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'PLN' }).nth(1).click();
    await page.locator('[aria-describedby="HeaderLanguageLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'Українська' }).nth(1).click();
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    await page.reload();
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
    await expect(page.locator('header')).toContainText('додому');
    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await page.waitForLoadState('load');
    await page.waitForTimeout(1000);
    await expect(page.locator('header')).toContainText('Home');
    await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
    expect(page.url()).toContain('?22=33');

});


test('77 Redirect language, Forced redirect', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
    await expect(page.locator('header')).toContainText('Home');
    await page.locator('[aria-describedby="HeaderCountryLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'PLN' }).nth(1).click();
    await page.locator('[aria-describedby="HeaderLanguageLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'Українська' }).nth(1).click();
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    await page.reload();
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
    await expect(page.locator('header')).toContainText('Home');

});

test('78 Redirect language, Redirect once', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect once');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
    await expect(page.locator('header')).toContainText('Home');
    await page.locator('[aria-describedby="HeaderCountryLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'PLN' }).nth(1).click();
    await page.locator('[aria-describedby="HeaderLanguageLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'Українська' }).nth(1).click();
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    await page.reload();
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
    await expect(page.locator('header')).toContainText('додому');

});






test('79 Redirect both, Redirect when necessary', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect when necessary');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/en-en');


});

test('80 Redirect both, Forced redirect', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/en-en');


});

test('81 Redirect both, Redirect once', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect once');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');

    await selectorPage.addQueryParam('22', '33');

    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/en-en');


});





test('82 Redirect markets, Redirect when necessary, Include Ukraine', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect when necessary');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/en-en');


});

test('83 Redirect markets, Forced redirect, Include Ukraine', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Always redirect to market\'s default language');

    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/en-en');


});

test('84 Redirect markets, Redirect once, Include Ukraine', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect once');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/en-en');


});




test('85 Redirect markets, Redirect when necessary, Include Poland', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect when necessary');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/en-en');


});

test('86 Redirect markets, Forced redirect, Include Poland', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/en-en');


});

test('87 Redirect markets, Redirect once, Include Poland', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect once');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.includeExcludeCountry('include', 'ukr');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/en-en');


});






test('88 Redirect markets, Redirect when necessary, Exclude Ukraine', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect when necessary');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/en-en');


});

test('89 Redirect markets, Forced redirect, Exclude Ukraine', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/en-en');


});

test('90 Redirect markets, Redirect once, Exclude Ukraine', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect once');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/en-en');


});




test('91 Redirect markets, Redirect when necessary, Exclude Poland', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect when necessary');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/en-en');


});

test('92 Redirect markets, Forced redirect, Exclude Poland', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/en-en');


});

test('93 Redirect markets, Redirect once, Exclude Poland', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect once');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.includeExcludeCountry('include', 'ukr');
    await selectorPage.enableRedirection('Always redirect to market\'s default language');


    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/en-en');


});


