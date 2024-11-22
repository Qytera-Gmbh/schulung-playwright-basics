import { Locator, Page } from "@playwright/test";

export class CatererCard {
  constructor(public page: Page) {
    this.page = page;
  }

  radioButton(caterer: { name?: string; email?: string }) {
    let locator = this.page.getByTestId("caterer");
    if (caterer.name) {
      locator = locator.filter({
        has: this.page
          .getByTestId("caterer-name")
          .and(this.page.getByText(caterer.name, { exact: true })),
      });
    }
    if (caterer.email) {
      locator = locator.filter({
        has: this.page
          .getByTestId("caterer-email")
          .and(this.page.getByText(caterer.email, { exact: true })),
      });
    }
    return locator.getByRole("radio");
  }

  catererInfo(): { title: Locator; description: Locator } {
    return {
      title: this.page.getByTestId("selected-caterer-name"),
      description: this.page.getByTestId("selected-caterer-description"),
    };
  }
}
