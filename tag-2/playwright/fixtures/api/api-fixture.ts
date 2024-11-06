import test, { request } from "@playwright/test";
import { styleText } from "node:util";
import { ApiConfiguration } from "playwright/api/base-api";
import { env, TestUser } from "playwright/global-settings";

export const apiTest = test.extend<{
  /**
   * Returns the API configuration for the specified user. The configurations are cached for all
   * users and will be reused on subsequent function calls to prevent re-authentications in each API
   * client.
   *
   * @param user the user
   * @returns the API configuration of the user
   */
  apiConfiguration: (user: TestUser) => Promise<ApiConfiguration>;
}>({
  apiConfiguration: async ({}, use) => {
    await use(async (username) => {
      let configuration = CACHE.get(username);
      if (configuration) {
        return configuration;
      }
      let credentials;
      switch (username) {
        case "john@example.org":
          credentials = {
            token: env("TOKEN_JOHN"),
          };
          break;
        case "jane@example.org":
          credentials = {
            token: env("TOKEN_JANE"),
          };
          break;
        default:
          throw new Error(`Unknown user: ${styleText("red", username)}`);
      }
      // We explicitly set the state to an empty one because Playwright would otherwise reuse the
      // default UI storage state file here.
      const context = await request.newContext({ storageState: { cookies: [], origins: [] } });
      configuration = new ApiConfiguration(credentials, context);
      CACHE.set(username, configuration);
      return configuration;
    });
  },
});

const CACHE = new Map<TestUser, ApiConfiguration>();
