import { Locator, Page } from "@playwright/test";

export class CatererCard {

  private readonly page: Page;

  /**
   * Constructs a new caterer card object.
   * 
   * @param page the current page
   * @param root the card's root locator
   */
  constructor(page: Page) {
    this.page = page;
  }

  // 1. Methode implementieren, die einen Locator zu einem bestimmten Radiobutton zurückgibt
  //   - entweder eine Methode pro Caterer, oder eine parametrisierte Methode, bei der man den Caterer angeben kann

  // TODO ...

  // 2. Methoden implementieren, die je einen Locator zurückgeben für...:
  //    - die Überschrift des ausgewählten Caterers
  //    - die Beschreibung des ausgewählten Caterers

  // TODO ...

}
