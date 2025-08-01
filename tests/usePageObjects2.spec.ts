import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage2";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage2";
import { DatepickerPage } from "../page-objects/datepickerPage2";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("navigate to form page", async ({ page }) => {
  // 先創建類別的實例
  const navigateTo = new NavigationPage(page);
  // 叫實例去做事
  await navigateTo.formLayoutsPage();
  await navigateTo.datepickerPage();
  await navigateTo.toastrPage();
  await navigateTo.tooltipPage();
  await navigateTo.smartTablePage();
});

test("parametrized methods", async ({ page }) => {
  // 先創建實例
  const navigateTo = new NavigationPage(page);
  const toFormLayoutsPage = new FormLayoutsPage(page);
  const toDatepickerPage = new DatepickerPage(page);

  // 用實例去做事情
  await navigateTo.formLayoutsPage();
  await toFormLayoutsPage.submitUsingTheGridFormWithCredentialAndRadioOption(
    "ray@test.com",
    "welcome123",
    "Option 2"
  );

  await toFormLayoutsPage.submitInlineFormWithNameEmailRememberMe(
    "Ray Cat Meow",
    "raycat@test.com",
    true
  );
  // 先導航到 datepicker 頁面
  await navigateTo.datepickerPage();
  // 執行點選日期的動作
  await toDatepickerPage.formPickerDayFromToday(3);
  await toDatepickerPage.rangePickerDayFromToday(2, 4);
});
