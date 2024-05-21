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
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        await expect(page.locator('header')).toContainText('додому');
    }).toPass();

});


test('74 Redirect markets, Forced redirect', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.addQueryParam('22', '33');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        await expect(page.locator('header')).toContainText('Hogar');
        expect(page.url()).toContain('?22=33');
    }).toPass();
    await page.locator('[aria-describedby="HeaderCountryLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'PLN' }).nth(1).click();
    await page.locator('[aria-describedby="HeaderLanguageLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'English' }).nth(1).click();
    await page.waitForLoadState('load');
    await expect(async () => {
        await page.reload();
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        await expect(page.locator('header')).toContainText('Home');
    }).toPass();

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
    await page.reload();
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
        await expect(page.locator('header')).toContainText('Home');
    }).toPass();

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
    await page.reload();
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
        await expect(page.locator('header')).toContainText('додому');
    }).toPass();
    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await expect(async () => {
        await expect(page.locator('header')).toContainText('Home');
        await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
        expect(page.url()).toContain('?22=33');
    }).toPass();

});


test('77 Redirect language, Forced redirect', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
        await expect(page.locator('header')).toContainText('Home');
    }).toPass();
    await page.locator('[aria-describedby="HeaderCountryLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'PLN' }).nth(1).click();
    await page.locator('[aria-describedby="HeaderLanguageLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'Українська' }).nth(1).click();
    await page.waitForLoadState('load');
    await expect(async () => {
        await page.reload();
        await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
        await expect(page.locator('header')).toContainText('Home');
    }).toPass();

});

test('78 Redirect language, Redirect once', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect once');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
      await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
        await expect(page.locator('header')).toContainText('Home');
    }).toPass();
    await page.locator('[aria-describedby="HeaderCountryLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'PLN' }).nth(1).click();
    await page.locator('[aria-describedby="HeaderLanguageLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'Українська' }).nth(1).click();
    await page.waitForLoadState('load');
    await expect(async () => {
        await page.reload();
        await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
        await expect(page.locator('header')).toContainText('додому');
    }).toPass();

});


test('79 Redirect both, Redirect when necessary', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect when necessary');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
    await expect(page.locator('header')).toContainText('Home');
    await page.locator('[aria-describedby="HeaderCountryLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'PLN' }).nth(1).click();
    await page.locator('[aria-describedby="HeaderLanguageLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'Українська' }).nth(1).click();
    await page.waitForLoadState('load');
    await page.reload();
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
        await expect(page.locator('header')).toContainText('додому');
    }).toPass();
    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await expect(async () => {
        await expect(page.locator('header')).toContainText('Home');
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
    }).toPass();

});

test('80 Redirect both, Forced redirect', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await expect(async () => {
        await expect(page.locator('header')).toContainText('Home');
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
    }).toPass();
    await page.locator('[aria-describedby="HeaderCountryLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'PLN' }).nth(1).click();
    await page.locator('[aria-describedby="HeaderLanguageLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'Українська' }).nth(1).click();
    await page.waitForLoadState('load');
    await expect(async () => {
        await page.reload();
        await expect(page.locator('header')).toContainText('Home');
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
    }).toPass();

});

test('81 Redirect both, Redirect once', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect once');
    await selectorPage.addQueryParam('22', '33');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await expect(async () => {
        await expect(page.locator('header')).toContainText('Home');
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        expect(page.url()).toContain('?22=33');
    }).toPass();
    await expect(page.locator('header')).toContainText('Home');
    await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
    expect(page.url()).toContain('?22=33');
    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
        await expect(page.locator('header')).toContainText('Hogar');
    }).toPass();

});


test('82 Redirect markets, Redirect when necessary, Include Ukraine', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect when necessary');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.includeExcludeCountry('include', 'ukra');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        await expect(page.locator('header')).toContainText('Hogar');
    }).toPass();
    await page.locator('[aria-describedby="HeaderCountryLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'PLN' }).nth(1).click();
    await page.locator('[aria-describedby="HeaderLanguageLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'Українська' }).nth(1).click();
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
        await expect(page.locator('header')).toContainText('додому');
    }).toPass();
    await page.goto('https://qafm30-11.myshopify.com/es-ja');
    await expect(async () => {
        await expect(page.locator('header')).toContainText('Hogar');
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
    }).toPass();

});

test('83 Redirect markets + default language, Forced redirect, Include Ukraine', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Always redirect to market\'s default language');
    await selectorPage.includeExcludeCountry('include', 'ukra');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        await expect(page.locator('header')).toContainText('додому');
    }).toPass();
    await page.locator('[aria-describedby="HeaderCountryLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'PLN' }).nth(1).click();
    await page.locator('[aria-describedby="HeaderLanguageLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'Українська' }).nth(1).click();
    await page.waitForLoadState('load');
    await page.reload();
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        await expect(page.locator('header')).toContainText('додому');
    }).toPass();

});


test('84 Redirect both, Redirect once, Include Ukraine', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect once');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.includeExcludeCountry('include', 'ukra');
    await selectorPage.addQueryParam('22', '33');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await expect(async () => {
        await expect(page.locator('header')).toContainText('Home');
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        expect(page.url()).toMatch(/\?22=33/);
    }).toPass();
    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
        await expect(page.locator('header')).toContainText('Hogar');
    }).toPass();
});


test('85 Redirect markets, Redirect when necessary, Include Poland', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect when necessary');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.includeExcludeCountry('include', 'pola');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await page.waitForLoadState('load');
    await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
    await expect(page.locator('header')).toContainText('Hogar');

});

test('86 Redirect markets + default language, Forced redirect, Include Poland', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Always redirect to market\'s default language');
    await selectorPage.includeExcludeCountry('include', 'pola');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await page.waitForLoadState('load');
    await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
    await expect(page.locator('header')).toContainText('Hogar');

});

test('87 Redirect both, Redirect once, Include Poland', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect once');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.includeExcludeCountry('include', 'pola');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await page.waitForLoadState('load');
    await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
    await expect(page.locator('header')).toContainText('Hogar');

});

test('88 Redirect markets, Redirect when necessary, Exclude Ukraine', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect when necessary');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.includeExcludeCountry('exclude', 'ukra');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
        await expect(page.locator('header')).toContainText('Hogar');
    }).toPass();

});

test('89 Redirect markets+ default language, Forced redirect, Exclude Ukraine', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Always redirect to market\'s default language');
    await selectorPage.includeExcludeCountry('exclude', 'ukra');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await page.waitForLoadState('load');
    await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
    await expect(page.locator('header')).toContainText('Hogar');

});

test('90 Redirect both, Redirect once, Exclude Ukraine', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect once');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.includeExcludeCountry('exclude', 'ukra');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await page.waitForLoadState('load');
    await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
    await expect(page.locator('header')).toContainText('Hogar');

});

test('91 Redirect markets, Redirect when necessary, Exclude Poland', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect when necessary');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.includeExcludeCountry('exclude', 'pola');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        await expect(page.locator('header')).toContainText('Hogar');
    }).toPass();
    await page.locator('[aria-describedby="HeaderCountryLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'PLN' }).nth(1).click();
    await page.locator('[aria-describedby="HeaderLanguageLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'Українська' }).nth(1).click();
    await page.waitForLoadState('load');
    await page.reload();
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
        await expect(page.locator('header')).toContainText('додому');
    }).toPass();
    await page.goto('https://qafm30-11.myshopify.com/es-ja');
    await page.waitForLoadState('load');
    await expect(async () => {
        await expect(page.locator('header')).toContainText('Hogar');
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
    }).toPass();

});

test('92 Redirect markets, Forced redirect, Exclude Poland', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.includeExcludeCountry('exclude', 'pola');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        await expect(page.locator('header')).toContainText('Hogar');
    }).toPass();
    await page.locator('[aria-describedby="HeaderCountryLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'PLN' }).nth(1).click();
    await page.locator('[aria-describedby="HeaderLanguageLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'Українська' }).nth(1).click();
    await page.waitForLoadState('load');
    await expect(async () => {
        await page.reload();
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        await expect(page.locator('header')).toContainText('додому');
    }).toPass();

});

test('93 Redirect markets, Redirect once, Exclude Poland', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect once');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Always redirect to market\'s default language');
    await selectorPage.includeExcludeCountry('exclude', 'pola');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/es-en');
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        await expect(page.locator('header')).toContainText('додому');
    }).toPass();
    await page.locator('[aria-describedby="HeaderCountryLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'PLN' }).nth(1).click();
    await page.locator('[aria-describedby="HeaderLanguageLabel"]').click()
    await page.locator('.disclosure__item', { hasText: 'English' }).nth(1).click();
    await page.waitForLoadState('load');
    await expect(async () => {
        await page.reload();
        await expect(page.locator('.product-card-wrapper').first()).toContainText('PLN');
        await expect(page.locator('header')).toContainText('Home');
    }).toPass();

});
