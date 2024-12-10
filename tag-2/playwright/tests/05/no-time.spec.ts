import test, { expect } from "@playwright/test";
import { Sidebar } from "pages/main/sidebar/sidebar-page";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

for (let i = 0; i < 10; i++) {
  test(`no-time #${i}`, async ({ page }) => {
    const sidebar = new Sidebar(page);
    await expect(sidebar.getButton("add-channels")).toBeVisible();
    await expect(sidebar.getButton("add-channels")).toBeEnabled();
  });
}
