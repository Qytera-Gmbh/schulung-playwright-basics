import { expect, test } from "@playwright/test";

test("testVersion1", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByLabel("Ice Cream").check();
  await expect(page.getByLabel("Ice Cream")).toBeChecked();
});

test("testVersion2", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  const iceCreamLabel = page.getByLabel("Ice Cream");
  await iceCreamLabel.check();
  await expect(iceCreamLabel).toBeChecked();
});