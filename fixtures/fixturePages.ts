import {test as base} from "@playwright/test";   
import {SelectorPage} from '../page objects/pageObjects'




export const test = base.extend<{selectorPage: SelectorPage}> ({
    selectorPage: ({page}, use) => {
     const selectorPage = new SelectorPage(page)
      use(selectorPage);    
    }


})

