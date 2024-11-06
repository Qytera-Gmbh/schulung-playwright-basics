import { Navigable, PageObject } from "playwright/pages/page";

export class MainPage extends PageObject implements Navigable {
  public async open() {
    await this.page.goto("/");
  }
}
