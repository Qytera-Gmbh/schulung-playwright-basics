import { Page } from "@playwright/test";
import { chatTest } from "playwright/fixtures/fixtures";
import { Actionable, PageObject } from "playwright/pages/page";

export class Sidebar extends PageObject implements Actionable {
  constructor(page: Page) {
    super(page, page.locator("#sidebar-left"));
  }

  public get do() {
    return {
      addChannel: async () => {
        await chatTest.step("click add channel button", async () => {
          await this.getButton("add-channels").click();
        });
      },
      openChannel: async (channelName: string) => {
        await chatTest.step(`click channel: ${channelName}`, async () => {
          await this.getChannel({ name: channelName }).click();
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
  public getButton(button: "add-channels" | "channels-group-header") {
    switch (button) {
      case "add-channels":
        return this.root.locator("#addChannelsCta");
      case "channels-group-header":
        return this.root.getByLabel("CHANNELS", { exact: true });
    }
  }

  private getChannel(filter?: { name?: string }) {
    let locator = this.root.getByRole("listitem");
    if (filter?.name) {
      const label = `${filter.name.toLowerCase()} public channel`;
      locator = locator.filter({ has: this.page.getByLabel(label) });
    }
    return locator;
  }
}
