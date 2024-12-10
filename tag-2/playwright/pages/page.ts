import { Locator, Page } from "@playwright/test";

export class PageObject {
  /**
   * The current page instance.
   */
  protected readonly page: Page;
  /**
   * The root element of this page object.
   */
  protected readonly root: Locator;

  /**
   * Constructs a new page object.
   *
   * @param page the current page
   */
  constructor(page: Page, root: Locator = page.locator("body")) {
    this.page = page;
    this.root = root;
  }

  /**
   * Returns the root element of this page object.
   *
   * @returns the element
   */
  public getRootLocator() {
    return this.root;
  }

  /**
   * Returns the page this page object resides in.
   *
   * @returns the page
   */
  public getPage() {
    return this.page;
  }
}

/**
 * Page objects which can directly be navigated to implement this interface.
 */
export interface Navigable {
  /**
   * Navigates to the page described by this page object.
   *
   * @param args the URL arguments
   */
  open(...args: unknown[]): Promise<void>;
}

/**
 * Page objects which provide higher-level interactions implement this interface.
 */
export interface Actionable<Actions extends object = object> {
  /**
   * The high-level actions available for this page object.
   */
  get do(): Actions;
}

/**
 * Page objects which provide higher-level assertions implement this interface.
 */
export interface Checkable<Checks extends object = object> {
  /**
   * The high-level assertions available for this page object.
   */
  get check(): Checks;
}
