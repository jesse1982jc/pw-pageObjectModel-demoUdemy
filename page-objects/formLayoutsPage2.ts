import { Page } from "@playwright/test";

export class FormLayoutsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // 要做什麼事情，帶有參數
  async submitUsingTheGridFormWithCredentialAndRadioOption(
    email: string,
    password: string,
    optionText: string
  ) {
    // 找出 Using the Grid Form 的定位器
    const usingTheGrid = this.page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    // 輸入 email, password, option 選項
    await usingTheGrid.getByRole("textbox", { name: "Email" }).fill(email);
    await usingTheGrid
      .getByRole("textbox", { name: "password" })
      .fill(password);
    await usingTheGrid
      .getByRole("radio", { name: optionText })
      .check({ force: true });

    // 點擊 Submit 按鈕
    await usingTheGrid.getByRole("button", { name: "Sign in" }).click();
  }

  async submitInlineFormWithNameEmailRememberMe(
    name: string,
    email: string,
    isRemember: boolean
  ) {
    // 先找到 inline form 的定位器
    const inlineForm = this.page.locator("nb-card", { hasText: "Inline form" });

    // 使用這個 定位器 inlineForm 去做事
    await inlineForm.getByRole("textbox", { name: "Jane Doe" }).fill(name);
    await inlineForm.getByRole("textbox", { name: "Email" }).fill(email);
    // remember me 要用條件式判斷是否勾選
    if (isRemember) {
      await inlineForm
        .getByRole("checkbox", { name: "Remember me" })
        .check({ force: true });
    }
    // 提交
    await inlineForm.getByRole("button", { name: "Submit" }).click();
  }
}
