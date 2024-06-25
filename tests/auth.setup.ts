import { test as setup } from '@playwright/test';

setup('login', async ({ page, context }) => {
    const cookieFilePath = '.auth/user.json';

    await page.goto('https://admin.shopify.com');
    await page.waitForLoadState("domcontentloaded");
    await page.locator('input#account_email').click();
    await page.locator('input#account_email').fill(process.env.Email);
    await page.getByRole('button', { name: 'Continue with email' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.Pass);
    await page.getByRole('button', { name: 'Log in' }).click();
    try {
        await page.getByRole('link', { name: 'Confirm' }).waitFor({ state: 'visible', timeout: 4000 });
        await page.getByRole('link', { name: 'Confirm' }).click();

    } catch {
        await page.waitForTimeout(100);
    }
    await page.waitForLoadState("domcontentloaded");
    await page.context().storageState({ path: cookieFilePath })
});