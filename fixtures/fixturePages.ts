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
      await selectorPage.deleteSelectors();
      await selectorPage.disableBannerIfNeeded();
      await selectorPage.createSelector();
      await use('');    
     },

     ActivateEmbadeOpenSelector: async({selectorPage}, use) => {
      await selectorPage.openApp();
      await selectorPage.activateEmbeds();
      await selectorPage.deleteSelectors();
      await selectorPage.createSelector();
      await use('');    
     },

     openBanner: async({selectorPage, bannerPage}, use) => {
      await selectorPage.openApp();
      await selectorPage.deleteSelectors();
      await bannerPage.openBanner();
      await use('');    
     },

     redirects: async({selectorPage}, use) => {
      await selectorPage.openApp();
      await selectorPage.disableBannerIfNeeded();
      await use('');    
     },

     afterRedirects: async({selectorPage}, use) => {
      await use(''); 
      await selectorPage.openApp();
      await selectorPage.disableBanneAndRedirect();
     },

});

