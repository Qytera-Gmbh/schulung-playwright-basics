import { Locator, Page } from "@playwright/test";

export class InvitationCard {

  private readonly page: Page;

  /**
   * Constructs a new invitation card page object.
   * 
   * @param page the current page
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Returns the input for the host's name.
   * 
   * @returns the input
   */
  getInputName(): Locator {
    return this.page.getByTestId("host").getByTestId("name");
  }

  /**
   * Returns the input for the host's email.
   * 
   * @returns the input
   */
  getInputMail(): Locator {
    return this.page.getByTestId("host").getByTestId("email");
  }

  /**
   * Returns the input for the street of the party location.
   * 
   * @returns the input
   */
  getInputStreet(): Locator {
    return this.page.getByTestId("location").getByTestId("street");
  }

  /**
   * Returns the input for the streetnumber of the party location.
   * 
   * @returns the input
   */
  getInputStreetnumber(): Locator {
    return this.page.getByTestId("location").getByTestId("streetnumber");
  }

  /**
   * Returns the input for the city of the party location.
   * 
   * @returns the input
   */
  getInputCity(): Locator {
    return this.page.getByTestId("location").getByTestId("city");
  }

  /**
   * Returns the color picker for the primary color of the dress code.
   * 
   * @returns the color picker
   */
  getColorPickerPrimary(): Locator {
    return this.page.getByTestId("dresscode").getByTestId("primary-color");
  }

  /**
   * Returns the color picker for the secondary color of the dress code.
   * 
   * @returns the color picker
   */
  getColorPickerSecondary(): Locator {
    return this.page.getByTestId("dresscode").getByTestId("secondary-color");
  }

  /**
   * Returns the input for additional comments.
   * 
   * @returns the input
   */
  getInputComments(): Locator {
    return this.page.getByTestId("additional-information").getByTestId("comments");
  }

  /**
   * Returns the button for previewing the invitation card.
   * 
   * @returns the button
   */
  getButtonPreview(): Locator {
    return this.page.getByTestId("preview-invitation");
  }
}
