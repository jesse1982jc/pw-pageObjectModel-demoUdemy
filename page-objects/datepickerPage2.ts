import { Page, expect } from "@playwright/test";

export class DatepickerPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async formPickerDayFromToday(theDayFromToday: number) {
    // 先找到 form picker 的定位器
    const formPickerInputField = this.page
      .locator("nb-card")
      .getByPlaceholder("Form Picker");
    // 點擊一下使展開日曆
    await formPickerInputField.click();

    // 執行 private 選擇日期的函式
    const commonMonthDateYearAssertion = await this.selectDayFromToday(
      theDayFromToday
    );
    // 斷言
    await expect(formPickerInputField).toHaveValue(
      commonMonthDateYearAssertion
    );
  }

  async rangePickerDayFromToday(
    startDayFromToday: number,
    endDayFromToday: number
  ) {
    // 先找到 range picker 的定位器
    const rangePickerInputField = this.page
      .locator("nb-card")
      .getByPlaceholder("Range Picker");
    // 點擊一下使展開日曆
    await rangePickerInputField.click();

    // 執行兩次(開始日期、結束日期)抓日期的函式
    const startDateMonthYearAssertion = await this.selectDayFromToday(
      startDayFromToday
    );
    const endDateMonthYearAssertion = await this.selectDayFromToday(
      endDayFromToday
    );
    // 組成一個範圍日期 (開始日期 - 結束日期)
    const assertionMonthDateYear = `${startDateMonthYearAssertion} - ${endDateMonthYearAssertion}`;
    // 斷言
    await expect(rangePickerInputField).toHaveValue(assertionMonthDateYear);
  }

  private async selectDayFromToday(theDayFromToday: number) {
    // 創建日期 Date 的實例
    const date = new Date();
    // 設定日期為從今天加幾天?
    date.setDate(date.getDate() + theDayFromToday);
    // 設定預期的 日、月、年
    const expectDate = date.getDate().toString();
    const expectMonthShort = date.toLocaleString("en-US", { month: "short" });
    const expectMonthLong = date.toLocaleString("en-US", { month: "long" });
    const exppectYear = date.getFullYear().toString();

    // 建立 input 欄位的預期日期
    const expectMonthDateYear = `${expectMonthShort} ${expectDate}, ${exppectYear}`;

    // 建立日曆展開，左上角的 日、年的"內容"
    let calendarMonthYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();

    // 建立預期日曆上的 月、年
    const expectCalendarMonthYear = ` ${expectMonthLong} ${exppectYear} `;

    // 假如 expectCalendarMonthYear 不在 calendarMonthYear 裡面，就一直跑 while 迴圈
    while (!calendarMonthYear.includes(expectCalendarMonthYear)) {
      let compareCalendarMonthYear = new Date(calendarMonthYear);
      let compareExpectCalendarMonthYear = new Date(expectCalendarMonthYear);
      // 判斷預期的日期大還是日曆左上角的日期大?
      if (compareExpectCalendarMonthYear > compareCalendarMonthYear) {
        // 右翻日歷
        await this.page
          .locator(
            'nb-calendar-pageable-navigation [data-name="chevron-right"]'
          )
          .click();

        // 記得更新日曆左上方的 月、年
        calendarMonthYear = await this.page
          .locator("nb-calendar-view-mode")
          .textContent();
      } else if (compareExpectCalendarMonthYear < compareCalendarMonthYear) {
        // 左翻日曆
        await this.page
          .locator('nb-calendar-pageable-navigation [data-name="chevron-left"]')
          .click();
        // 記得更新日曆左上方的 月、年
        calendarMonthYear = await this.page
          .locator("nb-calendar-view-mode")
          .textContent();
      }
    }

    //找到我要的日期 expectDate 就點擊日曆上的該日
    await this.page
      .locator(".day-cell.ng-star-inserted:not(.bounding-month)")
      .getByText(expectDate, { exact: true })
      .click();

    // 回傳預期 的 月 日，年
    return expectMonthDateYear;
  }
}
