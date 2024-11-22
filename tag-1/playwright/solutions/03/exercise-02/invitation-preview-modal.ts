import { Page } from "@playwright/test";

export class InvitationPreviewModal {
  constructor(public page: Page) {
    this.page = page;
  }

  hostName() {
    return this.page.getByTestId("name-host");
  }

  hostMail() {
    return this.page.getByTestId("mail-host");
  }

  whenWhereCity() {
    return this.page.getByTestId("whenwhere-city");
  }

  whenWhereStreet() {
    return this.page.getByTestId("whenwhere-street");
  }

  whenWhereStreetNumber() {
    return this.page.getByTestId("whenwhere-street-number");
  }

  dateTimeLocalDate() {
    return this.page.getByTestId("date-time-local-date");
  }

  dateTimeLocalTime() {
    return this.page.getByTestId("date-time-local-time");
  }
}
