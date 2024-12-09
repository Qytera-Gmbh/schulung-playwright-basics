import { expect, Page } from "@playwright/test";
import { chatTest } from "../../../../fixtures/fixtures";
import { Checkable, PageObject } from "../../../../pages/page";

export class ChannelHeader extends PageObject implements Checkable {
  constructor(page: Page) {
    super(page, page.locator("#channel-header"));
  }

  public get check() {
    return {
      hasTitle: async (title: string) => {
        await chatTest.step(`check channel header title: ${title}`, async () => {
          await expect(this.getText("title")).toHaveText(title);
        });
      },
    };
  }

  /**
   * Returns a button element that is present in this page object.
   *
   * @param button the button element
   * @returns the element
   */
  public getButton(
    button: "channel-dropdown" | "favorite-channel" | "members" | "pinned-messages"
  ) {
    switch (button) {
      case "favorite-channel":
        return this.root.locator("#toggleFavorite");
      case "channel-dropdown":
        return this.root.locator("#channelHeaderDropdownButton");
      case "members":
        return this.root.locator("#member_rhs");
      case "pinned-messages":
        return this.root.locator("#channelHeaderPinButton");
    }
  }

  /**
   * Returns a text element that is present in this page object.
   *
   * @param text the text element
   * @returns the element
   */
  public getText(text: "description" | "title") {
    switch (text) {
      case "title":
        return this.root.locator("#channelHeaderTitle");
      case "description":
        return this.root.locator("#channelHeaderDescription");
    }
  }
}
