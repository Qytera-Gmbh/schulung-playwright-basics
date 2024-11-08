import { expect, test } from "@playwright/test";

test("test1", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByLabel("Ice Cream").check();
  await expect(page.getByLabel("Ice Cream")).toBeChecked();
});

test("test2", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByLabel("Pizza").check();
  await expect(page.getByLabel("Pizza")).toBeChecked();
});

test.afterEach(async ({ page }) => {
  await page.getByTestId("inputFieldNameOrganizer").fill("Playwright");
  await page
    .getByTestId("inputFieldEMailOrganizer")
    .fill("playwright@hello.de");
});
