import {test as base} from './fixtureBase' 
import {SelectorPage} from '../page objects/selObjects'
import {BannerPage} from '../page objects/bannerObjects'



export const test = base.extend<{selectorPage: SelectorPage, bannerPage: BannerPage}> ({
    selectorPage: ({page}, use) => {
     const selectorPage = new SelectorPage(page)
      use(selectorPage);    
    },

    bannerPage: ({page}, use) => {
      const bannerPage = new BannerPage(page)
       use(bannerPage);    
     },

     openSelector: async({selectorPage}, use) => {
      await selectorPage.openApp();
      await selectorPage.disableBannerIfNeeded();
      await selectorPage.createSelector();
      await use('');    
     },

     openBanner: async({selectorPage, bannerPage}, use) => {
      await selectorPage.openApp();
      await bannerPage.openBanner();
      await use('');    
     },

     redirects: async({selectorPage}, use) => {
      await selectorPage.openApp();
      await selectorPage.disableBannerIfNeeded();
      await use('');    
     },

});

