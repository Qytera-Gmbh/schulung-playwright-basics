import { Page } from "@playwright/test";

export class CatererActionPage {
  constructor(public page: Page) {
    this.page = page;
  }

  radioButtonName(name: string) {
    return this.page
      .getByTestId("caterer")
      .filter({
        has: this.page
          .getByTestId("caterer-name")
          .and(this.page.getByText(name)),
      })
      .getByRole("radio");
  }
}
