import { Page } from "@playwright/test";

export class DiscountCard {
  constructor(public page: Page) {
    this.page = page;
  }

  spinnerDiscount() {
    return this.page.getByTestId("spinner-discount");
  }
}
