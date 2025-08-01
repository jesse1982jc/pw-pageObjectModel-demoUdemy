import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatepickerPage } from "../page-objects/datepickerPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("navigate to form page", async ({ page }) => {
  // 先創建類別的實例
  const navigateTo = new NavigationPage(page);

  await navigateTo.formLayoutsPage();
  await navigateTo.datepickerPage();
  await navigateTo.ToastrPage();
  await navigateTo.TooltipPage();
  await navigateTo.smartTablePage();
});

test("parametrized methods", async ({ page }) => {
  // 創建實例
  const navigateTo = new NavigationPage(page);
  const formLayoutPage = new FormLayoutsPage(page);
  const datepicketTo = new DatepickerPage(page);

  // 執行動作
  await navigateTo.formLayoutsPage();

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

  await navigateTo.datepickerPage();
  await datepicketTo.commonDatepickerTheDayfromToday(60);
  await datepicketTo.rangepickerTheDayFromToday(2, 400);
});
