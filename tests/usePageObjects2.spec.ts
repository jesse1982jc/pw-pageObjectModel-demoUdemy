import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage2";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage2";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("navigate to form page", async ({ page }) => {
  // 先創建類別的實例
  const natigateTo = new NavigationPage(page);
  // 叫實例去做事
  await natigateTo.formLayoutsPage();
  await natigateTo.datepickerPage();
  await natigateTo.toastrPage();
  await natigateTo.tooltipPage();
  await natigateTo.smartTablePage();
});

test("parametrized methods", async ({ page }) => {
  // 先創建實例
  const navigateTo = new NavigationPage(page);
  const toFormLayoutsPage = new FormLayoutsPage(page);

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
});
