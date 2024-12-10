import test, { expect } from "@playwright/test";
import { Sidebar } from "pages/main/sidebar/sidebar-page";
import { login } from "./util";

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  await login(page);
});

for (let i = 0; i < 10; i++) {
  test(`naive #${i}`, async ({ page }) => {
    const sidebar = new Sidebar(page);
    await expect(sidebar.getButton("add-channels")).toBeVisible();
    await expect(sidebar.getButton("add-channels")).toBeEnabled();
  });
}
