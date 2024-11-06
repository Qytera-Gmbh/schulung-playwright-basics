import { Page } from "@playwright/test";
import { chatTest } from "playwright/fixtures/fixtures";
import { Actionable, PageObject } from "playwright/pages/page";

export class CreateChannelModal extends PageObject implements Actionable {
  constructor(page: Page) {
    super(page, page.locator("#new-channel-modal"));
  }

  public get do() {
    return {
      fill: async (channel: {
        action?: "cancel" | "create";
        mode?: "private" | "public";
        name?: string;
        purpose?: string;
      }) => {
        if (channel.name) {
          const name = channel.name;
          await chatTest.step(`enter channel name: ${name}`, async () => {
            await this.getInput("channel-name").fill(name);
          });
        }
        if (channel.mode) {
          switch (channel.mode) {
            case "private":
              await chatTest.step("click private channel mode", async () => {
                await this.getButton("private-channel").click();
              });
              break;
            case "public":
              await chatTest.step("click public channel mode", async () => {
                await this.getButton("public-channel").click();
              });
              break;
          }
        }
        if (channel.purpose) {
          const purpose = channel.purpose;
          await chatTest.step(`enter channel purpose: ${purpose}`, async () => {
            await this.getInput("channel-purpose").fill(purpose);
          });
        }
        if (channel.action) {
          switch (channel.action) {
            case "cancel":
              await chatTest.step("click cancel", async () => {
                await this.getButton("cancel").click();
              });
              break;
            case "create":
              await chatTest.step("click create channel", async () => {
                await this.getButton("create-channel").click();
              });
              break;
          }
        }
      },
    };
  }

  /**
   * Returns an input element that is present in this page object.
   *
   * @param input the input element
   * @returns the element
   */
  public getInput(input: "channel-name" | "channel-purpose") {
    switch (input) {
      case "channel-name":
        return this.root.locator("#input_new-channel-modal-name");
      case "channel-purpose":
        return this.root.locator("#new-channel-modal-purpose");
    }
  }

  /**
   * Returns a button element that is present in this page object.
   *
   * @param button the button element
   * @returns the element
   */
  public getButton(button: "cancel" | "create-channel" | "private-channel" | "public-channel") {
    switch (button) {
      case "private-channel":
        return this.root.locator("#public-private-selector-button-I");
      case "public-channel":
        return this.root.locator("#public-private-selector-button-O");
      case "cancel":
        return this.root.getByRole("button", { name: "Cancel" });
      case "create-channel":
        return this.root.getByRole("button", { name: "Create channel" });
    }
  }
}
