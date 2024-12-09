import { chatTest } from "../../fixtures/fixtures";
import { Actionable, Navigable, PageObject } from "../../pages/page";

export class LandingPage extends PageObject implements Actionable, Navigable {
  public get do() {
    return {
      /**
       * Chooses the way in which Mattermost will be used.
       *
       * @param choice the choice
       */
      choose: async (choice: {
        /**
         * The choice to select.
         */
        button: "browser" | "desktop-app";
        /**
         * Whether to remember the preference.
         */
        remember: boolean;
      }) => {
        if (choice.remember) {
          await chatTest.step("check remember preference", async () => {
            await this.getCheckbox("remember-preferences").check();
          });
        }
        await chatTest.step(`click button: ${choice.button}`, async () => {
          await this.getButton(choice.button).click();
        });
      },
    };
  }

  public async open() {
    await this.page.goto("/landing#/");
  }

  /**
   * Returns a button element that is present in this page object.
   *
   * @param button the button element
   * @returns the element
   */
  public getButton(button: "browser" | "desktop-app") {
    switch (button) {
      case "desktop-app":
        return this.root.getByRole("link", { name: "View in Desktop App" });
      case "browser":
        return this.root.getByRole("link", { name: "View in Browser" });
    }
  }

  /**
   * Returns a checkbox element that is present in this page object.
   *
   * @param checkbox the checkbox element
   * @returns the element
   */
  public getCheckbox(checkbox: "remember-preferences") {
    switch (checkbox) {
      case "remember-preferences":
        return this.root.getByRole("checkbox", { name: "Remember my preference" });
    }
  }
}
