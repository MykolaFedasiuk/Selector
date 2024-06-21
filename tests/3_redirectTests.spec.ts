import { expect } from '@playwright/test';
import { test } from '../fixtures/fixturePages';


test('73 Redirect markets, Redirect when necessary', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect when necessary');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Always redirect to market\'s default language');
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
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        await expect(page.locator('header')).toContainText('Hogar');    
    }).toPass();
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
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
        await expect(page.locator('header')).toContainText('Home');
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
    await expect(async () => {
        await page.goto('https://qafm30-11.myshopify.com/es-en', { waitUntil: 'load', timeout: 5000 });
    }).toPass();
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
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        await expect(page.locator('header')).toContainText('Home');
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
    await expect(async () => {
        await page.goto('https://qafm30-11.myshopify.com/es-en', { waitUntil: 'load', timeout: 5000 });
    }).toPass();
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
    await page.waitForTimeout(2000);
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

    await expect(async () => {
        await expect(page.locator('header')).toContainText('Home');
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        expect(page.url()).toContain('?22=33');
    }).toPass();
    await expect(async () => {
        await page.goto('https://qafm30-11.myshopify.com/es-en', { waitUntil: 'load', timeout: 5000 });
    }).toPass();
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
    await expect(async () => {
        await page.goto('https://qafm30-11.myshopify.com/es-ja', { waitUntil: 'load', timeout: 5000 });
    }).toPass();
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
    await expect(async () => {
        await page.reload();
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
    await expect(async () => {
        await page.goto('https://qafm30-11.myshopify.com/es-ja', { waitUntil: 'load', timeout: 5000 });
    }).toPass();
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
    await page.waitForTimeout(2000);
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


test('94 Redirect language, Forced redirect, include Filter by urls or paths, https://qafm30-11.myshopify.com/', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.filterByPaths('include', 'https://qafm30-11.myshopify.com');
    await selectorPage.openStore();

    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        await expect(page.locator('header')).toContainText('Home');
    }).toPass();
    await page.goto('https://qafm30-11.myshopify.com/es');
    await expect(async () => {
        await expect(page.locator('header')).toContainText('Hogar');
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
    }).toPass();

});

test('95 Redirect markets, Forced redirect, include Filter by urls or paths, /contact', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.filterByPaths('include', '/contact');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/uk-en');
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
        await expect(page.locator('header')).toContainText('додому');
    }).toPass();
    await page.goto('https://qafm30-11.myshopify.com/uk-en/pages/contact');
    await expect(async () => {
        expect(page.url()).toContain('https://qafm30-11.myshopify.com/uk-en/pages/contact');
        await expect(page.locator('header')).toContainText('додому');
    }).toPass();

});

test('96 Redirect both, Forced redirect, include Filter by urls or paths, /collections.*', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.filterByPaths('include', '/collections.*');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/uk-en');
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
        await expect(page.locator('header')).toContainText('додому');
    }).toPass();
    await page.goto('https://qafm30-11.myshopify.com/uk-en/collections/all');
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        await expect(page.locator('header')).toContainText('Home');
    }).toPass();

});

test('97 Redirect language, Forced redirect, exclude Filter by urls or paths, https://qafm30-11.myshopify.com/', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.filterByPaths('exclude', 'https://qafm30-11.myshopify.com');
    await selectorPage.openStore();
    
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        await expect(page.locator('header')).toContainText('додому');
    }).toPass();
    await page.goto('https://qafm30-11.myshopify.com/es');
    await expect(async () => {
        await expect(page.locator('header')).toContainText('Home');
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
    }).toPass();

});


test('98 Redirect markets, Forced redirect, exclude Filter by urls or paths, /contact', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.filterByPaths('exclude', '/contact');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/uk-en');
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        await expect(page.locator('header')).toContainText('додому');
    }).toPass();
    await page.goto('https://qafm30-11.myshopify.com/uk-en/pages/contact');
    await expect(async () => {
        expect(page.url()).toContain('https://qafm30-11.myshopify.com/uk-en/pages/contact');
        await expect(page.locator('header')).toContainText('додому');
    }).toPass();

});

test('99 Redirect both, Forced redirect, inexcludeclude Filter by urls or paths, /collections.*', async ({ page, selectorPage, redirects, afterRedirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.filterByPaths('exclude', '/collections.*');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.openStore();

    await page.goto('https://qafm30-11.myshopify.com/uk-en');
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('UAH');
        await expect(page.locator('header')).toContainText('Home');
    }).toPass();
    await page.goto('https://qafm30-11.myshopify.com/uk-en/collections/all');
    await expect(async () => {
        await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
        await expect(page.locator('header')).toContainText('додому');
    }).toPass();

});
