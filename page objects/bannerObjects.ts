import { Page, expect } from "@playwright/test";

export class BannerPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }


    async openBanner() {
        await this.page.frameLocator("#AppFrameMain iframe")
            .locator('.Polaris-Button__Content', { hasText: 'Customize' }).click();

        await this.page.waitForLoadState('domcontentloaded');

        const frame = this.page.frameLocator("#AppFrameMain iframe");
        const hideBtnLocator = frame.getByRole('button', {name: 'Close chat'}).first();
        const resetBtnLocator = frame.locator('.resetToDefaultButton__a9d82c160c79be3104d4.desktopElement__e138e2fbb89590a1fbe7');
        const showBtnLocator = frame.locator('.hideBtn_show__a43223fb34807e38db38');

        try {
            await hideBtnLocator.waitFor({ state: 'visible', timeout: 3000 });
            await hideBtnLocator.click();
            await resetBtnLocator.click();
            await showBtnLocator.click();
        } catch {
            await expect(async () => {
                await resetBtnLocator.click({timeout: 5000});
            }).toPass({timeout: 60000});
        }
    }


    async displayOption(dOption: string) {
        await this.page.frameLocator("#AppFrameMain iframe")
            .getByRole('tab', { name: 'Settings' }).click();

        await this.page.frameLocator("#AppFrameMain iframe")
            .locator('.Polaris-BlockStack').locator('.Polaris-BlockStack', { hasText: 'Display' })
            .getByRole('button').click();

        await this.page.frameLocator("#AppFrameMain iframe")
            .locator('.Polaris-ActionList__Text', { hasText: dOption }).click();

    };

    async selectPosition(position: String) {
        await this.page.frameLocator("#AppFrameMain iframe")
            .locator('.Polaris-Choice', { hasText: `${position}` }).click({ force: true });

    };

    async selectAnimationStyle(anstyle: string) {
        await this.page.frameLocator("#AppFrameMain iframe")
            .locator('.Polaris-Select')
            .locator('select')
            .selectOption({ value: anstyle });

    };

    async borderradius(border: string, input: string) {
        await this.page.frameLocator("#AppFrameMain iframe")
            .getByRole('tab', { name: 'Theme' }).click();

        await this.page.frameLocator("#AppFrameMain iframe").locator('.Polaris-BlockStack')
            .filter({
                has: this.page.frameLocator("#AppFrameMain iframe")
                    .locator('.Polaris-BlockStack', { hasText: border })
            })
            .locator('.Polaris-BlockStack', { hasText: border }).locator('input').fill(input)

    };

    async borderradiusMixed(border: string, topLeft: string, topRight: string, bottomLeft: string, bottomRight: string) {
        await this.page.frameLocator("#AppFrameMain iframe")
            .getByRole('tab', { name: 'Theme' }).click();

        await this.page.frameLocator("#AppFrameMain iframe").locator('.Polaris-BlockStack')
            .filter({
                has: this.page.frameLocator("#AppFrameMain iframe")
                    .locator('.Polaris-BlockStack', { hasText: border })
            })
            .locator('.Polaris-BlockStack', { hasText: border }).getByRole('button').click();
        await this.page.frameLocator("#AppFrameMain iframe").locator('#topLeft').fill(topLeft);
        await this.page.frameLocator("#AppFrameMain iframe").locator('#topRight').fill(topRight);
        await this.page.frameLocator("#AppFrameMain iframe").locator('#bottomLeft').fill(bottomLeft);
        await this.page.frameLocator("#AppFrameMain iframe").locator('#bottomRight').fill(bottomRight);

    };


    async borderStyle(borderStyleField: string, borderStyle: string) {
        await this.page.frameLocator("#AppFrameMain iframe")
            .getByRole('tab', { name: 'Theme' }).click();

        await this.page.frameLocator("#AppFrameMain iframe").locator('.Polaris-BlockStack')
            .filter({
                has: this.page.frameLocator("#AppFrameMain iframe")
                    .locator('.Polaris-BlockStack', { hasText: borderStyleField })
            })
            .locator('.Polaris-BlockStack', { hasText: borderStyleField }).getByRole('button').click();

        await this.page.frameLocator("#AppFrameMain iframe")
            .locator('.Polaris-OptionList-Option', { hasText: borderStyle }).click();

    };

    async borderWidth(borderWidthField: string, input: string) {
        await this.page.frameLocator("#AppFrameMain iframe")
            .getByRole('tab', { name: 'Theme' }).click();

        await this.page.frameLocator("#AppFrameMain iframe").locator('.Polaris-BlockStack')
            .filter({
                has: this.page.frameLocator("#AppFrameMain iframe")
                    .locator('.Polaris-BlockStack', { hasText: borderWidthField })
            })
            .locator('.Polaris-BlockStack', { hasText: borderWidthField }).locator('input').fill(input)

    };


    async borderWidthMixed(borderWidthField: string, topLeft: string, topRight: string, bottomLeft: string, bottomRight: string) {
        await this.page.frameLocator("#AppFrameMain iframe")
            .getByRole('tab', { name: 'Theme' }).click();

        await this.page.frameLocator("#AppFrameMain iframe").locator('.Polaris-BlockStack')
            .filter({
                has: this.page.frameLocator("#AppFrameMain iframe")
                    .locator('.Polaris-BlockStack', { hasText: borderWidthField })
            })
            .locator('.Polaris-BlockStack', { hasText: borderWidthField }).getByRole('button').click();
        await this.page.frameLocator("#AppFrameMain iframe").locator('#top').fill(topLeft);
        await this.page.frameLocator("#AppFrameMain iframe").locator('#right').fill(topRight);
        await this.page.frameLocator("#AppFrameMain iframe").locator('#left').fill(bottomLeft);
        await this.page.frameLocator("#AppFrameMain iframe").locator('#bottom').fill(bottomRight);

    };

    async cnangeImage(image: string) {
        await this.page.frameLocator("#AppFrameMain iframe")
            .getByRole('tab', { name: 'Theme' }).click();

        await this.page.frameLocator("#AppFrameMain iframe").locator('.Polaris-BlockStack', { hasText: image })
            .locator('div', { hasText: image }).getByRole('button').click();

        // .locator('.resource_picker_wrapper resource_picker_wrapper-empty').nth(imageNummer).getByRole('button').click();

        await this.page.frameLocator("#AppFrameMain iframe").locator('.Polaris-Modal-Dialog__Container')
            .locator('.grid_file_item ', { hasText: 'sample-normal-wax' }).click();

        await this.page.frameLocator("#AppFrameMain iframe").locator('button', { hasText: 'Done' }).click()

    };

    async editImage(image: string) {

        await this.page.frameLocator("#AppFrameMain iframe").locator('.Polaris-BlockStack', { hasText: image })
            .locator('div', { hasText: image }).getByRole('button', { name: 'Edit' }).click();

    };

    async changeGrayscaleBlur(slider: string, minusPlusnumb: number) {

        const SliderBox = this.page.frameLocator("#AppFrameMain iframe").locator('.Polaris-Modal-Dialog__Container')
            .locator('.Polaris-BlockStack', { hasText: slider })
            .locator('div', { hasText: slider }).locator('.Polaris-RangeSlider-SingleThumb__Input');
        await this.page.waitForTimeout(1000)
        await expect(async () => {
            await SliderBox.scrollIntoViewIfNeeded({ timeout: 5000 });
        }).toPass({timeout: 25000});

        await SliderBox.scrollIntoViewIfNeeded();
        const box = await SliderBox.boundingBox();
        const x = box.x + box.width / 2;
        const y = box.y + box.height / 2;
        await this.page.mouse.move(x, y);
        await this.page.mouse.down();
        await this.page.mouse.move(x - minusPlusnumb, y);
        await this.page.mouse.up();

    };

    async focalPoint() {

        const SliderBox = this.page.frameLocator("#AppFrameMain iframe").locator('.focal-pointer')
        await this.page.waitForTimeout(1000)
        await expect(async () => {
            await this.page.frameLocator("#AppFrameMain iframe")
                .locator('.focal-point-button').click({ timeout: 5000 });
            await SliderBox.scrollIntoViewIfNeeded({ timeout: 5000 });
        }).toPass({timeout: 25000});

        const box = await SliderBox.boundingBox();
        const x = box.x + box.width / 2;
        const y = box.y + box.height / 2;
        await this.page.mouse.move(x, y);
        await this.page.mouse.down();
        await this.page.mouse.move(x - 80, y + 80);
        await this.page.mouse.up();

    };

    async closeImageEditor() {

        await this.page.frameLocator("#AppFrameMain iframe").locator('button', { hasText: 'Done' }).click()        
        await this.page.waitForTimeout(2000)
    };

    async replaceImage(image: string) {

        await this.page.frameLocator("#AppFrameMain iframe").locator('.Polaris-BlockStack', { hasText: image })
            .locator('div', { hasText: image }).getByRole('button', { name: 'Change' }).click();

        await this.page.frameLocator("#AppFrameMain iframe").locator('button', { hasText: 'Change image' }).click();

        await this.page.frameLocator("#AppFrameMain iframe").locator('.Polaris-Modal-Dialog__Container')
            .locator('.grid_file_item ', { hasText: '25' }).click();

        await this.page.frameLocator("#AppFrameMain iframe").locator('button', { hasText: 'Done' }).click()

    };

    async removeImage(image: string) {

        await this.page.frameLocator("#AppFrameMain iframe").locator('.Polaris-BlockStack', { hasText: image })
            .locator('div', { hasText: image }).getByRole('button', { name: 'Change' }).click();

        await this.page.frameLocator("#AppFrameMain iframe").locator('button', { hasText: 'Remove image' }).click()

    };

    async changeSIdeImagePosition(pos: string) {
        await this.page.frameLocator("#AppFrameMain iframe").locator('button', { hasText: pos }).click()

    };

    async CustomCSS() {
        await this.page.frameLocator("#AppFrameMain iframe")
            .getByRole('tab', { name: 'Theme' }).click();

        const castomCSSfiled = this.page.frameLocator("#AppFrameMain iframe")
            .locator('.Polaris-Collapsible', { hasText: 'Custom CSS' })
        await castomCSSfiled.getByRole('button', { name: 'Add CSS selector' }).click();

        await this.page.frameLocator("#AppFrameMain iframe").locator('.customStylesStack__d2536628ef862a17186a', { hasText: 'Countries' })
            .locator('.selectorWrapper__be61bf86ff0dcf8cfaf3', { hasText: 'Title of certain resource' }).hover();

        await this.page.frameLocator("#AppFrameMain iframe").locator('.customStylesStack__d2536628ef862a17186a', { hasText: 'Countries' })
            .locator('.selectorWrapper__be61bf86ff0dcf8cfaf3', { hasText: 'Title of certain resource' })
            .getByRole('button', { name: 'Add' }).click();

        await this.page.frameLocator("#AppFrameMain iframe").locator('.Polaris-Modal-Dialog__Container')
            .getByRole('button', { name: 'Apply' }).click();
        await this.page.waitForTimeout(500);

        await castomCSSfiled.locator('textarea').fill(`.adt-countries .adt-disclosure-btn .adt-disclosure-btnText {
        box-sizing: border-box;
        color: green;
        font-size: 33px;
     }
 `);

        await this.page.waitForTimeout(500);
        await expect.soft(castomCSSfiled).toHaveScreenshot();

    };

    async themeCheckbox(checkBox: string, ariaChecked: string) {
        const checkbox = this.page.frameLocator("#AppFrameMain iframe").locator('.Polaris-Checkbox__ChoiceLabel', { hasText: checkBox })
            .getByRole('checkbox')

        await this.page.frameLocator("#AppFrameMain iframe")
            .getByRole('tab', { name: 'Theme' }).click();

        await checkbox.scrollIntoViewIfNeeded();
        await checkbox.click({ force: true });
        await expect(checkbox).toHaveAttribute('aria-checked', ariaChecked);
    };


    async checkFontSettings(fontSize: string, fontWeight: string, firefox: string, chrome: string) {

        await expect(this.page.locator('.adt-item:hover .adt-itemText')).toHaveCSS('font-size', fontSize);
        await expect(this.page.locator('.adt-item:hover .adt-itemText')).toHaveCSS('font-weight', fontWeight);
        const element = this.page.locator('.adt-item:hover .adt-itemText');
        const style = await (element).evaluate(element => {
            const style = window.getComputedStyle(element);
            return {
                fontFamily: style.fontFamily,
            };
        });

        expect(style.fontFamily === firefox || style.fontFamily === chrome).toBeTruthy();

    };

    async checkMainBorderSettings(localor: string, style: string, color: string, left: string, right:
        string, tleft: string, tright: string, width: string, width2: string, width3: string) {

        await expect(this.page.locator(localor)).toHaveCSS('border-bottom-left-radius', left);
        await expect(this.page.locator(localor)).toHaveCSS('border-bottom-right-radius', right);
        await expect(this.page.locator(localor)).toHaveCSS('border-top-left-radius', tleft);
        await expect(this.page.locator(localor)).toHaveCSS('border-top-right-radius', tright);
        await expect(this.page.locator(localor)).toHaveCSS('border-left-width', width);
        await expect(this.page.locator(localor)).toHaveCSS('border-right-width', width2);
        await expect(this.page.locator(localor)).toHaveCSS('border-color', color);
        await expect(this.page.locator(localor)).toHaveCSS('border-style', style);
        await expect(this.page.locator(localor)).toHaveCSS('border-width', width3);

    };

    async checkPrimaryButtonBorderSettings(style: string, color: string, left: string, right: string, tleft: string,
        tright: string, width: string, width2: string, width3: string, width4: string, width5: string) {
        await expect(this.page.locator('.adt-disclosure-btn').first()).toHaveCSS('border-bottom-left-radius', left);
        await expect(this.page.locator('.adt-disclosure-btn').first()).toHaveCSS('border-bottom-right-radius', right);
        await expect(this.page.locator('.adt-disclosure-btn').first()).toHaveCSS('border-top-left-radius', tleft);
        await expect(this.page.locator('.adt-disclosure-btn').first()).toHaveCSS('border-top-right-radius', tright);
        await expect(this.page.locator('.adt-disclosure-btn').first()).toHaveCSS('border-left-width', width);
        await expect(this.page.locator('.adt-disclosure-btn').first()).toHaveCSS('border-right-width', width2);
        await expect(this.page.locator('.adt-disclosure-btn').first()).toHaveCSS('border-top-width', width3);
        await expect(this.page.locator('.adt-disclosure-btn').first()).toHaveCSS('border-bottom-width', width4);
        await expect(this.page.locator('.adt-disclosure-btn').first()).toHaveCSS('border-color', color);
        await expect(this.page.locator('.adt-disclosure-btn').first()).toHaveCSS('border-style', style);
        await expect(this.page.locator('.adt-disclosure-btn').first()).toHaveCSS('border-width', width5);

    };

    async checkSecondaryButtonBorderSettings(style: string, color: string, left: string, right: string, tleft: string,
        tright: string, width: string, width2: string, width3: string, width4: string, width5: string) {
        await expect(this.page.locator('.adt-changeBtn')).toHaveCSS('border-top-left-radius', left);
        await expect(this.page.locator('.adt-changeBtn')).toHaveCSS('border-top-right-radius', right);
        await expect(this.page.locator('.adt-changeBtn')).toHaveCSS('border-bottom-left-radius', tleft);
        await expect(this.page.locator('.adt-changeBtn')).toHaveCSS('border-bottom-right-radius', tright);
        await expect(this.page.locator('.adt-changeBtn')).toHaveCSS('border-top-width', width);
        await expect(this.page.locator('.adt-changeBtn')).toHaveCSS('border-right-width', width2);
        await expect(this.page.locator('.adt-changeBtn')).toHaveCSS('border-bottom-width', width3);
        await expect(this.page.locator('.adt-changeBtn')).toHaveCSS('border-left-width', width4);
        await expect(this.page.locator('.adt-changeBtn')).toHaveCSS('border-color', color);
        await expect(this.page.locator('.adt-changeBtn')).toHaveCSS('border-style', style);
        await expect(this.page.locator('.adt-changeBtn')).toHaveCSS('border-width', width5);

    };


}