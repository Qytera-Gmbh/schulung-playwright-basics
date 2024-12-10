import { expect, test } from "@playwright/test";
import path from "node:path";

// npx playwright test --update-snapshots

test.describe("Create invitation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://picsum.photos/");
  });

  test("Lorem Picsum has different images", async ({ page }) => {
    await expect(page.locator("header")).toHaveScreenshot("header.png", {
      // mask: [page.locator("img")],
      stylePath: path.join(__dirname, 'screenshot-style.css')
     });
  });
});
