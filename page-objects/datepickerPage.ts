import { Page, expect } from "@playwright/test";

export class DatepickerPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async commonDatepickerTheDayfromToday(dayFromToday: number) {
    // 先抓取 Form Picker 欄位的定位器
    const datepickerInputField = this.page
      .locator("nb-card nb-card-body")
      .getByPlaceholder("Form Picker");
    // 點擊一下使展開日曆框
    await datepickerInputField.click();
    // 執行函式去點擊某天的日期
    const assertionMonthDayYear = await this.generateDayFromToday(dayFromToday);
    // 斷言
    await expect(datepickerInputField).toHaveValue(assertionMonthDayYear);
  }

  async rangepickerTheDayFromToday(
    startDayFromToday: number,
    endDayFromToday: number
  ) {
    //抓取 range picker 的定位器
    const rangepickerInputField = this.page
      .locator("nb-card nb-card-body")
      .getByPlaceholder("Range Picker");
    // 點一下，使打開日曆
    await rangepickerInputField.click();
    // 找開始日期
    const startDayFromTodayAssertion = await this.generateDayFromToday(
      startDayFromToday
    );
    // 找結束日期
    const endDayFromTodayAssertion = await this.generateDayFromToday(
      endDayFromToday
    );
    // assertion 的開始日期、結束日期的字串
    const startEndDayAssertion = `${startDayFromTodayAssertion} - ${endDayFromTodayAssertion}`;
    // 斷 言
    await expect(rangepickerInputField).toHaveValue(startEndDayAssertion);
  }

  private async generateDayFromToday(dayFromToday: number) {
    // 新建 date 的實例
    let date = new Date();
    // 設定日期為今天之後的 + 幾天
    date.setDate(date.getDate() + dayFromToday);
    // 設定預期的 日、月(長、 短)、年
    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString("en-US", { month: "short" });
    const expectedMonthLong = date.toLocaleString("en-US", { month: "long" });
    const expectedYear = date.getFullYear().toString();

    // 預期的 月 日, 年 的字串樣子
    const expectedMonthDayYear = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

    let calendarMonthLongYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();
    const expectedMonthLongYear = ` ${expectedMonthLong} ${expectedYear} `;

    while (!calendarMonthLongYear.includes(expectedMonthLongYear)) {
      let compareCalendarMonthLongYear = new Date(calendarMonthLongYear);
      let compareExpectedMonthLongYear = new Date(expectedMonthLongYear);

      if (compareExpectedMonthLongYear > compareCalendarMonthLongYear) {
        await this.page
          .locator(
            'nb-calendar-pageable-navigation [data-name="chevron-right"]'
          )
          .click();

        // 重新抓取左上角的 月、年
        calendarMonthLongYear = await this.page
          .locator("nb-calendar-view-mode")
          .textContent();
      } else if (compareExpectedMonthLongYear < compareCalendarMonthLongYear) {
        await this.page
          .locator('nb-calendar-pageable-navigation [data-name="chevron-left"]')
          .click();

        // 重新抓取左上角的 月、年
        calendarMonthLongYear = await this.page
          .locator("nb-calendar-view-mode")
          .textContent();
      }
    }

    // 定位器要只抓 .day-cell 跟 .ng-star-inserted 類別的，排除 .bounding-mouth 類別的
    // :not() 是 CSS 的排除意思
    await this.page
      .locator(".day-cell.ng-star-inserted:not(.bounding-month)")
      .getByText(expectedDate, { exact: true })
      .click();

    return expectedMonthDayYear;
  }
}
