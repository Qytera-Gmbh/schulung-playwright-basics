import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
});

test("test1", async ({ page }) => {
  await page.getByLabel("Ice Cream").check();
  await expect(page.getByLabel("Ice Cream")).toBeChecked();
});

test("test2", async ({ page }) => {
  await page.getByLabel("Pizza").check();
  await expect(page.getByLabel("Pizza")).toBeChecked();
});
