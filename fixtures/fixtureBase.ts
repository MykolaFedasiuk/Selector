import { ConsoleMessage, test as base } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    const errors: string[] = [];

    page.on('console', async (msg: ConsoleMessage) => {
      const url = msg.location().url;
      const text = msg.text();

      // Filter out the specific error message you want to ignore
      if (msg.type() === 'error' && url.includes('selectors') && !text.includes("Failed to execute ‘postMessage’ on ‘DOMWindow’")) {
        errors.push(text);
      }
    });

    await use(page);

    if (errors.length > 0) {
      throw new Error(`Encountered ${errors.length} error(s) from sel:\n${errors.join('\n')}`);
    }
  }
});
