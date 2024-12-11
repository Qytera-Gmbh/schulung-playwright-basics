import { Locator, Page } from "@playwright/test";

export class PartyPlannerPage {
  private readonly page: Page;

  /**
   * Constructs a new party planner page object.
   *
   * @param page the current page
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to the party planner page.
   */
  public async open() {
    await this.page.goto("https://party-planner.qtaf.org");
  }

  /**
   * Returns the page title.
   *
   * @returns the title
   */
  public getTitle(): Locator {
    return this.page.getByTestId("main-title");
  }
}
