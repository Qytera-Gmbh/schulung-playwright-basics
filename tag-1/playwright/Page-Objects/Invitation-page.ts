import { Page } from "@playwright/test";

export class TitlePage {
  constructor(public page: Page) {
    this.page = page;
  }

  inputFieldNameOrganizer() {
    return this.page.getByTestId("input-field-name-organizer");
  }

  inputFieldEMailOrganizer() {
    return this.page.getByTestId("input-field-email-organizer");
  }

  mainStreetBoulevard() {
    return this.page.getByTestId("main-street-boulevard");
  }

  mainStreetBoulevardNumber() {
    return this.page.getByTestId("main-street-boulevard-number");
  }

  mainCityName() {
    return this.page.getByTestId("main-city-name");
  }

  colorPickerPrimaryColor() {
    return this.page.getByTestId("colorPicker-primary-color");
  }

  colorPickerSecondaryColor() {
    return this.page.getByTestId("colorPicker-secondary-color");
  }

  commentsField() {
    return this.page.getByTestId("comments-field");
  }

  submitButtonPreview() {
    return this.page.getByTestId("submit-button-preview");
  }
}
