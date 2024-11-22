import { Page } from "@playwright/test";

export class MusicCard {
  constructor(public page: Page) {
    this.page = page;
  }
}
