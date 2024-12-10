import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  expect: {
    timeout: 5 * 1000,
  },
  fullyParallel: true,
  projects: [
    // {
    //   name: "setup-auth",
    //   testMatch: "login.spec.ts",
    //   use: { ...devices["Desktop Chrome"] },
    // },
    {
      dependencies: [],
      name: "schulung",
      testIgnore: ["init.spec.ts", "**/examples/**"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "auth/jane.json",
      },
    },
  ],
  reporter: [["html", { open: "never" }], ["line"]],
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
