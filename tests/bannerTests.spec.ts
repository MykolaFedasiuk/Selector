import { expect } from '@playwright/test';
import { test } from '../fixtures/fixturePages'


test('35 banner', async ({page, selectorPage, bannerPage}) => {
   await bannerPage.openBanner();
   await bannerPage.displayOption('Remember choice');
   await selectorPage.selectResourse('Currency');
   await selectorPage.selectType('Popup');
   await selectorPage.selectColor('Winter');

   await bannerPage.selectPosition('Position - center left');

   await selectorPage.changeSizeSlider(-50); 
   await bannerPage.selectAnimationStyle('slide');


  
   await selectorPage.saveSelector();
   await selectorPage.openStore();



});


test('20 Change selector color by paste', async ({page, selectorPage}) => {



   await selectorPage.setColorPaste();


   await page.locator('selector-root').click();
   await page.locator('.sel-itemsList .sel-item').first().hover();
   await expect(page.locator('.sel-item:hover').first()).toHaveCSS('color', 'rgb(40, 47, 255)');
   await page.locator('.sel-itemsList .sel-item').first().click();
   await expect(page.locator('.sel-title').first()).toHaveCSS('color', 'rgb(255, 40, 47)');
   await expect(page.locator('.sel-itemsContainer').first()).toHaveCSS('background-color', 'rgb(108, 255, 40)');
});


test('21 Change selector color by sliders', async ({page, selectorPage}) => {



   await selectorPage.selectColor('Winter')
   await selectorPage.setColorSliders();

});