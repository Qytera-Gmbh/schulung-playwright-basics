import { expect, test } from "@playwright/test";

test("testVersion1", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByLabel("Ice Cream").check();
  await expect(page.getByLabel("Ice Cream")).not.toBeChecked();
});
