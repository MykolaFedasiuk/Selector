import { expect } from '@playwright/test';
import { test } from '../fixtures/fixturePages'

test('1 Selector types', async ({ page, selectorPage, ActivateEmbadeOpenSelector }) => {

   await selectorPage.selTypes('Type');
   expect(await page.frameLocator("#AppFrameMain iframe")
      .locator('.custom-drop-down', { hasText: 'Type' }).textContent()).toEqual('TypeTape-line Info★ Pro');

});

test('2 Selector Resources', async ({ page, selectorPage, ActivateEmbadeOpenSelector }) => {
   await selectorPage.selTypes('Resource');
   expect(await page.frameLocator("#AppFrameMain iframe")
      .locator('.custom-drop-down', { hasText: 'Resource' }).textContent()).toEqual('ResourceMarket Domains');

});

test('3 Selector Themes', async ({ page, selectorPage, ActivateEmbadeOpenSelector }) => {
   await selectorPage.selTypes('Theme');
   expect(await page.frameLocator("#AppFrameMain iframe")
      .locator('.custom-drop-down', { hasText: 'Theme' }).textContent()).toEqual('ThemeMinimal');

});

test('4 Selector Color schemes', async ({ page, openSelector }) => {
   await page.frameLocator("#AppFrameMain iframe")
      .locator('.SelectColorsSchemes', { hasText: 'Color scheme' }).locator('.Polaris-Connected').click();
   const allSelectorColorScheme = page.frameLocator("#AppFrameMain iframe")
      .locator('.Polaris-Listbox-Option');
   for (const selCol of await allSelectorColorScheme.all()) {
      await selCol.click()
      await page.frameLocator("#AppFrameMain iframe")
         .locator('.SelectColorsSchemes', { hasText: 'Color scheme' }).locator('.Polaris-Connected').click();
   };
   await expect(page.frameLocator("#AppFrameMain iframe")
      .locator('.SelectColorsSchemes', { hasText: 'Color scheme' }).locator('.Polaris-Connected').locator('input')).toHaveValue('Turquoise');

});


test('5 Currency, Dropdown, Fixed position, Position - top left', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.selectResourse('Currency');
   await selectorPage.selectPosition('Fixed position', 'Position - top left');
   await selectorPage.changeSizeSlider();
   await selectorPage.display2(3);
   await selectorPage.fontSettings(0, 'Arial', 'normal', -50);
   await selectorPage.fontSettings(1, 'Arial', 'normal', 100);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('.sel-disclosure.sel-basic.sel-view-all.sel-currencies.sel-drop-down-disclosure').click();
   await page.locator('li[data-code="USD"]').hover({ timeout: 5000 });
   await expect(page.locator('.sel-item:hover').first()).toHaveCSS('color', 'rgb(32, 34, 35)');
   await selectorPage.checkFontSettings('7.92px', '400', 'Arial', "\"Arial\"");
   await page.locator('li[data-code="USD"]').click();
   await expect(page.locator('.sel-title').first()).toHaveText('USD ($)');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
   await expect(page.locator('selector-root')).toHaveClass('sel-fixed sel-top-left needsclick');
   await expect.soft(page.locator('.sel-disclosure.sel-basic.sel-view-all.sel-currencies')).toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await expect(page.locator('span.sel-title').first()).toHaveCSS('color', 'rgb(32, 34, 35)');
   await expect(page.locator('.sel-itemsContainer').first()).toHaveCSS('background-color', 'rgb(255, 255, 255)');

});


test('6 Currency, Wheel, Cute, Arctic, Fixed position, Position - top right', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.selectResourse('Currency');
   await selectorPage.selectType('Wheel');
   await selectorPage.selectTheme('Cute')
   await selectorPage.selectColor('Arctic')
   await selectorPage.selectPosition('Fixed position', 'Position - top right');
   await selectorPage.displayCurrencyIcon(1);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect(page.locator('.sel-item.sel-current').first()).toHaveText('Ukrainian Hryvnia');
   await page.locator('.sel-disclosure').click();
   await page.waitForTimeout(1000);
   await page.locator('li[data-code="PLN"]').click();
   await page.waitForTimeout(1000);
   await expect.soft(page.locator('.sel-modal-content')).toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await page.getByRole('button', { name: 'Done' }).last().click();
   await expect.soft(page.locator('.sel-item.sel-current').first()).toContainText('Polish');
   await expect.soft(page.locator('.product-card-wrapper').first()).toContainText('PLN');
   await expect(page.locator('selector-root')).toHaveClass('sel-fixed sel-top-right needsclick');
   await expect.soft(page.locator('.sel-cute.sel-currencies.sel-wheel-disclosure'))
   .toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await expect(page.locator('span.sel-title').first()).toHaveCSS('color', 'rgb(65, 0, 1)');
   await expect(page.locator('.sel-wheel-actionsWrapper')).toHaveCSS('background-color', 'rgb(255, 255, 255)');

});


test('7 Country (Currency), Modal, Minimal, Wild West, Fixed position, Position - bottom right', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.selectResourse('Country (Currency)');
   await selectorPage.selectType('Modal');
   await selectorPage.selectTheme('Minimal')
   await selectorPage.selectColor('Wild West')
   await selectorPage.selectPosition('Fixed position', 'Position - bottom right');
   await selectorPage.display1(1);
   await selectorPage.display2(1);
   await selectorPage.displayCurrencyFormat(1);
   await selectorPage.fontSettings(0, 'Arial Black', 'bold', -20);
   await selectorPage.fontSettings(1, 'Arial Black', 'bold', 10);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect(page.locator('.sel-item.sel-current').first()).toHaveText('UA (₴)');
   await page.locator('.sel-disclosure.sel-minimal.sel-view-names.sel-countries.sel-modal-disclosure').click();
   await page.locator('li[data-code="PL"]').hover();
   await page.waitForTimeout(1000);
   await selectorPage.checkFontSettings('21px', '700', 'Arial Black', "\"Arial Black\"");

   await page.locator('li[data-code="PL"]').click()
   const selectorExists = await page.waitForSelector('.sel-iconWrapper', { state: 'visible', timeout: 1000 }).then(() => true).catch(() => false);
   expect(selectorExists).toBeFalsy();
   await expect(page.locator('.sel-item.sel-current').first()).toHaveText('PL (zł)');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('zł PLN');
   await expect(page.locator('selector-root')).toHaveClass('sel-fixed sel-bottom-right needsclick');
   await expect.soft(page.locator('.sel-disclosure.sel-minimal.sel-view-names.sel-countries.sel-modal-disclosure'))
   .toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await expect(page.locator('span.sel-title').first()).toHaveCSS('color', 'rgb(56, 58, 21)');
   await expect(page.locator('.sel-itemsContainer').first()).toHaveCSS('background-color', 'rgb(255, 239, 215)');

});


test('8 Country (Currency), Inline, Material, Winter, Fixed position, Position - bottom left', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.selectResourse('Country (Currency)');
   await selectorPage.selectType('Inline');
   await selectorPage.selectTheme('Material')
   await selectorPage.selectColor('Winter')
   await selectorPage.changeSizeSlider(-50)
   await selectorPage.selectPosition('Fixed position', 'Position - bottom left');
   await selectorPage.displayCurrencyFormat(0);
   await selectorPage.fontSettings(0, 'Comic Sans', 'italic', -50);
   await selectorPage.fontSettings(1, 'Comic Sans', 'italic', -60);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('li[data-code="PL"]').hover();
   await expect(page.locator('.sel-item:hover').first()).toHaveCSS('color', 'rgb(26, 55, 77)');
   await expect(page.locator('.sel-item:hover .sel-title').first()).toHaveCSS('font-style', 'italic');
   await selectorPage.checkFontSettings('31.59px', '400', 'Comic Sans', "\"Comic Sans\"");
   await page.locator('li[data-code="PL"]').click();
   expect(await page.locator('.sel-item.sel-current').first().getAttribute('data-code')).toEqual('PL');
   await expect(page.locator('.sel-item.sel-current').first()).toHaveText('Poland (PLN)');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('zł PLN');
   await expect(page.locator('selector-root')).toHaveClass('sel-fixed sel-bottom-left needsclick');
   await expect.soft(page.locator('.sel-disclosure.sel-material.sel-view-all.sel-countries.sel-firstChild.sel-inline-disclosure'))
   .toHaveScreenshot({ maxDiffPixelRatio: 0.05 });
   await expect(page.locator('span.sel-title').first()).toHaveCSS('color', 'rgba(64, 104, 130, 0.8)');
   await expect(page.locator('.sel-itemsContainer').first()).toHaveCSS('background-color', 'rgb(177, 208, 221)');

});


test('9 Country (Currency) S Language, Layered, Basic, Cold, Embedded position, Position - header right', async ({ page, selectorPage, openSelector }) => {
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
   expect(await page.locator('.sel-item.sel-current').first().getAttribute('data-code')).toEqual('PL');
   expect(await page.locator('.sel-item.sel-current').last().getAttribute('data-code')).toEqual('uk');
   await expect(page.locator('.sel-item.sel-current').first()).toHaveText('Poland (PLN zł)');
   await expect(page.locator('.sel-item.sel-current').last()).toHaveText('Українська');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('zł PLN');
   await expect(page.locator('header')).toContainText('додому');
   await expect(page.locator('selector-root')).toHaveClass('sel-embedded sel-header-right needsclick');
   await expect.soft(page.locator('.sel-basic.sel-view-lang_names_country_all.sel-languages_countries.sel-layered-disclosure').first()).toHaveScreenshot({ maxDiffPixels: 65, maxDiffPixelRatio: 0.05 });
   await expect.soft(page.locator('.sel-item.sel-current').first()).toHaveScreenshot({ maxDiffPixels: 65, maxDiffPixelRatio: 0.05 });
   await expect.soft(page.locator('.sel-item.sel-current').last()).toHaveScreenshot({ maxDiffPixels: 65, maxDiffPixelRatio: 0.05 });
   await expect(page.locator('span.sel-title').first()).toHaveCSS('color', 'rgba(41, 49, 95, 0.8)');
   await expect(page.locator('.sel-itemsContainer').first()).toHaveCSS('background-color', 'rgb(219, 230, 253)');

});


test('10 Language S Currency, Popup, Dark Indigo, Embedded position, Position - header left', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.selectResourse('Language & Currency');
   await selectorPage.selectType('Popup');
   await selectorPage.selectColor('Dark Indigo')
   await selectorPage.selectPosition('Embedded position', 'Position - header left');
   await selectorPage.display1(0);
   await selectorPage.display2(1);
   await selectorPage.displayCurrencyIcon(1);
   await selectorPage.fontSettings(0, 'Courier New', 'boldItalic', 30);
   await selectorPage.fontSettings(1, 'Courier New', 'boldItalic', 30);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('.sel-firstChild.sel-bothChild.sel-languages').click()
   await page.locator('li[data-code="en"]').click()
   await page.locator('.sel-secondChild.sel-bothChild.sel-currencies').click()
   await page.locator('li[data-code="PLN"]').hover()
   await expect(page.locator('.sel-item:hover').first()).toHaveCSS('color', 'rgb(236, 205, 164)');
   await expect(page.locator('.sel-item:hover .sel-title').first()).toHaveCSS('font-style', 'italic');
   await selectorPage.checkFontSettings('19px', '700', 'Courier New', "\"Courier New\"");
   await page.locator('li[data-code="PLN"]').click();
   await expect(page.locator('header')).toContainText('Home');
   await expect(page.locator('.sel-secondChild.sel-bothChild.sel-currencies').locator('.sel-title').first())
   .toContainText('Polish');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('zł PLN');
   await expect(page.locator('selector-root')).toHaveClass('sel-embedded sel-header-left needsclick');
   await expect.soft(page.locator('.sel-disclosure.sel-basic.sel-view-all.sel-languages_currencies.sel-popup-disclosure'))
   .toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await expect(page.locator('span.sel-title').first()).toHaveCSS('color', 'rgb(11, 223, 237)');
   await expect(page.locator('.sel-itemsContainer').first()).toHaveCSS('background-color', 'rgb(51, 49, 59)');

});


test('11 Country S Language, Cascade, Black & white, Embedded position, Position - header center', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.selectResourse('Country & Language');
   await selectorPage.selectType('Cascade');
   await selectorPage.selectColor('Black & white')
   await selectorPage.selectPosition('Embedded position', 'Position - header center');
   await selectorPage.display1(7);
   await selectorPage.display2(0);
   await selectorPage.fontSettings(0, 'Charcoal', 'boldItalic', 50);
   await selectorPage.fontSettings(1, 'Charcoal', 'boldItalic', 50);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('.sel-languages.sel-secondChild').click();
   await page.locator('li[data-code="en"]').hover();
   await expect(page.locator('.sel-item:hover').first()).toHaveCSS('color', 'rgb(255, 255, 255)');
   await expect(page.locator('.sel-item:hover .sel-title').first()).toHaveCSS('font-style', 'italic');
   await selectorPage.checkFontSettings('17px', '700', 'Charcoal', "\"Charcoal\"");
   await page.locator('li[data-code="en"]').click()
   await page.locator('.sel-countries.sel-firstChild').click()
   await expect.soft(page.locator('.sel-itemsList').first()).toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await page.locator('li[data-code="PL"]').click()
   await expect(page.locator('.sel-secondChild .sel-title').first()).toContainText('English');
   await expect(page.locator('header')).toContainText('Home')
   await expect(page.locator('.product-card-wrapper').first()).toContainText('zł PLN');
   await expect(page.locator('selector-root')).toHaveClass('sel-embedded sel-header-center needsclick');
   await expect.soft(page.locator('.sel-disclosure.sel-basic.sel-view-country_icons_lang_names.sel-languages_countries.sel-cascade-disclosure'))
   .toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await expect(page.locator('.sel-secondChild .sel-title').first()).toHaveCSS('color', 'rgb(245, 245, 245)');
   await expect(page.locator('li.sel-item').first()).toHaveCSS('background-color', 'rgb(18, 18, 18)');
});


test('12 Currency, Sidebar, Jungle, Embedded position, Position - footer right', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.selectResourse('Currency');
   await selectorPage.selectType('Sidebar');
   await selectorPage.selectColor('Jungle')
   await selectorPage.selectPosition('Embedded position', 'Position - footer right');
   await selectorPage.display2(2);
   await selectorPage.fontSettings(0, 'Times', 'bold', 60);
   await selectorPage.fontSettings(1, 'Times', 'bold', 60);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('.sel-disclosure.sel-basic.sel-view-all.sel-currencies.sel-sidebar-disclosure .sel-disclosure-btn')
   .click();
   await expect(async () => {
      await page.locator('li[data-code="USD"]').hover({ timeout: 2000 });
   }).toPass({timeout: 25000});
   await selectorPage.checkFontSettings('16px', '700', 'Times', "\"Times\"");
   await page.locator('li[data-code="USD"]').click();
   await expect.soft(page.locator('.sel-modal-content')).toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await page.getByRole('button', { name: 'Apply' }).last().click();
   await expect(page.locator('.sel-item.sel-current').first()).toHaveText('USD');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('USD');
   await expect(page.locator('selector-root')).toHaveClass('sel-embedded sel-footer-right needsclick');
   await expect.soft(page.locator('.sel-disclosure')).toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await expect(page.locator('div.sel-icon-curr').first()).toHaveCSS('border-color', 'rgb(59, 16, 17)');
   await expect(page.locator('li.sel-current')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.8)');
   await expect(page.locator('.sel-disclosure-btn')).toHaveCSS('background-color', 'rgb(81, 146, 89)');

});


test('13 Language, Scale, Desert, Embedded position, Position - footer left', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.selectResourse('Language');
   await selectorPage.selectType('Scale');
   await selectorPage.selectColor('Desert')
   await selectorPage.selectPosition('Embedded position', 'Position - footer left');
   await selectorPage.display1(1);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('.sel-item-container').first().hover();
   await page.locator('li[data-code="en"]').first().hover();
   await expect(page.locator('selector-root')).toHaveClass('sel-embedded sel-footer-left needsclick');
   await expect.soft(page.locator('.sel-basic.sel-view-icons.sel-languages.sel-scale-disclosure'))
   .toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await page.locator('li[data-code="en"]').click();
   await expect(page.locator('header')).toContainText('Home');
   await expect(page.locator('li.sel-item').first()).toHaveCSS('color', 'rgba(142, 151, 117, 0.8)');
   await expect(page.locator('.sel-blob-container')).toHaveCSS('background-color', 'rgb(250, 242, 218)');

});


test('14 Country, Tape-Line, North, Embedded position, Position - footer center', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.selectResourse('Country');
   await selectorPage.selectType('Tape-line');
   await selectorPage.selectColor('North');
   await selectorPage.selectPosition('Embedded position', 'Position - footer center');
   await selectorPage.display1(0);
   await selectorPage.fontSettings(0, 'Verdana', 'bold', 70);
   await selectorPage.fontSettings(1, 'Verdana', 'bold', 70);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('.sel-item.sel-current').first().hover();
   await expect(page.locator('selector-root')).toHaveClass('sel-embedded sel-footer-center needsclick');
   await expect.soft(page.locator('.sel-basic.sel-view-names.sel-countries.sel-meter-disclosure'))
   .toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await page.locator('li[data-code="US"]').first().click();
   await expect(page.locator('.sel-item.sel-current').first()).toHaveText('US');
   await expect(page.locator('li.sel-item').first()).toHaveCSS('color', 'rgba(54, 106, 135, 0.8)');
   await expect(page.locator('.sel-blob-container')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
   await expect(page.locator('li.sel-item').first()).toHaveCSS('font-size', '15px');
   await expect(page.locator('li.sel-item').first()).toHaveCSS('font-weight', '700');
   await expect(page.locator('li.sel-item').first()).toHaveCSS('font-family', 'Verdana');
});


test('15 Country & Language, dropdown, Sunny, search', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.selectResourse('Country & Language');
   await selectorPage.selectColor('Sunny');
   await selectorPage.display1(0);
   await selectorPage.display2(3);
   await selectorPage.searchCheckbox('Search for languages');
   await selectorPage.searchCheckbox('Search for countries');
   await selectorPage.fontSettings(0, 'Helvetica', 'normal', 80);
   await selectorPage.fontSettings(1, 'Helvetica', 'normal', 80);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect.soft(page.locator('.sel-basic.sel-view-all.sel-languages_countries.sel-drop-down-disclosure'))
      .toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
      await expect(page.locator('selector-root')).toHaveClass('sel-fixed sel-top-right needsclick');
   await page.locator('.sel-firstChild.sel-countries').click();
   await page.locator('.sel-firstChild').locator('.sel-search-input').fill('pol');
   await page.locator('.sel-itemsList .sel-item').first().hover();
   await expect.soft(page.locator('.sel-itemsContainer.sel-view-all').first()).toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await expect(page.locator('.sel-item:hover').first()).toHaveCSS('color', 'rgb(74, 69, 108)');
   await selectorPage.checkFontSettings('14px', '400', 'Helvetica', "\"Helvetica\"");
   await page.locator('.sel-itemsList .sel-item').first().click();
   await page.locator('.sel-secondChild.sel-languages').click();
   await page.locator('.sel-secondChild').locator('.sel-search-input').fill('eng');
   await expect.soft(page.locator('.sel-itemsContainer.sel-view-all').last()).toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await page.locator('.sel-itemsList .sel-item').last().click();
   await expect(page.locator('.sel-firstChild .sel-title').first()).toContainText('PL');
   await expect(page.locator('.sel-secondChild .sel-title').first()).toContainText('EN');
   await expect(page.locator('header')).toContainText('Home')
   await expect(page.locator('.product-card-wrapper').first()).toContainText('zł PLN');
   await expect(page.locator('.sel-secondChild .sel-item').first()).toHaveCSS('color', 'rgba(10, 1, 1, 0.8)');
   await expect(page.locator('.sel-itemsContainer').first()).toHaveCSS('background-color', 'rgb(255, 225, 98)');

});


test('16 Country, Wheel, Beet, search', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.selectResourse('Country');
   await selectorPage.selectType('Wheel');
   await selectorPage.selectColor('Beet')
   await selectorPage.display1(0);
   await selectorPage.searchCheckbox('Search for countries');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect.soft(page.locator('.sel-wheel-disclosure')).toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await expect(page.locator('selector-root')).toHaveClass('sel-fixed sel-top-right needsclick');
   await page.locator('.sel-basic.sel-countries.sel-wheel-disclosure').click();
   await page.locator('.sel-search-input').fill('pol');
   await expect.soft(page.locator('.sel-modal-content')).toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await page.locator('.sel-wheel-content .sel-itemsList .sel-item').hover();
   await expect(page.locator('.sel-item:hover').first()).toHaveCSS('color', 'rgba(255, 255, 255, 0.8)');
   await page.locator('.sel-itemsList .sel-item').first().click();
   await page.getByRole('button', { name: 'Done' }).last().click();
   await expect(async () => {
      await expect(page.locator('.sel-item.sel-current').first()).toContainText('Poland');
   }).toPass({timeout: 25000});
   await expect.soft(page.locator('.product-card-wrapper').first()).toContainText('PLN');
   await expect(page.locator('span.sel-title').first()).toHaveCSS('color', 'rgb(255, 255, 255)');
   await expect(page.locator('.sel-wheel-actionsWrapper')).toHaveCSS('background-color', 'rgb(120, 28, 104)');
});


test('17 Language & Currency, Modal, Chocolate, search', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.selectResourse('Language & Currency');
   await selectorPage.selectType('Modal');
   await selectorPage.selectColor('Chocolate');
   await selectorPage.changeSizeSlider();
   await selectorPage.display1(1);
   await selectorPage.searchCheckbox('Search for languages');
   await selectorPage.searchCheckbox('Search for currencies');
   await selectorPage.fontSettings(0, 'Lucida Console', 'normal', 90);
   await selectorPage.fontSettings(1, 'Lucida Console', 'normal', 90);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect.soft(page.locator('.sel-disclosure.sel-basic.sel-languages_currencies.sel-modal-disclosure').first())
   .toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await expect(page.locator('selector-root')).toHaveClass('sel-fixed sel-top-right needsclick');
   await page.locator('.sel-disclosure.sel-basic.sel-languages_currencies.sel-modal-disclosure').click();
   await page.locator('.sel-languages.sel-firstChild').getByRole('textbox').fill('sfdsfsfdsfsdfsdf');
   await page.waitForTimeout(100);
   await expect.soft(page.locator('.sel-modal-content').first()).toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await page.locator('.sel-languages.sel-firstChild').getByRole('textbox').clear();
   await page.locator('.sel-languages.sel-firstChild').getByRole('textbox').fill('eng');
   await page.locator('.sel-itemsList .sel-item').first().hover();
   await expect(page.locator('.sel-item:hover').first()).toHaveCSS('color', 'rgb(109, 113, 117)');
   await selectorPage.checkFontSettings('8.58px', '400', 'Lucida Console', "\"Lucida Console\"");
   await page.locator('.sel-itemsList .sel-item').first().click();
   await page.locator('.sel-disclosure.sel-basic.sel-languages_currencies.sel-modal-disclosure').click();
   await page.locator('.sel-currencies.sel-secondChild').getByRole('textbox').fill('pol');
   await page.waitForTimeout(100);
   await expect.soft(page.locator('.sel-modal-content').first()).toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await page.locator('.sel-itemsList .sel-item').last().click();
   await expect(page.locator('.sel-firstChild .sel-title').first()).toContainText('English');
   await expect(page.locator('.sel-secondChild .sel-title').first()).toContainText('Polish');
   await expect(page.locator('.sel-item.sel-current').first()).toHaveText('English');
   await expect(page.locator('.sel-item.sel-current').last()).toHaveText('Polish Zloty');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('zł PLN');
   await expect(page.locator('span.sel-title').first()).toHaveCSS('color', 'rgb(255, 255, 255)');
   await expect(page.locator('.sel-itemsContainer').first()).toHaveCSS('background-color', 'rgb(92, 56, 56)');

});


test('18 Currency, Cascade, Turquoise, search', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.selectResourse('Currency');
   await selectorPage.selectType('Cascade');
   await selectorPage.selectColor('Turquoise')
   await selectorPage.changeSizeSlider(-50);
   await selectorPage.display1(1);
   await selectorPage.display2(2);
   await selectorPage.searchCheckbox('Search for currencies');
   await selectorPage.fontSettings(0, ' Lucida Grande', 'bold', -40);
   await selectorPage.fontSettings(1, ' Lucida Grande', 'bold', -50);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect.soft(page.locator('.sel-disclosure.sel-basic.sel-view-names.sel-currencies.sel-cascade-disclosure'))
      .toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await page.locator('.sel-disclosure.sel-basic.sel-view-names.sel-currencies.sel-cascade-disclosure').click()
   await page.locator('.sel-search-input').fill('pol');
   await expect.soft(page.locator('.sel-itemsContainer.sel-itemsList-top')).toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await page.locator('.sel-itemsList .sel-item').hover();
   await expect(page.locator('.sel-item:hover').first()).toHaveCSS('color', 'rgb(10, 88, 88)');
   await selectorPage.checkFontSettings('30.42px', '700', 'Lucida Grande', "\"Lucida Grande\"");
   await page.locator('.sel-itemsList .sel-item').click();
   await expect(page.locator('.product-card-wrapper').first()).toContainText('zł PLN');
   await expect(page.locator('.sel-title').first()).toHaveCSS('color', 'rgb(10, 11, 0)');
   await expect(page.locator('li.sel-item').first()).toHaveCSS('background-color', 'rgb(40, 255, 191)');
});


test('19 Country (Currency) & Language, Sidebar, Search', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.selectResourse('Country (Currency) & Language');
   await selectorPage.selectType('Sidebar');
   await selectorPage.changeSizeSlider(-30);
   await selectorPage.display1(2);
   await selectorPage.searchCheckbox('Search for countries');
   await selectorPage.searchCheckbox('Search for languages');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect.soft(page.locator('.sel-disclosure')).toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await page.locator('.sel-disclosure.sel-basic.sel-view-icons.sel-languages_countries.sel-sidebar-disclosure')
      .locator('.sel-firstChild').click();
   await page.locator('.sel-firstChild .sel-search-input').fill('sdfdsfdsfs');
   await expect.soft(page.locator('.sel-modal-content')).toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await page.locator('.sel-firstChild .sel-search-input').clear();
   await page.locator('.sel-firstChild .sel-search-input').fill('pol');
   await expect.soft(page.locator('.sel-modal-content')).toHaveScreenshot({ maxDiffPixelRatio: 0.04 });
   await page.locator('.sel-firstChild .sel-itemsList .sel-item').click();
   await page.locator('.sel-secondChild .sel-search-input').fill('eng');
   await page.locator('.sel-secondChild .sel-itemsList .sel-item').click();
   await page.getByRole('button', { name: 'Apply' }).last().click();
   expect(await page.locator('.sel-item.sel-current').first().getAttribute('data-code')).toEqual('PL');
   expect(await page.locator('.sel-item.sel-current').last().getAttribute('data-code')).toEqual('en');
   await expect(page.locator('.product-card-wrapper').first()).toContainText('zł PLN');
   await expect(page.locator('header')).toContainText('Home')
   await expect(page.locator('.product-card-wrapper').first()).toContainText('zł PLN');

});


test('20 Change selector color by paste', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.setColorPaste('Text', 'Accent', 'Background');
   await selectorPage.fontSettings(0, 'Palatino Linotype', 'italic', 20);
   await selectorPage.fontSettings(1, 'Palatino Linotype', 'italic', 30);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('.sel-disclosure').click();
   await page.locator('.sel-itemsList .sel-item').first().hover();
   await expect(page.locator('.sel-item:hover').first()).toHaveCSS('color', 'rgb(40, 47, 255)');
   await expect(page.locator('.sel-item:hover .sel-title').first()).toHaveCSS('font-style', 'italic');
   await selectorPage.checkFontSettings('19px', '400', 'Palatino Linotype', "\"Palatino Linotype\"");
   await page.locator('.sel-itemsList .sel-item').first().click();
   await expect(page.locator('.sel-title').first()).toHaveCSS('color', 'rgb(255, 40, 47)');
   await expect(page.locator('.sel-itemsContainer').first()).toHaveCSS('background-color', 'rgb(108, 255, 40)');
});


test('21 Change selector color by sliders', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.selectColor('Winter')
   await selectorPage.setColorSliders('Text');
   await selectorPage.setColorSliders2('Accent');
   await selectorPage.setColorSliders3('Background');
   await selectorPage.fontSettings(0, ' Lucida Sans Unicode', 'bold', 30);
   await selectorPage.fontSettings(1, ' Lucida Sans Unicode', 'bold', 40);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('.sel-disclosure').click();
   await page.locator('.sel-itemsList .sel-item').first().hover();
   await expect.soft(page.locator('.sel-item:hover').first()).toHaveCSS('color', 'rgb(158, 78, 34)');
   await selectorPage.checkFontSettings('18px', '700', 'Lucida Sans Unicode', "\"Lucida Sans Unicode\"");
   await page.locator('.sel-itemsList .sel-item').first().click();
   await expect(page.locator('.sel-title').first()).toHaveCSS('color', 'rgb(174, 210, 38)');
   await expect(page.locator('.sel-itemsContainer').first()).toHaveCSS('background-color', 'rgb(222, 65, 65)');
});


test('22 Visibility - Include Custom urls', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.setVisibilityParams('Custom urls', 'include', '/pages/contact');
   await selectorPage.fontSettings(0, 'Georgia', 'normal', 40);
   await selectorPage.fontSettings(1, 'Georgia', 'normal', 50)
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.waitForLoadState('load');

   //    let isSelectorVisible = false;
   // try {
   //     await page.waitForSelector('.sel-disclosure', { state: 'visible', timeout: 1000 });
   //     isSelectorVisible = true;
   // } catch (error) {
   // }

   // expect(isSelectorVisible).toBe(true); 

   const selectorExists = await page.waitForSelector('.sel-disclosure', { state: 'visible', timeout: 1000 }).then(() => true).catch(() => false);
   expect(selectorExists).toBeFalsy();

   await page.goto('https://qafm30-11.myshopify.com/pages/contact');
   await page.locator('.sel-disclosure').click();
   await page.locator('.sel-itemsList .sel-item').first().hover();
   await selectorPage.checkFontSettings('17px', '400', 'Georgia', "\"Georgia\"");
   await page.locator('.sel-itemsList .sel-item').first().click();

});


test('23 Visibility - Include Custom urls', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.setVisibilityParams('Custom urls', 'include', 'https://qafm30-11.myshopify.com');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('.sel-disclosure').click();
   await page.locator('.sel-itemsList .sel-item').first().click();
   await page.goto('https://qafm30-11.myshopify.com/pages/contact');
   await expect(async () => {
      await expect(page.locator('.sel-disclosure')).not.toBeVisible();
   }).toPass({timeout: 25000});

});



test('24 Visibility - exclude Custom urls', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.setVisibilityParams('Custom urls', 'exclude', '/pages/contact');
   await selectorPage.fontSettings(0, 'Impact', 'normal', -20);
   await selectorPage.fontSettings(1, 'Impact', 'normal', -30);
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('.sel-disclosure').click();
   await page.locator('.sel-itemsList .sel-item').first().hover();
   await selectorPage.checkFontSettings('24px', '400', 'Impact', "\"Impact\"");
   await page.locator('.sel-itemsList .sel-item').first().click();

   await page.goto('https://qafm30-11.myshopify.com/pages/contact');
   await page.waitForLoadState('load');
   const selectorExists = await page.waitForSelector('.sel-disclosure', { state: 'visible', timeout: 1000 }).then(() => true).catch(() => false);
   expect(selectorExists).toBeFalsy();

});


test('25 Visibility - exclude Custom urls', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.setVisibilityParams('Custom urls', 'exclude', 'https://qafm30-11.myshopify.com');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await expect(async () => {
      await expect(page.locator('.sel-disclosure')).not.toBeVisible();
   }).toPass({timeout: 25000});
   await page.goto('https://qafm30-11.myshopify.com/pages/contact');
   await page.locator('.sel-disclosure').click();
   await page.locator('.sel-itemsList .sel-item').first().click();

});


test('26 Visibility - Include Params', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.setVisibilityParams('Params', 'include', 'sort_by=price-ascending');
   await selectorPage.fontSettings(0, 'Custom', 'normal', -30, 'Garamond');
   await selectorPage.fontSettings(1, 'Custom', 'normal', -40, 'Garamond',)
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.waitForLoadState('load');
   const selectorExists = await page.waitForSelector('.sel-disclosure', { state: 'visible', timeout: 1000 }).then(() => true).catch(() => false);
   await expect(async () => {
      expect(selectorExists).toBeFalsy();
   }).toPass({ timeout: 5000 });

   await page.goto('https://qafm30-11.myshopify.com/collections/all?filter.v.price.gte=&filter.v.price.lte=&sort_by=price-ascending');
   await page.locator('.sel-disclosure').click();
   await page.locator('.sel-itemsList .sel-item').first().hover();
   await selectorPage.checkFontSettings('25px', '400', 'Garamond', "\"Garamond\"");
   await page.locator('.sel-itemsList .sel-item').first().click();
});


test('26 Visibility - exclude Params', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.setVisibilityParams('Params', 'exclude', 'sort_by=price-ascending');
   await selectorPage.saveSelector();
   await selectorPage.openStore();
   await page.locator('.sel-disclosure').click();
   await page.locator('.sel-itemsList .sel-item').first().click();
   await page.goto('https://qafm30-11.myshopify.com/collections/all?filter.v.price.gte=&filter.v.price.lte=&sort_by=price-ascending');
   await page.waitForLoadState('load');
   const selectorExists = await page.waitForSelector('.sel-disclosure', { state: 'visible', timeout: 1000 }).then(() => true).catch(() => false);
   await expect(async () => {
      expect(selectorExists).toBeFalsy();
   }).toPass({ timeout: 5000 });
});


test('28 Visibility - Include Languages', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.setVisibilityParams('Languages', 'include', 'english');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.goto('https://qafm30-11.myshopify.com/en')
   await page.locator('.sel-disclosure').click();
   await page.locator('.sel-itemsList .sel-item').first().click();
   await expect(async () => {
      await expect(page.locator('.sel-disclosure')).not.toBeVisible();
   }).toPass({timeout: 25000});
});


test('29 Visibility - exclude Languages', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.setVisibilityParams('Languages', 'exclude', 'ukrainian');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.goto('https://qafm30-11.myshopify.com/en')
   await page.locator('.sel-disclosure').click();
   await page.waitForTimeout(500);
   await page.locator('li[data-code="uk"]').click()
   await page.waitForTimeout(500)
   const selectorExists = await page.waitForSelector('.sel-disclosure', { state: 'visible', timeout: 1000 }).then(() => true).catch(() => false);
   await expect(async () => {
      expect(selectorExists).toBeFalsy();
   }).toPass({ timeout: 5000 });

});


test('30 Visibility - Include Countries', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.selectResourse('Country');
   await selectorPage.setVisibilityParams('Countries', 'include', 'ukraine');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('.sel-disclosure').click();
   await page.locator('.sel-itemsList .sel-item').first().click();
   await page.waitForLoadState('load');
   const selectorExists = await page.waitForSelector('.sel-disclosure', { state: 'visible', timeout: 1000 }).then(() => true).catch(() => false);
   expect(selectorExists).toBeFalsy();
});

test('31 Visibility - exclude Countries', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.selectResourse('Country');
   await selectorPage.setVisibilityParams('Countries', 'exclude', 'poland');
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('.sel-disclosure').click();
   await page.locator('li[data-code="PL"]').click()
   await page.waitForLoadState('load');
   const selectorExists = await page.waitForSelector('.sel-disclosure', { state: 'visible', timeout: 1000 }).then(() => true).catch(() => false);
   expect(selectorExists).toBeFalsy();
});

test('32 Visibility - Extra small  (0 - 489px)', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.setVisibilitySize('Extra small  (0 - 489px)');
   await selectorPage.saveSelector();
   await selectorPage.openStore();
   await expect(async () => {
      await expect(page.locator('.sel-disclosure')).not.toBeVisible();
   }).toPass({timeout: 25000});
   await page.setViewportSize({ width: 490, height: 800 });
   await expect(async () => {
      await expect(page.locator('.sel-disclosure')).not.toBeVisible();
   }).toPass({timeout: 25000});
   await expect(async () => {
      await page.setViewportSize({ width: 489, height: 800 });
      await page.locator('.sel-disclosure').click({timeout: 5000});
      await page.locator('.sel-itemsList .sel-item').first().click({timeout: 5000});
   }).toPass({timeout: 25000});
});


test('33 Visibility - Small (490 - 767px)', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.setVisibilitySize('Small (490 - 767px)');
   await selectorPage.saveSelector();
   await selectorPage.openStore();
   await expect(async () => {
      await expect(page.locator('.sel-disclosure')).not.toBeVisible();
   }).toPass({timeout: 25000});

   await page.setViewportSize({ width: 479, height: 800 });
   await expect(async () => {
      await expect(page.locator('.sel-disclosure')).not.toBeVisible();
   }).toPass({timeout: 25000});
   await expect(async () => {
      await page.setViewportSize({ width: 490, height: 800 });
      await page.locator('.sel-disclosure').click({timeout: 5000});
      await page.locator('.sel-itemsList .sel-item').first().click({timeout: 5000});
   }).toPass({timeout: 25000});
});


test('34 Visibility - Medium (768 - 1039px)', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.setVisibilitySize('Medium (768 - 1039px)');
   await selectorPage.saveSelector();
   await selectorPage.openStore();
   await expect(async () => {
      await expect(page.locator('.sel-disclosure')).not.toBeVisible();
   }).toPass({timeout: 25000});

   await page.setViewportSize({ width: 767, height: 1038 });
   await expect(async () => {
      await expect(page.locator('.sel-disclosure')).not.toBeVisible();
   }).toPass({timeout: 25000});
   await page.setViewportSize({ width: 768, height: 1039 });
   await page.locator('.sel-disclosure').click();
   await page.locator('.sel-itemsList .sel-item').first().click();
});


test('35 Visibility - Large (1040 - 1439px)', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.setVisibilitySize('Large (1040 - 1439px)');
   await selectorPage.saveSelector();
   await selectorPage.openStore();
   await page.locator('.sel-disclosure').click();
   await page.locator('.sel-itemsList .sel-item').first().click();
   const selectorExists = await page.waitForSelector('.sel-disclosure', { state: 'visible', timeout: 1000 }).then(() => true).catch(() => false);

   await expect(async () => {
      await page.setViewportSize({ width: 1039, height: 1438 });
      await page.waitForTimeout(500);
      expect(selectorExists).toBeFalsy();
   }).toPass({ timeout: 5000 });

   await expect(async () => {
      await page.setViewportSize({ width: 1440, height: 1039 });
      await page.waitForTimeout(500);
      expect(selectorExists).toBeFalsy();
   }).toPass({ timeout: 5000 });

});


test('36 Visibility - Extra large (1440 - ∞px)', async ({ page, selectorPage, openSelector }) => {
   await selectorPage.setVisibilitySize('Extra large (1440 - ∞px)');
   await selectorPage.saveSelector();
   await selectorPage.openStore();
   await page.waitForLoadState('load');

   await page.setViewportSize({ width: 1439, height: 1039 });
   await page.waitForTimeout(500);
   const selectorExists = await page.waitForSelector('.sel-disclosure', { state: 'visible', timeout: 1000 }).then(() => true).catch(() => false);
   expect(selectorExists).toBeFalsy();
   await page.setViewportSize({ width: 1440, height: 1039 });
   await expect(async () => {
      await page.reload()
      await page.waitForTimeout(500);
      await page.locator('.sel-disclosure').click({ timeout: 2000 });
   }).toPass({timeout: 25000});
   await page.locator('.sel-itemsList .sel-item').first().click();
});


test('37 Custom CSS, Disable styles isolation', async ({ openSelector, page, selectorPage }) => {

   await selectorPage.CustomCSSDisableStylesIsolation();
   await selectorPage.saveSelector();
   await selectorPage.openStore();

   await page.locator('.sel-disclosure').click();
   await expect(page.locator('.sel-itemsContainer .sel-title').first()).toHaveCSS('color', 'rgb(0, 128, 0)');
   await expect(page.locator('.sel-itemsContainer .sel-title').first()).toHaveCSS('font-size', '55px');
   await page.locator('li[data-code="en"]').click()
   await page.waitForLoadState('load');
   await expect(page.locator('header')).toContainText('Home')
});