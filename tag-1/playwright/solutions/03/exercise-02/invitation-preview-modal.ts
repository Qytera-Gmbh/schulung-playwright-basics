import { Locator, Page } from "@playwright/test";

export class InvitationPreviewModal {

  private readonly dialog: Locator;

  /**
   * Constructs a new preview modal.
   * 
   * @param page the current page
   */
  constructor(page: Page) {
    this.dialog = page.getByRole("dialog");
  }

  /**
   * Returns the host's name.
   * 
   * @returns the name
   */
  public getHostName(): Locator {
    return this.dialog.getByTestId("name-host");
  }

  /**
   * Returns the host's email address.
   * 
   * @returns the email address
   */
  public getHostMail(): Locator {
    return this.dialog.getByTestId("email-host");
  }

  /**
   * Returns the party location.
   * 
   * @returns the location
   */
  public getLocation(): Locator {
    return this.dialog.getByTestId("location");
  }

  /**
   * Returns the date of the party.
   * 
   * @returns the date
   */
  public getDate(): Locator {
    return this.dialog.getByTestId("date");
  }

  /**
   * Returns the dresscode description of the party.
   * 
   * @returns the description
   */
  public getDresscodeDescription(): Locator {
    return this.dialog.getByTestId("dresscode");
  }

  /**
   * Returns the additional comments.
   * 
   * @returns the comments
   */
  public getAdditionalComments(): Locator {
    return this.dialog.getByTestId("additional-comments");
  }
}
