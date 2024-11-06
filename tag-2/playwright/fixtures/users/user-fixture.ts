import test, { PlaywrightTestArgs } from "@playwright/test";
import { styleText } from "node:util";
import { GLOBAL_SETTINGS, TestUser } from "playwright/global-settings";

export const userTest = test.extend<{
  /**
   * Creates a new browser page for the specified user and makes it available in a new test scope.
   * You can use it to perform actions as a different user in the middle of a test or to assert
   * things for a different user.
   *
   * @example
   *
   * ```ts
   * userTest('multi-user chat', async ({ as, page }) => {
   *   // We're on the page of the default user here.
   *   await page.goTo('/chat');
   *   await expect(page.getByTestId('unread-messages')).toHaveCount(0);
   *   await as('Jane', async ({ page }) => {
   *     // We're on the page of Jane here.
   *     await page.goTo('/chat');
   *     await page.getByRole('input').fill('Hello!');
   *     await page.getByRole('button', { name: 'Send' }).click();
   *   });
   *   // We're back on the page of the default user.
   *   await expect(page.getByTestId('unread-messages')).toHaveText('Jane: Hello!');
   * });
   * ```
   *
   * @param username the user
   * @param callback the callback to call with the new page
   * @returns the callback result
   */
  as: <T>(
    username: TestUser,
    callback: (fixtures: Pick<PlaywrightTestArgs, "page">) => Promise<T>
  ) => Promise<T>;
}>({
  as: async ({ browser }, use) => {
    await use(async (username, scope) => {
      let authFile;
      switch (username) {
        case "john@example.org":
          authFile = GLOBAL_SETTINGS.paths.tempdata.auth.ui.john;
          break;
        case "jane@example.org":
          authFile = GLOBAL_SETTINGS.paths.tempdata.auth.ui.jane;
          break;
        default:
          throw new Error(`Unknown user: ${styleText("red", username)}`);
      }
      const context = await browser.newContext({ storageState: authFile });
      const page = await context.newPage();
      return await scope({ page });
    });
  },
});
