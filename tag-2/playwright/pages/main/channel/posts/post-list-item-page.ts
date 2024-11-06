import test, { expect } from "@playwright/test";
import { Checkable, PageObject } from "playwright/pages/page";

export class PostListItem extends PageObject implements Checkable {
  public get check() {
    return {
      equals: async (post: { author?: string; message?: string }) => {
        if (post.author) {
          const author = post.author;
          await test.step(`check post author: ${author}`, async () => {
            await expect(this.getText("author")).toHaveText(author);
          });
        }
        if (post.message) {
          const message = post.message;
          await test.step(`check post message: ${message}`, async () => {
            await expect(this.getText("message")).toHaveText(message);
          });
        }
      },
    };
  }

  public getText(textType: "author" | "message") {
    switch (textType) {
      case "author":
        return this.root.getByRole("button").filter({ hasNot: this.page.getByRole("img") });
      case "message":
        return this.root.locator("[id$='message']");
    }
  }
}
