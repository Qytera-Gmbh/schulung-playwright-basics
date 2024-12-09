import { defineConfig, devices } from "@playwright/test";
import { GLOBAL_SETTINGS } from "./global-settings";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  expect: {
    timeout: 5 * 1000,
  },
  fullyParallel: true,
  projects: [
    {
      name: "init",
      testMatch: process.env.INIT ? "init.spec.ts" : "none",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "setup-auth",
      testMatch: "login.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      dependencies: GLOBAL_SETTINGS.projectDependencies,
      name: "chromium",
      testIgnore: ["login.spec.ts", "init.spec.ts"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: GLOBAL_SETTINGS.defaultUser.authFile,
      },
    },
  ],
  reporter: [["html"], ["line"]],
  retries: process.env.CI ? 2 : 0,
  testDir: "./tests",
  timeout: 30 * 1000,
  use: {
    actionTimeout: 10 * 1000,
    baseURL: "https://mattermost.qtaf.org",
    screenshot: "on",
    trace: "retain-on-failure",
  },
  workers: process.env.CI ? 1 : 2,
});
