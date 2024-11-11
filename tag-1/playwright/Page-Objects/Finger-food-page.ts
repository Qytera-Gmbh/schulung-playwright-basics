import { Page } from "@playwright/test";

export class TitlePage {
  constructor(public page: Page) {
    this.page = page;
  }

  saladOption() {
    return this.page.getByTestId("checkbox-salad");
  }

  pizzaOption() {
    return this.page.getByTestId("checkbox-pizza");
  }

  beerOption() {
    return this.page.getByTestId("checkbox-beer");
  }

  iceCreamOption() {
    return this.page.getByTestId("checkbox-icecream");
  }

  chickenWingsOption() {
    return this.page.getByTestId("checkbox-chickenwings");
  }

  veggieSticksOption() {
    return this.page.getByTestId("checkbox-veggiesticks");
  }
}
