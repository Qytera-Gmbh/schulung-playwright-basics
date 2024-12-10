import { Page } from "@playwright/test";
import { chatTest } from "../../../fixtures/fixtures";
import { Actionable, PageObject } from "../../../pages/page";

export class CreateChannelMenu extends PageObject implements Actionable {
  constructor(page: Page) {
    super(page, page.locator("#AddChannelCtaDropdown"));
  }

  public get do() {
    return {
      createNewChannel: async () => {
        await chatTest.step("click create new channel button", async () => {
          await this.getOption("create-new-channel").click();
        });
      },
    };
  }

  /**
   * Returns an option element that is present in this page object.
   *
   * @param option the option element
   * @returns the element
   */
  public getOption(option: "browser-channels" | "create-new-channel") {
    switch (option) {
      case "create-new-channel":
        return this.root.locator("#showNewChannel");
      case "browser-channels":
        return this.root.locator("#showMoreChannels");
    }
  }
}
