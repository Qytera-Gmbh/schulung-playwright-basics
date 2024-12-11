import { Locator, Page } from "@playwright/test";

export class CatererCard {
  private readonly page: Page;

  /**
   * Constructs a new caterer card page object.
   *
   * @param page the current page
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Returns the radio button for the specific caterer.
   *
   * @param caterer the caterer
   * @returns the radio button
   */
  public getRadio(caterer: {
    /**
     * The caterer name.
     */
    name?: string;
    /**
     * The caterer email.
     */
    email?: string;
  }): Locator {
    // Locate all caterer elements.
    let locator = this.page.getByTestId("caterer");
    if (caterer.name) {
      // Only keep the caterers that contain the specified name.
      locator = locator.filter({
        has: this.page
          .getByTestId("caterer-name")
          .and(this.page.getByText(caterer.name, { exact: true })),
      });
    }
    if (caterer.email) {
      // Only keep the caterers that contain the specified email.
      locator = locator.filter({
        has: this.page
          .getByTestId("caterer-email")
          .and(this.page.getByText(caterer.email, { exact: true })),
      });
    }
    return locator.getByRole("radio");
  }

  /**
   * Returns the selected caterer's information.
   *
   * @returns the information
   */
  public getInfo(): {
    /**
     * The caterer name.
     */
    name: Locator;
    /**
     * The caterer description.
     */
    description: Locator;
  } {
    return {
      name: this.page.getByTestId("selected-caterer-name"),
      description: this.page.getByTestId("selected-caterer-description"),
    };
  }
}
