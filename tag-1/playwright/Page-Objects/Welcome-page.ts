import { Page } from "@playwright/test";

export class TitlePage {
  constructor(public page: Page) {
    this.page = page;
  }

  titleName() {
    return this.page.getByTestId("titleNameOfTheSite");
  }
}
