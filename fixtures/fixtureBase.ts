import { ConsoleMessage, test as base } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    const errors: string[] = [];

    page.on('console', async (msg: ConsoleMessage) => {

      const url = msg.location().url;
      if (msg.type() === 'error' && url.startsWith('sel-')) {
        errors.push(msg.text());
      }
    });

    await use(page);

    if (errors.length > 0) {
      throw new Error(`Encountered ${errors.length} error(s) from sel:\n${errors.join('\n')}`);
    }
  }
});

