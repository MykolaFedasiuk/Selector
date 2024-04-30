import { test as setup} from '@playwright/test';

setup('login', async ({ page, context }) => {
const cookieFilePath = '.auth/user.json';

 await page.goto('https://admin.shopify.com');
 await page.waitForLoadState("domcontentloaded");
 await page.locator('input#account_email').click();
 await page.locator('input#account_email').fill('mykola.fedasiuk@devit.group');
 await page.getByRole('button',  { name: 'Continue with email' }).click();
 await page.getByRole('textbox', { name: 'Password' }).fill('dkSJ79sHB56');
 await page.getByRole('button',  { name: 'Log in' }).click();
 await page.waitForLoadState("domcontentloaded");

 await page.context().storageState({path: cookieFilePath})
});