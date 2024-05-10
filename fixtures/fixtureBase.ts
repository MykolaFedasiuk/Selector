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




// export const test = base.extend({
//   page: async ({ page }, use) => {
//     const errors: string[] = [];

//     page.on('console', async (msg: ConsoleMessage) => {
//       if (msg.type() === 'error' && msg.location().url === 'libraries.min.test.js:1') {
//         errors.push(msg.text());
//       }
//     });

//     await use(page);

//     if (errors.length > 0) {
//       throw new Error(`Encountered ${errors.length} error(s) from libraries.min.test.js:1:\n${errors.join('\n')}`);
//     }
//   }
// });



// import { ConsoleMessage, test as base } from "@playwright/test";

// export const test = base.extend({
//   page: async ({ page }, use) => {
//     page.on('console', async (msg: ConsoleMessage) => {
//       if (msg.type() === 'error' && msg.location().url === 'libraries.min.test.js:1') {
//         throw new Error('Error');
//       }
//     });
//     await use(page);
//   }
// });







// import { ConsoleMessage, test as base } from "@playwright/test";

// export const test = base.extend({
//   page: async ({ page }, use) => {
//     const errors: string[] = [];

//     page.on('console', async (msg: ConsoleMessage) => {

//       const url = msg.location().url;
//       if (msg.type() === 'error' && !url.startsWith('common-') && !url.startsWith('render-')) {
//         errors.push(msg.text());
//       }
//     });

//     await use(page);

//     if (errors.length > 0) {
//       throw new Error(`Encountered ${errors.length} error(s) from libraries.min.test.js:1:\n${errors.join('\n')}`);
//     }
//   }
// });





// import { ConsoleMessage, test as base } from "@playwright/test";

// export const test = base.extend({
//   page: async ({ page }, use) => {
//     page.on('console', async (msg: ConsoleMessage) => {
//       if (msg.type() === 'error' && msg.location().url === 'libraries.min.test.js:1') {
//         throw new Error('Error');
//       }
//     });
//     await use(page);
//   }
// });