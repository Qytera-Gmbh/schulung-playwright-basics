import test, { expect } from "@playwright/test";
import { Sidebar } from "pages/main/sidebar/sidebar-page";
import { login } from "./util";

test.use({ storageState: { cookies: [], origins: [] } });

test("login", async ({ page }) => {
  await login(page);

  const sidebar = new Sidebar(page);
  await expect(sidebar.getButton("add-channels")).toBeVisible();

  await page.context().storageState({ path: "auth/jane.json" });
});
