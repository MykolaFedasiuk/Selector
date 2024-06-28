import { expect } from '@playwright/test';
import { test } from '../fixtures/fixturePages';


test('73 Redirect markets, Redirect when necessary', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect when necessary');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Always redirect to market\'s default language');
    await selectorPage.openStore();

    await selectorPage.withRetry(async () => {
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/es-en');
        await selectorPage.delay(2000);
        await selectorPage.verifyText('UAH', 'додому');
        await selectorPage.delay(2000);
        await selectorPage.selectCountry('PLN');
        await selectorPage.delay(2000);
        await selectorPage.selectLanguage('English');
        await selectorPage.delay(2000);
        await selectorPage.verifyText('PLN', 'Home');
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/es-en');
        await selectorPage.verifyText('UAH', 'додому');
    });

});


test('74 Redirect markets, Forced redirect', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.addQueryParam('22', '33');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.openStore();

    await selectorPage.withRetry(async () => {
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/es-en');
        await selectorPage.delay(2000);
        await selectorPage.verifyText('UAH', 'Hogar');
        expect(page.url()).toContain('?22=33');
        await selectorPage.delay(2000);
        await selectorPage.selectCountry('PLN');
        await selectorPage.delay(2000);
        await selectorPage.selectLanguage('English');
        await page.waitForLoadState('load');
        await selectorPage.delay(2000);
        await selectorPage.verifyTextWithReload('UAH', 'Home');
    
    });

});


test('75 Redirect markets, Redirect once, Exclude Poland', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect once');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Always redirect to market\'s default language');
    await selectorPage.includeExcludeCountry('exclude', 'pola');
    await selectorPage.openStore();

    await selectorPage.withRetry(async () => {
    
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/es-en');
        await selectorPage.delay(2000);
        await selectorPage.verifyText('UAH', 'додому');
        await selectorPage.delay(2000);
        await selectorPage.selectCountry('PLN');
        await selectorPage.delay(2000);
        await selectorPage.selectLanguage('English');
        await page.waitForLoadState('load');
        await selectorPage.delay(2000);
        await selectorPage.verifyTextWithReload('PLN', 'Home');
    });

});


test('76 Redirect language, Redirect when necessary', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect when necessary');
    await selectorPage.addQueryParam('22', '33');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.openStore();

    await selectorPage.withRetry(async () => {
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/es-en');
        await selectorPage.delay(2000);
        await selectorPage.verifyText('USD', 'Home');
        await selectorPage.delay(2000);
        await selectorPage.selectCountry('PLN');
        await selectorPage.delay(2000);
        await selectorPage.selectLanguage('Українська');
        await selectorPage.delay(2000);
        await selectorPage.verifyText('PLN', 'додому');
        await selectorPage.delay(2000);
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/es-en');
        await selectorPage.delay(2000);
        await selectorPage.verifyText('USD', 'Home');
        expect(page.url()).toContain('?22=33');
    });
});


test('77 Redirect language, Forced redirect, include Filter by urls or paths, https://qafm30-11.myshopify.com/', async ({ page, selectorPage, redirects }) => {

      await selectorPage.redirectBehavior('Forced redirect');
        await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
        await selectorPage.filterByPaths('include', 'https://qafm30-11.myshopify.com');
        await selectorPage.openStore();
    
        await selectorPage.withRetry(async () => {
        
            await selectorPage.delay(2000);
            await selectorPage.verifyText('UAH', 'Home');
            await selectorPage.delay(2000);
            await selectorPage.goToUrl('https://qafm30-11.myshopify.com/es');
            await selectorPage.verifyText('UAH', 'Hogar');
        });

});


test('78 Redirect language, Redirect once', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect once');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.openStore();
    await page.waitForTimeout(5000)

    await selectorPage.withRetry(async () => {
        await selectorPage.delay(2000);
        await selectorPage.verifyText('UAH', 'Home');
        await selectorPage.delay(2000);
        await selectorPage.selectCountry('PLN');
        await selectorPage.delay(2000);
        await selectorPage.selectLanguage('Українська');
        await page.waitForLoadState('load');
        await selectorPage.delay(2000);
        await selectorPage.verifyTextWithReload('PLN', 'додому');

    });

});


test('79 Redirect both, Redirect when necessary', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect when necessary');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.openStore();

    await selectorPage.withRetry(async () => {
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/es-en');
        await selectorPage.delay(2000);
        await selectorPage.verifyText('UAH', 'Home');
        await selectorPage.delay(2000);
        await selectorPage.selectCountry('PLN');
        await selectorPage.delay(2000);
        await selectorPage.selectLanguage('Українська');
        await page.waitForLoadState('load');
        await selectorPage.delay(2000);
        await selectorPage.verifyTextWithReload('PLN', 'додому');
        await selectorPage.delay(2000);
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/es-en');
        await selectorPage.delay(2000);
        await selectorPage.verifyText('UAH', 'Home');

    });

});


test('80 Redirect both, Forced redirect', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.includeExcludeCountry('include', 'ukra');
    await selectorPage.addQueryParam('22', '33');
    await selectorPage.openStore();
   
    await selectorPage.withRetry(async () => {
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/es-en');
        await selectorPage.delay(2000);
        await selectorPage.verifyText('UAH', 'Home');
        expect(page.url()).toContain('?22=33');
        await selectorPage.delay(2000);
        await selectorPage.selectCountry('PLN');
        await selectorPage.delay(2000);
        await selectorPage.selectLanguage('Українська');
        await page.waitForLoadState('load');
        await selectorPage.delay(2000);
        await selectorPage.verifyTextWithReload('UAH', 'Home');

    });

});


test('81 Redirect markets, Redirect when necessary, Include Ukraine', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Redirect when necessary');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.includeExcludeCountry('include', 'ukra');
    await selectorPage.openStore();

    await selectorPage.withRetry(async () => {
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/es-en');
        await selectorPage.delay(2000);
        await selectorPage.verifyText('UAH', 'Hogar');
        await selectorPage.delay(2000);
        await selectorPage.selectCountry('PLN');
        await selectorPage.delay(2000);
        await selectorPage.selectLanguage('Українська');
        await page.waitForLoadState('load');
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/es-ja');
        await selectorPage.delay(2000);
        await selectorPage.verifyText('UAH', 'Hogar');
    
    });

});

test('82 Redirect markets + default language, Forced redirect, Include Ukraine', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Always redirect to market\'s default language');
    await selectorPage.includeExcludeCountry('include', 'ukra');
    await selectorPage.openStore();

    await selectorPage.withRetry(async () => {
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/es-en');
        await selectorPage.delay(2000);
        await selectorPage.verifyText('UAH', 'додому');
        await selectorPage.delay(2000);
        await selectorPage.selectCountry('PLN');
        await selectorPage.delay(2000);
        await selectorPage.selectLanguage('English');
        await page.waitForLoadState('load');
        await selectorPage.delay(2000);
        await selectorPage.verifyTextWithReload('UAH', 'додому');
    
    });

});


test('83 Redirect markets + default language, Forced redirect, Include Poland', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Always redirect to market\'s default language');
    await selectorPage.includeExcludeCountry('include', 'pola');
    await selectorPage.openStore();

    await selectorPage.withRetry(async () => {
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/es-en');
        await page.waitForLoadState('load');
        await selectorPage.delay(2000);
        await selectorPage.verifyText('USD', 'Hogar');

    });

});


test('84 Redirect markets+ default language, Forced redirect, Exclude Ukraine', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.enableRedirection('Always redirect to market\'s default language');
    await selectorPage.includeExcludeCountry('exclude', 'ukra');
    await selectorPage.openStore();

    await selectorPage.withRetry(async () => {
    
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/es-en');
        await page.waitForLoadState('load');
        await selectorPage.delay(2000);
        await selectorPage.verifyText('USD', 'Hogar');
    });

});


test('85 Redirect both, Forced redirect, include Filter by urls or paths, /contact', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.filterByPaths('include', '/contact');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.openStore();
    
    await selectorPage.withRetry(async () => {
    
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/uk-en');
        await expect(async () => {
            await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
            await expect(page.locator('header')).toContainText('додому');
        }).toPass();
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/uk-en/pages/contact');
        await expect(async () => {
            expect(page.url()).toContain('https://qafm30-11.myshopify.com/uk-en/pages/contact');
            await expect(page.locator('header')).toContainText('Home');
        }).toPass();
    });

});


test('86 Redirect both, Forced redirect, include Filter by urls or paths, /collections.*', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.filterByPaths('include', '/collections.*');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.openStore();

    await selectorPage.withRetry(async () => {
    
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/uk-en');
        await selectorPage.delay(2000);
        await selectorPage.verifyText('USD', 'додому');
        await selectorPage.delay(2000);
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/uk-en/collections/all');
        await selectorPage.verifyText('UAH', 'Home');
    });

});


test('87 Redirect language, Forced redirect, exclude Filter by urls or paths, https://qafm30-11.myshopify.com/', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.filterByPaths('exclude', 'https://qafm30-11.myshopify.com');
    await selectorPage.openStore();

    await selectorPage.withRetry(async () => {
    
        await selectorPage.delay(2000);
        await selectorPage.verifyText('UAH', 'додому');
        await selectorPage.delay(2000);
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/es');
        await selectorPage.verifyText('UAH', 'Home');
    
    });

});


test('88 Redirect both, Forced redirect, exclude Filter by urls or paths, /contact', async ({ page, selectorPage, redirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.filterByPaths('exclude', '/contact');
    await selectorPage.openStore();

    await selectorPage.withRetry(async () => {
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/uk-en');
        await selectorPage.verifyText('UAH', 'Home');
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/uk-en/pages/contact');
        await expect(async () => {
            expect(page.url()).toContain('https://qafm30-11.myshopify.com/uk-en/pages/contact');
            await expect(page.locator('header')).toContainText('додому');
        }).toPass();
    });

});

 
test('89 Redirect both, Forced redirect, exclude Filter by urls or paths, /collections.*', async ({ page, selectorPage, redirects, afterRedirects }) => {

    await selectorPage.redirectBehavior('Forced redirect');
    await selectorPage.enableRedirection('Automatically switch the visitor\'s language according to the browser\'s preferred language');
    await selectorPage.filterByPaths('exclude', '/collections.*');
    await selectorPage.enableRedirection('Redirect visitors to relevant markets according to their country');
    await selectorPage.openStore();

    await selectorPage.withRetry(async () => {
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/uk-en');
        await selectorPage.verifyText('UAH', 'Home');
        await selectorPage.goToUrl('https://qafm30-11.myshopify.com/uk-en/collections/all');
        await selectorPage.delay(2000);
        await selectorPage.verifyText('USD', 'додому');
    });

});
