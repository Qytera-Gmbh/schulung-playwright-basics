import { Page } from "@playwright/test";

export class InvitationCard {
  constructor(public page: Page) {
    this.page = page;
  }

  inputFieldNameOrganizer() {
    return this.page.getByTestId("host").getByTestId("name");
  }

  inputFieldEMailOrganizer() {
    return this.page.getByTestId("host").getByTestId("email");
  }

  mainStreetBoulevard() {
    return this.page.getByTestId("location").getByTestId("street");
  }

  mainStreetBoulevardNumber() {
    return this.page.getByTestId("location").getByTestId("streetnumber");
  }

  mainCityName() {
    return this.page.getByTestId("location").getByTestId("city");
  }

  colorPickerPrimaryColor() {
    return this.page.getByTestId("dresscode").getByTestId("primary-color");
  }

  colorPickerSecondaryColor() {
    return this.page.getByTestId("dresscode").getByTestId("secondary-color");
  }

  commentsField() {
    return this.page
      .getByTestId("additional-information")
      .getByTestId("comments");
  }

  submitButtonPreview() {
    return this.page.getByTestId("preview-invitation");
  }
}
