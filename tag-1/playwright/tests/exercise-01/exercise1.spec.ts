import { expect, test } from "@playwright/test";

test("tests", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await expect(page).toHaveURL("http://localhost:5173/");
});
