import { expect, test } from "@playwright/test";

test.describe("Food checkboxes", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://party-planner.qtaf.org");
  });

  for (const food of ["Ice Cream", "Pizza", "Veggie Sticks"]) {
    test(`[02][04] Check ${food}`, async ({ page }) => {
      await page.getByLabel(food).click();
      await expect(page.getByLabel(food)).toBeChecked();
    });
  }
});

test.describe("Music chips", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://party-planner.qtaf.org");
  });

  for (const band of ["Raven Riot", "Lunar Lightning", "Harmony Haven"]) {
    test(`[02][04] Select ${band}`, async ({ page }) => {
      const chip = page.getByTestId("chip-artist").filter({ hasText: band });
      await chip.click();
      await expect(chip).toBeChecked();
    });

    test.afterEach(async ({ page }) => {
      const chip = page.getByTestId("chip-artist").filter({ hasText: band });
      await chip.uncheck();
    });
  }
});
