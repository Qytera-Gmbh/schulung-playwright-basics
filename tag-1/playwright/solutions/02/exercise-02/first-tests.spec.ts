import { expect, test } from "@playwright/test";

test("[02][01] First test", async ({ page }) => {
  await page.goto("https://party-planner.qtaf.org");
  await page.getByTestId("name").fill("Penny Playwright");
  await expect(page.getByTestId("name")).toHaveValue("Penny Playwright");
});

test("[02][02] Second test", async ({ page }) => {
  await page.goto("https://party-planner.qtaf.org");
  await page.getByTestId("name").fill("Penny Playwright");
  await page.getByTestId("email").fill("penny@playwright.org");
  await expect(page.getByTestId("city")).toBeEnabled();
  await expect(page.getByTestId("street")).toBeEnabled();
  await expect(page.getByTestId("streetnumber")).toBeEnabled();
});

test("[02][02] Third test", async ({ page }) => {
  await page.goto("https://party-planner.qtaf.org");
  await page.getByLabel("Ice Cream").check();
  await expect(page.getByLabel("Ice Cream")).not.toBeChecked();
});
