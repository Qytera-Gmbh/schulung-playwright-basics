import { expect, test } from "@playwright/test";

test("[02][01] First test", async ({ page }) => {
  await page.goto("https://party-planner.qtaf.org");
  await page.getByTestId("name").fill("Penny Playwright");
  await expect(page.getByTestId("name")).toHaveValue("Penny Playwright");
});
