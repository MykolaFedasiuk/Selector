import { Page, expect} from "@playwright/test";


export class BannerPage {
    readonly page: Page

constructor(page: Page)  {
    this.page = page
}


async openBanner() {
 let url = process.env.AppUrl
    await this.page.goto(url, { waitUntil: 'load' });
 //  await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    await this.page.frameLocator(process.env.Frame)
    .locator('.Polaris-Button__Content', {hasText: 'Customize'}).click();  
    await this.page.frameLocator(process.env.Frame)
    .locator('.resetToDefaultButton__a9d82c160c79be3104d4').first().click();  

};

async displayOption(dOption: string) {
    await this.page.frameLocator(process.env.Frame)
    .locator('.Polaris-BlockStack').locator('.Polaris-BlockStack', {hasText: 'Display'})
    .getByRole('button').click();

    await this.page.frameLocator(process.env.Frame)
    .locator('button', {hasText:`${dOption}`}).click();

};

async selectPosition(position: String) {
    await this.page.frameLocator(process.env.Frame)
    .locator('.positionCheckboxContainer__b0c9e7e54d9e4684f2ff', {hasText: `${position}`}).click();

};

async selectAnimationStyle (anstyle: string) {
    await this.page.frameLocator(process.env.Frame)
    .locator('.Polaris-Select')
    .locator('select')
    .selectOption({ value: `${anstyle}` });

};
















}