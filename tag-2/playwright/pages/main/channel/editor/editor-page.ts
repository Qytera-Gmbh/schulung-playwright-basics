import test, { Page } from "@playwright/test";
import { Actionable, PageObject } from "playwright/pages/page";

export class Editor extends PageObject implements Actionable {
  constructor(page: Page) {
    super(page, page.getByTestId("create-post"));
  }

  public get do() {
    return {
      sendMessage: async (message: { text?: string }) => {
        if (message.text) {
          const text = message.text;
          await test.step(`enter message: ${text}`, async () => {
            await this.getInput("text").fill(text);
          });
        }
        await test.step("click send message button", async () => {
          await this.getButton("send-message").click();
        });
      },
    };
  }

  public getButton(buttonType: "send-message") {
    switch (buttonType) {
      case "send-message":
        return this.root.getByTestId("SendMessageButton");
    }
  }

  public getInput(inputType: "text") {
    switch (inputType) {
      case "text":
        return this.root.getByTestId("post_textbox");
    }
  }
}
