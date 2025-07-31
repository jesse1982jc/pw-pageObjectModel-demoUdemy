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
    await this.page.getByText("Datepicker").click();
  }

  async toastrPage() {
    await this.groupItemMenu("Modal & Overlays");
    await this.page.getByText("Toastr").click();
  }

  async tooltipPage() {
    await this.groupItemMenu("Modal & Overlays");
    await this.page.getByText("Tooltip").click();
  }

  async smartTablePage() {
    await this.groupItemMenu("Tables & Data");
    await this.page.getByText("Smart Table").click();
  }

  // 建立一個確定左側主選單是否展開或關閉的 函式
  private async groupItemMenu(groupItem: string) {
    // 先抓取每個大標題的定位器
    const itemMenu = this.page.getByTitle(groupItem);
    // 抓屬性
    const isExpand = await itemMenu.getAttribute("aria-expanded");

    //假如 isExpand 是 "false" ，就要打開
    // 因為 isExpand 是字串，不是boolean
    if (isExpand == "false") {
      await itemMenu.click();
    }
  }
}
