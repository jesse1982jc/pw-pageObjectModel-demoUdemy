import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5751/");
});

test("navigate to form page", async ({ page }) => {});
