import { ConsoleMessage, test as base } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    const errors: string[] = [];

    page.on('console', async (msg: ConsoleMessage) => {
      const url = msg.location().url;
      const text = msg.text();

      if (msg.type() === 'error' && url.includes('selectors') && !text.includes("Failed to execute ‘postMessage’ on ‘DOMWindow’")) {
        errors.push(text);
      }
    });

    const removeElement = async () => {
      try {
        const iframeElement = await page.$("#AppFrameMain iframe");
        if (iframeElement) {
          const iframe = await iframeElement.contentFrame();
          if (iframe) {
            await iframe.evaluate(() => {
              const element1 = document.querySelector('.cc-1m2mf');
              const element2 = document.querySelector('#crisp-chatbox');
              if (element1) {
                  element1.remove();
              }
              if (element2) {
                element2.remove();
              }
            });
          }
        }
      } catch (error) {
        console.error('Error in removeElement:', error);
      }
    };

    const intervalId = setInterval(removeElement, 1000);

    await use(page);

    clearInterval(intervalId);

    if (errors.length > 0) {
      throw new Error(`Encountered ${errors.length} error(s) from sel:\n${errors.join('\n')}`);
    }
  }
});

