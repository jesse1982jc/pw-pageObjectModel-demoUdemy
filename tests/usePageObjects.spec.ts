import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
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

test("formLayout page", async ({ page }) => {
  // 創建實例
  const nativateTo = new NavigationPage(page);
  const formLayoutPage = new FormLayoutsPage(page);

  // 執行動作
  await nativateTo.formLayoutsPage();

  // 執行動作
  await formLayoutPage.usingTheGridTypeEmailPasswordRadiosselectionSubmit(
    "test@test.com",
    "welcome123",
    "Option 2"
  );

  await formLayoutPage.inlineFormInputNameEmailRemeberMeCheckboxSubmit(
    "Ray cat",
    "test@test.tw",
    true
  );
});
