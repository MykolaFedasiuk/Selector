import { Page, expect} from "@playwright/test";



export class SelectorPage {
    readonly page: Page

constructor(page: Page)  {
    this.page = page
}



async openApp() {

 let url = process.env.AppUrl
    await this.page.goto(url);
    // await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    const element = this.page.frameLocator(process.env.Frame)
    .locator('.Polaris-ResourceItem__ItemWrapper a').first();

    const suportChat = this.page.frameLocator(process.env.Frame)
    .locator('.cc-xzla')
 
        // await element.scrollIntoViewIfNeeded();  
        await this.page.frameLocator(process.env.Frame)
        .locator('.Polaris-Button__Content', {hasText: 'Customize'}).scrollIntoViewIfNeeded();  
       await this.page.waitForTimeout(1000);

        if (await suportChat.isVisible({timeout: 5000})) {   
        await suportChat.locator('[class="cc-1rzf cc-yx2c"]').click();
        };

       if (await element.isVisible({timeout: 5000})) {
    await this.page.frameLocator(process.env.Frame)
        .locator(':text("Showing")').nth(1).click();
        await this.page.frameLocator(process.env.Frame)
         .getByRole('button', { name: 'Actions' }).click();

        await this.page.frameLocator(process.env.Frame)
        .locator('.Polaris-ActionList__Text', {hasText: 'Delete'}).click({force: true});

        await this.page.frameLocator(process.env.Frame)
        .locator('.Polaris-Button__Text', {hasText: 'Delete'}).click({force: true});
       }
    
    };

async selTypes(type: String) {
        const suportChat = this.page.frameLocator(process.env.Frame)
        .locator('.cc-xzla')
    await this.page.frameLocator(process.env.Frame)
    .locator('.Polaris-Button__Content', {hasText: 'Create selector'}).click();
    await this.page.frameLocator(process.env.Frame)
    .locator('[class="container__aa6ed1916c93fc44b35f drop-down"]').locator('.header__c9ffa2ffd1581821c7eb').first().click();
    await this.page.frameLocator(process.env.Frame)
    .locator('.positionCheckboxContainer__b0c9e7e54d9e4684f2ff').nth(1).click();
   
      await this.page.frameLocator(process.env.Frame)
      .locator('.custom-drop-down', {hasText: `${type}`}).getByRole('button').click();
      const allSelectorTyes = this.page.frameLocator(process.env.Frame)
      .locator('.Polaris-ActionList__Text');
      for (const selType of await allSelectorTyes.all()) {
        if (await suportChat.isVisible()) { 
        await suportChat.locator('[class="cc-1rzf cc-yx2c"]').click();
              };
         await selType.click()
        
         await this.page.frameLocator(process.env.Frame)
         .locator('.custom-drop-down', {hasText: `${type}`}).getByRole('button').click();

        }
    
};
  

async createSelector() {
    await this.page.frameLocator(process.env.Frame)
    .locator('.Polaris-Button__Content', {hasText: 'Create selector'}).click();
    await this.page.frameLocator(process.env.Frame)
    .locator('[class="container__aa6ed1916c93fc44b35f drop-down"]').locator('.header__c9ffa2ffd1581821c7eb').first().click();
    await this.page.frameLocator(process.env.Frame)
    .locator('.positionCheckboxContainer__b0c9e7e54d9e4684f2ff').nth(1).click();

};

async selectResourse(resourse: String) {
      await this.page.frameLocator(process.env.Frame)
      .locator('.custom-drop-down', {hasText: 'Resource'}).getByRole('button').click();
      await this.page.frameLocator(process.env.Frame)
      .locator('.Polaris-ActionList__Text', {hasText: `${resourse}`}).first().click();
};

async selectType(type: String) {
      await this.page.frameLocator(process.env.Frame)
      .locator('.custom-drop-down', {hasText: 'Type'}).getByRole('button').click();
      await this.page.frameLocator(process.env.Frame)
      .locator('.Polaris-ActionList__Text', {hasText: `${type}`}).click();
};

async selectTheme(theme: String) {
      const suportChat = this.page.frameLocator(process.env.Frame)
      .locator('.cc-xzla')
      if (await suportChat.isVisible({timeout: 10000})) {   
          await suportChat.scrollIntoViewIfNeeded();  
          await suportChat.locator('[class="cc-1rzf cc-yx2c"]').click();
      };

      await this.page.frameLocator(process.env.Frame)
      .locator('.custom-drop-down', {hasText: 'Theme'}).getByRole('button').click();
      await this.page.frameLocator(process.env.Frame)
      .locator('.Polaris-ActionList__Text', {hasText: `${theme}`}).click();
    };


async selectColor(color: String) {
      await this.page.frameLocator(process.env.Frame)
      .locator('.SelectColorsSchemes', {hasText: 'Color scheme'}).locator('.Polaris-Connected').click();
      await this.page.frameLocator(process.env.Frame)
      .locator('.Polaris-Listbox-Option', {hasText: `${color}`}).click();
};

async selectPosition(positionType: String, position: String) {
      await this.page.frameLocator(process.env.Frame)
      .locator('.Polaris-Choice', {hasText: `${positionType}`}).click()
      await this.page.frameLocator(process.env.Frame)
      .locator('.positionCheckboxContainer__b0c9e7e54d9e4684f2ff', {hasText: `${position}`}).click();

};

async changeSlider() {
    const SliderBox = this.page.frameLocator(process.env.Frame)
    .locator('.Polaris-RangeSlider-SingleThumb__Input');
    const box = await SliderBox.boundingBox();
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      await this.page.mouse.move(x, y);
      await this.page.mouse.down();
      await this.page.mouse.move(x - 100, y);
      await this.page.mouse.up(); 

    await expect.soft(this.page.frameLocator(process.env.Frame)
    .locator('.Polaris-RangeSlider-SingleThumb__OutputBubble')).toHaveText('66')

};


async display1(display1: number) {
    await this.page.frameLocator(process.env.Frame)
    .locator('.custom-drop-down', {hasText: 'Display'}).scrollIntoViewIfNeeded();   
    await this.page.frameLocator(process.env.Frame)
    .locator('.custom-drop-down', {hasText: 'Display'}).getByRole('button').first().click();
    await this.page.frameLocator(process.env.Frame)
      .locator('.Polaris-ActionList__Text', {has: this.page.frameLocator(process.env.Frame).locator('[role="button"]')}).nth(display1).click();
};

async display2(display2: number) {
    await this.page.frameLocator(process.env.Frame)
    .locator('.custom-drop-down').nth(4).getByRole('button').first().click();
    await this.page.frameLocator(process.env.Frame)
      .locator('.Polaris-ActionList__Text', {has: this.page.frameLocator(process.env.Frame).locator('[role="button"]')}).nth(display2).click();

};

async displayCurrencyIcon(display3: number) {
    await this.page.frameLocator(process.env.Frame)
    .locator('.custom-drop-down', {hasText: 'Currency icon'}).getByRole('button').first().click();
    await this.page.frameLocator(process.env.Frame)
      .locator('.Polaris-ActionList__Text').nth(display3).click();

};

async displayCurrencyFormat(display4: number) {
    await this.page.frameLocator(process.env.Frame)
    .locator('.custom-drop-down', {hasText: 'Currency format'}).getByRole('button').first().click();
    await this.page.frameLocator(process.env.Frame)
      .locator('.Polaris-ActionList__Text').nth(display4).click();

};

async saveSelector() {

    if (await this.page.frameLocator(process.env.Frame).locator('.hideBtn__a9223e3607238208f77c')
         .isVisible({timeout: 10000})) {   
        await this.page.frameLocator(process.env.Frame).locator('.hideBtn__a9223e3607238208f77c').click();
    };
    await this.page.frameLocator(process.env.Frame)
    .locator('.Polaris-Button__Text', {hasText: 'Publish'}).first().click();
    await this.page.getByRole('button', {name: 'Save'}).click();
    await this.page.waitForTimeout(2500);
};

async openStore() {
    await this.page.goto('https://qafm30-11.myshopify.com/');
    await this.page.getByLabel('Enter store password').fill('123');
    await this.page.getByRole('button', { name: 'Enter' }).click();
};











}