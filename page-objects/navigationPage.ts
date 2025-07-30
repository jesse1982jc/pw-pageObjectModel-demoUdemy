import { Page } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async formLayoutsPage() {
    await this.groupItemMenu("Forms");
    await this.page.getByText("Form Layouts").click();
  }

  async datepickerPage() {
    await this.groupItemMenu("Forms");
    // await this.page.waitForTimeout(1000);
    await this.page.getByText("Datepicker").click();
  }

  async ToastrPage() {
    await this.groupItemMenu("Modal & Overlays");
    await this.page.getByText("Toastr").click();
  }

  async TooltipPage() {
    await this.groupItemMenu("Modal & Overlays");
    // await this.page.waitForTimeout(1000);
    await this.page.getByText("Tooltip").click();
  }

  async smartTablePage() {
    await this.groupItemMenu("Tables & Data");
    await this.page.getByText("Smart Table").click();
  }

  // 建立"私人的"一個函式，去判斷每一個主選單的開合狀態是打開 OR 關閉
  private async groupItemMenu(groupItem: string) {
    // 先建立每個主選單的定位器
    const groupItemMenuSelector = this.page.getByTitle(groupItem);
    const expandStatus = await groupItemMenuSelector.getAttribute(
      "aria-expanded"
    );

    // 條件式: 假如 expandStatus 是 true (打開)，就不用再點擊 主選單 再次打開了
    //        假如 expandStatus 是 false (關閉)，就要再點擊 主選單 打開
    if (expandStatus == "false") {
      await groupItemMenuSelector.click();
    }
  }
}
