import { Page } from "@playwright/test";



export class MyPageObjects {

    readonly page: Page


constructor(page: Page)  {
    this.page = page
}



async openApp() {
    await this.page.goto('https://admin.shopify.com/store/qa-mf-23-11-checkout-extensibility/apps/selectors-staging');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(10000);

    // if (await this.page.frameLocator("iframe[title='Selector - Staging']")
    // .locator(':text("Showing")').nth(1)) {

    //     await this.page.frameLocator("iframe[title='Selector - Staging']")
    //     .locator(':text("Showing")').nth(1).click();
      
    //     await this.page.frameLocator("iframe[title='Selector - Staging']")
    //     .getByRole('button', {name: 'Actions'}).click();
    //     await this.page.frameLocator("iframe[title='Selector - Staging']")
    //     .locator('.Polaris-ActionList__Text', {hasText: 'Delete'}).click();
    //      await this.page.frameLocator("iframe[title='Selector - Staging']")
    //      .locator('.Polaris-Button__Text', {hasText: 'Delete'}).click();

    // }

    const element = this.page.frameLocator("iframe[title='Selector - Staging']")
    .locator('.Polaris-ResourceItem__ItemWrapper a').first();

    // const exandedState = await element.getAttribute('data-polaris-unstyled');
    // const exandedState = await element.getAttribute('data-polaris-unstyled');


    if (await element) {

        await this.page.frameLocator("iframe[title='Selector - Staging']")
        .locator(':text("Showing")').nth(1).click();
        await this.page.frameLocator("iframe[title='Selector - Staging']")
            .getByRole('button', { name: 'Actions' }).click();
        await this.page.frameLocator("iframe[title='Selector - Staging']")
            .locator('.Polaris-ActionList__Text', { hasText: 'Delete' }).click();
        await this.page.frameLocator("iframe[title='Selector - Staging']")
            .locator('.Polaris-Button__Text', { hasText: 'Delete' }).click();  

    }


   
    await this.page.frameLocator("iframe[title='Selector - Staging']")
    .locator('.Polaris-Button__Content', {hasText: 'Create selector'}).click();
    await this.page.frameLocator("iframe[title='Selector - Staging']")
    .locator('[class="container__aa6ed1916c93fc44b35f drop-down"]').locator('.header__c9ffa2ffd1581821c7eb').first().click();
    await this.page.frameLocator("iframe[title='Selector - Staging']")
    .locator('.positionCheckboxContainer__b0c9e7e54d9e4684f2ff').nth(1).click();
};






async selTypes(type: String) {
      await this.page.frameLocator("iframe[title='Selector - Staging']")
      .locator('.custom-drop-down', {hasText: `${type}`}).getByRole('button').click();
      const allSelectorTyes = this.page.frameLocator("iframe[title='Selector - Staging']")
      .locator('.Polaris-ActionList__Text');
      for (const selType of await allSelectorTyes.all()) {
         await selType.click()
        
         await this.page.frameLocator("iframe[title='Selector - Staging']")
         .locator('.custom-drop-down', {hasText: `${type}`}).getByRole('button').click();
    
      };
};


async createSelector(resourse: String, type: String, theme: String, color: String, positionType: String, position: String) {

      await this.page.frameLocator("iframe[title='Selector - Staging']")
      .locator('.custom-drop-down', {hasText: 'Resource'}).getByRole('button').click();
      
      await this.page.frameLocator("iframe[title='Selector - Staging']")
      .locator('.Polaris-ActionList__Text', {hasText: `${resourse}`}).first().click();

      await this.page.frameLocator("iframe[title='Selector - Staging']")
      .locator('.custom-drop-down', {hasText: 'Type'}).getByRole('button').click();
      
      await this.page.frameLocator("iframe[title='Selector - Staging']")
      .locator('.Polaris-ActionList__Text', {hasText: `${type}`}).click()

      await this.page.frameLocator("iframe[title='Selector - Staging']")
      .locator('.custom-drop-down', {hasText: 'Theme'}).getByRole('button').click();
      
      await this.page.frameLocator("iframe[title='Selector - Staging']")
      .locator('.Polaris-ActionList__Text', {hasText: `${theme}`}).click();

      await this.page.frameLocator("iframe[title='Selector - Staging']")
      .locator('.SelectColorsSchemes', {hasText: 'Color scheme'}).locator('.Polaris-Connected').click();

      await this.page.frameLocator("iframe[title='Selector - Staging']")
      .locator('.Polaris-Listbox-Option', {hasText: `${color}`}).click();

      await this.page.frameLocator("iframe[title='Selector - Staging']")
      .locator('.Polaris-Choice', {hasText: `${positionType}`}).click()

      await this.page.frameLocator("iframe[title='Selector - Staging']")
      .locator('.positionCheckboxContainer__b0c9e7e54d9e4684f2ff', {hasText: `${position}`}).click();

      await this.page.frameLocator("iframe[title='Selector - Staging']")
      .locator('.Polaris-Button__Text', {hasText: 'Publish'}).first().click();

      await this.page.getByRole('button', {name: 'Save'}).click();
   




}







}