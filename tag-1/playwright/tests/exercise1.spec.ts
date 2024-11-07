import { test, expect, chromium } from '@playwright/test';

test('tests', async ({ page }) => {
    await chromium.launch({ headless: false, slowMo: 100 });
    await page.goto('http://localhost:5173/');
    await page.getByLabel('Ice Cream').check();
  });