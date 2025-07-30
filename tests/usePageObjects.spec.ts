import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5751/");
});

test("navigate to form page", async ({ page }) => {
  // 先創建類別的實例
  const nativateTo = new NavigationPage(page);

  await nativateTo.formLayoutsPage();
  await nativateTo.datepickerPage();
  await nativateTo.ToastrPage();
  await nativateTo.TooltipPage();
  await nativateTo.smartTablePage();
});
