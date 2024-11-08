import { expect, test } from "@playwright/test";

test.beforeAll(async () => {
  console.log(
    "Führt beispielsweise einen bestimmten API Call für alle Testfälle vorher aus"
  );
});

test("test1", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByLabel("Ice Cream").check();
  await expect(page.getByLabel("Ice Cream")).toBeChecked();
});

test("test2", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByLabel("Pizza").check();
  await expect(page.getByLabel("Pizza")).toBeChecked();
});
