import { Page, expect } from "@playwright/test";
import { truncate } from "fs";


export class SelectorPage {
    readonly page: Page

    constructor(page: Page) {
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
            .locator('.Polaris-Button__Content', { hasText: 'Customize' }).scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);

        if (await suportChat.isVisible({ timeout: 5000 })) {
            await suportChat.locator('[class="cc-1rzf cc-yx2c"]').click();
        };

        if (await element.isVisible({ timeout: 5000 })) {
            await this.page.frameLocator(process.env.Frame)
                .locator(':text("Showing")').nth(1).click();
            await this.page.frameLocator(process.env.Frame)
                .getByRole('button', { name: 'Actions' }).click();

            await this.page.frameLocator(process.env.Frame)
                .locator('.Polaris-ActionList__Text', { hasText: 'Delete' }).click({ force: true });

            await this.page.frameLocator(process.env.Frame)
                .locator('.Polaris-Button__Text', { hasText: 'Delete' }).click({ force: true });
        }

    };

    async selTypes(type: string) {
        const suportChat = this.page.frameLocator(process.env.Frame)
            .locator('.cc-xzla')
        await this.page.frameLocator(process.env.Frame)
            .locator('.custom-drop-down', { hasText: type }).getByRole('button').click();
        const allSelectorTyes = this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-ActionList__Text');
        for (const selType of await allSelectorTyes.all()) {
            if (await suportChat.isVisible()) {
                await suportChat.locator('[class="cc-1rzf cc-yx2c"]').click();
            };
            await selType.click()

            await this.page.frameLocator(process.env.Frame)
                .locator('.custom-drop-down', { hasText: type }).getByRole('button').click();

        }

    };


    async createSelector() {
        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-Button__Content', { hasText: 'Create selector' }).click();
        await this.page.frameLocator(process.env.Frame)
            .locator('[class="container__aa6ed1916c93fc44b35f drop-down"]').locator('.header__c9ffa2ffd1581821c7eb').first().click();
        await this.page.frameLocator(process.env.Frame)
            .locator('.positionCheckboxContainer__b0c9e7e54d9e4684f2ff').nth(1).click();

    };

    async selectResourse(resourse: String) {
        await this.page.frameLocator(process.env.Frame)
            .locator('.custom-drop-down', { hasText: 'Resource' }).locator('button').click();

        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-Box button').filter({ has: this.page.frameLocator(process.env.Frame).locator(`:text-is("${resourse}")`) })
            .click();
    };



    async selectType(type: string) {
        await this.page.frameLocator(process.env.Frame)
            .locator('.custom-drop-down', { hasText: 'Type' }).getByRole('button').click();
        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-ActionList__Text', { hasText: type }).click();
    };


    async selectTheme(theme: string) {
        const suportChat = this.page.frameLocator(process.env.Frame)
            .locator('.cc-xzla')
        if (await suportChat.isVisible({ timeout: 10000 })) {
            await suportChat.scrollIntoViewIfNeeded();
            await suportChat.locator('[class="cc-1rzf cc-yx2c"]').click();
        };

        await this.page.frameLocator(process.env.Frame)
            .locator('.custom-drop-down', { hasText: 'Theme' }).getByRole('button').click();
        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-ActionList__Text', { hasText: theme }).click();
    };


    async selectColor(color: string) {
        await this.page.frameLocator(process.env.Frame)
            .locator('.SelectColorsSchemes', { hasText: 'Color scheme' }).locator('.Polaris-Connected').click();
        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-Listbox-Option', { hasText: color }).click();
    };


    async selectPosition(positionType: string, position: string) {
        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-Choice', { hasText: positionType }).click()
        await this.page.frameLocator(process.env.Frame)
            .locator('.positionCheckboxContainer__b0c9e7e54d9e4684f2ff', { hasText: position }).click();

    };

    async changeSizeSlider(minusPlusnumb = 100) {
        const SliderBox = this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-RangeSlider-SingleThumb__Input');
        await SliderBox.scrollIntoViewIfNeeded();
        const box = await SliderBox.boundingBox();
        const x = box.x + box.width / 2;
        const y = box.y + box.height / 2;
        await this.page.mouse.move(x, y);
        await this.page.mouse.down();
        await this.page.mouse.move(x - minusPlusnumb, y);
        await this.page.mouse.up();

        // await expect.soft(this.page.frameLocator(process.env.Frame)
        // .locator('.Polaris-RangeSlider-SingleThumb__OutputBubble')).toHaveText('66')

    };


    async display1(display1: number) {
        await this.page.frameLocator(process.env.Frame)
            .locator('.custom-drop-down', { hasText: 'Display' }).scrollIntoViewIfNeeded();
        await this.page.frameLocator(process.env.Frame)
            .locator('.custom-drop-down', { hasText: 'Display' }).getByRole('button').first().click();
        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-ActionList__Text', { has: this.page.frameLocator(process.env.Frame).locator('[role="button"]') }).nth(display1).click();
    };

    async display2(display2: number) {
        await this.page.frameLocator(process.env.Frame)
            .locator('.custom-drop-down').nth(4).getByRole('button').first().click();
        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-ActionList__Text', { has: this.page.frameLocator(process.env.Frame).locator('[role="button"]') }).nth(display2).click();

    };

    async displayCurrencyIcon(display3: number) {
        await this.page.frameLocator(process.env.Frame)
            .locator('.custom-drop-down', { hasText: 'Currency icon' }).getByRole('button').first().click();
        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-ActionList__Text').nth(display3).click();

    };

    async displayCurrencyFormat(display4: number) {
        await this.page.frameLocator(process.env.Frame)
            .locator('.custom-drop-down', { hasText: 'Currency format' }).getByRole('button').first().click();
        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-ActionList__Text').nth(display4).click();

    };

    async saveSelector() {

        if (await this.page.frameLocator(process.env.Frame).locator('.hideBtn__a9223e3607238208f77c')
            .isVisible({ timeout: 10000 })) {
            await this.page.frameLocator(process.env.Frame).locator('.hideBtn__a9223e3607238208f77c').click();
        };

        if (await this.page.frameLocator(process.env.Frame)
            .locator('button', { hasText: 'Publish' }).first().isVisible({ timeout: 10000 })) {
            await this.page.frameLocator(process.env.Frame)
                .getByRole('button', { name: 'Publish' }).first().click();
        };

        try {
            await this.page.locator('button', { hasText: 'Save' }).waitFor({ state: 'visible', timeout: 1000 });
            await this.page.locator('button', { hasText: 'Save' }).click();
            await this.page.waitForTimeout(500);
        } catch {
            await this.page.waitForTimeout(500);
        }

    };

    async openStore() {
        await this.page.goto('https://qafm30-11.myshopify.com/');
        await this.page.getByLabel('Enter store password').fill('123');
        await this.page.getByRole('button', { name: 'Enter' }).click();
    };

    async searchCheckbox(checkbox: String) {
        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-Checkbox__ChoiceLabel', { hasText: `${checkbox}` }).getByRole('checkbox').check({ force: true });
    };


    async openColorPicker(field: string) {
        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-InlineStack').filter({
                has: this.page.frameLocator(process.env.Frame)
                    .locator('.Polaris-BlockStack', { hasText: field })
            })
            .locator('.ColorActivator__bb26e7abcb1baf605b58').click()
    };

    async openColorFieldAndPaste(field: string, colorCode: string) {
        await this.page.frameLocator(process.env.Frame)
            .getByRole('tab', { name: 'Theme' }).click();
        await this.openColorPicker(field);
        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-Box').locator('input.Polaris-TextField__Input').fill(colorCode);
    };

    async setColorPaste(color1: string, color2?: string, color3?: string) {
        await this.openColorFieldAndPaste(color1, 'ff282f')
        await this.openColorFieldAndPaste(color2, '282fff')
        await this.openColorFieldAndPaste(color3, '6cff28')
        await this.page.frameLocator(process.env.Frame)
            .getByRole('tab', { name: 'Theme' }).click();
    };

    async changeColorSlider(sliderbox: string, X: number, Y: number) {
        const Slider = this.page.frameLocator(process.env.Frame)
            .locator(`${sliderbox} .Polaris-ColorPicker__Dragger`);
        await Slider.scrollIntoViewIfNeeded();
        const box = await Slider.boundingBox();
        const x = box.x + box.width / 2;
        const y = box.y + box.height / 2;
        await this.page.mouse.move(x, y);
        await this.page.mouse.down();
        await this.page.mouse.move(x + X, y - Y);
        await this.page.mouse.up();
    };

    async setColorSliders(colorfield: string) {
        await this.page.frameLocator(process.env.Frame)
            .getByRole('tab', { name: 'Theme' }).click();
        await this.openColorPicker(colorfield);
        await this.changeColorSlider('.Polaris-ColorPicker__MainColor', 50, 50);
        await this.changeColorSlider('.Polaris-ColorPicker__HuePicker', 0, 50);
        await this.changeColorSlider('.Polaris-ColorPicker__AlphaPicker', 0, 0);

    };

    async setColorSliders2(colorfield: string) {
        await this.page.frameLocator(process.env.Frame)
            .getByRole('tab', { name: 'Theme' }).click();
        await this.openColorPicker(colorfield);
        await this.changeColorSlider('.Polaris-ColorPicker__MainColor', 20, 50);
        await this.changeColorSlider('.Polaris-ColorPicker__HuePicker', 0, 70);
        await this.changeColorSlider('.Polaris-ColorPicker__AlphaPicker', 0, 0);

    };

    async setColorSliders3(colorfield: string) {
        await this.page.frameLocator(process.env.Frame)
            .getByRole('tab', { name: 'Theme' }).click();
        await this.openColorPicker(colorfield);
        await this.changeColorSlider('.Polaris-ColorPicker__MainColor', 80, 0);
        await this.changeColorSlider('.Polaris-ColorPicker__HuePicker', 0, 80);
        await this.changeColorSlider('.Polaris-ColorPicker__AlphaPicker', 0, 0);

    };

    async setVisibilityParams(visParam: string, includeExclude: string, textInput: string) {
        await this.page.frameLocator(process.env.Frame)
            .getByRole('tab', { name: 'Visibility' }).click();

        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-BlockStack', { hasText: visParam })
            .locator('select')
            .selectOption({ value: includeExclude });

        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-BlockStack', { hasText: visParam }).locator('.Polaris-TextField__Input').fill(textInput);
        await this.page.keyboard.press('Enter');

    };

    async setVisibilitySize(checkboxText: string) {
        await this.page.frameLocator(process.env.Frame)
            .getByRole('tab', { name: 'Visibility' }).click();

        const allCheckboxes = this.page.frameLocator(process.env.Frame)
            .getByRole('checkbox');
        for (const checkBox of await allCheckboxes.all()) {
            await checkBox.uncheck({ force: true })
        }

        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-Bleed', { hasText: checkboxText }).getByRole('checkbox').check({ force: true });
    };

    async fontSettings(n: number, font: string, fontStyle: string, minusPlusnumb: number, customForm?: string) {
        await this.page.frameLocator(process.env.Frame)
            .getByRole('tab', { name: 'Theme' }).click();

        const fontfield = this.page.frameLocator(process.env.Frame)
            .locator('.topographyItem__af4a66ad959905e53481').nth(n)
        await fontfield
            .locator('select').first()
            .selectOption({ value: font });
        await this.page.waitForTimeout(500)

        if (await fontfield.getByPlaceholder('Enter your font').isVisible({ timeout: 5000 })) {
            await fontfield.getByPlaceholder('Enter your font').fill(customForm);
            await this.page.waitForTimeout(500);
        };

        await fontfield
            .locator('select').last()
            .selectOption({ value: fontStyle });
        await this.page.waitForTimeout(500)

        const SliderBox = fontfield.locator('.Polaris-RangeSlider-SingleThumb__Input')
        await SliderBox.scrollIntoViewIfNeeded();
        const box = await SliderBox.boundingBox();
        const x = box.x + box.width / 2;
        const y = box.y + box.height / 2;
        await this.page.mouse.move(x, y);
        await this.page.mouse.down();
        await this.page.mouse.move(x - minusPlusnumb, y);
        await this.page.mouse.up();
        await this.page.waitForTimeout(500);
    };


    async CustomCSSDisableStylesIsolation() {
        await this.page.frameLocator(process.env.Frame)
            .getByRole('tab', { name: 'Theme' }).click();

        const castomCSSfiled = this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-Collapsible', { hasText: 'Custom CSS' })
        await castomCSSfiled.getByRole('button', { name: 'Add CSS selector' }).click();

        await this.page.frameLocator(process.env.Frame).locator('.customStylesStack__d2536628ef862a17186a', { hasText: 'Content' })
            .locator('.selectorWrapper__be61bf86ff0dcf8cfaf3', { hasText: 'Title of certain resource' }).hover();

        await this.page.frameLocator(process.env.Frame).locator('.customStylesStack__d2536628ef862a17186a', { hasText: 'Content' })
            .locator('.selectorWrapper__be61bf86ff0dcf8cfaf3', { hasText: 'Title of certain resource' })
            .getByRole('button', { name: 'Add' }).click();

        await this.page.frameLocator(process.env.Frame).locator('.Polaris-Modal-Dialog__Container')
            .getByRole('button', { name: 'Apply' }).click();
        await this.page.waitForTimeout(500);

        await castomCSSfiled.locator('textarea').fill(`.sel-itemsContainer .sel-title {
        box-sizing: border-box;
        color: green;
        font-size: 55px;
     }
     `);

        await this.page.waitForTimeout(500);

        await castomCSSfiled.getByRole('checkbox').check({ force: true });
        await expect(castomCSSfiled.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
        await expect.soft(castomCSSfiled).toHaveScreenshot();

    };


    async checkFontSettings(fontSize: string, fontWeight: string, firefox: string, chrome: string) {

        await expect(this.page.locator('.sel-item:hover .sel-title')).toHaveCSS('font-size', fontSize);
        await expect(this.page.locator('.sel-item:hover .sel-title')).toHaveCSS('font-weight', fontWeight);
        const element = this.page.locator('.sel-item:hover .sel-title');
        const style = await (element).evaluate(element => {
            const style = window.getComputedStyle(element);
            return {
                fontFamily: style.fontFamily,
            };
        });

        expect(style.fontFamily === firefox || style.fontFamily === chrome).toBeTruthy();

    };


    async redirectBehavior(Behavier: string) {
        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-RadioButton__ChoiceLabel', { hasText: Behavier })
            .click()

        await this.page.waitForTimeout(500);

        const checkboxes = this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-ShadowBevel', { hasText: 'Redirect behavior' })
            .getByRole('checkbox')
        for (const checkbox of await checkboxes.all()) {
            try {
                await checkbox.waitFor({ state: 'visible', timeout: 500 });
                await checkbox.uncheck({ force: true });
                await this.page.waitForLoadState('load');
                await this.page.waitForTimeout(500);
            } catch {
                await this.page.waitForTimeout(500);
            }
        };

        try {
            await this.page.locator('button', { hasText: 'Save' }).waitFor({ state: 'visible', timeout: 500 });
            await this.page.locator('button', { hasText: 'Save' }).click();
            await this.page.waitForTimeout(500);
        } catch {
            await this.page.waitForTimeout(500);
        }


    };

    async enableRedirection(redirectType: string) {
        await this.page.waitForTimeout(500);
        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-Checkbox__ChoiceLabel', { hasText: redirectType })
            .click()
        await this.page.waitForTimeout(500);

        try {
            await this.page.locator('button', { hasText: 'Save' }).waitFor({ state: 'visible', timeout: 500 });
            await this.page.locator('button', { hasText: 'Save' }).click();
            await this.page.waitForTimeout(500);
        } catch {
            await this.page.waitForTimeout(500);
        }

    };

    async includeExcludeCountry(exclude: string, textInput: string) {
        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-BlockStack', { hasText: 'Countries' })
            .locator('select')
            .selectOption({ value: exclude });

        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-TextField__Input').fill(textInput);
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('Enter');
        try {
            await this.page.locator('button', { hasText: 'Save' }).waitFor({ state: 'visible', timeout: 500 });
            await this.page.locator('button', { hasText: 'Save' }).click();
            await this.page.waitForTimeout(500);
        } catch {
            await this.page.waitForTimeout(500);
        }

    };

    async addQueryParam(Key: string, Value: string) {
        await this.page.waitForTimeout(500);
        await this.page.frameLocator(process.env.Frame)
            .locator('.Polaris-Checkbox__ChoiceLabel', { hasText: 'Add query parameters during the redirect' })
            .click()
        await this.page.waitForTimeout(500);

        await this.page.frameLocator(process.env.Frame).getByPlaceholder('Key')
            .waitFor({ state: 'visible' });
        await this.page.frameLocator(process.env.Frame).getByPlaceholder('Key').fill(Key);
        await this.page.frameLocator(process.env.Frame).getByPlaceholder('Value').fill(Value);
        try {
            await this.page.locator('button', { hasText: 'Save' }).waitFor({ state: 'visible', timeout: 1000 });
            await this.page.locator('button', { hasText: 'Save' }).click();
            await this.page.waitForTimeout(500);
        } catch {
            await this.page.waitForTimeout(500);
        }

    };


    async disableBannerIfNeeded() {

        if (await this.page.frameLocator(process.env.Frame)
            .locator('.page-header__badge-wrapper', { hasText: 'Success' }).isVisible({ timeout: 2000 })) {

            await this.page.frameLocator(process.env.Frame)
                .locator('.Polaris-Button__Content', { hasText: 'Customize' }).click();

            await this.page.frameLocator(process.env.Frame)
                .getByRole('button', { name: 'Disable' }).first().click();

            await this.page.locator('button', { hasText: 'Save' }).click();
            await this.page.waitForTimeout(2500);
            await this.page.frameLocator(process.env.Frame).locator('button', { hasText: 'Back' }).click();
        }
    };





}